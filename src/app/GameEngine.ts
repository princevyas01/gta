import * as THREE from 'three';
import { SceneManager } from '../rendering/sceneManager';
import { WorldStreamer } from '../world/worldStreamer';
import { RoadNetwork } from '../world/roadNetwork';
import { PlayerController } from '../player/playerController';
import { VehicleManager } from '../vehicles/vehicleManager';
import { NPCManager } from '../npc/npcManager';
import { CombatSystem } from '../combat/combatSystem';
import { WantedSystem } from '../law/wantedSystem';
import { MissionManager } from '../missions/missionManager';
import { gameClock } from '../core/clock';
import { inputManager } from '../core/input';
import { useGameStore } from '../ui/store';
import { SaveManager } from '../save/saveManager';
import { CANONICAL_DISTRICTS } from '../data/districts';

export class GameEngine {
  public sceneManager: SceneManager;
  public streamer: WorldStreamer;
  public roadNetwork: RoadNetwork;
  public player: PlayerController;
  public vehicleManager: VehicleManager;
  public npcManager: NPCManager;
  public combatSystem: CombatSystem;
  public wantedSystem: WantedSystem;
  public missionManager: MissionManager;

  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private frameCounter: number = 0;
  private fpsTimer: number = 0;
  private currentFps: number = 60;

  constructor(container: HTMLElement) {
    // 1. Core Three.js Scene & Renderer
    this.sceneManager = new SceneManager(container);

    // 2. World Streamer & Road Graph
    this.streamer = new WorldStreamer(this.sceneManager.scene);
    this.roadNetwork = new RoadNetwork(this.sceneManager.scene);

    // 3. Player Character & Camera
    this.player = new PlayerController(this.sceneManager.scene, this.sceneManager.camera);

    // 4. Vehicle System
    this.vehicleManager = new VehicleManager(this.sceneManager.scene);

    // 5. NPC Population
    this.npcManager = new NPCManager(this.sceneManager.scene);

    // 6. Combat Subsystem
    this.combatSystem = new CombatSystem(this.sceneManager.scene);

    // 7. Law Enforcement / Wanted
    this.wantedSystem = new WantedSystem();

    // 8. Mission Engine
    this.missionManager = new MissionManager();

    // 9. Input & Event Listeners
    inputManager.attach(container);

    // Try loading persistent save state
    const saved = SaveManager.load();
    if (saved && saved.player) {
      this.player.position.set(saved.player.position[0], saved.player.position[1], saved.player.position[2]);
      this.player.stats = saved.player.stats;
    }

    this.animate = this.animate.bind(this);
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    gameClock.reset();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private animate(): void {
    if (!this.isRunning) return;

    const { delta, fixedSteps } = gameClock.update();

    // Toggle overlay menus from single-frame key presses
    if (inputManager.state.toggleMap) {
      const isMapOpen = useGameStore.getState().isMapOpen;
      useGameStore.getState().setMapOpen(!isMapOpen);
      if (!isMapOpen) inputManager.releasePointerLock();
    }
    if (inputManager.state.togglePhone) {
      const isPhoneOpen = useGameStore.getState().isPhoneOpen;
      useGameStore.getState().setPhoneOpen(!isPhoneOpen);
      if (!isPhoneOpen) inputManager.releasePointerLock();
    }
    if (inputManager.state.toggleDebug) {
      const isDebugOpen = useGameStore.getState().isDebugOpen;
      useGameStore.getState().setDebugOpen(!isDebugOpen);
    }

    // Fixed-step simulation updates (60Hz)
    for (let i = 0; i < fixedSteps; i++) {
      this.fixedUpdate(1 / 60);
    }

    // Render pass
    const targetFocusPos = this.player.currentVehicle
      ? this.player.currentVehicle.position
      : this.player.position;

    this.sceneManager.atmosphere.update(gameClock.timeOfDay, targetFocusPos, 'clear');
    this.sceneManager.particles.update(delta);

    const renderInfo = this.sceneManager.render();

    // FPS calculation
    this.frameCounter++;
    this.fpsTimer += delta;
    if (this.fpsTimer >= 0.5) {
      this.currentFps = Math.round((this.frameCounter / this.fpsTimer));
      this.frameCounter = 0;
      this.fpsTimer = 0;
    }

    // Sync Telemetry & UI Store
    this.syncStore(renderInfo);

    // Flush single-frame input impulses
    inputManager.flush();

    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  private fixedUpdate(dt: number): void {
    // 1. Update Camera look angle from mouse movement
    this.player.camera.handleMouseMove(inputManager.state.mouseX, inputManager.state.mouseY);

    // 2. Determine target position (Player or Vehicle)
    const activePos = this.player.currentVehicle
      ? this.player.currentVehicle.position
      : this.player.position;

    // 3. Dynamic Sector Streaming
    this.streamer.update(activePos);

    // 4. Update Vehicles
    const targetAimAngle = this.player.camera.azimuth + Math.PI;
    this.vehicleManager.update(
      inputManager.state,
      dt,
      this.sceneManager.particles,
      this.streamer.allColliders,
      this.player.position,
      targetAimAngle
    );

    // Sync vehicle mounted state
    if (this.vehicleManager.playerVehicle !== this.player.currentVehicle) {
      this.player.currentVehicle = this.vehicleManager.playerVehicle;
    }

    // 5. Update Player Controller
    this.player.update(inputManager.state, dt, this.streamer);

    // 6. Update NPCs
    const isGunfire = inputManager.state.fire;
    this.npcManager.update(dt, this.player.position, isGunfire);

    // 7. Update Combat System
    if (!this.player.currentVehicle) {
      this.combatSystem.update(
        inputManager.state,
        dt,
        this.player,
        this.vehicleManager,
        this.sceneManager.particles,
        this.npcManager.npcs
      );
    }

    // 8. Update Law Enforcement & Wanted Heat
    this.wantedSystem.update(dt, this.player.position, this.vehicleManager);

    // 9. Update Mission Engine & GPS Route Ribbon
    this.missionManager.update(dt, this.player, this.wantedSystem, this.roadNetwork);

    // If custom waypoint is set, route GPS to waypoint
    const waypoint = useGameStore.getState().activeWaypoint;
    if (waypoint && !this.missionManager.activeMission) {
      const path = this.roadNetwork.findPath(
        activePos.x,
        activePos.z,
        waypoint[0],
        waypoint[2]
      );
      this.roadNetwork.updateGPSRibbon(path);
    }
  }

  private syncStore(renderInfo: { drawCalls: number; triangles: number }): void {
    const curWeapon = this.player.getActiveWeapon();
    const district = CANONICAL_DISTRICTS.find(d => d.id === this.streamer.currentDistrictId);

    useGameStore.getState().updateStats({
      health: Math.round(this.player.stats.health),
      armor: Math.round(this.player.stats.armor),
      cash: this.player.stats.cash,
      stamina: Math.round(this.player.stats.stamina),
      weaponName: curWeapon.def.name,
      ammo: curWeapon.item.ammo,
      reserveAmmo: curWeapon.item.reserveAmmo,
      inVehicle: !!this.player.currentVehicle,
      vehicleName: this.player.currentVehicle ? this.player.currentVehicle.def.name : '',
      vehicleSpeed: this.player.currentVehicle ? Math.round(Math.abs(this.player.currentVehicle.speed) * 3.6) : 0,
      vehicleHealth: this.player.currentVehicle ? Math.round(this.player.currentVehicle.health) : 1000,
      wantedLevel: this.wantedSystem.heat,
      isCoolingDown: this.wantedSystem.isCoolingDown,
      districtName: district ? district.name : 'San Aurelio',
      districtId: this.streamer.currentDistrictId,
      timeFormatted: gameClock.getFormattedTime(),
      activeMissionTitle: this.missionManager.activeMission?.title || 'Free Roam',
      currentObjective: this.missionManager.getCurrentObjective()?.description || 'Explore San Aurelio',
      fps: this.currentFps,
      drawCalls: renderInfo.drawCalls,
      triangles: renderInfo.triangles,
      activeCellsCount: this.streamer.getActiveSectorIds().length
    });
  }

  public dispose(): void {
    this.stop();
    inputManager.detach();
    this.sceneManager.dispose();
  }
}

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
import { SaveManager, SAVE_SCHEMA_VERSION } from '../save/saveManager';
import { CANONICAL_DISTRICTS } from '../data/districts';
import { CANONICAL_POIS } from '../data/pois';
import { SaveGameSchemaV3 } from '../core/types';
import { PhysicsWorld } from '../physics/physicsWorld';
import { PhysicsColliderManager } from '../physics/physicsColliders';
import { NavMeshService } from '../navigation/navMeshService';
import { soundEngine } from '../core/audio';
import { distance2D } from '../core/math';

export interface TelemetryData {
  playerCoords: [number, number, number];
  playerHeading: number;
  activeVehicle: { id: string; name: string; speed: number; health: number } | null;
  fps: number;
  drawCalls: number;
  triangles: number;
  activeCellCount: number;
}

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
  public physicsWorld: PhysicsWorld | null = null;
  public colliderManager: PhysicsColliderManager | null = null;
  public navMeshService: NavMeshService | null = null;

  private isRunning: boolean = false;
  private frameCounter: number = 0;
  private fpsTimer: number = 0;
  private currentFps: number = 60;

  private readonly readyPromise: Promise<void>;
  private readonly snapshotListeners = new Set<(snapshot: TelemetryData) => void>();
  private readonly discoveredDistricts = new Set<string>(['D01']);
  private readonly discoveredPOIs = new Set<string>(['poi-aurelio-tower']);

  constructor(container: HTMLElement) {
    // 1. Core Three.js Scene & Renderer (WebGPURenderer with WebGL2 fallback)
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

    // 10. Explicit engine readiness promise (Pages 39, 100)
    this.readyPromise = this.boot(container);

    // Load persistent save state synchronously during initial boot
    const saved = SaveManager.loadSync();
    this.player.position.fromArray(saved.player.position);
    this.player.facingAngle = saved.player.rotationY;
    this.player.stats = structuredClone(saved.player.stats);
    this.player.inventory = structuredClone(saved.player.inventory);
    this.player.activeWeaponIndex = Math.min(
      saved.player.activeWeaponIndex,
      Math.max(0, this.player.inventory.length - 1)
    );

    saved.world.discoveredDistricts.forEach(d => this.discoveredDistricts.add(d));
    saved.world.discoveredPOIs.forEach(p => this.discoveredPOIs.add(p));

    this.missionManager.completedMissionIds = [...saved.missions.completedMissionIds];
    if (saved.missions.currentMissionId) {
      this.missionManager.startMission(saved.missions.currentMissionId, false);
      this.missionManager.currentStageIndex = Math.max(
        0,
        Math.min(
          saved.missions.currentStageIndex,
          (this.missionManager.activeMission?.stages.length ?? 1) - 1
        )
      );
    } else {
      this.missionManager.startMission('m_getaway_blueprint', false);
    }

    gameClock.timeOfDay = saved.world.timeOfDay;
    useGameStore.getState().updateStats({ weather: saved.world.weather });

    this.animate = this.animate.bind(this);
  }

  private async boot(container: HTMLElement): Promise<void> {
    void container;
    await this.sceneManager.ready;
    try {
      this.physicsWorld = await PhysicsWorld.create();
      this.colliderManager = new PhysicsColliderManager(this.physicsWorld);
      this.streamer.setColliderManager(this.colliderManager);
      this.navMeshService = await NavMeshService.create();
      this.player.attachPhysics(this.physicsWorld);
      this.combatSystem.setPhysicsWorld(this.physicsWorld);
    } catch (err) {
      console.warn('[GameEngine] Physics or Nav initialization failed:', err);
    }
  }

  public get ready(): Promise<void> {
    return this.readyPromise;
  }

  public onSnapshot(listener: (snapshot: TelemetryData) => void): () => void {
    this.snapshotListeners.add(listener);
    return () => this.snapshotListeners.delete(listener);
  }

  private emitSnapshot(snapshot: TelemetryData): void {
    for (const listener of this.snapshotListeners) {
      listener(snapshot);
    }
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    gameClock.reset();
    this.sceneManager.setAnimationLoop(this.animate);
  }

  public stop(): void {
    this.isRunning = false;
    this.sceneManager.stopAnimationLoop();
  }

  public restartCheckpoint(): void {
    if (this.player.currentVehicle) {
      this.vehicleManager.togglePlayerVehicle(this.player.position, this.streamer.allColliders);
    }
    this.player.position.set(0, 0.5, 0);
    this.player.velocity.set(0, 0, 0);
    this.player.stats.health = 100;
    this.player.stats.armor = 100;
    this.player.stats.stamina = 100;
    this.wantedSystem.setHeat(0);
    if (this.missionManager.activeMission) {
      this.missionManager.resetToCheckpoint();
    } else {
      this.missionManager.startMission('m_getaway_blueprint', false);
    }
  }

  public async saveGame(): Promise<boolean> {
    const rawWeather = useGameStore.getState().weather;
    const weather: 'clear' | 'overcast' | 'rain' | 'fog' =
      rawWeather === 'overcast' || rawWeather === 'rain' || rawWeather === 'fog'
        ? rawWeather
        : 'clear';

    // Dynamically record current active districts and nearby POIs (Pages 11, 86)
    this.streamer.getActiveSectorIds().forEach(id => this.discoveredDistricts.add(id));
    for (const poi of CANONICAL_POIS) {
      if (distance2D(this.player.position.x, this.player.position.z, poi.worldPosition[0], poi.worldPosition[2]) < 180) {
        this.discoveredPOIs.add(poi.id);
      }
    }

    const schema: SaveGameSchemaV3 = {
      version: SAVE_SCHEMA_VERSION,
      timestamp: Date.now(),
      player: {
        position: [this.player.position.x, this.player.position.y, this.player.position.z],
        rotationY: this.player.facingAngle,
        stats: structuredClone(this.player.stats),
        inventory: structuredClone(this.player.inventory),
        activeWeaponIndex: this.player.activeWeaponIndex,
        currentVehicleInstanceId: this.player.currentVehicle ? this.player.currentVehicle.id : null
      },
      world: {
        discoveredDistricts: Array.from(this.discoveredDistricts),
        discoveredPOIs: Array.from(this.discoveredPOIs),
        timeOfDay: gameClock.timeOfDay,
        weather
      },
      missions: {
        completedMissionIds: [...this.missionManager.completedMissionIds],
        currentMissionId: this.missionManager.activeMission?.id ?? null,
        currentStageIndex: this.missionManager.currentStageIndex
      },
      ownedVehicles: this.vehicleManager.getOwnedVehicles()
    };
    return await SaveManager.save(schema);
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

    // Modal Pause Semantics: Map or Phone open pauses simulation
    const ui = useGameStore.getState();
    const gameplayPaused = ui.isMapOpen || ui.isPhoneOpen;

    if (gameplayPaused) {
      this.player.camera.resetInput();
    }

    // Fixed-step simulation updates (60Hz)
    for (let i = 0; i < fixedSteps; i++) {
      const fixedDt = 1 / 60;
      if (!gameplayPaused) {
        this.fixedUpdate(fixedDt);
      }
    }

    // Sky & Lighting updates (Page 21)
    const weather = useGameStore.getState().weather;
    const activePos = this.player.currentVehicle
      ? this.player.currentVehicle.position
      : this.player.position;
    this.sceneManager.atmosphere.update(gameClock.timeOfDay, activePos, weather);

    // Frame-rate measurement
    this.frameCounter++;
    this.fpsTimer += delta;
    if (this.fpsTimer >= 0.5) {
      this.currentFps = Math.round((this.frameCounter / this.fpsTimer));
      this.frameCounter = 0;
      this.fpsTimer = 0;
    }

    // Render 3D Scene
    const renderInfo = this.sceneManager.render();

    // Sync Store & Emit Throttled Telemetry Snapshot
    this.syncStore(renderInfo);

    // Flush single-frame input edges
    inputManager.flush();
  }

  private fixedUpdate(dt: number): void {
    const activePos = this.player.currentVehicle
      ? this.player.currentVehicle.position
      : this.player.position;

    // 1. STREAMING CELL UPDATES
    this.streamer.update(activePos);

    // 2. VEHICLE INTERACTION (ENTER / EXIT)
    if (inputManager.state.interactPressed) {
      this.vehicleManager.togglePlayerVehicle(this.player.position, this.streamer.allColliders);
    }

    // 3. VEHICLE CONTROLLER
    const targetAimAngle = this.player.camera.azimuth + Math.PI;
    this.vehicleManager.update(
      inputManager.state,
      dt,
      this.sceneManager.particles,
      this.streamer.allColliders,
      activePos,
      targetAimAngle
    );

    // Sync vehicle mounted state
    if (this.vehicleManager.playerVehicle !== this.player.currentVehicle) {
      this.player.currentVehicle = this.vehicleManager.playerVehicle;
    }

    // 4. PLAYER PHYSICS (Rapier Authoritative)
    this.player.update(inputManager.state, dt, this.streamer);

    // 5. NPC CROWD / AI
    const isGunfire = inputManager.state.fire;
    this.npcManager.update(dt, this.player.position, isGunfire);

    // 6. COMBAT / PROJECTILES
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

    // 7. LAW / DISPATCH
    this.wantedSystem.update(dt, this.player.position, this.vehicleManager);

    // 8. MISSIONS
    this.missionManager.update(dt, this.player, this.wantedSystem, this.roadNetwork);

    // GPS Routing
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

    // 9. RAPIER PHYSICS STEP
    this.physicsWorld?.step();
  }

  private syncStore(renderInfo: { drawCalls: number; triangles: number }): void {
    const curWeapon = this.player.getActiveWeapon();
    const district = CANONICAL_DISTRICTS.find(d => d.id === this.streamer.currentDistrictId);

    const pos = this.player.currentVehicle
      ? this.player.currentVehicle.position
      : this.player.position;
    const heading = this.player.currentVehicle
      ? this.player.currentVehicle.rotationY
      : this.player.facingAngle;

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

    const snapshot: TelemetryData = {
      playerCoords: [pos.x, pos.y, pos.z],
      playerHeading: heading,
      activeVehicle: this.player.currentVehicle
        ? {
            id: this.player.currentVehicle.id,
            name: this.player.currentVehicle.def.name,
            speed: this.player.currentVehicle.speed,
            health: this.player.currentVehicle.health
          }
        : null,
      fps: this.currentFps,
      drawCalls: renderInfo.drawCalls,
      triangles: renderInfo.triangles,
      activeCellCount: this.streamer.getActiveSectorIds().length
    };
    this.emitSnapshot(snapshot);
  }

  public dispose(): void {
    this.stop();
    inputManager.detach();
    this.player.dispose();
    this.vehicleManager.dispose();
    this.npcManager.dispose();
    this.combatSystem.dispose();
    this.wantedSystem.dispose();
    this.missionManager.dispose();
    this.roadNetwork.dispose();
    this.streamer.dispose();
    this.colliderManager?.clear();
    this.physicsWorld?.dispose();
    this.navMeshService?.dispose();
    soundEngine.dispose();
    this.sceneManager.dispose();
  }
}

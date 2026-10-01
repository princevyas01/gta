import * as THREE from 'three';
import { getVehicleDef } from '../data/vehicles';
import { VehicleFactory } from './vehicleFactory';
import { VehicleInstance } from './vehicleController';
import { ParticleSystem } from '../rendering/particles';
import { StaticCollider } from '../world/sectorBuilder';
import { InputState } from '../core/input';
import { soundEngine } from '../core/audio';
import { distance2D } from '../core/math';
import { eventBus } from '../core/events';

export class VehicleManager {
  private scene: THREE.Scene;
  public readonly vehicles: VehicleInstance[] = [];
  public playerVehicle: VehicleInstance | null = null;
  private interactLatch = false;
  private instanceCounter = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.spawnVerticalSliceFleet();
  }

  private spawnVerticalSliceFleet(): void {
    // Player's starter owned vehicle
    this.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(400, 0, 50), 0, {
      owned: true,
      spawnKind: 'owned'
    });
    this.spawnVehicle('veh_aurelia_regent', new THREE.Vector3(20, 0, 30), Math.PI / 2, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_redwood_250', new THREE.Vector3(-40, 0, -40), Math.PI, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_courier_l4', new THREE.Vector3(80, 0, -60), 0, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_mica_hatch', new THREE.Vector3(-80, 0, 80), -Math.PI / 2, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_kite_600', new THREE.Vector3(15, 0, -20), 0, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_hx4_sparrow', new THREE.Vector3(60, 0, 120), 0, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_ar7_mastiff', new THREE.Vector3(-120, 0, 160), Math.PI / 4, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_tiderunner_24', new THREE.Vector3(820, 0, 420), 0, { spawnKind: 'ambient' });
    this.spawnVehicle('veh_amps_cruiser', new THREE.Vector3(70, 0, 340), 0, { spawnKind: 'ambient' });
  }

  public spawnVehicle(
    defId: string,
    pos: THREE.Vector3,
    rotY = 0,
    options?: { owned?: boolean; spawnKind?: 'owned' | 'ambient' | 'police' | 'mission'; id?: string }
  ): VehicleInstance {
    const def = getVehicleDef(defId);
    const model = VehicleFactory.createVehicleModel(def);
    this.scene.add(model.group);

    const instanceId = options?.id ?? `vehinst_${String(++this.instanceCounter).padStart(6, '0')}`;
    const instance = new VehicleInstance(def, model, pos, rotY, instanceId, {
      owned: options?.owned ?? false,
      spawnKind: options?.spawnKind ?? 'ambient'
    });
    this.vehicles.push(instance);
    return instance;
  }

  public spawnPolicePursuitUnit(nearPos: THREE.Vector3): VehicleInstance {
    const angle = Math.random() * Math.PI * 2;
    const spawnPos = new THREE.Vector3(
      nearPos.x + Math.cos(angle) * 65,
      nearPos.y,
      nearPos.z + Math.sin(angle) * 65
    );
    const unit = this.spawnVehicle('veh_amps_cruiser', spawnPos, angle, {
      owned: false,
      spawnKind: 'police'
    });
    unit.speed = 18;
    return unit;
  }

  public despawnPursuitUnits(): void {
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      if (v.spawnKind === 'police') {
        if (v === this.playerVehicle) this.playerVehicle = null;
        this.scene.remove(v.mesh);
        v.dispose();
        this.vehicles.splice(i, 1);
      }
    }
  }

  public update(
    input: InputState,
    dt: number,
    particles: ParticleSystem,
    colliders: StaticCollider[],
    playerPos: THREE.Vector3,
    targetAimAngle?: number
  ): void {
    const pressedInteract = input.interact && !this.interactLatch;
    this.interactLatch = input.interact;

    if (pressedInteract) {
      this.togglePlayerVehicle(playerPos, colliders);
    }

    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const vehicle = this.vehicles[i];
      if (vehicle.isDestroyed) {
        if (vehicle === this.playerVehicle) this.playerVehicle = null;
        this.scene.remove(vehicle.mesh);
        vehicle.dispose();
        this.vehicles.splice(i, 1);
        continue;
      }

      vehicle.update(
        vehicle === this.playerVehicle ? input : null,
        dt,
        particles,
        colliders,
        targetAimAngle
      );
    }
  }

  public togglePlayerVehicle(playerPos: THREE.Vector3, colliders: StaticCollider[] = []): boolean {
    if (this.playerVehicle) {
      const vehicle = this.playerVehicle;
      const exitPos = vehicle.getSafeExitPosition(colliders);
      vehicle.isPlayerControlled = false;
      this.playerVehicle = null;
      soundEngine.stopVehicleEngine();
      eventBus.emit('VEHICLE_EXIT', {
        position: [exitPos.x, exitPos.y, exitPos.z]
      });
      return false;
    }

    let nearest: VehicleInstance | null = null;
    let minDist = 3.8;

    for (const vehicle of this.vehicles) {
      if (vehicle.isDestroyed) continue;
      const d = distance2D(
        playerPos.x,
        playerPos.z,
        vehicle.position.x,
        vehicle.position.z
      );
      if (d < minDist) {
        minDist = d;
        nearest = vehicle;
      }
    }

    if (!nearest) return false;

    this.playerVehicle = nearest;
    nearest.isPlayerControlled = true;
    soundEngine.startVehicleEngine();
    eventBus.emit('VEHICLE_ENTER', {
      id: nearest.id,
      definitionId: nearest.def.id,
      owned: nearest.owned,
      spawnKind: nearest.spawnKind,
      position: [nearest.position.x, nearest.position.y, nearest.position.z],
      rotationY: nearest.rotationY,
      speed: nearest.speed,
      health: nearest.health,
      isDestroyed: nearest.isDestroyed
    });
    return true;
  }

  public getOwnedVehicles() {
    return this.vehicles
      .filter(v => v.owned && !v.isDestroyed)
      .map(v => ({
        id: v.id,
        definitionId: v.def.id,
        owned: true,
        spawnKind: v.spawnKind,
        position: [v.position.x, v.position.y, v.position.z] as [number, number, number],
        rotationY: v.rotationY,
        speed: v.speed,
        health: v.health,
        isDestroyed: v.isDestroyed
      }));
  }

  public getOwnedVehicleIds(): string[] {
    return this.vehicles
      .filter(v => v.owned && !v.isDestroyed)
      .map(v => v.def.id);
  }

  public dispose(): void {
    for (const vehicle of this.vehicles) {
      this.scene.remove(vehicle.mesh);
      vehicle.dispose();
    }
    this.vehicles.length = 0;
    this.playerVehicle = null;
  }
}

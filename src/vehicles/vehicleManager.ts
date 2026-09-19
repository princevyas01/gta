import * as THREE from 'three';
import { CANONICAL_VEHICLES, getVehicleDef } from '../data/vehicles';
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
  public vehicles: VehicleInstance[] = [];
  public playerVehicle: VehicleInstance | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.spawnVerticalSliceFleet();
  }

  /**
   * Spawns canonical showcase vehicles across Meridian and Aurelio Central
   */
  private spawnVerticalSliceFleet(): void {
    // 1. Red VX-9 Kestrel Sports Coupe (Parked near Meridian Financial Plaza)
    this.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(400, 0, 50), 0);

    // 2. Aurelia Regent Sedan (Parked on Aurelio Central Avenue)
    this.spawnVehicle('veh_aurelia_regent', new THREE.Vector3(20, 0, 30), Math.PI / 2);

    // 3. Redwood 250 Utility Pickup
    this.spawnVehicle('veh_redwood_250', new THREE.Vector3(-40, 0, -40), Math.PI);

    // 4. Courier L4 Panel Van
    this.spawnVehicle('veh_courier_l4', new THREE.Vector3(80, 0, -60), 0);

    // 5. Mica Hatch Compact
    this.spawnVehicle('veh_mica_hatch', new THREE.Vector3(-80, 0, 80), -Math.PI / 2);

    // 6. Kite 600 Motorbike
    this.spawnVehicle('veh_kite_600', new THREE.Vector3(15, 0, -20), 0);

    // 7. HX-4 Sparrow Helicopter (Parked on Aurelio Tower Sky Helipad or Plaza)
    this.spawnVehicle('veh_hx4_sparrow', new THREE.Vector3(60, 0, 120), 0);

    // 8. AR-7 Mastiff Light Tank (Secured at military gate / industrial staging)
    this.spawnVehicle('veh_ar7_mastiff', new THREE.Vector3(-120, 0, 160), Math.PI / 4);

    // 9. TideRunner 24 Speed Boat (Berth at Harborview Marina)
    this.spawnVehicle('veh_tiderunner_24', new THREE.Vector3(820, 0, 420), 0);

    // 10. AMPS Police Interceptor Cruiser
    this.spawnVehicle('veh_amps_cruiser', new THREE.Vector3(70, 0, 340), 0);
  }

  public spawnVehicle(defId: string, pos: THREE.Vector3, rotY: number = 0): VehicleInstance {
    const def = getVehicleDef(defId);
    const model = VehicleFactory.createVehicleModel(def);
    this.scene.add(model.group);

    const instance = new VehicleInstance(def, model, pos, rotY);
    this.vehicles.push(instance);
    return instance;
  }

  /**
   * Spawns an AMPS Police Cruiser for pursuit
   */
  public spawnPolicePursuitUnit(nearPos: THREE.Vector3): VehicleInstance {
    // Spawn roughly 60m away on road
    const angle = Math.random() * Math.PI * 2;
    const spawnPos = new THREE.Vector3(
      nearPos.x + Math.cos(angle) * 65,
      0,
      nearPos.z + Math.sin(angle) * 65
    );
    const unit = this.spawnVehicle('veh_amps_cruiser', spawnPos, angle);
    unit.speed = 18;
    return unit;
  }

  public update(
    input: InputState,
    dt: number,
    particles: ParticleSystem,
    colliders: StaticCollider[],
    playerPos: THREE.Vector3,
    targetAimAngle?: number
  ): void {
    // Check vehicle enter / exit toggle (E or F key)
    if (input.interact) {
      this.togglePlayerVehicle(playerPos);
    }

    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      if (v === this.playerVehicle) {
        v.update(input, dt, particles, colliders, targetAimAngle);
      } else {
        // AI vehicle or parked
        v.update(null, dt, particles, colliders);
      }
    }
  }

  /**
   * Toggles mounting or dismounting the nearest vehicle
   */
  public togglePlayerVehicle(playerPos: THREE.Vector3): boolean {
    if (this.playerVehicle) {
      // Dismount vehicle
      const exitPos = this.playerVehicle.position.clone().add(
        new THREE.Vector3(this.playerVehicle.def.dimensions.width * 0.8, 0, 0).applyAxisAngle(
          new THREE.Vector3(0, 1, 0),
          this.playerVehicle.rotationY
        )
      );
      this.playerVehicle.isPlayerControlled = false;
      this.playerVehicle = null;
      soundEngine.stopVehicleEngine();
      eventBus.emit('VEHICLE_EXIT', exitPos);
      return false;
    }

    // Find nearest accessible vehicle within 3.8 meters
    let nearest: VehicleInstance | null = null;
    let minDist = 3.8;

    for (const v of this.vehicles) {
      if (v.isDestroyed) continue;
      const d = distance2D(playerPos.x, playerPos.z, v.position.x, v.position.z);
      if (d < minDist) {
        minDist = d;
        nearest = v;
      }
    }

    if (nearest) {
      this.playerVehicle = nearest;
      nearest.isPlayerControlled = true;
      soundEngine.startVehicleEngine();
      eventBus.emit('VEHICLE_ENTER', nearest);
      return true;
    }

    return false;
  }
}

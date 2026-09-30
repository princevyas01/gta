import * as THREE from 'three';
import { WantedLevel } from '../core/types';
import { VehicleManager } from '../vehicles/vehicleManager';
import { soundEngine } from '../core/audio';
import { eventBus } from '../core/events';
import { distance2D } from '../core/math';
import type { VehicleInstance } from '../vehicles/vehicleController';

export class WantedSystem {
  public heat: WantedLevel = 0;
  public readonly lastKnownPosition = new THREE.Vector3();
  public searchRadius = 0;
  public isCoolingDown = false;
  public cooldownTimer = 0;
  private spawnCooldown = 0;
  private readonly activePursuits = new Set<VehicleInstance>();
  private readonly unsubscribers: Array<() => void> = [];

  constructor() {
    this.unsubscribers.push(
      eventBus.on('WEAPON_FIRED', () => this.addCrimeWeight(1)),
      eventBus.on('WITNESS_EVENT', data => {
        this.lastKnownPosition.set(data.position[0], data.position[1], data.position[2]);
        this.addCrimeWeight(data.severity);
      }),
      eventBus.on('COMBAT_HIT', data => {
        if (data.target === 'npc') this.addCrimeWeight(4);
        if (data.target === 'vehicle') this.addCrimeWeight(2);
      }),
      eventBus.on('NPC_KILLED', () => this.addCrimeWeight(6))
    );
  }

  public setHeat(level: WantedLevel): void {
    const previous = this.heat;
    this.heat = level;
    if (level > 0) {
      this.searchRadius = 75 + level * 35;
      this.cooldownTimer = 15 + level * 3;
      this.isCoolingDown = false;
      soundEngine.setPoliceSiren(true);
    } else {
      this.searchRadius = 0;
      this.cooldownTimer = 0;
      this.isCoolingDown = false;
      soundEngine.setPoliceSiren(false);
      this.activePursuits.clear();
    }
    if (previous !== level) {
      eventBus.emit('HEAT_CHANGED', level);
    }
  }

  public addCrimeWeight(weight: number): void {
    if (weight <= 0) return;
    const target = Math.min(5, this.heat + (weight >= 6 ? 2 : 1)) as WantedLevel;
    this.setHeat(Math.max(1, target) as WantedLevel);
  }

  public registerPursuit(unit: VehicleInstance): void {
    this.activePursuits.add(unit);
  }

  public update(dt: number, playerPos: THREE.Vector3, vehicleMgr: VehicleManager): void {
    if (this.heat === 0) return;

    const distToLKP = distance2D(
      playerPos.x,
      playerPos.z,
      this.lastKnownPosition.x,
      this.lastKnownPosition.z
    );

    if (distToLKP <= this.searchRadius) {
      this.isCoolingDown = false;
      this.cooldownTimer = Math.max(this.cooldownTimer, 5);
      this.lastKnownPosition.copy(playerPos);
    } else {
      this.isCoolingDown = true;
      this.cooldownTimer -= dt;
      if (this.cooldownTimer <= 0) {
        this.setHeat(0);
        soundEngine.playMissionStinger();
        return;
      }
    }

    this.spawnCooldown -= dt;
    if (this.heat >= 2 && this.spawnCooldown <= 0 && this.activePursuits.size < Math.min(5, this.heat)) {
      this.spawnCooldown = Math.max(4, 12 - this.heat);
      const unit = vehicleMgr.spawnPolicePursuitUnit(playerPos);
      this.activePursuits.add(unit);
    }

    for (const unit of this.activePursuits) {
      if (unit.isDestroyed) {
        this.activePursuits.delete(unit);
        continue;
      }
      const dx = playerPos.x - unit.position.x;
      const dz = playerPos.z - unit.position.z;
      unit.rotationY = Math.atan2(dx, dz);
      unit.speed = Math.min(
        unit.def.topSpeed * 0.85,
        unit.def.topSpeed * (0.55 + this.heat * 0.07)
      );
    }
  }

  public dispose(): void {
    for (const unsubscribe of this.unsubscribers) unsubscribe();
    this.unsubscribers.length = 0;
    this.activePursuits.clear();
  }
}

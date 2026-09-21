import * as THREE from 'three';
import { WantedLevel } from '../core/types';
import { VehicleManager } from '../vehicles/vehicleManager';
import { soundEngine } from '../core/audio';
import { eventBus } from '../core/events';
import { distance2D } from '../core/math';

export class WantedSystem {
  public heat: WantedLevel = 0;
  public lastKnownPosition: THREE.Vector3 = new THREE.Vector3();
  public searchRadius: number = 0;
  public isCoolingDown: boolean = false;
  public cooldownTimer: number = 0;

  private spawnCooldown: number = 0;
  private activePursuitCruiser: any = null;

  constructor() {
    // Listen for criminal acts
    eventBus.on('WEAPON_FIRED', () => this.addCrimeWeight(1));
    eventBus.on('WITNESS_EVENT', () => this.addCrimeWeight(2));
    eventBus.on('COMBAT_HIT', (data: any) => {
      if (data?.target === 'npc') this.addCrimeWeight(4);
      if (data?.target === 'vehicle') this.addCrimeWeight(2);
    });
    eventBus.on('NPC_KILLED', () => this.addCrimeWeight(6));
  }

  public setHeat(level: WantedLevel): void {
    const prev = this.heat;
    this.heat = level;
    if (this.heat > 0) {
      this.searchRadius = 75 + this.heat * 35;
      this.cooldownTimer = 18;
      this.isCoolingDown = false;
      soundEngine.setPoliceSiren(true);
    } else {
      this.searchRadius = 0;
      this.isCoolingDown = false;
      soundEngine.setPoliceSiren(false);
    }
    if (prev !== this.heat) {
      eventBus.emit('HEAT_CHANGED', this.heat);
    }
  }

  public addCrimeWeight(weight: number): void {
    if (this.heat === 0) {
      this.setHeat(1);
    } else if (weight >= 4 && this.heat < 5) {
      this.setHeat((this.heat + 1) as WantedLevel);
    }
  }

  public update(dt: number, playerPos: THREE.Vector3, vehicleMgr: VehicleManager): void {
    if (this.heat === 0) return;

    const distToLKP = distance2D(playerPos.x, playerPos.z, this.lastKnownPosition.x, this.lastKnownPosition.z);

    // If player is outside search radius, trigger cooldown
    if (distToLKP > this.searchRadius) {
      this.isCoolingDown = true;
      this.cooldownTimer -= dt;
      if (this.cooldownTimer <= 0) {
        // Successfully evaded police!
        this.setHeat(0);
        soundEngine.playMissionStinger();
        return;
      }
    } else {
      // Player is still inside police search radius
      this.isCoolingDown = false;
      this.cooldownTimer = 15;
      this.lastKnownPosition.copy(playerPos);
    }

    // Spawn pursuit cruiser if none active or far away
    this.spawnCooldown -= dt;
    if (this.spawnCooldown <= 0 && this.heat >= 2) {
      this.spawnCooldown = 12;
      this.activePursuitCruiser = vehicleMgr.spawnPolicePursuitUnit(playerPos);
    }

    // Steer active pursuit cruiser toward player
    if (this.activePursuitCruiser && !this.activePursuitCruiser.isDestroyed) {
      const dirX = playerPos.x - this.activePursuitCruiser.position.x;
      const dirZ = playerPos.z - this.activePursuitCruiser.position.z;
      const targetAngle = Math.atan2(dirX, dirZ);
      this.activePursuitCruiser.rotationY = targetAngle;
      this.activePursuitCruiser.speed = Math.min(28, this.activePursuitCruiser.def.topSpeed * 0.85);
    }
  }
}

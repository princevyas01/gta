import * as THREE from 'three';
import { PlayerController } from '../player/playerController';
import { VehicleManager } from '../vehicles/vehicleManager';
import { ParticleSystem } from '../rendering/particles';
import { soundEngine } from '../core/audio';
import { InputState } from '../core/input';
import { eventBus } from '../core/events';
import { distance3D } from '../core/math';
import { WeaponDefinition, InventoryItem } from '../core/types';
import type { VehicleInstance } from '../vehicles/vehicleController';

interface ActiveRocket {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
}

export class CombatSystem {
  private scene: THREE.Scene;
  private fireTimer = 0;
  private isReloading = false;
  private reloadTimer = 0;
  private fireLatch = false;
  private activeRockets: ActiveRocket[] = [];

  // Pooled scratch objects
  private readonly fireRay = new THREE.Ray();
  private readonly muzzleScratch = new THREE.Vector3();
  private readonly muzzleOffset = new THREE.Vector3(0, 1.4, 0);
  private readonly aimScratch = new THREE.Vector3();
  private readonly targetCenter = new THREE.Vector3();
  private readonly targetSphere = new THREE.Sphere(new THREE.Vector3(), 0);
  private readonly hitPoint = new THREE.Vector3();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public update(
    input: InputState,
    dt: number,
    player: PlayerController,
    vehicleMgr: VehicleManager,
    particles: ParticleSystem,
    npcTargets: { id?: string; position: THREE.Vector3; takeDamage: (dmg: number) => void; isDead: boolean }[] = []
  ): void {
    const { def, item } = player.getActiveWeapon();

    // Reload handling
    if (this.isReloading) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) {
        this.isReloading = false;
        const needed = def.magazineSize - item.ammo;
        const toLoad = Math.min(needed, item.reserveAmmo);
        item.ammo += toLoad;
        item.reserveAmmo -= toLoad;
        eventBus.emit('WEAPON_RELOADED', item);
      }
    } else if (input.reload && item.ammo < def.magazineSize && item.reserveAmmo > 0) {
      this.startReload(def.reloadTime);
    }

    // Firing cooldown
    this.fireTimer -= dt;

    // Semi-auto weapons fire only on the press edge. Automatic weapons may repeat.
    const shouldFire = def.automatic
      ? input.fire
      : input.fire && !this.fireLatch;
    this.fireLatch = input.fire;

    if (shouldFire && this.fireTimer <= 0 && !this.isReloading) {
      if (item.ammo > 0) {
        this.fireWeapon(def, item, player, vehicleMgr, particles, npcTargets);
        this.fireTimer = 1 / def.fireRate;
      } else if (item.reserveAmmo > 0) {
        this.startReload(def.reloadTime);
      }
    }

    // Update active launcher rockets
    for (let i = this.activeRockets.length - 1; i >= 0; i--) {
      const rocket = this.activeRockets[i];
      rocket.life -= dt;
      rocket.position.addScaledVector(rocket.velocity, dt);

      // Rocket trail smoke
      particles.emitTireSmoke(rocket.position);

      // Check ground or target proximity
      let exploded = rocket.life <= 0 || rocket.position.y <= 0.2;

      // Check vehicle hits
      for (const v of vehicleMgr.vehicles) {
        if (!v.isDestroyed && distance3D([rocket.position.x, rocket.position.y, rocket.position.z], [v.position.x, v.position.y, v.position.z]) < 3.5) {
          v.takeDamage(def.damage, particles);
          exploded = true;
          break;
        }
      }

      // Check NPC hits
      for (const npc of npcTargets) {
        if (!npc.isDead && distance3D([rocket.position.x, rocket.position.y, rocket.position.z], [npc.position.x, npc.position.y, npc.position.z]) < 4.0) {
          npc.takeDamage(def.damage);
          exploded = true;
        }
      }

      if (exploded) {
        particles.emitExplosion(rocket.position);
        soundEngine.playGunshot('launcher');
        this.activeRockets.splice(i, 1);
      }
    }
  }

  private startReload(reloadDuration: number): void {
    this.isReloading = true;
    this.reloadTimer = reloadDuration;
    soundEngine.playReload();
  }

  private fireWeapon(
    def: WeaponDefinition,
    item: InventoryItem,
    player: PlayerController,
    vehicleMgr: VehicleManager,
    particles: ParticleSystem,
    npcTargets: { id?: string; position: THREE.Vector3; takeDamage: (dmg: number) => void; isDead: boolean }[]
  ): void {
    item.ammo--;
    soundEngine.playGunshot(def.class);

    const muzzlePos = this.muzzleScratch.copy(player.position).add(this.muzzleOffset);
    const aimDir = this.aimScratch;
    player.camera.camera.getWorldDirection(aimDir);

    aimDir.x += (Math.random() - 0.5) * def.spread;
    aimDir.y += (Math.random() - 0.5) * def.spread;
    aimDir.z += (Math.random() - 0.5) * def.spread;
    aimDir.normalize();

    particles.emitMuzzleFlash(muzzlePos, aimDir);

    if (def.class === 'launcher') {
      this.activeRockets.push({
        position: muzzlePos.clone(),
        velocity: aimDir.clone().multiplyScalar(45),
        life: 3.5
      });
      eventBus.emit('WEAPON_FIRED', {
        weaponId: def.id,
        ammoLeft: item.ammo
      });
      return;
    }

    const ray = this.fireRay;
    ray.origin.copy(muzzlePos);
    ray.direction.copy(aimDir);

    type HitCandidate = {
      distance: number;
      kind: 'vehicle' | 'npc';
      vehicle?: VehicleInstance;
      npc?: { id?: string; takeDamage: (dmg: number) => void };
      point: THREE.Vector3;
    };

    let nearest: HitCandidate | null = null;

    for (const vehicle of vehicleMgr.vehicles) {
      if (vehicle.isDestroyed) continue;
      this.targetCenter.copy(vehicle.position);
      this.targetCenter.y += 1;
      this.targetSphere.center.copy(this.targetCenter);
      this.targetSphere.radius = Math.max(0.6, vehicle.def.dimensions.width * 0.5);

      const hit = ray.intersectSphere(this.targetSphere, this.hitPoint);
      if (!hit) continue;

      const distance = muzzlePos.distanceTo(hit);
      if (distance > def.range) continue;

      if (!nearest || distance < nearest.distance) {
        nearest = {
          distance,
          kind: 'vehicle',
          vehicle,
          point: this.hitPoint.clone()
        };
      }
    }

    for (const npc of npcTargets) {
      if (npc.isDead) continue;
      this.targetCenter.copy(npc.position);
      this.targetCenter.y += 1;
      this.targetSphere.center.copy(this.targetCenter);
      this.targetSphere.radius = 0.6;

      const hit = ray.intersectSphere(this.targetSphere, this.hitPoint);
      if (!hit) continue;

      const distance = muzzlePos.distanceTo(hit);
      if (distance > def.range) continue;

      if (!nearest || distance < nearest.distance) {
        nearest = {
          distance,
          kind: 'npc',
          npc,
          point: this.hitPoint.clone()
        };
      }
    }

    if (nearest) {
      if (nearest.kind === 'vehicle' && nearest.vehicle) {
        nearest.vehicle.takeDamage(def.damage, particles);
        particles.emitExplosion(nearest.point);
        eventBus.emit('COMBAT_HIT', {
          target: 'vehicle',
          id: nearest.vehicle.def.id,
          damage: def.damage
        });
      } else if (nearest.kind === 'npc' && nearest.npc) {
        nearest.npc.takeDamage(def.damage);
        eventBus.emit('COMBAT_HIT', {
          target: 'npc',
          id: nearest.npc.id,
          damage: def.damage
        });
      }
    }

    eventBus.emit('WEAPON_FIRED', {
      weaponId: def.id,
      ammoLeft: item.ammo
    });
  }

  public dispose(): void {
    this.activeRockets.length = 0;
    this.fireTimer = 0;
    this.isReloading = false;
    this.reloadTimer = 0;
    this.fireLatch = false;
  }
}

import * as THREE from 'three';
import { PlayerController } from '../player/playerController';
import { VehicleManager } from '../vehicles/vehicleManager';
import { ParticleSystem } from '../rendering/particles';
import { soundEngine } from '../core/audio';
import { InputState } from '../core/input';
import { eventBus } from '../core/events';
import { WeaponDefinition, InventoryItem } from '../core/types';
import type { VehicleInstance } from '../vehicles/vehicleController';
import type { PhysicsWorld } from '../physics/physicsWorld';
import { getHitDirection, HitDirection } from './hitReactionTypes';

export interface ActiveRocket {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  weaponId: string;
  damage: number;
}

export class CombatSystem {
  private scene: THREE.Scene;
  private physicsWorld: PhysicsWorld | null = null;
  private fireTimer = 0;
  private isReloading = false;
  private reloadTimer = 0;
  private fireLatch = false;
  public activeRockets: ActiveRocket[] = [];

  // Pooled scratch objects
  private readonly fireRay = new THREE.Ray();
  private readonly muzzleScratch = new THREE.Vector3();
  private readonly muzzleOffset = new THREE.Vector3(0, 1.4, 0);
  private readonly aimScratch = new THREE.Vector3();
  private readonly targetCenter = new THREE.Vector3();
  private readonly targetSphere = new THREE.Sphere(new THREE.Vector3(), 0);
  private readonly hitPoint = new THREE.Vector3();
  private readonly impactPosScratch = new THREE.Vector3();

  constructor(scene: THREE.Scene, physicsWorld?: PhysicsWorld | null) {
    this.scene = scene;
    if (physicsWorld) this.physicsWorld = physicsWorld;
  }

  public setPhysicsWorld(pw: PhysicsWorld | null): void {
    this.physicsWorld = pw;
  }

  public update(
    input: InputState,
    dt: number,
    player: PlayerController,
    vehicleMgr: VehicleManager,
    particles: ParticleSystem,
    npcTargets: {
      id?: string;
      position: THREE.Vector3;
      takeDamage: (dmg: number, dir?: HitDirection) => void;
      isDead: boolean;
    }[] = []
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

    // Update active launcher rockets using launch-time damage (P0 Combat fix)
    for (let i = this.activeRockets.length - 1; i >= 0; i--) {
      const rocket = this.activeRockets[i];
      rocket.life -= dt;
      rocket.position.addScaledVector(rocket.velocity, dt);

      // Rocket trail smoke
      particles.emitTireSmoke(rocket.position);

      // Check ground or target proximity
      let exploded = rocket.life <= 0 || rocket.position.y <= 0.2;

      // Check vehicle hits with squared distance
      const rPos = rocket.position;
      for (let vIdx = 0; vIdx < vehicleMgr.vehicles.length; vIdx++) {
        const v = vehicleMgr.vehicles[vIdx];
        if (!v.isDestroyed) {
          const dx = rPos.x - v.position.x;
          const dy = rPos.y - v.position.y;
          const dz = rPos.z - v.position.z;
          if (dx * dx + dy * dy + dz * dz < 3.5 * 3.5) {
            v.takeDamage(rocket.damage, particles);
            exploded = true;
            break;
          }
        }
      }

      // Check NPC hits with squared distance
      for (let nIdx = 0; nIdx < npcTargets.length; nIdx++) {
        const npc = npcTargets[nIdx];
        if (!npc.isDead) {
          const dx = rPos.x - npc.position.x;
          const dy = rPos.y - npc.position.y;
          const dz = rPos.z - npc.position.z;
          if (dx * dx + dy * dy + dz * dz < 4.0 * 4.0) {
            npc.takeDamage(rocket.damage, 'front');
            exploded = true;
            break;
          }
        }
      }

      if (exploded) {
        particles.emitExplosion(rocket.position);
        player.camera.addShake(0.85); // Explosion camera shake
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
    npcTargets: {
      id?: string;
      position: THREE.Vector3;
      takeDamage: (dmg: number, dir?: HitDirection) => void;
      isDead: boolean;
    }[]
  ): void {
    item.ammo--;
    soundEngine.playGunshot(def.class);

    // Weapon Recoil & Camera Kick (Pages 43, 52)
    player.model.triggerRecoil(def.recoil || 1.0);
    const kickAmount = def.class === 'shotgun' ? 0.32 : def.class === 'launcher' ? 0.45 : 0.14;
    player.camera.addShake(kickAmount);

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
        life: 3.5,
        weaponId: def.id,
        damage: def.damage
      });
      eventBus.emit('WEAPON_FIRED', {
        weaponId: def.id,
        ammoLeft: item.ammo
      });
      return;
    }

    // 1. Raycast world geometry first to get occlusion distance (P0 Line-of-sight fix)
    let occlusionDistance = def.range;
    if (this.physicsWorld) {
      const worldHit = this.physicsWorld.castRay(
        { x: muzzlePos.x, y: muzzlePos.y, z: muzzlePos.z },
        { x: aimDir.x, y: aimDir.y, z: aimDir.z },
        def.range,
        true
      );
      if (worldHit && worldHit.hit) {
        occlusionDistance = worldHit.toi;
      }
    }

    const ray = this.fireRay;
    ray.origin.copy(muzzlePos);
    ray.direction.copy(aimDir);

    type HitCandidate = {
      distance: number;
      kind: 'vehicle' | 'npc';
      vehicle?: VehicleInstance;
      npc?: { id?: string; position: THREE.Vector3; takeDamage: (dmg: number, dir?: HitDirection) => void };
      point: THREE.Vector3;
    };

    let nearest: HitCandidate | null = null;

    // Check vehicle hits strictly up to occlusion distance
    for (let i = 0; i < vehicleMgr.vehicles.length; i++) {
      const vehicle = vehicleMgr.vehicles[i];
      if (vehicle.isDestroyed) continue;
      this.targetCenter.copy(vehicle.position);
      this.targetCenter.y += 1;
      this.targetSphere.center.copy(this.targetCenter);
      this.targetSphere.radius = Math.max(0.6, vehicle.def.dimensions.width * 0.5);

      const hit = ray.intersectSphere(this.targetSphere, this.hitPoint);
      if (!hit) continue;

      const distance = muzzlePos.distanceTo(hit);
      if (distance > occlusionDistance) continue; // Occluded by wall/world

      if (!nearest || distance < nearest.distance) {
        nearest = {
          distance,
          kind: 'vehicle',
          vehicle,
          point: this.hitPoint.clone()
        };
      }
    }

    // Check NPC hits strictly up to occlusion distance
    for (let i = 0; i < npcTargets.length; i++) {
      const npc = npcTargets[i];
      if (npc.isDead) continue;
      this.targetCenter.copy(npc.position);
      this.targetCenter.y += 1;
      this.targetSphere.center.copy(this.targetCenter);
      this.targetSphere.radius = 0.6;

      const hit = ray.intersectSphere(this.targetSphere, this.hitPoint);
      if (!hit) continue;

      const distance = muzzlePos.distanceTo(hit);
      if (distance > occlusionDistance) continue; // Occluded by wall/world

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
        particles.emitSurfaceImpact(nearest.point, 'metal');
        eventBus.emit('COMBAT_HIT', {
          target: 'vehicle',
          id: nearest.vehicle.id,
          damage: def.damage
        });
      } else if (nearest.kind === 'npc' && nearest.npc) {
        const forward = { x: Math.sin(player.facingAngle), z: Math.cos(player.facingAngle) };
        const hitDir = getHitDirection(
          forward,
          { x: nearest.point.x, z: nearest.point.z },
          { x: nearest.npc.position.x, z: nearest.npc.position.z }
        );
        nearest.npc.takeDamage(def.damage, hitDir);
        particles.emitBulletSpark(nearest.point);
        eventBus.emit('COMBAT_HIT', {
          target: 'npc',
          id: nearest.npc.id,
          damage: def.damage
        });
      }
    } else if (occlusionDistance < def.range) {
      // Impact on world wall / obstacle with surface particle reaction (Page 53)
      this.impactPosScratch.copy(muzzlePos).addScaledVector(aimDir, occlusionDistance);
      particles.emitSurfaceImpact(this.impactPosScratch, 'concrete');
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
    this.physicsWorld = null;
  }
}

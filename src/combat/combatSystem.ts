import * as THREE from 'three';
import { PlayerController } from '../player/playerController';
import { VehicleManager } from '../vehicles/vehicleManager';
import { ParticleSystem } from '../rendering/particles';
import { soundEngine } from '../core/audio';
import { InputState } from '../core/input';
import { eventBus } from '../core/events';
import { distance3D } from '../core/math';

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
  private activeRockets: ActiveRocket[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public update(
    input: InputState,
    dt: number,
    player: PlayerController,
    vehicleMgr: VehicleManager,
    particles: ParticleSystem,
    npcTargets: { position: THREE.Vector3; takeDamage: (dmg: number) => void; isDead: boolean }[] = []
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

    // Trigger firing (Left Click)
    if (input.fire && this.fireTimer <= 0 && !this.isReloading) {
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
    def: any,
    item: any,
    player: PlayerController,
    vehicleMgr: VehicleManager,
    particles: ParticleSystem,
    npcTargets: { position: THREE.Vector3; takeDamage: (dmg: number) => void; isDead: boolean }[]
  ): void {
    item.ammo--;
    soundEngine.playGunshot(def.class);

    // Muzzle flash particle
    const muzzlePos = player.position.clone().add(new THREE.Vector3(0, 1.4, 0));
    const aimDir = new THREE.Vector3();
    player.camera.camera.getWorldDirection(aimDir);

    // Add spread inaccuracy
    aimDir.x += (Math.random() - 0.5) * def.spread;
    aimDir.y += (Math.random() - 0.5) * def.spread;
    aimDir.z += (Math.random() - 0.5) * def.spread;
    aimDir.normalize();

    particles.emitMuzzleFlash(muzzlePos, aimDir);

    // Ramjet Launcher rocket projectile
    if (def.class === 'launcher') {
      this.activeRockets.push({
        position: muzzlePos.clone(),
        velocity: aimDir.clone().multiplyScalar(45),
        life: 3.5
      });
      eventBus.emit('WEAPON_FIRED', { weapon: def, ammoLeft: item.ammo });
      return;
    }

    // Hitscan Raycast
    const ray = new THREE.Ray(muzzlePos, aimDir);

    // Check hit against Vehicles
    for (const v of vehicleMgr.vehicles) {
      if (v.isDestroyed) continue;
      const sphere = new THREE.Sphere(v.position.clone().add(new THREE.Vector3(0, 1, 0)), v.def.dimensions.width);
      const hit = ray.intersectSphere(sphere, new THREE.Vector3());
      if (hit && muzzlePos.distanceTo(hit) <= def.range) {
        v.takeDamage(def.damage, particles);
        particles.emitExplosion(hit);
        eventBus.emit('COMBAT_HIT', { target: 'vehicle', id: v.def.id });
        break;
      }
    }

    // Check hit against NPCs
    for (const npc of npcTargets) {
      if (npc.isDead) continue;
      const sphere = new THREE.Sphere(npc.position.clone().add(new THREE.Vector3(0, 1, 0)), 0.6);
      const hit = ray.intersectSphere(sphere, new THREE.Vector3());
      if (hit && muzzlePos.distanceTo(hit) <= def.range) {
        npc.takeDamage(def.damage);
        eventBus.emit('COMBAT_HIT', { target: 'npc' });
        break;
      }
    }

    eventBus.emit('WEAPON_FIRED', { weapon: def, ammoLeft: item.ammo });
  }
}

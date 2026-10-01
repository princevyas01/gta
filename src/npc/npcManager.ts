import * as THREE from 'three';
import { NPCModel, NPCArchetype } from './npcModel';
import { distance2D } from '../core/math';
import { eventBus } from '../core/events';
import { HitDirection } from '../combat/hitReactionTypes';

export interface NPCInstance {
  id: string;
  archetype: NPCArchetype;
  model: NPCModel;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  state: 'idle' | 'walk' | 'flee' | 'combat' | 'dead';
  health: number;
  isDead: boolean;
  takeDamage: (dmg: number, hitDirection?: HitDirection) => void;
}

export class NPCManager {
  private scene: THREE.Scene;
  public npcs: NPCInstance[] = [];
  private animTimer = 0;
  private readonly fleeDirScratch = new THREE.Vector3();
  private frameCount = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.spawnVerticalSlicePopulation();
  }

  private spawnVerticalSlicePopulation(): void {
    const archetypes: NPCArchetype[] = [
      'office_worker',
      'student',
      'tourist',
      'dock_worker',
      'service_worker',
      'street_vendor',
      'athlete',
      'police_officer'
    ];

    // Spawn 24 pedestrians scattered along sidewalks in central sectors
    for (let i = 0; i < 24; i++) {
      const arch = archetypes[i % archetypes.length];
      const model = new NPCModel(arch);
      this.scene.add(model.mesh);

      const angle = (i / 24) * Math.PI * 2;
      const radius = 25 + Math.random() * 45;
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
        0,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 20
      );
      model.mesh.position.copy(pos);

      const npc: NPCInstance = {
        id: `npc_${i}`,
        archetype: arch,
        model,
        position: pos,
        velocity: new THREE.Vector3(),
        state: 'walk',
        health: 100,
        isDead: false,
        takeDamage: (dmg: number, hitDirection: HitDirection = 'front') => {
          if (npc.isDead) return;
          npc.health -= dmg;
          npc.model.triggerHitReaction(hitDirection);
          if (npc.health <= 0) {
            npc.isDead = true;
            npc.state = 'dead';
            eventBus.emit('NPC_KILLED', { id: npc.id, archetype: npc.archetype });
          } else {
            npc.state = 'flee';
          }
        }
      };

      this.npcs.push(npc);
    }
  }

  public update(dt: number, playerPos: THREE.Vector3, isGunfireNear: boolean): void {
    this.animTimer += dt;
    this.frameCount++;

    for (let i = 0; i < this.npcs.length; i++) {
      const npc = this.npcs[i];
      if (npc.isDead) {
        npc.model.animate(0, this.animTimer, true);
        continue;
      }

      const distToPlayer = distance2D(npc.position.x, npc.position.z, playerPos.x, playerPos.z);

      // Distance LOD tick throttling (Page 107)
      if (distToPlayer > 120 && (this.frameCount + i) % 3 !== 0) {
        continue;
      }

      // React to gunfire or close danger by fleeing
      if (isGunfireNear && distToPlayer < 45 && npc.state !== 'flee') {
        npc.state = 'flee';
        eventBus.emit('WITNESS_EVENT', {
          position: [npc.position.x, npc.position.y, npc.position.z],
          severity: 2
        });
      }

      if (npc.state === 'flee') {
        // Run away from player using pooled scratch vector
        this.fleeDirScratch.subVectors(npc.position, playerPos).setY(0);
        if (this.fleeDirScratch.lengthSq() > 1e-4) {
          this.fleeDirScratch.normalize();
        }
        npc.velocity.copy(this.fleeDirScratch).multiplyScalar(5.5);
      } else if (npc.state === 'walk') {
        // Ambient wandering along sidewalks
        if (Math.random() < 0.02) {
          const wanderAngle = Math.random() * Math.PI * 2;
          npc.velocity.set(Math.cos(wanderAngle) * 1.8, 0, Math.sin(wanderAngle) * 1.8);
        }
      }

      // Position step
      npc.position.addScaledVector(npc.velocity, dt);
      npc.model.mesh.position.copy(npc.position);

      if (npc.velocity.lengthSq() > 0.01) {
        npc.model.mesh.rotation.y = Math.atan2(npc.velocity.x, npc.velocity.z);
      }

      const speed = Math.hypot(npc.velocity.x, npc.velocity.z);
      npc.model.animate(speed, this.animTimer, false);
    }
  }

  public dispose(): void {
    for (const npc of this.npcs) {
      this.scene.remove(npc.model.mesh);
      npc.model.dispose();
    }
    this.npcs.length = 0;
  }
}

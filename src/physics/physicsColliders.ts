import * as RAPIER from '@dimforge/rapier3d-compat';
import { PhysicsWorld } from './physicsWorld';
import { StaticCollider } from '../world/sectorBuilder';

export interface SectorPhysicsHandle {
  sectorId: string;
  colliders: RAPIER.Collider[];
}

export class PhysicsColliderManager {
  private readonly physicsWorld: PhysicsWorld;
  private readonly physicsBySector = new Map<string, SectorPhysicsHandle>();

  constructor(physicsWorld: PhysicsWorld) {
    this.physicsWorld = physicsWorld;
  }

  public registerSectorColliders(sectorId: string, colliderDefs: StaticCollider[]): void {
    if (this.physicsBySector.has(sectorId)) {
      this.unregisterSectorColliders(sectorId);
    }

    const colliders: RAPIER.Collider[] = [];

    for (const def of colliderDefs) {
      const halfX = (def.box.max.x - def.box.min.x) / 2;
      const halfY = (def.box.max.y - def.box.min.y) / 2;
      const halfZ = (def.box.max.z - def.box.min.z) / 2;

      const posX = def.box.min.x + halfX;
      const posY = def.box.min.y + halfY;
      const posZ = def.box.min.z + halfZ;

      if (halfX > 0 && halfY > 0 && halfZ > 0) {
        const collider = this.physicsWorld.createStaticCuboid(halfX, halfY, halfZ, posX, posY, posZ);
        colliders.push(collider);
      }
    }

    this.physicsBySector.set(sectorId, { sectorId, colliders });
  }

  public unregisterSectorColliders(sectorId: string): void {
    const handle = this.physicsBySector.get(sectorId);
    if (!handle) return;

    for (const collider of handle.colliders) {
      this.physicsWorld.removeCollider(collider);
    }
    this.physicsBySector.delete(sectorId);
  }

  public getSectorColliderCount(sectorId: string): number {
    return this.physicsBySector.get(sectorId)?.colliders.length ?? 0;
  }

  public getTotalCollidersCount(): number {
    let total = 0;
    for (const handle of this.physicsBySector.values()) {
      total += handle.colliders.length;
    }
    return total;
  }

  public clear(): void {
    for (const sectorId of Array.from(this.physicsBySector.keys())) {
      this.unregisterSectorColliders(sectorId);
    }
    this.physicsBySector.clear();
  }
}

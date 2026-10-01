import * as THREE from 'three';
import { CANONICAL_DISTRICTS } from '../data/districts';
import { SectorBuilder, StaticCollider } from './sectorBuilder';
import { PhysicsColliderManager } from '../physics/physicsColliders';

interface LoadedSector {
  districtId: string;
  group: THREE.Group;
  colliders: StaticCollider[];
  isHeroLOD: boolean;
  lastActiveTime: number;
}

export class WorldStreamer {
  private scene: THREE.Scene;
  private colliderManager: PhysicsColliderManager | null = null;
  private loadedSectors: Map<string, LoadedSector> = new Map();
  public allColliders: StaticCollider[] = [];
  public currentDistrictId: string = 'D01';

  // Distance thresholds
  private readonly heroRadius = 380; // Full LOD
  private readonly streamRadius = 850; // Proxy LOD
  private readonly evictionBufferTime = 4000; // 4 seconds hysteresis

  // Scratch memory & zero-allocation hot-loop tracking (Page 23)
  private readonly desiredHeroIds = new Set<string>();
  private readonly desiredProxyIds = new Set<string>();
  private colliderVersion = 0;
  private builtColliderVersion = -1;
  private readonly playerSphere = new THREE.Sphere(new THREE.Vector3(), 0);
  private readonly closestPoint = new THREE.Vector3();
  private readonly normalScratch = new THREE.Vector3();
  private readonly zeroNormal = new THREE.Vector3();

  constructor(scene: THREE.Scene, colliderManager?: PhysicsColliderManager) {
    this.scene = scene;
    if (colliderManager) this.colliderManager = colliderManager;
  }

  public setColliderManager(cm: PhysicsColliderManager | null): void {
    this.colliderManager = cm;
  }

  private markColliderTopologyDirty(): void {
    this.colliderVersion++;
  }

  public rebuildCollidersIfDirty(): void {
    if (this.builtColliderVersion === this.colliderVersion) return;
    this.allColliders.length = 0;
    for (const sector of this.loadedSectors.values()) {
      if (sector.isHeroLOD) {
        for (const collider of sector.colliders) {
          this.allColliders.push(collider);
        }
      }
    }
    this.builtColliderVersion = this.colliderVersion;
  }

  public update(playerPos: THREE.Vector3): void {
    const now = performance.now();
    this.desiredHeroIds.clear();
    this.desiredProxyIds.clear();

    let nearestId = this.currentDistrictId;
    let nearestDistanceSq = Infinity;
    const heroRadiusSq = this.heroRadius * this.heroRadius;
    const streamRadiusSq = this.streamRadius * this.streamRadius;

    // Optimized hot-path query without temporary closures (Page 23)
    for (const district of CANONICAL_DISTRICTS) {
      const dx = playerPos.x < district.bounds.minX
        ? district.bounds.minX - playerPos.x
        : playerPos.x > district.bounds.maxX
          ? playerPos.x - district.bounds.maxX
          : 0;
      const dz = playerPos.z < district.bounds.minZ
        ? district.bounds.minZ - playerPos.z
        : playerPos.z > district.bounds.maxZ
          ? playerPos.z - district.bounds.maxZ
          : 0;

      const distSq = dx * dx + dz * dz;

      if (distSq < nearestDistanceSq) {
        nearestDistanceSq = distSq;
        nearestId = district.id;
      }

      if (distSq <= heroRadiusSq) {
        this.desiredHeroIds.add(district.id);
      } else if (distSq <= streamRadiusSq) {
        this.desiredProxyIds.add(district.id);
      }
    }

    this.currentDistrictId = nearestId;
    // Always keep nearest/current district in hero LOD
    this.desiredHeroIds.add(nearestId);

    // Promote or load hero sectors
    for (const id of this.desiredHeroIds) {
      const existing = this.loadedSectors.get(id);
      if (!existing) {
        this.loadSector(id, true, now);
      } else {
        existing.lastActiveTime = now;
        if (!existing.isHeroLOD) {
          this.unloadSector(id);
          this.loadSector(id, true, now);
        }
      }
    }

    // Load proxy sectors
    for (const id of this.desiredProxyIds) {
      if (this.desiredHeroIds.has(id)) continue;
      const existing = this.loadedSectors.get(id);
      if (!existing) {
        this.loadSector(id, false, now);
      } else {
        existing.lastActiveTime = now;
      }
    }

    // Unload expired sectors
    for (const [id, sector] of this.loadedSectors.entries()) {
      const isDesired = this.desiredHeroIds.has(id) || this.desiredProxyIds.has(id);
      if (!isDesired) {
        if (now - sector.lastActiveTime > this.evictionBufferTime) {
          this.unloadSector(id);
        }
      }
    }

    this.rebuildCollidersIfDirty();
  }

  private loadSector(districtId: string, isHeroLOD: boolean, now: number): void {
    const data = CANONICAL_DISTRICTS.find(d => d.id === districtId);
    if (!data) return;

    const { group, colliders } = SectorBuilder.buildSector(data, isHeroLOD);
    this.scene.add(group);

    // Register colliders in Rapier physics world if available
    if (this.colliderManager && isHeroLOD) {
      this.colliderManager.registerSectorColliders(districtId, colliders);
    }

    this.loadedSectors.set(districtId, {
      districtId,
      group,
      colliders,
      isHeroLOD,
      lastActiveTime: now
    });
    this.markColliderTopologyDirty();
  }

  private unloadSector(districtId: string): void {
    const loaded = this.loadedSectors.get(districtId);
    if (loaded) {
      this.scene.remove(loaded.group);
      loaded.group.traverse(obj => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
        }
      });

      // Unregister static colliders from Rapier physics world
      if (this.colliderManager) {
        this.colliderManager.unregisterSectorColliders(districtId);
      }

      this.loadedSectors.delete(districtId);
      this.markColliderTopologyDirty();
    }
  }

  public getActiveSectorIds(): string[] {
    return Array.from(this.loadedSectors.keys());
  }

  public getGroundHeight(x: number, z: number, previousY = 0): number {
    this.rebuildCollidersIfDirty();
    let groundY = 0;
    for (const col of this.allColliders) {
      if (
        x >= col.box.min.x &&
        x <= col.box.max.x &&
        z >= col.box.min.z &&
        z <= col.box.max.z
      ) {
        if (col.box.max.y <= previousY + 0.5 && col.box.max.y > groundY) {
          groundY = col.box.max.y;
        }
      }
    }
    return groundY;
  }

  public testCollision(pos: THREE.Vector3, radius: number): { hit: boolean; normal: THREE.Vector3 } {
    this.rebuildCollidersIfDirty();
    this.playerSphere.center.copy(pos);
    this.playerSphere.radius = radius;

    for (const col of this.allColliders) {
      if (!col.box.intersectsSphere(this.playerSphere)) continue;
      col.box.clampPoint(pos, this.closestPoint);
      this.normalScratch.subVectors(pos, this.closestPoint).setY(0);

      if (this.normalScratch.lengthSq() > 1e-8) {
        this.normalScratch.normalize();
        return { hit: true, normal: this.normalScratch.clone() };
      }

      const dxMin = Math.abs(pos.x - col.box.min.x);
      const dxMax = Math.abs(col.box.max.x - pos.x);
      const dzMin = Math.abs(pos.z - col.box.min.z);
      const dzMax = Math.abs(col.box.max.z - pos.z);
      const minPen = Math.min(dxMin, dxMax, dzMin, dzMax);

      if (minPen === dxMin) this.normalScratch.set(-1, 0, 0);
      else if (minPen === dxMax) this.normalScratch.set(1, 0, 0);
      else if (minPen === dzMin) this.normalScratch.set(0, 0, -1);
      else this.normalScratch.set(0, 0, 1);

      return { hit: true, normal: this.normalScratch.clone() };
    }

    return { hit: false, normal: this.zeroNormal.clone() };
  }

  public dispose(): void {
    for (const id of Array.from(this.loadedSectors.keys())) {
      this.unloadSector(id);
    }
    this.allColliders.length = 0;
    this.colliderManager?.clear();
    this.markColliderTopologyDirty();
  }
}

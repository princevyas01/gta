import * as THREE from 'three';
import { CANONICAL_DISTRICTS, getDistrictAt } from '../data/districts';
import { SectorBuilder, StaticCollider } from './sectorBuilder';
import { distanceToAABB2D } from '../core/math';

interface LoadedSector {
  districtId: string;
  group: THREE.Group;
  colliders: StaticCollider[];
  isHeroLOD: boolean;
  lastActiveTime: number;
}

export class WorldStreamer {
  private scene: THREE.Scene;
  private loadedSectors: Map<string, LoadedSector> = new Map();
  public allColliders: StaticCollider[] = [];
  public currentDistrictId: string = 'D01';

  // Distance thresholds
  private readonly heroRadius = 380; // Full LOD
  private readonly streamRadius = 850; // Proxy LOD
  private readonly evictionBufferTime = 4000; // 4 seconds hysteresis

  // Scratch memory & dirty tracking
  private colliderVersion = 0;
  private builtColliderVersion = -1;
  private readonly playerSphere = new THREE.Sphere(new THREE.Vector3(), 0);
  private readonly closestPoint = new THREE.Vector3();
  private readonly normalScratch = new THREE.Vector3();
  private readonly zeroNormal = new THREE.Vector3();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
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
    const currentDistrict = getDistrictAt(playerPos.x, playerPos.z);
    this.currentDistrictId = currentDistrict?.id ?? 'OUTSIDE';

    const now = performance.now();
    const desiredSectors: { districtId: string; isHero: boolean }[] = [];

    const distToBounds = (d: typeof CANONICAL_DISTRICTS[number]) =>
      distanceToAABB2D(
        playerPos.x,
        playerPos.z,
        d.bounds.minX,
        d.bounds.maxX,
        d.bounds.minZ,
        d.bounds.maxZ
      );

    // Evaluate all 26 canonical districts
    for (const district of CANONICAL_DISTRICTS) {
      const dist = distToBounds(district);
      if (dist <= this.heroRadius) {
        desiredSectors.push({ districtId: district.id, isHero: true });
      } else if (dist <= this.streamRadius) {
        desiredSectors.push({ districtId: district.id, isHero: false });
      }
    }

    // Always ensure current district is hero LOD if inside world
    if (currentDistrict && !desiredSectors.some(s => s.districtId === currentDistrict.id)) {
      desiredSectors.unshift({ districtId: currentDistrict.id, isHero: true });
    }

    // Load or promote sectors
    for (const req of desiredSectors) {
      const existing = this.loadedSectors.get(req.districtId);
      if (!existing) {
        this.loadSector(req.districtId, req.isHero, now);
      } else {
        existing.lastActiveTime = now;
        // Promote from proxy to hero LOD if close
        if (req.isHero && !existing.isHeroLOD) {
          this.unloadSector(req.districtId);
          this.loadSector(req.districtId, true, now);
        }
      }
    }

    // Unload distant sectors that expired their hysteresis window
    for (const [id, sector] of this.loadedSectors.entries()) {
      const stillDesired = desiredSectors.some(s => s.districtId === id);
      if (!stillDesired) {
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
    this.markColliderTopologyDirty();
  }
}

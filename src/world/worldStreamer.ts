import * as THREE from 'three';
import { CANONICAL_DISTRICTS, getDistrictAt } from '../data/districts';
import { SectorBuilder, StaticCollider } from './sectorBuilder';
import { distance2D } from '../core/math';

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

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public update(playerPos: THREE.Vector3): void {
    const currentDistrict = getDistrictAt(playerPos.x, playerPos.z);
    this.currentDistrictId = currentDistrict.id;

    const now = performance.now();
    const desiredSectors: { districtId: string; isHero: boolean }[] = [];

    // Evaluate all 26 canonical districts
    for (const district of CANONICAL_DISTRICTS) {
      const dist = distance2D(playerPos.x, playerPos.z, district.center[0], district.center[2]);
      if (dist <= this.heroRadius) {
        desiredSectors.push({ districtId: district.id, isHero: true });
      } else if (dist <= this.streamRadius) {
        desiredSectors.push({ districtId: district.id, isHero: false });
      }
    }

    // Always ensure current district is hero LOD
    if (!desiredSectors.some(s => s.districtId === currentDistrict.id)) {
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

    // Rebuild global active colliders array
    this.rebuildColliders();
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
    }
  }

  private rebuildColliders(): void {
    this.allColliders = [];
    for (const sector of this.loadedSectors.values()) {
      if (sector.isHeroLOD) {
        this.allColliders.push(...sector.colliders);
      }
    }
  }

  public getActiveSectorIds(): string[] {
    return Array.from(this.loadedSectors.keys());
  }

  /**
   * Fast swept sphere / box collision test against world geometry
   */
  public testCollision(pos: THREE.Vector3, radius: number): { hit: boolean; normal: THREE.Vector3 } {
    const playerSphere = new THREE.Sphere(pos, radius);
    for (const col of this.allColliders) {
      if (col.box.intersectsSphere(playerSphere)) {
        // Compute push-back normal from box center
        const center = new THREE.Vector3();
        col.box.getCenter(center);
        const normal = pos.clone().sub(center).setY(0).normalize();
        return { hit: true, normal };
      }
    }
    return { hit: false, normal: new THREE.Vector3() };
  }
}

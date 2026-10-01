import { init, NavMesh, NavMeshQuery, Crowd, CrowdAgent } from 'recast-navigation';
import { generateSoloNavMesh } from '@recast-navigation/generators';

export interface NavPathResult {
  success: boolean;
  path: Array<[number, number, number]>;
}

export class NavMeshService {
  private navMesh: NavMesh | null = null;
  private navMeshQuery: NavMeshQuery | null = null;
  private crowd: Crowd | null = null;
  private isInitialized: boolean = false;
  private disposed: boolean = false;

  public static async create(walkableMesh?: {
    positions: Float32Array | number[];
    indices: Uint32Array | number[];
  }): Promise<NavMeshService> {
    await init();
    const service = new NavMeshService();
    service.isInitialized = true;

    if (walkableMesh) {
      service.buildNavMesh(walkableMesh.positions, walkableMesh.indices);
    } else {
      // Default canonical walkable grid terrain if no custom mesh passed
      service.buildDefaultGridNavMesh();
    }

    return service;
  }

  public buildDefaultGridNavMesh(halfSize: number = 250): boolean {
    // Generates region navmesh (e.g. 500m x 500m active district area) to prevent WASM heap exhaustion
    return this.buildRegionNavMesh(0, 0, halfSize);
  }

  public buildRegionNavMesh(centerX: number, centerZ: number, halfSize: number = 250): boolean {
    const minX = centerX - halfSize;
    const maxX = centerX + halfSize;
    const minZ = centerZ - halfSize;
    const maxZ = centerZ + halfSize;

    const positions = new Float32Array([
      minX, 0, minZ,
      maxX, 0, minZ,
      maxX, 0, maxZ,
      minX, 0, maxZ
    ]);
    const indices = new Uint32Array([
      0, 2, 1,
      0, 3, 2
    ]);
    return this.buildNavMesh(positions, indices);
  }

  public buildNavMesh(
    positions: Float32Array | number[],
    indices: Uint32Array | number[]
  ): boolean {
    if (this.disposed) return false;
    try {
      const posArray = positions instanceof Float32Array ? positions : new Float32Array(positions);
      const idxArray = indices instanceof Uint32Array ? indices : new Uint32Array(indices);

      const result = generateSoloNavMesh(posArray, idxArray, {
        cs: 0.5,
        ch: 0.2,
        walkableSlopeAngle: 45,
        walkableHeight: 2,
        walkableClimb: 2,
        walkableRadius: 0.4
      });

      if (result.success && result.navMesh) {
        this.navMesh = result.navMesh;
        this.navMeshQuery = new NavMeshQuery(this.navMesh);
        this.crowd = new Crowd(this.navMesh, {
          maxAgents: 128,
          maxAgentRadius: 0.6
        });
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[NavMeshService] buildNavMesh failed:', err);
      return false;
    }
  }

  public findPath(
    start: [number, number, number] | { x: number; y: number; z: number },
    end: [number, number, number] | { x: number; y: number; z: number }
  ): Array<[number, number, number]> | null {
    if (this.disposed || !this.navMeshQuery) return null;

    const startPos = Array.isArray(start)
      ? { x: start[0], y: start[1], z: start[2] }
      : start;
    const endPos = Array.isArray(end)
      ? { x: end[0], y: end[1], z: end[2] }
      : end;

    try {
      const result = this.navMeshQuery.computePath(startPos, endPos);
      if (result.success && result.path && result.path.length > 0) {
        return result.path.map(pt => [pt.x, pt.y, pt.z]);
      }
      return null;
    } catch {
      return null;
    }
  }

  public addCrowdAgent(
    position: [number, number, number],
    params?: { radius?: number; height?: number; maxSpeed?: number }
  ): CrowdAgent | null {
    if (this.disposed || !this.crowd) return null;
    try {
      return this.crowd.addAgent(
        { x: position[0], y: position[1], z: position[2] },
        {
          radius: params?.radius ?? 0.4,
          height: params?.height ?? 1.8,
          maxAcceleration: 6.0,
          maxSpeed: params?.maxSpeed ?? 3.5,
          collisionQueryRange: 2.5,
          pathOptimizationRange: 15.0,
          separationWeight: 2.0
        }
      );
    } catch {
      return null;
    }
  }

  public removeCrowdAgent(agent: CrowdAgent): void {
    if (this.disposed || !this.crowd) return;
    try {
      this.crowd.removeAgent(agent);
    } catch {
      // Ignore
    }
  }

  public updateCrowd(dt: number): void {
    if (this.disposed || !this.crowd) return;
    try {
      this.crowd.update(dt);
    } catch {
      // Ignore
    }
  }

  public getCrowd(): Crowd | null {
    return this.crowd;
  }

  public isReady(): boolean {
    return this.isInitialized && !!this.navMeshQuery;
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    try {
      this.crowd?.destroy();
      this.navMesh?.destroy();
    } catch {
      // Ignore destroy errors on cleanup
    }
    this.crowd = null;
    this.navMeshQuery = null;
    this.navMesh = null;
  }
}

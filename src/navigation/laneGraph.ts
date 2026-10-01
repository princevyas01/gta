import { CANONICAL_DISTRICTS } from '../data/districts';

export interface LaneNode {
  id: string;
  districtId: string;
  position: [number, number, number];
  laneType: 'arterial' | 'highway' | 'local' | 'ramp';
  speedLimit: number;
  connections: string[]; // Connected lane node IDs
}

export class LaneGraph {
  private nodes = new Map<string, LaneNode>();

  constructor() {
    this.buildCanonicalLaneGraph();
  }

  private buildCanonicalLaneGraph(): void {
    // Generate lane nodes across districts and their intersections
    for (const district of CANONICAL_DISTRICTS) {
      const c = district.center;
      const b = district.bounds;

      const halfW = (b.maxX - b.minX) * 0.35;
      const halfH = (b.maxZ - b.minZ) * 0.35;

      // 4 perimeter lane nodes and 1 central intersection node per district
      const centerNodeId = `lane_${district.id}_center`;
      const northNodeId = `lane_${district.id}_n`;
      const southNodeId = `lane_${district.id}_s`;
      const eastNodeId = `lane_${district.id}_e`;
      const westNodeId = `lane_${district.id}_w`;

      const speedLimit = district.archetype === 'military' || district.archetype === 'aviation' ? 45 : 30;

      this.nodes.set(centerNodeId, {
        id: centerNodeId,
        districtId: district.id,
        position: [c[0], 0.5, c[2]],
        laneType: 'arterial',
        speedLimit,
        connections: [northNodeId, southNodeId, eastNodeId, westNodeId]
      });

      this.nodes.set(northNodeId, {
        id: northNodeId,
        districtId: district.id,
        position: [c[0], 0.5, c[2] - halfH],
        laneType: 'arterial',
        speedLimit,
        connections: [centerNodeId]
      });

      this.nodes.set(southNodeId, {
        id: southNodeId,
        districtId: district.id,
        position: [c[0], 0.5, c[2] + halfH],
        laneType: 'arterial',
        speedLimit,
        connections: [centerNodeId]
      });

      this.nodes.set(eastNodeId, {
        id: eastNodeId,
        districtId: district.id,
        position: [c[0] + halfW, 0.5, c[2]],
        laneType: 'arterial',
        speedLimit,
        connections: [centerNodeId]
      });

      this.nodes.set(westNodeId, {
        id: westNodeId,
        districtId: district.id,
        position: [c[0] - halfW, 0.5, c[2]],
        laneType: 'arterial',
        speedLimit,
        connections: [centerNodeId]
      });
    }

    // Connect adjacent districts' perimeter nodes
    for (const d1 of CANONICAL_DISTRICTS) {
      for (const d2 of CANONICAL_DISTRICTS) {
        if (d1.id === d2.id) continue;
        const dx = d2.center[0] - d1.center[0];
        const dz = d2.center[2] - d1.center[2];
        const dist = Math.hypot(dx, dz);

        // If centers are within ~650m, connect their facing perimeter nodes
        if (dist < 650) {
          let node1Id = `lane_${d1.id}_center`;
          let node2Id = `lane_${d2.id}_center`;

          if (Math.abs(dx) > Math.abs(dz)) {
            // Horizontal connection
            node1Id = dx > 0 ? `lane_${d1.id}_e` : `lane_${d1.id}_w`;
            node2Id = dx > 0 ? `lane_${d2.id}_w` : `lane_${d2.id}_e`;
          } else {
            // Vertical connection
            node1Id = dz > 0 ? `lane_${d1.id}_s` : `lane_${d1.id}_n`;
            node2Id = dz > 0 ? `lane_${d2.id}_n` : `lane_${d2.id}_s`;
          }

          const n1 = this.nodes.get(node1Id);
          const n2 = this.nodes.get(node2Id);
          if (n1 && n2) {
            if (!n1.connections.includes(node2Id)) n1.connections.push(node2Id);
            if (!n2.connections.includes(node1Id)) n2.connections.push(node1Id);
          }
        }
      }
    }
  }

  public getNearestNode(position: [number, number, number]): LaneNode | null {
    let nearest: LaneNode | null = null;
    let minDistanceSq = Infinity;

    for (const node of this.nodes.values()) {
      const dx = node.position[0] - position[0];
      const dz = node.position[2] - position[2];
      const distSq = dx * dx + dz * dz;

      if (distSq < minDistanceSq) {
        minDistanceSq = distSq;
        nearest = node;
      }
    }

    return nearest;
  }

  public findLaneRoute(
    start: [number, number, number],
    end: [number, number, number]
  ): Array<[number, number, number]> | null {
    const startNode = this.getNearestNode(start);
    const endNode = this.getNearestNode(end);

    if (!startNode || !endNode) return null;
    if (startNode.id === endNode.id) {
      return [start, startNode.position, end];
    }

    // A* graph search over lane nodes
    const openSet = new Set<string>([startNode.id]);
    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    for (const id of this.nodes.keys()) {
      gScore.set(id, Infinity);
      fScore.set(id, Infinity);
    }

    gScore.set(startNode.id, 0);
    const h = (a: LaneNode, b: LaneNode) =>
      Math.hypot(a.position[0] - b.position[0], a.position[2] - b.position[2]);
    fScore.set(startNode.id, h(startNode, endNode));

    while (openSet.size > 0) {
      let currentId: string | null = null;
      let lowestF = Infinity;

      for (const id of openSet) {
        const score = fScore.get(id) ?? Infinity;
        if (score < lowestF) {
          lowestF = score;
          currentId = id;
        }
      }

      if (!currentId) break;
      if (currentId === endNode.id) {
        // Reconstruct path
        const path: Array<[number, number, number]> = [end];
        let curr: string | undefined = currentId;
        while (curr) {
          const node = this.nodes.get(curr);
          if (node) path.unshift(node.position);
          curr = cameFrom.get(curr);
        }
        path.unshift(start);
        return path;
      }

      openSet.delete(currentId);
      const currentNode = this.nodes.get(currentId)!;
      const currentG = gScore.get(currentId) ?? Infinity;

      for (const neighborId of currentNode.connections) {
        const neighbor = this.nodes.get(neighborId);
        if (!neighbor) continue;

        const edgeCost = Math.hypot(
          neighbor.position[0] - currentNode.position[0],
          neighbor.position[2] - currentNode.position[2]
        );
        const tentativeG = currentG + edgeCost;

        if (tentativeG < (gScore.get(neighborId) ?? Infinity)) {
          cameFrom.set(neighborId, currentId);
          gScore.set(neighborId, tentativeG);
          fScore.set(neighborId, tentativeG + h(neighbor, endNode));
          openSet.add(neighborId);
        }
      }
    }

    // No path found: return null per Page 24 (never straight-line fallback through blocked buildings)
    return null;
  }

  public getValidRoadSpawnPoint(
    playerPos: [number, number, number],
    minDist: number = 60,
    maxDist: number = 200
  ): [number, number, number] | null {
    const validNodes: LaneNode[] = [];
    for (const node of this.nodes.values()) {
      const d = Math.hypot(node.position[0] - playerPos[0], node.position[2] - playerPos[2]);
      if (d >= minDist && d <= maxDist) {
        validNodes.push(node);
      }
    }

    if (validNodes.length === 0) return null;
    const picked = validNodes[Math.floor(Math.random() * validNodes.length)];
    return [picked.position[0], picked.position[1], picked.position[2]];
  }

  public getNodeCount(): number {
    return this.nodes.size;
  }
}

export const laneGraph = new LaneGraph();

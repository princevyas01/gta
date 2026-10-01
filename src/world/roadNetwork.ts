import * as THREE from 'three';
import { distance2D } from '../core/math';
import { CANONICAL_DISTRICTS } from '../data/districts';
import { laneGraph } from '../navigation/laneGraph';

export interface RoadNode {
  id: string;
  x: number;
  z: number;
  neighbors: string[];
}

export class RoadNetwork {
  public nodes: Map<string, RoadNode> = new Map();
  private ribbonMesh: THREE.Mesh | null = null;
  private ribbonKey = '';
  private readonly ribbonMaterial = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.75
  });
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.buildGraph();
  }

  /**
   * Builds an interconnected road graph spanning all 26 canonical districts
   */
  private buildGraph(): void {
    // Generate nodes at district centers and major highway interchanges
    CANONICAL_DISTRICTS.forEach(district => {
      this.nodes.set(district.id, {
        id: district.id,
        x: district.center[0],
        z: district.center[2],
        neighbors: []
      });
    });

    // Add arterial highway nodes and connectors
    const addEdge = (id1: string, id2: string) => {
      const n1 = this.nodes.get(id1);
      const n2 = this.nodes.get(id2);
      if (n1 && n2) {
        if (!n1.neighbors.includes(id2)) n1.neighbors.push(id2);
        if (!n2.neighbors.includes(id1)) n2.neighbors.push(id1);
      }
    };

    // Central Core Grid (Aurelio Central, Meridian, Old Quay, Civic Rise, Neon Row)
    addEdge('D01', 'D02'); // Central to Meridian
    addEdge('D01', 'D03'); // Central to Old Quay
    addEdge('D01', 'D04'); // Central to Civic Rise
    addEdge('D02', 'D05'); // Meridian to Neon Row
    addEdge('D04', 'D05'); // Civic to Neon Row
    addEdge('D03', 'D04'); // Old Quay to Civic

    // Coastal & Harbor Links (Harborview, Sunspire, Eastmoor)
    addEdge('D05', 'D06'); // Neon Row to Harborview
    addEdge('D02', 'D07'); // Meridian to Sunspire
    addEdge('D06', 'D07'); // Harborview to Sunspire
    addEdge('D07', 'D08'); // Sunspire to Eastmoor
    addEdge('D06', 'D21'); // Harborview to Freeway Belt

    // Northern Ridge & Foothills (Caldera Hills, Crown Heights, Northpoint, Pine Crest)
    addEdge('D01', 'D11'); // Central to Northpoint
    addEdge('D02', 'D12'); // Meridian to Pine Crest
    addEdge('D07', 'D09'); // Sunspire to Caldera Hills
    addEdge('D03', 'D10'); // Old Quay to Crown Heights
    addEdge('D10', 'D11'); // Crown Heights to Northpoint
    addEdge('D11', 'D12'); // Northpoint to Pine Crest
    addEdge('D12', 'D09'); // Pine Crest to Caldera Hills

    // Western Port & Industrial Belt (Westgate, Port Meridian, Ironworks, Docklands, Salt Marsh)
    addEdge('D03', 'D13'); // Old Quay to Westgate
    addEdge('D13', 'D14'); // Westgate to Port Meridian
    addEdge('D04', 'D15'); // Civic to Ironworks
    addEdge('D14', 'D15'); // Port Meridian to Ironworks
    addEdge('D15', 'D16'); // Ironworks to Docklands
    addEdge('D04', 'D16'); // Civic to Docklands
    addEdge('D13', 'D17'); // Westgate to Salt Marsh

    // Southern Arterials & Airport (Southbank, Rancho Sol, Airport, Freeway Belt, Desert Edge, Military)
    addEdge('D15', 'D18'); // Ironworks to Southbank
    addEdge('D18', 'D19'); // Southbank to Rancho Sol
    addEdge('D16', 'D20'); // Docklands to Airport
    addEdge('D05', 'D20'); // Neon Row to Airport
    addEdge('D20', 'D21'); // Airport to Freeway Belt
    addEdge('D20', 'D22'); // Airport to Desert Edge
    addEdge('D21', 'D23'); // Freeway to Blackridge Military
    addEdge('D08', 'D23'); // Eastmoor to Blackridge
    addEdge('D21', 'D25'); // Freeway to Pelican Keys Causeway
    addEdge('D17', 'D26'); // Salt Marsh to Silver Lake
    addEdge('D18', 'D24'); // Southbank to Sable Island Bridge
  }

  /**
   * Finds the nearest road node to arbitrary (x, z) coordinates
   */
  public getNearestNode(x: number, z: number): RoadNode {
    let nearest: RoadNode = this.nodes.values().next().value!;
    let minDist = Infinity;
    for (const node of this.nodes.values()) {
      const d = distance2D(x, z, node.x, node.z);
      if (d < minDist) {
        minDist = d;
        nearest = node;
      }
    }
    return nearest;
  }

  /**
   * Computes shortest path across the road network via LaneGraph / A*
   * Returns null if no valid path exists (never straight-line through buildings)
   */
  public findPath(startX: number, startZ: number, endX: number, endZ: number): [number, number, number][] | null {
    // 1. Try granular lane graph first
    const laneRoute = laneGraph.findLaneRoute([startX, 0.15, startZ], [endX, 0.15, endZ]);
    if (laneRoute && laneRoute.length >= 2) {
      return laneRoute;
    }

    // 2. Fallback to arterial district graph
    const startNode = this.getNearestNode(startX, startZ);
    const endNode = this.getNearestNode(endX, endZ);

    if (startNode.id === endNode.id) {
      return [
        [startX, 0.15, startZ],
        [startNode.x, 0.15, startNode.z],
        [endX, 0.15, endZ]
      ];
    }

    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const open = new Set<string>();

    const heuristic = (node: RoadNode): number =>
      distance2D(node.x, node.z, endNode.x, endNode.z);

    for (const id of this.nodes.keys()) {
      gScore.set(id, Infinity);
      fScore.set(id, Infinity);
      previous.set(id, null);
    }

    gScore.set(startNode.id, 0);
    fScore.set(startNode.id, heuristic(startNode));
    open.add(startNode.id);

    while (open.size > 0) {
      let currentId: string | null = null;
      let bestF = Infinity;
      for (const id of open) {
        const score = fScore.get(id) ?? Infinity;
        if (score < bestF) {
          bestF = score;
          currentId = id;
        }
      }

      if (!currentId) break;
      if (currentId === endNode.id) break;

      open.delete(currentId);
      const current = this.nodes.get(currentId);
      if (!current) continue;

      for (const neighborId of current.neighbors) {
        const neighbor = this.nodes.get(neighborId);
        if (!neighbor) continue;

        const tentative = (gScore.get(currentId) ?? Infinity) +
          distance2D(current.x, current.z, neighbor.x, neighbor.z);

        if (tentative < (gScore.get(neighborId) ?? Infinity)) {
          previous.set(neighborId, currentId);
          gScore.set(neighborId, tentative);
          fScore.set(neighborId, tentative + heuristic(neighbor));
          open.add(neighborId);
        }
      }
    }

    if ((gScore.get(endNode.id) ?? Infinity) === Infinity) {
      // Return null per Page 24 (never straight-line fallback across obstacles)
      return null;
    }

    const path: [number, number, number][] = [];
    let currentId: string | null = endNode.id;
    while (currentId) {
      const node = this.nodes.get(currentId);
      if (!node) break;
      path.unshift([node.x, 0.15, node.z]);
      currentId = previous.get(currentId) ?? null;
    }

    if (path.length === 0) {
      return null;
    }

    path.unshift([startX, 0.15, startZ]);
    path.push([endX, 0.15, endZ]);
    return path;
  }

  /**
   * Generates a 3D glowing GPS ribbon in world space along the road path
   */
  public updateGPSRibbon(path: [number, number, number][] | null): void {
    const key = path
      ? path.map(p => `${p[0].toFixed(2)},${p[2].toFixed(2)}`).join('|')
      : '';
    if (key === this.ribbonKey) return;
    this.ribbonKey = key;

    if (this.ribbonMesh) {
      this.scene.remove(this.ribbonMesh);
      this.ribbonMesh.geometry.dispose();
      this.ribbonMesh = null;
    }

    if (!path || path.length < 2) return;

    const points = path.map(
      p => new THREE.Vector3(p[0], 0.25, p[2])
    );
    const curve = new THREE.CatmullRomCurve3(points);
    const segments = Math.max(8, Math.min(64, points.length * 6));
    const geometry = new THREE.TubeGeometry(curve, segments, 0.45, 6, false);
    this.ribbonMesh = new THREE.Mesh(geometry, this.ribbonMaterial);
    this.scene.add(this.ribbonMesh);
  }

  public dispose(): void {
    if (this.ribbonMesh) {
      this.scene.remove(this.ribbonMesh);
      this.ribbonMesh.geometry.dispose();
      this.ribbonMesh = null;
    }
    this.ribbonMaterial.dispose();
  }
}

import * as THREE from 'three';
import { distance2D } from '../core/math';
import { CANONICAL_DISTRICTS } from '../data/districts';

export interface RoadNode {
  id: string;
  x: number;
  z: number;
  neighbors: string[];
}

export class RoadNetwork {
  public nodes: Map<string, RoadNode> = new Map();
  private ribbonMesh: THREE.Mesh | null = null;
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
   * Computes shortest path across the road network via Dijkstra / A*
   */
  public findPath(startX: number, startZ: number, endX: number, endZ: number): [number, number, number][] {
    const startNode = this.getNearestNode(startX, startZ);
    const endNode = this.getNearestNode(endX, endZ);

    if (startNode.id === endNode.id) {
      return [
        [startX, 0.1, startZ],
        [endX, 0.1, endZ]
      ];
    }

    const dists = new Map<string, number>();
    const prev = new Map<string, string | null>();
    const unvisited = new Set<string>();

    for (const id of this.nodes.keys()) {
      dists.set(id, Infinity);
      prev.set(id, null);
      unvisited.add(id);
    }
    dists.set(startNode.id, 0);

    while (unvisited.size > 0) {
      let currentId: string | null = null;
      let minVal = Infinity;
      for (const id of unvisited) {
        const d = dists.get(id)!;
        if (d < minVal) {
          minVal = d;
          currentId = id;
        }
      }

      if (!currentId || currentId === endNode.id || minVal === Infinity) {
        break;
      }

      unvisited.delete(currentId);
      const currNode = this.nodes.get(currentId)!;

      for (const neighborId of currNode.neighbors) {
        if (!unvisited.has(neighborId)) continue;
        const neighbor = this.nodes.get(neighborId)!;
        const edgeWeight = distance2D(currNode.x, currNode.z, neighbor.x, neighbor.z);
        const alt = dists.get(currentId)! + edgeWeight;
        if (alt < dists.get(neighborId)!) {
          dists.set(neighborId, alt);
          prev.set(neighborId, currentId);
        }
      }
    }

    // Reconstruct path
    const path: [number, number, number][] = [];
    let curr: string | null = endNode.id;
    while (curr) {
      const n = this.nodes.get(curr)!;
      path.unshift([n.x, 0.15, n.z]);
      curr = prev.get(curr) || null;
    }

    // Prepend exact player origin and append target
    path.unshift([startX, 0.15, startZ]);
    path.push([endX, 0.15, endZ]);

    return path;
  }

  /**
   * Generates a 3D glowing GPS ribbon in world space along the road path
   */
  public updateGPSRibbon(path: [number, number, number][] | null): void {
    if (this.ribbonMesh) {
      this.scene.remove(this.ribbonMesh);
      this.ribbonMesh.geometry.dispose();
      (this.ribbonMesh.material as THREE.Material).dispose();
      this.ribbonMesh = null;
    }

    if (!path || path.length < 2) return;

    const points: THREE.Vector3[] = path.map(p => new THREE.Vector3(p[0], 0.25, p[2]));
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, points.length * 8, 0.45, 6, false);

    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Glowing Cyan GPS ribbon
      transparent: true,
      opacity: 0.75,
      wireframe: false
    });

    this.ribbonMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    this.scene.add(this.ribbonMesh);
  }
}

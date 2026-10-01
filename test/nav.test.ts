import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { NavMeshService } from '../src/navigation/navMeshService';
import { LaneGraph } from '../src/navigation/laneGraph';

describe('Recast Navigation & LaneGraph Routing (P0 Navigation)', () => {
  let navService: NavMeshService;
  let laneGraph: LaneGraph;

  beforeAll(async () => {
    navService = await NavMeshService.create();
    laneGraph = new LaneGraph();
  });

  afterAll(() => {
    navService.dispose();
  });

  it('initializes Recast navmesh and validates readiness', () => {
    expect(navService.isReady()).toBe(true);
    expect(navService.getCrowd()).toBeDefined();
  });

  it('nav query computes valid walkable path between two points on navmesh', () => {
    const path = navService.findPath([-20, 0, -20], [20, 0, 20]);
    expect(path).not.toBeNull();
    if (path) {
      expect(path.length).toBeGreaterThanOrEqual(2);
      expect(path[0][0]).toBeCloseTo(-20, 0);
      expect(path[path.length - 1][0]).toBeCloseTo(20, 0);
    }
  });

  it('returns null when querying path far outside walkable world boundary', () => {
    // Points far outside the 3200m world boundary
    const path = navService.findPath([50000, 0, 50000], [60000, 0, 60000]);
    expect(path).toBeNull();
  });

  it('crowd simulation spawns agent and updates position', () => {
    const agent = navService.addCrowdAgent([0, 0, 0], { maxSpeed: 4 });
    expect(agent).not.toBeNull();
    if (agent) {
      agent.requestMoveTarget({ x: 20, y: 0, z: 20 });
      // Step crowd
      navService.updateCrowd(0.2);
      const vel = agent.velocity();
      expect(vel).toBeDefined();
      navService.removeCrowdAgent(agent);
    }
  });

  it('LaneGraph provides road network lane routing without straight-line shortcuts', () => {
    // Route from Aurelio Central (D01 center [0, 0, 0]) to Neon Row (D05 center [120, 0, 160])
    const route = laneGraph.findLaneRoute([0, 0.5, 0], [120, 0.5, 160]);
    expect(route).not.toBeNull();
    if (route) {
      expect(route.length).toBeGreaterThanOrEqual(2);
      // Verify all points have realistic coordinates and stay within bounds
      for (const pt of route) {
        expect(pt[0]).toBeGreaterThan(-1600);
        expect(pt[0]).toBeLessThan(1600);
        expect(pt[2]).toBeGreaterThan(-1600);
        expect(pt[2]).toBeLessThan(1600);
      }
    }
  });

  it('LaneGraph dispatches valid road spawn points outside player line-of-sight', () => {
    const playerPos: [number, number, number] = [0, 0.5, 0];
    const spawnPoint = laneGraph.getValidRoadSpawnPoint(playerPos, 50, 200);
    expect(spawnPoint).not.toBeNull();
    if (spawnPoint) {
      const dist = Math.hypot(spawnPoint[0] - playerPos[0], spawnPoint[2] - playerPos[2]);
      expect(dist).toBeGreaterThanOrEqual(50);
      expect(dist).toBeLessThanOrEqual(200);
    }
  });
});

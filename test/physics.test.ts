import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as THREE from 'three';
import { PhysicsWorld } from '../src/physics/physicsWorld';
import { PhysicsColliderManager } from '../src/physics/physicsColliders';

describe('Rapier Physics World & Character Controller (P0 Physics)', () => {
  let physics: PhysicsWorld;

  beforeAll(async () => {
    physics = await PhysicsWorld.create();
  });

  afterAll(() => {
    physics.dispose();
  });

  it('initializes Rapier world with gravity and character controller', () => {
    expect(physics.world).toBeDefined();
    expect(physics.getCharacterController()).toBeDefined();
  });

  it('character controller lands and reports grounded status on floor', () => {
    // Create ground plane at y = 0
    const ground = physics.createStaticCuboid(50, 0.5, 50, 0, 0, 0);
    // Create player above ground at y = 3
    const { rigidBody, collider } = physics.createPlayerControllerBody([0, 3, 0]);

    physics.step();

    // Fall downwards with gravity
    const move = physics.moveCharacter(collider, { x: 0, y: -10, z: 0 });
    expect(move.isGrounded).toBe(true);
    // Player should have stopped near ground surface, not fallen 10m
    expect(move.y).toBeGreaterThan(-4);
    expect(move.y).toBeLessThan(-1);

    physics.removeCollider(collider);
    physics.removeCollider(ground);
  });

  it('player capsule does not pass through a static wall', () => {
    // Ground
    const ground = physics.createStaticCuboid(50, 0.5, 50, 0, 0, 0);
    // Static wall at x = 2
    const wall = physics.createStaticCuboid(0.5, 5, 5, 2, 2.5, 0);
    // Player at x = 0, y = 1, z = 0
    const { collider } = physics.createPlayerControllerBody([0, 1, 0]);

    physics.step();

    // Try to move 10 units in +X direction directly into the wall
    const move = physics.moveCharacter(collider, { x: 10, y: 0, z: 0 });

    // The wall at x=2 (left edge ~1.5) must stop the player (radius 0.35) around x=1.1 - 1.2
    expect(move.x).toBeLessThan(1.5);
    expect(move.x).toBeGreaterThan(0.5);

    physics.removeCollider(collider);
    physics.removeCollider(wall);
    physics.removeCollider(ground);
  });

  it('raycast accurately detects collision distance and normal against obstacles', () => {
    // Wall at x = 10
    const wall = physics.createStaticCuboid(1, 5, 5, 10, 2.5, 0);
    physics.step();

    // Cast ray from origin towards +X
    const hit = physics.castRay({ x: 0, y: 2.5, z: 0 }, { x: 1, y: 0, z: 0 }, 100);
    expect(hit).not.toBeNull();
    if (hit) {
      expect(hit.hit).toBe(true);
      // Wall is at x=10 with halfWidth 1, front face is at x=9
      expect(hit.toi).toBeCloseTo(9, 1);
      expect(hit.point.x).toBeCloseTo(9, 1);
      expect(hit.normal.x).toBeCloseTo(-1, 1);
    }

    physics.removeCollider(wall);
  });

  it('PhysicsColliderManager registers and cleanly unregisters sector colliders', () => {
    const manager = new PhysicsColliderManager(physics);

    manager.registerSectorColliders('D01', [
      {
        box: new THREE.Box3(
          new THREE.Vector3(-20, 0, -20),
          new THREE.Vector3(20, 10, 20)
        ),
        type: 'building'
      },
      {
        box: new THREE.Box3(
          new THREE.Vector3(50, 0, 50),
          new THREE.Vector3(70, 15, 70)
        ),
        type: 'building'
      }
    ]);

    expect(manager.getSectorColliderCount('D01')).toBe(2);
    expect(manager.getTotalCollidersCount()).toBe(2);

    manager.unregisterSectorColliders('D01');
    expect(manager.getSectorColliderCount('D01')).toBe(0);
    expect(manager.getTotalCollidersCount()).toBe(0);
  });
});

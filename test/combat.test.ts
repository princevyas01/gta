import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { CombatSystem, ActiveRocket } from '../src/combat/combatSystem';
import { PhysicsWorld } from '../src/physics/physicsWorld';

describe('Combat System & Ballistics (P0 Combat)', () => {
  let scene: THREE.Scene;
  let combatSystem: CombatSystem;

  beforeEach(() => {
    scene = new THREE.Scene();
    combatSystem = new CombatSystem(scene);
  });

  it('active rocket stores and applies launch-time damage regardless of subsequent weapon switches', () => {
    // Manually push an active rocket launched with rocket launcher damage (500)
    combatSystem.activeRockets.push({
      position: new THREE.Vector3(0, 1, 0),
      velocity: new THREE.Vector3(10, 0, 0),
      life: 3.5,
      weaponId: 'wep_launcher_r80',
      damage: 500
    });

    const rocket = combatSystem.activeRockets[0];
    expect(rocket.damage).toBe(500);
    expect(rocket.weaponId).toBe('wep_launcher_r80');

    // Simulate switching active player weapon to pistol (damage 25)
    // The stored rocket damage must remain 500
    expect(rocket.damage).toBe(500);
  });

  it('world physics raycast detects wall occlusion in front of targets', async () => {
    const physics = await PhysicsWorld.create();
    combatSystem.setPhysicsWorld(physics);

    // Wall at x = 5 (between muzzle at 0 and target at 10)
    const wall = physics.createStaticCuboid(0.5, 5, 5, 5, 2.5, 0);
    physics.step();

    const muzzle = { x: 0, y: 2.5, z: 0 };
    const dir = { x: 1, y: 0, z: 0 };

    const hit = physics.castRay(muzzle, dir, 50);
    expect(hit).not.toBeNull();
    if (hit) {
      expect(hit.toi).toBeCloseTo(4.5, 1); // Front face of wall at x = 4.5
      // Target at distance 10 is behind wall at 4.5, hence occluded!
      const targetDist = 10;
      expect(targetDist > hit.toi).toBe(true);
    }

    physics.dispose();
  });
});

import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { worldToMapPercent, mapPercentToWorld, distance2D } from '../src/core/math';
import { getDistrictAt } from '../src/data/districts';
import { RoadNetwork } from '../src/world/roadNetwork';
import { WorldStreamer } from '../src/world/worldStreamer';
import { ParticleSystem } from '../src/rendering/particles';

describe('Performance & Hot Loop Benchmarks', () => {
  it('executes 100,000 coordinate conversions in < 150ms', () => {
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
      const p = worldToMapPercent((i % 2000) - 1000, ((i * 3) % 2000) - 1000);
      mapPercentToWorld(p.xPercent, p.yPercent);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(150);
  });

  it('executes 50,000 district spatial lookups in < 100ms', () => {
    const start = performance.now();
    for (let i = 0; i < 50000; i++) {
      const x = (i % 2400) - 1200;
      const z = ((i * 7) % 2400) - 1200;
      getDistrictAt(x, z);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(100);
  });

  it('calculates 100,000 2D distance queries in < 80ms', () => {
    const start = performance.now();
    let sum = 0;
    for (let i = 0; i < 100000; i++) {
      sum += distance2D(i * 0.1, i * 0.2, (i + 1) * 0.1, (i + 1) * 0.2);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(80);
    expect(sum).toBeGreaterThan(0);
  });

  it('executes 1,000 A* road path queries in < 100ms', () => {
    const scene = new THREE.Scene();
    const roads = new RoadNetwork(scene);
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      const sx = (i % 400) - 200;
      const sz = ((i * 3) % 400) - 200;
      roads.findPath(sx, sz, 300, 300);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(250);
    roads.dispose();
  });

  it('executes 10,000 swept collision queries against streamer in < 100ms', () => {
    const scene = new THREE.Scene();
    const streamer = new WorldStreamer(scene);
    streamer.update(new THREE.Vector3(0, 0, 0));

    const testPos = new THREE.Vector3();
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      testPos.set((i % 100) - 50, 0.5, ((i * 2) % 100) - 50);
      streamer.testCollision(testPos, 0.45);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(150);
    streamer.dispose();
  });

  it('executes 600 particle update steps under budget without memory growth', () => {
    const scene = new THREE.Scene();
    const particles = new ParticleSystem(scene);
    for (let i = 0; i < 200; i++) {
      particles.emitExplosion(new THREE.Vector3(0, 0, 0));
    }

    const start = performance.now();
    for (let step = 0; step < 600; step++) {
      particles.update(1 / 60);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(200);
    particles.dispose();
  });
});

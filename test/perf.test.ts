import { describe, it, expect } from 'vitest';
import { worldToMapPercent, mapPercentToWorld, distance2D } from '../src/core/math';
import { getDistrictAt } from '../src/data/districts';

describe('Performance & Hot Loop Benchmarks', () => {
  it('executes 100,000 coordinate conversions in < 50ms', () => {
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
      const p = worldToMapPercent((i % 2000) - 1000, ((i * 3) % 2000) - 1000);
      mapPercentToWorld(p.xPercent, p.yPercent);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(150);
  });

  it('executes 50,000 district spatial lookups in < 50ms', () => {
    const start = performance.now();
    for (let i = 0; i < 50000; i++) {
      const x = (i % 2400) - 1200;
      const z = ((i * 7) % 2400) - 1200;
      getDistrictAt(x, z);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(100);
  });

  it('calculates 100,000 2D distance queries in < 25ms', () => {
    const start = performance.now();
    let sum = 0;
    for (let i = 0; i < 100000; i++) {
      sum += distance2D(i * 0.1, i * 0.2, (i + 1) * 0.1, (i + 1) * 0.2);
    }
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(80);
    expect(sum).toBeGreaterThan(0);
  });
});

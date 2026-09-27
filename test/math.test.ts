import { describe, it, expect } from 'vitest';
import {
  worldToMapPercent,
  mapPercentToWorld,
  clamp,
  distance2D,
  distance3D,
  lerpAngle
} from '../src/core/math';

describe('Math & Coordinate Conversions', () => {
  it('converts world coordinates to map percentage and back accurately', () => {
    const origin = worldToMapPercent(0, 0);
    expect(origin.xPercent).toBeCloseTo(50, 1);
    expect(origin.yPercent).toBeCloseTo(50, 1);

    const backToWorld = mapPercentToWorld(50, 50);
    expect(backToWorld[0]).toBeCloseTo(0, 1);
    expect(backToWorld[2]).toBeCloseTo(0, 1);
  });

  it('clamps coordinates to boundary extents', () => {
    const minExt = worldToMapPercent(-1600, -1600);
    expect(minExt.xPercent).toBeCloseTo(0, 1);
    expect(minExt.yPercent).toBeCloseTo(0, 1);

    const maxExt = worldToMapPercent(1600, 1600);
    expect(maxExt.xPercent).toBeCloseTo(100, 1);
    expect(maxExt.yPercent).toBeCloseTo(100, 1);
  });

  it('calculates 2D and 3D Euclidean distances correctly', () => {
    const d2 = distance2D(0, 0, 3, 4);
    expect(d2).toBe(5);

    const d3 = distance3D([0, 0, 0], [1, 2, 2]);
    expect(d3).toBe(3);
  });

  it('smoothly wraps angles when interpolating', () => {
    const angle = lerpAngle(0, Math.PI, 0.5);
    expect(angle).toBeCloseTo(Math.PI / 2, 2);
  });
});

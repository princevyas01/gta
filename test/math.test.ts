import { describe, it, expect } from 'vitest';
import {
  worldToMapPercent,
  mapPercentToWorld,
  clamp,
  clampFactor,
  lerp,
  distance2D,
  distance3D,
  lerpAngle,
  isInsideWorld,
  distanceToAABB2D,
  WORLD_EXTENTS
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

    const beyondMin = worldToMapPercent(-2500, -2500);
    expect(beyondMin.xPercent).toBe(0);
    expect(beyondMin.yPercent).toBe(0);

    const beyondMax = worldToMapPercent(2500, 2500);
    expect(beyondMax.xPercent).toBe(100);
    expect(beyondMax.yPercent).toBe(100);
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

  it('validates canonical world containment via isInsideWorld (P05)', () => {
    expect(isInsideWorld(0, 0)).toBe(true);
    expect(isInsideWorld(WORLD_EXTENTS.minX, WORLD_EXTENTS.minZ)).toBe(true);
    expect(isInsideWorld(WORLD_EXTENTS.maxX, WORLD_EXTENTS.maxZ)).toBe(true);
    expect(isInsideWorld(WORLD_EXTENTS.minX - 1, 0)).toBe(false);
    expect(isInsideWorld(0, WORLD_EXTENTS.maxZ + 1)).toBe(false);
  });

  it('calculates exact AABB 2D distance for point outside and inside (P05)', () => {
    // Inside box -> distance 0
    expect(distanceToAABB2D(10, 10, 0, 20, 0, 20)).toBe(0);

    // Orthogonal distance
    expect(distanceToAABB2D(25, 10, 0, 20, 0, 20)).toBe(5);
    expect(distanceToAABB2D(10, -5, 0, 20, 0, 20)).toBe(5);

    // Diagonal corner distance
    expect(distanceToAABB2D(23, 24, 0, 20, 0, 20)).toBe(5); // dx=3, dz=4 -> 5
  });

  it('validates clamped interpolation (clampFactor, lerp, lerpAngle) per Page 10', () => {
    // Tests for t = -1, 0, 0.5, 1, 2 and NaN
    expect(clampFactor(-1)).toBe(0);
    expect(clampFactor(0)).toBe(0);
    expect(clampFactor(0.5)).toBe(0.5);
    expect(clampFactor(1)).toBe(1);
    expect(clampFactor(2)).toBe(1);
    expect(clampFactor(NaN)).toBe(0);

    // lerp never overshoots
    expect(lerp(0, 10, 2)).toBe(10);
    expect(lerp(0, 10, -1)).toBe(0);
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, NaN)).toBe(0);

    // lerpAngle never overshoots
    expect(lerpAngle(0, Math.PI, 2)).toBeCloseTo(Math.PI, 2);
    expect(lerpAngle(0, Math.PI, -1)).toBeCloseTo(0, 2);
  });
});

import * as THREE from 'three';

// Map coordinate configuration
// Canonical world bounds: -1600 to +1600 meters in X and Z
export const WORLD_EXTENTS = {
  minX: -1600,
  maxX: 1600,
  minZ: -1600,
  maxZ: 1600
};

export const WORLD_SIZE_X = WORLD_EXTENTS.maxX - WORLD_EXTENTS.minX;
export const WORLD_SIZE_Z = WORLD_EXTENTS.maxZ - WORLD_EXTENTS.minZ;

/**
 * Converts a 3D world position [x, y, z] to normalized map percentage [0..100]
 */
export function worldToMapPercent(x: number, z: number): { xPercent: number; yPercent: number } {
  const xNorm = (x - WORLD_EXTENTS.minX) / WORLD_SIZE_X;
  const zNorm = (z - WORLD_EXTENTS.minZ) / WORLD_SIZE_Z;
  return {
    xPercent: Math.min(100, Math.max(0, xNorm * 100)),
    yPercent: Math.min(100, Math.max(0, zNorm * 100))
  };
}

/**
 * Converts normalized map percentage [0..100] back to 3D world coordinates [x, y, z]
 */
export function mapPercentToWorld(xPercent: number, yPercent: number): [number, number, number] {
  const x = WORLD_EXTENTS.minX + (xPercent / 100) * WORLD_SIZE_X;
  const z = WORLD_EXTENTS.minZ + (yPercent / 100) * WORLD_SIZE_Z;
  return [x, 0, z];
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpAngle(a: number, b: number, t: number): number {
  let diff = (b - a) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  return a + diff * t;
}

export function distance2D(x1: number, z1: number, x2: number, z2: number): number {
  const dx = x2 - x1;
  const dz = z2 - z1;
  return Math.sqrt(dx * dx + dz * dz);
}

export function distance3D(a: [number, number, number], b: [number, number, number]): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

import * as THREE from 'three';

// Map coordinate configuration
// Canonical world bounds: -1600 to +1600 meters in X and Z
export const WORLD_EXTENTS = {
  minX: -1600,
  maxX: 1600,
  minZ: -1600,
  maxZ: 1600
} as const;

export const WORLD_SIZE_X = WORLD_EXTENTS.maxX - WORLD_EXTENTS.minX;
export const WORLD_SIZE_Z = WORLD_EXTENTS.maxZ - WORLD_EXTENTS.minZ;

export function isInsideWorld(x: number, z: number): boolean {
  return (
    x >= WORLD_EXTENTS.minX &&
    x <= WORLD_EXTENTS.maxX &&
    z >= WORLD_EXTENTS.minZ &&
    z <= WORLD_EXTENTS.maxZ
  );
}

export function distanceToAABB2D(
  x: number,
  z: number,
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number
): number {
  const dx = x < minX ? minX - x : x > maxX ? x - maxX : 0;
  const dz = z < minZ ? minZ - z : z > maxZ ? z - maxZ : 0;
  return Math.hypot(dx, dz);
}

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

export function clampFactor(t: number): number {
  if (!Number.isFinite(t)) return 0;
  return Math.min(1, Math.max(0, t));
}

export function lerp(a: number, b: number, t: number): number {
  const alpha = clampFactor(t);
  return a + (b - a) * alpha;
}

export function lerpAngle(a: number, b: number, t: number): number {
  const alpha = clampFactor(t);
  let diff = (b - a) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  return a + diff * alpha;
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

export function expDamp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function expDampAngle(current: number, target: number, lambda: number, dt: number): number {
  const delta = THREE.MathUtils.euclideanModulo(target - current + Math.PI, Math.PI * 2) - Math.PI;
  return current + delta * (1 - Math.exp(-lambda * dt));
}


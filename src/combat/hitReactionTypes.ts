import * as THREE from 'three';

export type HitDirection = 'front' | 'back' | 'left' | 'right';

export interface HitReactionPayload {
  targetId: string;
  damage: number;
  point: { x: number; y: number; z: number };
  direction: HitDirection;
  critical: boolean;
}

export interface HitReactionState {
  active: boolean;
  age: number;
  duration: number;
  direction: HitDirection;
  strength: number;
}

export function classifyHitDirection(
  targetForward: THREE.Vector3,
  attackerFromTarget: THREE.Vector3
): HitDirection {
  const f = targetForward.clone().setY(0).normalize();
  const a = attackerFromTarget.clone().setY(0).normalize();
  const dot = f.dot(a);
  const cross = f.x * a.z - f.z * a.x;
  if (dot > 0.72) return 'front';
  if (dot < -0.72) return 'back';
  return cross > 0 ? 'right' : 'left';
}

export function getHitDirection(
  targetForward: { x: number; z: number },
  hitPoint: { x: number; z: number },
  targetPosition: { x: number; z: number }
): HitDirection {
  const ax = hitPoint.x - targetPosition.x;
  const az = hitPoint.z - targetPosition.z;
  const len = Math.hypot(ax, az) || 1;
  const x = ax / len;
  const z = az / len;
  const dot = targetForward.x * x + targetForward.z * z;
  const cross = targetForward.x * z - targetForward.z * x;
  if (dot > 0.7) return 'front';
  if (dot < -0.7) return 'back';
  return cross > 0 ? 'right' : 'left';
}

import * as THREE from 'three';
import { clamp, expDamp } from '../core/math';
import { StaticCollider } from '../world/sectorBuilder';

export type CameraMode =
  | 'on_foot'
  | 'aiming_shoulder'
  | 'vehicle'
  | 'bike'
  | 'boat'
  | 'helicopter_aerial'
  | 'tank';

export class ThirdPersonCamera {
  public readonly camera: THREE.PerspectiveCamera;
  public mode: CameraMode = 'on_foot';
  public azimuth = 0;
  public elevation = 0.18;

  private distance = 4.5;
  private targetDistance = 4.5;
  private readonly target = new THREE.Vector3();
  private readonly desiredTarget = new THREE.Vector3();
  private readonly ideal = new THREE.Vector3();
  private readonly direction = new THREE.Vector3();
  private readonly hit = new THREE.Vector3();
  private readonly cameraRay = new THREE.Ray();
  private readonly shoulderScratch = new THREE.Vector3();
  private readonly shakeScratch = new THREE.Vector3();
  private readonly forwardScratch = new THREE.Vector3();
  private readonly rightScratch = new THREE.Vector3();

  private rawX = 0;
  private rawY = 0;
  private shake = 0;
  private shakeVelocity = 0;

  public constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  public handleMouseMove(dx: number, dy: number): void {
    this.rawX = Math.max(-2000, Math.min(2000, this.rawX + dx));
    this.rawY = Math.max(-2000, Math.min(2000, this.rawY + dy));
  }

  public addShake(amount: number): void {
    this.shakeVelocity += Math.min(3, Math.max(0, amount));
  }

  public resetInput(): void {
    this.rawX = 0;
    this.rawY = 0;
  }

  public update(
    targetPos: THREE.Vector3,
    dt: number,
    sprint: boolean = false,
    colliders: StaticCollider[] = []
  ): void {
    const smoothX = expDamp(0, this.rawX, 28, dt);
    const smoothY = expDamp(0, this.rawY, 28, dt);
    this.rawX -= smoothX;
    this.rawY -= smoothY;

    const sensitivity = 0.0026;
    this.azimuth -= smoothX * sensitivity;
    this.elevation = clamp(this.elevation - smoothY * sensitivity, -1.10, 1.10);

    let wantedDistance = 4.5;
    let targetFov = sprint ? 71 : 65;
    let height = 1.55;
    let shoulder = 0;

    switch (this.mode) {
      case 'aiming_shoulder':
        wantedDistance = 2.35;
        targetFov = 52;
        height = 1.48;
        shoulder = 0.58;
        break;
      case 'vehicle':
        wantedDistance = 7.2;
        targetFov = sprint ? 78 : 69;
        height = 2.0;
        break;
      case 'bike':
        wantedDistance = 5.4;
        targetFov = sprint ? 76 : 71;
        height = 1.8;
        break;
      case 'boat':
        wantedDistance = 8.5;
        targetFov = sprint ? 78 : 73;
        height = 2.5;
        break;
      case 'helicopter_aerial':
        wantedDistance = 15.0;
        targetFov = 74;
        height = 5.4;
        this.elevation = Math.max(0.38, this.elevation);
        break;
      case 'tank':
        wantedDistance = 9.5;
        targetFov = sprint ? 72 : 66;
        height = 2.8;
        break;
      case 'on_foot':
      default:
        wantedDistance = 4.5;
        targetFov = sprint ? 71 : 65;
        height = 1.55;
        shoulder = 0;
        break;
    }

    this.camera.fov = expDamp(this.camera.fov, targetFov, 8, dt);
    this.camera.updateProjectionMatrix();

    this.desiredTarget.copy(targetPos);
    this.desiredTarget.y += height;
    this.target.lerp(this.desiredTarget, 1 - Math.exp(-15 * dt));

    const ce = Math.cos(this.elevation);
    const se = Math.sin(this.elevation);
    const sa = Math.sin(this.azimuth);
    const ca = Math.cos(this.azimuth);

    this.direction.set(sa * ce, se, ca * ce).normalize();

    this.shoulderScratch.set(ca * shoulder, 0, -sa * shoulder);
    this.ideal.copy(this.target)
      .addScaledVector(this.direction, wantedDistance)
      .add(this.shoulderScratch);

    this.targetDistance = wantedDistance;

    this.cameraRay.origin.copy(this.target);
    this.cameraRay.direction.copy(this.direction);

    for (let i = 0; i < colliders.length; i++) {
      const c = colliders[i];
      const hitResult = this.cameraRay.intersectBox(c.box, this.hit);
      if (!hitResult) continue;
      const d = this.target.distanceTo(this.hit);
      this.targetDistance = Math.min(this.targetDistance, Math.max(0.75, d - 0.35));
    }

    this.distance = expDamp(this.distance, this.targetDistance, 20, dt);

    this.shakeVelocity *= Math.exp(-18 * dt);
    this.shake = expDamp(this.shake, this.shakeVelocity, 18, dt);

    const t = performance.now() * 0.001;
    const sx = Math.sin(t * 31) * this.shake * 0.01;
    const sy = Math.sin(t * 23) * this.shake * 0.008;
    const sz = Math.sin(t * 37) * this.shake * 0.007;
    this.shakeScratch.set(sx, sy, sz);

    this.camera.position.copy(this.target)
      .addScaledVector(this.direction, this.distance)
      .add(this.shakeScratch);

    this.camera.lookAt(this.target);
  }

  public getForwardVector(): THREE.Vector3 {
    return this.forwardScratch.set(-Math.sin(this.azimuth), 0, -Math.cos(this.azimuth)).normalize();
  }

  public getRightVector(): THREE.Vector3 {
    return this.rightScratch.set(Math.cos(this.azimuth), 0, -Math.sin(this.azimuth)).normalize();
  }
}

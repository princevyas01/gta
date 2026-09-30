import * as THREE from 'three';
import { clamp, lerp } from '../core/math';
import { StaticCollider } from '../world/sectorBuilder';

export type CameraMode = 'on_foot' | 'aiming_shoulder' | 'vehicle' | 'helicopter_aerial';

export class ThirdPersonCamera {
  public camera: THREE.PerspectiveCamera;
  public mode: CameraMode = 'on_foot';

  public azimuth = 0; // Horizontal orbit angle (radians)
  public elevation = 0.25; // Vertical orbit angle (radians)

  private currentDistance = 4.2;
  private currentTarget = new THREE.Vector3();

  // Pooled scratch objects to eliminate per-frame allocations
  private readonly cameraRay = new THREE.Ray();
  private readonly cameraHit = new THREE.Vector3();
  private readonly focalPoint = new THREE.Vector3();
  private readonly idealCamPos = new THREE.Vector3();
  private readonly camRayDirScratch = new THREE.Vector3();
  private readonly forwardScratch = new THREE.Vector3();
  private readonly rightScratch = new THREE.Vector3();

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  public handleMouseMove(deltaX: number, deltaY: number): void {
    const sensitivity = 0.0028;
    this.azimuth -= deltaX * sensitivity;
    this.elevation -= deltaY * sensitivity;
    // Clamp pitch between -0.6 and 1.2 radians
    this.elevation = clamp(this.elevation, -0.6, 1.2);
  }

  public update(
    targetPos: THREE.Vector3,
    dt: number,
    isSprinting: boolean = false,
    colliders: StaticCollider[] = []
  ): void {
    // Determine target distances and offsets based on mode
    let desiredDist = 4.2;
    let heightOffset = 1.6;
    let shoulderOffset = 0;
    let targetFov = 65;

    if (this.mode === 'aiming_shoulder') {
      desiredDist = 2.2;
      heightOffset = 1.5;
      shoulderOffset = 0.55;
      targetFov = 50; // ADS zoom
    } else if (this.mode === 'vehicle') {
      desiredDist = 7.0;
      heightOffset = 2.2;
      targetFov = isSprinting ? 75 : 65;
    } else if (this.mode === 'helicopter_aerial') {
      desiredDist = 14.0;
      heightOffset = 5.0;
      this.elevation = Math.max(0.4, this.elevation);
    } else if (isSprinting) {
      targetFov = 72;
    }

    // Smooth FOV
    this.camera.fov = lerp(this.camera.fov, targetFov, dt * 8);
    this.camera.updateProjectionMatrix();

    // Smooth target tracking
    this.focalPoint.copy(targetPos);
    this.focalPoint.y += heightOffset;
    this.currentTarget.lerp(this.focalPoint, dt * 14);

    // Compute ideal spherical camera position
    const cosElev = Math.cos(this.elevation);
    const sinElev = Math.sin(this.elevation);
    const sinAzim = Math.sin(this.azimuth);
    const cosAzim = Math.cos(this.azimuth);

    const dirX = sinAzim * cosElev;
    const dirY = sinElev;
    const dirZ = cosAzim * cosElev;

    // Right vector for shoulder offset
    const rightX = Math.cos(this.azimuth);
    const rightZ = -Math.sin(this.azimuth);

    this.idealCamPos.set(
      this.currentTarget.x + dirX * desiredDist + rightX * shoulderOffset,
      this.currentTarget.y + dirY * desiredDist,
      this.currentTarget.z + dirZ * desiredDist + rightZ * shoulderOffset
    );

    // Camera Collision Obstruction Prevention
    // Raycast from focal point toward camera position
    let actualDist = desiredDist;
    this.camRayDirScratch.subVectors(this.idealCamPos, this.currentTarget).normalize();
    const rayDist = this.currentTarget.distanceTo(this.idealCamPos);

    this.cameraRay.origin.copy(this.currentTarget);
    this.cameraRay.direction.copy(this.camRayDirScratch);

    for (const col of colliders) {
      const hit = this.cameraRay.intersectBox(col.box, this.cameraHit);
      if (hit) {
        const d = this.currentTarget.distanceTo(hit);
        if (d < rayDist && d < actualDist) {
          actualDist = Math.max(0.8, d - 0.2);
        }
      }
    }

    this.currentDistance = lerp(this.currentDistance, actualDist, dt * 15);

    this.camera.position.set(
      this.currentTarget.x + this.camRayDirScratch.x * this.currentDistance,
      this.currentTarget.y + this.camRayDirScratch.y * this.currentDistance,
      this.currentTarget.z + this.camRayDirScratch.z * this.currentDistance
    );

    this.camera.lookAt(this.currentTarget);
  }

  public getForwardVector(): THREE.Vector3 {
    this.camera.getWorldDirection(this.forwardScratch);
    this.forwardScratch.y = 0;
    return this.forwardScratch.normalize();
  }

  public getRightVector(): THREE.Vector3 {
    const fwd = this.getForwardVector();
    this.rightScratch.set(-fwd.z, 0, fwd.x);
    return this.rightScratch;
  }
}

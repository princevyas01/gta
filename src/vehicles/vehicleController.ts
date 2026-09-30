import * as THREE from 'three';
import { VehicleDefinition } from '../core/types';
import { InputState } from '../core/input';
import { clamp, lerp, WORLD_EXTENTS } from '../core/math';
import { soundEngine } from '../core/audio';
import { ParticleSystem } from '../rendering/particles';
import { StaticCollider } from '../world/sectorBuilder';

export class VehicleInstance {
  public def: VehicleDefinition;
  public mesh: THREE.Group;
  public wheels: THREE.Mesh[] = [];
  public turret?: THREE.Group;
  public rotor?: THREE.Group;
  public sirenLights?: THREE.Mesh[];

  public position: THREE.Vector3 = new THREE.Vector3();
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public rotationY: number = 0;
  public speed: number = 0; // m/s
  public steerAngle: number = 0;
  public isPlayerControlled: boolean = false;

  // Helicopter flight state
  public altitude: number = 0;
  public rotorSpeed: number = 0;
  public pitch: number = 0;
  public roll: number = 0;

  // Tank state
  public turretAngle: number = 0;

  // Damage & Health
  public health: number = 1000;
  public isDestroyed: boolean = false;
  private smokeTimer: number = 0;
  private sirenTimer: number = 0;

  // Scratch objects for zero-allocation simulation
  private readonly nextPosScratch = new THREE.Vector3();
  private readonly testSphere = new THREE.Sphere(new THREE.Vector3(), 0);
  private readonly exitScratch = new THREE.Vector3();
  private readonly smokeScratch = new THREE.Vector3();
  private readonly groundSmokeScratch = new THREE.Vector3();

  constructor(
    def: VehicleDefinition,
    modelData: {
      group: THREE.Group;
      wheels: THREE.Mesh[];
      turret?: THREE.Group;
      rotor?: THREE.Group;
      sirenLights?: THREE.Mesh[];
    },
    spawnPos: THREE.Vector3,
    spawnRotY: number = 0
  ) {
    this.def = def;
    this.mesh = modelData.group;
    this.wheels = modelData.wheels;
    this.turret = modelData.turret;
    this.rotor = modelData.rotor;
    this.sirenLights = modelData.sirenLights;

    this.position.copy(spawnPos);
    this.rotationY = spawnRotY;
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotationY;
  }

  public getSafeExitPosition(colliders: StaticCollider[]): THREE.Vector3 {
    const side = new THREE.Vector3(
      Math.cos(this.rotationY),
      0,
      -Math.sin(this.rotationY)
    );
    const offsets = [1.8, -1.8, 2.8, -2.8];
    for (const distance of offsets) {
      this.exitScratch.copy(this.position).addScaledVector(side, distance);
      this.exitScratch.y = this.position.y + 0.1;
      let blocked = false;
      for (const collider of colliders) {
        if (collider.box.containsPoint(this.exitScratch)) {
          blocked = true;
          break;
        }
      }
      if (!blocked) return this.exitScratch.clone();
    }
    return this.position.clone().addScaledVector(side, 1.8);
  }

  public dispose(): void {
    this.mesh.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) {
        for (const entry of material) entry.dispose();
      } else {
        material?.dispose();
      }
    });
    this.mesh.removeFromParent();
  }

  public update(
    input: InputState | null,
    dt: number,
    particles: ParticleSystem,
    colliders: StaticCollider[],
    targetAimAngle?: number
  ): void {
    if (this.isDestroyed) return;

    if (this.def.isAircraft) {
      this.updateHelicopter(input, dt, particles);
    } else if (this.def.hasTurret) {
      this.updateTank(input, dt, particles, colliders, targetAimAngle);
    } else if (this.def.isBoat) {
      this.updateBoat(input, dt, particles);
    } else if (this.def.class === 'motorbike') {
      this.updateMotorbike(input, dt, particles, colliders);
    } else {
      this.updateCar(input, dt, particles, colliders);
    }

    // Damage effects (smoke / fire when health drops)
    if (this.health < 400) {
      this.smokeTimer += dt;
      if (this.smokeTimer > 0.08) {
        this.smokeTimer = 0;
        this.smokeScratch.set(
          Math.sin(this.rotationY) * this.def.dimensions.length * 0.4,
          1.2,
          Math.cos(this.rotationY) * this.def.dimensions.length * 0.4
        ).add(this.position);
        particles.emitTireSmoke(this.smokeScratch);
      }
    }

    // Police Siren animation
    if (this.sirenLights && this.sirenLights.length >= 2) {
      this.sirenTimer += dt * 8;
      const isRed = Math.floor(this.sirenTimer) % 2 === 0;
      this.sirenLights[0].visible = isRed;
      this.sirenLights[1].visible = !isRed;
    }

    // Sync 3D mesh
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotationY;
  }

  /**
   * 4-Wheeled Ground Vehicle Physics (Cars, Pickups, Vans, Police)
   */
  private updateCar(
    input: InputState | null,
    dt: number,
    particles: ParticleSystem,
    colliders: StaticCollider[]
  ): void {
    let throttle = 0;
    let steer = 0;
    let handbrake = false;

    if (input && this.isPlayerControlled) {
      if (input.forward) throttle += 1;
      if (input.backward) throttle -= 0.6;
      if (input.left) steer += 1;
      if (input.right) steer -= 1;
      if (input.jump) handbrake = true;
      if (input.sprint) throttle *= 1.35; // Nitro burst
    }

    // Steering response (speed sensitive)
    const speedRatio = Math.abs(this.speed) / this.def.topSpeed;
    const maxSteer = this.def.steerAngle * (1 - speedRatio * 0.45);
    const targetSteer = steer * maxSteer;
    this.steerAngle = lerp(this.steerAngle, targetSteer, dt * 10);

    // Throttle & Braking
    const accel = this.def.acceleration * (input?.sprint ? 1.35 : 1.0);
    if (throttle > 0) {
      this.speed += accel * dt;
    } else if (throttle < 0) {
      if (this.speed > 0.5) {
        this.speed -= this.def.brakeForce * dt;
      } else {
        this.speed -= accel * 0.6 * dt; // Reverse
      }
    } else {
      // Rolling drag resistance
      const drag = handbrake ? 45.0 : 8.5;
      this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), drag * dt);
    }

    this.speed = clamp(this.speed, -this.def.topSpeed * 0.35, this.def.topSpeed);

    // Turning yaw based on speed and wheel angle
    if (Math.abs(this.speed) > 0.2) {
      const turnMultiplier = handbrake ? 1.8 : 1.0;
      this.rotationY += this.steerAngle * (this.speed / 5.0) * turnMultiplier * dt;
    }

    // Drift smoke on handbrake
    if (handbrake && Math.abs(this.speed) > 12) {
      particles.emitTireSmoke(this.position);
    }

    // Velocity update
    const forwardX = Math.sin(this.rotationY);
    const forwardZ = Math.cos(this.rotationY);
    this.velocity.set(forwardX * this.speed, 0, forwardZ * this.speed);

    // Position integration with pooled collision
    this.nextPosScratch.copy(this.position).addScaledVector(this.velocity, dt);

    const carRadius = this.def.dimensions.width * 0.6;
    this.testSphere.center.copy(this.nextPosScratch);
    this.testSphere.radius = carRadius;

    for (const col of colliders) {
      if (col.box.intersectsSphere(this.testSphere)) {
        // Crash reaction
        this.speed *= -0.3; // Bounce back
        this.health -= Math.abs(this.speed) * 8;
        particles.emitExplosion(this.nextPosScratch);
        return;
      }
    }

    // Clamp or reject positions outside the playable envelope
    if (
      this.nextPosScratch.x < WORLD_EXTENTS.minX ||
      this.nextPosScratch.x > WORLD_EXTENTS.maxX ||
      this.nextPosScratch.z < WORLD_EXTENTS.minZ ||
      this.nextPosScratch.z > WORLD_EXTENTS.maxZ
    ) {
      this.speed *= -0.5;
      return;
    }

    this.position.copy(this.nextPosScratch);

    // Wheel rotation animation
    const wheelRotDelta = (this.speed / (this.def.dimensions.height * 0.26)) * dt;
    this.wheels.forEach((w, idx) => {
      w.rotation.x += wheelRotDelta;
      if (idx < 2) {
        // Front wheels turn
        w.rotation.y = this.steerAngle;
      }
    });

    if (this.isPlayerControlled) {
      soundEngine.updateVehicleEngine(speedRatio);
    }
  }

  /**
   * Boat Physics
   */
  private updateBoat(
    input: InputState | null,
    dt: number,
    particles: ParticleSystem
  ): void {
    let throttle = 0;
    let steer = 0;
    if (input && this.isPlayerControlled) {
      if (input.forward) throttle += 1;
      if (input.backward) throttle -= 0.5;
      if (input.left) steer += 1;
      if (input.right) steer -= 1;
    }

    this.speed += throttle * this.def.acceleration * dt;
    this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 2.5 * dt);
    this.speed = clamp(this.speed, -this.def.topSpeed * 0.25, this.def.topSpeed);

    const steeringAuthority = clamp(Math.abs(this.speed) / 10, 0, 1);
    this.rotationY += steer * 0.45 * steeringAuthority * dt;

    const forwardX = Math.sin(this.rotationY);
    const forwardZ = Math.cos(this.rotationY);
    this.velocity.set(forwardX * this.speed, 0, forwardZ * this.speed);
    this.position.addScaledVector(this.velocity, dt);

    if (Math.abs(this.speed) > 8 && this.isPlayerControlled) {
      particles.emitTireSmoke(this.position);
    }
  }

  /**
   * Motorbike Physics
   */
  private updateMotorbike(
    input: InputState | null,
    dt: number,
    particles: ParticleSystem,
    colliders: StaticCollider[]
  ): void {
    let throttle = 0;
    let steer = 0;
    if (input && this.isPlayerControlled) {
      if (input.forward) throttle += 1;
      if (input.backward) throttle -= 0.7;
      if (input.left) steer += 1;
      if (input.right) steer -= 1;
    }

    this.speed += throttle * this.def.acceleration * dt;
    this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 7 * dt);
    this.speed = clamp(this.speed, -this.def.topSpeed * 0.35, this.def.topSpeed);

    const lean = -steer * clamp(Math.abs(this.speed) / this.def.topSpeed, 0, 1) * 0.35;
    this.mesh.rotation.z = lean;

    const turnRate = steer * clamp(Math.abs(this.speed) / 6, 0, 1.4);
    this.rotationY += turnRate * dt;

    const forwardX = Math.sin(this.rotationY);
    const forwardZ = Math.cos(this.rotationY);
    this.velocity.set(forwardX * this.speed, 0, forwardZ * this.speed);

    this.nextPosScratch.copy(this.position).addScaledVector(this.velocity, dt);
    this.testSphere.center.copy(this.nextPosScratch);
    this.testSphere.radius = 0.55;

    for (const collider of colliders) {
      if (collider.box.intersectsSphere(this.testSphere)) {
        this.speed *= -0.2;
        this.health -= 15;
        return;
      }
    }

    this.position.copy(this.nextPosScratch);

    for (const wheel of this.wheels) {
      wheel.rotation.x += (this.speed / 0.35) * dt;
    }

    if (this.isPlayerControlled) {
      soundEngine.updateVehicleEngine(Math.abs(this.speed) / this.def.topSpeed);
    }
  }

  /**
   * Helicopter Flight Physics (HX-4 Sparrow)
   */
  private updateHelicopter(input: InputState | null, dt: number, particles: ParticleSystem): void {
    let lift = 0;
    let yaw = 0;
    let pitchInput = 0;

    if (input && this.isPlayerControlled) {
      if (input.jump) lift += 1; // Ascend
      if (input.crouch) lift -= 1; // Descend
      if (input.forward) pitchInput += 1;
      if (input.backward) pitchInput -= 1;
      if (input.left) yaw += 1;
      if (input.right) yaw -= 1;
    }

    // Rotor acceleration
    this.rotorSpeed = lerp(this.rotorSpeed, 35.0, dt * 2);
    if (this.rotor) {
      this.rotor.rotation.y += this.rotorSpeed * dt;
    }

    // Vertical climb
    this.velocity.y += (lift * 18.0 - 9.8 * 0.8) * dt;
    this.velocity.y = clamp(this.velocity.y, -12, 18);
    this.position.y += this.velocity.y * dt;
    if (this.position.y < 0.2) {
      this.position.y = 0.2;
      this.velocity.y = 0;
    }

    // Yaw rotation
    this.rotationY += yaw * 1.5 * dt;

    // Pitch forward/backward flight propulsion
    this.pitch = lerp(this.pitch, pitchInput * 0.35, dt * 4);
    const forwardX = Math.sin(this.rotationY);
    const forwardZ = Math.cos(this.rotationY);
    const horizontalSpeed = this.pitch * this.def.topSpeed;
    this.position.x += forwardX * horizontalSpeed * dt;
    this.position.z += forwardZ * horizontalSpeed * dt;

    // Rotor wash on ground
    if (this.position.y < 12) {
      this.groundSmokeScratch.set(this.position.x, 0.1, this.position.z);
      particles.emitTireSmoke(this.groundSmokeScratch);
    }
  }

  /**
   * Light Tank Physics & Cannon Turret (AR-7 Mastiff)
   */
  private updateTank(
    input: InputState | null,
    dt: number,
    particles: ParticleSystem,
    colliders: StaticCollider[],
    targetAimAngle?: number
  ): void {
    let throttle = 0;
    let steer = 0;

    if (input && this.isPlayerControlled) {
      if (input.forward) throttle += 1;
      if (input.backward) throttle -= 0.6;
      if (input.left) steer += 1;
      if (input.right) steer -= 1;
    }

    // Heavy track torque
    this.speed += throttle * this.def.acceleration * dt;
    this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 15 * dt);
    this.speed = clamp(this.speed, -this.def.topSpeed * 0.4, this.def.topSpeed);

    // Differential steering
    this.rotationY += steer * 0.8 * dt;

    const fwdX = Math.sin(this.rotationY);
    const fwdZ = Math.cos(this.rotationY);
    this.position.x += fwdX * this.speed * dt;
    this.position.z += fwdZ * this.speed * dt;

    // Cannon Turret Tracking
    if (this.turret && targetAimAngle !== undefined) {
      const relAngle = targetAimAngle - this.rotationY;
      this.turretAngle = lerp(this.turretAngle, relAngle, dt * 6);
      this.turret.rotation.y = this.turretAngle;
    }
  }

  public takeDamage(amount: number, particles: ParticleSystem): void {
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0 && !this.isDestroyed) {
      this.isDestroyed = true;
      particles.emitExplosion(this.position);
      soundEngine.playGunshot('launcher');
    }
  }
}

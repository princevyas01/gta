import * as THREE from 'three';
import { VehicleDefinition } from '../core/types';
import { InputState } from '../core/input';
import { clamp, lerp } from '../core/math';
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
    } else {
      this.updateCar(input, dt, particles, colliders);
    }

    // Damage effects (smoke / fire when health drops)
    if (this.health < 400) {
      this.smokeTimer += dt;
      if (this.smokeTimer > 0.08) {
        this.smokeTimer = 0;
        const hoodPos = this.position.clone().add(
          new THREE.Vector3(0, 1.2, 0).add(
            new THREE.Vector3(0, 0, this.def.dimensions.length * 0.4).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationY)
          )
        );
        particles.emitTireSmoke(hoodPos);
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
   * 4-Wheeled Ground Vehicle Physics (Cars, Pickups, Vans, Bikes, Police)
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

    // Position integration
    const nextPos = this.position.clone().addScaledVector(this.velocity, dt);

    // Swept Box/Sphere obstacle collision
    const carRadius = this.def.dimensions.width * 0.6;
    for (const col of colliders) {
      if (col.box.intersectsSphere(new THREE.Sphere(nextPos, carRadius))) {
        // Crash reaction
        this.speed *= -0.3; // Bounce back
        this.health -= Math.abs(this.speed) * 8;
        particles.emitExplosion(nextPos);
        return;
      }
    }

    this.position.copy(nextPos);

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
      particles.emitTireSmoke(new THREE.Vector3(this.position.x, 0.1, this.position.z));
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

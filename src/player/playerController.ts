import * as THREE from 'three';
import type * as RAPIER from '@dimforge/rapier3d-compat';
import { CharacterModel } from './characterModel';
import { ThirdPersonCamera } from './thirdPersonCamera';
import { InputState } from '../core/input';
import { PlayerLocomotionState, PlayerStats, InventoryItem, WeaponDefinition } from '../core/types';
import { expDamp, expDampAngle } from '../core/math';
import { WorldStreamer } from '../world/worldStreamer';
import { CANONICAL_WEAPONS } from '../data/weapons';
import { soundEngine } from '../core/audio';
import { eventBus } from '../core/events';
import type { VehicleInstance } from '../vehicles/vehicleController';
import { PhysicsWorld } from '../physics/physicsWorld';

export class PlayerController {
  public model: CharacterModel;
  public camera: ThirdPersonCamera;
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public facingAngle: number = 0;

  public state: PlayerLocomotionState = 'idle';
  public stats: PlayerStats = {
    health: 100,
    maxHealth: 100,
    armor: 100,
    maxArmor: 100,
    cash: 2500,
    stamina: 100
  };

  public inventory: InventoryItem[] = [
    { weaponId: 'wep_p1_vesper', ammo: 15, reserveAmmo: 90 },
    { weaponId: 'wep_vortex_45', ammo: 32, reserveAmmo: 160 },
    { weaponId: 'wep_arcline_ar', ammo: 30, reserveAmmo: 120 }
  ];
  public activeWeaponIndex: number = 0;
  public isAiming: boolean = false;
  public currentVehicle: VehicleInstance | null = null;

  private isGrounded: boolean = true;
  private readonly gravity: number = 24.0;
  private readonly walkSpeed: number = 4.2;
  private readonly jogSpeed: number = 7.5;
  private readonly sprintSpeed: number = 11.8;
  private readonly aimSpeed: number = 3.2;

  // Jump buffer & coyote time timers (seconds)
  private jumpBufferTimer: number = 0;
  private coyoteTimer: number = 0;
  private fallAirTime: number = 0;

  private physicsWorld: PhysicsWorld | null = null;
  private playerBody: {
    rigidBody: RAPIER.RigidBody;
    collider: RAPIER.Collider;
  } | null = null;

  private readonly unsubscribeVehicleExit: () => void;
  private readonly moveDir = new THREE.Vector3();

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.model = new CharacterModel();
    scene.add(this.model.mesh);
    this.camera = new ThirdPersonCamera(camera);

    this.unsubscribeVehicleExit = eventBus.on('VEHICLE_EXIT', data => {
      this.currentVehicle = null;
      this.position.set(data.position[0], data.position[1], data.position[2]);
      this.velocity.set(0, 0, 0);
      this.state = 'idle';
      this.model.mesh.visible = true;
      if (this.physicsWorld && this.playerBody) {
        this.physicsWorld.setPlayerTranslation(this.playerBody.rigidBody, [
          this.position.x,
          this.position.y + 0.9,
          this.position.z
        ]);
      }
    });
  }

  public attachPhysics(world: PhysicsWorld): void {
    this.physicsWorld = world;
    const created = world.createPlayerControllerBody([
      this.position.x,
      this.position.y + 0.9,
      this.position.z
    ]);
    this.playerBody = created;
  }

  public update(input: InputState, dt: number, streamer: WorldStreamer): void {
    if (this.stats.health <= 0) {
      this.state = 'dead';
      this.model.updateAnimation(this.state, 0, dt, false);
      return;
    }

    if (this.currentVehicle) {
      this.state = 'in_vehicle';
      this.model.mesh.position.copy(this.currentVehicle.position);
      this.model.mesh.rotation.y = this.currentVehicle.rotationY;
      this.model.updateAnimation(this.state, 0, dt, false);
      this.camera.mode = this.currentVehicle.def.isAircraft ? 'helicopter_aerial' : 'vehicle';
      this.camera.update(this.currentVehicle.position, dt, input.sprint, streamer.allColliders);
      return;
    }

    // 1. Weapon selection
    if (input.weaponSlot !== null && input.weaponSlot < this.inventory.length) {
      this.activeWeaponIndex = input.weaponSlot;
      soundEngine.playUIClick();
      eventBus.emit('WEAPON_CHANGED', { weaponId: this.getActiveWeapon().def.id });
    }

    this.isAiming = input.aim;
    this.camera.mode = this.isAiming ? 'aiming_shoulder' : 'on_foot';

    // 2. Camera-relative movement vector
    const camFwd = this.camera.getForwardVector();
    const camRight = this.camera.getRightVector();

    let fwdInput = 0;
    if (input.forward) fwdInput += 1;
    if (input.backward) fwdInput -= 1;

    let strafeInput = 0;
    if (input.right) strafeInput += 1;
    if (input.left) strafeInput -= 1;

    this.moveDir.set(0, 0, 0);
    if (fwdInput !== 0) this.moveDir.addScaledVector(camFwd, fwdInput);
    if (strafeInput !== 0) this.moveDir.addScaledVector(camRight, strafeInput);

    const isMoving = this.moveDir.lengthSq() > 0.001;
    if (isMoving) {
      this.moveDir.normalize();
    }

    // 3. Movement Speed & Modifiers (backward / strafe penalty)
    let baseSpeed = 0;
    if (isMoving) {
      if (this.isAiming) {
        baseSpeed = this.aimSpeed;
        this.state = 'walk';
        this.stats.stamina = Math.min(100, this.stats.stamina + dt * 10);
      } else if (input.sprint && this.stats.stamina > 5) {
        baseSpeed = this.sprintSpeed;
        this.stats.stamina = Math.max(0, this.stats.stamina - dt * 15);
        this.state = 'sprint';
      } else {
        baseSpeed = this.jogSpeed;
        this.state = 'jog';
        this.stats.stamina = Math.min(100, this.stats.stamina + dt * 12);
      }

      // Backward and strafe speed factor
      let speedFactor = 1.0;
      if (fwdInput < 0) {
        speedFactor *= 0.65;
      } else if (fwdInput === 0 && strafeInput !== 0) {
        speedFactor *= 0.80;
      }
      baseSpeed *= speedFactor;
    } else {
      this.state = 'idle';
      this.stats.stamina = Math.min(100, this.stats.stamina + dt * 20);
    }

    // 4. Horizontal Acceleration & Deceleration with expDamp
    const targetVelX = this.moveDir.x * baseSpeed;
    const targetVelZ = this.moveDir.z * baseSpeed;
    const accelLambda = isMoving ? 22.0 : 28.0;
    this.velocity.x = expDamp(this.velocity.x, targetVelX, accelLambda, dt);
    this.velocity.z = expDamp(this.velocity.z, targetVelZ, accelLambda, dt);

    // 5. Jump Buffer & Coyote Time (100ms = 0.10s)
    if (input.jumpPressed) {
      this.jumpBufferTimer = 0.10;
    } else if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer -= dt;
    }

    if (this.isGrounded) {
      this.coyoteTimer = 0.10;
      this.fallAirTime = 0;
    } else {
      this.coyoteTimer = Math.max(0, this.coyoteTimer - dt);
      this.fallAirTime += dt;
      this.velocity.y -= this.gravity * dt;
      if (this.velocity.y < -0.5) {
        this.state = 'fall';
      }
    }

    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      this.velocity.y = 8.5; // Jump impulse
      this.isGrounded = false;
      this.jumpBufferTimer = 0;
      this.coyoteTimer = 0;
      this.state = 'jump';
      soundEngine.playFootstep();
    }

    // 6. Authoritative Physics Movement via Rapier Character Controller
    const wasGrounded = this.isGrounded;
    this.moveWithPhysics(dt, streamer);

    // Landing detection
    if (!wasGrounded && this.isGrounded) {
      const impactMagnitude = Math.min(1.0, this.fallAirTime * 1.5);
      if (impactMagnitude > 0.3) {
        this.camera.addShake(impactMagnitude * 0.4);
        soundEngine.playFootstep();
      }
      this.fallAirTime = 0;
    }

    this.model.mesh.position.copy(this.position);

    // 7. Rotation Orientation with expDampAngle
    if (this.isAiming) {
      const aimHeading = this.camera.azimuth + Math.PI;
      this.facingAngle = expDampAngle(this.facingAngle, aimHeading, 24, dt);
    } else if (isMoving) {
      const moveAngle = Math.atan2(this.velocity.x, this.velocity.z);
      this.facingAngle = expDampAngle(this.facingAngle, moveAngle, 14, dt);
    }
    this.model.mesh.rotation.y = this.facingAngle;

    // 8. Locomotion Animation
    const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.model.updateAnimation(this.state, horizontalSpeed, dt, this.isAiming);

    // 9. Camera Update
    this.camera.update(this.position, dt, input.sprint, streamer.allColliders);
  }

  private moveWithPhysics(dt: number, streamer: WorldStreamer): void {
    if (this.physicsWorld && this.playerBody) {
      const desired = {
        x: this.velocity.x * dt,
        y: this.velocity.y * dt,
        z: this.velocity.z * dt
      };
      const result = this.physicsWorld.moveCharacter(this.playerBody.collider, desired);
      this.position.x += result.x;
      this.position.y += result.y;
      this.position.z += result.z;
      this.isGrounded = result.isGrounded;
      if (result.isGrounded && this.velocity.y < 0) {
        this.velocity.y = 0;
      }
      this.physicsWorld.setPlayerTranslation(this.playerBody.rigidBody, [
        this.position.x,
        this.position.y + 0.9,
        this.position.z
      ]);
    } else {
      // Fallback only during boot before physics attaches
      this.position.x += this.velocity.x * dt;
      this.position.z += this.velocity.z * dt;
      this.position.y += this.velocity.y * dt;
      const groundY = streamer.getGroundHeight(this.position.x, this.position.z, this.position.y);
      if (this.position.y <= groundY) {
        this.position.y = groundY;
        this.velocity.y = 0;
        this.isGrounded = true;
      }
    }
  }

  public getActiveWeapon(): { def: WeaponDefinition; item: InventoryItem } {
    const item = this.inventory[this.activeWeaponIndex] || this.inventory[0];
    const def = CANONICAL_WEAPONS.find(w => w.id === item.weaponId) || CANONICAL_WEAPONS[0];
    return { def, item };
  }

  public takeDamage(amount: number): void {
    if (this.stats.armor > 0) {
      const absorbed = Math.min(this.stats.armor, amount);
      this.stats.armor -= absorbed;
      amount -= absorbed;
    }
    this.stats.health = Math.max(0, this.stats.health - amount);
    eventBus.emit('PLAYER_DAMAGED', { health: this.stats.health, armor: this.stats.armor });
  }

  public addCash(amount: number): void {
    this.stats.cash += amount;
    eventBus.emit('CASH_CHANGED', this.stats.cash);
  }

  public dispose(): void {
    this.unsubscribeVehicleExit();
    if (this.physicsWorld && this.playerBody) {
      this.physicsWorld.removeCollider(this.playerBody.collider);
      this.playerBody = null;
    }
    this.model.dispose();
  }
}

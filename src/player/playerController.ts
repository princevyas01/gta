import * as THREE from 'three';
import { CharacterModel } from './characterModel';
import { ThirdPersonCamera } from './thirdPersonCamera';
import { InputState } from '../core/input';
import { PlayerLocomotionState, PlayerStats, InventoryItem } from '../core/types';
import { clamp, lerpAngle } from '../core/math';
import { WorldStreamer } from '../world/worldStreamer';
import { CANONICAL_WEAPONS } from '../data/weapons';
import { soundEngine } from '../core/audio';
import { eventBus } from '../core/events';

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
  public currentVehicle: any = null; // Reference to active VehicleInstance when mounted

  private isGrounded: boolean = true;
  private readonly gravity: number = 24.0;
  private readonly walkSpeed: number = 4.2;
  private readonly jogSpeed: number = 7.5;
  private readonly sprintSpeed: number = 12.0;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.model = new CharacterModel();
    scene.add(this.model.mesh);
    this.camera = new ThirdPersonCamera(camera);
  }

  public update(input: InputState, dt: number, streamer: WorldStreamer): void {
    if (this.stats.health <= 0) {
      this.state = 'dead';
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
      eventBus.emit('WEAPON_CHANGED', this.getActiveWeapon());
    }

    this.isAiming = input.aim;
    this.camera.mode = this.isAiming ? 'aiming_shoulder' : 'on_foot';

    // 2. Camera-relative movement vector
    const camFwd = this.camera.getForwardVector();
    const camRight = this.camera.getRightVector();

    const moveDir = new THREE.Vector3();
    if (input.forward) moveDir.add(camFwd);
    if (input.backward) moveDir.sub(camFwd);
    if (input.right) moveDir.add(camRight);
    if (input.left) moveDir.sub(camRight);

    const isMoving = moveDir.lengthSq() > 0.001;
    if (isMoving) {
      moveDir.normalize();
    }

    // 3. Movement Speed & Stamina
    let targetSpeed = 0;
    if (isMoving) {
      if (input.sprint && this.stats.stamina > 5) {
        targetSpeed = this.sprintSpeed;
        this.stats.stamina = Math.max(0, this.stats.stamina - dt * 15);
        this.state = 'sprint';
      } else {
        targetSpeed = this.isAiming ? this.walkSpeed * 0.75 : this.jogSpeed;
        this.state = this.isAiming ? 'walk' : 'jog';
        this.stats.stamina = Math.min(100, this.stats.stamina + dt * 12);
      }
    } else {
      this.state = 'idle';
      this.stats.stamina = Math.min(100, this.stats.stamina + dt * 20);
    }

    // 4. Horizontal Acceleration & Deceleration
    const accelRate = 22.0;
    const targetVelX = moveDir.x * targetSpeed;
    const targetVelZ = moveDir.z * targetSpeed;
    this.velocity.x += (targetVelX - this.velocity.x) * clamp(dt * accelRate, 0, 1);
    this.velocity.z += (targetVelZ - this.velocity.z) * clamp(dt * accelRate, 0, 1);

    // 5. Jump & Vertical Gravity
    if (this.isGrounded) {
      if (input.jump) {
        this.velocity.y = 8.5; // Jump impulse
        this.isGrounded = false;
        this.state = 'jump';
      } else {
        this.velocity.y = 0;
      }
    } else {
      this.velocity.y -= this.gravity * dt;
      if (this.velocity.y < -0.5) {
        this.state = 'fall';
      }
    }

    // 6. Swept Collision & Position Update
    const nextPos = this.position.clone();
    nextPos.x += this.velocity.x * dt;
    nextPos.z += this.velocity.z * dt;
    nextPos.y += this.velocity.y * dt;

    // Ground check (road / sidewalk / terrain)
    if (nextPos.y <= 0) {
      nextPos.y = 0;
      this.velocity.y = 0;
      this.isGrounded = true;
    }

    // World obstacle collision response
    const colTest = streamer.testCollision(nextPos, 0.45);
    if (colTest.hit) {
      // Slide along wall normal
      const dot = this.velocity.dot(colTest.normal);
      if (dot < 0) {
        this.velocity.sub(colTest.normal.clone().multiplyScalar(dot));
      }
      nextPos.x = this.position.x + this.velocity.x * dt;
      nextPos.z = this.position.z + this.velocity.z * dt;
    }

    this.position.copy(nextPos);
    this.model.mesh.position.copy(this.position);

    // 7. Rotation Orientation
    if (this.isAiming) {
      // Face camera look direction while aiming
      this.facingAngle = this.camera.azimuth + Math.PI;
    } else if (isMoving) {
      // Face movement direction
      const moveAngle = Math.atan2(this.velocity.x, this.velocity.z);
      this.facingAngle = lerpAngle(this.facingAngle, moveAngle, dt * 14);
    }
    this.model.mesh.rotation.y = this.facingAngle;

    // 8. Locomotion Animation
    const horizontalSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
    this.model.updateAnimation(this.state, horizontalSpeed, dt, this.isAiming);

    // 9. Camera Update
    this.camera.update(this.position, dt, input.sprint, streamer.allColliders);
  }

  public getActiveWeapon(): { def: any; item: InventoryItem } {
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
}

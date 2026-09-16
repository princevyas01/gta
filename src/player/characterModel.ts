import * as THREE from 'three';
import { PlayerLocomotionState } from '../core/types';

export class CharacterModel {
  public mesh: THREE.Group;
  // Articulated bone nodes
  private torso: THREE.Group;
  private head: THREE.Group;
  private leftArm: THREE.Group;
  private rightArm: THREE.Group;
  private leftLeg: THREE.Group;
  private rightLeg: THREE.Group;
  public weaponSocket: THREE.Group;

  private animTime = 0;

  constructor() {
    this.mesh = new THREE.Group();
    this.mesh.name = 'Hero_KaiMercer';

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 });
    const jacketMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.1 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });
    const bootsMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.6 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 }); // Amber tactical trim

    // 1. Torso & Asymmetrical Utility Jacket
    this.torso = new THREE.Group();
    this.torso.position.y = 1.0;

    const chestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.55, 0.28), jacketMat);
    chestMesh.castShadow = true;
    this.torso.add(chestMesh);

    // High collar
    const collarMesh = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.24), accentMat);
    collarMesh.position.y = 0.32;
    this.torso.add(collarMesh);

    // Inner base shirt visible at neck
    const shirtMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.22), shirtMat);
    shirtMesh.position.set(0, 0.22, 0.04);
    this.torso.add(shirtMesh);

    // Tactical utility chest harness
    const harnessMesh = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.22, 0.08), accentMat);
    harnessMesh.position.set(0, 0.05, 0.15);
    this.torso.add(harnessMesh);

    // 2. Head with short textured hair
    this.head = new THREE.Group();
    this.head.position.y = 0.42;

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.26, 0.24), skinMat);
    headMesh.castShadow = true;
    this.head.add(headMesh);

    // Textured hair cap
    const hairMesh = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.26), hairMat);
    hairMesh.position.set(0, 0.12, -0.01);
    this.head.add(hairMesh);

    this.torso.add(this.head);

    // 3. Left Arm
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.32, 0.22, 0);

    const lShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.3, 0.16), jacketMat);
    lShoulder.position.y = -0.15;
    lShoulder.castShadow = true;
    this.leftArm.add(lShoulder);

    const lHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.12), skinMat);
    lHand.position.y = -0.4;
    this.leftArm.add(lHand);

    this.torso.add(this.leftArm);

    // 4. Right Arm with Weapon Socket
    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.32, 0.22, 0);

    const rShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.3, 0.16), jacketMat);
    rShoulder.position.y = -0.15;
    rShoulder.castShadow = true;
    this.rightArm.add(rShoulder);

    const rHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.12), skinMat);
    rHand.position.y = -0.4;
    this.rightArm.add(rHand);

    // Tactical utility watch on right wrist
    const watchMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.14), accentMat);
    watchMesh.position.y = -0.32;
    this.rightArm.add(watchMesh);

    // Weapon Socket attached to right hand
    this.weaponSocket = new THREE.Group();
    this.weaponSocket.position.set(0, -0.48, 0.15);
    this.rightArm.add(this.weaponSocket);

    this.torso.add(this.rightArm);
    this.mesh.add(this.torso);

    // 5. Legs & Cargo Trousers
    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.14, 0.75, 0);

    const lThigh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), pantsMat);
    lThigh.position.y = -0.21;
    lThigh.castShadow = true;
    this.leftLeg.add(lThigh);

    const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.24), bootsMat);
    lBoot.position.set(0, -0.58, 0.02);
    lBoot.castShadow = true;
    this.leftLeg.add(lBoot);

    this.mesh.add(this.leftLeg);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.14, 0.75, 0);

    const rThigh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), pantsMat);
    rThigh.position.y = -0.21;
    rThigh.castShadow = true;
    this.rightLeg.add(rThigh);

    const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.24), bootsMat);
    rBoot.position.set(0, -0.58, 0.02);
    rBoot.castShadow = true;
    this.rightLeg.add(rBoot);

    this.mesh.add(this.rightLeg);
  }

  /**
   * Procedural skeletal locomotion animation
   */
  public updateAnimation(state: PlayerLocomotionState, speed: number, dt: number, isAiming: boolean): void {
    this.animTime += dt * (speed + 0.8) * 4.5;

    if (state === 'in_vehicle') {
      // Seated driving posture
      this.mesh.visible = true;
      this.leftLeg.rotation.x = -Math.PI / 2.2;
      this.rightLeg.rotation.x = -Math.PI / 2.2;
      this.leftArm.rotation.x = -Math.PI / 3;
      this.rightArm.rotation.x = -Math.PI / 3;
      this.torso.position.y = 0.55;
      return;
    }

    if (state === 'idle') {
      // Gentle breathing posture
      const breath = Math.sin(this.animTime * 0.4) * 0.02;
      this.torso.position.y = 1.0 + breath;
      this.head.rotation.x = breath * 0.5;
      this.leftArm.rotation.x = Math.sin(this.animTime * 0.4) * 0.05;
      this.rightArm.rotation.x = -Math.sin(this.animTime * 0.4) * 0.05;
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
    } else if (state === 'walk' || state === 'jog' || state === 'sprint') {
      // Locomotion swing cycle
      const swingFreq = state === 'sprint' ? 1.8 : 1.2;
      const legAngle = Math.sin(this.animTime * swingFreq) * (state === 'sprint' ? 0.9 : 0.55);
      const armAngle = -legAngle * 0.8;

      this.leftLeg.rotation.x = legAngle;
      this.rightLeg.rotation.x = -legAngle;

      if (!isAiming) {
        this.leftArm.rotation.x = armAngle;
        this.rightArm.rotation.x = -armAngle;
      }

      // Torso bobbing and sprint forward inclination
      const bob = Math.abs(Math.sin(this.animTime * swingFreq)) * 0.06;
      this.torso.position.y = 1.0 - bob;
      this.torso.rotation.x = state === 'sprint' ? 0.15 : 0.04;
    } else if (state === 'jump' || state === 'fall') {
      // Airborne pose
      this.leftLeg.rotation.x = 0.35;
      this.rightLeg.rotation.x = -0.25;
      this.leftArm.rotation.x = -0.6;
      this.rightArm.rotation.x = -0.6;
    }

    // Upper body aiming override
    if (isAiming) {
      this.rightArm.rotation.x = -Math.PI / 2.1;
      this.rightArm.rotation.y = -0.15;
      this.leftArm.rotation.x = -Math.PI / 2.3;
      this.leftArm.rotation.y = 0.35;
    }
  }
}

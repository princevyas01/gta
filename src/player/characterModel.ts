import * as THREE from 'three';
import { PlayerLocomotionState } from '../core/types';
import { HitDirection } from '../combat/hitReactionTypes';
import { expDamp } from '../core/math';

function roundedLimb(
  radius: number,
  length: number,
  material: THREE.Material
): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(radius, length, 6, 10),
    material
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeFace(
  head: THREE.Object3D,
  skin: THREE.Material,
  hair: THREE.Material,
  eye: THREE.Material
): void {
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 12), skin);
  skull.scale.set(0.92, 1.08, 0.94);
  skull.castShadow = true;
  head.add(skull);

  const jaw = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.11, 4, 8), skin);
  jaw.position.set(0, -0.075, 0.025);
  jaw.castShadow = true;
  head.add(jaw);

  const nose = new THREE.Mesh(new THREE.CapsuleGeometry(0.024, 0.07, 4, 6), skin);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, -0.01, 0.16);
  head.add(nose);

  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), eye);
  const eyeR = eyeL.clone();
  eyeL.position.set(-0.06, 0.035, 0.165);
  eyeR.position.set(0.06, 0.035, 0.165);
  head.add(eyeL, eyeR);

  const hairMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.205, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.60),
    hair
  );
  hairMesh.position.y = 0.05;
  hairMesh.castShadow = true;
  head.add(hairMesh);
}

export class CharacterModel {
  public mesh: THREE.Group;

  // Skeletal hierarchy
  public torso: THREE.Group;
  public chest: THREE.Group;
  public head: THREE.Group;
  public leftArm: THREE.Group;
  public rightArm: THREE.Group;
  public leftForearm: THREE.Group;
  public rightForearm: THREE.Group;
  public leftLeg: THREE.Group;
  public rightLeg: THREE.Group;
  public leftCalf: THREE.Group;
  public rightCalf: THREE.Group;
  public weaponSocket: THREE.Group;

  // Stride & Layered Animation State
  private stridePhase: number = 0;
  private breathTime: number = 0;
  private recoilImpulse: number = 0;
  private hitReactionTimer: number = 0;
  private hitReactionDirection: HitDirection = 'front';
  private hitReactionStrength: number = 0;
  private deathCollapseProgress: number = 0;

  constructor() {
    this.mesh = new THREE.Group();
    this.mesh.name = 'Hero_KaiMercer';

    // Stylized PBR Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xdeb887,
      roughness: 0.65,
      metalness: 0.05
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.9,
      metalness: 0.0
    });
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.1,
      metalness: 0.2
    });
    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.55,
      metalness: 0.15
    });
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.85
    });
    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.75
    });
    const bootsMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.45,
      metalness: 0.2
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.3
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.2,
      metalness: 0.8
    });

    // 1. Root Pelvis / Torso
    this.torso = new THREE.Group();
    this.torso.position.y = 0.95;
    this.mesh.add(this.torso);

    // Pelvis mesh
    const pelvisMesh = roundedLimb(0.18, 0.12, pantsMat);
    pelvisMesh.rotation.x = Math.PI / 2;
    this.torso.add(pelvisMesh);

    // Belt and buckle
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.06, 16), bootsMat);
    belt.position.y = 0.08;
    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.03), chromeMat);
    buckle.position.set(0, 0.08, 0.19);
    this.torso.add(belt, buckle);

    // 2. Chest & Upper Body
    this.chest = new THREE.Group();
    this.chest.position.y = 0.18;
    this.torso.add(this.chest);

    // Anatomical chest jacket
    const chestMesh = roundedLimb(0.22, 0.28, jacketMat);
    chestMesh.position.y = 0.14;
    this.chest.add(chestMesh);

    // Inner shirt visible at chest center
    const shirtInset = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.06), shirtMat);
    shirtInset.position.set(0, 0.18, 0.19);
    this.chest.add(shirtInset);

    // High collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.035, 8, 16), accentMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 0.30, 0.02);
    this.chest.add(collar);

    // Tactical harness & shoulder straps
    const harness = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.04), accentMat);
    harness.position.set(0, 0.14, 0.21);
    this.chest.add(harness);

    // 3. Head & Articulated Neck
    this.head = new THREE.Group();
    this.head.position.set(0, 0.36, 0);
    makeFace(this.head, skinMat, hairMat, eyeMat);
    this.chest.add(this.head);

    // 4. Left Arm (Shoulder -> Forearm -> Hand)
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.28, 0.24, 0);
    const lUpper = roundedLimb(0.075, 0.22, jacketMat);
    lUpper.position.y = -0.11;
    this.leftArm.add(lUpper);

    this.leftForearm = new THREE.Group();
    this.leftForearm.position.set(0, -0.24, 0);
    const lLower = roundedLimb(0.065, 0.20, jacketMat);
    lLower.position.y = -0.10;
    this.leftForearm.add(lLower);

    const lHand = roundedLimb(0.045, 0.08, skinMat);
    lHand.position.set(0, -0.22, 0);
    this.leftForearm.add(lHand);

    this.leftArm.add(this.leftForearm);
    this.chest.add(this.leftArm);

    // 5. Right Arm (Shoulder -> Forearm -> Hand + Weapon Socket)
    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.28, 0.24, 0);
    const rUpper = roundedLimb(0.075, 0.22, jacketMat);
    rUpper.position.y = -0.11;
    this.rightArm.add(rUpper);

    this.rightForearm = new THREE.Group();
    this.rightForearm.position.set(0, -0.24, 0);
    const rLower = roundedLimb(0.065, 0.20, jacketMat);
    rLower.position.y = -0.10;
    this.rightForearm.add(rLower);

    const rHand = roundedLimb(0.045, 0.08, skinMat);
    rHand.position.set(0, -0.22, 0);
    this.rightForearm.add(rHand);

    // Tactical watch
    const watch = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.04, 12), accentMat);
    watch.position.set(0, -0.16, 0);
    this.rightForearm.add(watch);

    // Weapon Socket attached to right hand
    this.weaponSocket = new THREE.Group();
    this.weaponSocket.position.set(0, -0.24, 0.06);
    this.rightForearm.add(this.weaponSocket);

    this.rightArm.add(this.rightForearm);
    this.chest.add(this.rightArm);

    // 6. Left Leg (Thigh -> Calf -> Boot)
    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.14, -0.05, 0);
    const lThigh = roundedLimb(0.09, 0.32, pantsMat);
    lThigh.position.y = -0.16;
    this.leftLeg.add(lThigh);

    this.leftCalf = new THREE.Group();
    this.leftCalf.position.set(0, -0.34, 0);
    const lShin = roundedLimb(0.08, 0.28, pantsMat);
    lShin.position.y = -0.14;
    this.leftCalf.add(lShin);

    const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.22), bootsMat);
    lBoot.position.set(0, -0.32, 0.04);
    lBoot.castShadow = true;
    this.leftCalf.add(lBoot);

    this.leftLeg.add(this.leftCalf);
    this.torso.add(this.leftLeg);

    // 7. Right Leg (Thigh -> Calf -> Boot)
    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.14, -0.05, 0);
    const rThigh = roundedLimb(0.09, 0.32, pantsMat);
    rThigh.position.y = -0.16;
    this.rightLeg.add(rThigh);

    this.rightCalf = new THREE.Group();
    this.rightCalf.position.set(0, -0.34, 0);
    const rShin = roundedLimb(0.08, 0.28, pantsMat);
    rShin.position.y = -0.14;
    this.rightCalf.add(rShin);

    const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.22), bootsMat);
    rBoot.position.set(0, -0.32, 0.04);
    rBoot.castShadow = true;
    this.rightCalf.add(rBoot);

    this.rightLeg.add(this.rightCalf);
    this.torso.add(this.rightLeg);
  }

  public triggerRecoil(intensity: number = 1.0): void {
    this.recoilImpulse = Math.min(1.0, this.recoilImpulse + intensity * 0.4);
  }

  public triggerHitReaction(direction: HitDirection, strength: number = 1.0): void {
    this.hitReactionTimer = 0.35;
    this.hitReactionDirection = direction;
    this.hitReactionStrength = strength;
  }

  /**
   * Layered procedural animation system
   */
  public updateAnimation(
    state: PlayerLocomotionState,
    speed: number,
    dt: number,
    isAiming: boolean
  ): void {
    // 1. Reset baseline transforms
    this.torso.position.set(0, 0.95, 0);
    this.torso.rotation.set(0, 0, 0);
    this.chest.rotation.set(0, 0, 0);
    this.head.rotation.set(0, 0, 0);
    this.leftArm.rotation.set(0, 0, 0);
    this.rightArm.rotation.set(0, 0, 0);
    this.leftForearm.rotation.set(0, 0, 0);
    this.rightForearm.rotation.set(0, 0, 0);
    this.leftLeg.rotation.set(0, 0, 0);
    this.rightLeg.rotation.set(0, 0, 0);
    this.leftCalf.rotation.set(0, 0, 0);
    this.rightCalf.rotation.set(0, 0, 0);

    this.mesh.visible = state !== 'in_vehicle';

    // 2. Death state priority
    if (state === 'dead') {
      this.deathCollapseProgress = Math.min(1.0, this.deathCollapseProgress + dt * 3.5);
      const p = this.deathCollapseProgress;
      this.torso.position.y = 0.95 * (1 - p) + 0.15 * p;
      this.torso.rotation.x = -Math.PI / 2 * p;
      this.leftArm.rotation.z = -1.2 * p;
      this.rightArm.rotation.z = 1.2 * p;
      this.leftLeg.rotation.x = 0.4 * p;
      this.rightLeg.rotation.x = -0.3 * p;
      return;
    }

    if (state === 'in_vehicle') {
      this.torso.position.y = 0.55;
      this.leftLeg.rotation.x = -Math.PI / 2.2;
      this.rightLeg.rotation.x = -Math.PI / 2.2;
      this.leftArm.rotation.x = -Math.PI / 3;
      this.rightArm.rotation.x = -Math.PI / 3;
      return;
    }

    // 3. Stride phase driven by distance / speed to eliminate foot-sliding (Page 47)
    if (speed > 0.1) {
      this.stridePhase += (speed / 1.4) * dt * Math.PI * 2;
    } else {
      // Gently return stride to resting phase
      this.stridePhase = expDamp(this.stridePhase, Math.round(this.stridePhase / Math.PI) * Math.PI, 10, dt);
    }
    this.breathTime += dt;

    // 4. Base Locomotion Layer
    if (speed < 0.1 && (state === 'idle')) {
      const breath = Math.sin(this.breathTime * 1.8) * 0.015;
      this.chest.position.y = breath;
      this.head.rotation.x = breath * 0.4;
      this.leftArm.rotation.x = Math.sin(this.breathTime * 1.8) * 0.04;
      this.rightArm.rotation.x = -Math.sin(this.breathTime * 1.8) * 0.04;
    } else if (state === 'jump' || state === 'fall') {
      this.leftLeg.rotation.x = 0.45;
      this.rightLeg.rotation.x = -0.30;
      this.leftCalf.rotation.x = 0.6;
      this.leftArm.rotation.x = -0.8;
      this.rightArm.rotation.x = -0.8;
    } else {
      // Walk / Jog / Sprint swing
      const swingAmp = state === 'sprint' ? 0.95 : state === 'jog' ? 0.65 : 0.42;
      const legAngle = Math.sin(this.stridePhase) * swingAmp;
      this.leftLeg.rotation.x = legAngle;
      this.rightLeg.rotation.x = -legAngle;

      // Natural knee flexion on backswing
      if (legAngle > 0) {
        this.leftCalf.rotation.x = legAngle * 0.7;
      } else {
        this.rightCalf.rotation.x = -legAngle * 0.7;
      }

      if (!isAiming) {
        const armAmp = swingAmp * 0.75;
        this.leftArm.rotation.x = -legAngle * armAmp;
        this.rightArm.rotation.x = legAngle * armAmp;
        this.leftForearm.rotation.x = Math.max(0, -legAngle * 0.4);
        this.rightForearm.rotation.x = Math.max(0, legAngle * 0.4);
      }

      // Torso bobbing and sprint lean
      const bob = Math.abs(Math.sin(this.stridePhase)) * (state === 'sprint' ? 0.06 : 0.03);
      this.torso.position.y = 0.95 - bob;
      this.torso.rotation.x = state === 'sprint' ? 0.16 : 0.05;
    }

    // 5. Upper-body Aiming Layer (Pages 46 & 49)
    if (isAiming) {
      this.chest.rotation.y = -0.15;
      this.head.rotation.y = 0.12;

      // Right arm raises weapon forward
      this.rightArm.rotation.x = -Math.PI / 2.1;
      this.rightArm.rotation.y = -0.15;
      this.rightForearm.rotation.x = 0.1;

      // Left arm supports weapon foregrip
      this.leftArm.rotation.x = -Math.PI / 2.3;
      this.leftArm.rotation.y = 0.42;
      this.leftForearm.rotation.x = 0.35;
    }

    // 6. Additive Recoil Layer
    if (this.recoilImpulse > 0.001) {
      this.recoilImpulse = expDamp(this.recoilImpulse, 0, 16, dt);
      this.rightArm.rotation.x += this.recoilImpulse * 0.25;
      this.chest.rotation.x += this.recoilImpulse * 0.10;
    }

    // 7. Directional Hit Reaction Layer (Pages 50 & 51)
    if (this.hitReactionTimer > 0) {
      this.hitReactionTimer -= dt;
      const t = Math.max(0, this.hitReactionTimer / 0.35);
      const intensity = t * this.hitReactionStrength;

      switch (this.hitReactionDirection) {
        case 'front':
          this.chest.rotation.x -= intensity * 0.35;
          this.torso.position.z -= intensity * 0.08;
          break;
        case 'back':
          this.chest.rotation.x += intensity * 0.35;
          this.torso.position.z += intensity * 0.08;
          break;
        case 'left':
          this.chest.rotation.z += intensity * 0.25;
          this.torso.rotation.y += intensity * 0.20;
          break;
        case 'right':
          this.chest.rotation.z -= intensity * 0.25;
          this.torso.rotation.y -= intensity * 0.20;
          break;
      }
    }
  }

  public dispose(): void {
    this.mesh.traverse(obj => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material?.dispose();
        }
      }
    });
    this.mesh.removeFromParent();
  }
}

import * as THREE from 'three';
import { materialLib } from '../rendering/materials';
import { HitDirection } from '../combat/hitReactionTypes';

export type NPCArchetype =
  | 'office_worker'
  | 'student'
  | 'tourist'
  | 'dock_worker'
  | 'service_worker'
  | 'street_vendor'
  | 'athlete'
  | 'police_officer';

function roundedLimb(
  radius: number,
  length: number,
  material: THREE.Material
): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(radius, length, 4, 8),
    material
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export class NPCModel {
  public mesh: THREE.Group;
  public torso: THREE.Group;
  public chest: THREE.Group;
  public head: THREE.Group;
  public leftArm: THREE.Group;
  public rightArm: THREE.Group;
  public leftLeg: THREE.Group;
  public rightLeg: THREE.Group;

  public archetype: NPCArchetype;
  private hitReactionTimer: number = 0;
  private hitReactionDirection: HitDirection = 'front';
  private deathCollapse: number = 0;

  constructor(archetype: NPCArchetype) {
    this.archetype = archetype;
    this.mesh = new THREE.Group();
    this.mesh.name = `NPC_${archetype}`;

    // Archetype-specific color palettes and materials (Pages 72-73)
    let topColor = 0x334155;
    let bottomColor = 0x1e293b;
    let shoeColor = 0x09090b;
    let skinColor = 0xdeb887;
    let hairColor = 0x1c1917;

    switch (archetype) {
      case 'office_worker':
        topColor = 0x475569; // Gray suit
        bottomColor = 0x1e293b; // Slacks
        shoeColor = 0x09090b; // Oxfords
        break;
      case 'student':
        topColor = 0x7c3aed; // Purple hoodie
        bottomColor = 0x3b82f6; // Blue jeans
        shoeColor = 0xf8fafc; // White sneakers
        hairColor = 0xb45309; // Light brown
        break;
      case 'tourist':
        topColor = 0xf59e0b; // Bright amber Hawaiian
        bottomColor = 0xd97706; // Khaki shorts
        shoeColor = 0x78716c; // Sandals
        break;
      case 'dock_worker':
        topColor = 0xf97316; // High-vis neon orange
        bottomColor = 0x1e293b; // Heavy work dungarees
        shoeColor = 0x7c2d12; // Steel toe boots
        break;
      case 'service_worker':
        topColor = 0x10b981; // Green barista / clerk apron
        bottomColor = 0x334155;
        shoeColor = 0x18181b;
        break;
      case 'street_vendor':
        topColor = 0xd97706; // Apron / casual jacket
        bottomColor = 0x475569;
        shoeColor = 0x0f172a;
        break;
      case 'athlete':
        topColor = 0xef4444; // Red athletic singlet
        bottomColor = 0x18181b; // Track pants
        shoeColor = 0x22c55e; // Neon running shoes
        break;
      case 'police_officer':
        topColor = 0x1e3a8a; // Navy tactical uniform
        bottomColor = 0x0f172a; // Police tactical pants
        shoeColor = 0x09090b; // Combat boots
        break;
    }

    const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.65 });
    const topMat = new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.75 });
    const bottomMat = new THREE.MeshStandardMaterial({ color: bottomColor, roughness: 0.8 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 });

    // 1. Torso & Pelvis
    this.torso = new THREE.Group();
    this.torso.position.y = 0.92;
    this.mesh.add(this.torso);

    const pelvis = roundedLimb(0.16, 0.12, bottomMat);
    pelvis.rotation.x = Math.PI / 2;
    this.torso.add(pelvis);

    // 2. Chest & Shirt / Uniform
    this.chest = new THREE.Group();
    this.chest.position.y = 0.16;
    this.torso.add(this.chest);

    const chestMesh = roundedLimb(0.20, 0.28, topMat);
    chestMesh.position.y = 0.14;
    this.chest.add(chestMesh);

    // Accessory details by archetype (Page 73)
    if (archetype === 'office_worker') {
      // Red tie
      const tie = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.02), materialLib.neonPink);
      tie.position.set(0, 0.14, 0.18);
      this.chest.add(tie);
    } else if (archetype === 'dock_worker') {
      // High-vis reflective stripes
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.04, 0.36), materialLib.roadMarkingYellow);
      stripe.position.set(0, 0.16, 0);
      this.chest.add(stripe);
    } else if (archetype === 'police_officer') {
      // Golden badge and radio harness
      const badge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), materialLib.vehicleChrome);
      badge.position.set(-0.08, 0.20, 0.18);
      this.chest.add(badge);
    }

    // 3. Head & Face
    this.head = new THREE.Group();
    this.head.position.set(0, 0.34, 0);
    this.chest.add(this.head);

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), skinMat);
    skull.scale.set(0.92, 1.05, 0.94);
    skull.castShadow = true;
    this.head.add(skull);

    // Hair / Cap / Helmet
    if (archetype === 'police_officer') {
      // Police peaked service cap
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.08, 12), topMat);
      cap.position.y = 0.14;
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.12), shoeMat);
      visor.position.set(0, 0.11, 0.16);
      this.head.add(cap, visor);
    } else if (archetype === 'dock_worker') {
      // Yellow construction hardhat
      const hardhat = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), materialLib.roadMarkingYellow);
      hardhat.position.y = 0.08;
      this.head.add(hardhat);
    } else {
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.175, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.65), hairMat);
      hair.position.y = 0.04;
      this.head.add(hair);
    }

    // 4. Arms
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.25, 0.22, 0);
    const lArmMesh = roundedLimb(0.065, 0.42, topMat);
    lArmMesh.position.y = -0.19;
    this.leftArm.add(lArmMesh);
    this.chest.add(this.leftArm);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.25, 0.22, 0);
    const rArmMesh = roundedLimb(0.065, 0.42, topMat);
    rArmMesh.position.y = -0.19;
    this.rightArm.add(rArmMesh);
    this.chest.add(this.rightArm);

    // 5. Legs & Shoes
    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.12, -0.06, 0);
    const lLegMesh = roundedLimb(0.08, 0.48, bottomMat);
    lLegMesh.position.y = -0.22;
    this.leftLeg.add(lLegMesh);

    const lShoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 0.18), shoeMat);
    lShoe.position.set(0, -0.48, 0.03);
    this.leftLeg.add(lShoe);
    this.torso.add(this.leftLeg);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.12, -0.06, 0);
    const rLegMesh = roundedLimb(0.08, 0.48, bottomMat);
    rLegMesh.position.y = -0.22;
    this.rightLeg.add(rLegMesh);

    const rShoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 0.18), shoeMat);
    rShoe.position.set(0, -0.48, 0.03);
    this.rightLeg.add(rShoe);
    this.torso.add(this.rightLeg);
  }

  public triggerHitReaction(direction: HitDirection): void {
    this.hitReactionTimer = 0.35;
    this.hitReactionDirection = direction;
  }

  public animate(speed: number, time: number, isDead: boolean): void {
    if (isDead) {
      this.deathCollapse = Math.min(1.0, this.deathCollapse + 0.1);
      const p = this.deathCollapse;
      this.torso.position.y = 0.92 * (1 - p) + 0.12 * p;
      this.torso.rotation.x = -Math.PI / 2 * p;
      this.leftArm.rotation.z = -0.8 * p;
      this.rightArm.rotation.z = 0.8 * p;
      return;
    }

    if (speed > 0.1) {
      const legAngle = Math.sin(time * 6.5) * 0.55;
      this.leftLeg.rotation.x = legAngle;
      this.rightLeg.rotation.x = -legAngle;
      this.leftArm.rotation.x = -legAngle * 0.75;
      this.rightArm.rotation.x = legAngle * 0.75;
      this.torso.position.y = 0.92 - Math.abs(Math.sin(time * 6.5)) * 0.03;
    } else {
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
      this.torso.position.y = 0.92 + Math.sin(time * 2.0) * 0.01;
    }

    // Directional Hit Reaction response (Pages 50-51)
    if (this.hitReactionTimer > 0) {
      this.hitReactionTimer -= 0.016;
      const t = Math.max(0, this.hitReactionTimer / 0.35);
      if (this.hitReactionDirection === 'front') {
        this.chest.rotation.x = -t * 0.35;
      } else if (this.hitReactionDirection === 'back') {
        this.chest.rotation.x = t * 0.35;
      } else if (this.hitReactionDirection === 'left') {
        this.chest.rotation.z = t * 0.25;
      } else {
        this.chest.rotation.z = -t * 0.25;
      }
    } else {
      this.chest.rotation.set(0, 0, 0);
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

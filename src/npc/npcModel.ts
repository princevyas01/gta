import * as THREE from 'three';

export type NPCArchetype = 'office_worker' | 'tourist' | 'police_officer';

export class NPCModel {
  public mesh: THREE.Group;
  private torso: THREE.Mesh;
  private head: THREE.Mesh;
  private leftArm: THREE.Mesh;
  private rightArm: THREE.Mesh;
  private leftLeg: THREE.Mesh;
  private rightLeg: THREE.Mesh;

  constructor(archetype: NPCArchetype) {
    this.mesh = new THREE.Group();

    // Archetype specific palette
    let shirtColor = 0x475569; // Office slate
    let pantsColor = 0x1e293b;
    if (archetype === 'tourist') {
      shirtColor = 0xf59e0b; // Bright yellow/amber Hawaiian
      pantsColor = 0xd97706;
    } else if (archetype === 'police_officer') {
      shirtColor = 0x1e3a8a; // Police navy
      pantsColor = 0x0f172a;
    }

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.7 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.75 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.6 });

    // Torso
    this.torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.5, 0.24), shirtMat);
    this.torso.position.y = 1.0;
    this.torso.castShadow = true;
    this.mesh.add(this.torso);

    // Head
    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.22), skinMat);
    this.head.position.y = 0.38;
    this.head.castShadow = true;
    this.torso.add(this.head);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    this.leftArm = new THREE.Mesh(armGeo, shirtMat);
    this.leftArm.position.set(-0.28, 0.95, 0);
    this.mesh.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeo, shirtMat);
    this.rightArm.position.set(0.28, 0.95, 0);
    this.mesh.add(this.rightArm);

    // Legs
    const legGeo = new THREE.BoxGeometry(0.16, 0.65, 0.18);
    this.leftLeg = new THREE.Mesh(legGeo, pantsMat);
    this.leftLeg.position.set(-0.12, 0.38, 0);
    this.leftLeg.castShadow = true;
    this.mesh.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(legGeo, pantsMat);
    this.rightLeg.position.set(0.12, 0.38, 0);
    this.rightLeg.castShadow = true;
    this.mesh.add(this.rightLeg);
  }

  public animate(speed: number, time: number, isDead: boolean): void {
    if (isDead) {
      this.mesh.rotation.x = -Math.PI / 2;
      this.mesh.position.y = 0.1;
      return;
    }

    if (speed > 0.1) {
      const legAngle = Math.sin(time * 6.0) * 0.45;
      this.leftLeg.rotation.x = legAngle;
      this.rightLeg.rotation.x = -legAngle;
      this.leftArm.rotation.x = -legAngle * 0.8;
      this.rightArm.rotation.x = legAngle * 0.8;
    } else {
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
    }
  }
}

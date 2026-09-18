import * as THREE from 'three';
import { VehicleDefinition } from '../core/types';
import { materialLib } from '../rendering/materials';

export class VehicleFactory {
  /**
   * Builds the procedural 3D model for any canonical vehicle definition
   */
  public static createVehicleModel(def: VehicleDefinition): {
    group: THREE.Group;
    wheels: THREE.Mesh[];
    turret?: THREE.Group;
    rotor?: THREE.Group;
    sirenLights?: THREE.Mesh[];
  } {
    const group = new THREE.Group();
    group.name = `veh_${def.id}`;
    const wheels: THREE.Mesh[] = [];
    let turret: THREE.Group | undefined;
    let rotor: THREE.Group | undefined;
    let sirenLights: THREE.Mesh[] | undefined;

    // Body Paint Material
    const paintMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(def.color),
      roughness: 0.35,
      metalness: 0.75
    });

    if (def.class === 'tank') {
      // 1. Light Tank (AR-7 Mastiff)
      const hullGeo = new THREE.BoxGeometry(def.dimensions.width, 1.4, def.dimensions.length);
      const hullMesh = new THREE.Mesh(hullGeo, paintMat);
      hullMesh.position.y = 1.0;
      hullMesh.castShadow = true;
      group.add(hullMesh);

      // Dual continuous track assemblies
      const trackGeo = new THREE.BoxGeometry(0.65, 0.8, def.dimensions.length + 0.4);
      const leftTrack = new THREE.Mesh(trackGeo, materialLib.vehicleTire);
      leftTrack.position.set(-def.dimensions.width / 2, 0.5, 0);
      group.add(leftTrack);

      const rightTrack = new THREE.Mesh(trackGeo, materialLib.vehicleTire);
      rightTrack.position.set(def.dimensions.width / 2, 0.5, 0);
      group.add(rightTrack);

      // Rotating Turret
      turret = new THREE.Group();
      turret.position.set(0, 1.7, -0.2);

      const turretBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 2.5), paintMat);
      turretBody.castShadow = true;
      turret.add(turretBody);

      // Long cannon barrel
      const cannonGeo = new THREE.CylinderGeometry(0.16, 0.2, 4.2, 12);
      cannonGeo.rotateX(Math.PI / 2);
      const cannonMesh = new THREE.Mesh(cannonGeo, materialLib.vehicleChrome);
      cannonMesh.position.set(0, 0.1, 2.8);
      cannonMesh.castShadow = true;
      turret.add(cannonMesh);

      group.add(turret);
    } else if (def.class === 'helicopter') {
      // 2. Helicopter (HX-4 Sparrow)
      const podGeo = new THREE.BoxGeometry(def.dimensions.width, def.dimensions.height * 0.7, def.dimensions.length * 0.55);
      const podMesh = new THREE.Mesh(podGeo, paintMat);
      podMesh.position.y = 1.8;
      podMesh.castShadow = true;
      group.add(podMesh);

      // Cockpit windshield
      const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(def.dimensions.width * 0.9, 1.4, 1.8), materialLib.vehicleGlass);
      glassMesh.position.set(0, 2.0, 1.5);
      group.add(glassMesh);

      // Landing skids
      const skidGeo = new THREE.BoxGeometry(0.12, 0.12, def.dimensions.length * 0.55);
      const leftSkid = new THREE.Mesh(skidGeo, materialLib.vehicleChrome);
      leftSkid.position.set(-1.1, 0.25, 0);
      group.add(leftSkid);

      const rightSkid = new THREE.Mesh(skidGeo, materialLib.vehicleChrome);
      rightSkid.position.set(1.1, 0.25, 0);
      group.add(rightSkid);

      // Tail boom
      const boomGeo = new THREE.CylinderGeometry(0.18, 0.35, def.dimensions.length * 0.5, 8);
      boomGeo.rotateX(Math.PI / 2);
      const boomMesh = new THREE.Mesh(boomGeo, paintMat);
      boomMesh.position.set(0, 1.9, -def.dimensions.length * 0.38);
      group.add(boomMesh);

      // Main spinning rotor assembly
      rotor = new THREE.Group();
      rotor.position.set(0, 3.2, 0);

      const bladeGeo = new THREE.BoxGeometry(8.5, 0.06, 0.35);
      const blade1 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
      rotor.add(blade1);
      const blade2 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
      blade2.rotation.y = Math.PI / 2;
      rotor.add(blade2);

      group.add(rotor);
    } else if (def.class === 'boat') {
      // 3. Speedboat (TideRunner 24)
      const hullGeo = new THREE.BoxGeometry(def.dimensions.width, 1.1, def.dimensions.length);
      const hullMesh = new THREE.Mesh(hullGeo, paintMat);
      hullMesh.position.y = 0.55;
      hullMesh.castShadow = true;
      group.add(hullMesh);

      // Angled windshield
      const glass = new THREE.Mesh(new THREE.BoxGeometry(def.dimensions.width * 0.85, 0.7, 1.4), materialLib.vehicleGlass);
      glass.position.set(0, 1.35, 0.8);
      group.add(glass);

      // Dual outboard motors
      const motor1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome);
      motor1.position.set(-0.6, 0.6, -def.dimensions.length / 2 - 0.2);
      group.add(motor1);

      const motor2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome);
      motor2.position.set(0.6, 0.6, -def.dimensions.length / 2 - 0.2);
      group.add(motor2);
    } else if (def.class === 'motorbike') {
      // 4. Motorbike (Kite 600)
      const frameGeo = new THREE.BoxGeometry(0.5, 0.8, 1.6);
      const frameMesh = new THREE.Mesh(frameGeo, paintMat);
      frameMesh.position.y = 0.7;
      frameMesh.castShadow = true;
      group.add(frameMesh);

      // Handlebars
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8);
      barGeo.rotateZ(Math.PI / 2);
      const barMesh = new THREE.Mesh(barGeo, materialLib.vehicleChrome);
      barMesh.position.set(0, 1.1, 0.5);
      group.add(barMesh);

      // Front & Rear Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.18, 16);
      wheelGeo.rotateZ(Math.PI / 2);

      const frontW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      frontW.position.set(0, 0.35, 0.9);
      wheels.push(frontW);
      group.add(frontW);

      const rearW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      rearW.position.set(0, 0.35, -0.9);
      wheels.push(rearW);
      group.add(rearW);
    } else {
      // 5. Standard 4-Wheeled Vehicles (Sports Coupe, Sedan, Pickup, Van, Compact, Police)
      const { width, height, length } = def.dimensions;

      // Chassis Body
      const bodyGeo = new THREE.BoxGeometry(width, height * 0.55, length);
      const bodyMesh = new THREE.Mesh(bodyGeo, paintMat);
      bodyMesh.position.y = height * 0.45;
      bodyMesh.castShadow = true;
      group.add(bodyMesh);

      // Cabin / Greenhouse Glass Roof
      const cabinLength = length * (def.class === 'pickup' ? 0.4 : def.class === 'van' ? 0.85 : 0.55);
      const cabinGeo = new THREE.BoxGeometry(width * 0.85, height * 0.45, cabinLength);
      const cabinMesh = new THREE.Mesh(cabinGeo, materialLib.vehicleGlass);
      const cabinZOffset = def.class === 'pickup' ? 0.4 : def.class === 'van' ? -0.2 : -0.15;
      cabinMesh.position.set(0, height * 0.85, cabinZOffset);
      cabinMesh.castShadow = true;
      group.add(cabinMesh);

      // Headlights & Taillights
      const hlGeo = new THREE.BoxGeometry(0.35, 0.15, 0.08);
      const hlLeft = new THREE.Mesh(hlGeo, materialLib.vehicleHeadlight);
      hlLeft.position.set(-width / 2 + 0.3, height * 0.45, length / 2 + 0.02);
      group.add(hlLeft);

      const hlRight = new THREE.Mesh(hlGeo, materialLib.vehicleHeadlight);
      hlRight.position.set(width / 2 - 0.3, height * 0.45, length / 2 + 0.02);
      group.add(hlRight);

      const tlLeft = new THREE.Mesh(hlGeo, materialLib.vehicleTaillight);
      tlLeft.position.set(-width / 2 + 0.3, height * 0.45, -length / 2 - 0.02);
      group.add(tlLeft);

      const tlRight = new THREE.Mesh(hlGeo, materialLib.vehicleTaillight);
      tlRight.position.set(width / 2 - 0.3, height * 0.45, -length / 2 - 0.02);
      group.add(tlRight);

      // Police Strobe Lightbar
      if (def.class === 'police') {
        sirenLights = [];
        const lightbarGeo = new THREE.BoxGeometry(width * 0.65, 0.14, 0.28);
        const barBase = new THREE.Mesh(lightbarGeo, materialLib.vehicleChrome);
        barBase.position.set(0, height * 1.12, 0);
        group.add(barBase);

        const sirenR = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.24), materialLib.vehicleSirenRed);
        sirenR.position.set(-width * 0.18, height * 1.13, 0);
        group.add(sirenR);
        sirenLights.push(sirenR);

        const sirenB = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.24), materialLib.vehicleSirenBlue);
        sirenB.position.set(width * 0.18, height * 1.13, 0);
        group.add(sirenB);
        sirenLights.push(sirenB);
      }

      // 4 Wheels
      const wheelRadius = height * 0.26;
      const wheelWidth = 0.28;
      const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 16);
      wheelGeo.rotateZ(Math.PI / 2);

      const xOff = width / 2 - 0.08;
      const zOffFront = length * 0.3;
      const zOffRear = -length * 0.3;

      // Front-Left, Front-Right, Rear-Left, Rear-Right
      const fl = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      fl.position.set(-xOff, wheelRadius, zOffFront);
      wheels.push(fl);
      group.add(fl);

      const fr = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      fr.position.set(xOff, wheelRadius, zOffFront);
      wheels.push(fr);
      group.add(fr);

      const rl = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      rl.position.set(-xOff, wheelRadius, zOffRear);
      wheels.push(rl);
      group.add(rl);

      const rr = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      rr.position.set(xOff, wheelRadius, zOffRear);
      wheels.push(rr);
      group.add(rr);
    }

    return { group, wheels, turret, rotor, sirenLights };
  }
}

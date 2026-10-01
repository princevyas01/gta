import * as THREE from 'three';
import { VehicleDefinition } from '../core/types';
import { materialLib } from '../rendering/materials';

function addCarPart(
  root: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  position: [number, number, number],
  name: string
): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  root.add(mesh);
  return mesh;
}

export class VehicleFactory {
  /**
   * Builds the procedural 3D model for any canonical vehicle definition (Pages 56-64, 103)
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

    // Body Paint Material (Isolated per vehicle instance)
    const paintMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(def.color),
      roughness: 0.28,
      metalness: 0.75
    });
    group.userData.ownedMaterial = paintMat;

    const width = def.dimensions.width;
    const height = def.dimensions.height;
    const length = def.dimensions.length;

    // 1. TANK (AR-7 Mastiff) - Page 64
    if (def.class === 'tank') {
      const hullGeo = new THREE.BoxGeometry(width, 1.3, length);
      addCarPart(group, hullGeo, paintMat, [0, 1.0, 0], 'hull');

      // Sloped front glacis
      const glacisGeo = new THREE.BoxGeometry(width * 0.95, 0.4, 1.5);
      glacisGeo.rotateX(Math.PI / 6);
      addCarPart(group, glacisGeo, paintMat, [0, 1.3, length * 0.42], 'glacis');

      // Track assemblies
      const trackGeo = new THREE.BoxGeometry(0.7, 0.85, length + 0.4);
      addCarPart(group, trackGeo, materialLib.vehicleTire, [-width / 2, 0.55, 0], 'leftTrack');
      addCarPart(group, trackGeo, materialLib.vehicleTire, [width / 2, 0.55, 0], 'rightTrack');

      // Turret
      turret = new THREE.Group();
      turret.position.set(0, 1.8, -0.2);

      const turretBody = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.85, 2.6), paintMat);
      turretBody.castShadow = true;
      turret.add(turretBody);

      // Commander hatch
      const hatch = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.15, 12), materialLib.galvanizedSteelMaterial);
      hatch.position.set(0.5, 0.5, -0.3);
      turret.add(hatch);

      // Elevating cannon barrel
      const cannonGeo = new THREE.CylinderGeometry(0.14, 0.18, 4.4, 12);
      cannonGeo.rotateX(Math.PI / 2);
      const cannonMesh = new THREE.Mesh(cannonGeo, materialLib.vehicleChrome);
      cannonMesh.position.set(0, 0.1, 2.6);
      cannonMesh.castShadow = true;
      turret.add(cannonMesh);

      // Muzzle brake
      const muzzleBrake = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.5), materialLib.galvanizedSteelMaterial);
      muzzleBrake.position.set(0, 0.1, 4.8);
      turret.add(muzzleBrake);

      group.add(turret);
      return { group, wheels, turret, rotor, sirenLights };
    }

    // 2. HELICOPTER (Vespera Swift) - Page 63
    if (def.isAircraft) {
      // Streamlined Fuselage
      const podGeo = new THREE.BoxGeometry(width * 0.9, height * 0.65, length * 0.55);
      addCarPart(group, podGeo, paintMat, [0, 1.8, 0.3], 'fuselage');

      // Cockpit bubble glazing
      const glassGeo = new THREE.BoxGeometry(width * 0.85, 1.3, 1.8);
      addCarPart(group, glassGeo, materialLib.vehicleGlass, [0, 2.0, 1.4], 'cockpitGlass');

      // Tail boom
      const boomGeo = new THREE.BoxGeometry(0.4, 0.5, length * 0.6);
      addCarPart(group, boomGeo, paintMat, [0, 2.1, -length * 0.38], 'tailBoom');

      // Tail vertical stabilizer & tail rotor
      const finGeo = new THREE.BoxGeometry(0.12, 1.6, 0.9);
      addCarPart(group, finGeo, paintMat, [0, 2.6, -length * 0.68], 'verticalFin');

      // Landing skids
      for (const side of [-1, 1]) {
        const skidGeo = new THREE.BoxGeometry(0.1, 0.1, length * 0.65);
        addCarPart(group, skidGeo, materialLib.vehicleChrome, [side * width * 0.45, 0.35, 0], `skid_${side}`);

        const strutF = new THREE.BoxGeometry(0.08, 1.2, 0.08);
        addCarPart(group, strutF, materialLib.vehicleChrome, [side * width * 0.35, 0.95, 0.8], `strutF_${side}`);
        const strutR = new THREE.BoxGeometry(0.08, 1.2, 0.08);
        addCarPart(group, strutR, materialLib.vehicleChrome, [side * width * 0.35, 0.95, -0.8], `strutR_${side}`);
      }

      // Main spinning rotor assembly
      rotor = new THREE.Group();
      rotor.position.set(0, 3.2, 0.2);

      const mastGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 8);
      rotor.add(new THREE.Mesh(mastGeo, materialLib.vehicleChrome));

      const bladeGeo = new THREE.BoxGeometry(8.8, 0.05, 0.32);
      const blade1 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
      const blade2 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
      blade2.rotation.y = Math.PI / 2;
      rotor.add(blade1, blade2);

      group.add(rotor);
      return { group, wheels, turret, rotor, sirenLights };
    }

    // 3. BOAT (Nereid Cruiser) - Page 62
    if (def.class === 'boat' || def.isBoat) {
      // Deep-V Hull
      const hullGeo = new THREE.BoxGeometry(width, 1.1, length);
      addCarPart(group, hullGeo, paintMat, [0, 0.6, 0], 'hull');

      // Bow flare wedge
      const bowGeo = new THREE.ConeGeometry(width * 0.6, 2.2, 4);
      bowGeo.rotateX(Math.PI / 2);
      bowGeo.rotateY(Math.PI / 4);
      addCarPart(group, bowGeo, paintMat, [0, 0.65, length * 0.55], 'bowFlare');

      // Deck & cockpit well
      const deckGeo = new THREE.BoxGeometry(width * 0.88, 0.3, length * 0.8);
      addCarPart(group, deckGeo, materialLib.luxuryMarbleMaterial, [0, 1.15, -0.2], 'deck');

      // Windshield
      const glass = addCarPart(group, new THREE.BoxGeometry(width * 0.82, 0.65, 1.4), materialLib.vehicleGlass, [0, 1.55, 0.5], 'windshield');
      void glass;

      // Twin outboard motors
      const motor1 = addCarPart(group, new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome, [-0.65, 0.6, -length / 2 - 0.2], 'motorLeft');
      const motor2 = addCarPart(group, new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome, [0.65, 0.6, -length / 2 - 0.2], 'motorRight');
      void motor1; void motor2;

      return { group, wheels, turret, rotor, sirenLights };
    }

    // 4. MOTORBIKE (Kaze 750) - Page 61
    if (def.class === 'motorbike') {
      const frameGeo = new THREE.BoxGeometry(0.35, 0.65, 1.6);
      addCarPart(group, frameGeo, paintMat, [0, 0.75, 0], 'frame');

      // Engine block
      const engineGeo = new THREE.BoxGeometry(0.4, 0.45, 0.6);
      addCarPart(group, engineGeo, materialLib.vehicleChrome, [0, 0.5, -0.1], 'engine');

      // Fuel tank
      const tankGeo = new THREE.CapsuleGeometry(0.22, 0.5, 4, 8);
      tankGeo.rotateX(Math.PI / 2);
      addCarPart(group, tankGeo, paintMat, [0, 1.05, 0.2], 'fuelTank');

      // Seat
      const seatGeo = new THREE.BoxGeometry(0.3, 0.12, 0.7);
      addCarPart(group, seatGeo, materialLib.vehicleInteriorDark, [0, 0.95, -0.4], 'seat');

      // Handlebar
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8);
      barGeo.rotateZ(Math.PI / 2);
      addCarPart(group, barGeo, materialLib.vehicleChrome, [0, 1.25, 0.55], 'handlebar');

      // Headlight
      addCarPart(group, new THREE.BoxGeometry(0.2, 0.2, 0.1), materialLib.vehicleHeadlight, [0, 1.15, 0.9], 'headlight');

      // Dual wheels
      const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.18, 16);
      wheelGeo.rotateZ(Math.PI / 2);

      const frontW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      frontW.position.set(0, 0.38, 0.9);
      frontW.castShadow = true;
      group.add(frontW);
      wheels.push(frontW);

      const rearW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
      rearW.position.set(0, 0.38, -0.9);
      rearW.castShadow = true;
      group.add(rearW);
      wheels.push(rearW);

      return { group, wheels, turret, rotor, sirenLights };
    }

    // 5. CARS: SPORTS COUPE, SEDAN, SUV, TRUCK, VAN (Pages 57-60, 103)
    const isCoupe = def.class === 'sports_coupe';
    const isTruck = def.class === 'pickup';
    const isVan = def.class === 'van';

    // A. Chassis & Lower Body Shell
    const chassisGeo = new THREE.BoxGeometry(width, height * 0.45, length);
    addCarPart(group, chassisGeo, paintMat, [0, height * 0.42, 0], 'chassis');

    // B. Aerodynamic Upper Body / Cabin Shell
    const cabinH = height * (isVan ? 0.65 : 0.48);
    const cabinL = length * (isVan ? 0.75 : isCoupe ? 0.48 : isTruck ? 0.42 : 0.58);
    const cabinZ = isTruck ? length * 0.15 : isCoupe ? -length * 0.06 : -length * 0.02;

    const cabinGeo = new THREE.BoxGeometry(width * 0.88, cabinH, cabinL);
    addCarPart(group, cabinGeo, paintMat, [0, height * 0.42 + cabinH / 2, cabinZ], 'bodyUpper');

    // C. Cabin Windshield & Side Glazing
    const glassGeo = new THREE.BoxGeometry(width * 0.82, cabinH * 0.75, cabinL * 0.85);
    addCarPart(group, glassGeo, materialLib.vehicleGlass, [0, height * 0.45 + cabinH / 2, cabinZ], 'cabinGlass');

    // D. Truck Cargo Bed (Page 59)
    if (isTruck) {
      const bedGeo = new THREE.BoxGeometry(width * 0.92, height * 0.35, length * 0.45);
      addCarPart(group, bedGeo, materialLib.galvanizedSteelMaterial, [0, height * 0.45, -length * 0.28], 'cargoBed');
    }

    // E. Headlights, Taillights & Grille Trim (Page 57, 58)
    for (const side of [-1, 1]) {
      addCarPart(
        group,
        new THREE.BoxGeometry(0.32, 0.12, 0.1),
        materialLib.vehicleHeadlight,
        [side * width * 0.36, height * 0.42, length * 0.49],
        `headlight_${side}`
      );
      addCarPart(
        group,
        new THREE.BoxGeometry(0.32, 0.12, 0.1),
        materialLib.vehicleTaillight,
        [side * width * 0.36, height * 0.44, -length * 0.49],
        `taillight_${side}`
      );
      // Door seam chrome detail
      addCarPart(
        group,
        new THREE.BoxGeometry(0.02, height * 0.55, length * 0.38),
        materialLib.vehicleChrome,
        [side * width * 0.48, height * 0.48, 0],
        `doorSeam_${side}`
      );
    }

    // Front intake grille
    const grilleGeo = new THREE.BoxGeometry(width * 0.45, 0.2, 0.08);
    addCarPart(group, grilleGeo, materialLib.vehicleInteriorDark, [0, height * 0.32, length * 0.5], 'grille');

    // Dual exhaust tips on sports cars
    if (isCoupe) {
      for (const side of [-1, 1]) {
        const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25, 8), materialLib.vehicleChrome);
        exhaust.rotation.x = Math.PI / 2;
        exhaust.position.set(side * 0.45, height * 0.22, -length * 0.51);
        group.add(exhaust);
      }
    }

    // Police Cruiser Lightbar
    if (def.class === 'police') {
      const barGeo = new THREE.BoxGeometry(width * 0.65, 0.12, 0.25);
      addCarPart(group, barGeo, materialLib.vehicleChrome, [0, height + 0.08, cabinZ], 'lightbar');

      const sirenR = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.22), materialLib.vehicleSirenRed);
      sirenR.position.set(-width * 0.18, height + 0.08, cabinZ);
      group.add(sirenR);

      const sirenB = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.22), materialLib.vehicleSirenBlue);
      sirenB.position.set(width * 0.18, height + 0.08, cabinZ);
      group.add(sirenB);

      sirenLights = [sirenR, sirenB];
    }

    // F. Wheels, Suspension Pivots, Tires and Alloy Rims (Page 67-68, 103)
    const wheelRadius = height * 0.25;
    const wheelWidth = 0.26;
    const xOff = width * 0.48;
    const zOffFront = length * 0.32;
    const zOffRear = -length * 0.32;

    const wheelPositions: [number, number][] = [
      [-xOff, zOffFront], // FL
      [xOff, zOffFront],  // FR
      [-xOff, zOffRear],  // RL
      [xOff, zOffRear]   // RR
    ];

    for (let i = 0; i < wheelPositions.length; i++) {
      const [wx, wz] = wheelPositions[i];
      const pivot = new THREE.Group();
      pivot.name = `wheel_pivot_${i}`;
      pivot.position.set(wx, wheelRadius * 0.95, wz);

      const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 18);
      tireGeo.rotateZ(Math.PI / 2);
      const tire = new THREE.Mesh(tireGeo, materialLib.vehicleTire);
      tire.castShadow = true;
      pivot.add(tire);

      // Alloy Rim
      const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.52, wheelRadius * 0.52, wheelWidth + 0.01, 16);
      rimGeo.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, materialLib.vehicleChrome);
      pivot.add(rim);

      group.add(pivot);
      wheels.push(tire);
    }

    return { group, wheels, turret, rotor, sirenLights };
  }
}

import * as THREE from 'three';
import { DistrictData } from '../core/types';
import { materialLib } from '../rendering/materials';

export interface StaticCollider {
  box: THREE.Box3;
  type: 'building' | 'barrier' | 'prop';
}

function seedFromString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export type BuildingFamily =
  | 'financial_tower'
  | 'office_podium'
  | 'luxury_apartment'
  | 'midrise_apartment'
  | 'historic_row'
  | 'nightlife_venue'
  | 'retail_strip'
  | 'civic_hall'
  | 'warehouse'
  | 'factory'
  | 'suburban_house'
  | 'luxury_villa'
  | 'marina_building'
  | 'transport_terminal';

export class SectorBuilder {
  /**
   * Builds the 3D scene group for a canonical sector based on its archetype and district identity
   */
  public static buildSector(
    district: DistrictData,
    isHeroLOD: boolean = true
  ): { group: THREE.Group; colliders: StaticCollider[] } {
    const random = mulberry32(seedFromString(district.id));
    const group = new THREE.Group();
    group.name = `sector_${district.id}`;
    const colliders: StaticCollider[] = [];

    const { minX, maxX, minZ, maxZ } = district.bounds;
    const width = maxX - minX;
    const depth = maxZ - minZ;
    const centerX = (minX + maxX) / 2;
    const centerZ = (minZ + maxZ) / 2;

    // 1. Sector Ground Base Plane
    const groundGeo = new THREE.PlaneGeometry(width, depth);
    groundGeo.rotateX(-Math.PI / 2);

    let groundMat: THREE.Material = materialLib.grassMaterial;
    if (district.archetype === 'downtown' || district.archetype === 'financial' || district.archetype === 'civic') {
      groundMat = materialLib.sidewalkMaterial;
    } else if (district.archetype === 'heavy_industry' || district.archetype === 'container_district' || district.archetype === 'port') {
      groundMat = materialLib.concretePrecastMaterial;
    } else if (district.archetype === 'dry_fringe') {
      groundMat = materialLib.sandMaterial;
    } else if (district.archetype === 'waterfront' || district.archetype === 'wetland') {
      groundMat = materialLib.waterMaterial;
    }

    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.set(centerX, -0.05, centerZ);
    groundMesh.receiveShadow = true;
    group.add(groundMesh);

    // 2. Road Detail Kit & Sidewalk Network (Pages 23-25)
    const roadWidth = 14;
    const sidewalkWidth = 3.5;
    const curbHeight = 0.25;

    // Asphalt Main Slabs (East-West and North-South)
    const roadEWGeo = new THREE.PlaneGeometry(width, roadWidth);
    roadEWGeo.rotateX(-Math.PI / 2);
    const roadEWMesh = new THREE.Mesh(roadEWGeo, materialLib.roadMaterial);
    roadEWMesh.position.set(centerX, 0.02, centerZ);
    roadEWMesh.receiveShadow = true;
    group.add(roadEWMesh);

    const roadNSGeo = new THREE.PlaneGeometry(roadWidth, depth);
    roadNSGeo.rotateX(-Math.PI / 2);
    const roadNSMesh = new THREE.Mesh(roadNSGeo, materialLib.roadMaterial);
    roadNSMesh.position.set(centerX, 0.02, centerZ);
    roadNSMesh.receiveShadow = true;
    group.add(roadNSMesh);

    // Yellow double center stripe
    const lineEWGeo = new THREE.PlaneGeometry(width, 0.22);
    lineEWGeo.rotateX(-Math.PI / 2);
    const lineEW1 = new THREE.Mesh(lineEWGeo, materialLib.roadMarkingYellow);
    lineEW1.position.set(centerX, 0.035, centerZ - 0.2);
    const lineEW2 = new THREE.Mesh(lineEWGeo, materialLib.roadMarkingYellow);
    lineEW2.position.set(centerX, 0.035, centerZ + 0.2);
    group.add(lineEW1, lineEW2);

    const lineNSGeo = new THREE.PlaneGeometry(0.22, depth);
    lineNSGeo.rotateX(-Math.PI / 2);
    const lineNS1 = new THREE.Mesh(lineNSGeo, materialLib.roadMarkingYellow);
    lineNS1.position.set(centerX - 0.2, 0.035, centerZ);
    const lineNS2 = new THREE.Mesh(lineNSGeo, materialLib.roadMarkingYellow);
    lineNS2.position.set(centerX + 0.2, 0.035, centerZ);
    group.add(lineNS1, lineNS2);

    // Crosswalk Zebra Markings at intersection
    this.addIntersectionCrosswalks(group, centerX, centerZ, roadWidth);

    // Raised Concrete Sidewalks and Curbs flanking roads
    const curbEWGeo = new THREE.BoxGeometry(width, curbHeight, sidewalkWidth);
    const curbNorth = new THREE.Mesh(curbEWGeo, materialLib.sidewalkMaterial);
    curbNorth.position.set(centerX, curbHeight / 2, centerZ - roadWidth / 2 - sidewalkWidth / 2);
    curbNorth.receiveShadow = true;

    const curbSouth = new THREE.Mesh(curbEWGeo, materialLib.sidewalkMaterial);
    curbSouth.position.set(centerX, curbHeight / 2, centerZ + roadWidth / 2 + sidewalkWidth / 2);
    curbSouth.receiveShadow = true;
    group.add(curbNorth, curbSouth);

    // Darkened Gutters with Storm Drains
    const gutterGeo = new THREE.PlaneGeometry(width, 0.4);
    gutterGeo.rotateX(-Math.PI / 2);
    const gutterN = new THREE.Mesh(gutterGeo, materialLib.gutterMaterial);
    gutterN.position.set(centerX, 0.025, centerZ - roadWidth / 2 + 0.2);
    const gutterS = new THREE.Mesh(gutterGeo, materialLib.gutterMaterial);
    gutterS.position.set(centerX, 0.025, centerZ + roadWidth / 2 - 0.2);
    group.add(gutterN, gutterS);

    // Storm drains along the gutters
    if (isHeroLOD) {
      const drainGeo = new THREE.PlaneGeometry(1.2, 0.4);
      drainGeo.rotateX(-Math.PI / 2);
      for (let dx = -width / 2 + 30; dx < width / 2; dx += 60) {
        const drain = new THREE.Mesh(drainGeo, materialLib.stormDrainMaterial);
        drain.position.set(centerX + dx, 0.028, centerZ - roadWidth / 2 + 0.2);
        group.add(drain);
      }
    }

    // 3. Multi-Part Building Architecture via Building Kits (Pages 26-30)
    const family = this.selectBuildingFamily(district.archetype);
    const bldgSpacing = 68;
    const margin = 40;

    for (let x = minX + margin; x <= maxX - margin; x += bldgSpacing) {
      for (let z = minZ + margin; z <= maxZ - margin; z += bldgSpacing) {
        // Leave roadway and sidewalks clear
        if (Math.abs(x - centerX) < roadWidth / 2 + sidewalkWidth + 10 ||
            Math.abs(z - centerZ) < roadWidth / 2 + sidewalkWidth + 10) {
          continue;
        }

        const bldg = this.createBuildingKit(family, x, z, isHeroLOD, random);
        group.add(bldg.mesh);

        // Register static physical collider box
        const box = new THREE.Box3().setFromObject(bldg.mesh);
        colliders.push({ box, type: 'building' });

        // Street furniture & prop clusters along sidewalks (Page 24 & 32)
        if (isHeroLOD && random() > 0.45) {
          const lightX = x > centerX ? x - 22 : x + 22;
          const lightZ = z > centerZ ? z - 22 : z + 22;
          group.add(this.createStreetlight(lightX, lightZ));

          // Protective sidewalk bollards near corners
          if (random() > 0.5) {
            const bollard = this.createBollard(lightX + (random() > 0.5 ? 2.5 : -2.5), lightZ);
            group.add(bollard);
          }
        }
      }
    }

    // 4. District Signature Hero Landmark (Page 31)
    if (isHeroLOD) {
      const landmark = this.createSignatureLandmark(district);
      if (landmark) {
        group.add(landmark.mesh);
        const box = new THREE.Box3().setFromObject(landmark.mesh);
        colliders.push({ box, type: 'building' });
      }
    }

    return { group, colliders };
  }

  private static selectBuildingFamily(archetype: string): BuildingFamily {
    switch (archetype) {
      case 'financial':
      case 'downtown':
        return 'financial_tower';
      case 'civic':
        return 'civic_hall';
      case 'historic':
        return 'historic_row';
      case 'nightlife':
        return 'nightlife_venue';
      case 'heavy_industry':
      case 'container_district':
        return 'factory';
      case 'port':
        return 'warehouse';
      case 'coastal':
      case 'waterfront':
        return 'marina_building';
      case 'hills':
      case 'dry_fringe':
        return 'luxury_villa';
      case 'suburbs':
      default:
        return 'midrise_apartment';
    }
  }

  /**
   * Componentized Building Kit Generator (Pages 26-30)
   */
  private static createBuildingKit(
    family: BuildingFamily,
    x: number,
    z: number,
    isHeroLOD: boolean,
    random: () => number
  ): { mesh: THREE.Group } {
    const bldgGroup = new THREE.Group();
    bldgGroup.position.set(x, 0, z);

    let width = 34 + random() * 12;
    let depth = 34 + random() * 12;
    let stories = 4;
    let floorHeight = 3.6;

    if (family === 'financial_tower') {
      stories = 14 + Math.floor(random() * 18); // 50m - 115m tall
      width = 28 + random() * 10;
      depth = 28 + random() * 10;
    } else if (family === 'historic_row') {
      stories = 3 + Math.floor(random() * 2);
      width = 24 + random() * 8;
      depth = 24 + random() * 8;
    } else if (family === 'warehouse' || family === 'factory') {
      stories = 2;
      floorHeight = 5.5;
      width = 44 + random() * 16;
      depth = 36 + random() * 12;
    } else if (family === 'nightlife_venue') {
      stories = 3 + Math.floor(random() * 3);
      width = 30 + random() * 8;
    }

    const totalHeight = stories * floorHeight;

    // A. Ground Floor Lobby / Retail with Readable Entrances & Glazing (Page 30)
    const groundGeo = new THREE.BoxGeometry(width, floorHeight, depth);
    const groundMesh = new THREE.Mesh(groundGeo, materialLib.architecturalTrimMaterial);
    groundMesh.position.y = floorHeight / 2;
    groundMesh.castShadow = true;
    groundMesh.receiveShadow = true;
    bldgGroup.add(groundMesh);

    // Readable Entrance Doorway & Glass Display
    const doorGeo = new THREE.BoxGeometry(4.5, 2.8, 0.4);
    const doorMesh = new THREE.Mesh(doorGeo, materialLib.towerGlassMaterial);
    doorMesh.position.set(0, 1.4, depth / 2 + 0.1);
    bldgGroup.add(doorMesh);

    // Entrance Canopy
    const canopyGeo = new THREE.BoxGeometry(6.0, 0.25, 2.5);
    const canopyMesh = new THREE.Mesh(canopyGeo, materialLib.architecturalTrimMaterial);
    canopyMesh.position.set(0, 2.9, depth / 2 + 1.25);
    canopyMesh.castShadow = true;
    bldgGroup.add(canopyMesh);

    // B. Facade Bays with Procedural Window Atlas & Mullions (Pages 17, 28)
    const upperHeight = totalHeight - floorHeight;
    const upperGeo = new THREE.BoxGeometry(width * 0.96, upperHeight, depth * 0.96);
    let upperMat: THREE.Material = materialLib.facadeWindowAtlasMaterial;

    if (family === 'historic_row') {
      upperMat = materialLib.brickHistoricMaterial;
    } else if (family === 'warehouse' || family === 'factory') {
      upperMat = materialLib.industrialCorrugatedMaterial;
    } else if (family === 'financial_tower' && random() > 0.5) {
      upperMat = materialLib.towerGlassMaterial;
    }

    const upperMesh = new THREE.Mesh(upperGeo, upperMat);
    upperMesh.position.y = floorHeight + upperHeight / 2;
    upperMesh.castShadow = true;
    upperMesh.receiveShadow = true;
    bldgGroup.add(upperMesh);

    // Architectural Trim Bands / Cornices (Page 28)
    if (isHeroLOD) {
      const corniceGeo = new THREE.BoxGeometry(width * 1.02, 0.6, depth * 1.02);
      const corniceMesh = new THREE.Mesh(corniceGeo, materialLib.architecturalTrimMaterial);
      corniceMesh.position.y = totalHeight;
      corniceMesh.castShadow = true;
      bldgGroup.add(corniceMesh);
    }

    // C. Roof Equipment & Service Detail: HVAC units, stacks, antennas (Page 29)
    if (isHeroLOD) {
      // Parapet rim
      const parapetGeo = new THREE.BoxGeometry(width * 0.96, 0.8, depth * 0.96);
      const parapetMesh = new THREE.Mesh(parapetGeo, materialLib.concretePrecastMaterial);
      parapetMesh.position.y = totalHeight + 0.4;
      bldgGroup.add(parapetMesh);

      // HVAC Chiller Unit
      const hvacGeo = new THREE.BoxGeometry(5.0, 2.2, 4.0);
      const hvacMesh = new THREE.Mesh(hvacGeo, materialLib.galvanizedSteelMaterial);
      hvacMesh.position.set(-width * 0.18, totalHeight + 1.1, -depth * 0.15);
      hvacMesh.castShadow = true;
      bldgGroup.add(hvacMesh);

      // Rooftop Access Penthouse Door
      const roofDoorGeo = new THREE.BoxGeometry(3.2, 2.6, 3.2);
      const roofDoor = new THREE.Mesh(roofDoorGeo, materialLib.concretePrecastMaterial);
      roofDoor.position.set(width * 0.15, totalHeight + 1.3, depth * 0.15);
      bldgGroup.add(roofDoor);

      // Antenna mast on towers
      if (family === 'financial_tower') {
        const antennaGeo = new THREE.CylinderGeometry(0.12, 0.25, 12, 8);
        const antennaMesh = new THREE.Mesh(antennaGeo, materialLib.vehicleChrome);
        antennaMesh.position.set(0, totalHeight + 6.0, 0);
        bldgGroup.add(antennaMesh);
      }

      // Neon sign band on Nightlife / Entertainment
      if (family === 'nightlife_venue') {
        const signGeo = new THREE.PlaneGeometry(width * 0.7, 3.2);
        const signMat = random() > 0.5 ? materialLib.neonPink : materialLib.neonCyan;
        const signMesh = new THREE.Mesh(signGeo, signMat);
        signMesh.position.set(0, floorHeight + 2.5, depth / 2 + 0.15);
        bldgGroup.add(signMesh);
      }
    }

    return { mesh: bldgGroup };
  }

  private static addIntersectionCrosswalks(
    group: THREE.Group,
    cx: number,
    cz: number,
    roadW: number
  ): void {
    const stripeW = 0.6;
    const stripeL = 3.5;
    const stripeMat = materialLib.roadMarkingWhite;

    // 4 crosswalk banks around center intersection
    const offsets = [
      { x: cx, z: cz - roadW / 2 - stripeL / 2, horiz: true },
      { x: cx, z: cz + roadW / 2 + stripeL / 2, horiz: true },
      { x: cx - roadW / 2 - stripeL / 2, z: cz, horiz: false },
      { x: cx + roadW / 2 + stripeL / 2, z: cz, horiz: false }
    ];

    for (let b = 0; b < offsets.length; b++) {
      const bank = offsets[b];
      for (let s = -roadW / 2 + 1.5; s <= roadW / 2 - 1.5; s += 1.8) {
        const geo = bank.horiz
          ? new THREE.PlaneGeometry(stripeW, stripeL)
          : new THREE.PlaneGeometry(stripeL, stripeW);
        geo.rotateX(-Math.PI / 2);
        const mesh = new THREE.Mesh(geo, stripeMat);
        if (bank.horiz) {
          mesh.position.set(bank.x + s, 0.035, bank.z);
        } else {
          mesh.position.set(bank.x, 0.035, bank.z + s);
        }
        group.add(mesh);
      }
    }
  }

  private static createStreetlight(x: number, z: number): THREE.Group {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Steel Mast
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.18, 7.8, 8);
    const pole = new THREE.Mesh(poleGeo, materialLib.streetlightPoleMaterial);
    pole.position.y = 3.9;
    pole.castShadow = true;
    group.add(pole);

    // Horizontal Arm
    const armGeo = new THREE.BoxGeometry(0.12, 0.12, 1.8);
    const arm = new THREE.Mesh(armGeo, materialLib.streetlightPoleMaterial);
    arm.position.set(0, 7.8, 0.8);
    group.add(arm);

    // Lamp fixture with emissive glow
    const lampGeo = new THREE.BoxGeometry(0.55, 0.2, 0.9);
    const lamp = new THREE.Mesh(lampGeo, materialLib.streetlightEmitterMaterial);
    lamp.position.set(0, 7.7, 1.5);
    group.add(lamp);

    return group;
  }

  private static createBollard(x: number, z: number): THREE.Mesh {
    const geo = new THREE.CylinderGeometry(0.14, 0.16, 0.9, 8);
    const mesh = new THREE.Mesh(geo, materialLib.galvanizedSteelMaterial);
    mesh.position.set(x, 0.45, z);
    mesh.castShadow = true;
    return mesh;
  }

  /**
   * Signature Landmark for canonical districts (Page 31)
   */
  private static createSignatureLandmark(district: DistrictData): { mesh: THREE.Group } | null {
    const group = new THREE.Group();
    const cx = district.center[0];
    const cz = district.center[2];

    if (district.id === 'D01') {
      // Aurelio Spire Tower: 140m mega skyscraper with stepped glass curtain and helipad
      const baseGeo = new THREE.BoxGeometry(48, 85, 48);
      const baseMesh = new THREE.Mesh(baseGeo, materialLib.towerGlassMaterial);
      baseMesh.position.y = 42.5;
      baseMesh.castShadow = true;
      group.add(baseMesh);

      const midGeo = new THREE.BoxGeometry(36, 40, 36);
      const midMesh = new THREE.Mesh(midGeo, materialLib.facadeWindowAtlasMaterial);
      midMesh.position.y = 85 + 20;
      midMesh.castShadow = true;
      group.add(midMesh);

      const spireGeo = new THREE.ConeGeometry(6, 35, 4);
      spireGeo.rotateY(Math.PI / 4);
      const spire = new THREE.Mesh(spireGeo, materialLib.vehicleChrome);
      spire.position.y = 125 + 17.5;
      group.add(spire);

      // Helipad
      const padGeo = new THREE.CylinderGeometry(11, 11, 1.2, 16);
      const pad = new THREE.Mesh(padGeo, materialLib.curbMaterial);
      pad.position.y = 85.6;
      group.add(pad);

      group.position.set(cx, 0, cz);
      return { mesh: group };
    }

    if (district.id === 'D02') {
      // Meridian Skybridge Towers
      const tower1 = new THREE.Mesh(new THREE.BoxGeometry(26, 80, 26), materialLib.towerGlassMaterial);
      tower1.position.set(-20, 40, 0);
      tower1.castShadow = true;

      const tower2 = new THREE.Mesh(new THREE.BoxGeometry(26, 80, 26), materialLib.towerGlassMaterial);
      tower2.position.set(20, 40, 0);
      tower2.castShadow = true;

      const bridge = new THREE.Mesh(new THREE.BoxGeometry(24, 6, 9), materialLib.vehicleChrome);
      bridge.position.set(0, 56, 0);

      group.add(tower1, tower2, bridge);
      group.position.set(cx + 25, 0, cz);
      return { mesh: group };
    }

    if (district.id === 'D04') {
      // Grand Assembly Civic Dome
      const hall = new THREE.Mesh(new THREE.BoxGeometry(52, 20, 36), materialLib.luxuryMarbleMaterial);
      hall.position.y = 10;
      hall.castShadow = true;

      const dome = new THREE.Mesh(new THREE.SphereGeometry(15, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2), materialLib.vehicleChrome);
      dome.position.y = 20;

      // Colonnade portico
      for (let c = -20; c <= 20; c += 8) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 18, 12), materialLib.luxuryMarbleMaterial);
        col.position.set(c, 9, 19);
        col.castShadow = true;
        group.add(col);
      }

      group.add(hall, dome);
      group.position.set(cx, 0, cz + 35);
      return { mesh: group };
    }

    if (district.id === 'D05') {
      // Neon Nexus Entertainment Megastructure
      const arcade = new THREE.Mesh(new THREE.BoxGeometry(55, 24, 40), materialLib.concretePrecastMaterial);
      arcade.position.y = 12;
      arcade.castShadow = true;

      const neonP = new THREE.Mesh(new THREE.PlaneGeometry(45, 6), materialLib.neonPink);
      neonP.position.set(0, 18, 20.2);
      const neonC = new THREE.Mesh(new THREE.PlaneGeometry(45, 4), materialLib.neonCyan);
      neonC.position.set(0, 12, 20.2);

      group.add(arcade, neonP, neonC);
      group.position.set(cx, 0, cz);
      return { mesh: group };
    }

    return null;
  }
}

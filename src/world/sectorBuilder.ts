import * as THREE from 'three';
import { DistrictData } from '../core/types';
import { materialLib } from '../rendering/materials';

export interface StaticCollider {
  box: THREE.Box3;
  type: 'building' | 'barrier' | 'prop';
}

export class SectorBuilder {
  /**
   * Builds the 3D scene group for a canonical sector based on its archetype
   */
  public static buildSector(
    district: DistrictData,
    isHeroLOD: boolean = true
  ): { group: THREE.Group; colliders: StaticCollider[] } {
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
      groundMat = materialLib.roadMaterial;
    } else if (district.archetype === 'dry_fringe') {
      groundMat = materialLib.sandMaterial;
    } else if (district.archetype === 'waterfront' || district.archetype === 'wetland') {
      groundMat = materialLib.waterMaterial;
    }

    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.set(centerX, -0.05, centerZ);
    groundMesh.receiveShadow = true;
    group.add(groundMesh);

    // 2. Road Network Grid through this sector
    const roadWidth = 14;
    // Main East-West road
    const roadEWGeo = new THREE.PlaneGeometry(width, roadWidth);
    roadEWGeo.rotateX(-Math.PI / 2);
    const roadEWMesh = new THREE.Mesh(roadEWGeo, materialLib.roadMaterial);
    roadEWMesh.position.set(centerX, 0.02, centerZ);
    roadEWMesh.receiveShadow = true;
    group.add(roadEWMesh);

    // Road dashed center line
    const lineEWGeo = new THREE.PlaneGeometry(width, 0.3);
    lineEWGeo.rotateX(-Math.PI / 2);
    const lineEWMesh = new THREE.Mesh(lineEWGeo, materialLib.roadMarkingYellow);
    lineEWMesh.position.set(centerX, 0.03, centerZ);
    group.add(lineEWMesh);

    // Main North-South road
    const roadNSGeo = new THREE.PlaneGeometry(roadWidth, depth);
    roadNSGeo.rotateX(-Math.PI / 2);
    const roadNSMesh = new THREE.Mesh(roadNSGeo, materialLib.roadMaterial);
    roadNSMesh.position.set(centerX, 0.02, centerZ);
    roadNSMesh.receiveShadow = true;
    group.add(roadNSMesh);

    // Sidewalk curbs flanking roads
    const curbGeo = new THREE.BoxGeometry(width, 0.25, 2.5);
    const curbNorth = new THREE.Mesh(curbGeo, materialLib.sidewalkMaterial);
    curbNorth.position.set(centerX, 0.125, centerZ - roadWidth / 2 - 1.25);
    group.add(curbNorth);

    const curbSouth = new THREE.Mesh(curbGeo, materialLib.sidewalkMaterial);
    curbSouth.position.set(centerX, 0.125, centerZ + roadWidth / 2 + 1.25);
    group.add(curbSouth);

    // 3. Buildings & Architecture based on district archetype
    const bldgSpacing = 70;
    const margin = 35;

    for (let x = minX + margin; x <= maxX - margin; x += bldgSpacing) {
      for (let z = minZ + margin; z <= maxZ - margin; z += bldgSpacing) {
        // Skip positions directly on the center roads
        if (Math.abs(x - centerX) < roadWidth + 5 || Math.abs(z - centerZ) < roadWidth + 5) {
          continue;
        }

        const bldg = this.createBuilding(district.archetype, x, z, isHeroLOD);
        group.add(bldg.mesh);

        // Register static physical collider box
        const box = new THREE.Box3().setFromObject(bldg.mesh);
        colliders.push({ box, type: 'building' });

        // Add streetlights on sidewalk corners if Hero LOD
        if (isHeroLOD && Math.random() > 0.4) {
          const lightX = x > centerX ? x - 25 : x + 25;
          const lightZ = z > centerZ ? z - 25 : z + 25;
          group.add(this.createStreetlight(lightX, lightZ));
        }
      }
    }

    // 4. District Signature Hero Landmark
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

  /**
   * Synthesizes building geometry matching the district identity
   */
  private static createBuilding(
    archetype: string,
    x: number,
    z: number,
    isHeroLOD: boolean
  ): { mesh: THREE.Group } {
    const bldgGroup = new THREE.Group();

    let width = 36 + Math.random() * 14;
    let depth = 36 + Math.random() * 14;
    let height = 30;
    let mainMaterial: THREE.Material = materialLib.towerConcreteMaterial;

    if (archetype === 'downtown' || archetype === 'financial') {
      height = 55 + Math.random() * 65; // Tall towers (55m - 120m)
      mainMaterial = Math.random() > 0.4 ? materialLib.towerGlassMaterial : materialLib.towerConcreteMaterial;
    } else if (archetype === 'historic') {
      height = 12 + Math.random() * 10; // 3-4 stories
      width = 25 + Math.random() * 10;
      depth = 25 + Math.random() * 10;
      mainMaterial = materialLib.brickHistoricMaterial;
    } else if (archetype === 'heavy_industry' || archetype === 'port' || archetype === 'container_district') {
      height = 15 + Math.random() * 12; // Industrial warehouse
      width = 45 + Math.random() * 20;
      depth = 35 + Math.random() * 15;
      mainMaterial = materialLib.industrialRustMaterial;
    } else if (archetype === 'nightlife') {
      height = 25 + Math.random() * 25;
      mainMaterial = materialLib.towerConcreteMaterial;
    } else {
      // Suburbs / rural / coastal
      height = 10 + Math.random() * 8;
      width = 24 + Math.random() * 10;
      depth = 24 + Math.random() * 10;
      mainMaterial = materialLib.towerConcreteMaterial;
    }

    // Main building body box
    const bodyGeo = new THREE.BoxGeometry(width, height, depth);
    const bodyMesh = new THREE.Mesh(bodyGeo, mainMaterial);
    bodyMesh.position.y = height / 2;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bldgGroup.add(bodyMesh);

    // Rooftop details (HVAC air units, water tanks, elevator bulkheads)
    if (isHeroLOD) {
      const roofHvacGeo = new THREE.BoxGeometry(6, 3, 6);
      const roofHvacMesh = new THREE.Mesh(roofHvacGeo, materialLib.towerConcreteMaterial);
      roofHvacMesh.position.set(0, height + 1.5, 0);
      bldgGroup.add(roofHvacMesh);

      // Nightlife / Downtown illuminated signage
      if (archetype === 'nightlife' || (archetype === 'downtown' && Math.random() > 0.6)) {
        const signGeo = new THREE.PlaneGeometry(width * 0.7, 4);
        const signMat = Math.random() > 0.5 ? materialLib.neonPink : materialLib.neonCyan;
        const signMesh = new THREE.Mesh(signGeo, signMat);
        signMesh.position.set(0, height - 6, depth / 2 + 0.2);
        bldgGroup.add(signMesh);
      }
    }

    bldgGroup.position.set(x, 0, z);
    return { mesh: bldgGroup };
  }

  /**
   * Signature Landmark for canonical districts
   */
  private static createSignatureLandmark(district: DistrictData): { mesh: THREE.Group } | null {
    const group = new THREE.Group();

    if (district.id === 'D01') {
      // Aurelio Tower: Mega 130m skyscraper with glass spire
      const baseGeo = new THREE.BoxGeometry(45, 90, 45);
      const baseMesh = new THREE.Mesh(baseGeo, materialLib.towerGlassMaterial);
      baseMesh.position.y = 45;
      baseMesh.castShadow = true;
      group.add(baseMesh);

      const spireGeo = new THREE.ConeGeometry(8, 40, 4);
      spireGeo.rotateY(Math.PI / 4);
      const spireMesh = new THREE.Mesh(spireGeo, materialLib.vehicleChrome);
      spireMesh.position.y = 90 + 20;
      spireMesh.castShadow = true;
      group.add(spireMesh);

      // Sky Helipad platform on top
      const padGeo = new THREE.CylinderGeometry(10, 10, 1.2, 16);
      const padMesh = new THREE.Mesh(padGeo, materialLib.sidewalkMaterial);
      padMesh.position.y = 90.6;
      group.add(padMesh);

      group.position.set(district.center[0], 0, district.center[2]);
      return { mesh: group };
    }

    if (district.id === 'D02') {
      // Meridian Exchange: Dual glass towers connected by skybridge
      const tower1 = new THREE.Mesh(new THREE.BoxGeometry(25, 75, 25), materialLib.towerGlassMaterial);
      tower1.position.set(-18, 37.5, 0);
      tower1.castShadow = true;
      group.add(tower1);

      const tower2 = new THREE.Mesh(new THREE.BoxGeometry(25, 75, 25), materialLib.towerGlassMaterial);
      tower2.position.set(18, 37.5, 0);
      tower2.castShadow = true;
      group.add(tower2);

      // Elevated Skybridge
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(22, 5, 8), materialLib.vehicleChrome);
      bridge.position.set(0, 52, 0);
      group.add(bridge);

      group.position.set(district.center[0] + 30, 0, district.center[2]);
      return { mesh: group };
    }

    if (district.id === 'D04') {
      // Grand Assembly: Neoclassical marble dome and colonnade
      const hall = new THREE.Mesh(new THREE.BoxGeometry(50, 18, 35), materialLib.sidewalkMaterial);
      hall.position.y = 9;
      hall.castShadow = true;
      group.add(hall);

      const dome = new THREE.Mesh(new THREE.SphereGeometry(14, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), materialLib.vehicleChrome);
      dome.position.y = 18;
      group.add(dome);

      group.position.set(district.center[0], 0, district.center[2] + 40);
      return { mesh: group };
    }

    return null;
  }

  /**
   * Streetlight with pole and glowing lamp
   */
  private static createStreetlight(x: number, z: number): THREE.Group {
    const group = new THREE.Group();
    // Metal pole
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 7.5, 8);
    const poleMesh = new THREE.Mesh(poleGeo, materialLib.vehicleChrome);
    poleMesh.position.y = 3.75;
    group.add(poleMesh);

    // Lamp head
    const lampGeo = new THREE.BoxGeometry(0.8, 0.25, 1.4);
    const lampMesh = new THREE.Mesh(lampGeo, materialLib.vehicleHeadlight);
    lampMesh.position.set(0, 7.5, 0.6);
    group.add(lampMesh);

    group.position.set(x, 0, z);
    return group;
  }
}

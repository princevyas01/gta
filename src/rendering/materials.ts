import * as THREE from 'three';

/**
 * Shared material cache to prevent redundant WebGL program compilations
 * and optimize draw-call batching across districts and assets.
 */
class MaterialLibrary {
  public roadMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f242e,
    roughness: 0.85,
    metalness: 0.1
  });

  public roadMarkingWhite = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.6,
    metalness: 0.05
  });

  public roadMarkingYellow = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.6,
    metalness: 0.05
  });

  public sidewalkMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.9,
    metalness: 0.05
  });

  public grassMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d5a27,
    roughness: 0.95,
    metalness: 0.0
  });

  public sandMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    roughness: 0.9,
    metalness: 0.0
  });

  public waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.85
  });

  public towerGlassMaterial = new THREE.MeshStandardMaterial({
    color: 0x0369a1,
    roughness: 0.15,
    metalness: 0.9,
    transparent: true,
    opacity: 0.92
  });

  public towerConcreteMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.7,
    metalness: 0.2
  });

  public industrialRustMaterial = new THREE.MeshStandardMaterial({
    color: 0x9a3412,
    roughness: 0.9,
    metalness: 0.3
  });

  public brickHistoricMaterial = new THREE.MeshStandardMaterial({
    color: 0xc2410c,
    roughness: 0.85,
    metalness: 0.05
  });

  public neonPink = new THREE.MeshBasicMaterial({
    color: 0xf43f5e
  });

  public neonCyan = new THREE.MeshBasicMaterial({
    color: 0x06b6d4
  });

  public neonAmber = new THREE.MeshBasicMaterial({
    color: 0xf59e0b
  });

  public vehicleTire = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.95,
    metalness: 0.05
  });

  public vehicleGlass = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.05,
    metalness: 0.95,
    transparent: true,
    opacity: 0.75
  });

  public vehicleChrome = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.1,
    metalness: 0.98
  });

  public vehicleHeadlight = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });

  public vehicleTaillight = new THREE.MeshBasicMaterial({
    color: 0xef4444
  });

  public vehicleSirenRed = new THREE.MeshBasicMaterial({
    color: 0xff0033
  });

  public vehicleSirenBlue = new THREE.MeshBasicMaterial({
    color: 0x0066ff
  });
}

export const materialLib = new MaterialLibrary();

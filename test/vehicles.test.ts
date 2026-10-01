import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { VehicleManager } from '../src/vehicles/vehicleManager';
import { materialLib } from '../src/rendering/materials';

describe('Vehicle Lifecycle & Identity Model (P0 Vehicles)', () => {
  let scene: THREE.Scene;
  let vehicleManager: VehicleManager;

  beforeEach(() => {
    scene = new THREE.Scene();
    vehicleManager = new VehicleManager(scene);
  });

  afterEach(() => {
    vehicleManager.dispose();
  });

  it('spawns two vehicles with the same definition and assigns unique instance IDs', () => {
    const v1 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(0, 0, 0));
    const v2 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(10, 0, 0));

    expect(v1.id).toBeDefined();
    expect(v2.id).toBeDefined();
    expect(v1.id).not.toBe(v2.id);
    expect(v1.def.id).toBe(v2.def.id);
  });

  it('disposing vehicle A does not dispose shared materials or break vehicle B', () => {
    const v1 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(0, 0, 0));
    const v2 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(10, 0, 0));

    // Material in materialLib before disposal
    expect(materialLib.vehicleTire).toBeDefined();

    // Dispose vehicle 1
    v1.dispose();

    // Shared tire and glass materials must not be disposed
    expect(materialLib.vehicleTire).toBeDefined();
    expect(v2.wheels.length).toBeGreaterThan(0);
    // Vehicle B's wheel material must remain intact
    expect(v2.wheels[0].material).toBe(materialLib.vehicleTire);
  });

  it('only owned vehicles appear in getOwnedVehicles / persistent save model', () => {
    const ownedList = vehicleManager.getOwnedVehicles();
    expect(ownedList.length).toBeGreaterThanOrEqual(1);

    // Spawn an ambient vehicle and a police unit
    const ambient = vehicleManager.spawnVehicle('veh_mica_hatch', new THREE.Vector3(50, 0, 50), 0, {
      owned: false,
      spawnKind: 'ambient'
    });
    const police = vehicleManager.spawnPolicePursuitUnit(new THREE.Vector3(0, 0, 0));

    const updatedOwned = vehicleManager.getOwnedVehicles();
    const ids = updatedOwned.map(v => v.id);

    expect(ids).not.toContain(ambient.id);
    expect(ids).not.toContain(police.id);
  });

  it('despawnPursuitUnits removes all police vehicles when heat is cleared', () => {
    const initialCount = vehicleManager.vehicles.length;
    vehicleManager.spawnPolicePursuitUnit(new THREE.Vector3(0, 0, 0));
    vehicleManager.spawnPolicePursuitUnit(new THREE.Vector3(20, 0, 0));

    expect(vehicleManager.vehicles.length).toBe(initialCount + 2);

    vehicleManager.despawnPursuitUnits();
    expect(vehicleManager.vehicles.length).toBe(initialCount);

    const remainingPolice = vehicleManager.vehicles.filter(v => v.spawnKind === 'police');
    expect(remainingPolice.length).toBe(0);
  });
});

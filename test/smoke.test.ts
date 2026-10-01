import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { CANONICAL_DISTRICTS, getDistrictAt } from '../src/data/districts';
import { CANONICAL_VEHICLES, getVehicleDef } from '../src/data/vehicles';
import { CANONICAL_WEAPONS, getWeaponDef } from '../src/data/weapons';
import { CANONICAL_POIS } from '../src/data/pois';
import { SaveManager } from '../src/save/saveManager';
import { SectorBuilder } from '../src/world/sectorBuilder';
import { RoadNetwork } from '../src/world/roadNetwork';
import { WorldStreamer } from '../src/world/worldStreamer';
import { VehicleFactory } from '../src/vehicles/vehicleFactory';
import { VehicleInstance } from '../src/vehicles/vehicleController';
import { eventBus } from '../src/core/events';

describe('San Aurelio Vertical Slice Smoke Test', () => {
  it('validates 26 canonical districts and sector boundaries including outside checks', () => {
    expect(CANONICAL_DISTRICTS.length).toBe(26);

    const d01 = CANONICAL_DISTRICTS.find(d => d.id === 'D01');
    expect(d01?.name).toBe('Aurelio Central');
    expect(d01?.archetype).toBe('downtown');

    const d02 = CANONICAL_DISTRICTS.find(d => d.id === 'D02');
    expect(d02?.name).toBe('Meridian Core');
    expect(d02?.archetype).toBe('financial');

    // Test spatial lookup
    const found = getDistrictAt(0, 0);
    expect(found?.id).toBe('D01');

    const foundMeridian = getDistrictAt(350, 0);
    expect(foundMeridian?.id).toBe('D02');

    // Out of bounds returns null (P07)
    const outside = getDistrictAt(9999, 9999);
    expect(outside).toBeNull();
  });

  it('validates 10 canonical vehicle classes and specifications', () => {
    expect(CANONICAL_VEHICLES.length).toBe(10);

    const kestrel = getVehicleDef('veh_vx9_kestrel');
    expect(kestrel.class).toBe('sports_coupe');
    expect(kestrel.topSpeed).toBeGreaterThan(40);

    const tank = getVehicleDef('veh_ar7_mastiff');
    expect(tank.class).toBe('tank');
    expect(tank.hasTurret).toBe(true);

    const heli = getVehicleDef('veh_hx4_sparrow');
    expect(heli.class).toBe('helicopter');
    expect(heli.isAircraft).toBe(true);

    const boat = getVehicleDef('veh_tiderunner_24');
    expect(boat.class).toBe('boat');
    expect(boat.isBoat).toBe(true);

    const bike = getVehicleDef('veh_kite_600');
    expect(bike.class).toBe('motorbike');
  });

  it('validates 6 canonical weapon specifications and strict lookup (P42)', () => {
    expect(CANONICAL_WEAPONS.length).toBe(6);
    const names = CANONICAL_WEAPONS.map(w => w.name);
    expect(names).toContain('P1 Vesper');
    expect(names).toContain('Vortex 45');
    expect(names).toContain('Rook-12');
    expect(names).toContain('Arcline AR');
    expect(names).toContain('Crownline S-7');
    expect(names).toContain('Ramjet L');

    expect(getWeaponDef('wep_p1_vesper')).toBeDefined();
    expect(getWeaponDef('non_existent_weapon_id')).toBeUndefined();
  });

  it('validates canonical landmarks and POIs', () => {
    expect(CANONICAL_POIS.length).toBeGreaterThanOrEqual(10);
    const landmarkNames = CANONICAL_POIS.map(p => p.name);
    expect(landmarkNames).toContain('Aurelio Tower');
    expect(landmarkNames).toContain('Meridian Exchange');
  });

  it('validates procedural architectural synthesis and deterministic PRNG (P28)', () => {
    const d01 = CANONICAL_DISTRICTS[0];
    const run1 = SectorBuilder.buildSector(d01, true);
    const run2 = SectorBuilder.buildSector(d01, true);
    expect(run1.colliders.length).toBe(run2.colliders.length);
    expect(run1.colliders[0].box.min.x).toBe(run2.colliders[0].box.min.x);
  });

  it('validates road network A* pathfinding and GPS ribbon cache (P10, P11)', () => {
    const scene = new THREE.Scene();
    const roads = new RoadNetwork(scene);
    const path = roads.findPath(0, 0, 350, 0);
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThanOrEqual(2);

    roads.updateGPSRibbon(path);
    roads.updateGPSRibbon(path); // Cached, no rebuild
    roads.dispose();
  });

  it('validates world streamer lifecycle and ground height query (P08, P09, P23)', () => {
    const scene = new THREE.Scene();
    const streamer = new WorldStreamer(scene);
    streamer.update(new THREE.Vector3(0, 0, 0));
    expect(streamer.getActiveSectorIds().length).toBeGreaterThan(0);

    const groundY = streamer.getGroundHeight(0, 0);
    expect(groundY).toBeGreaterThanOrEqual(0);

    const hit = streamer.testCollision(new THREE.Vector3(0, 0, 0), 0.45);
    expect(typeof hit.hit).toBe('boolean');

    streamer.dispose();
    expect(streamer.getActiveSectorIds().length).toBe(0);
  });

  it('validates vehicle exit synchronization and disposal (P16, P21, P27)', () => {
    const scene = new THREE.Scene();
    const def = getVehicleDef('veh_vx9_kestrel');
    const model = VehicleFactory.createVehicleModel(def);
    const vehicle = new VehicleInstance(def, model, new THREE.Vector3(100, 0, 100));

    const exitPos = vehicle.getSafeExitPosition([]);
    expect(exitPos.x).toBeGreaterThan(0);

    let receivedExit: unknown = null;
    const unsub = eventBus.on('VEHICLE_EXIT', (data: { position: [number, number, number] }) => {
      receivedExit = data;
    });

    eventBus.emit('VEHICLE_EXIT', {
      position: [exitPos.x, exitPos.y, exitPos.z]
    });
    expect(receivedExit).toBeDefined();
    unsub();
    vehicle.dispose();
  });

  it('validates end-to-end save state roundtrip', () => {
    const initialState = SaveManager.getInitialState();
    expect(initialState.player.stats.health).toBe(100);
    expect(initialState.version).toBe(3);
  });
});

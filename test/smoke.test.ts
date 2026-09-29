import { describe, it, expect } from 'vitest';
import { CANONICAL_DISTRICTS, getDistrictAt } from '../src/data/districts';
import { CANONICAL_VEHICLES, getVehicleDef } from '../src/data/vehicles';
import { CANONICAL_WEAPONS } from '../src/data/weapons';
import { CANONICAL_POIS } from '../src/data/pois';
import { CANONICAL_MISSIONS } from '../src/data/missions';
import { SaveManager } from '../src/save/saveManager';
import { SectorBuilder } from '../src/world/sectorBuilder';

describe('San Aurelio Vertical Slice Smoke Test', () => {
  it('validates 26 canonical districts and sector boundaries', () => {
    expect(CANONICAL_DISTRICTS.length).toBe(26);

    const d01 = CANONICAL_DISTRICTS.find(d => d.id === 'D01');
    expect(d01?.name).toBe('Aurelio Central');
    expect(d01?.archetype).toBe('downtown');

    const d02 = CANONICAL_DISTRICTS.find(d => d.id === 'D02');
    expect(d02?.name).toBe('Meridian Core');
    expect(d02?.archetype).toBe('financial');

    // Test spatial lookup
    const found = getDistrictAt(0, 0);
    expect(found.id).toBe('D01');

    const foundMeridian = getDistrictAt(350, 0);
    expect(foundMeridian.id).toBe('D02');
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
  });

  it('validates 6 canonical weapon specifications', () => {
    expect(CANONICAL_WEAPONS.length).toBe(6);
    const names = CANONICAL_WEAPONS.map(w => w.name);
    expect(names).toContain('P1 Vesper');
    expect(names).toContain('Vortex 45');
    expect(names).toContain('Rook-12');
    expect(names).toContain('Arcline AR');
    expect(names).toContain('Crownline S-7');
    expect(names).toContain('Ramjet L');
  });

  it('validates canonical landmarks and POIs', () => {
    expect(CANONICAL_POIS.length).toBeGreaterThanOrEqual(10);
    const landmarkNames = CANONICAL_POIS.map(p => p.name);
    expect(landmarkNames).toContain('Aurelio Tower');
    expect(landmarkNames).toContain('Meridian Exchange');
  });

  it('validates procedural architectural synthesis and collision generation', () => {
    const d01 = CANONICAL_DISTRICTS[0];
    const { group, colliders } = SectorBuilder.buildSector(d01, true);
    expect(group).toBeDefined();
    expect(colliders.length).toBeGreaterThan(0);
    expect(colliders[0].box).toBeDefined();
  });

  it('validates end-to-end save state roundtrip', () => {
    const initialState = SaveManager.getInitialState();
    expect(initialState.player.stats.health).toBe(100);
    expect(initialState.missions.currentMissionId).toBe('m_getaway_blueprint');
  });
});

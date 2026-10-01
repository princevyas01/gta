import { describe, it, expect, beforeEach } from 'vitest';
import { SaveManager, SAVE_SCHEMA_VERSION, SAVE_KEY } from '../src/save/saveManager';

describe('Versioned Save System (Schema v3)', () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    const mockStorage: Storage = {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = String(v); },
      removeItem: (k: string) => { delete store[k]; },
      clear: () => { Object.keys(store).forEach(k => delete store[k]); },
      length: 0,
      key: (_i: number) => null
    };
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true
    });
  });

  it('generates a valid initial save schema v3', () => {
    const initial = SaveManager.getInitialState();
    expect(initial.version).toBe(SAVE_SCHEMA_VERSION);
    expect(initial.player.stats.health).toBe(100);
    expect(initial.player.stats.cash).toBe(2500);
    expect(initial.player.inventory.length).toBeGreaterThanOrEqual(3);
    expect(initial.world.discoveredDistricts).toContain('D01');
    expect(initial.world.weather).toBe('clear');
    expect(initial.ownedVehicles.length).toBeGreaterThan(0);
    expect(initial.ownedVehicles[0].id).toBeDefined();
    expect(initial.ownedVehicles[0].definitionId).toBe('veh_vx9_kestrel');
  });

  it('saves and reloads state without data loss via synchronous fallback', () => {
    const state = SaveManager.getInitialState();
    state.player.stats.cash = 99999;
    state.player.position = [400, 10, -50];

    const saved = SaveManager.saveSync(state);
    expect(saved).toBe(true);

    const loaded = SaveManager.loadSync();
    expect(loaded.player.stats.cash).toBe(99999);
    expect(loaded.player.position[0]).toBe(400);
    expect(loaded.player.position[1]).toBe(10);
    expect(loaded.player.position[2]).toBe(-50);
  });

  it('saves and reloads state asynchronously with fallback', async () => {
    const state = SaveManager.getInitialState();
    state.player.stats.cash = 77777;
    state.player.position = [120, 5, -80];

    const saved = await SaveManager.save(state);
    expect(saved).toBe(true);

    const loaded = await SaveManager.load();
    expect(loaded.player.stats.cash).toBe(77777);
    expect(loaded.player.position[0]).toBe(120);
  });

  it('migrates older save schemas gracefully from v1 and v2 to v3', () => {
    const legacy = {
      version: 2,
      player: { stats: { cash: 500 } },
      ownedVehicles: ['veh_vx9_kestrel']
    };
    globalThis.localStorage.setItem('san_aurelio_save_v2', JSON.stringify(legacy));

    const loaded = SaveManager.loadSync();
    expect(loaded.version).toBe(3);
    expect(loaded.player.stats.cash).toBe(500);
    expect(loaded.player.stats.health).toBe(100); // Backfilled default
    expect(loaded.world.weather).toBe('clear');
    expect(loaded.ownedVehicles[0].definitionId).toBe('veh_vx9_kestrel');
    expect(loaded.ownedVehicles[0].id).toBeDefined();
  });

  it('clamps NaN health and negative cash to safe bounded values', () => {
    const badState = {
      version: 2,
      player: {
        stats: {
          health: NaN,
          armor: NaN,
          stamina: 999,
          cash: -500
        }
      },
      missions: {
        currentMissionId: 'non_existent_mission_xyz'
      }
    };

    const migrated = SaveManager.migrate(badState);
    expect(migrated.player.stats.health).toBe(100);
    expect(migrated.player.stats.armor).toBe(100);
    expect(migrated.player.stats.stamina).toBe(100);
    expect(migrated.player.stats.cash).toBe(0); // negative clamped to 0
    expect(migrated.missions.currentMissionId).toBeNull(); // unknown mission dropped
  });

  it('recovers safely from corrupt JSON', () => {
    globalThis.localStorage.setItem(SAVE_KEY, '{ not valid json');
    const loaded = SaveManager.loadSync();
    expect(loaded.version).toBe(3);
    expect(loaded.player.stats.health).toBe(100);
  });

  it('clears storage asynchronously and safely', async () => {
    const state = SaveManager.getInitialState();
    SaveManager.saveSync(state);
    expect(globalThis.localStorage.getItem(SAVE_KEY)).not.toBeNull();

    await SaveManager.clear();
    expect(globalThis.localStorage.getItem(SAVE_KEY)).toBeNull();
  });
});

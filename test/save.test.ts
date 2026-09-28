import { describe, it, expect, beforeEach } from 'vitest';
import { SaveManager } from '../src/save/saveManager';

describe('Versioned Save System', () => {
  beforeEach(() => {
    // Mock localStorage if in node environment
    const store: Record<string, string> = {};
    global.localStorage = {
      getItem: (k: string) => store[k] || null,
      setItem: (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
      clear: () => { Object.keys(store).forEach(k => delete store[k]); },
      length: 0,
      key: () => null
    } as any;
  });

  it('generates a valid initial save schema', () => {
    const initial = SaveManager.getInitialState();
    expect(initial.version).toBe(1);
    expect(initial.player.stats.health).toBe(100);
    expect(initial.player.stats.cash).toBe(2500);
    expect(initial.player.inventory.length).toBeGreaterThanOrEqual(3);
    expect(initial.world.discoveredDistricts).toContain('D01');
  });

  it('saves and reloads state without data loss', () => {
    const state = SaveManager.getInitialState();
    state.player.stats.cash = 99999;
    state.player.position = [400, 10, -50];

    SaveManager.save(state);
    const loaded = SaveManager.load();

    expect(loaded.player.stats.cash).toBe(99999);
    expect(loaded.player.position[0]).toBe(400);
    expect(loaded.player.position[1]).toBe(10);
    expect(loaded.player.position[2]).toBe(-50);
  });

  it('migrates older save schemas gracefully', () => {
    const legacy = {
      version: 0,
      player: { stats: { cash: 500 } }
    };
    (global.localStorage as any).setItem('san_aurelio_save_v1', JSON.stringify(legacy));

    const loaded = SaveManager.load();
    expect(loaded.version).toBe(1);
    expect(loaded.player.stats.cash).toBe(500);
    expect(loaded.player.stats.health).toBe(100); // Backfilled default
  });
});

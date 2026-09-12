import { SaveGameSchema } from '../core/types';

const SAVE_KEY = 'san_aurelio_save_v1';
const CURRENT_VERSION = 1;

export class SaveManager {
  public static getInitialState(): SaveGameSchema {
    return {
      version: CURRENT_VERSION,
      timestamp: Date.now(),
      player: {
        position: [0, 0.5, 0], // Start in Aurelio Central / Meridian plaza
        rotationY: 0,
        stats: {
          health: 100,
          maxHealth: 100,
          armor: 100,
          maxArmor: 100,
          cash: 2500,
          stamina: 100
        },
        inventory: [
          { weaponId: 'wep_p1_vesper', ammo: 15, reserveAmmo: 90 },
          { weaponId: 'wep_vortex_45', ammo: 32, reserveAmmo: 160 },
          { weaponId: 'wep_arcline_ar', ammo: 30, reserveAmmo: 120 }
        ],
        activeWeaponIndex: 0
      },
      world: {
        discoveredDistricts: ['D01', 'D02', 'D03', 'D04', 'D05'],
        discoveredPOIs: ['poi-aurelio-tower', 'poi-meridian-exchange', 'poi-safehouse-meridian'],
        timeOfDay: 14.5,
        weather: 'clear'
      },
      missions: {
        completedMissionIds: [],
        currentMissionId: 'm_getaway_blueprint',
        currentStageIndex: 0
      },
      ownedVehicles: ['veh_vx9_kestrel']
    };
  }

  public static save(data: SaveGameSchema): boolean {
    try {
      data.timestamp = Date.now();
      const serialized = JSON.stringify(data);
      localStorage.setItem(SAVE_KEY, serialized);
      return true;
    } catch (e) {
      console.warn('[SaveManager] Failed to persist game save to localStorage:', e);
      return false;
    }
  }

  public static load(): SaveGameSchema {
    try {
      const item = localStorage.getItem(SAVE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        return this.migrate(parsed);
      }
    } catch (e) {
      console.warn('[SaveManager] Corrupt save file detected, falling back to default:', e);
    }
    return this.getInitialState();
  }

  public static clear(): void {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {}
  }

  private static migrate(savedData: any): SaveGameSchema {
    if (!savedData || typeof savedData !== 'object') {
      return this.getInitialState();
    }
    // Migration logic for future save schemas
    if (!savedData.version || savedData.version < CURRENT_VERSION) {
      savedData.version = CURRENT_VERSION;
    }
    // Ensure all required fields exist
    const defaultState = this.getInitialState();
    return {
      ...defaultState,
      ...savedData,
      player: {
        ...defaultState.player,
        ...(savedData.player || {}),
        stats: {
          ...defaultState.player.stats,
          ...(savedData.player?.stats || {})
        }
      },
      world: {
        ...defaultState.world,
        ...(savedData.world || {})
      },
      missions: {
        ...defaultState.missions,
        ...(savedData.missions || {})
      }
    };
  }
}

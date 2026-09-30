import { SaveGameSchema } from '../core/types';

const SAVE_KEY = 'san_aurelio_save_v2';
const CURRENT_VERSION = 2;
const DB_NAME = 'san-aurelio';
const STORE_NAME = 'saves';

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export class SaveManager {
  public static getInitialState(): SaveGameSchema {
    return {
      version: CURRENT_VERSION,
      timestamp: Date.now(),
      player: {
        position: [0, 0.5, 0],
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
        currentMissionId: null,
        currentStageIndex: 0
      },
      ownedVehicles: ['veh_vx9_kestrel']
    };
  }

  public static saveSync(data: SaveGameSchema): boolean {
    try {
      const normalized = this.migrate(data);
      normalized.timestamp = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(normalized));
      return true;
    } catch (error) {
      console.warn('[SaveManager] sync save failed:', error);
      return false;
    }
  }

  public static async save(data: SaveGameSchema): Promise<boolean> {
    const normalized = this.migrate(data);
    normalized.timestamp = Date.now();
    try {
      const db = await this.openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(normalized, SAVE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'));
        tx.onabort = () => reject(tx.error ?? new Error('IndexedDB transaction aborted'));
      });
      db.close();
      return true;
    } catch (error) {
      console.warn('[SaveManager] IndexedDB save failed; using localStorage fallback:', error);
      return this.saveSync(normalized);
    }
  }

  public static loadSync(): SaveGameSchema {
    try {
      const item = localStorage.getItem(SAVE_KEY);
      return item ? this.migrate(JSON.parse(item)) : this.getInitialState();
    } catch {
      return this.getInitialState();
    }
  }

  public static async load(): Promise<SaveGameSchema> {
    try {
      const db = await this.openDb();
      const saved = await new Promise<unknown>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).get(SAVE_KEY);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      db.close();
      if (saved !== undefined) return this.migrate(saved);
    } catch (error) {
      console.warn('[SaveManager] IndexedDB load failed; checking localStorage:', error);
    }
    return this.loadSync();
  }

  public static clear(): void {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {}
  }

  private static openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        reject(new Error('IndexedDB unavailable'));
        return;
      }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public static migrate(savedData: unknown): SaveGameSchema {
    const defaults = this.getInitialState();
    if (!isRecord(savedData)) return defaults;

    const candidate = savedData as Partial<SaveGameSchema>;
    const player = isRecord(candidate.player) ? candidate.player : {};
    const stats = isRecord(player.stats) ? player.stats : {};
    const world = isRecord(candidate.world) ? candidate.world : {};
    const missions = isRecord(candidate.missions) ? candidate.missions : {};

    const position = Array.isArray(player.position) &&
      player.position.length === 3 &&
      player.position.every(v => typeof v === 'number' && Number.isFinite(v))
      ? (player.position as [number, number, number])
      : defaults.player.position;

    const inventory = Array.isArray(player.inventory)
      ? player.inventory.filter(item =>
          isRecord(item) &&
          typeof item.weaponId === 'string' &&
          typeof item.ammo === 'number' &&
          typeof item.reserveAmmo === 'number'
        ).map(item => ({
          weaponId: String(item.weaponId),
          ammo: Math.max(0, Math.floor(Number(item.ammo))),
          reserveAmmo: Math.max(0, Math.floor(Number(item.reserveAmmo)))
        }))
      : defaults.player.inventory;

    const weather =
      world.weather === 'clear' ||
      world.weather === 'overcast' ||
      world.weather === 'rain' ||
      world.weather === 'fog'
        ? world.weather
        : defaults.world.weather;

    return {
      version: CURRENT_VERSION,
      timestamp: typeof candidate.timestamp === 'number' ? candidate.timestamp : Date.now(),
      player: {
        position,
        rotationY: typeof player.rotationY === 'number' ? player.rotationY : defaults.player.rotationY,
        stats: {
          health: typeof stats.health === 'number' ? stats.health : defaults.player.stats.health,
          maxHealth: typeof stats.maxHealth === 'number' ? stats.maxHealth : defaults.player.stats.maxHealth,
          armor: typeof stats.armor === 'number' ? stats.armor : defaults.player.stats.armor,
          maxArmor: typeof stats.maxArmor === 'number' ? stats.maxArmor : defaults.player.stats.maxArmor,
          cash: typeof stats.cash === 'number' ? stats.cash : defaults.player.stats.cash,
          stamina: typeof stats.stamina === 'number' ? stats.stamina : defaults.player.stats.stamina
        },
        inventory,
        activeWeaponIndex:
          typeof player.activeWeaponIndex === 'number'
            ? Math.max(0, Math.floor(player.activeWeaponIndex))
            : defaults.player.activeWeaponIndex
      },
      world: {
        discoveredDistricts: Array.isArray(world.discoveredDistricts)
          ? world.discoveredDistricts.filter((v): v is string => typeof v === 'string')
          : defaults.world.discoveredDistricts,
        discoveredPOIs: Array.isArray(world.discoveredPOIs)
          ? world.discoveredPOIs.filter((v): v is string => typeof v === 'string')
          : defaults.world.discoveredPOIs,
        timeOfDay:
          typeof world.timeOfDay === 'number'
            ? Math.min(24, Math.max(0, world.timeOfDay))
            : defaults.world.timeOfDay,
        weather
      },
      missions: {
        completedMissionIds: Array.isArray(missions.completedMissionIds)
          ? missions.completedMissionIds.filter((v): v is string => typeof v === 'string')
          : defaults.missions.completedMissionIds,
        currentMissionId:
          typeof missions.currentMissionId === 'string' ? missions.currentMissionId : null,
        currentStageIndex:
          typeof missions.currentStageIndex === 'number'
            ? Math.max(0, Math.floor(missions.currentStageIndex))
            : 0
      },
      ownedVehicles: Array.isArray(candidate.ownedVehicles)
        ? candidate.ownedVehicles.filter((v): v is string => typeof v === 'string')
        : defaults.ownedVehicles
    };
  }
}

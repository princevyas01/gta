import { SaveGameSchemaV3, VehicleInstanceState } from '../core/types';
import { CANONICAL_MISSIONS } from '../data/missions';

export const SAVE_KEY = 'san_aurelio_save_v3';
export const SAVE_SCHEMA_VERSION = 3;
export const DB_SCHEMA_VERSION = 1;
const DB_NAME = 'san-aurelio';
const STORE_NAME = 'saves';

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function finiteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function clampFinite(value: unknown, fallback: number, min: number, max: number): number {
  const n = finiteNumber(value, fallback);
  return Math.min(max, Math.max(min, n));
}

const VALID_MISSION_IDS = new Set(CANONICAL_MISSIONS.map(m => m.id));

export class SaveManager {
  public static getInitialState(): SaveGameSchemaV3 {
    return {
      version: SAVE_SCHEMA_VERSION,
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
        activeWeaponIndex: 0,
        currentVehicleInstanceId: null
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
      ownedVehicles: [
        {
          id: 'vehinst_starter_01',
          definitionId: 'veh_vx9_kestrel',
          owned: true,
          spawnKind: 'owned',
          position: [10, 0.5, 10],
          rotationY: 0,
          speed: 0,
          health: 100,
          isDestroyed: false
        }
      ]
    };
  }

  public static saveSync(data: SaveGameSchemaV3): boolean {
    try {
      const normalized = this.migrate(data);
      normalized.timestamp = Date.now();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(SAVE_KEY, JSON.stringify(normalized));
      }
      return true;
    } catch (error) {
      console.warn('[SaveManager] sync save failed:', error);
      return false;
    }
  }

  public static async save(data: SaveGameSchemaV3): Promise<boolean> {
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
      // Mirror to localStorage as durable cache
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(SAVE_KEY, JSON.stringify(normalized));
        } catch {
          // ignore localStorage failure
        }
      }
      return true;
    } catch (error) {
      console.warn('[SaveManager] IndexedDB save failed; using localStorage fallback:', error);
      return this.saveSync(normalized);
    }
  }

  public static loadSync(): SaveGameSchemaV3 {
    try {
      if (typeof localStorage === 'undefined') return this.getInitialState();
      const item = localStorage.getItem(SAVE_KEY) ?? localStorage.getItem('san_aurelio_save_v2');
      return item ? this.migrate(JSON.parse(item)) : this.getInitialState();
    } catch {
      return this.getInitialState();
    }
  }

  public static async load(): Promise<SaveGameSchemaV3> {
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

  public static async clear(): Promise<boolean> {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(SAVE_KEY);
        localStorage.removeItem('san_aurelio_save_v2');
      }
    } catch {
      // Continue to IndexedDB
    }
    try {
      const db = await this.openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(SAVE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error ?? new Error('IndexedDB clear failed'));
        tx.onabort = () => reject(tx.error ?? new Error('IndexedDB clear aborted'));
      });
      db.close();
      return true;
    } catch (error) {
      console.warn('[SaveManager] IndexedDB clear failed:', error);
      return false;
    }
  }

  private static openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !('indexedDB' in window)) {
        reject(new Error('IndexedDB unavailable'));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_SCHEMA_VERSION);
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

  public static migrate(savedData: unknown): SaveGameSchemaV3 {
    const defaults = this.getInitialState();
    if (!isRecord(savedData)) return defaults;

    const candidate = savedData as Partial<SaveGameSchemaV3>;
    const player: Record<string, unknown> = isRecord(candidate.player) ? candidate.player : {};
    const stats: Record<string, unknown> = isRecord(player['stats']) ? (player['stats'] as Record<string, unknown>) : {};
    const world: Record<string, unknown> = isRecord(candidate.world) ? candidate.world : {};
    const missions: Record<string, unknown> = isRecord(candidate.missions) ? candidate.missions : {};

    // Validate 3D position
    const rawPos = player['position'];
    const position = Array.isArray(rawPos) &&
      rawPos.length === 3 &&
      rawPos.every(v => typeof v === 'number' && Number.isFinite(v))
      ? (rawPos as [number, number, number])
      : defaults.player.position;

    // Validate inventory
    const rawInv = player['inventory'];
    const inventory = Array.isArray(rawInv)
      ? rawInv.filter((item: unknown) =>
          isRecord(item) &&
          typeof item['weaponId'] === 'string' &&
          typeof item['ammo'] === 'number' &&
          Number.isFinite(item['ammo']) &&
          typeof item['reserveAmmo'] === 'number' &&
          Number.isFinite(item['reserveAmmo'])
        ).map((item: unknown) => {
          const rec = item as Record<string, unknown>;
          return {
            weaponId: String(rec['weaponId']),
            ammo: Math.max(0, Math.floor(Number(rec['ammo']))),
            reserveAmmo: Math.max(0, Math.floor(Number(rec['reserveAmmo'])))
          };
        })
      : defaults.player.inventory;

    // Validate weather
    const weather =
      world['weather'] === 'clear' ||
      world['weather'] === 'overcast' ||
      world['weather'] === 'rain' ||
      world['weather'] === 'fog'
        ? world['weather']
        : defaults.world.weather;

    // Clamp numeric stats
    const maxHealth = clampFinite(stats['maxHealth'], defaults.player.stats.maxHealth, 1, 1000);
    const health = clampFinite(stats['health'], defaults.player.stats.health, 0, maxHealth);
    const maxArmor = clampFinite(stats['maxArmor'], defaults.player.stats.maxArmor, 0, 1000);
    const armor = clampFinite(stats['armor'], defaults.player.stats.armor, 0, maxArmor);
    const cash = clampFinite(stats['cash'], defaults.player.stats.cash, 0, 1_000_000_000);
    const stamina = clampFinite(stats['stamina'], defaults.player.stats.stamina, 0, 100);

    const rotY = finiteNumber(player['rotationY'], defaults.player.rotationY);
    const activeWep = clampFinite(player['activeWeaponIndex'], defaults.player.activeWeaponIndex, 0, 5);

    const timeOfDay = clampFinite(world['timeOfDay'], defaults.world.timeOfDay, 0, 24);

    // Validate current mission ID against canonical data
    const rawMissionId = missions['currentMissionId'];
    const currentMissionId = typeof rawMissionId === 'string' && VALID_MISSION_IDS.has(rawMissionId)
      ? rawMissionId
      : null;

    const currentStageIndex = clampFinite(missions['currentStageIndex'], 0, 0, 20);

    // Migration of ownedVehicles (v1/v2 string[] -> v3 VehicleInstanceState[])
    let ownedVehicles: VehicleInstanceState[] = [];
    if (Array.isArray(candidate.ownedVehicles)) {
      if (candidate.ownedVehicles.length > 0 && typeof candidate.ownedVehicles[0] === 'string') {
        // v1 / v2 legacy definition ID format
        ownedVehicles = (candidate.ownedVehicles as unknown[])
          .filter((v): v is string => typeof v === 'string')
          .map((defId, idx) => ({
            id: `vehinst_migrated_${idx + 1}`,
            definitionId: defId,
            owned: true,
            spawnKind: 'owned' as const,
            position: [10 + idx * 4, 0.5, 10] as [number, number, number],
            rotationY: 0,
            speed: 0,
            health: 100,
            isDestroyed: false
          }));
      } else {
        // v3 format
        ownedVehicles = (candidate.ownedVehicles as unknown[])
          .filter((v): v is Record<string, unknown> => isRecord(v) && typeof v['definitionId'] === 'string')
          .map((v, idx) => {
            const rawVPos = v['position'];
            const pos: [number, number, number] = Array.isArray(rawVPos) && rawVPos.length === 3 && rawVPos.every(p => typeof p === 'number' && Number.isFinite(p))
              ? (rawVPos as [number, number, number])
              : [10 + idx * 4, 0.5, 10];
            return {
              id: typeof v['id'] === 'string' ? v['id'] : `vehinst_${idx + 1}`,
              definitionId: String(v['definitionId']),
              owned: true,
              spawnKind: 'owned' as const,
              position: pos,
              rotationY: finiteNumber(v['rotationY'], 0),
              speed: finiteNumber(v['speed'], 0),
              health: clampFinite(v['health'], 100, 0, 100),
              isDestroyed: Boolean(v['isDestroyed'])
            };
          });
      }
    }
    if (ownedVehicles.length === 0) {
      ownedVehicles = defaults.ownedVehicles;
    }

    const currentVehicleInstanceId = typeof player['currentVehicleInstanceId'] === 'string'
      ? player['currentVehicleInstanceId']
      : null;

    return {
      version: SAVE_SCHEMA_VERSION,
      timestamp: finiteNumber(candidate.timestamp, Date.now()),
      player: {
        position,
        rotationY: rotY,
        stats: {
          health,
          maxHealth,
          armor,
          maxArmor,
          cash,
          stamina
        },
        inventory,
        activeWeaponIndex: activeWep,
        currentVehicleInstanceId
      },
      world: {
        discoveredDistricts: Array.isArray(world['discoveredDistricts'])
          ? (world['discoveredDistricts'] as unknown[]).filter((v): v is string => typeof v === 'string')
          : defaults.world.discoveredDistricts,
        discoveredPOIs: Array.isArray(world['discoveredPOIs'])
          ? (world['discoveredPOIs'] as unknown[]).filter((v): v is string => typeof v === 'string')
          : defaults.world.discoveredPOIs,
        timeOfDay,
        weather
      },
      missions: {
        completedMissionIds: Array.isArray(missions['completedMissionIds'])
          ? (missions['completedMissionIds'] as unknown[]).filter((v): v is string => typeof v === 'string')
          : defaults.missions.completedMissionIds,
        currentMissionId,
        currentStageIndex
      },
      ownedVehicles
    };
  }
}

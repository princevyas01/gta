import type {
  InventoryItem,
  MissionDefinition,
  MissionObjective,
  VehicleInstanceState,
  WantedLevel
} from './types';

export interface GameEventMap {
  WEAPON_CHANGED: { weaponId: string };
  WEAPON_FIRED: { weaponId: string; ammoLeft: number };
  WEAPON_RELOADED: InventoryItem;
  COMBAT_HIT: { target: 'npc' | 'vehicle'; id?: string; damage: number };
  NPC_KILLED: { id: string; archetype?: string };
  WITNESS_EVENT: { position: [number, number, number]; severity: number };
  HEAT_CHANGED: WantedLevel;
  MISSION_STARTED: MissionDefinition;
  MISSION_COMPLETED: { id: string; title: string; reward: number };
  STAGE_ADVANCED: MissionObjective | null;
  VEHICLE_ENTER: VehicleInstanceState;
  VEHICLE_EXIT: { position: [number, number, number] };
  PLAYER_DAMAGED: { health: number; armor: number };
  CASH_CHANGED: number;
}

type Listener<T> = (data: T) => void;

class EventBus {
  private listeners: Map<keyof GameEventMap, Set<Listener<never>>> = new Map();

  on<K extends keyof GameEventMap>(event: K, callback: Listener<GameEventMap[K]>): () => void {
    const callbacks = this.listeners.get(event) ?? new Set<Listener<never>>();
    callbacks.add(callback as Listener<never>);
    this.listeners.set(event, callbacks);
    return () => this.off(event, callback);
  }

  off<K extends keyof GameEventMap>(event: K, callback: Listener<GameEventMap[K]>): void {
    const callbacks = this.listeners.get(event);
    if (!callbacks) return;
    callbacks.delete(callback as Listener<never>);
    if (callbacks.size === 0) this.listeners.delete(event);
  }

  emit<K extends keyof GameEventMap>(event: K, data: GameEventMap[K]): void {
    const callbacks = this.listeners.get(event);
    if (!callbacks) return;
    for (const callback of callbacks) {
      try {
        callback(data as never);
      } catch (error) {
        console.error(`[EventBus] Error in ${String(event)} handler:`, error);
      }
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}

export const eventBus = new EventBus();

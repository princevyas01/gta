import { create } from 'zustand';
import { WantedLevel } from '../core/types';

export interface GameUIState {
  // Player & Vehicle
  health: number;
  armor: number;
  cash: number;
  stamina: number;
  weaponName: string;
  ammo: number;
  reserveAmmo: number;
  inVehicle: boolean;
  vehicleName: string;
  vehicleSpeed: number; // km/h
  vehicleHealth: number;

  // Law Enforcement
  wantedLevel: WantedLevel;
  isCoolingDown: boolean;

  // World & Time
  districtName: string;
  districtId: string;
  timeFormatted: string;
  weather: string;

  // Mission
  activeMissionTitle: string;
  currentObjective: string;

  // Overlays
  isMapOpen: boolean;
  isPhoneOpen: boolean;
  isWeaponWheelOpen: boolean;
  isDebugOpen: boolean;
  activeWaypoint: [number, number, number] | null;

  // Profiler Telemetry
  fps: number;
  drawCalls: number;
  triangles: number;
  activeCellsCount: number;

  // Actions
  setMapOpen: (open: boolean) => void;
  setPhoneOpen: (open: boolean) => void;
  setWeaponWheelOpen: (open: boolean) => void;
  setDebugOpen: (open: boolean) => void;
  setWaypoint: (pos: [number, number, number] | null) => void;
  updateStats: (partial: Partial<GameUIState>) => void;
}

export const useGameStore = create<GameUIState>((set) => ({
  health: 100,
  armor: 100,
  cash: 2500,
  stamina: 100,
  weaponName: 'P1 Vesper',
  ammo: 15,
  reserveAmmo: 90,
  inVehicle: false,
  vehicleName: '',
  vehicleSpeed: 0,
  vehicleHealth: 1000,

  wantedLevel: 0,
  isCoolingDown: false,

  districtName: 'Aurelio Central',
  districtId: 'D01',
  timeFormatted: '14:30',
  weather: 'clear',

  activeMissionTitle: 'Getaway Blueprint',
  currentObjective: 'Reach the Meridian financial plaza checkpoint.',

  isMapOpen: false,
  isPhoneOpen: false,
  isWeaponWheelOpen: false,
  isDebugOpen: false,
  activeWaypoint: null,

  fps: 60,
  drawCalls: 0,
  triangles: 0,
  activeCellsCount: 1,

  setMapOpen: (open) => set({ isMapOpen: open }),
  setPhoneOpen: (open) => set({ isPhoneOpen: open }),
  setWeaponWheelOpen: (open) => set({ isWeaponWheelOpen: open }),
  setDebugOpen: (open) => set({ isDebugOpen: open }),
  setWaypoint: (pos) => set({ activeWaypoint: pos }),
  updateStats: (partial) => set(partial)
}));

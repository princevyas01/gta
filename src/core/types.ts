import * as THREE from 'three';

export type DistrictArchetype =
  | 'downtown'
  | 'financial'
  | 'historic'
  | 'civic'
  | 'nightlife'
  | 'waterfront'
  | 'arena'
  | 'suburban'
  | 'upland'
  | 'affluent'
  | 'mixed_suburb'
  | 'forest_edge'
  | 'arterial_retail'
  | 'port'
  | 'heavy_industry'
  | 'container_district'
  | 'wetland'
  | 'mixed_industrial'
  | 'rural'
  | 'aviation'
  | 'transport'
  | 'dry_fringe'
  | 'military'
  | 'offshore_utility'
  | 'island_resort'
  | 'recreation';

export type POICategory =
  | 'landmark'
  | 'safehouse'
  | 'garage'
  | 'shop'
  | 'hospital'
  | 'police'
  | 'mission'
  | 'activity'
  | 'helipad'
  | 'marina';

export interface DistrictData {
  id: string;
  name: string;
  archetype: DistrictArchetype;
  color: string;
  streetPattern: string;
  keyLandmark: string;
  description: string;
  dangerLevel: number; // 1-5
  bounds: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };
  center: [number, number, number];
}

export interface MapPOI {
  id: string;
  name: string;
  districtId: string;
  category: POICategory;
  worldPosition: [number, number, number];
  discovered: boolean;
  fastTravel: boolean;
  description: string;
  missionLinks?: string[];
  openingHours?: [number, number];
}

export type VehicleClass =
  | 'sports_coupe'
  | 'sedan'
  | 'pickup'
  | 'van'
  | 'compact'
  | 'motorbike'
  | 'boat'
  | 'helicopter'
  | 'tank'
  | 'police';

export interface VehicleDefinition {
  id: string;
  name: string;
  class: VehicleClass;
  topSpeed: number;
  acceleration: number;
  brakeForce: number;
  steerAngle: number;
  mass: number;
  seats: number;
  dimensions: { width: number; height: number; length: number };
  color: string;
  hasTurret?: boolean;
  isAircraft?: boolean;
  isBoat?: boolean;
}

export type WeaponClass =
  | 'pistol'
  | 'smg'
  | 'shotgun'
  | 'rifle'
  | 'sniper'
  | 'launcher';

export interface WeaponDefinition {
  id: string;
  name: string;
  class: WeaponClass;
  damage: number;
  fireRate: number; // shots per sec
  range: number;
  magazineSize: number;
  maxAmmo: number;
  reloadTime: number;
  recoil: number;
  spread: number;
  automatic: boolean;
  color: string;
}

export interface InventoryItem {
  weaponId: string;
  ammo: number;
  reserveAmmo: number;
}

export type PlayerLocomotionState =
  | 'idle'
  | 'walk'
  | 'jog'
  | 'sprint'
  | 'jump'
  | 'fall'
  | 'vault'
  | 'swim'
  | 'in_vehicle'
  | 'dead';

export interface PlayerStats {
  health: number;
  maxHealth: number;
  armor: number;
  maxArmor: number;
  cash: number;
  stamina: number;
}

export interface MissionObjective {
  id: string;
  description: string;
  type: 'reach_location' | 'steal_vehicle' | 'eliminate_targets' | 'survive_time' | 'lose_wanted';
  targetPosition?: [number, number, number];
  targetVehicleId?: string;
  targetCount?: number;
  currentCount?: number;
  timeRemaining?: number;
  completed: boolean;
}

export interface MissionDefinition {
  id: string;
  title: string;
  districtId: string;
  description: string;
  rewardCash: number;
  stages: MissionObjective[][];
}

export type WantedLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface TelemetryData {
  fps: number;
  frameTime: number;
  drawCalls: number;
  triangles: number;
  activeCells: string[];
  physicsBodies: number;
  playerCoords: [number, number, number];
  currentDistrict: string;
  wantedLevel: WantedLevel;
}

export interface SaveGameSchema {
  version: number;
  timestamp: number;
  player: {
    position: [number, number, number];
    rotationY: number;
    stats: PlayerStats;
    inventory: InventoryItem[];
    activeWeaponIndex: number;
  };
  world: {
    discoveredDistricts: string[];
    discoveredPOIs: string[];
    timeOfDay: number; // 0-24
    weather: 'clear' | 'overcast' | 'rain' | 'fog';
  };
  missions: {
    completedMissionIds: string[];
    currentMissionId: string | null;
    currentStageIndex: number;
  };
  ownedVehicles: string[];
}

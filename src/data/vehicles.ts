import { VehicleDefinition } from '../core/types';

export const CANONICAL_VEHICLES: VehicleDefinition[] = [
  {
    id: 'veh_vx9_kestrel',
    name: 'VX-9 Kestrel',
    class: 'sports_coupe',
    topSpeed: 52, // m/s (~187 km/h)
    acceleration: 28,
    brakeForce: 35,
    steerAngle: 0.65,
    mass: 1400,
    seats: 2,
    dimensions: { width: 1.9, height: 1.25, length: 4.4 },
    color: '#ef4444' // Crimson red
  },
  {
    id: 'veh_aurelia_regent',
    name: 'Aurelia Regent',
    class: 'sedan',
    topSpeed: 42,
    acceleration: 20,
    brakeForce: 28,
    steerAngle: 0.6,
    mass: 1750,
    seats: 4,
    dimensions: { width: 1.85, height: 1.4, length: 4.8 },
    color: '#0284c7' // Sapphire blue
  },
  {
    id: 'veh_redwood_250',
    name: 'Redwood 250',
    class: 'pickup',
    topSpeed: 38,
    acceleration: 18,
    brakeForce: 26,
    steerAngle: 0.55,
    mass: 2400,
    seats: 4,
    dimensions: { width: 2.1, height: 1.85, length: 5.4 },
    color: '#b45309' // Desert amber
  },
  {
    id: 'veh_courier_l4',
    name: 'Courier L4',
    class: 'van',
    topSpeed: 34,
    acceleration: 15,
    brakeForce: 24,
    steerAngle: 0.5,
    mass: 2800,
    seats: 2,
    dimensions: { width: 2.2, height: 2.3, length: 5.6 },
    color: '#e2e8f0' // Commercial white
  },
  {
    id: 'veh_mica_hatch',
    name: 'Mica Hatch',
    class: 'compact',
    topSpeed: 36,
    acceleration: 22,
    brakeForce: 30,
    steerAngle: 0.72,
    mass: 1100,
    seats: 4,
    dimensions: { width: 1.7, height: 1.45, length: 3.7 },
    color: '#10b981' // Emerald mint
  },
  {
    id: 'veh_kite_600',
    name: 'Kite 600',
    class: 'motorbike',
    topSpeed: 55,
    acceleration: 35,
    brakeForce: 32,
    steerAngle: 0.75,
    mass: 220,
    seats: 2,
    dimensions: { width: 0.8, height: 1.15, length: 2.2 },
    color: '#f59e0b' // Neon amber
  },
  {
    id: 'veh_tiderunner_24',
    name: 'TideRunner 24',
    class: 'boat',
    topSpeed: 45,
    acceleration: 22,
    brakeForce: 18,
    steerAngle: 0.6,
    mass: 1900,
    seats: 4,
    dimensions: { width: 2.4, height: 1.5, length: 7.2 },
    color: '#06b6d4', // Aqua cyan
    isBoat: true
  },
  {
    id: 'veh_hx4_sparrow',
    name: 'HX-4 Sparrow',
    class: 'helicopter',
    topSpeed: 60,
    acceleration: 25,
    brakeForce: 20,
    steerAngle: 0.5,
    mass: 2100,
    seats: 4,
    dimensions: { width: 2.8, height: 3.2, length: 9.5 },
    color: '#1e293b', // Stealth graphite
    isAircraft: true
  },
  {
    id: 'veh_ar7_mastiff',
    name: 'AR-7 Mastiff',
    class: 'tank',
    topSpeed: 22,
    acceleration: 14,
    brakeForce: 45,
    steerAngle: 0.4,
    mass: 38000,
    seats: 2,
    dimensions: { width: 3.4, height: 2.5, length: 7.5 },
    color: '#334155', // Military armor slate
    hasTurret: true
  },
  {
    id: 'veh_amps_cruiser',
    name: 'AMPS Interceptor',
    class: 'police',
    topSpeed: 48,
    acceleration: 26,
    brakeForce: 32,
    steerAngle: 0.65,
    mass: 1850,
    seats: 4,
    dimensions: { width: 1.9, height: 1.45, length: 4.9 },
    color: '#0f172a' // Police obsidian with white door livery
  }
];

export function getVehicleDef(id: string): VehicleDefinition {
  return CANONICAL_VEHICLES.find(v => v.id === id) || CANONICAL_VEHICLES[0];
}

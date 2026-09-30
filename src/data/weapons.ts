import { WeaponDefinition } from '../core/types';

export const CANONICAL_WEAPONS: WeaponDefinition[] = [
  {
    id: 'wep_p1_vesper',
    name: 'P1 Vesper',
    class: 'pistol',
    damage: 28,
    fireRate: 4.5,
    range: 60,
    magazineSize: 15,
    maxAmmo: 120,
    reloadTime: 1.4,
    recoil: 0.05,
    spread: 0.015,
    automatic: false,
    color: '#94a3b8'
  },
  {
    id: 'wep_vortex_45',
    name: 'Vortex 45',
    class: 'smg',
    damage: 22,
    fireRate: 12,
    range: 50,
    magazineSize: 32,
    maxAmmo: 250,
    reloadTime: 1.8,
    recoil: 0.04,
    spread: 0.045,
    automatic: true,
    color: '#38bdf8'
  },
  {
    id: 'wep_rook_12',
    name: 'Rook-12',
    class: 'shotgun',
    damage: 90,
    fireRate: 1.6,
    range: 30,
    magazineSize: 8,
    maxAmmo: 64,
    reloadTime: 2.4,
    recoil: 0.16,
    spread: 0.09,
    automatic: false,
    color: '#d97706'
  },
  {
    id: 'wep_arcline_ar',
    name: 'Arcline AR',
    class: 'rifle',
    damage: 36,
    fireRate: 9.5,
    range: 110,
    magazineSize: 30,
    maxAmmo: 240,
    reloadTime: 2.1,
    recoil: 0.07,
    spread: 0.025,
    automatic: true,
    color: '#22c55e'
  },
  {
    id: 'wep_crownline_s7',
    name: 'Crownline S-7',
    class: 'sniper',
    damage: 130,
    fireRate: 1.0,
    range: 250,
    magazineSize: 5,
    maxAmmo: 30,
    reloadTime: 3.0,
    recoil: 0.25,
    spread: 0.002,
    automatic: false,
    color: '#a855f7'
  },
  {
    id: 'wep_ramjet_l',
    name: 'Ramjet L',
    class: 'launcher',
    damage: 320,
    fireRate: 0.6,
    range: 140,
    magazineSize: 1,
    maxAmmo: 6,
    reloadTime: 3.6,
    recoil: 0.35,
    spread: 0.01,
    automatic: false,
    color: '#ef4444'
  }
];

export function getWeaponDef(id: string): WeaponDefinition | undefined {
  return CANONICAL_WEAPONS.find(w => w.id === id);
}

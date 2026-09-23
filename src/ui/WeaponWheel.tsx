import React from 'react';
import { useGameStore } from './store';
import { CANONICAL_WEAPONS } from '../data/weapons';
import { Crosshair, Zap, Shield, Target } from 'lucide-react';
import { soundEngine } from '../core/audio';
import { eventBus } from '../core/events';

export const WeaponWheel: React.FC<{ onSelectWeapon: (index: number) => void }> = ({ onSelectWeapon }) => {
  const { isWeaponWheelOpen, setWeaponWheelOpen, weaponName } = useGameStore();

  if (!isWeaponWheelOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(9, 13, 22, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
      onClick={() => setWeaponWheelOpen(false)}
    >
      <div
        style={{
          width: 520,
          background: 'rgba(15, 23, 42, 0.95)',
          borderRadius: 16,
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          padding: 24
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Crosshair size={22} color="#f59e0b" />
            <h2 style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.08em', color: '#f8fafc', margin: 0 }}>
              TACTICAL WEAPON ARSENAL
            </h2>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>
            SELECT [1-6] OR CLICK
          </span>
        </div>

        {/* Weapons Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 18 }}>
          {CANONICAL_WEAPONS.map((wep, idx) => {
            const isEquipped = wep.name === weaponName;
            return (
              <div
                key={wep.id}
                onClick={() => {
                  onSelectWeapon(idx);
                  setWeaponWheelOpen(false);
                  soundEngine.playUIClick();
                  soundEngine.playReload();
                }}
                style={{
                  background: isEquipped ? 'rgba(56, 189, 248, 0.2)' : '#1e293b',
                  border: isEquipped ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  padding: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'transform 0.15s, border 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8' }}>SLOT {idx + 1}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{wep.class}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: isEquipped ? '#ffffff' : '#e2e8f0' }}>
                  {wep.name}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>
                  Damage: <strong style={{ color: '#f59e0b' }}>{wep.damage}</strong> | Mag: <strong style={{ color: '#38bdf8' }}>{wep.magazineSize}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

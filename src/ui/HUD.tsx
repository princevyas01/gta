import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { Shield, Heart, Coins, Crosshair, Gauge, Navigation } from 'lucide-react';
import { worldToMapPercent } from '../core/math';
import { CANONICAL_POIS } from '../data/pois';
import { eventBus } from '../core/events';

export const HUD: React.FC<{ playerPos: [number, number, number]; playerHeading: number }> = ({
  playerPos,
  playerHeading
}) => {
  const [hitMarker, setHitMarker] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const unsubscribe = eventBus.on('COMBAT_HIT', () => {
      setHitMarker(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setHitMarker(false), 120);
    });
    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const {
    health,
    armor,
    cash,
    weaponName,
    ammo,
    reserveAmmo,
    inVehicle,
    vehicleName,
    vehicleSpeed,
    vehicleHealth,
    wantedLevel,
    isCoolingDown,
    districtName,
    timeFormatted,
    activeMissionTitle,
    currentObjective
  } = useGameStore();

  const mapPercent = worldToMapPercent(playerPos[0], playerPos[2]);

  return (
    <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Center Screen Crosshair Hit Marker (Pages 8, 52, 82) */}
      {hitMarker && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 24,
            height: 24,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'absolute', width: 14, height: 2, background: '#ef4444' }} />
          <div style={{ position: 'absolute', width: 2, height: 14, background: '#ef4444' }} />
        </div>
      )}

      {/* Top Left: District & Time */}
      <div style={{ position: 'absolute', top: 20, left: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          {districtName}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>
          {timeFormatted} | SAN AURELIO METRO
        </div>
      </div>

      {/* Top Right: Cash & Wanted Level */}
      <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
          <Coins size={18} color="#f59e0b" />
          <span style={{ fontSize: 20, fontWeight: 800, color: '#22c55e', letterSpacing: '0.05em' }}>
            ₳ {cash.toLocaleString()}
          </span>
        </div>

        {/* Wanted Stars (0 to 5) */}
        {wantedLevel > 0 && (
          <div style={{ display: 'flex', gap: 4, background: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.5)' }}>
            {[1, 2, 3, 4, 5].map(star => {
              const active = star <= wantedLevel;
              return (
                <span
                  key={star}
                  style={{
                    fontSize: 18,
                    color: active ? '#ef4444' : '#475569',
                    opacity: active && isCoolingDown ? 0.4 : 1,
                    transition: 'opacity 0.2s',
                    filter: active ? 'drop-shadow(0 0 6px #ef4444)' : 'none'
                  }}
                >
                  ★
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Center: Active Mission Banner */}
      {currentObjective && (
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderLeft: '4px solid #38bdf8', padding: '10px 24px', borderRadius: 8, maxWidth: 580, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {activeMissionTitle}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#f8fafc', marginTop: 2 }}>
            {currentObjective}
          </div>
        </div>
      )}

      {/* Bottom Left: Minimap Radar */}
      <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #0f172a 40%, #020617 100%)',
            border: '2px solid rgba(56, 189, 248, 0.5)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Radar Grid Lines */}
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.1)' }} />

          {/* POI Blips */}
          {CANONICAL_POIS.map(poi => {
            const p = worldToMapPercent(poi.worldPosition[0], poi.worldPosition[2]);
            const dx = (p.xPercent - mapPercent.xPercent) * 2.8;
            const dy = (p.yPercent - mapPercent.yPercent) * 2.8;
            if (Math.abs(dx) > 75 || Math.abs(dy) > 75) return null;
            return (
              <div
                key={poi.id}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${dx}px)`,
                  top: `calc(50% + ${dy}px)`,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: poi.category === 'mission' ? '#eab308' : poi.category === 'safehouse' ? '#22c55e' : '#38bdf8',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 4px #000'
                }}
              />
            );
          })}

          {/* Player Center Icon with Heading Rotation */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 14,
              height: 14,
              transform: `translate(-50%, -50%) rotate(${playerHeading}rad)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Navigation size={14} color="#38bdf8" fill="#38bdf8" />
          </div>
        </div>

        {/* Health & Armor Bars */}
        <div style={{ width: 170, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {/* Health Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15, 23, 42, 0.85)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
            <Heart size={14} color="#ef4444" fill="#ef4444" />
            <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${health}%`, height: '100%', background: '#ef4444', transition: 'width 0.2s' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', minWidth: 24, textAlign: 'right' }}>{health}</span>
          </div>

          {/* Armor Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15, 23, 42, 0.85)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
            <Shield size={14} color="#38bdf8" fill="#38bdf8" />
            <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${armor}%`, height: '100%', background: '#38bdf8', transition: 'width 0.2s' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', minWidth: 24, textAlign: 'right' }}>{armor}</span>
          </div>
        </div>
      </div>

      {/* Bottom Right: Weapon or Vehicle Status */}
      <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        {inVehicle ? (
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', minWidth: 160 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Gauge size={20} color="#38bdf8" />
              <div style={{ fontSize: 16, fontWeight: 800, color: '#f8fafc' }}>{vehicleName}</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#38bdf8', marginTop: 4 }}>
              {vehicleSpeed} <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>KM/H</span>
            </div>
            {/* Vehicle Health */}
            <div style={{ marginTop: 6, width: '100%', height: 5, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${(vehicleHealth / 1000) * 100}%`, height: '100%', background: vehicleHealth > 400 ? '#22c55e' : '#ef4444' }} />
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <Crosshair size={24} color="#f59e0b" />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc' }}>{weaponName}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#38bdf8' }}>
                {ammo} <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>/ {reserveAmmo}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

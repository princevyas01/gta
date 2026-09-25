import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Navigation, Car, Crosshair, Map, Smartphone } from 'lucide-react';
import { useGameStore } from './store';
import { soundEngine } from '../core/audio';

export const ControlsOverlay: React.FC<{
  onTriggerInteract: () => void;
  onTriggerFire: () => void;
  onTriggerJump: () => void;
}> = ({ onTriggerInteract, onTriggerFire, onTriggerJump }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { inVehicle, setMapOpen, setPhoneOpen, setWeaponWheelOpen } = useGameStore();

  return (
    <>
      {/* Floating Controls Cheat Sheet (Top Center) */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 8000,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '6px 14px',
          color: '#f8fafc',
          fontSize: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6
        }}
      >
        <div
          onClick={() => {
            setIsExpanded(!isExpanded);
            soundEngine.playUIClick();
          }}
          style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 700 }}
        >
          <HelpCircle size={14} color="#38bdf8" />
          <span>CONTROLS & SHORTCUTS</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>

        {isExpanded && (
          <div style={{ marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px 18px', fontSize: 11 }}>
            <div><strong style={{ color: '#38bdf8' }}>WASD:</strong> Move / Steer</div>
            <div><strong style={{ color: '#38bdf8' }}>Mouse:</strong> Look & Aim</div>
            <div><strong style={{ color: '#38bdf8' }}>Left Click:</strong> Attack / Fire</div>
            <div><strong style={{ color: '#38bdf8' }}>Right Click:</strong> Aim ADS</div>
            <div><strong style={{ color: '#38bdf8' }}>Space:</strong> Jump / Handbrake</div>
            <div><strong style={{ color: '#38bdf8' }}>Left Shift:</strong> Sprint / Nitro</div>
            <div><strong style={{ color: '#38bdf8' }}>E or F:</strong> Enter / Exit Vehicle</div>
            <div><strong style={{ color: '#38bdf8' }}>R:</strong> Reload Weapon</div>
            <div><strong style={{ color: '#38bdf8' }}>Tab:</strong> Weapon Wheel</div>
            <div><strong style={{ color: '#38bdf8' }}>1 - 6:</strong> Quick Weapon Select</div>
            <div><strong style={{ color: '#38bdf8' }}>M:</strong> 26-District Full Map</div>
            <div><strong style={{ color: '#38bdf8' }}>P / Esc:</strong> Phone & Garage</div>
            <div><strong style={{ color: '#38bdf8' }}>~ or F3:</strong> Telemetry Profiler</div>
          </div>
        )}
      </div>

      {/* Touch / Mobile Action Floating Buttons (Bottom Center-Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          right: 24,
          zIndex: 8000,
          display: 'flex',
          gap: 10
        }}
      >
        <button
          onClick={() => {
            onTriggerInteract();
            soundEngine.playUIClick();
          }}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(2, 132, 199, 0.85)',
            border: '2px solid #38bdf8',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
          }}
          title={inVehicle ? 'Exit Vehicle [E/F]' : 'Enter Vehicle [E/F]'}
        >
          <Car size={22} />
        </button>

        <button
          onClick={() => {
            onTriggerFire();
          }}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.85)',
            border: '2px solid #ef4444',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
          }}
          title="Fire Weapon [Left Click]"
        >
          <Crosshair size={22} />
        </button>

        <button
          onClick={() => {
            setMapOpen(true);
            soundEngine.playUIClick();
          }}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.85)',
            border: '2px solid #f59e0b',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
          }}
          title="Open Map [M]"
        >
          <Map size={22} />
        </button>

        <button
          onClick={() => {
            setPhoneOpen(true);
            soundEngine.playUIClick();
          }}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.85)',
            border: '2px solid #a855f7',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
          }}
          title="Open Smartphone [P]"
        >
          <Smartphone size={22} />
        </button>
      </div>
    </>
  );
};

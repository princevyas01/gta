import React from 'react';
import { useGameStore } from './store';
import { Activity, Cpu, Layers, Map, Navigation } from 'lucide-react';

export const DebugProfiler: React.FC<{ playerPos: [number, number, number] }> = ({ playerPos }) => {
  const { isDebugOpen, fps, drawCalls, triangles, activeCellsCount, districtId, districtName, wantedLevel } =
    useGameStore();

  if (!isDebugOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        borderRadius: 8,
        padding: '12px 18px',
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#f8fafc',
        boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#38bdf8', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 4 }}>
        <Activity size={14} /> SAN AURELIO ENGINE TELEMETRY [F3/~]
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        <div>
          <span style={{ color: '#94a3b8' }}>FPS: </span>
          <strong style={{ color: fps >= 55 ? '#22c55e' : '#ef4444' }}>{fps}</strong> ({(1000 / Math.max(1, fps)).toFixed(1)} ms)
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Draw Calls: </span>
          <strong style={{ color: '#38bdf8' }}>{drawCalls}</strong>
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Triangles: </span>
          <strong style={{ color: '#f59e0b' }}>{triangles.toLocaleString()}</strong>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        <div>
          <span style={{ color: '#94a3b8' }}>Active Cells: </span>
          <strong style={{ color: '#38bdf8' }}>{activeCellsCount}</strong> / 26
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Sector: </span>
          <strong>{districtId} ({districtName})</strong>
        </div>
      </div>

      <div>
        <span style={{ color: '#94a3b8' }}>Coordinates: </span>
        <span>
          X: {playerPos[0].toFixed(1)} | Y: {playerPos[1].toFixed(1)} | Z: {playerPos[2].toFixed(1)}
        </span>
      </div>

      <div>
        <span style={{ color: '#94a3b8' }}>Law Status: </span>
        <strong style={{ color: wantedLevel > 0 ? '#ef4444' : '#22c55e' }}>
          HEAT {wantedLevel} / 5
        </strong>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from './GameEngine';
import { HUD } from '../ui/HUD';
import { InteractiveMap } from '../ui/InteractiveMap';
import { WeaponWheel } from '../ui/WeaponWheel';
import { PhoneMenu } from '../ui/PhoneMenu';
import { DebugProfiler } from '../ui/DebugProfiler';
import { ControlsOverlay } from '../ui/ControlsOverlay';
import { inputManager } from '../core/input';

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const [playerCoords, setPlayerCoords] = useState<[number, number, number]>([0, 0, 0]);
  const [playerHeading, setPlayerHeading] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Instantiate master game engine
    const engine = new GameEngine(containerRef.current);
    engineRef.current = engine;
    engine.start();

    // High-rate state tracker for UI
    const interval = setInterval(() => {
      if (engine.player) {
        const p = engine.player.currentVehicle
          ? engine.player.currentVehicle.position
          : engine.player.position;
        setPlayerCoords([p.x, p.y, p.z]);
        setPlayerHeading(
          engine.player.currentVehicle
            ? engine.player.currentVehicle.rotationY
            : engine.player.facingAngle
        );
      }
    }, 60);

    return () => {
      clearInterval(interval);
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  const handleCanvasClick = () => {
    // Acquire pointer lock on 3D viewport click
    inputManager.requestPointerLock();
  };

  const handleSelectWeapon = (idx: number) => {
    if (engineRef.current) {
      engineRef.current.player.activeWeaponIndex = idx;
    }
  };

  const handleSpawnVehicle = (defId: string) => {
    if (engineRef.current) {
      const p = engineRef.current.player.position;
      const offsetPos = p.clone().add({ x: 5, y: 0, z: 5 } as any);
      engineRef.current.vehicleManager.spawnVehicle(defId, offsetPos);
    }
  };

  const handleRestartCheckpoint = () => {
    if (engineRef.current) {
      engineRef.current.missionManager.startMission('m_getaway_blueprint');
      engineRef.current.player.position.set(0, 0.5, 0);
      engineRef.current.player.stats.health = 100;
      engineRef.current.wantedSystem.setHeat(0);
    }
  };

  const handleTriggerInteract = () => {
    inputManager.state.interact = true;
    setTimeout(() => {
      inputManager.state.interact = false;
    }, 100);
  };

  const handleTriggerFire = () => {
    inputManager.state.fire = true;
    setTimeout(() => {
      inputManager.state.fire = false;
    }, 120);
  };

  const handleTriggerJump = () => {
    inputManager.state.jump = true;
    setTimeout(() => {
      inputManager.state.jump = false;
    }, 100);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 3D Three.js WebGL Container */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
      />

      {/* Reactive HUD Overlay */}
      <HUD playerPos={playerCoords} playerHeading={playerHeading} />

      {/* Fullscreen Interactive 26-District Map */}
      <InteractiveMap playerPos={playerCoords} />

      {/* Weapon Wheel Selector */}
      <WeaponWheel onSelectWeapon={handleSelectWeapon} />

      {/* In-Game Smartphone */}
      <PhoneMenu
        onSpawnVehicle={handleSpawnVehicle}
        onRestartCheckpoint={handleRestartCheckpoint}
      />

      {/* Debug Profiler Telemetry */}
      <DebugProfiler playerPos={playerCoords} />

      {/* Controls & Touch degradation buttons */}
      <ControlsOverlay
        onTriggerInteract={handleTriggerInteract}
        onTriggerFire={handleTriggerFire}
        onTriggerJump={handleTriggerJump}
      />
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from './GameEngine';
import { HUD } from '../ui/HUD';
import { InteractiveMap } from '../ui/InteractiveMap';
import { WeaponWheel } from '../ui/WeaponWheel';
import { PhoneMenu } from '../ui/PhoneMenu';
import { DebugProfiler } from '../ui/DebugProfiler';
import { ControlsOverlay } from '../ui/ControlsOverlay';
import { inputManager } from '../core/input';
import { unlockGameAudio } from '../core/audio';

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

    let cancelled = false;

    // Throttled engine snapshot subscription replacing 60ms interval (Pages 10, 85, 101)
    const unsubscribe = engine.onSnapshot(snapshot => {
      if (cancelled) return;
      setPlayerCoords(snapshot.playerCoords);
      setPlayerHeading(snapshot.playerHeading);
    });

    void engine.ready.then(() => {
      if (!cancelled) {
        engine.start();
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  const handleCanvasClick = () => {
    // Unlock audio context on user gesture
    unlockGameAudio();
    // Acquire pointer lock on 3D viewport click
    inputManager.requestPointerLock();
  };

  const handleSelectWeapon = (idx: number) => {
    if (engineRef.current?.player) {
      inputManager.state.weaponSlot = idx;
    }
  };

  const handleSpawnVehicle = (defId: string) => {
    if (!engineRef.current) return;
    const player = engineRef.current.player;
    const spawnPos = player.position.clone();
    spawnPos.x += Math.sin(player.facingAngle) * 6;
    spawnPos.z += Math.cos(player.facingAngle) * 6;
    engineRef.current.vehicleManager.spawnVehicle(defId, spawnPos, player.facingAngle, {
      owned: true,
      spawnKind: 'owned'
    });
  };

  const handleSaveGame = async () => {
    if (!engineRef.current) return false;
    return await engineRef.current.saveGame();
  };

  const handleRestartCheckpoint = () => {
    engineRef.current?.restartCheckpoint();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000',
        userSelect: 'none'
      }}
    >
      {/* 3D WebGPU / WebGL2 Viewport Canvas */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'crosshair',
          display: 'block'
        }}
      />

      {/* Primary HUD Overlay */}
      <HUD playerPos={playerCoords} playerHeading={playerHeading} />

      {/* Fullscreen Interactive 26-District Map */}
      <InteractiveMap playerPos={playerCoords} />

      {/* Radial Tactical Weapon Wheel */}
      <WeaponWheel onSelectWeapon={handleSelectWeapon} />

      {/* Aurelio OS In-Game Smartphone */}
      <PhoneMenu
        onSpawnVehicle={handleSpawnVehicle}
        onSaveGame={handleSaveGame}
        onRestartCheckpoint={handleRestartCheckpoint}
      />

      {/* Diagnostic Profiler Overlay */}
      <DebugProfiler playerPos={playerCoords} />

      {/* Controls Cheat-Sheet & Mobile Touch Controls */}
      <ControlsOverlay
        onTriggerInteract={() => inputManager.queueInteract()}
        onTriggerJump={() => inputManager.queueJump()}
        onFireStart={() => inputManager.queueFire()}
        onFireEnd={() => inputManager.releaseQueuedFire()}
      />
    </div>
  );
};

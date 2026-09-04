# SAN AURELIO - TECHNICAL ARCHITECTURE & SYSTEMS SPECIFICATION

**Target Architecture:** Modern Web 3D Browser Sandbox (Three.js WebGPU / WebGL2 Fallback + TypeScript Strict)

---

## 1. System Topology Overview

```
+---------------------------------------------------------------------------+
|                              USER INTERACTION                             |
|  - Keyboard (WASD, Space, Shift, E, F, M, 1-6) | Mouse Aim / Click / Wheel |
|  - Touch / Mobile controls | Gamepad API support                          |
+---------------------------------------------------------------------------+
                                     |
                                     v
+---------------------------------------------------------------------------+
|                          REACT HUD & UI LAYER                             |
|  - Minimap (Rotating/North-up)  - Fullscreen Interactive Map & Waypoints   |
|  - Health, Armor, Weapon Wheel  - Wanted Level (Heat 0-5 Star Matrix)    |
|  - Mission Objectives & Stinger - In-Game Smartphone / Messenger         |
|  - Vehicle Dashboard / Speedo   - Debug Profiler & Telemetry Metrics     |
+---------------------------------------------------------------------------+
                                     | (Reactive State Bridge)
                                     v
+---------------------------------------------------------------------------+
|                        ZUSTAND / GAME STATE STORE                         |
|  - Player State (Health, Armor, Cash, Inventory, Position, State)         |
|  - Wanted / Law State (Heat level, Search Radius, Sight Status)          |
|  - Mission Engine State (Active, Step, Checkpoint, History)               |
|  - Active Vehicles & Ownership  - Discovered POIs & Sectors               |
|  - Time / Weather Simulation    - Audio Settings & BGM Controls           |
+---------------------------------------------------------------------------+
                                     |
                                     v
+---------------------------------------------------------------------------+
|                       CORE GAME LOOP & SIMULATION                         |
|  - Fixed Time-step Physics Update (60 Hz)                                 |
|  - Kinematic & Dynamic Movement Resolution (Capsule / Raycast Controller) |
|  - Vehicle Physics Subsystem (Wheel slip, suspension, steering, drag)    |
|  - NPC Decision Tree & Crowd Steering (Flocking, fleeing, reaction)       |
|  - Law Enforcement Pursuit AI (Pathfinding, roadblocks, cordon)           |
|  - Audio Synthesizer & Spatial Sound Dispatcher                           |
+---------------------------------------------------------------------------+
                                     |
                                     v
+---------------------------------------------------------------------------+
|                      STREAMING & RENDERING PIPELINE                       |
|  - Three.js Scene Graph & Camera Manager (Third-person, Cockpit, Aerial)  |
|  - Dynamic Cell Streamer (Active Hero Cell + Neighboring Low-LOD Ring)    |
|  - Procedural & Modular Architectural Asset Builders                      |
|  - Instanced Road Networks, Street Furniture & Vegetation                 |
|  - Dynamic Atmospheric Lighting (Sun angle, fog, rain particles, skybox) |
|  - GPU Particle Engine (Muzzle flashes, explosions, smoke, tire burn)     |
+---------------------------------------------------------------------------+
```

---

## 2. Directory Hierarchy

```
src/
  app/              # Application bootstrapping, UI integration, overlay bridges
  core/             # Game loop, input manager, event bus, math utilities, object pool
  rendering/        # Three.js setup, scene management, sky/environment, post-fx
  world/            # 26 Canonical sectors, streaming manager, road network, buildings
  player/           # Hero character, third-person camera, locomotion, weapon sockets
  vehicles/         # 10 Vehicle classes, raycast suspension physics, damage states
  npc/              # Archetype-driven population, pathing, civilian/police AI
  combat/           # 6 weapon classes, hitscan/projectile simulation, impact effects
  missions/         # Data-driven missions, objectives, rewards, progression
  law/              # 0-5 Wanted tier escalation, witness reporting, pursuit logic
  ui/               # React HUD, interactive map, weapon wheel, smartphone, profiler
  audio/            # Web Audio API sound synthesis and spatial sound mixer
  save/             # IndexedDB & LocalStorage persistence with versioned schema
  data/             # Canonical sector metadata, POIs, vehicle specs, weapon tables
```

---

## 3. World Streaming Contract

The San Aurelio logical map spans across 26 distinct sectors.
1. **Hero Radius (Active Cell):** Distance < 350m. Full collision, interactive props, high-fidelity geometry, active physics, fully-simulated NPCs and dynamic vehicles.
2. **Near Radius (Streaming Ring):** Distance 350m - 900m. Medium LOD facades, static road networks, background traffic, ambient audio beds.
3. **Far Radius (Horizon Ring):** Distance > 900m. Distant skyline silhouettes, terrain horizon, fog blending.
4. **Hysteresis Unload:** Cells that drop beyond the active threshold maintain a 5-second eviction buffer before garbage collection to prevent thrashing during boundary crossings.

---

## 4. Vehicle Physics Model

Vehicles run on an arcade-realistic raycast suspension system:
- 4 downward raycasts query ground height, contact normal, and surface friction.
- Compression springs apply vertical restoring forces ($F = -k \cdot x - c \cdot v$).
- Longitudinal forces simulate tire traction, throttle torque, and braking friction.
- Lateral forces calculate side-slip angle and generate cornering force with handbrake drift modifiers.
- Helicopter flight model employs collective lift, cyclic pitch/roll inclination, yaw stabilization, and ground effect.
- Tank model features independent dual-track differential steering and a 360-degree rotating turret with cannon recoil.

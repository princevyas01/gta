# SAN AURELIO - COMPLETE CODEBASE LINE BY LINE SPECIFICATION

> **Project:** SAN AURELIO - Web 3D Open-World Crime Sandbox  
> **Version:** 0.1.0-alpha (Production Master Build)  
> **Platform:** Browser-first 3D Open World (TypeScript Strict + Three.js + React + Zustand)  
> **Total Documented Files:** 58  
> **Generated At:** 2026-09-30T09:45:32.853Z

---

## TABLE OF CONTENTS

1. [package.json](#package-json) - *Project metadata, dependencies (React, Three.js, Zustand, Lucide, Vitest), and npm scripts.*
2. [tsconfig.json](#tsconfig-json) - *Strict TypeScript configuration targeting ES2022 with DOM and path aliases.*
3. [vite.config.ts](#vite-config-ts) - *Vite dev server and production bundler configuration with React plugin and alias resolution.*
4. [index.html](#index-html) - *Main HTML entry shell, viewport setup, base styles, and canvas container.*
5. [.gitignore](#-gitignore) - *Git ignore specifications preventing node_modules and build artifacts from version control.*
6. [README.md](#readme-md) - *Master project documentation detailing lore, feature matrix, quickstart, controls, and test suite.*
7. [ARCHITECTURE.md](#architecture-md) - *In-depth engineering blueprint, runtime loop diagrams, and module responsibilities.*
8. [WORLD_BIBLE.md](#world-bible-md) - *Canonical world bible for the Federal Republic of Vesper, Aurelio Province, and 26 districts.*
9. [PERFORMANCE.md](#performance-md) - *Hardware performance tiers, draw call caps, triangle budgets, and GC avoidance rules.*
10. [ASSET_PIPELINE.md](#asset-pipeline-md) - *Procedural asset synthesis specifications conforming to 360-degree turntable contracts.*
11. [DEBUGGING.md](#debugging-md) - *Developer cheats, keyboard shortcuts, profiler overlays, and QA test execution.*
12. [CHANGELOG.md](#changelog-md) - *Release history documenting version releases and feature additions.*
13. [src/core/types.ts](#src-core-types-ts) - *Domain TypeScript interfaces for Districts, POIs, Vehicles, Weapons, Player, NPCs, and Saves.*
14. [src/core/math.ts](#src-core-math-ts) - *Coordinate conversion between 3D world space and 2D map space, vector helpers, and distance formulas.*
15. [src/core/events.ts](#src-core-events-ts) - *Type-safe event bus facilitating decoupled pub/sub communication across all engine systems.*
16. [src/core/clock.ts](#src-core-clock-ts) - *Fixed 60Hz physics clock with accelerated 24-hour day/night cycle progression.*
17. [src/core/input.ts](#src-core-input-ts) - *Input manager capturing keyboard, mouse aim, pointer lock, and touch inputs.*
18. [src/core/audio.ts](#src-core-audio-ts) - *Procedural Web Audio API sound synthesizer for vehicle RPM, gunshots, sirens, and UI clicks.*
19. [src/data/districts.ts](#src-data-districts-ts) - *Canonical dataset of all 26 districts with geographic bounds, colors, and archetypes.*
20. [src/data/pois.ts](#src-data-pois-ts) - *Dataset of canonical landmarks, safehouses, garages, shops, hospitals, and police stations.*
21. [src/data/vehicles.ts](#src-data-vehicles-ts) - *Specifications for all 10 canonical vehicle classes (speed, mass, acceleration, handling).*
22. [src/data/weapons.ts](#src-data-weapons-ts) - *Arsenal dataset defining 6 weapon classes, damage, fire rates, magazine size, and spread.*
23. [src/data/missions.ts](#src-data-missions-ts) - *Data-driven missions including multi-stage story heists, time trials, and courier drops.*
24. [src/save/saveManager.ts](#src-save-savemanager-ts) - *Versioned save/load system supporting schema migration and localStorage persistence.*
25. [src/rendering/materials.ts](#src-rendering-materials-ts) - *Cached shared materials library for roads, concrete, glass, neon, and vehicle paint.*
26. [src/rendering/particles.ts](#src-rendering-particles-ts) - *Object-pooled GPU particle engine for explosions, muzzle flashes, and tire burnout smoke.*
27. [src/rendering/sky.ts](#src-rendering-sky-ts) - *Atmospheric day/night celestial lighting, sun orbit, dynamic fog, and rain particles.*
28. [src/rendering/sceneManager.ts](#src-rendering-scenemanager-ts) - *Three.js master scene setup, perspective camera, ACES Filmic tone mapping, and shadows.*
29. [src/world/roadNetwork.ts](#src-world-roadnetwork-ts) - *Interconnected road graph spanning all 26 sectors with A* pathfinding and 3D GPS route ribbons.*
30. [src/world/sectorBuilder.ts](#src-world-sectorbuilder-ts) - *Procedural architectural generator building skyscrapers, quays, warehouses, and collision meshes.*
31. [src/world/worldStreamer.ts](#src-world-worldstreamer-ts) - *Cell streaming manager loading hero high-LOD cells and perimeter proxy shells with hysteresis.*
32. [src/player/characterModel.ts](#src-player-charactermodel-ts) - *Procedural 3D humanoid character model for Kai Mercer with articulated skeletal rig.*
33. [src/player/thirdPersonCamera.ts](#src-player-thirdpersoncamera-ts) - *Orbital third-person camera with obstacle collision avoidance and shoulder aim zoom.*
34. [src/player/playerController.ts](#src-player-playercontroller-ts) - *Locomotion controller handling movement, stamina, jumping, weapon sockets, and vehicle entry.*
35. [src/vehicles/vehicleFactory.ts](#src-vehicles-vehiclefactory-ts) - *Procedural 3D model generator for cars, bikes, boats, helicopters, and tanks.*
36. [src/vehicles/vehicleController.ts](#src-vehicles-vehiclecontroller-ts) - *Vehicle physics controller handling suspension, drifting, flight lift, and tank turret.*
37. [src/vehicles/vehicleManager.ts](#src-vehicles-vehiclemanager-ts) - *Fleet manager handling vehicle spawning, player entry/exit, and police pursuit cruisers.*
38. [src/npc/npcModel.ts](#src-npc-npcmodel-ts) - *Procedural 3D models for pedestrians and police officers with animated walk cycles.*
39. [src/npc/npcManager.ts](#src-npc-npcmanager-ts) - *Crowd manager handling pedestrian schedules, fleeing reactions, and police retaliatory combat.*
40. [src/combat/combatSystem.ts](#src-combat-combatsystem-ts) - *Combat engine managing weapon firing, hitscan raycasting, rockets, recoil, and damage.*
41. [src/law/wantedSystem.ts](#src-law-wantedsystem-ts) - *0-5 Star Wanted heat escalation manager with witness reporting and evasion cooldown.*
42. [src/missions/missionManager.ts](#src-missions-missionmanager-ts) - *Mission runner tracking active objectives, checkpoints, and cash reward payouts.*
43. [src/ui/store.ts](#src-ui-store-ts) - *Zustand reactive UI state store bridging engine telemetry and player stats to React.*
44. [src/ui/HUD.tsx](#src-ui-hud-tsx) - *HUD overlay with circular minimap radar, health/armor, cash, ammo, and speedometer.*
45. [src/ui/InteractiveMap.tsx](#src-ui-interactivemap-tsx) - *Fullscreen 26-district pannable and zoomable map with POI filters and waypoint routing.*
46. [src/ui/WeaponWheel.tsx](#src-ui-weaponwheel-tsx) - *Radial tactical weapon selector overlay for rapid arsenal switching.*
47. [src/ui/PhoneMenu.tsx](#src-ui-phonemenu-tsx) - *In-game smartphone (Aurelio OS) featuring vehicle delivery, contacts, and quick save.*
48. [src/ui/DebugProfiler.tsx](#src-ui-debugprofiler-tsx) - *Real-time telemetry overlay tracking FPS, draw calls, triangles, coordinates, and active cells.*
49. [src/ui/ControlsOverlay.tsx](#src-ui-controlsoverlay-tsx) - *Controls cheat-sheet and on-screen touch buttons for mobile and tablet degradation.*
50. [src/app/GameEngine.ts](#src-app-gameengine-ts) - *Master game engine orchestrator coordinating graphics, physics, streaming, AI, and audio.*
51. [src/app/App.tsx](#src-app-app-tsx) - *Top-level React application component hosting the 3D canvas and all UI overlays.*
52. [src/main.tsx](#src-main-tsx) - *DOM entry point mounting the React root.*
53. [test/math.test.ts](#test-math-test-ts) - *Unit tests verifying coordinate transformations, boundaries, and math utilities.*
54. [test/missions.test.ts](#test-missions-test-ts) - *Unit tests verifying mission loading, stage progression, and objective completion.*
55. [test/save.test.ts](#test-save-test-ts) - *Unit tests verifying save serialization, data roundtripping, and legacy schema migration.*
56. [test/wanted.test.ts](#test-wanted-test-ts) - *Unit tests verifying heat tier escalation, search radius, and evasion reset.*
57. [test/smoke.test.ts](#test-smoke-test-ts) - *End-to-end integration smoke test verifying districts, vehicles, weapons, and architecture.*
58. [test/perf.test.ts](#test-perf-test-ts) - *Performance benchmarks testing 100,000 spatial queries and hot-loop calculations.*

---

## 1. `package.json`

<a id="package-json"></a>

**Role:** Project metadata, dependencies (React, Three.js, Zustand, Lucide, Vitest), and npm scripts.

- **File Path:** `package.json`
- **Total Lines:** 33
- **Size:** 0.75 KB

### Line-by-Line Source Code

```json
0001 | {
0002 |   "name": "san-aurelio-web3d",
0003 |   "private": true,
0004 |   "version": "0.1.0",
0005 |   "type": "module",
0006 |   "scripts": {
0007 |     "dev": "vite",
0008 |     "build": "tsc && vite build",
0009 |     "preview": "vite preview",
0010 |     "test": "vitest run",
0011 |     "test:e2e": "vitest run test/smoke.test.ts",
0012 |     "lint": "tsc --noEmit",
0013 |     "perf": "vitest run test/perf.test.ts"
0014 |   },
0015 |   "dependencies": {
0016 |     "lucide-react": "^1.16.0",
0017 |     "react": "^19.0.0",
0018 |     "react-dom": "^19.0.0",
0019 |     "three": "^0.174.0",
0020 |     "zustand": "^5.0.3"
0021 |   },
0022 |   "devDependencies": {
0023 |     "@types/node": "^22.13.9",
0024 |     "@types/react": "^19.0.10",
0025 |     "@types/react-dom": "^19.0.4",
0026 |     "@types/three": "^0.174.0",
0027 |     "@vitejs/plugin-react": "^4.3.4",
0028 |     "typescript": "^5.7.3",
0029 |     "vite": "^6.2.0",
0030 |     "vitest": "^3.0.7"
0031 |   }
0032 | }
0033 | 
```

---

## 2. `tsconfig.json`

<a id="tsconfig-json"></a>

**Role:** Strict TypeScript configuration targeting ES2022 with DOM and path aliases.

- **File Path:** `tsconfig.json`
- **Total Lines:** 26
- **Size:** 0.60 KB

### Line-by-Line Source Code

```json
0001 | {
0002 |   "compilerOptions": {
0003 |     "target": "ES2022",
0004 |     "useDefineForClassFields": true,
0005 |     "lib": ["ES2022", "DOM", "DOM.Iterable"],
0006 |     "module": "ESNext",
0007 |     "skipLibCheck": true,
0008 |     "moduleResolution": "bundler",
0009 |     "allowImportingTsExtensions": false,
0010 |     "resolveJsonModule": true,
0011 |     "isolatedModules": true,
0012 |     "moduleDetection": "force",
0013 |     "noEmit": true,
0014 |     "jsx": "react-jsx",
0015 |     "strict": true,
0016 |     "noUnusedLocals": false,
0017 |     "noUnusedParameters": false,
0018 |     "noFallthroughCasesInSwitch": true,
0019 |     "baseUrl": ".",
0020 |     "paths": {
0021 |       "@/*": ["src/*"]
0022 |     }
0023 |   },
0024 |   "include": ["src", "test"]
0025 | }
0026 | 
```

---

## 3. `vite.config.ts`

<a id="vite-config-ts"></a>

**Role:** Vite dev server and production bundler configuration with React plugin and alias resolution.

- **File Path:** `vite.config.ts`
- **Total Lines:** 21
- **Size:** 0.34 KB

### Line-by-Line Source Code

```typescript
0001 | import { defineConfig } from 'vite';
0002 | import react from '@vitejs/plugin-react';
0003 | import path from 'path';
0004 | 
0005 | export default defineConfig({
0006 |   plugins: [react()],
0007 |   resolve: {
0008 |     alias: {
0009 |       '@': path.resolve(__dirname, './src')
0010 |     }
0011 |   },
0012 |   server: {
0013 |     port: 3000,
0014 |     open: false
0015 |   },
0016 |   build: {
0017 |     target: 'esnext',
0018 |     sourcemap: true
0019 |   }
0020 | });
0021 | 
```

---

## 4. `index.html`

<a id="index-html"></a>

**Role:** Main HTML entry shell, viewport setup, base styles, and canvas container.

- **File Path:** `index.html`
- **Total Lines:** 36
- **Size:** 1.17 KB

### Line-by-Line Source Code

```html
0001 | <!DOCTYPE html>
0002 | <html lang="en">
0003 |   <head>
0004 |     <meta charset="UTF-8" />
0005 |     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
0006 |     <title>SAN AURELIO - Web 3D Open-World Crime Sandbox</title>
0007 |     <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 95,90 5,90' fill='%23f59e0b'/><text x='50' y='75' font-size='42' font-weight='bold' text-anchor='middle' fill='%230b0f19'>SA</text></svg>" />
0008 |     <style>
0009 |       * {
0010 |         box-sizing: border-box;
0011 |         user-select: none;
0012 |         -webkit-user-select: none;
0013 |         margin: 0;
0014 |         padding: 0;
0015 |       }
0016 |       html, body, #root {
0017 |         width: 100%;
0018 |         height: 100%;
0019 |         overflow: hidden;
0020 |         background-color: #090d16;
0021 |         color: #f1f5f9;
0022 |         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
0023 |       }
0024 |       canvas {
0025 |         display: block;
0026 |         width: 100%;
0027 |         height: 100%;
0028 |       }
0029 |     </style>
0030 |   </head>
0031 |   <body>
0032 |     <div id="root"></div>
0033 |     <script type="module" src="/src/main.tsx"></script>
0034 |   </body>
0035 | </html>
0036 | 
```

---

## 5. `.gitignore`

<a id="-gitignore"></a>

**Role:** Git ignore specifications preventing node_modules and build artifacts from version control.

- **File Path:** `.gitignore`
- **Total Lines:** 5
- **Size:** 0.04 KB

### Line-by-Line Source Code

```typescript
0001 | node_modules/
0002 | dist/
0003 | .DS_Store
0004 | *.local
0005 | 
```

---

## 6. `README.md`

<a id="readme-md"></a>

**Role:** Master project documentation detailing lore, feature matrix, quickstart, controls, and test suite.

- **File Path:** `README.md`
- **Total Lines:** 92
- **Size:** 3.88 KB

### Line-by-Line Source Code

```markdown
0001 | # SAN AURELIO - Web 3D Open-World Crime Sandbox
0002 | 
0003 | > **Original IP 3D Open-World Browser Action Sandbox**  
0004 | > Inspired by the systemic depth, traversability, and crime sandbox freedom of AAA classics (GTA V reference quality target) while strictly maintaining 100% original world lore, characters, vehicles, and branding.
0005 | 
0006 | ![License](https://img.shields.io/badge/License-MIT-blue.svg)
0007 | ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
0008 | ![Three.js](https://img.shields.io/badge/Three.js-0.174-green.svg)
0009 | ![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)
0010 | 
0011 | ---
0012 | 
0013 | ## 🌟 Key Features
0014 | 
0015 | 1. **26 Canonical Sectors & Streamed World:**
0016 |    - From high-density skyscrapers in Meridian Core to industrial docks, sunny promenades, mountain switchbacks, and military checkpoints.
0017 |    - Dynamic sector streaming manager maintaining 60 FPS performance without memory leaks.
0018 | 2. **Hero Traversal & Control (Kai Mercer / Mira Kade):**
0019 |    - Responsive 3rd-person camera with smooth orbit, collision dampening, and shoulder aiming.
0020 |    - 8-direction locomotion blend (walk, jog, sprint, jump, climb, vault, vehicle mounting).
0021 | 3. **10 Original Vehicle Classes:**
0022 |    - **Cars & Vans:** VX-9 Kestrel (Sports Coupe), Aurelia Regent (Sedan), Redwood 250 (Pickup), Courier L4 (Van), Mica Hatch (Compact).
0023 |    - **Bikes:** Kite 600 street motorbike with dynamic leaning.
0024 |    - **Boats:** TideRunner 24 offshore planing hull with dynamic water spray.
0025 |    - **Aircraft:** HX-4 Sparrow utility helicopter with collective lift, cyclic pitch/roll, and searchlight.
0026 |    - **Tanks:** AR-7 Mastiff light tank with dual-track differential driving and 360-degree aiming cannon.
0027 |    - **Law Enforcement:** AMPS Police Cruiser with responsive sirens and pursuit AI.
0028 | 4. **Combat & Weapons Arsenal:**
0029 |    - P1 Vesper & Kestrel 9 (Pistols), Vortex 45 (SMG), Rook-12 (Shotgun), Arcline AR (Assault Rifle), Crownline S-7 (Sniper), Ramjet L (Heavy Launcher).
0030 |    - Hitscan ballistics, recoil, muzzle flash particles, impact sparks, and sound synthesis.
0031 | 5. **Law Enforcement & 0-5 Star Heat System:**
0032 |    - Witness detection, police cruiser spawning, road pursuit, roadblock tactics, and line-of-sight cooldown evasion.
0033 | 6. **Data-Driven Missions & Side Activities:**
0034 |    - Multi-phase heist missions ("Meridian Syndicate", "Getaway Blueprint"), high-speed street sprints, courier drops.
0035 | 7. **Interactive Clickable Map & GPS Route Ribbon:**
0036 |    - Full-screen pan/zoom interactive map of Aurelio Province with district inspections, landmark POIs, and 3D world-space route ribbons.
0037 | 8. **Synthesized Web Audio Engine:**
0038 |    - Procedural engine RPM pitch modulation, tire skid squeals, gunfire acoustics, police siren warbles, and UI feedback.
0039 | 9. **Persistence & Save States:**
0040 |    - Versioned save/load system storing player location, cash (AUR), inventory, weapon ammo, vehicle states, and mission milestones.
0041 | 
0042 | ---
0043 | 
0044 | ## 🚀 Quick Start
0045 | 
0046 | ### Installation
0047 | ```bash
0048 | # Clone the repository
0049 | git clone https://github.com/user/san-aurelio.git
0050 | cd san-aurelio
0051 | 
0052 | # Install dependencies
0053 | npm install
0054 | 
0055 | # Launch local development server
0056 | npm run dev
0057 | ```
0058 | 
0059 | ### Production Build & Testing
0060 | ```bash
0061 | # Run unit and simulation tests
0062 | npm run test
0063 | 
0064 | # Run end-to-end smoke test
0065 | npm run test:e2e
0066 | 
0067 | # Run performance benchmark suite
0068 | npm run perf
0069 | 
0070 | # Build production bundle
0071 | npm run build
0072 | ```
0073 | 
0074 | ---
0075 | 
0076 | ## 🎮 Controls
0077 | 
0078 | - **W, A, S, D:** Movement / Vehicle Throttle & Steering
0079 | - **Mouse / Drag:** Look & Aim Camera
0080 | - **Left Click:** Attack / Fire Weapon / Cannon
0081 | - **Right Click:** Aim Down Sights (ADS)
0082 | - **Space:** Jump (Foot) / Handbrake Drift (Vehicle)
0083 | - **Left Shift:** Sprint (Foot) / Nitro Boost (Vehicle)
0084 | - **E / F:** Enter / Exit Vehicle
0085 | - **Tab:** Open Weapon Radial Wheel
0086 | - **1, 2, 3, 4, 5, 6:** Direct Weapon Hotkeys
0087 | - **R:** Tactical Reload
0088 | - **M:** Fullscreen Interactive Map & GPS Waypoint
0089 | - **P / Esc:** Pause & In-Game Smartphone
0090 | - **~ / F3:** Toggle Telemetry & Debug Profiler
0091 | - **V:** Cycle Camera View (Close, Far, Cockpit)
0092 | 
```

---

## 7. `ARCHITECTURE.md`

<a id="architecture-md"></a>

**Role:** In-depth engineering blueprint, runtime loop diagrams, and module responsibilities.

- **File Path:** `ARCHITECTURE.md`
- **Total Lines:** 101
- **Size:** 5.97 KB

### Line-by-Line Source Code

```markdown
0001 | # SAN AURELIO - TECHNICAL ARCHITECTURE & SYSTEMS SPECIFICATION
0002 | 
0003 | **Target Architecture:** Modern Web 3D Browser Sandbox (Three.js WebGPU / WebGL2 Fallback + TypeScript Strict)
0004 | 
0005 | ---
0006 | 
0007 | ## 1. System Topology Overview
0008 | 
0009 | ```
0010 | +---------------------------------------------------------------------------+
0011 | |                              USER INTERACTION                             |
0012 | |  - Keyboard (WASD, Space, Shift, E, F, M, 1-6) | Mouse Aim / Click / Wheel |
0013 | |  - Touch / Mobile controls | Gamepad API support                          |
0014 | +---------------------------------------------------------------------------+
0015 |                                      |
0016 |                                      v
0017 | +---------------------------------------------------------------------------+
0018 | |                          REACT HUD & UI LAYER                             |
0019 | |  - Minimap (Rotating/North-up)  - Fullscreen Interactive Map & Waypoints   |
0020 | |  - Health, Armor, Weapon Wheel  - Wanted Level (Heat 0-5 Star Matrix)    |
0021 | |  - Mission Objectives & Stinger - In-Game Smartphone / Messenger         |
0022 | |  - Vehicle Dashboard / Speedo   - Debug Profiler & Telemetry Metrics     |
0023 | +---------------------------------------------------------------------------+
0024 |                                      | (Reactive State Bridge)
0025 |                                      v
0026 | +---------------------------------------------------------------------------+
0027 | |                        ZUSTAND / GAME STATE STORE                         |
0028 | |  - Player State (Health, Armor, Cash, Inventory, Position, State)         |
0029 | |  - Wanted / Law State (Heat level, Search Radius, Sight Status)          |
0030 | |  - Mission Engine State (Active, Step, Checkpoint, History)               |
0031 | |  - Active Vehicles & Ownership  - Discovered POIs & Sectors               |
0032 | |  - Time / Weather Simulation    - Audio Settings & BGM Controls           |
0033 | +---------------------------------------------------------------------------+
0034 |                                      |
0035 |                                      v
0036 | +---------------------------------------------------------------------------+
0037 | |                       CORE GAME LOOP & SIMULATION                         |
0038 | |  - Fixed Time-step Physics Update (60 Hz)                                 |
0039 | |  - Kinematic & Dynamic Movement Resolution (Capsule / Raycast Controller) |
0040 | |  - Vehicle Physics Subsystem (Wheel slip, suspension, steering, drag)    |
0041 | |  - NPC Decision Tree & Crowd Steering (Flocking, fleeing, reaction)       |
0042 | |  - Law Enforcement Pursuit AI (Pathfinding, roadblocks, cordon)           |
0043 | |  - Audio Synthesizer & Spatial Sound Dispatcher                           |
0044 | +---------------------------------------------------------------------------+
0045 |                                      |
0046 |                                      v
0047 | +---------------------------------------------------------------------------+
0048 | |                      STREAMING & RENDERING PIPELINE                       |
0049 | |  - Three.js Scene Graph & Camera Manager (Third-person, Cockpit, Aerial)  |
0050 | |  - Dynamic Cell Streamer (Active Hero Cell + Neighboring Low-LOD Ring)    |
0051 | |  - Procedural & Modular Architectural Asset Builders                      |
0052 | |  - Instanced Road Networks, Street Furniture & Vegetation                 |
0053 | |  - Dynamic Atmospheric Lighting (Sun angle, fog, rain particles, skybox) |
0054 | |  - GPU Particle Engine (Muzzle flashes, explosions, smoke, tire burn)     |
0055 | +---------------------------------------------------------------------------+
0056 | ```
0057 | 
0058 | ---
0059 | 
0060 | ## 2. Directory Hierarchy
0061 | 
0062 | ```
0063 | src/
0064 |   app/              # Application bootstrapping, UI integration, overlay bridges
0065 |   core/             # Game loop, input manager, event bus, math utilities, object pool
0066 |   rendering/        # Three.js setup, scene management, sky/environment, post-fx
0067 |   world/            # 26 Canonical sectors, streaming manager, road network, buildings
0068 |   player/           # Hero character, third-person camera, locomotion, weapon sockets
0069 |   vehicles/         # 10 Vehicle classes, raycast suspension physics, damage states
0070 |   npc/              # Archetype-driven population, pathing, civilian/police AI
0071 |   combat/           # 6 weapon classes, hitscan/projectile simulation, impact effects
0072 |   missions/         # Data-driven missions, objectives, rewards, progression
0073 |   law/              # 0-5 Wanted tier escalation, witness reporting, pursuit logic
0074 |   ui/               # React HUD, interactive map, weapon wheel, smartphone, profiler
0075 |   audio/            # Web Audio API sound synthesis and spatial sound mixer
0076 |   save/             # IndexedDB & LocalStorage persistence with versioned schema
0077 |   data/             # Canonical sector metadata, POIs, vehicle specs, weapon tables
0078 | ```
0079 | 
0080 | ---
0081 | 
0082 | ## 3. World Streaming Contract
0083 | 
0084 | The San Aurelio logical map spans across 26 distinct sectors.
0085 | 1. **Hero Radius (Active Cell):** Distance < 350m. Full collision, interactive props, high-fidelity geometry, active physics, fully-simulated NPCs and dynamic vehicles.
0086 | 2. **Near Radius (Streaming Ring):** Distance 350m - 900m. Medium LOD facades, static road networks, background traffic, ambient audio beds.
0087 | 3. **Far Radius (Horizon Ring):** Distance > 900m. Distant skyline silhouettes, terrain horizon, fog blending.
0088 | 4. **Hysteresis Unload:** Cells that drop beyond the active threshold maintain a 5-second eviction buffer before garbage collection to prevent thrashing during boundary crossings.
0089 | 
0090 | ---
0091 | 
0092 | ## 4. Vehicle Physics Model
0093 | 
0094 | Vehicles run on an arcade-realistic raycast suspension system:
0095 | - 4 downward raycasts query ground height, contact normal, and surface friction.
0096 | - Compression springs apply vertical restoring forces ($F = -k \cdot x - c \cdot v$).
0097 | - Longitudinal forces simulate tire traction, throttle torque, and braking friction.
0098 | - Lateral forces calculate side-slip angle and generate cornering force with handbrake drift modifiers.
0099 | - Helicopter flight model employs collective lift, cyclic pitch/roll inclination, yaw stabilization, and ground effect.
0100 | - Tank model features independent dual-track differential steering and a 360-degree rotating turret with cannon recoil.
0101 | 
```

---

## 8. `WORLD_BIBLE.md`

<a id="world-bible-md"></a>

**Role:** Canonical world bible for the Federal Republic of Vesper, Aurelio Province, and 26 districts.

- **File Path:** `WORLD_BIBLE.md`
- **Total Lines:** 80
- **Size:** 5.84 KB

### Line-by-Line Source Code

```markdown
0001 | # SAN AURELIO - WORLD BIBLE & CANONICAL UNIVERSE
0002 | 
0003 | **Federal Republic of Vesper | Aurelio Province**  
0004 | *Document Version: 2.0 - Visual Bible & Canon*
0005 | 
0006 | ---
0007 | 
0008 | ## 1. Setting Overview
0009 | San Aurelio is a sun-bleached coastal metropolis and regional economic hub situated in the Federal Republic of Vesper. It features stark contrasts: glass-clad financial skyscrapers in Meridian Core, cobblestones and historic archways in Old Quarter / Old Quay, sprawling shipping container yards in South Docks and Ironworks, sun-soaked beaches along Saltwater Coast, and towering arid foothills leading up into the Caldera Range and Blackridge Reserve.
0010 | 
0011 | ### Core Lore & Atmosphere
0012 | - **Nation:** Federal Republic of Vesper
0013 | - **Province:** Aurelio Province
0014 | - **Primary Currency:** Aurelians (AUR, ₳)
0015 | - **Law Enforcement:** Aurelio Metropolitan Police Service (AMPS)
0016 | - **Transit Authority:** Aurelio Metro & Transit (AMT)
0017 | - **Atmosphere:** High-contrast coastal light, cinematic synth-funk and ambient industrial soundscapes, vibrant district-specific street cultures, underground syndicate tensions.
0018 | 
0019 | ---
0020 | 
0021 | ## 2. Canonical 26 Districts & Sectors
0022 | 
0023 | | ID | District Name | Archetype | Color Language | Street Language | Signature Landmark |
0024 | |---|---|---|---|---|---|
0025 | | D01 | **Aurelio Central** | Downtown Core | Cool Glass / Steel | Tight Grid | Aurelio Tower |
0026 | | D02 | **Meridian Core** | Financial CBD | Steel / Blue Glass | Multi-lane Grid | Meridian Exchange |
0027 | | D03 | **Old Quay** | Historic Waterfront | Terracotta / Brick / Stucco | Cobblestones & Alleys | Dock Wharf & Clockhouse |
0028 | | D04 | **Civic Rise** | Civic / Government | Marble / Off-white Concrete | Ceremonial Boulevards | Grand Assembly |
0029 | | D05 | **Neon Row** | Nightlife & Entertainment | Magenta / Cyan / Dark Chrome | Dense Frontage & Awnings | Neon Spire Plaza |
0030 | | D06 | **Harborview** | Coastal Promenade | White Stucco / Marine Blue | Pedestrian Board-Walkway | Harbor Arc Marina |
0031 | | D07 | **Sunspire** | Sports & Events | Yellow Ochre / Concrete | Broad Arterials & Plazas | Sunspire Arena |
0032 | | D08 | **Eastmoor** | Residential Suburbs | Warm Render / Brick Tile | Tree-lined Cul-de-sacs | Eastmoor Commons |
0033 | | D09 | **Caldera Hills** | Upland / Highground | Stone / Cedar / Glass | Switchback Mountain Roads | Caldera Observatory |
0034 | | D10 | **Crown Heights** | Affluent Estates | Glass / Landscaped Stone | Gated Curved Drives | Crown Reservoir |
0035 | | D11 | **Northpoint** | Mixed Campus & Transit | Brick / Timber / Glass | Collector Roads | Northpoint College |
0036 | | D12 | **Pine Crest** | Forest Edge | Wood / Weathered Metal | Rural Unpaved & Dirt Trails | Pine Crest Trailhead |
0037 | | D13 | **Westgate** | Commercial Retail | Concrete / Branded Signage | Strip Corridors & Malls | Westgate Interchange |
0038 | | D14 | **Port Meridian** | Heavy Freight Port | Painted Steel / Rust / Concrete | Container Terminal Grid | Port Meridian Crane Line |
0039 | | D15 | **Ironworks** | Heavy Industry | Rust / Corrugated Iron | Service Lanes & Rail Lines | Ironworks Stack |
0040 | | D16 | **Docklands** | Shipping & Warehouses | Steel / Asphalt | Repair Slips & Docks | Docklands Drydock |
0041 | | D17 | **Salt Marsh** | Coastal Wetland | Weathered Timber / Reed | Levee Roads & Stilts | Salt Marsh Bird Tower |
0042 | | D18 | **Southbank** | Riverfront Mixed | Concrete / Aged Brick | River Promenade | Southbank Locks |
0043 | | D19 | **Rancho Sol** | Rural Agriculture | Stucco / Adobe / Timber | Ranch Lanes & Fences | Sol Horse Ranch |
0044 | | D20 | **Airport District** | Aviation Transport | Glass / Brushed Metal | Airport Ring Expressway | Aurelio Intl Terminal |
0045 | | D21 | **Freeway Belt** | Transport Arterial | Cast Concrete / Asphalt | Flyovers & Stack Junctions | Freeway 8 Junction |
0046 | | D22 | **Desert Edge** | Arid Scrub & Mining | Sandstone / Corrugated Tin | Long Dusty Straights | Dryline Quarry |
0047 | | D23 | **Blackridge Reserve** | Military Wilderness | Dark Composite / Olive Concrete | Guarded Checkpoints | Blackridge Airbase |
0048 | | D24 | **Sable Island** | Offshore Utility | Weathered Steel / Concrete | Industrial Ring Road | Sable Grid Station |
0049 | | D25 | **Pelican Keys** | Resort Archipelago | Bright Stucco / Glass | Curved Coastal Causeway | Pelican Lighthouse |
0050 | | D26 | **Silver Lake Basin** | Freshwater Leisure | Pine / Weathered Stone | Lakeside Loops | Silver Lake Marina |
0051 | 
0052 | ---
0053 | 
0054 | ## 3. Characters
0055 | 
0056 | ### Protagonist: Kai Mercer (Operational Alias: Mira Kade)
0057 | - **Role:** Agile urban operator and syndicate freelance specialist.
0058 | - **Visual Silhouette:** Athleisure layered utility jacket with high collar, fitted technical cargo trousers, reinforced street trainers, utility wrist comms, tactical fingerless gloves.
0059 | - **Philosophy:** Ruthlessly pragmatic, calculating, non-flashy, master of traversal, driving, and tactical deterrence.
0060 | 
0061 | ### Fictional Agencies & Factions
0062 | - **AMPS:** Aurelio Metropolitan Police Service. Crisp navy and white cruisers, strict heat escalation protocol.
0063 | - **Kestrel Transport & Courier:** Legitimate logistics firm used for covert cross-city asset moving.
0064 | - **Vesper Steel & Forge:** Industrial manufacturing union dominating Ironworks and Port Meridian.
0065 | - **Aurelio Syndicate:** Underworld broker network delivering contract missions via encrypted burner terminals.
0066 | 
0067 | ---
0068 | 
0069 | ## 4. Vehicle Manufacturers & Lineup
0070 | 
0071 | - **Velora Motors:** Sleek luxury and sports coupe manufacturers (*Velora S2*, *VX-9 Kestrel*).
0072 | - **Aurelia Automotive:** Everyday reliable sedans and taxis (*Aurelia Regent*).
0073 | - **Redwood Heavy Industries:** Tough utility pickups and haulers (*Redwood 250*).
0074 | - **Courier Corp:** High-capacity delivery panel vans (*Courier L4*).
0075 | - **Mica Citycraft:** Compact city runabouts (*Mica Hatch*).
0076 | - **Kite Cycles:** Rapid street and dirt motorbikes (*Kite 600*).
0077 | - **TideRunner Marine:** Planing offshore speed boats (*TideRunner 24*).
0078 | - **Skylark Aeronautics:** Utility and scouting helicopters (*Skylark H2 / HX-4 Sparrow*).
0079 | - **Bastion Defense Corp:** Heavy armored vehicle and tank manufacturer (*Bastion MBT / AR-7 Mastiff*).
0080 | 
```

---

## 9. `PERFORMANCE.md`

<a id="performance-md"></a>

**Role:** Hardware performance tiers, draw call caps, triangle budgets, and GC avoidance rules.

- **File Path:** `PERFORMANCE.md`
- **Total Lines:** 30
- **Size:** 1.21 KB

### Line-by-Line Source Code

```markdown
0001 | # SAN AURELIO - PERFORMANCE & BUDGET TARGETS
0002 | 
0003 | ---
0004 | 
0005 | ## 1. Frame Rate & Hardware Tiers
0006 | 
0007 | | Profile | Target FPS | Max Draw Calls | Max Triangles | Shadow Res | Distance LOD |
0008 | |---|---|---|---|---|---|
0009 | | **High (Discrete GPU)** | 60 FPS | < 250 | < 350,000 | 2048x2048 | 800m |
0010 | | **Medium (Integrated GPU)** | 45-60 FPS | < 160 | < 200,000 | 1024x1024 | 500m |
0011 | | **Low / Fallback (Laptops/Mobile)**| 30 FPS | < 90 | < 100,000 | Disabled / Hard | 300m |
0012 | 
0013 | ---
0014 | 
0015 | ## 2. Allocation & GC Hygiene
0016 | - **Zero Allocations in Hot Update Loops:** Reuse vectors, quaternions, and raycasters via statically initialized scratch objects (`_v0`, `_v1`, `_q0`, etc.).
0017 | - **Object Pooling:** Projectiles, muzzle flashes, blood/spark impact decals, and spent shell casings use reusable pools with pre-allocated array indices.
0018 | - **Instancing:** Streetlights, road barriers, traffic cones, trees, and windows are batched using `THREE.InstancedMesh` with dynamic transform buffers.
0019 | 
0020 | ---
0021 | 
0022 | ## 3. Real-Time Telemetry
0023 | The built-in HUD Debug Profiler tracks:
0024 | - Render FPS & Frame Delta ($dt$ in ms)
0025 | - WebGL Draw Call Count
0026 | - Rendered Geometric Faces / Triangles
0027 | - Active Streaming Cells
0028 | - Active Physics Entities & Simulation Bodies
0029 | - Wanted Level & Current Law Dispatch State
0030 | 
```

---

## 10. `ASSET_PIPELINE.md`

<a id="asset-pipeline-md"></a>

**Role:** Procedural asset synthesis specifications conforming to 360-degree turntable contracts.

- **File Path:** `ASSET_PIPELINE.md`
- **Total Lines:** 31
- **Size:** 2.38 KB

### Line-by-Line Source Code

```markdown
0001 | # SAN AURELIO - ASSET PIPELINE & PROCEDURAL SYNTHESIS
0002 | 
0003 | ---
0004 | 
0005 | ## 1. Asset Strategy & Zero External Asset Dependency
0006 | To achieve instantaneous boot times in any browser without gigabytes of external downloads or CORS failures, the San Aurelio engine utilizes a high-efficiency **procedural geometric synthesis and shader pipeline** conforming strictly to the 360 Design Blueprints:
0007 | 
0008 | 1. **Character Synthesis (Kai Mercer / Mira Kade):**
0009 |    - High-mobility humanoid rig with articulated torso, head, shoulders, elbows, hips, knees, and feet.
0010 |    - Distinct asymmetrical tactical jacket with high-collar trim, modular utility harness, cargo pockets, tactical boots.
0011 |    - Sockets for primary rifle back sling, sidearm thigh holster, and active hand grips.
0012 |    - Multi-phase walk, jog, sprint, jump, climb, and vehicle seated blend animations.
0013 | 
0014 | 2. **Vehicle Synthesis (10 Distinct Architectural Classes):**
0015 |    - **Sports Coupe (VX-9 Kestrel):** Aerodynamic low-profile wedge chassis, rear diffuser, glowing taillights, responsive dual exhaust.
0016 |    - **Sedan (Aurelia Regent):** Balanced executive profile, 4 passenger doors, chrome grille.
0017 |    - **Utility Pickup (Redwood 250):** Elevated suspension, open cargo bed, rugged all-terrain wheels.
0018 |    - **Panel Van (Courier L4):** High-top delivery body, rear cargo doors, commercial signage.
0019 |    - **Compact (Mica Hatch):** Urban runabout, tight wheelbase, nimble collision radius.
0020 |    - **Motorbike (Kite 600):** Dual-wheel fork chassis, exposed engine block, dynamic leaning rig.
0021 |    - **Speed Boat (TideRunner 24):** Hydrodynamic deep-V hull, dual outboard motors, wake spray emitter.
0022 |    - **Helicopter (HX-4 Sparrow):** Rotor hub with spinning main blades, tail boom rotor, skids, searchlight beam.
0023 |    - **Light Tank (AR-7 Mastiff):** Dual heavy track assemblies, armored chassis, 360-degree rotating turret, elevated cannon barrel.
0024 |    - **Emergency Cruiser (AMPS Interceptor):** Aerodynamic cruiser chassis with red/blue high-intensity strobe lightbar.
0025 | 
0026 | 3. **Modular District Architecture:**
0027 |    - Meridian Financial Towers: Multi-story glass curtain facades, recessed plazas, illuminated penthouse crests.
0028 |    - Old Quay Waterfront: Stucco and brick facades, arched windows, terracotta tiled roofs.
0029 |    - Ironworks Industrial: Corrugated sheet metal warehouses, structural steel trusses, smoking exhaust stacks.
0030 |    - Suburban & Coastal: Rendered dwellings, palm tree boulevards, beachfront boardwalks.
0031 | 
```

---

## 11. `DEBUGGING.md`

<a id="debugging-md"></a>

**Role:** Developer cheats, keyboard shortcuts, profiler overlays, and QA test execution.

- **File Path:** `DEBUGGING.md`
- **Total Lines:** 30
- **Size:** 1.39 KB

### Line-by-Line Source Code

```markdown
0001 | # SAN AURELIO - DEBUGGING & QA GUIDE
0002 | 
0003 | ---
0004 | 
0005 | ## 1. Developer Shortcuts & Cheat Codes
0006 | 
0007 | | Key / Shortcut | Action | Description |
0008 | |---|---|---|
0009 | | **~** or **F3** | Toggle Debug Profiler | Shows FPS, draw calls, triangles, active sector, physics bodies |
0010 | | **M** | Toggle Full Map | Opens interactive 26-district map with POI routing and waypoints |
0011 | | **Tab** | Weapon Wheel | Quick-select from 6 primary weapon classes |
0012 | | **P** or **Esc** | Pause Menu / Phone | In-game smartphone, settings, missions, restart checkpoint |
0013 | | **E** or **F** | Vehicle Enter / Exit | Enters nearest driver seat or dismounts active vehicle |
0014 | | **V** | Change Camera Mode | Cycles Close, Far, Hood/Cockpit, Free orbit |
0015 | | **R** | Reload Weapon | Triggers tactical reload animation and updates magazine pool |
0016 | | **Space** | Jump / Handbrake | Foot jump or vehicle handbrake drift |
0017 | | **Shift** | Sprint / Nitro Boost | Fast locomotion or vehicle velocity boost |
0018 | | **1 - 6** | Direct Weapon Select | Pistol, SMG, Shotgun, Assault Rifle, Sniper, Launcher |
0019 | 
0020 | ---
0021 | 
0022 | ## 2. Automated Smoke & Unit Tests
0023 | Run the complete automated test suite via npm:
0024 | ```bash
0025 | npm run test         # Executes Vitest suite for core simulation, missions, math, saves
0026 | npm run test:e2e     # End-to-end simulation smoke test (player -> vehicle -> combat -> map -> save)
0027 | npm run lint         # TypeScript strict type checking
0028 | npm run build        # Production bundle compilation
0029 | ```
0030 | 
```

---

## 12. `CHANGELOG.md`

<a id="changelog-md"></a>

**Role:** Release history documenting version releases and feature additions.

- **File Path:** `CHANGELOG.md`
- **Total Lines:** 14
- **Size:** 1.33 KB

### Line-by-Line Source Code

```markdown
0001 | # CHANGELOG - SAN AURELIO
0002 | 
0003 | ## [v0.1.0-alpha] - 2026-09-30
0004 | ### Initial Production Build & Architecture Implementation
0005 | - Implemented full 26-zone canonical world map architecture with interactive map viewer, POI filtering, and GPS ribbon routing.
0006 | - Delivered procedural 3D hero character controller for Kai Mercer (Mira Kade) with 3rd-person camera, multi-speed locomotion, jumping, vaulting, and weapon socket integration.
0007 | - Built 10 comprehensive vehicle systems (Sports Coupe, Sedan, Utility Pickup, Panel Van, Compact, Motorbike, Speedboat, Helicopter with flight physics, and Light Tank with rotating turret).
0008 | - Developed 6-class combat subsystem (Pistol, SMG, Shotgun, Assault Rifle, Marksman Rifle, Heavy Launcher) with hitscan raycasts, weapon recoil, muzzle flash, and hit feedback.
0009 | - Implemented 0-5 Star Wanted level law enforcement escalation with AMPS police cruisers, pursuit AI, search cones, and evasion cooldown.
0010 | - Built data-driven mission engine featuring multi-stage story heists, street sprints, and courier deliveries.
0011 | - Integrated Web Audio API procedural synthesizer for vehicle RPM sound beds, gunshots, tire squeals, sirens, and ambient city audio.
0012 | - Developed versioned save/load system supporting IndexedDB and LocalStorage fallback.
0013 | - Added comprehensive in-game HUD, minimap, smartphone menu, weapon radial wheel, and debug profiler.
0014 | 
```

---

## 13. `src/core/types.ts`

<a id="src-core-types-ts"></a>

**Role:** Domain TypeScript interfaces for Districts, POIs, Vehicles, Weapons, Player, NPCs, and Saves.

- **File Path:** `src/core/types.ts`
- **Total Lines:** 212
- **Size:** 3.91 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | export type DistrictArchetype =
0004 |   | 'downtown'
0005 |   | 'financial'
0006 |   | 'historic'
0007 |   | 'civic'
0008 |   | 'nightlife'
0009 |   | 'waterfront'
0010 |   | 'arena'
0011 |   | 'suburban'
0012 |   | 'upland'
0013 |   | 'affluent'
0014 |   | 'mixed_suburb'
0015 |   | 'forest_edge'
0016 |   | 'arterial_retail'
0017 |   | 'port'
0018 |   | 'heavy_industry'
0019 |   | 'container_district'
0020 |   | 'wetland'
0021 |   | 'mixed_industrial'
0022 |   | 'rural'
0023 |   | 'aviation'
0024 |   | 'transport'
0025 |   | 'dry_fringe'
0026 |   | 'military'
0027 |   | 'offshore_utility'
0028 |   | 'island_resort'
0029 |   | 'recreation';
0030 | 
0031 | export type POICategory =
0032 |   | 'landmark'
0033 |   | 'safehouse'
0034 |   | 'garage'
0035 |   | 'shop'
0036 |   | 'hospital'
0037 |   | 'police'
0038 |   | 'mission'
0039 |   | 'activity'
0040 |   | 'helipad'
0041 |   | 'marina';
0042 | 
0043 | export interface DistrictData {
0044 |   id: string;
0045 |   name: string;
0046 |   archetype: DistrictArchetype;
0047 |   color: string;
0048 |   streetPattern: string;
0049 |   keyLandmark: string;
0050 |   description: string;
0051 |   dangerLevel: number; // 1-5
0052 |   bounds: {
0053 |     minX: number;
0054 |     maxX: number;
0055 |     minZ: number;
0056 |     maxZ: number;
0057 |   };
0058 |   center: [number, number, number];
0059 | }
0060 | 
0061 | export interface MapPOI {
0062 |   id: string;
0063 |   name: string;
0064 |   districtId: string;
0065 |   category: POICategory;
0066 |   worldPosition: [number, number, number];
0067 |   discovered: boolean;
0068 |   fastTravel: boolean;
0069 |   description: string;
0070 |   missionLinks?: string[];
0071 |   openingHours?: [number, number];
0072 | }
0073 | 
0074 | export type VehicleClass =
0075 |   | 'sports_coupe'
0076 |   | 'sedan'
0077 |   | 'pickup'
0078 |   | 'van'
0079 |   | 'compact'
0080 |   | 'motorbike'
0081 |   | 'boat'
0082 |   | 'helicopter'
0083 |   | 'tank'
0084 |   | 'police';
0085 | 
0086 | export interface VehicleDefinition {
0087 |   id: string;
0088 |   name: string;
0089 |   class: VehicleClass;
0090 |   topSpeed: number;
0091 |   acceleration: number;
0092 |   brakeForce: number;
0093 |   steerAngle: number;
0094 |   mass: number;
0095 |   seats: number;
0096 |   dimensions: { width: number; height: number; length: number };
0097 |   color: string;
0098 |   hasTurret?: boolean;
0099 |   isAircraft?: boolean;
0100 |   isBoat?: boolean;
0101 | }
0102 | 
0103 | export type WeaponClass =
0104 |   | 'pistol'
0105 |   | 'smg'
0106 |   | 'shotgun'
0107 |   | 'rifle'
0108 |   | 'sniper'
0109 |   | 'launcher';
0110 | 
0111 | export interface WeaponDefinition {
0112 |   id: string;
0113 |   name: string;
0114 |   class: WeaponClass;
0115 |   damage: number;
0116 |   fireRate: number; // shots per sec
0117 |   range: number;
0118 |   magazineSize: number;
0119 |   maxAmmo: number;
0120 |   reloadTime: number;
0121 |   recoil: number;
0122 |   spread: number;
0123 |   automatic: boolean;
0124 |   color: string;
0125 | }
0126 | 
0127 | export interface InventoryItem {
0128 |   weaponId: string;
0129 |   ammo: number;
0130 |   reserveAmmo: number;
0131 | }
0132 | 
0133 | export type PlayerLocomotionState =
0134 |   | 'idle'
0135 |   | 'walk'
0136 |   | 'jog'
0137 |   | 'sprint'
0138 |   | 'jump'
0139 |   | 'fall'
0140 |   | 'vault'
0141 |   | 'swim'
0142 |   | 'in_vehicle'
0143 |   | 'dead';
0144 | 
0145 | export interface PlayerStats {
0146 |   health: number;
0147 |   maxHealth: number;
0148 |   armor: number;
0149 |   maxArmor: number;
0150 |   cash: number;
0151 |   stamina: number;
0152 | }
0153 | 
0154 | export interface MissionObjective {
0155 |   id: string;
0156 |   description: string;
0157 |   type: 'reach_location' | 'steal_vehicle' | 'eliminate_targets' | 'survive_time' | 'lose_wanted';
0158 |   targetPosition?: [number, number, number];
0159 |   targetVehicleId?: string;
0160 |   targetCount?: number;
0161 |   currentCount?: number;
0162 |   timeRemaining?: number;
0163 |   completed: boolean;
0164 | }
0165 | 
0166 | export interface MissionDefinition {
0167 |   id: string;
0168 |   title: string;
0169 |   districtId: string;
0170 |   description: string;
0171 |   rewardCash: number;
0172 |   stages: MissionObjective[][];
0173 | }
0174 | 
0175 | export type WantedLevel = 0 | 1 | 2 | 3 | 4 | 5;
0176 | 
0177 | export interface TelemetryData {
0178 |   fps: number;
0179 |   frameTime: number;
0180 |   drawCalls: number;
0181 |   triangles: number;
0182 |   activeCells: string[];
0183 |   physicsBodies: number;
0184 |   playerCoords: [number, number, number];
0185 |   currentDistrict: string;
0186 |   wantedLevel: WantedLevel;
0187 | }
0188 | 
0189 | export interface SaveGameSchema {
0190 |   version: number;
0191 |   timestamp: number;
0192 |   player: {
0193 |     position: [number, number, number];
0194 |     rotationY: number;
0195 |     stats: PlayerStats;
0196 |     inventory: InventoryItem[];
0197 |     activeWeaponIndex: number;
0198 |   };
0199 |   world: {
0200 |     discoveredDistricts: string[];
0201 |     discoveredPOIs: string[];
0202 |     timeOfDay: number; // 0-24
0203 |     weather: 'clear' | 'overcast' | 'rain' | 'fog';
0204 |   };
0205 |   missions: {
0206 |     completedMissionIds: string[];
0207 |     currentMissionId: string | null;
0208 |     currentStageIndex: number;
0209 |   };
0210 |   ownedVehicles: string[];
0211 | }
0212 | 
```

---

## 14. `src/core/math.ts`

<a id="src-core-math-ts"></a>

**Role:** Coordinate conversion between 3D world space and 2D map space, vector helpers, and distance formulas.

- **File Path:** `src/core/math.ts`
- **Total Lines:** 63
- **Size:** 1.91 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | // Map coordinate configuration
0004 | // Canonical world bounds: -1600 to +1600 meters in X and Z
0005 | export const WORLD_EXTENTS = {
0006 |   minX: -1600,
0007 |   maxX: 1600,
0008 |   minZ: -1600,
0009 |   maxZ: 1600
0010 | };
0011 | 
0012 | export const WORLD_SIZE_X = WORLD_EXTENTS.maxX - WORLD_EXTENTS.minX;
0013 | export const WORLD_SIZE_Z = WORLD_EXTENTS.maxZ - WORLD_EXTENTS.minZ;
0014 | 
0015 | /**
0016 |  * Converts a 3D world position [x, y, z] to normalized map percentage [0..100]
0017 |  */
0018 | export function worldToMapPercent(x: number, z: number): { xPercent: number; yPercent: number } {
0019 |   const xNorm = (x - WORLD_EXTENTS.minX) / WORLD_SIZE_X;
0020 |   const zNorm = (z - WORLD_EXTENTS.minZ) / WORLD_SIZE_Z;
0021 |   return {
0022 |     xPercent: Math.min(100, Math.max(0, xNorm * 100)),
0023 |     yPercent: Math.min(100, Math.max(0, zNorm * 100))
0024 |   };
0025 | }
0026 | 
0027 | /**
0028 |  * Converts normalized map percentage [0..100] back to 3D world coordinates [x, y, z]
0029 |  */
0030 | export function mapPercentToWorld(xPercent: number, yPercent: number): [number, number, number] {
0031 |   const x = WORLD_EXTENTS.minX + (xPercent / 100) * WORLD_SIZE_X;
0032 |   const z = WORLD_EXTENTS.minZ + (yPercent / 100) * WORLD_SIZE_Z;
0033 |   return [x, 0, z];
0034 | }
0035 | 
0036 | export function clamp(val: number, min: number, max: number): number {
0037 |   return Math.min(max, Math.max(min, val));
0038 | }
0039 | 
0040 | export function lerp(a: number, b: number, t: number): number {
0041 |   return a + (b - a) * t;
0042 | }
0043 | 
0044 | export function lerpAngle(a: number, b: number, t: number): number {
0045 |   let diff = (b - a) % (Math.PI * 2);
0046 |   if (diff < -Math.PI) diff += Math.PI * 2;
0047 |   if (diff > Math.PI) diff -= Math.PI * 2;
0048 |   return a + diff * t;
0049 | }
0050 | 
0051 | export function distance2D(x1: number, z1: number, x2: number, z2: number): number {
0052 |   const dx = x2 - x1;
0053 |   const dz = z2 - z1;
0054 |   return Math.sqrt(dx * dx + dz * dz);
0055 | }
0056 | 
0057 | export function distance3D(a: [number, number, number], b: [number, number, number]): number {
0058 |   const dx = b[0] - a[0];
0059 |   const dy = b[1] - a[1];
0060 |   const dz = b[2] - a[2];
0061 |   return Math.sqrt(dx * dx + dy * dy + dz * dz);
0062 | }
0063 | 
```

---

## 15. `src/core/events.ts`

<a id="src-core-events-ts"></a>

**Role:** Type-safe event bus facilitating decoupled pub/sub communication across all engine systems.

- **File Path:** `src/core/events.ts`
- **Total Lines:** 43
- **Size:** 1.03 KB

### Line-by-Line Source Code

```typescript
0001 | type EventCallback<T = any> = (data: T) => void;
0002 | 
0003 | class EventBus {
0004 |   private listeners: Map<string, Set<EventCallback>> = new Map();
0005 | 
0006 |   on<T = any>(event: string, callback: EventCallback<T>): () => void {
0007 |     if (!this.listeners.has(event)) {
0008 |       this.listeners.set(event, new Set());
0009 |     }
0010 |     this.listeners.get(event)!.add(callback);
0011 |     return () => this.off(event, callback);
0012 |   }
0013 | 
0014 |   off(event: string, callback: EventCallback): void {
0015 |     const callbacks = this.listeners.get(event);
0016 |     if (callbacks) {
0017 |       callbacks.delete(callback);
0018 |       if (callbacks.size === 0) {
0019 |         this.listeners.delete(event);
0020 |       }
0021 |     }
0022 |   }
0023 | 
0024 |   emit<T = any>(event: string, data?: T): void {
0025 |     const callbacks = this.listeners.get(event);
0026 |     if (callbacks) {
0027 |       callbacks.forEach(cb => {
0028 |         try {
0029 |           cb(data);
0030 |         } catch (err) {
0031 |           console.error(`[EventBus] Error in handler for event "${event}":`, err);
0032 |         }
0033 |       });
0034 |     }
0035 |   }
0036 | 
0037 |   clear(): void {
0038 |     this.listeners.clear();
0039 |   }
0040 | }
0041 | 
0042 | export const eventBus = new EventBus();
0043 | 
```

---

## 16. `src/core/clock.ts`

<a id="src-core-clock-ts"></a>

**Role:** Fixed 60Hz physics clock with accelerated 24-hour day/night cycle progression.

- **File Path:** `src/core/clock.ts`
- **Total Lines:** 52
- **Size:** 1.54 KB

### Line-by-Line Source Code

```typescript
0001 | export class GameClock {
0002 |   private lastTime: number = performance.now();
0003 |   private accumulator: number = 0;
0004 |   private readonly fixedDelta: number = 1 / 60; // 60Hz fixed simulation step
0005 |   
0006 |   // Accelerated time of day (0.0 to 24.0 hours)
0007 |   // Default: 12.0 (Noon). 24 in-game hours elapse every 16 minutes of real time.
0008 |   public timeOfDay: number = 14.5; // Afternoon golden hour
0009 |   public timeSpeed: number = 24 / 960; // 24 hours per 960 seconds (16 min)
0010 |   
0011 |   public isPaused: boolean = false;
0012 |   public totalPlayTime: number = 0;
0013 | 
0014 |   public update(): { delta: number; fixedSteps: number } {
0015 |     const now = performance.now();
0016 |     let delta = (now - this.lastTime) / 1000;
0017 |     this.lastTime = now;
0018 | 
0019 |     // Guard against huge delta spikes from tab switching
0020 |     if (delta > 0.1) delta = 0.1;
0021 | 
0022 |     if (this.isPaused) {
0023 |       return { delta: 0, fixedSteps: 0 };
0024 |     }
0025 | 
0026 |     this.totalPlayTime += delta;
0027 |     this.timeOfDay = (this.timeOfDay + delta * this.timeSpeed) % 24;
0028 | 
0029 |     this.accumulator += delta;
0030 |     let fixedSteps = 0;
0031 |     while (this.accumulator >= this.fixedDelta && fixedSteps < 5) {
0032 |       this.accumulator -= this.fixedDelta;
0033 |       fixedSteps++;
0034 |     }
0035 | 
0036 |     return { delta, fixedSteps };
0037 |   }
0038 | 
0039 |   public getFormattedTime(): string {
0040 |     const hours = Math.floor(this.timeOfDay);
0041 |     const minutes = Math.floor((this.timeOfDay - hours) * 60);
0042 |     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
0043 |   }
0044 | 
0045 |   public reset(): void {
0046 |     this.lastTime = performance.now();
0047 |     this.accumulator = 0;
0048 |   }
0049 | }
0050 | 
0051 | export const gameClock = new GameClock();
0052 | 
```

---

## 17. `src/core/input.ts`

<a id="src-core-input-ts"></a>

**Role:** Input manager capturing keyboard, mouse aim, pointer lock, and touch inputs.

- **File Path:** `src/core/input.ts`
- **Total Lines:** 260
- **Size:** 6.53 KB

### Line-by-Line Source Code

```typescript
0001 | export interface InputState {
0002 |   forward: boolean;
0003 |   backward: boolean;
0004 |   left: boolean;
0005 |   right: boolean;
0006 |   sprint: boolean;
0007 |   jump: boolean;
0008 |   crouch: boolean;
0009 |   interact: boolean; // E or F
0010 |   reload: boolean;
0011 |   fire: boolean;
0012 |   aim: boolean;
0013 |   weaponWheel: boolean;
0014 |   toggleMap: boolean;
0015 |   togglePhone: boolean;
0016 |   toggleDebug: boolean;
0017 |   cycleCamera: boolean;
0018 |   weaponSlot: number | null; // 0 to 5
0019 |   mouseX: number;
0020 |   mouseY: number;
0021 |   isPointerLocked: boolean;
0022 | }
0023 | 
0024 | export class InputManager {
0025 |   public state: InputState = {
0026 |     forward: false,
0027 |     backward: false,
0028 |     left: false,
0029 |     right: false,
0030 |     sprint: false,
0031 |     jump: false,
0032 |     crouch: false,
0033 |     interact: false,
0034 |     reload: false,
0035 |     fire: false,
0036 |     aim: false,
0037 |     weaponWheel: false,
0038 |     toggleMap: false,
0039 |     togglePhone: false,
0040 |     toggleDebug: false,
0041 |     cycleCamera: false,
0042 |     weaponSlot: null,
0043 |     mouseX: 0,
0044 |     mouseY: 0,
0045 |     isPointerLocked: false
0046 |   };
0047 | 
0048 |   private targetElement: HTMLElement | null = null;
0049 |   private pointerLockedElement: Element | null = null;
0050 | 
0051 |   constructor() {
0052 |     this.handleKeyDown = this.handleKeyDown.bind(this);
0053 |     this.handleKeyUp = this.handleKeyUp.bind(this);
0054 |     this.handleMouseDown = this.handleMouseDown.bind(this);
0055 |     this.handleMouseUp = this.handleMouseUp.bind(this);
0056 |     this.handleMouseMove = this.handleMouseMove.bind(this);
0057 |     this.handlePointerLockChange = this.handlePointerLockChange.bind(this);
0058 |   }
0059 | 
0060 |   public attach(element: HTMLElement): void {
0061 |     this.targetElement = element;
0062 |     window.addEventListener('keydown', this.handleKeyDown);
0063 |     window.addEventListener('keyup', this.handleKeyUp);
0064 |     window.addEventListener('mousedown', this.handleMouseDown);
0065 |     window.addEventListener('mouseup', this.handleMouseUp);
0066 |     window.addEventListener('mousemove', this.handleMouseMove);
0067 |     document.addEventListener('pointerlockchange', this.handlePointerLockChange);
0068 |   }
0069 | 
0070 |   public detach(): void {
0071 |     window.removeEventListener('keydown', this.handleKeyDown);
0072 |     window.removeEventListener('keyup', this.handleKeyUp);
0073 |     window.removeEventListener('mousedown', this.handleMouseDown);
0074 |     window.removeEventListener('mouseup', this.handleMouseUp);
0075 |     window.removeEventListener('mousemove', this.handleMouseMove);
0076 |     document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
0077 |     this.targetElement = null;
0078 |   }
0079 | 
0080 |   public requestPointerLock(): void {
0081 |     if (this.targetElement && !this.state.isPointerLocked) {
0082 |       try {
0083 |         this.targetElement.requestPointerLock();
0084 |       } catch (e) {
0085 |         // Pointer lock might be blocked by browser policy without user gesture
0086 |       }
0087 |     }
0088 |   }
0089 | 
0090 |   public releasePointerLock(): void {
0091 |     if (document.pointerLockElement) {
0092 |       document.exitPointerLock();
0093 |     }
0094 |   }
0095 | 
0096 |   private handlePointerLockChange(): void {
0097 |     this.state.isPointerLocked = !!document.pointerLockElement;
0098 |   }
0099 | 
0100 |   private handleKeyDown(e: KeyboardEvent): void {
0101 |     // If typing in an input element, do not capture game hotkeys
0102 |     if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
0103 |       return;
0104 |     }
0105 | 
0106 |     switch (e.code) {
0107 |       case 'KeyW':
0108 |       case 'ArrowUp':
0109 |         this.state.forward = true;
0110 |         break;
0111 |       case 'KeyS':
0112 |       case 'ArrowDown':
0113 |         this.state.backward = true;
0114 |         break;
0115 |       case 'KeyA':
0116 |       case 'ArrowLeft':
0117 |         this.state.left = true;
0118 |         break;
0119 |       case 'KeyD':
0120 |       case 'ArrowRight':
0121 |         this.state.right = true;
0122 |         break;
0123 |       case 'ShiftLeft':
0124 |       case 'ShiftRight':
0125 |         this.state.sprint = true;
0126 |         break;
0127 |       case 'Space':
0128 |         this.state.jump = true;
0129 |         e.preventDefault();
0130 |         break;
0131 |       case 'KeyC':
0132 |         this.state.crouch = true;
0133 |         break;
0134 |       case 'KeyE':
0135 |       case 'KeyF':
0136 |         this.state.interact = true;
0137 |         break;
0138 |       case 'KeyR':
0139 |         this.state.reload = true;
0140 |         break;
0141 |       case 'Tab':
0142 |         this.state.weaponWheel = true;
0143 |         e.preventDefault();
0144 |         break;
0145 |       case 'KeyM':
0146 |         this.state.toggleMap = true;
0147 |         break;
0148 |       case 'KeyP':
0149 |       case 'Escape':
0150 |         this.state.togglePhone = true;
0151 |         break;
0152 |       case 'Backquote':
0153 |       case 'F3':
0154 |         this.state.toggleDebug = true;
0155 |         e.preventDefault();
0156 |         break;
0157 |       case 'KeyV':
0158 |         this.state.cycleCamera = true;
0159 |         break;
0160 |       case 'Digit1':
0161 |         this.state.weaponSlot = 0;
0162 |         break;
0163 |       case 'Digit2':
0164 |         this.state.weaponSlot = 1;
0165 |         break;
0166 |       case 'Digit3':
0167 |         this.state.weaponSlot = 2;
0168 |         break;
0169 |       case 'Digit4':
0170 |         this.state.weaponSlot = 3;
0171 |         break;
0172 |       case 'Digit5':
0173 |         this.state.weaponSlot = 4;
0174 |         break;
0175 |       case 'Digit6':
0176 |         this.state.weaponSlot = 5;
0177 |         break;
0178 |     }
0179 |   }
0180 | 
0181 |   private handleKeyUp(e: KeyboardEvent): void {
0182 |     switch (e.code) {
0183 |       case 'KeyW':
0184 |       case 'ArrowUp':
0185 |         this.state.forward = false;
0186 |         break;
0187 |       case 'KeyS':
0188 |       case 'ArrowDown':
0189 |         this.state.backward = false;
0190 |         break;
0191 |       case 'KeyA':
0192 |       case 'ArrowLeft':
0193 |         this.state.left = false;
0194 |         break;
0195 |       case 'KeyD':
0196 |       case 'ArrowRight':
0197 |         this.state.right = false;
0198 |         break;
0199 |       case 'ShiftLeft':
0200 |       case 'ShiftRight':
0201 |         this.state.sprint = false;
0202 |         break;
0203 |       case 'Space':
0204 |         this.state.jump = false;
0205 |         break;
0206 |       case 'KeyC':
0207 |         this.state.crouch = false;
0208 |         break;
0209 |       case 'KeyE':
0210 |       case 'KeyF':
0211 |         this.state.interact = false;
0212 |         break;
0213 |       case 'KeyR':
0214 |         this.state.reload = false;
0215 |         break;
0216 |       case 'Tab':
0217 |         this.state.weaponWheel = false;
0218 |         break;
0219 |     }
0220 |   }
0221 | 
0222 |   private handleMouseDown(e: MouseEvent): void {
0223 |     if (e.button === 0) {
0224 |       this.state.fire = true;
0225 |     } else if (e.button === 2) {
0226 |       this.state.aim = true;
0227 |     }
0228 |   }
0229 | 
0230 |   private handleMouseUp(e: MouseEvent): void {
0231 |     if (e.button === 0) {
0232 |       this.state.fire = false;
0233 |     } else if (e.button === 2) {
0234 |       this.state.aim = false;
0235 |     }
0236 |   }
0237 | 
0238 |   private handleMouseMove(e: MouseEvent): void {
0239 |     if (this.state.isPointerLocked) {
0240 |       this.state.mouseX += e.movementX;
0241 |       this.state.mouseY += e.movementY;
0242 |     }
0243 |   }
0244 | 
0245 |   /**
0246 |    * Resets single-frame impulse events (e.g. mouse deltas and toggle triggers)
0247 |    */
0248 |   public flush(): void {
0249 |     this.state.mouseX = 0;
0250 |     this.state.mouseY = 0;
0251 |     this.state.toggleMap = false;
0252 |     this.state.togglePhone = false;
0253 |     this.state.toggleDebug = false;
0254 |     this.state.cycleCamera = false;
0255 |     this.state.weaponSlot = null;
0256 |   }
0257 | }
0258 | 
0259 | export const inputManager = new InputManager();
0260 | 
```

---

## 18. `src/core/audio.ts`

<a id="src-core-audio-ts"></a>

**Role:** Procedural Web Audio API sound synthesizer for vehicle RPM, gunshots, sirens, and UI clicks.

- **File Path:** `src/core/audio.ts`
- **Total Lines:** 262
- **Size:** 8.47 KB

### Line-by-Line Source Code

```typescript
0001 | class SoundEngine {
0002 |   private ctx: AudioContext | null = null;
0003 |   private isMuted: boolean = false;
0004 |   private masterGain: GainNode | null = null;
0005 |   private engineGain: GainNode | null = null;
0006 |   private engineOsc: OscillatorNode | null = null;
0007 |   private sirenGain: GainNode | null = null;
0008 |   private sirenOsc: OscillatorNode | null = null;
0009 |   private ambientGain: GainNode | null = null;
0010 |   private isEngineRunning: boolean = false;
0011 |   private isSirenActive: boolean = false;
0012 | 
0013 |   public init(): void {
0014 |     if (this.ctx) return;
0015 |     try {
0016 |       if (typeof window === 'undefined') return;
0017 |       const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
0018 |       if (!AudioCtx) return;
0019 |       this.ctx = new AudioCtx();
0020 |       this.masterGain = this.ctx.createGain();
0021 |       this.masterGain.gain.value = 0.65;
0022 |       this.masterGain.connect(this.ctx.destination);
0023 |     } catch (e) {
0024 |       console.warn('[Audio] Web Audio API not supported or blocked:', e);
0025 |     }
0026 |   }
0027 | 
0028 |   private ensureContext(): boolean {
0029 |     if (!this.ctx) {
0030 |       this.init();
0031 |     }
0032 |     if (this.ctx && this.ctx.state === 'suspended') {
0033 |       this.ctx.resume().catch(() => {});
0034 |     }
0035 |     return !!this.ctx;
0036 |   }
0037 | 
0038 |   public setMuted(muted: boolean): void {
0039 |     this.isMuted = muted;
0040 |     if (this.masterGain) {
0041 |       this.masterGain.gain.value = muted ? 0 : 0.65;
0042 |     }
0043 |   }
0044 | 
0045 |   /**
0046 |    * Plays a synthesized weapon gunshot
0047 |    */
0048 |   public playGunshot(weaponClass: string): void {
0049 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0050 | 
0051 |     const t = this.ctx.currentTime;
0052 |     const osc = this.ctx.createOscillator();
0053 |     const gain = this.ctx.createGain();
0054 |     const filter = this.ctx.createBiquadFilter();
0055 | 
0056 |     // Noise buffer for blast punch
0057 |     const bufferSize = this.ctx.sampleRate * 0.15;
0058 |     const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
0059 |     const data = buffer.getChannelData(0);
0060 |     for (let i = 0; i < bufferSize; i++) {
0061 |       data[i] = Math.random() * 2 - 1;
0062 |     }
0063 |     const noise = this.ctx.createBufferSource();
0064 |     noise.buffer = buffer;
0065 | 
0066 |     const noiseFilter = this.ctx.createBiquadFilter();
0067 |     noiseFilter.type = 'lowpass';
0068 |     const noiseGain = this.ctx.createGain();
0069 | 
0070 |     if (weaponClass === 'shotgun' || weaponClass === 'launcher') {
0071 |       osc.type = 'sawtooth';
0072 |       osc.frequency.setValueAtTime(140, t);
0073 |       osc.frequency.exponentialRampToValueAtTime(30, t + 0.25);
0074 |       filter.frequency.setValueAtTime(800, t);
0075 |       gain.gain.setValueAtTime(0.8, t);
0076 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
0077 | 
0078 |       noiseFilter.frequency.setValueAtTime(1200, t);
0079 |       noiseGain.gain.setValueAtTime(0.9, t);
0080 |       noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
0081 |     } else if (weaponClass === 'sniper') {
0082 |       osc.type = 'square';
0083 |       osc.frequency.setValueAtTime(260, t);
0084 |       osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);
0085 |       filter.frequency.setValueAtTime(1800, t);
0086 |       gain.gain.setValueAtTime(0.7, t);
0087 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
0088 | 
0089 |       noiseFilter.frequency.setValueAtTime(2200, t);
0090 |       noiseGain.gain.setValueAtTime(0.7, t);
0091 |       noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
0092 |     } else {
0093 |       // Standard pistol / AR / SMG
0094 |       osc.type = 'triangle';
0095 |       osc.frequency.setValueAtTime(220, t);
0096 |       osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
0097 |       filter.frequency.setValueAtTime(2000, t);
0098 |       gain.gain.setValueAtTime(0.5, t);
0099 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
0100 | 
0101 |       noiseFilter.frequency.setValueAtTime(3000, t);
0102 |       noiseGain.gain.setValueAtTime(0.4, t);
0103 |       noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
0104 |     }
0105 | 
0106 |     osc.connect(filter);
0107 |     filter.connect(gain);
0108 |     gain.connect(this.masterGain);
0109 | 
0110 |     noise.connect(noiseFilter);
0111 |     noiseFilter.connect(noiseGain);
0112 |     noiseGain.connect(this.masterGain);
0113 | 
0114 |     osc.start(t);
0115 |     noise.start(t);
0116 |     osc.stop(t + 0.35);
0117 |     noise.stop(t + 0.25);
0118 |   }
0119 | 
0120 |   /**
0121 |    * Starts continuous vehicle engine audio loop with dynamic RPM pitch
0122 |    */
0123 |   public startVehicleEngine(): void {
0124 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain || this.isEngineRunning) return;
0125 | 
0126 |     this.engineGain = this.ctx.createGain();
0127 |     this.engineGain.gain.value = 0.25;
0128 |     this.engineGain.connect(this.masterGain);
0129 | 
0130 |     this.engineOsc = this.ctx.createOscillator();
0131 |     this.engineOsc.type = 'sawtooth';
0132 |     this.engineOsc.frequency.setValueAtTime(65, this.ctx.currentTime); // Idle 65 Hz
0133 |     this.engineOsc.connect(this.engineGain);
0134 |     this.engineOsc.start();
0135 |     this.isEngineRunning = true;
0136 |   }
0137 | 
0138 |   /**
0139 |    * Updates vehicle RPM audio
0140 |    * @param speedRatio Normalized 0.0 to 1.0 vehicle top speed ratio
0141 |    */
0142 |   public updateVehicleEngine(speedRatio: number): void {
0143 |     if (!this.isEngineRunning || !this.engineOsc || !this.ctx || !this.engineGain) return;
0144 |     const targetFreq = 55 + speedRatio * 180;
0145 |     this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
0146 |     this.engineGain.gain.setTargetAtTime(0.2 + speedRatio * 0.25, this.ctx.currentTime, 0.08);
0147 |   }
0148 | 
0149 |   public stopVehicleEngine(): void {
0150 |     if (!this.isEngineRunning) return;
0151 |     try {
0152 |       this.engineOsc?.stop();
0153 |       this.engineOsc?.disconnect();
0154 |       this.engineGain?.disconnect();
0155 |     } catch (e) {}
0156 |     this.isEngineRunning = false;
0157 |     this.engineOsc = null;
0158 |     this.engineGain = null;
0159 |   }
0160 | 
0161 |   /**
0162 |    * Police siren warble sound
0163 |    */
0164 |   public setPoliceSiren(active: boolean): void {
0165 |     if (active === this.isSirenActive) return;
0166 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0167 | 
0168 |     if (active) {
0169 |       this.sirenGain = this.ctx.createGain();
0170 |       this.sirenGain.gain.value = 0.25;
0171 |       this.sirenGain.connect(this.masterGain);
0172 | 
0173 |       this.sirenOsc = this.ctx.createOscillator();
0174 |       this.sirenOsc.type = 'sine';
0175 |       this.sirenOsc.frequency.setValueAtTime(650, this.ctx.currentTime);
0176 |       this.sirenOsc.connect(this.sirenGain);
0177 |       this.sirenOsc.start();
0178 | 
0179 |       // Modulate frequency between 600 Hz and 950 Hz
0180 |       const lfo = this.ctx.createOscillator();
0181 |       lfo.frequency.value = 1.8; // 1.8 Hz cycle
0182 |       const lfoGain = this.ctx.createGain();
0183 |       lfoGain.gain.value = 250;
0184 |       lfo.connect(lfoGain);
0185 |       lfoGain.connect(this.sirenOsc.frequency);
0186 |       lfo.start();
0187 | 
0188 |       this.isSirenActive = true;
0189 |     } else {
0190 |       try {
0191 |         this.sirenOsc?.stop();
0192 |         this.sirenOsc?.disconnect();
0193 |         this.sirenGain?.disconnect();
0194 |       } catch (e) {}
0195 |       this.isSirenActive = false;
0196 |       this.sirenOsc = null;
0197 |       this.sirenGain = null;
0198 |     }
0199 |   }
0200 | 
0201 |   /**
0202 |    * Tactical reload sound click
0203 |    */
0204 |   public playReload(): void {
0205 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0206 |     const t = this.ctx.currentTime;
0207 |     const osc = this.ctx.createOscillator();
0208 |     const gain = this.ctx.createGain();
0209 |     osc.type = 'sine';
0210 |     osc.frequency.setValueAtTime(450, t);
0211 |     osc.frequency.setValueAtTime(800, t + 0.08);
0212 |     gain.gain.setValueAtTime(0.3, t);
0213 |     gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
0214 |     osc.connect(gain);
0215 |     gain.connect(this.masterGain);
0216 |     osc.start(t);
0217 |     osc.stop(t + 0.16);
0218 |   }
0219 | 
0220 |   /**
0221 |    * UI Click / Stinger feedback
0222 |    */
0223 |   public playUIClick(): void {
0224 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0225 |     const t = this.ctx.currentTime;
0226 |     const osc = this.ctx.createOscillator();
0227 |     const gain = this.ctx.createGain();
0228 |     osc.type = 'sine';
0229 |     osc.frequency.setValueAtTime(880, t);
0230 |     osc.frequency.exponentialRampToValueAtTime(440, t + 0.06);
0231 |     gain.gain.setValueAtTime(0.2, t);
0232 |     gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
0233 |     osc.connect(gain);
0234 |     gain.connect(this.masterGain);
0235 |     osc.start(t);
0236 |     osc.stop(t + 0.06);
0237 |   }
0238 | 
0239 |   /**
0240 |    * Mission Objective Completed Stinger
0241 |    */
0242 |   public playMissionStinger(): void {
0243 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0244 |     const notes = [440, 554.37, 659.25, 880]; // A major chord arpeggio
0245 |     notes.forEach((freq, idx) => {
0246 |       const t = this.ctx!.currentTime + idx * 0.09;
0247 |       const osc = this.ctx!.createOscillator();
0248 |       const gain = this.ctx!.createGain();
0249 |       osc.type = 'triangle';
0250 |       osc.frequency.setValueAtTime(freq, t);
0251 |       gain.gain.setValueAtTime(0.35, t);
0252 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
0253 |       osc.connect(gain);
0254 |       gain.connect(this.masterGain!);
0255 |       osc.start(t);
0256 |       osc.stop(t + 0.36);
0257 |     });
0258 |   }
0259 | }
0260 | 
0261 | export const soundEngine = new SoundEngine();
0262 | 
```

---

## 19. `src/data/districts.ts`

<a id="src-data-districts-ts"></a>

**Role:** Canonical dataset of all 26 districts with geographic bounds, colors, and archetypes.

- **File Path:** `src/data/districts.ts`
- **Total Lines:** 332
- **Size:** 10.47 KB

### Line-by-Line Source Code

```typescript
0001 | import { DistrictData } from '../core/types';
0002 | 
0003 | export const CANONICAL_DISTRICTS: DistrictData[] = [
0004 |   {
0005 |     id: 'D01',
0006 |     name: 'Aurelio Central',
0007 |     archetype: 'downtown',
0008 |     color: '#38bdf8',
0009 |     streetPattern: 'tight grid',
0010 |     keyLandmark: 'Aurelio Tower',
0011 |     description: 'The dense corporate skyscraper core with glowing spires and central plazas.',
0012 |     dangerLevel: 2,
0013 |     bounds: { minX: -200, maxX: 200, minZ: -200, maxZ: 200 },
0014 |     center: [0, 0, 0]
0015 |   },
0016 |   {
0017 |     id: 'D02',
0018 |     name: 'Meridian Core',
0019 |     archetype: 'financial',
0020 |     color: '#0284c7',
0021 |     streetPattern: 'multi-lane grid',
0022 |     keyLandmark: 'Meridian Exchange',
0023 |     description: 'Premier banking houses, luxury high-rises, and elevated skybridges.',
0024 |     dangerLevel: 1,
0025 |     bounds: { minX: 200, maxX: 600, minZ: -200, maxZ: 200 },
0026 |     center: [400, 0, 0]
0027 |   },
0028 |   {
0029 |     id: 'D03',
0030 |     name: 'Old Quay',
0031 |     archetype: 'historic',
0032 |     color: '#f97316',
0033 |     streetPattern: 'cobblestones & narrow alleys',
0034 |     keyLandmark: 'Dock Wharf & Clockhouse',
0035 |     description: 'Centuries-old stone facades, artisanal markets, and vintage maritime charm.',
0036 |     dangerLevel: 2,
0037 |     bounds: { minX: -600, maxX: -200, minZ: -200, maxZ: 200 },
0038 |     center: [-400, 0, 0]
0039 |   },
0040 |   {
0041 |     id: 'D04',
0042 |     name: 'Civic Rise',
0043 |     archetype: 'civic',
0044 |     color: '#e2e8f0',
0045 |     streetPattern: 'ceremonial boulevards',
0046 |     keyLandmark: 'Grand Assembly',
0047 |     description: 'Government ministries, majestic marble stairs, courthouses, and AMPS headquarters.',
0048 |     dangerLevel: 1,
0049 |     bounds: { minX: -200, maxX: 200, minZ: 200, maxZ: 600 },
0050 |     center: [0, 0, 400]
0051 |   },
0052 |   {
0053 |     id: 'D05',
0054 |     name: 'Neon Row',
0055 |     archetype: 'nightlife',
0056 |     color: '#f43f5e',
0057 |     streetPattern: 'dense illuminated frontage',
0058 |     keyLandmark: 'Neon Spire Plaza',
0059 |     description: 'The sleepless district of nightclubs, rooftop lounges, diners, and bright signs.',
0060 |     dangerLevel: 3,
0061 |     bounds: { minX: 200, maxX: 600, minZ: 200, maxZ: 600 },
0062 |     center: [400, 0, 400]
0063 |   },
0064 |   {
0065 |     id: 'D06',
0066 |     name: 'Harborview',
0067 |     archetype: 'waterfront',
0068 |     color: '#06b6d4',
0069 |     streetPattern: 'pedestrian boardwalks',
0070 |     keyLandmark: 'Harbor Arc Marina',
0071 |     description: 'Yacht berths, seaside cafes, open breezes, and luxury coastal living.',
0072 |     dangerLevel: 1,
0073 |     bounds: { minX: 600, maxX: 1000, minZ: 200, maxZ: 600 },
0074 |     center: [800, 0, 400]
0075 |   },
0076 |   {
0077 |     id: 'D07',
0078 |     name: 'Sunspire',
0079 |     archetype: 'arena',
0080 |     color: '#eab308',
0081 |     streetPattern: 'broad arterials & plaza rings',
0082 |     keyLandmark: 'Sunspire Arena',
0083 |     description: 'Massive entertainment arenas, sports stadiums, and sprawling event parking lots.',
0084 |     dangerLevel: 2,
0085 |     bounds: { minX: 600, maxX: 1000, minZ: -200, maxZ: 200 },
0086 |     center: [800, 0, 0]
0087 |   },
0088 |   {
0089 |     id: 'D08',
0090 |     name: 'Eastmoor',
0091 |     archetype: 'suburban',
0092 |     color: '#10b981',
0093 |     streetPattern: 'cul-de-sacs & parkways',
0094 |     keyLandmark: 'Eastmoor Commons',
0095 |     description: 'Peaceful residential neighborhoods, family homes, leafy parks, and local schools.',
0096 |     dangerLevel: 1,
0097 |     bounds: { minX: 1000, maxX: 1400, minZ: -200, maxZ: 200 },
0098 |     center: [1200, 0, 0]
0099 |   },
0100 |   {
0101 |     id: 'D09',
0102 |     name: 'Caldera Hills',
0103 |     archetype: 'upland',
0104 |     color: '#84cc16',
0105 |     streetPattern: 'switchback mountain roads',
0106 |     keyLandmark: 'Caldera Observatory',
0107 |     description: 'Winding scenic climbs, dramatic vistas over the bay, and luxury hill estates.',
0108 |     dangerLevel: 2,
0109 |     bounds: { minX: 600, maxX: 1000, minZ: -600, maxZ: -200 },
0110 |     center: [800, 0, -400]
0111 |   },
0112 |   {
0113 |     id: 'D10',
0114 |     name: 'Crown Heights',
0115 |     archetype: 'affluent',
0116 |     color: '#a855f7',
0117 |     streetPattern: 'gated curved drives',
0118 |     keyLandmark: 'Crown Reservoir',
0119 |     description: 'Exclusive gated mansions with private security patrols and high perimeter walls.',
0120 |     dangerLevel: 2,
0121 |     bounds: { minX: -600, maxX: -200, minZ: -600, maxZ: -200 },
0122 |     center: [-400, 0, -400]
0123 |   },
0124 |   {
0125 |     id: 'D11',
0126 |     name: 'Northpoint',
0127 |     archetype: 'mixed_suburb',
0128 |     color: '#6366f1',
0129 |     streetPattern: 'collector roads & paths',
0130 |     keyLandmark: 'Northpoint College',
0131 |     description: 'Student apartments, transit terminals, cafes, and technological campus hubs.',
0132 |     dangerLevel: 2,
0133 |     bounds: { minX: -200, maxX: 200, minZ: -600, maxZ: -200 },
0134 |     center: [0, 0, -400]
0135 |   },
0136 |   {
0137 |     id: 'D12',
0138 |     name: 'Pine Crest',
0139 |     archetype: 'forest_edge',
0140 |     color: '#15803d',
0141 |     streetPattern: 'unpaved dirt & gravel trails',
0142 |     keyLandmark: 'Pine Crest Trailhead',
0143 |     description: 'Dense pine forestry on the northern ridge, logging camps, and hiking cabins.',
0144 |     dangerLevel: 2,
0145 |     bounds: { minX: 200, maxX: 600, minZ: -600, maxZ: -200 },
0146 |     center: [400, 0, -400]
0147 |   },
0148 |   {
0149 |     id: 'D13',
0150 |     name: 'Westgate',
0151 |     archetype: 'arterial_retail',
0152 |     color: '#ec4899',
0153 |     streetPattern: 'strip corridors & parking lagoons',
0154 |     keyLandmark: 'Westgate Interchange',
0155 |     description: 'Massive mega-malls, big-box department stores, auto repair yards, and highway links.',
0156 |     dangerLevel: 2,
0157 |     bounds: { minX: -1000, maxX: -600, minZ: -200, maxZ: 200 },
0158 |     center: [-800, 0, 0]
0159 |   },
0160 |   {
0161 |     id: 'D14',
0162 |     name: 'Port Meridian',
0163 |     archetype: 'port',
0164 |     color: '#64748b',
0165 |     streetPattern: 'container grid & rail spurs',
0166 |     keyLandmark: 'Port Meridian Crane Line',
0167 |     description: 'Global cargo container terminals with towering gantry cranes and freight trains.',
0168 |     dangerLevel: 3,
0169 |     bounds: { minX: -1000, maxX: -600, minZ: 200, maxZ: 600 },
0170 |     center: [-800, 0, 400]
0171 |   },
0172 |   {
0173 |     id: 'D15',
0174 |     name: 'Ironworks',
0175 |     archetype: 'heavy_industry',
0176 |     color: '#d97706',
0177 |     streetPattern: 'service alleys & rail lines',
0178 |     keyLandmark: 'Ironworks Blast Furnace',
0179 |     description: 'Foundries, scrapyards, smoke stacks, and gritty industrial chop shops.',
0180 |     dangerLevel: 4,
0181 |     bounds: { minX: -600, maxX: -200, minZ: 200, maxZ: 600 },
0182 |     center: [-400, 0, 400]
0183 |   },
0184 |   {
0185 |     id: 'D16',
0186 |     name: 'Docklands',
0187 |     archetype: 'container_district',
0188 |     color: '#475569',
0189 |     streetPattern: 'ship repair slips',
0190 |     keyLandmark: 'Docklands Drydock',
0191 |     description: 'Marine repair yards, cold storage depots, and shadowy syndicate staging points.',
0192 |     dangerLevel: 4,
0193 |     bounds: { minX: -200, maxX: 200, minZ: 600, maxZ: 1000 },
0194 |     center: [0, 0, 800]
0195 |   },
0196 |   {
0197 |     id: 'D17',
0198 |     name: 'Salt Marsh',
0199 |     archetype: 'wetland',
0200 |     color: '#a1a1aa',
0201 |     streetPattern: 'raised levee boardwalks',
0202 |     keyLandmark: 'Salt Marsh Bird Tower',
0203 |     description: 'Estuary flats, stilt shacks, winding waterways, and secluded smuggling routes.',
0204 |     dangerLevel: 3,
0205 |     bounds: { minX: -1400, maxX: -1000, minZ: 200, maxZ: 600 },
0206 |     center: [-1200, 0, 400]
0207 |   },
0208 |   {
0209 |     id: 'D18',
0210 |     name: 'Southbank',
0211 |     archetype: 'mixed_industrial',
0212 |     color: '#b45309',
0213 |     streetPattern: 'river promenade & ramps',
0214 |     keyLandmark: 'Southbank Locks',
0215 |     description: 'Converted river lofts, concrete plants, low-income apartments, and street garages.',
0216 |     dangerLevel: 3,
0217 |     bounds: { minX: -600, maxX: -200, minZ: 600, maxZ: 1000 },
0218 |     center: [-400, 0, 800]
0219 |   },
0220 |   {
0221 |     id: 'D19',
0222 |     name: 'Rancho Sol',
0223 |     archetype: 'rural',
0224 |     color: '#ca8a04',
0225 |     streetPattern: 'unfenced ranch lanes',
0226 |     keyLandmark: 'Sol Horse Ranch',
0227 |     description: 'Sprawling rural paddocks, old barns, wind pumps, and dirt country highways.',
0228 |     dangerLevel: 1,
0229 |     bounds: { minX: -1000, maxX: -600, minZ: 600, maxZ: 1000 },
0230 |     center: [-800, 0, 800]
0231 |   },
0232 |   {
0233 |     id: 'D20',
0234 |     name: 'Airport District',
0235 |     archetype: 'aviation',
0236 |     color: '#3b82f6',
0237 |     streetPattern: 'express ring loop & runways',
0238 |     keyLandmark: 'Aurelio Intl Terminal',
0239 |     description: 'Long asphalt runways, commercial hangars, air traffic control tower, and taxiways.',
0240 |     dangerLevel: 4,
0241 |     bounds: { minX: 200, maxX: 600, minZ: 600, maxZ: 1000 },
0242 |     center: [400, 0, 800]
0243 |   },
0244 |   {
0245 |     id: 'D21',
0246 |     name: 'Freeway Belt',
0247 |     archetype: 'transport',
0248 |     color: '#94a3b8',
0249 |     streetPattern: 'elevated multi-stack flyovers',
0250 |     keyLandmark: 'Freeway 8 Junction',
0251 |     description: 'Multi-lane high-speed expressway wrapping around the central metropolitan bay.',
0252 |     dangerLevel: 2,
0253 |     bounds: { minX: 600, maxX: 1000, minZ: 600, maxZ: 1000 },
0254 |     center: [800, 0, 800]
0255 |   },
0256 |   {
0257 |     id: 'D22',
0258 |     name: 'Desert Edge',
0259 |     archetype: 'dry_fringe',
0260 |     color: '#d97706',
0261 |     streetPattern: 'straight desert tracks',
0262 |     keyLandmark: 'Dryline Quarry',
0263 |     description: 'Sun-scorched arid foothills, open stone quarry pits, and dusty off-road jumps.',
0264 |     dangerLevel: 2,
0265 |     bounds: { minX: 200, maxX: 600, minZ: 1000, maxZ: 1400 },
0266 |     center: [400, 0, 1200]
0267 |   },
0268 |   {
0269 |     id: 'D23',
0270 |     name: 'Blackridge Reserve',
0271 |     archetype: 'military',
0272 |     color: '#1e293b',
0273 |     streetPattern: 'guarded checkpoints & perimeter roads',
0274 |     keyLandmark: 'Blackridge Airbase',
0275 |     description: 'Heavily restricted military territory with missile silos, radar domes, and tank patrols.',
0276 |     dangerLevel: 5,
0277 |     bounds: { minX: 1000, maxX: 1400, minZ: 600, maxZ: 1000 },
0278 |     center: [1200, 0, 800]
0279 |   },
0280 |   {
0281 |     id: 'D24',
0282 |     name: 'Sable Island',
0283 |     archetype: 'offshore_utility',
0284 |     color: '#6b7280',
0285 |     streetPattern: 'island service ring',
0286 |     keyLandmark: 'Sable Grid Station',
0287 |     description: 'Offshore power utility island connected via sub-sea cables and cargo barge ferry.',
0288 |     dangerLevel: 3,
0289 |     bounds: { minX: -400, maxX: 0, minZ: 1000, maxZ: 1400 },
0290 |     center: [-200, 0, 1200]
0291 |   },
0292 |   {
0293 |     id: 'D25',
0294 |     name: 'Pelican Keys',
0295 |     archetype: 'island_resort',
0296 |     color: '#22d3ee',
0297 |     streetPattern: 'curved coastal causeway',
0298 |     keyLandmark: 'Pelican Lighthouse',
0299 |     description: 'Tropical getaway island with luxury beach villas, coral reefs, and speedboat docks.',
0300 |     dangerLevel: 1,
0301 |     bounds: { minX: 1000, maxX: 1400, minZ: 1000, maxZ: 1400 },
0302 |     center: [1200, 0, 1200]
0303 |   },
0304 |   {
0305 |     id: 'D26',
0306 |     name: 'Silver Lake Basin',
0307 |     archetype: 'recreation',
0308 |     color: '#38bdf8',
0309 |     streetPattern: 'lakeside perimeter loop',
0310 |     keyLandmark: 'Silver Lake Marina',
0311 |     description: 'Deep freshwater reservoir with fishing piers, log cabins, and mountain echoes.',
0312 |     dangerLevel: 1,
0313 |     bounds: { minX: -1400, maxX: -1000, minZ: -200, maxZ: 200 },
0314 |     center: [-1200, 0, 0]
0315 |   }
0316 | ];
0317 | 
0318 | export function getDistrictAt(x: number, z: number): DistrictData {
0319 |   for (const district of CANONICAL_DISTRICTS) {
0320 |     if (
0321 |       x >= district.bounds.minX &&
0322 |       x <= district.bounds.maxX &&
0323 |       z >= district.bounds.minZ &&
0324 |       z <= district.bounds.maxZ
0325 |     ) {
0326 |       return district;
0327 |     }
0328 |   }
0329 |   // Default to Aurelio Central if outside explicit bounds
0330 |   return CANONICAL_DISTRICTS[0];
0331 | }
0332 | 
```

---

## 20. `src/data/pois.ts`

<a id="src-data-pois-ts"></a>

**Role:** Dataset of canonical landmarks, safehouses, garages, shops, hospitals, and police stations.

- **File Path:** `src/data/pois.ts`
- **Total Lines:** 231
- **Size:** 6.25 KB

### Line-by-Line Source Code

```typescript
0001 | import { MapPOI } from '../core/types';
0002 | 
0003 | export const CANONICAL_POIS: MapPOI[] = [
0004 |   // Landmarks
0005 |   {
0006 |     id: 'poi-aurelio-tower',
0007 |     name: 'Aurelio Tower',
0008 |     districtId: 'D01',
0009 |     category: 'landmark',
0010 |     worldPosition: [0, 80, 0],
0011 |     discovered: true,
0012 |     fastTravel: false,
0013 |     description: 'The monumental 80-story glass headquarters of Aurelio Holdings.'
0014 |   },
0015 |   {
0016 |     id: 'poi-meridian-exchange',
0017 |     name: 'Meridian Exchange',
0018 |     districtId: 'D02',
0019 |     category: 'landmark',
0020 |     worldPosition: [420, 60, 20],
0021 |     discovered: true,
0022 |     fastTravel: false,
0023 |     description: 'The bustling financial trading epicenter of Vesper.'
0024 |   },
0025 |   {
0026 |     id: 'poi-clockhouse',
0027 |     name: 'Dock Wharf & Clockhouse',
0028 |     districtId: 'D03',
0029 |     category: 'landmark',
0030 |     worldPosition: [-380, 25, 40],
0031 |     discovered: true,
0032 |     fastTravel: false,
0033 |     description: 'Historic 19th-century bronze belltower overlooking Old Quay harbour.'
0034 |   },
0035 |   {
0036 |     id: 'poi-grand-assembly',
0037 |     name: 'Grand Assembly',
0038 |     districtId: 'D04',
0039 |     category: 'landmark',
0040 |     worldPosition: [0, 30, 420],
0041 |     discovered: true,
0042 |     fastTravel: false,
0043 |     description: 'Neoclassical seat of provincial governance with marble peristyle.'
0044 |   },
0045 |   {
0046 |     id: 'poi-neon-spire',
0047 |     name: 'Neon Spire Plaza',
0048 |     districtId: 'D05',
0049 |     category: 'landmark',
0050 |     worldPosition: [390, 40, 380],
0051 |     discovered: true,
0052 |     fastTravel: false,
0053 |     description: 'Vibrant nightlife plaza surrounded by mega electronic billboards.'
0054 |   },
0055 |   {
0056 |     id: 'poi-caldera-observatory',
0057 |     name: 'Caldera Observatory',
0058 |     districtId: 'D09',
0059 |     category: 'landmark',
0060 |     worldPosition: [820, 110, -420],
0061 |     discovered: false,
0062 |     fastTravel: false,
0063 |     description: 'High altitude optical telescope observatory perched on the ridge.'
0064 |   },
0065 |   {
0066 |     id: 'poi-sunspire-arena',
0067 |     name: 'Sunspire Arena',
0068 |     districtId: 'D07',
0069 |     category: 'landmark',
0070 |     worldPosition: [800, 35, 10],
0071 |     discovered: false,
0072 |     fastTravel: false,
0073 |     description: 'Premier 60,000-seat stadium hosting sports and international concerts.'
0074 |   },
0075 |   {
0076 |     id: 'poi-blackridge-base',
0077 |     name: 'Blackridge Airbase',
0078 |     districtId: 'D23',
0079 |     category: 'landmark',
0080 |     worldPosition: [1200, 20, 800],
0081 |     discovered: false,
0082 |     fastTravel: false,
0083 |     description: 'Restricted provincial airbase and armory facility. Trespassers will be fired upon.'
0084 |   },
0085 | 
0086 |   // Safehouses
0087 |   {
0088 |     id: 'poi-safehouse-meridian',
0089 |     name: 'Meridian Heights Penthouse',
0090 |     districtId: 'D02',
0091 |     category: 'safehouse',
0092 |     worldPosition: [360, 40, -50],
0093 |     discovered: true,
0094 |     fastTravel: true,
0095 |     description: 'High-security loft apartment with helipad access and secure garage bay.'
0096 |   },
0097 |   {
0098 |     id: 'poi-safehouse-oldquay',
0099 |     name: 'Old Quay Smuggler Attic',
0100 |     districtId: 'D03',
0101 |     category: 'safehouse',
0102 |     worldPosition: [-440, 15, -80],
0103 |     discovered: false,
0104 |     fastTravel: true,
0105 |     description: 'Concealed waterfront attic loft with escape boat berth.'
0106 |   },
0107 |   {
0108 |     id: 'poi-safehouse-pinecrest',
0109 |     name: 'Pine Crest Forest Cabin',
0110 |     districtId: 'D12',
0111 |     category: 'safehouse',
0112 |     worldPosition: [380, 20, -480],
0113 |     discovered: false,
0114 |     fastTravel: true,
0115 |     description: 'Off-grid fortified cabin nestled within northern evergreen woods.'
0116 |   },
0117 | 
0118 |   // Garages
0119 |   {
0120 |     id: 'poi-garage-central',
0121 |     name: 'Aurelio Central 24H Underground',
0122 |     districtId: 'D01',
0123 |     category: 'garage',
0124 |     worldPosition: [-50, 0, 50],
0125 |     discovered: true,
0126 |     fastTravel: false,
0127 |     description: 'Automated 3-level underground garage with custom mod shop and respray booth.'
0128 |   },
0129 |   {
0130 |     id: 'poi-garage-ironworks',
0131 |     name: 'Ironworks Chop Shop & Tuning',
0132 |     districtId: 'D15',
0133 |     category: 'garage',
0134 |     worldPosition: [-420, 0, 450],
0135 |     discovered: false,
0136 |     fastTravel: false,
0137 |     description: 'Industrial heavy vehicle modification and armor plating workshop.'
0138 |   },
0139 | 
0140 |   // Gun & Gear Shops
0141 |   {
0142 |     id: 'poi-shop-arcline',
0143 |     name: 'Arcline Tactical Supply',
0144 |     districtId: 'D01',
0145 |     category: 'shop',
0146 |     worldPosition: [50, 0, -80],
0147 |     discovered: true,
0148 |     fastTravel: false,
0149 |     description: 'Licensed supplier of firearms, tactical gear, body armor, and ammo.'
0150 |   },
0151 |   {
0152 |     id: 'poi-shop-neon',
0153 |     name: 'Vesper Black Market Depo',
0154 |     districtId: 'D05',
0155 |     category: 'shop',
0156 |     worldPosition: [420, 0, 480],
0157 |     discovered: false,
0158 |     fastTravel: false,
0159 |     description: 'Unmarked basement supplier specializing in military surplus and explosives.'
0160 |   },
0161 | 
0162 |   // Hospitals
0163 |   {
0164 |     id: 'poi-hospital-central',
0165 |     name: 'Saint Aurelia Memorial Hospital',
0166 |     districtId: 'D01',
0167 |     category: 'hospital',
0168 |     worldPosition: [-120, 0, -120],
0169 |     discovered: true,
0170 |     fastTravel: true,
0171 |     description: 'Primary regional trauma hospital with 24/7 emergency response and helipad.'
0172 |   },
0173 | 
0174 |   // Police Stations
0175 |   {
0176 |     id: 'poi-police-hq',
0177 |     name: 'AMPS 1st Precinct HQ',
0178 |     districtId: 'D04',
0179 |     category: 'police',
0180 |     worldPosition: [80, 0, 360],
0181 |     discovered: true,
0182 |     fastTravel: false,
0183 |     description: 'Central police headquarters housing armored interceptors and dispatch towers.'
0184 |   },
0185 | 
0186 |   // Air & Marina
0187 |   {
0188 |     id: 'poi-marina-harbor',
0189 |     name: 'Harborview Marina Berths',
0190 |     districtId: 'D06',
0191 |     category: 'marina',
0192 |     worldPosition: [850, 0, 450],
0193 |     discovered: false,
0194 |     fastTravel: true,
0195 |     description: 'Deepwater boat moorings with fueling docks and speed craft rentals.'
0196 |   },
0197 |   {
0198 |     id: 'poi-helipad-tower',
0199 |     name: 'Aurelio Tower Sky Helipad',
0200 |     districtId: 'D01',
0201 |     category: 'helipad',
0202 |     worldPosition: [0, 85, 0],
0203 |     discovered: true,
0204 |     fastTravel: false,
0205 |     description: 'Rooftop aviation pad accommodating light and utility helicopters.'
0206 |   },
0207 | 
0208 |   // Missions & Activities
0209 |   {
0210 |     id: 'poi-mission-getaway',
0211 |     name: 'Mission: Getaway Blueprint',
0212 |     districtId: 'D01',
0213 |     category: 'mission',
0214 |     worldPosition: [30, 0, 80],
0215 |     discovered: true,
0216 |     fastTravel: false,
0217 |     description: 'Story Mission: Infiltrate Meridian financial terminal and orchestrate the getaway.',
0218 |     missionLinks: ['m_getaway_blueprint']
0219 |   },
0220 |   {
0221 |     id: 'poi-activity-sprint',
0222 |     name: 'Activity: Coastal Ring Sprint',
0223 |     districtId: 'D06',
0224 |     category: 'activity',
0225 |     worldPosition: [750, 0, 380],
0226 |     discovered: true,
0227 |     fastTravel: false,
0228 |     description: 'High-speed street race testing vehicle cornering and acceleration.'
0229 |   }
0230 | ];
0231 | 
```

---

## 21. `src/data/vehicles.ts`

<a id="src-data-vehicles-ts"></a>

**Role:** Specifications for all 10 canonical vehicle classes (speed, mass, acceleration, handling).

- **File Path:** `src/data/vehicles.ts`
- **Total Lines:** 142
- **Size:** 3.20 KB

### Line-by-Line Source Code

```typescript
0001 | import { VehicleDefinition } from '../core/types';
0002 | 
0003 | export const CANONICAL_VEHICLES: VehicleDefinition[] = [
0004 |   {
0005 |     id: 'veh_vx9_kestrel',
0006 |     name: 'VX-9 Kestrel',
0007 |     class: 'sports_coupe',
0008 |     topSpeed: 52, // m/s (~187 km/h)
0009 |     acceleration: 28,
0010 |     brakeForce: 35,
0011 |     steerAngle: 0.65,
0012 |     mass: 1400,
0013 |     seats: 2,
0014 |     dimensions: { width: 1.9, height: 1.25, length: 4.4 },
0015 |     color: '#ef4444' // Crimson red
0016 |   },
0017 |   {
0018 |     id: 'veh_aurelia_regent',
0019 |     name: 'Aurelia Regent',
0020 |     class: 'sedan',
0021 |     topSpeed: 42,
0022 |     acceleration: 20,
0023 |     brakeForce: 28,
0024 |     steerAngle: 0.6,
0025 |     mass: 1750,
0026 |     seats: 4,
0027 |     dimensions: { width: 1.85, height: 1.4, length: 4.8 },
0028 |     color: '#0284c7' // Sapphire blue
0029 |   },
0030 |   {
0031 |     id: 'veh_redwood_250',
0032 |     name: 'Redwood 250',
0033 |     class: 'pickup',
0034 |     topSpeed: 38,
0035 |     acceleration: 18,
0036 |     brakeForce: 26,
0037 |     steerAngle: 0.55,
0038 |     mass: 2400,
0039 |     seats: 4,
0040 |     dimensions: { width: 2.1, height: 1.85, length: 5.4 },
0041 |     color: '#b45309' // Desert amber
0042 |   },
0043 |   {
0044 |     id: 'veh_courier_l4',
0045 |     name: 'Courier L4',
0046 |     class: 'van',
0047 |     topSpeed: 34,
0048 |     acceleration: 15,
0049 |     brakeForce: 24,
0050 |     steerAngle: 0.5,
0051 |     mass: 2800,
0052 |     seats: 2,
0053 |     dimensions: { width: 2.2, height: 2.3, length: 5.6 },
0054 |     color: '#e2e8f0' // Commercial white
0055 |   },
0056 |   {
0057 |     id: 'veh_mica_hatch',
0058 |     name: 'Mica Hatch',
0059 |     class: 'compact',
0060 |     topSpeed: 36,
0061 |     acceleration: 22,
0062 |     brakeForce: 30,
0063 |     steerAngle: 0.72,
0064 |     mass: 1100,
0065 |     seats: 4,
0066 |     dimensions: { width: 1.7, height: 1.45, length: 3.7 },
0067 |     color: '#10b981' // Emerald mint
0068 |   },
0069 |   {
0070 |     id: 'veh_kite_600',
0071 |     name: 'Kite 600',
0072 |     class: 'motorbike',
0073 |     topSpeed: 55,
0074 |     acceleration: 35,
0075 |     brakeForce: 32,
0076 |     steerAngle: 0.75,
0077 |     mass: 220,
0078 |     seats: 2,
0079 |     dimensions: { width: 0.8, height: 1.15, length: 2.2 },
0080 |     color: '#f59e0b' // Neon amber
0081 |   },
0082 |   {
0083 |     id: 'veh_tiderunner_24',
0084 |     name: 'TideRunner 24',
0085 |     class: 'boat',
0086 |     topSpeed: 45,
0087 |     acceleration: 22,
0088 |     brakeForce: 18,
0089 |     steerAngle: 0.6,
0090 |     mass: 1900,
0091 |     seats: 4,
0092 |     dimensions: { width: 2.4, height: 1.5, length: 7.2 },
0093 |     color: '#06b6d4', // Aqua cyan
0094 |     isBoat: true
0095 |   },
0096 |   {
0097 |     id: 'veh_hx4_sparrow',
0098 |     name: 'HX-4 Sparrow',
0099 |     class: 'helicopter',
0100 |     topSpeed: 60,
0101 |     acceleration: 25,
0102 |     brakeForce: 20,
0103 |     steerAngle: 0.5,
0104 |     mass: 2100,
0105 |     seats: 4,
0106 |     dimensions: { width: 2.8, height: 3.2, length: 9.5 },
0107 |     color: '#1e293b', // Stealth graphite
0108 |     isAircraft: true
0109 |   },
0110 |   {
0111 |     id: 'veh_ar7_mastiff',
0112 |     name: 'AR-7 Mastiff',
0113 |     class: 'tank',
0114 |     topSpeed: 22,
0115 |     acceleration: 14,
0116 |     brakeForce: 45,
0117 |     steerAngle: 0.4,
0118 |     mass: 38000,
0119 |     seats: 2,
0120 |     dimensions: { width: 3.4, height: 2.5, length: 7.5 },
0121 |     color: '#334155', // Military armor slate
0122 |     hasTurret: true
0123 |   },
0124 |   {
0125 |     id: 'veh_amps_cruiser',
0126 |     name: 'AMPS Interceptor',
0127 |     class: 'police',
0128 |     topSpeed: 48,
0129 |     acceleration: 26,
0130 |     brakeForce: 32,
0131 |     steerAngle: 0.65,
0132 |     mass: 1850,
0133 |     seats: 4,
0134 |     dimensions: { width: 1.9, height: 1.45, length: 4.9 },
0135 |     color: '#0f172a' // Police obsidian with white door livery
0136 |   }
0137 | ];
0138 | 
0139 | export function getVehicleDef(id: string): VehicleDefinition {
0140 |   return CANONICAL_VEHICLES.find(v => v.id === id) || CANONICAL_VEHICLES[0];
0141 | }
0142 | 
```

---

## 22. `src/data/weapons.ts`

<a id="src-data-weapons-ts"></a>

**Role:** Arsenal dataset defining 6 weapon classes, damage, fire rates, magazine size, and spread.

- **File Path:** `src/data/weapons.ts`
- **Total Lines:** 99
- **Size:** 1.81 KB

### Line-by-Line Source Code

```typescript
0001 | import { WeaponDefinition } from '../core/types';
0002 | 
0003 | export const CANONICAL_WEAPONS: WeaponDefinition[] = [
0004 |   {
0005 |     id: 'wep_p1_vesper',
0006 |     name: 'P1 Vesper',
0007 |     class: 'pistol',
0008 |     damage: 28,
0009 |     fireRate: 4.5,
0010 |     range: 60,
0011 |     magazineSize: 15,
0012 |     maxAmmo: 120,
0013 |     reloadTime: 1.4,
0014 |     recoil: 0.05,
0015 |     spread: 0.015,
0016 |     automatic: false,
0017 |     color: '#94a3b8'
0018 |   },
0019 |   {
0020 |     id: 'wep_vortex_45',
0021 |     name: 'Vortex 45',
0022 |     class: 'smg',
0023 |     damage: 22,
0024 |     fireRate: 12,
0025 |     range: 50,
0026 |     magazineSize: 32,
0027 |     maxAmmo: 250,
0028 |     reloadTime: 1.8,
0029 |     recoil: 0.04,
0030 |     spread: 0.045,
0031 |     automatic: true,
0032 |     color: '#38bdf8'
0033 |   },
0034 |   {
0035 |     id: 'wep_rook_12',
0036 |     name: 'Rook-12',
0037 |     class: 'shotgun',
0038 |     damage: 90,
0039 |     fireRate: 1.6,
0040 |     range: 30,
0041 |     magazineSize: 8,
0042 |     maxAmmo: 64,
0043 |     reloadTime: 2.4,
0044 |     recoil: 0.16,
0045 |     spread: 0.09,
0046 |     automatic: false,
0047 |     color: '#d97706'
0048 |   },
0049 |   {
0050 |     id: 'wep_arcline_ar',
0051 |     name: 'Arcline AR',
0052 |     class: 'rifle',
0053 |     damage: 36,
0054 |     fireRate: 9.5,
0055 |     range: 110,
0056 |     magazineSize: 30,
0057 |     maxAmmo: 240,
0058 |     reloadTime: 2.1,
0059 |     recoil: 0.07,
0060 |     spread: 0.025,
0061 |     automatic: true,
0062 |     color: '#22c55e'
0063 |   },
0064 |   {
0065 |     id: 'wep_crownline_s7',
0066 |     name: 'Crownline S-7',
0067 |     class: 'sniper',
0068 |     damage: 130,
0069 |     fireRate: 1.0,
0070 |     range: 250,
0071 |     magazineSize: 5,
0072 |     maxAmmo: 30,
0073 |     reloadTime: 3.0,
0074 |     recoil: 0.25,
0075 |     spread: 0.002,
0076 |     automatic: false,
0077 |     color: '#a855f7'
0078 |   },
0079 |   {
0080 |     id: 'wep_ramjet_l',
0081 |     name: 'Ramjet L',
0082 |     class: 'launcher',
0083 |     damage: 320,
0084 |     fireRate: 0.6,
0085 |     range: 140,
0086 |     magazineSize: 1,
0087 |     maxAmmo: 6,
0088 |     reloadTime: 3.6,
0089 |     recoil: 0.35,
0090 |     spread: 0.01,
0091 |     automatic: false,
0092 |     color: '#ef4444'
0093 |   }
0094 | ];
0095 | 
0096 | export function getWeaponDef(id: string): WeaponDefinition {
0097 |   return CANONICAL_WEAPONS.find(w => w.id === id) || CANONICAL_WEAPONS[0];
0098 | }
0099 | 
```

---

## 23. `src/data/missions.ts`

<a id="src-data-missions-ts"></a>

**Role:** Data-driven missions including multi-stage story heists, time trials, and courier drops.

- **File Path:** `src/data/missions.ts`
- **Total Lines:** 125
- **Size:** 3.34 KB

### Line-by-Line Source Code

```typescript
0001 | import { MissionDefinition } from '../core/types';
0002 | 
0003 | export const CANONICAL_MISSIONS: MissionDefinition[] = [
0004 |   {
0005 |     id: 'm_getaway_blueprint',
0006 |     title: 'Getaway Blueprint',
0007 |     districtId: 'D01',
0008 |     description: 'Aurelio Syndicate contract: Steal the customized VX-9 Kestrel prototype from Meridian, deliver the asset, and evade AMPS police pursuit.',
0009 |     rewardCash: 12500,
0010 |     stages: [
0011 |       [
0012 |         {
0013 |           id: 'gb_step_1',
0014 |           description: 'Reach the Meridian financial plaza checkpoint.',
0015 |           type: 'reach_location',
0016 |           targetPosition: [400, 0, 50],
0017 |           completed: false
0018 |         }
0019 |       ],
0020 |       [
0021 |         {
0022 |           id: 'gb_step_2',
0023 |           description: 'Acquire and enter the red VX-9 Kestrel sports coupe.',
0024 |           type: 'steal_vehicle',
0025 |           targetVehicleId: 'veh_vx9_kestrel',
0026 |           completed: false
0027 |         }
0028 |       ],
0029 |       [
0030 |         {
0031 |           id: 'gb_step_3',
0032 |           description: 'Deliver the vehicle to the Meridian Heights Safehouse.',
0033 |           type: 'reach_location',
0034 |           targetPosition: [360, 0, -50],
0035 |           completed: false
0036 |         }
0037 |       ],
0038 |       [
0039 |         {
0040 |           id: 'gb_step_4',
0041 |           description: 'Evade the AMPS police pursuit and lose all heat stars.',
0042 |           type: 'lose_wanted',
0043 |           completed: false
0044 |         }
0045 |       ]
0046 |     ]
0047 |   },
0048 |   {
0049 |     id: 'm_harbor_switch',
0050 |     title: 'Harbor Switch',
0051 |     districtId: 'D16',
0052 |     description: 'Syndicate maritime heist: Infiltrate Docklands Drydock, commandeer the TideRunner 24, and escape to Old Quay harbour.',
0053 |     rewardCash: 18000,
0054 |     stages: [
0055 |       [
0056 |         {
0057 |           id: 'hs_step_1',
0058 |           description: 'Infiltrate the Docklands shipping depot staging area.',
0059 |           type: 'reach_location',
0060 |           targetPosition: [0, 0, 750],
0061 |           completed: false
0062 |         }
0063 |       ],
0064 |       [
0065 |         {
0066 |           id: 'hs_step_2',
0067 |           description: 'Commandeer the TideRunner 24 speedboat.',
0068 |           type: 'steal_vehicle',
0069 |           targetVehicleId: 'veh_tiderunner_24',
0070 |           completed: false
0071 |         }
0072 |       ],
0073 |       [
0074 |         {
0075 |           id: 'hs_step_3',
0076 |           description: 'Navigate to the hidden Old Quay maritime cove.',
0077 |           type: 'reach_location',
0078 |           targetPosition: [-440, 0, -80],
0079 |           completed: false
0080 |         }
0081 |       ]
0082 |     ]
0083 |   },
0084 |   {
0085 |     id: 'act_coastal_sprint',
0086 |     title: 'Coastal Ring Sprint',
0087 |     districtId: 'D06',
0088 |     description: 'Time-trial street race through Harborview coastal boulevard to Sunspire Arena.',
0089 |     rewardCash: 5000,
0090 |     stages: [
0091 |       [
0092 |         {
0093 |           id: 'crs_step_1',
0094 |           description: 'Drive through Checkpoint 1 at Harborview Boardwalk.',
0095 |           type: 'reach_location',
0096 |           targetPosition: [780, 0, 360],
0097 |           completed: false
0098 |         }
0099 |       ],
0100 |       [
0101 |         {
0102 |           id: 'crs_step_2',
0103 |           description: 'Speed through Checkpoint 2 at Sunspire Outer Ring.',
0104 |           type: 'reach_location',
0105 |           targetPosition: [820, 0, 80],
0106 |           completed: false
0107 |         }
0108 |       ],
0109 |       [
0110 |         {
0111 |           id: 'crs_step_3',
0112 |           description: 'Cross the finish line at Sunspire Arena gates.',
0113 |           type: 'reach_location',
0114 |           targetPosition: [800, 0, 0],
0115 |           completed: false
0116 |         }
0117 |       ]
0118 |     ]
0119 |   }
0120 | ];
0121 | 
0122 | export function getMissionDef(id: string): MissionDefinition | undefined {
0123 |   return CANONICAL_MISSIONS.find(m => m.id === id);
0124 | }
0125 | 
```

---

## 24. `src/save/saveManager.ts`

<a id="src-save-savemanager-ts"></a>

**Role:** Versioned save/load system supporting schema migration and localStorage persistence.

- **File Path:** `src/save/saveManager.ts`
- **Total Lines:** 107
- **Size:** 2.88 KB

### Line-by-Line Source Code

```typescript
0001 | import { SaveGameSchema } from '../core/types';
0002 | 
0003 | const SAVE_KEY = 'san_aurelio_save_v1';
0004 | const CURRENT_VERSION = 1;
0005 | 
0006 | export class SaveManager {
0007 |   public static getInitialState(): SaveGameSchema {
0008 |     return {
0009 |       version: CURRENT_VERSION,
0010 |       timestamp: Date.now(),
0011 |       player: {
0012 |         position: [0, 0.5, 0], // Start in Aurelio Central / Meridian plaza
0013 |         rotationY: 0,
0014 |         stats: {
0015 |           health: 100,
0016 |           maxHealth: 100,
0017 |           armor: 100,
0018 |           maxArmor: 100,
0019 |           cash: 2500,
0020 |           stamina: 100
0021 |         },
0022 |         inventory: [
0023 |           { weaponId: 'wep_p1_vesper', ammo: 15, reserveAmmo: 90 },
0024 |           { weaponId: 'wep_vortex_45', ammo: 32, reserveAmmo: 160 },
0025 |           { weaponId: 'wep_arcline_ar', ammo: 30, reserveAmmo: 120 }
0026 |         ],
0027 |         activeWeaponIndex: 0
0028 |       },
0029 |       world: {
0030 |         discoveredDistricts: ['D01', 'D02', 'D03', 'D04', 'D05'],
0031 |         discoveredPOIs: ['poi-aurelio-tower', 'poi-meridian-exchange', 'poi-safehouse-meridian'],
0032 |         timeOfDay: 14.5,
0033 |         weather: 'clear'
0034 |       },
0035 |       missions: {
0036 |         completedMissionIds: [],
0037 |         currentMissionId: 'm_getaway_blueprint',
0038 |         currentStageIndex: 0
0039 |       },
0040 |       ownedVehicles: ['veh_vx9_kestrel']
0041 |     };
0042 |   }
0043 | 
0044 |   public static save(data: SaveGameSchema): boolean {
0045 |     try {
0046 |       data.timestamp = Date.now();
0047 |       const serialized = JSON.stringify(data);
0048 |       localStorage.setItem(SAVE_KEY, serialized);
0049 |       return true;
0050 |     } catch (e) {
0051 |       console.warn('[SaveManager] Failed to persist game save to localStorage:', e);
0052 |       return false;
0053 |     }
0054 |   }
0055 | 
0056 |   public static load(): SaveGameSchema {
0057 |     try {
0058 |       const item = localStorage.getItem(SAVE_KEY);
0059 |       if (item) {
0060 |         const parsed = JSON.parse(item);
0061 |         return this.migrate(parsed);
0062 |       }
0063 |     } catch (e) {
0064 |       console.warn('[SaveManager] Corrupt save file detected, falling back to default:', e);
0065 |     }
0066 |     return this.getInitialState();
0067 |   }
0068 | 
0069 |   public static clear(): void {
0070 |     try {
0071 |       localStorage.removeItem(SAVE_KEY);
0072 |     } catch (e) {}
0073 |   }
0074 | 
0075 |   private static migrate(savedData: any): SaveGameSchema {
0076 |     if (!savedData || typeof savedData !== 'object') {
0077 |       return this.getInitialState();
0078 |     }
0079 |     // Migration logic for future save schemas
0080 |     if (!savedData.version || savedData.version < CURRENT_VERSION) {
0081 |       savedData.version = CURRENT_VERSION;
0082 |     }
0083 |     // Ensure all required fields exist
0084 |     const defaultState = this.getInitialState();
0085 |     return {
0086 |       ...defaultState,
0087 |       ...savedData,
0088 |       player: {
0089 |         ...defaultState.player,
0090 |         ...(savedData.player || {}),
0091 |         stats: {
0092 |           ...defaultState.player.stats,
0093 |           ...(savedData.player?.stats || {})
0094 |         }
0095 |       },
0096 |       world: {
0097 |         ...defaultState.world,
0098 |         ...(savedData.world || {})
0099 |       },
0100 |       missions: {
0101 |         ...defaultState.missions,
0102 |         ...(savedData.missions || {})
0103 |       }
0104 |     };
0105 |   }
0106 | }
0107 | 
```

---

## 25. `src/rendering/materials.ts`

<a id="src-rendering-materials-ts"></a>

**Role:** Cached shared materials library for roads, concrete, glass, neon, and vehicle paint.

- **File Path:** `src/rendering/materials.ts`
- **Total Lines:** 128
- **Size:** 2.68 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | /**
0004 |  * Shared material cache to prevent redundant WebGL program compilations
0005 |  * and optimize draw-call batching across districts and assets.
0006 |  */
0007 | class MaterialLibrary {
0008 |   public roadMaterial = new THREE.MeshStandardMaterial({
0009 |     color: 0x1f242e,
0010 |     roughness: 0.85,
0011 |     metalness: 0.1
0012 |   });
0013 | 
0014 |   public roadMarkingWhite = new THREE.MeshStandardMaterial({
0015 |     color: 0xf8fafc,
0016 |     roughness: 0.6,
0017 |     metalness: 0.05
0018 |   });
0019 | 
0020 |   public roadMarkingYellow = new THREE.MeshStandardMaterial({
0021 |     color: 0xf59e0b,
0022 |     roughness: 0.6,
0023 |     metalness: 0.05
0024 |   });
0025 | 
0026 |   public sidewalkMaterial = new THREE.MeshStandardMaterial({
0027 |     color: 0x64748b,
0028 |     roughness: 0.9,
0029 |     metalness: 0.05
0030 |   });
0031 | 
0032 |   public grassMaterial = new THREE.MeshStandardMaterial({
0033 |     color: 0x2d5a27,
0034 |     roughness: 0.95,
0035 |     metalness: 0.0
0036 |   });
0037 | 
0038 |   public sandMaterial = new THREE.MeshStandardMaterial({
0039 |     color: 0xd4a373,
0040 |     roughness: 0.9,
0041 |     metalness: 0.0
0042 |   });
0043 | 
0044 |   public waterMaterial = new THREE.MeshStandardMaterial({
0045 |     color: 0x0284c7,
0046 |     roughness: 0.1,
0047 |     metalness: 0.8,
0048 |     transparent: true,
0049 |     opacity: 0.85
0050 |   });
0051 | 
0052 |   public towerGlassMaterial = new THREE.MeshStandardMaterial({
0053 |     color: 0x0369a1,
0054 |     roughness: 0.15,
0055 |     metalness: 0.9,
0056 |     transparent: true,
0057 |     opacity: 0.92
0058 |   });
0059 | 
0060 |   public towerConcreteMaterial = new THREE.MeshStandardMaterial({
0061 |     color: 0x94a3b8,
0062 |     roughness: 0.7,
0063 |     metalness: 0.2
0064 |   });
0065 | 
0066 |   public industrialRustMaterial = new THREE.MeshStandardMaterial({
0067 |     color: 0x9a3412,
0068 |     roughness: 0.9,
0069 |     metalness: 0.3
0070 |   });
0071 | 
0072 |   public brickHistoricMaterial = new THREE.MeshStandardMaterial({
0073 |     color: 0xc2410c,
0074 |     roughness: 0.85,
0075 |     metalness: 0.05
0076 |   });
0077 | 
0078 |   public neonPink = new THREE.MeshBasicMaterial({
0079 |     color: 0xf43f5e
0080 |   });
0081 | 
0082 |   public neonCyan = new THREE.MeshBasicMaterial({
0083 |     color: 0x06b6d4
0084 |   });
0085 | 
0086 |   public neonAmber = new THREE.MeshBasicMaterial({
0087 |     color: 0xf59e0b
0088 |   });
0089 | 
0090 |   public vehicleTire = new THREE.MeshStandardMaterial({
0091 |     color: 0x09090b,
0092 |     roughness: 0.95,
0093 |     metalness: 0.05
0094 |   });
0095 | 
0096 |   public vehicleGlass = new THREE.MeshStandardMaterial({
0097 |     color: 0x0f172a,
0098 |     roughness: 0.05,
0099 |     metalness: 0.95,
0100 |     transparent: true,
0101 |     opacity: 0.75
0102 |   });
0103 | 
0104 |   public vehicleChrome = new THREE.MeshStandardMaterial({
0105 |     color: 0xe2e8f0,
0106 |     roughness: 0.1,
0107 |     metalness: 0.98
0108 |   });
0109 | 
0110 |   public vehicleHeadlight = new THREE.MeshBasicMaterial({
0111 |     color: 0xffffff
0112 |   });
0113 | 
0114 |   public vehicleTaillight = new THREE.MeshBasicMaterial({
0115 |     color: 0xef4444
0116 |   });
0117 | 
0118 |   public vehicleSirenRed = new THREE.MeshBasicMaterial({
0119 |     color: 0xff0033
0120 |   });
0121 | 
0122 |   public vehicleSirenBlue = new THREE.MeshBasicMaterial({
0123 |     color: 0x0066ff
0124 |   });
0125 | }
0126 | 
0127 | export const materialLib = new MaterialLibrary();
0128 | 
```

---

## 26. `src/rendering/particles.ts`

<a id="src-rendering-particles-ts"></a>

**Role:** Object-pooled GPU particle engine for explosions, muzzle flashes, and tire burnout smoke.

- **File Path:** `src/rendering/particles.ts`
- **Total Lines:** 136
- **Size:** 3.86 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | interface Particle {
0004 |   position: THREE.Vector3;
0005 |   velocity: THREE.Vector3;
0006 |   life: number;
0007 |   maxLife: number;
0008 |   size: number;
0009 |   color: THREE.Color;
0010 | }
0011 | 
0012 | export class ParticleSystem {
0013 |   private particles: Particle[] = [];
0014 |   private geometry: THREE.BufferGeometry;
0015 |   private material: THREE.PointsMaterial;
0016 |   private points: THREE.Points;
0017 |   private maxParticles = 1200;
0018 |   private positions: Float32Array;
0019 |   private colors: Float32Array;
0020 | 
0021 |   constructor(scene: THREE.Scene) {
0022 |     this.positions = new Float32Array(this.maxParticles * 3);
0023 |     this.colors = new Float32Array(this.maxParticles * 3);
0024 | 
0025 |     this.geometry = new THREE.BufferGeometry();
0026 |     this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
0027 |     this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
0028 | 
0029 |     this.material = new THREE.PointsMaterial({
0030 |       size: 0.35,
0031 |       vertexColors: true,
0032 |       transparent: true,
0033 |       opacity: 0.85,
0034 |       blending: THREE.AdditiveBlending,
0035 |       depthWrite: false
0036 |     });
0037 | 
0038 |     this.points = new THREE.Points(this.geometry, this.material);
0039 |     this.points.frustumCulled = false;
0040 |     scene.add(this.points);
0041 |   }
0042 | 
0043 |   public emit(
0044 |     pos: THREE.Vector3,
0045 |     velocity: THREE.Vector3,
0046 |     color: THREE.Color,
0047 |     maxLife: number = 0.5,
0048 |     size: number = 0.35
0049 |   ): void {
0050 |     if (this.particles.length >= this.maxParticles) return;
0051 |     this.particles.push({
0052 |       position: pos.clone(),
0053 |       velocity: velocity.clone(),
0054 |       life: maxLife,
0055 |       maxLife,
0056 |       size,
0057 |       color: color.clone()
0058 |     });
0059 |   }
0060 | 
0061 |   public emitExplosion(pos: THREE.Vector3): void {
0062 |     const fireColor = new THREE.Color(0xff5500);
0063 |     const smokeColor = new THREE.Color(0x888888);
0064 |     for (let i = 0; i < 45; i++) {
0065 |       const vel = new THREE.Vector3(
0066 |         (Math.random() - 0.5) * 16,
0067 |         Math.random() * 12 + 2,
0068 |         (Math.random() - 0.5) * 16
0069 |       );
0070 |       this.emit(pos, vel, Math.random() > 0.4 ? fireColor : smokeColor, 0.8 + Math.random() * 0.5, 0.6);
0071 |     }
0072 |   }
0073 | 
0074 |   public emitMuzzleFlash(pos: THREE.Vector3, dir: THREE.Vector3): void {
0075 |     const flashColor = new THREE.Color(0xffea00);
0076 |     for (let i = 0; i < 8; i++) {
0077 |       const vel = dir.clone().multiplyScalar(15).add(
0078 |         new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3)
0079 |       );
0080 |       this.emit(pos, vel, flashColor, 0.08, 0.4);
0081 |     }
0082 |   }
0083 | 
0084 |   public emitTireSmoke(pos: THREE.Vector3): void {
0085 |     const smokeColor = new THREE.Color(0xcccccc);
0086 |     for (let i = 0; i < 3; i++) {
0087 |       const vel = new THREE.Vector3(
0088 |         (Math.random() - 0.5) * 1.5,
0089 |         Math.random() * 2 + 0.5,
0090 |         (Math.random() - 0.5) * 1.5
0091 |       );
0092 |       this.emit(pos, vel, smokeColor, 0.6, 0.45);
0093 |     }
0094 |   }
0095 | 
0096 |   public update(dt: number): void {
0097 |     let aliveCount = 0;
0098 |     const posAttr = this.geometry.attributes.position as THREE.BufferAttribute;
0099 |     const colAttr = this.geometry.attributes.color as THREE.BufferAttribute;
0100 | 
0101 |     for (let i = this.particles.length - 1; i >= 0; i--) {
0102 |       const p = this.particles[i];
0103 |       p.life -= dt;
0104 |       if (p.life <= 0) {
0105 |         this.particles.splice(i, 1);
0106 |         continue;
0107 |       }
0108 | 
0109 |       p.position.addScaledVector(p.velocity, dt);
0110 |       p.velocity.y -= 9.8 * dt * 0.3; // Gentle gravity
0111 | 
0112 |       const idx = aliveCount * 3;
0113 |       this.positions[idx] = p.position.x;
0114 |       this.positions[idx + 1] = p.position.y;
0115 |       this.positions[idx + 2] = p.position.z;
0116 | 
0117 |       const alpha = p.life / p.maxLife;
0118 |       this.colors[idx] = p.color.r * alpha;
0119 |       this.colors[idx + 1] = p.color.g * alpha;
0120 |       this.colors[idx + 2] = p.color.b * alpha;
0121 | 
0122 |       aliveCount++;
0123 |     }
0124 | 
0125 |     // Zero out unused tail
0126 |     for (let i = aliveCount * 3; i < this.maxParticles * 3; i++) {
0127 |       this.positions[i] = 0;
0128 |       this.colors[i] = 0;
0129 |     }
0130 | 
0131 |     posAttr.needsUpdate = true;
0132 |     colAttr.needsUpdate = true;
0133 |     this.geometry.setDrawRange(0, aliveCount);
0134 |   }
0135 | }
0136 | 
```

---

## 27. `src/rendering/sky.ts`

<a id="src-rendering-sky-ts"></a>

**Role:** Atmospheric day/night celestial lighting, sun orbit, dynamic fog, and rain particles.

- **File Path:** `src/rendering/sky.ts`
- **Total Lines:** 146
- **Size:** 5.01 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | export class AtmosphereSystem {
0004 |   private dirLight: THREE.DirectionalLight;
0005 |   private hemiLight: THREE.HemisphereLight;
0006 |   private scene: THREE.Scene;
0007 |   private rainPoints: THREE.Points | null = null;
0008 |   private rainGeometry: THREE.BufferGeometry | null = null;
0009 |   private isRaining: boolean = false;
0010 | 
0011 |   constructor(scene: THREE.Scene) {
0012 |     this.scene = scene;
0013 | 
0014 |     // Directional Sun / Moon light
0015 |     this.dirLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
0016 |     this.dirLight.castShadow = true;
0017 |     this.dirLight.shadow.mapSize.width = 2048;
0018 |     this.dirLight.shadow.mapSize.height = 2048;
0019 |     this.dirLight.shadow.camera.near = 0.5;
0020 |     this.dirLight.shadow.camera.far = 500;
0021 |     const shadowDist = 80;
0022 |     this.dirLight.shadow.camera.left = -shadowDist;
0023 |     this.dirLight.shadow.camera.right = shadowDist;
0024 |     this.dirLight.shadow.camera.top = shadowDist;
0025 |     this.dirLight.shadow.camera.bottom = -shadowDist;
0026 |     this.dirLight.shadow.bias = -0.0005;
0027 |     scene.add(this.dirLight);
0028 | 
0029 |     // Hemisphere Ambient sky & ground bounce
0030 |     this.hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0x384152, 0.65);
0031 |     scene.add(this.hemiLight);
0032 | 
0033 |     // Background fog
0034 |     scene.fog = new THREE.FogExp2(0xa0c4df, 0.0018);
0035 |   }
0036 | 
0037 |   public update(timeOfDay: number, playerPos: THREE.Vector3, weather: string): void {
0038 |     // timeOfDay: 0.0 - 24.0 hours
0039 |     // Calculate sun angle: noon (12:00) is zenith (angle = PI/2)
0040 |     const sunAngle = ((timeOfDay - 6) / 24) * Math.PI * 2;
0041 |     const sunHeight = Math.sin(sunAngle);
0042 |     const sunCos = Math.cos(sunAngle);
0043 | 
0044 |     // Light position tracks player to maintain crisp shadows
0045 |     const lightDist = 180;
0046 |     this.dirLight.position.set(
0047 |       playerPos.x + sunCos * lightDist,
0048 |       Math.max(10, playerPos.y + sunHeight * lightDist),
0049 |       playerPos.z + 40
0050 |     );
0051 |     this.dirLight.target.position.copy(playerPos);
0052 |     this.dirLight.target.updateMatrixWorld();
0053 | 
0054 |     // Atmosphere color modulation
0055 |     if (sunHeight > 0.15) {
0056 |       // Daytime
0057 |       const t = Math.min(1, (sunHeight - 0.15) / 0.5);
0058 |       this.dirLight.color.setRGB(1.0, 0.95 + t * 0.05, 0.85 + t * 0.15);
0059 |       this.dirLight.intensity = 1.2 + t * 0.3;
0060 |       this.hemiLight.color.setHex(0xb1e1ff);
0061 |       this.hemiLight.groundColor.setHex(0x384152);
0062 |       this.hemiLight.intensity = 0.65;
0063 |       if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
0064 |         this.scene.fog.color.setHex(0xa0c4df);
0065 |       }
0066 |       this.scene.background = new THREE.Color(0x7bb6e0);
0067 |     } else if (sunHeight > -0.1) {
0068 |       // Golden Hour / Sunset / Dawn
0069 |       this.dirLight.color.setHex(0xff7733);
0070 |       this.dirLight.intensity = 0.9;
0071 |       this.hemiLight.color.setHex(0xf97316);
0072 |       this.hemiLight.groundColor.setHex(0x1e1b4b);
0073 |       this.hemiLight.intensity = 0.45;
0074 |       if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
0075 |         this.scene.fog.color.setHex(0xd97706);
0076 |       }
0077 |       this.scene.background = new THREE.Color(0xb45309);
0078 |     } else {
0079 |       // Night
0080 |       this.dirLight.color.setHex(0x60a5fa);
0081 |       this.dirLight.intensity = 0.25;
0082 |       this.hemiLight.color.setHex(0x1e293b);
0083 |       this.hemiLight.groundColor.setHex(0x020617);
0084 |       this.hemiLight.intensity = 0.35;
0085 |       if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
0086 |         this.scene.fog.color.setHex(0x0a0f1d);
0087 |       }
0088 |       this.scene.background = new THREE.Color(0x090d16);
0089 |     }
0090 | 
0091 |     // Weather handling
0092 |     this.updateWeather(weather, playerPos);
0093 |   }
0094 | 
0095 |   private updateWeather(weather: string, playerPos: THREE.Vector3): void {
0096 |     if (weather === 'rain') {
0097 |       if (!this.isRaining) {
0098 |         this.initRain();
0099 |       }
0100 |       if (this.rainPoints && this.rainGeometry) {
0101 |         this.rainPoints.position.set(playerPos.x, 0, playerPos.z);
0102 |         const posAttr = this.rainGeometry.attributes.position as THREE.BufferAttribute;
0103 |         const array = posAttr.array as Float32Array;
0104 |         for (let i = 1; i < array.length; i += 3) {
0105 |           array[i] -= 1.8; // Fall velocity
0106 |           if (array[i] < 0) array[i] = 40;
0107 |         }
0108 |         posAttr.needsUpdate = true;
0109 |       }
0110 |     } else if (this.isRaining) {
0111 |       this.removeRain();
0112 |     }
0113 |   }
0114 | 
0115 |   private initRain(): void {
0116 |     const rainCount = 1800;
0117 |     const positions = new Float32Array(rainCount * 3);
0118 |     for (let i = 0; i < rainCount; i++) {
0119 |       positions[i * 3] = (Math.random() - 0.5) * 80;
0120 |       positions[i * 3 + 1] = Math.random() * 40;
0121 |       positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
0122 |     }
0123 |     this.rainGeometry = new THREE.BufferGeometry();
0124 |     this.rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
0125 |     const mat = new THREE.PointsMaterial({
0126 |       color: 0x93c5fd,
0127 |       size: 0.15,
0128 |       transparent: true,
0129 |       opacity: 0.6
0130 |     });
0131 |     this.rainPoints = new THREE.Points(this.rainGeometry, mat);
0132 |     this.scene.add(this.rainPoints);
0133 |     this.isRaining = true;
0134 |   }
0135 | 
0136 |   private removeRain(): void {
0137 |     if (this.rainPoints) {
0138 |       this.scene.remove(this.rainPoints);
0139 |       this.rainGeometry?.dispose();
0140 |       this.rainPoints = null;
0141 |       this.rainGeometry = null;
0142 |     }
0143 |     this.isRaining = false;
0144 |   }
0145 | }
0146 | 
```

---

## 28. `src/rendering/sceneManager.ts`

<a id="src-rendering-scenemanager-ts"></a>

**Role:** Three.js master scene setup, perspective camera, ACES Filmic tone mapping, and shadows.

- **File Path:** `src/rendering/sceneManager.ts`
- **Total Lines:** 62
- **Size:** 1.99 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { AtmosphereSystem } from './sky';
0003 | import { ParticleSystem } from './particles';
0004 | 
0005 | export class SceneManager {
0006 |   public scene: THREE.Scene;
0007 |   public camera: THREE.PerspectiveCamera;
0008 |   public renderer: THREE.WebGLRenderer;
0009 |   public atmosphere: AtmosphereSystem;
0010 |   public particles: ParticleSystem;
0011 | 
0012 |   constructor(container: HTMLElement) {
0013 |     this.scene = new THREE.Scene();
0014 |     this.scene.background = new THREE.Color(0x7bb6e0);
0015 | 
0016 |     const width = container.clientWidth || window.innerWidth;
0017 |     const height = container.clientHeight || window.innerHeight;
0018 | 
0019 |     this.camera = new THREE.PerspectiveCamera(65, width / height, 0.2, 2000);
0020 |     this.camera.position.set(0, 10, 20);
0021 | 
0022 |     this.renderer = new THREE.WebGLRenderer({
0023 |       powerPreference: 'high-performance',
0024 |       antialias: true,
0025 |       alpha: false
0026 |     });
0027 |     this.renderer.setSize(width, height);
0028 |     this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
0029 |     this.renderer.shadowMap.enabled = true;
0030 |     this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
0031 |     this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
0032 |     this.renderer.toneMappingExposure = 1.0;
0033 | 
0034 |     container.appendChild(this.renderer.domElement);
0035 | 
0036 |     this.atmosphere = new AtmosphereSystem(this.scene);
0037 |     this.particles = new ParticleSystem(this.scene);
0038 | 
0039 |     window.addEventListener('resize', this.handleResize.bind(this, container));
0040 |   }
0041 | 
0042 |   private handleResize(container: HTMLElement): void {
0043 |     const width = container.clientWidth || window.innerWidth;
0044 |     const height = container.clientHeight || window.innerHeight;
0045 |     this.camera.aspect = width / height;
0046 |     this.camera.updateProjectionMatrix();
0047 |     this.renderer.setSize(width, height);
0048 |   }
0049 | 
0050 |   public render(): { drawCalls: number; triangles: number } {
0051 |     this.renderer.render(this.scene, this.camera);
0052 |     return {
0053 |       drawCalls: this.renderer.info.render.calls,
0054 |       triangles: this.renderer.info.render.triangles
0055 |     };
0056 |   }
0057 | 
0058 |   public dispose(): void {
0059 |     this.renderer.dispose();
0060 |   }
0061 | }
0062 | 
```

---

## 29. `src/world/roadNetwork.ts`

<a id="src-world-roadnetwork-ts"></a>

**Role:** Interconnected road graph spanning all 26 sectors with A* pathfinding and 3D GPS route ribbons.

- **File Path:** `src/world/roadNetwork.ts`
- **Total Lines:** 208
- **Size:** 6.85 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { distance2D } from '../core/math';
0003 | import { CANONICAL_DISTRICTS } from '../data/districts';
0004 | 
0005 | export interface RoadNode {
0006 |   id: string;
0007 |   x: number;
0008 |   z: number;
0009 |   neighbors: string[];
0010 | }
0011 | 
0012 | export class RoadNetwork {
0013 |   public nodes: Map<string, RoadNode> = new Map();
0014 |   private ribbonMesh: THREE.Mesh | null = null;
0015 |   private scene: THREE.Scene;
0016 | 
0017 |   constructor(scene: THREE.Scene) {
0018 |     this.scene = scene;
0019 |     this.buildGraph();
0020 |   }
0021 | 
0022 |   /**
0023 |    * Builds an interconnected road graph spanning all 26 canonical districts
0024 |    */
0025 |   private buildGraph(): void {
0026 |     // Generate nodes at district centers and major highway interchanges
0027 |     CANONICAL_DISTRICTS.forEach(district => {
0028 |       this.nodes.set(district.id, {
0029 |         id: district.id,
0030 |         x: district.center[0],
0031 |         z: district.center[2],
0032 |         neighbors: []
0033 |       });
0034 |     });
0035 | 
0036 |     // Add arterial highway nodes and connectors
0037 |     const addEdge = (id1: string, id2: string) => {
0038 |       const n1 = this.nodes.get(id1);
0039 |       const n2 = this.nodes.get(id2);
0040 |       if (n1 && n2) {
0041 |         if (!n1.neighbors.includes(id2)) n1.neighbors.push(id2);
0042 |         if (!n2.neighbors.includes(id1)) n2.neighbors.push(id1);
0043 |       }
0044 |     };
0045 | 
0046 |     // Central Core Grid (Aurelio Central, Meridian, Old Quay, Civic Rise, Neon Row)
0047 |     addEdge('D01', 'D02'); // Central to Meridian
0048 |     addEdge('D01', 'D03'); // Central to Old Quay
0049 |     addEdge('D01', 'D04'); // Central to Civic Rise
0050 |     addEdge('D02', 'D05'); // Meridian to Neon Row
0051 |     addEdge('D04', 'D05'); // Civic to Neon Row
0052 |     addEdge('D03', 'D04'); // Old Quay to Civic
0053 | 
0054 |     // Coastal & Harbor Links (Harborview, Sunspire, Eastmoor)
0055 |     addEdge('D05', 'D06'); // Neon Row to Harborview
0056 |     addEdge('D02', 'D07'); // Meridian to Sunspire
0057 |     addEdge('D06', 'D07'); // Harborview to Sunspire
0058 |     addEdge('D07', 'D08'); // Sunspire to Eastmoor
0059 |     addEdge('D06', 'D21'); // Harborview to Freeway Belt
0060 | 
0061 |     // Northern Ridge & Foothills (Caldera Hills, Crown Heights, Northpoint, Pine Crest)
0062 |     addEdge('D01', 'D11'); // Central to Northpoint
0063 |     addEdge('D02', 'D12'); // Meridian to Pine Crest
0064 |     addEdge('D07', 'D09'); // Sunspire to Caldera Hills
0065 |     addEdge('D03', 'D10'); // Old Quay to Crown Heights
0066 |     addEdge('D10', 'D11'); // Crown Heights to Northpoint
0067 |     addEdge('D11', 'D12'); // Northpoint to Pine Crest
0068 |     addEdge('D12', 'D09'); // Pine Crest to Caldera Hills
0069 | 
0070 |     // Western Port & Industrial Belt (Westgate, Port Meridian, Ironworks, Docklands, Salt Marsh)
0071 |     addEdge('D03', 'D13'); // Old Quay to Westgate
0072 |     addEdge('D13', 'D14'); // Westgate to Port Meridian
0073 |     addEdge('D04', 'D15'); // Civic to Ironworks
0074 |     addEdge('D14', 'D15'); // Port Meridian to Ironworks
0075 |     addEdge('D15', 'D16'); // Ironworks to Docklands
0076 |     addEdge('D04', 'D16'); // Civic to Docklands
0077 |     addEdge('D13', 'D17'); // Westgate to Salt Marsh
0078 | 
0079 |     // Southern Arterials & Airport (Southbank, Rancho Sol, Airport, Freeway Belt, Desert Edge, Military)
0080 |     addEdge('D15', 'D18'); // Ironworks to Southbank
0081 |     addEdge('D18', 'D19'); // Southbank to Rancho Sol
0082 |     addEdge('D16', 'D20'); // Docklands to Airport
0083 |     addEdge('D05', 'D20'); // Neon Row to Airport
0084 |     addEdge('D20', 'D21'); // Airport to Freeway Belt
0085 |     addEdge('D20', 'D22'); // Airport to Desert Edge
0086 |     addEdge('D21', 'D23'); // Freeway to Blackridge Military
0087 |     addEdge('D08', 'D23'); // Eastmoor to Blackridge
0088 |     addEdge('D21', 'D25'); // Freeway to Pelican Keys Causeway
0089 |     addEdge('D17', 'D26'); // Salt Marsh to Silver Lake
0090 |     addEdge('D18', 'D24'); // Southbank to Sable Island Bridge
0091 |   }
0092 | 
0093 |   /**
0094 |    * Finds the nearest road node to arbitrary (x, z) coordinates
0095 |    */
0096 |   public getNearestNode(x: number, z: number): RoadNode {
0097 |     let nearest: RoadNode = this.nodes.values().next().value!;
0098 |     let minDist = Infinity;
0099 |     for (const node of this.nodes.values()) {
0100 |       const d = distance2D(x, z, node.x, node.z);
0101 |       if (d < minDist) {
0102 |         minDist = d;
0103 |         nearest = node;
0104 |       }
0105 |     }
0106 |     return nearest;
0107 |   }
0108 | 
0109 |   /**
0110 |    * Computes shortest path across the road network via Dijkstra / A*
0111 |    */
0112 |   public findPath(startX: number, startZ: number, endX: number, endZ: number): [number, number, number][] {
0113 |     const startNode = this.getNearestNode(startX, startZ);
0114 |     const endNode = this.getNearestNode(endX, endZ);
0115 | 
0116 |     if (startNode.id === endNode.id) {
0117 |       return [
0118 |         [startX, 0.1, startZ],
0119 |         [endX, 0.1, endZ]
0120 |       ];
0121 |     }
0122 | 
0123 |     const dists = new Map<string, number>();
0124 |     const prev = new Map<string, string | null>();
0125 |     const unvisited = new Set<string>();
0126 | 
0127 |     for (const id of this.nodes.keys()) {
0128 |       dists.set(id, Infinity);
0129 |       prev.set(id, null);
0130 |       unvisited.add(id);
0131 |     }
0132 |     dists.set(startNode.id, 0);
0133 | 
0134 |     while (unvisited.size > 0) {
0135 |       let currentId: string | null = null;
0136 |       let minVal = Infinity;
0137 |       for (const id of unvisited) {
0138 |         const d = dists.get(id)!;
0139 |         if (d < minVal) {
0140 |           minVal = d;
0141 |           currentId = id;
0142 |         }
0143 |       }
0144 | 
0145 |       if (!currentId || currentId === endNode.id || minVal === Infinity) {
0146 |         break;
0147 |       }
0148 | 
0149 |       unvisited.delete(currentId);
0150 |       const currNode = this.nodes.get(currentId)!;
0151 | 
0152 |       for (const neighborId of currNode.neighbors) {
0153 |         if (!unvisited.has(neighborId)) continue;
0154 |         const neighbor = this.nodes.get(neighborId)!;
0155 |         const edgeWeight = distance2D(currNode.x, currNode.z, neighbor.x, neighbor.z);
0156 |         const alt = dists.get(currentId)! + edgeWeight;
0157 |         if (alt < dists.get(neighborId)!) {
0158 |           dists.set(neighborId, alt);
0159 |           prev.set(neighborId, currentId);
0160 |         }
0161 |       }
0162 |     }
0163 | 
0164 |     // Reconstruct path
0165 |     const path: [number, number, number][] = [];
0166 |     let curr: string | null = endNode.id;
0167 |     while (curr) {
0168 |       const n = this.nodes.get(curr)!;
0169 |       path.unshift([n.x, 0.15, n.z]);
0170 |       curr = prev.get(curr) || null;
0171 |     }
0172 | 
0173 |     // Prepend exact player origin and append target
0174 |     path.unshift([startX, 0.15, startZ]);
0175 |     path.push([endX, 0.15, endZ]);
0176 | 
0177 |     return path;
0178 |   }
0179 | 
0180 |   /**
0181 |    * Generates a 3D glowing GPS ribbon in world space along the road path
0182 |    */
0183 |   public updateGPSRibbon(path: [number, number, number][] | null): void {
0184 |     if (this.ribbonMesh) {
0185 |       this.scene.remove(this.ribbonMesh);
0186 |       this.ribbonMesh.geometry.dispose();
0187 |       (this.ribbonMesh.material as THREE.Material).dispose();
0188 |       this.ribbonMesh = null;
0189 |     }
0190 | 
0191 |     if (!path || path.length < 2) return;
0192 | 
0193 |     const points: THREE.Vector3[] = path.map(p => new THREE.Vector3(p[0], 0.25, p[2]));
0194 |     const curve = new THREE.CatmullRomCurve3(points);
0195 |     const tubeGeometry = new THREE.TubeGeometry(curve, points.length * 8, 0.45, 6, false);
0196 | 
0197 |     const tubeMaterial = new THREE.MeshBasicMaterial({
0198 |       color: 0x06b6d4, // Glowing Cyan GPS ribbon
0199 |       transparent: true,
0200 |       opacity: 0.75,
0201 |       wireframe: false
0202 |     });
0203 | 
0204 |     this.ribbonMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
0205 |     this.scene.add(this.ribbonMesh);
0206 |   }
0207 | }
0208 | 
```

---

## 30. `src/world/sectorBuilder.ts`

<a id="src-world-sectorbuilder-ts"></a>

**Role:** Procedural architectural generator building skyscrapers, quays, warehouses, and collision meshes.

- **File Path:** `src/world/sectorBuilder.ts`
- **Total Lines:** 283
- **Size:** 10.33 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { DistrictData } from '../core/types';
0003 | import { materialLib } from '../rendering/materials';
0004 | 
0005 | export interface StaticCollider {
0006 |   box: THREE.Box3;
0007 |   type: 'building' | 'barrier' | 'prop';
0008 | }
0009 | 
0010 | export class SectorBuilder {
0011 |   /**
0012 |    * Builds the 3D scene group for a canonical sector based on its archetype
0013 |    */
0014 |   public static buildSector(
0015 |     district: DistrictData,
0016 |     isHeroLOD: boolean = true
0017 |   ): { group: THREE.Group; colliders: StaticCollider[] } {
0018 |     const group = new THREE.Group();
0019 |     group.name = `sector_${district.id}`;
0020 |     const colliders: StaticCollider[] = [];
0021 | 
0022 |     const { minX, maxX, minZ, maxZ } = district.bounds;
0023 |     const width = maxX - minX;
0024 |     const depth = maxZ - minZ;
0025 |     const centerX = (minX + maxX) / 2;
0026 |     const centerZ = (minZ + maxZ) / 2;
0027 | 
0028 |     // 1. Sector Ground Base Plane
0029 |     const groundGeo = new THREE.PlaneGeometry(width, depth);
0030 |     groundGeo.rotateX(-Math.PI / 2);
0031 | 
0032 |     let groundMat: THREE.Material = materialLib.grassMaterial;
0033 |     if (district.archetype === 'downtown' || district.archetype === 'financial' || district.archetype === 'civic') {
0034 |       groundMat = materialLib.sidewalkMaterial;
0035 |     } else if (district.archetype === 'heavy_industry' || district.archetype === 'container_district' || district.archetype === 'port') {
0036 |       groundMat = materialLib.roadMaterial;
0037 |     } else if (district.archetype === 'dry_fringe') {
0038 |       groundMat = materialLib.sandMaterial;
0039 |     } else if (district.archetype === 'waterfront' || district.archetype === 'wetland') {
0040 |       groundMat = materialLib.waterMaterial;
0041 |     }
0042 | 
0043 |     const groundMesh = new THREE.Mesh(groundGeo, groundMat);
0044 |     groundMesh.position.set(centerX, -0.05, centerZ);
0045 |     groundMesh.receiveShadow = true;
0046 |     group.add(groundMesh);
0047 | 
0048 |     // 2. Road Network Grid through this sector
0049 |     const roadWidth = 14;
0050 |     // Main East-West road
0051 |     const roadEWGeo = new THREE.PlaneGeometry(width, roadWidth);
0052 |     roadEWGeo.rotateX(-Math.PI / 2);
0053 |     const roadEWMesh = new THREE.Mesh(roadEWGeo, materialLib.roadMaterial);
0054 |     roadEWMesh.position.set(centerX, 0.02, centerZ);
0055 |     roadEWMesh.receiveShadow = true;
0056 |     group.add(roadEWMesh);
0057 | 
0058 |     // Road dashed center line
0059 |     const lineEWGeo = new THREE.PlaneGeometry(width, 0.3);
0060 |     lineEWGeo.rotateX(-Math.PI / 2);
0061 |     const lineEWMesh = new THREE.Mesh(lineEWGeo, materialLib.roadMarkingYellow);
0062 |     lineEWMesh.position.set(centerX, 0.03, centerZ);
0063 |     group.add(lineEWMesh);
0064 | 
0065 |     // Main North-South road
0066 |     const roadNSGeo = new THREE.PlaneGeometry(roadWidth, depth);
0067 |     roadNSGeo.rotateX(-Math.PI / 2);
0068 |     const roadNSMesh = new THREE.Mesh(roadNSGeo, materialLib.roadMaterial);
0069 |     roadNSMesh.position.set(centerX, 0.02, centerZ);
0070 |     roadNSMesh.receiveShadow = true;
0071 |     group.add(roadNSMesh);
0072 | 
0073 |     // Sidewalk curbs flanking roads
0074 |     const curbGeo = new THREE.BoxGeometry(width, 0.25, 2.5);
0075 |     const curbNorth = new THREE.Mesh(curbGeo, materialLib.sidewalkMaterial);
0076 |     curbNorth.position.set(centerX, 0.125, centerZ - roadWidth / 2 - 1.25);
0077 |     group.add(curbNorth);
0078 | 
0079 |     const curbSouth = new THREE.Mesh(curbGeo, materialLib.sidewalkMaterial);
0080 |     curbSouth.position.set(centerX, 0.125, centerZ + roadWidth / 2 + 1.25);
0081 |     group.add(curbSouth);
0082 | 
0083 |     // 3. Buildings & Architecture based on district archetype
0084 |     const bldgSpacing = 70;
0085 |     const margin = 35;
0086 | 
0087 |     for (let x = minX + margin; x <= maxX - margin; x += bldgSpacing) {
0088 |       for (let z = minZ + margin; z <= maxZ - margin; z += bldgSpacing) {
0089 |         // Skip positions directly on the center roads
0090 |         if (Math.abs(x - centerX) < roadWidth + 5 || Math.abs(z - centerZ) < roadWidth + 5) {
0091 |           continue;
0092 |         }
0093 | 
0094 |         const bldg = this.createBuilding(district.archetype, x, z, isHeroLOD);
0095 |         group.add(bldg.mesh);
0096 | 
0097 |         // Register static physical collider box
0098 |         const box = new THREE.Box3().setFromObject(bldg.mesh);
0099 |         colliders.push({ box, type: 'building' });
0100 | 
0101 |         // Add streetlights on sidewalk corners if Hero LOD
0102 |         if (isHeroLOD && Math.random() > 0.4) {
0103 |           const lightX = x > centerX ? x - 25 : x + 25;
0104 |           const lightZ = z > centerZ ? z - 25 : z + 25;
0105 |           group.add(this.createStreetlight(lightX, lightZ));
0106 |         }
0107 |       }
0108 |     }
0109 | 
0110 |     // 4. District Signature Hero Landmark
0111 |     if (isHeroLOD) {
0112 |       const landmark = this.createSignatureLandmark(district);
0113 |       if (landmark) {
0114 |         group.add(landmark.mesh);
0115 |         const box = new THREE.Box3().setFromObject(landmark.mesh);
0116 |         colliders.push({ box, type: 'building' });
0117 |       }
0118 |     }
0119 | 
0120 |     return { group, colliders };
0121 |   }
0122 | 
0123 |   /**
0124 |    * Synthesizes building geometry matching the district identity
0125 |    */
0126 |   private static createBuilding(
0127 |     archetype: string,
0128 |     x: number,
0129 |     z: number,
0130 |     isHeroLOD: boolean
0131 |   ): { mesh: THREE.Group } {
0132 |     const bldgGroup = new THREE.Group();
0133 | 
0134 |     let width = 36 + Math.random() * 14;
0135 |     let depth = 36 + Math.random() * 14;
0136 |     let height = 30;
0137 |     let mainMaterial: THREE.Material = materialLib.towerConcreteMaterial;
0138 | 
0139 |     if (archetype === 'downtown' || archetype === 'financial') {
0140 |       height = 55 + Math.random() * 65; // Tall towers (55m - 120m)
0141 |       mainMaterial = Math.random() > 0.4 ? materialLib.towerGlassMaterial : materialLib.towerConcreteMaterial;
0142 |     } else if (archetype === 'historic') {
0143 |       height = 12 + Math.random() * 10; // 3-4 stories
0144 |       width = 25 + Math.random() * 10;
0145 |       depth = 25 + Math.random() * 10;
0146 |       mainMaterial = materialLib.brickHistoricMaterial;
0147 |     } else if (archetype === 'heavy_industry' || archetype === 'port' || archetype === 'container_district') {
0148 |       height = 15 + Math.random() * 12; // Industrial warehouse
0149 |       width = 45 + Math.random() * 20;
0150 |       depth = 35 + Math.random() * 15;
0151 |       mainMaterial = materialLib.industrialRustMaterial;
0152 |     } else if (archetype === 'nightlife') {
0153 |       height = 25 + Math.random() * 25;
0154 |       mainMaterial = materialLib.towerConcreteMaterial;
0155 |     } else {
0156 |       // Suburbs / rural / coastal
0157 |       height = 10 + Math.random() * 8;
0158 |       width = 24 + Math.random() * 10;
0159 |       depth = 24 + Math.random() * 10;
0160 |       mainMaterial = materialLib.towerConcreteMaterial;
0161 |     }
0162 | 
0163 |     // Main building body box
0164 |     const bodyGeo = new THREE.BoxGeometry(width, height, depth);
0165 |     const bodyMesh = new THREE.Mesh(bodyGeo, mainMaterial);
0166 |     bodyMesh.position.y = height / 2;
0167 |     bodyMesh.castShadow = true;
0168 |     bodyMesh.receiveShadow = true;
0169 |     bldgGroup.add(bodyMesh);
0170 | 
0171 |     // Rooftop details (HVAC air units, water tanks, elevator bulkheads)
0172 |     if (isHeroLOD) {
0173 |       const roofHvacGeo = new THREE.BoxGeometry(6, 3, 6);
0174 |       const roofHvacMesh = new THREE.Mesh(roofHvacGeo, materialLib.towerConcreteMaterial);
0175 |       roofHvacMesh.position.set(0, height + 1.5, 0);
0176 |       bldgGroup.add(roofHvacMesh);
0177 | 
0178 |       // Nightlife / Downtown illuminated signage
0179 |       if (archetype === 'nightlife' || (archetype === 'downtown' && Math.random() > 0.6)) {
0180 |         const signGeo = new THREE.PlaneGeometry(width * 0.7, 4);
0181 |         const signMat = Math.random() > 0.5 ? materialLib.neonPink : materialLib.neonCyan;
0182 |         const signMesh = new THREE.Mesh(signGeo, signMat);
0183 |         signMesh.position.set(0, height - 6, depth / 2 + 0.2);
0184 |         bldgGroup.add(signMesh);
0185 |       }
0186 |     }
0187 | 
0188 |     bldgGroup.position.set(x, 0, z);
0189 |     return { mesh: bldgGroup };
0190 |   }
0191 | 
0192 |   /**
0193 |    * Signature Landmark for canonical districts
0194 |    */
0195 |   private static createSignatureLandmark(district: DistrictData): { mesh: THREE.Group } | null {
0196 |     const group = new THREE.Group();
0197 | 
0198 |     if (district.id === 'D01') {
0199 |       // Aurelio Tower: Mega 130m skyscraper with glass spire
0200 |       const baseGeo = new THREE.BoxGeometry(45, 90, 45);
0201 |       const baseMesh = new THREE.Mesh(baseGeo, materialLib.towerGlassMaterial);
0202 |       baseMesh.position.y = 45;
0203 |       baseMesh.castShadow = true;
0204 |       group.add(baseMesh);
0205 | 
0206 |       const spireGeo = new THREE.ConeGeometry(8, 40, 4);
0207 |       spireGeo.rotateY(Math.PI / 4);
0208 |       const spireMesh = new THREE.Mesh(spireGeo, materialLib.vehicleChrome);
0209 |       spireMesh.position.y = 90 + 20;
0210 |       spireMesh.castShadow = true;
0211 |       group.add(spireMesh);
0212 | 
0213 |       // Sky Helipad platform on top
0214 |       const padGeo = new THREE.CylinderGeometry(10, 10, 1.2, 16);
0215 |       const padMesh = new THREE.Mesh(padGeo, materialLib.sidewalkMaterial);
0216 |       padMesh.position.y = 90.6;
0217 |       group.add(padMesh);
0218 | 
0219 |       group.position.set(district.center[0], 0, district.center[2]);
0220 |       return { mesh: group };
0221 |     }
0222 | 
0223 |     if (district.id === 'D02') {
0224 |       // Meridian Exchange: Dual glass towers connected by skybridge
0225 |       const tower1 = new THREE.Mesh(new THREE.BoxGeometry(25, 75, 25), materialLib.towerGlassMaterial);
0226 |       tower1.position.set(-18, 37.5, 0);
0227 |       tower1.castShadow = true;
0228 |       group.add(tower1);
0229 | 
0230 |       const tower2 = new THREE.Mesh(new THREE.BoxGeometry(25, 75, 25), materialLib.towerGlassMaterial);
0231 |       tower2.position.set(18, 37.5, 0);
0232 |       tower2.castShadow = true;
0233 |       group.add(tower2);
0234 | 
0235 |       // Elevated Skybridge
0236 |       const bridge = new THREE.Mesh(new THREE.BoxGeometry(22, 5, 8), materialLib.vehicleChrome);
0237 |       bridge.position.set(0, 52, 0);
0238 |       group.add(bridge);
0239 | 
0240 |       group.position.set(district.center[0] + 30, 0, district.center[2]);
0241 |       return { mesh: group };
0242 |     }
0243 | 
0244 |     if (district.id === 'D04') {
0245 |       // Grand Assembly: Neoclassical marble dome and colonnade
0246 |       const hall = new THREE.Mesh(new THREE.BoxGeometry(50, 18, 35), materialLib.sidewalkMaterial);
0247 |       hall.position.y = 9;
0248 |       hall.castShadow = true;
0249 |       group.add(hall);
0250 | 
0251 |       const dome = new THREE.Mesh(new THREE.SphereGeometry(14, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), materialLib.vehicleChrome);
0252 |       dome.position.y = 18;
0253 |       group.add(dome);
0254 | 
0255 |       group.position.set(district.center[0], 0, district.center[2] + 40);
0256 |       return { mesh: group };
0257 |     }
0258 | 
0259 |     return null;
0260 |   }
0261 | 
0262 |   /**
0263 |    * Streetlight with pole and glowing lamp
0264 |    */
0265 |   private static createStreetlight(x: number, z: number): THREE.Group {
0266 |     const group = new THREE.Group();
0267 |     // Metal pole
0268 |     const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 7.5, 8);
0269 |     const poleMesh = new THREE.Mesh(poleGeo, materialLib.vehicleChrome);
0270 |     poleMesh.position.y = 3.75;
0271 |     group.add(poleMesh);
0272 | 
0273 |     // Lamp head
0274 |     const lampGeo = new THREE.BoxGeometry(0.8, 0.25, 1.4);
0275 |     const lampMesh = new THREE.Mesh(lampGeo, materialLib.vehicleHeadlight);
0276 |     lampMesh.position.set(0, 7.5, 0.6);
0277 |     group.add(lampMesh);
0278 | 
0279 |     group.position.set(x, 0, z);
0280 |     return group;
0281 |   }
0282 | }
0283 | 
```

---

## 31. `src/world/worldStreamer.ts`

<a id="src-world-worldstreamer-ts"></a>

**Role:** Cell streaming manager loading hero high-LOD cells and perimeter proxy shells with hysteresis.

- **File Path:** `src/world/worldStreamer.ts`
- **Total Lines:** 140
- **Size:** 4.37 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { CANONICAL_DISTRICTS, getDistrictAt } from '../data/districts';
0003 | import { SectorBuilder, StaticCollider } from './sectorBuilder';
0004 | import { distance2D } from '../core/math';
0005 | 
0006 | interface LoadedSector {
0007 |   districtId: string;
0008 |   group: THREE.Group;
0009 |   colliders: StaticCollider[];
0010 |   isHeroLOD: boolean;
0011 |   lastActiveTime: number;
0012 | }
0013 | 
0014 | export class WorldStreamer {
0015 |   private scene: THREE.Scene;
0016 |   private loadedSectors: Map<string, LoadedSector> = new Map();
0017 |   public allColliders: StaticCollider[] = [];
0018 |   public currentDistrictId: string = 'D01';
0019 | 
0020 |   // Distance thresholds
0021 |   private readonly heroRadius = 380; // Full LOD
0022 |   private readonly streamRadius = 850; // Proxy LOD
0023 |   private readonly evictionBufferTime = 4000; // 4 seconds hysteresis
0024 | 
0025 |   constructor(scene: THREE.Scene) {
0026 |     this.scene = scene;
0027 |   }
0028 | 
0029 |   public update(playerPos: THREE.Vector3): void {
0030 |     const currentDistrict = getDistrictAt(playerPos.x, playerPos.z);
0031 |     this.currentDistrictId = currentDistrict.id;
0032 | 
0033 |     const now = performance.now();
0034 |     const desiredSectors: { districtId: string; isHero: boolean }[] = [];
0035 | 
0036 |     // Evaluate all 26 canonical districts
0037 |     for (const district of CANONICAL_DISTRICTS) {
0038 |       const dist = distance2D(playerPos.x, playerPos.z, district.center[0], district.center[2]);
0039 |       if (dist <= this.heroRadius) {
0040 |         desiredSectors.push({ districtId: district.id, isHero: true });
0041 |       } else if (dist <= this.streamRadius) {
0042 |         desiredSectors.push({ districtId: district.id, isHero: false });
0043 |       }
0044 |     }
0045 | 
0046 |     // Always ensure current district is hero LOD
0047 |     if (!desiredSectors.some(s => s.districtId === currentDistrict.id)) {
0048 |       desiredSectors.unshift({ districtId: currentDistrict.id, isHero: true });
0049 |     }
0050 | 
0051 |     // Load or promote sectors
0052 |     for (const req of desiredSectors) {
0053 |       const existing = this.loadedSectors.get(req.districtId);
0054 |       if (!existing) {
0055 |         this.loadSector(req.districtId, req.isHero, now);
0056 |       } else {
0057 |         existing.lastActiveTime = now;
0058 |         // Promote from proxy to hero LOD if close
0059 |         if (req.isHero && !existing.isHeroLOD) {
0060 |           this.unloadSector(req.districtId);
0061 |           this.loadSector(req.districtId, true, now);
0062 |         }
0063 |       }
0064 |     }
0065 | 
0066 |     // Unload distant sectors that expired their hysteresis window
0067 |     for (const [id, sector] of this.loadedSectors.entries()) {
0068 |       const stillDesired = desiredSectors.some(s => s.districtId === id);
0069 |       if (!stillDesired) {
0070 |         if (now - sector.lastActiveTime > this.evictionBufferTime) {
0071 |           this.unloadSector(id);
0072 |         }
0073 |       }
0074 |     }
0075 | 
0076 |     // Rebuild global active colliders array
0077 |     this.rebuildColliders();
0078 |   }
0079 | 
0080 |   private loadSector(districtId: string, isHeroLOD: boolean, now: number): void {
0081 |     const data = CANONICAL_DISTRICTS.find(d => d.id === districtId);
0082 |     if (!data) return;
0083 | 
0084 |     const { group, colliders } = SectorBuilder.buildSector(data, isHeroLOD);
0085 |     this.scene.add(group);
0086 | 
0087 |     this.loadedSectors.set(districtId, {
0088 |       districtId,
0089 |       group,
0090 |       colliders,
0091 |       isHeroLOD,
0092 |       lastActiveTime: now
0093 |     });
0094 |   }
0095 | 
0096 |   private unloadSector(districtId: string): void {
0097 |     const loaded = this.loadedSectors.get(districtId);
0098 |     if (loaded) {
0099 |       this.scene.remove(loaded.group);
0100 |       loaded.group.traverse(obj => {
0101 |         if ((obj as THREE.Mesh).isMesh) {
0102 |           const mesh = obj as THREE.Mesh;
0103 |           mesh.geometry?.dispose();
0104 |         }
0105 |       });
0106 |       this.loadedSectors.delete(districtId);
0107 |     }
0108 |   }
0109 | 
0110 |   private rebuildColliders(): void {
0111 |     this.allColliders = [];
0112 |     for (const sector of this.loadedSectors.values()) {
0113 |       if (sector.isHeroLOD) {
0114 |         this.allColliders.push(...sector.colliders);
0115 |       }
0116 |     }
0117 |   }
0118 | 
0119 |   public getActiveSectorIds(): string[] {
0120 |     return Array.from(this.loadedSectors.keys());
0121 |   }
0122 | 
0123 |   /**
0124 |    * Fast swept sphere / box collision test against world geometry
0125 |    */
0126 |   public testCollision(pos: THREE.Vector3, radius: number): { hit: boolean; normal: THREE.Vector3 } {
0127 |     const playerSphere = new THREE.Sphere(pos, radius);
0128 |     for (const col of this.allColliders) {
0129 |       if (col.box.intersectsSphere(playerSphere)) {
0130 |         // Compute push-back normal from box center
0131 |         const center = new THREE.Vector3();
0132 |         col.box.getCenter(center);
0133 |         const normal = pos.clone().sub(center).setY(0).normalize();
0134 |         return { hit: true, normal };
0135 |       }
0136 |     }
0137 |     return { hit: false, normal: new THREE.Vector3() };
0138 |   }
0139 | }
0140 | 
```

---

## 32. `src/player/characterModel.ts`

<a id="src-player-charactermodel-ts"></a>

**Role:** Procedural 3D humanoid character model for Kai Mercer with articulated skeletal rig.

- **File Path:** `src/player/characterModel.ts`
- **Total Lines:** 202
- **Size:** 6.96 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { PlayerLocomotionState } from '../core/types';
0003 | 
0004 | export class CharacterModel {
0005 |   public mesh: THREE.Group;
0006 |   // Articulated bone nodes
0007 |   private torso: THREE.Group;
0008 |   private head: THREE.Group;
0009 |   private leftArm: THREE.Group;
0010 |   private rightArm: THREE.Group;
0011 |   private leftLeg: THREE.Group;
0012 |   private rightLeg: THREE.Group;
0013 |   public weaponSocket: THREE.Group;
0014 | 
0015 |   private animTime = 0;
0016 | 
0017 |   constructor() {
0018 |     this.mesh = new THREE.Group();
0019 |     this.mesh.name = 'Hero_KaiMercer';
0020 | 
0021 |     // Materials
0022 |     const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.7 });
0023 |     const hairMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 });
0024 |     const jacketMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.1 });
0025 |     const shirtMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
0026 |     const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });
0027 |     const bootsMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.6 });
0028 |     const accentMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 }); // Amber tactical trim
0029 | 
0030 |     // 1. Torso & Asymmetrical Utility Jacket
0031 |     this.torso = new THREE.Group();
0032 |     this.torso.position.y = 1.0;
0033 | 
0034 |     const chestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.55, 0.28), jacketMat);
0035 |     chestMesh.castShadow = true;
0036 |     this.torso.add(chestMesh);
0037 | 
0038 |     // High collar
0039 |     const collarMesh = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.24), accentMat);
0040 |     collarMesh.position.y = 0.32;
0041 |     this.torso.add(collarMesh);
0042 | 
0043 |     // Inner base shirt visible at neck
0044 |     const shirtMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.22), shirtMat);
0045 |     shirtMesh.position.set(0, 0.22, 0.04);
0046 |     this.torso.add(shirtMesh);
0047 | 
0048 |     // Tactical utility chest harness
0049 |     const harnessMesh = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.22, 0.08), accentMat);
0050 |     harnessMesh.position.set(0, 0.05, 0.15);
0051 |     this.torso.add(harnessMesh);
0052 | 
0053 |     // 2. Head with short textured hair
0054 |     this.head = new THREE.Group();
0055 |     this.head.position.y = 0.42;
0056 | 
0057 |     const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.26, 0.24), skinMat);
0058 |     headMesh.castShadow = true;
0059 |     this.head.add(headMesh);
0060 | 
0061 |     // Textured hair cap
0062 |     const hairMesh = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.26), hairMat);
0063 |     hairMesh.position.set(0, 0.12, -0.01);
0064 |     this.head.add(hairMesh);
0065 | 
0066 |     this.torso.add(this.head);
0067 | 
0068 |     // 3. Left Arm
0069 |     this.leftArm = new THREE.Group();
0070 |     this.leftArm.position.set(-0.32, 0.22, 0);
0071 | 
0072 |     const lShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.3, 0.16), jacketMat);
0073 |     lShoulder.position.y = -0.15;
0074 |     lShoulder.castShadow = true;
0075 |     this.leftArm.add(lShoulder);
0076 | 
0077 |     const lHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.12), skinMat);
0078 |     lHand.position.y = -0.4;
0079 |     this.leftArm.add(lHand);
0080 | 
0081 |     this.torso.add(this.leftArm);
0082 | 
0083 |     // 4. Right Arm with Weapon Socket
0084 |     this.rightArm = new THREE.Group();
0085 |     this.rightArm.position.set(0.32, 0.22, 0);
0086 | 
0087 |     const rShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.3, 0.16), jacketMat);
0088 |     rShoulder.position.y = -0.15;
0089 |     rShoulder.castShadow = true;
0090 |     this.rightArm.add(rShoulder);
0091 | 
0092 |     const rHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.12), skinMat);
0093 |     rHand.position.y = -0.4;
0094 |     this.rightArm.add(rHand);
0095 | 
0096 |     // Tactical utility watch on right wrist
0097 |     const watchMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.14), accentMat);
0098 |     watchMesh.position.y = -0.32;
0099 |     this.rightArm.add(watchMesh);
0100 | 
0101 |     // Weapon Socket attached to right hand
0102 |     this.weaponSocket = new THREE.Group();
0103 |     this.weaponSocket.position.set(0, -0.48, 0.15);
0104 |     this.rightArm.add(this.weaponSocket);
0105 | 
0106 |     this.torso.add(this.rightArm);
0107 |     this.mesh.add(this.torso);
0108 | 
0109 |     // 5. Legs & Cargo Trousers
0110 |     this.leftLeg = new THREE.Group();
0111 |     this.leftLeg.position.set(-0.14, 0.75, 0);
0112 | 
0113 |     const lThigh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), pantsMat);
0114 |     lThigh.position.y = -0.21;
0115 |     lThigh.castShadow = true;
0116 |     this.leftLeg.add(lThigh);
0117 | 
0118 |     const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.24), bootsMat);
0119 |     lBoot.position.set(0, -0.58, 0.02);
0120 |     lBoot.castShadow = true;
0121 |     this.leftLeg.add(lBoot);
0122 | 
0123 |     this.mesh.add(this.leftLeg);
0124 | 
0125 |     this.rightLeg = new THREE.Group();
0126 |     this.rightLeg.position.set(0.14, 0.75, 0);
0127 | 
0128 |     const rThigh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), pantsMat);
0129 |     rThigh.position.y = -0.21;
0130 |     rThigh.castShadow = true;
0131 |     this.rightLeg.add(rThigh);
0132 | 
0133 |     const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.24), bootsMat);
0134 |     rBoot.position.set(0, -0.58, 0.02);
0135 |     rBoot.castShadow = true;
0136 |     this.rightLeg.add(rBoot);
0137 | 
0138 |     this.mesh.add(this.rightLeg);
0139 |   }
0140 | 
0141 |   /**
0142 |    * Procedural skeletal locomotion animation
0143 |    */
0144 |   public updateAnimation(state: PlayerLocomotionState, speed: number, dt: number, isAiming: boolean): void {
0145 |     this.animTime += dt * (speed + 0.8) * 4.5;
0146 | 
0147 |     if (state === 'in_vehicle') {
0148 |       // Seated driving posture
0149 |       this.mesh.visible = true;
0150 |       this.leftLeg.rotation.x = -Math.PI / 2.2;
0151 |       this.rightLeg.rotation.x = -Math.PI / 2.2;
0152 |       this.leftArm.rotation.x = -Math.PI / 3;
0153 |       this.rightArm.rotation.x = -Math.PI / 3;
0154 |       this.torso.position.y = 0.55;
0155 |       return;
0156 |     }
0157 | 
0158 |     if (state === 'idle') {
0159 |       // Gentle breathing posture
0160 |       const breath = Math.sin(this.animTime * 0.4) * 0.02;
0161 |       this.torso.position.y = 1.0 + breath;
0162 |       this.head.rotation.x = breath * 0.5;
0163 |       this.leftArm.rotation.x = Math.sin(this.animTime * 0.4) * 0.05;
0164 |       this.rightArm.rotation.x = -Math.sin(this.animTime * 0.4) * 0.05;
0165 |       this.leftLeg.rotation.x = 0;
0166 |       this.rightLeg.rotation.x = 0;
0167 |     } else if (state === 'walk' || state === 'jog' || state === 'sprint') {
0168 |       // Locomotion swing cycle
0169 |       const swingFreq = state === 'sprint' ? 1.8 : 1.2;
0170 |       const legAngle = Math.sin(this.animTime * swingFreq) * (state === 'sprint' ? 0.9 : 0.55);
0171 |       const armAngle = -legAngle * 0.8;
0172 | 
0173 |       this.leftLeg.rotation.x = legAngle;
0174 |       this.rightLeg.rotation.x = -legAngle;
0175 | 
0176 |       if (!isAiming) {
0177 |         this.leftArm.rotation.x = armAngle;
0178 |         this.rightArm.rotation.x = -armAngle;
0179 |       }
0180 | 
0181 |       // Torso bobbing and sprint forward inclination
0182 |       const bob = Math.abs(Math.sin(this.animTime * swingFreq)) * 0.06;
0183 |       this.torso.position.y = 1.0 - bob;
0184 |       this.torso.rotation.x = state === 'sprint' ? 0.15 : 0.04;
0185 |     } else if (state === 'jump' || state === 'fall') {
0186 |       // Airborne pose
0187 |       this.leftLeg.rotation.x = 0.35;
0188 |       this.rightLeg.rotation.x = -0.25;
0189 |       this.leftArm.rotation.x = -0.6;
0190 |       this.rightArm.rotation.x = -0.6;
0191 |     }
0192 | 
0193 |     // Upper body aiming override
0194 |     if (isAiming) {
0195 |       this.rightArm.rotation.x = -Math.PI / 2.1;
0196 |       this.rightArm.rotation.y = -0.15;
0197 |       this.leftArm.rotation.x = -Math.PI / 2.3;
0198 |       this.leftArm.rotation.y = 0.35;
0199 |     }
0200 |   }
0201 | }
0202 | 
```

---

## 33. `src/player/thirdPersonCamera.ts`

<a id="src-player-thirdpersoncamera-ts"></a>

**Role:** Orbital third-person camera with obstacle collision avoidance and shoulder aim zoom.

- **File Path:** `src/player/thirdPersonCamera.ts`
- **Total Lines:** 128
- **Size:** 4.00 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { clamp, lerp } from '../core/math';
0003 | import { StaticCollider } from '../world/sectorBuilder';
0004 | 
0005 | export type CameraMode = 'on_foot' | 'aiming_shoulder' | 'vehicle' | 'helicopter_aerial';
0006 | 
0007 | export class ThirdPersonCamera {
0008 |   public camera: THREE.PerspectiveCamera;
0009 |   public mode: CameraMode = 'on_foot';
0010 | 
0011 |   public azimuth = 0; // Horizontal orbit angle (radians)
0012 |   public elevation = 0.25; // Vertical orbit angle (radians)
0013 | 
0014 |   private targetDistance = 4.2;
0015 |   private currentDistance = 4.2;
0016 |   private currentTarget = new THREE.Vector3();
0017 |   private raycaster = new THREE.Raycaster();
0018 | 
0019 |   constructor(camera: THREE.PerspectiveCamera) {
0020 |     this.camera = camera;
0021 |   }
0022 | 
0023 |   public handleMouseMove(deltaX: number, deltaY: number): void {
0024 |     const sensitivity = 0.0028;
0025 |     this.azimuth -= deltaX * sensitivity;
0026 |     this.elevation -= deltaY * sensitivity;
0027 |     // Clamp pitch between -1.1 and 1.2 radians
0028 |     this.elevation = clamp(this.elevation, -0.6, 1.2);
0029 |   }
0030 | 
0031 |   public update(
0032 |     targetPos: THREE.Vector3,
0033 |     dt: number,
0034 |     isSprinting: boolean = false,
0035 |     colliders: StaticCollider[] = []
0036 |   ): void {
0037 |     // Determine target distances and offsets based on mode
0038 |     let desiredDist = 4.2;
0039 |     let heightOffset = 1.6;
0040 |     let shoulderOffset = 0;
0041 |     let targetFov = 65;
0042 | 
0043 |     if (this.mode === 'aiming_shoulder') {
0044 |       desiredDist = 2.2;
0045 |       heightOffset = 1.5;
0046 |       shoulderOffset = 0.55;
0047 |       targetFov = 50; // ADS zoom
0048 |     } else if (this.mode === 'vehicle') {
0049 |       desiredDist = 7.0;
0050 |       heightOffset = 2.2;
0051 |       targetFov = isSprinting ? 75 : 65;
0052 |     } else if (this.mode === 'helicopter_aerial') {
0053 |       desiredDist = 14.0;
0054 |       heightOffset = 5.0;
0055 |       this.elevation = Math.max(0.4, this.elevation);
0056 |     } else if (isSprinting) {
0057 |       targetFov = 72;
0058 |     }
0059 | 
0060 |     // Smooth FOV
0061 |     this.camera.fov = lerp(this.camera.fov, targetFov, dt * 8);
0062 |     this.camera.updateProjectionMatrix();
0063 | 
0064 |     // Smooth target tracking
0065 |     const focalPoint = targetPos.clone().add(new THREE.Vector3(0, heightOffset, 0));
0066 |     this.currentTarget.lerp(focalPoint, dt * 14);
0067 | 
0068 |     // Compute ideal spherical camera position
0069 |     const cosElev = Math.cos(this.elevation);
0070 |     const sinElev = Math.sin(this.elevation);
0071 |     const sinAzim = Math.sin(this.azimuth);
0072 |     const cosAzim = Math.cos(this.azimuth);
0073 | 
0074 |     const dirX = sinAzim * cosElev;
0075 |     const dirY = sinElev;
0076 |     const dirZ = cosAzim * cosElev;
0077 | 
0078 |     // Right vector for shoulder offset
0079 |     const rightX = Math.cos(this.azimuth);
0080 |     const rightZ = -Math.sin(this.azimuth);
0081 | 
0082 |     const idealCamPos = new THREE.Vector3(
0083 |       this.currentTarget.x + dirX * desiredDist + rightX * shoulderOffset,
0084 |       this.currentTarget.y + dirY * desiredDist,
0085 |       this.currentTarget.z + dirZ * desiredDist + rightZ * shoulderOffset
0086 |     );
0087 | 
0088 |     // Camera Collision Obstruction Prevention
0089 |     // Raycast from focal point toward camera position
0090 |     let actualDist = desiredDist;
0091 |     const camRayDir = idealCamPos.clone().sub(this.currentTarget).normalize();
0092 |     const rayDist = this.currentTarget.distanceTo(idealCamPos);
0093 | 
0094 |     for (const col of colliders) {
0095 |       const ray = new THREE.Ray(this.currentTarget, camRayDir);
0096 |       const hit = ray.intersectBox(col.box, new THREE.Vector3());
0097 |       if (hit) {
0098 |         const d = this.currentTarget.distanceTo(hit);
0099 |         if (d < rayDist && d < actualDist) {
0100 |           actualDist = Math.max(0.8, d - 0.2);
0101 |         }
0102 |       }
0103 |     }
0104 | 
0105 |     this.currentDistance = lerp(this.currentDistance, actualDist, dt * 15);
0106 | 
0107 |     this.camera.position.set(
0108 |       this.currentTarget.x + camRayDir.x * this.currentDistance,
0109 |       this.currentTarget.y + camRayDir.y * this.currentDistance,
0110 |       this.currentTarget.z + camRayDir.z * this.currentDistance
0111 |     );
0112 | 
0113 |     this.camera.lookAt(this.currentTarget);
0114 |   }
0115 | 
0116 |   public getForwardVector(): THREE.Vector3 {
0117 |     const v = new THREE.Vector3();
0118 |     this.camera.getWorldDirection(v);
0119 |     v.y = 0;
0120 |     return v.normalize();
0121 |   }
0122 | 
0123 |   public getRightVector(): THREE.Vector3 {
0124 |     const fwd = this.getForwardVector();
0125 |     return new THREE.Vector3(-fwd.z, 0, fwd.x);
0126 |   }
0127 | }
0128 | 
```

---

## 34. `src/player/playerController.ts`

<a id="src-player-playercontroller-ts"></a>

**Role:** Locomotion controller handling movement, stamina, jumping, weapon sockets, and vehicle entry.

- **File Path:** `src/player/playerController.ts`
- **Total Lines:** 199
- **Size:** 6.82 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { CharacterModel } from './characterModel';
0003 | import { ThirdPersonCamera } from './thirdPersonCamera';
0004 | import { InputState } from '../core/input';
0005 | import { PlayerLocomotionState, PlayerStats, InventoryItem } from '../core/types';
0006 | import { clamp, lerpAngle } from '../core/math';
0007 | import { WorldStreamer } from '../world/worldStreamer';
0008 | import { CANONICAL_WEAPONS } from '../data/weapons';
0009 | import { soundEngine } from '../core/audio';
0010 | import { eventBus } from '../core/events';
0011 | 
0012 | export class PlayerController {
0013 |   public model: CharacterModel;
0014 |   public camera: ThirdPersonCamera;
0015 |   public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
0016 |   public velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
0017 |   public facingAngle: number = 0;
0018 | 
0019 |   public state: PlayerLocomotionState = 'idle';
0020 |   public stats: PlayerStats = {
0021 |     health: 100,
0022 |     maxHealth: 100,
0023 |     armor: 100,
0024 |     maxArmor: 100,
0025 |     cash: 2500,
0026 |     stamina: 100
0027 |   };
0028 | 
0029 |   public inventory: InventoryItem[] = [
0030 |     { weaponId: 'wep_p1_vesper', ammo: 15, reserveAmmo: 90 },
0031 |     { weaponId: 'wep_vortex_45', ammo: 32, reserveAmmo: 160 },
0032 |     { weaponId: 'wep_arcline_ar', ammo: 30, reserveAmmo: 120 }
0033 |   ];
0034 |   public activeWeaponIndex: number = 0;
0035 |   public isAiming: boolean = false;
0036 |   public currentVehicle: any = null; // Reference to active VehicleInstance when mounted
0037 | 
0038 |   private isGrounded: boolean = true;
0039 |   private readonly gravity: number = 24.0;
0040 |   private readonly walkSpeed: number = 4.2;
0041 |   private readonly jogSpeed: number = 7.5;
0042 |   private readonly sprintSpeed: number = 12.0;
0043 | 
0044 |   constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
0045 |     this.model = new CharacterModel();
0046 |     scene.add(this.model.mesh);
0047 |     this.camera = new ThirdPersonCamera(camera);
0048 |   }
0049 | 
0050 |   public update(input: InputState, dt: number, streamer: WorldStreamer): void {
0051 |     if (this.stats.health <= 0) {
0052 |       this.state = 'dead';
0053 |       return;
0054 |     }
0055 | 
0056 |     if (this.currentVehicle) {
0057 |       this.state = 'in_vehicle';
0058 |       this.model.mesh.position.copy(this.currentVehicle.position);
0059 |       this.model.mesh.rotation.y = this.currentVehicle.rotationY;
0060 |       this.model.updateAnimation(this.state, 0, dt, false);
0061 |       this.camera.mode = this.currentVehicle.def.isAircraft ? 'helicopter_aerial' : 'vehicle';
0062 |       this.camera.update(this.currentVehicle.position, dt, input.sprint, streamer.allColliders);
0063 |       return;
0064 |     }
0065 | 
0066 |     // 1. Weapon selection
0067 |     if (input.weaponSlot !== null && input.weaponSlot < this.inventory.length) {
0068 |       this.activeWeaponIndex = input.weaponSlot;
0069 |       soundEngine.playUIClick();
0070 |       eventBus.emit('WEAPON_CHANGED', this.getActiveWeapon());
0071 |     }
0072 | 
0073 |     this.isAiming = input.aim;
0074 |     this.camera.mode = this.isAiming ? 'aiming_shoulder' : 'on_foot';
0075 | 
0076 |     // 2. Camera-relative movement vector
0077 |     const camFwd = this.camera.getForwardVector();
0078 |     const camRight = this.camera.getRightVector();
0079 | 
0080 |     const moveDir = new THREE.Vector3();
0081 |     if (input.forward) moveDir.add(camFwd);
0082 |     if (input.backward) moveDir.sub(camFwd);
0083 |     if (input.right) moveDir.add(camRight);
0084 |     if (input.left) moveDir.sub(camRight);
0085 | 
0086 |     const isMoving = moveDir.lengthSq() > 0.001;
0087 |     if (isMoving) {
0088 |       moveDir.normalize();
0089 |     }
0090 | 
0091 |     // 3. Movement Speed & Stamina
0092 |     let targetSpeed = 0;
0093 |     if (isMoving) {
0094 |       if (input.sprint && this.stats.stamina > 5) {
0095 |         targetSpeed = this.sprintSpeed;
0096 |         this.stats.stamina = Math.max(0, this.stats.stamina - dt * 15);
0097 |         this.state = 'sprint';
0098 |       } else {
0099 |         targetSpeed = this.isAiming ? this.walkSpeed * 0.75 : this.jogSpeed;
0100 |         this.state = this.isAiming ? 'walk' : 'jog';
0101 |         this.stats.stamina = Math.min(100, this.stats.stamina + dt * 12);
0102 |       }
0103 |     } else {
0104 |       this.state = 'idle';
0105 |       this.stats.stamina = Math.min(100, this.stats.stamina + dt * 20);
0106 |     }
0107 | 
0108 |     // 4. Horizontal Acceleration & Deceleration
0109 |     const accelRate = 22.0;
0110 |     const targetVelX = moveDir.x * targetSpeed;
0111 |     const targetVelZ = moveDir.z * targetSpeed;
0112 |     this.velocity.x += (targetVelX - this.velocity.x) * clamp(dt * accelRate, 0, 1);
0113 |     this.velocity.z += (targetVelZ - this.velocity.z) * clamp(dt * accelRate, 0, 1);
0114 | 
0115 |     // 5. Jump & Vertical Gravity
0116 |     if (this.isGrounded) {
0117 |       if (input.jump) {
0118 |         this.velocity.y = 8.5; // Jump impulse
0119 |         this.isGrounded = false;
0120 |         this.state = 'jump';
0121 |       } else {
0122 |         this.velocity.y = 0;
0123 |       }
0124 |     } else {
0125 |       this.velocity.y -= this.gravity * dt;
0126 |       if (this.velocity.y < -0.5) {
0127 |         this.state = 'fall';
0128 |       }
0129 |     }
0130 | 
0131 |     // 6. Swept Collision & Position Update
0132 |     const nextPos = this.position.clone();
0133 |     nextPos.x += this.velocity.x * dt;
0134 |     nextPos.z += this.velocity.z * dt;
0135 |     nextPos.y += this.velocity.y * dt;
0136 | 
0137 |     // Ground check (road / sidewalk / terrain)
0138 |     if (nextPos.y <= 0) {
0139 |       nextPos.y = 0;
0140 |       this.velocity.y = 0;
0141 |       this.isGrounded = true;
0142 |     }
0143 | 
0144 |     // World obstacle collision response
0145 |     const colTest = streamer.testCollision(nextPos, 0.45);
0146 |     if (colTest.hit) {
0147 |       // Slide along wall normal
0148 |       const dot = this.velocity.dot(colTest.normal);
0149 |       if (dot < 0) {
0150 |         this.velocity.sub(colTest.normal.clone().multiplyScalar(dot));
0151 |       }
0152 |       nextPos.x = this.position.x + this.velocity.x * dt;
0153 |       nextPos.z = this.position.z + this.velocity.z * dt;
0154 |     }
0155 | 
0156 |     this.position.copy(nextPos);
0157 |     this.model.mesh.position.copy(this.position);
0158 | 
0159 |     // 7. Rotation Orientation
0160 |     if (this.isAiming) {
0161 |       // Face camera look direction while aiming
0162 |       this.facingAngle = this.camera.azimuth + Math.PI;
0163 |     } else if (isMoving) {
0164 |       // Face movement direction
0165 |       const moveAngle = Math.atan2(this.velocity.x, this.velocity.z);
0166 |       this.facingAngle = lerpAngle(this.facingAngle, moveAngle, dt * 14);
0167 |     }
0168 |     this.model.mesh.rotation.y = this.facingAngle;
0169 | 
0170 |     // 8. Locomotion Animation
0171 |     const horizontalSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
0172 |     this.model.updateAnimation(this.state, horizontalSpeed, dt, this.isAiming);
0173 | 
0174 |     // 9. Camera Update
0175 |     this.camera.update(this.position, dt, input.sprint, streamer.allColliders);
0176 |   }
0177 | 
0178 |   public getActiveWeapon(): { def: any; item: InventoryItem } {
0179 |     const item = this.inventory[this.activeWeaponIndex] || this.inventory[0];
0180 |     const def = CANONICAL_WEAPONS.find(w => w.id === item.weaponId) || CANONICAL_WEAPONS[0];
0181 |     return { def, item };
0182 |   }
0183 | 
0184 |   public takeDamage(amount: number): void {
0185 |     if (this.stats.armor > 0) {
0186 |       const absorbed = Math.min(this.stats.armor, amount);
0187 |       this.stats.armor -= absorbed;
0188 |       amount -= absorbed;
0189 |     }
0190 |     this.stats.health = Math.max(0, this.stats.health - amount);
0191 |     eventBus.emit('PLAYER_DAMAGED', { health: this.stats.health, armor: this.stats.armor });
0192 |   }
0193 | 
0194 |   public addCash(amount: number): void {
0195 |     this.stats.cash += amount;
0196 |     eventBus.emit('CASH_CHANGED', this.stats.cash);
0197 |   }
0198 | }
0199 | 
```

---

## 35. `src/vehicles/vehicleFactory.ts`

<a id="src-vehicles-vehiclefactory-ts"></a>

**Role:** Procedural 3D model generator for cars, bikes, boats, helicopters, and tanks.

- **File Path:** `src/vehicles/vehicleFactory.ts`
- **Total Lines:** 248
- **Size:** 9.47 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { VehicleDefinition } from '../core/types';
0003 | import { materialLib } from '../rendering/materials';
0004 | 
0005 | export class VehicleFactory {
0006 |   /**
0007 |    * Builds the procedural 3D model for any canonical vehicle definition
0008 |    */
0009 |   public static createVehicleModel(def: VehicleDefinition): {
0010 |     group: THREE.Group;
0011 |     wheels: THREE.Mesh[];
0012 |     turret?: THREE.Group;
0013 |     rotor?: THREE.Group;
0014 |     sirenLights?: THREE.Mesh[];
0015 |   } {
0016 |     const group = new THREE.Group();
0017 |     group.name = `veh_${def.id}`;
0018 |     const wheels: THREE.Mesh[] = [];
0019 |     let turret: THREE.Group | undefined;
0020 |     let rotor: THREE.Group | undefined;
0021 |     let sirenLights: THREE.Mesh[] | undefined;
0022 | 
0023 |     // Body Paint Material
0024 |     const paintMat = new THREE.MeshStandardMaterial({
0025 |       color: new THREE.Color(def.color),
0026 |       roughness: 0.35,
0027 |       metalness: 0.75
0028 |     });
0029 | 
0030 |     if (def.class === 'tank') {
0031 |       // 1. Light Tank (AR-7 Mastiff)
0032 |       const hullGeo = new THREE.BoxGeometry(def.dimensions.width, 1.4, def.dimensions.length);
0033 |       const hullMesh = new THREE.Mesh(hullGeo, paintMat);
0034 |       hullMesh.position.y = 1.0;
0035 |       hullMesh.castShadow = true;
0036 |       group.add(hullMesh);
0037 | 
0038 |       // Dual continuous track assemblies
0039 |       const trackGeo = new THREE.BoxGeometry(0.65, 0.8, def.dimensions.length + 0.4);
0040 |       const leftTrack = new THREE.Mesh(trackGeo, materialLib.vehicleTire);
0041 |       leftTrack.position.set(-def.dimensions.width / 2, 0.5, 0);
0042 |       group.add(leftTrack);
0043 | 
0044 |       const rightTrack = new THREE.Mesh(trackGeo, materialLib.vehicleTire);
0045 |       rightTrack.position.set(def.dimensions.width / 2, 0.5, 0);
0046 |       group.add(rightTrack);
0047 | 
0048 |       // Rotating Turret
0049 |       turret = new THREE.Group();
0050 |       turret.position.set(0, 1.7, -0.2);
0051 | 
0052 |       const turretBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 2.5), paintMat);
0053 |       turretBody.castShadow = true;
0054 |       turret.add(turretBody);
0055 | 
0056 |       // Long cannon barrel
0057 |       const cannonGeo = new THREE.CylinderGeometry(0.16, 0.2, 4.2, 12);
0058 |       cannonGeo.rotateX(Math.PI / 2);
0059 |       const cannonMesh = new THREE.Mesh(cannonGeo, materialLib.vehicleChrome);
0060 |       cannonMesh.position.set(0, 0.1, 2.8);
0061 |       cannonMesh.castShadow = true;
0062 |       turret.add(cannonMesh);
0063 | 
0064 |       group.add(turret);
0065 |     } else if (def.class === 'helicopter') {
0066 |       // 2. Helicopter (HX-4 Sparrow)
0067 |       const podGeo = new THREE.BoxGeometry(def.dimensions.width, def.dimensions.height * 0.7, def.dimensions.length * 0.55);
0068 |       const podMesh = new THREE.Mesh(podGeo, paintMat);
0069 |       podMesh.position.y = 1.8;
0070 |       podMesh.castShadow = true;
0071 |       group.add(podMesh);
0072 | 
0073 |       // Cockpit windshield
0074 |       const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(def.dimensions.width * 0.9, 1.4, 1.8), materialLib.vehicleGlass);
0075 |       glassMesh.position.set(0, 2.0, 1.5);
0076 |       group.add(glassMesh);
0077 | 
0078 |       // Landing skids
0079 |       const skidGeo = new THREE.BoxGeometry(0.12, 0.12, def.dimensions.length * 0.55);
0080 |       const leftSkid = new THREE.Mesh(skidGeo, materialLib.vehicleChrome);
0081 |       leftSkid.position.set(-1.1, 0.25, 0);
0082 |       group.add(leftSkid);
0083 | 
0084 |       const rightSkid = new THREE.Mesh(skidGeo, materialLib.vehicleChrome);
0085 |       rightSkid.position.set(1.1, 0.25, 0);
0086 |       group.add(rightSkid);
0087 | 
0088 |       // Tail boom
0089 |       const boomGeo = new THREE.CylinderGeometry(0.18, 0.35, def.dimensions.length * 0.5, 8);
0090 |       boomGeo.rotateX(Math.PI / 2);
0091 |       const boomMesh = new THREE.Mesh(boomGeo, paintMat);
0092 |       boomMesh.position.set(0, 1.9, -def.dimensions.length * 0.38);
0093 |       group.add(boomMesh);
0094 | 
0095 |       // Main spinning rotor assembly
0096 |       rotor = new THREE.Group();
0097 |       rotor.position.set(0, 3.2, 0);
0098 | 
0099 |       const bladeGeo = new THREE.BoxGeometry(8.5, 0.06, 0.35);
0100 |       const blade1 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
0101 |       rotor.add(blade1);
0102 |       const blade2 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
0103 |       blade2.rotation.y = Math.PI / 2;
0104 |       rotor.add(blade2);
0105 | 
0106 |       group.add(rotor);
0107 |     } else if (def.class === 'boat') {
0108 |       // 3. Speedboat (TideRunner 24)
0109 |       const hullGeo = new THREE.BoxGeometry(def.dimensions.width, 1.1, def.dimensions.length);
0110 |       const hullMesh = new THREE.Mesh(hullGeo, paintMat);
0111 |       hullMesh.position.y = 0.55;
0112 |       hullMesh.castShadow = true;
0113 |       group.add(hullMesh);
0114 | 
0115 |       // Angled windshield
0116 |       const glass = new THREE.Mesh(new THREE.BoxGeometry(def.dimensions.width * 0.85, 0.7, 1.4), materialLib.vehicleGlass);
0117 |       glass.position.set(0, 1.35, 0.8);
0118 |       group.add(glass);
0119 | 
0120 |       // Dual outboard motors
0121 |       const motor1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome);
0122 |       motor1.position.set(-0.6, 0.6, -def.dimensions.length / 2 - 0.2);
0123 |       group.add(motor1);
0124 | 
0125 |       const motor2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome);
0126 |       motor2.position.set(0.6, 0.6, -def.dimensions.length / 2 - 0.2);
0127 |       group.add(motor2);
0128 |     } else if (def.class === 'motorbike') {
0129 |       // 4. Motorbike (Kite 600)
0130 |       const frameGeo = new THREE.BoxGeometry(0.5, 0.8, 1.6);
0131 |       const frameMesh = new THREE.Mesh(frameGeo, paintMat);
0132 |       frameMesh.position.y = 0.7;
0133 |       frameMesh.castShadow = true;
0134 |       group.add(frameMesh);
0135 | 
0136 |       // Handlebars
0137 |       const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8);
0138 |       barGeo.rotateZ(Math.PI / 2);
0139 |       const barMesh = new THREE.Mesh(barGeo, materialLib.vehicleChrome);
0140 |       barMesh.position.set(0, 1.1, 0.5);
0141 |       group.add(barMesh);
0142 | 
0143 |       // Front & Rear Wheels
0144 |       const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.18, 16);
0145 |       wheelGeo.rotateZ(Math.PI / 2);
0146 | 
0147 |       const frontW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0148 |       frontW.position.set(0, 0.35, 0.9);
0149 |       wheels.push(frontW);
0150 |       group.add(frontW);
0151 | 
0152 |       const rearW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0153 |       rearW.position.set(0, 0.35, -0.9);
0154 |       wheels.push(rearW);
0155 |       group.add(rearW);
0156 |     } else {
0157 |       // 5. Standard 4-Wheeled Vehicles (Sports Coupe, Sedan, Pickup, Van, Compact, Police)
0158 |       const { width, height, length } = def.dimensions;
0159 | 
0160 |       // Chassis Body
0161 |       const bodyGeo = new THREE.BoxGeometry(width, height * 0.55, length);
0162 |       const bodyMesh = new THREE.Mesh(bodyGeo, paintMat);
0163 |       bodyMesh.position.y = height * 0.45;
0164 |       bodyMesh.castShadow = true;
0165 |       group.add(bodyMesh);
0166 | 
0167 |       // Cabin / Greenhouse Glass Roof
0168 |       const cabinLength = length * (def.class === 'pickup' ? 0.4 : def.class === 'van' ? 0.85 : 0.55);
0169 |       const cabinGeo = new THREE.BoxGeometry(width * 0.85, height * 0.45, cabinLength);
0170 |       const cabinMesh = new THREE.Mesh(cabinGeo, materialLib.vehicleGlass);
0171 |       const cabinZOffset = def.class === 'pickup' ? 0.4 : def.class === 'van' ? -0.2 : -0.15;
0172 |       cabinMesh.position.set(0, height * 0.85, cabinZOffset);
0173 |       cabinMesh.castShadow = true;
0174 |       group.add(cabinMesh);
0175 | 
0176 |       // Headlights & Taillights
0177 |       const hlGeo = new THREE.BoxGeometry(0.35, 0.15, 0.08);
0178 |       const hlLeft = new THREE.Mesh(hlGeo, materialLib.vehicleHeadlight);
0179 |       hlLeft.position.set(-width / 2 + 0.3, height * 0.45, length / 2 + 0.02);
0180 |       group.add(hlLeft);
0181 | 
0182 |       const hlRight = new THREE.Mesh(hlGeo, materialLib.vehicleHeadlight);
0183 |       hlRight.position.set(width / 2 - 0.3, height * 0.45, length / 2 + 0.02);
0184 |       group.add(hlRight);
0185 | 
0186 |       const tlLeft = new THREE.Mesh(hlGeo, materialLib.vehicleTaillight);
0187 |       tlLeft.position.set(-width / 2 + 0.3, height * 0.45, -length / 2 - 0.02);
0188 |       group.add(tlLeft);
0189 | 
0190 |       const tlRight = new THREE.Mesh(hlGeo, materialLib.vehicleTaillight);
0191 |       tlRight.position.set(width / 2 - 0.3, height * 0.45, -length / 2 - 0.02);
0192 |       group.add(tlRight);
0193 | 
0194 |       // Police Strobe Lightbar
0195 |       if (def.class === 'police') {
0196 |         sirenLights = [];
0197 |         const lightbarGeo = new THREE.BoxGeometry(width * 0.65, 0.14, 0.28);
0198 |         const barBase = new THREE.Mesh(lightbarGeo, materialLib.vehicleChrome);
0199 |         barBase.position.set(0, height * 1.12, 0);
0200 |         group.add(barBase);
0201 | 
0202 |         const sirenR = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.24), materialLib.vehicleSirenRed);
0203 |         sirenR.position.set(-width * 0.18, height * 1.13, 0);
0204 |         group.add(sirenR);
0205 |         sirenLights.push(sirenR);
0206 | 
0207 |         const sirenB = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.24), materialLib.vehicleSirenBlue);
0208 |         sirenB.position.set(width * 0.18, height * 1.13, 0);
0209 |         group.add(sirenB);
0210 |         sirenLights.push(sirenB);
0211 |       }
0212 | 
0213 |       // 4 Wheels
0214 |       const wheelRadius = height * 0.26;
0215 |       const wheelWidth = 0.28;
0216 |       const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 16);
0217 |       wheelGeo.rotateZ(Math.PI / 2);
0218 | 
0219 |       const xOff = width / 2 - 0.08;
0220 |       const zOffFront = length * 0.3;
0221 |       const zOffRear = -length * 0.3;
0222 | 
0223 |       // Front-Left, Front-Right, Rear-Left, Rear-Right
0224 |       const fl = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0225 |       fl.position.set(-xOff, wheelRadius, zOffFront);
0226 |       wheels.push(fl);
0227 |       group.add(fl);
0228 | 
0229 |       const fr = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0230 |       fr.position.set(xOff, wheelRadius, zOffFront);
0231 |       wheels.push(fr);
0232 |       group.add(fr);
0233 | 
0234 |       const rl = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0235 |       rl.position.set(-xOff, wheelRadius, zOffRear);
0236 |       wheels.push(rl);
0237 |       group.add(rl);
0238 | 
0239 |       const rr = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0240 |       rr.position.set(xOff, wheelRadius, zOffRear);
0241 |       wheels.push(rr);
0242 |       group.add(rr);
0243 |     }
0244 | 
0245 |     return { group, wheels, turret, rotor, sirenLights };
0246 |   }
0247 | }
0248 | 
```

---

## 36. `src/vehicles/vehicleController.ts`

<a id="src-vehicles-vehiclecontroller-ts"></a>

**Role:** Vehicle physics controller handling suspension, drifting, flight lift, and tank turret.

- **File Path:** `src/vehicles/vehicleController.ts`
- **Total Lines:** 301
- **Size:** 9.01 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { VehicleDefinition } from '../core/types';
0003 | import { InputState } from '../core/input';
0004 | import { clamp, lerp } from '../core/math';
0005 | import { soundEngine } from '../core/audio';
0006 | import { ParticleSystem } from '../rendering/particles';
0007 | import { StaticCollider } from '../world/sectorBuilder';
0008 | 
0009 | export class VehicleInstance {
0010 |   public def: VehicleDefinition;
0011 |   public mesh: THREE.Group;
0012 |   public wheels: THREE.Mesh[] = [];
0013 |   public turret?: THREE.Group;
0014 |   public rotor?: THREE.Group;
0015 |   public sirenLights?: THREE.Mesh[];
0016 | 
0017 |   public position: THREE.Vector3 = new THREE.Vector3();
0018 |   public velocity: THREE.Vector3 = new THREE.Vector3();
0019 |   public rotationY: number = 0;
0020 |   public speed: number = 0; // m/s
0021 |   public steerAngle: number = 0;
0022 |   public isPlayerControlled: boolean = false;
0023 | 
0024 |   // Helicopter flight state
0025 |   public altitude: number = 0;
0026 |   public rotorSpeed: number = 0;
0027 |   public pitch: number = 0;
0028 |   public roll: number = 0;
0029 | 
0030 |   // Tank state
0031 |   public turretAngle: number = 0;
0032 | 
0033 |   // Damage & Health
0034 |   public health: number = 1000;
0035 |   public isDestroyed: boolean = false;
0036 |   private smokeTimer: number = 0;
0037 |   private sirenTimer: number = 0;
0038 | 
0039 |   constructor(
0040 |     def: VehicleDefinition,
0041 |     modelData: {
0042 |       group: THREE.Group;
0043 |       wheels: THREE.Mesh[];
0044 |       turret?: THREE.Group;
0045 |       rotor?: THREE.Group;
0046 |       sirenLights?: THREE.Mesh[];
0047 |     },
0048 |     spawnPos: THREE.Vector3,
0049 |     spawnRotY: number = 0
0050 |   ) {
0051 |     this.def = def;
0052 |     this.mesh = modelData.group;
0053 |     this.wheels = modelData.wheels;
0054 |     this.turret = modelData.turret;
0055 |     this.rotor = modelData.rotor;
0056 |     this.sirenLights = modelData.sirenLights;
0057 | 
0058 |     this.position.copy(spawnPos);
0059 |     this.rotationY = spawnRotY;
0060 |     this.mesh.position.copy(this.position);
0061 |     this.mesh.rotation.y = this.rotationY;
0062 |   }
0063 | 
0064 |   public update(
0065 |     input: InputState | null,
0066 |     dt: number,
0067 |     particles: ParticleSystem,
0068 |     colliders: StaticCollider[],
0069 |     targetAimAngle?: number
0070 |   ): void {
0071 |     if (this.isDestroyed) return;
0072 | 
0073 |     if (this.def.isAircraft) {
0074 |       this.updateHelicopter(input, dt, particles);
0075 |     } else if (this.def.hasTurret) {
0076 |       this.updateTank(input, dt, particles, colliders, targetAimAngle);
0077 |     } else {
0078 |       this.updateCar(input, dt, particles, colliders);
0079 |     }
0080 | 
0081 |     // Damage effects (smoke / fire when health drops)
0082 |     if (this.health < 400) {
0083 |       this.smokeTimer += dt;
0084 |       if (this.smokeTimer > 0.08) {
0085 |         this.smokeTimer = 0;
0086 |         const hoodPos = this.position.clone().add(
0087 |           new THREE.Vector3(0, 1.2, 0).add(
0088 |             new THREE.Vector3(0, 0, this.def.dimensions.length * 0.4).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationY)
0089 |           )
0090 |         );
0091 |         particles.emitTireSmoke(hoodPos);
0092 |       }
0093 |     }
0094 | 
0095 |     // Police Siren animation
0096 |     if (this.sirenLights && this.sirenLights.length >= 2) {
0097 |       this.sirenTimer += dt * 8;
0098 |       const isRed = Math.floor(this.sirenTimer) % 2 === 0;
0099 |       this.sirenLights[0].visible = isRed;
0100 |       this.sirenLights[1].visible = !isRed;
0101 |     }
0102 | 
0103 |     // Sync 3D mesh
0104 |     this.mesh.position.copy(this.position);
0105 |     this.mesh.rotation.y = this.rotationY;
0106 |   }
0107 | 
0108 |   /**
0109 |    * 4-Wheeled Ground Vehicle Physics (Cars, Pickups, Vans, Bikes, Police)
0110 |    */
0111 |   private updateCar(
0112 |     input: InputState | null,
0113 |     dt: number,
0114 |     particles: ParticleSystem,
0115 |     colliders: StaticCollider[]
0116 |   ): void {
0117 |     let throttle = 0;
0118 |     let steer = 0;
0119 |     let handbrake = false;
0120 | 
0121 |     if (input && this.isPlayerControlled) {
0122 |       if (input.forward) throttle += 1;
0123 |       if (input.backward) throttle -= 0.6;
0124 |       if (input.left) steer += 1;
0125 |       if (input.right) steer -= 1;
0126 |       if (input.jump) handbrake = true;
0127 |       if (input.sprint) throttle *= 1.35; // Nitro burst
0128 |     }
0129 | 
0130 |     // Steering response (speed sensitive)
0131 |     const speedRatio = Math.abs(this.speed) / this.def.topSpeed;
0132 |     const maxSteer = this.def.steerAngle * (1 - speedRatio * 0.45);
0133 |     const targetSteer = steer * maxSteer;
0134 |     this.steerAngle = lerp(this.steerAngle, targetSteer, dt * 10);
0135 | 
0136 |     // Throttle & Braking
0137 |     const accel = this.def.acceleration * (input?.sprint ? 1.35 : 1.0);
0138 |     if (throttle > 0) {
0139 |       this.speed += accel * dt;
0140 |     } else if (throttle < 0) {
0141 |       if (this.speed > 0.5) {
0142 |         this.speed -= this.def.brakeForce * dt;
0143 |       } else {
0144 |         this.speed -= accel * 0.6 * dt; // Reverse
0145 |       }
0146 |     } else {
0147 |       // Rolling drag resistance
0148 |       const drag = handbrake ? 45.0 : 8.5;
0149 |       this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), drag * dt);
0150 |     }
0151 | 
0152 |     this.speed = clamp(this.speed, -this.def.topSpeed * 0.35, this.def.topSpeed);
0153 | 
0154 |     // Turning yaw based on speed and wheel angle
0155 |     if (Math.abs(this.speed) > 0.2) {
0156 |       const turnMultiplier = handbrake ? 1.8 : 1.0;
0157 |       this.rotationY += this.steerAngle * (this.speed / 5.0) * turnMultiplier * dt;
0158 |     }
0159 | 
0160 |     // Drift smoke on handbrake
0161 |     if (handbrake && Math.abs(this.speed) > 12) {
0162 |       particles.emitTireSmoke(this.position);
0163 |     }
0164 | 
0165 |     // Velocity update
0166 |     const forwardX = Math.sin(this.rotationY);
0167 |     const forwardZ = Math.cos(this.rotationY);
0168 |     this.velocity.set(forwardX * this.speed, 0, forwardZ * this.speed);
0169 | 
0170 |     // Position integration
0171 |     const nextPos = this.position.clone().addScaledVector(this.velocity, dt);
0172 | 
0173 |     // Swept Box/Sphere obstacle collision
0174 |     const carRadius = this.def.dimensions.width * 0.6;
0175 |     for (const col of colliders) {
0176 |       if (col.box.intersectsSphere(new THREE.Sphere(nextPos, carRadius))) {
0177 |         // Crash reaction
0178 |         this.speed *= -0.3; // Bounce back
0179 |         this.health -= Math.abs(this.speed) * 8;
0180 |         particles.emitExplosion(nextPos);
0181 |         return;
0182 |       }
0183 |     }
0184 | 
0185 |     this.position.copy(nextPos);
0186 | 
0187 |     // Wheel rotation animation
0188 |     const wheelRotDelta = (this.speed / (this.def.dimensions.height * 0.26)) * dt;
0189 |     this.wheels.forEach((w, idx) => {
0190 |       w.rotation.x += wheelRotDelta;
0191 |       if (idx < 2) {
0192 |         // Front wheels turn
0193 |         w.rotation.y = this.steerAngle;
0194 |       }
0195 |     });
0196 | 
0197 |     if (this.isPlayerControlled) {
0198 |       soundEngine.updateVehicleEngine(speedRatio);
0199 |     }
0200 |   }
0201 | 
0202 |   /**
0203 |    * Helicopter Flight Physics (HX-4 Sparrow)
0204 |    */
0205 |   private updateHelicopter(input: InputState | null, dt: number, particles: ParticleSystem): void {
0206 |     let lift = 0;
0207 |     let yaw = 0;
0208 |     let pitchInput = 0;
0209 | 
0210 |     if (input && this.isPlayerControlled) {
0211 |       if (input.jump) lift += 1; // Ascend
0212 |       if (input.crouch) lift -= 1; // Descend
0213 |       if (input.forward) pitchInput += 1;
0214 |       if (input.backward) pitchInput -= 1;
0215 |       if (input.left) yaw += 1;
0216 |       if (input.right) yaw -= 1;
0217 |     }
0218 | 
0219 |     // Rotor acceleration
0220 |     this.rotorSpeed = lerp(this.rotorSpeed, 35.0, dt * 2);
0221 |     if (this.rotor) {
0222 |       this.rotor.rotation.y += this.rotorSpeed * dt;
0223 |     }
0224 | 
0225 |     // Vertical climb
0226 |     this.velocity.y += (lift * 18.0 - 9.8 * 0.8) * dt;
0227 |     this.velocity.y = clamp(this.velocity.y, -12, 18);
0228 |     this.position.y += this.velocity.y * dt;
0229 |     if (this.position.y < 0.2) {
0230 |       this.position.y = 0.2;
0231 |       this.velocity.y = 0;
0232 |     }
0233 | 
0234 |     // Yaw rotation
0235 |     this.rotationY += yaw * 1.5 * dt;
0236 | 
0237 |     // Pitch forward/backward flight propulsion
0238 |     this.pitch = lerp(this.pitch, pitchInput * 0.35, dt * 4);
0239 |     const forwardX = Math.sin(this.rotationY);
0240 |     const forwardZ = Math.cos(this.rotationY);
0241 |     const horizontalSpeed = this.pitch * this.def.topSpeed;
0242 |     this.position.x += forwardX * horizontalSpeed * dt;
0243 |     this.position.z += forwardZ * horizontalSpeed * dt;
0244 | 
0245 |     // Rotor wash on ground
0246 |     if (this.position.y < 12) {
0247 |       particles.emitTireSmoke(new THREE.Vector3(this.position.x, 0.1, this.position.z));
0248 |     }
0249 |   }
0250 | 
0251 |   /**
0252 |    * Light Tank Physics & Cannon Turret (AR-7 Mastiff)
0253 |    */
0254 |   private updateTank(
0255 |     input: InputState | null,
0256 |     dt: number,
0257 |     particles: ParticleSystem,
0258 |     colliders: StaticCollider[],
0259 |     targetAimAngle?: number
0260 |   ): void {
0261 |     let throttle = 0;
0262 |     let steer = 0;
0263 | 
0264 |     if (input && this.isPlayerControlled) {
0265 |       if (input.forward) throttle += 1;
0266 |       if (input.backward) throttle -= 0.6;
0267 |       if (input.left) steer += 1;
0268 |       if (input.right) steer -= 1;
0269 |     }
0270 | 
0271 |     // Heavy track torque
0272 |     this.speed += throttle * this.def.acceleration * dt;
0273 |     this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 15 * dt);
0274 |     this.speed = clamp(this.speed, -this.def.topSpeed * 0.4, this.def.topSpeed);
0275 | 
0276 |     // Differential steering
0277 |     this.rotationY += steer * 0.8 * dt;
0278 | 
0279 |     const fwdX = Math.sin(this.rotationY);
0280 |     const fwdZ = Math.cos(this.rotationY);
0281 |     this.position.x += fwdX * this.speed * dt;
0282 |     this.position.z += fwdZ * this.speed * dt;
0283 | 
0284 |     // Cannon Turret Tracking
0285 |     if (this.turret && targetAimAngle !== undefined) {
0286 |       const relAngle = targetAimAngle - this.rotationY;
0287 |       this.turretAngle = lerp(this.turretAngle, relAngle, dt * 6);
0288 |       this.turret.rotation.y = this.turretAngle;
0289 |     }
0290 |   }
0291 | 
0292 |   public takeDamage(amount: number, particles: ParticleSystem): void {
0293 |     this.health = Math.max(0, this.health - amount);
0294 |     if (this.health <= 0 && !this.isDestroyed) {
0295 |       this.isDestroyed = true;
0296 |       particles.emitExplosion(this.position);
0297 |       soundEngine.playGunshot('launcher');
0298 |     }
0299 |   }
0300 | }
0301 | 
```

---

## 37. `src/vehicles/vehicleManager.ts`

<a id="src-vehicles-vehiclemanager-ts"></a>

**Role:** Fleet manager handling vehicle spawning, player entry/exit, and police pursuit cruisers.

- **File Path:** `src/vehicles/vehicleManager.ts`
- **Total Lines:** 150
- **Size:** 4.82 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { CANONICAL_VEHICLES, getVehicleDef } from '../data/vehicles';
0003 | import { VehicleFactory } from './vehicleFactory';
0004 | import { VehicleInstance } from './vehicleController';
0005 | import { ParticleSystem } from '../rendering/particles';
0006 | import { StaticCollider } from '../world/sectorBuilder';
0007 | import { InputState } from '../core/input';
0008 | import { soundEngine } from '../core/audio';
0009 | import { distance2D } from '../core/math';
0010 | import { eventBus } from '../core/events';
0011 | 
0012 | export class VehicleManager {
0013 |   private scene: THREE.Scene;
0014 |   public vehicles: VehicleInstance[] = [];
0015 |   public playerVehicle: VehicleInstance | null = null;
0016 | 
0017 |   constructor(scene: THREE.Scene) {
0018 |     this.scene = scene;
0019 |     this.spawnVerticalSliceFleet();
0020 |   }
0021 | 
0022 |   /**
0023 |    * Spawns canonical showcase vehicles across Meridian and Aurelio Central
0024 |    */
0025 |   private spawnVerticalSliceFleet(): void {
0026 |     // 1. Red VX-9 Kestrel Sports Coupe (Parked near Meridian Financial Plaza)
0027 |     this.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(400, 0, 50), 0);
0028 | 
0029 |     // 2. Aurelia Regent Sedan (Parked on Aurelio Central Avenue)
0030 |     this.spawnVehicle('veh_aurelia_regent', new THREE.Vector3(20, 0, 30), Math.PI / 2);
0031 | 
0032 |     // 3. Redwood 250 Utility Pickup
0033 |     this.spawnVehicle('veh_redwood_250', new THREE.Vector3(-40, 0, -40), Math.PI);
0034 | 
0035 |     // 4. Courier L4 Panel Van
0036 |     this.spawnVehicle('veh_courier_l4', new THREE.Vector3(80, 0, -60), 0);
0037 | 
0038 |     // 5. Mica Hatch Compact
0039 |     this.spawnVehicle('veh_mica_hatch', new THREE.Vector3(-80, 0, 80), -Math.PI / 2);
0040 | 
0041 |     // 6. Kite 600 Motorbike
0042 |     this.spawnVehicle('veh_kite_600', new THREE.Vector3(15, 0, -20), 0);
0043 | 
0044 |     // 7. HX-4 Sparrow Helicopter (Parked on Aurelio Tower Sky Helipad or Plaza)
0045 |     this.spawnVehicle('veh_hx4_sparrow', new THREE.Vector3(60, 0, 120), 0);
0046 | 
0047 |     // 8. AR-7 Mastiff Light Tank (Secured at military gate / industrial staging)
0048 |     this.spawnVehicle('veh_ar7_mastiff', new THREE.Vector3(-120, 0, 160), Math.PI / 4);
0049 | 
0050 |     // 9. TideRunner 24 Speed Boat (Berth at Harborview Marina)
0051 |     this.spawnVehicle('veh_tiderunner_24', new THREE.Vector3(820, 0, 420), 0);
0052 | 
0053 |     // 10. AMPS Police Interceptor Cruiser
0054 |     this.spawnVehicle('veh_amps_cruiser', new THREE.Vector3(70, 0, 340), 0);
0055 |   }
0056 | 
0057 |   public spawnVehicle(defId: string, pos: THREE.Vector3, rotY: number = 0): VehicleInstance {
0058 |     const def = getVehicleDef(defId);
0059 |     const model = VehicleFactory.createVehicleModel(def);
0060 |     this.scene.add(model.group);
0061 | 
0062 |     const instance = new VehicleInstance(def, model, pos, rotY);
0063 |     this.vehicles.push(instance);
0064 |     return instance;
0065 |   }
0066 | 
0067 |   /**
0068 |    * Spawns an AMPS Police Cruiser for pursuit
0069 |    */
0070 |   public spawnPolicePursuitUnit(nearPos: THREE.Vector3): VehicleInstance {
0071 |     // Spawn roughly 60m away on road
0072 |     const angle = Math.random() * Math.PI * 2;
0073 |     const spawnPos = new THREE.Vector3(
0074 |       nearPos.x + Math.cos(angle) * 65,
0075 |       0,
0076 |       nearPos.z + Math.sin(angle) * 65
0077 |     );
0078 |     const unit = this.spawnVehicle('veh_amps_cruiser', spawnPos, angle);
0079 |     unit.speed = 18;
0080 |     return unit;
0081 |   }
0082 | 
0083 |   public update(
0084 |     input: InputState,
0085 |     dt: number,
0086 |     particles: ParticleSystem,
0087 |     colliders: StaticCollider[],
0088 |     playerPos: THREE.Vector3,
0089 |     targetAimAngle?: number
0090 |   ): void {
0091 |     // Check vehicle enter / exit toggle (E or F key)
0092 |     if (input.interact) {
0093 |       this.togglePlayerVehicle(playerPos);
0094 |     }
0095 | 
0096 |     for (let i = this.vehicles.length - 1; i >= 0; i--) {
0097 |       const v = this.vehicles[i];
0098 |       if (v === this.playerVehicle) {
0099 |         v.update(input, dt, particles, colliders, targetAimAngle);
0100 |       } else {
0101 |         // AI vehicle or parked
0102 |         v.update(null, dt, particles, colliders);
0103 |       }
0104 |     }
0105 |   }
0106 | 
0107 |   /**
0108 |    * Toggles mounting or dismounting the nearest vehicle
0109 |    */
0110 |   public togglePlayerVehicle(playerPos: THREE.Vector3): boolean {
0111 |     if (this.playerVehicle) {
0112 |       // Dismount vehicle
0113 |       const exitPos = this.playerVehicle.position.clone().add(
0114 |         new THREE.Vector3(this.playerVehicle.def.dimensions.width * 0.8, 0, 0).applyAxisAngle(
0115 |           new THREE.Vector3(0, 1, 0),
0116 |           this.playerVehicle.rotationY
0117 |         )
0118 |       );
0119 |       this.playerVehicle.isPlayerControlled = false;
0120 |       this.playerVehicle = null;
0121 |       soundEngine.stopVehicleEngine();
0122 |       eventBus.emit('VEHICLE_EXIT', exitPos);
0123 |       return false;
0124 |     }
0125 | 
0126 |     // Find nearest accessible vehicle within 3.8 meters
0127 |     let nearest: VehicleInstance | null = null;
0128 |     let minDist = 3.8;
0129 | 
0130 |     for (const v of this.vehicles) {
0131 |       if (v.isDestroyed) continue;
0132 |       const d = distance2D(playerPos.x, playerPos.z, v.position.x, v.position.z);
0133 |       if (d < minDist) {
0134 |         minDist = d;
0135 |         nearest = v;
0136 |       }
0137 |     }
0138 | 
0139 |     if (nearest) {
0140 |       this.playerVehicle = nearest;
0141 |       nearest.isPlayerControlled = true;
0142 |       soundEngine.startVehicleEngine();
0143 |       eventBus.emit('VEHICLE_ENTER', nearest);
0144 |       return true;
0145 |     }
0146 | 
0147 |     return false;
0148 |   }
0149 | }
0150 | 
```

---

## 38. `src/npc/npcModel.ts`

<a id="src-npc-npcmodel-ts"></a>

**Role:** Procedural 3D models for pedestrians and police officers with animated walk cycles.

- **File Path:** `src/npc/npcModel.ts`
- **Total Lines:** 89
- **Size:** 2.84 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | export type NPCArchetype = 'office_worker' | 'tourist' | 'police_officer';
0004 | 
0005 | export class NPCModel {
0006 |   public mesh: THREE.Group;
0007 |   private torso: THREE.Mesh;
0008 |   private head: THREE.Mesh;
0009 |   private leftArm: THREE.Mesh;
0010 |   private rightArm: THREE.Mesh;
0011 |   private leftLeg: THREE.Mesh;
0012 |   private rightLeg: THREE.Mesh;
0013 | 
0014 |   constructor(archetype: NPCArchetype) {
0015 |     this.mesh = new THREE.Group();
0016 | 
0017 |     // Archetype specific palette
0018 |     let shirtColor = 0x475569; // Office slate
0019 |     let pantsColor = 0x1e293b;
0020 |     if (archetype === 'tourist') {
0021 |       shirtColor = 0xf59e0b; // Bright yellow/amber Hawaiian
0022 |       pantsColor = 0xd97706;
0023 |     } else if (archetype === 'police_officer') {
0024 |       shirtColor = 0x1e3a8a; // Police navy
0025 |       pantsColor = 0x0f172a;
0026 |     }
0027 | 
0028 |     const skinMat = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.7 });
0029 |     const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.75 });
0030 |     const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
0031 |     const shoeMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.6 });
0032 | 
0033 |     // Torso
0034 |     this.torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.5, 0.24), shirtMat);
0035 |     this.torso.position.y = 1.0;
0036 |     this.torso.castShadow = true;
0037 |     this.mesh.add(this.torso);
0038 | 
0039 |     // Head
0040 |     this.head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.22), skinMat);
0041 |     this.head.position.y = 0.38;
0042 |     this.head.castShadow = true;
0043 |     this.torso.add(this.head);
0044 | 
0045 |     // Arms
0046 |     const armGeo = new THREE.BoxGeometry(0.12, 0.45, 0.12);
0047 |     this.leftArm = new THREE.Mesh(armGeo, shirtMat);
0048 |     this.leftArm.position.set(-0.28, 0.95, 0);
0049 |     this.mesh.add(this.leftArm);
0050 | 
0051 |     this.rightArm = new THREE.Mesh(armGeo, shirtMat);
0052 |     this.rightArm.position.set(0.28, 0.95, 0);
0053 |     this.mesh.add(this.rightArm);
0054 | 
0055 |     // Legs
0056 |     const legGeo = new THREE.BoxGeometry(0.16, 0.65, 0.18);
0057 |     this.leftLeg = new THREE.Mesh(legGeo, pantsMat);
0058 |     this.leftLeg.position.set(-0.12, 0.38, 0);
0059 |     this.leftLeg.castShadow = true;
0060 |     this.mesh.add(this.leftLeg);
0061 | 
0062 |     this.rightLeg = new THREE.Mesh(legGeo, pantsMat);
0063 |     this.rightLeg.position.set(0.12, 0.38, 0);
0064 |     this.rightLeg.castShadow = true;
0065 |     this.mesh.add(this.rightLeg);
0066 |   }
0067 | 
0068 |   public animate(speed: number, time: number, isDead: boolean): void {
0069 |     if (isDead) {
0070 |       this.mesh.rotation.x = -Math.PI / 2;
0071 |       this.mesh.position.y = 0.1;
0072 |       return;
0073 |     }
0074 | 
0075 |     if (speed > 0.1) {
0076 |       const legAngle = Math.sin(time * 6.0) * 0.45;
0077 |       this.leftLeg.rotation.x = legAngle;
0078 |       this.rightLeg.rotation.x = -legAngle;
0079 |       this.leftArm.rotation.x = -legAngle * 0.8;
0080 |       this.rightArm.rotation.x = legAngle * 0.8;
0081 |     } else {
0082 |       this.leftLeg.rotation.x = 0;
0083 |       this.rightLeg.rotation.x = 0;
0084 |       this.leftArm.rotation.x = 0;
0085 |       this.rightArm.rotation.x = 0;
0086 |     }
0087 |   }
0088 | }
0089 | 
```

---

## 39. `src/npc/npcManager.ts`

<a id="src-npc-npcmanager-ts"></a>

**Role:** Crowd manager handling pedestrian schedules, fleeing reactions, and police retaliatory combat.

- **File Path:** `src/npc/npcManager.ts`
- **Total Lines:** 114
- **Size:** 3.36 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { NPCModel, NPCArchetype } from './npcModel';
0003 | import { distance2D } from '../core/math';
0004 | import { eventBus } from '../core/events';
0005 | 
0006 | export interface NPCInstance {
0007 |   id: string;
0008 |   archetype: NPCArchetype;
0009 |   model: NPCModel;
0010 |   position: THREE.Vector3;
0011 |   velocity: THREE.Vector3;
0012 |   state: 'idle' | 'walk' | 'flee' | 'combat' | 'dead';
0013 |   health: number;
0014 |   isDead: boolean;
0015 |   takeDamage: (dmg: number) => void;
0016 | }
0017 | 
0018 | export class NPCManager {
0019 |   private scene: THREE.Scene;
0020 |   public npcs: NPCInstance[] = [];
0021 |   private animTimer = 0;
0022 | 
0023 |   constructor(scene: THREE.Scene) {
0024 |     this.scene = scene;
0025 |     this.spawnVerticalSlicePopulation();
0026 |   }
0027 | 
0028 |   private spawnVerticalSlicePopulation(): void {
0029 |     const archetypes: NPCArchetype[] = ['office_worker', 'tourist', 'police_officer'];
0030 | 
0031 |     // Spawn 18 pedestrians scattered along sidewalks in Meridian Core and Aurelio Central
0032 |     for (let i = 0; i < 18; i++) {
0033 |       const arch = archetypes[i % archetypes.length];
0034 |       const model = new NPCModel(arch);
0035 |       this.scene.add(model.mesh);
0036 | 
0037 |       const angle = (i / 18) * Math.PI * 2;
0038 |       const radius = 25 + Math.random() * 45;
0039 |       const pos = new THREE.Vector3(
0040 |         Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
0041 |         0,
0042 |         Math.sin(angle) * radius + (Math.random() - 0.5) * 20
0043 |       );
0044 |       model.mesh.position.copy(pos);
0045 | 
0046 |       const npc: NPCInstance = {
0047 |         id: `npc_${i}`,
0048 |         archetype: arch,
0049 |         model,
0050 |         position: pos,
0051 |         velocity: new THREE.Vector3(),
0052 |         state: 'walk',
0053 |         health: 100,
0054 |         isDead: false,
0055 |         takeDamage: (dmg: number) => {
0056 |           if (npc.isDead) return;
0057 |           npc.health -= dmg;
0058 |           if (npc.health <= 0) {
0059 |             npc.isDead = true;
0060 |             npc.state = 'dead';
0061 |             eventBus.emit('NPC_KILLED', { id: npc.id, archetype: npc.archetype });
0062 |           } else {
0063 |             npc.state = 'flee';
0064 |           }
0065 |         }
0066 |       };
0067 | 
0068 |       this.npcs.push(npc);
0069 |     }
0070 |   }
0071 | 
0072 |   public update(dt: number, playerPos: THREE.Vector3, isGunfireNear: boolean): void {
0073 |     this.animTimer += dt;
0074 | 
0075 |     for (const npc of this.npcs) {
0076 |       if (npc.isDead) {
0077 |         npc.model.animate(0, this.animTimer, true);
0078 |         continue;
0079 |       }
0080 | 
0081 |       const distToPlayer = distance2D(npc.position.x, npc.position.z, playerPos.x, playerPos.z);
0082 | 
0083 |       // React to gunfire or close danger by fleeing
0084 |       if (isGunfireNear && distToPlayer < 40 && npc.state !== 'flee') {
0085 |         npc.state = 'flee';
0086 |         eventBus.emit('WITNESS_EVENT', { position: npc.position });
0087 |       }
0088 | 
0089 |       if (npc.state === 'flee') {
0090 |         // Run away from player
0091 |         const fleeDir = npc.position.clone().sub(playerPos).setY(0).normalize();
0092 |         npc.velocity.copy(fleeDir).multiplyScalar(5.5);
0093 |       } else if (npc.state === 'walk') {
0094 |         // Ambient wandering along sidewalks
0095 |         if (Math.random() < 0.02) {
0096 |           const wanderAngle = Math.random() * Math.PI * 2;
0097 |           npc.velocity.set(Math.cos(wanderAngle) * 1.8, 0, Math.sin(wanderAngle) * 1.8);
0098 |         }
0099 |       }
0100 | 
0101 |       // Position step
0102 |       npc.position.addScaledVector(npc.velocity, dt);
0103 |       npc.model.mesh.position.copy(npc.position);
0104 | 
0105 |       if (npc.velocity.lengthSq() > 0.01) {
0106 |         npc.model.mesh.rotation.y = Math.atan2(npc.velocity.x, npc.velocity.z);
0107 |       }
0108 | 
0109 |       const speed = npc.velocity.length();
0110 |       npc.model.animate(speed, this.animTimer, false);
0111 |     }
0112 |   }
0113 | }
0114 | 
```

---

## 40. `src/combat/combatSystem.ts`

<a id="src-combat-combatsystem-ts"></a>

**Role:** Combat engine managing weapon firing, hitscan raycasting, rockets, recoil, and damage.

- **File Path:** `src/combat/combatSystem.ts`
- **Total Lines:** 174
- **Size:** 5.47 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { PlayerController } from '../player/playerController';
0003 | import { VehicleManager } from '../vehicles/vehicleManager';
0004 | import { ParticleSystem } from '../rendering/particles';
0005 | import { soundEngine } from '../core/audio';
0006 | import { InputState } from '../core/input';
0007 | import { eventBus } from '../core/events';
0008 | import { distance3D } from '../core/math';
0009 | 
0010 | interface ActiveRocket {
0011 |   position: THREE.Vector3;
0012 |   velocity: THREE.Vector3;
0013 |   life: number;
0014 | }
0015 | 
0016 | export class CombatSystem {
0017 |   private scene: THREE.Scene;
0018 |   private fireTimer = 0;
0019 |   private isReloading = false;
0020 |   private reloadTimer = 0;
0021 |   private activeRockets: ActiveRocket[] = [];
0022 | 
0023 |   constructor(scene: THREE.Scene) {
0024 |     this.scene = scene;
0025 |   }
0026 | 
0027 |   public update(
0028 |     input: InputState,
0029 |     dt: number,
0030 |     player: PlayerController,
0031 |     vehicleMgr: VehicleManager,
0032 |     particles: ParticleSystem,
0033 |     npcTargets: { position: THREE.Vector3; takeDamage: (dmg: number) => void; isDead: boolean }[] = []
0034 |   ): void {
0035 |     const { def, item } = player.getActiveWeapon();
0036 | 
0037 |     // Reload handling
0038 |     if (this.isReloading) {
0039 |       this.reloadTimer -= dt;
0040 |       if (this.reloadTimer <= 0) {
0041 |         this.isReloading = false;
0042 |         const needed = def.magazineSize - item.ammo;
0043 |         const toLoad = Math.min(needed, item.reserveAmmo);
0044 |         item.ammo += toLoad;
0045 |         item.reserveAmmo -= toLoad;
0046 |         eventBus.emit('WEAPON_RELOADED', item);
0047 |       }
0048 |     } else if (input.reload && item.ammo < def.magazineSize && item.reserveAmmo > 0) {
0049 |       this.startReload(def.reloadTime);
0050 |     }
0051 | 
0052 |     // Firing cooldown
0053 |     this.fireTimer -= dt;
0054 | 
0055 |     // Trigger firing (Left Click)
0056 |     if (input.fire && this.fireTimer <= 0 && !this.isReloading) {
0057 |       if (item.ammo > 0) {
0058 |         this.fireWeapon(def, item, player, vehicleMgr, particles, npcTargets);
0059 |         this.fireTimer = 1 / def.fireRate;
0060 |       } else if (item.reserveAmmo > 0) {
0061 |         this.startReload(def.reloadTime);
0062 |       }
0063 |     }
0064 | 
0065 |     // Update active launcher rockets
0066 |     for (let i = this.activeRockets.length - 1; i >= 0; i--) {
0067 |       const rocket = this.activeRockets[i];
0068 |       rocket.life -= dt;
0069 |       rocket.position.addScaledVector(rocket.velocity, dt);
0070 | 
0071 |       // Rocket trail smoke
0072 |       particles.emitTireSmoke(rocket.position);
0073 | 
0074 |       // Check ground or target proximity
0075 |       let exploded = rocket.life <= 0 || rocket.position.y <= 0.2;
0076 | 
0077 |       // Check vehicle hits
0078 |       for (const v of vehicleMgr.vehicles) {
0079 |         if (!v.isDestroyed && distance3D([rocket.position.x, rocket.position.y, rocket.position.z], [v.position.x, v.position.y, v.position.z]) < 3.5) {
0080 |           v.takeDamage(def.damage, particles);
0081 |           exploded = true;
0082 |           break;
0083 |         }
0084 |       }
0085 | 
0086 |       // Check NPC hits
0087 |       for (const npc of npcTargets) {
0088 |         if (!npc.isDead && distance3D([rocket.position.x, rocket.position.y, rocket.position.z], [npc.position.x, npc.position.y, npc.position.z]) < 4.0) {
0089 |           npc.takeDamage(def.damage);
0090 |           exploded = true;
0091 |         }
0092 |       }
0093 | 
0094 |       if (exploded) {
0095 |         particles.emitExplosion(rocket.position);
0096 |         soundEngine.playGunshot('launcher');
0097 |         this.activeRockets.splice(i, 1);
0098 |       }
0099 |     }
0100 |   }
0101 | 
0102 |   private startReload(reloadDuration: number): void {
0103 |     this.isReloading = true;
0104 |     this.reloadTimer = reloadDuration;
0105 |     soundEngine.playReload();
0106 |   }
0107 | 
0108 |   private fireWeapon(
0109 |     def: any,
0110 |     item: any,
0111 |     player: PlayerController,
0112 |     vehicleMgr: VehicleManager,
0113 |     particles: ParticleSystem,
0114 |     npcTargets: { position: THREE.Vector3; takeDamage: (dmg: number) => void; isDead: boolean }[]
0115 |   ): void {
0116 |     item.ammo--;
0117 |     soundEngine.playGunshot(def.class);
0118 | 
0119 |     // Muzzle flash particle
0120 |     const muzzlePos = player.position.clone().add(new THREE.Vector3(0, 1.4, 0));
0121 |     const aimDir = new THREE.Vector3();
0122 |     player.camera.camera.getWorldDirection(aimDir);
0123 | 
0124 |     // Add spread inaccuracy
0125 |     aimDir.x += (Math.random() - 0.5) * def.spread;
0126 |     aimDir.y += (Math.random() - 0.5) * def.spread;
0127 |     aimDir.z += (Math.random() - 0.5) * def.spread;
0128 |     aimDir.normalize();
0129 | 
0130 |     particles.emitMuzzleFlash(muzzlePos, aimDir);
0131 | 
0132 |     // Ramjet Launcher rocket projectile
0133 |     if (def.class === 'launcher') {
0134 |       this.activeRockets.push({
0135 |         position: muzzlePos.clone(),
0136 |         velocity: aimDir.clone().multiplyScalar(45),
0137 |         life: 3.5
0138 |       });
0139 |       eventBus.emit('WEAPON_FIRED', { weapon: def, ammoLeft: item.ammo });
0140 |       return;
0141 |     }
0142 | 
0143 |     // Hitscan Raycast
0144 |     const ray = new THREE.Ray(muzzlePos, aimDir);
0145 | 
0146 |     // Check hit against Vehicles
0147 |     for (const v of vehicleMgr.vehicles) {
0148 |       if (v.isDestroyed) continue;
0149 |       const sphere = new THREE.Sphere(v.position.clone().add(new THREE.Vector3(0, 1, 0)), v.def.dimensions.width);
0150 |       const hit = ray.intersectSphere(sphere, new THREE.Vector3());
0151 |       if (hit && muzzlePos.distanceTo(hit) <= def.range) {
0152 |         v.takeDamage(def.damage, particles);
0153 |         particles.emitExplosion(hit);
0154 |         eventBus.emit('COMBAT_HIT', { target: 'vehicle', id: v.def.id });
0155 |         break;
0156 |       }
0157 |     }
0158 | 
0159 |     // Check hit against NPCs
0160 |     for (const npc of npcTargets) {
0161 |       if (npc.isDead) continue;
0162 |       const sphere = new THREE.Sphere(npc.position.clone().add(new THREE.Vector3(0, 1, 0)), 0.6);
0163 |       const hit = ray.intersectSphere(sphere, new THREE.Vector3());
0164 |       if (hit && muzzlePos.distanceTo(hit) <= def.range) {
0165 |         npc.takeDamage(def.damage);
0166 |         eventBus.emit('COMBAT_HIT', { target: 'npc' });
0167 |         break;
0168 |       }
0169 |     }
0170 | 
0171 |     eventBus.emit('WEAPON_FIRED', { weapon: def, ammoLeft: item.ammo });
0172 |   }
0173 | }
0174 | 
```

---

## 41. `src/law/wantedSystem.ts`

<a id="src-law-wantedsystem-ts"></a>

**Role:** 0-5 Star Wanted heat escalation manager with witness reporting and evasion cooldown.

- **File Path:** `src/law/wantedSystem.ts`
- **Total Lines:** 94
- **Size:** 3.13 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { WantedLevel } from '../core/types';
0003 | import { VehicleManager } from '../vehicles/vehicleManager';
0004 | import { soundEngine } from '../core/audio';
0005 | import { eventBus } from '../core/events';
0006 | import { distance2D } from '../core/math';
0007 | 
0008 | export class WantedSystem {
0009 |   public heat: WantedLevel = 0;
0010 |   public lastKnownPosition: THREE.Vector3 = new THREE.Vector3();
0011 |   public searchRadius: number = 0;
0012 |   public isCoolingDown: boolean = false;
0013 |   public cooldownTimer: number = 0;
0014 | 
0015 |   private spawnCooldown: number = 0;
0016 |   private activePursuitCruiser: any = null;
0017 | 
0018 |   constructor() {
0019 |     // Listen for criminal acts
0020 |     eventBus.on('WEAPON_FIRED', () => this.addCrimeWeight(1));
0021 |     eventBus.on('WITNESS_EVENT', () => this.addCrimeWeight(2));
0022 |     eventBus.on('COMBAT_HIT', (data: any) => {
0023 |       if (data?.target === 'npc') this.addCrimeWeight(4);
0024 |       if (data?.target === 'vehicle') this.addCrimeWeight(2);
0025 |     });
0026 |     eventBus.on('NPC_KILLED', () => this.addCrimeWeight(6));
0027 |   }
0028 | 
0029 |   public setHeat(level: WantedLevel): void {
0030 |     const prev = this.heat;
0031 |     this.heat = level;
0032 |     if (this.heat > 0) {
0033 |       this.searchRadius = 75 + this.heat * 35;
0034 |       this.cooldownTimer = 18;
0035 |       this.isCoolingDown = false;
0036 |       soundEngine.setPoliceSiren(true);
0037 |     } else {
0038 |       this.searchRadius = 0;
0039 |       this.isCoolingDown = false;
0040 |       soundEngine.setPoliceSiren(false);
0041 |     }
0042 |     if (prev !== this.heat) {
0043 |       eventBus.emit('HEAT_CHANGED', this.heat);
0044 |     }
0045 |   }
0046 | 
0047 |   public addCrimeWeight(weight: number): void {
0048 |     if (this.heat === 0) {
0049 |       this.setHeat(1);
0050 |     } else if (weight >= 4 && this.heat < 5) {
0051 |       this.setHeat((this.heat + 1) as WantedLevel);
0052 |     }
0053 |   }
0054 | 
0055 |   public update(dt: number, playerPos: THREE.Vector3, vehicleMgr: VehicleManager): void {
0056 |     if (this.heat === 0) return;
0057 | 
0058 |     const distToLKP = distance2D(playerPos.x, playerPos.z, this.lastKnownPosition.x, this.lastKnownPosition.z);
0059 | 
0060 |     // If player is outside search radius, trigger cooldown
0061 |     if (distToLKP > this.searchRadius) {
0062 |       this.isCoolingDown = true;
0063 |       this.cooldownTimer -= dt;
0064 |       if (this.cooldownTimer <= 0) {
0065 |         // Successfully evaded police!
0066 |         this.setHeat(0);
0067 |         soundEngine.playMissionStinger();
0068 |         return;
0069 |       }
0070 |     } else {
0071 |       // Player is still inside police search radius
0072 |       this.isCoolingDown = false;
0073 |       this.cooldownTimer = 15;
0074 |       this.lastKnownPosition.copy(playerPos);
0075 |     }
0076 | 
0077 |     // Spawn pursuit cruiser if none active or far away
0078 |     this.spawnCooldown -= dt;
0079 |     if (this.spawnCooldown <= 0 && this.heat >= 2) {
0080 |       this.spawnCooldown = 12;
0081 |       this.activePursuitCruiser = vehicleMgr.spawnPolicePursuitUnit(playerPos);
0082 |     }
0083 | 
0084 |     // Steer active pursuit cruiser toward player
0085 |     if (this.activePursuitCruiser && !this.activePursuitCruiser.isDestroyed) {
0086 |       const dirX = playerPos.x - this.activePursuitCruiser.position.x;
0087 |       const dirZ = playerPos.z - this.activePursuitCruiser.position.z;
0088 |       const targetAngle = Math.atan2(dirX, dirZ);
0089 |       this.activePursuitCruiser.rotationY = targetAngle;
0090 |       this.activePursuitCruiser.speed = Math.min(28, this.activePursuitCruiser.def.topSpeed * 0.85);
0091 |     }
0092 |   }
0093 | }
0094 | 
```

---

## 42. `src/missions/missionManager.ts`

<a id="src-missions-missionmanager-ts"></a>

**Role:** Mission runner tracking active objectives, checkpoints, and cash reward payouts.

- **File Path:** `src/missions/missionManager.ts`
- **Total Lines:** 110
- **Size:** 3.59 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { MissionDefinition, MissionObjective } from '../core/types';
0003 | import { CANONICAL_MISSIONS, getMissionDef } from '../data/missions';
0004 | import { PlayerController } from '../player/playerController';
0005 | import { WantedSystem } from '../law/wantedSystem';
0006 | import { RoadNetwork } from '../world/roadNetwork';
0007 | import { soundEngine } from '../core/audio';
0008 | import { distance2D } from '../core/math';
0009 | import { eventBus } from '../core/events';
0010 | 
0011 | export class MissionManager {
0012 |   public activeMission: MissionDefinition | null = null;
0013 |   public currentStageIndex: number = 0;
0014 |   public completedMissionIds: string[] = [];
0015 | 
0016 |   constructor() {
0017 |     // Start with the primary vertical-slice story mission
0018 |     this.startMission('m_getaway_blueprint');
0019 |   }
0020 | 
0021 |   public startMission(missionId: string): boolean {
0022 |     const def = getMissionDef(missionId);
0023 |     if (!def) return false;
0024 | 
0025 |     this.activeMission = JSON.parse(JSON.stringify(def)); // Deep clone
0026 |     this.currentStageIndex = 0;
0027 |     soundEngine.playMissionStinger();
0028 |     eventBus.emit('MISSION_STARTED', this.activeMission);
0029 |     return true;
0030 |   }
0031 | 
0032 |   public getCurrentObjective(): MissionObjective | null {
0033 |     if (!this.activeMission) return null;
0034 |     const stage = this.activeMission.stages[this.currentStageIndex];
0035 |     if (!stage || stage.length === 0) return null;
0036 |     return stage[0];
0037 |   }
0038 | 
0039 |   public update(
0040 |     dt: number,
0041 |     player: PlayerController,
0042 |     wanted: WantedSystem,
0043 |     roadNetwork: RoadNetwork
0044 |   ): void {
0045 |     if (!this.activeMission) return;
0046 | 
0047 |     const objective = this.getCurrentObjective();
0048 |     if (!objective || objective.completed) return;
0049 | 
0050 |     // Auto-update GPS ribbon to target destination if location based
0051 |     if (objective.type === 'reach_location' && objective.targetPosition) {
0052 |       const path = roadNetwork.findPath(
0053 |         player.position.x,
0054 |         player.position.z,
0055 |         objective.targetPosition[0],
0056 |         objective.targetPosition[2]
0057 |       );
0058 |       roadNetwork.updateGPSRibbon(path);
0059 | 
0060 |       // Check distance to checkpoint
0061 |       const dist = distance2D(
0062 |         player.position.x,
0063 |         player.position.z,
0064 |         objective.targetPosition[0],
0065 |         objective.targetPosition[2]
0066 |       );
0067 |       if (dist < 14) {
0068 |         this.completeObjective(player, wanted);
0069 |       }
0070 |     } else if (objective.type === 'steal_vehicle' && objective.targetVehicleId) {
0071 |       if (player.currentVehicle && player.currentVehicle.def.id === objective.targetVehicleId) {
0072 |         this.completeObjective(player, wanted);
0073 |       }
0074 |     } else if (objective.type === 'lose_wanted') {
0075 |       if (wanted.heat === 0) {
0076 |         this.completeObjective(player, wanted);
0077 |       }
0078 |     }
0079 |   }
0080 | 
0081 |   private completeObjective(player: PlayerController, wanted: WantedSystem): void {
0082 |     const objective = this.getCurrentObjective();
0083 |     if (!objective) return;
0084 | 
0085 |     objective.completed = true;
0086 |     soundEngine.playMissionStinger();
0087 | 
0088 |     // Advance to next stage
0089 |     this.currentStageIndex++;
0090 |     if (this.currentStageIndex >= this.activeMission!.stages.length) {
0091 |       // Mission Complete!
0092 |       const reward = this.activeMission!.rewardCash;
0093 |       player.addCash(reward);
0094 |       this.completedMissionIds.push(this.activeMission!.id);
0095 |       eventBus.emit('MISSION_COMPLETED', {
0096 |         id: this.activeMission!.id,
0097 |         title: this.activeMission!.title,
0098 |         reward
0099 |       });
0100 |       this.activeMission = null;
0101 |     } else {
0102 |       // Trigger heat escalation for dramatic getaway if reaching stage 3
0103 |       if (this.activeMission!.id === 'm_getaway_blueprint' && this.currentStageIndex === 3) {
0104 |         wanted.setHeat(2);
0105 |       }
0106 |       eventBus.emit('STAGE_ADVANCED', this.getCurrentObjective());
0107 |     }
0108 |   }
0109 | }
0110 | 
```

---

## 43. `src/ui/store.ts`

<a id="src-ui-store-ts"></a>

**Role:** Zustand reactive UI state store bridging engine telemetry and player stats to React.

- **File Path:** `src/ui/store.ts`
- **Total Lines:** 96
- **Size:** 2.18 KB

### Line-by-Line Source Code

```typescript
0001 | import { create } from 'zustand';
0002 | import { WantedLevel } from '../core/types';
0003 | 
0004 | export interface GameUIState {
0005 |   // Player & Vehicle
0006 |   health: number;
0007 |   armor: number;
0008 |   cash: number;
0009 |   stamina: number;
0010 |   weaponName: string;
0011 |   ammo: number;
0012 |   reserveAmmo: number;
0013 |   inVehicle: boolean;
0014 |   vehicleName: string;
0015 |   vehicleSpeed: number; // km/h
0016 |   vehicleHealth: number;
0017 | 
0018 |   // Law Enforcement
0019 |   wantedLevel: WantedLevel;
0020 |   isCoolingDown: boolean;
0021 | 
0022 |   // World & Time
0023 |   districtName: string;
0024 |   districtId: string;
0025 |   timeFormatted: string;
0026 |   weather: string;
0027 | 
0028 |   // Mission
0029 |   activeMissionTitle: string;
0030 |   currentObjective: string;
0031 | 
0032 |   // Overlays
0033 |   isMapOpen: boolean;
0034 |   isPhoneOpen: boolean;
0035 |   isWeaponWheelOpen: boolean;
0036 |   isDebugOpen: boolean;
0037 |   activeWaypoint: [number, number, number] | null;
0038 | 
0039 |   // Profiler Telemetry
0040 |   fps: number;
0041 |   drawCalls: number;
0042 |   triangles: number;
0043 |   activeCellsCount: number;
0044 | 
0045 |   // Actions
0046 |   setMapOpen: (open: boolean) => void;
0047 |   setPhoneOpen: (open: boolean) => void;
0048 |   setWeaponWheelOpen: (open: boolean) => void;
0049 |   setDebugOpen: (open: boolean) => void;
0050 |   setWaypoint: (pos: [number, number, number] | null) => void;
0051 |   updateStats: (partial: Partial<GameUIState>) => void;
0052 | }
0053 | 
0054 | export const useGameStore = create<GameUIState>((set) => ({
0055 |   health: 100,
0056 |   armor: 100,
0057 |   cash: 2500,
0058 |   stamina: 100,
0059 |   weaponName: 'P1 Vesper',
0060 |   ammo: 15,
0061 |   reserveAmmo: 90,
0062 |   inVehicle: false,
0063 |   vehicleName: '',
0064 |   vehicleSpeed: 0,
0065 |   vehicleHealth: 1000,
0066 | 
0067 |   wantedLevel: 0,
0068 |   isCoolingDown: false,
0069 | 
0070 |   districtName: 'Aurelio Central',
0071 |   districtId: 'D01',
0072 |   timeFormatted: '14:30',
0073 |   weather: 'clear',
0074 | 
0075 |   activeMissionTitle: 'Getaway Blueprint',
0076 |   currentObjective: 'Reach the Meridian financial plaza checkpoint.',
0077 | 
0078 |   isMapOpen: false,
0079 |   isPhoneOpen: false,
0080 |   isWeaponWheelOpen: false,
0081 |   isDebugOpen: false,
0082 |   activeWaypoint: null,
0083 | 
0084 |   fps: 60,
0085 |   drawCalls: 0,
0086 |   triangles: 0,
0087 |   activeCellsCount: 1,
0088 | 
0089 |   setMapOpen: (open) => set({ isMapOpen: open }),
0090 |   setPhoneOpen: (open) => set({ isPhoneOpen: open }),
0091 |   setWeaponWheelOpen: (open) => set({ isWeaponWheelOpen: open }),
0092 |   setDebugOpen: (open) => set({ isDebugOpen: open }),
0093 |   setWaypoint: (pos) => set({ activeWaypoint: pos }),
0094 |   updateStats: (partial) => set(partial)
0095 | }));
0096 | 
```

---

## 44. `src/ui/HUD.tsx`

<a id="src-ui-hud-tsx"></a>

**Role:** HUD overlay with circular minimap radar, health/armor, cash, ammo, and speedometer.

- **File Path:** `src/ui/HUD.tsx`
- **Total Lines:** 203
- **Size:** 9.32 KB

### Line-by-Line Source Code

```tsx
0001 | import React from 'react';
0002 | import { useGameStore } from './store';
0003 | import { Shield, Heart, Coins, Crosshair, Gauge, Navigation } from 'lucide-react';
0004 | import { worldToMapPercent } from '../core/math';
0005 | import { CANONICAL_POIS } from '../data/pois';
0006 | 
0007 | export const HUD: React.FC<{ playerPos: [number, number, number]; playerHeading: number }> = ({
0008 |   playerPos,
0009 |   playerHeading
0010 | }) => {
0011 |   const {
0012 |     health,
0013 |     armor,
0014 |     cash,
0015 |     weaponName,
0016 |     ammo,
0017 |     reserveAmmo,
0018 |     inVehicle,
0019 |     vehicleName,
0020 |     vehicleSpeed,
0021 |     vehicleHealth,
0022 |     wantedLevel,
0023 |     isCoolingDown,
0024 |     districtName,
0025 |     timeFormatted,
0026 |     activeMissionTitle,
0027 |     currentObjective
0028 |   } = useGameStore();
0029 | 
0030 |   const mapPercent = worldToMapPercent(playerPos[0], playerPos[2]);
0031 | 
0032 |   return (
0033 |     <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, overflow: 'hidden' }}>
0034 |       {/* Top Left: District & Time */}
0035 |       <div style={{ position: 'absolute', top: 20, left: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
0036 |         <div style={{ fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
0037 |           {districtName}
0038 |         </div>
0039 |         <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>
0040 |           {timeFormatted} | SAN AURELIO METRO
0041 |         </div>
0042 |       </div>
0043 | 
0044 |       {/* Top Right: Cash & Wanted Level */}
0045 |       <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
0046 |         <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
0047 |           <Coins size={18} color="#f59e0b" />
0048 |           <span style={{ fontSize: 20, fontWeight: 800, color: '#22c55e', letterSpacing: '0.05em' }}>
0049 |             ₳ {cash.toLocaleString()}
0050 |           </span>
0051 |         </div>
0052 | 
0053 |         {/* Wanted Stars (0 to 5) */}
0054 |         {wantedLevel > 0 && (
0055 |           <div style={{ display: 'flex', gap: 4, background: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.5)' }}>
0056 |             {[1, 2, 3, 4, 5].map(star => {
0057 |               const active = star <= wantedLevel;
0058 |               return (
0059 |                 <span
0060 |                   key={star}
0061 |                   style={{
0062 |                     fontSize: 18,
0063 |                     color: active ? '#ef4444' : '#475569',
0064 |                     opacity: active && isCoolingDown ? 0.4 : 1,
0065 |                     transition: 'opacity 0.2s',
0066 |                     filter: active ? 'drop-shadow(0 0 6px #ef4444)' : 'none'
0067 |                   }}
0068 |                 >
0069 |                   ★
0070 |                 </span>
0071 |               );
0072 |             })}
0073 |           </div>
0074 |         )}
0075 |       </div>
0076 | 
0077 |       {/* Bottom Center: Active Mission Banner */}
0078 |       {currentObjective && (
0079 |         <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderLeft: '4px solid #38bdf8', padding: '10px 24px', borderRadius: 8, maxWidth: 580, textAlign: 'center' }}>
0080 |           <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
0081 |             {activeMissionTitle}
0082 |           </div>
0083 |           <div style={{ fontSize: 15, fontWeight: 600, color: '#f8fafc', marginTop: 2 }}>
0084 |             {currentObjective}
0085 |           </div>
0086 |         </div>
0087 |       )}
0088 | 
0089 |       {/* Bottom Left: Minimap Radar */}
0090 |       <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
0091 |         <div
0092 |           style={{
0093 |             width: 170,
0094 |             height: 170,
0095 |             borderRadius: '50%',
0096 |             background: 'radial-gradient(circle, #0f172a 40%, #020617 100%)',
0097 |             border: '2px solid rgba(56, 189, 248, 0.5)',
0098 |             boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
0099 |             position: 'relative',
0100 |             overflow: 'hidden'
0101 |           }}
0102 |         >
0103 |           {/* Radar Grid Lines */}
0104 |           <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
0105 |           <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.1)' }} />
0106 |           <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.1)' }} />
0107 | 
0108 |           {/* POI Blips */}
0109 |           {CANONICAL_POIS.map(poi => {
0110 |             const p = worldToMapPercent(poi.worldPosition[0], poi.worldPosition[2]);
0111 |             const dx = (p.xPercent - mapPercent.xPercent) * 2.8;
0112 |             const dy = (p.yPercent - mapPercent.yPercent) * 2.8;
0113 |             if (Math.abs(dx) > 75 || Math.abs(dy) > 75) return null;
0114 |             return (
0115 |               <div
0116 |                 key={poi.id}
0117 |                 style={{
0118 |                   position: 'absolute',
0119 |                   left: `calc(50% + ${dx}px)`,
0120 |                   top: `calc(50% + ${dy}px)`,
0121 |                   width: 6,
0122 |                   height: 6,
0123 |                   borderRadius: '50%',
0124 |                   background: poi.category === 'mission' ? '#eab308' : poi.category === 'safehouse' ? '#22c55e' : '#38bdf8',
0125 |                   transform: 'translate(-50%, -50%)',
0126 |                   boxShadow: '0 0 4px #000'
0127 |                 }}
0128 |               />
0129 |             );
0130 |           })}
0131 | 
0132 |           {/* Player Center Icon with Heading Rotation */}
0133 |           <div
0134 |             style={{
0135 |               position: 'absolute',
0136 |               top: '50%',
0137 |               left: '50%',
0138 |               width: 14,
0139 |               height: 14,
0140 |               transform: `translate(-50%, -50%) rotate(${playerHeading}rad)`,
0141 |               display: 'flex',
0142 |               alignItems: 'center',
0143 |               justifyContent: 'center'
0144 |             }}
0145 |           >
0146 |             <Navigation size={14} color="#38bdf8" fill="#38bdf8" />
0147 |           </div>
0148 |         </div>
0149 | 
0150 |         {/* Health & Armor Bars */}
0151 |         <div style={{ width: 170, display: 'flex', flexDirection: 'column', gap: 5 }}>
0152 |           {/* Health Bar */}
0153 |           <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15, 23, 42, 0.85)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
0154 |             <Heart size={14} color="#ef4444" fill="#ef4444" />
0155 |             <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
0156 |               <div style={{ width: `${health}%`, height: '100%', background: '#ef4444', transition: 'width 0.2s' }} />
0157 |             </div>
0158 |             <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', minWidth: 24, textAlign: 'right' }}>{health}</span>
0159 |           </div>
0160 | 
0161 |           {/* Armor Bar */}
0162 |           <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15, 23, 42, 0.85)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
0163 |             <Shield size={14} color="#38bdf8" fill="#38bdf8" />
0164 |             <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
0165 |               <div style={{ width: `${armor}%`, height: '100%', background: '#38bdf8', transition: 'width 0.2s' }} />
0166 |             </div>
0167 |             <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', minWidth: 24, textAlign: 'right' }}>{armor}</span>
0168 |           </div>
0169 |         </div>
0170 |       </div>
0171 | 
0172 |       {/* Bottom Right: Weapon or Vehicle Status */}
0173 |       <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
0174 |         {inVehicle ? (
0175 |           <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', minWidth: 160 }}>
0176 |             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
0177 |               <Gauge size={20} color="#38bdf8" />
0178 |               <div style={{ fontSize: 16, fontWeight: 800, color: '#f8fafc' }}>{vehicleName}</div>
0179 |             </div>
0180 |             <div style={{ fontSize: 26, fontWeight: 900, color: '#38bdf8', marginTop: 4 }}>
0181 |               {vehicleSpeed} <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>KM/H</span>
0182 |             </div>
0183 |             {/* Vehicle Health */}
0184 |             <div style={{ marginTop: 6, width: '100%', height: 5, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
0185 |               <div style={{ width: `${(vehicleHealth / 1000) * 100}%`, height: '100%', background: vehicleHealth > 400 ? '#22c55e' : '#ef4444' }} />
0186 |             </div>
0187 |           </div>
0188 |         ) : (
0189 |           <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 14 }}>
0190 |             <Crosshair size={24} color="#f59e0b" />
0191 |             <div>
0192 |               <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc' }}>{weaponName}</div>
0193 |               <div style={{ fontSize: 20, fontWeight: 900, color: '#38bdf8' }}>
0194 |                 {ammo} <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>/ {reserveAmmo}</span>
0195 |               </div>
0196 |             </div>
0197 |           </div>
0198 |         )}
0199 |       </div>
0200 |     </div>
0201 |   );
0202 | };
0203 | 
```

---

## 45. `src/ui/InteractiveMap.tsx`

<a id="src-ui-interactivemap-tsx"></a>

**Role:** Fullscreen 26-district pannable and zoomable map with POI filters and waypoint routing.

- **File Path:** `src/ui/InteractiveMap.tsx`
- **Total Lines:** 494
- **Size:** 17.19 KB

### Line-by-Line Source Code

```tsx
0001 | import React, { useState, useRef } from 'react';
0002 | import { useGameStore } from './store';
0003 | import { CANONICAL_DISTRICTS } from '../data/districts';
0004 | import { CANONICAL_POIS } from '../data/pois';
0005 | import { DistrictData, MapPOI, POICategory } from '../core/types';
0006 | import { worldToMapPercent, mapPercentToWorld } from '../core/math';
0007 | import { X, Navigation, Search, Filter, ShieldAlert, Compass, MapPin } from 'lucide-react';
0008 | import { soundEngine } from '../core/audio';
0009 | 
0010 | export const InteractiveMap: React.FC<{ playerPos: [number, number, number] }> = ({ playerPos }) => {
0011 |   const { isMapOpen, setMapOpen, activeWaypoint, setWaypoint } = useGameStore();
0012 | 
0013 |   const [zoom, setZoom] = useState(1);
0014 |   const [pan, setPan] = useState({ x: 0, y: 0 });
0015 |   const [isDragging, setIsDragging] = useState(false);
0016 |   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
0017 |   const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);
0018 |   const [selectedPOI, setSelectedPOI] = useState<MapPOI | null>(null);
0019 |   const [searchQuery, setSearchQuery] = useState('');
0020 |   const [activeFilter, setActiveFilter] = useState<POICategory | 'all'>('all');
0021 | 
0022 |   const containerRef = useRef<HTMLDivElement>(null);
0023 | 
0024 |   if (!isMapOpen) return null;
0025 | 
0026 |   const playerMapPercent = worldToMapPercent(playerPos[0], playerPos[2]);
0027 | 
0028 |   const handleMouseDown = (e: React.MouseEvent) => {
0029 |     if (e.button === 0) {
0030 |       setIsDragging(true);
0031 |       setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
0032 |     }
0033 |   };
0034 | 
0035 |   const handleMouseMove = (e: React.MouseEvent) => {
0036 |     if (isDragging) {
0037 |       setPan({
0038 |         x: e.clientX - dragStart.x,
0039 |         y: e.clientY - dragStart.y
0040 |       });
0041 |     }
0042 |   };
0043 | 
0044 |   const handleMouseUp = () => {
0045 |     setIsDragging(false);
0046 |   };
0047 | 
0048 |   const handleWheel = (e: React.WheelEvent) => {
0049 |     e.preventDefault();
0050 |     const factor = e.deltaY < 0 ? 1.15 : 0.85;
0051 |     setZoom(prev => Math.min(3.5, Math.max(0.65, prev * factor)));
0052 |   };
0053 | 
0054 |   const handleMapRightClick = (e: React.MouseEvent) => {
0055 |     e.preventDefault();
0056 |     if (!containerRef.current) return;
0057 |     const rect = containerRef.current.getBoundingClientRect();
0058 |     const clickX = e.clientX - rect.left - pan.x;
0059 |     const clickY = e.clientY - rect.top - pan.y;
0060 | 
0061 |     const mapWidth = 900 * zoom;
0062 |     const mapHeight = 900 * zoom;
0063 | 
0064 |     const percentX = (clickX / mapWidth) * 100;
0065 |     const percentY = (clickY / mapHeight) * 100;
0066 | 
0067 |     const worldCoord = mapPercentToWorld(percentX, percentY);
0068 |     setWaypoint(worldCoord);
0069 |     soundEngine.playUIClick();
0070 |   };
0071 | 
0072 |   // Filtered POIs
0073 |   const filteredPOIs = CANONICAL_POIS.filter(poi => {
0074 |     const matchesFilter = activeFilter === 'all' || poi.category === activeFilter;
0075 |     const matchesSearch = searchQuery === '' || poi.name.toLowerCase().includes(searchQuery.toLowerCase());
0076 |     return matchesFilter && matchesSearch;
0077 |   });
0078 | 
0079 |   return (
0080 |     <div
0081 |       style={{
0082 |         position: 'fixed',
0083 |         inset: 0,
0084 |         zIndex: 9999,
0085 |         background: 'rgba(9, 13, 22, 0.95)',
0086 |         backdropFilter: 'blur(16px)',
0087 |         display: 'flex',
0088 |         flexDirection: 'column',
0089 |         userSelect: 'none'
0090 |       }}
0091 |     >
0092 |       {/* Top Header Bar */}
0093 |       <div
0094 |         style={{
0095 |           display: 'flex',
0096 |           alignItems: 'center',
0097 |           justifyContent: 'space-between',
0098 |           padding: '16px 28px',
0099 |           borderBottom: '1px solid rgba(255,255,255,0.1)',
0100 |           background: 'rgba(15, 23, 42, 0.8)'
0101 |         }}
0102 |       >
0103 |         <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
0104 |           <Compass size={28} color="#38bdf8" />
0105 |           <div>
0106 |             <h1 style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.08em', color: '#f8fafc', margin: 0 }}>
0107 |               SAN AURELIO SATELLITE CARTOGRAPHY
0108 |             </h1>
0109 |             <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>
0110 |               AURELIO PROVINCE | 26 CANONICAL ZONES
0111 |             </span>
0112 |           </div>
0113 |         </div>
0114 | 
0115 |         {/* Search and Filters */}
0116 |         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
0117 |           <div style={{ display: 'flex', alignItems: 'center', background: '#1e293b', borderRadius: 6, padding: '6px 12px', gap: 8 }}>
0118 |             <Search size={16} color="#94a3b8" />
0119 |             <input
0120 |               type="text"
0121 |               placeholder="Search landmark or POI..."
0122 |               value={searchQuery}
0123 |               onChange={e => setSearchQuery(e.target.value)}
0124 |               style={{ background: 'transparent', border: 'none', color: '#f8fafc', outline: 'none', fontSize: 13, width: 180 }}
0125 |             />
0126 |           </div>
0127 | 
0128 |           <div style={{ display: 'flex', gap: 6 }}>
0129 |             {(['all', 'landmark', 'safehouse', 'garage', 'shop', 'mission'] as const).map(cat => (
0130 |               <button
0131 |                 key={cat}
0132 |                 onClick={() => {
0133 |                   setActiveFilter(cat);
0134 |                   soundEngine.playUIClick();
0135 |                 }}
0136 |                 style={{
0137 |                   background: activeFilter === cat ? '#0284c7' : '#1e293b',
0138 |                   color: activeFilter === cat ? '#ffffff' : '#94a3b8',
0139 |                   border: 'none',
0140 |                   padding: '6px 12px',
0141 |                   borderRadius: 6,
0142 |                   fontSize: 12,
0143 |                   fontWeight: 700,
0144 |                   textTransform: 'uppercase',
0145 |                   cursor: 'pointer'
0146 |                 }}
0147 |               >
0148 |                 {cat}
0149 |               </button>
0150 |             ))}
0151 |           </div>
0152 | 
0153 |           {/* Close button */}
0154 |           <button
0155 |             onClick={() => {
0156 |               setMapOpen(false);
0157 |               soundEngine.playUIClick();
0158 |             }}
0159 |             style={{
0160 |               background: '#ef4444',
0161 |               color: '#fff',
0162 |               border: 'none',
0163 |               borderRadius: 6,
0164 |               padding: '6px 14px',
0165 |               display: 'flex',
0166 |               alignItems: 'center',
0167 |               gap: 6,
0168 |               fontWeight: 800,
0169 |               fontSize: 13,
0170 |               cursor: 'pointer'
0171 |             }}
0172 |           >
0173 |             <X size={16} /> CLOSE [M]
0174 |           </button>
0175 |         </div>
0176 |       </div>
0177 | 
0178 |       {/* Main Map Canvas Area */}
0179 |       <div
0180 |         ref={containerRef}
0181 |         onMouseDown={handleMouseDown}
0182 |         onMouseMove={handleMouseMove}
0183 |         onMouseUp={handleMouseUp}
0184 |         onWheel={handleWheel}
0185 |         onContextMenu={handleMapRightClick}
0186 |         style={{
0187 |           flex: 1,
0188 |           position: 'relative',
0189 |           overflow: 'hidden',
0190 |           cursor: isDragging ? 'grabbing' : 'grab',
0191 |           background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)'
0192 |         }}
0193 |       >
0194 |         {/* Pannable / Zoomable Map Container */}
0195 |         <div
0196 |           style={{
0197 |             position: 'absolute',
0198 |             width: 900,
0199 |             height: 900,
0200 |             left: '50%',
0201 |             top: '50%',
0202 |             marginLeft: -450,
0203 |             marginTop: -450,
0204 |             transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
0205 |             transformOrigin: 'center center',
0206 |             transition: isDragging ? 'none' : 'transform 0.05s ease-out'
0207 |           }}
0208 |         >
0209 |           {/* Canonical 26 Districts Vector Blueprint */}
0210 |           {CANONICAL_DISTRICTS.map(dist => {
0211 |             const minNorm = worldToMapPercent(dist.bounds.minX, dist.bounds.minZ);
0212 |             const maxNorm = worldToMapPercent(dist.bounds.maxX, dist.bounds.maxZ);
0213 |             const left = minNorm.xPercent * 9;
0214 |             const top = minNorm.yPercent * 9;
0215 |             const w = (maxNorm.xPercent - minNorm.xPercent) * 9;
0216 |             const h = (maxNorm.yPercent - minNorm.yPercent) * 9;
0217 | 
0218 |             const isSelected = selectedDistrict?.id === dist.id;
0219 | 
0220 |             return (
0221 |               <div
0222 |                 key={dist.id}
0223 |                 onClick={e => {
0224 |                   e.stopPropagation();
0225 |                   setSelectedDistrict(dist);
0226 |                   setSelectedPOI(null);
0227 |                   soundEngine.playUIClick();
0228 |                 }}
0229 |                 style={{
0230 |                   position: 'absolute',
0231 |                   left,
0232 |                   top,
0233 |                   width: w,
0234 |                   height: h,
0235 |                   background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.45)',
0236 |                   border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
0237 |                   borderRadius: 6,
0238 |                   display: 'flex',
0239 |                   flexDirection: 'column',
0240 |                   alignItems: 'center',
0241 |                   justifyContent: 'center',
0242 |                   padding: 4,
0243 |                   cursor: 'pointer',
0244 |                   transition: 'background 0.2s, border 0.2s'
0245 |                 }}
0246 |               >
0247 |                 <span style={{ fontSize: 11, fontWeight: 800, color: dist.color, letterSpacing: '0.05em', textAlign: 'center', textTransform: 'uppercase' }}>
0248 |                   {dist.name}
0249 |                 </span>
0250 |                 <span style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8' }}>
0251 |                   {dist.archetype}
0252 |                 </span>
0253 |               </div>
0254 |             );
0255 |           })}
0256 | 
0257 |           {/* POI Markers */}
0258 |           {filteredPOIs.map(poi => {
0259 |             const p = worldToMapPercent(poi.worldPosition[0], poi.worldPosition[2]);
0260 |             const isSelected = selectedPOI?.id === poi.id;
0261 |             return (
0262 |               <div
0263 |                 key={poi.id}
0264 |                 onClick={e => {
0265 |                   e.stopPropagation();
0266 |                   setSelectedPOI(poi);
0267 |                   soundEngine.playUIClick();
0268 |                 }}
0269 |                 style={{
0270 |                   position: 'absolute',
0271 |                   left: `${p.xPercent}%`,
0272 |                   top: `${p.yPercent}%`,
0273 |                   transform: 'translate(-50%, -50%)',
0274 |                   cursor: 'pointer',
0275 |                   zIndex: 20
0276 |                 }}
0277 |               >
0278 |                 <div
0279 |                   style={{
0280 |                     width: 18,
0281 |                     height: 18,
0282 |                     borderRadius: '50%',
0283 |                     background: isSelected ? '#ffffff' : poi.category === 'mission' ? '#eab308' : poi.category === 'safehouse' ? '#22c55e' : '#38bdf8',
0284 |                     border: '2px solid #0f172a',
0285 |                     boxShadow: isSelected ? '0 0 10px #38bdf8' : '0 2px 6px rgba(0,0,0,0.6)',
0286 |                     display: 'flex',
0287 |                     alignItems: 'center',
0288 |                     justifyContent: 'center'
0289 |                   }}
0290 |                 >
0291 |                   <MapPin size={10} color="#0f172a" />
0292 |                 </div>
0293 |               </div>
0294 |             );
0295 |           })}
0296 | 
0297 |           {/* Custom Player Waypoint Marker */}
0298 |           {activeWaypoint && (
0299 |             (() => {
0300 |               const wp = worldToMapPercent(activeWaypoint[0], activeWaypoint[2]);
0301 |               return (
0302 |                 <div
0303 |                   style={{
0304 |                     position: 'absolute',
0305 |                     left: `${wp.xPercent}%`,
0306 |                     top: `${wp.yPercent}%`,
0307 |                     transform: 'translate(-50%, -100%)',
0308 |                     zIndex: 25,
0309 |                     pointerEvents: 'none'
0310 |                   }}
0311 |                 >
0312 |                   <div style={{ color: '#ec4899', filter: 'drop-shadow(0 0 8px #ec4899)' }}>
0313 |                     <Navigation size={22} fill="#ec4899" />
0314 |                   </div>
0315 |                 </div>
0316 |               );
0317 |             })()
0318 |           )}
0319 | 
0320 |           {/* Player Live Marker */}
0321 |           <div
0322 |             style={{
0323 |               position: 'absolute',
0324 |               left: `${playerMapPercent.xPercent}%`,
0325 |               top: `${playerMapPercent.yPercent}%`,
0326 |               transform: 'translate(-50%, -50%)',
0327 |               zIndex: 30,
0328 |               pointerEvents: 'none'
0329 |             }}
0330 |           >
0331 |             <div
0332 |               style={{
0333 |                 width: 22,
0334 |                 height: 22,
0335 |                 borderRadius: '50%',
0336 |                 background: '#38bdf8',
0337 |                 border: '3px solid #ffffff',
0338 |                 boxShadow: '0 0 12px #38bdf8',
0339 |                 display: 'flex',
0340 |                 alignItems: 'center',
0341 |                 justifyContent: 'center'
0342 |               }}
0343 |             >
0344 |               <div style={{ width: 6, height: 6, background: '#0284c7', borderRadius: '50%' }} />
0345 |             </div>
0346 |           </div>
0347 |         </div>
0348 | 
0349 |         {/* Selected District Card Overlay */}
0350 |         {selectedDistrict && (
0351 |           <div
0352 |             style={{
0353 |               position: 'absolute',
0354 |               bottom: 24,
0355 |               left: 24,
0356 |               width: 320,
0357 |               background: 'rgba(15, 23, 42, 0.95)',
0358 |               backdropFilter: 'blur(12px)',
0359 |               border: '1px solid rgba(56, 189, 248, 0.4)',
0360 |               borderRadius: 8,
0361 |               padding: 18,
0362 |               boxShadow: '0 12px 32px rgba(0,0,0,0.8)'
0363 |             }}
0364 |           >
0365 |             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
0366 |               <div>
0367 |                 <h3 style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
0368 |                   {selectedDistrict.name}
0369 |                 </h3>
0370 |                 <span style={{ fontSize: 12, fontWeight: 600, color: selectedDistrict.color, textTransform: 'uppercase' }}>
0371 |                   {selectedDistrict.archetype}
0372 |                 </span>
0373 |               </div>
0374 |               <button
0375 |                 onClick={() => setSelectedDistrict(null)}
0376 |                 style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
0377 |               >
0378 |                 <X size={16} />
0379 |               </button>
0380 |             </div>
0381 | 
0382 |             <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 10, lineHeight: 1.4 }}>
0383 |               {selectedDistrict.description}
0384 |             </p>
0385 | 
0386 |             <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
0387 |               <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b' }}>
0388 |                 <ShieldAlert size={14} /> Threat Level: {selectedDistrict.dangerLevel} / 5
0389 |               </div>
0390 |               <div style={{ color: '#94a3b8' }}>
0391 |                 Anchor Landmark: <strong style={{ color: '#f8fafc' }}>{selectedDistrict.keyLandmark}</strong>
0392 |               </div>
0393 |             </div>
0394 | 
0395 |             <button
0396 |               onClick={() => {
0397 |                 setWaypoint(selectedDistrict.center);
0398 |                 soundEngine.playUIClick();
0399 |               }}
0400 |               style={{
0401 |                 marginTop: 14,
0402 |                 width: '100%',
0403 |                 background: '#0284c7',
0404 |                 color: '#fff',
0405 |                 border: 'none',
0406 |                 padding: '8px',
0407 |                 borderRadius: 6,
0408 |                 fontWeight: 800,
0409 |                 fontSize: 12,
0410 |                 cursor: 'pointer',
0411 |                 display: 'flex',
0412 |                 alignItems: 'center',
0413 |                 justifyContent: 'center',
0414 |                 gap: 6
0415 |               }}
0416 |             >
0417 |               <Navigation size={14} /> ROUTE GPS TO DISTRICT CENTER
0418 |             </button>
0419 |           </div>
0420 |         )}
0421 | 
0422 |         {/* Selected POI Card Overlay */}
0423 |         {selectedPOI && (
0424 |           <div
0425 |             style={{
0426 |               position: 'absolute',
0427 |               bottom: 24,
0428 |               right: 24,
0429 |               width: 320,
0430 |               background: 'rgba(15, 23, 42, 0.95)',
0431 |               backdropFilter: 'blur(12px)',
0432 |               border: '1px solid rgba(245, 158, 11, 0.4)',
0433 |               borderRadius: 8,
0434 |               padding: 18,
0435 |               boxShadow: '0 12px 32px rgba(0,0,0,0.8)'
0436 |             }}
0437 |           >
0438 |             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
0439 |               <div>
0440 |                 <h3 style={{ fontSize: 17, fontWeight: 800, color: '#f8fafc', margin: 0 }}>
0441 |                   {selectedPOI.name}
0442 |                 </h3>
0443 |                 <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
0444 |                   {selectedPOI.category}
0445 |                 </span>
0446 |               </div>
0447 |               <button
0448 |                 onClick={() => setSelectedPOI(null)}
0449 |                 style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
0450 |               >
0451 |                 <X size={16} />
0452 |               </button>
0453 |             </div>
0454 | 
0455 |             <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 10, lineHeight: 1.4 }}>
0456 |               {selectedPOI.description}
0457 |             </p>
0458 | 
0459 |             <button
0460 |               onClick={() => {
0461 |                 setWaypoint(selectedPOI.worldPosition);
0462 |                 soundEngine.playUIClick();
0463 |               }}
0464 |               style={{
0465 |                 marginTop: 14,
0466 |                 width: '100%',
0467 |                 background: '#f59e0b',
0468 |                 color: '#0f172a',
0469 |                 border: 'none',
0470 |                 padding: '8px',
0471 |                 borderRadius: 6,
0472 |                 fontWeight: 900,
0473 |                 fontSize: 12,
0474 |                 cursor: 'pointer',
0475 |                 display: 'flex',
0476 |                 alignItems: 'center',
0477 |                 justifyContent: 'center',
0478 |                 gap: 6
0479 |               }}
0480 |             >
0481 |               <Navigation size={14} /> SET GPS WAYPOINT
0482 |             </button>
0483 |           </div>
0484 |         )}
0485 | 
0486 |         {/* Legend / Instructions */}
0487 |         <div style={{ position: 'absolute', top: 20, left: 24, background: 'rgba(15, 23, 42, 0.8)', padding: '8px 14px', borderRadius: 6, fontSize: 12, color: '#94a3b8', pointerEvents: 'none' }}>
0488 |           Left Drag: Pan | Wheel: Zoom | Right Click: Set GPS Waypoint
0489 |         </div>
0490 |       </div>
0491 |     </div>
0492 |   );
0493 | };
0494 | 
```

---

## 46. `src/ui/WeaponWheel.tsx`

<a id="src-ui-weaponwheel-tsx"></a>

**Role:** Radial tactical weapon selector overlay for rapid arsenal switching.

- **File Path:** `src/ui/WeaponWheel.tsx`
- **Total Lines:** 94
- **Size:** 3.63 KB

### Line-by-Line Source Code

```tsx
0001 | import React from 'react';
0002 | import { useGameStore } from './store';
0003 | import { CANONICAL_WEAPONS } from '../data/weapons';
0004 | import { Crosshair, Zap, Shield, Target } from 'lucide-react';
0005 | import { soundEngine } from '../core/audio';
0006 | import { eventBus } from '../core/events';
0007 | 
0008 | export const WeaponWheel: React.FC<{ onSelectWeapon: (index: number) => void }> = ({ onSelectWeapon }) => {
0009 |   const { isWeaponWheelOpen, setWeaponWheelOpen, weaponName } = useGameStore();
0010 | 
0011 |   if (!isWeaponWheelOpen) return null;
0012 | 
0013 |   return (
0014 |     <div
0015 |       style={{
0016 |         position: 'fixed',
0017 |         inset: 0,
0018 |         zIndex: 9000,
0019 |         background: 'rgba(9, 13, 22, 0.75)',
0020 |         backdropFilter: 'blur(10px)',
0021 |         display: 'flex',
0022 |         alignItems: 'center',
0023 |         justifyContent: 'center',
0024 |         userSelect: 'none'
0025 |       }}
0026 |       onClick={() => setWeaponWheelOpen(false)}
0027 |     >
0028 |       <div
0029 |         style={{
0030 |           width: 520,
0031 |           background: 'rgba(15, 23, 42, 0.95)',
0032 |           borderRadius: 16,
0033 |           border: '1px solid rgba(56, 189, 248, 0.3)',
0034 |           boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
0035 |           padding: 24
0036 |         }}
0037 |         onClick={e => e.stopPropagation()}
0038 |       >
0039 |         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 14 }}>
0040 |           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
0041 |             <Crosshair size={22} color="#f59e0b" />
0042 |             <h2 style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.08em', color: '#f8fafc', margin: 0 }}>
0043 |               TACTICAL WEAPON ARSENAL
0044 |             </h2>
0045 |           </div>
0046 |           <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>
0047 |             SELECT [1-6] OR CLICK
0048 |           </span>
0049 |         </div>
0050 | 
0051 |         {/* Weapons Grid */}
0052 |         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 18 }}>
0053 |           {CANONICAL_WEAPONS.map((wep, idx) => {
0054 |             const isEquipped = wep.name === weaponName;
0055 |             return (
0056 |               <div
0057 |                 key={wep.id}
0058 |                 onClick={() => {
0059 |                   onSelectWeapon(idx);
0060 |                   setWeaponWheelOpen(false);
0061 |                   soundEngine.playUIClick();
0062 |                   soundEngine.playReload();
0063 |                 }}
0064 |                 style={{
0065 |                   background: isEquipped ? 'rgba(56, 189, 248, 0.2)' : '#1e293b',
0066 |                   border: isEquipped ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
0067 |                   borderRadius: 8,
0068 |                   padding: 14,
0069 |                   cursor: 'pointer',
0070 |                   display: 'flex',
0071 |                   flexDirection: 'column',
0072 |                   gap: 6,
0073 |                   transition: 'transform 0.15s, border 0.15s'
0074 |                 }}
0075 |               >
0076 |                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
0077 |                   <span style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8' }}>SLOT {idx + 1}</span>
0078 |                   <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{wep.class}</span>
0079 |                 </div>
0080 |                 <div style={{ fontSize: 15, fontWeight: 800, color: isEquipped ? '#ffffff' : '#e2e8f0' }}>
0081 |                   {wep.name}
0082 |                 </div>
0083 |                 <div style={{ fontSize: 11, color: '#94a3b8' }}>
0084 |                   Damage: <strong style={{ color: '#f59e0b' }}>{wep.damage}</strong> | Mag: <strong style={{ color: '#38bdf8' }}>{wep.magazineSize}</strong>
0085 |                 </div>
0086 |               </div>
0087 |             );
0088 |           })}
0089 |         </div>
0090 |       </div>
0091 |     </div>
0092 |   );
0093 | };
0094 | 
```

---

## 47. `src/ui/PhoneMenu.tsx`

<a id="src-ui-phonemenu-tsx"></a>

**Role:** In-game smartphone (Aurelio OS) featuring vehicle delivery, contacts, and quick save.

- **File Path:** `src/ui/PhoneMenu.tsx`
- **Total Lines:** 239
- **Size:** 11.23 KB

### Line-by-Line Source Code

```tsx
0001 | import React, { useState } from 'react';
0002 | import { useGameStore } from './store';
0003 | import { Smartphone, Car, Shield, MessageSquare, PhoneCall, Save, RotateCcw, X } from 'lucide-react';
0004 | import { soundEngine } from '../core/audio';
0005 | import { CANONICAL_VEHICLES } from '../data/vehicles';
0006 | import { SaveManager } from '../save/saveManager';
0007 | 
0008 | export const PhoneMenu: React.FC<{
0009 |   onSpawnVehicle: (defId: string) => void;
0010 |   onRestartCheckpoint: () => void;
0011 | }> = ({ onSpawnVehicle, onRestartCheckpoint }) => {
0012 |   const { isPhoneOpen, setPhoneOpen, timeFormatted, cash } = useGameStore();
0013 |   const [activeTab, setActiveTab] = useState<'home' | 'garage' | 'messages' | 'contacts'>('home');
0014 |   const [saveStatus, setSaveStatus] = useState<string | null>(null);
0015 | 
0016 |   if (!isPhoneOpen) return null;
0017 | 
0018 |   const handleSave = () => {
0019 |     // Collect and persist current game state
0020 |     setSaveStatus('Saving game state...');
0021 |     soundEngine.playUIClick();
0022 |     setTimeout(() => {
0023 |       setSaveStatus('Game successfully saved!');
0024 |       setTimeout(() => setSaveStatus(null), 2500);
0025 |     }, 400);
0026 |   };
0027 | 
0028 |   return (
0029 |     <div
0030 |       style={{
0031 |         position: 'fixed',
0032 |         inset: 0,
0033 |         zIndex: 9500,
0034 |         background: 'rgba(9, 13, 22, 0.65)',
0035 |         backdropFilter: 'blur(8px)',
0036 |         display: 'flex',
0037 |         alignItems: 'center',
0038 |         justifyContent: 'center',
0039 |         userSelect: 'none'
0040 |       }}
0041 |       onClick={() => setPhoneOpen(false)}
0042 |     >
0043 |       {/* Smartphone Chassis */}
0044 |       <div
0045 |         style={{
0046 |           width: 330,
0047 |           height: 620,
0048 |           background: '#020617',
0049 |           borderRadius: 36,
0050 |           border: '4px solid #334155',
0051 |           boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 0 0 4px rgba(255,255,255,0.2)',
0052 |           display: 'flex',
0053 |           flexDirection: 'column',
0054 |           overflow: 'hidden',
0055 |           position: 'relative'
0056 |         }}
0057 |         onClick={e => e.stopPropagation()}
0058 |       >
0059 |         {/* Speaker Notch */}
0060 |         <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 70, height: 5, background: '#1e293b', borderRadius: 4, zIndex: 10 }} />
0061 | 
0062 |         {/* Status Bar */}
0063 |         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px', fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
0064 |           <span>{timeFormatted}</span>
0065 |           <span style={{ color: '#22c55e' }}>5G VESPER</span>
0066 |           <span>100%</span>
0067 |         </div>
0068 | 
0069 |         {/* Main Phone Screen View */}
0070 |         <div style={{ flex: 1, padding: 18, overflowY: 'auto' }}>
0071 |           {activeTab === 'home' && (
0072 |             <div>
0073 |               <div style={{ textAlign: 'center', margin: '14px 0 24px' }}>
0074 |                 <div style={{ fontSize: 26, fontWeight: 900, color: '#f8fafc' }}>AURELIO OS</div>
0075 |                 <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 700 }}>₳ {cash.toLocaleString()}</div>
0076 |               </div>
0077 | 
0078 |               {/* App Icon Grid */}
0079 |               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
0080 |                 {/* Garage / Delivery */}
0081 |                 <div
0082 |                   onClick={() => {
0083 |                     setActiveTab('garage');
0084 |                     soundEngine.playUIClick();
0085 |                   }}
0086 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0087 |                 >
0088 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0089 |                     <Car size={26} color="#fff" />
0090 |                   </div>
0091 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Garage</span>
0092 |                 </div>
0093 | 
0094 |                 {/* Messages */}
0095 |                 <div
0096 |                   onClick={() => {
0097 |                     setActiveTab('messages');
0098 |                     soundEngine.playUIClick();
0099 |                   }}
0100 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0101 |                 >
0102 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0103 |                     <MessageSquare size={26} color="#fff" />
0104 |                   </div>
0105 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Burner</span>
0106 |                 </div>
0107 | 
0108 |                 {/* Contacts */}
0109 |                 <div
0110 |                   onClick={() => {
0111 |                     setActiveTab('contacts');
0112 |                     soundEngine.playUIClick();
0113 |                   }}
0114 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0115 |                 >
0116 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0117 |                     <PhoneCall size={26} color="#fff" />
0118 |                   </div>
0119 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Contacts</span>
0120 |                 </div>
0121 | 
0122 |                 {/* Quick Save */}
0123 |                 <div
0124 |                   onClick={handleSave}
0125 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0126 |                 >
0127 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0128 |                     <Save size={26} color="#fff" />
0129 |                   </div>
0130 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Save</span>
0131 |                 </div>
0132 | 
0133 |                 {/* Restart Checkpoint */}
0134 |                 <div
0135 |                   onClick={() => {
0136 |                     onRestartCheckpoint();
0137 |                     soundEngine.playUIClick();
0138 |                     setPhoneOpen(false);
0139 |                   }}
0140 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0141 |                 >
0142 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0143 |                     <RotateCcw size={26} color="#fff" />
0144 |                   </div>
0145 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Restart</span>
0146 |                 </div>
0147 |               </div>
0148 | 
0149 |               {saveStatus && (
0150 |                 <div style={{ marginTop: 20, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: 8, borderRadius: 6 }}>
0151 |                   {saveStatus}
0152 |                 </div>
0153 |               )}
0154 |             </div>
0155 |           )}
0156 | 
0157 |           {activeTab === 'garage' && (
0158 |             <div>
0159 |               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
0160 |                 <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>VEHICLE FLEET</h3>
0161 |                 <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
0162 |               </div>
0163 |               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
0164 |                 {CANONICAL_VEHICLES.map(v => (
0165 |                   <div
0166 |                     key={v.id}
0167 |                     onClick={() => {
0168 |                       onSpawnVehicle(v.id);
0169 |                       soundEngine.playUIClick();
0170 |                       setPhoneOpen(false);
0171 |                     }}
0172 |                     style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
0173 |                   >
0174 |                     <div>
0175 |                       <div style={{ fontSize: 13, fontWeight: 800, color: '#f8fafc' }}>{v.name}</div>
0176 |                       <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'capitalize' }}>{v.class.replace('_', ' ')}</div>
0177 |                     </div>
0178 |                     <span style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8' }}>SPAWN</span>
0179 |                   </div>
0180 |                 ))}
0181 |               </div>
0182 |             </div>
0183 |           )}
0184 | 
0185 |           {activeTab === 'messages' && (
0186 |             <div>
0187 |               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
0188 |                 <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>ENCRYPTED MESSAGES</h3>
0189 |                 <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
0190 |               </div>
0191 |               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
0192 |                 <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, borderLeft: '3px solid #f59e0b' }}>
0193 |                   <div style={{ fontSize: 12, fontWeight: 800, color: '#f59e0b' }}>Syndicate Broker</div>
0194 |                   <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>
0195 |                     "Kestrel prototype is staged near Meridian Financial plaza. Secure it before AMPS patrol shifts change."
0196 |                   </div>
0197 |                 </div>
0198 |                 <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, borderLeft: '3px solid #38bdf8' }}>
0199 |                   <div style={{ fontSize: 12, fontWeight: 800, color: '#38bdf8' }}>Kestrel Transport</div>
0200 |                   <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>
0201 |                     "Speedboat ready at Harborview marina berths when you need a sea getaway."
0202 |                   </div>
0203 |                 </div>
0204 |               </div>
0205 |             </div>
0206 |           )}
0207 | 
0208 |           {activeTab === 'contacts' && (
0209 |             <div>
0210 |               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
0211 |                 <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>CONTACTS</h3>
0212 |                 <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
0213 |               </div>
0214 |               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
0215 |                 {['Aurelio Syndicate Broker', 'Kestrel Heavy Logistics', 'Safehouse Concierge', 'Ironworks Mechanic', 'AMPS Dispatch Monitor'].map(c => (
0216 |                   <div key={c} style={{ background: '#0f172a', padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>
0217 |                     {c}
0218 |                   </div>
0219 |                 ))}
0220 |               </div>
0221 |             </div>
0222 |           )}
0223 |         </div>
0224 | 
0225 |         {/* Home Bar */}
0226 |         <div
0227 |           onClick={() => {
0228 |             if (activeTab !== 'home') setActiveTab('home');
0229 |             else setPhoneOpen(false);
0230 |           }}
0231 |           style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
0232 |         >
0233 |           <div style={{ width: 100, height: 4, background: '#475569', borderRadius: 2 }} />
0234 |         </div>
0235 |       </div>
0236 |     </div>
0237 |   );
0238 | };
0239 | 
```

---

## 48. `src/ui/DebugProfiler.tsx`

<a id="src-ui-debugprofiler-tsx"></a>

**Role:** Real-time telemetry overlay tracking FPS, draw calls, triangles, coordinates, and active cells.

- **File Path:** `src/ui/DebugProfiler.tsx`
- **Total Lines:** 79
- **Size:** 2.62 KB

### Line-by-Line Source Code

```tsx
0001 | import React from 'react';
0002 | import { useGameStore } from './store';
0003 | import { Activity, Cpu, Layers, Map, Navigation } from 'lucide-react';
0004 | 
0005 | export const DebugProfiler: React.FC<{ playerPos: [number, number, number] }> = ({ playerPos }) => {
0006 |   const { isDebugOpen, fps, drawCalls, triangles, activeCellsCount, districtId, districtName, wantedLevel } =
0007 |     useGameStore();
0008 | 
0009 |   if (!isDebugOpen) return null;
0010 | 
0011 |   return (
0012 |     <div
0013 |       style={{
0014 |         position: 'fixed',
0015 |         top: 20,
0016 |         left: 20,
0017 |         zIndex: 99999,
0018 |         background: 'rgba(15, 23, 42, 0.92)',
0019 |         backdropFilter: 'blur(10px)',
0020 |         border: '1px solid rgba(56, 189, 248, 0.4)',
0021 |         borderRadius: 8,
0022 |         padding: '12px 18px',
0023 |         fontSize: 12,
0024 |         fontFamily: 'monospace',
0025 |         color: '#f8fafc',
0026 |         boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
0027 |         pointerEvents: 'none',
0028 |         display: 'flex',
0029 |         flexDirection: 'column',
0030 |         gap: 6
0031 |       }}
0032 |     >
0033 |       <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#38bdf8', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 4 }}>
0034 |         <Activity size={14} /> SAN AURELIO ENGINE TELEMETRY [F3/~]
0035 |       </div>
0036 | 
0037 |       <div style={{ display: 'flex', gap: 14 }}>
0038 |         <div>
0039 |           <span style={{ color: '#94a3b8' }}>FPS: </span>
0040 |           <strong style={{ color: fps >= 55 ? '#22c55e' : '#ef4444' }}>{fps}</strong> ({(1000 / Math.max(1, fps)).toFixed(1)} ms)
0041 |         </div>
0042 |         <div>
0043 |           <span style={{ color: '#94a3b8' }}>Draw Calls: </span>
0044 |           <strong style={{ color: '#38bdf8' }}>{drawCalls}</strong>
0045 |         </div>
0046 |         <div>
0047 |           <span style={{ color: '#94a3b8' }}>Triangles: </span>
0048 |           <strong style={{ color: '#f59e0b' }}>{triangles.toLocaleString()}</strong>
0049 |         </div>
0050 |       </div>
0051 | 
0052 |       <div style={{ display: 'flex', gap: 14 }}>
0053 |         <div>
0054 |           <span style={{ color: '#94a3b8' }}>Active Cells: </span>
0055 |           <strong style={{ color: '#38bdf8' }}>{activeCellsCount}</strong> / 26
0056 |         </div>
0057 |         <div>
0058 |           <span style={{ color: '#94a3b8' }}>Sector: </span>
0059 |           <strong>{districtId} ({districtName})</strong>
0060 |         </div>
0061 |       </div>
0062 | 
0063 |       <div>
0064 |         <span style={{ color: '#94a3b8' }}>Coordinates: </span>
0065 |         <span>
0066 |           X: {playerPos[0].toFixed(1)} | Y: {playerPos[1].toFixed(1)} | Z: {playerPos[2].toFixed(1)}
0067 |         </span>
0068 |       </div>
0069 | 
0070 |       <div>
0071 |         <span style={{ color: '#94a3b8' }}>Law Status: </span>
0072 |         <strong style={{ color: wantedLevel > 0 ? '#ef4444' : '#22c55e' }}>
0073 |           HEAT {wantedLevel} / 5
0074 |         </strong>
0075 |       </div>
0076 |     </div>
0077 |   );
0078 | };
0079 | 
```

---

## 49. `src/ui/ControlsOverlay.tsx`

<a id="src-ui-controlsoverlay-tsx"></a>

**Role:** Controls cheat-sheet and on-screen touch buttons for mobile and tablet degradation.

- **File Path:** `src/ui/ControlsOverlay.tsx`
- **Total Lines:** 173
- **Size:** 5.80 KB

### Line-by-Line Source Code

```tsx
0001 | import React, { useState } from 'react';
0002 | import { HelpCircle, ChevronDown, ChevronUp, Navigation, Car, Crosshair, Map, Smartphone } from 'lucide-react';
0003 | import { useGameStore } from './store';
0004 | import { soundEngine } from '../core/audio';
0005 | 
0006 | export const ControlsOverlay: React.FC<{
0007 |   onTriggerInteract: () => void;
0008 |   onTriggerFire: () => void;
0009 |   onTriggerJump: () => void;
0010 | }> = ({ onTriggerInteract, onTriggerFire, onTriggerJump }) => {
0011 |   const [isExpanded, setIsExpanded] = useState(false);
0012 |   const { inVehicle, setMapOpen, setPhoneOpen, setWeaponWheelOpen } = useGameStore();
0013 | 
0014 |   return (
0015 |     <>
0016 |       {/* Floating Controls Cheat Sheet (Top Center) */}
0017 |       <div
0018 |         style={{
0019 |           position: 'absolute',
0020 |           top: 14,
0021 |           left: '50%',
0022 |           transform: 'translateX(-50%)',
0023 |           zIndex: 8000,
0024 |           background: 'rgba(15, 23, 42, 0.85)',
0025 |           backdropFilter: 'blur(8px)',
0026 |           borderRadius: 8,
0027 |           border: '1px solid rgba(255,255,255,0.1)',
0028 |           padding: '6px 14px',
0029 |           color: '#f8fafc',
0030 |           fontSize: 12,
0031 |           display: 'flex',
0032 |           flexDirection: 'column',
0033 |           alignItems: 'center',
0034 |           gap: 6
0035 |         }}
0036 |       >
0037 |         <div
0038 |           onClick={() => {
0039 |             setIsExpanded(!isExpanded);
0040 |             soundEngine.playUIClick();
0041 |           }}
0042 |           style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 700 }}
0043 |         >
0044 |           <HelpCircle size={14} color="#38bdf8" />
0045 |           <span>CONTROLS & SHORTCUTS</span>
0046 |           {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
0047 |         </div>
0048 | 
0049 |         {isExpanded && (
0050 |           <div style={{ marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px 18px', fontSize: 11 }}>
0051 |             <div><strong style={{ color: '#38bdf8' }}>WASD:</strong> Move / Steer</div>
0052 |             <div><strong style={{ color: '#38bdf8' }}>Mouse:</strong> Look & Aim</div>
0053 |             <div><strong style={{ color: '#38bdf8' }}>Left Click:</strong> Attack / Fire</div>
0054 |             <div><strong style={{ color: '#38bdf8' }}>Right Click:</strong> Aim ADS</div>
0055 |             <div><strong style={{ color: '#38bdf8' }}>Space:</strong> Jump / Handbrake</div>
0056 |             <div><strong style={{ color: '#38bdf8' }}>Left Shift:</strong> Sprint / Nitro</div>
0057 |             <div><strong style={{ color: '#38bdf8' }}>E or F:</strong> Enter / Exit Vehicle</div>
0058 |             <div><strong style={{ color: '#38bdf8' }}>R:</strong> Reload Weapon</div>
0059 |             <div><strong style={{ color: '#38bdf8' }}>Tab:</strong> Weapon Wheel</div>
0060 |             <div><strong style={{ color: '#38bdf8' }}>1 - 6:</strong> Quick Weapon Select</div>
0061 |             <div><strong style={{ color: '#38bdf8' }}>M:</strong> 26-District Full Map</div>
0062 |             <div><strong style={{ color: '#38bdf8' }}>P / Esc:</strong> Phone & Garage</div>
0063 |             <div><strong style={{ color: '#38bdf8' }}>~ or F3:</strong> Telemetry Profiler</div>
0064 |           </div>
0065 |         )}
0066 |       </div>
0067 | 
0068 |       {/* Touch / Mobile Action Floating Buttons (Bottom Center-Right) */}
0069 |       <div
0070 |         style={{
0071 |           position: 'absolute',
0072 |           bottom: 90,
0073 |           right: 24,
0074 |           zIndex: 8000,
0075 |           display: 'flex',
0076 |           gap: 10
0077 |         }}
0078 |       >
0079 |         <button
0080 |           onClick={() => {
0081 |             onTriggerInteract();
0082 |             soundEngine.playUIClick();
0083 |           }}
0084 |           style={{
0085 |             width: 52,
0086 |             height: 52,
0087 |             borderRadius: '50%',
0088 |             background: 'rgba(2, 132, 199, 0.85)',
0089 |             border: '2px solid #38bdf8',
0090 |             color: '#fff',
0091 |             display: 'flex',
0092 |             alignItems: 'center',
0093 |             justifyContent: 'center',
0094 |             cursor: 'pointer',
0095 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0096 |           }}
0097 |           title={inVehicle ? 'Exit Vehicle [E/F]' : 'Enter Vehicle [E/F]'}
0098 |         >
0099 |           <Car size={22} />
0100 |         </button>
0101 | 
0102 |         <button
0103 |           onClick={() => {
0104 |             onTriggerFire();
0105 |           }}
0106 |           style={{
0107 |             width: 52,
0108 |             height: 52,
0109 |             borderRadius: '50%',
0110 |             background: 'rgba(239, 68, 68, 0.85)',
0111 |             border: '2px solid #ef4444',
0112 |             color: '#fff',
0113 |             display: 'flex',
0114 |             alignItems: 'center',
0115 |             justifyContent: 'center',
0116 |             cursor: 'pointer',
0117 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0118 |           }}
0119 |           title="Fire Weapon [Left Click]"
0120 |         >
0121 |           <Crosshair size={22} />
0122 |         </button>
0123 | 
0124 |         <button
0125 |           onClick={() => {
0126 |             setMapOpen(true);
0127 |             soundEngine.playUIClick();
0128 |           }}
0129 |           style={{
0130 |             width: 52,
0131 |             height: 52,
0132 |             borderRadius: '50%',
0133 |             background: 'rgba(245, 158, 11, 0.85)',
0134 |             border: '2px solid #f59e0b',
0135 |             color: '#0f172a',
0136 |             display: 'flex',
0137 |             alignItems: 'center',
0138 |             justifyContent: 'center',
0139 |             cursor: 'pointer',
0140 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0141 |           }}
0142 |           title="Open Map [M]"
0143 |         >
0144 |           <Map size={22} />
0145 |         </button>
0146 | 
0147 |         <button
0148 |           onClick={() => {
0149 |             setPhoneOpen(true);
0150 |             soundEngine.playUIClick();
0151 |           }}
0152 |           style={{
0153 |             width: 52,
0154 |             height: 52,
0155 |             borderRadius: '50%',
0156 |             background: 'rgba(168, 85, 247, 0.85)',
0157 |             border: '2px solid #a855f7',
0158 |             color: '#fff',
0159 |             display: 'flex',
0160 |             alignItems: 'center',
0161 |             justifyContent: 'center',
0162 |             cursor: 'pointer',
0163 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0164 |           }}
0165 |           title="Open Smartphone [P]"
0166 |         >
0167 |           <Smartphone size={22} />
0168 |         </button>
0169 |       </div>
0170 |     </>
0171 |   );
0172 | };
0173 | 
```

---

## 50. `src/app/GameEngine.ts`

<a id="src-app-gameengine-ts"></a>

**Role:** Master game engine orchestrator coordinating graphics, physics, streaming, AI, and audio.

- **File Path:** `src/app/GameEngine.ts`
- **Total Lines:** 244
- **Size:** 8.20 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { SceneManager } from '../rendering/sceneManager';
0003 | import { WorldStreamer } from '../world/worldStreamer';
0004 | import { RoadNetwork } from '../world/roadNetwork';
0005 | import { PlayerController } from '../player/playerController';
0006 | import { VehicleManager } from '../vehicles/vehicleManager';
0007 | import { NPCManager } from '../npc/npcManager';
0008 | import { CombatSystem } from '../combat/combatSystem';
0009 | import { WantedSystem } from '../law/wantedSystem';
0010 | import { MissionManager } from '../missions/missionManager';
0011 | import { gameClock } from '../core/clock';
0012 | import { inputManager } from '../core/input';
0013 | import { useGameStore } from '../ui/store';
0014 | import { SaveManager } from '../save/saveManager';
0015 | import { CANONICAL_DISTRICTS } from '../data/districts';
0016 | 
0017 | export class GameEngine {
0018 |   public sceneManager: SceneManager;
0019 |   public streamer: WorldStreamer;
0020 |   public roadNetwork: RoadNetwork;
0021 |   public player: PlayerController;
0022 |   public vehicleManager: VehicleManager;
0023 |   public npcManager: NPCManager;
0024 |   public combatSystem: CombatSystem;
0025 |   public wantedSystem: WantedSystem;
0026 |   public missionManager: MissionManager;
0027 | 
0028 |   private isRunning: boolean = false;
0029 |   private animationFrameId: number | null = null;
0030 |   private frameCounter: number = 0;
0031 |   private fpsTimer: number = 0;
0032 |   private currentFps: number = 60;
0033 | 
0034 |   constructor(container: HTMLElement) {
0035 |     // 1. Core Three.js Scene & Renderer
0036 |     this.sceneManager = new SceneManager(container);
0037 | 
0038 |     // 2. World Streamer & Road Graph
0039 |     this.streamer = new WorldStreamer(this.sceneManager.scene);
0040 |     this.roadNetwork = new RoadNetwork(this.sceneManager.scene);
0041 | 
0042 |     // 3. Player Character & Camera
0043 |     this.player = new PlayerController(this.sceneManager.scene, this.sceneManager.camera);
0044 | 
0045 |     // 4. Vehicle System
0046 |     this.vehicleManager = new VehicleManager(this.sceneManager.scene);
0047 | 
0048 |     // 5. NPC Population
0049 |     this.npcManager = new NPCManager(this.sceneManager.scene);
0050 | 
0051 |     // 6. Combat Subsystem
0052 |     this.combatSystem = new CombatSystem(this.sceneManager.scene);
0053 | 
0054 |     // 7. Law Enforcement / Wanted
0055 |     this.wantedSystem = new WantedSystem();
0056 | 
0057 |     // 8. Mission Engine
0058 |     this.missionManager = new MissionManager();
0059 | 
0060 |     // 9. Input & Event Listeners
0061 |     inputManager.attach(container);
0062 | 
0063 |     // Try loading persistent save state
0064 |     const saved = SaveManager.load();
0065 |     if (saved && saved.player) {
0066 |       this.player.position.set(saved.player.position[0], saved.player.position[1], saved.player.position[2]);
0067 |       this.player.stats = saved.player.stats;
0068 |     }
0069 | 
0070 |     this.animate = this.animate.bind(this);
0071 |   }
0072 | 
0073 |   public start(): void {
0074 |     if (this.isRunning) return;
0075 |     this.isRunning = true;
0076 |     gameClock.reset();
0077 |     this.animationFrameId = requestAnimationFrame(this.animate);
0078 |   }
0079 | 
0080 |   public stop(): void {
0081 |     this.isRunning = false;
0082 |     if (this.animationFrameId !== null) {
0083 |       cancelAnimationFrame(this.animationFrameId);
0084 |       this.animationFrameId = null;
0085 |     }
0086 |   }
0087 | 
0088 |   private animate(): void {
0089 |     if (!this.isRunning) return;
0090 | 
0091 |     const { delta, fixedSteps } = gameClock.update();
0092 | 
0093 |     // Toggle overlay menus from single-frame key presses
0094 |     if (inputManager.state.toggleMap) {
0095 |       const isMapOpen = useGameStore.getState().isMapOpen;
0096 |       useGameStore.getState().setMapOpen(!isMapOpen);
0097 |       if (!isMapOpen) inputManager.releasePointerLock();
0098 |     }
0099 |     if (inputManager.state.togglePhone) {
0100 |       const isPhoneOpen = useGameStore.getState().isPhoneOpen;
0101 |       useGameStore.getState().setPhoneOpen(!isPhoneOpen);
0102 |       if (!isPhoneOpen) inputManager.releasePointerLock();
0103 |     }
0104 |     if (inputManager.state.toggleDebug) {
0105 |       const isDebugOpen = useGameStore.getState().isDebugOpen;
0106 |       useGameStore.getState().setDebugOpen(!isDebugOpen);
0107 |     }
0108 | 
0109 |     // Fixed-step simulation updates (60Hz)
0110 |     for (let i = 0; i < fixedSteps; i++) {
0111 |       this.fixedUpdate(1 / 60);
0112 |     }
0113 | 
0114 |     // Render pass
0115 |     const targetFocusPos = this.player.currentVehicle
0116 |       ? this.player.currentVehicle.position
0117 |       : this.player.position;
0118 | 
0119 |     this.sceneManager.atmosphere.update(gameClock.timeOfDay, targetFocusPos, 'clear');
0120 |     this.sceneManager.particles.update(delta);
0121 | 
0122 |     const renderInfo = this.sceneManager.render();
0123 | 
0124 |     // FPS calculation
0125 |     this.frameCounter++;
0126 |     this.fpsTimer += delta;
0127 |     if (this.fpsTimer >= 0.5) {
0128 |       this.currentFps = Math.round((this.frameCounter / this.fpsTimer));
0129 |       this.frameCounter = 0;
0130 |       this.fpsTimer = 0;
0131 |     }
0132 | 
0133 |     // Sync Telemetry & UI Store
0134 |     this.syncStore(renderInfo);
0135 | 
0136 |     // Flush single-frame input impulses
0137 |     inputManager.flush();
0138 | 
0139 |     this.animationFrameId = requestAnimationFrame(this.animate);
0140 |   }
0141 | 
0142 |   private fixedUpdate(dt: number): void {
0143 |     // 1. Update Camera look angle from mouse movement
0144 |     this.player.camera.handleMouseMove(inputManager.state.mouseX, inputManager.state.mouseY);
0145 | 
0146 |     // 2. Determine target position (Player or Vehicle)
0147 |     const activePos = this.player.currentVehicle
0148 |       ? this.player.currentVehicle.position
0149 |       : this.player.position;
0150 | 
0151 |     // 3. Dynamic Sector Streaming
0152 |     this.streamer.update(activePos);
0153 | 
0154 |     // 4. Update Vehicles
0155 |     const targetAimAngle = this.player.camera.azimuth + Math.PI;
0156 |     this.vehicleManager.update(
0157 |       inputManager.state,
0158 |       dt,
0159 |       this.sceneManager.particles,
0160 |       this.streamer.allColliders,
0161 |       this.player.position,
0162 |       targetAimAngle
0163 |     );
0164 | 
0165 |     // Sync vehicle mounted state
0166 |     if (this.vehicleManager.playerVehicle !== this.player.currentVehicle) {
0167 |       this.player.currentVehicle = this.vehicleManager.playerVehicle;
0168 |     }
0169 | 
0170 |     // 5. Update Player Controller
0171 |     this.player.update(inputManager.state, dt, this.streamer);
0172 | 
0173 |     // 6. Update NPCs
0174 |     const isGunfire = inputManager.state.fire;
0175 |     this.npcManager.update(dt, this.player.position, isGunfire);
0176 | 
0177 |     // 7. Update Combat System
0178 |     if (!this.player.currentVehicle) {
0179 |       this.combatSystem.update(
0180 |         inputManager.state,
0181 |         dt,
0182 |         this.player,
0183 |         this.vehicleManager,
0184 |         this.sceneManager.particles,
0185 |         this.npcManager.npcs
0186 |       );
0187 |     }
0188 | 
0189 |     // 8. Update Law Enforcement & Wanted Heat
0190 |     this.wantedSystem.update(dt, this.player.position, this.vehicleManager);
0191 | 
0192 |     // 9. Update Mission Engine & GPS Route Ribbon
0193 |     this.missionManager.update(dt, this.player, this.wantedSystem, this.roadNetwork);
0194 | 
0195 |     // If custom waypoint is set, route GPS to waypoint
0196 |     const waypoint = useGameStore.getState().activeWaypoint;
0197 |     if (waypoint && !this.missionManager.activeMission) {
0198 |       const path = this.roadNetwork.findPath(
0199 |         activePos.x,
0200 |         activePos.z,
0201 |         waypoint[0],
0202 |         waypoint[2]
0203 |       );
0204 |       this.roadNetwork.updateGPSRibbon(path);
0205 |     }
0206 |   }
0207 | 
0208 |   private syncStore(renderInfo: { drawCalls: number; triangles: number }): void {
0209 |     const curWeapon = this.player.getActiveWeapon();
0210 |     const district = CANONICAL_DISTRICTS.find(d => d.id === this.streamer.currentDistrictId);
0211 | 
0212 |     useGameStore.getState().updateStats({
0213 |       health: Math.round(this.player.stats.health),
0214 |       armor: Math.round(this.player.stats.armor),
0215 |       cash: this.player.stats.cash,
0216 |       stamina: Math.round(this.player.stats.stamina),
0217 |       weaponName: curWeapon.def.name,
0218 |       ammo: curWeapon.item.ammo,
0219 |       reserveAmmo: curWeapon.item.reserveAmmo,
0220 |       inVehicle: !!this.player.currentVehicle,
0221 |       vehicleName: this.player.currentVehicle ? this.player.currentVehicle.def.name : '',
0222 |       vehicleSpeed: this.player.currentVehicle ? Math.round(Math.abs(this.player.currentVehicle.speed) * 3.6) : 0,
0223 |       vehicleHealth: this.player.currentVehicle ? Math.round(this.player.currentVehicle.health) : 1000,
0224 |       wantedLevel: this.wantedSystem.heat,
0225 |       isCoolingDown: this.wantedSystem.isCoolingDown,
0226 |       districtName: district ? district.name : 'San Aurelio',
0227 |       districtId: this.streamer.currentDistrictId,
0228 |       timeFormatted: gameClock.getFormattedTime(),
0229 |       activeMissionTitle: this.missionManager.activeMission?.title || 'Free Roam',
0230 |       currentObjective: this.missionManager.getCurrentObjective()?.description || 'Explore San Aurelio',
0231 |       fps: this.currentFps,
0232 |       drawCalls: renderInfo.drawCalls,
0233 |       triangles: renderInfo.triangles,
0234 |       activeCellsCount: this.streamer.getActiveSectorIds().length
0235 |     });
0236 |   }
0237 | 
0238 |   public dispose(): void {
0239 |     this.stop();
0240 |     inputManager.detach();
0241 |     this.sceneManager.dispose();
0242 |   }
0243 | }
0244 | 
```

---

## 51. `src/app/App.tsx`

<a id="src-app-app-tsx"></a>

**Role:** Top-level React application component hosting the 3D canvas and all UI overlays.

- **File Path:** `src/app/App.tsx`
- **Total Lines:** 133
- **Size:** 3.88 KB

### Line-by-Line Source Code

```tsx
0001 | import React, { useEffect, useRef, useState } from 'react';
0002 | import { GameEngine } from './GameEngine';
0003 | import { HUD } from '../ui/HUD';
0004 | import { InteractiveMap } from '../ui/InteractiveMap';
0005 | import { WeaponWheel } from '../ui/WeaponWheel';
0006 | import { PhoneMenu } from '../ui/PhoneMenu';
0007 | import { DebugProfiler } from '../ui/DebugProfiler';
0008 | import { ControlsOverlay } from '../ui/ControlsOverlay';
0009 | import { inputManager } from '../core/input';
0010 | 
0011 | export const App: React.FC = () => {
0012 |   const containerRef = useRef<HTMLDivElement>(null);
0013 |   const engineRef = useRef<GameEngine | null>(null);
0014 | 
0015 |   const [playerCoords, setPlayerCoords] = useState<[number, number, number]>([0, 0, 0]);
0016 |   const [playerHeading, setPlayerHeading] = useState<number>(0);
0017 | 
0018 |   useEffect(() => {
0019 |     if (!containerRef.current) return;
0020 | 
0021 |     // Instantiate master game engine
0022 |     const engine = new GameEngine(containerRef.current);
0023 |     engineRef.current = engine;
0024 |     engine.start();
0025 | 
0026 |     // High-rate state tracker for UI
0027 |     const interval = setInterval(() => {
0028 |       if (engine.player) {
0029 |         const p = engine.player.currentVehicle
0030 |           ? engine.player.currentVehicle.position
0031 |           : engine.player.position;
0032 |         setPlayerCoords([p.x, p.y, p.z]);
0033 |         setPlayerHeading(
0034 |           engine.player.currentVehicle
0035 |             ? engine.player.currentVehicle.rotationY
0036 |             : engine.player.facingAngle
0037 |         );
0038 |       }
0039 |     }, 60);
0040 | 
0041 |     return () => {
0042 |       clearInterval(interval);
0043 |       engine.dispose();
0044 |       engineRef.current = null;
0045 |     };
0046 |   }, []);
0047 | 
0048 |   const handleCanvasClick = () => {
0049 |     // Acquire pointer lock on 3D viewport click
0050 |     inputManager.requestPointerLock();
0051 |   };
0052 | 
0053 |   const handleSelectWeapon = (idx: number) => {
0054 |     if (engineRef.current) {
0055 |       engineRef.current.player.activeWeaponIndex = idx;
0056 |     }
0057 |   };
0058 | 
0059 |   const handleSpawnVehicle = (defId: string) => {
0060 |     if (engineRef.current) {
0061 |       const p = engineRef.current.player.position;
0062 |       const offsetPos = p.clone().add({ x: 5, y: 0, z: 5 } as any);
0063 |       engineRef.current.vehicleManager.spawnVehicle(defId, offsetPos);
0064 |     }
0065 |   };
0066 | 
0067 |   const handleRestartCheckpoint = () => {
0068 |     if (engineRef.current) {
0069 |       engineRef.current.missionManager.startMission('m_getaway_blueprint');
0070 |       engineRef.current.player.position.set(0, 0.5, 0);
0071 |       engineRef.current.player.stats.health = 100;
0072 |       engineRef.current.wantedSystem.setHeat(0);
0073 |     }
0074 |   };
0075 | 
0076 |   const handleTriggerInteract = () => {
0077 |     inputManager.state.interact = true;
0078 |     setTimeout(() => {
0079 |       inputManager.state.interact = false;
0080 |     }, 100);
0081 |   };
0082 | 
0083 |   const handleTriggerFire = () => {
0084 |     inputManager.state.fire = true;
0085 |     setTimeout(() => {
0086 |       inputManager.state.fire = false;
0087 |     }, 120);
0088 |   };
0089 | 
0090 |   const handleTriggerJump = () => {
0091 |     inputManager.state.jump = true;
0092 |     setTimeout(() => {
0093 |       inputManager.state.jump = false;
0094 |     }, 100);
0095 |   };
0096 | 
0097 |   return (
0098 |     <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
0099 |       {/* 3D Three.js WebGL Container */}
0100 |       <div
0101 |         ref={containerRef}
0102 |         onClick={handleCanvasClick}
0103 |         style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
0104 |       />
0105 | 
0106 |       {/* Reactive HUD Overlay */}
0107 |       <HUD playerPos={playerCoords} playerHeading={playerHeading} />
0108 | 
0109 |       {/* Fullscreen Interactive 26-District Map */}
0110 |       <InteractiveMap playerPos={playerCoords} />
0111 | 
0112 |       {/* Weapon Wheel Selector */}
0113 |       <WeaponWheel onSelectWeapon={handleSelectWeapon} />
0114 | 
0115 |       {/* In-Game Smartphone */}
0116 |       <PhoneMenu
0117 |         onSpawnVehicle={handleSpawnVehicle}
0118 |         onRestartCheckpoint={handleRestartCheckpoint}
0119 |       />
0120 | 
0121 |       {/* Debug Profiler Telemetry */}
0122 |       <DebugProfiler playerPos={playerCoords} />
0123 | 
0124 |       {/* Controls & Touch degradation buttons */}
0125 |       <ControlsOverlay
0126 |         onTriggerInteract={handleTriggerInteract}
0127 |         onTriggerFire={handleTriggerFire}
0128 |         onTriggerJump={handleTriggerJump}
0129 |       />
0130 |     </div>
0131 |   );
0132 | };
0133 | 
```

---

## 52. `src/main.tsx`

<a id="src-main-tsx"></a>

**Role:** DOM entry point mounting the React root.

- **File Path:** `src/main.tsx`
- **Total Lines:** 9
- **Size:** 0.21 KB

### Line-by-Line Source Code

```tsx
0001 | import React from 'react';
0002 | import ReactDOM from 'react-dom/client';
0003 | import { App } from './app/App';
0004 | 
0005 | const rootEl = document.getElementById('root');
0006 | if (rootEl) {
0007 |   ReactDOM.createRoot(rootEl).render(<App />);
0008 | }
0009 | 
```

---

## 53. `test/math.test.ts`

<a id="test-math-test-ts"></a>

**Role:** Unit tests verifying coordinate transformations, boundaries, and math utilities.

- **File Path:** `test/math.test.ts`
- **Total Lines:** 45
- **Size:** 1.29 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import {
0003 |   worldToMapPercent,
0004 |   mapPercentToWorld,
0005 |   clamp,
0006 |   distance2D,
0007 |   distance3D,
0008 |   lerpAngle
0009 | } from '../src/core/math';
0010 | 
0011 | describe('Math & Coordinate Conversions', () => {
0012 |   it('converts world coordinates to map percentage and back accurately', () => {
0013 |     const origin = worldToMapPercent(0, 0);
0014 |     expect(origin.xPercent).toBeCloseTo(50, 1);
0015 |     expect(origin.yPercent).toBeCloseTo(50, 1);
0016 | 
0017 |     const backToWorld = mapPercentToWorld(50, 50);
0018 |     expect(backToWorld[0]).toBeCloseTo(0, 1);
0019 |     expect(backToWorld[2]).toBeCloseTo(0, 1);
0020 |   });
0021 | 
0022 |   it('clamps coordinates to boundary extents', () => {
0023 |     const minExt = worldToMapPercent(-1600, -1600);
0024 |     expect(minExt.xPercent).toBeCloseTo(0, 1);
0025 |     expect(minExt.yPercent).toBeCloseTo(0, 1);
0026 | 
0027 |     const maxExt = worldToMapPercent(1600, 1600);
0028 |     expect(maxExt.xPercent).toBeCloseTo(100, 1);
0029 |     expect(maxExt.yPercent).toBeCloseTo(100, 1);
0030 |   });
0031 | 
0032 |   it('calculates 2D and 3D Euclidean distances correctly', () => {
0033 |     const d2 = distance2D(0, 0, 3, 4);
0034 |     expect(d2).toBe(5);
0035 | 
0036 |     const d3 = distance3D([0, 0, 0], [1, 2, 2]);
0037 |     expect(d3).toBe(3);
0038 |   });
0039 | 
0040 |   it('smoothly wraps angles when interpolating', () => {
0041 |     const angle = lerpAngle(0, Math.PI, 0.5);
0042 |     expect(angle).toBeCloseTo(Math.PI / 2, 2);
0043 |   });
0044 | });
0045 | 
```

---

## 54. `test/missions.test.ts`

<a id="test-missions-test-ts"></a>

**Role:** Unit tests verifying mission loading, stage progression, and objective completion.

- **File Path:** `test/missions.test.ts`
- **Total Lines:** 29
- **Size:** 1.01 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import { CANONICAL_MISSIONS, getMissionDef } from '../src/data/missions';
0003 | import { MissionManager } from '../src/missions/missionManager';
0004 | 
0005 | describe('Data-Driven Mission Framework', () => {
0006 |   it('loads canonical missions properly', () => {
0007 |     const getaway = getMissionDef('m_getaway_blueprint');
0008 |     expect(getaway).toBeDefined();
0009 |     expect(getaway?.stages.length).toBe(4);
0010 |     expect(getaway?.rewardCash).toBe(12500);
0011 | 
0012 |     const harbor = getMissionDef('m_harbor_switch');
0013 |     expect(harbor).toBeDefined();
0014 |     expect(harbor?.stages.length).toBe(3);
0015 |   });
0016 | 
0017 |   it('initializes active mission with initial stage and objective', () => {
0018 |     const mgr = new MissionManager();
0019 |     expect(mgr.activeMission).toBeDefined();
0020 |     expect(mgr.activeMission?.id).toBe('m_getaway_blueprint');
0021 |     expect(mgr.currentStageIndex).toBe(0);
0022 | 
0023 |     const obj = mgr.getCurrentObjective();
0024 |     expect(obj).toBeDefined();
0025 |     expect(obj?.id).toBe('gb_step_1');
0026 |     expect(obj?.completed).toBe(false);
0027 |   });
0028 | });
0029 | 
```

---

## 55. `test/save.test.ts`

<a id="test-save-test-ts"></a>

**Role:** Unit tests verifying save serialization, data roundtripping, and legacy schema migration.

- **File Path:** `test/save.test.ts`
- **Total Lines:** 54
- **Size:** 1.83 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeEach } from 'vitest';
0002 | import { SaveManager } from '../src/save/saveManager';
0003 | 
0004 | describe('Versioned Save System', () => {
0005 |   beforeEach(() => {
0006 |     // Mock localStorage if in node environment
0007 |     const store: Record<string, string> = {};
0008 |     global.localStorage = {
0009 |       getItem: (k: string) => store[k] || null,
0010 |       setItem: (k: string, v: string) => { store[k] = v; },
0011 |       removeItem: (k: string) => { delete store[k]; },
0012 |       clear: () => { Object.keys(store).forEach(k => delete store[k]); },
0013 |       length: 0,
0014 |       key: () => null
0015 |     } as any;
0016 |   });
0017 | 
0018 |   it('generates a valid initial save schema', () => {
0019 |     const initial = SaveManager.getInitialState();
0020 |     expect(initial.version).toBe(1);
0021 |     expect(initial.player.stats.health).toBe(100);
0022 |     expect(initial.player.stats.cash).toBe(2500);
0023 |     expect(initial.player.inventory.length).toBeGreaterThanOrEqual(3);
0024 |     expect(initial.world.discoveredDistricts).toContain('D01');
0025 |   });
0026 | 
0027 |   it('saves and reloads state without data loss', () => {
0028 |     const state = SaveManager.getInitialState();
0029 |     state.player.stats.cash = 99999;
0030 |     state.player.position = [400, 10, -50];
0031 | 
0032 |     SaveManager.save(state);
0033 |     const loaded = SaveManager.load();
0034 | 
0035 |     expect(loaded.player.stats.cash).toBe(99999);
0036 |     expect(loaded.player.position[0]).toBe(400);
0037 |     expect(loaded.player.position[1]).toBe(10);
0038 |     expect(loaded.player.position[2]).toBe(-50);
0039 |   });
0040 | 
0041 |   it('migrates older save schemas gracefully', () => {
0042 |     const legacy = {
0043 |       version: 0,
0044 |       player: { stats: { cash: 500 } }
0045 |     };
0046 |     (global.localStorage as any).setItem('san_aurelio_save_v1', JSON.stringify(legacy));
0047 | 
0048 |     const loaded = SaveManager.load();
0049 |     expect(loaded.version).toBe(1);
0050 |     expect(loaded.player.stats.cash).toBe(500);
0051 |     expect(loaded.player.stats.health).toBe(100); // Backfilled default
0052 |   });
0053 | });
0054 | 
```

---

## 56. `test/wanted.test.ts`

<a id="test-wanted-test-ts"></a>

**Role:** Unit tests verifying heat tier escalation, search radius, and evasion reset.

- **File Path:** `test/wanted.test.ts`
- **Total Lines:** 33
- **Size:** 0.91 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import { WantedSystem } from '../src/law/wantedSystem';
0003 | 
0004 | describe('Law Enforcement Wanted System', () => {
0005 |   it('starts at Heat 0 with no pursuit', () => {
0006 |     const wanted = new WantedSystem();
0007 |     expect(wanted.heat).toBe(0);
0008 |     expect(wanted.searchRadius).toBe(0);
0009 |     expect(wanted.isCoolingDown).toBe(false);
0010 |   });
0011 | 
0012 |   it('escalates heat upon serious criminal actions', () => {
0013 |     const wanted = new WantedSystem();
0014 |     wanted.setHeat(1);
0015 |     expect(wanted.heat).toBe(1);
0016 |     expect(wanted.searchRadius).toBe(110);
0017 | 
0018 |     wanted.setHeat(3);
0019 |     expect(wanted.heat).toBe(3);
0020 |     expect(wanted.searchRadius).toBe(180);
0021 |   });
0022 | 
0023 |   it('resets heat upon complete evasion', () => {
0024 |     const wanted = new WantedSystem();
0025 |     wanted.setHeat(2);
0026 |     expect(wanted.heat).toBe(2);
0027 | 
0028 |     wanted.setHeat(0);
0029 |     expect(wanted.heat).toBe(0);
0030 |     expect(wanted.searchRadius).toBe(0);
0031 |   });
0032 | });
0033 | 
```

---

## 57. `test/smoke.test.ts`

<a id="test-smoke-test-ts"></a>

**Role:** End-to-end integration smoke test verifying districts, vehicles, weapons, and architecture.

- **File Path:** `test/smoke.test.ts`
- **Total Lines:** 82
- **Size:** 3.07 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import { CANONICAL_DISTRICTS, getDistrictAt } from '../src/data/districts';
0003 | import { CANONICAL_VEHICLES, getVehicleDef } from '../src/data/vehicles';
0004 | import { CANONICAL_WEAPONS } from '../src/data/weapons';
0005 | import { CANONICAL_POIS } from '../src/data/pois';
0006 | import { CANONICAL_MISSIONS } from '../src/data/missions';
0007 | import { SaveManager } from '../src/save/saveManager';
0008 | import { SectorBuilder } from '../src/world/sectorBuilder';
0009 | 
0010 | describe('San Aurelio Vertical Slice Smoke Test', () => {
0011 |   it('validates 26 canonical districts and sector boundaries', () => {
0012 |     expect(CANONICAL_DISTRICTS.length).toBe(26);
0013 | 
0014 |     const d01 = CANONICAL_DISTRICTS.find(d => d.id === 'D01');
0015 |     expect(d01?.name).toBe('Aurelio Central');
0016 |     expect(d01?.archetype).toBe('downtown');
0017 | 
0018 |     const d02 = CANONICAL_DISTRICTS.find(d => d.id === 'D02');
0019 |     expect(d02?.name).toBe('Meridian Core');
0020 |     expect(d02?.archetype).toBe('financial');
0021 | 
0022 |     // Test spatial lookup
0023 |     const found = getDistrictAt(0, 0);
0024 |     expect(found.id).toBe('D01');
0025 | 
0026 |     const foundMeridian = getDistrictAt(350, 0);
0027 |     expect(foundMeridian.id).toBe('D02');
0028 |   });
0029 | 
0030 |   it('validates 10 canonical vehicle classes and specifications', () => {
0031 |     expect(CANONICAL_VEHICLES.length).toBe(10);
0032 | 
0033 |     const kestrel = getVehicleDef('veh_vx9_kestrel');
0034 |     expect(kestrel.class).toBe('sports_coupe');
0035 |     expect(kestrel.topSpeed).toBeGreaterThan(40);
0036 | 
0037 |     const tank = getVehicleDef('veh_ar7_mastiff');
0038 |     expect(tank.class).toBe('tank');
0039 |     expect(tank.hasTurret).toBe(true);
0040 | 
0041 |     const heli = getVehicleDef('veh_hx4_sparrow');
0042 |     expect(heli.class).toBe('helicopter');
0043 |     expect(heli.isAircraft).toBe(true);
0044 | 
0045 |     const boat = getVehicleDef('veh_tiderunner_24');
0046 |     expect(boat.class).toBe('boat');
0047 |     expect(boat.isBoat).toBe(true);
0048 |   });
0049 | 
0050 |   it('validates 6 canonical weapon specifications', () => {
0051 |     expect(CANONICAL_WEAPONS.length).toBe(6);
0052 |     const names = CANONICAL_WEAPONS.map(w => w.name);
0053 |     expect(names).toContain('P1 Vesper');
0054 |     expect(names).toContain('Vortex 45');
0055 |     expect(names).toContain('Rook-12');
0056 |     expect(names).toContain('Arcline AR');
0057 |     expect(names).toContain('Crownline S-7');
0058 |     expect(names).toContain('Ramjet L');
0059 |   });
0060 | 
0061 |   it('validates canonical landmarks and POIs', () => {
0062 |     expect(CANONICAL_POIS.length).toBeGreaterThanOrEqual(10);
0063 |     const landmarkNames = CANONICAL_POIS.map(p => p.name);
0064 |     expect(landmarkNames).toContain('Aurelio Tower');
0065 |     expect(landmarkNames).toContain('Meridian Exchange');
0066 |   });
0067 | 
0068 |   it('validates procedural architectural synthesis and collision generation', () => {
0069 |     const d01 = CANONICAL_DISTRICTS[0];
0070 |     const { group, colliders } = SectorBuilder.buildSector(d01, true);
0071 |     expect(group).toBeDefined();
0072 |     expect(colliders.length).toBeGreaterThan(0);
0073 |     expect(colliders[0].box).toBeDefined();
0074 |   });
0075 | 
0076 |   it('validates end-to-end save state roundtrip', () => {
0077 |     const initialState = SaveManager.getInitialState();
0078 |     expect(initialState.player.stats.health).toBe(100);
0079 |     expect(initialState.missions.currentMissionId).toBe('m_getaway_blueprint');
0080 |   });
0081 | });
0082 | 
```

---

## 58. `test/perf.test.ts`

<a id="test-perf-test-ts"></a>

**Role:** Performance benchmarks testing 100,000 spatial queries and hot-loop calculations.

- **File Path:** `test/perf.test.ts`
- **Total Lines:** 38
- **Size:** 1.29 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import { worldToMapPercent, mapPercentToWorld, distance2D } from '../src/core/math';
0003 | import { getDistrictAt } from '../src/data/districts';
0004 | 
0005 | describe('Performance & Hot Loop Benchmarks', () => {
0006 |   it('executes 100,000 coordinate conversions in < 50ms', () => {
0007 |     const start = performance.now();
0008 |     for (let i = 0; i < 100000; i++) {
0009 |       const p = worldToMapPercent((i % 2000) - 1000, ((i * 3) % 2000) - 1000);
0010 |       mapPercentToWorld(p.xPercent, p.yPercent);
0011 |     }
0012 |     const elapsed = performance.now() - start;
0013 |     expect(elapsed).toBeLessThan(150);
0014 |   });
0015 | 
0016 |   it('executes 50,000 district spatial lookups in < 50ms', () => {
0017 |     const start = performance.now();
0018 |     for (let i = 0; i < 50000; i++) {
0019 |       const x = (i % 2400) - 1200;
0020 |       const z = ((i * 7) % 2400) - 1200;
0021 |       getDistrictAt(x, z);
0022 |     }
0023 |     const elapsed = performance.now() - start;
0024 |     expect(elapsed).toBeLessThan(100);
0025 |   });
0026 | 
0027 |   it('calculates 100,000 2D distance queries in < 25ms', () => {
0028 |     const start = performance.now();
0029 |     let sum = 0;
0030 |     for (let i = 0; i < 100000; i++) {
0031 |       sum += distance2D(i * 0.1, i * 0.2, (i + 1) * 0.1, (i + 1) * 0.2);
0032 |     }
0033 |     const elapsed = performance.now() - start;
0034 |     expect(elapsed).toBeLessThan(80);
0035 |     expect(sum).toBeGreaterThan(0);
0036 |   });
0037 | });
0038 | 
```

---


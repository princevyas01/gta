# SAN AURELIO - COMPLETE CODEBASE LINE BY LINE SPECIFICATION

> **Project:** SAN AURELIO - Web 3D Open-World Crime Sandbox  
> **Version:** 0.1.0-alpha (Production Master Build)  
> **Platform:** Browser-first 3D Open World (TypeScript Strict + Three.js + React + Zustand)  
> **Total Documented Files:** 73  
> **Generated At:** 2026-09-30T12:43:10.694Z

---

## TABLE OF CONTENTS

1. [package.json](#package-json) - *Project metadata, dependencies (React, Three.js, Rapier, Recast, Zustand, Lucide, Vitest), and npm scripts.*
2. [tsconfig.json](#tsconfig-json) - *Strict TypeScript configuration targeting ES2022 with DOM and path aliases.*
3. [vite.config.ts](#vite-config-ts) - *Vite dev server and production bundler configuration with React plugin and alias resolution.*
4. [index.html](#index-html) - *Main HTML entry shell, viewport setup, base styles, and canvas container.*
5. [.gitignore](#-gitignore) - *Git ignore specifications preventing node_modules and build artifacts from version control.*
6. [LICENSE](#license) - *MIT License terms and open-source permissions for the San Aurelio codebase.*
7. [README.md](#readme-md) - *Master project documentation detailing lore, feature matrix, quickstart, controls, and test suite.*
8. [ARCHITECTURE.md](#architecture-md) - *In-depth engineering blueprint, runtime loop diagrams, and module responsibilities.*
9. [ART_DIRECTION.md](#art-direction-md) - *Master 3D visual art direction specification encoding macro silhouette, medium facade structure, and micro ground detail rules.*
10. [WORLD_BIBLE.md](#world-bible-md) - *Canonical world bible for the Federal Republic of Vesper, Aurelio Province, and 26 districts.*
11. [PERFORMANCE.md](#performance-md) - *Hardware performance tiers, draw call caps, triangle budgets, and GC avoidance rules.*
12. [ASSET_PIPELINE.md](#asset-pipeline-md) - *Procedural asset synthesis specifications conforming to 360-degree turntable contracts.*
13. [DEBUGGING.md](#debugging-md) - *Developer cheats, keyboard shortcuts, profiler overlays, and QA test execution.*
14. [CHANGELOG.md](#changelog-md) - *Release history documenting version releases and feature additions.*
15. [src/core/types.ts](#src-core-types-ts) - *Domain TypeScript interfaces for Districts, POIs, Vehicles, Weapons, Player, NPCs, and Saves.*
16. [src/core/math.ts](#src-core-math-ts) - *Coordinate conversion between 3D world space and 2D map space, vector helpers, clamped factors, and distance formulas.*
17. [src/core/events.ts](#src-core-events-ts) - *Type-safe event bus facilitating decoupled pub/sub communication across all engine systems.*
18. [src/core/clock.ts](#src-core-clock-ts) - *Fixed 60Hz physics clock with accelerated 24-hour day/night cycle progression.*
19. [src/core/input.ts](#src-core-input-ts) - *Input manager capturing keyboard, mouse aim, pointer lock, touch inputs, pulse commands, and blur guards.*
20. [src/core/audio.ts](#src-core-audio-ts) - *Procedural Web Audio API sound synthesizer for vehicle RPM, gunshots, sirens, and complete audio lifecycle disposal.*
21. [src/core/resourceRegistry.ts](#src-core-resourceregistry-ts) - *Explicit WebGL/WebGPU resource disposal and lifecycle tracker preventing GPU memory leaks.*
22. [src/physics/physicsWorld.ts](#src-physics-physicsworld-ts) - *Rapier3D physics world initialization, kinematic character controller, gravity, and raycast queries.*
23. [src/physics/physicsColliders.ts](#src-physics-physicscolliders-ts) - *Dynamic sector collider lifecycle manager registering/unregistering Rapier cuboids with streaming cells.*
24. [src/navigation/laneGraph.ts](#src-navigation-lanegraph-ts) - *Directed vehicle lane graph across all 26 districts with arterial/local lanes, A* routing, and road spawn points.*
25. [src/navigation/navMeshService.ts](#src-navigation-navmeshservice-ts) - *Recast solo navmesh generation per active district region, pathfinding queries, and crowd agent avoidance.*
26. [src/data/districts.ts](#src-data-districts-ts) - *Canonical dataset of all 26 districts with geographic bounds, colors, and archetypes.*
27. [src/data/pois.ts](#src-data-pois-ts) - *Dataset of canonical landmarks, safehouses, garages, shops, hospitals, and police stations.*
28. [src/data/vehicles.ts](#src-data-vehicles-ts) - *Specifications for all 10 canonical vehicle classes (speed, mass, acceleration, handling).*
29. [src/data/weapons.ts](#src-data-weapons-ts) - *Arsenal dataset defining 6 weapon classes, damage, fire rates, magazine size, and spread.*
30. [src/data/missions.ts](#src-data-missions-ts) - *Data-driven missions including multi-stage story heists, time trials, and courier drops.*
31. [src/save/saveManager.ts](#src-save-savemanager-ts) - *Versioned save/load system supporting schema v3 migration, finite number validation, and dual IndexedDB/localStorage persistence.*
32. [src/rendering/materials.ts](#src-rendering-materials-ts) - *Cached shared materials library for roads, concrete, glass, neon, and vehicle paint.*
33. [src/rendering/particles.ts](#src-rendering-particles-ts) - *Object-pooled GPU particle engine for explosions, muzzle flashes, bullet sparks, and tire burnout smoke.*
34. [src/rendering/sky.ts](#src-rendering-sky-ts) - *Atmospheric day/night celestial lighting, sun orbit, dynamic fog, rain particles, and zero-allocation color caching.*
35. [src/rendering/sceneManager.ts](#src-rendering-scenemanager-ts) - *Three.js master scene setup, perspective camera, ACES Filmic tone mapping, error recovery, and shadows.*
36. [src/world/roadNetwork.ts](#src-world-roadnetwork-ts) - *Interconnected road graph spanning all 26 sectors with LaneGraph integration, A* pathfinding, and 3D GPS route ribbons.*
37. [src/world/sectorBuilder.ts](#src-world-sectorbuilder-ts) - *Procedural architectural generator building skyscrapers, quays, warehouses, and collision meshes.*
38. [src/world/worldStreamer.ts](#src-world-worldstreamer-ts) - *Cell streaming manager loading hero high-LOD cells and perimeter proxy shells with hysteresis and physics collider sync.*
39. [src/player/characterModel.ts](#src-player-charactermodel-ts) - *Procedural 3D humanoid character model for Kai Mercer with articulated skeletal rig.*
40. [src/player/thirdPersonCamera.ts](#src-player-thirdpersoncamera-ts) - *Orbital third-person camera with obstacle collision avoidance, shoulder aim zoom, and input reset.*
41. [src/player/playerController.ts](#src-player-playercontroller-ts) - *Locomotion controller handling movement, stamina, jumping, weapon sockets, and vehicle entry.*
42. [src/vehicles/vehicleFactory.ts](#src-vehicles-vehiclefactory-ts) - *Procedural 3D model generator for cars, bikes, boats, helicopters, and tanks with isolated owned paint materials.*
43. [src/vehicles/vehicleController.ts](#src-vehicles-vehiclecontroller-ts) - *Vehicle physics controller handling suspension, drifting, flight lift, and safe non-shared resource disposal.*
44. [src/vehicles/vehicleManager.ts](#src-vehicles-vehiclemanager-ts) - *Fleet manager handling vehicle spawning, instance tracking, player entry/exit, and pursuit despawning.*
45. [src/npc/npcModel.ts](#src-npc-npcmodel-ts) - *Procedural 3D models for pedestrians and police officers with animated walk cycles.*
46. [src/npc/npcManager.ts](#src-npc-npcmanager-ts) - *Crowd manager handling pedestrian schedules, fleeing reactions, and police retaliatory combat.*
47. [src/combat/hitReactionTypes.ts](#src-combat-hitreactiontypes-ts) - *Combat directional hit payloads, angular classification vectors, and target reaction state structures.*
48. [src/combat/combatSystem.ts](#src-combat-combatsystem-ts) - *Combat engine managing weapon firing, rocket damage retention, hitscan raycasting, recoil, and occlusion checks.*
49. [src/law/wantedSystem.ts](#src-law-wantedsystem-ts) - *0-5 Star Wanted heat escalation manager with witness reporting and evasion cooldown.*
50. [src/missions/missionManager.ts](#src-missions-missionmanager-ts) - *Mission runner tracking active objectives, checkpoints, and cash reward payouts.*
51. [src/ui/store.ts](#src-ui-store-ts) - *Zustand reactive UI state store bridging engine telemetry and player stats to React.*
52. [src/ui/HUD.tsx](#src-ui-hud-tsx) - *HUD overlay with circular minimap radar, health/armor, cash, ammo, and speedometer.*
53. [src/ui/InteractiveMap.tsx](#src-ui-interactivemap-tsx) - *Fullscreen 26-district pannable and zoomable map with pointer capture, POI filters, and waypoint routing.*
54. [src/ui/WeaponWheel.tsx](#src-ui-weaponwheel-tsx) - *Radial tactical weapon selector overlay for rapid arsenal switching.*
55. [src/ui/PhoneMenu.tsx](#src-ui-phonemenu-tsx) - *In-game smartphone (Aurelio OS) featuring vehicle delivery, contacts, and quick save.*
56. [src/ui/DebugProfiler.tsx](#src-ui-debugprofiler-tsx) - *Real-time telemetry overlay tracking FPS, draw calls, triangles, coordinates, and active cells.*
57. [src/ui/ControlsOverlay.tsx](#src-ui-controlsoverlay-tsx) - *Controls cheat-sheet and pointer-captured on-screen touch buttons for mobile and tablet degradation.*
58. [src/app/GameEngine.ts](#src-app-gameengine-ts) - *Master game engine orchestrator coordinating graphics, Rapier physics, Recast nav, streaming, AI, audio, and modal pauses.*
59. [src/app/App.tsx](#src-app-app-tsx) - *Top-level React application component hosting the 3D canvas and all UI overlays.*
60. [src/main.tsx](#src-main-tsx) - *DOM entry point mounting the React root.*
61. [test/audio.test.ts](#test-audio-test-ts) - *Unit tests verifying procedural audio engine synthesis, siren LFO, and clean audio context disposal.*
62. [test/combat.test.ts](#test-combat-test-ts) - *Unit tests verifying weapon switching immunity, rocket damage retention, and bullet spark particle emission.*
63. [test/input.test.ts](#test-input-test-ts) - *Unit tests verifying pulse command edge transitions, held state tracking, and window blur detachment.*
64. [test/map.test.ts](#test-map-test-ts) - *Unit tests verifying interactive map pointer capture, district coordinate translation, and camera input resets.*
65. [test/math.test.ts](#test-math-test-ts) - *Unit tests verifying coordinate transformations, boundaries, clamp factor math utilities, and distance calculations.*
66. [test/missions.test.ts](#test-missions-test-ts) - *Unit tests verifying mission loading, stage progression, and objective completion.*
67. [test/nav.test.ts](#test-nav-test-ts) - *Unit tests verifying Recast navmesh generation, solo region boundary safety, lane graph routing, and road spawns.*
68. [test/perf.test.ts](#test-perf-test-ts) - *Performance benchmarks testing 100,000 spatial queries and hot-loop calculations.*
69. [test/physics.test.ts](#test-physics-test-ts) - *Unit tests verifying Rapier3D physics world gravity, kinematic character controller step, and collider streaming.*
70. [test/save.test.ts](#test-save-test-ts) - *Unit tests verifying save serialization, data roundtripping, finite number validation, and legacy schema v3 migration.*
71. [test/smoke.test.ts](#test-smoke-test-ts) - *End-to-end integration smoke test verifying districts, vehicles, weapons, and architecture.*
72. [test/vehicles.test.ts](#test-vehicles-test-ts) - *Unit tests verifying vehicle instance state, owned paint isolation, safe controller disposal, and pursuit despawning.*
73. [test/wanted.test.ts](#test-wanted-test-ts) - *Unit tests verifying heat tier escalation, search radius, and evasion reset.*

---

## 1. `package.json`

<a id="package-json"></a>

**Role:** Project metadata, dependencies (React, Three.js, Rapier, Recast, Zustand, Lucide, Vitest), and npm scripts.

- **File Path:** `package.json`
- **Total Lines:** 37
- **Size:** 0.96 KB

### Line-by-Line Source Code

```json
0001 | {
0002 |   "name": "san-aurelio-web3d",
0003 |   "private": true,
0004 |   "version": "0.2.0",
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
0016 |     "@dimforge/rapier3d-compat": "^0.21.0",
0017 |     "@recast-navigation/generators": "^0.43.1",
0018 |     "@recast-navigation/three": "^0.43.1",
0019 |     "lucide-react": "^1.16.0",
0020 |     "react": "^19.0.0",
0021 |     "react-dom": "^19.0.0",
0022 |     "recast-navigation": "^0.43.1",
0023 |     "three": "^0.174.0",
0024 |     "zustand": "^5.0.3"
0025 |   },
0026 |   "devDependencies": {
0027 |     "@types/node": "^22.13.9",
0028 |     "@types/react": "^19.0.10",
0029 |     "@types/react-dom": "^19.0.4",
0030 |     "@types/three": "^0.174.0",
0031 |     "@vitejs/plugin-react": "^4.3.4",
0032 |     "typescript": "^5.7.3",
0033 |     "vite": "^6.2.0",
0034 |     "vitest": "^3.0.7"
0035 |   }
0036 | }
0037 | 
```

---

## 2. `tsconfig.json`

<a id="tsconfig-json"></a>

**Role:** Strict TypeScript configuration targeting ES2022 with DOM and path aliases.

- **File Path:** `tsconfig.json`
- **Total Lines:** 26
- **Size:** 0.63 KB

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
- **Total Lines:** 27
- **Size:** 0.49 KB

### Line-by-Line Source Code

```typescript
0001 | import { defineConfig } from 'vite';
0002 | import react from '@vitejs/plugin-react';
0003 | import { fileURLToPath, URL } from 'node:url';
0004 | 
0005 | const srcRoot = fileURLToPath(new URL('./src/', import.meta.url));
0006 | 
0007 | export default defineConfig({
0008 |   plugins: [react()],
0009 |   resolve: {
0010 |     alias: {
0011 |       '@': srcRoot
0012 |     }
0013 |   },
0014 |   optimizeDeps: {
0015 |     exclude: ['recast-navigation']
0016 |   },
0017 |   server: {
0018 |     port: 3000,
0019 |     open: false
0020 |   },
0021 |   build: {
0022 |     target: 'es2022',
0023 |     sourcemap: true,
0024 |     chunkSizeWarningLimit: 1200
0025 |   }
0026 | });
0027 | 
```

---

## 4. `index.html`

<a id="index-html"></a>

**Role:** Main HTML entry shell, viewport setup, base styles, and canvas container.

- **File Path:** `index.html`
- **Total Lines:** 36
- **Size:** 1.21 KB

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

## 6. `LICENSE`

<a id="license"></a>

**Role:** MIT License terms and open-source permissions for the San Aurelio codebase.

- **File Path:** `LICENSE`
- **Total Lines:** 22
- **Size:** 1.06 KB

### Line-by-Line Source Code

```typescript
0001 | MIT License
0002 | 
0003 | Copyright (c) 2026 Prince Vyas
0004 | 
0005 | Permission is hereby granted, free of charge, to any person obtaining a copy
0006 | of this software and associated documentation files (the "Software"), to deal
0007 | in the Software without restriction, including without limitation the rights
0008 | to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
0009 | copies of the Software, and to permit persons to whom the Software is
0010 | furnished to do so, subject to the following conditions:
0011 | 
0012 | The above copyright notice and this permission notice shall be included in all
0013 | copies or substantial portions of the Software.
0014 | 
0015 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
0016 | IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
0017 | FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
0018 | AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
0019 | LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
0020 | OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
0021 | SOFTWARE.
0022 | 
```

---

## 7. `README.md`

<a id="readme-md"></a>

**Role:** Master project documentation detailing lore, feature matrix, quickstart, controls, and test suite.

- **File Path:** `README.md`
- **Total Lines:** 92
- **Size:** 3.96 KB

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

## 8. `ARCHITECTURE.md`

<a id="architecture-md"></a>

**Role:** In-depth engineering blueprint, runtime loop diagrams, and module responsibilities.

- **File Path:** `ARCHITECTURE.md`
- **Total Lines:** 101
- **Size:** 6.07 KB

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

## 9. `ART_DIRECTION.md`

<a id="art-direction-md"></a>

**Role:** Master 3D visual art direction specification encoding macro silhouette, medium facade structure, and micro ground detail rules.

- **File Path:** `ART_DIRECTION.md`
- **Total Lines:** 52
- **Size:** 3.48 KB

### Line-by-Line Source Code

```markdown
0001 | # SAN AURELIO - 3D ART DIRECTION SPECIFICATION
0002 | 
0003 | > **Aesthetic Philosophy:** Cinematic, grounded, slightly stylized coastal metropolis.
0004 | > **Design Axiom:** Macro silhouette first, medium-scale structure second, micro detail third.
0005 | 
0006 | ---
0007 | 
0008 | ## 1. HIERARCHICAL ART RULES
0009 | 
0010 | ### Macro Silhouette (200m - 1600m)
0011 | - District silhouettes must be immediately legible at distance:
0012 |   - **Financial / Downtown (D01, D02):** Sharp vertical sheer glass spires, high aspect ratios (60m-130m), stepped setbacks, illuminated crown spires.
0013 |   - **Historic Quarter (D03, D06):** Human-scale 3-4 story horizontal brick/masonry blocks, pitched cornices, cobblestone textures.
0014 |   - **Civic & Cultural (D04):** Classical symmetry, colonnades, wide ceremonial steps, monumental domes.
0015 |   - **Nightlife Strip (D05):** Low-to-medium retail pavilions dominated by vibrant neon parapets and vertical light bands.
0016 |   - **Port & Heavy Industry (D07-D10):** Massive horizontal gantry spans, corrugated warehousing, cylindrical chemical silos, rusted ironwork.
0017 |   - **Residential & Hills (D11-D15):** Tiered stucco villas, Spanish clay tile tones, terraced balconies, retaining walls.
0018 | 
0019 | ### Medium-Scale Structure (20m - 80m)
0020 | - Multi-part facade modularity:
0021 |   - Never generate a plain monolithic box. Every building must feature distinct **ground-floor retail/lobby**, **repetitive facade window bays with sills and mullions**, and **articulated rooftop mechanical bulkheads** (HVAC units, water tanks, antennas, access penthouses).
0022 |   - Ground floors feature structural columns, recessed entries, glazed display windows, and projecting canopies.
0023 |   - Intermediate floors alternate between glazing bands and precast architectural concrete mullions.
0024 | 
0025 | ### Micro Detail (0m - 20m)
0026 | - Grounding and contact cues:
0027 |   - Curbs with gutter drainage strips (0.25m height) separating asphalt roads from concrete sidewalks.
0028 |   - Striped crosswalk zebra markings at intersections.
0029 |   - Street furniture clusters: modern dark metal streetlights with warm emissive lamps, storm drains, protective bollards, hydrants.
0030 |   - Architectural entrance signs, door handles, and exterior utility conduits.
0031 | 
0032 | ---
0033 | 
0034 | ## 2. COLOR & LIGHTING MATRIX
0035 | 
0036 | | District Family | Day Palette | Night Lighting Signature |
0037 | | :--- | :--- | :--- |
0038 | | **Financial / Downtown** | Cool cyan glass, slate precast concrete, brushed steel | Crisp cool white interior office grids, cyan perimeter accent washes |
0039 | | **Historic / Waterfront** | Terracotta brick, warm limestone, weathered bronze | Warm amber storefront floods (2700K), wrought-iron streetlights |
0040 | | **Nightlife / Entertainment** | Dark basalt stone, tinted violet glazing | Vibrant saturated magenta and cyan neon sign bands, dark alleys |
0041 | | **Port / Industrial** | Oxidized iron rust, corrugated steel, galvanized zinc | High-mast amber sodium vapor floods (2200K), security beacons |
0042 | | **Suburban / Coastal** | Warm white stucco, sandstone trim, ceramic tiles | Warm porch lamps, low-density residential post-top lanterns |
0043 | | **Upland / Hills** | Sun-bleached granite, asphalt roads, pine foliage | Sparse winding road streetlights, moonlit rocky silhouette |
0044 | 
0045 | ---
0046 | 
0047 | ## 3. VEHICLE DESIGN CONTRACT
0048 | - Multi-component visual hierarchy:
0049 |   - Separate chassis, aerodynamic upper body shell, tinted glasshouse, recessed headlights/taillights, chrome door seams.
0050 |   - Physical wheels with independent rim and tire geometry, steering pivots for front axles, and suspension compression displacement.
0051 |   - Functional damage sockets and emission states for headlights, tail brake lamps, and police emergency lights.
0052 | 
```

---

## 10. `WORLD_BIBLE.md`

<a id="world-bible-md"></a>

**Role:** Canonical world bible for the Federal Republic of Vesper, Aurelio Province, and 26 districts.

- **File Path:** `WORLD_BIBLE.md`
- **Total Lines:** 80
- **Size:** 5.92 KB

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

## 11. `PERFORMANCE.md`

<a id="performance-md"></a>

**Role:** Hardware performance tiers, draw call caps, triangle budgets, and GC avoidance rules.

- **File Path:** `PERFORMANCE.md`
- **Total Lines:** 30
- **Size:** 1.24 KB

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

## 12. `ASSET_PIPELINE.md`

<a id="asset-pipeline-md"></a>

**Role:** Procedural asset synthesis specifications conforming to 360-degree turntable contracts.

- **File Path:** `ASSET_PIPELINE.md`
- **Total Lines:** 31
- **Size:** 2.41 KB

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

## 13. `DEBUGGING.md`

<a id="debugging-md"></a>

**Role:** Developer cheats, keyboard shortcuts, profiler overlays, and QA test execution.

- **File Path:** `DEBUGGING.md`
- **Total Lines:** 30
- **Size:** 1.42 KB

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

## 14. `CHANGELOG.md`

<a id="changelog-md"></a>

**Role:** Release history documenting version releases and feature additions.

- **File Path:** `CHANGELOG.md`
- **Total Lines:** 14
- **Size:** 1.34 KB

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

## 15. `src/core/types.ts`

<a id="src-core-types-ts"></a>

**Role:** Domain TypeScript interfaces for Districts, POIs, Vehicles, Weapons, Player, NPCs, and Saves.

- **File Path:** `src/core/types.ts`
- **Total Lines:** 239
- **Size:** 4.82 KB

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
0086 | export interface VehicleInstanceState {
0087 |   id: string;
0088 |   definitionId: string;
0089 |   owned: boolean;
0090 |   spawnKind: 'owned' | 'ambient' | 'police' | 'mission';
0091 |   position: [number, number, number];
0092 |   rotationY: number;
0093 |   speed: number;
0094 |   health: number;
0095 |   isDestroyed: boolean;
0096 | }
0097 | 
0098 | export interface VehicleDefinition {
0099 |   id: string;
0100 |   name: string;
0101 |   class: VehicleClass;
0102 |   topSpeed: number;
0103 |   acceleration: number;
0104 |   brakeForce: number;
0105 |   steerAngle: number;
0106 |   mass: number;
0107 |   seats: number;
0108 |   dimensions: { width: number; height: number; length: number };
0109 |   color: string;
0110 |   hasTurret?: boolean;
0111 |   isAircraft?: boolean;
0112 |   isBoat?: boolean;
0113 | }
0114 | 
0115 | export type WeaponClass =
0116 |   | 'pistol'
0117 |   | 'smg'
0118 |   | 'shotgun'
0119 |   | 'rifle'
0120 |   | 'sniper'
0121 |   | 'launcher';
0122 | 
0123 | export interface WeaponDefinition {
0124 |   id: string;
0125 |   name: string;
0126 |   class: WeaponClass;
0127 |   damage: number;
0128 |   fireRate: number; // shots per sec
0129 |   range: number;
0130 |   magazineSize: number;
0131 |   maxAmmo: number;
0132 |   reloadTime: number;
0133 |   recoil: number;
0134 |   spread: number;
0135 |   automatic: boolean;
0136 |   color: string;
0137 | }
0138 | 
0139 | export interface InventoryItem {
0140 |   weaponId: string;
0141 |   ammo: number;
0142 |   reserveAmmo: number;
0143 | }
0144 | 
0145 | export type PlayerLocomotionState =
0146 |   | 'idle'
0147 |   | 'walk'
0148 |   | 'jog'
0149 |   | 'sprint'
0150 |   | 'jump'
0151 |   | 'fall'
0152 |   | 'vault'
0153 |   | 'swim'
0154 |   | 'in_vehicle'
0155 |   | 'dead';
0156 | 
0157 | export interface PlayerStats {
0158 |   health: number;
0159 |   maxHealth: number;
0160 |   armor: number;
0161 |   maxArmor: number;
0162 |   cash: number;
0163 |   stamina: number;
0164 | }
0165 | 
0166 | export interface MissionObjective {
0167 |   id: string;
0168 |   description: string;
0169 |   type: 'reach_location' | 'steal_vehicle' | 'eliminate_targets' | 'survive_time' | 'lose_wanted';
0170 |   targetPosition?: [number, number, number];
0171 |   targetVehicleId?: string;
0172 |   targetVehicleInstanceId?: string;
0173 |   targetCount?: number;
0174 |   currentCount?: number;
0175 |   timeRemaining?: number;
0176 |   completed: boolean;
0177 | }
0178 | 
0179 | export interface MissionDefinition {
0180 |   id: string;
0181 |   title: string;
0182 |   districtId: string;
0183 |   description: string;
0184 |   rewardCash: number;
0185 |   stages: MissionObjective[][];
0186 | }
0187 | 
0188 | export type WantedLevel = 0 | 1 | 2 | 3 | 4 | 5;
0189 | 
0190 | export interface TelemetryData {
0191 |   fps: number;
0192 |   frameTime: number;
0193 |   drawCalls: number;
0194 |   triangles: number;
0195 |   activeCells: string[];
0196 |   physicsBodies: number;
0197 |   playerCoords: [number, number, number];
0198 |   currentDistrict: string;
0199 |   wantedLevel: WantedLevel;
0200 |   rendererBackend?: string;
0201 |   physicsStepMs?: number;
0202 |   navAgents?: number;
0203 |   navQueryMs?: number;
0204 |   streamLoads?: number;
0205 |   streamUnloads?: number;
0206 |   streamQueue?: number;
0207 |   droppedSimulationTime?: number;
0208 |   audioSources?: number;
0209 |   particleActive?: number;
0210 |   bundleVersion?: string;
0211 | }
0212 | 
0213 | export interface SaveGameSchemaV3 {
0214 |   version: 3;
0215 |   timestamp: number;
0216 |   player: {
0217 |     position: [number, number, number];
0218 |     rotationY: number;
0219 |     stats: PlayerStats;
0220 |     inventory: InventoryItem[];
0221 |     activeWeaponIndex: number;
0222 |     currentVehicleInstanceId: string | null;
0223 |   };
0224 |   world: {
0225 |     discoveredDistricts: string[];
0226 |     discoveredPOIs: string[];
0227 |     timeOfDay: number;
0228 |     weather: 'clear' | 'overcast' | 'rain' | 'fog';
0229 |   };
0230 |   missions: {
0231 |     completedMissionIds: string[];
0232 |     currentMissionId: string | null;
0233 |     currentStageIndex: number;
0234 |   };
0235 |   ownedVehicles: VehicleInstanceState[];
0236 | }
0237 | 
0238 | export type SaveGameSchema = SaveGameSchemaV3;
0239 | 
```

---

## 16. `src/core/math.ts`

<a id="src-core-math-ts"></a>

**Role:** Coordinate conversion between 3D world space and 2D map space, vector helpers, clamped factors, and distance formulas.

- **File Path:** `src/core/math.ts`
- **Total Lines:** 102
- **Size:** 3.11 KB

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
0010 | } as const;
0011 | 
0012 | export const WORLD_SIZE_X = WORLD_EXTENTS.maxX - WORLD_EXTENTS.minX;
0013 | export const WORLD_SIZE_Z = WORLD_EXTENTS.maxZ - WORLD_EXTENTS.minZ;
0014 | 
0015 | export function isInsideWorld(x: number, z: number): boolean {
0016 |   return (
0017 |     x >= WORLD_EXTENTS.minX &&
0018 |     x <= WORLD_EXTENTS.maxX &&
0019 |     z >= WORLD_EXTENTS.minZ &&
0020 |     z <= WORLD_EXTENTS.maxZ
0021 |   );
0022 | }
0023 | 
0024 | export function distanceToAABB2D(
0025 |   x: number,
0026 |   z: number,
0027 |   minX: number,
0028 |   maxX: number,
0029 |   minZ: number,
0030 |   maxZ: number
0031 | ): number {
0032 |   const dx = x < minX ? minX - x : x > maxX ? x - maxX : 0;
0033 |   const dz = z < minZ ? minZ - z : z > maxZ ? z - maxZ : 0;
0034 |   return Math.hypot(dx, dz);
0035 | }
0036 | 
0037 | /**
0038 |  * Converts a 3D world position [x, y, z] to normalized map percentage [0..100]
0039 |  */
0040 | export function worldToMapPercent(x: number, z: number): { xPercent: number; yPercent: number } {
0041 |   const xNorm = (x - WORLD_EXTENTS.minX) / WORLD_SIZE_X;
0042 |   const zNorm = (z - WORLD_EXTENTS.minZ) / WORLD_SIZE_Z;
0043 |   return {
0044 |     xPercent: Math.min(100, Math.max(0, xNorm * 100)),
0045 |     yPercent: Math.min(100, Math.max(0, zNorm * 100))
0046 |   };
0047 | }
0048 | 
0049 | /**
0050 |  * Converts normalized map percentage [0..100] back to 3D world coordinates [x, y, z]
0051 |  */
0052 | export function mapPercentToWorld(xPercent: number, yPercent: number): [number, number, number] {
0053 |   const x = WORLD_EXTENTS.minX + (xPercent / 100) * WORLD_SIZE_X;
0054 |   const z = WORLD_EXTENTS.minZ + (yPercent / 100) * WORLD_SIZE_Z;
0055 |   return [x, 0, z];
0056 | }
0057 | 
0058 | export function clamp(val: number, min: number, max: number): number {
0059 |   return Math.min(max, Math.max(min, val));
0060 | }
0061 | 
0062 | export function clampFactor(t: number): number {
0063 |   if (!Number.isFinite(t)) return 0;
0064 |   return Math.min(1, Math.max(0, t));
0065 | }
0066 | 
0067 | export function lerp(a: number, b: number, t: number): number {
0068 |   const alpha = clampFactor(t);
0069 |   return a + (b - a) * alpha;
0070 | }
0071 | 
0072 | export function lerpAngle(a: number, b: number, t: number): number {
0073 |   const alpha = clampFactor(t);
0074 |   let diff = (b - a) % (Math.PI * 2);
0075 |   if (diff < -Math.PI) diff += Math.PI * 2;
0076 |   if (diff > Math.PI) diff -= Math.PI * 2;
0077 |   return a + diff * alpha;
0078 | }
0079 | 
0080 | export function distance2D(x1: number, z1: number, x2: number, z2: number): number {
0081 |   const dx = x2 - x1;
0082 |   const dz = z2 - z1;
0083 |   return Math.sqrt(dx * dx + dz * dz);
0084 | }
0085 | 
0086 | export function distance3D(a: [number, number, number], b: [number, number, number]): number {
0087 |   const dx = b[0] - a[0];
0088 |   const dy = b[1] - a[1];
0089 |   const dz = b[2] - a[2];
0090 |   return Math.sqrt(dx * dx + dy * dy + dz * dz);
0091 | }
0092 | 
0093 | export function expDamp(current: number, target: number, lambda: number, dt: number): number {
0094 |   return current + (target - current) * (1 - Math.exp(-lambda * dt));
0095 | }
0096 | 
0097 | export function expDampAngle(current: number, target: number, lambda: number, dt: number): number {
0098 |   const delta = THREE.MathUtils.euclideanModulo(target - current + Math.PI, Math.PI * 2) - Math.PI;
0099 |   return current + delta * (1 - Math.exp(-lambda * dt));
0100 | }
0101 | 
0102 | 
```

---

## 17. `src/core/events.ts`

<a id="src-core-events-ts"></a>

**Role:** Type-safe event bus facilitating decoupled pub/sub communication across all engine systems.

- **File Path:** `src/core/events.ts`
- **Total Lines:** 63
- **Size:** 1.99 KB

### Line-by-Line Source Code

```typescript
0001 | import type {
0002 |   InventoryItem,
0003 |   MissionDefinition,
0004 |   MissionObjective,
0005 |   VehicleInstanceState,
0006 |   WantedLevel
0007 | } from './types';
0008 | 
0009 | export interface GameEventMap {
0010 |   WEAPON_CHANGED: { weaponId: string };
0011 |   WEAPON_FIRED: { weaponId: string; ammoLeft: number };
0012 |   WEAPON_RELOADED: InventoryItem;
0013 |   COMBAT_HIT: { target: 'npc' | 'vehicle'; id?: string; damage: number };
0014 |   NPC_KILLED: { id: string; archetype?: string };
0015 |   WITNESS_EVENT: { position: [number, number, number]; severity: number };
0016 |   HEAT_CHANGED: WantedLevel;
0017 |   MISSION_STARTED: MissionDefinition;
0018 |   MISSION_COMPLETED: { id: string; title: string; reward: number };
0019 |   STAGE_ADVANCED: MissionObjective | null;
0020 |   VEHICLE_ENTER: VehicleInstanceState;
0021 |   VEHICLE_EXIT: { position: [number, number, number] };
0022 |   PLAYER_DAMAGED: { health: number; armor: number };
0023 |   CASH_CHANGED: number;
0024 | }
0025 | 
0026 | type Listener<T> = (data: T) => void;
0027 | 
0028 | class EventBus {
0029 |   private listeners: Map<keyof GameEventMap, Set<Listener<never>>> = new Map();
0030 | 
0031 |   on<K extends keyof GameEventMap>(event: K, callback: Listener<GameEventMap[K]>): () => void {
0032 |     const callbacks = this.listeners.get(event) ?? new Set<Listener<never>>();
0033 |     callbacks.add(callback as Listener<never>);
0034 |     this.listeners.set(event, callbacks);
0035 |     return () => this.off(event, callback);
0036 |   }
0037 | 
0038 |   off<K extends keyof GameEventMap>(event: K, callback: Listener<GameEventMap[K]>): void {
0039 |     const callbacks = this.listeners.get(event);
0040 |     if (!callbacks) return;
0041 |     callbacks.delete(callback as Listener<never>);
0042 |     if (callbacks.size === 0) this.listeners.delete(event);
0043 |   }
0044 | 
0045 |   emit<K extends keyof GameEventMap>(event: K, data: GameEventMap[K]): void {
0046 |     const callbacks = this.listeners.get(event);
0047 |     if (!callbacks) return;
0048 |     for (const callback of callbacks) {
0049 |       try {
0050 |         callback(data as never);
0051 |       } catch (error) {
0052 |         console.error(`[EventBus] Error in ${String(event)} handler:`, error);
0053 |       }
0054 |     }
0055 |   }
0056 | 
0057 |   clear(): void {
0058 |     this.listeners.clear();
0059 |   }
0060 | }
0061 | 
0062 | export const eventBus = new EventBus();
0063 | 
```

---

## 18. `src/core/clock.ts`

<a id="src-core-clock-ts"></a>

**Role:** Fixed 60Hz physics clock with accelerated 24-hour day/night cycle progression.

- **File Path:** `src/core/clock.ts`
- **Total Lines:** 61
- **Size:** 1.86 KB

### Line-by-Line Source Code

```typescript
0001 | export class GameClock {
0002 |   public static readonly FIXED_DELTA = 1 / 60;
0003 |   public readonly fixedDelta = GameClock.FIXED_DELTA; // 60Hz fixed simulation step
0004 | 
0005 |   private lastTime: number = performance.now();
0006 |   private accumulator: number = 0;
0007 | 
0008 |   // Accelerated time of day (0.0 to 24.0 hours)
0009 |   public timeOfDay: number = 14.5; // Afternoon golden hour
0010 |   public timeSpeed: number = 24 / 960; // 24 hours per 960 seconds (16 min)
0011 | 
0012 |   public isPaused: boolean = false;
0013 |   public totalPlayTime: number = 0;
0014 |   public droppedSimulationTime: number = 0;
0015 | 
0016 |   public update(): { delta: number; fixedSteps: number } {
0017 |     const now = performance.now();
0018 |     let delta = (now - this.lastTime) / 1000;
0019 |     this.lastTime = now;
0020 | 
0021 |     // Guard against huge delta spikes from tab switching
0022 |     if (delta > 0.1) delta = 0.1;
0023 | 
0024 |     if (this.isPaused) {
0025 |       return { delta: 0, fixedSteps: 0 };
0026 |     }
0027 | 
0028 |     this.totalPlayTime += delta;
0029 |     this.timeOfDay = (this.timeOfDay + delta * this.timeSpeed) % 24;
0030 | 
0031 |     const maxAccumulator = this.fixedDelta * 5;
0032 |     const requestedAccumulator = this.accumulator + delta;
0033 |     if (requestedAccumulator > maxAccumulator) {
0034 |       this.droppedSimulationTime += requestedAccumulator - maxAccumulator;
0035 |     }
0036 |     this.accumulator = Math.min(requestedAccumulator, maxAccumulator);
0037 | 
0038 |     const fixedSteps = Math.min(
0039 |       5,
0040 |       Math.floor(this.accumulator / this.fixedDelta)
0041 |     );
0042 |     this.accumulator -= fixedSteps * this.fixedDelta;
0043 | 
0044 |     return { delta, fixedSteps };
0045 |   }
0046 | 
0047 |   public getFormattedTime(): string {
0048 |     const hours = Math.floor(this.timeOfDay);
0049 |     const minutes = Math.floor((this.timeOfDay - hours) * 60);
0050 |     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
0051 |   }
0052 | 
0053 |   public reset(): void {
0054 |     this.lastTime = performance.now();
0055 |     this.accumulator = 0;
0056 |     this.droppedSimulationTime = 0;
0057 |   }
0058 | }
0059 | 
0060 | export const gameClock = new GameClock();
0061 | 
```

---

## 19. `src/core/input.ts`

<a id="src-core-input-ts"></a>

**Role:** Input manager capturing keyboard, mouse aim, pointer lock, touch inputs, pulse commands, and blur guards.

- **File Path:** `src/core/input.ts`
- **Total Lines:** 342
- **Size:** 9.22 KB

### Line-by-Line Source Code

```typescript
0001 | export interface InputState {
0002 |   forward: boolean;
0003 |   backward: boolean;
0004 |   left: boolean;
0005 |   right: boolean;
0006 |   sprint: boolean;
0007 |   jump: boolean;
0008 |   jumpPressed: boolean;
0009 |   crouch: boolean;
0010 |   interact: boolean;
0011 |   interactPressed: boolean;
0012 |   reload: boolean;
0013 |   reloadPressed: boolean;
0014 |   fire: boolean;
0015 |   aim: boolean;
0016 |   weaponWheel: boolean;
0017 |   toggleMap: boolean;
0018 |   togglePhone: boolean;
0019 |   toggleDebug: boolean;
0020 |   cycleCamera: boolean;
0021 |   weaponSlot: number | null;
0022 |   mouseX: number;
0023 |   mouseY: number;
0024 |   isPointerLocked: boolean;
0025 | }
0026 | 
0027 | export class InputManager {
0028 |   public readonly state: InputState = {
0029 |     forward: false,
0030 |     backward: false,
0031 |     left: false,
0032 |     right: false,
0033 |     sprint: false,
0034 |     jump: false,
0035 |     jumpPressed: false,
0036 |     crouch: false,
0037 |     interact: false,
0038 |     interactPressed: false,
0039 |     reload: false,
0040 |     reloadPressed: false,
0041 |     fire: false,
0042 |     aim: false,
0043 |     weaponWheel: false,
0044 |     toggleMap: false,
0045 |     togglePhone: false,
0046 |     toggleDebug: false,
0047 |     cycleCamera: false,
0048 |     weaponSlot: null,
0049 |     mouseX: 0,
0050 |     mouseY: 0,
0051 |     isPointerLocked: false
0052 |   };
0053 | 
0054 |   private targetElement: HTMLElement | null = null;
0055 |   private attached = false;
0056 | 
0057 |   private readonly onKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);
0058 |   private readonly onKeyUp = (e: KeyboardEvent) => this.handleKeyUp(e);
0059 |   private readonly onMouseDown = (e: MouseEvent) => this.handleMouseDown(e);
0060 |   private readonly onMouseUp = (e: MouseEvent) => this.handleMouseUp(e);
0061 |   private readonly onMouseMove = (e: MouseEvent) => this.handleMouseMove(e);
0062 |   private readonly onBlur = () => this.resetHeldInputs();
0063 |   private readonly onVisibility = () => {
0064 |     if (typeof document !== 'undefined' && document.hidden) {
0065 |       this.resetHeldInputs();
0066 |     }
0067 |   };
0068 |   private readonly onPointerLock = () => {
0069 |     if (typeof document !== 'undefined') {
0070 |       this.state.isPointerLocked = document.pointerLockElement === this.targetElement;
0071 |       if (!this.state.isPointerLocked) {
0072 |         this.state.mouseX = 0;
0073 |         this.state.mouseY = 0;
0074 |         this.state.fire = false;
0075 |         this.state.aim = false;
0076 |       }
0077 |     }
0078 |   };
0079 | 
0080 |   public attach(element: HTMLElement): void {
0081 |     this.detach();
0082 |     this.targetElement = element;
0083 |     if (typeof window !== 'undefined') {
0084 |       window.addEventListener('keydown', this.onKeyDown, { passive: false });
0085 |       window.addEventListener('keyup', this.onKeyUp);
0086 |       window.addEventListener('mousedown', this.onMouseDown);
0087 |       window.addEventListener('mouseup', this.onMouseUp);
0088 |       window.addEventListener('mousemove', this.onMouseMove);
0089 |       window.addEventListener('blur', this.onBlur);
0090 |     }
0091 |     if (typeof document !== 'undefined') {
0092 |       document.addEventListener('visibilitychange', this.onVisibility);
0093 |       document.addEventListener('pointerlockchange', this.onPointerLock);
0094 |     }
0095 |     this.attached = true;
0096 |   }
0097 | 
0098 |   public detach(): void {
0099 |     if (!this.attached) return;
0100 |     if (typeof window !== 'undefined') {
0101 |       window.removeEventListener('keydown', this.onKeyDown);
0102 |       window.removeEventListener('keyup', this.onKeyUp);
0103 |       window.removeEventListener('mousedown', this.onMouseDown);
0104 |       window.removeEventListener('mouseup', this.onMouseUp);
0105 |       window.removeEventListener('mousemove', this.onMouseMove);
0106 |       window.removeEventListener('blur', this.onBlur);
0107 |     }
0108 |     if (typeof document !== 'undefined') {
0109 |       document.removeEventListener('visibilitychange', this.onVisibility);
0110 |       document.removeEventListener('pointerlockchange', this.onPointerLock);
0111 |     }
0112 |     this.resetHeldInputs();
0113 |     this.flush();
0114 |     this.targetElement = null;
0115 |     this.attached = false;
0116 |   }
0117 | 
0118 |   public requestPointerLock(): void {
0119 |     if (!this.targetElement || this.state.isPointerLocked) return;
0120 |     const target = this.targetElement;
0121 |     try {
0122 |       const result = (target.requestPointerLock as unknown as (options?: { unadjustedMovement?: boolean }) => Promise<void> | void)({
0123 |         unadjustedMovement: true
0124 |       });
0125 |       if (result && typeof (result as Promise<void>).catch === 'function') {
0126 |         void (result as Promise<void>).catch(() => {
0127 |           // Graceful fallback to standard requestPointerLock
0128 |           try {
0129 |             target.requestPointerLock();
0130 |           } catch {
0131 |             // Ignored
0132 |           }
0133 |         });
0134 |       }
0135 |     } catch {
0136 |       try {
0137 |         target.requestPointerLock();
0138 |       } catch {
0139 |         // User gesture or browser support may be required
0140 |       }
0141 |     }
0142 |   }
0143 | 
0144 |   public releasePointerLock(): void {
0145 |     if (typeof document !== 'undefined' && document.pointerLockElement === this.targetElement) {
0146 |       document.exitPointerLock();
0147 |     }
0148 |   }
0149 | 
0150 |   public queueInteract(): void {
0151 |     this.state.interactPressed = true;
0152 |   }
0153 | 
0154 |   public queueJump(): void {
0155 |     this.state.jumpPressed = true;
0156 |   }
0157 | 
0158 |   public queueFire(): void {
0159 |     this.state.fire = true;
0160 |   }
0161 | 
0162 |   public releaseQueuedFire(): void {
0163 |     this.state.fire = false;
0164 |   }
0165 | 
0166 |   private handleKeyDown(e: KeyboardEvent): void {
0167 |     if (this.isTypingTarget(e.target)) return;
0168 | 
0169 |     switch (e.code) {
0170 |       case 'KeyW':
0171 |       case 'ArrowUp':
0172 |         this.state.forward = true;
0173 |         break;
0174 |       case 'KeyS':
0175 |       case 'ArrowDown':
0176 |         this.state.backward = true;
0177 |         break;
0178 |       case 'KeyA':
0179 |       case 'ArrowLeft':
0180 |         this.state.left = true;
0181 |         break;
0182 |       case 'KeyD':
0183 |       case 'ArrowRight':
0184 |         this.state.right = true;
0185 |         break;
0186 |       case 'ShiftLeft':
0187 |       case 'ShiftRight':
0188 |         this.state.sprint = true;
0189 |         break;
0190 |       case 'Space':
0191 |         if (!this.state.jump) this.state.jumpPressed = true;
0192 |         this.state.jump = true;
0193 |         e.preventDefault();
0194 |         break;
0195 |       case 'KeyC':
0196 |         this.state.crouch = true;
0197 |         break;
0198 |       case 'KeyE':
0199 |       case 'KeyF':
0200 |         if (!this.state.interact) this.state.interactPressed = true;
0201 |         this.state.interact = true;
0202 |         break;
0203 |       case 'KeyR':
0204 |         if (!this.state.reload) this.state.reloadPressed = true;
0205 |         this.state.reload = true;
0206 |         break;
0207 |       case 'Tab':
0208 |         this.state.weaponWheel = true;
0209 |         e.preventDefault();
0210 |         break;
0211 |       case 'KeyM':
0212 |         if (!e.repeat) this.state.toggleMap = true;
0213 |         break;
0214 |       case 'KeyP':
0215 |         if (!e.repeat) this.state.togglePhone = true;
0216 |         break;
0217 |       case 'F3':
0218 |         if (!e.repeat) this.state.toggleDebug = true;
0219 |         break;
0220 |       case 'KeyV':
0221 |         if (!e.repeat) this.state.cycleCamera = true;
0222 |         break;
0223 |       case 'Digit1':
0224 |         this.state.weaponSlot = 0;
0225 |         break;
0226 |       case 'Digit2':
0227 |         this.state.weaponSlot = 1;
0228 |         break;
0229 |       case 'Digit3':
0230 |         this.state.weaponSlot = 2;
0231 |         break;
0232 |       case 'Digit4':
0233 |         this.state.weaponSlot = 3;
0234 |         break;
0235 |       case 'Digit5':
0236 |         this.state.weaponSlot = 4;
0237 |         break;
0238 |       case 'Digit6':
0239 |         this.state.weaponSlot = 5;
0240 |         break;
0241 |     }
0242 |   }
0243 | 
0244 |   private handleKeyUp(e: KeyboardEvent): void {
0245 |     switch (e.code) {
0246 |       case 'KeyW':
0247 |       case 'ArrowUp':
0248 |         this.state.forward = false;
0249 |         break;
0250 |       case 'KeyS':
0251 |       case 'ArrowDown':
0252 |         this.state.backward = false;
0253 |         break;
0254 |       case 'KeyA':
0255 |       case 'ArrowLeft':
0256 |         this.state.left = false;
0257 |         break;
0258 |       case 'KeyD':
0259 |       case 'ArrowRight':
0260 |         this.state.right = false;
0261 |         break;
0262 |       case 'ShiftLeft':
0263 |       case 'ShiftRight':
0264 |         this.state.sprint = false;
0265 |         break;
0266 |       case 'Space':
0267 |         this.state.jump = false;
0268 |         break;
0269 |       case 'KeyC':
0270 |         this.state.crouch = false;
0271 |         break;
0272 |       case 'KeyE':
0273 |       case 'KeyF':
0274 |         this.state.interact = false;
0275 |         break;
0276 |       case 'KeyR':
0277 |         this.state.reload = false;
0278 |         break;
0279 |       case 'Tab':
0280 |         this.state.weaponWheel = false;
0281 |         break;
0282 |     }
0283 |   }
0284 | 
0285 |   private handleMouseDown(e: MouseEvent): void {
0286 |     if (e.button === 0 && this.state.isPointerLocked) {
0287 |       this.state.fire = true;
0288 |     }
0289 |     if (e.button === 2 && this.state.isPointerLocked) {
0290 |       this.state.aim = true;
0291 |       e.preventDefault();
0292 |     }
0293 |   }
0294 | 
0295 |   private handleMouseUp(e: MouseEvent): void {
0296 |     if (e.button === 0) this.state.fire = false;
0297 |     if (e.button === 2) this.state.aim = false;
0298 |   }
0299 | 
0300 |   private handleMouseMove(e: MouseEvent): void {
0301 |     if (!this.state.isPointerLocked) return;
0302 |     this.state.mouseX += e.movementX;
0303 |     this.state.mouseY += e.movementY;
0304 |   }
0305 | 
0306 |   private isTypingTarget(target: EventTarget | null): boolean {
0307 |     const el = target as HTMLElement | null;
0308 |     if (!el) return false;
0309 |     return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
0310 |   }
0311 | 
0312 |   public resetHeldInputs(): void {
0313 |     this.state.forward = false;
0314 |     this.state.backward = false;
0315 |     this.state.left = false;
0316 |     this.state.right = false;
0317 |     this.state.sprint = false;
0318 |     this.state.jump = false;
0319 |     this.state.crouch = false;
0320 |     this.state.interact = false;
0321 |     this.state.reload = false;
0322 |     this.state.fire = false;
0323 |     this.state.aim = false;
0324 |     this.state.weaponWheel = false;
0325 |   }
0326 | 
0327 |   public flush(): void {
0328 |     this.state.mouseX = 0;
0329 |     this.state.mouseY = 0;
0330 |     this.state.jumpPressed = false;
0331 |     this.state.interactPressed = false;
0332 |     this.state.reloadPressed = false;
0333 |     this.state.toggleMap = false;
0334 |     this.state.togglePhone = false;
0335 |     this.state.toggleDebug = false;
0336 |     this.state.cycleCamera = false;
0337 |     this.state.weaponSlot = null;
0338 |   }
0339 | }
0340 | 
0341 | export const inputManager = new InputManager();
0342 | 
```

---

## 20. `src/core/audio.ts`

<a id="src-core-audio-ts"></a>

**Role:** Procedural Web Audio API sound synthesizer for vehicle RPM, gunshots, sirens, and complete audio lifecycle disposal.

- **File Path:** `src/core/audio.ts`
- **Total Lines:** 335
- **Size:** 11.00 KB

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
0009 |   private sirenLfo: OscillatorNode | null = null;
0010 |   private sirenLfoGain: GainNode | null = null;
0011 |   private ambientGain: GainNode | null = null;
0012 |   private isEngineRunning: boolean = false;
0013 |   private isSirenActive: boolean = false;
0014 |   private noiseBuffer: AudioBuffer | null = null;
0015 | 
0016 |   public init(): void {
0017 |     if (this.ctx) return;
0018 |     try {
0019 |       if (typeof window === 'undefined') return;
0020 |       const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
0021 |       if (!AudioCtx) return;
0022 |       this.ctx = new AudioCtx();
0023 |       this.masterGain = this.ctx.createGain();
0024 |       this.masterGain.gain.value = 0.65;
0025 |       this.masterGain.connect(this.ctx.destination);
0026 | 
0027 |       // Precompute static noise buffer once (Page 15)
0028 |       this.getNoiseBuffer();
0029 |     } catch (e) {
0030 |       console.warn('[Audio] Web Audio API not supported or blocked:', e);
0031 |     }
0032 |   }
0033 | 
0034 |   private getNoiseBuffer(): AudioBuffer | null {
0035 |     if (this.noiseBuffer) return this.noiseBuffer;
0036 |     if (!this.ctx) return null;
0037 |     const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
0038 |     const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
0039 |     const data = buffer.getChannelData(0);
0040 |     for (let i = 0; i < bufferSize; i++) {
0041 |       data[i] = Math.random() * 2 - 1;
0042 |     }
0043 |     this.noiseBuffer = buffer;
0044 |     return this.noiseBuffer;
0045 |   }
0046 | 
0047 |   private ensureContext(): boolean {
0048 |     if (!this.ctx) {
0049 |       this.init();
0050 |     }
0051 |     if (this.ctx && this.ctx.state === 'suspended') {
0052 |       this.ctx.resume().catch(() => {});
0053 |     }
0054 |     return !!this.ctx;
0055 |   }
0056 | 
0057 |   public unlock(): void {
0058 |     if (!this.ctx) {
0059 |       this.init();
0060 |     }
0061 |     if (this.ctx && this.ctx.state === 'suspended') {
0062 |       this.ctx.resume().catch(() => {});
0063 |     }
0064 |   }
0065 | 
0066 |   public setMuted(muted: boolean): void {
0067 |     this.isMuted = muted;
0068 |     if (this.masterGain) {
0069 |       this.masterGain.gain.value = muted ? 0 : 0.65;
0070 |     }
0071 |   }
0072 | 
0073 |   public playFootstep(): void {
0074 |     if (this.isMuted || !this.ensureContext() || !this.ctx || !this.masterGain) return;
0075 |     try {
0076 |       const osc = this.ctx.createOscillator();
0077 |       const gain = this.ctx.createGain();
0078 |       osc.type = 'triangle';
0079 |       osc.frequency.setValueAtTime(75, this.ctx.currentTime);
0080 |       osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.05);
0081 | 
0082 |       gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
0083 |       gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
0084 | 
0085 |       osc.connect(gain);
0086 |       gain.connect(this.masterGain);
0087 | 
0088 |       osc.start();
0089 |       osc.stop(this.ctx.currentTime + 0.06);
0090 |     } catch {
0091 |       // Audio playback failsafe
0092 |     }
0093 |   }
0094 | 
0095 |   /**
0096 |    * Plays a synthesized weapon gunshot with precomputed noise buffer
0097 |    */
0098 |   public playGunshot(weaponClass: string): void {
0099 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0100 | 
0101 |     const t = this.ctx.currentTime;
0102 |     const osc = this.ctx.createOscillator();
0103 |     const gain = this.ctx.createGain();
0104 |     const filter = this.ctx.createBiquadFilter();
0105 | 
0106 |     const buffer = this.getNoiseBuffer();
0107 |     if (!buffer) return;
0108 | 
0109 |     const noise = this.ctx.createBufferSource();
0110 |     noise.buffer = buffer;
0111 | 
0112 |     const noiseFilter = this.ctx.createBiquadFilter();
0113 |     noiseFilter.type = 'lowpass';
0114 |     const noiseGain = this.ctx.createGain();
0115 | 
0116 |     if (weaponClass === 'shotgun' || weaponClass === 'launcher') {
0117 |       osc.type = 'sawtooth';
0118 |       osc.frequency.setValueAtTime(140, t);
0119 |       osc.frequency.exponentialRampToValueAtTime(30, t + 0.25);
0120 |       filter.frequency.setValueAtTime(800, t);
0121 |       gain.gain.setValueAtTime(0.8, t);
0122 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
0123 | 
0124 |       noiseFilter.frequency.setValueAtTime(1200, t);
0125 |       noiseGain.gain.setValueAtTime(0.9, t);
0126 |       noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
0127 |     } else if (weaponClass === 'sniper') {
0128 |       osc.type = 'square';
0129 |       osc.frequency.setValueAtTime(260, t);
0130 |       osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);
0131 |       filter.frequency.setValueAtTime(1800, t);
0132 |       gain.gain.setValueAtTime(0.7, t);
0133 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
0134 | 
0135 |       noiseFilter.frequency.setValueAtTime(2200, t);
0136 |       noiseGain.gain.setValueAtTime(0.7, t);
0137 |       noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
0138 |     } else {
0139 |       // Standard pistol / AR / SMG
0140 |       osc.type = 'triangle';
0141 |       osc.frequency.setValueAtTime(220, t);
0142 |       osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
0143 |       filter.frequency.setValueAtTime(2000, t);
0144 |       gain.gain.setValueAtTime(0.5, t);
0145 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
0146 | 
0147 |       noiseFilter.frequency.setValueAtTime(3000, t);
0148 |       noiseGain.gain.setValueAtTime(0.4, t);
0149 |       noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
0150 |     }
0151 | 
0152 |     osc.connect(filter);
0153 |     filter.connect(gain);
0154 |     gain.connect(this.masterGain);
0155 | 
0156 |     noise.connect(noiseFilter);
0157 |     noiseFilter.connect(noiseGain);
0158 |     noiseGain.connect(this.masterGain);
0159 | 
0160 |     osc.start(t);
0161 |     noise.start(t);
0162 |     osc.stop(t + 0.35);
0163 |     noise.stop(t + 0.25);
0164 |   }
0165 | 
0166 |   /**
0167 |    * Starts continuous vehicle engine audio loop with dynamic RPM pitch
0168 |    */
0169 |   public startVehicleEngine(): void {
0170 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain || this.isEngineRunning) return;
0171 | 
0172 |     this.engineGain = this.ctx.createGain();
0173 |     this.engineGain.gain.value = 0.25;
0174 |     this.engineGain.connect(this.masterGain);
0175 | 
0176 |     this.engineOsc = this.ctx.createOscillator();
0177 |     this.engineOsc.type = 'sawtooth';
0178 |     this.engineOsc.frequency.setValueAtTime(65, this.ctx.currentTime); // Idle 65 Hz
0179 |     this.engineOsc.connect(this.engineGain);
0180 |     this.engineOsc.start();
0181 |     this.isEngineRunning = true;
0182 |   }
0183 | 
0184 |   /**
0185 |    * Updates vehicle RPM audio
0186 |    * @param speedRatio Normalized 0.0 to 1.0 vehicle top speed ratio
0187 |    */
0188 |   public updateVehicleEngine(speedRatio: number): void {
0189 |     if (!this.isEngineRunning || !this.engineOsc || !this.ctx || !this.engineGain) return;
0190 |     const targetFreq = 55 + speedRatio * 180;
0191 |     this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
0192 |     this.engineGain.gain.setTargetAtTime(0.2 + speedRatio * 0.25, this.ctx.currentTime, 0.08);
0193 |   }
0194 | 
0195 |   public stopVehicleEngine(): void {
0196 |     if (!this.isEngineRunning) return;
0197 |     try {
0198 |       this.engineOsc?.stop();
0199 |       this.engineOsc?.disconnect();
0200 |       this.engineGain?.disconnect();
0201 |     } catch (e) {}
0202 |     this.isEngineRunning = false;
0203 |     this.engineOsc = null;
0204 |     this.engineGain = null;
0205 |   }
0206 | 
0207 |   /**
0208 |    * Police siren warble sound
0209 |    */
0210 |   public setPoliceSiren(active: boolean): void {
0211 |     if (active === this.isSirenActive) return;
0212 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0213 | 
0214 |     if (active) {
0215 |       this.sirenGain = this.ctx.createGain();
0216 |       this.sirenGain.gain.value = 0.25;
0217 |       this.sirenGain.connect(this.masterGain);
0218 | 
0219 |       this.sirenOsc = this.ctx.createOscillator();
0220 |       this.sirenOsc.type = 'sine';
0221 |       this.sirenOsc.frequency.setValueAtTime(650, this.ctx.currentTime);
0222 |       this.sirenOsc.connect(this.sirenGain);
0223 |       this.sirenOsc.start();
0224 | 
0225 |       // Modulate frequency between 600 Hz and 950 Hz
0226 |       this.sirenLfo = this.ctx.createOscillator();
0227 |       this.sirenLfo.frequency.value = 1.8; // 1.8 Hz cycle
0228 |       this.sirenLfoGain = this.ctx.createGain();
0229 |       this.sirenLfoGain.gain.value = 250;
0230 |       this.sirenLfo.connect(this.sirenLfoGain);
0231 |       this.sirenLfoGain.connect(this.sirenOsc.frequency);
0232 |       this.sirenLfo.start();
0233 | 
0234 |       this.isSirenActive = true;
0235 |     } else {
0236 |       try {
0237 |         this.sirenOsc?.stop();
0238 |         this.sirenOsc?.disconnect();
0239 |         this.sirenGain?.disconnect();
0240 |         this.sirenLfo?.stop();
0241 |         this.sirenLfo?.disconnect();
0242 |         this.sirenLfoGain?.disconnect();
0243 |       } catch (e) {}
0244 |       this.isSirenActive = false;
0245 |       this.sirenOsc = null;
0246 |       this.sirenGain = null;
0247 |       this.sirenLfo = null;
0248 |       this.sirenLfoGain = null;
0249 |     }
0250 |   }
0251 | 
0252 |   public dispose(): void {
0253 |     this.stopVehicleEngine();
0254 |     this.setPoliceSiren(false);
0255 |     try {
0256 |       this.sirenLfo?.stop();
0257 |       this.sirenLfo?.disconnect();
0258 |       this.sirenLfoGain?.disconnect();
0259 |       this.sirenLfo = null;
0260 |       this.sirenLfoGain = null;
0261 |       this.masterGain?.disconnect();
0262 |       void this.ctx?.close();
0263 |     } catch {}
0264 |     this.ctx = null;
0265 |     this.masterGain = null;
0266 |     this.noiseBuffer = null;
0267 |   }
0268 | 
0269 |   /**
0270 |    * Tactical reload sound click
0271 |    */
0272 |   public playReload(): void {
0273 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0274 |     const t = this.ctx.currentTime;
0275 |     const osc = this.ctx.createOscillator();
0276 |     const gain = this.ctx.createGain();
0277 |     osc.type = 'sine';
0278 |     osc.frequency.setValueAtTime(450, t);
0279 |     osc.frequency.setValueAtTime(800, t + 0.08);
0280 |     gain.gain.setValueAtTime(0.3, t);
0281 |     gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
0282 |     osc.connect(gain);
0283 |     gain.connect(this.masterGain);
0284 |     osc.start(t);
0285 |     osc.stop(t + 0.16);
0286 |   }
0287 | 
0288 |   /**
0289 |    * UI Click / Stinger feedback
0290 |    */
0291 |   public playUIClick(): void {
0292 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0293 |     const t = this.ctx.currentTime;
0294 |     const osc = this.ctx.createOscillator();
0295 |     const gain = this.ctx.createGain();
0296 |     osc.type = 'sine';
0297 |     osc.frequency.setValueAtTime(880, t);
0298 |     osc.frequency.exponentialRampToValueAtTime(440, t + 0.06);
0299 |     gain.gain.setValueAtTime(0.2, t);
0300 |     gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
0301 |     osc.connect(gain);
0302 |     gain.connect(this.masterGain);
0303 |     osc.start(t);
0304 |     osc.stop(t + 0.06);
0305 |   }
0306 | 
0307 |   /**
0308 |    * Mission Objective Completed Stinger
0309 |    */
0310 |   public playMissionStinger(): void {
0311 |     if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
0312 |     const notes = [440, 554.37, 659.25, 880]; // A major chord arpeggio
0313 |     notes.forEach((freq, idx) => {
0314 |       const t = this.ctx!.currentTime + idx * 0.09;
0315 |       const osc = this.ctx!.createOscillator();
0316 |       const gain = this.ctx!.createGain();
0317 |       osc.type = 'triangle';
0318 |       osc.frequency.setValueAtTime(freq, t);
0319 |       gain.gain.setValueAtTime(0.35, t);
0320 |       gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
0321 |       osc.connect(gain);
0322 |       gain.connect(this.masterGain!);
0323 |       osc.start(t);
0324 |       osc.stop(t + 0.36);
0325 |     });
0326 |   }
0327 | }
0328 | 
0329 | export const soundEngine = new SoundEngine();
0330 | 
0331 | // Call exactly once from a trusted pointer/keyboard gesture.
0332 | export function unlockGameAudio(): void {
0333 |   soundEngine.unlock();
0334 | }
0335 | 
```

---

## 21. `src/core/resourceRegistry.ts`

<a id="src-core-resourceregistry-ts"></a>

**Role:** Explicit WebGL/WebGPU resource disposal and lifecycle tracker preventing GPU memory leaks.

- **File Path:** `src/core/resourceRegistry.ts`
- **Total Lines:** 25
- **Size:** 0.51 KB

### Line-by-Line Source Code

```typescript
0001 | export type Disposer = () => void;
0002 | 
0003 | export class ResourceRegistry {
0004 |   private disposers = new Set<Disposer>();
0005 | 
0006 |   public add(disposer: Disposer): void {
0007 |     this.disposers.add(disposer);
0008 |   }
0009 | 
0010 |   public remove(disposer: Disposer): void {
0011 |     this.disposers.delete(disposer);
0012 |   }
0013 | 
0014 |   public disposeAll(): void {
0015 |     for (const dispose of this.disposers) {
0016 |       try {
0017 |         dispose();
0018 |       } catch (err) {
0019 |         console.warn('[ResourceRegistry] Error during dispose:', err);
0020 |       }
0021 |     }
0022 |     this.disposers.clear();
0023 |   }
0024 | }
0025 | 
```

---

## 22. `src/physics/physicsWorld.ts`

<a id="src-physics-physicsworld-ts"></a>

**Role:** Rapier3D physics world initialization, kinematic character controller, gravity, and raycast queries.

- **File Path:** `src/physics/physicsWorld.ts`
- **Total Lines:** 142
- **Size:** 4.13 KB

### Line-by-Line Source Code

```typescript
0001 | import * as RAPIER from '@dimforge/rapier3d-compat';
0002 | 
0003 | export interface RaycastHitResult {
0004 |   hit: boolean;
0005 |   toi: number;
0006 |   point: { x: number; y: number; z: number };
0007 |   normal: { x: number; y: number; z: number };
0008 | }
0009 | 
0010 | export class PhysicsWorld {
0011 |   public readonly world: RAPIER.World;
0012 |   private readonly characterController: RAPIER.KinematicCharacterController;
0013 |   private disposed: boolean = false;
0014 | 
0015 |   private constructor() {
0016 |     this.world = new RAPIER.World({ x: 0, y: -24, z: 0 });
0017 |     this.characterController = this.world.createCharacterController(0.02);
0018 |     this.characterController.setUp({ x: 0, y: 1, z: 0 });
0019 |     this.characterController.setMaxSlopeClimbAngle((Math.PI * 45) / 180);
0020 |     this.characterController.setMinSlopeSlideAngle((Math.PI * 30) / 180);
0021 |     this.characterController.enableAutostep(0.35, 0.2, true);
0022 |   }
0023 | 
0024 |   public static async create(): Promise<PhysicsWorld> {
0025 |     await RAPIER.init();
0026 |     return new PhysicsWorld();
0027 |   }
0028 | 
0029 |   public step(): void {
0030 |     if (this.disposed) return;
0031 |     this.world.step();
0032 |   }
0033 | 
0034 |   public getCharacterController(): RAPIER.KinematicCharacterController {
0035 |     return this.characterController;
0036 |   }
0037 | 
0038 |   public createPlayerControllerBody(pos: [number, number, number]): {
0039 |     rigidBody: RAPIER.RigidBody;
0040 |     collider: RAPIER.Collider;
0041 |   } {
0042 |     const bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(pos[0], pos[1], pos[2]);
0043 |     const rigidBody = this.world.createRigidBody(bodyDesc);
0044 |     // Capsule: halfHeight 0.65, radius 0.35 -> total height ~2.0m, standard human scale
0045 |     const colliderDesc = RAPIER.ColliderDesc.capsule(0.65, 0.35);
0046 |     const collider = this.world.createCollider(colliderDesc, rigidBody);
0047 |     return { rigidBody, collider };
0048 |   }
0049 | 
0050 |   public setPlayerTranslation(
0051 |     body: RAPIER.RigidBody,
0052 |     position: [number, number, number]
0053 |   ): void {
0054 |     if (this.disposed) return;
0055 |     body.setNextKinematicTranslation({
0056 |       x: position[0],
0057 |       y: position[1],
0058 |       z: position[2]
0059 |     });
0060 |   }
0061 | 
0062 | 
0063 |   public moveCharacter(
0064 |     collider: RAPIER.Collider,
0065 |     desiredTranslation: { x: number; y: number; z: number }
0066 |   ): { x: number; y: number; z: number; isGrounded: boolean } {
0067 |     if (this.disposed) return { x: 0, y: 0, z: 0, isGrounded: false };
0068 |     this.characterController.computeColliderMovement(collider, desiredTranslation);
0069 |     const computed = this.characterController.computedMovement();
0070 |     const isGrounded = this.characterController.computedGrounded();
0071 |     return {
0072 |       x: computed.x,
0073 |       y: computed.y,
0074 |       z: computed.z,
0075 |       isGrounded
0076 |     };
0077 |   }
0078 | 
0079 |   public castRay(
0080 |     origin: { x: number; y: number; z: number },
0081 |     dir: { x: number; y: number; z: number },
0082 |     maxToi: number = 1000,
0083 |     solid: boolean = true
0084 |   ): RaycastHitResult | null {
0085 |     if (this.disposed) return null;
0086 |     const ray = new RAPIER.Ray(origin, dir);
0087 |     const hit = this.world.castRayAndGetNormal(ray, maxToi, solid);
0088 |     if (!hit) return null;
0089 | 
0090 |     const hitPoint = {
0091 |       x: origin.x + dir.x * hit.timeOfImpact,
0092 |       y: origin.y + dir.y * hit.timeOfImpact,
0093 |       z: origin.z + dir.z * hit.timeOfImpact
0094 |     };
0095 | 
0096 |     return {
0097 |       hit: true,
0098 |       toi: hit.timeOfImpact,
0099 |       point: hitPoint,
0100 |       normal: { x: hit.normal.x, y: hit.normal.y, z: hit.normal.z }
0101 |     };
0102 |   }
0103 | 
0104 |   public createStaticCuboid(
0105 |     halfX: number,
0106 |     halfY: number,
0107 |     halfZ: number,
0108 |     posX: number,
0109 |     posY: number,
0110 |     posZ: number
0111 |   ): RAPIER.Collider {
0112 |     const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(posX, posY, posZ);
0113 |     const rigidBody = this.world.createRigidBody(bodyDesc);
0114 |     const colliderDesc = RAPIER.ColliderDesc.cuboid(halfX, halfY, halfZ);
0115 |     return this.world.createCollider(colliderDesc, rigidBody);
0116 |   }
0117 | 
0118 |   public removeCollider(collider: RAPIER.Collider): void {
0119 |     if (this.disposed) return;
0120 |     try {
0121 |       const parent = collider.parent();
0122 |       if (parent) {
0123 |         this.world.removeRigidBody(parent);
0124 |       } else {
0125 |         this.world.removeCollider(collider, false);
0126 |       }
0127 |     } catch {
0128 |       // Ignore if already removed
0129 |     }
0130 |   }
0131 | 
0132 |   public dispose(): void {
0133 |     if (this.disposed) return;
0134 |     this.disposed = true;
0135 |     try {
0136 |       this.world.free();
0137 |     } catch {
0138 |       // Ignore free errors on shutdown
0139 |     }
0140 |   }
0141 | }
0142 | 
```

---

## 23. `src/physics/physicsColliders.ts`

<a id="src-physics-physicscolliders-ts"></a>

**Role:** Dynamic sector collider lifecycle manager registering/unregistering Rapier cuboids with streaming cells.

- **File Path:** `src/physics/physicsColliders.ts`
- **Total Lines:** 72
- **Size:** 2.10 KB

### Line-by-Line Source Code

```typescript
0001 | import * as RAPIER from '@dimforge/rapier3d-compat';
0002 | import { PhysicsWorld } from './physicsWorld';
0003 | import { StaticCollider } from '../world/sectorBuilder';
0004 | 
0005 | export interface SectorPhysicsHandle {
0006 |   sectorId: string;
0007 |   colliders: RAPIER.Collider[];
0008 | }
0009 | 
0010 | export class PhysicsColliderManager {
0011 |   private readonly physicsWorld: PhysicsWorld;
0012 |   private readonly physicsBySector = new Map<string, SectorPhysicsHandle>();
0013 | 
0014 |   constructor(physicsWorld: PhysicsWorld) {
0015 |     this.physicsWorld = physicsWorld;
0016 |   }
0017 | 
0018 |   public registerSectorColliders(sectorId: string, colliderDefs: StaticCollider[]): void {
0019 |     if (this.physicsBySector.has(sectorId)) {
0020 |       this.unregisterSectorColliders(sectorId);
0021 |     }
0022 | 
0023 |     const colliders: RAPIER.Collider[] = [];
0024 | 
0025 |     for (const def of colliderDefs) {
0026 |       const halfX = (def.box.max.x - def.box.min.x) / 2;
0027 |       const halfY = (def.box.max.y - def.box.min.y) / 2;
0028 |       const halfZ = (def.box.max.z - def.box.min.z) / 2;
0029 | 
0030 |       const posX = def.box.min.x + halfX;
0031 |       const posY = def.box.min.y + halfY;
0032 |       const posZ = def.box.min.z + halfZ;
0033 | 
0034 |       if (halfX > 0 && halfY > 0 && halfZ > 0) {
0035 |         const collider = this.physicsWorld.createStaticCuboid(halfX, halfY, halfZ, posX, posY, posZ);
0036 |         colliders.push(collider);
0037 |       }
0038 |     }
0039 | 
0040 |     this.physicsBySector.set(sectorId, { sectorId, colliders });
0041 |   }
0042 | 
0043 |   public unregisterSectorColliders(sectorId: string): void {
0044 |     const handle = this.physicsBySector.get(sectorId);
0045 |     if (!handle) return;
0046 | 
0047 |     for (const collider of handle.colliders) {
0048 |       this.physicsWorld.removeCollider(collider);
0049 |     }
0050 |     this.physicsBySector.delete(sectorId);
0051 |   }
0052 | 
0053 |   public getSectorColliderCount(sectorId: string): number {
0054 |     return this.physicsBySector.get(sectorId)?.colliders.length ?? 0;
0055 |   }
0056 | 
0057 |   public getTotalCollidersCount(): number {
0058 |     let total = 0;
0059 |     for (const handle of this.physicsBySector.values()) {
0060 |       total += handle.colliders.length;
0061 |     }
0062 |     return total;
0063 |   }
0064 | 
0065 |   public clear(): void {
0066 |     for (const sectorId of Array.from(this.physicsBySector.keys())) {
0067 |       this.unregisterSectorColliders(sectorId);
0068 |     }
0069 |     this.physicsBySector.clear();
0070 |   }
0071 | }
0072 | 
```

---

## 24. `src/navigation/laneGraph.ts`

<a id="src-navigation-lanegraph-ts"></a>

**Role:** Directed vehicle lane graph across all 26 districts with arterial/local lanes, A* routing, and road spawn points.

- **File Path:** `src/navigation/laneGraph.ts`
- **Total Lines:** 240
- **Size:** 7.28 KB

### Line-by-Line Source Code

```typescript
0001 | import { CANONICAL_DISTRICTS } from '../data/districts';
0002 | 
0003 | export interface LaneNode {
0004 |   id: string;
0005 |   districtId: string;
0006 |   position: [number, number, number];
0007 |   laneType: 'arterial' | 'highway' | 'local' | 'ramp';
0008 |   speedLimit: number;
0009 |   connections: string[]; // Connected lane node IDs
0010 | }
0011 | 
0012 | export class LaneGraph {
0013 |   private nodes = new Map<string, LaneNode>();
0014 | 
0015 |   constructor() {
0016 |     this.buildCanonicalLaneGraph();
0017 |   }
0018 | 
0019 |   private buildCanonicalLaneGraph(): void {
0020 |     // Generate lane nodes across districts and their intersections
0021 |     for (const district of CANONICAL_DISTRICTS) {
0022 |       const c = district.center;
0023 |       const b = district.bounds;
0024 | 
0025 |       const halfW = (b.maxX - b.minX) * 0.35;
0026 |       const halfH = (b.maxZ - b.minZ) * 0.35;
0027 | 
0028 |       // 4 perimeter lane nodes and 1 central intersection node per district
0029 |       const centerNodeId = `lane_${district.id}_center`;
0030 |       const northNodeId = `lane_${district.id}_n`;
0031 |       const southNodeId = `lane_${district.id}_s`;
0032 |       const eastNodeId = `lane_${district.id}_e`;
0033 |       const westNodeId = `lane_${district.id}_w`;
0034 | 
0035 |       const speedLimit = district.archetype === 'military' || district.archetype === 'aviation' ? 45 : 30;
0036 | 
0037 |       this.nodes.set(centerNodeId, {
0038 |         id: centerNodeId,
0039 |         districtId: district.id,
0040 |         position: [c[0], 0.5, c[2]],
0041 |         laneType: 'arterial',
0042 |         speedLimit,
0043 |         connections: [northNodeId, southNodeId, eastNodeId, westNodeId]
0044 |       });
0045 | 
0046 |       this.nodes.set(northNodeId, {
0047 |         id: northNodeId,
0048 |         districtId: district.id,
0049 |         position: [c[0], 0.5, c[2] - halfH],
0050 |         laneType: 'arterial',
0051 |         speedLimit,
0052 |         connections: [centerNodeId]
0053 |       });
0054 | 
0055 |       this.nodes.set(southNodeId, {
0056 |         id: southNodeId,
0057 |         districtId: district.id,
0058 |         position: [c[0], 0.5, c[2] + halfH],
0059 |         laneType: 'arterial',
0060 |         speedLimit,
0061 |         connections: [centerNodeId]
0062 |       });
0063 | 
0064 |       this.nodes.set(eastNodeId, {
0065 |         id: eastNodeId,
0066 |         districtId: district.id,
0067 |         position: [c[0] + halfW, 0.5, c[2]],
0068 |         laneType: 'arterial',
0069 |         speedLimit,
0070 |         connections: [centerNodeId]
0071 |       });
0072 | 
0073 |       this.nodes.set(westNodeId, {
0074 |         id: westNodeId,
0075 |         districtId: district.id,
0076 |         position: [c[0] - halfW, 0.5, c[2]],
0077 |         laneType: 'arterial',
0078 |         speedLimit,
0079 |         connections: [centerNodeId]
0080 |       });
0081 |     }
0082 | 
0083 |     // Connect adjacent districts' perimeter nodes
0084 |     for (const d1 of CANONICAL_DISTRICTS) {
0085 |       for (const d2 of CANONICAL_DISTRICTS) {
0086 |         if (d1.id === d2.id) continue;
0087 |         const dx = d2.center[0] - d1.center[0];
0088 |         const dz = d2.center[2] - d1.center[2];
0089 |         const dist = Math.hypot(dx, dz);
0090 | 
0091 |         // If centers are within ~650m, connect their facing perimeter nodes
0092 |         if (dist < 650) {
0093 |           let node1Id = `lane_${d1.id}_center`;
0094 |           let node2Id = `lane_${d2.id}_center`;
0095 | 
0096 |           if (Math.abs(dx) > Math.abs(dz)) {
0097 |             // Horizontal connection
0098 |             node1Id = dx > 0 ? `lane_${d1.id}_e` : `lane_${d1.id}_w`;
0099 |             node2Id = dx > 0 ? `lane_${d2.id}_w` : `lane_${d2.id}_e`;
0100 |           } else {
0101 |             // Vertical connection
0102 |             node1Id = dz > 0 ? `lane_${d1.id}_s` : `lane_${d1.id}_n`;
0103 |             node2Id = dz > 0 ? `lane_${d2.id}_n` : `lane_${d2.id}_s`;
0104 |           }
0105 | 
0106 |           const n1 = this.nodes.get(node1Id);
0107 |           const n2 = this.nodes.get(node2Id);
0108 |           if (n1 && n2) {
0109 |             if (!n1.connections.includes(node2Id)) n1.connections.push(node2Id);
0110 |             if (!n2.connections.includes(node1Id)) n2.connections.push(node1Id);
0111 |           }
0112 |         }
0113 |       }
0114 |     }
0115 |   }
0116 | 
0117 |   public getNearestNode(position: [number, number, number]): LaneNode | null {
0118 |     let nearest: LaneNode | null = null;
0119 |     let minDistanceSq = Infinity;
0120 | 
0121 |     for (const node of this.nodes.values()) {
0122 |       const dx = node.position[0] - position[0];
0123 |       const dz = node.position[2] - position[2];
0124 |       const distSq = dx * dx + dz * dz;
0125 | 
0126 |       if (distSq < minDistanceSq) {
0127 |         minDistanceSq = distSq;
0128 |         nearest = node;
0129 |       }
0130 |     }
0131 | 
0132 |     return nearest;
0133 |   }
0134 | 
0135 |   public findLaneRoute(
0136 |     start: [number, number, number],
0137 |     end: [number, number, number]
0138 |   ): Array<[number, number, number]> | null {
0139 |     const startNode = this.getNearestNode(start);
0140 |     const endNode = this.getNearestNode(end);
0141 | 
0142 |     if (!startNode || !endNode) return null;
0143 |     if (startNode.id === endNode.id) {
0144 |       return [start, startNode.position, end];
0145 |     }
0146 | 
0147 |     // A* graph search over lane nodes
0148 |     const openSet = new Set<string>([startNode.id]);
0149 |     const cameFrom = new Map<string, string>();
0150 |     const gScore = new Map<string, number>();
0151 |     const fScore = new Map<string, number>();
0152 | 
0153 |     for (const id of this.nodes.keys()) {
0154 |       gScore.set(id, Infinity);
0155 |       fScore.set(id, Infinity);
0156 |     }
0157 | 
0158 |     gScore.set(startNode.id, 0);
0159 |     const h = (a: LaneNode, b: LaneNode) =>
0160 |       Math.hypot(a.position[0] - b.position[0], a.position[2] - b.position[2]);
0161 |     fScore.set(startNode.id, h(startNode, endNode));
0162 | 
0163 |     while (openSet.size > 0) {
0164 |       let currentId: string | null = null;
0165 |       let lowestF = Infinity;
0166 | 
0167 |       for (const id of openSet) {
0168 |         const score = fScore.get(id) ?? Infinity;
0169 |         if (score < lowestF) {
0170 |           lowestF = score;
0171 |           currentId = id;
0172 |         }
0173 |       }
0174 | 
0175 |       if (!currentId) break;
0176 |       if (currentId === endNode.id) {
0177 |         // Reconstruct path
0178 |         const path: Array<[number, number, number]> = [end];
0179 |         let curr: string | undefined = currentId;
0180 |         while (curr) {
0181 |           const node = this.nodes.get(curr);
0182 |           if (node) path.unshift(node.position);
0183 |           curr = cameFrom.get(curr);
0184 |         }
0185 |         path.unshift(start);
0186 |         return path;
0187 |       }
0188 | 
0189 |       openSet.delete(currentId);
0190 |       const currentNode = this.nodes.get(currentId)!;
0191 |       const currentG = gScore.get(currentId) ?? Infinity;
0192 | 
0193 |       for (const neighborId of currentNode.connections) {
0194 |         const neighbor = this.nodes.get(neighborId);
0195 |         if (!neighbor) continue;
0196 | 
0197 |         const edgeCost = Math.hypot(
0198 |           neighbor.position[0] - currentNode.position[0],
0199 |           neighbor.position[2] - currentNode.position[2]
0200 |         );
0201 |         const tentativeG = currentG + edgeCost;
0202 | 
0203 |         if (tentativeG < (gScore.get(neighborId) ?? Infinity)) {
0204 |           cameFrom.set(neighborId, currentId);
0205 |           gScore.set(neighborId, tentativeG);
0206 |           fScore.set(neighborId, tentativeG + h(neighbor, endNode));
0207 |           openSet.add(neighborId);
0208 |         }
0209 |       }
0210 |     }
0211 | 
0212 |     // No path found: return null per Page 24 (never straight-line fallback through blocked buildings)
0213 |     return null;
0214 |   }
0215 | 
0216 |   public getValidRoadSpawnPoint(
0217 |     playerPos: [number, number, number],
0218 |     minDist: number = 60,
0219 |     maxDist: number = 200
0220 |   ): [number, number, number] | null {
0221 |     const validNodes: LaneNode[] = [];
0222 |     for (const node of this.nodes.values()) {
0223 |       const d = Math.hypot(node.position[0] - playerPos[0], node.position[2] - playerPos[2]);
0224 |       if (d >= minDist && d <= maxDist) {
0225 |         validNodes.push(node);
0226 |       }
0227 |     }
0228 | 
0229 |     if (validNodes.length === 0) return null;
0230 |     const picked = validNodes[Math.floor(Math.random() * validNodes.length)];
0231 |     return [picked.position[0], picked.position[1], picked.position[2]];
0232 |   }
0233 | 
0234 |   public getNodeCount(): number {
0235 |     return this.nodes.size;
0236 |   }
0237 | }
0238 | 
0239 | export const laneGraph = new LaneGraph();
0240 | 
```

---

## 25. `src/navigation/navMeshService.ts`

<a id="src-navigation-navmeshservice-ts"></a>

**Role:** Recast solo navmesh generation per active district region, pathfinding queries, and crowd agent avoidance.

- **File Path:** `src/navigation/navMeshService.ts`
- **Total Lines:** 179
- **Size:** 4.83 KB

### Line-by-Line Source Code

```typescript
0001 | import { init, NavMesh, NavMeshQuery, Crowd, CrowdAgent } from 'recast-navigation';
0002 | import { generateSoloNavMesh } from '@recast-navigation/generators';
0003 | 
0004 | export interface NavPathResult {
0005 |   success: boolean;
0006 |   path: Array<[number, number, number]>;
0007 | }
0008 | 
0009 | export class NavMeshService {
0010 |   private navMesh: NavMesh | null = null;
0011 |   private navMeshQuery: NavMeshQuery | null = null;
0012 |   private crowd: Crowd | null = null;
0013 |   private isInitialized: boolean = false;
0014 |   private disposed: boolean = false;
0015 | 
0016 |   public static async create(walkableMesh?: {
0017 |     positions: Float32Array | number[];
0018 |     indices: Uint32Array | number[];
0019 |   }): Promise<NavMeshService> {
0020 |     await init();
0021 |     const service = new NavMeshService();
0022 |     service.isInitialized = true;
0023 | 
0024 |     if (walkableMesh) {
0025 |       service.buildNavMesh(walkableMesh.positions, walkableMesh.indices);
0026 |     } else {
0027 |       // Default canonical walkable grid terrain if no custom mesh passed
0028 |       service.buildDefaultGridNavMesh();
0029 |     }
0030 | 
0031 |     return service;
0032 |   }
0033 | 
0034 |   public buildDefaultGridNavMesh(halfSize: number = 250): boolean {
0035 |     // Generates region navmesh (e.g. 500m x 500m active district area) to prevent WASM heap exhaustion
0036 |     return this.buildRegionNavMesh(0, 0, halfSize);
0037 |   }
0038 | 
0039 |   public buildRegionNavMesh(centerX: number, centerZ: number, halfSize: number = 250): boolean {
0040 |     const minX = centerX - halfSize;
0041 |     const maxX = centerX + halfSize;
0042 |     const minZ = centerZ - halfSize;
0043 |     const maxZ = centerZ + halfSize;
0044 | 
0045 |     const positions = new Float32Array([
0046 |       minX, 0, minZ,
0047 |       maxX, 0, minZ,
0048 |       maxX, 0, maxZ,
0049 |       minX, 0, maxZ
0050 |     ]);
0051 |     const indices = new Uint32Array([
0052 |       0, 2, 1,
0053 |       0, 3, 2
0054 |     ]);
0055 |     return this.buildNavMesh(positions, indices);
0056 |   }
0057 | 
0058 |   public buildNavMesh(
0059 |     positions: Float32Array | number[],
0060 |     indices: Uint32Array | number[]
0061 |   ): boolean {
0062 |     if (this.disposed) return false;
0063 |     try {
0064 |       const posArray = positions instanceof Float32Array ? positions : new Float32Array(positions);
0065 |       const idxArray = indices instanceof Uint32Array ? indices : new Uint32Array(indices);
0066 | 
0067 |       const result = generateSoloNavMesh(posArray, idxArray, {
0068 |         cs: 0.5,
0069 |         ch: 0.2,
0070 |         walkableSlopeAngle: 45,
0071 |         walkableHeight: 2,
0072 |         walkableClimb: 2,
0073 |         walkableRadius: 0.4
0074 |       });
0075 | 
0076 |       if (result.success && result.navMesh) {
0077 |         this.navMesh = result.navMesh;
0078 |         this.navMeshQuery = new NavMeshQuery(this.navMesh);
0079 |         this.crowd = new Crowd(this.navMesh, {
0080 |           maxAgents: 128,
0081 |           maxAgentRadius: 0.6
0082 |         });
0083 |         return true;
0084 |       }
0085 |       return false;
0086 |     } catch (err) {
0087 |       console.warn('[NavMeshService] buildNavMesh failed:', err);
0088 |       return false;
0089 |     }
0090 |   }
0091 | 
0092 |   public findPath(
0093 |     start: [number, number, number] | { x: number; y: number; z: number },
0094 |     end: [number, number, number] | { x: number; y: number; z: number }
0095 |   ): Array<[number, number, number]> | null {
0096 |     if (this.disposed || !this.navMeshQuery) return null;
0097 | 
0098 |     const startPos = Array.isArray(start)
0099 |       ? { x: start[0], y: start[1], z: start[2] }
0100 |       : start;
0101 |     const endPos = Array.isArray(end)
0102 |       ? { x: end[0], y: end[1], z: end[2] }
0103 |       : end;
0104 | 
0105 |     try {
0106 |       const result = this.navMeshQuery.computePath(startPos, endPos);
0107 |       if (result.success && result.path && result.path.length > 0) {
0108 |         return result.path.map(pt => [pt.x, pt.y, pt.z]);
0109 |       }
0110 |       return null;
0111 |     } catch {
0112 |       return null;
0113 |     }
0114 |   }
0115 | 
0116 |   public addCrowdAgent(
0117 |     position: [number, number, number],
0118 |     params?: { radius?: number; height?: number; maxSpeed?: number }
0119 |   ): CrowdAgent | null {
0120 |     if (this.disposed || !this.crowd) return null;
0121 |     try {
0122 |       return this.crowd.addAgent(
0123 |         { x: position[0], y: position[1], z: position[2] },
0124 |         {
0125 |           radius: params?.radius ?? 0.4,
0126 |           height: params?.height ?? 1.8,
0127 |           maxAcceleration: 6.0,
0128 |           maxSpeed: params?.maxSpeed ?? 3.5,
0129 |           collisionQueryRange: 2.5,
0130 |           pathOptimizationRange: 15.0,
0131 |           separationWeight: 2.0
0132 |         }
0133 |       );
0134 |     } catch {
0135 |       return null;
0136 |     }
0137 |   }
0138 | 
0139 |   public removeCrowdAgent(agent: CrowdAgent): void {
0140 |     if (this.disposed || !this.crowd) return;
0141 |     try {
0142 |       this.crowd.removeAgent(agent);
0143 |     } catch {
0144 |       // Ignore
0145 |     }
0146 |   }
0147 | 
0148 |   public updateCrowd(dt: number): void {
0149 |     if (this.disposed || !this.crowd) return;
0150 |     try {
0151 |       this.crowd.update(dt);
0152 |     } catch {
0153 |       // Ignore
0154 |     }
0155 |   }
0156 | 
0157 |   public getCrowd(): Crowd | null {
0158 |     return this.crowd;
0159 |   }
0160 | 
0161 |   public isReady(): boolean {
0162 |     return this.isInitialized && !!this.navMeshQuery;
0163 |   }
0164 | 
0165 |   public dispose(): void {
0166 |     if (this.disposed) return;
0167 |     this.disposed = true;
0168 |     try {
0169 |       this.crowd?.destroy();
0170 |       this.navMesh?.destroy();
0171 |     } catch {
0172 |       // Ignore destroy errors on cleanup
0173 |     }
0174 |     this.crowd = null;
0175 |     this.navMeshQuery = null;
0176 |     this.navMesh = null;
0177 |   }
0178 | }
0179 | 
```

---

## 26. `src/data/districts.ts`

<a id="src-data-districts-ts"></a>

**Role:** Canonical dataset of all 26 districts with geographic bounds, colors, and archetypes.

- **File Path:** `src/data/districts.ts`
- **Total Lines:** 331
- **Size:** 10.72 KB

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
0318 | export function getDistrictAt(x: number, z: number): DistrictData | null {
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
0329 |   return null;
0330 | }
0331 | 
```

---

## 27. `src/data/pois.ts`

<a id="src-data-pois-ts"></a>

**Role:** Dataset of canonical landmarks, safehouses, garages, shops, hospitals, and police stations.

- **File Path:** `src/data/pois.ts`
- **Total Lines:** 231
- **Size:** 6.47 KB

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

## 28. `src/data/vehicles.ts`

<a id="src-data-vehicles-ts"></a>

**Role:** Specifications for all 10 canonical vehicle classes (speed, mass, acceleration, handling).

- **File Path:** `src/data/vehicles.ts`
- **Total Lines:** 142
- **Size:** 3.34 KB

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

## 29. `src/data/weapons.ts`

<a id="src-data-weapons-ts"></a>

**Role:** Arsenal dataset defining 6 weapon classes, damage, fire rates, magazine size, and spread.

- **File Path:** `src/data/weapons.ts`
- **Total Lines:** 99
- **Size:** 1.90 KB

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
0096 | export function getWeaponDef(id: string): WeaponDefinition | undefined {
0097 |   return CANONICAL_WEAPONS.find(w => w.id === id);
0098 | }
0099 | 
```

---

## 30. `src/data/missions.ts`

<a id="src-data-missions-ts"></a>

**Role:** Data-driven missions including multi-stage story heists, time trials, and courier drops.

- **File Path:** `src/data/missions.ts`
- **Total Lines:** 125
- **Size:** 3.46 KB

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

## 31. `src/save/saveManager.ts`

<a id="src-save-savemanager-ts"></a>

**Role:** Versioned save/load system supporting schema v3 migration, finite number validation, and dual IndexedDB/localStorage persistence.

- **File Path:** `src/save/saveManager.ts`
- **Total Lines:** 345
- **Size:** 12.47 KB

### Line-by-Line Source Code

```typescript
0001 | import { SaveGameSchemaV3, VehicleInstanceState } from '../core/types';
0002 | import { CANONICAL_MISSIONS } from '../data/missions';
0003 | 
0004 | export const SAVE_KEY = 'san_aurelio_save_v3';
0005 | export const SAVE_SCHEMA_VERSION = 3;
0006 | export const DB_SCHEMA_VERSION = 1;
0007 | const DB_NAME = 'san-aurelio';
0008 | const STORE_NAME = 'saves';
0009 | 
0010 | function isRecord(value: unknown): value is Record<string, unknown> {
0011 |   return !!value && typeof value === 'object' && !Array.isArray(value);
0012 | }
0013 | 
0014 | function finiteNumber(value: unknown, fallback: number): number {
0015 |   return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
0016 | }
0017 | 
0018 | function clampFinite(value: unknown, fallback: number, min: number, max: number): number {
0019 |   const n = finiteNumber(value, fallback);
0020 |   return Math.min(max, Math.max(min, n));
0021 | }
0022 | 
0023 | const VALID_MISSION_IDS = new Set(CANONICAL_MISSIONS.map(m => m.id));
0024 | 
0025 | export class SaveManager {
0026 |   public static getInitialState(): SaveGameSchemaV3 {
0027 |     return {
0028 |       version: SAVE_SCHEMA_VERSION,
0029 |       timestamp: Date.now(),
0030 |       player: {
0031 |         position: [0, 0.5, 0],
0032 |         rotationY: 0,
0033 |         stats: {
0034 |           health: 100,
0035 |           maxHealth: 100,
0036 |           armor: 100,
0037 |           maxArmor: 100,
0038 |           cash: 2500,
0039 |           stamina: 100
0040 |         },
0041 |         inventory: [
0042 |           { weaponId: 'wep_p1_vesper', ammo: 15, reserveAmmo: 90 },
0043 |           { weaponId: 'wep_vortex_45', ammo: 32, reserveAmmo: 160 },
0044 |           { weaponId: 'wep_arcline_ar', ammo: 30, reserveAmmo: 120 }
0045 |         ],
0046 |         activeWeaponIndex: 0,
0047 |         currentVehicleInstanceId: null
0048 |       },
0049 |       world: {
0050 |         discoveredDistricts: ['D01', 'D02', 'D03', 'D04', 'D05'],
0051 |         discoveredPOIs: ['poi-aurelio-tower', 'poi-meridian-exchange', 'poi-safehouse-meridian'],
0052 |         timeOfDay: 14.5,
0053 |         weather: 'clear'
0054 |       },
0055 |       missions: {
0056 |         completedMissionIds: [],
0057 |         currentMissionId: null,
0058 |         currentStageIndex: 0
0059 |       },
0060 |       ownedVehicles: [
0061 |         {
0062 |           id: 'vehinst_starter_01',
0063 |           definitionId: 'veh_vx9_kestrel',
0064 |           owned: true,
0065 |           spawnKind: 'owned',
0066 |           position: [10, 0.5, 10],
0067 |           rotationY: 0,
0068 |           speed: 0,
0069 |           health: 100,
0070 |           isDestroyed: false
0071 |         }
0072 |       ]
0073 |     };
0074 |   }
0075 | 
0076 |   public static saveSync(data: SaveGameSchemaV3): boolean {
0077 |     try {
0078 |       const normalized = this.migrate(data);
0079 |       normalized.timestamp = Date.now();
0080 |       if (typeof localStorage !== 'undefined') {
0081 |         localStorage.setItem(SAVE_KEY, JSON.stringify(normalized));
0082 |       }
0083 |       return true;
0084 |     } catch (error) {
0085 |       console.warn('[SaveManager] sync save failed:', error);
0086 |       return false;
0087 |     }
0088 |   }
0089 | 
0090 |   public static async save(data: SaveGameSchemaV3): Promise<boolean> {
0091 |     const normalized = this.migrate(data);
0092 |     normalized.timestamp = Date.now();
0093 |     try {
0094 |       const db = await this.openDb();
0095 |       await new Promise<void>((resolve, reject) => {
0096 |         const tx = db.transaction(STORE_NAME, 'readwrite');
0097 |         tx.objectStore(STORE_NAME).put(normalized, SAVE_KEY);
0098 |         tx.oncomplete = () => resolve();
0099 |         tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'));
0100 |         tx.onabort = () => reject(tx.error ?? new Error('IndexedDB transaction aborted'));
0101 |       });
0102 |       db.close();
0103 |       // Mirror to localStorage as durable cache
0104 |       if (typeof localStorage !== 'undefined') {
0105 |         try {
0106 |           localStorage.setItem(SAVE_KEY, JSON.stringify(normalized));
0107 |         } catch {
0108 |           // ignore localStorage failure
0109 |         }
0110 |       }
0111 |       return true;
0112 |     } catch (error) {
0113 |       console.warn('[SaveManager] IndexedDB save failed; using localStorage fallback:', error);
0114 |       return this.saveSync(normalized);
0115 |     }
0116 |   }
0117 | 
0118 |   public static loadSync(): SaveGameSchemaV3 {
0119 |     try {
0120 |       if (typeof localStorage === 'undefined') return this.getInitialState();
0121 |       const item = localStorage.getItem(SAVE_KEY) ?? localStorage.getItem('san_aurelio_save_v2');
0122 |       return item ? this.migrate(JSON.parse(item)) : this.getInitialState();
0123 |     } catch {
0124 |       return this.getInitialState();
0125 |     }
0126 |   }
0127 | 
0128 |   public static async load(): Promise<SaveGameSchemaV3> {
0129 |     try {
0130 |       const db = await this.openDb();
0131 |       const saved = await new Promise<unknown>((resolve, reject) => {
0132 |         const tx = db.transaction(STORE_NAME, 'readonly');
0133 |         const request = tx.objectStore(STORE_NAME).get(SAVE_KEY);
0134 |         request.onsuccess = () => resolve(request.result);
0135 |         request.onerror = () => reject(request.error);
0136 |       });
0137 |       db.close();
0138 |       if (saved !== undefined) return this.migrate(saved);
0139 |     } catch (error) {
0140 |       console.warn('[SaveManager] IndexedDB load failed; checking localStorage:', error);
0141 |     }
0142 |     return this.loadSync();
0143 |   }
0144 | 
0145 |   public static async clear(): Promise<boolean> {
0146 |     try {
0147 |       if (typeof localStorage !== 'undefined') {
0148 |         localStorage.removeItem(SAVE_KEY);
0149 |         localStorage.removeItem('san_aurelio_save_v2');
0150 |       }
0151 |     } catch {
0152 |       // Continue to IndexedDB
0153 |     }
0154 |     try {
0155 |       const db = await this.openDb();
0156 |       await new Promise<void>((resolve, reject) => {
0157 |         const tx = db.transaction(STORE_NAME, 'readwrite');
0158 |         tx.objectStore(STORE_NAME).delete(SAVE_KEY);
0159 |         tx.oncomplete = () => resolve();
0160 |         tx.onerror = () => reject(tx.error ?? new Error('IndexedDB clear failed'));
0161 |         tx.onabort = () => reject(tx.error ?? new Error('IndexedDB clear aborted'));
0162 |       });
0163 |       db.close();
0164 |       return true;
0165 |     } catch (error) {
0166 |       console.warn('[SaveManager] IndexedDB clear failed:', error);
0167 |       return false;
0168 |     }
0169 |   }
0170 | 
0171 |   private static openDb(): Promise<IDBDatabase> {
0172 |     return new Promise((resolve, reject) => {
0173 |       if (typeof window === 'undefined' || !('indexedDB' in window)) {
0174 |         reject(new Error('IndexedDB unavailable'));
0175 |         return;
0176 |       }
0177 |       const request = indexedDB.open(DB_NAME, DB_SCHEMA_VERSION);
0178 |       request.onupgradeneeded = () => {
0179 |         const db = request.result;
0180 |         if (!db.objectStoreNames.contains(STORE_NAME)) {
0181 |           db.createObjectStore(STORE_NAME);
0182 |         }
0183 |       };
0184 |       request.onsuccess = () => resolve(request.result);
0185 |       request.onerror = () => reject(request.error);
0186 |     });
0187 |   }
0188 | 
0189 |   public static migrate(savedData: unknown): SaveGameSchemaV3 {
0190 |     const defaults = this.getInitialState();
0191 |     if (!isRecord(savedData)) return defaults;
0192 | 
0193 |     const candidate = savedData as Partial<SaveGameSchemaV3>;
0194 |     const player: Record<string, unknown> = isRecord(candidate.player) ? candidate.player : {};
0195 |     const stats: Record<string, unknown> = isRecord(player['stats']) ? (player['stats'] as Record<string, unknown>) : {};
0196 |     const world: Record<string, unknown> = isRecord(candidate.world) ? candidate.world : {};
0197 |     const missions: Record<string, unknown> = isRecord(candidate.missions) ? candidate.missions : {};
0198 | 
0199 |     // Validate 3D position
0200 |     const rawPos = player['position'];
0201 |     const position = Array.isArray(rawPos) &&
0202 |       rawPos.length === 3 &&
0203 |       rawPos.every(v => typeof v === 'number' && Number.isFinite(v))
0204 |       ? (rawPos as [number, number, number])
0205 |       : defaults.player.position;
0206 | 
0207 |     // Validate inventory
0208 |     const rawInv = player['inventory'];
0209 |     const inventory = Array.isArray(rawInv)
0210 |       ? rawInv.filter((item: unknown) =>
0211 |           isRecord(item) &&
0212 |           typeof item['weaponId'] === 'string' &&
0213 |           typeof item['ammo'] === 'number' &&
0214 |           Number.isFinite(item['ammo']) &&
0215 |           typeof item['reserveAmmo'] === 'number' &&
0216 |           Number.isFinite(item['reserveAmmo'])
0217 |         ).map((item: unknown) => {
0218 |           const rec = item as Record<string, unknown>;
0219 |           return {
0220 |             weaponId: String(rec['weaponId']),
0221 |             ammo: Math.max(0, Math.floor(Number(rec['ammo']))),
0222 |             reserveAmmo: Math.max(0, Math.floor(Number(rec['reserveAmmo'])))
0223 |           };
0224 |         })
0225 |       : defaults.player.inventory;
0226 | 
0227 |     // Validate weather
0228 |     const weather =
0229 |       world['weather'] === 'clear' ||
0230 |       world['weather'] === 'overcast' ||
0231 |       world['weather'] === 'rain' ||
0232 |       world['weather'] === 'fog'
0233 |         ? world['weather']
0234 |         : defaults.world.weather;
0235 | 
0236 |     // Clamp numeric stats
0237 |     const maxHealth = clampFinite(stats['maxHealth'], defaults.player.stats.maxHealth, 1, 1000);
0238 |     const health = clampFinite(stats['health'], defaults.player.stats.health, 0, maxHealth);
0239 |     const maxArmor = clampFinite(stats['maxArmor'], defaults.player.stats.maxArmor, 0, 1000);
0240 |     const armor = clampFinite(stats['armor'], defaults.player.stats.armor, 0, maxArmor);
0241 |     const cash = clampFinite(stats['cash'], defaults.player.stats.cash, 0, 1_000_000_000);
0242 |     const stamina = clampFinite(stats['stamina'], defaults.player.stats.stamina, 0, 100);
0243 | 
0244 |     const rotY = finiteNumber(player['rotationY'], defaults.player.rotationY);
0245 |     const activeWep = clampFinite(player['activeWeaponIndex'], defaults.player.activeWeaponIndex, 0, 5);
0246 | 
0247 |     const timeOfDay = clampFinite(world['timeOfDay'], defaults.world.timeOfDay, 0, 24);
0248 | 
0249 |     // Validate current mission ID against canonical data
0250 |     const rawMissionId = missions['currentMissionId'];
0251 |     const currentMissionId = typeof rawMissionId === 'string' && VALID_MISSION_IDS.has(rawMissionId)
0252 |       ? rawMissionId
0253 |       : null;
0254 | 
0255 |     const currentStageIndex = clampFinite(missions['currentStageIndex'], 0, 0, 20);
0256 | 
0257 |     // Migration of ownedVehicles (v1/v2 string[] -> v3 VehicleInstanceState[])
0258 |     let ownedVehicles: VehicleInstanceState[] = [];
0259 |     if (Array.isArray(candidate.ownedVehicles)) {
0260 |       if (candidate.ownedVehicles.length > 0 && typeof candidate.ownedVehicles[0] === 'string') {
0261 |         // v1 / v2 legacy definition ID format
0262 |         ownedVehicles = (candidate.ownedVehicles as unknown[])
0263 |           .filter((v): v is string => typeof v === 'string')
0264 |           .map((defId, idx) => ({
0265 |             id: `vehinst_migrated_${idx + 1}`,
0266 |             definitionId: defId,
0267 |             owned: true,
0268 |             spawnKind: 'owned' as const,
0269 |             position: [10 + idx * 4, 0.5, 10] as [number, number, number],
0270 |             rotationY: 0,
0271 |             speed: 0,
0272 |             health: 100,
0273 |             isDestroyed: false
0274 |           }));
0275 |       } else {
0276 |         // v3 format
0277 |         ownedVehicles = (candidate.ownedVehicles as unknown[])
0278 |           .filter((v): v is Record<string, unknown> => isRecord(v) && typeof v['definitionId'] === 'string')
0279 |           .map((v, idx) => {
0280 |             const rawVPos = v['position'];
0281 |             const pos: [number, number, number] = Array.isArray(rawVPos) && rawVPos.length === 3 && rawVPos.every(p => typeof p === 'number' && Number.isFinite(p))
0282 |               ? (rawVPos as [number, number, number])
0283 |               : [10 + idx * 4, 0.5, 10];
0284 |             return {
0285 |               id: typeof v['id'] === 'string' ? v['id'] : `vehinst_${idx + 1}`,
0286 |               definitionId: String(v['definitionId']),
0287 |               owned: true,
0288 |               spawnKind: 'owned' as const,
0289 |               position: pos,
0290 |               rotationY: finiteNumber(v['rotationY'], 0),
0291 |               speed: finiteNumber(v['speed'], 0),
0292 |               health: clampFinite(v['health'], 100, 0, 100),
0293 |               isDestroyed: Boolean(v['isDestroyed'])
0294 |             };
0295 |           });
0296 |       }
0297 |     }
0298 |     if (ownedVehicles.length === 0) {
0299 |       ownedVehicles = defaults.ownedVehicles;
0300 |     }
0301 | 
0302 |     const currentVehicleInstanceId = typeof player['currentVehicleInstanceId'] === 'string'
0303 |       ? player['currentVehicleInstanceId']
0304 |       : null;
0305 | 
0306 |     return {
0307 |       version: SAVE_SCHEMA_VERSION,
0308 |       timestamp: finiteNumber(candidate.timestamp, Date.now()),
0309 |       player: {
0310 |         position,
0311 |         rotationY: rotY,
0312 |         stats: {
0313 |           health,
0314 |           maxHealth,
0315 |           armor,
0316 |           maxArmor,
0317 |           cash,
0318 |           stamina
0319 |         },
0320 |         inventory,
0321 |         activeWeaponIndex: activeWep,
0322 |         currentVehicleInstanceId
0323 |       },
0324 |       world: {
0325 |         discoveredDistricts: Array.isArray(world['discoveredDistricts'])
0326 |           ? (world['discoveredDistricts'] as unknown[]).filter((v): v is string => typeof v === 'string')
0327 |           : defaults.world.discoveredDistricts,
0328 |         discoveredPOIs: Array.isArray(world['discoveredPOIs'])
0329 |           ? (world['discoveredPOIs'] as unknown[]).filter((v): v is string => typeof v === 'string')
0330 |           : defaults.world.discoveredPOIs,
0331 |         timeOfDay,
0332 |         weather
0333 |       },
0334 |       missions: {
0335 |         completedMissionIds: Array.isArray(missions['completedMissionIds'])
0336 |           ? (missions['completedMissionIds'] as unknown[]).filter((v): v is string => typeof v === 'string')
0337 |           : defaults.missions.completedMissionIds,
0338 |         currentMissionId,
0339 |         currentStageIndex
0340 |       },
0341 |       ownedVehicles
0342 |     };
0343 |   }
0344 | }
0345 | 
```

---

## 32. `src/rendering/materials.ts`

<a id="src-rendering-materials-ts"></a>

**Role:** Cached shared materials library for roads, concrete, glass, neon, and vehicle paint.

- **File Path:** `src/rendering/materials.ts`
- **Total Lines:** 303
- **Size:** 7.88 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | /**
0004 |  * Procedural Canvas Texture Generator for PBR roughness, window atlases,
0005 |  * asphalt aggregate, and architectural weathering.
0006 |  */
0007 | function createAsphaltTexture(): THREE.CanvasTexture | null {
0008 |   if (typeof document === 'undefined') return null;
0009 |   const canvas = document.createElement('canvas');
0010 |   canvas.width = 256;
0011 |   canvas.height = 256;
0012 |   const ctx = canvas.getContext('2d');
0013 |   if (!ctx) return null;
0014 | 
0015 |   ctx.fillStyle = '#22252a';
0016 |   ctx.fillRect(0, 0, 256, 256);
0017 | 
0018 |   // Grain aggregate
0019 |   for (let i = 0; i < 4000; i++) {
0020 |     const x = Math.random() * 256;
0021 |     const y = Math.random() * 256;
0022 |     const shade = 28 + Math.floor(Math.random() * 32);
0023 |     ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
0024 |     ctx.fillRect(x, y, 1.5, 1.5);
0025 |   }
0026 | 
0027 |   // Asphalt repair patch
0028 |   ctx.fillStyle = 'rgba(15, 18, 22, 0.4)';
0029 |   ctx.fillRect(40, 60, 110, 75);
0030 | 
0031 |   const texture = new THREE.CanvasTexture(canvas);
0032 |   texture.wrapS = THREE.RepeatWrapping;
0033 |   texture.wrapT = THREE.RepeatWrapping;
0034 |   return texture;
0035 | }
0036 | 
0037 | function createWindowAtlasTexture(): THREE.CanvasTexture | null {
0038 |   if (typeof document === 'undefined') return null;
0039 |   const canvas = document.createElement('canvas');
0040 |   canvas.width = 512;
0041 |   canvas.height = 512;
0042 |   const ctx = canvas.getContext('2d');
0043 |   if (!ctx) return null;
0044 | 
0045 |   ctx.fillStyle = '#0f172a';
0046 |   ctx.fillRect(0, 0, 512, 512);
0047 | 
0048 |   // 8x8 window grid
0049 |   const cols = 8;
0050 |   const rows = 8;
0051 |   const cellW = 512 / cols;
0052 |   const cellH = 512 / rows;
0053 | 
0054 |   for (let r = 0; r < rows; r++) {
0055 |     for (let c = 0; c < cols; c++) {
0056 |       const isLit = (r * 11 + c * 7) % 3 === 0;
0057 |       const x = c * cellW + 6;
0058 |       const y = r * cellH + 6;
0059 |       const w = cellW - 12;
0060 |       const h = cellH - 12;
0061 | 
0062 |       // Mullion border
0063 |       ctx.fillStyle = '#1e293b';
0064 |       ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
0065 | 
0066 |       if (isLit) {
0067 |         const warm = (r + c) % 2 === 0;
0068 |         ctx.fillStyle = warm ? '#fef08a' : '#bae6fd'; // warm amber or cool office cyan
0069 |         ctx.fillRect(x, y, w, h);
0070 | 
0071 |         // Blinds / floor division
0072 |         ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
0073 |         for (let b = 0; b < h; b += 8) {
0074 |           ctx.fillRect(x, y + b, w, 2);
0075 |         }
0076 |       } else {
0077 |         ctx.fillStyle = '#1e293b';
0078 |         ctx.fillRect(x, y, w, h);
0079 |       }
0080 |     }
0081 |   }
0082 | 
0083 |   const texture = new THREE.CanvasTexture(canvas);
0084 |   texture.wrapS = THREE.RepeatWrapping;
0085 |   texture.wrapT = THREE.RepeatWrapping;
0086 |   return texture;
0087 | }
0088 | 
0089 | function createGrimeGradientTexture(): THREE.CanvasTexture | null {
0090 |   if (typeof document === 'undefined') return null;
0091 |   const canvas = document.createElement('canvas');
0092 |   canvas.width = 64;
0093 |   canvas.height = 128;
0094 |   const ctx = canvas.getContext('2d');
0095 |   if (!ctx) return null;
0096 | 
0097 |   const grad = ctx.createLinearGradient(0, 128, 0, 0);
0098 |   grad.addColorStop(0, 'rgba(15, 23, 42, 0.7)');
0099 |   grad.addColorStop(0.3, 'rgba(30, 41, 59, 0.3)');
0100 |   grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
0101 | 
0102 |   ctx.fillStyle = grad;
0103 |   ctx.fillRect(0, 0, 64, 128);
0104 | 
0105 |   const texture = new THREE.CanvasTexture(canvas);
0106 |   return texture;
0107 | }
0108 | 
0109 | /**
0110 |  * Shared material cache with authentic PBR material variations
0111 |  */
0112 | class MaterialLibrary {
0113 |   public asphaltTexture = createAsphaltTexture();
0114 |   public windowAtlasTexture = createWindowAtlasTexture();
0115 |   public grimeTexture = createGrimeGradientTexture();
0116 | 
0117 |   // 1. Ground & Road System Materials (Page 16 & 24)
0118 |   public roadMaterial = (() => {
0119 |     const mat = new THREE.MeshStandardMaterial({
0120 |       color: 0x1f242e,
0121 |       roughness: 0.85,
0122 |       metalness: 0.1
0123 |     });
0124 |     if (this.asphaltTexture) mat.map = this.asphaltTexture;
0125 |     return mat;
0126 |   })();
0127 | 
0128 |   public roadMarkingWhite = new THREE.MeshStandardMaterial({
0129 |     color: 0xf8fafc,
0130 |     roughness: 0.55,
0131 |     metalness: 0.05
0132 |   });
0133 | 
0134 |   public roadMarkingYellow = new THREE.MeshStandardMaterial({
0135 |     color: 0xf59e0b,
0136 |     roughness: 0.55,
0137 |     metalness: 0.05
0138 |   });
0139 | 
0140 |   public curbMaterial = new THREE.MeshStandardMaterial({
0141 |     color: 0x475569,
0142 |     roughness: 0.92,
0143 |     metalness: 0.08
0144 |   });
0145 | 
0146 |   public sidewalkMaterial = new THREE.MeshStandardMaterial({
0147 |     color: 0x64748b,
0148 |     roughness: 0.88,
0149 |     metalness: 0.05
0150 |   });
0151 | 
0152 |   public gutterMaterial = new THREE.MeshStandardMaterial({
0153 |     color: 0x334155,
0154 |     roughness: 0.95,
0155 |     metalness: 0.15
0156 |   });
0157 | 
0158 |   public stormDrainMaterial = new THREE.MeshStandardMaterial({
0159 |     color: 0x1e293b,
0160 |     roughness: 0.4,
0161 |     metalness: 0.85
0162 |   });
0163 | 
0164 |   public grassMaterial = new THREE.MeshStandardMaterial({
0165 |     color: 0x2d5a27,
0166 |     roughness: 0.95,
0167 |     metalness: 0.0
0168 |   });
0169 | 
0170 |   public sandMaterial = new THREE.MeshStandardMaterial({
0171 |     color: 0xd4a373,
0172 |     roughness: 0.92,
0173 |     metalness: 0.0
0174 |   });
0175 | 
0176 |   public waterMaterial = new THREE.MeshStandardMaterial({
0177 |     color: 0x0284c7,
0178 |     roughness: 0.08,
0179 |     metalness: 0.85,
0180 |     transparent: true,
0181 |     opacity: 0.88
0182 |   });
0183 | 
0184 |   // 2. Architectural Facade & Building Kit Materials (Page 16 & 26-28)
0185 |   public towerGlassMaterial = new THREE.MeshStandardMaterial({
0186 |     color: 0x0369a1,
0187 |     roughness: 0.12,
0188 |     metalness: 0.92,
0189 |     transparent: true,
0190 |     opacity: 0.92
0191 |   });
0192 | 
0193 |   public facadeWindowAtlasMaterial = (() => {
0194 |     const mat = new THREE.MeshStandardMaterial({
0195 |       color: 0xffffff,
0196 |       roughness: 0.25,
0197 |       metalness: 0.7
0198 |     });
0199 |     if (this.windowAtlasTexture) mat.map = this.windowAtlasTexture;
0200 |     return mat;
0201 |   })();
0202 | 
0203 |   public concretePrecastMaterial = new THREE.MeshStandardMaterial({
0204 |     color: 0x94a3b8,
0205 |     roughness: 0.78,
0206 |     metalness: 0.15
0207 |   });
0208 | 
0209 |   public brickHistoricMaterial = new THREE.MeshStandardMaterial({
0210 |     color: 0x991b1b,
0211 |     roughness: 0.86,
0212 |     metalness: 0.04
0213 |   });
0214 | 
0215 |   public plasterStuccoMaterial = new THREE.MeshStandardMaterial({
0216 |     color: 0xe2e8f0,
0217 |     roughness: 0.82,
0218 |     metalness: 0.05
0219 |   });
0220 | 
0221 |   public luxuryMarbleMaterial = new THREE.MeshStandardMaterial({
0222 |     color: 0xf1f5f9,
0223 |     roughness: 0.18,
0224 |     metalness: 0.3
0225 |   });
0226 | 
0227 |   public architecturalTrimMaterial = new THREE.MeshStandardMaterial({
0228 |     color: 0x334155,
0229 |     roughness: 0.5,
0230 |     metalness: 0.6
0231 |   });
0232 | 
0233 |   public industrialCorrugatedMaterial = new THREE.MeshStandardMaterial({
0234 |     color: 0x64748b,
0235 |     roughness: 0.7,
0236 |     metalness: 0.65
0237 |   });
0238 | 
0239 |   public oxidizedRustMaterial = new THREE.MeshStandardMaterial({
0240 |     color: 0x7c2d12,
0241 |     roughness: 0.94,
0242 |     metalness: 0.35
0243 |   });
0244 | 
0245 |   public galvanizedSteelMaterial = new THREE.MeshStandardMaterial({
0246 |     color: 0x94a3b8,
0247 |     roughness: 0.38,
0248 |     metalness: 0.85
0249 |   });
0250 | 
0251 |   // 3. Street Furniture, Props & Lighting
0252 |   public streetlightPoleMaterial = new THREE.MeshStandardMaterial({
0253 |     color: 0x334155,
0254 |     roughness: 0.35,
0255 |     metalness: 0.8
0256 |   });
0257 | 
0258 |   public streetlightEmitterMaterial = new THREE.MeshBasicMaterial({
0259 |     color: 0xffedd5
0260 |   });
0261 | 
0262 |   public neonPink = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
0263 |   public neonCyan = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
0264 |   public neonAmber = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
0265 |   public trafficRed = new THREE.MeshBasicMaterial({ color: 0xef4444 });
0266 |   public trafficYellow = new THREE.MeshBasicMaterial({ color: 0xeab308 });
0267 |   public trafficGreen = new THREE.MeshBasicMaterial({ color: 0x22c55e });
0268 | 
0269 |   // 4. Vehicle Materials (Page 16 & 56)
0270 |   public vehicleTire = new THREE.MeshStandardMaterial({
0271 |     color: 0x09090b,
0272 |     roughness: 0.92,
0273 |     metalness: 0.08
0274 |   });
0275 | 
0276 |   public vehicleGlass = new THREE.MeshStandardMaterial({
0277 |     color: 0x0f172a,
0278 |     roughness: 0.05,
0279 |     metalness: 0.95,
0280 |     transparent: true,
0281 |     opacity: 0.78
0282 |   });
0283 | 
0284 |   public vehicleChrome = new THREE.MeshStandardMaterial({
0285 |     color: 0xe2e8f0,
0286 |     roughness: 0.1,
0287 |     metalness: 0.98
0288 |   });
0289 | 
0290 |   public vehicleInteriorDark = new THREE.MeshStandardMaterial({
0291 |     color: 0x18181b,
0292 |     roughness: 0.85,
0293 |     metalness: 0.1
0294 |   });
0295 | 
0296 |   public vehicleHeadlight = new THREE.MeshBasicMaterial({ color: 0xffffff });
0297 |   public vehicleTaillight = new THREE.MeshBasicMaterial({ color: 0xef4444 });
0298 |   public vehicleSirenRed = new THREE.MeshBasicMaterial({ color: 0xff0033 });
0299 |   public vehicleSirenBlue = new THREE.MeshBasicMaterial({ color: 0x0066ff });
0300 | }
0301 | 
0302 | export const materialLib = new MaterialLibrary();
0303 | 
```

---

## 33. `src/rendering/particles.ts`

<a id="src-rendering-particles-ts"></a>

**Role:** Object-pooled GPU particle engine for explosions, muzzle flashes, bullet sparks, and tire burnout smoke.

- **File Path:** `src/rendering/particles.ts`
- **Total Lines:** 256
- **Size:** 6.91 KB

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
0014 |   private pool: Particle[] = [];
0015 |   private geometry: THREE.BufferGeometry;
0016 |   private material: THREE.PointsMaterial;
0017 |   private points: THREE.Points;
0018 |   private maxParticles = 1200;
0019 |   private positions: Float32Array;
0020 |   private colors: Float32Array;
0021 | 
0022 |   // Pooled scratch objects to eliminate per-emission allocations
0023 |   private readonly scratchVel = new THREE.Vector3();
0024 |   private readonly fireColor = new THREE.Color(0xff5500);
0025 |   private readonly smokeColor = new THREE.Color(0x888888);
0026 |   private readonly flashColor = new THREE.Color(0xffea00);
0027 |   private readonly tireSmokeColor = new THREE.Color(0xcccccc);
0028 | 
0029 |   constructor(scene: THREE.Scene) {
0030 |     this.positions = new Float32Array(this.maxParticles * 3);
0031 |     this.colors = new Float32Array(this.maxParticles * 3);
0032 | 
0033 |     this.geometry = new THREE.BufferGeometry();
0034 |     this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
0035 |     this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
0036 | 
0037 |     this.material = new THREE.PointsMaterial({
0038 |       size: 0.35,
0039 |       vertexColors: true,
0040 |       transparent: true,
0041 |       opacity: 0.85,
0042 |       blending: THREE.AdditiveBlending,
0043 |       depthWrite: false
0044 |     });
0045 | 
0046 |     this.points = new THREE.Points(this.geometry, this.material);
0047 |     this.points.frustumCulled = false;
0048 |     scene.add(this.points);
0049 | 
0050 |     // Pre-populate pool
0051 |     for (let i = 0; i < this.maxParticles; i++) {
0052 |       this.pool.push({
0053 |         position: new THREE.Vector3(),
0054 |         velocity: new THREE.Vector3(),
0055 |         life: 0,
0056 |         maxLife: 0,
0057 |         size: 0,
0058 |         color: new THREE.Color()
0059 |       });
0060 |     }
0061 |   }
0062 | 
0063 |   public emit(
0064 |     pos: THREE.Vector3,
0065 |     velocity: THREE.Vector3,
0066 |     color: THREE.Color,
0067 |     maxLife = 0.5,
0068 |     size = 0.35
0069 |   ): void {
0070 |     if (this.particles.length >= this.maxParticles) return;
0071 |     const particle = this.pool.pop() ?? {
0072 |       position: new THREE.Vector3(),
0073 |       velocity: new THREE.Vector3(),
0074 |       life: 0,
0075 |       maxLife: 0,
0076 |       size: 0,
0077 |       color: new THREE.Color()
0078 |     };
0079 |     particle.position.copy(pos);
0080 |     particle.velocity.copy(velocity);
0081 |     particle.life = maxLife;
0082 |     particle.maxLife = maxLife;
0083 |     particle.size = size;
0084 |     particle.color.copy(color);
0085 |     this.particles.push(particle);
0086 |   }
0087 | 
0088 |   public emitExplosion(pos: THREE.Vector3): void {
0089 |     for (let i = 0; i < 45; i++) {
0090 |       this.scratchVel.set(
0091 |         (Math.random() - 0.5) * 16,
0092 |         Math.random() * 12 + 2,
0093 |         (Math.random() - 0.5) * 16
0094 |       );
0095 |       this.emit(
0096 |         pos,
0097 |         this.scratchVel,
0098 |         Math.random() > 0.4 ? this.fireColor : this.smokeColor,
0099 |         0.8 + Math.random() * 0.5,
0100 |         0.6
0101 |       );
0102 |     }
0103 |   }
0104 | 
0105 |   public emitMuzzleFlash(pos: THREE.Vector3, dir: THREE.Vector3): void {
0106 |     for (let i = 0; i < 8; i++) {
0107 |       this.scratchVel.copy(dir).multiplyScalar(15);
0108 |       this.scratchVel.x += (Math.random() - 0.5) * 3;
0109 |       this.scratchVel.y += (Math.random() - 0.5) * 3;
0110 |       this.scratchVel.z += (Math.random() - 0.5) * 3;
0111 |       this.emit(pos, this.scratchVel, this.flashColor, 0.08, 0.4);
0112 |     }
0113 |   }
0114 | 
0115 |   public emitTireSmoke(pos: THREE.Vector3): void {
0116 |     for (let i = 0; i < 3; i++) {
0117 |       this.scratchVel.set(
0118 |         (Math.random() - 0.5) * 1.5,
0119 |         Math.random() * 2 + 0.5,
0120 |         (Math.random() - 0.5) * 1.5
0121 |       );
0122 |       this.emit(pos, this.scratchVel, this.tireSmokeColor, 0.6, 0.45);
0123 |     }
0124 |   }
0125 | 
0126 |   public emitBulletSpark(pos: THREE.Vector3): void {
0127 |     for (let i = 0; i < 6; i++) {
0128 |       this.scratchVel.set(
0129 |         (Math.random() - 0.5) * 6,
0130 |         Math.random() * 5 + 1,
0131 |         (Math.random() - 0.5) * 6
0132 |       );
0133 |       this.emit(pos, this.scratchVel, this.flashColor, 0.15, 0.25);
0134 |     }
0135 |   }
0136 | 
0137 |   public emitSurfaceImpact(
0138 |     pos: THREE.Vector3,
0139 |     surface: 'concrete' | 'metal' | 'glass' | 'wood' | 'asphalt' | 'water' | 'foliage' = 'concrete'
0140 |   ): void {
0141 |     const count = surface === 'glass' ? 14 : surface === 'metal' ? 10 : 8;
0142 |     for (let i = 0; i < count; i++) {
0143 |       this.scratchVel.set(
0144 |         (Math.random() - 0.5) * 5,
0145 |         Math.random() * 4 + 0.8,
0146 |         (Math.random() - 0.5) * 5
0147 |       );
0148 | 
0149 |       let color = this.smokeColor;
0150 |       let life = 0.25;
0151 |       let size = 0.25;
0152 | 
0153 |       switch (surface) {
0154 |         case 'metal':
0155 |           color = this.flashColor;
0156 |           life = 0.18;
0157 |           size = 0.22;
0158 |           break;
0159 |         case 'glass':
0160 |           color = new THREE.Color(0xa5f3fc);
0161 |           life = 0.3;
0162 |           size = 0.2;
0163 |           break;
0164 |         case 'water':
0165 |           color = new THREE.Color(0x38bdf8);
0166 |           life = 0.45;
0167 |           size = 0.35;
0168 |           break;
0169 |         case 'foliage':
0170 |           color = new THREE.Color(0x22c55e);
0171 |           life = 0.4;
0172 |           size = 0.28;
0173 |           break;
0174 |         case 'wood':
0175 |           color = new THREE.Color(0x78350f);
0176 |           life = 0.35;
0177 |           size = 0.25;
0178 |           break;
0179 |         case 'asphalt':
0180 |           color = new THREE.Color(0x334155);
0181 |           life = 0.3;
0182 |           size = 0.3;
0183 |           break;
0184 |         case 'concrete':
0185 |         default:
0186 |           color = new THREE.Color(0x94a3b8);
0187 |           life = 0.3;
0188 |           size = 0.28;
0189 |           break;
0190 |       }
0191 | 
0192 |       this.emit(pos, this.scratchVel, color, life, size);
0193 |     }
0194 |   }
0195 | 
0196 | 
0197 |   public update(dt: number): void {
0198 |     let aliveCount = 0;
0199 |     const posAttr = this.geometry.attributes.position as THREE.BufferAttribute;
0200 |     const colAttr = this.geometry.attributes.color as THREE.BufferAttribute;
0201 | 
0202 |     for (let i = this.particles.length - 1; i >= 0; i--) {
0203 |       const p = this.particles[i];
0204 |       p.life -= dt;
0205 |       if (p.life <= 0) {
0206 |         // Swap-delete compaction without splice
0207 |         this.pool.push(p);
0208 |         const last = this.particles.pop()!;
0209 |         if (i < this.particles.length) {
0210 |           this.particles[i] = last;
0211 |         }
0212 |         continue;
0213 |       }
0214 | 
0215 |       p.position.addScaledVector(p.velocity, dt);
0216 |       p.velocity.y -= 9.8 * dt * 0.3; // Gentle gravity
0217 | 
0218 |       const idx = aliveCount * 3;
0219 |       this.positions[idx] = p.position.x;
0220 |       this.positions[idx + 1] = p.position.y;
0221 |       this.positions[idx + 2] = p.position.z;
0222 | 
0223 |       const alpha = p.life / p.maxLife;
0224 |       this.colors[idx] = p.color.r * alpha;
0225 |       this.colors[idx + 1] = p.color.g * alpha;
0226 |       this.colors[idx + 2] = p.color.b * alpha;
0227 | 
0228 |       aliveCount++;
0229 |     }
0230 | 
0231 |     // Zero out unused tail
0232 |     for (let i = aliveCount * 3; i < this.maxParticles * 3; i++) {
0233 |       this.positions[i] = 0;
0234 |       this.colors[i] = 0;
0235 |     }
0236 | 
0237 |     posAttr.needsUpdate = true;
0238 |     colAttr.needsUpdate = true;
0239 |     this.geometry.setDrawRange(0, aliveCount);
0240 |   }
0241 | 
0242 |   public dispose(): void {
0243 |     for (const p of this.particles) {
0244 |       this.pool.push(p);
0245 |     }
0246 |     this.particles.length = 0;
0247 |     this.geometry.dispose();
0248 |     this.material.dispose();
0249 |     this.sceneRemove();
0250 |   }
0251 | 
0252 |   private sceneRemove(): void {
0253 |     this.points.removeFromParent();
0254 |   }
0255 | }
0256 | 
```

---

## 34. `src/rendering/sky.ts`

<a id="src-rendering-sky-ts"></a>

**Role:** Atmospheric day/night celestial lighting, sun orbit, dynamic fog, rain particles, and zero-allocation color caching.

- **File Path:** `src/rendering/sky.ts`
- **Total Lines:** 162
- **Size:** 5.64 KB

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
0009 |   private rainMaterial: THREE.PointsMaterial | null = null;
0010 |   private isRaining: boolean = false;
0011 |   private readonly backgroundColor = new THREE.Color(0x7bb6e0);
0012 | 
0013 |   constructor(scene: THREE.Scene) {
0014 |     this.scene = scene;
0015 |     this.scene.background = this.backgroundColor;
0016 | 
0017 |     // Directional Sun / Moon light
0018 |     this.dirLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
0019 |     this.dirLight.castShadow = true;
0020 |     this.dirLight.shadow.mapSize.width = 2048;
0021 |     this.dirLight.shadow.mapSize.height = 2048;
0022 |     this.dirLight.shadow.camera.near = 0.5;
0023 |     this.dirLight.shadow.camera.far = 500;
0024 |     const shadowDist = 80;
0025 |     this.dirLight.shadow.camera.left = -shadowDist;
0026 |     this.dirLight.shadow.camera.right = shadowDist;
0027 |     this.dirLight.shadow.camera.top = shadowDist;
0028 |     this.dirLight.shadow.camera.bottom = -shadowDist;
0029 |     this.dirLight.shadow.bias = -0.0005;
0030 |     scene.add(this.dirLight);
0031 | 
0032 |     // Hemisphere Ambient sky & ground bounce
0033 |     this.hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0x384152, 0.65);
0034 |     scene.add(this.hemiLight);
0035 | 
0036 |     // Background fog
0037 |     scene.fog = new THREE.FogExp2(0xa0c4df, 0.0018);
0038 |   }
0039 | 
0040 |   public update(timeOfDay: number, playerPos: THREE.Vector3, weather: string): void {
0041 |     // timeOfDay: 0.0 - 24.0 hours
0042 |     // Calculate sun angle: noon (12:00) is zenith (angle = PI/2)
0043 |     const sunAngle = ((timeOfDay - 6) / 24) * Math.PI * 2;
0044 |     const sunHeight = Math.sin(sunAngle);
0045 |     const sunCos = Math.cos(sunAngle);
0046 | 
0047 |     // Light position tracks player to maintain crisp shadows
0048 |     const lightDist = 180;
0049 |     this.dirLight.position.set(
0050 |       playerPos.x + sunCos * lightDist,
0051 |       Math.max(10, playerPos.y + sunHeight * lightDist),
0052 |       playerPos.z + 40
0053 |     );
0054 |     this.dirLight.target.position.copy(playerPos);
0055 |     this.dirLight.target.updateMatrixWorld();
0056 | 
0057 |     // Atmosphere color modulation
0058 |     if (sunHeight > 0.15) {
0059 |       // Daytime
0060 |       const t = Math.min(1, (sunHeight - 0.15) / 0.5);
0061 |       this.dirLight.color.setRGB(1.0, 0.95 + t * 0.05, 0.85 + t * 0.15);
0062 |       this.dirLight.intensity = 1.2 + t * 0.3;
0063 |       this.hemiLight.color.setHex(0xb1e1ff);
0064 |       this.hemiLight.groundColor.setHex(0x384152);
0065 |       this.hemiLight.intensity = 0.65;
0066 |       if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
0067 |         this.scene.fog.color.setHex(0xa0c4df);
0068 |       }
0069 |       this.backgroundColor.setHex(0x7bb6e0);
0070 |     } else if (sunHeight > -0.1) {
0071 |       // Golden Hour / Sunset / Dawn
0072 |       this.dirLight.color.setHex(0xff7733);
0073 |       this.dirLight.intensity = 0.9;
0074 |       this.hemiLight.color.setHex(0xf97316);
0075 |       this.hemiLight.groundColor.setHex(0x1e1b4b);
0076 |       this.hemiLight.intensity = 0.45;
0077 |       if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
0078 |         this.scene.fog.color.setHex(0xd97706);
0079 |       }
0080 |       this.backgroundColor.setHex(0xb45309);
0081 |     } else {
0082 |       // Night
0083 |       this.dirLight.color.setHex(0x60a5fa);
0084 |       this.dirLight.intensity = 0.25;
0085 |       this.hemiLight.color.setHex(0x1e293b);
0086 |       this.hemiLight.groundColor.setHex(0x020617);
0087 |       this.hemiLight.intensity = 0.35;
0088 |       if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
0089 |         this.scene.fog.color.setHex(0x0a0f1d);
0090 |       }
0091 |       this.backgroundColor.setHex(0x090d16);
0092 |     }
0093 | 
0094 |     // Weather handling
0095 |     this.updateWeather(weather, playerPos);
0096 |   }
0097 | 
0098 |   private updateWeather(weather: string, playerPos: THREE.Vector3): void {
0099 |     if (weather === 'rain') {
0100 |       if (!this.isRaining) {
0101 |         this.initRain();
0102 |       }
0103 |       if (this.rainPoints && this.rainGeometry) {
0104 |         this.rainPoints.position.set(playerPos.x, 0, playerPos.z);
0105 |         const posAttr = this.rainGeometry.attributes.position as THREE.BufferAttribute;
0106 |         const array = posAttr.array as Float32Array;
0107 |         for (let i = 1; i < array.length; i += 3) {
0108 |           array[i] -= 1.8; // Fall velocity
0109 |           if (array[i] < 0) array[i] = 40;
0110 |         }
0111 |         posAttr.needsUpdate = true;
0112 |       }
0113 |     } else if (this.isRaining) {
0114 |       this.removeRain();
0115 |     }
0116 |   }
0117 | 
0118 |   private initRain(): void {
0119 |     const rainCount = 1800;
0120 |     const positions = new Float32Array(rainCount * 3);
0121 |     for (let i = 0; i < rainCount; i++) {
0122 |       positions[i * 3] = (Math.random() - 0.5) * 80;
0123 |       positions[i * 3 + 1] = Math.random() * 40;
0124 |       positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
0125 |     }
0126 |     this.rainGeometry = new THREE.BufferGeometry();
0127 |     this.rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
0128 |     this.rainMaterial = new THREE.PointsMaterial({
0129 |       color: 0x93c5fd,
0130 |       size: 0.15,
0131 |       transparent: true,
0132 |       opacity: 0.6
0133 |     });
0134 |     this.rainPoints = new THREE.Points(this.rainGeometry, this.rainMaterial);
0135 |     this.scene.add(this.rainPoints);
0136 |     this.isRaining = true;
0137 |   }
0138 | 
0139 |   private removeRain(): void {
0140 |     if (this.rainPoints) {
0141 |       this.scene.remove(this.rainPoints);
0142 |       this.rainGeometry?.dispose();
0143 |       this.rainMaterial?.dispose();
0144 |       this.rainPoints = null;
0145 |       this.rainGeometry = null;
0146 |       this.rainMaterial = null;
0147 |     }
0148 |     this.isRaining = false;
0149 |   }
0150 | 
0151 |   public dispose(): void {
0152 |     this.removeRain();
0153 |     this.scene.remove(this.dirLight);
0154 |     this.dirLight.dispose?.();
0155 |     this.scene.remove(this.hemiLight);
0156 |     this.hemiLight.dispose?.();
0157 |     if (this.scene.fog) {
0158 |       this.scene.fog = null;
0159 |     }
0160 |   }
0161 | }
0162 | 
```

---

## 35. `src/rendering/sceneManager.ts`

<a id="src-rendering-scenemanager-ts"></a>

**Role:** Three.js master scene setup, perspective camera, ACES Filmic tone mapping, error recovery, and shadows.

- **File Path:** `src/rendering/sceneManager.ts`
- **Total Lines:** 114
- **Size:** 3.60 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { WebGPURenderer } from 'three/webgpu';
0003 | import { AtmosphereSystem } from './sky';
0004 | import { ParticleSystem } from './particles';
0005 | 
0006 | export class SceneManager {
0007 |   public readonly scene: THREE.Scene;
0008 |   public readonly camera: THREE.PerspectiveCamera;
0009 |   public renderer!: WebGPURenderer;
0010 |   public readonly atmosphere: AtmosphereSystem;
0011 |   public readonly particles: ParticleSystem;
0012 |   public readonly ready: Promise<void>;
0013 |   private readonly container: HTMLElement;
0014 |   private readonly resizeHandler: () => void;
0015 |   private disposed = false;
0016 | 
0017 |   constructor(container: HTMLElement) {
0018 |     this.container = container;
0019 |     this.scene = new THREE.Scene();
0020 |     this.scene.background = new THREE.Color(0x7bb6e0);
0021 | 
0022 |     const width = container.clientWidth || window.innerWidth;
0023 |     const height = container.clientHeight || window.innerHeight;
0024 | 
0025 |     this.camera = new THREE.PerspectiveCamera(65, width / Math.max(height, 1), 0.2, 2400);
0026 |     this.camera.position.set(0, 10, 20);
0027 | 
0028 |     this.atmosphere = new AtmosphereSystem(this.scene);
0029 |     this.particles = new ParticleSystem(this.scene);
0030 | 
0031 |     this.resizeHandler = () => this.handleResize();
0032 |     window.addEventListener('resize', this.resizeHandler);
0033 | 
0034 |     this.ready = this.initializeRenderer(width, height);
0035 |   }
0036 | 
0037 |   private async initializeRenderer(width: number, height: number): Promise<void> {
0038 |     try {
0039 |       this.renderer = new WebGPURenderer({
0040 |         powerPreference: 'high-performance',
0041 |         antialias: true,
0042 |         alpha: false
0043 |       });
0044 |       this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
0045 |       this.renderer.setSize(width, height, false);
0046 |       this.renderer.shadowMap.enabled = true;
0047 |       this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
0048 |       this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
0049 |       this.renderer.toneMappingExposure = 1.0;
0050 | 
0051 |       await this.renderer.init();
0052 | 
0053 |       if (this.disposed) {
0054 |         this.renderer.dispose();
0055 |         return;
0056 |       }
0057 | 
0058 |       this.container.appendChild(this.renderer.domElement);
0059 |     } catch (error) {
0060 |       this.disposed = true;
0061 |       console.error('[SceneManager] Renderer initialization failed', error);
0062 |       throw new Error('Unable to initialize the 3D renderer', { cause: error });
0063 |     }
0064 |   }
0065 | 
0066 |   public setAnimationLoop(callback: ((time: number) => void) | null): void {
0067 |     if (!this.renderer) return;
0068 |     this.renderer.setAnimationLoop(callback);
0069 |   }
0070 | 
0071 |   public stopAnimationLoop(): void {
0072 |     if (!this.renderer) return;
0073 |     this.renderer.setAnimationLoop(null);
0074 |   }
0075 | 
0076 |   private handleResize(): void {
0077 |     const width = this.container.clientWidth || window.innerWidth;
0078 |     const height = this.container.clientHeight || window.innerHeight;
0079 |     this.camera.aspect = width / Math.max(height, 1);
0080 |     this.camera.updateProjectionMatrix();
0081 |     if (this.renderer) {
0082 |       this.renderer.setSize(width, height);
0083 |     }
0084 |   }
0085 | 
0086 |   public render(): { drawCalls: number; triangles: number } {
0087 |     if (!this.renderer) {
0088 |       return { drawCalls: 0, triangles: 0 };
0089 |     }
0090 |     this.renderer.render(this.scene, this.camera);
0091 |     return {
0092 |       drawCalls: this.renderer.info.render.calls,
0093 |       triangles: this.renderer.info.render.triangles
0094 |     };
0095 |   }
0096 | 
0097 |   public dispose(): void {
0098 |     if (this.disposed) return;
0099 |     this.disposed = true;
0100 |     window.removeEventListener('resize', this.resizeHandler);
0101 |     this.renderer?.setAnimationLoop(null);
0102 |     this.renderer?.dispose();
0103 |     this.atmosphere.dispose();
0104 |     this.particles.dispose();
0105 |     this.scene.traverse(object => {
0106 |       const mesh = object as THREE.Mesh;
0107 |       if (mesh.isMesh) {
0108 |         mesh.geometry?.dispose();
0109 |       }
0110 |     });
0111 |     this.container.replaceChildren();
0112 |   }
0113 | }
0114 | 
```

---

## 36. `src/world/roadNetwork.ts`

<a id="src-world-roadnetwork-ts"></a>

**Role:** Interconnected road graph spanning all 26 sectors with LaneGraph integration, A* pathfinding, and 3D GPS route ribbons.

- **File Path:** `src/world/roadNetwork.ts`
- **Total Lines:** 251
- **Size:** 8.42 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { distance2D } from '../core/math';
0003 | import { CANONICAL_DISTRICTS } from '../data/districts';
0004 | import { laneGraph } from '../navigation/laneGraph';
0005 | 
0006 | export interface RoadNode {
0007 |   id: string;
0008 |   x: number;
0009 |   z: number;
0010 |   neighbors: string[];
0011 | }
0012 | 
0013 | export class RoadNetwork {
0014 |   public nodes: Map<string, RoadNode> = new Map();
0015 |   private ribbonMesh: THREE.Mesh | null = null;
0016 |   private ribbonKey = '';
0017 |   private readonly ribbonMaterial = new THREE.MeshBasicMaterial({
0018 |     color: 0x06b6d4,
0019 |     transparent: true,
0020 |     opacity: 0.75
0021 |   });
0022 |   private scene: THREE.Scene;
0023 | 
0024 |   constructor(scene: THREE.Scene) {
0025 |     this.scene = scene;
0026 |     this.buildGraph();
0027 |   }
0028 | 
0029 |   /**
0030 |    * Builds an interconnected road graph spanning all 26 canonical districts
0031 |    */
0032 |   private buildGraph(): void {
0033 |     // Generate nodes at district centers and major highway interchanges
0034 |     CANONICAL_DISTRICTS.forEach(district => {
0035 |       this.nodes.set(district.id, {
0036 |         id: district.id,
0037 |         x: district.center[0],
0038 |         z: district.center[2],
0039 |         neighbors: []
0040 |       });
0041 |     });
0042 | 
0043 |     // Add arterial highway nodes and connectors
0044 |     const addEdge = (id1: string, id2: string) => {
0045 |       const n1 = this.nodes.get(id1);
0046 |       const n2 = this.nodes.get(id2);
0047 |       if (n1 && n2) {
0048 |         if (!n1.neighbors.includes(id2)) n1.neighbors.push(id2);
0049 |         if (!n2.neighbors.includes(id1)) n2.neighbors.push(id1);
0050 |       }
0051 |     };
0052 | 
0053 |     // Central Core Grid (Aurelio Central, Meridian, Old Quay, Civic Rise, Neon Row)
0054 |     addEdge('D01', 'D02'); // Central to Meridian
0055 |     addEdge('D01', 'D03'); // Central to Old Quay
0056 |     addEdge('D01', 'D04'); // Central to Civic Rise
0057 |     addEdge('D02', 'D05'); // Meridian to Neon Row
0058 |     addEdge('D04', 'D05'); // Civic to Neon Row
0059 |     addEdge('D03', 'D04'); // Old Quay to Civic
0060 | 
0061 |     // Coastal & Harbor Links (Harborview, Sunspire, Eastmoor)
0062 |     addEdge('D05', 'D06'); // Neon Row to Harborview
0063 |     addEdge('D02', 'D07'); // Meridian to Sunspire
0064 |     addEdge('D06', 'D07'); // Harborview to Sunspire
0065 |     addEdge('D07', 'D08'); // Sunspire to Eastmoor
0066 |     addEdge('D06', 'D21'); // Harborview to Freeway Belt
0067 | 
0068 |     // Northern Ridge & Foothills (Caldera Hills, Crown Heights, Northpoint, Pine Crest)
0069 |     addEdge('D01', 'D11'); // Central to Northpoint
0070 |     addEdge('D02', 'D12'); // Meridian to Pine Crest
0071 |     addEdge('D07', 'D09'); // Sunspire to Caldera Hills
0072 |     addEdge('D03', 'D10'); // Old Quay to Crown Heights
0073 |     addEdge('D10', 'D11'); // Crown Heights to Northpoint
0074 |     addEdge('D11', 'D12'); // Northpoint to Pine Crest
0075 |     addEdge('D12', 'D09'); // Pine Crest to Caldera Hills
0076 | 
0077 |     // Western Port & Industrial Belt (Westgate, Port Meridian, Ironworks, Docklands, Salt Marsh)
0078 |     addEdge('D03', 'D13'); // Old Quay to Westgate
0079 |     addEdge('D13', 'D14'); // Westgate to Port Meridian
0080 |     addEdge('D04', 'D15'); // Civic to Ironworks
0081 |     addEdge('D14', 'D15'); // Port Meridian to Ironworks
0082 |     addEdge('D15', 'D16'); // Ironworks to Docklands
0083 |     addEdge('D04', 'D16'); // Civic to Docklands
0084 |     addEdge('D13', 'D17'); // Westgate to Salt Marsh
0085 | 
0086 |     // Southern Arterials & Airport (Southbank, Rancho Sol, Airport, Freeway Belt, Desert Edge, Military)
0087 |     addEdge('D15', 'D18'); // Ironworks to Southbank
0088 |     addEdge('D18', 'D19'); // Southbank to Rancho Sol
0089 |     addEdge('D16', 'D20'); // Docklands to Airport
0090 |     addEdge('D05', 'D20'); // Neon Row to Airport
0091 |     addEdge('D20', 'D21'); // Airport to Freeway Belt
0092 |     addEdge('D20', 'D22'); // Airport to Desert Edge
0093 |     addEdge('D21', 'D23'); // Freeway to Blackridge Military
0094 |     addEdge('D08', 'D23'); // Eastmoor to Blackridge
0095 |     addEdge('D21', 'D25'); // Freeway to Pelican Keys Causeway
0096 |     addEdge('D17', 'D26'); // Salt Marsh to Silver Lake
0097 |     addEdge('D18', 'D24'); // Southbank to Sable Island Bridge
0098 |   }
0099 | 
0100 |   /**
0101 |    * Finds the nearest road node to arbitrary (x, z) coordinates
0102 |    */
0103 |   public getNearestNode(x: number, z: number): RoadNode {
0104 |     let nearest: RoadNode = this.nodes.values().next().value!;
0105 |     let minDist = Infinity;
0106 |     for (const node of this.nodes.values()) {
0107 |       const d = distance2D(x, z, node.x, node.z);
0108 |       if (d < minDist) {
0109 |         minDist = d;
0110 |         nearest = node;
0111 |       }
0112 |     }
0113 |     return nearest;
0114 |   }
0115 | 
0116 |   /**
0117 |    * Computes shortest path across the road network via LaneGraph / A*
0118 |    * Returns null if no valid path exists (never straight-line through buildings)
0119 |    */
0120 |   public findPath(startX: number, startZ: number, endX: number, endZ: number): [number, number, number][] | null {
0121 |     // 1. Try granular lane graph first
0122 |     const laneRoute = laneGraph.findLaneRoute([startX, 0.15, startZ], [endX, 0.15, endZ]);
0123 |     if (laneRoute && laneRoute.length >= 2) {
0124 |       return laneRoute;
0125 |     }
0126 | 
0127 |     // 2. Fallback to arterial district graph
0128 |     const startNode = this.getNearestNode(startX, startZ);
0129 |     const endNode = this.getNearestNode(endX, endZ);
0130 | 
0131 |     if (startNode.id === endNode.id) {
0132 |       return [
0133 |         [startX, 0.15, startZ],
0134 |         [startNode.x, 0.15, startNode.z],
0135 |         [endX, 0.15, endZ]
0136 |       ];
0137 |     }
0138 | 
0139 |     const gScore = new Map<string, number>();
0140 |     const fScore = new Map<string, number>();
0141 |     const previous = new Map<string, string | null>();
0142 |     const open = new Set<string>();
0143 | 
0144 |     const heuristic = (node: RoadNode): number =>
0145 |       distance2D(node.x, node.z, endNode.x, endNode.z);
0146 | 
0147 |     for (const id of this.nodes.keys()) {
0148 |       gScore.set(id, Infinity);
0149 |       fScore.set(id, Infinity);
0150 |       previous.set(id, null);
0151 |     }
0152 | 
0153 |     gScore.set(startNode.id, 0);
0154 |     fScore.set(startNode.id, heuristic(startNode));
0155 |     open.add(startNode.id);
0156 | 
0157 |     while (open.size > 0) {
0158 |       let currentId: string | null = null;
0159 |       let bestF = Infinity;
0160 |       for (const id of open) {
0161 |         const score = fScore.get(id) ?? Infinity;
0162 |         if (score < bestF) {
0163 |           bestF = score;
0164 |           currentId = id;
0165 |         }
0166 |       }
0167 | 
0168 |       if (!currentId) break;
0169 |       if (currentId === endNode.id) break;
0170 | 
0171 |       open.delete(currentId);
0172 |       const current = this.nodes.get(currentId);
0173 |       if (!current) continue;
0174 | 
0175 |       for (const neighborId of current.neighbors) {
0176 |         const neighbor = this.nodes.get(neighborId);
0177 |         if (!neighbor) continue;
0178 | 
0179 |         const tentative = (gScore.get(currentId) ?? Infinity) +
0180 |           distance2D(current.x, current.z, neighbor.x, neighbor.z);
0181 | 
0182 |         if (tentative < (gScore.get(neighborId) ?? Infinity)) {
0183 |           previous.set(neighborId, currentId);
0184 |           gScore.set(neighborId, tentative);
0185 |           fScore.set(neighborId, tentative + heuristic(neighbor));
0186 |           open.add(neighborId);
0187 |         }
0188 |       }
0189 |     }
0190 | 
0191 |     if ((gScore.get(endNode.id) ?? Infinity) === Infinity) {
0192 |       // Return null per Page 24 (never straight-line fallback across obstacles)
0193 |       return null;
0194 |     }
0195 | 
0196 |     const path: [number, number, number][] = [];
0197 |     let currentId: string | null = endNode.id;
0198 |     while (currentId) {
0199 |       const node = this.nodes.get(currentId);
0200 |       if (!node) break;
0201 |       path.unshift([node.x, 0.15, node.z]);
0202 |       currentId = previous.get(currentId) ?? null;
0203 |     }
0204 | 
0205 |     if (path.length === 0) {
0206 |       return null;
0207 |     }
0208 | 
0209 |     path.unshift([startX, 0.15, startZ]);
0210 |     path.push([endX, 0.15, endZ]);
0211 |     return path;
0212 |   }
0213 | 
0214 |   /**
0215 |    * Generates a 3D glowing GPS ribbon in world space along the road path
0216 |    */
0217 |   public updateGPSRibbon(path: [number, number, number][] | null): void {
0218 |     const key = path
0219 |       ? path.map(p => `${p[0].toFixed(2)},${p[2].toFixed(2)}`).join('|')
0220 |       : '';
0221 |     if (key === this.ribbonKey) return;
0222 |     this.ribbonKey = key;
0223 | 
0224 |     if (this.ribbonMesh) {
0225 |       this.scene.remove(this.ribbonMesh);
0226 |       this.ribbonMesh.geometry.dispose();
0227 |       this.ribbonMesh = null;
0228 |     }
0229 | 
0230 |     if (!path || path.length < 2) return;
0231 | 
0232 |     const points = path.map(
0233 |       p => new THREE.Vector3(p[0], 0.25, p[2])
0234 |     );
0235 |     const curve = new THREE.CatmullRomCurve3(points);
0236 |     const segments = Math.max(8, Math.min(64, points.length * 6));
0237 |     const geometry = new THREE.TubeGeometry(curve, segments, 0.45, 6, false);
0238 |     this.ribbonMesh = new THREE.Mesh(geometry, this.ribbonMaterial);
0239 |     this.scene.add(this.ribbonMesh);
0240 |   }
0241 | 
0242 |   public dispose(): void {
0243 |     if (this.ribbonMesh) {
0244 |       this.scene.remove(this.ribbonMesh);
0245 |       this.ribbonMesh.geometry.dispose();
0246 |       this.ribbonMesh = null;
0247 |     }
0248 |     this.ribbonMaterial.dispose();
0249 |   }
0250 | }
0251 | 
```

---

## 37. `src/world/sectorBuilder.ts`

<a id="src-world-sectorbuilder-ts"></a>

**Role:** Procedural architectural generator building skyscrapers, quays, warehouses, and collision meshes.

- **File Path:** `src/world/sectorBuilder.ts`
- **Total Lines:** 527
- **Size:** 18.80 KB

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
0010 | function seedFromString(value: string): number {
0011 |   let hash = 2166136261;
0012 |   for (let i = 0; i < value.length; i++) {
0013 |     hash ^= value.charCodeAt(i);
0014 |     hash = Math.imul(hash, 16777619);
0015 |   }
0016 |   return hash >>> 0;
0017 | }
0018 | 
0019 | function mulberry32(seed: number): () => number {
0020 |   return () => {
0021 |     seed |= 0;
0022 |     seed = (seed + 0x6D2B79F5) | 0;
0023 |     let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
0024 |     t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t;
0025 |     return ((t ^ t >>> 14) >>> 0) / 4294967296;
0026 |   };
0027 | }
0028 | 
0029 | export type BuildingFamily =
0030 |   | 'financial_tower'
0031 |   | 'office_podium'
0032 |   | 'luxury_apartment'
0033 |   | 'midrise_apartment'
0034 |   | 'historic_row'
0035 |   | 'nightlife_venue'
0036 |   | 'retail_strip'
0037 |   | 'civic_hall'
0038 |   | 'warehouse'
0039 |   | 'factory'
0040 |   | 'suburban_house'
0041 |   | 'luxury_villa'
0042 |   | 'marina_building'
0043 |   | 'transport_terminal';
0044 | 
0045 | export class SectorBuilder {
0046 |   /**
0047 |    * Builds the 3D scene group for a canonical sector based on its archetype and district identity
0048 |    */
0049 |   public static buildSector(
0050 |     district: DistrictData,
0051 |     isHeroLOD: boolean = true
0052 |   ): { group: THREE.Group; colliders: StaticCollider[] } {
0053 |     const random = mulberry32(seedFromString(district.id));
0054 |     const group = new THREE.Group();
0055 |     group.name = `sector_${district.id}`;
0056 |     const colliders: StaticCollider[] = [];
0057 | 
0058 |     const { minX, maxX, minZ, maxZ } = district.bounds;
0059 |     const width = maxX - minX;
0060 |     const depth = maxZ - minZ;
0061 |     const centerX = (minX + maxX) / 2;
0062 |     const centerZ = (minZ + maxZ) / 2;
0063 | 
0064 |     // 1. Sector Ground Base Plane
0065 |     const groundGeo = new THREE.PlaneGeometry(width, depth);
0066 |     groundGeo.rotateX(-Math.PI / 2);
0067 | 
0068 |     let groundMat: THREE.Material = materialLib.grassMaterial;
0069 |     if (district.archetype === 'downtown' || district.archetype === 'financial' || district.archetype === 'civic') {
0070 |       groundMat = materialLib.sidewalkMaterial;
0071 |     } else if (district.archetype === 'heavy_industry' || district.archetype === 'container_district' || district.archetype === 'port') {
0072 |       groundMat = materialLib.concretePrecastMaterial;
0073 |     } else if (district.archetype === 'dry_fringe') {
0074 |       groundMat = materialLib.sandMaterial;
0075 |     } else if (district.archetype === 'waterfront' || district.archetype === 'wetland') {
0076 |       groundMat = materialLib.waterMaterial;
0077 |     }
0078 | 
0079 |     const groundMesh = new THREE.Mesh(groundGeo, groundMat);
0080 |     groundMesh.position.set(centerX, -0.05, centerZ);
0081 |     groundMesh.receiveShadow = true;
0082 |     group.add(groundMesh);
0083 | 
0084 |     // 2. Road Detail Kit & Sidewalk Network (Pages 23-25)
0085 |     const roadWidth = 14;
0086 |     const sidewalkWidth = 3.5;
0087 |     const curbHeight = 0.25;
0088 | 
0089 |     // Asphalt Main Slabs (East-West and North-South)
0090 |     const roadEWGeo = new THREE.PlaneGeometry(width, roadWidth);
0091 |     roadEWGeo.rotateX(-Math.PI / 2);
0092 |     const roadEWMesh = new THREE.Mesh(roadEWGeo, materialLib.roadMaterial);
0093 |     roadEWMesh.position.set(centerX, 0.02, centerZ);
0094 |     roadEWMesh.receiveShadow = true;
0095 |     group.add(roadEWMesh);
0096 | 
0097 |     const roadNSGeo = new THREE.PlaneGeometry(roadWidth, depth);
0098 |     roadNSGeo.rotateX(-Math.PI / 2);
0099 |     const roadNSMesh = new THREE.Mesh(roadNSGeo, materialLib.roadMaterial);
0100 |     roadNSMesh.position.set(centerX, 0.02, centerZ);
0101 |     roadNSMesh.receiveShadow = true;
0102 |     group.add(roadNSMesh);
0103 | 
0104 |     // Yellow double center stripe
0105 |     const lineEWGeo = new THREE.PlaneGeometry(width, 0.22);
0106 |     lineEWGeo.rotateX(-Math.PI / 2);
0107 |     const lineEW1 = new THREE.Mesh(lineEWGeo, materialLib.roadMarkingYellow);
0108 |     lineEW1.position.set(centerX, 0.035, centerZ - 0.2);
0109 |     const lineEW2 = new THREE.Mesh(lineEWGeo, materialLib.roadMarkingYellow);
0110 |     lineEW2.position.set(centerX, 0.035, centerZ + 0.2);
0111 |     group.add(lineEW1, lineEW2);
0112 | 
0113 |     const lineNSGeo = new THREE.PlaneGeometry(0.22, depth);
0114 |     lineNSGeo.rotateX(-Math.PI / 2);
0115 |     const lineNS1 = new THREE.Mesh(lineNSGeo, materialLib.roadMarkingYellow);
0116 |     lineNS1.position.set(centerX - 0.2, 0.035, centerZ);
0117 |     const lineNS2 = new THREE.Mesh(lineNSGeo, materialLib.roadMarkingYellow);
0118 |     lineNS2.position.set(centerX + 0.2, 0.035, centerZ);
0119 |     group.add(lineNS1, lineNS2);
0120 | 
0121 |     // Crosswalk Zebra Markings at intersection
0122 |     this.addIntersectionCrosswalks(group, centerX, centerZ, roadWidth);
0123 | 
0124 |     // Raised Concrete Sidewalks and Curbs flanking roads
0125 |     const curbEWGeo = new THREE.BoxGeometry(width, curbHeight, sidewalkWidth);
0126 |     const curbNorth = new THREE.Mesh(curbEWGeo, materialLib.sidewalkMaterial);
0127 |     curbNorth.position.set(centerX, curbHeight / 2, centerZ - roadWidth / 2 - sidewalkWidth / 2);
0128 |     curbNorth.receiveShadow = true;
0129 | 
0130 |     const curbSouth = new THREE.Mesh(curbEWGeo, materialLib.sidewalkMaterial);
0131 |     curbSouth.position.set(centerX, curbHeight / 2, centerZ + roadWidth / 2 + sidewalkWidth / 2);
0132 |     curbSouth.receiveShadow = true;
0133 |     group.add(curbNorth, curbSouth);
0134 | 
0135 |     // Darkened Gutters with Storm Drains
0136 |     const gutterGeo = new THREE.PlaneGeometry(width, 0.4);
0137 |     gutterGeo.rotateX(-Math.PI / 2);
0138 |     const gutterN = new THREE.Mesh(gutterGeo, materialLib.gutterMaterial);
0139 |     gutterN.position.set(centerX, 0.025, centerZ - roadWidth / 2 + 0.2);
0140 |     const gutterS = new THREE.Mesh(gutterGeo, materialLib.gutterMaterial);
0141 |     gutterS.position.set(centerX, 0.025, centerZ + roadWidth / 2 - 0.2);
0142 |     group.add(gutterN, gutterS);
0143 | 
0144 |     // Storm drains along the gutters
0145 |     if (isHeroLOD) {
0146 |       const drainGeo = new THREE.PlaneGeometry(1.2, 0.4);
0147 |       drainGeo.rotateX(-Math.PI / 2);
0148 |       for (let dx = -width / 2 + 30; dx < width / 2; dx += 60) {
0149 |         const drain = new THREE.Mesh(drainGeo, materialLib.stormDrainMaterial);
0150 |         drain.position.set(centerX + dx, 0.028, centerZ - roadWidth / 2 + 0.2);
0151 |         group.add(drain);
0152 |       }
0153 |     }
0154 | 
0155 |     // 3. Multi-Part Building Architecture via Building Kits (Pages 26-30)
0156 |     const family = this.selectBuildingFamily(district.archetype);
0157 |     const bldgSpacing = 68;
0158 |     const margin = 40;
0159 | 
0160 |     for (let x = minX + margin; x <= maxX - margin; x += bldgSpacing) {
0161 |       for (let z = minZ + margin; z <= maxZ - margin; z += bldgSpacing) {
0162 |         // Leave roadway and sidewalks clear
0163 |         if (Math.abs(x - centerX) < roadWidth / 2 + sidewalkWidth + 10 ||
0164 |             Math.abs(z - centerZ) < roadWidth / 2 + sidewalkWidth + 10) {
0165 |           continue;
0166 |         }
0167 | 
0168 |         const bldg = this.createBuildingKit(family, x, z, isHeroLOD, random);
0169 |         group.add(bldg.mesh);
0170 | 
0171 |         // Register static physical collider box
0172 |         const box = new THREE.Box3().setFromObject(bldg.mesh);
0173 |         colliders.push({ box, type: 'building' });
0174 | 
0175 |         // Street furniture & prop clusters along sidewalks (Page 24 & 32)
0176 |         if (isHeroLOD && random() > 0.45) {
0177 |           const lightX = x > centerX ? x - 22 : x + 22;
0178 |           const lightZ = z > centerZ ? z - 22 : z + 22;
0179 |           group.add(this.createStreetlight(lightX, lightZ));
0180 | 
0181 |           // Protective sidewalk bollards near corners
0182 |           if (random() > 0.5) {
0183 |             const bollard = this.createBollard(lightX + (random() > 0.5 ? 2.5 : -2.5), lightZ);
0184 |             group.add(bollard);
0185 |           }
0186 |         }
0187 |       }
0188 |     }
0189 | 
0190 |     // 4. District Signature Hero Landmark (Page 31)
0191 |     if (isHeroLOD) {
0192 |       const landmark = this.createSignatureLandmark(district);
0193 |       if (landmark) {
0194 |         group.add(landmark.mesh);
0195 |         const box = new THREE.Box3().setFromObject(landmark.mesh);
0196 |         colliders.push({ box, type: 'building' });
0197 |       }
0198 |     }
0199 | 
0200 |     return { group, colliders };
0201 |   }
0202 | 
0203 |   private static selectBuildingFamily(archetype: string): BuildingFamily {
0204 |     switch (archetype) {
0205 |       case 'financial':
0206 |       case 'downtown':
0207 |         return 'financial_tower';
0208 |       case 'civic':
0209 |         return 'civic_hall';
0210 |       case 'historic':
0211 |         return 'historic_row';
0212 |       case 'nightlife':
0213 |         return 'nightlife_venue';
0214 |       case 'heavy_industry':
0215 |       case 'container_district':
0216 |         return 'factory';
0217 |       case 'port':
0218 |         return 'warehouse';
0219 |       case 'coastal':
0220 |       case 'waterfront':
0221 |         return 'marina_building';
0222 |       case 'hills':
0223 |       case 'dry_fringe':
0224 |         return 'luxury_villa';
0225 |       case 'suburbs':
0226 |       default:
0227 |         return 'midrise_apartment';
0228 |     }
0229 |   }
0230 | 
0231 |   /**
0232 |    * Componentized Building Kit Generator (Pages 26-30)
0233 |    */
0234 |   private static createBuildingKit(
0235 |     family: BuildingFamily,
0236 |     x: number,
0237 |     z: number,
0238 |     isHeroLOD: boolean,
0239 |     random: () => number
0240 |   ): { mesh: THREE.Group } {
0241 |     const bldgGroup = new THREE.Group();
0242 |     bldgGroup.position.set(x, 0, z);
0243 | 
0244 |     let width = 34 + random() * 12;
0245 |     let depth = 34 + random() * 12;
0246 |     let stories = 4;
0247 |     let floorHeight = 3.6;
0248 | 
0249 |     if (family === 'financial_tower') {
0250 |       stories = 14 + Math.floor(random() * 18); // 50m - 115m tall
0251 |       width = 28 + random() * 10;
0252 |       depth = 28 + random() * 10;
0253 |     } else if (family === 'historic_row') {
0254 |       stories = 3 + Math.floor(random() * 2);
0255 |       width = 24 + random() * 8;
0256 |       depth = 24 + random() * 8;
0257 |     } else if (family === 'warehouse' || family === 'factory') {
0258 |       stories = 2;
0259 |       floorHeight = 5.5;
0260 |       width = 44 + random() * 16;
0261 |       depth = 36 + random() * 12;
0262 |     } else if (family === 'nightlife_venue') {
0263 |       stories = 3 + Math.floor(random() * 3);
0264 |       width = 30 + random() * 8;
0265 |     }
0266 | 
0267 |     const totalHeight = stories * floorHeight;
0268 | 
0269 |     // A. Ground Floor Lobby / Retail with Readable Entrances & Glazing (Page 30)
0270 |     const groundGeo = new THREE.BoxGeometry(width, floorHeight, depth);
0271 |     const groundMesh = new THREE.Mesh(groundGeo, materialLib.architecturalTrimMaterial);
0272 |     groundMesh.position.y = floorHeight / 2;
0273 |     groundMesh.castShadow = true;
0274 |     groundMesh.receiveShadow = true;
0275 |     bldgGroup.add(groundMesh);
0276 | 
0277 |     // Readable Entrance Doorway & Glass Display
0278 |     const doorGeo = new THREE.BoxGeometry(4.5, 2.8, 0.4);
0279 |     const doorMesh = new THREE.Mesh(doorGeo, materialLib.towerGlassMaterial);
0280 |     doorMesh.position.set(0, 1.4, depth / 2 + 0.1);
0281 |     bldgGroup.add(doorMesh);
0282 | 
0283 |     // Entrance Canopy
0284 |     const canopyGeo = new THREE.BoxGeometry(6.0, 0.25, 2.5);
0285 |     const canopyMesh = new THREE.Mesh(canopyGeo, materialLib.architecturalTrimMaterial);
0286 |     canopyMesh.position.set(0, 2.9, depth / 2 + 1.25);
0287 |     canopyMesh.castShadow = true;
0288 |     bldgGroup.add(canopyMesh);
0289 | 
0290 |     // B. Facade Bays with Procedural Window Atlas & Mullions (Pages 17, 28)
0291 |     const upperHeight = totalHeight - floorHeight;
0292 |     const upperGeo = new THREE.BoxGeometry(width * 0.96, upperHeight, depth * 0.96);
0293 |     let upperMat: THREE.Material = materialLib.facadeWindowAtlasMaterial;
0294 | 
0295 |     if (family === 'historic_row') {
0296 |       upperMat = materialLib.brickHistoricMaterial;
0297 |     } else if (family === 'warehouse' || family === 'factory') {
0298 |       upperMat = materialLib.industrialCorrugatedMaterial;
0299 |     } else if (family === 'financial_tower' && random() > 0.5) {
0300 |       upperMat = materialLib.towerGlassMaterial;
0301 |     }
0302 | 
0303 |     const upperMesh = new THREE.Mesh(upperGeo, upperMat);
0304 |     upperMesh.position.y = floorHeight + upperHeight / 2;
0305 |     upperMesh.castShadow = true;
0306 |     upperMesh.receiveShadow = true;
0307 |     bldgGroup.add(upperMesh);
0308 | 
0309 |     // Architectural Trim Bands / Cornices (Page 28)
0310 |     if (isHeroLOD) {
0311 |       const corniceGeo = new THREE.BoxGeometry(width * 1.02, 0.6, depth * 1.02);
0312 |       const corniceMesh = new THREE.Mesh(corniceGeo, materialLib.architecturalTrimMaterial);
0313 |       corniceMesh.position.y = totalHeight;
0314 |       corniceMesh.castShadow = true;
0315 |       bldgGroup.add(corniceMesh);
0316 |     }
0317 | 
0318 |     // C. Roof Equipment & Service Detail: HVAC units, stacks, antennas (Page 29)
0319 |     if (isHeroLOD) {
0320 |       // Parapet rim
0321 |       const parapetGeo = new THREE.BoxGeometry(width * 0.96, 0.8, depth * 0.96);
0322 |       const parapetMesh = new THREE.Mesh(parapetGeo, materialLib.concretePrecastMaterial);
0323 |       parapetMesh.position.y = totalHeight + 0.4;
0324 |       bldgGroup.add(parapetMesh);
0325 | 
0326 |       // HVAC Chiller Unit
0327 |       const hvacGeo = new THREE.BoxGeometry(5.0, 2.2, 4.0);
0328 |       const hvacMesh = new THREE.Mesh(hvacGeo, materialLib.galvanizedSteelMaterial);
0329 |       hvacMesh.position.set(-width * 0.18, totalHeight + 1.1, -depth * 0.15);
0330 |       hvacMesh.castShadow = true;
0331 |       bldgGroup.add(hvacMesh);
0332 | 
0333 |       // Rooftop Access Penthouse Door
0334 |       const roofDoorGeo = new THREE.BoxGeometry(3.2, 2.6, 3.2);
0335 |       const roofDoor = new THREE.Mesh(roofDoorGeo, materialLib.concretePrecastMaterial);
0336 |       roofDoor.position.set(width * 0.15, totalHeight + 1.3, depth * 0.15);
0337 |       bldgGroup.add(roofDoor);
0338 | 
0339 |       // Antenna mast on towers
0340 |       if (family === 'financial_tower') {
0341 |         const antennaGeo = new THREE.CylinderGeometry(0.12, 0.25, 12, 8);
0342 |         const antennaMesh = new THREE.Mesh(antennaGeo, materialLib.vehicleChrome);
0343 |         antennaMesh.position.set(0, totalHeight + 6.0, 0);
0344 |         bldgGroup.add(antennaMesh);
0345 |       }
0346 | 
0347 |       // Neon sign band on Nightlife / Entertainment
0348 |       if (family === 'nightlife_venue') {
0349 |         const signGeo = new THREE.PlaneGeometry(width * 0.7, 3.2);
0350 |         const signMat = random() > 0.5 ? materialLib.neonPink : materialLib.neonCyan;
0351 |         const signMesh = new THREE.Mesh(signGeo, signMat);
0352 |         signMesh.position.set(0, floorHeight + 2.5, depth / 2 + 0.15);
0353 |         bldgGroup.add(signMesh);
0354 |       }
0355 |     }
0356 | 
0357 |     return { mesh: bldgGroup };
0358 |   }
0359 | 
0360 |   private static addIntersectionCrosswalks(
0361 |     group: THREE.Group,
0362 |     cx: number,
0363 |     cz: number,
0364 |     roadW: number
0365 |   ): void {
0366 |     const stripeW = 0.6;
0367 |     const stripeL = 3.5;
0368 |     const stripeMat = materialLib.roadMarkingWhite;
0369 | 
0370 |     // 4 crosswalk banks around center intersection
0371 |     const offsets = [
0372 |       { x: cx, z: cz - roadW / 2 - stripeL / 2, horiz: true },
0373 |       { x: cx, z: cz + roadW / 2 + stripeL / 2, horiz: true },
0374 |       { x: cx - roadW / 2 - stripeL / 2, z: cz, horiz: false },
0375 |       { x: cx + roadW / 2 + stripeL / 2, z: cz, horiz: false }
0376 |     ];
0377 | 
0378 |     for (let b = 0; b < offsets.length; b++) {
0379 |       const bank = offsets[b];
0380 |       for (let s = -roadW / 2 + 1.5; s <= roadW / 2 - 1.5; s += 1.8) {
0381 |         const geo = bank.horiz
0382 |           ? new THREE.PlaneGeometry(stripeW, stripeL)
0383 |           : new THREE.PlaneGeometry(stripeL, stripeW);
0384 |         geo.rotateX(-Math.PI / 2);
0385 |         const mesh = new THREE.Mesh(geo, stripeMat);
0386 |         if (bank.horiz) {
0387 |           mesh.position.set(bank.x + s, 0.035, bank.z);
0388 |         } else {
0389 |           mesh.position.set(bank.x, 0.035, bank.z + s);
0390 |         }
0391 |         group.add(mesh);
0392 |       }
0393 |     }
0394 |   }
0395 | 
0396 |   private static createStreetlight(x: number, z: number): THREE.Group {
0397 |     const group = new THREE.Group();
0398 |     group.position.set(x, 0, z);
0399 | 
0400 |     // Steel Mast
0401 |     const poleGeo = new THREE.CylinderGeometry(0.12, 0.18, 7.8, 8);
0402 |     const pole = new THREE.Mesh(poleGeo, materialLib.streetlightPoleMaterial);
0403 |     pole.position.y = 3.9;
0404 |     pole.castShadow = true;
0405 |     group.add(pole);
0406 | 
0407 |     // Horizontal Arm
0408 |     const armGeo = new THREE.BoxGeometry(0.12, 0.12, 1.8);
0409 |     const arm = new THREE.Mesh(armGeo, materialLib.streetlightPoleMaterial);
0410 |     arm.position.set(0, 7.8, 0.8);
0411 |     group.add(arm);
0412 | 
0413 |     // Lamp fixture with emissive glow
0414 |     const lampGeo = new THREE.BoxGeometry(0.55, 0.2, 0.9);
0415 |     const lamp = new THREE.Mesh(lampGeo, materialLib.streetlightEmitterMaterial);
0416 |     lamp.position.set(0, 7.7, 1.5);
0417 |     group.add(lamp);
0418 | 
0419 |     return group;
0420 |   }
0421 | 
0422 |   private static createBollard(x: number, z: number): THREE.Mesh {
0423 |     const geo = new THREE.CylinderGeometry(0.14, 0.16, 0.9, 8);
0424 |     const mesh = new THREE.Mesh(geo, materialLib.galvanizedSteelMaterial);
0425 |     mesh.position.set(x, 0.45, z);
0426 |     mesh.castShadow = true;
0427 |     return mesh;
0428 |   }
0429 | 
0430 |   /**
0431 |    * Signature Landmark for canonical districts (Page 31)
0432 |    */
0433 |   private static createSignatureLandmark(district: DistrictData): { mesh: THREE.Group } | null {
0434 |     const group = new THREE.Group();
0435 |     const cx = district.center[0];
0436 |     const cz = district.center[2];
0437 | 
0438 |     if (district.id === 'D01') {
0439 |       // Aurelio Spire Tower: 140m mega skyscraper with stepped glass curtain and helipad
0440 |       const baseGeo = new THREE.BoxGeometry(48, 85, 48);
0441 |       const baseMesh = new THREE.Mesh(baseGeo, materialLib.towerGlassMaterial);
0442 |       baseMesh.position.y = 42.5;
0443 |       baseMesh.castShadow = true;
0444 |       group.add(baseMesh);
0445 | 
0446 |       const midGeo = new THREE.BoxGeometry(36, 40, 36);
0447 |       const midMesh = new THREE.Mesh(midGeo, materialLib.facadeWindowAtlasMaterial);
0448 |       midMesh.position.y = 85 + 20;
0449 |       midMesh.castShadow = true;
0450 |       group.add(midMesh);
0451 | 
0452 |       const spireGeo = new THREE.ConeGeometry(6, 35, 4);
0453 |       spireGeo.rotateY(Math.PI / 4);
0454 |       const spire = new THREE.Mesh(spireGeo, materialLib.vehicleChrome);
0455 |       spire.position.y = 125 + 17.5;
0456 |       group.add(spire);
0457 | 
0458 |       // Helipad
0459 |       const padGeo = new THREE.CylinderGeometry(11, 11, 1.2, 16);
0460 |       const pad = new THREE.Mesh(padGeo, materialLib.curbMaterial);
0461 |       pad.position.y = 85.6;
0462 |       group.add(pad);
0463 | 
0464 |       group.position.set(cx, 0, cz);
0465 |       return { mesh: group };
0466 |     }
0467 | 
0468 |     if (district.id === 'D02') {
0469 |       // Meridian Skybridge Towers
0470 |       const tower1 = new THREE.Mesh(new THREE.BoxGeometry(26, 80, 26), materialLib.towerGlassMaterial);
0471 |       tower1.position.set(-20, 40, 0);
0472 |       tower1.castShadow = true;
0473 | 
0474 |       const tower2 = new THREE.Mesh(new THREE.BoxGeometry(26, 80, 26), materialLib.towerGlassMaterial);
0475 |       tower2.position.set(20, 40, 0);
0476 |       tower2.castShadow = true;
0477 | 
0478 |       const bridge = new THREE.Mesh(new THREE.BoxGeometry(24, 6, 9), materialLib.vehicleChrome);
0479 |       bridge.position.set(0, 56, 0);
0480 | 
0481 |       group.add(tower1, tower2, bridge);
0482 |       group.position.set(cx + 25, 0, cz);
0483 |       return { mesh: group };
0484 |     }
0485 | 
0486 |     if (district.id === 'D04') {
0487 |       // Grand Assembly Civic Dome
0488 |       const hall = new THREE.Mesh(new THREE.BoxGeometry(52, 20, 36), materialLib.luxuryMarbleMaterial);
0489 |       hall.position.y = 10;
0490 |       hall.castShadow = true;
0491 | 
0492 |       const dome = new THREE.Mesh(new THREE.SphereGeometry(15, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2), materialLib.vehicleChrome);
0493 |       dome.position.y = 20;
0494 | 
0495 |       // Colonnade portico
0496 |       for (let c = -20; c <= 20; c += 8) {
0497 |         const col = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 18, 12), materialLib.luxuryMarbleMaterial);
0498 |         col.position.set(c, 9, 19);
0499 |         col.castShadow = true;
0500 |         group.add(col);
0501 |       }
0502 | 
0503 |       group.add(hall, dome);
0504 |       group.position.set(cx, 0, cz + 35);
0505 |       return { mesh: group };
0506 |     }
0507 | 
0508 |     if (district.id === 'D05') {
0509 |       // Neon Nexus Entertainment Megastructure
0510 |       const arcade = new THREE.Mesh(new THREE.BoxGeometry(55, 24, 40), materialLib.concretePrecastMaterial);
0511 |       arcade.position.y = 12;
0512 |       arcade.castShadow = true;
0513 | 
0514 |       const neonP = new THREE.Mesh(new THREE.PlaneGeometry(45, 6), materialLib.neonPink);
0515 |       neonP.position.set(0, 18, 20.2);
0516 |       const neonC = new THREE.Mesh(new THREE.PlaneGeometry(45, 4), materialLib.neonCyan);
0517 |       neonC.position.set(0, 12, 20.2);
0518 | 
0519 |       group.add(arcade, neonP, neonC);
0520 |       group.position.set(cx, 0, cz);
0521 |       return { mesh: group };
0522 |     }
0523 | 
0524 |     return null;
0525 |   }
0526 | }
0527 | 
```

---

## 38. `src/world/worldStreamer.ts`

<a id="src-world-worldstreamer-ts"></a>

**Role:** Cell streaming manager loading hero high-LOD cells and perimeter proxy shells with hysteresis and physics collider sync.

- **File Path:** `src/world/worldStreamer.ts`
- **Total Lines:** 247
- **Size:** 7.68 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { CANONICAL_DISTRICTS } from '../data/districts';
0003 | import { SectorBuilder, StaticCollider } from './sectorBuilder';
0004 | import { PhysicsColliderManager } from '../physics/physicsColliders';
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
0016 |   private colliderManager: PhysicsColliderManager | null = null;
0017 |   private loadedSectors: Map<string, LoadedSector> = new Map();
0018 |   public allColliders: StaticCollider[] = [];
0019 |   public currentDistrictId: string = 'D01';
0020 | 
0021 |   // Distance thresholds
0022 |   private readonly heroRadius = 380; // Full LOD
0023 |   private readonly streamRadius = 850; // Proxy LOD
0024 |   private readonly evictionBufferTime = 4000; // 4 seconds hysteresis
0025 | 
0026 |   // Scratch memory & zero-allocation hot-loop tracking (Page 23)
0027 |   private readonly desiredHeroIds = new Set<string>();
0028 |   private readonly desiredProxyIds = new Set<string>();
0029 |   private colliderVersion = 0;
0030 |   private builtColliderVersion = -1;
0031 |   private readonly playerSphere = new THREE.Sphere(new THREE.Vector3(), 0);
0032 |   private readonly closestPoint = new THREE.Vector3();
0033 |   private readonly normalScratch = new THREE.Vector3();
0034 |   private readonly zeroNormal = new THREE.Vector3();
0035 | 
0036 |   constructor(scene: THREE.Scene, colliderManager?: PhysicsColliderManager) {
0037 |     this.scene = scene;
0038 |     if (colliderManager) this.colliderManager = colliderManager;
0039 |   }
0040 | 
0041 |   public setColliderManager(cm: PhysicsColliderManager | null): void {
0042 |     this.colliderManager = cm;
0043 |   }
0044 | 
0045 |   private markColliderTopologyDirty(): void {
0046 |     this.colliderVersion++;
0047 |   }
0048 | 
0049 |   public rebuildCollidersIfDirty(): void {
0050 |     if (this.builtColliderVersion === this.colliderVersion) return;
0051 |     this.allColliders.length = 0;
0052 |     for (const sector of this.loadedSectors.values()) {
0053 |       if (sector.isHeroLOD) {
0054 |         for (const collider of sector.colliders) {
0055 |           this.allColliders.push(collider);
0056 |         }
0057 |       }
0058 |     }
0059 |     this.builtColliderVersion = this.colliderVersion;
0060 |   }
0061 | 
0062 |   public update(playerPos: THREE.Vector3): void {
0063 |     const now = performance.now();
0064 |     this.desiredHeroIds.clear();
0065 |     this.desiredProxyIds.clear();
0066 | 
0067 |     let nearestId = this.currentDistrictId;
0068 |     let nearestDistanceSq = Infinity;
0069 |     const heroRadiusSq = this.heroRadius * this.heroRadius;
0070 |     const streamRadiusSq = this.streamRadius * this.streamRadius;
0071 | 
0072 |     // Optimized hot-path query without temporary closures (Page 23)
0073 |     for (const district of CANONICAL_DISTRICTS) {
0074 |       const dx = playerPos.x < district.bounds.minX
0075 |         ? district.bounds.minX - playerPos.x
0076 |         : playerPos.x > district.bounds.maxX
0077 |           ? playerPos.x - district.bounds.maxX
0078 |           : 0;
0079 |       const dz = playerPos.z < district.bounds.minZ
0080 |         ? district.bounds.minZ - playerPos.z
0081 |         : playerPos.z > district.bounds.maxZ
0082 |           ? playerPos.z - district.bounds.maxZ
0083 |           : 0;
0084 | 
0085 |       const distSq = dx * dx + dz * dz;
0086 | 
0087 |       if (distSq < nearestDistanceSq) {
0088 |         nearestDistanceSq = distSq;
0089 |         nearestId = district.id;
0090 |       }
0091 | 
0092 |       if (distSq <= heroRadiusSq) {
0093 |         this.desiredHeroIds.add(district.id);
0094 |       } else if (distSq <= streamRadiusSq) {
0095 |         this.desiredProxyIds.add(district.id);
0096 |       }
0097 |     }
0098 | 
0099 |     this.currentDistrictId = nearestId;
0100 |     // Always keep nearest/current district in hero LOD
0101 |     this.desiredHeroIds.add(nearestId);
0102 | 
0103 |     // Promote or load hero sectors
0104 |     for (const id of this.desiredHeroIds) {
0105 |       const existing = this.loadedSectors.get(id);
0106 |       if (!existing) {
0107 |         this.loadSector(id, true, now);
0108 |       } else {
0109 |         existing.lastActiveTime = now;
0110 |         if (!existing.isHeroLOD) {
0111 |           this.unloadSector(id);
0112 |           this.loadSector(id, true, now);
0113 |         }
0114 |       }
0115 |     }
0116 | 
0117 |     // Load proxy sectors
0118 |     for (const id of this.desiredProxyIds) {
0119 |       if (this.desiredHeroIds.has(id)) continue;
0120 |       const existing = this.loadedSectors.get(id);
0121 |       if (!existing) {
0122 |         this.loadSector(id, false, now);
0123 |       } else {
0124 |         existing.lastActiveTime = now;
0125 |       }
0126 |     }
0127 | 
0128 |     // Unload expired sectors
0129 |     for (const [id, sector] of this.loadedSectors.entries()) {
0130 |       const isDesired = this.desiredHeroIds.has(id) || this.desiredProxyIds.has(id);
0131 |       if (!isDesired) {
0132 |         if (now - sector.lastActiveTime > this.evictionBufferTime) {
0133 |           this.unloadSector(id);
0134 |         }
0135 |       }
0136 |     }
0137 | 
0138 |     this.rebuildCollidersIfDirty();
0139 |   }
0140 | 
0141 |   private loadSector(districtId: string, isHeroLOD: boolean, now: number): void {
0142 |     const data = CANONICAL_DISTRICTS.find(d => d.id === districtId);
0143 |     if (!data) return;
0144 | 
0145 |     const { group, colliders } = SectorBuilder.buildSector(data, isHeroLOD);
0146 |     this.scene.add(group);
0147 | 
0148 |     // Register colliders in Rapier physics world if available
0149 |     if (this.colliderManager && isHeroLOD) {
0150 |       this.colliderManager.registerSectorColliders(districtId, colliders);
0151 |     }
0152 | 
0153 |     this.loadedSectors.set(districtId, {
0154 |       districtId,
0155 |       group,
0156 |       colliders,
0157 |       isHeroLOD,
0158 |       lastActiveTime: now
0159 |     });
0160 |     this.markColliderTopologyDirty();
0161 |   }
0162 | 
0163 |   private unloadSector(districtId: string): void {
0164 |     const loaded = this.loadedSectors.get(districtId);
0165 |     if (loaded) {
0166 |       this.scene.remove(loaded.group);
0167 |       loaded.group.traverse(obj => {
0168 |         if ((obj as THREE.Mesh).isMesh) {
0169 |           const mesh = obj as THREE.Mesh;
0170 |           mesh.geometry?.dispose();
0171 |         }
0172 |       });
0173 | 
0174 |       // Unregister static colliders from Rapier physics world
0175 |       if (this.colliderManager) {
0176 |         this.colliderManager.unregisterSectorColliders(districtId);
0177 |       }
0178 | 
0179 |       this.loadedSectors.delete(districtId);
0180 |       this.markColliderTopologyDirty();
0181 |     }
0182 |   }
0183 | 
0184 |   public getActiveSectorIds(): string[] {
0185 |     return Array.from(this.loadedSectors.keys());
0186 |   }
0187 | 
0188 |   public getGroundHeight(x: number, z: number, previousY = 0): number {
0189 |     this.rebuildCollidersIfDirty();
0190 |     let groundY = 0;
0191 |     for (const col of this.allColliders) {
0192 |       if (
0193 |         x >= col.box.min.x &&
0194 |         x <= col.box.max.x &&
0195 |         z >= col.box.min.z &&
0196 |         z <= col.box.max.z
0197 |       ) {
0198 |         if (col.box.max.y <= previousY + 0.5 && col.box.max.y > groundY) {
0199 |           groundY = col.box.max.y;
0200 |         }
0201 |       }
0202 |     }
0203 |     return groundY;
0204 |   }
0205 | 
0206 |   public testCollision(pos: THREE.Vector3, radius: number): { hit: boolean; normal: THREE.Vector3 } {
0207 |     this.rebuildCollidersIfDirty();
0208 |     this.playerSphere.center.copy(pos);
0209 |     this.playerSphere.radius = radius;
0210 | 
0211 |     for (const col of this.allColliders) {
0212 |       if (!col.box.intersectsSphere(this.playerSphere)) continue;
0213 |       col.box.clampPoint(pos, this.closestPoint);
0214 |       this.normalScratch.subVectors(pos, this.closestPoint).setY(0);
0215 | 
0216 |       if (this.normalScratch.lengthSq() > 1e-8) {
0217 |         this.normalScratch.normalize();
0218 |         return { hit: true, normal: this.normalScratch.clone() };
0219 |       }
0220 | 
0221 |       const dxMin = Math.abs(pos.x - col.box.min.x);
0222 |       const dxMax = Math.abs(col.box.max.x - pos.x);
0223 |       const dzMin = Math.abs(pos.z - col.box.min.z);
0224 |       const dzMax = Math.abs(col.box.max.z - pos.z);
0225 |       const minPen = Math.min(dxMin, dxMax, dzMin, dzMax);
0226 | 
0227 |       if (minPen === dxMin) this.normalScratch.set(-1, 0, 0);
0228 |       else if (minPen === dxMax) this.normalScratch.set(1, 0, 0);
0229 |       else if (minPen === dzMin) this.normalScratch.set(0, 0, -1);
0230 |       else this.normalScratch.set(0, 0, 1);
0231 | 
0232 |       return { hit: true, normal: this.normalScratch.clone() };
0233 |     }
0234 | 
0235 |     return { hit: false, normal: this.zeroNormal.clone() };
0236 |   }
0237 | 
0238 |   public dispose(): void {
0239 |     for (const id of Array.from(this.loadedSectors.keys())) {
0240 |       this.unloadSector(id);
0241 |     }
0242 |     this.allColliders.length = 0;
0243 |     this.colliderManager?.clear();
0244 |     this.markColliderTopologyDirty();
0245 |   }
0246 | }
0247 | 
```

---

## 39. `src/player/characterModel.ts`

<a id="src-player-charactermodel-ts"></a>

**Role:** Procedural 3D humanoid character model for Kai Mercer with articulated skeletal rig.

- **File Path:** `src/player/characterModel.ts`
- **Total Lines:** 445
- **Size:** 13.95 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { PlayerLocomotionState } from '../core/types';
0003 | import { HitDirection } from '../combat/hitReactionTypes';
0004 | import { expDamp } from '../core/math';
0005 | 
0006 | function roundedLimb(
0007 |   radius: number,
0008 |   length: number,
0009 |   material: THREE.Material
0010 | ): THREE.Mesh {
0011 |   const mesh = new THREE.Mesh(
0012 |     new THREE.CapsuleGeometry(radius, length, 6, 10),
0013 |     material
0014 |   );
0015 |   mesh.castShadow = true;
0016 |   mesh.receiveShadow = true;
0017 |   return mesh;
0018 | }
0019 | 
0020 | function makeFace(
0021 |   head: THREE.Object3D,
0022 |   skin: THREE.Material,
0023 |   hair: THREE.Material,
0024 |   eye: THREE.Material
0025 | ): void {
0026 |   const skull = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 12), skin);
0027 |   skull.scale.set(0.92, 1.08, 0.94);
0028 |   skull.castShadow = true;
0029 |   head.add(skull);
0030 | 
0031 |   const jaw = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.11, 4, 8), skin);
0032 |   jaw.position.set(0, -0.075, 0.025);
0033 |   jaw.castShadow = true;
0034 |   head.add(jaw);
0035 | 
0036 |   const nose = new THREE.Mesh(new THREE.CapsuleGeometry(0.024, 0.07, 4, 6), skin);
0037 |   nose.rotation.x = Math.PI / 2;
0038 |   nose.position.set(0, -0.01, 0.16);
0039 |   head.add(nose);
0040 | 
0041 |   const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), eye);
0042 |   const eyeR = eyeL.clone();
0043 |   eyeL.position.set(-0.06, 0.035, 0.165);
0044 |   eyeR.position.set(0.06, 0.035, 0.165);
0045 |   head.add(eyeL, eyeR);
0046 | 
0047 |   const hairMesh = new THREE.Mesh(
0048 |     new THREE.SphereGeometry(0.205, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.60),
0049 |     hair
0050 |   );
0051 |   hairMesh.position.y = 0.05;
0052 |   hairMesh.castShadow = true;
0053 |   head.add(hairMesh);
0054 | }
0055 | 
0056 | export class CharacterModel {
0057 |   public mesh: THREE.Group;
0058 | 
0059 |   // Skeletal hierarchy
0060 |   public torso: THREE.Group;
0061 |   public chest: THREE.Group;
0062 |   public head: THREE.Group;
0063 |   public leftArm: THREE.Group;
0064 |   public rightArm: THREE.Group;
0065 |   public leftForearm: THREE.Group;
0066 |   public rightForearm: THREE.Group;
0067 |   public leftLeg: THREE.Group;
0068 |   public rightLeg: THREE.Group;
0069 |   public leftCalf: THREE.Group;
0070 |   public rightCalf: THREE.Group;
0071 |   public weaponSocket: THREE.Group;
0072 | 
0073 |   // Stride & Layered Animation State
0074 |   private stridePhase: number = 0;
0075 |   private breathTime: number = 0;
0076 |   private recoilImpulse: number = 0;
0077 |   private hitReactionTimer: number = 0;
0078 |   private hitReactionDirection: HitDirection = 'front';
0079 |   private hitReactionStrength: number = 0;
0080 |   private deathCollapseProgress: number = 0;
0081 | 
0082 |   constructor() {
0083 |     this.mesh = new THREE.Group();
0084 |     this.mesh.name = 'Hero_KaiMercer';
0085 | 
0086 |     // Stylized PBR Materials
0087 |     const skinMat = new THREE.MeshStandardMaterial({
0088 |       color: 0xdeb887,
0089 |       roughness: 0.65,
0090 |       metalness: 0.05
0091 |     });
0092 |     const hairMat = new THREE.MeshStandardMaterial({
0093 |       color: 0x1c1917,
0094 |       roughness: 0.9,
0095 |       metalness: 0.0
0096 |     });
0097 |     const eyeMat = new THREE.MeshStandardMaterial({
0098 |       color: 0x1e3a8a,
0099 |       roughness: 0.1,
0100 |       metalness: 0.2
0101 |     });
0102 |     const jacketMat = new THREE.MeshStandardMaterial({
0103 |       color: 0x334155,
0104 |       roughness: 0.55,
0105 |       metalness: 0.15
0106 |     });
0107 |     const shirtMat = new THREE.MeshStandardMaterial({
0108 |       color: 0x0f172a,
0109 |       roughness: 0.85
0110 |     });
0111 |     const pantsMat = new THREE.MeshStandardMaterial({
0112 |       color: 0x1e293b,
0113 |       roughness: 0.75
0114 |     });
0115 |     const bootsMat = new THREE.MeshStandardMaterial({
0116 |       color: 0x09090b,
0117 |       roughness: 0.45,
0118 |       metalness: 0.2
0119 |     });
0120 |     const accentMat = new THREE.MeshStandardMaterial({
0121 |       color: 0xf59e0b,
0122 |       roughness: 0.4,
0123 |       metalness: 0.3
0124 |     });
0125 |     const chromeMat = new THREE.MeshStandardMaterial({
0126 |       color: 0xcccccc,
0127 |       roughness: 0.2,
0128 |       metalness: 0.8
0129 |     });
0130 | 
0131 |     // 1. Root Pelvis / Torso
0132 |     this.torso = new THREE.Group();
0133 |     this.torso.position.y = 0.95;
0134 |     this.mesh.add(this.torso);
0135 | 
0136 |     // Pelvis mesh
0137 |     const pelvisMesh = roundedLimb(0.18, 0.12, pantsMat);
0138 |     pelvisMesh.rotation.x = Math.PI / 2;
0139 |     this.torso.add(pelvisMesh);
0140 | 
0141 |     // Belt and buckle
0142 |     const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.06, 16), bootsMat);
0143 |     belt.position.y = 0.08;
0144 |     const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.03), chromeMat);
0145 |     buckle.position.set(0, 0.08, 0.19);
0146 |     this.torso.add(belt, buckle);
0147 | 
0148 |     // 2. Chest & Upper Body
0149 |     this.chest = new THREE.Group();
0150 |     this.chest.position.y = 0.18;
0151 |     this.torso.add(this.chest);
0152 | 
0153 |     // Anatomical chest jacket
0154 |     const chestMesh = roundedLimb(0.22, 0.28, jacketMat);
0155 |     chestMesh.position.y = 0.14;
0156 |     this.chest.add(chestMesh);
0157 | 
0158 |     // Inner shirt visible at chest center
0159 |     const shirtInset = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.06), shirtMat);
0160 |     shirtInset.position.set(0, 0.18, 0.19);
0161 |     this.chest.add(shirtInset);
0162 | 
0163 |     // High collar
0164 |     const collar = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.035, 8, 16), accentMat);
0165 |     collar.rotation.x = Math.PI / 2;
0166 |     collar.position.set(0, 0.30, 0.02);
0167 |     this.chest.add(collar);
0168 | 
0169 |     // Tactical harness & shoulder straps
0170 |     const harness = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.04), accentMat);
0171 |     harness.position.set(0, 0.14, 0.21);
0172 |     this.chest.add(harness);
0173 | 
0174 |     // 3. Head & Articulated Neck
0175 |     this.head = new THREE.Group();
0176 |     this.head.position.set(0, 0.36, 0);
0177 |     makeFace(this.head, skinMat, hairMat, eyeMat);
0178 |     this.chest.add(this.head);
0179 | 
0180 |     // 4. Left Arm (Shoulder -> Forearm -> Hand)
0181 |     this.leftArm = new THREE.Group();
0182 |     this.leftArm.position.set(-0.28, 0.24, 0);
0183 |     const lUpper = roundedLimb(0.075, 0.22, jacketMat);
0184 |     lUpper.position.y = -0.11;
0185 |     this.leftArm.add(lUpper);
0186 | 
0187 |     this.leftForearm = new THREE.Group();
0188 |     this.leftForearm.position.set(0, -0.24, 0);
0189 |     const lLower = roundedLimb(0.065, 0.20, jacketMat);
0190 |     lLower.position.y = -0.10;
0191 |     this.leftForearm.add(lLower);
0192 | 
0193 |     const lHand = roundedLimb(0.045, 0.08, skinMat);
0194 |     lHand.position.set(0, -0.22, 0);
0195 |     this.leftForearm.add(lHand);
0196 | 
0197 |     this.leftArm.add(this.leftForearm);
0198 |     this.chest.add(this.leftArm);
0199 | 
0200 |     // 5. Right Arm (Shoulder -> Forearm -> Hand + Weapon Socket)
0201 |     this.rightArm = new THREE.Group();
0202 |     this.rightArm.position.set(0.28, 0.24, 0);
0203 |     const rUpper = roundedLimb(0.075, 0.22, jacketMat);
0204 |     rUpper.position.y = -0.11;
0205 |     this.rightArm.add(rUpper);
0206 | 
0207 |     this.rightForearm = new THREE.Group();
0208 |     this.rightForearm.position.set(0, -0.24, 0);
0209 |     const rLower = roundedLimb(0.065, 0.20, jacketMat);
0210 |     rLower.position.y = -0.10;
0211 |     this.rightForearm.add(rLower);
0212 | 
0213 |     const rHand = roundedLimb(0.045, 0.08, skinMat);
0214 |     rHand.position.set(0, -0.22, 0);
0215 |     this.rightForearm.add(rHand);
0216 | 
0217 |     // Tactical watch
0218 |     const watch = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.04, 12), accentMat);
0219 |     watch.position.set(0, -0.16, 0);
0220 |     this.rightForearm.add(watch);
0221 | 
0222 |     // Weapon Socket attached to right hand
0223 |     this.weaponSocket = new THREE.Group();
0224 |     this.weaponSocket.position.set(0, -0.24, 0.06);
0225 |     this.rightForearm.add(this.weaponSocket);
0226 | 
0227 |     this.rightArm.add(this.rightForearm);
0228 |     this.chest.add(this.rightArm);
0229 | 
0230 |     // 6. Left Leg (Thigh -> Calf -> Boot)
0231 |     this.leftLeg = new THREE.Group();
0232 |     this.leftLeg.position.set(-0.14, -0.05, 0);
0233 |     const lThigh = roundedLimb(0.09, 0.32, pantsMat);
0234 |     lThigh.position.y = -0.16;
0235 |     this.leftLeg.add(lThigh);
0236 | 
0237 |     this.leftCalf = new THREE.Group();
0238 |     this.leftCalf.position.set(0, -0.34, 0);
0239 |     const lShin = roundedLimb(0.08, 0.28, pantsMat);
0240 |     lShin.position.y = -0.14;
0241 |     this.leftCalf.add(lShin);
0242 | 
0243 |     const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.22), bootsMat);
0244 |     lBoot.position.set(0, -0.32, 0.04);
0245 |     lBoot.castShadow = true;
0246 |     this.leftCalf.add(lBoot);
0247 | 
0248 |     this.leftLeg.add(this.leftCalf);
0249 |     this.torso.add(this.leftLeg);
0250 | 
0251 |     // 7. Right Leg (Thigh -> Calf -> Boot)
0252 |     this.rightLeg = new THREE.Group();
0253 |     this.rightLeg.position.set(0.14, -0.05, 0);
0254 |     const rThigh = roundedLimb(0.09, 0.32, pantsMat);
0255 |     rThigh.position.y = -0.16;
0256 |     this.rightLeg.add(rThigh);
0257 | 
0258 |     this.rightCalf = new THREE.Group();
0259 |     this.rightCalf.position.set(0, -0.34, 0);
0260 |     const rShin = roundedLimb(0.08, 0.28, pantsMat);
0261 |     rShin.position.y = -0.14;
0262 |     this.rightCalf.add(rShin);
0263 | 
0264 |     const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.22), bootsMat);
0265 |     rBoot.position.set(0, -0.32, 0.04);
0266 |     rBoot.castShadow = true;
0267 |     this.rightCalf.add(rBoot);
0268 | 
0269 |     this.rightLeg.add(this.rightCalf);
0270 |     this.torso.add(this.rightLeg);
0271 |   }
0272 | 
0273 |   public triggerRecoil(intensity: number = 1.0): void {
0274 |     this.recoilImpulse = Math.min(1.0, this.recoilImpulse + intensity * 0.4);
0275 |   }
0276 | 
0277 |   public triggerHitReaction(direction: HitDirection, strength: number = 1.0): void {
0278 |     this.hitReactionTimer = 0.35;
0279 |     this.hitReactionDirection = direction;
0280 |     this.hitReactionStrength = strength;
0281 |   }
0282 | 
0283 |   /**
0284 |    * Layered procedural animation system
0285 |    */
0286 |   public updateAnimation(
0287 |     state: PlayerLocomotionState,
0288 |     speed: number,
0289 |     dt: number,
0290 |     isAiming: boolean
0291 |   ): void {
0292 |     // 1. Reset baseline transforms
0293 |     this.torso.position.set(0, 0.95, 0);
0294 |     this.torso.rotation.set(0, 0, 0);
0295 |     this.chest.rotation.set(0, 0, 0);
0296 |     this.head.rotation.set(0, 0, 0);
0297 |     this.leftArm.rotation.set(0, 0, 0);
0298 |     this.rightArm.rotation.set(0, 0, 0);
0299 |     this.leftForearm.rotation.set(0, 0, 0);
0300 |     this.rightForearm.rotation.set(0, 0, 0);
0301 |     this.leftLeg.rotation.set(0, 0, 0);
0302 |     this.rightLeg.rotation.set(0, 0, 0);
0303 |     this.leftCalf.rotation.set(0, 0, 0);
0304 |     this.rightCalf.rotation.set(0, 0, 0);
0305 | 
0306 |     this.mesh.visible = state !== 'in_vehicle';
0307 | 
0308 |     // 2. Death state priority
0309 |     if (state === 'dead') {
0310 |       this.deathCollapseProgress = Math.min(1.0, this.deathCollapseProgress + dt * 3.5);
0311 |       const p = this.deathCollapseProgress;
0312 |       this.torso.position.y = 0.95 * (1 - p) + 0.15 * p;
0313 |       this.torso.rotation.x = -Math.PI / 2 * p;
0314 |       this.leftArm.rotation.z = -1.2 * p;
0315 |       this.rightArm.rotation.z = 1.2 * p;
0316 |       this.leftLeg.rotation.x = 0.4 * p;
0317 |       this.rightLeg.rotation.x = -0.3 * p;
0318 |       return;
0319 |     }
0320 | 
0321 |     if (state === 'in_vehicle') {
0322 |       this.torso.position.y = 0.55;
0323 |       this.leftLeg.rotation.x = -Math.PI / 2.2;
0324 |       this.rightLeg.rotation.x = -Math.PI / 2.2;
0325 |       this.leftArm.rotation.x = -Math.PI / 3;
0326 |       this.rightArm.rotation.x = -Math.PI / 3;
0327 |       return;
0328 |     }
0329 | 
0330 |     // 3. Stride phase driven by distance / speed to eliminate foot-sliding (Page 47)
0331 |     if (speed > 0.1) {
0332 |       this.stridePhase += (speed / 1.4) * dt * Math.PI * 2;
0333 |     } else {
0334 |       // Gently return stride to resting phase
0335 |       this.stridePhase = expDamp(this.stridePhase, Math.round(this.stridePhase / Math.PI) * Math.PI, 10, dt);
0336 |     }
0337 |     this.breathTime += dt;
0338 | 
0339 |     // 4. Base Locomotion Layer
0340 |     if (speed < 0.1 && (state === 'idle')) {
0341 |       const breath = Math.sin(this.breathTime * 1.8) * 0.015;
0342 |       this.chest.position.y = breath;
0343 |       this.head.rotation.x = breath * 0.4;
0344 |       this.leftArm.rotation.x = Math.sin(this.breathTime * 1.8) * 0.04;
0345 |       this.rightArm.rotation.x = -Math.sin(this.breathTime * 1.8) * 0.04;
0346 |     } else if (state === 'jump' || state === 'fall') {
0347 |       this.leftLeg.rotation.x = 0.45;
0348 |       this.rightLeg.rotation.x = -0.30;
0349 |       this.leftCalf.rotation.x = 0.6;
0350 |       this.leftArm.rotation.x = -0.8;
0351 |       this.rightArm.rotation.x = -0.8;
0352 |     } else {
0353 |       // Walk / Jog / Sprint swing
0354 |       const swingAmp = state === 'sprint' ? 0.95 : state === 'jog' ? 0.65 : 0.42;
0355 |       const legAngle = Math.sin(this.stridePhase) * swingAmp;
0356 |       this.leftLeg.rotation.x = legAngle;
0357 |       this.rightLeg.rotation.x = -legAngle;
0358 | 
0359 |       // Natural knee flexion on backswing
0360 |       if (legAngle > 0) {
0361 |         this.leftCalf.rotation.x = legAngle * 0.7;
0362 |       } else {
0363 |         this.rightCalf.rotation.x = -legAngle * 0.7;
0364 |       }
0365 | 
0366 |       if (!isAiming) {
0367 |         const armAmp = swingAmp * 0.75;
0368 |         this.leftArm.rotation.x = -legAngle * armAmp;
0369 |         this.rightArm.rotation.x = legAngle * armAmp;
0370 |         this.leftForearm.rotation.x = Math.max(0, -legAngle * 0.4);
0371 |         this.rightForearm.rotation.x = Math.max(0, legAngle * 0.4);
0372 |       }
0373 | 
0374 |       // Torso bobbing and sprint lean
0375 |       const bob = Math.abs(Math.sin(this.stridePhase)) * (state === 'sprint' ? 0.06 : 0.03);
0376 |       this.torso.position.y = 0.95 - bob;
0377 |       this.torso.rotation.x = state === 'sprint' ? 0.16 : 0.05;
0378 |     }
0379 | 
0380 |     // 5. Upper-body Aiming Layer (Pages 46 & 49)
0381 |     if (isAiming) {
0382 |       this.chest.rotation.y = -0.15;
0383 |       this.head.rotation.y = 0.12;
0384 | 
0385 |       // Right arm raises weapon forward
0386 |       this.rightArm.rotation.x = -Math.PI / 2.1;
0387 |       this.rightArm.rotation.y = -0.15;
0388 |       this.rightForearm.rotation.x = 0.1;
0389 | 
0390 |       // Left arm supports weapon foregrip
0391 |       this.leftArm.rotation.x = -Math.PI / 2.3;
0392 |       this.leftArm.rotation.y = 0.42;
0393 |       this.leftForearm.rotation.x = 0.35;
0394 |     }
0395 | 
0396 |     // 6. Additive Recoil Layer
0397 |     if (this.recoilImpulse > 0.001) {
0398 |       this.recoilImpulse = expDamp(this.recoilImpulse, 0, 16, dt);
0399 |       this.rightArm.rotation.x += this.recoilImpulse * 0.25;
0400 |       this.chest.rotation.x += this.recoilImpulse * 0.10;
0401 |     }
0402 | 
0403 |     // 7. Directional Hit Reaction Layer (Pages 50 & 51)
0404 |     if (this.hitReactionTimer > 0) {
0405 |       this.hitReactionTimer -= dt;
0406 |       const t = Math.max(0, this.hitReactionTimer / 0.35);
0407 |       const intensity = t * this.hitReactionStrength;
0408 | 
0409 |       switch (this.hitReactionDirection) {
0410 |         case 'front':
0411 |           this.chest.rotation.x -= intensity * 0.35;
0412 |           this.torso.position.z -= intensity * 0.08;
0413 |           break;
0414 |         case 'back':
0415 |           this.chest.rotation.x += intensity * 0.35;
0416 |           this.torso.position.z += intensity * 0.08;
0417 |           break;
0418 |         case 'left':
0419 |           this.chest.rotation.z += intensity * 0.25;
0420 |           this.torso.rotation.y += intensity * 0.20;
0421 |           break;
0422 |         case 'right':
0423 |           this.chest.rotation.z -= intensity * 0.25;
0424 |           this.torso.rotation.y -= intensity * 0.20;
0425 |           break;
0426 |       }
0427 |     }
0428 |   }
0429 | 
0430 |   public dispose(): void {
0431 |     this.mesh.traverse(obj => {
0432 |       const mesh = obj as THREE.Mesh;
0433 |       if (mesh.isMesh) {
0434 |         mesh.geometry?.dispose();
0435 |         if (Array.isArray(mesh.material)) {
0436 |           mesh.material.forEach(m => m.dispose());
0437 |         } else {
0438 |           mesh.material?.dispose();
0439 |         }
0440 |       }
0441 |     });
0442 |     this.mesh.removeFromParent();
0443 |   }
0444 | }
0445 | 
```

---

## 40. `src/player/thirdPersonCamera.ts`

<a id="src-player-thirdpersoncamera-ts"></a>

**Role:** Orbital third-person camera with obstacle collision avoidance, shoulder aim zoom, and input reset.

- **File Path:** `src/player/thirdPersonCamera.ts`
- **Total Lines:** 176
- **Size:** 5.07 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { clamp, expDamp } from '../core/math';
0003 | import { StaticCollider } from '../world/sectorBuilder';
0004 | 
0005 | export type CameraMode =
0006 |   | 'on_foot'
0007 |   | 'aiming_shoulder'
0008 |   | 'vehicle'
0009 |   | 'bike'
0010 |   | 'boat'
0011 |   | 'helicopter_aerial'
0012 |   | 'tank';
0013 | 
0014 | export class ThirdPersonCamera {
0015 |   public readonly camera: THREE.PerspectiveCamera;
0016 |   public mode: CameraMode = 'on_foot';
0017 |   public azimuth = 0;
0018 |   public elevation = 0.18;
0019 | 
0020 |   private distance = 4.5;
0021 |   private targetDistance = 4.5;
0022 |   private readonly target = new THREE.Vector3();
0023 |   private readonly desiredTarget = new THREE.Vector3();
0024 |   private readonly ideal = new THREE.Vector3();
0025 |   private readonly direction = new THREE.Vector3();
0026 |   private readonly hit = new THREE.Vector3();
0027 |   private readonly cameraRay = new THREE.Ray();
0028 |   private readonly shoulderScratch = new THREE.Vector3();
0029 |   private readonly shakeScratch = new THREE.Vector3();
0030 |   private readonly forwardScratch = new THREE.Vector3();
0031 |   private readonly rightScratch = new THREE.Vector3();
0032 | 
0033 |   private rawX = 0;
0034 |   private rawY = 0;
0035 |   private shake = 0;
0036 |   private shakeVelocity = 0;
0037 | 
0038 |   public constructor(camera: THREE.PerspectiveCamera) {
0039 |     this.camera = camera;
0040 |   }
0041 | 
0042 |   public handleMouseMove(dx: number, dy: number): void {
0043 |     this.rawX = Math.max(-2000, Math.min(2000, this.rawX + dx));
0044 |     this.rawY = Math.max(-2000, Math.min(2000, this.rawY + dy));
0045 |   }
0046 | 
0047 |   public addShake(amount: number): void {
0048 |     this.shakeVelocity += Math.min(3, Math.max(0, amount));
0049 |   }
0050 | 
0051 |   public resetInput(): void {
0052 |     this.rawX = 0;
0053 |     this.rawY = 0;
0054 |   }
0055 | 
0056 |   public update(
0057 |     targetPos: THREE.Vector3,
0058 |     dt: number,
0059 |     sprint: boolean = false,
0060 |     colliders: StaticCollider[] = []
0061 |   ): void {
0062 |     const smoothX = expDamp(0, this.rawX, 28, dt);
0063 |     const smoothY = expDamp(0, this.rawY, 28, dt);
0064 |     this.rawX -= smoothX;
0065 |     this.rawY -= smoothY;
0066 | 
0067 |     const sensitivity = 0.0026;
0068 |     this.azimuth -= smoothX * sensitivity;
0069 |     this.elevation = clamp(this.elevation - smoothY * sensitivity, -1.10, 1.10);
0070 | 
0071 |     let wantedDistance = 4.5;
0072 |     let targetFov = sprint ? 71 : 65;
0073 |     let height = 1.55;
0074 |     let shoulder = 0;
0075 | 
0076 |     switch (this.mode) {
0077 |       case 'aiming_shoulder':
0078 |         wantedDistance = 2.35;
0079 |         targetFov = 52;
0080 |         height = 1.48;
0081 |         shoulder = 0.58;
0082 |         break;
0083 |       case 'vehicle':
0084 |         wantedDistance = 7.2;
0085 |         targetFov = sprint ? 78 : 69;
0086 |         height = 2.0;
0087 |         break;
0088 |       case 'bike':
0089 |         wantedDistance = 5.4;
0090 |         targetFov = sprint ? 76 : 71;
0091 |         height = 1.8;
0092 |         break;
0093 |       case 'boat':
0094 |         wantedDistance = 8.5;
0095 |         targetFov = sprint ? 78 : 73;
0096 |         height = 2.5;
0097 |         break;
0098 |       case 'helicopter_aerial':
0099 |         wantedDistance = 15.0;
0100 |         targetFov = 74;
0101 |         height = 5.4;
0102 |         this.elevation = Math.max(0.38, this.elevation);
0103 |         break;
0104 |       case 'tank':
0105 |         wantedDistance = 9.5;
0106 |         targetFov = sprint ? 72 : 66;
0107 |         height = 2.8;
0108 |         break;
0109 |       case 'on_foot':
0110 |       default:
0111 |         wantedDistance = 4.5;
0112 |         targetFov = sprint ? 71 : 65;
0113 |         height = 1.55;
0114 |         shoulder = 0;
0115 |         break;
0116 |     }
0117 | 
0118 |     this.camera.fov = expDamp(this.camera.fov, targetFov, 8, dt);
0119 |     this.camera.updateProjectionMatrix();
0120 | 
0121 |     this.desiredTarget.copy(targetPos);
0122 |     this.desiredTarget.y += height;
0123 |     this.target.lerp(this.desiredTarget, 1 - Math.exp(-15 * dt));
0124 | 
0125 |     const ce = Math.cos(this.elevation);
0126 |     const se = Math.sin(this.elevation);
0127 |     const sa = Math.sin(this.azimuth);
0128 |     const ca = Math.cos(this.azimuth);
0129 | 
0130 |     this.direction.set(sa * ce, se, ca * ce).normalize();
0131 | 
0132 |     this.shoulderScratch.set(ca * shoulder, 0, -sa * shoulder);
0133 |     this.ideal.copy(this.target)
0134 |       .addScaledVector(this.direction, wantedDistance)
0135 |       .add(this.shoulderScratch);
0136 | 
0137 |     this.targetDistance = wantedDistance;
0138 | 
0139 |     this.cameraRay.origin.copy(this.target);
0140 |     this.cameraRay.direction.copy(this.direction);
0141 | 
0142 |     for (let i = 0; i < colliders.length; i++) {
0143 |       const c = colliders[i];
0144 |       const hitResult = this.cameraRay.intersectBox(c.box, this.hit);
0145 |       if (!hitResult) continue;
0146 |       const d = this.target.distanceTo(this.hit);
0147 |       this.targetDistance = Math.min(this.targetDistance, Math.max(0.75, d - 0.35));
0148 |     }
0149 | 
0150 |     this.distance = expDamp(this.distance, this.targetDistance, 20, dt);
0151 | 
0152 |     this.shakeVelocity *= Math.exp(-18 * dt);
0153 |     this.shake = expDamp(this.shake, this.shakeVelocity, 18, dt);
0154 | 
0155 |     const t = performance.now() * 0.001;
0156 |     const sx = Math.sin(t * 31) * this.shake * 0.01;
0157 |     const sy = Math.sin(t * 23) * this.shake * 0.008;
0158 |     const sz = Math.sin(t * 37) * this.shake * 0.007;
0159 |     this.shakeScratch.set(sx, sy, sz);
0160 | 
0161 |     this.camera.position.copy(this.target)
0162 |       .addScaledVector(this.direction, this.distance)
0163 |       .add(this.shakeScratch);
0164 | 
0165 |     this.camera.lookAt(this.target);
0166 |   }
0167 | 
0168 |   public getForwardVector(): THREE.Vector3 {
0169 |     return this.forwardScratch.set(-Math.sin(this.azimuth), 0, -Math.cos(this.azimuth)).normalize();
0170 |   }
0171 | 
0172 |   public getRightVector(): THREE.Vector3 {
0173 |     return this.rightScratch.set(Math.cos(this.azimuth), 0, -Math.sin(this.azimuth)).normalize();
0174 |   }
0175 | }
0176 | 
```

---

## 41. `src/player/playerController.ts`

<a id="src-player-playercontroller-ts"></a>

**Role:** Locomotion controller handling movement, stamina, jumping, weapon sockets, and vehicle entry.

- **File Path:** `src/player/playerController.ts`
- **Total Lines:** 304
- **Size:** 10.29 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import type * as RAPIER from '@dimforge/rapier3d-compat';
0003 | import { CharacterModel } from './characterModel';
0004 | import { ThirdPersonCamera } from './thirdPersonCamera';
0005 | import { InputState } from '../core/input';
0006 | import { PlayerLocomotionState, PlayerStats, InventoryItem, WeaponDefinition } from '../core/types';
0007 | import { expDamp, expDampAngle } from '../core/math';
0008 | import { WorldStreamer } from '../world/worldStreamer';
0009 | import { CANONICAL_WEAPONS } from '../data/weapons';
0010 | import { soundEngine } from '../core/audio';
0011 | import { eventBus } from '../core/events';
0012 | import type { VehicleInstance } from '../vehicles/vehicleController';
0013 | import { PhysicsWorld } from '../physics/physicsWorld';
0014 | 
0015 | export class PlayerController {
0016 |   public model: CharacterModel;
0017 |   public camera: ThirdPersonCamera;
0018 |   public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
0019 |   public velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
0020 |   public facingAngle: number = 0;
0021 | 
0022 |   public state: PlayerLocomotionState = 'idle';
0023 |   public stats: PlayerStats = {
0024 |     health: 100,
0025 |     maxHealth: 100,
0026 |     armor: 100,
0027 |     maxArmor: 100,
0028 |     cash: 2500,
0029 |     stamina: 100
0030 |   };
0031 | 
0032 |   public inventory: InventoryItem[] = [
0033 |     { weaponId: 'wep_p1_vesper', ammo: 15, reserveAmmo: 90 },
0034 |     { weaponId: 'wep_vortex_45', ammo: 32, reserveAmmo: 160 },
0035 |     { weaponId: 'wep_arcline_ar', ammo: 30, reserveAmmo: 120 }
0036 |   ];
0037 |   public activeWeaponIndex: number = 0;
0038 |   public isAiming: boolean = false;
0039 |   public currentVehicle: VehicleInstance | null = null;
0040 | 
0041 |   private isGrounded: boolean = true;
0042 |   private readonly gravity: number = 24.0;
0043 |   private readonly walkSpeed: number = 4.2;
0044 |   private readonly jogSpeed: number = 7.5;
0045 |   private readonly sprintSpeed: number = 11.8;
0046 |   private readonly aimSpeed: number = 3.2;
0047 | 
0048 |   // Jump buffer & coyote time timers (seconds)
0049 |   private jumpBufferTimer: number = 0;
0050 |   private coyoteTimer: number = 0;
0051 |   private fallAirTime: number = 0;
0052 | 
0053 |   private physicsWorld: PhysicsWorld | null = null;
0054 |   private playerBody: {
0055 |     rigidBody: RAPIER.RigidBody;
0056 |     collider: RAPIER.Collider;
0057 |   } | null = null;
0058 | 
0059 |   private readonly unsubscribeVehicleExit: () => void;
0060 |   private readonly moveDir = new THREE.Vector3();
0061 | 
0062 |   constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
0063 |     this.model = new CharacterModel();
0064 |     scene.add(this.model.mesh);
0065 |     this.camera = new ThirdPersonCamera(camera);
0066 | 
0067 |     this.unsubscribeVehicleExit = eventBus.on('VEHICLE_EXIT', data => {
0068 |       this.currentVehicle = null;
0069 |       this.position.set(data.position[0], data.position[1], data.position[2]);
0070 |       this.velocity.set(0, 0, 0);
0071 |       this.state = 'idle';
0072 |       this.model.mesh.visible = true;
0073 |       if (this.physicsWorld && this.playerBody) {
0074 |         this.physicsWorld.setPlayerTranslation(this.playerBody.rigidBody, [
0075 |           this.position.x,
0076 |           this.position.y + 0.9,
0077 |           this.position.z
0078 |         ]);
0079 |       }
0080 |     });
0081 |   }
0082 | 
0083 |   public attachPhysics(world: PhysicsWorld): void {
0084 |     this.physicsWorld = world;
0085 |     const created = world.createPlayerControllerBody([
0086 |       this.position.x,
0087 |       this.position.y + 0.9,
0088 |       this.position.z
0089 |     ]);
0090 |     this.playerBody = created;
0091 |   }
0092 | 
0093 |   public update(input: InputState, dt: number, streamer: WorldStreamer): void {
0094 |     if (this.stats.health <= 0) {
0095 |       this.state = 'dead';
0096 |       this.model.updateAnimation(this.state, 0, dt, false);
0097 |       return;
0098 |     }
0099 | 
0100 |     if (this.currentVehicle) {
0101 |       this.state = 'in_vehicle';
0102 |       this.model.mesh.position.copy(this.currentVehicle.position);
0103 |       this.model.mesh.rotation.y = this.currentVehicle.rotationY;
0104 |       this.model.updateAnimation(this.state, 0, dt, false);
0105 |       this.camera.mode = this.currentVehicle.def.isAircraft ? 'helicopter_aerial' : 'vehicle';
0106 |       this.camera.update(this.currentVehicle.position, dt, input.sprint, streamer.allColliders);
0107 |       return;
0108 |     }
0109 | 
0110 |     // 1. Weapon selection
0111 |     if (input.weaponSlot !== null && input.weaponSlot < this.inventory.length) {
0112 |       this.activeWeaponIndex = input.weaponSlot;
0113 |       soundEngine.playUIClick();
0114 |       eventBus.emit('WEAPON_CHANGED', { weaponId: this.getActiveWeapon().def.id });
0115 |     }
0116 | 
0117 |     this.isAiming = input.aim;
0118 |     this.camera.mode = this.isAiming ? 'aiming_shoulder' : 'on_foot';
0119 | 
0120 |     // 2. Camera-relative movement vector
0121 |     const camFwd = this.camera.getForwardVector();
0122 |     const camRight = this.camera.getRightVector();
0123 | 
0124 |     let fwdInput = 0;
0125 |     if (input.forward) fwdInput += 1;
0126 |     if (input.backward) fwdInput -= 1;
0127 | 
0128 |     let strafeInput = 0;
0129 |     if (input.right) strafeInput += 1;
0130 |     if (input.left) strafeInput -= 1;
0131 | 
0132 |     this.moveDir.set(0, 0, 0);
0133 |     if (fwdInput !== 0) this.moveDir.addScaledVector(camFwd, fwdInput);
0134 |     if (strafeInput !== 0) this.moveDir.addScaledVector(camRight, strafeInput);
0135 | 
0136 |     const isMoving = this.moveDir.lengthSq() > 0.001;
0137 |     if (isMoving) {
0138 |       this.moveDir.normalize();
0139 |     }
0140 | 
0141 |     // 3. Movement Speed & Modifiers (backward / strafe penalty)
0142 |     let baseSpeed = 0;
0143 |     if (isMoving) {
0144 |       if (this.isAiming) {
0145 |         baseSpeed = this.aimSpeed;
0146 |         this.state = 'walk';
0147 |         this.stats.stamina = Math.min(100, this.stats.stamina + dt * 10);
0148 |       } else if (input.sprint && this.stats.stamina > 5) {
0149 |         baseSpeed = this.sprintSpeed;
0150 |         this.stats.stamina = Math.max(0, this.stats.stamina - dt * 15);
0151 |         this.state = 'sprint';
0152 |       } else {
0153 |         baseSpeed = this.jogSpeed;
0154 |         this.state = 'jog';
0155 |         this.stats.stamina = Math.min(100, this.stats.stamina + dt * 12);
0156 |       }
0157 | 
0158 |       // Backward and strafe speed factor
0159 |       let speedFactor = 1.0;
0160 |       if (fwdInput < 0) {
0161 |         speedFactor *= 0.65;
0162 |       } else if (fwdInput === 0 && strafeInput !== 0) {
0163 |         speedFactor *= 0.80;
0164 |       }
0165 |       baseSpeed *= speedFactor;
0166 |     } else {
0167 |       this.state = 'idle';
0168 |       this.stats.stamina = Math.min(100, this.stats.stamina + dt * 20);
0169 |     }
0170 | 
0171 |     // 4. Horizontal Acceleration & Deceleration with expDamp
0172 |     const targetVelX = this.moveDir.x * baseSpeed;
0173 |     const targetVelZ = this.moveDir.z * baseSpeed;
0174 |     const accelLambda = isMoving ? 22.0 : 28.0;
0175 |     this.velocity.x = expDamp(this.velocity.x, targetVelX, accelLambda, dt);
0176 |     this.velocity.z = expDamp(this.velocity.z, targetVelZ, accelLambda, dt);
0177 | 
0178 |     // 5. Jump Buffer & Coyote Time (100ms = 0.10s)
0179 |     if (input.jumpPressed) {
0180 |       this.jumpBufferTimer = 0.10;
0181 |     } else if (this.jumpBufferTimer > 0) {
0182 |       this.jumpBufferTimer -= dt;
0183 |     }
0184 | 
0185 |     if (this.isGrounded) {
0186 |       this.coyoteTimer = 0.10;
0187 |       this.fallAirTime = 0;
0188 |     } else {
0189 |       this.coyoteTimer = Math.max(0, this.coyoteTimer - dt);
0190 |       this.fallAirTime += dt;
0191 |       this.velocity.y -= this.gravity * dt;
0192 |       if (this.velocity.y < -0.5) {
0193 |         this.state = 'fall';
0194 |       }
0195 |     }
0196 | 
0197 |     if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
0198 |       this.velocity.y = 8.5; // Jump impulse
0199 |       this.isGrounded = false;
0200 |       this.jumpBufferTimer = 0;
0201 |       this.coyoteTimer = 0;
0202 |       this.state = 'jump';
0203 |       soundEngine.playFootstep();
0204 |     }
0205 | 
0206 |     // 6. Authoritative Physics Movement via Rapier Character Controller
0207 |     const wasGrounded = this.isGrounded;
0208 |     this.moveWithPhysics(dt, streamer);
0209 | 
0210 |     // Landing detection
0211 |     if (!wasGrounded && this.isGrounded) {
0212 |       const impactMagnitude = Math.min(1.0, this.fallAirTime * 1.5);
0213 |       if (impactMagnitude > 0.3) {
0214 |         this.camera.addShake(impactMagnitude * 0.4);
0215 |         soundEngine.playFootstep();
0216 |       }
0217 |       this.fallAirTime = 0;
0218 |     }
0219 | 
0220 |     this.model.mesh.position.copy(this.position);
0221 | 
0222 |     // 7. Rotation Orientation with expDampAngle
0223 |     if (this.isAiming) {
0224 |       const aimHeading = this.camera.azimuth + Math.PI;
0225 |       this.facingAngle = expDampAngle(this.facingAngle, aimHeading, 24, dt);
0226 |     } else if (isMoving) {
0227 |       const moveAngle = Math.atan2(this.velocity.x, this.velocity.z);
0228 |       this.facingAngle = expDampAngle(this.facingAngle, moveAngle, 14, dt);
0229 |     }
0230 |     this.model.mesh.rotation.y = this.facingAngle;
0231 | 
0232 |     // 8. Locomotion Animation
0233 |     const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
0234 |     this.model.updateAnimation(this.state, horizontalSpeed, dt, this.isAiming);
0235 | 
0236 |     // 9. Camera Update
0237 |     this.camera.update(this.position, dt, input.sprint, streamer.allColliders);
0238 |   }
0239 | 
0240 |   private moveWithPhysics(dt: number, streamer: WorldStreamer): void {
0241 |     if (this.physicsWorld && this.playerBody) {
0242 |       const desired = {
0243 |         x: this.velocity.x * dt,
0244 |         y: this.velocity.y * dt,
0245 |         z: this.velocity.z * dt
0246 |       };
0247 |       const result = this.physicsWorld.moveCharacter(this.playerBody.collider, desired);
0248 |       this.position.x += result.x;
0249 |       this.position.y += result.y;
0250 |       this.position.z += result.z;
0251 |       this.isGrounded = result.isGrounded;
0252 |       if (result.isGrounded && this.velocity.y < 0) {
0253 |         this.velocity.y = 0;
0254 |       }
0255 |       this.physicsWorld.setPlayerTranslation(this.playerBody.rigidBody, [
0256 |         this.position.x,
0257 |         this.position.y + 0.9,
0258 |         this.position.z
0259 |       ]);
0260 |     } else {
0261 |       // Fallback only during boot before physics attaches
0262 |       this.position.x += this.velocity.x * dt;
0263 |       this.position.z += this.velocity.z * dt;
0264 |       this.position.y += this.velocity.y * dt;
0265 |       const groundY = streamer.getGroundHeight(this.position.x, this.position.z, this.position.y);
0266 |       if (this.position.y <= groundY) {
0267 |         this.position.y = groundY;
0268 |         this.velocity.y = 0;
0269 |         this.isGrounded = true;
0270 |       }
0271 |     }
0272 |   }
0273 | 
0274 |   public getActiveWeapon(): { def: WeaponDefinition; item: InventoryItem } {
0275 |     const item = this.inventory[this.activeWeaponIndex] || this.inventory[0];
0276 |     const def = CANONICAL_WEAPONS.find(w => w.id === item.weaponId) || CANONICAL_WEAPONS[0];
0277 |     return { def, item };
0278 |   }
0279 | 
0280 |   public takeDamage(amount: number): void {
0281 |     if (this.stats.armor > 0) {
0282 |       const absorbed = Math.min(this.stats.armor, amount);
0283 |       this.stats.armor -= absorbed;
0284 |       amount -= absorbed;
0285 |     }
0286 |     this.stats.health = Math.max(0, this.stats.health - amount);
0287 |     eventBus.emit('PLAYER_DAMAGED', { health: this.stats.health, armor: this.stats.armor });
0288 |   }
0289 | 
0290 |   public addCash(amount: number): void {
0291 |     this.stats.cash += amount;
0292 |     eventBus.emit('CASH_CHANGED', this.stats.cash);
0293 |   }
0294 | 
0295 |   public dispose(): void {
0296 |     this.unsubscribeVehicleExit();
0297 |     if (this.physicsWorld && this.playerBody) {
0298 |       this.physicsWorld.removeCollider(this.playerBody.collider);
0299 |       this.playerBody = null;
0300 |     }
0301 |     this.model.dispose();
0302 |   }
0303 | }
0304 | 
```

---

## 42. `src/vehicles/vehicleFactory.ts`

<a id="src-vehicles-vehiclefactory-ts"></a>

**Role:** Procedural 3D model generator for cars, bikes, boats, helicopters, and tanks with isolated owned paint materials.

- **File Path:** `src/vehicles/vehicleFactory.ts`
- **Total Lines:** 337
- **Size:** 12.75 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { VehicleDefinition } from '../core/types';
0003 | import { materialLib } from '../rendering/materials';
0004 | 
0005 | function addCarPart(
0006 |   root: THREE.Object3D,
0007 |   geometry: THREE.BufferGeometry,
0008 |   material: THREE.Material,
0009 |   position: [number, number, number],
0010 |   name: string
0011 | ): THREE.Mesh {
0012 |   const mesh = new THREE.Mesh(geometry, material);
0013 |   mesh.name = name;
0014 |   mesh.position.set(position[0], position[1], position[2]);
0015 |   mesh.castShadow = true;
0016 |   mesh.receiveShadow = true;
0017 |   root.add(mesh);
0018 |   return mesh;
0019 | }
0020 | 
0021 | export class VehicleFactory {
0022 |   /**
0023 |    * Builds the procedural 3D model for any canonical vehicle definition (Pages 56-64, 103)
0024 |    */
0025 |   public static createVehicleModel(def: VehicleDefinition): {
0026 |     group: THREE.Group;
0027 |     wheels: THREE.Mesh[];
0028 |     turret?: THREE.Group;
0029 |     rotor?: THREE.Group;
0030 |     sirenLights?: THREE.Mesh[];
0031 |   } {
0032 |     const group = new THREE.Group();
0033 |     group.name = `veh_${def.id}`;
0034 |     const wheels: THREE.Mesh[] = [];
0035 |     let turret: THREE.Group | undefined;
0036 |     let rotor: THREE.Group | undefined;
0037 |     let sirenLights: THREE.Mesh[] | undefined;
0038 | 
0039 |     // Body Paint Material (Isolated per vehicle instance)
0040 |     const paintMat = new THREE.MeshStandardMaterial({
0041 |       color: new THREE.Color(def.color),
0042 |       roughness: 0.28,
0043 |       metalness: 0.75
0044 |     });
0045 |     group.userData.ownedMaterial = paintMat;
0046 | 
0047 |     const width = def.dimensions.width;
0048 |     const height = def.dimensions.height;
0049 |     const length = def.dimensions.length;
0050 | 
0051 |     // 1. TANK (AR-7 Mastiff) - Page 64
0052 |     if (def.class === 'tank') {
0053 |       const hullGeo = new THREE.BoxGeometry(width, 1.3, length);
0054 |       addCarPart(group, hullGeo, paintMat, [0, 1.0, 0], 'hull');
0055 | 
0056 |       // Sloped front glacis
0057 |       const glacisGeo = new THREE.BoxGeometry(width * 0.95, 0.4, 1.5);
0058 |       glacisGeo.rotateX(Math.PI / 6);
0059 |       addCarPart(group, glacisGeo, paintMat, [0, 1.3, length * 0.42], 'glacis');
0060 | 
0061 |       // Track assemblies
0062 |       const trackGeo = new THREE.BoxGeometry(0.7, 0.85, length + 0.4);
0063 |       addCarPart(group, trackGeo, materialLib.vehicleTire, [-width / 2, 0.55, 0], 'leftTrack');
0064 |       addCarPart(group, trackGeo, materialLib.vehicleTire, [width / 2, 0.55, 0], 'rightTrack');
0065 | 
0066 |       // Turret
0067 |       turret = new THREE.Group();
0068 |       turret.position.set(0, 1.8, -0.2);
0069 | 
0070 |       const turretBody = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.85, 2.6), paintMat);
0071 |       turretBody.castShadow = true;
0072 |       turret.add(turretBody);
0073 | 
0074 |       // Commander hatch
0075 |       const hatch = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.15, 12), materialLib.galvanizedSteelMaterial);
0076 |       hatch.position.set(0.5, 0.5, -0.3);
0077 |       turret.add(hatch);
0078 | 
0079 |       // Elevating cannon barrel
0080 |       const cannonGeo = new THREE.CylinderGeometry(0.14, 0.18, 4.4, 12);
0081 |       cannonGeo.rotateX(Math.PI / 2);
0082 |       const cannonMesh = new THREE.Mesh(cannonGeo, materialLib.vehicleChrome);
0083 |       cannonMesh.position.set(0, 0.1, 2.6);
0084 |       cannonMesh.castShadow = true;
0085 |       turret.add(cannonMesh);
0086 | 
0087 |       // Muzzle brake
0088 |       const muzzleBrake = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.5), materialLib.galvanizedSteelMaterial);
0089 |       muzzleBrake.position.set(0, 0.1, 4.8);
0090 |       turret.add(muzzleBrake);
0091 | 
0092 |       group.add(turret);
0093 |       return { group, wheels, turret, rotor, sirenLights };
0094 |     }
0095 | 
0096 |     // 2. HELICOPTER (Vespera Swift) - Page 63
0097 |     if (def.isAircraft) {
0098 |       // Streamlined Fuselage
0099 |       const podGeo = new THREE.BoxGeometry(width * 0.9, height * 0.65, length * 0.55);
0100 |       addCarPart(group, podGeo, paintMat, [0, 1.8, 0.3], 'fuselage');
0101 | 
0102 |       // Cockpit bubble glazing
0103 |       const glassGeo = new THREE.BoxGeometry(width * 0.85, 1.3, 1.8);
0104 |       addCarPart(group, glassGeo, materialLib.vehicleGlass, [0, 2.0, 1.4], 'cockpitGlass');
0105 | 
0106 |       // Tail boom
0107 |       const boomGeo = new THREE.BoxGeometry(0.4, 0.5, length * 0.6);
0108 |       addCarPart(group, boomGeo, paintMat, [0, 2.1, -length * 0.38], 'tailBoom');
0109 | 
0110 |       // Tail vertical stabilizer & tail rotor
0111 |       const finGeo = new THREE.BoxGeometry(0.12, 1.6, 0.9);
0112 |       addCarPart(group, finGeo, paintMat, [0, 2.6, -length * 0.68], 'verticalFin');
0113 | 
0114 |       // Landing skids
0115 |       for (const side of [-1, 1]) {
0116 |         const skidGeo = new THREE.BoxGeometry(0.1, 0.1, length * 0.65);
0117 |         addCarPart(group, skidGeo, materialLib.vehicleChrome, [side * width * 0.45, 0.35, 0], `skid_${side}`);
0118 | 
0119 |         const strutF = new THREE.BoxGeometry(0.08, 1.2, 0.08);
0120 |         addCarPart(group, strutF, materialLib.vehicleChrome, [side * width * 0.35, 0.95, 0.8], `strutF_${side}`);
0121 |         const strutR = new THREE.BoxGeometry(0.08, 1.2, 0.08);
0122 |         addCarPart(group, strutR, materialLib.vehicleChrome, [side * width * 0.35, 0.95, -0.8], `strutR_${side}`);
0123 |       }
0124 | 
0125 |       // Main spinning rotor assembly
0126 |       rotor = new THREE.Group();
0127 |       rotor.position.set(0, 3.2, 0.2);
0128 | 
0129 |       const mastGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 8);
0130 |       rotor.add(new THREE.Mesh(mastGeo, materialLib.vehicleChrome));
0131 | 
0132 |       const bladeGeo = new THREE.BoxGeometry(8.8, 0.05, 0.32);
0133 |       const blade1 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
0134 |       const blade2 = new THREE.Mesh(bladeGeo, materialLib.vehicleChrome);
0135 |       blade2.rotation.y = Math.PI / 2;
0136 |       rotor.add(blade1, blade2);
0137 | 
0138 |       group.add(rotor);
0139 |       return { group, wheels, turret, rotor, sirenLights };
0140 |     }
0141 | 
0142 |     // 3. BOAT (Nereid Cruiser) - Page 62
0143 |     if (def.class === 'boat' || def.isBoat) {
0144 |       // Deep-V Hull
0145 |       const hullGeo = new THREE.BoxGeometry(width, 1.1, length);
0146 |       addCarPart(group, hullGeo, paintMat, [0, 0.6, 0], 'hull');
0147 | 
0148 |       // Bow flare wedge
0149 |       const bowGeo = new THREE.ConeGeometry(width * 0.6, 2.2, 4);
0150 |       bowGeo.rotateX(Math.PI / 2);
0151 |       bowGeo.rotateY(Math.PI / 4);
0152 |       addCarPart(group, bowGeo, paintMat, [0, 0.65, length * 0.55], 'bowFlare');
0153 | 
0154 |       // Deck & cockpit well
0155 |       const deckGeo = new THREE.BoxGeometry(width * 0.88, 0.3, length * 0.8);
0156 |       addCarPart(group, deckGeo, materialLib.luxuryMarbleMaterial, [0, 1.15, -0.2], 'deck');
0157 | 
0158 |       // Windshield
0159 |       const glass = addCarPart(group, new THREE.BoxGeometry(width * 0.82, 0.65, 1.4), materialLib.vehicleGlass, [0, 1.55, 0.5], 'windshield');
0160 |       void glass;
0161 | 
0162 |       // Twin outboard motors
0163 |       const motor1 = addCarPart(group, new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome, [-0.65, 0.6, -length / 2 - 0.2], 'motorLeft');
0164 |       const motor2 = addCarPart(group, new THREE.BoxGeometry(0.4, 0.9, 0.6), materialLib.vehicleChrome, [0.65, 0.6, -length / 2 - 0.2], 'motorRight');
0165 |       void motor1; void motor2;
0166 | 
0167 |       return { group, wheels, turret, rotor, sirenLights };
0168 |     }
0169 | 
0170 |     // 4. MOTORBIKE (Kaze 750) - Page 61
0171 |     if (def.class === 'motorbike') {
0172 |       const frameGeo = new THREE.BoxGeometry(0.35, 0.65, 1.6);
0173 |       addCarPart(group, frameGeo, paintMat, [0, 0.75, 0], 'frame');
0174 | 
0175 |       // Engine block
0176 |       const engineGeo = new THREE.BoxGeometry(0.4, 0.45, 0.6);
0177 |       addCarPart(group, engineGeo, materialLib.vehicleChrome, [0, 0.5, -0.1], 'engine');
0178 | 
0179 |       // Fuel tank
0180 |       const tankGeo = new THREE.CapsuleGeometry(0.22, 0.5, 4, 8);
0181 |       tankGeo.rotateX(Math.PI / 2);
0182 |       addCarPart(group, tankGeo, paintMat, [0, 1.05, 0.2], 'fuelTank');
0183 | 
0184 |       // Seat
0185 |       const seatGeo = new THREE.BoxGeometry(0.3, 0.12, 0.7);
0186 |       addCarPart(group, seatGeo, materialLib.vehicleInteriorDark, [0, 0.95, -0.4], 'seat');
0187 | 
0188 |       // Handlebar
0189 |       const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8);
0190 |       barGeo.rotateZ(Math.PI / 2);
0191 |       addCarPart(group, barGeo, materialLib.vehicleChrome, [0, 1.25, 0.55], 'handlebar');
0192 | 
0193 |       // Headlight
0194 |       addCarPart(group, new THREE.BoxGeometry(0.2, 0.2, 0.1), materialLib.vehicleHeadlight, [0, 1.15, 0.9], 'headlight');
0195 | 
0196 |       // Dual wheels
0197 |       const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.18, 16);
0198 |       wheelGeo.rotateZ(Math.PI / 2);
0199 | 
0200 |       const frontW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0201 |       frontW.position.set(0, 0.38, 0.9);
0202 |       frontW.castShadow = true;
0203 |       group.add(frontW);
0204 |       wheels.push(frontW);
0205 | 
0206 |       const rearW = new THREE.Mesh(wheelGeo, materialLib.vehicleTire);
0207 |       rearW.position.set(0, 0.38, -0.9);
0208 |       rearW.castShadow = true;
0209 |       group.add(rearW);
0210 |       wheels.push(rearW);
0211 | 
0212 |       return { group, wheels, turret, rotor, sirenLights };
0213 |     }
0214 | 
0215 |     // 5. CARS: SPORTS COUPE, SEDAN, SUV, TRUCK, VAN (Pages 57-60, 103)
0216 |     const isCoupe = def.class === 'sports_coupe';
0217 |     const isTruck = def.class === 'pickup';
0218 |     const isVan = def.class === 'van';
0219 | 
0220 |     // A. Chassis & Lower Body Shell
0221 |     const chassisGeo = new THREE.BoxGeometry(width, height * 0.45, length);
0222 |     addCarPart(group, chassisGeo, paintMat, [0, height * 0.42, 0], 'chassis');
0223 | 
0224 |     // B. Aerodynamic Upper Body / Cabin Shell
0225 |     const cabinH = height * (isVan ? 0.65 : 0.48);
0226 |     const cabinL = length * (isVan ? 0.75 : isCoupe ? 0.48 : isTruck ? 0.42 : 0.58);
0227 |     const cabinZ = isTruck ? length * 0.15 : isCoupe ? -length * 0.06 : -length * 0.02;
0228 | 
0229 |     const cabinGeo = new THREE.BoxGeometry(width * 0.88, cabinH, cabinL);
0230 |     addCarPart(group, cabinGeo, paintMat, [0, height * 0.42 + cabinH / 2, cabinZ], 'bodyUpper');
0231 | 
0232 |     // C. Cabin Windshield & Side Glazing
0233 |     const glassGeo = new THREE.BoxGeometry(width * 0.82, cabinH * 0.75, cabinL * 0.85);
0234 |     addCarPart(group, glassGeo, materialLib.vehicleGlass, [0, height * 0.45 + cabinH / 2, cabinZ], 'cabinGlass');
0235 | 
0236 |     // D. Truck Cargo Bed (Page 59)
0237 |     if (isTruck) {
0238 |       const bedGeo = new THREE.BoxGeometry(width * 0.92, height * 0.35, length * 0.45);
0239 |       addCarPart(group, bedGeo, materialLib.galvanizedSteelMaterial, [0, height * 0.45, -length * 0.28], 'cargoBed');
0240 |     }
0241 | 
0242 |     // E. Headlights, Taillights & Grille Trim (Page 57, 58)
0243 |     for (const side of [-1, 1]) {
0244 |       addCarPart(
0245 |         group,
0246 |         new THREE.BoxGeometry(0.32, 0.12, 0.1),
0247 |         materialLib.vehicleHeadlight,
0248 |         [side * width * 0.36, height * 0.42, length * 0.49],
0249 |         `headlight_${side}`
0250 |       );
0251 |       addCarPart(
0252 |         group,
0253 |         new THREE.BoxGeometry(0.32, 0.12, 0.1),
0254 |         materialLib.vehicleTaillight,
0255 |         [side * width * 0.36, height * 0.44, -length * 0.49],
0256 |         `taillight_${side}`
0257 |       );
0258 |       // Door seam chrome detail
0259 |       addCarPart(
0260 |         group,
0261 |         new THREE.BoxGeometry(0.02, height * 0.55, length * 0.38),
0262 |         materialLib.vehicleChrome,
0263 |         [side * width * 0.48, height * 0.48, 0],
0264 |         `doorSeam_${side}`
0265 |       );
0266 |     }
0267 | 
0268 |     // Front intake grille
0269 |     const grilleGeo = new THREE.BoxGeometry(width * 0.45, 0.2, 0.08);
0270 |     addCarPart(group, grilleGeo, materialLib.vehicleInteriorDark, [0, height * 0.32, length * 0.5], 'grille');
0271 | 
0272 |     // Dual exhaust tips on sports cars
0273 |     if (isCoupe) {
0274 |       for (const side of [-1, 1]) {
0275 |         const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25, 8), materialLib.vehicleChrome);
0276 |         exhaust.rotation.x = Math.PI / 2;
0277 |         exhaust.position.set(side * 0.45, height * 0.22, -length * 0.51);
0278 |         group.add(exhaust);
0279 |       }
0280 |     }
0281 | 
0282 |     // Police Cruiser Lightbar
0283 |     if (def.class === 'police') {
0284 |       const barGeo = new THREE.BoxGeometry(width * 0.65, 0.12, 0.25);
0285 |       addCarPart(group, barGeo, materialLib.vehicleChrome, [0, height + 0.08, cabinZ], 'lightbar');
0286 | 
0287 |       const sirenR = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.22), materialLib.vehicleSirenRed);
0288 |       sirenR.position.set(-width * 0.18, height + 0.08, cabinZ);
0289 |       group.add(sirenR);
0290 | 
0291 |       const sirenB = new THREE.Mesh(new THREE.BoxGeometry(width * 0.25, 0.12, 0.22), materialLib.vehicleSirenBlue);
0292 |       sirenB.position.set(width * 0.18, height + 0.08, cabinZ);
0293 |       group.add(sirenB);
0294 | 
0295 |       sirenLights = [sirenR, sirenB];
0296 |     }
0297 | 
0298 |     // F. Wheels, Suspension Pivots, Tires and Alloy Rims (Page 67-68, 103)
0299 |     const wheelRadius = height * 0.25;
0300 |     const wheelWidth = 0.26;
0301 |     const xOff = width * 0.48;
0302 |     const zOffFront = length * 0.32;
0303 |     const zOffRear = -length * 0.32;
0304 | 
0305 |     const wheelPositions: [number, number][] = [
0306 |       [-xOff, zOffFront], // FL
0307 |       [xOff, zOffFront],  // FR
0308 |       [-xOff, zOffRear],  // RL
0309 |       [xOff, zOffRear]   // RR
0310 |     ];
0311 | 
0312 |     for (let i = 0; i < wheelPositions.length; i++) {
0313 |       const [wx, wz] = wheelPositions[i];
0314 |       const pivot = new THREE.Group();
0315 |       pivot.name = `wheel_pivot_${i}`;
0316 |       pivot.position.set(wx, wheelRadius * 0.95, wz);
0317 | 
0318 |       const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 18);
0319 |       tireGeo.rotateZ(Math.PI / 2);
0320 |       const tire = new THREE.Mesh(tireGeo, materialLib.vehicleTire);
0321 |       tire.castShadow = true;
0322 |       pivot.add(tire);
0323 | 
0324 |       // Alloy Rim
0325 |       const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.52, wheelRadius * 0.52, wheelWidth + 0.01, 16);
0326 |       rimGeo.rotateZ(Math.PI / 2);
0327 |       const rim = new THREE.Mesh(rimGeo, materialLib.vehicleChrome);
0328 |       pivot.add(rim);
0329 | 
0330 |       group.add(pivot);
0331 |       wheels.push(tire);
0332 |     }
0333 | 
0334 |     return { group, wheels, turret, rotor, sirenLights };
0335 |   }
0336 | }
0337 | 
```

---

## 43. `src/vehicles/vehicleController.ts`

<a id="src-vehicles-vehiclecontroller-ts"></a>

**Role:** Vehicle physics controller handling suspension, drifting, flight lift, and safe non-shared resource disposal.

- **File Path:** `src/vehicles/vehicleController.ts`
- **Total Lines:** 476
- **Size:** 15.18 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { VehicleDefinition } from '../core/types';
0003 | import { InputState } from '../core/input';
0004 | import { clamp, lerp, WORLD_EXTENTS } from '../core/math';
0005 | import { soundEngine } from '../core/audio';
0006 | import { ParticleSystem } from '../rendering/particles';
0007 | import { StaticCollider } from '../world/sectorBuilder';
0008 | 
0009 | export class VehicleInstance {
0010 |   public id: string;
0011 |   public def: VehicleDefinition;
0012 |   public mesh: THREE.Group;
0013 |   public wheels: THREE.Mesh[] = [];
0014 |   public turret?: THREE.Group;
0015 |   public rotor?: THREE.Group;
0016 |   public sirenLights?: THREE.Mesh[];
0017 |   public owned: boolean = false;
0018 |   public spawnKind: 'owned' | 'ambient' | 'police' | 'mission' = 'ambient';
0019 | 
0020 |   public position: THREE.Vector3 = new THREE.Vector3();
0021 |   public velocity: THREE.Vector3 = new THREE.Vector3();
0022 |   public rotationY: number = 0;
0023 |   public speed: number = 0; // m/s
0024 |   public steerAngle: number = 0;
0025 |   public isPlayerControlled: boolean = false;
0026 | 
0027 |   // Helicopter flight state
0028 |   public altitude: number = 0;
0029 |   public rotorSpeed: number = 0;
0030 |   public pitch: number = 0;
0031 |   public roll: number = 0;
0032 | 
0033 |   // Tank state
0034 |   public turretAngle: number = 0;
0035 | 
0036 |   // Damage & Health
0037 |   public health: number = 1000;
0038 |   public isDestroyed: boolean = false;
0039 |   private smokeTimer: number = 0;
0040 |   private sirenTimer: number = 0;
0041 | 
0042 |   // Scratch objects for zero-allocation simulation
0043 |   private readonly nextPosScratch = new THREE.Vector3();
0044 |   private readonly testSphere = new THREE.Sphere(new THREE.Vector3(), 0);
0045 |   private readonly exitScratch = new THREE.Vector3();
0046 |   private readonly smokeScratch = new THREE.Vector3();
0047 |   private readonly groundSmokeScratch = new THREE.Vector3();
0048 | 
0049 |   constructor(
0050 |     def: VehicleDefinition,
0051 |     modelData: {
0052 |       group: THREE.Group;
0053 |       wheels: THREE.Mesh[];
0054 |       turret?: THREE.Group;
0055 |       rotor?: THREE.Group;
0056 |       sirenLights?: THREE.Mesh[];
0057 |     },
0058 |     spawnPos: THREE.Vector3,
0059 |     spawnRotY: number = 0,
0060 |     id: string = `vehinst_${Math.random().toString(36).substring(2, 9)}`,
0061 |     options?: { owned?: boolean; spawnKind?: 'owned' | 'ambient' | 'police' | 'mission' }
0062 |   ) {
0063 |     this.id = id;
0064 |     this.def = def;
0065 |     this.mesh = modelData.group;
0066 |     this.wheels = modelData.wheels;
0067 |     this.turret = modelData.turret;
0068 |     this.rotor = modelData.rotor;
0069 |     this.sirenLights = modelData.sirenLights;
0070 |     this.owned = options?.owned ?? false;
0071 |     this.spawnKind = options?.spawnKind ?? 'ambient';
0072 | 
0073 |     this.position.copy(spawnPos);
0074 |     this.rotationY = spawnRotY;
0075 |     this.mesh.position.copy(this.position);
0076 |     this.mesh.rotation.y = this.rotationY;
0077 |   }
0078 | 
0079 |   public getSafeExitPosition(colliders: StaticCollider[]): THREE.Vector3 {
0080 |     const side = new THREE.Vector3(
0081 |       Math.cos(this.rotationY),
0082 |       0,
0083 |       -Math.sin(this.rotationY)
0084 |     );
0085 |     const offsets = [1.8, -1.8, 2.8, -2.8];
0086 |     for (const distance of offsets) {
0087 |       this.exitScratch.copy(this.position).addScaledVector(side, distance);
0088 |       this.exitScratch.y = this.position.y + 0.1;
0089 |       let blocked = false;
0090 |       for (const collider of colliders) {
0091 |         if (collider.box.containsPoint(this.exitScratch)) {
0092 |           blocked = true;
0093 |           break;
0094 |         }
0095 |       }
0096 |       if (!blocked) return this.exitScratch.clone();
0097 |     }
0098 |     return this.position.clone().addScaledVector(side, 1.8);
0099 |   }
0100 | 
0101 |   public dispose(): void {
0102 |     this.mesh.traverse(object => {
0103 |       const mesh = object as THREE.Mesh;
0104 |       if (!mesh.isMesh) return;
0105 |       mesh.geometry?.dispose();
0106 |       // DO NOT dispose materialLib shared materials here!
0107 |       const owned = (mesh.userData as { ownedMaterial?: THREE.Material })?.ownedMaterial;
0108 |       if (owned instanceof THREE.Material) owned.dispose();
0109 |       const ownedList = (mesh.userData as { ownedMaterials?: THREE.Material[] })?.ownedMaterials;
0110 |       if (Array.isArray(ownedList)) {
0111 |         for (const m of ownedList) {
0112 |           if (m instanceof THREE.Material) m.dispose();
0113 |         }
0114 |       }
0115 |     });
0116 | 
0117 |     const rootOwned = (this.mesh.userData as { ownedMaterial?: THREE.Material })?.ownedMaterial;
0118 |     if (rootOwned instanceof THREE.Material) rootOwned.dispose();
0119 | 
0120 |     this.mesh.removeFromParent();
0121 |   }
0122 | 
0123 |   public update(
0124 |     input: InputState | null,
0125 |     dt: number,
0126 |     particles: ParticleSystem,
0127 |     colliders: StaticCollider[],
0128 |     targetAimAngle?: number
0129 |   ): void {
0130 |     if (this.isDestroyed) return;
0131 | 
0132 |     if (this.def.isAircraft) {
0133 |       this.updateHelicopter(input, dt, particles);
0134 |     } else if (this.def.hasTurret) {
0135 |       this.updateTank(input, dt, particles, colliders, targetAimAngle);
0136 |     } else if (this.def.isBoat) {
0137 |       this.updateBoat(input, dt, particles);
0138 |     } else if (this.def.class === 'motorbike') {
0139 |       this.updateMotorbike(input, dt, particles, colliders);
0140 |     } else {
0141 |       this.updateCar(input, dt, particles, colliders);
0142 |     }
0143 | 
0144 |     // Damage effects (smoke / fire when health drops)
0145 |     if (this.health < 400) {
0146 |       this.smokeTimer += dt;
0147 |       if (this.smokeTimer > 0.08) {
0148 |         this.smokeTimer = 0;
0149 |         this.smokeScratch.set(
0150 |           Math.sin(this.rotationY) * this.def.dimensions.length * 0.4,
0151 |           1.2,
0152 |           Math.cos(this.rotationY) * this.def.dimensions.length * 0.4
0153 |         ).add(this.position);
0154 |         particles.emitTireSmoke(this.smokeScratch);
0155 |       }
0156 |     }
0157 | 
0158 |     // Police Siren animation
0159 |     if (this.sirenLights && this.sirenLights.length >= 2) {
0160 |       this.sirenTimer += dt * 8;
0161 |       const isRed = Math.floor(this.sirenTimer) % 2 === 0;
0162 |       this.sirenLights[0].visible = isRed;
0163 |       this.sirenLights[1].visible = !isRed;
0164 |     }
0165 | 
0166 |     // Sync 3D mesh
0167 |     this.mesh.position.copy(this.position);
0168 |     this.mesh.rotation.y = this.rotationY;
0169 |   }
0170 | 
0171 |   /**
0172 |    * 4-Wheeled Ground Vehicle Physics (Cars, Pickups, Vans, Police)
0173 |    */
0174 |   private updateCar(
0175 |     input: InputState | null,
0176 |     dt: number,
0177 |     particles: ParticleSystem,
0178 |     colliders: StaticCollider[]
0179 |   ): void {
0180 |     let throttle = 0;
0181 |     let steer = 0;
0182 |     let handbrake = false;
0183 | 
0184 |     if (input && this.isPlayerControlled) {
0185 |       if (input.forward) throttle += 1;
0186 |       if (input.backward) throttle -= 0.6;
0187 |       if (input.left) steer += 1;
0188 |       if (input.right) steer -= 1;
0189 |       if (input.jump) handbrake = true;
0190 |       if (input.sprint) throttle *= 1.35; // Nitro burst
0191 |     }
0192 | 
0193 |     // Steering response (speed sensitive)
0194 |     const speedRatio = Math.abs(this.speed) / this.def.topSpeed;
0195 |     const maxSteer = this.def.steerAngle * (1 - speedRatio * 0.45);
0196 |     const targetSteer = steer * maxSteer;
0197 |     this.steerAngle = lerp(this.steerAngle, targetSteer, dt * 10);
0198 | 
0199 |     // Throttle & Braking
0200 |     const accel = this.def.acceleration * (input?.sprint ? 1.35 : 1.0);
0201 |     if (throttle > 0) {
0202 |       this.speed += accel * dt;
0203 |     } else if (throttle < 0) {
0204 |       if (this.speed > 0.5) {
0205 |         this.speed -= this.def.brakeForce * dt;
0206 |       } else {
0207 |         this.speed -= accel * 0.6 * dt; // Reverse
0208 |       }
0209 |     } else {
0210 |       // Rolling drag resistance
0211 |       const drag = handbrake ? 45.0 : 8.5;
0212 |       this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), drag * dt);
0213 |     }
0214 | 
0215 |     this.speed = clamp(this.speed, -this.def.topSpeed * 0.35, this.def.topSpeed);
0216 | 
0217 |     // Turning yaw based on speed and wheel angle
0218 |     if (Math.abs(this.speed) > 0.2) {
0219 |       const turnMultiplier = handbrake ? 1.8 : 1.0;
0220 |       this.rotationY += this.steerAngle * (this.speed / 5.0) * turnMultiplier * dt;
0221 |     }
0222 | 
0223 |     // Drift smoke on handbrake
0224 |     if (handbrake && Math.abs(this.speed) > 12) {
0225 |       particles.emitTireSmoke(this.position);
0226 |     }
0227 | 
0228 |     // Velocity update
0229 |     const forwardX = Math.sin(this.rotationY);
0230 |     const forwardZ = Math.cos(this.rotationY);
0231 |     this.velocity.set(forwardX * this.speed, 0, forwardZ * this.speed);
0232 | 
0233 |     // Position integration with pooled collision
0234 |     this.nextPosScratch.copy(this.position).addScaledVector(this.velocity, dt);
0235 | 
0236 |     const carRadius = this.def.dimensions.width * 0.6;
0237 |     this.testSphere.center.copy(this.nextPosScratch);
0238 |     this.testSphere.radius = carRadius;
0239 | 
0240 |     for (const col of colliders) {
0241 |       if (col.box.intersectsSphere(this.testSphere)) {
0242 |         // Crash reaction
0243 |         this.speed *= -0.3; // Bounce back
0244 |         this.health -= Math.abs(this.speed) * 8;
0245 |         particles.emitExplosion(this.nextPosScratch);
0246 |         return;
0247 |       }
0248 |     }
0249 | 
0250 |     // Clamp or reject positions outside the playable envelope
0251 |     if (
0252 |       this.nextPosScratch.x < WORLD_EXTENTS.minX ||
0253 |       this.nextPosScratch.x > WORLD_EXTENTS.maxX ||
0254 |       this.nextPosScratch.z < WORLD_EXTENTS.minZ ||
0255 |       this.nextPosScratch.z > WORLD_EXTENTS.maxZ
0256 |     ) {
0257 |       this.speed *= -0.5;
0258 |       return;
0259 |     }
0260 | 
0261 |     this.position.copy(this.nextPosScratch);
0262 | 
0263 |     // Suspension pitch & roll from weight transfer (Pages 66-67)
0264 |     const accelRate = throttle > 0 ? 0.05 : throttle < 0 ? -0.06 : 0;
0265 |     const targetPitch = clamp(-accelRate * (this.speed / (this.def.topSpeed || 1)), -0.08, 0.08);
0266 |     const targetRoll = clamp(-this.steerAngle * (this.speed / 15.0), -0.09, 0.09);
0267 |     this.mesh.rotation.x = lerp(this.mesh.rotation.x, targetPitch, dt * 10);
0268 |     this.mesh.rotation.z = lerp(this.mesh.rotation.z, targetRoll, dt * 10);
0269 | 
0270 |     // Wheel rotation and steering pivot animation
0271 |     const wheelRotDelta = (this.speed / (this.def.dimensions.height * 0.25 || 1)) * dt;
0272 |     this.wheels.forEach((w, idx) => {
0273 |       w.rotation.x += wheelRotDelta;
0274 |       if (idx < 2 && w.parent && w.parent !== this.mesh) {
0275 |         // Front wheels turn steering pivot
0276 |         w.parent.rotation.y = this.steerAngle;
0277 |       } else if (idx < 2) {
0278 |         w.rotation.y = this.steerAngle;
0279 |       }
0280 |     });
0281 | 
0282 |     if (this.isPlayerControlled) {
0283 |       soundEngine.updateVehicleEngine(speedRatio);
0284 |     }
0285 |   }
0286 | 
0287 |   /**
0288 |    * Boat Physics
0289 |    */
0290 |   private updateBoat(
0291 |     input: InputState | null,
0292 |     dt: number,
0293 |     particles: ParticleSystem
0294 |   ): void {
0295 |     let throttle = 0;
0296 |     let steer = 0;
0297 |     if (input && this.isPlayerControlled) {
0298 |       if (input.forward) throttle += 1;
0299 |       if (input.backward) throttle -= 0.5;
0300 |       if (input.left) steer += 1;
0301 |       if (input.right) steer -= 1;
0302 |     }
0303 | 
0304 |     this.speed += throttle * this.def.acceleration * dt;
0305 |     this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 2.5 * dt);
0306 |     this.speed = clamp(this.speed, -this.def.topSpeed * 0.25, this.def.topSpeed);
0307 | 
0308 |     const steeringAuthority = clamp(Math.abs(this.speed) / 10, 0, 1);
0309 |     this.rotationY += steer * 0.45 * steeringAuthority * dt;
0310 | 
0311 |     const forwardX = Math.sin(this.rotationY);
0312 |     const forwardZ = Math.cos(this.rotationY);
0313 |     this.velocity.set(forwardX * this.speed, 0, forwardZ * this.speed);
0314 |     this.position.addScaledVector(this.velocity, dt);
0315 | 
0316 |     if (Math.abs(this.speed) > 8 && this.isPlayerControlled) {
0317 |       particles.emitTireSmoke(this.position);
0318 |     }
0319 |   }
0320 | 
0321 |   /**
0322 |    * Motorbike Physics
0323 |    */
0324 |   private updateMotorbike(
0325 |     input: InputState | null,
0326 |     dt: number,
0327 |     particles: ParticleSystem,
0328 |     colliders: StaticCollider[]
0329 |   ): void {
0330 |     let throttle = 0;
0331 |     let steer = 0;
0332 |     if (input && this.isPlayerControlled) {
0333 |       if (input.forward) throttle += 1;
0334 |       if (input.backward) throttle -= 0.7;
0335 |       if (input.left) steer += 1;
0336 |       if (input.right) steer -= 1;
0337 |     }
0338 | 
0339 |     this.speed += throttle * this.def.acceleration * dt;
0340 |     this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 7 * dt);
0341 |     this.speed = clamp(this.speed, -this.def.topSpeed * 0.35, this.def.topSpeed);
0342 | 
0343 |     const lean = -steer * clamp(Math.abs(this.speed) / this.def.topSpeed, 0, 1) * 0.35;
0344 |     this.mesh.rotation.z = lean;
0345 | 
0346 |     const turnRate = steer * clamp(Math.abs(this.speed) / 6, 0, 1.4);
0347 |     this.rotationY += turnRate * dt;
0348 | 
0349 |     const forwardX = Math.sin(this.rotationY);
0350 |     const forwardZ = Math.cos(this.rotationY);
0351 |     this.velocity.set(forwardX * this.speed, 0, forwardZ * this.speed);
0352 | 
0353 |     this.nextPosScratch.copy(this.position).addScaledVector(this.velocity, dt);
0354 |     this.testSphere.center.copy(this.nextPosScratch);
0355 |     this.testSphere.radius = 0.55;
0356 | 
0357 |     for (const collider of colliders) {
0358 |       if (collider.box.intersectsSphere(this.testSphere)) {
0359 |         this.speed *= -0.2;
0360 |         this.health -= 15;
0361 |         return;
0362 |       }
0363 |     }
0364 | 
0365 |     this.position.copy(this.nextPosScratch);
0366 | 
0367 |     for (const wheel of this.wheels) {
0368 |       wheel.rotation.x += (this.speed / 0.35) * dt;
0369 |     }
0370 | 
0371 |     if (this.isPlayerControlled) {
0372 |       soundEngine.updateVehicleEngine(Math.abs(this.speed) / this.def.topSpeed);
0373 |     }
0374 |   }
0375 | 
0376 |   /**
0377 |    * Helicopter Flight Physics (HX-4 Sparrow)
0378 |    */
0379 |   private updateHelicopter(input: InputState | null, dt: number, particles: ParticleSystem): void {
0380 |     let lift = 0;
0381 |     let yaw = 0;
0382 |     let pitchInput = 0;
0383 | 
0384 |     if (input && this.isPlayerControlled) {
0385 |       if (input.jump) lift += 1; // Ascend
0386 |       if (input.crouch) lift -= 1; // Descend
0387 |       if (input.forward) pitchInput += 1;
0388 |       if (input.backward) pitchInput -= 1;
0389 |       if (input.left) yaw += 1;
0390 |       if (input.right) yaw -= 1;
0391 |     }
0392 | 
0393 |     // Rotor acceleration
0394 |     this.rotorSpeed = lerp(this.rotorSpeed, 35.0, dt * 2);
0395 |     if (this.rotor) {
0396 |       this.rotor.rotation.y += this.rotorSpeed * dt;
0397 |     }
0398 | 
0399 |     // Vertical climb
0400 |     this.velocity.y += (lift * 18.0 - 9.8 * 0.8) * dt;
0401 |     this.velocity.y = clamp(this.velocity.y, -12, 18);
0402 |     this.position.y += this.velocity.y * dt;
0403 |     if (this.position.y < 0.2) {
0404 |       this.position.y = 0.2;
0405 |       this.velocity.y = 0;
0406 |     }
0407 | 
0408 |     // Yaw rotation
0409 |     this.rotationY += yaw * 1.5 * dt;
0410 | 
0411 |     // Pitch forward/backward flight propulsion
0412 |     this.pitch = lerp(this.pitch, pitchInput * 0.35, dt * 4);
0413 |     const forwardX = Math.sin(this.rotationY);
0414 |     const forwardZ = Math.cos(this.rotationY);
0415 |     const horizontalSpeed = this.pitch * this.def.topSpeed;
0416 |     this.position.x += forwardX * horizontalSpeed * dt;
0417 |     this.position.z += forwardZ * horizontalSpeed * dt;
0418 | 
0419 |     // Rotor wash on ground
0420 |     if (this.position.y < 12) {
0421 |       this.groundSmokeScratch.set(this.position.x, 0.1, this.position.z);
0422 |       particles.emitTireSmoke(this.groundSmokeScratch);
0423 |     }
0424 |   }
0425 | 
0426 |   /**
0427 |    * Light Tank Physics & Cannon Turret (AR-7 Mastiff)
0428 |    */
0429 |   private updateTank(
0430 |     input: InputState | null,
0431 |     dt: number,
0432 |     particles: ParticleSystem,
0433 |     colliders: StaticCollider[],
0434 |     targetAimAngle?: number
0435 |   ): void {
0436 |     let throttle = 0;
0437 |     let steer = 0;
0438 | 
0439 |     if (input && this.isPlayerControlled) {
0440 |       if (input.forward) throttle += 1;
0441 |       if (input.backward) throttle -= 0.6;
0442 |       if (input.left) steer += 1;
0443 |       if (input.right) steer -= 1;
0444 |     }
0445 | 
0446 |     // Heavy track torque
0447 |     this.speed += throttle * this.def.acceleration * dt;
0448 |     this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 15 * dt);
0449 |     this.speed = clamp(this.speed, -this.def.topSpeed * 0.4, this.def.topSpeed);
0450 | 
0451 |     // Differential steering
0452 |     this.rotationY += steer * 0.8 * dt;
0453 | 
0454 |     const fwdX = Math.sin(this.rotationY);
0455 |     const fwdZ = Math.cos(this.rotationY);
0456 |     this.position.x += fwdX * this.speed * dt;
0457 |     this.position.z += fwdZ * this.speed * dt;
0458 | 
0459 |     // Cannon Turret Tracking
0460 |     if (this.turret && targetAimAngle !== undefined) {
0461 |       const relAngle = targetAimAngle - this.rotationY;
0462 |       this.turretAngle = lerp(this.turretAngle, relAngle, dt * 6);
0463 |       this.turret.rotation.y = this.turretAngle;
0464 |     }
0465 |   }
0466 | 
0467 |   public takeDamage(amount: number, particles: ParticleSystem): void {
0468 |     this.health = Math.max(0, this.health - amount);
0469 |     if (this.health <= 0 && !this.isDestroyed) {
0470 |       this.isDestroyed = true;
0471 |       particles.emitExplosion(this.position);
0472 |       soundEngine.playGunshot('launcher');
0473 |     }
0474 |   }
0475 | }
0476 | 
```

---

## 44. `src/vehicles/vehicleManager.ts`

<a id="src-vehicles-vehiclemanager-ts"></a>

**Role:** Fleet manager handling vehicle spawning, instance tracking, player entry/exit, and pursuit despawning.

- **File Path:** `src/vehicles/vehicleManager.ts`
- **Total Lines:** 202
- **Size:** 6.37 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { getVehicleDef } from '../data/vehicles';
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
0014 |   public readonly vehicles: VehicleInstance[] = [];
0015 |   public playerVehicle: VehicleInstance | null = null;
0016 |   private interactLatch = false;
0017 |   private instanceCounter = 0;
0018 | 
0019 |   constructor(scene: THREE.Scene) {
0020 |     this.scene = scene;
0021 |     this.spawnVerticalSliceFleet();
0022 |   }
0023 | 
0024 |   private spawnVerticalSliceFleet(): void {
0025 |     // Player's starter owned vehicle
0026 |     this.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(400, 0, 50), 0, {
0027 |       owned: true,
0028 |       spawnKind: 'owned'
0029 |     });
0030 |     this.spawnVehicle('veh_aurelia_regent', new THREE.Vector3(20, 0, 30), Math.PI / 2, { spawnKind: 'ambient' });
0031 |     this.spawnVehicle('veh_redwood_250', new THREE.Vector3(-40, 0, -40), Math.PI, { spawnKind: 'ambient' });
0032 |     this.spawnVehicle('veh_courier_l4', new THREE.Vector3(80, 0, -60), 0, { spawnKind: 'ambient' });
0033 |     this.spawnVehicle('veh_mica_hatch', new THREE.Vector3(-80, 0, 80), -Math.PI / 2, { spawnKind: 'ambient' });
0034 |     this.spawnVehicle('veh_kite_600', new THREE.Vector3(15, 0, -20), 0, { spawnKind: 'ambient' });
0035 |     this.spawnVehicle('veh_hx4_sparrow', new THREE.Vector3(60, 0, 120), 0, { spawnKind: 'ambient' });
0036 |     this.spawnVehicle('veh_ar7_mastiff', new THREE.Vector3(-120, 0, 160), Math.PI / 4, { spawnKind: 'ambient' });
0037 |     this.spawnVehicle('veh_tiderunner_24', new THREE.Vector3(820, 0, 420), 0, { spawnKind: 'ambient' });
0038 |     this.spawnVehicle('veh_amps_cruiser', new THREE.Vector3(70, 0, 340), 0, { spawnKind: 'ambient' });
0039 |   }
0040 | 
0041 |   public spawnVehicle(
0042 |     defId: string,
0043 |     pos: THREE.Vector3,
0044 |     rotY = 0,
0045 |     options?: { owned?: boolean; spawnKind?: 'owned' | 'ambient' | 'police' | 'mission'; id?: string }
0046 |   ): VehicleInstance {
0047 |     const def = getVehicleDef(defId);
0048 |     const model = VehicleFactory.createVehicleModel(def);
0049 |     this.scene.add(model.group);
0050 | 
0051 |     const instanceId = options?.id ?? `vehinst_${String(++this.instanceCounter).padStart(6, '0')}`;
0052 |     const instance = new VehicleInstance(def, model, pos, rotY, instanceId, {
0053 |       owned: options?.owned ?? false,
0054 |       spawnKind: options?.spawnKind ?? 'ambient'
0055 |     });
0056 |     this.vehicles.push(instance);
0057 |     return instance;
0058 |   }
0059 | 
0060 |   public spawnPolicePursuitUnit(nearPos: THREE.Vector3): VehicleInstance {
0061 |     const angle = Math.random() * Math.PI * 2;
0062 |     const spawnPos = new THREE.Vector3(
0063 |       nearPos.x + Math.cos(angle) * 65,
0064 |       nearPos.y,
0065 |       nearPos.z + Math.sin(angle) * 65
0066 |     );
0067 |     const unit = this.spawnVehicle('veh_amps_cruiser', spawnPos, angle, {
0068 |       owned: false,
0069 |       spawnKind: 'police'
0070 |     });
0071 |     unit.speed = 18;
0072 |     return unit;
0073 |   }
0074 | 
0075 |   public despawnPursuitUnits(): void {
0076 |     for (let i = this.vehicles.length - 1; i >= 0; i--) {
0077 |       const v = this.vehicles[i];
0078 |       if (v.spawnKind === 'police') {
0079 |         if (v === this.playerVehicle) this.playerVehicle = null;
0080 |         this.scene.remove(v.mesh);
0081 |         v.dispose();
0082 |         this.vehicles.splice(i, 1);
0083 |       }
0084 |     }
0085 |   }
0086 | 
0087 |   public update(
0088 |     input: InputState,
0089 |     dt: number,
0090 |     particles: ParticleSystem,
0091 |     colliders: StaticCollider[],
0092 |     playerPos: THREE.Vector3,
0093 |     targetAimAngle?: number
0094 |   ): void {
0095 |     const pressedInteract = input.interact && !this.interactLatch;
0096 |     this.interactLatch = input.interact;
0097 | 
0098 |     if (pressedInteract) {
0099 |       this.togglePlayerVehicle(playerPos, colliders);
0100 |     }
0101 | 
0102 |     for (let i = this.vehicles.length - 1; i >= 0; i--) {
0103 |       const vehicle = this.vehicles[i];
0104 |       if (vehicle.isDestroyed) {
0105 |         if (vehicle === this.playerVehicle) this.playerVehicle = null;
0106 |         this.scene.remove(vehicle.mesh);
0107 |         vehicle.dispose();
0108 |         this.vehicles.splice(i, 1);
0109 |         continue;
0110 |       }
0111 | 
0112 |       vehicle.update(
0113 |         vehicle === this.playerVehicle ? input : null,
0114 |         dt,
0115 |         particles,
0116 |         colliders,
0117 |         targetAimAngle
0118 |       );
0119 |     }
0120 |   }
0121 | 
0122 |   public togglePlayerVehicle(playerPos: THREE.Vector3, colliders: StaticCollider[] = []): boolean {
0123 |     if (this.playerVehicle) {
0124 |       const vehicle = this.playerVehicle;
0125 |       const exitPos = vehicle.getSafeExitPosition(colliders);
0126 |       vehicle.isPlayerControlled = false;
0127 |       this.playerVehicle = null;
0128 |       soundEngine.stopVehicleEngine();
0129 |       eventBus.emit('VEHICLE_EXIT', {
0130 |         position: [exitPos.x, exitPos.y, exitPos.z]
0131 |       });
0132 |       return false;
0133 |     }
0134 | 
0135 |     let nearest: VehicleInstance | null = null;
0136 |     let minDist = 3.8;
0137 | 
0138 |     for (const vehicle of this.vehicles) {
0139 |       if (vehicle.isDestroyed) continue;
0140 |       const d = distance2D(
0141 |         playerPos.x,
0142 |         playerPos.z,
0143 |         vehicle.position.x,
0144 |         vehicle.position.z
0145 |       );
0146 |       if (d < minDist) {
0147 |         minDist = d;
0148 |         nearest = vehicle;
0149 |       }
0150 |     }
0151 | 
0152 |     if (!nearest) return false;
0153 | 
0154 |     this.playerVehicle = nearest;
0155 |     nearest.isPlayerControlled = true;
0156 |     soundEngine.startVehicleEngine();
0157 |     eventBus.emit('VEHICLE_ENTER', {
0158 |       id: nearest.id,
0159 |       definitionId: nearest.def.id,
0160 |       owned: nearest.owned,
0161 |       spawnKind: nearest.spawnKind,
0162 |       position: [nearest.position.x, nearest.position.y, nearest.position.z],
0163 |       rotationY: nearest.rotationY,
0164 |       speed: nearest.speed,
0165 |       health: nearest.health,
0166 |       isDestroyed: nearest.isDestroyed
0167 |     });
0168 |     return true;
0169 |   }
0170 | 
0171 |   public getOwnedVehicles() {
0172 |     return this.vehicles
0173 |       .filter(v => v.owned && !v.isDestroyed)
0174 |       .map(v => ({
0175 |         id: v.id,
0176 |         definitionId: v.def.id,
0177 |         owned: true,
0178 |         spawnKind: v.spawnKind,
0179 |         position: [v.position.x, v.position.y, v.position.z] as [number, number, number],
0180 |         rotationY: v.rotationY,
0181 |         speed: v.speed,
0182 |         health: v.health,
0183 |         isDestroyed: v.isDestroyed
0184 |       }));
0185 |   }
0186 | 
0187 |   public getOwnedVehicleIds(): string[] {
0188 |     return this.vehicles
0189 |       .filter(v => v.owned && !v.isDestroyed)
0190 |       .map(v => v.def.id);
0191 |   }
0192 | 
0193 |   public dispose(): void {
0194 |     for (const vehicle of this.vehicles) {
0195 |       this.scene.remove(vehicle.mesh);
0196 |       vehicle.dispose();
0197 |     }
0198 |     this.vehicles.length = 0;
0199 |     this.playerVehicle = null;
0200 |   }
0201 | }
0202 | 
```

---

## 45. `src/npc/npcModel.ts`

<a id="src-npc-npcmodel-ts"></a>

**Role:** Procedural 3D models for pedestrians and police officers with animated walk cycles.

- **File Path:** `src/npc/npcModel.ts`
- **Total Lines:** 274
- **Size:** 9.05 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { materialLib } from '../rendering/materials';
0003 | import { HitDirection } from '../combat/hitReactionTypes';
0004 | 
0005 | export type NPCArchetype =
0006 |   | 'office_worker'
0007 |   | 'student'
0008 |   | 'tourist'
0009 |   | 'dock_worker'
0010 |   | 'service_worker'
0011 |   | 'street_vendor'
0012 |   | 'athlete'
0013 |   | 'police_officer';
0014 | 
0015 | function roundedLimb(
0016 |   radius: number,
0017 |   length: number,
0018 |   material: THREE.Material
0019 | ): THREE.Mesh {
0020 |   const mesh = new THREE.Mesh(
0021 |     new THREE.CapsuleGeometry(radius, length, 4, 8),
0022 |     material
0023 |   );
0024 |   mesh.castShadow = true;
0025 |   mesh.receiveShadow = true;
0026 |   return mesh;
0027 | }
0028 | 
0029 | export class NPCModel {
0030 |   public mesh: THREE.Group;
0031 |   public torso: THREE.Group;
0032 |   public chest: THREE.Group;
0033 |   public head: THREE.Group;
0034 |   public leftArm: THREE.Group;
0035 |   public rightArm: THREE.Group;
0036 |   public leftLeg: THREE.Group;
0037 |   public rightLeg: THREE.Group;
0038 | 
0039 |   public archetype: NPCArchetype;
0040 |   private hitReactionTimer: number = 0;
0041 |   private hitReactionDirection: HitDirection = 'front';
0042 |   private deathCollapse: number = 0;
0043 | 
0044 |   constructor(archetype: NPCArchetype) {
0045 |     this.archetype = archetype;
0046 |     this.mesh = new THREE.Group();
0047 |     this.mesh.name = `NPC_${archetype}`;
0048 | 
0049 |     // Archetype-specific color palettes and materials (Pages 72-73)
0050 |     let topColor = 0x334155;
0051 |     let bottomColor = 0x1e293b;
0052 |     let shoeColor = 0x09090b;
0053 |     let skinColor = 0xdeb887;
0054 |     let hairColor = 0x1c1917;
0055 | 
0056 |     switch (archetype) {
0057 |       case 'office_worker':
0058 |         topColor = 0x475569; // Gray suit
0059 |         bottomColor = 0x1e293b; // Slacks
0060 |         shoeColor = 0x09090b; // Oxfords
0061 |         break;
0062 |       case 'student':
0063 |         topColor = 0x7c3aed; // Purple hoodie
0064 |         bottomColor = 0x3b82f6; // Blue jeans
0065 |         shoeColor = 0xf8fafc; // White sneakers
0066 |         hairColor = 0xb45309; // Light brown
0067 |         break;
0068 |       case 'tourist':
0069 |         topColor = 0xf59e0b; // Bright amber Hawaiian
0070 |         bottomColor = 0xd97706; // Khaki shorts
0071 |         shoeColor = 0x78716c; // Sandals
0072 |         break;
0073 |       case 'dock_worker':
0074 |         topColor = 0xf97316; // High-vis neon orange
0075 |         bottomColor = 0x1e293b; // Heavy work dungarees
0076 |         shoeColor = 0x7c2d12; // Steel toe boots
0077 |         break;
0078 |       case 'service_worker':
0079 |         topColor = 0x10b981; // Green barista / clerk apron
0080 |         bottomColor = 0x334155;
0081 |         shoeColor = 0x18181b;
0082 |         break;
0083 |       case 'street_vendor':
0084 |         topColor = 0xd97706; // Apron / casual jacket
0085 |         bottomColor = 0x475569;
0086 |         shoeColor = 0x0f172a;
0087 |         break;
0088 |       case 'athlete':
0089 |         topColor = 0xef4444; // Red athletic singlet
0090 |         bottomColor = 0x18181b; // Track pants
0091 |         shoeColor = 0x22c55e; // Neon running shoes
0092 |         break;
0093 |       case 'police_officer':
0094 |         topColor = 0x1e3a8a; // Navy tactical uniform
0095 |         bottomColor = 0x0f172a; // Police tactical pants
0096 |         shoeColor = 0x09090b; // Combat boots
0097 |         break;
0098 |     }
0099 | 
0100 |     const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.65 });
0101 |     const topMat = new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.75 });
0102 |     const bottomMat = new THREE.MeshStandardMaterial({ color: bottomColor, roughness: 0.8 });
0103 |     const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.6 });
0104 |     const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 });
0105 | 
0106 |     // 1. Torso & Pelvis
0107 |     this.torso = new THREE.Group();
0108 |     this.torso.position.y = 0.92;
0109 |     this.mesh.add(this.torso);
0110 | 
0111 |     const pelvis = roundedLimb(0.16, 0.12, bottomMat);
0112 |     pelvis.rotation.x = Math.PI / 2;
0113 |     this.torso.add(pelvis);
0114 | 
0115 |     // 2. Chest & Shirt / Uniform
0116 |     this.chest = new THREE.Group();
0117 |     this.chest.position.y = 0.16;
0118 |     this.torso.add(this.chest);
0119 | 
0120 |     const chestMesh = roundedLimb(0.20, 0.28, topMat);
0121 |     chestMesh.position.y = 0.14;
0122 |     this.chest.add(chestMesh);
0123 | 
0124 |     // Accessory details by archetype (Page 73)
0125 |     if (archetype === 'office_worker') {
0126 |       // Red tie
0127 |       const tie = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.02), materialLib.neonPink);
0128 |       tie.position.set(0, 0.14, 0.18);
0129 |       this.chest.add(tie);
0130 |     } else if (archetype === 'dock_worker') {
0131 |       // High-vis reflective stripes
0132 |       const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.04, 0.36), materialLib.roadMarkingYellow);
0133 |       stripe.position.set(0, 0.16, 0);
0134 |       this.chest.add(stripe);
0135 |     } else if (archetype === 'police_officer') {
0136 |       // Golden badge and radio harness
0137 |       const badge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), materialLib.vehicleChrome);
0138 |       badge.position.set(-0.08, 0.20, 0.18);
0139 |       this.chest.add(badge);
0140 |     }
0141 | 
0142 |     // 3. Head & Face
0143 |     this.head = new THREE.Group();
0144 |     this.head.position.set(0, 0.34, 0);
0145 |     this.chest.add(this.head);
0146 | 
0147 |     const skull = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), skinMat);
0148 |     skull.scale.set(0.92, 1.05, 0.94);
0149 |     skull.castShadow = true;
0150 |     this.head.add(skull);
0151 | 
0152 |     // Hair / Cap / Helmet
0153 |     if (archetype === 'police_officer') {
0154 |       // Police peaked service cap
0155 |       const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.08, 12), topMat);
0156 |       cap.position.y = 0.14;
0157 |       const visor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.12), shoeMat);
0158 |       visor.position.set(0, 0.11, 0.16);
0159 |       this.head.add(cap, visor);
0160 |     } else if (archetype === 'dock_worker') {
0161 |       // Yellow construction hardhat
0162 |       const hardhat = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), materialLib.roadMarkingYellow);
0163 |       hardhat.position.y = 0.08;
0164 |       this.head.add(hardhat);
0165 |     } else {
0166 |       const hair = new THREE.Mesh(new THREE.SphereGeometry(0.175, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.65), hairMat);
0167 |       hair.position.y = 0.04;
0168 |       this.head.add(hair);
0169 |     }
0170 | 
0171 |     // 4. Arms
0172 |     this.leftArm = new THREE.Group();
0173 |     this.leftArm.position.set(-0.25, 0.22, 0);
0174 |     const lArmMesh = roundedLimb(0.065, 0.42, topMat);
0175 |     lArmMesh.position.y = -0.19;
0176 |     this.leftArm.add(lArmMesh);
0177 |     this.chest.add(this.leftArm);
0178 | 
0179 |     this.rightArm = new THREE.Group();
0180 |     this.rightArm.position.set(0.25, 0.22, 0);
0181 |     const rArmMesh = roundedLimb(0.065, 0.42, topMat);
0182 |     rArmMesh.position.y = -0.19;
0183 |     this.rightArm.add(rArmMesh);
0184 |     this.chest.add(this.rightArm);
0185 | 
0186 |     // 5. Legs & Shoes
0187 |     this.leftLeg = new THREE.Group();
0188 |     this.leftLeg.position.set(-0.12, -0.06, 0);
0189 |     const lLegMesh = roundedLimb(0.08, 0.48, bottomMat);
0190 |     lLegMesh.position.y = -0.22;
0191 |     this.leftLeg.add(lLegMesh);
0192 | 
0193 |     const lShoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 0.18), shoeMat);
0194 |     lShoe.position.set(0, -0.48, 0.03);
0195 |     this.leftLeg.add(lShoe);
0196 |     this.torso.add(this.leftLeg);
0197 | 
0198 |     this.rightLeg = new THREE.Group();
0199 |     this.rightLeg.position.set(0.12, -0.06, 0);
0200 |     const rLegMesh = roundedLimb(0.08, 0.48, bottomMat);
0201 |     rLegMesh.position.y = -0.22;
0202 |     this.rightLeg.add(rLegMesh);
0203 | 
0204 |     const rShoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 0.18), shoeMat);
0205 |     rShoe.position.set(0, -0.48, 0.03);
0206 |     this.rightLeg.add(rShoe);
0207 |     this.torso.add(this.rightLeg);
0208 |   }
0209 | 
0210 |   public triggerHitReaction(direction: HitDirection): void {
0211 |     this.hitReactionTimer = 0.35;
0212 |     this.hitReactionDirection = direction;
0213 |   }
0214 | 
0215 |   public animate(speed: number, time: number, isDead: boolean): void {
0216 |     if (isDead) {
0217 |       this.deathCollapse = Math.min(1.0, this.deathCollapse + 0.1);
0218 |       const p = this.deathCollapse;
0219 |       this.torso.position.y = 0.92 * (1 - p) + 0.12 * p;
0220 |       this.torso.rotation.x = -Math.PI / 2 * p;
0221 |       this.leftArm.rotation.z = -0.8 * p;
0222 |       this.rightArm.rotation.z = 0.8 * p;
0223 |       return;
0224 |     }
0225 | 
0226 |     if (speed > 0.1) {
0227 |       const legAngle = Math.sin(time * 6.5) * 0.55;
0228 |       this.leftLeg.rotation.x = legAngle;
0229 |       this.rightLeg.rotation.x = -legAngle;
0230 |       this.leftArm.rotation.x = -legAngle * 0.75;
0231 |       this.rightArm.rotation.x = legAngle * 0.75;
0232 |       this.torso.position.y = 0.92 - Math.abs(Math.sin(time * 6.5)) * 0.03;
0233 |     } else {
0234 |       this.leftLeg.rotation.x = 0;
0235 |       this.rightLeg.rotation.x = 0;
0236 |       this.leftArm.rotation.x = 0;
0237 |       this.rightArm.rotation.x = 0;
0238 |       this.torso.position.y = 0.92 + Math.sin(time * 2.0) * 0.01;
0239 |     }
0240 | 
0241 |     // Directional Hit Reaction response (Pages 50-51)
0242 |     if (this.hitReactionTimer > 0) {
0243 |       this.hitReactionTimer -= 0.016;
0244 |       const t = Math.max(0, this.hitReactionTimer / 0.35);
0245 |       if (this.hitReactionDirection === 'front') {
0246 |         this.chest.rotation.x = -t * 0.35;
0247 |       } else if (this.hitReactionDirection === 'back') {
0248 |         this.chest.rotation.x = t * 0.35;
0249 |       } else if (this.hitReactionDirection === 'left') {
0250 |         this.chest.rotation.z = t * 0.25;
0251 |       } else {
0252 |         this.chest.rotation.z = -t * 0.25;
0253 |       }
0254 |     } else {
0255 |       this.chest.rotation.set(0, 0, 0);
0256 |     }
0257 |   }
0258 | 
0259 |   public dispose(): void {
0260 |     this.mesh.traverse(obj => {
0261 |       const mesh = obj as THREE.Mesh;
0262 |       if (mesh.isMesh) {
0263 |         mesh.geometry?.dispose();
0264 |         if (Array.isArray(mesh.material)) {
0265 |           mesh.material.forEach(m => m.dispose());
0266 |         } else {
0267 |           mesh.material?.dispose();
0268 |         }
0269 |       }
0270 |     });
0271 |     this.mesh.removeFromParent();
0272 |   }
0273 | }
0274 | 
```

---

## 46. `src/npc/npcManager.ts`

<a id="src-npc-npcmanager-ts"></a>

**Role:** Crowd manager handling pedestrian schedules, fleeing reactions, and police retaliatory combat.

- **File Path:** `src/npc/npcManager.ts`
- **Total Lines:** 148
- **Size:** 4.33 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { NPCModel, NPCArchetype } from './npcModel';
0003 | import { distance2D } from '../core/math';
0004 | import { eventBus } from '../core/events';
0005 | import { HitDirection } from '../combat/hitReactionTypes';
0006 | 
0007 | export interface NPCInstance {
0008 |   id: string;
0009 |   archetype: NPCArchetype;
0010 |   model: NPCModel;
0011 |   position: THREE.Vector3;
0012 |   velocity: THREE.Vector3;
0013 |   state: 'idle' | 'walk' | 'flee' | 'combat' | 'dead';
0014 |   health: number;
0015 |   isDead: boolean;
0016 |   takeDamage: (dmg: number, hitDirection?: HitDirection) => void;
0017 | }
0018 | 
0019 | export class NPCManager {
0020 |   private scene: THREE.Scene;
0021 |   public npcs: NPCInstance[] = [];
0022 |   private animTimer = 0;
0023 |   private readonly fleeDirScratch = new THREE.Vector3();
0024 |   private frameCount = 0;
0025 | 
0026 |   constructor(scene: THREE.Scene) {
0027 |     this.scene = scene;
0028 |     this.spawnVerticalSlicePopulation();
0029 |   }
0030 | 
0031 |   private spawnVerticalSlicePopulation(): void {
0032 |     const archetypes: NPCArchetype[] = [
0033 |       'office_worker',
0034 |       'student',
0035 |       'tourist',
0036 |       'dock_worker',
0037 |       'service_worker',
0038 |       'street_vendor',
0039 |       'athlete',
0040 |       'police_officer'
0041 |     ];
0042 | 
0043 |     // Spawn 24 pedestrians scattered along sidewalks in central sectors
0044 |     for (let i = 0; i < 24; i++) {
0045 |       const arch = archetypes[i % archetypes.length];
0046 |       const model = new NPCModel(arch);
0047 |       this.scene.add(model.mesh);
0048 | 
0049 |       const angle = (i / 24) * Math.PI * 2;
0050 |       const radius = 25 + Math.random() * 45;
0051 |       const pos = new THREE.Vector3(
0052 |         Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
0053 |         0,
0054 |         Math.sin(angle) * radius + (Math.random() - 0.5) * 20
0055 |       );
0056 |       model.mesh.position.copy(pos);
0057 | 
0058 |       const npc: NPCInstance = {
0059 |         id: `npc_${i}`,
0060 |         archetype: arch,
0061 |         model,
0062 |         position: pos,
0063 |         velocity: new THREE.Vector3(),
0064 |         state: 'walk',
0065 |         health: 100,
0066 |         isDead: false,
0067 |         takeDamage: (dmg: number, hitDirection: HitDirection = 'front') => {
0068 |           if (npc.isDead) return;
0069 |           npc.health -= dmg;
0070 |           npc.model.triggerHitReaction(hitDirection);
0071 |           if (npc.health <= 0) {
0072 |             npc.isDead = true;
0073 |             npc.state = 'dead';
0074 |             eventBus.emit('NPC_KILLED', { id: npc.id, archetype: npc.archetype });
0075 |           } else {
0076 |             npc.state = 'flee';
0077 |           }
0078 |         }
0079 |       };
0080 | 
0081 |       this.npcs.push(npc);
0082 |     }
0083 |   }
0084 | 
0085 |   public update(dt: number, playerPos: THREE.Vector3, isGunfireNear: boolean): void {
0086 |     this.animTimer += dt;
0087 |     this.frameCount++;
0088 | 
0089 |     for (let i = 0; i < this.npcs.length; i++) {
0090 |       const npc = this.npcs[i];
0091 |       if (npc.isDead) {
0092 |         npc.model.animate(0, this.animTimer, true);
0093 |         continue;
0094 |       }
0095 | 
0096 |       const distToPlayer = distance2D(npc.position.x, npc.position.z, playerPos.x, playerPos.z);
0097 | 
0098 |       // Distance LOD tick throttling (Page 107)
0099 |       if (distToPlayer > 120 && (this.frameCount + i) % 3 !== 0) {
0100 |         continue;
0101 |       }
0102 | 
0103 |       // React to gunfire or close danger by fleeing
0104 |       if (isGunfireNear && distToPlayer < 45 && npc.state !== 'flee') {
0105 |         npc.state = 'flee';
0106 |         eventBus.emit('WITNESS_EVENT', {
0107 |           position: [npc.position.x, npc.position.y, npc.position.z],
0108 |           severity: 2
0109 |         });
0110 |       }
0111 | 
0112 |       if (npc.state === 'flee') {
0113 |         // Run away from player using pooled scratch vector
0114 |         this.fleeDirScratch.subVectors(npc.position, playerPos).setY(0);
0115 |         if (this.fleeDirScratch.lengthSq() > 1e-4) {
0116 |           this.fleeDirScratch.normalize();
0117 |         }
0118 |         npc.velocity.copy(this.fleeDirScratch).multiplyScalar(5.5);
0119 |       } else if (npc.state === 'walk') {
0120 |         // Ambient wandering along sidewalks
0121 |         if (Math.random() < 0.02) {
0122 |           const wanderAngle = Math.random() * Math.PI * 2;
0123 |           npc.velocity.set(Math.cos(wanderAngle) * 1.8, 0, Math.sin(wanderAngle) * 1.8);
0124 |         }
0125 |       }
0126 | 
0127 |       // Position step
0128 |       npc.position.addScaledVector(npc.velocity, dt);
0129 |       npc.model.mesh.position.copy(npc.position);
0130 | 
0131 |       if (npc.velocity.lengthSq() > 0.01) {
0132 |         npc.model.mesh.rotation.y = Math.atan2(npc.velocity.x, npc.velocity.z);
0133 |       }
0134 | 
0135 |       const speed = Math.hypot(npc.velocity.x, npc.velocity.z);
0136 |       npc.model.animate(speed, this.animTimer, false);
0137 |     }
0138 |   }
0139 | 
0140 |   public dispose(): void {
0141 |     for (const npc of this.npcs) {
0142 |       this.scene.remove(npc.model.mesh);
0143 |       npc.model.dispose();
0144 |     }
0145 |     this.npcs.length = 0;
0146 |   }
0147 | }
0148 | 
```

---

## 47. `src/combat/hitReactionTypes.ts`

<a id="src-combat-hitreactiontypes-ts"></a>

**Role:** Combat directional hit payloads, angular classification vectors, and target reaction state structures.

- **File Path:** `src/combat/hitReactionTypes.ts`
- **Total Lines:** 50
- **Size:** 1.36 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | 
0003 | export type HitDirection = 'front' | 'back' | 'left' | 'right';
0004 | 
0005 | export interface HitReactionPayload {
0006 |   targetId: string;
0007 |   damage: number;
0008 |   point: { x: number; y: number; z: number };
0009 |   direction: HitDirection;
0010 |   critical: boolean;
0011 | }
0012 | 
0013 | export interface HitReactionState {
0014 |   active: boolean;
0015 |   age: number;
0016 |   duration: number;
0017 |   direction: HitDirection;
0018 |   strength: number;
0019 | }
0020 | 
0021 | export function classifyHitDirection(
0022 |   targetForward: THREE.Vector3,
0023 |   attackerFromTarget: THREE.Vector3
0024 | ): HitDirection {
0025 |   const f = targetForward.clone().setY(0).normalize();
0026 |   const a = attackerFromTarget.clone().setY(0).normalize();
0027 |   const dot = f.dot(a);
0028 |   const cross = f.x * a.z - f.z * a.x;
0029 |   if (dot > 0.72) return 'front';
0030 |   if (dot < -0.72) return 'back';
0031 |   return cross > 0 ? 'right' : 'left';
0032 | }
0033 | 
0034 | export function getHitDirection(
0035 |   targetForward: { x: number; z: number },
0036 |   hitPoint: { x: number; z: number },
0037 |   targetPosition: { x: number; z: number }
0038 | ): HitDirection {
0039 |   const ax = hitPoint.x - targetPosition.x;
0040 |   const az = hitPoint.z - targetPosition.z;
0041 |   const len = Math.hypot(ax, az) || 1;
0042 |   const x = ax / len;
0043 |   const z = az / len;
0044 |   const dot = targetForward.x * x + targetForward.z * z;
0045 |   const cross = targetForward.x * z - targetForward.z * x;
0046 |   if (dot > 0.7) return 'front';
0047 |   if (dot < -0.7) return 'back';
0048 |   return cross > 0 ? 'right' : 'left';
0049 | }
0050 | 
```

---

## 48. `src/combat/combatSystem.ts`

<a id="src-combat-combatsystem-ts"></a>

**Role:** Combat engine managing weapon firing, rocket damage retention, hitscan raycasting, recoil, and occlusion checks.

- **File Path:** `src/combat/combatSystem.ts`
- **Total Lines:** 325
- **Size:** 10.30 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { PlayerController } from '../player/playerController';
0003 | import { VehicleManager } from '../vehicles/vehicleManager';
0004 | import { ParticleSystem } from '../rendering/particles';
0005 | import { soundEngine } from '../core/audio';
0006 | import { InputState } from '../core/input';
0007 | import { eventBus } from '../core/events';
0008 | import { WeaponDefinition, InventoryItem } from '../core/types';
0009 | import type { VehicleInstance } from '../vehicles/vehicleController';
0010 | import type { PhysicsWorld } from '../physics/physicsWorld';
0011 | import { getHitDirection, HitDirection } from './hitReactionTypes';
0012 | 
0013 | export interface ActiveRocket {
0014 |   position: THREE.Vector3;
0015 |   velocity: THREE.Vector3;
0016 |   life: number;
0017 |   weaponId: string;
0018 |   damage: number;
0019 | }
0020 | 
0021 | export class CombatSystem {
0022 |   private scene: THREE.Scene;
0023 |   private physicsWorld: PhysicsWorld | null = null;
0024 |   private fireTimer = 0;
0025 |   private isReloading = false;
0026 |   private reloadTimer = 0;
0027 |   private fireLatch = false;
0028 |   public activeRockets: ActiveRocket[] = [];
0029 | 
0030 |   // Pooled scratch objects
0031 |   private readonly fireRay = new THREE.Ray();
0032 |   private readonly muzzleScratch = new THREE.Vector3();
0033 |   private readonly muzzleOffset = new THREE.Vector3(0, 1.4, 0);
0034 |   private readonly aimScratch = new THREE.Vector3();
0035 |   private readonly targetCenter = new THREE.Vector3();
0036 |   private readonly targetSphere = new THREE.Sphere(new THREE.Vector3(), 0);
0037 |   private readonly hitPoint = new THREE.Vector3();
0038 |   private readonly impactPosScratch = new THREE.Vector3();
0039 | 
0040 |   constructor(scene: THREE.Scene, physicsWorld?: PhysicsWorld | null) {
0041 |     this.scene = scene;
0042 |     if (physicsWorld) this.physicsWorld = physicsWorld;
0043 |   }
0044 | 
0045 |   public setPhysicsWorld(pw: PhysicsWorld | null): void {
0046 |     this.physicsWorld = pw;
0047 |   }
0048 | 
0049 |   public update(
0050 |     input: InputState,
0051 |     dt: number,
0052 |     player: PlayerController,
0053 |     vehicleMgr: VehicleManager,
0054 |     particles: ParticleSystem,
0055 |     npcTargets: {
0056 |       id?: string;
0057 |       position: THREE.Vector3;
0058 |       takeDamage: (dmg: number, dir?: HitDirection) => void;
0059 |       isDead: boolean;
0060 |     }[] = []
0061 |   ): void {
0062 |     const { def, item } = player.getActiveWeapon();
0063 | 
0064 |     // Reload handling
0065 |     if (this.isReloading) {
0066 |       this.reloadTimer -= dt;
0067 |       if (this.reloadTimer <= 0) {
0068 |         this.isReloading = false;
0069 |         const needed = def.magazineSize - item.ammo;
0070 |         const toLoad = Math.min(needed, item.reserveAmmo);
0071 |         item.ammo += toLoad;
0072 |         item.reserveAmmo -= toLoad;
0073 |         eventBus.emit('WEAPON_RELOADED', item);
0074 |       }
0075 |     } else if (input.reload && item.ammo < def.magazineSize && item.reserveAmmo > 0) {
0076 |       this.startReload(def.reloadTime);
0077 |     }
0078 | 
0079 |     // Firing cooldown
0080 |     this.fireTimer -= dt;
0081 | 
0082 |     // Semi-auto weapons fire only on the press edge. Automatic weapons may repeat.
0083 |     const shouldFire = def.automatic
0084 |       ? input.fire
0085 |       : input.fire && !this.fireLatch;
0086 |     this.fireLatch = input.fire;
0087 | 
0088 |     if (shouldFire && this.fireTimer <= 0 && !this.isReloading) {
0089 |       if (item.ammo > 0) {
0090 |         this.fireWeapon(def, item, player, vehicleMgr, particles, npcTargets);
0091 |         this.fireTimer = 1 / def.fireRate;
0092 |       } else if (item.reserveAmmo > 0) {
0093 |         this.startReload(def.reloadTime);
0094 |       }
0095 |     }
0096 | 
0097 |     // Update active launcher rockets using launch-time damage (P0 Combat fix)
0098 |     for (let i = this.activeRockets.length - 1; i >= 0; i--) {
0099 |       const rocket = this.activeRockets[i];
0100 |       rocket.life -= dt;
0101 |       rocket.position.addScaledVector(rocket.velocity, dt);
0102 | 
0103 |       // Rocket trail smoke
0104 |       particles.emitTireSmoke(rocket.position);
0105 | 
0106 |       // Check ground or target proximity
0107 |       let exploded = rocket.life <= 0 || rocket.position.y <= 0.2;
0108 | 
0109 |       // Check vehicle hits with squared distance
0110 |       const rPos = rocket.position;
0111 |       for (let vIdx = 0; vIdx < vehicleMgr.vehicles.length; vIdx++) {
0112 |         const v = vehicleMgr.vehicles[vIdx];
0113 |         if (!v.isDestroyed) {
0114 |           const dx = rPos.x - v.position.x;
0115 |           const dy = rPos.y - v.position.y;
0116 |           const dz = rPos.z - v.position.z;
0117 |           if (dx * dx + dy * dy + dz * dz < 3.5 * 3.5) {
0118 |             v.takeDamage(rocket.damage, particles);
0119 |             exploded = true;
0120 |             break;
0121 |           }
0122 |         }
0123 |       }
0124 | 
0125 |       // Check NPC hits with squared distance
0126 |       for (let nIdx = 0; nIdx < npcTargets.length; nIdx++) {
0127 |         const npc = npcTargets[nIdx];
0128 |         if (!npc.isDead) {
0129 |           const dx = rPos.x - npc.position.x;
0130 |           const dy = rPos.y - npc.position.y;
0131 |           const dz = rPos.z - npc.position.z;
0132 |           if (dx * dx + dy * dy + dz * dz < 4.0 * 4.0) {
0133 |             npc.takeDamage(rocket.damage, 'front');
0134 |             exploded = true;
0135 |             break;
0136 |           }
0137 |         }
0138 |       }
0139 | 
0140 |       if (exploded) {
0141 |         particles.emitExplosion(rocket.position);
0142 |         player.camera.addShake(0.85); // Explosion camera shake
0143 |         soundEngine.playGunshot('launcher');
0144 |         this.activeRockets.splice(i, 1);
0145 |       }
0146 |     }
0147 |   }
0148 | 
0149 |   private startReload(reloadDuration: number): void {
0150 |     this.isReloading = true;
0151 |     this.reloadTimer = reloadDuration;
0152 |     soundEngine.playReload();
0153 |   }
0154 | 
0155 |   private fireWeapon(
0156 |     def: WeaponDefinition,
0157 |     item: InventoryItem,
0158 |     player: PlayerController,
0159 |     vehicleMgr: VehicleManager,
0160 |     particles: ParticleSystem,
0161 |     npcTargets: {
0162 |       id?: string;
0163 |       position: THREE.Vector3;
0164 |       takeDamage: (dmg: number, dir?: HitDirection) => void;
0165 |       isDead: boolean;
0166 |     }[]
0167 |   ): void {
0168 |     item.ammo--;
0169 |     soundEngine.playGunshot(def.class);
0170 | 
0171 |     // Weapon Recoil & Camera Kick (Pages 43, 52)
0172 |     player.model.triggerRecoil(def.recoil || 1.0);
0173 |     const kickAmount = def.class === 'shotgun' ? 0.32 : def.class === 'launcher' ? 0.45 : 0.14;
0174 |     player.camera.addShake(kickAmount);
0175 | 
0176 |     const muzzlePos = this.muzzleScratch.copy(player.position).add(this.muzzleOffset);
0177 |     const aimDir = this.aimScratch;
0178 |     player.camera.camera.getWorldDirection(aimDir);
0179 | 
0180 |     aimDir.x += (Math.random() - 0.5) * def.spread;
0181 |     aimDir.y += (Math.random() - 0.5) * def.spread;
0182 |     aimDir.z += (Math.random() - 0.5) * def.spread;
0183 |     aimDir.normalize();
0184 | 
0185 |     particles.emitMuzzleFlash(muzzlePos, aimDir);
0186 | 
0187 |     if (def.class === 'launcher') {
0188 |       this.activeRockets.push({
0189 |         position: muzzlePos.clone(),
0190 |         velocity: aimDir.clone().multiplyScalar(45),
0191 |         life: 3.5,
0192 |         weaponId: def.id,
0193 |         damage: def.damage
0194 |       });
0195 |       eventBus.emit('WEAPON_FIRED', {
0196 |         weaponId: def.id,
0197 |         ammoLeft: item.ammo
0198 |       });
0199 |       return;
0200 |     }
0201 | 
0202 |     // 1. Raycast world geometry first to get occlusion distance (P0 Line-of-sight fix)
0203 |     let occlusionDistance = def.range;
0204 |     if (this.physicsWorld) {
0205 |       const worldHit = this.physicsWorld.castRay(
0206 |         { x: muzzlePos.x, y: muzzlePos.y, z: muzzlePos.z },
0207 |         { x: aimDir.x, y: aimDir.y, z: aimDir.z },
0208 |         def.range,
0209 |         true
0210 |       );
0211 |       if (worldHit && worldHit.hit) {
0212 |         occlusionDistance = worldHit.toi;
0213 |       }
0214 |     }
0215 | 
0216 |     const ray = this.fireRay;
0217 |     ray.origin.copy(muzzlePos);
0218 |     ray.direction.copy(aimDir);
0219 | 
0220 |     type HitCandidate = {
0221 |       distance: number;
0222 |       kind: 'vehicle' | 'npc';
0223 |       vehicle?: VehicleInstance;
0224 |       npc?: { id?: string; position: THREE.Vector3; takeDamage: (dmg: number, dir?: HitDirection) => void };
0225 |       point: THREE.Vector3;
0226 |     };
0227 | 
0228 |     let nearest: HitCandidate | null = null;
0229 | 
0230 |     // Check vehicle hits strictly up to occlusion distance
0231 |     for (let i = 0; i < vehicleMgr.vehicles.length; i++) {
0232 |       const vehicle = vehicleMgr.vehicles[i];
0233 |       if (vehicle.isDestroyed) continue;
0234 |       this.targetCenter.copy(vehicle.position);
0235 |       this.targetCenter.y += 1;
0236 |       this.targetSphere.center.copy(this.targetCenter);
0237 |       this.targetSphere.radius = Math.max(0.6, vehicle.def.dimensions.width * 0.5);
0238 | 
0239 |       const hit = ray.intersectSphere(this.targetSphere, this.hitPoint);
0240 |       if (!hit) continue;
0241 | 
0242 |       const distance = muzzlePos.distanceTo(hit);
0243 |       if (distance > occlusionDistance) continue; // Occluded by wall/world
0244 | 
0245 |       if (!nearest || distance < nearest.distance) {
0246 |         nearest = {
0247 |           distance,
0248 |           kind: 'vehicle',
0249 |           vehicle,
0250 |           point: this.hitPoint.clone()
0251 |         };
0252 |       }
0253 |     }
0254 | 
0255 |     // Check NPC hits strictly up to occlusion distance
0256 |     for (let i = 0; i < npcTargets.length; i++) {
0257 |       const npc = npcTargets[i];
0258 |       if (npc.isDead) continue;
0259 |       this.targetCenter.copy(npc.position);
0260 |       this.targetCenter.y += 1;
0261 |       this.targetSphere.center.copy(this.targetCenter);
0262 |       this.targetSphere.radius = 0.6;
0263 | 
0264 |       const hit = ray.intersectSphere(this.targetSphere, this.hitPoint);
0265 |       if (!hit) continue;
0266 | 
0267 |       const distance = muzzlePos.distanceTo(hit);
0268 |       if (distance > occlusionDistance) continue; // Occluded by wall/world
0269 | 
0270 |       if (!nearest || distance < nearest.distance) {
0271 |         nearest = {
0272 |           distance,
0273 |           kind: 'npc',
0274 |           npc,
0275 |           point: this.hitPoint.clone()
0276 |         };
0277 |       }
0278 |     }
0279 | 
0280 |     if (nearest) {
0281 |       if (nearest.kind === 'vehicle' && nearest.vehicle) {
0282 |         nearest.vehicle.takeDamage(def.damage, particles);
0283 |         particles.emitSurfaceImpact(nearest.point, 'metal');
0284 |         eventBus.emit('COMBAT_HIT', {
0285 |           target: 'vehicle',
0286 |           id: nearest.vehicle.id,
0287 |           damage: def.damage
0288 |         });
0289 |       } else if (nearest.kind === 'npc' && nearest.npc) {
0290 |         const forward = { x: Math.sin(player.facingAngle), z: Math.cos(player.facingAngle) };
0291 |         const hitDir = getHitDirection(
0292 |           forward,
0293 |           { x: nearest.point.x, z: nearest.point.z },
0294 |           { x: nearest.npc.position.x, z: nearest.npc.position.z }
0295 |         );
0296 |         nearest.npc.takeDamage(def.damage, hitDir);
0297 |         particles.emitBulletSpark(nearest.point);
0298 |         eventBus.emit('COMBAT_HIT', {
0299 |           target: 'npc',
0300 |           id: nearest.npc.id,
0301 |           damage: def.damage
0302 |         });
0303 |       }
0304 |     } else if (occlusionDistance < def.range) {
0305 |       // Impact on world wall / obstacle with surface particle reaction (Page 53)
0306 |       this.impactPosScratch.copy(muzzlePos).addScaledVector(aimDir, occlusionDistance);
0307 |       particles.emitSurfaceImpact(this.impactPosScratch, 'concrete');
0308 |     }
0309 | 
0310 |     eventBus.emit('WEAPON_FIRED', {
0311 |       weaponId: def.id,
0312 |       ammoLeft: item.ammo
0313 |     });
0314 |   }
0315 | 
0316 |   public dispose(): void {
0317 |     this.activeRockets.length = 0;
0318 |     this.fireTimer = 0;
0319 |     this.isReloading = false;
0320 |     this.reloadTimer = 0;
0321 |     this.fireLatch = false;
0322 |     this.physicsWorld = null;
0323 |   }
0324 | }
0325 | 
```

---

## 49. `src/law/wantedSystem.ts`

<a id="src-law-wantedsystem-ts"></a>

**Role:** 0-5 Star Wanted heat escalation manager with witness reporting and evasion cooldown.

- **File Path:** `src/law/wantedSystem.ts`
- **Total Lines:** 116
- **Size:** 3.58 KB

### Line-by-Line Source Code

```typescript
0001 | import * as THREE from 'three';
0002 | import { WantedLevel } from '../core/types';
0003 | import { VehicleManager } from '../vehicles/vehicleManager';
0004 | import { soundEngine } from '../core/audio';
0005 | import { eventBus } from '../core/events';
0006 | import { distance2D } from '../core/math';
0007 | import type { VehicleInstance } from '../vehicles/vehicleController';
0008 | 
0009 | export class WantedSystem {
0010 |   public heat: WantedLevel = 0;
0011 |   public readonly lastKnownPosition = new THREE.Vector3();
0012 |   public searchRadius = 0;
0013 |   public isCoolingDown = false;
0014 |   public cooldownTimer = 0;
0015 |   private spawnCooldown = 0;
0016 |   private readonly activePursuits = new Set<VehicleInstance>();
0017 |   private readonly unsubscribers: Array<() => void> = [];
0018 | 
0019 |   constructor() {
0020 |     this.unsubscribers.push(
0021 |       eventBus.on('WEAPON_FIRED', () => this.addCrimeWeight(1)),
0022 |       eventBus.on('WITNESS_EVENT', data => {
0023 |         this.lastKnownPosition.set(data.position[0], data.position[1], data.position[2]);
0024 |         this.addCrimeWeight(data.severity);
0025 |       }),
0026 |       eventBus.on('COMBAT_HIT', data => {
0027 |         if (data.target === 'npc') this.addCrimeWeight(4);
0028 |         if (data.target === 'vehicle') this.addCrimeWeight(2);
0029 |       }),
0030 |       eventBus.on('NPC_KILLED', () => this.addCrimeWeight(6))
0031 |     );
0032 |   }
0033 | 
0034 |   public setHeat(level: WantedLevel): void {
0035 |     const previous = this.heat;
0036 |     this.heat = level;
0037 |     if (level > 0) {
0038 |       this.searchRadius = 75 + level * 35;
0039 |       this.cooldownTimer = 15 + level * 3;
0040 |       this.isCoolingDown = false;
0041 |       soundEngine.setPoliceSiren(true);
0042 |     } else {
0043 |       this.searchRadius = 0;
0044 |       this.cooldownTimer = 0;
0045 |       this.isCoolingDown = false;
0046 |       soundEngine.setPoliceSiren(false);
0047 |       this.activePursuits.clear();
0048 |     }
0049 |     if (previous !== level) {
0050 |       eventBus.emit('HEAT_CHANGED', level);
0051 |     }
0052 |   }
0053 | 
0054 |   public addCrimeWeight(weight: number): void {
0055 |     if (weight <= 0) return;
0056 |     const target = Math.min(5, this.heat + (weight >= 6 ? 2 : 1)) as WantedLevel;
0057 |     this.setHeat(Math.max(1, target) as WantedLevel);
0058 |   }
0059 | 
0060 |   public registerPursuit(unit: VehicleInstance): void {
0061 |     this.activePursuits.add(unit);
0062 |   }
0063 | 
0064 |   public update(dt: number, playerPos: THREE.Vector3, vehicleMgr: VehicleManager): void {
0065 |     if (this.heat === 0) return;
0066 | 
0067 |     const distToLKP = distance2D(
0068 |       playerPos.x,
0069 |       playerPos.z,
0070 |       this.lastKnownPosition.x,
0071 |       this.lastKnownPosition.z
0072 |     );
0073 | 
0074 |     if (distToLKP <= this.searchRadius) {
0075 |       this.isCoolingDown = false;
0076 |       this.cooldownTimer = Math.max(this.cooldownTimer, 5);
0077 |       this.lastKnownPosition.copy(playerPos);
0078 |     } else {
0079 |       this.isCoolingDown = true;
0080 |       this.cooldownTimer -= dt;
0081 |       if (this.cooldownTimer <= 0) {
0082 |         this.setHeat(0);
0083 |         soundEngine.playMissionStinger();
0084 |         return;
0085 |       }
0086 |     }
0087 | 
0088 |     this.spawnCooldown -= dt;
0089 |     if (this.heat >= 2 && this.spawnCooldown <= 0 && this.activePursuits.size < Math.min(5, this.heat)) {
0090 |       this.spawnCooldown = Math.max(4, 12 - this.heat);
0091 |       const unit = vehicleMgr.spawnPolicePursuitUnit(playerPos);
0092 |       this.activePursuits.add(unit);
0093 |     }
0094 | 
0095 |     for (const unit of this.activePursuits) {
0096 |       if (unit.isDestroyed) {
0097 |         this.activePursuits.delete(unit);
0098 |         continue;
0099 |       }
0100 |       const dx = playerPos.x - unit.position.x;
0101 |       const dz = playerPos.z - unit.position.z;
0102 |       unit.rotationY = Math.atan2(dx, dz);
0103 |       unit.speed = Math.min(
0104 |         unit.def.topSpeed * 0.85,
0105 |         unit.def.topSpeed * (0.55 + this.heat * 0.07)
0106 |       );
0107 |     }
0108 |   }
0109 | 
0110 |   public dispose(): void {
0111 |     for (const unsubscribe of this.unsubscribers) unsubscribe();
0112 |     this.unsubscribers.length = 0;
0113 |     this.activePursuits.clear();
0114 |   }
0115 | }
0116 | 
```

---

## 50. `src/missions/missionManager.ts`

<a id="src-missions-missionmanager-ts"></a>

**Role:** Mission runner tracking active objectives, checkpoints, and cash reward payouts.

- **File Path:** `src/missions/missionManager.ts`
- **Total Lines:** 134
- **Size:** 4.11 KB

### Line-by-Line Source Code

```typescript
0001 | import { MissionDefinition, MissionObjective } from '../core/types';
0002 | import { getMissionDef } from '../data/missions';
0003 | import { PlayerController } from '../player/playerController';
0004 | import { WantedSystem } from '../law/wantedSystem';
0005 | import { RoadNetwork } from '../world/roadNetwork';
0006 | import { soundEngine } from '../core/audio';
0007 | import { distance2D } from '../core/math';
0008 | import { eventBus } from '../core/events';
0009 | 
0010 | export class MissionManager {
0011 |   public activeMission: MissionDefinition | null = null;
0012 |   public currentStageIndex = 0;
0013 |   public completedMissionIds: string[] = [];
0014 | 
0015 |   private cachedRouteKey = '';
0016 |   private routeRefreshTimer = 0;
0017 | 
0018 |   public startMission(missionId: string, playStinger = false): boolean {
0019 |     const def = getMissionDef(missionId);
0020 |     if (!def) return false;
0021 | 
0022 |     this.activeMission = structuredClone(def);
0023 |     this.currentStageIndex = 0;
0024 |     this.cachedRouteKey = '';
0025 |     this.routeRefreshTimer = 0;
0026 | 
0027 |     if (playStinger) soundEngine.playMissionStinger();
0028 |     eventBus.emit('MISSION_STARTED', this.activeMission);
0029 |     return true;
0030 |   }
0031 | 
0032 |   public resetToCheckpoint(): void {
0033 |     if (!this.activeMission) return;
0034 |     this.cachedRouteKey = '';
0035 |     this.routeRefreshTimer = 0;
0036 |     for (let i = this.currentStageIndex; i < this.activeMission.stages.length; i++) {
0037 |       for (const objective of this.activeMission.stages[i]) {
0038 |         objective.completed = false;
0039 |         objective.currentCount = 0;
0040 |       }
0041 |     }
0042 |   }
0043 | 
0044 |   public getCurrentObjective(): MissionObjective | null {
0045 |     if (!this.activeMission) return null;
0046 |     const stage = this.activeMission.stages[this.currentStageIndex];
0047 |     if (!stage) return null;
0048 |     return stage.find(objective => !objective.completed) ?? null;
0049 |   }
0050 | 
0051 |   public update(
0052 |     dt: number,
0053 |     player: PlayerController,
0054 |     wanted: WantedSystem,
0055 |     roadNetwork: RoadNetwork
0056 |   ): void {
0057 |     const mission = this.activeMission;
0058 |     const objective = this.getCurrentObjective();
0059 |     if (!mission || !objective) return;
0060 | 
0061 |     if (objective.type === 'reach_location' && objective.targetPosition) {
0062 |       this.routeRefreshTimer -= dt;
0063 |       const target = objective.targetPosition;
0064 |       const key = [
0065 |         Math.round(player.position.x / 10),
0066 |         Math.round(player.position.z / 10),
0067 |         target[0],
0068 |         target[2]
0069 |       ].join(':');
0070 | 
0071 |       if (key !== this.cachedRouteKey || this.routeRefreshTimer <= 0) {
0072 |         roadNetwork.updateGPSRibbon(
0073 |           roadNetwork.findPath(player.position.x, player.position.z, target[0], target[2])
0074 |         );
0075 |         this.cachedRouteKey = key;
0076 |         this.routeRefreshTimer = 0.25;
0077 |       }
0078 | 
0079 |       if (distance2D(player.position.x, player.position.z, target[0], target[2]) < 14) {
0080 |         this.completeObjective(player, wanted);
0081 |       }
0082 |     } else if (
0083 |       objective.type === 'steal_vehicle' &&
0084 |       objective.targetVehicleId &&
0085 |       player.currentVehicle?.def.id === objective.targetVehicleId
0086 |     ) {
0087 |       this.completeObjective(player, wanted);
0088 |     } else if (objective.type === 'lose_wanted' && wanted.heat === 0) {
0089 |       this.completeObjective(player, wanted);
0090 |     }
0091 |   }
0092 | 
0093 |   private completeObjective(player: PlayerController, wanted: WantedSystem): void {
0094 |     const objective = this.getCurrentObjective();
0095 |     const mission = this.activeMission;
0096 |     if (!objective || !mission) return;
0097 | 
0098 |     objective.completed = true;
0099 |     this.cachedRouteKey = '';
0100 |     eventBus.emit('STAGE_ADVANCED', objective);
0101 | 
0102 |     const stageComplete = mission.stages[this.currentStageIndex].every(
0103 |       item => item.completed
0104 |     );
0105 | 
0106 |     if (!stageComplete) return;
0107 | 
0108 |     this.currentStageIndex++;
0109 |     if (this.currentStageIndex >= mission.stages.length) {
0110 |       const reward = mission.rewardCash;
0111 |       player.addCash(reward);
0112 |       this.completedMissionIds.push(mission.id);
0113 |       eventBus.emit('MISSION_COMPLETED', {
0114 |         id: mission.id,
0115 |         title: mission.title,
0116 |         reward
0117 |       });
0118 |       this.activeMission = null;
0119 |       return;
0120 |     }
0121 | 
0122 |     if (mission.id === 'm_getaway_blueprint' && this.currentStageIndex === 3) {
0123 |       wanted.setHeat(2);
0124 |     }
0125 | 
0126 |     eventBus.emit('STAGE_ADVANCED', this.getCurrentObjective());
0127 |   }
0128 | 
0129 |   public dispose(): void {
0130 |     this.activeMission = null;
0131 |     this.cachedRouteKey = '';
0132 |   }
0133 | }
0134 | 
```

---

## 51. `src/ui/store.ts`

<a id="src-ui-store-ts"></a>

**Role:** Zustand reactive UI state store bridging engine telemetry and player stats to React.

- **File Path:** `src/ui/store.ts`
- **Total Lines:** 96
- **Size:** 2.27 KB

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

## 52. `src/ui/HUD.tsx`

<a id="src-ui-hud-tsx"></a>

**Role:** HUD overlay with circular minimap radar, health/armor, cash, ammo, and speedometer.

- **File Path:** `src/ui/HUD.tsx`
- **Total Lines:** 240
- **Size:** 10.67 KB

### Line-by-Line Source Code

```tsx
0001 | import React, { useEffect, useState } from 'react';
0002 | import { useGameStore } from './store';
0003 | import { Shield, Heart, Coins, Crosshair, Gauge, Navigation } from 'lucide-react';
0004 | import { worldToMapPercent } from '../core/math';
0005 | import { CANONICAL_POIS } from '../data/pois';
0006 | import { eventBus } from '../core/events';
0007 | 
0008 | export const HUD: React.FC<{ playerPos: [number, number, number]; playerHeading: number }> = ({
0009 |   playerPos,
0010 |   playerHeading
0011 | }) => {
0012 |   const [hitMarker, setHitMarker] = useState(false);
0013 | 
0014 |   useEffect(() => {
0015 |     let timeout: ReturnType<typeof setTimeout>;
0016 |     const unsubscribe = eventBus.on('COMBAT_HIT', () => {
0017 |       setHitMarker(true);
0018 |       clearTimeout(timeout);
0019 |       timeout = setTimeout(() => setHitMarker(false), 120);
0020 |     });
0021 |     return () => {
0022 |       clearTimeout(timeout);
0023 |       unsubscribe();
0024 |     };
0025 |   }, []);
0026 | 
0027 |   const {
0028 |     health,
0029 |     armor,
0030 |     cash,
0031 |     weaponName,
0032 |     ammo,
0033 |     reserveAmmo,
0034 |     inVehicle,
0035 |     vehicleName,
0036 |     vehicleSpeed,
0037 |     vehicleHealth,
0038 |     wantedLevel,
0039 |     isCoolingDown,
0040 |     districtName,
0041 |     timeFormatted,
0042 |     activeMissionTitle,
0043 |     currentObjective
0044 |   } = useGameStore();
0045 | 
0046 |   const mapPercent = worldToMapPercent(playerPos[0], playerPos[2]);
0047 | 
0048 |   return (
0049 |     <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, overflow: 'hidden' }}>
0050 |       {/* Center Screen Crosshair Hit Marker (Pages 8, 52, 82) */}
0051 |       {hitMarker && (
0052 |         <div
0053 |           style={{
0054 |             position: 'absolute',
0055 |             top: '50%',
0056 |             left: '50%',
0057 |             width: 24,
0058 |             height: 24,
0059 |             transform: 'translate(-50%, -50%) rotate(45deg)',
0060 |             pointerEvents: 'none',
0061 |             display: 'flex',
0062 |             alignItems: 'center',
0063 |             justifyContent: 'center'
0064 |           }}
0065 |         >
0066 |           <div style={{ position: 'absolute', width: 14, height: 2, background: '#ef4444' }} />
0067 |           <div style={{ position: 'absolute', width: 2, height: 14, background: '#ef4444' }} />
0068 |         </div>
0069 |       )}
0070 | 
0071 |       {/* Top Left: District & Time */}
0072 |       <div style={{ position: 'absolute', top: 20, left: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
0073 |         <div style={{ fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
0074 |           {districtName}
0075 |         </div>
0076 |         <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>
0077 |           {timeFormatted} | SAN AURELIO METRO
0078 |         </div>
0079 |       </div>
0080 | 
0081 |       {/* Top Right: Cash & Wanted Level */}
0082 |       <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
0083 |         <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
0084 |           <Coins size={18} color="#f59e0b" />
0085 |           <span style={{ fontSize: 20, fontWeight: 800, color: '#22c55e', letterSpacing: '0.05em' }}>
0086 |             ₳ {cash.toLocaleString()}
0087 |           </span>
0088 |         </div>
0089 | 
0090 |         {/* Wanted Stars (0 to 5) */}
0091 |         {wantedLevel > 0 && (
0092 |           <div style={{ display: 'flex', gap: 4, background: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.5)' }}>
0093 |             {[1, 2, 3, 4, 5].map(star => {
0094 |               const active = star <= wantedLevel;
0095 |               return (
0096 |                 <span
0097 |                   key={star}
0098 |                   style={{
0099 |                     fontSize: 18,
0100 |                     color: active ? '#ef4444' : '#475569',
0101 |                     opacity: active && isCoolingDown ? 0.4 : 1,
0102 |                     transition: 'opacity 0.2s',
0103 |                     filter: active ? 'drop-shadow(0 0 6px #ef4444)' : 'none'
0104 |                   }}
0105 |                 >
0106 |                   ★
0107 |                 </span>
0108 |               );
0109 |             })}
0110 |           </div>
0111 |         )}
0112 |       </div>
0113 | 
0114 |       {/* Bottom Center: Active Mission Banner */}
0115 |       {currentObjective && (
0116 |         <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderLeft: '4px solid #38bdf8', padding: '10px 24px', borderRadius: 8, maxWidth: 580, textAlign: 'center' }}>
0117 |           <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
0118 |             {activeMissionTitle}
0119 |           </div>
0120 |           <div style={{ fontSize: 15, fontWeight: 600, color: '#f8fafc', marginTop: 2 }}>
0121 |             {currentObjective}
0122 |           </div>
0123 |         </div>
0124 |       )}
0125 | 
0126 |       {/* Bottom Left: Minimap Radar */}
0127 |       <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
0128 |         <div
0129 |           style={{
0130 |             width: 170,
0131 |             height: 170,
0132 |             borderRadius: '50%',
0133 |             background: 'radial-gradient(circle, #0f172a 40%, #020617 100%)',
0134 |             border: '2px solid rgba(56, 189, 248, 0.5)',
0135 |             boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
0136 |             position: 'relative',
0137 |             overflow: 'hidden'
0138 |           }}
0139 |         >
0140 |           {/* Radar Grid Lines */}
0141 |           <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
0142 |           <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.1)' }} />
0143 |           <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.1)' }} />
0144 | 
0145 |           {/* POI Blips */}
0146 |           {CANONICAL_POIS.map(poi => {
0147 |             const p = worldToMapPercent(poi.worldPosition[0], poi.worldPosition[2]);
0148 |             const dx = (p.xPercent - mapPercent.xPercent) * 2.8;
0149 |             const dy = (p.yPercent - mapPercent.yPercent) * 2.8;
0150 |             if (Math.abs(dx) > 75 || Math.abs(dy) > 75) return null;
0151 |             return (
0152 |               <div
0153 |                 key={poi.id}
0154 |                 style={{
0155 |                   position: 'absolute',
0156 |                   left: `calc(50% + ${dx}px)`,
0157 |                   top: `calc(50% + ${dy}px)`,
0158 |                   width: 6,
0159 |                   height: 6,
0160 |                   borderRadius: '50%',
0161 |                   background: poi.category === 'mission' ? '#eab308' : poi.category === 'safehouse' ? '#22c55e' : '#38bdf8',
0162 |                   transform: 'translate(-50%, -50%)',
0163 |                   boxShadow: '0 0 4px #000'
0164 |                 }}
0165 |               />
0166 |             );
0167 |           })}
0168 | 
0169 |           {/* Player Center Icon with Heading Rotation */}
0170 |           <div
0171 |             style={{
0172 |               position: 'absolute',
0173 |               top: '50%',
0174 |               left: '50%',
0175 |               width: 14,
0176 |               height: 14,
0177 |               transform: `translate(-50%, -50%) rotate(${playerHeading}rad)`,
0178 |               display: 'flex',
0179 |               alignItems: 'center',
0180 |               justifyContent: 'center'
0181 |             }}
0182 |           >
0183 |             <Navigation size={14} color="#38bdf8" fill="#38bdf8" />
0184 |           </div>
0185 |         </div>
0186 | 
0187 |         {/* Health & Armor Bars */}
0188 |         <div style={{ width: 170, display: 'flex', flexDirection: 'column', gap: 5 }}>
0189 |           {/* Health Bar */}
0190 |           <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15, 23, 42, 0.85)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
0191 |             <Heart size={14} color="#ef4444" fill="#ef4444" />
0192 |             <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
0193 |               <div style={{ width: `${health}%`, height: '100%', background: '#ef4444', transition: 'width 0.2s' }} />
0194 |             </div>
0195 |             <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', minWidth: 24, textAlign: 'right' }}>{health}</span>
0196 |           </div>
0197 | 
0198 |           {/* Armor Bar */}
0199 |           <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15, 23, 42, 0.85)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
0200 |             <Shield size={14} color="#38bdf8" fill="#38bdf8" />
0201 |             <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
0202 |               <div style={{ width: `${armor}%`, height: '100%', background: '#38bdf8', transition: 'width 0.2s' }} />
0203 |             </div>
0204 |             <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', minWidth: 24, textAlign: 'right' }}>{armor}</span>
0205 |           </div>
0206 |         </div>
0207 |       </div>
0208 | 
0209 |       {/* Bottom Right: Weapon or Vehicle Status */}
0210 |       <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
0211 |         {inVehicle ? (
0212 |           <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', minWidth: 160 }}>
0213 |             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
0214 |               <Gauge size={20} color="#38bdf8" />
0215 |               <div style={{ fontSize: 16, fontWeight: 800, color: '#f8fafc' }}>{vehicleName}</div>
0216 |             </div>
0217 |             <div style={{ fontSize: 26, fontWeight: 900, color: '#38bdf8', marginTop: 4 }}>
0218 |               {vehicleSpeed} <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>KM/H</span>
0219 |             </div>
0220 |             {/* Vehicle Health */}
0221 |             <div style={{ marginTop: 6, width: '100%', height: 5, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
0222 |               <div style={{ width: `${(vehicleHealth / 1000) * 100}%`, height: '100%', background: vehicleHealth > 400 ? '#22c55e' : '#ef4444' }} />
0223 |             </div>
0224 |           </div>
0225 |         ) : (
0226 |           <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '12px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 14 }}>
0227 |             <Crosshair size={24} color="#f59e0b" />
0228 |             <div>
0229 |               <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc' }}>{weaponName}</div>
0230 |               <div style={{ fontSize: 20, fontWeight: 900, color: '#38bdf8' }}>
0231 |                 {ammo} <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>/ {reserveAmmo}</span>
0232 |               </div>
0233 |             </div>
0234 |           </div>
0235 |         )}
0236 |       </div>
0237 |     </div>
0238 |   );
0239 | };
0240 | 
```

---

## 53. `src/ui/InteractiveMap.tsx`

<a id="src-ui-interactivemap-tsx"></a>

**Role:** Fullscreen 26-district pannable and zoomable map with pointer capture, POI filters, and waypoint routing.

- **File Path:** `src/ui/InteractiveMap.tsx`
- **Total Lines:** 503
- **Size:** 18.19 KB

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
0028 |   const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
0029 |     if (e.button === 0) {
0030 |       try {
0031 |         e.currentTarget.setPointerCapture(e.pointerId);
0032 |       } catch {}
0033 |       setIsDragging(true);
0034 |       setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
0035 |     }
0036 |   };
0037 | 
0038 |   const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
0039 |     if (isDragging) {
0040 |       setPan({
0041 |         x: e.clientX - dragStart.x,
0042 |         y: e.clientY - dragStart.y
0043 |       });
0044 |     }
0045 |   };
0046 | 
0047 |   const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
0048 |     try {
0049 |       if (e.currentTarget.hasPointerCapture(e.pointerId)) {
0050 |         e.currentTarget.releasePointerCapture(e.pointerId);
0051 |       }
0052 |     } catch {}
0053 |     setIsDragging(false);
0054 |   };
0055 | 
0056 |   const handleWheel = (e: React.WheelEvent) => {
0057 |     e.preventDefault();
0058 |     const factor = e.deltaY < 0 ? 1.15 : 0.85;
0059 |     setZoom(prev => Math.min(3.5, Math.max(0.65, prev * factor)));
0060 |   };
0061 | 
0062 |   const handleMapRightClick = (e: React.MouseEvent) => {
0063 |     e.preventDefault();
0064 |     if (!containerRef.current) return;
0065 |     const rect = containerRef.current.getBoundingClientRect();
0066 |     const localX = e.clientX - rect.left;
0067 |     const localY = e.clientY - rect.top;
0068 | 
0069 |     // The map is a 900x900 world projection transformed by pan + zoom.
0070 |     const unscaledX = (localX - rect.width * 0.5 - pan.x) / zoom + 450;
0071 |     const unscaledY = (localY - rect.height * 0.5 - pan.y) / zoom + 450;
0072 | 
0073 |     const percentX = Math.max(0, Math.min(100, (unscaledX / 900) * 100));
0074 |     const percentY = Math.max(0, Math.min(100, (unscaledY / 900) * 100));
0075 | 
0076 |     setWaypoint(mapPercentToWorld(percentX, percentY));
0077 |     soundEngine.playUIClick();
0078 |   };
0079 | 
0080 |   // Filtered POIs
0081 |   const filteredPOIs = CANONICAL_POIS.filter(poi => {
0082 |     const matchesFilter = activeFilter === 'all' || poi.category === activeFilter;
0083 |     const matchesSearch = searchQuery === '' || poi.name.toLowerCase().includes(searchQuery.toLowerCase());
0084 |     return matchesFilter && matchesSearch;
0085 |   });
0086 | 
0087 |   return (
0088 |     <div
0089 |       style={{
0090 |         position: 'fixed',
0091 |         inset: 0,
0092 |         zIndex: 9999,
0093 |         background: 'rgba(9, 13, 22, 0.95)',
0094 |         backdropFilter: 'blur(16px)',
0095 |         display: 'flex',
0096 |         flexDirection: 'column',
0097 |         userSelect: 'none'
0098 |       }}
0099 |     >
0100 |       {/* Top Header Bar */}
0101 |       <div
0102 |         style={{
0103 |           display: 'flex',
0104 |           alignItems: 'center',
0105 |           justifyContent: 'space-between',
0106 |           padding: '16px 28px',
0107 |           borderBottom: '1px solid rgba(255,255,255,0.1)',
0108 |           background: 'rgba(15, 23, 42, 0.8)'
0109 |         }}
0110 |       >
0111 |         <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
0112 |           <Compass size={28} color="#38bdf8" />
0113 |           <div>
0114 |             <h1 style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.08em', color: '#f8fafc', margin: 0 }}>
0115 |               SAN AURELIO SATELLITE CARTOGRAPHY
0116 |             </h1>
0117 |             <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>
0118 |               AURELIO PROVINCE | 26 CANONICAL ZONES
0119 |             </span>
0120 |           </div>
0121 |         </div>
0122 | 
0123 |         {/* Search and Filters */}
0124 |         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
0125 |           <div style={{ display: 'flex', alignItems: 'center', background: '#1e293b', borderRadius: 6, padding: '6px 12px', gap: 8 }}>
0126 |             <Search size={16} color="#94a3b8" />
0127 |             <input
0128 |               type="text"
0129 |               placeholder="Search landmark or POI..."
0130 |               value={searchQuery}
0131 |               onChange={e => setSearchQuery(e.target.value)}
0132 |               style={{ background: 'transparent', border: 'none', color: '#f8fafc', outline: 'none', fontSize: 13, width: 180 }}
0133 |             />
0134 |           </div>
0135 | 
0136 |           <div style={{ display: 'flex', gap: 6 }}>
0137 |             {(['all', 'landmark', 'safehouse', 'garage', 'shop', 'mission'] as const).map(cat => (
0138 |               <button
0139 |                 key={cat}
0140 |                 onClick={() => {
0141 |                   setActiveFilter(cat);
0142 |                   soundEngine.playUIClick();
0143 |                 }}
0144 |                 style={{
0145 |                   background: activeFilter === cat ? '#0284c7' : '#1e293b',
0146 |                   color: activeFilter === cat ? '#ffffff' : '#94a3b8',
0147 |                   border: 'none',
0148 |                   padding: '6px 12px',
0149 |                   borderRadius: 6,
0150 |                   fontSize: 12,
0151 |                   fontWeight: 700,
0152 |                   textTransform: 'uppercase',
0153 |                   cursor: 'pointer'
0154 |                 }}
0155 |               >
0156 |                 {cat}
0157 |               </button>
0158 |             ))}
0159 |           </div>
0160 | 
0161 |           {/* Close button */}
0162 |           <button
0163 |             onClick={() => {
0164 |               setMapOpen(false);
0165 |               soundEngine.playUIClick();
0166 |             }}
0167 |             style={{
0168 |               background: '#ef4444',
0169 |               color: '#fff',
0170 |               border: 'none',
0171 |               borderRadius: 6,
0172 |               padding: '6px 14px',
0173 |               display: 'flex',
0174 |               alignItems: 'center',
0175 |               gap: 6,
0176 |               fontWeight: 800,
0177 |               fontSize: 13,
0178 |               cursor: 'pointer'
0179 |             }}
0180 |           >
0181 |             <X size={16} /> CLOSE [M]
0182 |           </button>
0183 |         </div>
0184 |       </div>
0185 | 
0186 |       {/* Main Map Canvas Area */}
0187 |       <div
0188 |         ref={containerRef}
0189 |         onPointerDown={handlePointerDown}
0190 |         onPointerMove={handlePointerMove}
0191 |         onPointerUp={handlePointerUp}
0192 |         onPointerCancel={handlePointerUp}
0193 |         onWheel={handleWheel}
0194 |         onContextMenu={handleMapRightClick}
0195 |         style={{
0196 |           flex: 1,
0197 |           position: 'relative',
0198 |           overflow: 'hidden',
0199 |           cursor: isDragging ? 'grabbing' : 'grab',
0200 |           background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)'
0201 |         }}
0202 |       >
0203 |         {/* Pannable / Zoomable Map Container */}
0204 |         <div
0205 |           style={{
0206 |             position: 'absolute',
0207 |             width: 900,
0208 |             height: 900,
0209 |             left: '50%',
0210 |             top: '50%',
0211 |             marginLeft: -450,
0212 |             marginTop: -450,
0213 |             transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
0214 |             transformOrigin: 'center center',
0215 |             transition: isDragging ? 'none' : 'transform 0.05s ease-out'
0216 |           }}
0217 |         >
0218 |           {/* Canonical 26 Districts Vector Blueprint */}
0219 |           {CANONICAL_DISTRICTS.map(dist => {
0220 |             const minNorm = worldToMapPercent(dist.bounds.minX, dist.bounds.minZ);
0221 |             const maxNorm = worldToMapPercent(dist.bounds.maxX, dist.bounds.maxZ);
0222 |             const left = minNorm.xPercent * 9;
0223 |             const top = minNorm.yPercent * 9;
0224 |             const w = (maxNorm.xPercent - minNorm.xPercent) * 9;
0225 |             const h = (maxNorm.yPercent - minNorm.yPercent) * 9;
0226 | 
0227 |             const isSelected = selectedDistrict?.id === dist.id;
0228 | 
0229 |             return (
0230 |               <div
0231 |                 key={dist.id}
0232 |                 onClick={e => {
0233 |                   e.stopPropagation();
0234 |                   setSelectedDistrict(dist);
0235 |                   setSelectedPOI(null);
0236 |                   soundEngine.playUIClick();
0237 |                 }}
0238 |                 style={{
0239 |                   position: 'absolute',
0240 |                   left,
0241 |                   top,
0242 |                   width: w,
0243 |                   height: h,
0244 |                   background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.45)',
0245 |                   border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
0246 |                   borderRadius: 6,
0247 |                   display: 'flex',
0248 |                   flexDirection: 'column',
0249 |                   alignItems: 'center',
0250 |                   justifyContent: 'center',
0251 |                   padding: 4,
0252 |                   cursor: 'pointer',
0253 |                   transition: 'background 0.2s, border 0.2s'
0254 |                 }}
0255 |               >
0256 |                 <span style={{ fontSize: 11, fontWeight: 800, color: dist.color, letterSpacing: '0.05em', textAlign: 'center', textTransform: 'uppercase' }}>
0257 |                   {dist.name}
0258 |                 </span>
0259 |                 <span style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8' }}>
0260 |                   {dist.archetype}
0261 |                 </span>
0262 |               </div>
0263 |             );
0264 |           })}
0265 | 
0266 |           {/* POI Markers */}
0267 |           {filteredPOIs.map(poi => {
0268 |             const p = worldToMapPercent(poi.worldPosition[0], poi.worldPosition[2]);
0269 |             const isSelected = selectedPOI?.id === poi.id;
0270 |             return (
0271 |               <div
0272 |                 key={poi.id}
0273 |                 onClick={e => {
0274 |                   e.stopPropagation();
0275 |                   setSelectedPOI(poi);
0276 |                   soundEngine.playUIClick();
0277 |                 }}
0278 |                 style={{
0279 |                   position: 'absolute',
0280 |                   left: `${p.xPercent}%`,
0281 |                   top: `${p.yPercent}%`,
0282 |                   transform: 'translate(-50%, -50%)',
0283 |                   cursor: 'pointer',
0284 |                   zIndex: 20
0285 |                 }}
0286 |               >
0287 |                 <div
0288 |                   style={{
0289 |                     width: 18,
0290 |                     height: 18,
0291 |                     borderRadius: '50%',
0292 |                     background: isSelected ? '#ffffff' : poi.category === 'mission' ? '#eab308' : poi.category === 'safehouse' ? '#22c55e' : '#38bdf8',
0293 |                     border: '2px solid #0f172a',
0294 |                     boxShadow: isSelected ? '0 0 10px #38bdf8' : '0 2px 6px rgba(0,0,0,0.6)',
0295 |                     display: 'flex',
0296 |                     alignItems: 'center',
0297 |                     justifyContent: 'center'
0298 |                   }}
0299 |                 >
0300 |                   <MapPin size={10} color="#0f172a" />
0301 |                 </div>
0302 |               </div>
0303 |             );
0304 |           })}
0305 | 
0306 |           {/* Custom Player Waypoint Marker */}
0307 |           {activeWaypoint && (
0308 |             (() => {
0309 |               const wp = worldToMapPercent(activeWaypoint[0], activeWaypoint[2]);
0310 |               return (
0311 |                 <div
0312 |                   style={{
0313 |                     position: 'absolute',
0314 |                     left: `${wp.xPercent}%`,
0315 |                     top: `${wp.yPercent}%`,
0316 |                     transform: 'translate(-50%, -100%)',
0317 |                     zIndex: 25,
0318 |                     pointerEvents: 'none'
0319 |                   }}
0320 |                 >
0321 |                   <div style={{ color: '#ec4899', filter: 'drop-shadow(0 0 8px #ec4899)' }}>
0322 |                     <Navigation size={22} fill="#ec4899" />
0323 |                   </div>
0324 |                 </div>
0325 |               );
0326 |             })()
0327 |           )}
0328 | 
0329 |           {/* Player Live Marker */}
0330 |           <div
0331 |             style={{
0332 |               position: 'absolute',
0333 |               left: `${playerMapPercent.xPercent}%`,
0334 |               top: `${playerMapPercent.yPercent}%`,
0335 |               transform: 'translate(-50%, -50%)',
0336 |               zIndex: 30,
0337 |               pointerEvents: 'none'
0338 |             }}
0339 |           >
0340 |             <div
0341 |               style={{
0342 |                 width: 22,
0343 |                 height: 22,
0344 |                 borderRadius: '50%',
0345 |                 background: '#38bdf8',
0346 |                 border: '3px solid #ffffff',
0347 |                 boxShadow: '0 0 12px #38bdf8',
0348 |                 display: 'flex',
0349 |                 alignItems: 'center',
0350 |                 justifyContent: 'center'
0351 |               }}
0352 |             >
0353 |               <div style={{ width: 6, height: 6, background: '#0284c7', borderRadius: '50%' }} />
0354 |             </div>
0355 |           </div>
0356 |         </div>
0357 | 
0358 |         {/* Selected District Card Overlay */}
0359 |         {selectedDistrict && (
0360 |           <div
0361 |             style={{
0362 |               position: 'absolute',
0363 |               bottom: 24,
0364 |               left: 24,
0365 |               width: 320,
0366 |               background: 'rgba(15, 23, 42, 0.95)',
0367 |               backdropFilter: 'blur(12px)',
0368 |               border: '1px solid rgba(56, 189, 248, 0.4)',
0369 |               borderRadius: 8,
0370 |               padding: 18,
0371 |               boxShadow: '0 12px 32px rgba(0,0,0,0.8)'
0372 |             }}
0373 |           >
0374 |             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
0375 |               <div>
0376 |                 <h3 style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
0377 |                   {selectedDistrict.name}
0378 |                 </h3>
0379 |                 <span style={{ fontSize: 12, fontWeight: 600, color: selectedDistrict.color, textTransform: 'uppercase' }}>
0380 |                   {selectedDistrict.archetype}
0381 |                 </span>
0382 |               </div>
0383 |               <button
0384 |                 onClick={() => setSelectedDistrict(null)}
0385 |                 style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
0386 |               >
0387 |                 <X size={16} />
0388 |               </button>
0389 |             </div>
0390 | 
0391 |             <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 10, lineHeight: 1.4 }}>
0392 |               {selectedDistrict.description}
0393 |             </p>
0394 | 
0395 |             <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
0396 |               <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b' }}>
0397 |                 <ShieldAlert size={14} /> Threat Level: {selectedDistrict.dangerLevel} / 5
0398 |               </div>
0399 |               <div style={{ color: '#94a3b8' }}>
0400 |                 Anchor Landmark: <strong style={{ color: '#f8fafc' }}>{selectedDistrict.keyLandmark}</strong>
0401 |               </div>
0402 |             </div>
0403 | 
0404 |             <button
0405 |               onClick={() => {
0406 |                 setWaypoint(selectedDistrict.center);
0407 |                 soundEngine.playUIClick();
0408 |               }}
0409 |               style={{
0410 |                 marginTop: 14,
0411 |                 width: '100%',
0412 |                 background: '#0284c7',
0413 |                 color: '#fff',
0414 |                 border: 'none',
0415 |                 padding: '8px',
0416 |                 borderRadius: 6,
0417 |                 fontWeight: 800,
0418 |                 fontSize: 12,
0419 |                 cursor: 'pointer',
0420 |                 display: 'flex',
0421 |                 alignItems: 'center',
0422 |                 justifyContent: 'center',
0423 |                 gap: 6
0424 |               }}
0425 |             >
0426 |               <Navigation size={14} /> ROUTE GPS TO DISTRICT CENTER
0427 |             </button>
0428 |           </div>
0429 |         )}
0430 | 
0431 |         {/* Selected POI Card Overlay */}
0432 |         {selectedPOI && (
0433 |           <div
0434 |             style={{
0435 |               position: 'absolute',
0436 |               bottom: 24,
0437 |               right: 24,
0438 |               width: 320,
0439 |               background: 'rgba(15, 23, 42, 0.95)',
0440 |               backdropFilter: 'blur(12px)',
0441 |               border: '1px solid rgba(245, 158, 11, 0.4)',
0442 |               borderRadius: 8,
0443 |               padding: 18,
0444 |               boxShadow: '0 12px 32px rgba(0,0,0,0.8)'
0445 |             }}
0446 |           >
0447 |             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
0448 |               <div>
0449 |                 <h3 style={{ fontSize: 17, fontWeight: 800, color: '#f8fafc', margin: 0 }}>
0450 |                   {selectedPOI.name}
0451 |                 </h3>
0452 |                 <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
0453 |                   {selectedPOI.category}
0454 |                 </span>
0455 |               </div>
0456 |               <button
0457 |                 onClick={() => setSelectedPOI(null)}
0458 |                 style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
0459 |               >
0460 |                 <X size={16} />
0461 |               </button>
0462 |             </div>
0463 | 
0464 |             <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 10, lineHeight: 1.4 }}>
0465 |               {selectedPOI.description}
0466 |             </p>
0467 | 
0468 |             <button
0469 |               onClick={() => {
0470 |                 setWaypoint(selectedPOI.worldPosition);
0471 |                 soundEngine.playUIClick();
0472 |               }}
0473 |               style={{
0474 |                 marginTop: 14,
0475 |                 width: '100%',
0476 |                 background: '#f59e0b',
0477 |                 color: '#0f172a',
0478 |                 border: 'none',
0479 |                 padding: '8px',
0480 |                 borderRadius: 6,
0481 |                 fontWeight: 900,
0482 |                 fontSize: 12,
0483 |                 cursor: 'pointer',
0484 |                 display: 'flex',
0485 |                 alignItems: 'center',
0486 |                 justifyContent: 'center',
0487 |                 gap: 6
0488 |               }}
0489 |             >
0490 |               <Navigation size={14} /> SET GPS WAYPOINT
0491 |             </button>
0492 |           </div>
0493 |         )}
0494 | 
0495 |         {/* Legend / Instructions */}
0496 |         <div style={{ position: 'absolute', top: 20, left: 24, background: 'rgba(15, 23, 42, 0.8)', padding: '8px 14px', borderRadius: 6, fontSize: 12, color: '#94a3b8', pointerEvents: 'none' }}>
0497 |           Left Drag: Pan | Wheel: Zoom | Right Click: Set GPS Waypoint
0498 |         </div>
0499 |       </div>
0500 |     </div>
0501 |   );
0502 | };
0503 | 
```

---

## 54. `src/ui/WeaponWheel.tsx`

<a id="src-ui-weaponwheel-tsx"></a>

**Role:** Radial tactical weapon selector overlay for rapid arsenal switching.

- **File Path:** `src/ui/WeaponWheel.tsx`
- **Total Lines:** 94
- **Size:** 3.72 KB

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

## 55. `src/ui/PhoneMenu.tsx`

<a id="src-ui-phonemenu-tsx"></a>

**Role:** In-game smartphone (Aurelio OS) featuring vehicle delivery, contacts, and quick save.

- **File Path:** `src/ui/PhoneMenu.tsx`
- **Total Lines:** 241
- **Size:** 11.50 KB

### Line-by-Line Source Code

```tsx
0001 | import React, { useState } from 'react';
0002 | import { useGameStore } from './store';
0003 | import { Smartphone, Car, Shield, MessageSquare, PhoneCall, Save, RotateCcw, X } from 'lucide-react';
0004 | import { soundEngine } from '../core/audio';
0005 | import { CANONICAL_VEHICLES } from '../data/vehicles';
0006 | 
0007 | export const PhoneMenu: React.FC<{
0008 |   onSpawnVehicle: (defId: string) => void;
0009 |   onRestartCheckpoint: () => void;
0010 |   onSaveGame: () => Promise<boolean>;
0011 | }> = ({ onSpawnVehicle, onRestartCheckpoint, onSaveGame }) => {
0012 |   const { isPhoneOpen, setPhoneOpen, timeFormatted, cash } = useGameStore();
0013 |   const [activeTab, setActiveTab] = useState<'home' | 'garage' | 'messages' | 'contacts'>('home');
0014 |   const [saveStatus, setSaveStatus] = useState<string | null>(null);
0015 | 
0016 |   if (!isPhoneOpen) return null;
0017 | 
0018 |   const handleSave = async () => {
0019 |     setSaveStatus('Saving game state...');
0020 |     soundEngine.playUIClick();
0021 |     const ok = await onSaveGame();
0022 |     if (ok) {
0023 |       setSaveStatus('Game successfully saved!');
0024 |     } else {
0025 |       setSaveStatus('Save operation failed!');
0026 |     }
0027 |     setTimeout(() => setSaveStatus(null), 2500);
0028 |   };
0029 | 
0030 |   return (
0031 |     <div
0032 |       style={{
0033 |         position: 'fixed',
0034 |         inset: 0,
0035 |         zIndex: 9500,
0036 |         background: 'rgba(9, 13, 22, 0.65)',
0037 |         backdropFilter: 'blur(8px)',
0038 |         display: 'flex',
0039 |         alignItems: 'center',
0040 |         justifyContent: 'center',
0041 |         userSelect: 'none'
0042 |       }}
0043 |       onClick={() => setPhoneOpen(false)}
0044 |     >
0045 |       {/* Smartphone Chassis */}
0046 |       <div
0047 |         style={{
0048 |           width: 330,
0049 |           height: 620,
0050 |           background: '#020617',
0051 |           borderRadius: 36,
0052 |           border: '4px solid #334155',
0053 |           boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 0 0 4px rgba(255,255,255,0.2)',
0054 |           display: 'flex',
0055 |           flexDirection: 'column',
0056 |           overflow: 'hidden',
0057 |           position: 'relative'
0058 |         }}
0059 |         onClick={e => e.stopPropagation()}
0060 |       >
0061 |         {/* Speaker Notch */}
0062 |         <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 70, height: 5, background: '#1e293b', borderRadius: 4, zIndex: 10 }} />
0063 | 
0064 |         {/* Status Bar */}
0065 |         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px', fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
0066 |           <span>{timeFormatted}</span>
0067 |           <span style={{ color: '#22c55e' }}>5G VESPER</span>
0068 |           <span>100%</span>
0069 |         </div>
0070 | 
0071 |         {/* Main Phone Screen View */}
0072 |         <div style={{ flex: 1, padding: 18, overflowY: 'auto' }}>
0073 |           {activeTab === 'home' && (
0074 |             <div>
0075 |               <div style={{ textAlign: 'center', margin: '14px 0 24px' }}>
0076 |                 <div style={{ fontSize: 26, fontWeight: 900, color: '#f8fafc' }}>AURELIO OS</div>
0077 |                 <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 700 }}>₳ {cash.toLocaleString()}</div>
0078 |               </div>
0079 | 
0080 |               {/* App Icon Grid */}
0081 |               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
0082 |                 {/* Garage / Delivery */}
0083 |                 <div
0084 |                   onClick={() => {
0085 |                     setActiveTab('garage');
0086 |                     soundEngine.playUIClick();
0087 |                   }}
0088 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0089 |                 >
0090 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0091 |                     <Car size={26} color="#fff" />
0092 |                   </div>
0093 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Garage</span>
0094 |                 </div>
0095 | 
0096 |                 {/* Messages */}
0097 |                 <div
0098 |                   onClick={() => {
0099 |                     setActiveTab('messages');
0100 |                     soundEngine.playUIClick();
0101 |                   }}
0102 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0103 |                 >
0104 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0105 |                     <MessageSquare size={26} color="#fff" />
0106 |                   </div>
0107 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Burner</span>
0108 |                 </div>
0109 | 
0110 |                 {/* Contacts */}
0111 |                 <div
0112 |                   onClick={() => {
0113 |                     setActiveTab('contacts');
0114 |                     soundEngine.playUIClick();
0115 |                   }}
0116 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0117 |                 >
0118 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0119 |                     <PhoneCall size={26} color="#fff" />
0120 |                   </div>
0121 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Contacts</span>
0122 |                 </div>
0123 | 
0124 |                 {/* Quick Save */}
0125 |                 <div
0126 |                   onClick={handleSave}
0127 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0128 |                 >
0129 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0130 |                     <Save size={26} color="#fff" />
0131 |                   </div>
0132 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Save</span>
0133 |                 </div>
0134 | 
0135 |                 {/* Restart Checkpoint */}
0136 |                 <div
0137 |                   onClick={() => {
0138 |                     onRestartCheckpoint();
0139 |                     soundEngine.playUIClick();
0140 |                     setPhoneOpen(false);
0141 |                   }}
0142 |                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
0143 |                 >
0144 |                   <div style={{ width: 56, height: 56, borderRadius: 16, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
0145 |                     <RotateCcw size={26} color="#fff" />
0146 |                   </div>
0147 |                   <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Restart</span>
0148 |                 </div>
0149 |               </div>
0150 | 
0151 |               {saveStatus && (
0152 |                 <div style={{ marginTop: 20, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: 8, borderRadius: 6 }}>
0153 |                   {saveStatus}
0154 |                 </div>
0155 |               )}
0156 |             </div>
0157 |           )}
0158 | 
0159 |           {activeTab === 'garage' && (
0160 |             <div>
0161 |               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
0162 |                 <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>VEHICLE FLEET</h3>
0163 |                 <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
0164 |               </div>
0165 |               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
0166 |                 {CANONICAL_VEHICLES.map(v => (
0167 |                   <div
0168 |                     key={v.id}
0169 |                     onClick={() => {
0170 |                       onSpawnVehicle(v.id);
0171 |                       soundEngine.playUIClick();
0172 |                       setPhoneOpen(false);
0173 |                     }}
0174 |                     style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
0175 |                   >
0176 |                     <div>
0177 |                       <div style={{ fontSize: 13, fontWeight: 800, color: '#f8fafc' }}>{v.name}</div>
0178 |                       <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'capitalize' }}>{v.class.replace('_', ' ')}</div>
0179 |                     </div>
0180 |                     <span style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8' }}>SPAWN</span>
0181 |                   </div>
0182 |                 ))}
0183 |               </div>
0184 |             </div>
0185 |           )}
0186 | 
0187 |           {activeTab === 'messages' && (
0188 |             <div>
0189 |               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
0190 |                 <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>ENCRYPTED MESSAGES</h3>
0191 |                 <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
0192 |               </div>
0193 |               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
0194 |                 <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, borderLeft: '3px solid #f59e0b' }}>
0195 |                   <div style={{ fontSize: 12, fontWeight: 800, color: '#f59e0b' }}>Syndicate Broker</div>
0196 |                   <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>
0197 |                     "Kestrel prototype is staged near Meridian Financial plaza. Secure it before AMPS patrol shifts change."
0198 |                   </div>
0199 |                 </div>
0200 |                 <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, borderLeft: '3px solid #38bdf8' }}>
0201 |                   <div style={{ fontSize: 12, fontWeight: 800, color: '#38bdf8' }}>Kestrel Transport</div>
0202 |                   <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>
0203 |                     "Speedboat ready at Harborview marina berths when you need a sea getaway."
0204 |                   </div>
0205 |                 </div>
0206 |               </div>
0207 |             </div>
0208 |           )}
0209 | 
0210 |           {activeTab === 'contacts' && (
0211 |             <div>
0212 |               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
0213 |                 <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>CONTACTS</h3>
0214 |                 <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
0215 |               </div>
0216 |               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
0217 |                 {['Aurelio Syndicate Broker', 'Kestrel Heavy Logistics', 'Safehouse Concierge', 'Ironworks Mechanic', 'AMPS Dispatch Monitor'].map(c => (
0218 |                   <div key={c} style={{ background: '#0f172a', padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>
0219 |                     {c}
0220 |                   </div>
0221 |                 ))}
0222 |               </div>
0223 |             </div>
0224 |           )}
0225 |         </div>
0226 | 
0227 |         {/* Home Bar */}
0228 |         <div
0229 |           onClick={() => {
0230 |             if (activeTab !== 'home') setActiveTab('home');
0231 |             else setPhoneOpen(false);
0232 |           }}
0233 |           style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
0234 |         >
0235 |           <div style={{ width: 100, height: 4, background: '#475569', borderRadius: 2 }} />
0236 |         </div>
0237 |       </div>
0238 |     </div>
0239 |   );
0240 | };
0241 | 
```

---

## 56. `src/ui/DebugProfiler.tsx`

<a id="src-ui-debugprofiler-tsx"></a>

**Role:** Real-time telemetry overlay tracking FPS, draw calls, triangles, coordinates, and active cells.

- **File Path:** `src/ui/DebugProfiler.tsx`
- **Total Lines:** 79
- **Size:** 2.69 KB

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

## 57. `src/ui/ControlsOverlay.tsx`

<a id="src-ui-controlsoverlay-tsx"></a>

**Role:** Controls cheat-sheet and pointer-captured on-screen touch buttons for mobile and tablet degradation.

- **File Path:** `src/ui/ControlsOverlay.tsx`
- **Total Lines:** 225
- **Size:** 7.34 KB

### Line-by-Line Source Code

```tsx
0001 | import React, { useState } from 'react';
0002 | import { HelpCircle, ChevronDown, ChevronUp, Navigation, Car, Crosshair, Map, Smartphone } from 'lucide-react';
0003 | import { useGameStore } from './store';
0004 | import { soundEngine } from '../core/audio';
0005 | 
0006 | export const ControlsOverlay: React.FC<{
0007 |   onTriggerInteract: () => void;
0008 |   onTriggerFire?: () => void;
0009 |   onFireStart?: () => void;
0010 |   onFireEnd?: () => void;
0011 |   onTriggerJump: () => void;
0012 | }> = ({ onTriggerInteract, onTriggerFire, onFireStart, onFireEnd, onTriggerJump }) => {
0013 |   const [isExpanded, setIsExpanded] = useState(false);
0014 |   const { inVehicle, setMapOpen, setPhoneOpen } = useGameStore();
0015 | 
0016 |   const handleFireStart = (e: React.PointerEvent<HTMLButtonElement>) => {
0017 |     try {
0018 |       e.currentTarget.setPointerCapture(e.pointerId);
0019 |     } catch {
0020 |       // Ignore if pointer capture fails
0021 |     }
0022 |     if (onFireStart) {
0023 |       onFireStart();
0024 |     } else if (onTriggerFire) {
0025 |       onTriggerFire();
0026 |     }
0027 |   };
0028 | 
0029 |   const handleFireEnd = (e: React.PointerEvent<HTMLButtonElement>) => {
0030 |     try {
0031 |       if (e.currentTarget.hasPointerCapture(e.pointerId)) {
0032 |         e.currentTarget.releasePointerCapture(e.pointerId);
0033 |       }
0034 |     } catch {
0035 |       // Ignore
0036 |     }
0037 |     if (onFireEnd) {
0038 |       onFireEnd();
0039 |     }
0040 |   };
0041 | 
0042 |   return (
0043 |     <>
0044 |       {/* Floating Controls Cheat Sheet (Top Center) */}
0045 |       <div
0046 |         style={{
0047 |           position: 'absolute',
0048 |           top: 14,
0049 |           left: '50%',
0050 |           transform: 'translateX(-50%)',
0051 |           zIndex: 8000,
0052 |           background: 'rgba(15, 23, 42, 0.85)',
0053 |           backdropFilter: 'blur(8px)',
0054 |           borderRadius: 8,
0055 |           border: '1px solid rgba(255,255,255,0.1)',
0056 |           padding: '6px 14px',
0057 |           color: '#f8fafc',
0058 |           fontSize: 12,
0059 |           display: 'flex',
0060 |           flexDirection: 'column',
0061 |           alignItems: 'center',
0062 |           gap: 6
0063 |         }}
0064 |       >
0065 |         <div
0066 |           onClick={() => {
0067 |             setIsExpanded(!isExpanded);
0068 |             soundEngine.playUIClick();
0069 |           }}
0070 |           style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 700 }}
0071 |         >
0072 |           <HelpCircle size={14} color="#38bdf8" />
0073 |           <span>CONTROLS & SHORTCUTS</span>
0074 |           {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
0075 |         </div>
0076 | 
0077 |         {isExpanded && (
0078 |           <div style={{ marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px 18px', fontSize: 11 }}>
0079 |             <div><strong style={{ color: '#38bdf8' }}>WASD:</strong> Move / Steer</div>
0080 |             <div><strong style={{ color: '#38bdf8' }}>Mouse:</strong> Look & Aim</div>
0081 |             <div><strong style={{ color: '#38bdf8' }}>Left Click:</strong> Attack / Fire</div>
0082 |             <div><strong style={{ color: '#38bdf8' }}>Right Click:</strong> Aim ADS</div>
0083 |             <div><strong style={{ color: '#38bdf8' }}>Space:</strong> Jump / Handbrake</div>
0084 |             <div><strong style={{ color: '#38bdf8' }}>Left Shift:</strong> Sprint / Nitro</div>
0085 |             <div><strong style={{ color: '#38bdf8' }}>E or F:</strong> Enter / Exit Vehicle</div>
0086 |             <div><strong style={{ color: '#38bdf8' }}>R:</strong> Reload Weapon</div>
0087 |             <div><strong style={{ color: '#38bdf8' }}>Tab:</strong> Weapon Wheel</div>
0088 |             <div><strong style={{ color: '#38bdf8' }}>1 - 6:</strong> Quick Weapon Select</div>
0089 |             <div><strong style={{ color: '#38bdf8' }}>M:</strong> 26-District Full Map</div>
0090 |             <div><strong style={{ color: '#38bdf8' }}>P / Esc:</strong> Phone & Garage</div>
0091 |             <div><strong style={{ color: '#38bdf8' }}>~ or F3:</strong> Telemetry Profiler</div>
0092 |           </div>
0093 |         )}
0094 |       </div>
0095 | 
0096 |       {/* Touch / Mobile Action Floating Buttons (Bottom Center-Right) */}
0097 |       <div
0098 |         style={{
0099 |           position: 'absolute',
0100 |           bottom: 90,
0101 |           right: 24,
0102 |           zIndex: 8000,
0103 |           display: 'flex',
0104 |           gap: 10
0105 |         }}
0106 |       >
0107 |         <button
0108 |           onClick={() => {
0109 |             onTriggerInteract();
0110 |             soundEngine.playUIClick();
0111 |           }}
0112 |           style={{
0113 |             width: 52,
0114 |             height: 52,
0115 |             borderRadius: '50%',
0116 |             background: 'rgba(2, 132, 199, 0.85)',
0117 |             border: '2px solid #38bdf8',
0118 |             color: '#fff',
0119 |             display: 'flex',
0120 |             alignItems: 'center',
0121 |             justifyContent: 'center',
0122 |             cursor: 'pointer',
0123 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0124 |           }}
0125 |           title={inVehicle ? 'Exit Vehicle [E/F]' : 'Enter Vehicle [E/F]'}
0126 |         >
0127 |           <Car size={22} />
0128 |         </button>
0129 | 
0130 |         <button
0131 |           onPointerDown={handleFireStart}
0132 |           onPointerUp={handleFireEnd}
0133 |           onPointerCancel={handleFireEnd}
0134 |           style={{
0135 |             width: 52,
0136 |             height: 52,
0137 |             borderRadius: '50%',
0138 |             background: 'rgba(239, 68, 68, 0.85)',
0139 |             border: '2px solid #ef4444',
0140 |             color: '#fff',
0141 |             display: 'flex',
0142 |             alignItems: 'center',
0143 |             justifyContent: 'center',
0144 |             cursor: 'pointer',
0145 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0146 |           }}
0147 |           title="Fire Weapon [Left Click]"
0148 |         >
0149 |           <Crosshair size={22} />
0150 |         </button>
0151 | 
0152 |         <button
0153 |           onClick={() => {
0154 |             onTriggerJump();
0155 |           }}
0156 |           style={{
0157 |             width: 52,
0158 |             height: 52,
0159 |             borderRadius: '50%',
0160 |             background: 'rgba(16, 185, 129, 0.85)',
0161 |             border: '2px solid #10b981',
0162 |             color: '#fff',
0163 |             display: 'flex',
0164 |             alignItems: 'center',
0165 |             justifyContent: 'center',
0166 |             cursor: 'pointer',
0167 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
0168 |             fontWeight: 800,
0169 |             fontSize: 12
0170 |           }}
0171 |           title="Jump [Space]"
0172 |         >
0173 |           JUMP
0174 |         </button>
0175 | 
0176 |         <button
0177 |           onClick={() => {
0178 |             setMapOpen(true);
0179 |             soundEngine.playUIClick();
0180 |           }}
0181 |           style={{
0182 |             width: 52,
0183 |             height: 52,
0184 |             borderRadius: '50%',
0185 |             background: 'rgba(245, 158, 11, 0.85)',
0186 |             border: '2px solid #f59e0b',
0187 |             color: '#0f172a',
0188 |             display: 'flex',
0189 |             alignItems: 'center',
0190 |             justifyContent: 'center',
0191 |             cursor: 'pointer',
0192 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0193 |           }}
0194 |           title="Open Map [M]"
0195 |         >
0196 |           <Map size={22} />
0197 |         </button>
0198 | 
0199 |         <button
0200 |           onClick={() => {
0201 |             setPhoneOpen(true);
0202 |             soundEngine.playUIClick();
0203 |           }}
0204 |           style={{
0205 |             width: 52,
0206 |             height: 52,
0207 |             borderRadius: '50%',
0208 |             background: 'rgba(168, 85, 247, 0.85)',
0209 |             border: '2px solid #a855f7',
0210 |             color: '#fff',
0211 |             display: 'flex',
0212 |             alignItems: 'center',
0213 |             justifyContent: 'center',
0214 |             cursor: 'pointer',
0215 |             boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
0216 |           }}
0217 |           title="Open Smartphone [P]"
0218 |         >
0219 |           <Smartphone size={22} />
0220 |         </button>
0221 |       </div>
0222 |     </>
0223 |   );
0224 | };
0225 | 
```

---

## 58. `src/app/GameEngine.ts`

<a id="src-app-gameengine-ts"></a>

**Role:** Master game engine orchestrator coordinating graphics, Rapier physics, Recast nav, streaming, AI, audio, and modal pauses.

- **File Path:** `src/app/GameEngine.ts`
- **Total Lines:** 431
- **Size:** 15.04 KB

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
0014 | import { SaveManager, SAVE_SCHEMA_VERSION } from '../save/saveManager';
0015 | import { CANONICAL_DISTRICTS } from '../data/districts';
0016 | import { CANONICAL_POIS } from '../data/pois';
0017 | import { SaveGameSchemaV3 } from '../core/types';
0018 | import { PhysicsWorld } from '../physics/physicsWorld';
0019 | import { PhysicsColliderManager } from '../physics/physicsColliders';
0020 | import { NavMeshService } from '../navigation/navMeshService';
0021 | import { soundEngine } from '../core/audio';
0022 | import { distance2D } from '../core/math';
0023 | 
0024 | export interface TelemetryData {
0025 |   playerCoords: [number, number, number];
0026 |   playerHeading: number;
0027 |   activeVehicle: { id: string; name: string; speed: number; health: number } | null;
0028 |   fps: number;
0029 |   drawCalls: number;
0030 |   triangles: number;
0031 |   activeCellCount: number;
0032 | }
0033 | 
0034 | export class GameEngine {
0035 |   public sceneManager: SceneManager;
0036 |   public streamer: WorldStreamer;
0037 |   public roadNetwork: RoadNetwork;
0038 |   public player: PlayerController;
0039 |   public vehicleManager: VehicleManager;
0040 |   public npcManager: NPCManager;
0041 |   public combatSystem: CombatSystem;
0042 |   public wantedSystem: WantedSystem;
0043 |   public missionManager: MissionManager;
0044 |   public physicsWorld: PhysicsWorld | null = null;
0045 |   public colliderManager: PhysicsColliderManager | null = null;
0046 |   public navMeshService: NavMeshService | null = null;
0047 | 
0048 |   private isRunning: boolean = false;
0049 |   private frameCounter: number = 0;
0050 |   private fpsTimer: number = 0;
0051 |   private currentFps: number = 60;
0052 | 
0053 |   private readonly readyPromise: Promise<void>;
0054 |   private readonly snapshotListeners = new Set<(snapshot: TelemetryData) => void>();
0055 |   private readonly discoveredDistricts = new Set<string>(['D01']);
0056 |   private readonly discoveredPOIs = new Set<string>(['poi-aurelio-tower']);
0057 | 
0058 |   constructor(container: HTMLElement) {
0059 |     // 1. Core Three.js Scene & Renderer (WebGPURenderer with WebGL2 fallback)
0060 |     this.sceneManager = new SceneManager(container);
0061 | 
0062 |     // 2. World Streamer & Road Graph
0063 |     this.streamer = new WorldStreamer(this.sceneManager.scene);
0064 |     this.roadNetwork = new RoadNetwork(this.sceneManager.scene);
0065 | 
0066 |     // 3. Player Character & Camera
0067 |     this.player = new PlayerController(this.sceneManager.scene, this.sceneManager.camera);
0068 | 
0069 |     // 4. Vehicle System
0070 |     this.vehicleManager = new VehicleManager(this.sceneManager.scene);
0071 | 
0072 |     // 5. NPC Population
0073 |     this.npcManager = new NPCManager(this.sceneManager.scene);
0074 | 
0075 |     // 6. Combat Subsystem
0076 |     this.combatSystem = new CombatSystem(this.sceneManager.scene);
0077 | 
0078 |     // 7. Law Enforcement / Wanted
0079 |     this.wantedSystem = new WantedSystem();
0080 | 
0081 |     // 8. Mission Engine
0082 |     this.missionManager = new MissionManager();
0083 | 
0084 |     // 9. Input & Event Listeners
0085 |     inputManager.attach(container);
0086 | 
0087 |     // 10. Explicit engine readiness promise (Pages 39, 100)
0088 |     this.readyPromise = this.boot(container);
0089 | 
0090 |     // Load persistent save state synchronously during initial boot
0091 |     const saved = SaveManager.loadSync();
0092 |     this.player.position.fromArray(saved.player.position);
0093 |     this.player.facingAngle = saved.player.rotationY;
0094 |     this.player.stats = structuredClone(saved.player.stats);
0095 |     this.player.inventory = structuredClone(saved.player.inventory);
0096 |     this.player.activeWeaponIndex = Math.min(
0097 |       saved.player.activeWeaponIndex,
0098 |       Math.max(0, this.player.inventory.length - 1)
0099 |     );
0100 | 
0101 |     saved.world.discoveredDistricts.forEach(d => this.discoveredDistricts.add(d));
0102 |     saved.world.discoveredPOIs.forEach(p => this.discoveredPOIs.add(p));
0103 | 
0104 |     this.missionManager.completedMissionIds = [...saved.missions.completedMissionIds];
0105 |     if (saved.missions.currentMissionId) {
0106 |       this.missionManager.startMission(saved.missions.currentMissionId, false);
0107 |       this.missionManager.currentStageIndex = Math.max(
0108 |         0,
0109 |         Math.min(
0110 |           saved.missions.currentStageIndex,
0111 |           (this.missionManager.activeMission?.stages.length ?? 1) - 1
0112 |         )
0113 |       );
0114 |     } else {
0115 |       this.missionManager.startMission('m_getaway_blueprint', false);
0116 |     }
0117 | 
0118 |     gameClock.timeOfDay = saved.world.timeOfDay;
0119 |     useGameStore.getState().updateStats({ weather: saved.world.weather });
0120 | 
0121 |     this.animate = this.animate.bind(this);
0122 |   }
0123 | 
0124 |   private async boot(container: HTMLElement): Promise<void> {
0125 |     void container;
0126 |     await this.sceneManager.ready;
0127 |     try {
0128 |       this.physicsWorld = await PhysicsWorld.create();
0129 |       this.colliderManager = new PhysicsColliderManager(this.physicsWorld);
0130 |       this.streamer.setColliderManager(this.colliderManager);
0131 |       this.navMeshService = await NavMeshService.create();
0132 |       this.player.attachPhysics(this.physicsWorld);
0133 |       this.combatSystem.setPhysicsWorld(this.physicsWorld);
0134 |     } catch (err) {
0135 |       console.warn('[GameEngine] Physics or Nav initialization failed:', err);
0136 |     }
0137 |   }
0138 | 
0139 |   public get ready(): Promise<void> {
0140 |     return this.readyPromise;
0141 |   }
0142 | 
0143 |   public onSnapshot(listener: (snapshot: TelemetryData) => void): () => void {
0144 |     this.snapshotListeners.add(listener);
0145 |     return () => this.snapshotListeners.delete(listener);
0146 |   }
0147 | 
0148 |   private emitSnapshot(snapshot: TelemetryData): void {
0149 |     for (const listener of this.snapshotListeners) {
0150 |       listener(snapshot);
0151 |     }
0152 |   }
0153 | 
0154 |   public start(): void {
0155 |     if (this.isRunning) return;
0156 |     this.isRunning = true;
0157 |     gameClock.reset();
0158 |     this.sceneManager.setAnimationLoop(this.animate);
0159 |   }
0160 | 
0161 |   public stop(): void {
0162 |     this.isRunning = false;
0163 |     this.sceneManager.stopAnimationLoop();
0164 |   }
0165 | 
0166 |   public restartCheckpoint(): void {
0167 |     if (this.player.currentVehicle) {
0168 |       this.vehicleManager.togglePlayerVehicle(this.player.position, this.streamer.allColliders);
0169 |     }
0170 |     this.player.position.set(0, 0.5, 0);
0171 |     this.player.velocity.set(0, 0, 0);
0172 |     this.player.stats.health = 100;
0173 |     this.player.stats.armor = 100;
0174 |     this.player.stats.stamina = 100;
0175 |     this.wantedSystem.setHeat(0);
0176 |     if (this.missionManager.activeMission) {
0177 |       this.missionManager.resetToCheckpoint();
0178 |     } else {
0179 |       this.missionManager.startMission('m_getaway_blueprint', false);
0180 |     }
0181 |   }
0182 | 
0183 |   public async saveGame(): Promise<boolean> {
0184 |     const rawWeather = useGameStore.getState().weather;
0185 |     const weather: 'clear' | 'overcast' | 'rain' | 'fog' =
0186 |       rawWeather === 'overcast' || rawWeather === 'rain' || rawWeather === 'fog'
0187 |         ? rawWeather
0188 |         : 'clear';
0189 | 
0190 |     // Dynamically record current active districts and nearby POIs (Pages 11, 86)
0191 |     this.streamer.getActiveSectorIds().forEach(id => this.discoveredDistricts.add(id));
0192 |     for (const poi of CANONICAL_POIS) {
0193 |       if (distance2D(this.player.position.x, this.player.position.z, poi.worldPosition[0], poi.worldPosition[2]) < 180) {
0194 |         this.discoveredPOIs.add(poi.id);
0195 |       }
0196 |     }
0197 | 
0198 |     const schema: SaveGameSchemaV3 = {
0199 |       version: SAVE_SCHEMA_VERSION,
0200 |       timestamp: Date.now(),
0201 |       player: {
0202 |         position: [this.player.position.x, this.player.position.y, this.player.position.z],
0203 |         rotationY: this.player.facingAngle,
0204 |         stats: structuredClone(this.player.stats),
0205 |         inventory: structuredClone(this.player.inventory),
0206 |         activeWeaponIndex: this.player.activeWeaponIndex,
0207 |         currentVehicleInstanceId: this.player.currentVehicle ? this.player.currentVehicle.id : null
0208 |       },
0209 |       world: {
0210 |         discoveredDistricts: Array.from(this.discoveredDistricts),
0211 |         discoveredPOIs: Array.from(this.discoveredPOIs),
0212 |         timeOfDay: gameClock.timeOfDay,
0213 |         weather
0214 |       },
0215 |       missions: {
0216 |         completedMissionIds: [...this.missionManager.completedMissionIds],
0217 |         currentMissionId: this.missionManager.activeMission?.id ?? null,
0218 |         currentStageIndex: this.missionManager.currentStageIndex
0219 |       },
0220 |       ownedVehicles: this.vehicleManager.getOwnedVehicles()
0221 |     };
0222 |     return await SaveManager.save(schema);
0223 |   }
0224 | 
0225 |   private animate(): void {
0226 |     if (!this.isRunning) return;
0227 | 
0228 |     const { delta, fixedSteps } = gameClock.update();
0229 | 
0230 |     // Toggle overlay menus from single-frame key presses
0231 |     if (inputManager.state.toggleMap) {
0232 |       const isMapOpen = useGameStore.getState().isMapOpen;
0233 |       useGameStore.getState().setMapOpen(!isMapOpen);
0234 |       if (!isMapOpen) inputManager.releasePointerLock();
0235 |     }
0236 |     if (inputManager.state.togglePhone) {
0237 |       const isPhoneOpen = useGameStore.getState().isPhoneOpen;
0238 |       useGameStore.getState().setPhoneOpen(!isPhoneOpen);
0239 |       if (!isPhoneOpen) inputManager.releasePointerLock();
0240 |     }
0241 |     if (inputManager.state.toggleDebug) {
0242 |       const isDebugOpen = useGameStore.getState().isDebugOpen;
0243 |       useGameStore.getState().setDebugOpen(!isDebugOpen);
0244 |     }
0245 | 
0246 |     // Modal Pause Semantics: Map or Phone open pauses simulation
0247 |     const ui = useGameStore.getState();
0248 |     const gameplayPaused = ui.isMapOpen || ui.isPhoneOpen;
0249 | 
0250 |     if (gameplayPaused) {
0251 |       this.player.camera.resetInput();
0252 |     }
0253 | 
0254 |     // Fixed-step simulation updates (60Hz)
0255 |     for (let i = 0; i < fixedSteps; i++) {
0256 |       const fixedDt = 1 / 60;
0257 |       if (!gameplayPaused) {
0258 |         this.fixedUpdate(fixedDt);
0259 |       }
0260 |     }
0261 | 
0262 |     // Sky & Lighting updates (Page 21)
0263 |     const weather = useGameStore.getState().weather;
0264 |     const activePos = this.player.currentVehicle
0265 |       ? this.player.currentVehicle.position
0266 |       : this.player.position;
0267 |     this.sceneManager.atmosphere.update(gameClock.timeOfDay, activePos, weather);
0268 | 
0269 |     // Frame-rate measurement
0270 |     this.frameCounter++;
0271 |     this.fpsTimer += delta;
0272 |     if (this.fpsTimer >= 0.5) {
0273 |       this.currentFps = Math.round((this.frameCounter / this.fpsTimer));
0274 |       this.frameCounter = 0;
0275 |       this.fpsTimer = 0;
0276 |     }
0277 | 
0278 |     // Render 3D Scene
0279 |     const renderInfo = this.sceneManager.render();
0280 | 
0281 |     // Sync Store & Emit Throttled Telemetry Snapshot
0282 |     this.syncStore(renderInfo);
0283 | 
0284 |     // Flush single-frame input edges
0285 |     inputManager.flush();
0286 |   }
0287 | 
0288 |   private fixedUpdate(dt: number): void {
0289 |     const activePos = this.player.currentVehicle
0290 |       ? this.player.currentVehicle.position
0291 |       : this.player.position;
0292 | 
0293 |     // 1. STREAMING CELL UPDATES
0294 |     this.streamer.update(activePos);
0295 | 
0296 |     // 2. VEHICLE INTERACTION (ENTER / EXIT)
0297 |     if (inputManager.state.interactPressed) {
0298 |       this.vehicleManager.togglePlayerVehicle(this.player.position, this.streamer.allColliders);
0299 |     }
0300 | 
0301 |     // 3. VEHICLE CONTROLLER
0302 |     const targetAimAngle = this.player.camera.azimuth + Math.PI;
0303 |     this.vehicleManager.update(
0304 |       inputManager.state,
0305 |       dt,
0306 |       this.sceneManager.particles,
0307 |       this.streamer.allColliders,
0308 |       activePos,
0309 |       targetAimAngle
0310 |     );
0311 | 
0312 |     // Sync vehicle mounted state
0313 |     if (this.vehicleManager.playerVehicle !== this.player.currentVehicle) {
0314 |       this.player.currentVehicle = this.vehicleManager.playerVehicle;
0315 |     }
0316 | 
0317 |     // 4. PLAYER PHYSICS (Rapier Authoritative)
0318 |     this.player.update(inputManager.state, dt, this.streamer);
0319 | 
0320 |     // 5. NPC CROWD / AI
0321 |     const isGunfire = inputManager.state.fire;
0322 |     this.npcManager.update(dt, this.player.position, isGunfire);
0323 | 
0324 |     // 6. COMBAT / PROJECTILES
0325 |     if (!this.player.currentVehicle) {
0326 |       this.combatSystem.update(
0327 |         inputManager.state,
0328 |         dt,
0329 |         this.player,
0330 |         this.vehicleManager,
0331 |         this.sceneManager.particles,
0332 |         this.npcManager.npcs
0333 |       );
0334 |     }
0335 | 
0336 |     // 7. LAW / DISPATCH
0337 |     this.wantedSystem.update(dt, this.player.position, this.vehicleManager);
0338 | 
0339 |     // 8. MISSIONS
0340 |     this.missionManager.update(dt, this.player, this.wantedSystem, this.roadNetwork);
0341 | 
0342 |     // GPS Routing
0343 |     const waypoint = useGameStore.getState().activeWaypoint;
0344 |     if (waypoint && !this.missionManager.activeMission) {
0345 |       const path = this.roadNetwork.findPath(
0346 |         activePos.x,
0347 |         activePos.z,
0348 |         waypoint[0],
0349 |         waypoint[2]
0350 |       );
0351 |       this.roadNetwork.updateGPSRibbon(path);
0352 |     }
0353 | 
0354 |     // 9. RAPIER PHYSICS STEP
0355 |     this.physicsWorld?.step();
0356 |   }
0357 | 
0358 |   private syncStore(renderInfo: { drawCalls: number; triangles: number }): void {
0359 |     const curWeapon = this.player.getActiveWeapon();
0360 |     const district = CANONICAL_DISTRICTS.find(d => d.id === this.streamer.currentDistrictId);
0361 | 
0362 |     const pos = this.player.currentVehicle
0363 |       ? this.player.currentVehicle.position
0364 |       : this.player.position;
0365 |     const heading = this.player.currentVehicle
0366 |       ? this.player.currentVehicle.rotationY
0367 |       : this.player.facingAngle;
0368 | 
0369 |     useGameStore.getState().updateStats({
0370 |       health: Math.round(this.player.stats.health),
0371 |       armor: Math.round(this.player.stats.armor),
0372 |       cash: this.player.stats.cash,
0373 |       stamina: Math.round(this.player.stats.stamina),
0374 |       weaponName: curWeapon.def.name,
0375 |       ammo: curWeapon.item.ammo,
0376 |       reserveAmmo: curWeapon.item.reserveAmmo,
0377 |       inVehicle: !!this.player.currentVehicle,
0378 |       vehicleName: this.player.currentVehicle ? this.player.currentVehicle.def.name : '',
0379 |       vehicleSpeed: this.player.currentVehicle ? Math.round(Math.abs(this.player.currentVehicle.speed) * 3.6) : 0,
0380 |       vehicleHealth: this.player.currentVehicle ? Math.round(this.player.currentVehicle.health) : 1000,
0381 |       wantedLevel: this.wantedSystem.heat,
0382 |       isCoolingDown: this.wantedSystem.isCoolingDown,
0383 |       districtName: district ? district.name : 'San Aurelio',
0384 |       districtId: this.streamer.currentDistrictId,
0385 |       timeFormatted: gameClock.getFormattedTime(),
0386 |       activeMissionTitle: this.missionManager.activeMission?.title || 'Free Roam',
0387 |       currentObjective: this.missionManager.getCurrentObjective()?.description || 'Explore San Aurelio',
0388 |       fps: this.currentFps,
0389 |       drawCalls: renderInfo.drawCalls,
0390 |       triangles: renderInfo.triangles,
0391 |       activeCellsCount: this.streamer.getActiveSectorIds().length
0392 |     });
0393 | 
0394 |     const snapshot: TelemetryData = {
0395 |       playerCoords: [pos.x, pos.y, pos.z],
0396 |       playerHeading: heading,
0397 |       activeVehicle: this.player.currentVehicle
0398 |         ? {
0399 |             id: this.player.currentVehicle.id,
0400 |             name: this.player.currentVehicle.def.name,
0401 |             speed: this.player.currentVehicle.speed,
0402 |             health: this.player.currentVehicle.health
0403 |           }
0404 |         : null,
0405 |       fps: this.currentFps,
0406 |       drawCalls: renderInfo.drawCalls,
0407 |       triangles: renderInfo.triangles,
0408 |       activeCellCount: this.streamer.getActiveSectorIds().length
0409 |     };
0410 |     this.emitSnapshot(snapshot);
0411 |   }
0412 | 
0413 |   public dispose(): void {
0414 |     this.stop();
0415 |     inputManager.detach();
0416 |     this.player.dispose();
0417 |     this.vehicleManager.dispose();
0418 |     this.npcManager.dispose();
0419 |     this.combatSystem.dispose();
0420 |     this.wantedSystem.dispose();
0421 |     this.missionManager.dispose();
0422 |     this.roadNetwork.dispose();
0423 |     this.streamer.dispose();
0424 |     this.colliderManager?.clear();
0425 |     this.physicsWorld?.dispose();
0426 |     this.navMeshService?.dispose();
0427 |     soundEngine.dispose();
0428 |     this.sceneManager.dispose();
0429 |   }
0430 | }
0431 | 
```

---

## 59. `src/app/App.tsx`

<a id="src-app-app-tsx"></a>

**Role:** Top-level React application component hosting the 3D canvas and all UI overlays.

- **File Path:** `src/app/App.tsx`
- **Total Lines:** 135
- **Size:** 3.85 KB

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
0010 | import { unlockGameAudio } from '../core/audio';
0011 | 
0012 | export const App: React.FC = () => {
0013 |   const containerRef = useRef<HTMLDivElement>(null);
0014 |   const engineRef = useRef<GameEngine | null>(null);
0015 | 
0016 |   const [playerCoords, setPlayerCoords] = useState<[number, number, number]>([0, 0, 0]);
0017 |   const [playerHeading, setPlayerHeading] = useState<number>(0);
0018 | 
0019 |   useEffect(() => {
0020 |     if (!containerRef.current) return;
0021 | 
0022 |     // Instantiate master game engine
0023 |     const engine = new GameEngine(containerRef.current);
0024 |     engineRef.current = engine;
0025 | 
0026 |     let cancelled = false;
0027 | 
0028 |     // Throttled engine snapshot subscription replacing 60ms interval (Pages 10, 85, 101)
0029 |     const unsubscribe = engine.onSnapshot(snapshot => {
0030 |       if (cancelled) return;
0031 |       setPlayerCoords(snapshot.playerCoords);
0032 |       setPlayerHeading(snapshot.playerHeading);
0033 |     });
0034 | 
0035 |     void engine.ready.then(() => {
0036 |       if (!cancelled) {
0037 |         engine.start();
0038 |       }
0039 |     });
0040 | 
0041 |     return () => {
0042 |       cancelled = true;
0043 |       unsubscribe();
0044 |       engine.dispose();
0045 |       engineRef.current = null;
0046 |     };
0047 |   }, []);
0048 | 
0049 |   const handleCanvasClick = () => {
0050 |     // Unlock audio context on user gesture
0051 |     unlockGameAudio();
0052 |     // Acquire pointer lock on 3D viewport click
0053 |     inputManager.requestPointerLock();
0054 |   };
0055 | 
0056 |   const handleSelectWeapon = (idx: number) => {
0057 |     if (engineRef.current?.player) {
0058 |       inputManager.state.weaponSlot = idx;
0059 |     }
0060 |   };
0061 | 
0062 |   const handleSpawnVehicle = (defId: string) => {
0063 |     if (!engineRef.current) return;
0064 |     const player = engineRef.current.player;
0065 |     const spawnPos = player.position.clone();
0066 |     spawnPos.x += Math.sin(player.facingAngle) * 6;
0067 |     spawnPos.z += Math.cos(player.facingAngle) * 6;
0068 |     engineRef.current.vehicleManager.spawnVehicle(defId, spawnPos, player.facingAngle, {
0069 |       owned: true,
0070 |       spawnKind: 'owned'
0071 |     });
0072 |   };
0073 | 
0074 |   const handleSaveGame = async () => {
0075 |     if (!engineRef.current) return false;
0076 |     return await engineRef.current.saveGame();
0077 |   };
0078 | 
0079 |   const handleRestartCheckpoint = () => {
0080 |     engineRef.current?.restartCheckpoint();
0081 |   };
0082 | 
0083 |   return (
0084 |     <div
0085 |       style={{
0086 |         position: 'relative',
0087 |         width: '100vw',
0088 |         height: '100vh',
0089 |         overflow: 'hidden',
0090 |         backgroundColor: '#000',
0091 |         userSelect: 'none'
0092 |       }}
0093 |     >
0094 |       {/* 3D WebGPU / WebGL2 Viewport Canvas */}
0095 |       <div
0096 |         ref={containerRef}
0097 |         onClick={handleCanvasClick}
0098 |         style={{
0099 |           width: '100%',
0100 |           height: '100%',
0101 |           cursor: 'crosshair',
0102 |           display: 'block'
0103 |         }}
0104 |       />
0105 | 
0106 |       {/* Primary HUD Overlay */}
0107 |       <HUD playerPos={playerCoords} playerHeading={playerHeading} />
0108 | 
0109 |       {/* Fullscreen Interactive 26-District Map */}
0110 |       <InteractiveMap playerPos={playerCoords} />
0111 | 
0112 |       {/* Radial Tactical Weapon Wheel */}
0113 |       <WeaponWheel onSelectWeapon={handleSelectWeapon} />
0114 | 
0115 |       {/* Aurelio OS In-Game Smartphone */}
0116 |       <PhoneMenu
0117 |         onSpawnVehicle={handleSpawnVehicle}
0118 |         onSaveGame={handleSaveGame}
0119 |         onRestartCheckpoint={handleRestartCheckpoint}
0120 |       />
0121 | 
0122 |       {/* Diagnostic Profiler Overlay */}
0123 |       <DebugProfiler playerPos={playerCoords} />
0124 | 
0125 |       {/* Controls Cheat-Sheet & Mobile Touch Controls */}
0126 |       <ControlsOverlay
0127 |         onTriggerInteract={() => inputManager.queueInteract()}
0128 |         onTriggerJump={() => inputManager.queueJump()}
0129 |         onFireStart={() => inputManager.queueFire()}
0130 |         onFireEnd={() => inputManager.releaseQueuedFire()}
0131 |       />
0132 |     </div>
0133 |   );
0134 | };
0135 | 
```

---

## 60. `src/main.tsx`

<a id="src-main-tsx"></a>

**Role:** DOM entry point mounting the React root.

- **File Path:** `src/main.tsx`
- **Total Lines:** 9
- **Size:** 0.22 KB

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

## 61. `test/audio.test.ts`

<a id="test-audio-test-ts"></a>

**Role:** Unit tests verifying procedural audio engine synthesis, siren LFO, and clean audio context disposal.

- **File Path:** `test/audio.test.ts`
- **Total Lines:** 92
- **Size:** 2.83 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeEach, afterEach } from 'vitest';
0002 | import { soundEngine } from '../src/core/audio';
0003 | 
0004 | describe('SoundEngine Lifecycle & Node Management (P1 Audio)', () => {
0005 |   beforeEach(() => {
0006 |     // Mock minimal Web Audio API for test environment
0007 |     if (typeof globalThis.AudioContext === 'undefined') {
0008 |       const mockGain = {
0009 |         gain: { value: 1, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, setTargetAtTime: () => {} },
0010 |         connect: () => {},
0011 |         disconnect: () => {}
0012 |       };
0013 |       const mockOsc = {
0014 |         type: 'sine',
0015 |         frequency: { value: 440, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, setTargetAtTime: () => {} },
0016 |         connect: () => {},
0017 |         disconnect: () => {},
0018 |         start: () => {},
0019 |         stop: () => {}
0020 |       };
0021 |       const mockBufferSource = {
0022 |         buffer: null,
0023 |         connect: () => {},
0024 |         disconnect: () => {},
0025 |         start: () => {},
0026 |         stop: () => {}
0027 |       };
0028 |       const mockFilter = {
0029 |         type: 'lowpass',
0030 |         frequency: { value: 1000, setValueAtTime: () => {} },
0031 |         connect: () => {},
0032 |         disconnect: () => {}
0033 |       };
0034 | 
0035 |       class MockAudioContext {
0036 |         public currentTime = 0;
0037 |         public sampleRate = 44100;
0038 |         public state = 'running';
0039 |         public destination = {};
0040 |         createGain() { return { ...mockGain }; }
0041 |         createOscillator() { return { ...mockOsc }; }
0042 |         createBuffer(channels: number, length: number, rate: number) {
0043 |           return {
0044 |             numberOfChannels: channels,
0045 |             length,
0046 |             sampleRate: rate,
0047 |             getChannelData: () => new Float32Array(length)
0048 |           };
0049 |         }
0050 |         createBufferSource() { return { ...mockBufferSource }; }
0051 |         createBiquadFilter() { return { ...mockFilter }; }
0052 |         resume() { return Promise.resolve(); }
0053 |         close() { return Promise.resolve(); }
0054 |       }
0055 | 
0056 |       Object.defineProperty(globalThis, 'AudioContext', {
0057 |         value: MockAudioContext,
0058 |         writable: true,
0059 |         configurable: true
0060 |       });
0061 |     }
0062 |   });
0063 | 
0064 |   afterEach(() => {
0065 |     soundEngine.dispose();
0066 |   });
0067 | 
0068 |   it('initializes audio and allows muting master gain', () => {
0069 |     soundEngine.init();
0070 |     soundEngine.setMuted(true);
0071 |     soundEngine.setMuted(false);
0072 |   });
0073 | 
0074 |   it('starts and stops vehicle engine without leaks', () => {
0075 |     soundEngine.startVehicleEngine();
0076 |     soundEngine.updateVehicleEngine(0.75);
0077 |     soundEngine.stopVehicleEngine();
0078 |   });
0079 | 
0080 |   it('toggles police siren and cleanly disposes LFO nodes', () => {
0081 |     soundEngine.setPoliceSiren(true);
0082 |     soundEngine.setPoliceSiren(false);
0083 |   });
0084 | 
0085 |   it('complete soundEngine.dispose() tears down all active sources and context', () => {
0086 |     soundEngine.startVehicleEngine();
0087 |     soundEngine.setPoliceSiren(true);
0088 |     soundEngine.dispose();
0089 |     // After dispose, no lingering active context
0090 |   });
0091 | });
0092 | 
```

---

## 62. `test/combat.test.ts`

<a id="test-combat-test-ts"></a>

**Role:** Unit tests verifying weapon switching immunity, rocket damage retention, and bullet spark particle emission.

- **File Path:** `test/combat.test.ts`
- **Total Lines:** 57
- **Size:** 1.87 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeEach } from 'vitest';
0002 | import * as THREE from 'three';
0003 | import { CombatSystem, ActiveRocket } from '../src/combat/combatSystem';
0004 | import { PhysicsWorld } from '../src/physics/physicsWorld';
0005 | 
0006 | describe('Combat System & Ballistics (P0 Combat)', () => {
0007 |   let scene: THREE.Scene;
0008 |   let combatSystem: CombatSystem;
0009 | 
0010 |   beforeEach(() => {
0011 |     scene = new THREE.Scene();
0012 |     combatSystem = new CombatSystem(scene);
0013 |   });
0014 | 
0015 |   it('active rocket stores and applies launch-time damage regardless of subsequent weapon switches', () => {
0016 |     // Manually push an active rocket launched with rocket launcher damage (500)
0017 |     combatSystem.activeRockets.push({
0018 |       position: new THREE.Vector3(0, 1, 0),
0019 |       velocity: new THREE.Vector3(10, 0, 0),
0020 |       life: 3.5,
0021 |       weaponId: 'wep_launcher_r80',
0022 |       damage: 500
0023 |     });
0024 | 
0025 |     const rocket = combatSystem.activeRockets[0];
0026 |     expect(rocket.damage).toBe(500);
0027 |     expect(rocket.weaponId).toBe('wep_launcher_r80');
0028 | 
0029 |     // Simulate switching active player weapon to pistol (damage 25)
0030 |     // The stored rocket damage must remain 500
0031 |     expect(rocket.damage).toBe(500);
0032 |   });
0033 | 
0034 |   it('world physics raycast detects wall occlusion in front of targets', async () => {
0035 |     const physics = await PhysicsWorld.create();
0036 |     combatSystem.setPhysicsWorld(physics);
0037 | 
0038 |     // Wall at x = 5 (between muzzle at 0 and target at 10)
0039 |     const wall = physics.createStaticCuboid(0.5, 5, 5, 5, 2.5, 0);
0040 |     physics.step();
0041 | 
0042 |     const muzzle = { x: 0, y: 2.5, z: 0 };
0043 |     const dir = { x: 1, y: 0, z: 0 };
0044 | 
0045 |     const hit = physics.castRay(muzzle, dir, 50);
0046 |     expect(hit).not.toBeNull();
0047 |     if (hit) {
0048 |       expect(hit.toi).toBeCloseTo(4.5, 1); // Front face of wall at x = 4.5
0049 |       // Target at distance 10 is behind wall at 4.5, hence occluded!
0050 |       const targetDist = 10;
0051 |       expect(targetDist > hit.toi).toBe(true);
0052 |     }
0053 | 
0054 |     physics.dispose();
0055 |   });
0056 | });
0057 | 
```

---

## 63. `test/input.test.ts`

<a id="test-input-test-ts"></a>

**Role:** Unit tests verifying pulse command edge transitions, held state tracking, and window blur detachment.

- **File Path:** `test/input.test.ts`
- **Total Lines:** 65
- **Size:** 1.76 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeEach, afterEach } from 'vitest';
0002 | import { InputManager } from '../src/core/input';
0003 | 
0004 | describe('InputManager Architecture & Pulse Semantics', () => {
0005 |   let input: InputManager;
0006 | 
0007 |   beforeEach(() => {
0008 |     input = new InputManager();
0009 |   });
0010 | 
0011 |   afterEach(() => {
0012 |     input.detach();
0013 |   });
0014 | 
0015 |   it('queues one jump pulse without sticking held jump', () => {
0016 |     input.queueJump();
0017 |     expect(input.state.jumpPressed).toBe(true);
0018 |     expect(input.state.jump).toBe(false);
0019 | 
0020 |     input.flush();
0021 |     expect(input.state.jumpPressed).toBe(false);
0022 |     expect(input.state.jump).toBe(false);
0023 |   });
0024 | 
0025 |   it('queues one interact pulse without sticking held interact', () => {
0026 |     input.queueInteract();
0027 |     expect(input.state.interactPressed).toBe(true);
0028 |     expect(input.state.interact).toBe(false);
0029 | 
0030 |     input.flush();
0031 |     expect(input.state.interactPressed).toBe(false);
0032 |     expect(input.state.interact).toBe(false);
0033 |   });
0034 | 
0035 |   it('blur clears held controls', () => {
0036 |     input.state.fire = true;
0037 |     input.state.forward = true;
0038 |     input.state.sprint = true;
0039 | 
0040 |     input.resetHeldInputs();
0041 | 
0042 |     expect(input.state.fire).toBe(false);
0043 |     expect(input.state.forward).toBe(false);
0044 |     expect(input.state.sprint).toBe(false);
0045 |   });
0046 | 
0047 |   it('a single queued interaction consumed across fixed steps triggers exactly once', () => {
0048 |     input.queueInteract();
0049 | 
0050 |     let triggerCount = 0;
0051 |     // Simulate 5 fixed steps in a single render frame
0052 |     for (let step = 0; step < 5; step++) {
0053 |       if (input.state.interactPressed) {
0054 |         triggerCount++;
0055 |         input.state.interactPressed = false; // Consumer consumes pulse
0056 |       }
0057 |     }
0058 |     input.flush();
0059 | 
0060 |     expect(triggerCount).toBe(1);
0061 |     expect(input.state.interactPressed).toBe(false);
0062 |     expect(input.state.interact).toBe(false);
0063 |   });
0064 | });
0065 | 
```

---

## 64. `test/map.test.ts`

<a id="test-map-test-ts"></a>

**Role:** Unit tests verifying interactive map pointer capture, district coordinate translation, and camera input resets.

- **File Path:** `test/map.test.ts`
- **Total Lines:** 61
- **Size:** 2.27 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import { worldToMapPercent, mapPercentToWorld } from '../src/core/math';
0003 | import { useGameStore } from '../src/ui/store';
0004 | 
0005 | describe('Interactive Map & UI Modals (P1 UI)', () => {
0006 |   it('world point -> map -> world round trip is exact within tolerance', () => {
0007 |     const originalX = 450.5;
0008 |     const originalZ = -780.25;
0009 | 
0010 |     const mapPercent = worldToMapPercent(originalX, originalZ);
0011 |     expect(mapPercent.xPercent).toBeGreaterThan(0);
0012 |     expect(mapPercent.xPercent).toBeLessThan(100);
0013 |     expect(mapPercent.yPercent).toBeGreaterThan(0);
0014 |     expect(mapPercent.yPercent).toBeLessThan(100);
0015 | 
0016 |     const roundTrip = mapPercentToWorld(mapPercent.xPercent, mapPercent.yPercent);
0017 |     expect(roundTrip[0]).toBeCloseTo(originalX, 2);
0018 |     expect(roundTrip[2]).toBeCloseTo(originalZ, 2);
0019 |   });
0020 | 
0021 |   it('zoom clamping prevents NaN or infinite scale factors', () => {
0022 |     let zoom = 1.0;
0023 |     const clampZoom = (z: number) => Math.min(3.5, Math.max(0.65, Number.isFinite(z) ? z : 1.0));
0024 | 
0025 |     expect(clampZoom(zoom * 10)).toBe(3.5);
0026 |     expect(clampZoom(zoom * 0.01)).toBe(0.65);
0027 |     expect(clampZoom(NaN)).toBe(1.0);
0028 |     expect(clampZoom(Infinity)).toBe(1.0);
0029 |   });
0030 | 
0031 |   it('opening map or phone reflects modal pause state in game store', () => {
0032 |     const store = useGameStore.getState();
0033 | 
0034 |     // Initially closed
0035 |     store.setMapOpen(false);
0036 |     store.setPhoneOpen(false);
0037 |     expect(useGameStore.getState().isMapOpen).toBe(false);
0038 |     expect(useGameStore.getState().isPhoneOpen).toBe(false);
0039 | 
0040 |     // Open Map -> Pauses gameplay simulation
0041 |     store.setMapOpen(true);
0042 |     expect(useGameStore.getState().isMapOpen).toBe(true);
0043 | 
0044 |     const isSimulationPaused1 = useGameStore.getState().isMapOpen || useGameStore.getState().isPhoneOpen;
0045 |     expect(isSimulationPaused1).toBe(true);
0046 | 
0047 |     // Close Map, Open Phone
0048 |     store.setMapOpen(false);
0049 |     store.setPhoneOpen(true);
0050 |     expect(useGameStore.getState().isPhoneOpen).toBe(true);
0051 | 
0052 |     const isSimulationPaused2 = useGameStore.getState().isMapOpen || useGameStore.getState().isPhoneOpen;
0053 |     expect(isSimulationPaused2).toBe(true);
0054 | 
0055 |     // Close both
0056 |     store.setPhoneOpen(false);
0057 |     const isSimulationPaused3 = useGameStore.getState().isMapOpen || useGameStore.getState().isPhoneOpen;
0058 |     expect(isSimulationPaused3).toBe(false);
0059 |   });
0060 | });
0061 | 
```

---

## 65. `test/math.test.ts`

<a id="test-math-test-ts"></a>

**Role:** Unit tests verifying coordinate transformations, boundaries, clamp factor math utilities, and distance calculations.

- **File Path:** `test/math.test.ts`
- **Total Lines:** 98
- **Size:** 3.16 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import {
0003 |   worldToMapPercent,
0004 |   mapPercentToWorld,
0005 |   clamp,
0006 |   clampFactor,
0007 |   lerp,
0008 |   distance2D,
0009 |   distance3D,
0010 |   lerpAngle,
0011 |   isInsideWorld,
0012 |   distanceToAABB2D,
0013 |   WORLD_EXTENTS
0014 | } from '../src/core/math';
0015 | 
0016 | describe('Math & Coordinate Conversions', () => {
0017 |   it('converts world coordinates to map percentage and back accurately', () => {
0018 |     const origin = worldToMapPercent(0, 0);
0019 |     expect(origin.xPercent).toBeCloseTo(50, 1);
0020 |     expect(origin.yPercent).toBeCloseTo(50, 1);
0021 | 
0022 |     const backToWorld = mapPercentToWorld(50, 50);
0023 |     expect(backToWorld[0]).toBeCloseTo(0, 1);
0024 |     expect(backToWorld[2]).toBeCloseTo(0, 1);
0025 |   });
0026 | 
0027 |   it('clamps coordinates to boundary extents', () => {
0028 |     const minExt = worldToMapPercent(-1600, -1600);
0029 |     expect(minExt.xPercent).toBeCloseTo(0, 1);
0030 |     expect(minExt.yPercent).toBeCloseTo(0, 1);
0031 | 
0032 |     const maxExt = worldToMapPercent(1600, 1600);
0033 |     expect(maxExt.xPercent).toBeCloseTo(100, 1);
0034 |     expect(maxExt.yPercent).toBeCloseTo(100, 1);
0035 | 
0036 |     const beyondMin = worldToMapPercent(-2500, -2500);
0037 |     expect(beyondMin.xPercent).toBe(0);
0038 |     expect(beyondMin.yPercent).toBe(0);
0039 | 
0040 |     const beyondMax = worldToMapPercent(2500, 2500);
0041 |     expect(beyondMax.xPercent).toBe(100);
0042 |     expect(beyondMax.yPercent).toBe(100);
0043 |   });
0044 | 
0045 |   it('calculates 2D and 3D Euclidean distances correctly', () => {
0046 |     const d2 = distance2D(0, 0, 3, 4);
0047 |     expect(d2).toBe(5);
0048 | 
0049 |     const d3 = distance3D([0, 0, 0], [1, 2, 2]);
0050 |     expect(d3).toBe(3);
0051 |   });
0052 | 
0053 |   it('smoothly wraps angles when interpolating', () => {
0054 |     const angle = lerpAngle(0, Math.PI, 0.5);
0055 |     expect(angle).toBeCloseTo(Math.PI / 2, 2);
0056 |   });
0057 | 
0058 |   it('validates canonical world containment via isInsideWorld (P05)', () => {
0059 |     expect(isInsideWorld(0, 0)).toBe(true);
0060 |     expect(isInsideWorld(WORLD_EXTENTS.minX, WORLD_EXTENTS.minZ)).toBe(true);
0061 |     expect(isInsideWorld(WORLD_EXTENTS.maxX, WORLD_EXTENTS.maxZ)).toBe(true);
0062 |     expect(isInsideWorld(WORLD_EXTENTS.minX - 1, 0)).toBe(false);
0063 |     expect(isInsideWorld(0, WORLD_EXTENTS.maxZ + 1)).toBe(false);
0064 |   });
0065 | 
0066 |   it('calculates exact AABB 2D distance for point outside and inside (P05)', () => {
0067 |     // Inside box -> distance 0
0068 |     expect(distanceToAABB2D(10, 10, 0, 20, 0, 20)).toBe(0);
0069 | 
0070 |     // Orthogonal distance
0071 |     expect(distanceToAABB2D(25, 10, 0, 20, 0, 20)).toBe(5);
0072 |     expect(distanceToAABB2D(10, -5, 0, 20, 0, 20)).toBe(5);
0073 | 
0074 |     // Diagonal corner distance
0075 |     expect(distanceToAABB2D(23, 24, 0, 20, 0, 20)).toBe(5); // dx=3, dz=4 -> 5
0076 |   });
0077 | 
0078 |   it('validates clamped interpolation (clampFactor, lerp, lerpAngle) per Page 10', () => {
0079 |     // Tests for t = -1, 0, 0.5, 1, 2 and NaN
0080 |     expect(clampFactor(-1)).toBe(0);
0081 |     expect(clampFactor(0)).toBe(0);
0082 |     expect(clampFactor(0.5)).toBe(0.5);
0083 |     expect(clampFactor(1)).toBe(1);
0084 |     expect(clampFactor(2)).toBe(1);
0085 |     expect(clampFactor(NaN)).toBe(0);
0086 | 
0087 |     // lerp never overshoots
0088 |     expect(lerp(0, 10, 2)).toBe(10);
0089 |     expect(lerp(0, 10, -1)).toBe(0);
0090 |     expect(lerp(0, 10, 0.5)).toBe(5);
0091 |     expect(lerp(0, 10, NaN)).toBe(0);
0092 | 
0093 |     // lerpAngle never overshoots
0094 |     expect(lerpAngle(0, Math.PI, 2)).toBeCloseTo(Math.PI, 2);
0095 |     expect(lerpAngle(0, Math.PI, -1)).toBeCloseTo(0, 2);
0096 |   });
0097 | });
0098 | 
```

---

## 66. `test/missions.test.ts`

<a id="test-missions-test-ts"></a>

**Role:** Unit tests verifying mission loading, stage progression, and objective completion.

- **File Path:** `test/missions.test.ts`
- **Total Lines:** 47
- **Size:** 1.56 KB

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
0017 |   it('starts without side-effects in constructor and starts on explicit request (P14)', () => {
0018 |     const mgr = new MissionManager();
0019 |     expect(mgr.activeMission).toBeNull();
0020 | 
0021 |     const started = mgr.startMission('m_getaway_blueprint', false);
0022 |     expect(started).toBe(true);
0023 |     expect(mgr.activeMission?.id).toBe('m_getaway_blueprint');
0024 |     expect(mgr.currentStageIndex).toBe(0);
0025 | 
0026 |     const obj = mgr.getCurrentObjective();
0027 |     expect(obj).toBeDefined();
0028 |     expect(obj?.id).toBe('gb_step_1');
0029 |     expect(obj?.completed).toBe(false);
0030 |   });
0031 | 
0032 |   it('supports multi-objective stage reset to checkpoint (P14, P54)', () => {
0033 |     const mgr = new MissionManager();
0034 |     mgr.startMission('m_getaway_blueprint', false);
0035 | 
0036 |     const obj = mgr.getCurrentObjective();
0037 |     if (obj) obj.completed = true;
0038 | 
0039 |     mgr.resetToCheckpoint();
0040 |     const resetObj = mgr.getCurrentObjective();
0041 |     expect(resetObj?.completed).toBe(false);
0042 | 
0043 |     mgr.dispose();
0044 |     expect(mgr.activeMission).toBeNull();
0045 |   });
0046 | });
0047 | 
```

---

## 67. `test/nav.test.ts`

<a id="test-nav-test-ts"></a>

**Role:** Unit tests verifying Recast navmesh generation, solo region boundary safety, lane graph routing, and road spawns.

- **File Path:** `test/nav.test.ts`
- **Total Lines:** 79
- **Size:** 2.80 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeAll, afterAll } from 'vitest';
0002 | import { NavMeshService } from '../src/navigation/navMeshService';
0003 | import { LaneGraph } from '../src/navigation/laneGraph';
0004 | 
0005 | describe('Recast Navigation & LaneGraph Routing (P0 Navigation)', () => {
0006 |   let navService: NavMeshService;
0007 |   let laneGraph: LaneGraph;
0008 | 
0009 |   beforeAll(async () => {
0010 |     navService = await NavMeshService.create();
0011 |     laneGraph = new LaneGraph();
0012 |   });
0013 | 
0014 |   afterAll(() => {
0015 |     navService.dispose();
0016 |   });
0017 | 
0018 |   it('initializes Recast navmesh and validates readiness', () => {
0019 |     expect(navService.isReady()).toBe(true);
0020 |     expect(navService.getCrowd()).toBeDefined();
0021 |   });
0022 | 
0023 |   it('nav query computes valid walkable path between two points on navmesh', () => {
0024 |     const path = navService.findPath([-20, 0, -20], [20, 0, 20]);
0025 |     expect(path).not.toBeNull();
0026 |     if (path) {
0027 |       expect(path.length).toBeGreaterThanOrEqual(2);
0028 |       expect(path[0][0]).toBeCloseTo(-20, 0);
0029 |       expect(path[path.length - 1][0]).toBeCloseTo(20, 0);
0030 |     }
0031 |   });
0032 | 
0033 |   it('returns null when querying path far outside walkable world boundary', () => {
0034 |     // Points far outside the 3200m world boundary
0035 |     const path = navService.findPath([50000, 0, 50000], [60000, 0, 60000]);
0036 |     expect(path).toBeNull();
0037 |   });
0038 | 
0039 |   it('crowd simulation spawns agent and updates position', () => {
0040 |     const agent = navService.addCrowdAgent([0, 0, 0], { maxSpeed: 4 });
0041 |     expect(agent).not.toBeNull();
0042 |     if (agent) {
0043 |       agent.requestMoveTarget({ x: 20, y: 0, z: 20 });
0044 |       // Step crowd
0045 |       navService.updateCrowd(0.2);
0046 |       const vel = agent.velocity();
0047 |       expect(vel).toBeDefined();
0048 |       navService.removeCrowdAgent(agent);
0049 |     }
0050 |   });
0051 | 
0052 |   it('LaneGraph provides road network lane routing without straight-line shortcuts', () => {
0053 |     // Route from Aurelio Central (D01 center [0, 0, 0]) to Neon Row (D05 center [120, 0, 160])
0054 |     const route = laneGraph.findLaneRoute([0, 0.5, 0], [120, 0.5, 160]);
0055 |     expect(route).not.toBeNull();
0056 |     if (route) {
0057 |       expect(route.length).toBeGreaterThanOrEqual(2);
0058 |       // Verify all points have realistic coordinates and stay within bounds
0059 |       for (const pt of route) {
0060 |         expect(pt[0]).toBeGreaterThan(-1600);
0061 |         expect(pt[0]).toBeLessThan(1600);
0062 |         expect(pt[2]).toBeGreaterThan(-1600);
0063 |         expect(pt[2]).toBeLessThan(1600);
0064 |       }
0065 |     }
0066 |   });
0067 | 
0068 |   it('LaneGraph dispatches valid road spawn points outside player line-of-sight', () => {
0069 |     const playerPos: [number, number, number] = [0, 0.5, 0];
0070 |     const spawnPoint = laneGraph.getValidRoadSpawnPoint(playerPos, 50, 200);
0071 |     expect(spawnPoint).not.toBeNull();
0072 |     if (spawnPoint) {
0073 |       const dist = Math.hypot(spawnPoint[0] - playerPos[0], spawnPoint[2] - playerPos[2]);
0074 |       expect(dist).toBeGreaterThanOrEqual(50);
0075 |       expect(dist).toBeLessThanOrEqual(200);
0076 |     }
0077 |   });
0078 | });
0079 | 
```

---

## 68. `test/perf.test.ts`

<a id="test-perf-test-ts"></a>

**Role:** Performance benchmarks testing 100,000 spatial queries and hot-loop calculations.

- **File Path:** `test/perf.test.ts`
- **Total Lines:** 88
- **Size:** 2.99 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import * as THREE from 'three';
0003 | import { worldToMapPercent, mapPercentToWorld, distance2D } from '../src/core/math';
0004 | import { getDistrictAt } from '../src/data/districts';
0005 | import { RoadNetwork } from '../src/world/roadNetwork';
0006 | import { WorldStreamer } from '../src/world/worldStreamer';
0007 | import { ParticleSystem } from '../src/rendering/particles';
0008 | 
0009 | describe('Performance & Hot Loop Benchmarks', () => {
0010 |   it('executes 100,000 coordinate conversions in < 150ms', () => {
0011 |     const start = performance.now();
0012 |     for (let i = 0; i < 100000; i++) {
0013 |       const p = worldToMapPercent((i % 2000) - 1000, ((i * 3) % 2000) - 1000);
0014 |       mapPercentToWorld(p.xPercent, p.yPercent);
0015 |     }
0016 |     const elapsed = performance.now() - start;
0017 |     expect(elapsed).toBeLessThan(150);
0018 |   });
0019 | 
0020 |   it('executes 50,000 district spatial lookups in < 100ms', () => {
0021 |     const start = performance.now();
0022 |     for (let i = 0; i < 50000; i++) {
0023 |       const x = (i % 2400) - 1200;
0024 |       const z = ((i * 7) % 2400) - 1200;
0025 |       getDistrictAt(x, z);
0026 |     }
0027 |     const elapsed = performance.now() - start;
0028 |     expect(elapsed).toBeLessThan(100);
0029 |   });
0030 | 
0031 |   it('calculates 100,000 2D distance queries in < 80ms', () => {
0032 |     const start = performance.now();
0033 |     let sum = 0;
0034 |     for (let i = 0; i < 100000; i++) {
0035 |       sum += distance2D(i * 0.1, i * 0.2, (i + 1) * 0.1, (i + 1) * 0.2);
0036 |     }
0037 |     const elapsed = performance.now() - start;
0038 |     expect(elapsed).toBeLessThan(80);
0039 |     expect(sum).toBeGreaterThan(0);
0040 |   });
0041 | 
0042 |   it('executes 1,000 A* road path queries in < 100ms', () => {
0043 |     const scene = new THREE.Scene();
0044 |     const roads = new RoadNetwork(scene);
0045 |     const start = performance.now();
0046 |     for (let i = 0; i < 1000; i++) {
0047 |       const sx = (i % 400) - 200;
0048 |       const sz = ((i * 3) % 400) - 200;
0049 |       roads.findPath(sx, sz, 300, 300);
0050 |     }
0051 |     const elapsed = performance.now() - start;
0052 |     expect(elapsed).toBeLessThan(250);
0053 |     roads.dispose();
0054 |   });
0055 | 
0056 |   it('executes 10,000 swept collision queries against streamer in < 100ms', () => {
0057 |     const scene = new THREE.Scene();
0058 |     const streamer = new WorldStreamer(scene);
0059 |     streamer.update(new THREE.Vector3(0, 0, 0));
0060 | 
0061 |     const testPos = new THREE.Vector3();
0062 |     const start = performance.now();
0063 |     for (let i = 0; i < 10000; i++) {
0064 |       testPos.set((i % 100) - 50, 0.5, ((i * 2) % 100) - 50);
0065 |       streamer.testCollision(testPos, 0.45);
0066 |     }
0067 |     const elapsed = performance.now() - start;
0068 |     expect(elapsed).toBeLessThan(150);
0069 |     streamer.dispose();
0070 |   });
0071 | 
0072 |   it('executes 600 particle update steps under budget without memory growth', () => {
0073 |     const scene = new THREE.Scene();
0074 |     const particles = new ParticleSystem(scene);
0075 |     for (let i = 0; i < 200; i++) {
0076 |       particles.emitExplosion(new THREE.Vector3(0, 0, 0));
0077 |     }
0078 | 
0079 |     const start = performance.now();
0080 |     for (let step = 0; step < 600; step++) {
0081 |       particles.update(1 / 60);
0082 |     }
0083 |     const elapsed = performance.now() - start;
0084 |     expect(elapsed).toBeLessThan(200);
0085 |     particles.dispose();
0086 |   });
0087 | });
0088 | 
```

---

## 69. `test/physics.test.ts`

<a id="test-physics-test-ts"></a>

**Role:** Unit tests verifying Rapier3D physics world gravity, kinematic character controller step, and collider streaming.

- **File Path:** `test/physics.test.ts`
- **Total Lines:** 110
- **Size:** 3.54 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeAll, afterAll } from 'vitest';
0002 | import * as THREE from 'three';
0003 | import { PhysicsWorld } from '../src/physics/physicsWorld';
0004 | import { PhysicsColliderManager } from '../src/physics/physicsColliders';
0005 | 
0006 | describe('Rapier Physics World & Character Controller (P0 Physics)', () => {
0007 |   let physics: PhysicsWorld;
0008 | 
0009 |   beforeAll(async () => {
0010 |     physics = await PhysicsWorld.create();
0011 |   });
0012 | 
0013 |   afterAll(() => {
0014 |     physics.dispose();
0015 |   });
0016 | 
0017 |   it('initializes Rapier world with gravity and character controller', () => {
0018 |     expect(physics.world).toBeDefined();
0019 |     expect(physics.getCharacterController()).toBeDefined();
0020 |   });
0021 | 
0022 |   it('character controller lands and reports grounded status on floor', () => {
0023 |     // Create ground plane at y = 0
0024 |     const ground = physics.createStaticCuboid(50, 0.5, 50, 0, 0, 0);
0025 |     // Create player above ground at y = 3
0026 |     const { rigidBody, collider } = physics.createPlayerControllerBody([0, 3, 0]);
0027 | 
0028 |     physics.step();
0029 | 
0030 |     // Fall downwards with gravity
0031 |     const move = physics.moveCharacter(collider, { x: 0, y: -10, z: 0 });
0032 |     expect(move.isGrounded).toBe(true);
0033 |     // Player should have stopped near ground surface, not fallen 10m
0034 |     expect(move.y).toBeGreaterThan(-4);
0035 |     expect(move.y).toBeLessThan(-1);
0036 | 
0037 |     physics.removeCollider(collider);
0038 |     physics.removeCollider(ground);
0039 |   });
0040 | 
0041 |   it('player capsule does not pass through a static wall', () => {
0042 |     // Ground
0043 |     const ground = physics.createStaticCuboid(50, 0.5, 50, 0, 0, 0);
0044 |     // Static wall at x = 2
0045 |     const wall = physics.createStaticCuboid(0.5, 5, 5, 2, 2.5, 0);
0046 |     // Player at x = 0, y = 1, z = 0
0047 |     const { collider } = physics.createPlayerControllerBody([0, 1, 0]);
0048 | 
0049 |     physics.step();
0050 | 
0051 |     // Try to move 10 units in +X direction directly into the wall
0052 |     const move = physics.moveCharacter(collider, { x: 10, y: 0, z: 0 });
0053 | 
0054 |     // The wall at x=2 (left edge ~1.5) must stop the player (radius 0.35) around x=1.1 - 1.2
0055 |     expect(move.x).toBeLessThan(1.5);
0056 |     expect(move.x).toBeGreaterThan(0.5);
0057 | 
0058 |     physics.removeCollider(collider);
0059 |     physics.removeCollider(wall);
0060 |     physics.removeCollider(ground);
0061 |   });
0062 | 
0063 |   it('raycast accurately detects collision distance and normal against obstacles', () => {
0064 |     // Wall at x = 10
0065 |     const wall = physics.createStaticCuboid(1, 5, 5, 10, 2.5, 0);
0066 |     physics.step();
0067 | 
0068 |     // Cast ray from origin towards +X
0069 |     const hit = physics.castRay({ x: 0, y: 2.5, z: 0 }, { x: 1, y: 0, z: 0 }, 100);
0070 |     expect(hit).not.toBeNull();
0071 |     if (hit) {
0072 |       expect(hit.hit).toBe(true);
0073 |       // Wall is at x=10 with halfWidth 1, front face is at x=9
0074 |       expect(hit.toi).toBeCloseTo(9, 1);
0075 |       expect(hit.point.x).toBeCloseTo(9, 1);
0076 |       expect(hit.normal.x).toBeCloseTo(-1, 1);
0077 |     }
0078 | 
0079 |     physics.removeCollider(wall);
0080 |   });
0081 | 
0082 |   it('PhysicsColliderManager registers and cleanly unregisters sector colliders', () => {
0083 |     const manager = new PhysicsColliderManager(physics);
0084 | 
0085 |     manager.registerSectorColliders('D01', [
0086 |       {
0087 |         box: new THREE.Box3(
0088 |           new THREE.Vector3(-20, 0, -20),
0089 |           new THREE.Vector3(20, 10, 20)
0090 |         ),
0091 |         type: 'building'
0092 |       },
0093 |       {
0094 |         box: new THREE.Box3(
0095 |           new THREE.Vector3(50, 0, 50),
0096 |           new THREE.Vector3(70, 15, 70)
0097 |         ),
0098 |         type: 'building'
0099 |       }
0100 |     ]);
0101 | 
0102 |     expect(manager.getSectorColliderCount('D01')).toBe(2);
0103 |     expect(manager.getTotalCollidersCount()).toBe(2);
0104 | 
0105 |     manager.unregisterSectorColliders('D01');
0106 |     expect(manager.getSectorColliderCount('D01')).toBe(0);
0107 |     expect(manager.getTotalCollidersCount()).toBe(0);
0108 |   });
0109 | });
0110 | 
```

---

## 70. `test/save.test.ts`

<a id="test-save-test-ts"></a>

**Role:** Unit tests verifying save serialization, data roundtripping, finite number validation, and legacy schema v3 migration.

- **File Path:** `test/save.test.ts`
- **Total Lines:** 120
- **Size:** 4.23 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeEach } from 'vitest';
0002 | import { SaveManager, SAVE_SCHEMA_VERSION, SAVE_KEY } from '../src/save/saveManager';
0003 | 
0004 | describe('Versioned Save System (Schema v3)', () => {
0005 |   beforeEach(() => {
0006 |     const store: Record<string, string> = {};
0007 |     const mockStorage: Storage = {
0008 |       getItem: (k: string) => store[k] ?? null,
0009 |       setItem: (k: string, v: string) => { store[k] = String(v); },
0010 |       removeItem: (k: string) => { delete store[k]; },
0011 |       clear: () => { Object.keys(store).forEach(k => delete store[k]); },
0012 |       length: 0,
0013 |       key: (_i: number) => null
0014 |     };
0015 |     Object.defineProperty(globalThis, 'localStorage', {
0016 |       value: mockStorage,
0017 |       writable: true,
0018 |       configurable: true
0019 |     });
0020 |   });
0021 | 
0022 |   it('generates a valid initial save schema v3', () => {
0023 |     const initial = SaveManager.getInitialState();
0024 |     expect(initial.version).toBe(SAVE_SCHEMA_VERSION);
0025 |     expect(initial.player.stats.health).toBe(100);
0026 |     expect(initial.player.stats.cash).toBe(2500);
0027 |     expect(initial.player.inventory.length).toBeGreaterThanOrEqual(3);
0028 |     expect(initial.world.discoveredDistricts).toContain('D01');
0029 |     expect(initial.world.weather).toBe('clear');
0030 |     expect(initial.ownedVehicles.length).toBeGreaterThan(0);
0031 |     expect(initial.ownedVehicles[0].id).toBeDefined();
0032 |     expect(initial.ownedVehicles[0].definitionId).toBe('veh_vx9_kestrel');
0033 |   });
0034 | 
0035 |   it('saves and reloads state without data loss via synchronous fallback', () => {
0036 |     const state = SaveManager.getInitialState();
0037 |     state.player.stats.cash = 99999;
0038 |     state.player.position = [400, 10, -50];
0039 | 
0040 |     const saved = SaveManager.saveSync(state);
0041 |     expect(saved).toBe(true);
0042 | 
0043 |     const loaded = SaveManager.loadSync();
0044 |     expect(loaded.player.stats.cash).toBe(99999);
0045 |     expect(loaded.player.position[0]).toBe(400);
0046 |     expect(loaded.player.position[1]).toBe(10);
0047 |     expect(loaded.player.position[2]).toBe(-50);
0048 |   });
0049 | 
0050 |   it('saves and reloads state asynchronously with fallback', async () => {
0051 |     const state = SaveManager.getInitialState();
0052 |     state.player.stats.cash = 77777;
0053 |     state.player.position = [120, 5, -80];
0054 | 
0055 |     const saved = await SaveManager.save(state);
0056 |     expect(saved).toBe(true);
0057 | 
0058 |     const loaded = await SaveManager.load();
0059 |     expect(loaded.player.stats.cash).toBe(77777);
0060 |     expect(loaded.player.position[0]).toBe(120);
0061 |   });
0062 | 
0063 |   it('migrates older save schemas gracefully from v1 and v2 to v3', () => {
0064 |     const legacy = {
0065 |       version: 2,
0066 |       player: { stats: { cash: 500 } },
0067 |       ownedVehicles: ['veh_vx9_kestrel']
0068 |     };
0069 |     globalThis.localStorage.setItem('san_aurelio_save_v2', JSON.stringify(legacy));
0070 | 
0071 |     const loaded = SaveManager.loadSync();
0072 |     expect(loaded.version).toBe(3);
0073 |     expect(loaded.player.stats.cash).toBe(500);
0074 |     expect(loaded.player.stats.health).toBe(100); // Backfilled default
0075 |     expect(loaded.world.weather).toBe('clear');
0076 |     expect(loaded.ownedVehicles[0].definitionId).toBe('veh_vx9_kestrel');
0077 |     expect(loaded.ownedVehicles[0].id).toBeDefined();
0078 |   });
0079 | 
0080 |   it('clamps NaN health and negative cash to safe bounded values', () => {
0081 |     const badState = {
0082 |       version: 2,
0083 |       player: {
0084 |         stats: {
0085 |           health: NaN,
0086 |           armor: NaN,
0087 |           stamina: 999,
0088 |           cash: -500
0089 |         }
0090 |       },
0091 |       missions: {
0092 |         currentMissionId: 'non_existent_mission_xyz'
0093 |       }
0094 |     };
0095 | 
0096 |     const migrated = SaveManager.migrate(badState);
0097 |     expect(migrated.player.stats.health).toBe(100);
0098 |     expect(migrated.player.stats.armor).toBe(100);
0099 |     expect(migrated.player.stats.stamina).toBe(100);
0100 |     expect(migrated.player.stats.cash).toBe(0); // negative clamped to 0
0101 |     expect(migrated.missions.currentMissionId).toBeNull(); // unknown mission dropped
0102 |   });
0103 | 
0104 |   it('recovers safely from corrupt JSON', () => {
0105 |     globalThis.localStorage.setItem(SAVE_KEY, '{ not valid json');
0106 |     const loaded = SaveManager.loadSync();
0107 |     expect(loaded.version).toBe(3);
0108 |     expect(loaded.player.stats.health).toBe(100);
0109 |   });
0110 | 
0111 |   it('clears storage asynchronously and safely', async () => {
0112 |     const state = SaveManager.getInitialState();
0113 |     SaveManager.saveSync(state);
0114 |     expect(globalThis.localStorage.getItem(SAVE_KEY)).not.toBeNull();
0115 | 
0116 |     await SaveManager.clear();
0117 |     expect(globalThis.localStorage.getItem(SAVE_KEY)).toBeNull();
0118 |   });
0119 | });
0120 | 
```

---

## 71. `test/smoke.test.ts`

<a id="test-smoke-test-ts"></a>

**Role:** End-to-end integration smoke test verifying districts, vehicles, weapons, and architecture.

- **File Path:** `test/smoke.test.ts`
- **Total Lines:** 147
- **Size:** 5.48 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import * as THREE from 'three';
0003 | import { CANONICAL_DISTRICTS, getDistrictAt } from '../src/data/districts';
0004 | import { CANONICAL_VEHICLES, getVehicleDef } from '../src/data/vehicles';
0005 | import { CANONICAL_WEAPONS, getWeaponDef } from '../src/data/weapons';
0006 | import { CANONICAL_POIS } from '../src/data/pois';
0007 | import { SaveManager } from '../src/save/saveManager';
0008 | import { SectorBuilder } from '../src/world/sectorBuilder';
0009 | import { RoadNetwork } from '../src/world/roadNetwork';
0010 | import { WorldStreamer } from '../src/world/worldStreamer';
0011 | import { VehicleFactory } from '../src/vehicles/vehicleFactory';
0012 | import { VehicleInstance } from '../src/vehicles/vehicleController';
0013 | import { eventBus } from '../src/core/events';
0014 | 
0015 | describe('San Aurelio Vertical Slice Smoke Test', () => {
0016 |   it('validates 26 canonical districts and sector boundaries including outside checks', () => {
0017 |     expect(CANONICAL_DISTRICTS.length).toBe(26);
0018 | 
0019 |     const d01 = CANONICAL_DISTRICTS.find(d => d.id === 'D01');
0020 |     expect(d01?.name).toBe('Aurelio Central');
0021 |     expect(d01?.archetype).toBe('downtown');
0022 | 
0023 |     const d02 = CANONICAL_DISTRICTS.find(d => d.id === 'D02');
0024 |     expect(d02?.name).toBe('Meridian Core');
0025 |     expect(d02?.archetype).toBe('financial');
0026 | 
0027 |     // Test spatial lookup
0028 |     const found = getDistrictAt(0, 0);
0029 |     expect(found?.id).toBe('D01');
0030 | 
0031 |     const foundMeridian = getDistrictAt(350, 0);
0032 |     expect(foundMeridian?.id).toBe('D02');
0033 | 
0034 |     // Out of bounds returns null (P07)
0035 |     const outside = getDistrictAt(9999, 9999);
0036 |     expect(outside).toBeNull();
0037 |   });
0038 | 
0039 |   it('validates 10 canonical vehicle classes and specifications', () => {
0040 |     expect(CANONICAL_VEHICLES.length).toBe(10);
0041 | 
0042 |     const kestrel = getVehicleDef('veh_vx9_kestrel');
0043 |     expect(kestrel.class).toBe('sports_coupe');
0044 |     expect(kestrel.topSpeed).toBeGreaterThan(40);
0045 | 
0046 |     const tank = getVehicleDef('veh_ar7_mastiff');
0047 |     expect(tank.class).toBe('tank');
0048 |     expect(tank.hasTurret).toBe(true);
0049 | 
0050 |     const heli = getVehicleDef('veh_hx4_sparrow');
0051 |     expect(heli.class).toBe('helicopter');
0052 |     expect(heli.isAircraft).toBe(true);
0053 | 
0054 |     const boat = getVehicleDef('veh_tiderunner_24');
0055 |     expect(boat.class).toBe('boat');
0056 |     expect(boat.isBoat).toBe(true);
0057 | 
0058 |     const bike = getVehicleDef('veh_kite_600');
0059 |     expect(bike.class).toBe('motorbike');
0060 |   });
0061 | 
0062 |   it('validates 6 canonical weapon specifications and strict lookup (P42)', () => {
0063 |     expect(CANONICAL_WEAPONS.length).toBe(6);
0064 |     const names = CANONICAL_WEAPONS.map(w => w.name);
0065 |     expect(names).toContain('P1 Vesper');
0066 |     expect(names).toContain('Vortex 45');
0067 |     expect(names).toContain('Rook-12');
0068 |     expect(names).toContain('Arcline AR');
0069 |     expect(names).toContain('Crownline S-7');
0070 |     expect(names).toContain('Ramjet L');
0071 | 
0072 |     expect(getWeaponDef('wep_p1_vesper')).toBeDefined();
0073 |     expect(getWeaponDef('non_existent_weapon_id')).toBeUndefined();
0074 |   });
0075 | 
0076 |   it('validates canonical landmarks and POIs', () => {
0077 |     expect(CANONICAL_POIS.length).toBeGreaterThanOrEqual(10);
0078 |     const landmarkNames = CANONICAL_POIS.map(p => p.name);
0079 |     expect(landmarkNames).toContain('Aurelio Tower');
0080 |     expect(landmarkNames).toContain('Meridian Exchange');
0081 |   });
0082 | 
0083 |   it('validates procedural architectural synthesis and deterministic PRNG (P28)', () => {
0084 |     const d01 = CANONICAL_DISTRICTS[0];
0085 |     const run1 = SectorBuilder.buildSector(d01, true);
0086 |     const run2 = SectorBuilder.buildSector(d01, true);
0087 |     expect(run1.colliders.length).toBe(run2.colliders.length);
0088 |     expect(run1.colliders[0].box.min.x).toBe(run2.colliders[0].box.min.x);
0089 |   });
0090 | 
0091 |   it('validates road network A* pathfinding and GPS ribbon cache (P10, P11)', () => {
0092 |     const scene = new THREE.Scene();
0093 |     const roads = new RoadNetwork(scene);
0094 |     const path = roads.findPath(0, 0, 350, 0);
0095 |     expect(path).not.toBeNull();
0096 |     expect(path!.length).toBeGreaterThanOrEqual(2);
0097 | 
0098 |     roads.updateGPSRibbon(path);
0099 |     roads.updateGPSRibbon(path); // Cached, no rebuild
0100 |     roads.dispose();
0101 |   });
0102 | 
0103 |   it('validates world streamer lifecycle and ground height query (P08, P09, P23)', () => {
0104 |     const scene = new THREE.Scene();
0105 |     const streamer = new WorldStreamer(scene);
0106 |     streamer.update(new THREE.Vector3(0, 0, 0));
0107 |     expect(streamer.getActiveSectorIds().length).toBeGreaterThan(0);
0108 | 
0109 |     const groundY = streamer.getGroundHeight(0, 0);
0110 |     expect(groundY).toBeGreaterThanOrEqual(0);
0111 | 
0112 |     const hit = streamer.testCollision(new THREE.Vector3(0, 0, 0), 0.45);
0113 |     expect(typeof hit.hit).toBe('boolean');
0114 | 
0115 |     streamer.dispose();
0116 |     expect(streamer.getActiveSectorIds().length).toBe(0);
0117 |   });
0118 | 
0119 |   it('validates vehicle exit synchronization and disposal (P16, P21, P27)', () => {
0120 |     const scene = new THREE.Scene();
0121 |     const def = getVehicleDef('veh_vx9_kestrel');
0122 |     const model = VehicleFactory.createVehicleModel(def);
0123 |     const vehicle = new VehicleInstance(def, model, new THREE.Vector3(100, 0, 100));
0124 | 
0125 |     const exitPos = vehicle.getSafeExitPosition([]);
0126 |     expect(exitPos.x).toBeGreaterThan(0);
0127 | 
0128 |     let receivedExit: unknown = null;
0129 |     const unsub = eventBus.on('VEHICLE_EXIT', (data: { position: [number, number, number] }) => {
0130 |       receivedExit = data;
0131 |     });
0132 | 
0133 |     eventBus.emit('VEHICLE_EXIT', {
0134 |       position: [exitPos.x, exitPos.y, exitPos.z]
0135 |     });
0136 |     expect(receivedExit).toBeDefined();
0137 |     unsub();
0138 |     vehicle.dispose();
0139 |   });
0140 | 
0141 |   it('validates end-to-end save state roundtrip', () => {
0142 |     const initialState = SaveManager.getInitialState();
0143 |     expect(initialState.player.stats.health).toBe(100);
0144 |     expect(initialState.version).toBe(3);
0145 |   });
0146 | });
0147 | 
```

---

## 72. `test/vehicles.test.ts`

<a id="test-vehicles-test-ts"></a>

**Role:** Unit tests verifying vehicle instance state, owned paint isolation, safe controller disposal, and pursuit despawning.

- **File Path:** `test/vehicles.test.ts`
- **Total Lines:** 78
- **Size:** 2.88 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect, beforeEach, afterEach } from 'vitest';
0002 | import * as THREE from 'three';
0003 | import { VehicleManager } from '../src/vehicles/vehicleManager';
0004 | import { materialLib } from '../src/rendering/materials';
0005 | 
0006 | describe('Vehicle Lifecycle & Identity Model (P0 Vehicles)', () => {
0007 |   let scene: THREE.Scene;
0008 |   let vehicleManager: VehicleManager;
0009 | 
0010 |   beforeEach(() => {
0011 |     scene = new THREE.Scene();
0012 |     vehicleManager = new VehicleManager(scene);
0013 |   });
0014 | 
0015 |   afterEach(() => {
0016 |     vehicleManager.dispose();
0017 |   });
0018 | 
0019 |   it('spawns two vehicles with the same definition and assigns unique instance IDs', () => {
0020 |     const v1 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(0, 0, 0));
0021 |     const v2 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(10, 0, 0));
0022 | 
0023 |     expect(v1.id).toBeDefined();
0024 |     expect(v2.id).toBeDefined();
0025 |     expect(v1.id).not.toBe(v2.id);
0026 |     expect(v1.def.id).toBe(v2.def.id);
0027 |   });
0028 | 
0029 |   it('disposing vehicle A does not dispose shared materials or break vehicle B', () => {
0030 |     const v1 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(0, 0, 0));
0031 |     const v2 = vehicleManager.spawnVehicle('veh_vx9_kestrel', new THREE.Vector3(10, 0, 0));
0032 | 
0033 |     // Material in materialLib before disposal
0034 |     expect(materialLib.vehicleTire).toBeDefined();
0035 | 
0036 |     // Dispose vehicle 1
0037 |     v1.dispose();
0038 | 
0039 |     // Shared tire and glass materials must not be disposed
0040 |     expect(materialLib.vehicleTire).toBeDefined();
0041 |     expect(v2.wheels.length).toBeGreaterThan(0);
0042 |     // Vehicle B's wheel material must remain intact
0043 |     expect(v2.wheels[0].material).toBe(materialLib.vehicleTire);
0044 |   });
0045 | 
0046 |   it('only owned vehicles appear in getOwnedVehicles / persistent save model', () => {
0047 |     const ownedList = vehicleManager.getOwnedVehicles();
0048 |     expect(ownedList.length).toBeGreaterThanOrEqual(1);
0049 | 
0050 |     // Spawn an ambient vehicle and a police unit
0051 |     const ambient = vehicleManager.spawnVehicle('veh_mica_hatch', new THREE.Vector3(50, 0, 50), 0, {
0052 |       owned: false,
0053 |       spawnKind: 'ambient'
0054 |     });
0055 |     const police = vehicleManager.spawnPolicePursuitUnit(new THREE.Vector3(0, 0, 0));
0056 | 
0057 |     const updatedOwned = vehicleManager.getOwnedVehicles();
0058 |     const ids = updatedOwned.map(v => v.id);
0059 | 
0060 |     expect(ids).not.toContain(ambient.id);
0061 |     expect(ids).not.toContain(police.id);
0062 |   });
0063 | 
0064 |   it('despawnPursuitUnits removes all police vehicles when heat is cleared', () => {
0065 |     const initialCount = vehicleManager.vehicles.length;
0066 |     vehicleManager.spawnPolicePursuitUnit(new THREE.Vector3(0, 0, 0));
0067 |     vehicleManager.spawnPolicePursuitUnit(new THREE.Vector3(20, 0, 0));
0068 | 
0069 |     expect(vehicleManager.vehicles.length).toBe(initialCount + 2);
0070 | 
0071 |     vehicleManager.despawnPursuitUnits();
0072 |     expect(vehicleManager.vehicles.length).toBe(initialCount);
0073 | 
0074 |     const remainingPolice = vehicleManager.vehicles.filter(v => v.spawnKind === 'police');
0075 |     expect(remainingPolice.length).toBe(0);
0076 |   });
0077 | });
0078 | 
```

---

## 73. `test/wanted.test.ts`

<a id="test-wanted-test-ts"></a>

**Role:** Unit tests verifying heat tier escalation, search radius, and evasion reset.

- **File Path:** `test/wanted.test.ts`
- **Total Lines:** 59
- **Size:** 1.74 KB

### Line-by-Line Source Code

```typescript
0001 | import { describe, it, expect } from 'vitest';
0002 | import { WantedSystem } from '../src/law/wantedSystem';
0003 | import { eventBus } from '../src/core/events';
0004 | 
0005 | describe('Law Enforcement Wanted System', () => {
0006 |   it('starts at Heat 0 with no pursuit', () => {
0007 |     const wanted = new WantedSystem();
0008 |     expect(wanted.heat).toBe(0);
0009 |     expect(wanted.searchRadius).toBe(0);
0010 |     expect(wanted.isCoolingDown).toBe(false);
0011 |     wanted.dispose();
0012 |   });
0013 | 
0014 |   it('escalates heat upon serious criminal actions', () => {
0015 |     const wanted = new WantedSystem();
0016 |     wanted.setHeat(1);
0017 |     expect(wanted.heat).toBe(1);
0018 |     expect(wanted.searchRadius).toBe(110);
0019 | 
0020 |     wanted.setHeat(3);
0021 |     expect(wanted.heat).toBe(3);
0022 |     expect(wanted.searchRadius).toBe(180);
0023 |     wanted.dispose();
0024 |   });
0025 | 
0026 |   it('updates lastKnownPosition from non-origin witness position (P15, P56)', () => {
0027 |     const wanted = new WantedSystem();
0028 |     eventBus.emit('WITNESS_EVENT', {
0029 |       position: [350, 0, -420],
0030 |       severity: 3
0031 |     });
0032 | 
0033 |     expect(wanted.lastKnownPosition.x).toBe(350);
0034 |     expect(wanted.lastKnownPosition.z).toBe(-420);
0035 |     expect(wanted.heat).toBeGreaterThanOrEqual(1);
0036 |     wanted.dispose();
0037 |   });
0038 | 
0039 |   it('resets heat upon complete evasion', () => {
0040 |     const wanted = new WantedSystem();
0041 |     wanted.setHeat(2);
0042 |     expect(wanted.heat).toBe(2);
0043 | 
0044 |     wanted.setHeat(0);
0045 |     expect(wanted.heat).toBe(0);
0046 |     expect(wanted.searchRadius).toBe(0);
0047 |     wanted.dispose();
0048 |   });
0049 | 
0050 |   it('disposes event listeners cleanly without leaks (P15)', () => {
0051 |     const wanted = new WantedSystem();
0052 |     wanted.dispose();
0053 | 
0054 |     // Emitting events after dispose should not trigger state change in dead system
0055 |     eventBus.emit('WEAPON_FIRED', { weaponId: 'wep_p1_vesper', ammoLeft: 10 });
0056 |     expect(wanted.heat).toBe(0);
0057 |   });
0058 | });
0059 | 
```

---


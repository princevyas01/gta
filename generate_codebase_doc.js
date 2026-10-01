import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ordered list of files to document line by line
const fileList = [
  // Configuration & Build
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'index.html',
  '.gitignore',
  'LICENSE',

  // Master Documentation
  'README.md',
  'ARCHITECTURE.md',
  'ART_DIRECTION.md',
  'WORLD_BIBLE.md',
  'PERFORMANCE.md',
  'ASSET_PIPELINE.md',
  'DEBUGGING.md',
  'CHANGELOG.md',

  // Core Simulation & Systems
  'src/core/types.ts',
  'src/core/math.ts',
  'src/core/events.ts',
  'src/core/clock.ts',
  'src/core/input.ts',
  'src/core/audio.ts',
  'src/core/resourceRegistry.ts',

  // Rapier Physics Subsystem
  'src/physics/physicsWorld.ts',
  'src/physics/physicsColliders.ts',

  // Recast Navigation & Road Graph
  'src/navigation/laneGraph.ts',
  'src/navigation/navMeshService.ts',

  // Canonical Datasets
  'src/data/districts.ts',
  'src/data/pois.ts',
  'src/data/vehicles.ts',
  'src/data/weapons.ts',
  'src/data/missions.ts',

  // Save & Persistence
  'src/save/saveManager.ts',

  // Rendering & VFX
  'src/rendering/materials.ts',
  'src/rendering/particles.ts',
  'src/rendering/sky.ts',
  'src/rendering/sceneManager.ts',

  // World Streaming & Architecture
  'src/world/roadNetwork.ts',
  'src/world/sectorBuilder.ts',
  'src/world/worldStreamer.ts',

  // Player & Camera
  'src/player/characterModel.ts',
  'src/player/thirdPersonCamera.ts',
  'src/player/playerController.ts',

  // Vehicles
  'src/vehicles/vehicleFactory.ts',
  'src/vehicles/vehicleController.ts',
  'src/vehicles/vehicleManager.ts',

  // NPCs & AI
  'src/npc/npcModel.ts',
  'src/npc/npcManager.ts',

  // Combat Subsystem
  'src/combat/hitReactionTypes.ts',
  'src/combat/combatSystem.ts',

  // Law Enforcement / Wanted System
  'src/law/wantedSystem.ts',

  // Missions & Activities
  'src/missions/missionManager.ts',

  // State Store & UI
  'src/ui/store.ts',
  'src/ui/HUD.tsx',
  'src/ui/InteractiveMap.tsx',
  'src/ui/WeaponWheel.tsx',
  'src/ui/PhoneMenu.tsx',
  'src/ui/DebugProfiler.tsx',
  'src/ui/ControlsOverlay.tsx',

  // App & Entry Point
  'src/app/GameEngine.ts',
  'src/app/App.tsx',
  'src/main.tsx',

  // Automated Test Suite
  'test/audio.test.ts',
  'test/combat.test.ts',
  'test/input.test.ts',
  'test/map.test.ts',
  'test/math.test.ts',
  'test/missions.test.ts',
  'test/nav.test.ts',
  'test/perf.test.ts',
  'test/physics.test.ts',
  'test/save.test.ts',
  'test/smoke.test.ts',
  'test/vehicles.test.ts',
  'test/wanted.test.ts'
];

const fileDescriptions = {
  'package.json': 'Project metadata, dependencies (React, Three.js, Rapier, Recast, Zustand, Lucide, Vitest), and npm scripts.',
  'tsconfig.json': 'Strict TypeScript configuration targeting ES2022 with DOM and path aliases.',
  'vite.config.ts': 'Vite dev server and production bundler configuration with React plugin and alias resolution.',
  'index.html': 'Main HTML entry shell, viewport setup, base styles, and canvas container.',
  '.gitignore': 'Git ignore specifications preventing node_modules and build artifacts from version control.',
  'LICENSE': 'MIT License terms and open-source permissions for the San Aurelio codebase.',
  'README.md': 'Master project documentation detailing lore, feature matrix, quickstart, controls, and test suite.',
  'ARCHITECTURE.md': 'In-depth engineering blueprint, runtime loop diagrams, and module responsibilities.',
  'ART_DIRECTION.md': 'Master 3D visual art direction specification encoding macro silhouette, medium facade structure, and micro ground detail rules.',
  'WORLD_BIBLE.md': 'Canonical world bible for the Federal Republic of Vesper, Aurelio Province, and 26 districts.',
  'PERFORMANCE.md': 'Hardware performance tiers, draw call caps, triangle budgets, and GC avoidance rules.',
  'ASSET_PIPELINE.md': 'Procedural asset synthesis specifications conforming to 360-degree turntable contracts.',
  'DEBUGGING.md': 'Developer cheats, keyboard shortcuts, profiler overlays, and QA test execution.',
  'CHANGELOG.md': 'Release history documenting version releases and feature additions.',
  'src/core/types.ts': 'Domain TypeScript interfaces for Districts, POIs, Vehicles, Weapons, Player, NPCs, and Saves.',
  'src/core/math.ts': 'Coordinate conversion between 3D world space and 2D map space, vector helpers, clamped factors, and distance formulas.',
  'src/core/events.ts': 'Type-safe event bus facilitating decoupled pub/sub communication across all engine systems.',
  'src/core/clock.ts': 'Fixed 60Hz physics clock with accelerated 24-hour day/night cycle progression.',
  'src/core/input.ts': 'Input manager capturing keyboard, mouse aim, pointer lock, touch inputs, pulse commands, and blur guards.',
  'src/core/audio.ts': 'Procedural Web Audio API sound synthesizer for vehicle RPM, gunshots, sirens, and complete audio lifecycle disposal.',
  'src/core/resourceRegistry.ts': 'Explicit WebGL/WebGPU resource disposal and lifecycle tracker preventing GPU memory leaks.',
  'src/physics/physicsWorld.ts': 'Rapier3D physics world initialization, kinematic character controller, gravity, and raycast queries.',
  'src/physics/physicsColliders.ts': 'Dynamic sector collider lifecycle manager registering/unregistering Rapier cuboids with streaming cells.',
  'src/navigation/laneGraph.ts': 'Directed vehicle lane graph across all 26 districts with arterial/local lanes, A* routing, and road spawn points.',
  'src/navigation/navMeshService.ts': 'Recast solo navmesh generation per active district region, pathfinding queries, and crowd agent avoidance.',
  'src/data/districts.ts': 'Canonical dataset of all 26 districts with geographic bounds, colors, and archetypes.',
  'src/data/pois.ts': 'Dataset of canonical landmarks, safehouses, garages, shops, hospitals, and police stations.',
  'src/data/vehicles.ts': 'Specifications for all 10 canonical vehicle classes (speed, mass, acceleration, handling).',
  'src/data/weapons.ts': 'Arsenal dataset defining 6 weapon classes, damage, fire rates, magazine size, and spread.',
  'src/data/missions.ts': 'Data-driven missions including multi-stage story heists, time trials, and courier drops.',
  'src/save/saveManager.ts': 'Versioned save/load system supporting schema v3 migration, finite number validation, and dual IndexedDB/localStorage persistence.',
  'src/rendering/materials.ts': 'Cached shared materials library for roads, concrete, glass, neon, and vehicle paint.',
  'src/rendering/particles.ts': 'Object-pooled GPU particle engine for explosions, muzzle flashes, bullet sparks, and tire burnout smoke.',
  'src/rendering/sky.ts': 'Atmospheric day/night celestial lighting, sun orbit, dynamic fog, rain particles, and zero-allocation color caching.',
  'src/rendering/sceneManager.ts': 'Three.js master scene setup, perspective camera, ACES Filmic tone mapping, error recovery, and shadows.',
  'src/world/roadNetwork.ts': 'Interconnected road graph spanning all 26 sectors with LaneGraph integration, A* pathfinding, and 3D GPS route ribbons.',
  'src/world/sectorBuilder.ts': 'Procedural architectural generator building skyscrapers, quays, warehouses, and collision meshes.',
  'src/world/worldStreamer.ts': 'Cell streaming manager loading hero high-LOD cells and perimeter proxy shells with hysteresis and physics collider sync.',
  'src/player/characterModel.ts': 'Procedural 3D humanoid character model for Kai Mercer with articulated skeletal rig.',
  'src/player/thirdPersonCamera.ts': 'Orbital third-person camera with obstacle collision avoidance, shoulder aim zoom, and input reset.',
  'src/player/playerController.ts': 'Locomotion controller handling movement, stamina, jumping, weapon sockets, and vehicle entry.',
  'src/vehicles/vehicleFactory.ts': 'Procedural 3D model generator for cars, bikes, boats, helicopters, and tanks with isolated owned paint materials.',
  'src/vehicles/vehicleController.ts': 'Vehicle physics controller handling suspension, drifting, flight lift, and safe non-shared resource disposal.',
  'src/vehicles/vehicleManager.ts': 'Fleet manager handling vehicle spawning, instance tracking, player entry/exit, and pursuit despawning.',
  'src/npc/npcModel.ts': 'Procedural 3D models for pedestrians and police officers with animated walk cycles.',
  'src/npc/npcManager.ts': 'Crowd manager handling pedestrian schedules, fleeing reactions, and police retaliatory combat.',
  'src/combat/hitReactionTypes.ts': 'Combat directional hit payloads, angular classification vectors, and target reaction state structures.',
  'src/combat/combatSystem.ts': 'Combat engine managing weapon firing, rocket damage retention, hitscan raycasting, recoil, and occlusion checks.',
  'src/law/wantedSystem.ts': '0-5 Star Wanted heat escalation manager with witness reporting and evasion cooldown.',
  'src/missions/missionManager.ts': 'Mission runner tracking active objectives, checkpoints, and cash reward payouts.',
  'src/ui/store.ts': 'Zustand reactive UI state store bridging engine telemetry and player stats to React.',
  'src/ui/HUD.tsx': 'HUD overlay with circular minimap radar, health/armor, cash, ammo, and speedometer.',
  'src/ui/InteractiveMap.tsx': 'Fullscreen 26-district pannable and zoomable map with pointer capture, POI filters, and waypoint routing.',
  'src/ui/WeaponWheel.tsx': 'Radial tactical weapon selector overlay for rapid arsenal switching.',
  'src/ui/PhoneMenu.tsx': 'In-game smartphone (Aurelio OS) featuring vehicle delivery, contacts, and quick save.',
  'src/ui/DebugProfiler.tsx': 'Real-time telemetry overlay tracking FPS, draw calls, triangles, coordinates, and active cells.',
  'src/ui/ControlsOverlay.tsx': 'Controls cheat-sheet and pointer-captured on-screen touch buttons for mobile and tablet degradation.',
  'src/app/GameEngine.ts': 'Master game engine orchestrator coordinating graphics, Rapier physics, Recast nav, streaming, AI, audio, and modal pauses.',
  'src/app/App.tsx': 'Top-level React application component hosting the 3D canvas and all UI overlays.',
  'src/main.tsx': 'DOM entry point mounting the React root.',
  'test/audio.test.ts': 'Unit tests verifying procedural audio engine synthesis, siren LFO, and clean audio context disposal.',
  'test/combat.test.ts': 'Unit tests verifying weapon switching immunity, rocket damage retention, and bullet spark particle emission.',
  'test/input.test.ts': 'Unit tests verifying pulse command edge transitions, held state tracking, and window blur detachment.',
  'test/map.test.ts': 'Unit tests verifying interactive map pointer capture, district coordinate translation, and camera input resets.',
  'test/math.test.ts': 'Unit tests verifying coordinate transformations, boundaries, clamp factor math utilities, and distance calculations.',
  'test/missions.test.ts': 'Unit tests verifying mission loading, stage progression, and objective completion.',
  'test/nav.test.ts': 'Unit tests verifying Recast navmesh generation, solo region boundary safety, lane graph routing, and road spawns.',
  'test/perf.test.ts': 'Performance benchmarks testing 100,000 spatial queries and hot-loop calculations.',
  'test/physics.test.ts': 'Unit tests verifying Rapier3D physics world gravity, kinematic character controller step, and collider streaming.',
  'test/save.test.ts': 'Unit tests verifying save serialization, data roundtripping, finite number validation, and legacy schema v3 migration.',
  'test/smoke.test.ts': 'End-to-end integration smoke test verifying districts, vehicles, weapons, and architecture.',
  'test/vehicles.test.ts': 'Unit tests verifying vehicle instance state, owned paint isolation, safe controller disposal, and pursuit despawning.',
  'test/wanted.test.ts': 'Unit tests verifying heat tier escalation, search radius, and evasion reset.'
};

let output = '';

output += '# SAN AURELIO - COMPLETE CODEBASE LINE BY LINE SPECIFICATION\n\n';
output += '> **Project:** SAN AURELIO - Web 3D Open-World Crime Sandbox  \n';
output += '> **Version:** 0.1.0-alpha (Production Master Build)  \n';
output += '> **Platform:** Browser-first 3D Open World (TypeScript Strict + Three.js + React + Zustand)  \n';
output += '> **Total Documented Files:** ' + fileList.length + '  \n';
output += '> **Generated At:** ' + new Date().toISOString() + '\n\n';

output += '---\n\n';
output += '## TABLE OF CONTENTS\n\n';

fileList.forEach((relPath, index) => {
  const anchor = relPath.toLowerCase().replace(/[^a-z0-9]/g, '-');
  output += `${index + 1}. [${relPath}](#${anchor}) - *${fileDescriptions[relPath] || ''}*\n`;
});

output += '\n---\n\n';

fileList.forEach((relPath, index) => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  const anchor = relPath.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const ext = path.extname(relPath).replace('.', '') || 'text';
  let lang = 'typescript';
  if (ext === 'json') lang = 'json';
  else if (ext === 'html') lang = 'html';
  else if (ext === 'md') lang = 'markdown';
  else if (ext === 'tsx') lang = 'tsx';
  else if (ext === 'ts') lang = 'typescript';

  output += `## ${index + 1}. \`${relPath}\`\n\n`;
  output += `<a id="${anchor}"></a>\n\n`;
  output += `**Role:** ${fileDescriptions[relPath] || 'Source file'}\n\n`;
  output += `- **File Path:** \`${relPath}\`\n`;
  output += `- **Total Lines:** ${lines.length}\n`;
  output += `- **Size:** ${(Buffer.byteLength(content, 'utf8') / 1024).toFixed(2)} KB\n\n`;

  output += `### Line-by-Line Source Code\n\n`;
  output += '```' + lang + '\n';

  lines.forEach((line, lineIdx) => {
    const lineNum = (lineIdx + 1).toString().padStart(4, '0');
    output += `${lineNum} | ${line}\n`;
  });

  output += '```\n\n';
  output += '---\n\n';
});

fs.writeFileSync(path.join(__dirname, 'CODEBASE_LINE_BY_LINE.md'), output, 'utf8');
console.log('Successfully generated CODEBASE_LINE_BY_LINE.md with all files line-by-line!');

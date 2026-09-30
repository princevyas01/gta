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

  // Master Documentation
  'README.md',
  'ARCHITECTURE.md',
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
  'test/math.test.ts',
  'test/missions.test.ts',
  'test/save.test.ts',
  'test/wanted.test.ts',
  'test/smoke.test.ts',
  'test/perf.test.ts'
];

const fileDescriptions = {
  'package.json': 'Project metadata, dependencies (React, Three.js, Zustand, Lucide, Vitest), and npm scripts.',
  'tsconfig.json': 'Strict TypeScript configuration targeting ES2022 with DOM and path aliases.',
  'vite.config.ts': 'Vite dev server and production bundler configuration with React plugin and alias resolution.',
  'index.html': 'Main HTML entry shell, viewport setup, base styles, and canvas container.',
  '.gitignore': 'Git ignore specifications preventing node_modules and build artifacts from version control.',
  'README.md': 'Master project documentation detailing lore, feature matrix, quickstart, controls, and test suite.',
  'ARCHITECTURE.md': 'In-depth engineering blueprint, runtime loop diagrams, and module responsibilities.',
  'WORLD_BIBLE.md': 'Canonical world bible for the Federal Republic of Vesper, Aurelio Province, and 26 districts.',
  'PERFORMANCE.md': 'Hardware performance tiers, draw call caps, triangle budgets, and GC avoidance rules.',
  'ASSET_PIPELINE.md': 'Procedural asset synthesis specifications conforming to 360-degree turntable contracts.',
  'DEBUGGING.md': 'Developer cheats, keyboard shortcuts, profiler overlays, and QA test execution.',
  'CHANGELOG.md': 'Release history documenting version releases and feature additions.',
  'src/core/types.ts': 'Domain TypeScript interfaces for Districts, POIs, Vehicles, Weapons, Player, NPCs, and Saves.',
  'src/core/math.ts': 'Coordinate conversion between 3D world space and 2D map space, vector helpers, and distance formulas.',
  'src/core/events.ts': 'Type-safe event bus facilitating decoupled pub/sub communication across all engine systems.',
  'src/core/clock.ts': 'Fixed 60Hz physics clock with accelerated 24-hour day/night cycle progression.',
  'src/core/input.ts': 'Input manager capturing keyboard, mouse aim, pointer lock, and touch inputs.',
  'src/core/audio.ts': 'Procedural Web Audio API sound synthesizer for vehicle RPM, gunshots, sirens, and UI clicks.',
  'src/data/districts.ts': 'Canonical dataset of all 26 districts with geographic bounds, colors, and archetypes.',
  'src/data/pois.ts': 'Dataset of canonical landmarks, safehouses, garages, shops, hospitals, and police stations.',
  'src/data/vehicles.ts': 'Specifications for all 10 canonical vehicle classes (speed, mass, acceleration, handling).',
  'src/data/weapons.ts': 'Arsenal dataset defining 6 weapon classes, damage, fire rates, magazine size, and spread.',
  'src/data/missions.ts': 'Data-driven missions including multi-stage story heists, time trials, and courier drops.',
  'src/save/saveManager.ts': 'Versioned save/load system supporting schema migration and localStorage persistence.',
  'src/rendering/materials.ts': 'Cached shared materials library for roads, concrete, glass, neon, and vehicle paint.',
  'src/rendering/particles.ts': 'Object-pooled GPU particle engine for explosions, muzzle flashes, and tire burnout smoke.',
  'src/rendering/sky.ts': 'Atmospheric day/night celestial lighting, sun orbit, dynamic fog, and rain particles.',
  'src/rendering/sceneManager.ts': 'Three.js master scene setup, perspective camera, ACES Filmic tone mapping, and shadows.',
  'src/world/roadNetwork.ts': 'Interconnected road graph spanning all 26 sectors with A* pathfinding and 3D GPS route ribbons.',
  'src/world/sectorBuilder.ts': 'Procedural architectural generator building skyscrapers, quays, warehouses, and collision meshes.',
  'src/world/worldStreamer.ts': 'Cell streaming manager loading hero high-LOD cells and perimeter proxy shells with hysteresis.',
  'src/player/characterModel.ts': 'Procedural 3D humanoid character model for Kai Mercer with articulated skeletal rig.',
  'src/player/thirdPersonCamera.ts': 'Orbital third-person camera with obstacle collision avoidance and shoulder aim zoom.',
  'src/player/playerController.ts': 'Locomotion controller handling movement, stamina, jumping, weapon sockets, and vehicle entry.',
  'src/vehicles/vehicleFactory.ts': 'Procedural 3D model generator for cars, bikes, boats, helicopters, and tanks.',
  'src/vehicles/vehicleController.ts': 'Vehicle physics controller handling suspension, drifting, flight lift, and tank turret.',
  'src/vehicles/vehicleManager.ts': 'Fleet manager handling vehicle spawning, player entry/exit, and police pursuit cruisers.',
  'src/npc/npcModel.ts': 'Procedural 3D models for pedestrians and police officers with animated walk cycles.',
  'src/npc/npcManager.ts': 'Crowd manager handling pedestrian schedules, fleeing reactions, and police retaliatory combat.',
  'src/combat/combatSystem.ts': 'Combat engine managing weapon firing, hitscan raycasting, rockets, recoil, and damage.',
  'src/law/wantedSystem.ts': '0-5 Star Wanted heat escalation manager with witness reporting and evasion cooldown.',
  'src/missions/missionManager.ts': 'Mission runner tracking active objectives, checkpoints, and cash reward payouts.',
  'src/ui/store.ts': 'Zustand reactive UI state store bridging engine telemetry and player stats to React.',
  'src/ui/HUD.tsx': 'HUD overlay with circular minimap radar, health/armor, cash, ammo, and speedometer.',
  'src/ui/InteractiveMap.tsx': 'Fullscreen 26-district pannable and zoomable map with POI filters and waypoint routing.',
  'src/ui/WeaponWheel.tsx': 'Radial tactical weapon selector overlay for rapid arsenal switching.',
  'src/ui/PhoneMenu.tsx': 'In-game smartphone (Aurelio OS) featuring vehicle delivery, contacts, and quick save.',
  'src/ui/DebugProfiler.tsx': 'Real-time telemetry overlay tracking FPS, draw calls, triangles, coordinates, and active cells.',
  'src/ui/ControlsOverlay.tsx': 'Controls cheat-sheet and on-screen touch buttons for mobile and tablet degradation.',
  'src/app/GameEngine.ts': 'Master game engine orchestrator coordinating graphics, physics, streaming, AI, and audio.',
  'src/app/App.tsx': 'Top-level React application component hosting the 3D canvas and all UI overlays.',
  'src/main.tsx': 'DOM entry point mounting the React root.',
  'test/math.test.ts': 'Unit tests verifying coordinate transformations, boundaries, and math utilities.',
  'test/missions.test.ts': 'Unit tests verifying mission loading, stage progression, and objective completion.',
  'test/save.test.ts': 'Unit tests verifying save serialization, data roundtripping, and legacy schema migration.',
  'test/wanted.test.ts': 'Unit tests verifying heat tier escalation, search radius, and evasion reset.',
  'test/smoke.test.ts': 'End-to-end integration smoke test verifying districts, vehicles, weapons, and architecture.',
  'test/perf.test.ts': 'Performance benchmarks testing 100,000 spatial queries and hot-loop calculations.'
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

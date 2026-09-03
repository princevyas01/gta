# SAN AURELIO - Web 3D Open-World Crime Sandbox

> **Original IP 3D Open-World Browser Action Sandbox**  
> Inspired by the systemic depth, traversability, and crime sandbox freedom of AAA classics (GTA V reference quality target) while strictly maintaining 100% original world lore, characters, vehicles, and branding.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![Three.js](https://img.shields.io/badge/Three.js-0.174-green.svg)
![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)

---

## 🌟 Key Features

1. **26 Canonical Sectors & Streamed World:**
   - From high-density skyscrapers in Meridian Core to industrial docks, sunny promenades, mountain switchbacks, and military checkpoints.
   - Dynamic sector streaming manager maintaining 60 FPS performance without memory leaks.
2. **Hero Traversal & Control (Kai Mercer / Mira Kade):**
   - Responsive 3rd-person camera with smooth orbit, collision dampening, and shoulder aiming.
   - 8-direction locomotion blend (walk, jog, sprint, jump, climb, vault, vehicle mounting).
3. **10 Original Vehicle Classes:**
   - **Cars & Vans:** VX-9 Kestrel (Sports Coupe), Aurelia Regent (Sedan), Redwood 250 (Pickup), Courier L4 (Van), Mica Hatch (Compact).
   - **Bikes:** Kite 600 street motorbike with dynamic leaning.
   - **Boats:** TideRunner 24 offshore planing hull with dynamic water spray.
   - **Aircraft:** HX-4 Sparrow utility helicopter with collective lift, cyclic pitch/roll, and searchlight.
   - **Tanks:** AR-7 Mastiff light tank with dual-track differential driving and 360-degree aiming cannon.
   - **Law Enforcement:** AMPS Police Cruiser with responsive sirens and pursuit AI.
4. **Combat & Weapons Arsenal:**
   - P1 Vesper & Kestrel 9 (Pistols), Vortex 45 (SMG), Rook-12 (Shotgun), Arcline AR (Assault Rifle), Crownline S-7 (Sniper), Ramjet L (Heavy Launcher).
   - Hitscan ballistics, recoil, muzzle flash particles, impact sparks, and sound synthesis.
5. **Law Enforcement & 0-5 Star Heat System:**
   - Witness detection, police cruiser spawning, road pursuit, roadblock tactics, and line-of-sight cooldown evasion.
6. **Data-Driven Missions & Side Activities:**
   - Multi-phase heist missions ("Meridian Syndicate", "Getaway Blueprint"), high-speed street sprints, courier drops.
7. **Interactive Clickable Map & GPS Route Ribbon:**
   - Full-screen pan/zoom interactive map of Aurelio Province with district inspections, landmark POIs, and 3D world-space route ribbons.
8. **Synthesized Web Audio Engine:**
   - Procedural engine RPM pitch modulation, tire skid squeals, gunfire acoustics, police siren warbles, and UI feedback.
9. **Persistence & Save States:**
   - Versioned save/load system storing player location, cash (AUR), inventory, weapon ammo, vehicle states, and mission milestones.

---

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/user/san-aurelio.git
cd san-aurelio

# Install dependencies
npm install

# Launch local development server
npm run dev
```

### Production Build & Testing
```bash
# Run unit and simulation tests
npm run test

# Run end-to-end smoke test
npm run test:e2e

# Run performance benchmark suite
npm run perf

# Build production bundle
npm run build
```

---

## 🎮 Controls

- **W, A, S, D:** Movement / Vehicle Throttle & Steering
- **Mouse / Drag:** Look & Aim Camera
- **Left Click:** Attack / Fire Weapon / Cannon
- **Right Click:** Aim Down Sights (ADS)
- **Space:** Jump (Foot) / Handbrake Drift (Vehicle)
- **Left Shift:** Sprint (Foot) / Nitro Boost (Vehicle)
- **E / F:** Enter / Exit Vehicle
- **Tab:** Open Weapon Radial Wheel
- **1, 2, 3, 4, 5, 6:** Direct Weapon Hotkeys
- **R:** Tactical Reload
- **M:** Fullscreen Interactive Map & GPS Waypoint
- **P / Esc:** Pause & In-Game Smartphone
- **~ / F3:** Toggle Telemetry & Debug Profiler
- **V:** Cycle Camera View (Close, Far, Cockpit)

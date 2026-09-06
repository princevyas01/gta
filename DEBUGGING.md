# SAN AURELIO - DEBUGGING & QA GUIDE

---

## 1. Developer Shortcuts & Cheat Codes

| Key / Shortcut | Action | Description |
|---|---|---|
| **~** or **F3** | Toggle Debug Profiler | Shows FPS, draw calls, triangles, active sector, physics bodies |
| **M** | Toggle Full Map | Opens interactive 26-district map with POI routing and waypoints |
| **Tab** | Weapon Wheel | Quick-select from 6 primary weapon classes |
| **P** or **Esc** | Pause Menu / Phone | In-game smartphone, settings, missions, restart checkpoint |
| **E** or **F** | Vehicle Enter / Exit | Enters nearest driver seat or dismounts active vehicle |
| **V** | Change Camera Mode | Cycles Close, Far, Hood/Cockpit, Free orbit |
| **R** | Reload Weapon | Triggers tactical reload animation and updates magazine pool |
| **Space** | Jump / Handbrake | Foot jump or vehicle handbrake drift |
| **Shift** | Sprint / Nitro Boost | Fast locomotion or vehicle velocity boost |
| **1 - 6** | Direct Weapon Select | Pistol, SMG, Shotgun, Assault Rifle, Sniper, Launcher |

---

## 2. Automated Smoke & Unit Tests
Run the complete automated test suite via npm:
```bash
npm run test         # Executes Vitest suite for core simulation, missions, math, saves
npm run test:e2e     # End-to-end simulation smoke test (player -> vehicle -> combat -> map -> save)
npm run lint         # TypeScript strict type checking
npm run build        # Production bundle compilation
```

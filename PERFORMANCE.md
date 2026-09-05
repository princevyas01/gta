# SAN AURELIO - PERFORMANCE & BUDGET TARGETS

---

## 1. Frame Rate & Hardware Tiers

| Profile | Target FPS | Max Draw Calls | Max Triangles | Shadow Res | Distance LOD |
|---|---|---|---|---|---|
| **High (Discrete GPU)** | 60 FPS | < 250 | < 350,000 | 2048x2048 | 800m |
| **Medium (Integrated GPU)** | 45-60 FPS | < 160 | < 200,000 | 1024x1024 | 500m |
| **Low / Fallback (Laptops/Mobile)**| 30 FPS | < 90 | < 100,000 | Disabled / Hard | 300m |

---

## 2. Allocation & GC Hygiene
- **Zero Allocations in Hot Update Loops:** Reuse vectors, quaternions, and raycasters via statically initialized scratch objects (`_v0`, `_v1`, `_q0`, etc.).
- **Object Pooling:** Projectiles, muzzle flashes, blood/spark impact decals, and spent shell casings use reusable pools with pre-allocated array indices.
- **Instancing:** Streetlights, road barriers, traffic cones, trees, and windows are batched using `THREE.InstancedMesh` with dynamic transform buffers.

---

## 3. Real-Time Telemetry
The built-in HUD Debug Profiler tracks:
- Render FPS & Frame Delta ($dt$ in ms)
- WebGL Draw Call Count
- Rendered Geometric Faces / Triangles
- Active Streaming Cells
- Active Physics Entities & Simulation Bodies
- Wanted Level & Current Law Dispatch State

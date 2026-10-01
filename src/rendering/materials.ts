import * as THREE from 'three';

/**
 * Procedural Canvas Texture Generator for PBR roughness, window atlases,
 * asphalt aggregate, and architectural weathering.
 */
function createAsphaltTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#22252a';
  ctx.fillRect(0, 0, 256, 256);

  // Grain aggregate
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const shade = 28 + Math.floor(Math.random() * 32);
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Asphalt repair patch
  ctx.fillStyle = 'rgba(15, 18, 22, 0.4)';
  ctx.fillRect(40, 60, 110, 75);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createWindowAtlasTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 512);

  // 8x8 window grid
  const cols = 8;
  const rows = 8;
  const cellW = 512 / cols;
  const cellH = 512 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isLit = (r * 11 + c * 7) % 3 === 0;
      const x = c * cellW + 6;
      const y = r * cellH + 6;
      const w = cellW - 12;
      const h = cellH - 12;

      // Mullion border
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x - 2, y - 2, w + 4, h + 4);

      if (isLit) {
        const warm = (r + c) % 2 === 0;
        ctx.fillStyle = warm ? '#fef08a' : '#bae6fd'; // warm amber or cool office cyan
        ctx.fillRect(x, y, w, h);

        // Blinds / floor division
        ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
        for (let b = 0; b < h; b += 8) {
          ctx.fillRect(x, y + b, w, 2);
        }
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x, y, w, h);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createGrimeGradientTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 128, 0, 0);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.7)');
  grad.addColorStop(0.3, 'rgba(30, 41, 59, 0.3)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Shared material cache with authentic PBR material variations
 */
class MaterialLibrary {
  public asphaltTexture = createAsphaltTexture();
  public windowAtlasTexture = createWindowAtlasTexture();
  public grimeTexture = createGrimeGradientTexture();

  // 1. Ground & Road System Materials (Page 16 & 24)
  public roadMaterial = (() => {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1f242e,
      roughness: 0.85,
      metalness: 0.1
    });
    if (this.asphaltTexture) mat.map = this.asphaltTexture;
    return mat;
  })();

  public roadMarkingWhite = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.55,
    metalness: 0.05
  });

  public roadMarkingYellow = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.55,
    metalness: 0.05
  });

  public curbMaterial = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.92,
    metalness: 0.08
  });

  public sidewalkMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.88,
    metalness: 0.05
  });

  public gutterMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.95,
    metalness: 0.15
  });

  public stormDrainMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.4,
    metalness: 0.85
  });

  public grassMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d5a27,
    roughness: 0.95,
    metalness: 0.0
  });

  public sandMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    roughness: 0.92,
    metalness: 0.0
  });

  public waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.08,
    metalness: 0.85,
    transparent: true,
    opacity: 0.88
  });

  // 2. Architectural Facade & Building Kit Materials (Page 16 & 26-28)
  public towerGlassMaterial = new THREE.MeshStandardMaterial({
    color: 0x0369a1,
    roughness: 0.12,
    metalness: 0.92,
    transparent: true,
    opacity: 0.92
  });

  public facadeWindowAtlasMaterial = (() => {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.7
    });
    if (this.windowAtlasTexture) mat.map = this.windowAtlasTexture;
    return mat;
  })();

  public concretePrecastMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.78,
    metalness: 0.15
  });

  public brickHistoricMaterial = new THREE.MeshStandardMaterial({
    color: 0x991b1b,
    roughness: 0.86,
    metalness: 0.04
  });

  public plasterStuccoMaterial = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.82,
    metalness: 0.05
  });

  public luxuryMarbleMaterial = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.18,
    metalness: 0.3
  });

  public architecturalTrimMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.5,
    metalness: 0.6
  });

  public industrialCorrugatedMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.7,
    metalness: 0.65
  });

  public oxidizedRustMaterial = new THREE.MeshStandardMaterial({
    color: 0x7c2d12,
    roughness: 0.94,
    metalness: 0.35
  });

  public galvanizedSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.38,
    metalness: 0.85
  });

  // 3. Street Furniture, Props & Lighting
  public streetlightPoleMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.35,
    metalness: 0.8
  });

  public streetlightEmitterMaterial = new THREE.MeshBasicMaterial({
    color: 0xffedd5
  });

  public neonPink = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
  public neonCyan = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
  public neonAmber = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  public trafficRed = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  public trafficYellow = new THREE.MeshBasicMaterial({ color: 0xeab308 });
  public trafficGreen = new THREE.MeshBasicMaterial({ color: 0x22c55e });

  // 4. Vehicle Materials (Page 16 & 56)
  public vehicleTire = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.92,
    metalness: 0.08
  });

  public vehicleGlass = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.05,
    metalness: 0.95,
    transparent: true,
    opacity: 0.78
  });

  public vehicleChrome = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.1,
    metalness: 0.98
  });

  public vehicleInteriorDark = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.85,
    metalness: 0.1
  });

  public vehicleHeadlight = new THREE.MeshBasicMaterial({ color: 0xffffff });
  public vehicleTaillight = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  public vehicleSirenRed = new THREE.MeshBasicMaterial({ color: 0xff0033 });
  public vehicleSirenBlue = new THREE.MeshBasicMaterial({ color: 0x0066ff });
}

export const materialLib = new MaterialLibrary();

import * as THREE from 'three';
import { AtmosphereSystem } from './sky';
import { ParticleSystem } from './particles';

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public atmosphere: AtmosphereSystem;
  public particles: ParticleSystem;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x7bb6e0);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.2, 2000);
    this.camera.position.set(0, 10, 20);

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    container.appendChild(this.renderer.domElement);

    this.atmosphere = new AtmosphereSystem(this.scene);
    this.particles = new ParticleSystem(this.scene);

    window.addEventListener('resize', this.handleResize.bind(this, container));
  }

  private handleResize(container: HTMLElement): void {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public render(): { drawCalls: number; triangles: number } {
    this.renderer.render(this.scene, this.camera);
    return {
      drawCalls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles
    };
  }

  public dispose(): void {
    this.renderer.dispose();
  }
}

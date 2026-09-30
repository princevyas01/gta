import * as THREE from 'three';
import { WebGPURenderer } from 'three/webgpu';
import { AtmosphereSystem } from './sky';
import { ParticleSystem } from './particles';

export class SceneManager {
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;
  public renderer!: WebGPURenderer;
  public readonly atmosphere: AtmosphereSystem;
  public readonly particles: ParticleSystem;
  public readonly ready: Promise<void>;
  private readonly container: HTMLElement;
  private readonly resizeHandler: () => void;
  private disposed = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x7bb6e0);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(65, width / Math.max(height, 1), 0.2, 2400);
    this.camera.position.set(0, 10, 20);

    this.atmosphere = new AtmosphereSystem(this.scene);
    this.particles = new ParticleSystem(this.scene);

    this.resizeHandler = () => this.handleResize();
    window.addEventListener('resize', this.resizeHandler);

    this.ready = this.initializeRenderer(width, height);
  }

  private async initializeRenderer(width: number, height: number): Promise<void> {
    this.renderer = new WebGPURenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    await this.renderer.init();

    if (this.disposed) {
      this.renderer.dispose();
      return;
    }

    this.container.appendChild(this.renderer.domElement);
  }

  public setAnimationLoop(callback: ((time: number) => void) | null): void {
    if (!this.renderer) return;
    this.renderer.setAnimationLoop(callback);
  }

  public stopAnimationLoop(): void {
    if (!this.renderer) return;
    this.renderer.setAnimationLoop(null);
  }

  private handleResize(): void {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
    if (this.renderer) {
      this.renderer.setSize(width, height);
    }
  }

  public render(): { drawCalls: number; triangles: number } {
    if (!this.renderer) {
      return { drawCalls: 0, triangles: 0 };
    }
    this.renderer.render(this.scene, this.camera);
    return {
      drawCalls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles
    };
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    window.removeEventListener('resize', this.resizeHandler);
    this.renderer?.setAnimationLoop(null);
    this.renderer?.dispose();
    this.atmosphere.dispose();
    this.particles.dispose();
    this.scene.traverse(object => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.geometry?.dispose();
      }
    });
    this.container.replaceChildren();
  }
}

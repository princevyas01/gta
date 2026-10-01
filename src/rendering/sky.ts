import * as THREE from 'three';

export class AtmosphereSystem {
  private dirLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private scene: THREE.Scene;
  private rainPoints: THREE.Points | null = null;
  private rainGeometry: THREE.BufferGeometry | null = null;
  private rainMaterial: THREE.PointsMaterial | null = null;
  private isRaining: boolean = false;
  private readonly backgroundColor = new THREE.Color(0x7bb6e0);

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.scene.background = this.backgroundColor;

    // Directional Sun / Moon light
    this.dirLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 0.5;
    this.dirLight.shadow.camera.far = 500;
    const shadowDist = 80;
    this.dirLight.shadow.camera.left = -shadowDist;
    this.dirLight.shadow.camera.right = shadowDist;
    this.dirLight.shadow.camera.top = shadowDist;
    this.dirLight.shadow.camera.bottom = -shadowDist;
    this.dirLight.shadow.bias = -0.0005;
    scene.add(this.dirLight);

    // Hemisphere Ambient sky & ground bounce
    this.hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0x384152, 0.65);
    scene.add(this.hemiLight);

    // Background fog
    scene.fog = new THREE.FogExp2(0xa0c4df, 0.0018);
  }

  public update(timeOfDay: number, playerPos: THREE.Vector3, weather: string): void {
    // timeOfDay: 0.0 - 24.0 hours
    // Calculate sun angle: noon (12:00) is zenith (angle = PI/2)
    const sunAngle = ((timeOfDay - 6) / 24) * Math.PI * 2;
    const sunHeight = Math.sin(sunAngle);
    const sunCos = Math.cos(sunAngle);

    // Light position tracks player to maintain crisp shadows
    const lightDist = 180;
    this.dirLight.position.set(
      playerPos.x + sunCos * lightDist,
      Math.max(10, playerPos.y + sunHeight * lightDist),
      playerPos.z + 40
    );
    this.dirLight.target.position.copy(playerPos);
    this.dirLight.target.updateMatrixWorld();

    // Atmosphere color modulation
    if (sunHeight > 0.15) {
      // Daytime
      const t = Math.min(1, (sunHeight - 0.15) / 0.5);
      this.dirLight.color.setRGB(1.0, 0.95 + t * 0.05, 0.85 + t * 0.15);
      this.dirLight.intensity = 1.2 + t * 0.3;
      this.hemiLight.color.setHex(0xb1e1ff);
      this.hemiLight.groundColor.setHex(0x384152);
      this.hemiLight.intensity = 0.65;
      if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.setHex(0xa0c4df);
      }
      this.backgroundColor.setHex(0x7bb6e0);
    } else if (sunHeight > -0.1) {
      // Golden Hour / Sunset / Dawn
      this.dirLight.color.setHex(0xff7733);
      this.dirLight.intensity = 0.9;
      this.hemiLight.color.setHex(0xf97316);
      this.hemiLight.groundColor.setHex(0x1e1b4b);
      this.hemiLight.intensity = 0.45;
      if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.setHex(0xd97706);
      }
      this.backgroundColor.setHex(0xb45309);
    } else {
      // Night
      this.dirLight.color.setHex(0x60a5fa);
      this.dirLight.intensity = 0.25;
      this.hemiLight.color.setHex(0x1e293b);
      this.hemiLight.groundColor.setHex(0x020617);
      this.hemiLight.intensity = 0.35;
      if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.setHex(0x0a0f1d);
      }
      this.backgroundColor.setHex(0x090d16);
    }

    // Weather handling
    this.updateWeather(weather, playerPos);
  }

  private updateWeather(weather: string, playerPos: THREE.Vector3): void {
    if (weather === 'rain') {
      if (!this.isRaining) {
        this.initRain();
      }
      if (this.rainPoints && this.rainGeometry) {
        this.rainPoints.position.set(playerPos.x, 0, playerPos.z);
        const posAttr = this.rainGeometry.attributes.position as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;
        for (let i = 1; i < array.length; i += 3) {
          array[i] -= 1.8; // Fall velocity
          if (array[i] < 0) array[i] = 40;
        }
        posAttr.needsUpdate = true;
      }
    } else if (this.isRaining) {
      this.removeRain();
    }
  }

  private initRain(): void {
    const rainCount = 1800;
    const positions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    this.rainGeometry = new THREE.BufferGeometry();
    this.rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.rainMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.15,
      transparent: true,
      opacity: 0.6
    });
    this.rainPoints = new THREE.Points(this.rainGeometry, this.rainMaterial);
    this.scene.add(this.rainPoints);
    this.isRaining = true;
  }

  private removeRain(): void {
    if (this.rainPoints) {
      this.scene.remove(this.rainPoints);
      this.rainGeometry?.dispose();
      this.rainMaterial?.dispose();
      this.rainPoints = null;
      this.rainGeometry = null;
      this.rainMaterial = null;
    }
    this.isRaining = false;
  }

  public dispose(): void {
    this.removeRain();
    this.scene.remove(this.dirLight);
    this.dirLight.dispose?.();
    this.scene.remove(this.hemiLight);
    this.hemiLight.dispose?.();
    if (this.scene.fog) {
      this.scene.fog = null;
    }
  }
}

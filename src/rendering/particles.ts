import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private pool: Particle[] = [];
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private points: THREE.Points;
  private maxParticles = 1200;
  private positions: Float32Array;
  private colors: Float32Array;

  // Pooled scratch objects to eliminate per-emission allocations
  private readonly scratchVel = new THREE.Vector3();
  private readonly fireColor = new THREE.Color(0xff5500);
  private readonly smokeColor = new THREE.Color(0x888888);
  private readonly flashColor = new THREE.Color(0xffea00);
  private readonly tireSmokeColor = new THREE.Color(0xcccccc);

  constructor(scene: THREE.Scene) {
    this.positions = new Float32Array(this.maxParticles * 3);
    this.colors = new Float32Array(this.maxParticles * 3);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);

    // Pre-populate pool
    for (let i = 0; i < this.maxParticles; i++) {
      this.pool.push({
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: 0,
        size: 0,
        color: new THREE.Color()
      });
    }
  }

  public emit(
    pos: THREE.Vector3,
    velocity: THREE.Vector3,
    color: THREE.Color,
    maxLife = 0.5,
    size = 0.35
  ): void {
    if (this.particles.length >= this.maxParticles) return;
    const particle = this.pool.pop() ?? {
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: 0,
      size: 0,
      color: new THREE.Color()
    };
    particle.position.copy(pos);
    particle.velocity.copy(velocity);
    particle.life = maxLife;
    particle.maxLife = maxLife;
    particle.size = size;
    particle.color.copy(color);
    this.particles.push(particle);
  }

  public emitExplosion(pos: THREE.Vector3): void {
    for (let i = 0; i < 45; i++) {
      this.scratchVel.set(
        (Math.random() - 0.5) * 16,
        Math.random() * 12 + 2,
        (Math.random() - 0.5) * 16
      );
      this.emit(
        pos,
        this.scratchVel,
        Math.random() > 0.4 ? this.fireColor : this.smokeColor,
        0.8 + Math.random() * 0.5,
        0.6
      );
    }
  }

  public emitMuzzleFlash(pos: THREE.Vector3, dir: THREE.Vector3): void {
    for (let i = 0; i < 8; i++) {
      this.scratchVel.copy(dir).multiplyScalar(15);
      this.scratchVel.x += (Math.random() - 0.5) * 3;
      this.scratchVel.y += (Math.random() - 0.5) * 3;
      this.scratchVel.z += (Math.random() - 0.5) * 3;
      this.emit(pos, this.scratchVel, this.flashColor, 0.08, 0.4);
    }
  }

  public emitTireSmoke(pos: THREE.Vector3): void {
    for (let i = 0; i < 3; i++) {
      this.scratchVel.set(
        (Math.random() - 0.5) * 1.5,
        Math.random() * 2 + 0.5,
        (Math.random() - 0.5) * 1.5
      );
      this.emit(pos, this.scratchVel, this.tireSmokeColor, 0.6, 0.45);
    }
  }

  public update(dt: number): void {
    let aliveCount = 0;
    const posAttr = this.geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = this.geometry.attributes.color as THREE.BufferAttribute;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        // Swap-delete compaction without splice
        this.pool.push(p);
        const last = this.particles.pop()!;
        if (i < this.particles.length) {
          this.particles[i] = last;
        }
        continue;
      }

      p.position.addScaledVector(p.velocity, dt);
      p.velocity.y -= 9.8 * dt * 0.3; // Gentle gravity

      const idx = aliveCount * 3;
      this.positions[idx] = p.position.x;
      this.positions[idx + 1] = p.position.y;
      this.positions[idx + 2] = p.position.z;

      const alpha = p.life / p.maxLife;
      this.colors[idx] = p.color.r * alpha;
      this.colors[idx + 1] = p.color.g * alpha;
      this.colors[idx + 2] = p.color.b * alpha;

      aliveCount++;
    }

    // Zero out unused tail
    for (let i = aliveCount * 3; i < this.maxParticles * 3; i++) {
      this.positions[i] = 0;
      this.colors[i] = 0;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    this.geometry.setDrawRange(0, aliveCount);
  }

  public dispose(): void {
    for (const p of this.particles) {
      this.pool.push(p);
    }
    this.particles.length = 0;
    this.geometry.dispose();
    this.material.dispose();
    this.sceneRemove();
  }

  private sceneRemove(): void {
    this.points.removeFromParent();
  }
}

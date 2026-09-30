class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private engineGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private sirenGain: GainNode | null = null;
  private sirenOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isEngineRunning: boolean = false;
  private isSirenActive: boolean = false;

  public init(): void {
    if (this.ctx) return;
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.65;
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('[Audio] Web Audio API not supported or blocked:', e);
    }
  }

  private ensureContext(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return !!this.ctx;
  }

  public unlock(): void {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : 0.65;
    }
  }

  /**
   * Plays a synthesized weapon gunshot
   */
  public playGunshot(weaponClass: string): void {
    if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Noise buffer for blast punch
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    const noiseGain = this.ctx.createGain();

    if (weaponClass === 'shotgun' || weaponClass === 'launcher') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.25);
      filter.frequency.setValueAtTime(800, t);
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

      noiseFilter.frequency.setValueAtTime(1200, t);
      noiseGain.gain.setValueAtTime(0.9, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
    } else if (weaponClass === 'sniper') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);
      filter.frequency.setValueAtTime(1800, t);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

      noiseFilter.frequency.setValueAtTime(2200, t);
      noiseGain.gain.setValueAtTime(0.7, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
    } else {
      // Standard pistol / AR / SMG
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
      filter.frequency.setValueAtTime(2000, t);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

      noiseFilter.frequency.setValueAtTime(3000, t);
      noiseGain.gain.setValueAtTime(0.4, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    }

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    osc.start(t);
    noise.start(t);
    osc.stop(t + 0.35);
    noise.stop(t + 0.25);
  }

  /**
   * Starts continuous vehicle engine audio loop with dynamic RPM pitch
   */
  public startVehicleEngine(): void {
    if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain || this.isEngineRunning) return;

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.value = 0.25;
    this.engineGain.connect(this.masterGain);

    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.setValueAtTime(65, this.ctx.currentTime); // Idle 65 Hz
    this.engineOsc.connect(this.engineGain);
    this.engineOsc.start();
    this.isEngineRunning = true;
  }

  /**
   * Updates vehicle RPM audio
   * @param speedRatio Normalized 0.0 to 1.0 vehicle top speed ratio
   */
  public updateVehicleEngine(speedRatio: number): void {
    if (!this.isEngineRunning || !this.engineOsc || !this.ctx || !this.engineGain) return;
    const targetFreq = 55 + speedRatio * 180;
    this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
    this.engineGain.gain.setTargetAtTime(0.2 + speedRatio * 0.25, this.ctx.currentTime, 0.08);
  }

  public stopVehicleEngine(): void {
    if (!this.isEngineRunning) return;
    try {
      this.engineOsc?.stop();
      this.engineOsc?.disconnect();
      this.engineGain?.disconnect();
    } catch (e) {}
    this.isEngineRunning = false;
    this.engineOsc = null;
    this.engineGain = null;
  }

  /**
   * Police siren warble sound
   */
  public setPoliceSiren(active: boolean): void {
    if (active === this.isSirenActive) return;
    if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;

    if (active) {
      this.sirenGain = this.ctx.createGain();
      this.sirenGain.gain.value = 0.25;
      this.sirenGain.connect(this.masterGain);

      this.sirenOsc = this.ctx.createOscillator();
      this.sirenOsc.type = 'sine';
      this.sirenOsc.frequency.setValueAtTime(650, this.ctx.currentTime);
      this.sirenOsc.connect(this.sirenGain);
      this.sirenOsc.start();

      // Modulate frequency between 600 Hz and 950 Hz
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 1.8; // 1.8 Hz cycle
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 250;
      lfo.connect(lfoGain);
      lfoGain.connect(this.sirenOsc.frequency);
      lfo.start();

      this.isSirenActive = true;
    } else {
      try {
        this.sirenOsc?.stop();
        this.sirenOsc?.disconnect();
        this.sirenGain?.disconnect();
      } catch (e) {}
      this.isSirenActive = false;
      this.sirenOsc = null;
      this.sirenGain = null;
    }
  }

  /**
   * Tactical reload sound click
   */
  public playReload(): void {
    if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.setValueAtTime(800, t + 0.08);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.16);
  }

  /**
   * UI Click / Stinger feedback
   */
  public playUIClick(): void {
    if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.06);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  /**
   * Mission Objective Completed Stinger
   */
  public playMissionStinger(): void {
    if (!this.ensureContext() || this.isMuted || !this.ctx || !this.masterGain) return;
    const notes = [440, 554.37, 659.25, 880]; // A major chord arpeggio
    notes.forEach((freq, idx) => {
      const t = this.ctx!.currentTime + idx * 0.09;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(t);
      osc.stop(t + 0.36);
    });
  }
}

export const soundEngine = new SoundEngine();

// Call exactly once from a trusted pointer/keyboard gesture.
export function unlockGameAudio(): void {
  soundEngine.unlock();
}

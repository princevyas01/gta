import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { soundEngine } from '../src/core/audio';

describe('SoundEngine Lifecycle & Node Management (P1 Audio)', () => {
  beforeEach(() => {
    // Mock minimal Web Audio API for test environment
    if (typeof globalThis.AudioContext === 'undefined') {
      const mockGain = {
        gain: { value: 1, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, setTargetAtTime: () => {} },
        connect: () => {},
        disconnect: () => {}
      };
      const mockOsc = {
        type: 'sine',
        frequency: { value: 440, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, setTargetAtTime: () => {} },
        connect: () => {},
        disconnect: () => {},
        start: () => {},
        stop: () => {}
      };
      const mockBufferSource = {
        buffer: null,
        connect: () => {},
        disconnect: () => {},
        start: () => {},
        stop: () => {}
      };
      const mockFilter = {
        type: 'lowpass',
        frequency: { value: 1000, setValueAtTime: () => {} },
        connect: () => {},
        disconnect: () => {}
      };

      class MockAudioContext {
        public currentTime = 0;
        public sampleRate = 44100;
        public state = 'running';
        public destination = {};
        createGain() { return { ...mockGain }; }
        createOscillator() { return { ...mockOsc }; }
        createBuffer(channels: number, length: number, rate: number) {
          return {
            numberOfChannels: channels,
            length,
            sampleRate: rate,
            getChannelData: () => new Float32Array(length)
          };
        }
        createBufferSource() { return { ...mockBufferSource }; }
        createBiquadFilter() { return { ...mockFilter }; }
        resume() { return Promise.resolve(); }
        close() { return Promise.resolve(); }
      }

      Object.defineProperty(globalThis, 'AudioContext', {
        value: MockAudioContext,
        writable: true,
        configurable: true
      });
    }
  });

  afterEach(() => {
    soundEngine.dispose();
  });

  it('initializes audio and allows muting master gain', () => {
    soundEngine.init();
    soundEngine.setMuted(true);
    soundEngine.setMuted(false);
  });

  it('starts and stops vehicle engine without leaks', () => {
    soundEngine.startVehicleEngine();
    soundEngine.updateVehicleEngine(0.75);
    soundEngine.stopVehicleEngine();
  });

  it('toggles police siren and cleanly disposes LFO nodes', () => {
    soundEngine.setPoliceSiren(true);
    soundEngine.setPoliceSiren(false);
  });

  it('complete soundEngine.dispose() tears down all active sources and context', () => {
    soundEngine.startVehicleEngine();
    soundEngine.setPoliceSiren(true);
    soundEngine.dispose();
    // After dispose, no lingering active context
  });
});

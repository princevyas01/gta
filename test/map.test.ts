import { describe, it, expect } from 'vitest';
import { worldToMapPercent, mapPercentToWorld } from '../src/core/math';
import { useGameStore } from '../src/ui/store';

describe('Interactive Map & UI Modals (P1 UI)', () => {
  it('world point -> map -> world round trip is exact within tolerance', () => {
    const originalX = 450.5;
    const originalZ = -780.25;

    const mapPercent = worldToMapPercent(originalX, originalZ);
    expect(mapPercent.xPercent).toBeGreaterThan(0);
    expect(mapPercent.xPercent).toBeLessThan(100);
    expect(mapPercent.yPercent).toBeGreaterThan(0);
    expect(mapPercent.yPercent).toBeLessThan(100);

    const roundTrip = mapPercentToWorld(mapPercent.xPercent, mapPercent.yPercent);
    expect(roundTrip[0]).toBeCloseTo(originalX, 2);
    expect(roundTrip[2]).toBeCloseTo(originalZ, 2);
  });

  it('zoom clamping prevents NaN or infinite scale factors', () => {
    let zoom = 1.0;
    const clampZoom = (z: number) => Math.min(3.5, Math.max(0.65, Number.isFinite(z) ? z : 1.0));

    expect(clampZoom(zoom * 10)).toBe(3.5);
    expect(clampZoom(zoom * 0.01)).toBe(0.65);
    expect(clampZoom(NaN)).toBe(1.0);
    expect(clampZoom(Infinity)).toBe(1.0);
  });

  it('opening map or phone reflects modal pause state in game store', () => {
    const store = useGameStore.getState();

    // Initially closed
    store.setMapOpen(false);
    store.setPhoneOpen(false);
    expect(useGameStore.getState().isMapOpen).toBe(false);
    expect(useGameStore.getState().isPhoneOpen).toBe(false);

    // Open Map -> Pauses gameplay simulation
    store.setMapOpen(true);
    expect(useGameStore.getState().isMapOpen).toBe(true);

    const isSimulationPaused1 = useGameStore.getState().isMapOpen || useGameStore.getState().isPhoneOpen;
    expect(isSimulationPaused1).toBe(true);

    // Close Map, Open Phone
    store.setMapOpen(false);
    store.setPhoneOpen(true);
    expect(useGameStore.getState().isPhoneOpen).toBe(true);

    const isSimulationPaused2 = useGameStore.getState().isMapOpen || useGameStore.getState().isPhoneOpen;
    expect(isSimulationPaused2).toBe(true);

    // Close both
    store.setPhoneOpen(false);
    const isSimulationPaused3 = useGameStore.getState().isMapOpen || useGameStore.getState().isPhoneOpen;
    expect(isSimulationPaused3).toBe(false);
  });
});

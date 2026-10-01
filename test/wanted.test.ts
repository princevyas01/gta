import { describe, it, expect } from 'vitest';
import { WantedSystem } from '../src/law/wantedSystem';
import { eventBus } from '../src/core/events';

describe('Law Enforcement Wanted System', () => {
  it('starts at Heat 0 with no pursuit', () => {
    const wanted = new WantedSystem();
    expect(wanted.heat).toBe(0);
    expect(wanted.searchRadius).toBe(0);
    expect(wanted.isCoolingDown).toBe(false);
    wanted.dispose();
  });

  it('escalates heat upon serious criminal actions', () => {
    const wanted = new WantedSystem();
    wanted.setHeat(1);
    expect(wanted.heat).toBe(1);
    expect(wanted.searchRadius).toBe(110);

    wanted.setHeat(3);
    expect(wanted.heat).toBe(3);
    expect(wanted.searchRadius).toBe(180);
    wanted.dispose();
  });

  it('updates lastKnownPosition from non-origin witness position (P15, P56)', () => {
    const wanted = new WantedSystem();
    eventBus.emit('WITNESS_EVENT', {
      position: [350, 0, -420],
      severity: 3
    });

    expect(wanted.lastKnownPosition.x).toBe(350);
    expect(wanted.lastKnownPosition.z).toBe(-420);
    expect(wanted.heat).toBeGreaterThanOrEqual(1);
    wanted.dispose();
  });

  it('resets heat upon complete evasion', () => {
    const wanted = new WantedSystem();
    wanted.setHeat(2);
    expect(wanted.heat).toBe(2);

    wanted.setHeat(0);
    expect(wanted.heat).toBe(0);
    expect(wanted.searchRadius).toBe(0);
    wanted.dispose();
  });

  it('disposes event listeners cleanly without leaks (P15)', () => {
    const wanted = new WantedSystem();
    wanted.dispose();

    // Emitting events after dispose should not trigger state change in dead system
    eventBus.emit('WEAPON_FIRED', { weaponId: 'wep_p1_vesper', ammoLeft: 10 });
    expect(wanted.heat).toBe(0);
  });
});

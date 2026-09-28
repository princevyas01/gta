import { describe, it, expect } from 'vitest';
import { WantedSystem } from '../src/law/wantedSystem';

describe('Law Enforcement Wanted System', () => {
  it('starts at Heat 0 with no pursuit', () => {
    const wanted = new WantedSystem();
    expect(wanted.heat).toBe(0);
    expect(wanted.searchRadius).toBe(0);
    expect(wanted.isCoolingDown).toBe(false);
  });

  it('escalates heat upon serious criminal actions', () => {
    const wanted = new WantedSystem();
    wanted.setHeat(1);
    expect(wanted.heat).toBe(1);
    expect(wanted.searchRadius).toBe(110);

    wanted.setHeat(3);
    expect(wanted.heat).toBe(3);
    expect(wanted.searchRadius).toBe(180);
  });

  it('resets heat upon complete evasion', () => {
    const wanted = new WantedSystem();
    wanted.setHeat(2);
    expect(wanted.heat).toBe(2);

    wanted.setHeat(0);
    expect(wanted.heat).toBe(0);
    expect(wanted.searchRadius).toBe(0);
  });
});

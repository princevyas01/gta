import { describe, it, expect } from 'vitest';
import { CANONICAL_MISSIONS, getMissionDef } from '../src/data/missions';
import { MissionManager } from '../src/missions/missionManager';

describe('Data-Driven Mission Framework', () => {
  it('loads canonical missions properly', () => {
    const getaway = getMissionDef('m_getaway_blueprint');
    expect(getaway).toBeDefined();
    expect(getaway?.stages.length).toBe(4);
    expect(getaway?.rewardCash).toBe(12500);

    const harbor = getMissionDef('m_harbor_switch');
    expect(harbor).toBeDefined();
    expect(harbor?.stages.length).toBe(3);
  });

  it('starts without side-effects in constructor and starts on explicit request (P14)', () => {
    const mgr = new MissionManager();
    expect(mgr.activeMission).toBeNull();

    const started = mgr.startMission('m_getaway_blueprint', false);
    expect(started).toBe(true);
    expect(mgr.activeMission?.id).toBe('m_getaway_blueprint');
    expect(mgr.currentStageIndex).toBe(0);

    const obj = mgr.getCurrentObjective();
    expect(obj).toBeDefined();
    expect(obj?.id).toBe('gb_step_1');
    expect(obj?.completed).toBe(false);
  });

  it('supports multi-objective stage reset to checkpoint (P14, P54)', () => {
    const mgr = new MissionManager();
    mgr.startMission('m_getaway_blueprint', false);

    const obj = mgr.getCurrentObjective();
    if (obj) obj.completed = true;

    mgr.resetToCheckpoint();
    const resetObj = mgr.getCurrentObjective();
    expect(resetObj?.completed).toBe(false);

    mgr.dispose();
    expect(mgr.activeMission).toBeNull();
  });
});

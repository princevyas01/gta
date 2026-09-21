import * as THREE from 'three';
import { MissionDefinition, MissionObjective } from '../core/types';
import { CANONICAL_MISSIONS, getMissionDef } from '../data/missions';
import { PlayerController } from '../player/playerController';
import { WantedSystem } from '../law/wantedSystem';
import { RoadNetwork } from '../world/roadNetwork';
import { soundEngine } from '../core/audio';
import { distance2D } from '../core/math';
import { eventBus } from '../core/events';

export class MissionManager {
  public activeMission: MissionDefinition | null = null;
  public currentStageIndex: number = 0;
  public completedMissionIds: string[] = [];

  constructor() {
    // Start with the primary vertical-slice story mission
    this.startMission('m_getaway_blueprint');
  }

  public startMission(missionId: string): boolean {
    const def = getMissionDef(missionId);
    if (!def) return false;

    this.activeMission = JSON.parse(JSON.stringify(def)); // Deep clone
    this.currentStageIndex = 0;
    soundEngine.playMissionStinger();
    eventBus.emit('MISSION_STARTED', this.activeMission);
    return true;
  }

  public getCurrentObjective(): MissionObjective | null {
    if (!this.activeMission) return null;
    const stage = this.activeMission.stages[this.currentStageIndex];
    if (!stage || stage.length === 0) return null;
    return stage[0];
  }

  public update(
    dt: number,
    player: PlayerController,
    wanted: WantedSystem,
    roadNetwork: RoadNetwork
  ): void {
    if (!this.activeMission) return;

    const objective = this.getCurrentObjective();
    if (!objective || objective.completed) return;

    // Auto-update GPS ribbon to target destination if location based
    if (objective.type === 'reach_location' && objective.targetPosition) {
      const path = roadNetwork.findPath(
        player.position.x,
        player.position.z,
        objective.targetPosition[0],
        objective.targetPosition[2]
      );
      roadNetwork.updateGPSRibbon(path);

      // Check distance to checkpoint
      const dist = distance2D(
        player.position.x,
        player.position.z,
        objective.targetPosition[0],
        objective.targetPosition[2]
      );
      if (dist < 14) {
        this.completeObjective(player, wanted);
      }
    } else if (objective.type === 'steal_vehicle' && objective.targetVehicleId) {
      if (player.currentVehicle && player.currentVehicle.def.id === objective.targetVehicleId) {
        this.completeObjective(player, wanted);
      }
    } else if (objective.type === 'lose_wanted') {
      if (wanted.heat === 0) {
        this.completeObjective(player, wanted);
      }
    }
  }

  private completeObjective(player: PlayerController, wanted: WantedSystem): void {
    const objective = this.getCurrentObjective();
    if (!objective) return;

    objective.completed = true;
    soundEngine.playMissionStinger();

    // Advance to next stage
    this.currentStageIndex++;
    if (this.currentStageIndex >= this.activeMission!.stages.length) {
      // Mission Complete!
      const reward = this.activeMission!.rewardCash;
      player.addCash(reward);
      this.completedMissionIds.push(this.activeMission!.id);
      eventBus.emit('MISSION_COMPLETED', {
        id: this.activeMission!.id,
        title: this.activeMission!.title,
        reward
      });
      this.activeMission = null;
    } else {
      // Trigger heat escalation for dramatic getaway if reaching stage 3
      if (this.activeMission!.id === 'm_getaway_blueprint' && this.currentStageIndex === 3) {
        wanted.setHeat(2);
      }
      eventBus.emit('STAGE_ADVANCED', this.getCurrentObjective());
    }
  }
}

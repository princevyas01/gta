import { MissionDefinition, MissionObjective } from '../core/types';
import { getMissionDef } from '../data/missions';
import { PlayerController } from '../player/playerController';
import { WantedSystem } from '../law/wantedSystem';
import { RoadNetwork } from '../world/roadNetwork';
import { soundEngine } from '../core/audio';
import { distance2D } from '../core/math';
import { eventBus } from '../core/events';

export class MissionManager {
  public activeMission: MissionDefinition | null = null;
  public currentStageIndex = 0;
  public completedMissionIds: string[] = [];

  private cachedRouteKey = '';
  private routeRefreshTimer = 0;

  public startMission(missionId: string, playStinger = false): boolean {
    const def = getMissionDef(missionId);
    if (!def) return false;

    this.activeMission = structuredClone(def);
    this.currentStageIndex = 0;
    this.cachedRouteKey = '';
    this.routeRefreshTimer = 0;

    if (playStinger) soundEngine.playMissionStinger();
    eventBus.emit('MISSION_STARTED', this.activeMission);
    return true;
  }

  public resetToCheckpoint(): void {
    if (!this.activeMission) return;
    this.cachedRouteKey = '';
    this.routeRefreshTimer = 0;
    for (let i = this.currentStageIndex; i < this.activeMission.stages.length; i++) {
      for (const objective of this.activeMission.stages[i]) {
        objective.completed = false;
        objective.currentCount = 0;
      }
    }
  }

  public getCurrentObjective(): MissionObjective | null {
    if (!this.activeMission) return null;
    const stage = this.activeMission.stages[this.currentStageIndex];
    if (!stage) return null;
    return stage.find(objective => !objective.completed) ?? null;
  }

  public update(
    dt: number,
    player: PlayerController,
    wanted: WantedSystem,
    roadNetwork: RoadNetwork
  ): void {
    const mission = this.activeMission;
    const objective = this.getCurrentObjective();
    if (!mission || !objective) return;

    if (objective.type === 'reach_location' && objective.targetPosition) {
      this.routeRefreshTimer -= dt;
      const target = objective.targetPosition;
      const key = [
        Math.round(player.position.x / 10),
        Math.round(player.position.z / 10),
        target[0],
        target[2]
      ].join(':');

      if (key !== this.cachedRouteKey || this.routeRefreshTimer <= 0) {
        roadNetwork.updateGPSRibbon(
          roadNetwork.findPath(player.position.x, player.position.z, target[0], target[2])
        );
        this.cachedRouteKey = key;
        this.routeRefreshTimer = 0.25;
      }

      if (distance2D(player.position.x, player.position.z, target[0], target[2]) < 14) {
        this.completeObjective(player, wanted);
      }
    } else if (
      objective.type === 'steal_vehicle' &&
      objective.targetVehicleId &&
      player.currentVehicle?.def.id === objective.targetVehicleId
    ) {
      this.completeObjective(player, wanted);
    } else if (objective.type === 'lose_wanted' && wanted.heat === 0) {
      this.completeObjective(player, wanted);
    }
  }

  private completeObjective(player: PlayerController, wanted: WantedSystem): void {
    const objective = this.getCurrentObjective();
    const mission = this.activeMission;
    if (!objective || !mission) return;

    objective.completed = true;
    this.cachedRouteKey = '';
    eventBus.emit('STAGE_ADVANCED', objective);

    const stageComplete = mission.stages[this.currentStageIndex].every(
      item => item.completed
    );

    if (!stageComplete) return;

    this.currentStageIndex++;
    if (this.currentStageIndex >= mission.stages.length) {
      const reward = mission.rewardCash;
      player.addCash(reward);
      this.completedMissionIds.push(mission.id);
      eventBus.emit('MISSION_COMPLETED', {
        id: mission.id,
        title: mission.title,
        reward
      });
      this.activeMission = null;
      return;
    }

    if (mission.id === 'm_getaway_blueprint' && this.currentStageIndex === 3) {
      wanted.setHeat(2);
    }

    eventBus.emit('STAGE_ADVANCED', this.getCurrentObjective());
  }

  public dispose(): void {
    this.activeMission = null;
    this.cachedRouteKey = '';
  }
}

import { MissionDefinition } from '../core/types';

export const CANONICAL_MISSIONS: MissionDefinition[] = [
  {
    id: 'm_getaway_blueprint',
    title: 'Getaway Blueprint',
    districtId: 'D01',
    description: 'Aurelio Syndicate contract: Steal the customized VX-9 Kestrel prototype from Meridian, deliver the asset, and evade AMPS police pursuit.',
    rewardCash: 12500,
    stages: [
      [
        {
          id: 'gb_step_1',
          description: 'Reach the Meridian financial plaza checkpoint.',
          type: 'reach_location',
          targetPosition: [400, 0, 50],
          completed: false
        }
      ],
      [
        {
          id: 'gb_step_2',
          description: 'Acquire and enter the red VX-9 Kestrel sports coupe.',
          type: 'steal_vehicle',
          targetVehicleId: 'veh_vx9_kestrel',
          completed: false
        }
      ],
      [
        {
          id: 'gb_step_3',
          description: 'Deliver the vehicle to the Meridian Heights Safehouse.',
          type: 'reach_location',
          targetPosition: [360, 0, -50],
          completed: false
        }
      ],
      [
        {
          id: 'gb_step_4',
          description: 'Evade the AMPS police pursuit and lose all heat stars.',
          type: 'lose_wanted',
          completed: false
        }
      ]
    ]
  },
  {
    id: 'm_harbor_switch',
    title: 'Harbor Switch',
    districtId: 'D16',
    description: 'Syndicate maritime heist: Infiltrate Docklands Drydock, commandeer the TideRunner 24, and escape to Old Quay harbour.',
    rewardCash: 18000,
    stages: [
      [
        {
          id: 'hs_step_1',
          description: 'Infiltrate the Docklands shipping depot staging area.',
          type: 'reach_location',
          targetPosition: [0, 0, 750],
          completed: false
        }
      ],
      [
        {
          id: 'hs_step_2',
          description: 'Commandeer the TideRunner 24 speedboat.',
          type: 'steal_vehicle',
          targetVehicleId: 'veh_tiderunner_24',
          completed: false
        }
      ],
      [
        {
          id: 'hs_step_3',
          description: 'Navigate to the hidden Old Quay maritime cove.',
          type: 'reach_location',
          targetPosition: [-440, 0, -80],
          completed: false
        }
      ]
    ]
  },
  {
    id: 'act_coastal_sprint',
    title: 'Coastal Ring Sprint',
    districtId: 'D06',
    description: 'Time-trial street race through Harborview coastal boulevard to Sunspire Arena.',
    rewardCash: 5000,
    stages: [
      [
        {
          id: 'crs_step_1',
          description: 'Drive through Checkpoint 1 at Harborview Boardwalk.',
          type: 'reach_location',
          targetPosition: [780, 0, 360],
          completed: false
        }
      ],
      [
        {
          id: 'crs_step_2',
          description: 'Speed through Checkpoint 2 at Sunspire Outer Ring.',
          type: 'reach_location',
          targetPosition: [820, 0, 80],
          completed: false
        }
      ],
      [
        {
          id: 'crs_step_3',
          description: 'Cross the finish line at Sunspire Arena gates.',
          type: 'reach_location',
          targetPosition: [800, 0, 0],
          completed: false
        }
      ]
    ]
  }
];

export function getMissionDef(id: string): MissionDefinition | undefined {
  return CANONICAL_MISSIONS.find(m => m.id === id);
}

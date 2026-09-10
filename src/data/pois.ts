import { MapPOI } from '../core/types';

export const CANONICAL_POIS: MapPOI[] = [
  // Landmarks
  {
    id: 'poi-aurelio-tower',
    name: 'Aurelio Tower',
    districtId: 'D01',
    category: 'landmark',
    worldPosition: [0, 80, 0],
    discovered: true,
    fastTravel: false,
    description: 'The monumental 80-story glass headquarters of Aurelio Holdings.'
  },
  {
    id: 'poi-meridian-exchange',
    name: 'Meridian Exchange',
    districtId: 'D02',
    category: 'landmark',
    worldPosition: [420, 60, 20],
    discovered: true,
    fastTravel: false,
    description: 'The bustling financial trading epicenter of Vesper.'
  },
  {
    id: 'poi-clockhouse',
    name: 'Dock Wharf & Clockhouse',
    districtId: 'D03',
    category: 'landmark',
    worldPosition: [-380, 25, 40],
    discovered: true,
    fastTravel: false,
    description: 'Historic 19th-century bronze belltower overlooking Old Quay harbour.'
  },
  {
    id: 'poi-grand-assembly',
    name: 'Grand Assembly',
    districtId: 'D04',
    category: 'landmark',
    worldPosition: [0, 30, 420],
    discovered: true,
    fastTravel: false,
    description: 'Neoclassical seat of provincial governance with marble peristyle.'
  },
  {
    id: 'poi-neon-spire',
    name: 'Neon Spire Plaza',
    districtId: 'D05',
    category: 'landmark',
    worldPosition: [390, 40, 380],
    discovered: true,
    fastTravel: false,
    description: 'Vibrant nightlife plaza surrounded by mega electronic billboards.'
  },
  {
    id: 'poi-caldera-observatory',
    name: 'Caldera Observatory',
    districtId: 'D09',
    category: 'landmark',
    worldPosition: [820, 110, -420],
    discovered: false,
    fastTravel: false,
    description: 'High altitude optical telescope observatory perched on the ridge.'
  },
  {
    id: 'poi-sunspire-arena',
    name: 'Sunspire Arena',
    districtId: 'D07',
    category: 'landmark',
    worldPosition: [800, 35, 10],
    discovered: false,
    fastTravel: false,
    description: 'Premier 60,000-seat stadium hosting sports and international concerts.'
  },
  {
    id: 'poi-blackridge-base',
    name: 'Blackridge Airbase',
    districtId: 'D23',
    category: 'landmark',
    worldPosition: [1200, 20, 800],
    discovered: false,
    fastTravel: false,
    description: 'Restricted provincial airbase and armory facility. Trespassers will be fired upon.'
  },

  // Safehouses
  {
    id: 'poi-safehouse-meridian',
    name: 'Meridian Heights Penthouse',
    districtId: 'D02',
    category: 'safehouse',
    worldPosition: [360, 40, -50],
    discovered: true,
    fastTravel: true,
    description: 'High-security loft apartment with helipad access and secure garage bay.'
  },
  {
    id: 'poi-safehouse-oldquay',
    name: 'Old Quay Smuggler Attic',
    districtId: 'D03',
    category: 'safehouse',
    worldPosition: [-440, 15, -80],
    discovered: false,
    fastTravel: true,
    description: 'Concealed waterfront attic loft with escape boat berth.'
  },
  {
    id: 'poi-safehouse-pinecrest',
    name: 'Pine Crest Forest Cabin',
    districtId: 'D12',
    category: 'safehouse',
    worldPosition: [380, 20, -480],
    discovered: false,
    fastTravel: true,
    description: 'Off-grid fortified cabin nestled within northern evergreen woods.'
  },

  // Garages
  {
    id: 'poi-garage-central',
    name: 'Aurelio Central 24H Underground',
    districtId: 'D01',
    category: 'garage',
    worldPosition: [-50, 0, 50],
    discovered: true,
    fastTravel: false,
    description: 'Automated 3-level underground garage with custom mod shop and respray booth.'
  },
  {
    id: 'poi-garage-ironworks',
    name: 'Ironworks Chop Shop & Tuning',
    districtId: 'D15',
    category: 'garage',
    worldPosition: [-420, 0, 450],
    discovered: false,
    fastTravel: false,
    description: 'Industrial heavy vehicle modification and armor plating workshop.'
  },

  // Gun & Gear Shops
  {
    id: 'poi-shop-arcline',
    name: 'Arcline Tactical Supply',
    districtId: 'D01',
    category: 'shop',
    worldPosition: [50, 0, -80],
    discovered: true,
    fastTravel: false,
    description: 'Licensed supplier of firearms, tactical gear, body armor, and ammo.'
  },
  {
    id: 'poi-shop-neon',
    name: 'Vesper Black Market Depo',
    districtId: 'D05',
    category: 'shop',
    worldPosition: [420, 0, 480],
    discovered: false,
    fastTravel: false,
    description: 'Unmarked basement supplier specializing in military surplus and explosives.'
  },

  // Hospitals
  {
    id: 'poi-hospital-central',
    name: 'Saint Aurelia Memorial Hospital',
    districtId: 'D01',
    category: 'hospital',
    worldPosition: [-120, 0, -120],
    discovered: true,
    fastTravel: true,
    description: 'Primary regional trauma hospital with 24/7 emergency response and helipad.'
  },

  // Police Stations
  {
    id: 'poi-police-hq',
    name: 'AMPS 1st Precinct HQ',
    districtId: 'D04',
    category: 'police',
    worldPosition: [80, 0, 360],
    discovered: true,
    fastTravel: false,
    description: 'Central police headquarters housing armored interceptors and dispatch towers.'
  },

  // Air & Marina
  {
    id: 'poi-marina-harbor',
    name: 'Harborview Marina Berths',
    districtId: 'D06',
    category: 'marina',
    worldPosition: [850, 0, 450],
    discovered: false,
    fastTravel: true,
    description: 'Deepwater boat moorings with fueling docks and speed craft rentals.'
  },
  {
    id: 'poi-helipad-tower',
    name: 'Aurelio Tower Sky Helipad',
    districtId: 'D01',
    category: 'helipad',
    worldPosition: [0, 85, 0],
    discovered: true,
    fastTravel: false,
    description: 'Rooftop aviation pad accommodating light and utility helicopters.'
  },

  // Missions & Activities
  {
    id: 'poi-mission-getaway',
    name: 'Mission: Getaway Blueprint',
    districtId: 'D01',
    category: 'mission',
    worldPosition: [30, 0, 80],
    discovered: true,
    fastTravel: false,
    description: 'Story Mission: Infiltrate Meridian financial terminal and orchestrate the getaway.',
    missionLinks: ['m_getaway_blueprint']
  },
  {
    id: 'poi-activity-sprint',
    name: 'Activity: Coastal Ring Sprint',
    districtId: 'D06',
    category: 'activity',
    worldPosition: [750, 0, 380],
    discovered: true,
    fastTravel: false,
    description: 'High-speed street race testing vehicle cornering and acceleration.'
  }
];

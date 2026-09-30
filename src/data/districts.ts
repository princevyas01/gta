import { DistrictData } from '../core/types';

export const CANONICAL_DISTRICTS: DistrictData[] = [
  {
    id: 'D01',
    name: 'Aurelio Central',
    archetype: 'downtown',
    color: '#38bdf8',
    streetPattern: 'tight grid',
    keyLandmark: 'Aurelio Tower',
    description: 'The dense corporate skyscraper core with glowing spires and central plazas.',
    dangerLevel: 2,
    bounds: { minX: -200, maxX: 200, minZ: -200, maxZ: 200 },
    center: [0, 0, 0]
  },
  {
    id: 'D02',
    name: 'Meridian Core',
    archetype: 'financial',
    color: '#0284c7',
    streetPattern: 'multi-lane grid',
    keyLandmark: 'Meridian Exchange',
    description: 'Premier banking houses, luxury high-rises, and elevated skybridges.',
    dangerLevel: 1,
    bounds: { minX: 200, maxX: 600, minZ: -200, maxZ: 200 },
    center: [400, 0, 0]
  },
  {
    id: 'D03',
    name: 'Old Quay',
    archetype: 'historic',
    color: '#f97316',
    streetPattern: 'cobblestones & narrow alleys',
    keyLandmark: 'Dock Wharf & Clockhouse',
    description: 'Centuries-old stone facades, artisanal markets, and vintage maritime charm.',
    dangerLevel: 2,
    bounds: { minX: -600, maxX: -200, minZ: -200, maxZ: 200 },
    center: [-400, 0, 0]
  },
  {
    id: 'D04',
    name: 'Civic Rise',
    archetype: 'civic',
    color: '#e2e8f0',
    streetPattern: 'ceremonial boulevards',
    keyLandmark: 'Grand Assembly',
    description: 'Government ministries, majestic marble stairs, courthouses, and AMPS headquarters.',
    dangerLevel: 1,
    bounds: { minX: -200, maxX: 200, minZ: 200, maxZ: 600 },
    center: [0, 0, 400]
  },
  {
    id: 'D05',
    name: 'Neon Row',
    archetype: 'nightlife',
    color: '#f43f5e',
    streetPattern: 'dense illuminated frontage',
    keyLandmark: 'Neon Spire Plaza',
    description: 'The sleepless district of nightclubs, rooftop lounges, diners, and bright signs.',
    dangerLevel: 3,
    bounds: { minX: 200, maxX: 600, minZ: 200, maxZ: 600 },
    center: [400, 0, 400]
  },
  {
    id: 'D06',
    name: 'Harborview',
    archetype: 'waterfront',
    color: '#06b6d4',
    streetPattern: 'pedestrian boardwalks',
    keyLandmark: 'Harbor Arc Marina',
    description: 'Yacht berths, seaside cafes, open breezes, and luxury coastal living.',
    dangerLevel: 1,
    bounds: { minX: 600, maxX: 1000, minZ: 200, maxZ: 600 },
    center: [800, 0, 400]
  },
  {
    id: 'D07',
    name: 'Sunspire',
    archetype: 'arena',
    color: '#eab308',
    streetPattern: 'broad arterials & plaza rings',
    keyLandmark: 'Sunspire Arena',
    description: 'Massive entertainment arenas, sports stadiums, and sprawling event parking lots.',
    dangerLevel: 2,
    bounds: { minX: 600, maxX: 1000, minZ: -200, maxZ: 200 },
    center: [800, 0, 0]
  },
  {
    id: 'D08',
    name: 'Eastmoor',
    archetype: 'suburban',
    color: '#10b981',
    streetPattern: 'cul-de-sacs & parkways',
    keyLandmark: 'Eastmoor Commons',
    description: 'Peaceful residential neighborhoods, family homes, leafy parks, and local schools.',
    dangerLevel: 1,
    bounds: { minX: 1000, maxX: 1400, minZ: -200, maxZ: 200 },
    center: [1200, 0, 0]
  },
  {
    id: 'D09',
    name: 'Caldera Hills',
    archetype: 'upland',
    color: '#84cc16',
    streetPattern: 'switchback mountain roads',
    keyLandmark: 'Caldera Observatory',
    description: 'Winding scenic climbs, dramatic vistas over the bay, and luxury hill estates.',
    dangerLevel: 2,
    bounds: { minX: 600, maxX: 1000, minZ: -600, maxZ: -200 },
    center: [800, 0, -400]
  },
  {
    id: 'D10',
    name: 'Crown Heights',
    archetype: 'affluent',
    color: '#a855f7',
    streetPattern: 'gated curved drives',
    keyLandmark: 'Crown Reservoir',
    description: 'Exclusive gated mansions with private security patrols and high perimeter walls.',
    dangerLevel: 2,
    bounds: { minX: -600, maxX: -200, minZ: -600, maxZ: -200 },
    center: [-400, 0, -400]
  },
  {
    id: 'D11',
    name: 'Northpoint',
    archetype: 'mixed_suburb',
    color: '#6366f1',
    streetPattern: 'collector roads & paths',
    keyLandmark: 'Northpoint College',
    description: 'Student apartments, transit terminals, cafes, and technological campus hubs.',
    dangerLevel: 2,
    bounds: { minX: -200, maxX: 200, minZ: -600, maxZ: -200 },
    center: [0, 0, -400]
  },
  {
    id: 'D12',
    name: 'Pine Crest',
    archetype: 'forest_edge',
    color: '#15803d',
    streetPattern: 'unpaved dirt & gravel trails',
    keyLandmark: 'Pine Crest Trailhead',
    description: 'Dense pine forestry on the northern ridge, logging camps, and hiking cabins.',
    dangerLevel: 2,
    bounds: { minX: 200, maxX: 600, minZ: -600, maxZ: -200 },
    center: [400, 0, -400]
  },
  {
    id: 'D13',
    name: 'Westgate',
    archetype: 'arterial_retail',
    color: '#ec4899',
    streetPattern: 'strip corridors & parking lagoons',
    keyLandmark: 'Westgate Interchange',
    description: 'Massive mega-malls, big-box department stores, auto repair yards, and highway links.',
    dangerLevel: 2,
    bounds: { minX: -1000, maxX: -600, minZ: -200, maxZ: 200 },
    center: [-800, 0, 0]
  },
  {
    id: 'D14',
    name: 'Port Meridian',
    archetype: 'port',
    color: '#64748b',
    streetPattern: 'container grid & rail spurs',
    keyLandmark: 'Port Meridian Crane Line',
    description: 'Global cargo container terminals with towering gantry cranes and freight trains.',
    dangerLevel: 3,
    bounds: { minX: -1000, maxX: -600, minZ: 200, maxZ: 600 },
    center: [-800, 0, 400]
  },
  {
    id: 'D15',
    name: 'Ironworks',
    archetype: 'heavy_industry',
    color: '#d97706',
    streetPattern: 'service alleys & rail lines',
    keyLandmark: 'Ironworks Blast Furnace',
    description: 'Foundries, scrapyards, smoke stacks, and gritty industrial chop shops.',
    dangerLevel: 4,
    bounds: { minX: -600, maxX: -200, minZ: 200, maxZ: 600 },
    center: [-400, 0, 400]
  },
  {
    id: 'D16',
    name: 'Docklands',
    archetype: 'container_district',
    color: '#475569',
    streetPattern: 'ship repair slips',
    keyLandmark: 'Docklands Drydock',
    description: 'Marine repair yards, cold storage depots, and shadowy syndicate staging points.',
    dangerLevel: 4,
    bounds: { minX: -200, maxX: 200, minZ: 600, maxZ: 1000 },
    center: [0, 0, 800]
  },
  {
    id: 'D17',
    name: 'Salt Marsh',
    archetype: 'wetland',
    color: '#a1a1aa',
    streetPattern: 'raised levee boardwalks',
    keyLandmark: 'Salt Marsh Bird Tower',
    description: 'Estuary flats, stilt shacks, winding waterways, and secluded smuggling routes.',
    dangerLevel: 3,
    bounds: { minX: -1400, maxX: -1000, minZ: 200, maxZ: 600 },
    center: [-1200, 0, 400]
  },
  {
    id: 'D18',
    name: 'Southbank',
    archetype: 'mixed_industrial',
    color: '#b45309',
    streetPattern: 'river promenade & ramps',
    keyLandmark: 'Southbank Locks',
    description: 'Converted river lofts, concrete plants, low-income apartments, and street garages.',
    dangerLevel: 3,
    bounds: { minX: -600, maxX: -200, minZ: 600, maxZ: 1000 },
    center: [-400, 0, 800]
  },
  {
    id: 'D19',
    name: 'Rancho Sol',
    archetype: 'rural',
    color: '#ca8a04',
    streetPattern: 'unfenced ranch lanes',
    keyLandmark: 'Sol Horse Ranch',
    description: 'Sprawling rural paddocks, old barns, wind pumps, and dirt country highways.',
    dangerLevel: 1,
    bounds: { minX: -1000, maxX: -600, minZ: 600, maxZ: 1000 },
    center: [-800, 0, 800]
  },
  {
    id: 'D20',
    name: 'Airport District',
    archetype: 'aviation',
    color: '#3b82f6',
    streetPattern: 'express ring loop & runways',
    keyLandmark: 'Aurelio Intl Terminal',
    description: 'Long asphalt runways, commercial hangars, air traffic control tower, and taxiways.',
    dangerLevel: 4,
    bounds: { minX: 200, maxX: 600, minZ: 600, maxZ: 1000 },
    center: [400, 0, 800]
  },
  {
    id: 'D21',
    name: 'Freeway Belt',
    archetype: 'transport',
    color: '#94a3b8',
    streetPattern: 'elevated multi-stack flyovers',
    keyLandmark: 'Freeway 8 Junction',
    description: 'Multi-lane high-speed expressway wrapping around the central metropolitan bay.',
    dangerLevel: 2,
    bounds: { minX: 600, maxX: 1000, minZ: 600, maxZ: 1000 },
    center: [800, 0, 800]
  },
  {
    id: 'D22',
    name: 'Desert Edge',
    archetype: 'dry_fringe',
    color: '#d97706',
    streetPattern: 'straight desert tracks',
    keyLandmark: 'Dryline Quarry',
    description: 'Sun-scorched arid foothills, open stone quarry pits, and dusty off-road jumps.',
    dangerLevel: 2,
    bounds: { minX: 200, maxX: 600, minZ: 1000, maxZ: 1400 },
    center: [400, 0, 1200]
  },
  {
    id: 'D23',
    name: 'Blackridge Reserve',
    archetype: 'military',
    color: '#1e293b',
    streetPattern: 'guarded checkpoints & perimeter roads',
    keyLandmark: 'Blackridge Airbase',
    description: 'Heavily restricted military territory with missile silos, radar domes, and tank patrols.',
    dangerLevel: 5,
    bounds: { minX: 1000, maxX: 1400, minZ: 600, maxZ: 1000 },
    center: [1200, 0, 800]
  },
  {
    id: 'D24',
    name: 'Sable Island',
    archetype: 'offshore_utility',
    color: '#6b7280',
    streetPattern: 'island service ring',
    keyLandmark: 'Sable Grid Station',
    description: 'Offshore power utility island connected via sub-sea cables and cargo barge ferry.',
    dangerLevel: 3,
    bounds: { minX: -400, maxX: 0, minZ: 1000, maxZ: 1400 },
    center: [-200, 0, 1200]
  },
  {
    id: 'D25',
    name: 'Pelican Keys',
    archetype: 'island_resort',
    color: '#22d3ee',
    streetPattern: 'curved coastal causeway',
    keyLandmark: 'Pelican Lighthouse',
    description: 'Tropical getaway island with luxury beach villas, coral reefs, and speedboat docks.',
    dangerLevel: 1,
    bounds: { minX: 1000, maxX: 1400, minZ: 1000, maxZ: 1400 },
    center: [1200, 0, 1200]
  },
  {
    id: 'D26',
    name: 'Silver Lake Basin',
    archetype: 'recreation',
    color: '#38bdf8',
    streetPattern: 'lakeside perimeter loop',
    keyLandmark: 'Silver Lake Marina',
    description: 'Deep freshwater reservoir with fishing piers, log cabins, and mountain echoes.',
    dangerLevel: 1,
    bounds: { minX: -1400, maxX: -1000, minZ: -200, maxZ: 200 },
    center: [-1200, 0, 0]
  }
];

export function getDistrictAt(x: number, z: number): DistrictData | null {
  for (const district of CANONICAL_DISTRICTS) {
    if (
      x >= district.bounds.minX &&
      x <= district.bounds.maxX &&
      z >= district.bounds.minZ &&
      z <= district.bounds.maxZ
    ) {
      return district;
    }
  }
  return null;
}

import {
  CampusStop,
  CrowdLevel,
  FeedbackCategory,
  OnwardOption,
  ServiceNotice,
  ShuttleRoute,
} from '../types/shuttle';

/**
 * Central demonstration dataset for "Waiting for the Shuttle".
 * All routes, stops, arrival estimates, and notices are illustrative
 * fictional campus data for project demonstration and are not verified
 * official shuttle schedules or GPS coordinates.
 */

export const CAMPUS_STOPS: Record<string, CampusStop> = {
  'main-gate': {
    id: 'main-gate',
    name: 'Main Gate',
    landmark: 'University Entrance Plaza',
    signNote: 'Check official stop sign beside the shaded pedestrian bay.',
    walkingEstimateMin: '4–6 min walk from Academic Block',
    schematicX: 20,
    schematicY: 74,
  },
  'academic-block': {
    id: 'academic-block',
    name: 'Academic Block',
    landmark: 'Central Lecture Hall Courtyard',
    signNote: 'Check official stop sign along the north courtyard curb.',
    walkingEstimateMin: '3–5 min walk from Library',
    schematicX: 52,
    schematicY: 42,
  },
  'hostel-area': {
    id: 'hostel-area',
    name: 'Hostel Area',
    landmark: 'Residential Blocks & Dining Common',
    signNote: 'Check official stop sign opposite the residential walkway.',
    walkingEstimateMin: '5–8 min walk from Sports Complex',
    schematicX: 80,
    schematicY: 72,
  },
  library: {
    id: 'library',
    name: 'Library',
    landmark: 'Central Knowledge Resource Wing',
    signNote: 'Check official stop sign near the accessible ramp entrance.',
    walkingEstimateMin: '3–4 min walk from Student Centre',
    schematicX: 28,
    schematicY: 24,
  },
  'student-centre': {
    id: 'student-centre',
    name: 'Student Centre',
    landmark: 'Cafeteria & Activity Hub',
    signNote: 'Check official stop sign outside the east atrium doors.',
    walkingEstimateMin: '4–5 min walk from Main Gate',
    schematicX: 50,
    schematicY: 78,
  },
  'sports-complex': {
    id: 'sports-complex',
    name: 'Sports Complex',
    landmark: 'Athletics Track & Indoor Court',
    signNote: 'Check official stop sign at the spectator pavilion bay.',
    walkingEstimateMin: '5–7 min walk from Academic Block',
    schematicX: 78,
    schematicY: 26,
  },
};

export const CAMPUS_STOP_LIST: CampusStop[] = Object.values(CAMPUS_STOPS);

export const SHUTTLE_ROUTES: ShuttleRoute[] = [
  {
    id: 'A',
    name: 'Route A',
    summary: 'Main Gate → Academic Block → Hostel Area',
    stopIds: ['main-gate', 'academic-block', 'hostel-area'],
    sampleEta: '6–10 min',
    defaultLastUpdatedText: '2 min ago',
  },
  {
    id: 'B',
    name: 'Route B',
    summary: 'Library → Student Centre → Main Gate',
    stopIds: ['library', 'student-centre', 'main-gate'],
    sampleEta: '4–8 min',
    defaultLastUpdatedText: '1 min ago',
  },
  {
    id: 'C',
    name: 'Route C',
    summary: 'Hostel Area → Sports Complex → Academic Block',
    stopIds: ['hostel-area', 'sports-complex', 'academic-block'],
    sampleEta: '8–12 min',
    defaultLastUpdatedText: '3 min ago',
  },
];

export const CROWD_LEVEL_META: Record<
  CrowdLevel,
  {
    label: CrowdLevel;
    description: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    guidance: string;
  }
> = {
  Low: {
    label: 'Low',
    description: 'Plenty of standing space at the pickup bay.',
    badgeBg: 'bg-[#DCFCE7]',
    badgeText: 'text-[#15803D]',
    badgeBorder: 'border-[#86EFAC]',
    guidance: 'Board at the marked curb once the shuttle stops completely.',
  },
  Moderate: {
    label: 'Moderate',
    description: 'Steady queue forming near the shelter.',
    badgeBg: 'bg-[#FEF3C7]',
    badgeText: 'text-[#B45309]',
    badgeBorder: 'border-[#FDE68A]',
    guidance: 'Keep pathways clear and prepare to board in queue order.',
  },
  Busy: {
    label: 'Busy',
    description: 'High waiting volume during peak class change.',
    badgeBg: 'bg-[#FEE2E2]',
    badgeText: 'text-[#B91C1C]',
    badgeBorder: 'border-[#FECACA]',
    guidance: 'Consider walking short campus links if the next bay is full.',
  },
};

export const SAMPLE_NOTICES: ServiceNotice[] = [
  {
    id: 'notice-1',
    title: 'Class transition interval reminder',
    detail:
      'Shuttle waiting times between Academic Block and Hostel Area may increase between hourly class changes. Verify posted bay notices locally.',
    category: 'Schedule',
    postedLabel: 'Example notice · Updated today',
    isExample: true,
  },
  {
    id: 'notice-2',
    title: 'Designated boarding safety zone',
    detail:
      'Wait behind the yellow curb line at all campus bays and allow passengers to alight before boarding.',
    category: 'Safety',
    postedLabel: 'Safety guideline · Always active',
    isExample: true,
  },
  {
    id: 'notice-3',
    title: 'Main Gate last-mile transfer stand',
    detail:
      'Onward local transport options wait outside Main Gate plaza. Check local fares and availability directly with operators.',
    category: 'Route Advisory',
    postedLabel: 'Example notice · Campus boundary',
    isExample: true,
  },
];

export const ONWARD_OPTIONS: OnwardOption[] = [
  {
    id: 'onward-walking',
    category: 'Walking',
    title: 'Campus footpath walking routes',
    description:
      'Pedestrian walkways connect Main Gate, Academic Block, Library, and Student Centre with shaded crossings.',
    disclaimer: 'Illustrative walking times only; verify open gates locally.',
  },
  {
    id: 'onward-shuttle',
    category: 'Campus Shuttle',
    title: 'Connecting intra-campus loops',
    description:
      'Transfer at Main Gate or Academic Block between Route A, Route B, and Route C loops.',
    disclaimer: 'Sample route loop data; confirm active shuttle signage at the stop.',
  },
  {
    id: 'onward-local',
    category: 'Local Transport',
    title: 'Local auto-rickshaw & city bus bays',
    description:
      'Off-campus onward transport typically operates near the Main Gate outer frontage.',
    disclaimer: 'Check current availability and fare directly before boarding.',
  },
];

export const FEEDBACK_CATEGORIES: FeedbackCategory[] = [
  'Incorrect stop details',
  'Outdated status',
  'Access or safety issue',
  'Other',
];

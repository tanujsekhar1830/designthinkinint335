export type RouteId = 'A' | 'B' | 'C';

export type CrowdLevel = 'Low' | 'Moderate' | 'Busy';

export type FeedbackCategory =
  | 'Incorrect stop details'
  | 'Outdated status'
  | 'Access or safety issue'
  | 'Other';

export interface CampusStop {
  id: string;
  name: string;
  landmark: string;
  signNote: string;
  walkingEstimateMin: string;
  /** Schematic diagram coordinates (0-100%), NOT real-world GPS coordinates */
  schematicX: number;
  schematicY: number;
}

export interface ShuttleRoute {
  id: RouteId;
  name: string;
  summary: string;
  stopIds: [string, string, string]; // [Current stop, Next stop, Destination]
  sampleEta: string;
  defaultLastUpdatedText: string;
}

export interface ServiceNotice {
  id: string;
  title: string;
  detail: string;
  category: 'Schedule' | 'Safety' | 'Route Advisory';
  postedLabel: string;
  isExample: boolean;
}

export interface OnwardOption {
  id: string;
  category: 'Walking' | 'Campus Shuttle' | 'Local Transport';
  title: string;
  description: string;
  disclaimer: string;
}

export interface FeedbackReport {
  id: string;
  locationStopId: string;
  locationName: string;
  category: FeedbackCategory;
  comments: string;
  createdAt: string;
  storageMode: 'demo-local';
}

export interface UserPreferences {
  defaultRouteId: RouteId;
  savedPickupStopId: string | null;
  routeDelayAlerts: boolean;
  safetyReminders: boolean;
  crowdAlerts: boolean;
}

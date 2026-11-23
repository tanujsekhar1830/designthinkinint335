import { CAMPUS_STOPS, SHUTTLE_ROUTES } from '../data/shuttleData';
import {
  CrowdLevel,
  FeedbackReport,
  RouteId,
  ShuttleRoute,
  UserPreferences,
} from '../types/shuttle';

const STORAGE_KEYS = {
  SELECTED_ROUTE: 'wfts_selected_route_v1',
  SELECTED_STOP: 'wfts_selected_stop_v1',
  CROWD_LEVEL: 'wfts_crowd_level_v1',
  FEEDBACK_REPORTS: 'wfts_feedback_reports_v1',
  PREFERENCES: 'wfts_preferences_v1',
} as const;

const DEFAULT_PREFERENCES: UserPreferences = {
  defaultRouteId: 'A',
  savedPickupStopId: 'main-gate',
  routeDelayAlerts: true,
  safetyReminders: true,
  crowdAlerts: false,
};

function safeReadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota / privacy mode errors gracefully
  }
}

export const shuttleService = {
  getRoutes(): ShuttleRoute[] {
    return SHUTTLE_ROUTES;
  },

  getRouteById(routeId: RouteId): ShuttleRoute {
    return (
      SHUTTLE_ROUTES.find((route) => route.id === routeId) ?? SHUTTLE_ROUTES[0]
    );
  },

  getSelectedRouteId(): RouteId {
    const prefs = this.getPreferences();
    const stored = safeReadJson<RouteId | null>(
      STORAGE_KEYS.SELECTED_ROUTE,
      null
    );
    if (stored === 'A' || stored === 'B' || stored === 'C') {
      return stored;
    }
    return prefs.defaultRouteId;
  },

  setSelectedRouteId(routeId: RouteId): void {
    safeWriteJson(STORAGE_KEYS.SELECTED_ROUTE, routeId);
  },

  getSelectedStopId(): string {
    const prefs = this.getPreferences();
    const stored = safeReadJson<string | null>(
      STORAGE_KEYS.SELECTED_STOP,
      null
    );
    if (stored && CAMPUS_STOPS[stored]) {
      return stored;
    }
    if (prefs.savedPickupStopId && CAMPUS_STOPS[prefs.savedPickupStopId]) {
      return prefs.savedPickupStopId;
    }
    return 'main-gate';
  },

  setSelectedStopId(stopId: string): void {
    if (CAMPUS_STOPS[stopId]) {
      safeWriteJson(STORAGE_KEYS.SELECTED_STOP, stopId);
    }
  },

  getCrowdLevel(): CrowdLevel {
    const stored = safeReadJson<CrowdLevel>(STORAGE_KEYS.CROWD_LEVEL, 'Busy');
    if (stored === 'Low' || stored === 'Moderate' || stored === 'Busy') {
      return stored;
    }
    return 'Busy';
  },

  setCrowdLevel(level: CrowdLevel): void {
    safeWriteJson(STORAGE_KEYS.CROWD_LEVEL, level);
  },

  getPreferences(): UserPreferences {
    const stored = safeReadJson<Partial<UserPreferences>>(
      STORAGE_KEYS.PREFERENCES,
      {}
    );
    return {
      ...DEFAULT_PREFERENCES,
      ...stored,
    };
  },

  updatePreferences(partial: Partial<UserPreferences>): UserPreferences {
    const next = { ...this.getPreferences(), ...partial };
    safeWriteJson(STORAGE_KEYS.PREFERENCES, next);
    return next;
  },

  savePickupPoint(stopId: string): UserPreferences {
    this.setSelectedStopId(stopId);
    return this.updatePreferences({ savedPickupStopId: stopId });
  },

  clearSavedPickupPoint(): UserPreferences {
    return this.updatePreferences({ savedPickupStopId: null });
  },

  getFeedbackReports(): FeedbackReport[] {
    return safeReadJson<FeedbackReport[]>(STORAGE_KEYS.FEEDBACK_REPORTS, []);
  },

  submitFeedbackReport(
    report: Omit<FeedbackReport, 'id' | 'createdAt' | 'storageMode'>
  ): FeedbackReport {
    const existing = this.getFeedbackReports();
    const created: FeedbackReport = {
      ...report,
      id: `demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
      storageMode: 'demo-local',
    };
    safeWriteJson(STORAGE_KEYS.FEEDBACK_REPORTS, [created, ...existing]);
    return created;
  },

  deleteFeedbackReport(id: string): FeedbackReport[] {
    const next = this.getFeedbackReports().filter((item) => item.id !== id);
    safeWriteJson(STORAGE_KEYS.FEEDBACK_REPORTS, next);
    return next;
  },

  clearFeedbackReports(): void {
    safeWriteJson(STORAGE_KEYS.FEEDBACK_REPORTS, []);
  },

  resetDemoState(): void {
    try {
      Object.values(STORAGE_KEYS).forEach((key) =>
        window.localStorage.removeItem(key)
      );
    } catch {
      // Ignore storage errors
    }
  },
};

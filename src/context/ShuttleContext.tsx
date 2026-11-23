import React, { createContext, useContext, useState } from 'react';
import { shuttleService } from '../services/shuttleService';
import {
  CrowdLevel,
  FeedbackReport,
  RouteId,
  UserPreferences,
} from '../types/shuttle';

interface ShuttleContextValue {
  selectedRouteId: RouteId;
  setSelectedRouteId: (routeId: RouteId) => void;
  selectedStopId: string;
  setSelectedStopId: (stopId: string) => void;
  crowdLevel: CrowdLevel;
  setCrowdLevel: (level: CrowdLevel) => void;
  preferences: UserPreferences;
  savePickupPoint: (stopId: string) => void;
  clearSavedPickupPoint: () => void;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
  feedbackReports: FeedbackReport[];
  submitFeedbackReport: (
    report: Omit<FeedbackReport, 'id' | 'createdAt' | 'storageMode'>
  ) => FeedbackReport;
  deleteFeedbackReport: (id: string) => void;
  clearFeedbackReports: () => void;
  resetDemoState: () => void;
}

const ShuttleContext = createContext<ShuttleContextValue | null>(null);

export function ShuttleProvider({ children }: { children: React.ReactNode }) {
  const [selectedRouteId, setRouteState] = useState<RouteId>(() =>
    shuttleService.getSelectedRouteId()
  );
  const [selectedStopId, setStopState] = useState<string>(() =>
    shuttleService.getSelectedStopId()
  );
  const [crowdLevel, setCrowdState] = useState<CrowdLevel>(() =>
    shuttleService.getCrowdLevel()
  );
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    shuttleService.getPreferences()
  );
  const [feedbackReports, setFeedbackReports] = useState<FeedbackReport[]>(() =>
    shuttleService.getFeedbackReports()
  );

  const setSelectedRouteId = (routeId: RouteId) => {
    shuttleService.setSelectedRouteId(routeId);
    setRouteState(routeId);
    const route = shuttleService.getRouteById(routeId);
    if (route && !route.stopIds.includes(selectedStopId)) {
      shuttleService.setSelectedStopId(route.stopIds[0]);
      setStopState(route.stopIds[0]);
    }
  };

  const setSelectedStopId = (stopId: string) => {
    shuttleService.setSelectedStopId(stopId);
    setStopState(stopId);
  };

  const setCrowdLevel = (level: CrowdLevel) => {
    shuttleService.setCrowdLevel(level);
    setCrowdState(level);
  };

  const savePickupPoint = (stopId: string) => {
    const next = shuttleService.savePickupPoint(stopId);
    setStopState(stopId);
    setPreferences(next);
  };

  const clearSavedPickupPoint = () => {
    const next = shuttleService.clearSavedPickupPoint();
    setPreferences(next);
  };

  const updatePreferences = (partial: Partial<UserPreferences>) => {
    const next = shuttleService.updatePreferences(partial);
    setPreferences(next);
  };

  const submitFeedbackReport = (
    report: Omit<FeedbackReport, 'id' | 'createdAt' | 'storageMode'>
  ) => {
    const created = shuttleService.submitFeedbackReport(report);
    setFeedbackReports((prev) => [created, ...prev]);
    return created;
  };

  const deleteFeedbackReport = (id: string) => {
    const next = shuttleService.deleteFeedbackReport(id);
    setFeedbackReports(next);
  };

  const clearFeedbackReports = () => {
    shuttleService.clearFeedbackReports();
    setFeedbackReports([]);
  };

  const resetDemoState = () => {
    shuttleService.resetDemoState();
    setRouteState(shuttleService.getSelectedRouteId());
    setStopState(shuttleService.getSelectedStopId());
    setCrowdState(shuttleService.getCrowdLevel());
    setPreferences(shuttleService.getPreferences());
    setFeedbackReports(shuttleService.getFeedbackReports());
  };

  return (
    <ShuttleContext.Provider
      value={{
        selectedRouteId,
        setSelectedRouteId,
        selectedStopId,
        setSelectedStopId,
        crowdLevel,
        setCrowdLevel,
        preferences,
        savePickupPoint,
        clearSavedPickupPoint,
        updatePreferences,
        feedbackReports,
        submitFeedbackReport,
        deleteFeedbackReport,
        clearFeedbackReports,
        resetDemoState,
      }}
    >
      {children}
    </ShuttleContext.Provider>
  );
}

export function useShuttle() {
  const ctx = useContext(ShuttleContext);
  if (!ctx) {
    throw new Error('useShuttle must be used within a ShuttleProvider');
  }
  return ctx;
}

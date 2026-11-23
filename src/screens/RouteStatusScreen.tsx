import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  MapPin,
  RefreshCw,
  Users,
} from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import { ExampleBadge } from '../components/SharedElements';
import { CAMPUS_STOPS, SHUTTLE_ROUTES } from '../data/shuttleData';
import { useShuttle } from '../context/ShuttleContext';
import { shuttleService } from '../services/shuttleService';

export function RouteStatusScreen() {
  const navigate = useNavigate();
  const { selectedRouteId, setSelectedRouteId, selectedStopId, setSelectedStopId } =
    useShuttle();

  const route = shuttleService.getRouteById(selectedRouteId);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [secondsSinceRefresh, setSecondsSinceRefresh] = useState(0);

  useEffect(() => {
    setLastRefreshedAt(null);
    setSecondsSinceRefresh(0);
  }, [selectedRouteId]);

  useEffect(() => {
    if (!lastRefreshedAt) return;
    const timer = window.setInterval(() => {
      setSecondsSinceRefresh(
        Math.max(0, Math.floor((Date.now() - lastRefreshedAt.getTime()) / 1000))
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, [lastRefreshedAt]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.setTimeout(() => {
      setLastRefreshedAt(new Date());
      setSecondsSinceRefresh(0);
      setIsRefreshing(false);
    }, 220);
  };

  const getLastUpdatedLabel = () => {
    if (!lastRefreshedAt) {
      return `Last updated: ${route.defaultLastUpdatedText}`;
    }
    if (secondsSinceRefresh < 5) {
      return 'Last updated: Just now';
    }
    if (secondsSinceRefresh < 60) {
      return `Last updated: ${secondsSinceRefresh}s ago`;
    }
    const mins = Math.floor(secondsSinceRefresh / 60);
    return `Last updated: ${mins} min ago`;
  };

  const stopRoles = ['Current stop', 'Next stop', 'Destination'] as const;

  const handleStopSelect = (stopId: string) => {
    setSelectedStopId(stopId);
  };

  return (
    <MobileLayout title={route.name} headerVariant="back" backTo="/">
      <div className="space-y-4">
        {/* Route Switcher (Route A / Route B / Route C) */}
        <div
          role="tablist"
          aria-label="Select shuttle route"
          className="grid grid-cols-3 gap-1.5 rounded-xl border border-slate-200 bg-white p-1"
        >
          {SHUTTLE_ROUTES.map((item) => {
            const active = item.id === route.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedRouteId(item.id)}
                className={`min-h-[40px] rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1D4ED8] ${
                  active
                    ? 'bg-[#12376B] text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Vertical Route Timeline */}
        <section
          aria-label={`${route.name} stops`}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Route stops
            </h2>
            <span className="text-[11px] font-medium text-slate-500">
              Tap a stop to choose pickup
            </span>
          </div>

          <div className="relative space-y-3">
            {/* Vertical connector line */}
            <div
              className="absolute top-6 bottom-6 left-[17px] w-0.5 bg-[#BFDBFE]"
              aria-hidden="true"
            />

            {route.stopIds.map((stopId, index) => {
              const stop = CAMPUS_STOPS[stopId];
              const isSelected = selectedStopId === stopId;
              const roleLabel = stopRoles[index];

              return (
                <div key={stopId} className="relative flex items-center gap-3">
                  {/* Timeline Circle */}
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                    {index === 0 ? (
                      <span className="h-4 w-4 rounded-full bg-[#1D4ED8] ring-4 ring-white" />
                    ) : index === 1 ? (
                      <span className="h-4 w-4 rounded-full bg-[#16A34A] ring-4 ring-white" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border-2 border-[#12376B] bg-white ring-4 ring-white" />
                    )}
                  </div>

                  {/* Light Blue Rounded Stop Card */}
                  <button
                    type="button"
                    onClick={() => handleStopSelect(stopId)}
                    className={`flex min-h-[56px] flex-1 items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                      isSelected
                        ? 'border-[#1D4ED8] bg-[#DCEAFE]'
                        : 'border-[#CFE1FC] bg-[#EAF2FD] hover:bg-[#E0ECFD]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-[#1D4ED8]">
                        {roleLabel}
                      </div>
                      <div className="truncate text-[14px] font-semibold text-slate-900">
                        {stop.name}
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#12376B] px-2 py-0.5 text-[11px] font-semibold text-white">
                        <MapPin className="h-3 w-3" />
                        Selected
                      </span>
                    ) : (
                      <span className="shrink-0 text-[11px] font-medium text-[#12376B]">
                        Select
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Estimated Arrival Card */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-[#1D4ED8]" />
            <div className="text-sm text-slate-700">
              Estimated arrival:{' '}
              <strong className="font-bold text-slate-900 tabular-nums">
                {route.sampleEta}
              </strong>
            </div>
          </div>
          <ExampleBadge />
        </div>

        {/* Last Updated Card with Refresh */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#CFE1FC] bg-[#EAF2FD] px-4 py-3">
          <div className="min-w-0 space-y-1">
            <div className="text-[13px] font-medium text-[#12376B] tabular-nums">
              {getLastUpdatedLabel()}
            </div>
            <ExampleBadge />
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            aria-label="Refresh route status"
            className="flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border border-[#93C5FD] bg-white px-3 py-1.5 text-xs font-semibold text-[#12376B] transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-500">
          Estimates depend on available updates. Illustrative demo values only.
        </p>

        {/* Flow Actions */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={() => navigate('/pickup-point')}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#12376B] px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0D2A54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12376B]"
          >
            <span>View pickup point</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/waiting-area')}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <Users className="h-4 w-4 text-[#1D4ED8]" />
            <span>Check waiting area crowd level</span>
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

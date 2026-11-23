import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Footprints,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import { ExampleBadge } from '../components/SharedElements';
import {
  CAMPUS_STOP_LIST,
  CAMPUS_STOPS,
  SHUTTLE_ROUTES,
} from '../data/shuttleData';
import { useShuttle } from '../context/ShuttleContext';
import { RouteId } from '../types/shuttle';

const ROUTE_COLORS: Record<RouteId, string> = {
  A: '#1D4ED8',
  B: '#16A34A',
  C: '#0F766E',
};

export function MapScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    selectedRouteId,
    setSelectedRouteId,
    selectedStopId,
    setSelectedStopId,
    preferences,
    savePickupPoint,
    clearSavedPickupPoint,
  } = useShuttle();

  const [routeFilter, setRouteFilter] = useState<'ALL' | RouteId>('ALL');
  const [showWalkingMode, setShowWalkingMode] = useState(
    () => searchParams.get('mode') === 'walking'
  );
  const [zoom, setZoom] = useState<number>(1);

  const selectedStop = CAMPUS_STOPS[selectedStopId] ?? CAMPUS_STOP_LIST[0];
  const isSaved = preferences.savedPickupStopId === selectedStop.id;

  const visibleRoutes =
    routeFilter === 'ALL'
      ? SHUTTLE_ROUTES
      : SHUTTLE_ROUTES.filter((r) => r.id === routeFilter);

  // Walking path target: connect the selected stop to Academic Block (or Main Gate if Academic Block is selected)
  const walkingAnchorStopId =
    selectedStop.id === 'academic-block' ? 'main-gate' : 'academic-block';
  const walkingAnchorStop = CAMPUS_STOPS[walkingAnchorStopId];

  return (
    <MobileLayout title="Campus Map" headerVariant="back" backTo="/pickup-point">
      <div className="space-y-3.5">
        {/* Route Filter & Walking Mode Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div
            role="group"
            aria-label="Filter map routes"
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1"
          >
            <button
              type="button"
              onClick={() => setRouteFilter('ALL')}
              className={`min-h-[34px] rounded-lg px-2.5 text-xs font-semibold transition-colors ${
                routeFilter === 'ALL'
                  ? 'bg-[#12376B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            {SHUTTLE_ROUTES.map((route) => (
              <button
                key={route.id}
                type="button"
                onClick={() => {
                  setRouteFilter(route.id);
                  setSelectedRouteId(route.id);
                }}
                className={`min-h-[34px] rounded-lg px-2.5 text-xs font-semibold transition-colors ${
                  routeFilter === route.id
                    ? 'bg-[#12376B] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {route.id}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowWalkingMode((prev) => !prev)}
            aria-pressed={showWalkingMode}
            className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
              showWalkingMode
                ? 'border-[#1D4ED8] bg-[#EAF2FD] text-[#12376B]'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Footprints className="h-3.5 w-3.5" />
            <span>Walk path</span>
          </button>
        </div>

        {/* Interactive Schematic Campus Map */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#F4F8FD] shadow-xs">
          {/* Disclaimer Banner */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2">
            <span className="text-[11px] font-medium text-slate-600">
              Illustrative campus layout (not GPS coordinates)
            </span>
            <ExampleBadge />
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-12 right-2.5 z-10 flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.45, +(z + 0.15).toFixed(2)))}
              aria-label="Zoom in map"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.85, +(z - 0.15).toFixed(2)))}
              aria-label="Zoom out map"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              aria-label="Reset map zoom"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="h-[260px] w-full overflow-auto">
            <svg
              viewBox="0 0 360 250"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
              }}
              className="h-full w-full transition-transform duration-150"
              role="img"
              aria-label="Interactive demonstration campus shuttle map"
            >
              {/* Campus Grounds & Footpaths */}
              <rect x="0" y="0" width="360" height="250" fill="#F4F8FD" />
              <rect
                x="18"
                y="18"
                width="324"
                height="214"
                rx="14"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1.5"
              />

              {/* Campus Zone Blocks */}
              <rect x="34" y="34" width="76" height="42" rx="6" fill="#F1F5F9" />
              <rect x="144" y="84" width="84" height="48" rx="6" fill="#F1F5F9" />
              <rect x="248" y="36" width="76" height="42" rx="6" fill="#F1F5F9" />
              <rect x="36" y="160" width="82" height="48" rx="6" fill="#F1F5F9" />
              <rect x="142" y="168" width="78" height="42" rx="6" fill="#F1F5F9" />
              <rect x="252" y="156" width="74" height="50" rx="6" fill="#F1F5F9" />

              {/* Shuttle Route Polylines */}
              {visibleRoutes.map((route) => {
                const points = route.stopIds
                  .map((id) => {
                    const s = CAMPUS_STOPS[id];
                    return `${(s.schematicX / 100) * 340 + 10},${
                      (s.schematicY / 100) * 230 + 10
                    }`;
                  })
                  .join(' ');
                const isActiveRoute = route.id === selectedRouteId;
                return (
                  <polyline
                    key={route.id}
                    points={points}
                    fill="none"
                    stroke={ROUTE_COLORS[route.id]}
                    strokeWidth={isActiveRoute ? 4 : 2.5}
                    strokeOpacity={isActiveRoute ? 0.9 : 0.45}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              })}

              {/* Illustrative Walking Path Overlay */}
              {showWalkingMode ? (
                <line
                  x1={(selectedStop.schematicX / 100) * 340 + 10}
                  y1={(selectedStop.schematicY / 100) * 230 + 10}
                  x2={(walkingAnchorStop.schematicX / 100) * 340 + 10}
                  y2={(walkingAnchorStop.schematicY / 100) * 230 + 10}
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                />
              ) : null}

              {/* Interactive Campus Stop Pins */}
              {CAMPUS_STOP_LIST.map((stop) => {
                const cx = (stop.schematicX / 100) * 340 + 10;
                const cy = (stop.schematicY / 100) * 230 + 10;
                const isSelected = stop.id === selectedStop.id;
                return (
                  <g
                    key={stop.id}
                    onClick={() => setSelectedStopId(stop.id)}
                    className="cursor-pointer"
                  >
                    {isSelected ? (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="14"
                        fill="#1D4ED8"
                        fillOpacity="0.16"
                      />
                    ) : null}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 8 : 6}
                      fill={isSelected ? '#12376B' : '#FFFFFF'}
                      stroke={isSelected ? '#1D4ED8' : '#12376B'}
                      strokeWidth="2.5"
                    />
                    <text
                      x={cx}
                      y={cy + 20}
                      textAnchor="middle"
                      fill="#0F172A"
                      fontSize="10"
                      fontWeight={isSelected ? '700' : '600'}
                    >
                      {stop.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-4 rounded bg-[#1D4ED8]" /> Route A
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-4 rounded bg-[#16A34A]" /> Route B
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-4 rounded bg-[#0F766E]" /> Route C
            </span>
            {showWalkingMode ? (
              <span className="inline-flex items-center gap-1 font-medium text-amber-700">
                <span className="h-0.5 w-4 border-t-2 border-dashed border-amber-500" />{' '}
                Walk link
              </span>
            ) : null}
          </div>
        </div>

        {/* Selected Stop Details Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#1D4ED8]">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-slate-900">
                  {selectedStop.name}
                </h2>
                <p className="text-xs text-slate-600">{selectedStop.landmark}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                isSaved
                  ? clearSavedPickupPoint()
                  : savePickupPoint(selectedStop.id)
              }
              className={`inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                isSaved
                  ? 'border-[#86EFAC] bg-[#DCFCE7] text-[#15803D]'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-3.5 w-3.5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>Save stop</span>
                </>
              )}
            </button>
          </div>

          {showWalkingMode ? (
            <div className="mt-3 rounded-xl border border-[#CFE1FC] bg-[#EAF2FD] px-3 py-2.5 text-xs text-[#12376B]">
              <div className="font-semibold">
                Walking guidance (illustrative):
              </div>
              <p className="mt-0.5">
                {selectedStop.walkingEstimateMin}. Follow paved campus footpaths
                towards {walkingAnchorStop.name} and verify open pedestrian gates
                locally.
              </p>
            </div>
          ) : (
            <p className="mt-2.5 text-xs text-slate-600">
              {selectedStop.signNote}
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => navigate('/route-status')}
              className="min-h-[42px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Route status
            </button>
            <button
              type="button"
              onClick={() => navigate('/last-mile')}
              className="inline-flex min-h-[42px] items-center justify-center gap-1 rounded-xl bg-[#12376B] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0D2A54]"
            >
              <span>Continue journey</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}

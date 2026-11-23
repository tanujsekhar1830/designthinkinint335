import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  ChevronRight,
  Info,
  Route,
  Users,
} from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import { CAMPUS_STOPS } from '../data/shuttleData';
import { useShuttle } from '../context/ShuttleContext';
import { shuttleService } from '../services/shuttleService';

export function HomeScreen() {
  const navigate = useNavigate();
  const { selectedRouteId, preferences, crowdLevel } = useShuttle();

  const currentRoute = shuttleService.getRouteById(selectedRouteId);
  const savedStop = preferences.savedPickupStopId
    ? CAMPUS_STOPS[preferences.savedPickupStopId]
    : null;

  return (
    <MobileLayout title="Waiting for the Shuttle" headerVariant="bus">
      <div className="flex min-h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="pt-1">
            <h2 className="text-[22px] font-bold leading-tight tracking-tight text-slate-900">
              Where do you want to go?
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Campus shuttle &amp; last-mile transport prototype (demo data)
            </p>
          </div>

          {/* Three Primary Wireframe Cards */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => navigate('/route-status')}
              className="flex min-h-[72px] w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-xs transition-colors hover:border-[#93C5FD] hover:bg-[#F8FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#1D4ED8]">
                  <Route className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-slate-900">
                    Choose a route
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {currentRoute.name} · {currentRoute.sampleEta} (example)
                  </div>
                </div>
              </div>
              <ChevronRight
                className="h-5 w-5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => navigate('/pickup-point')}
              className="flex min-h-[72px] w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-xs transition-colors hover:border-[#86EFAC] hover:bg-[#F7FEF9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#16A34A]">
                  <Bookmark className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-slate-900">
                    Saved pickup point
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {savedStop
                      ? savedStop.name
                      : 'Select and save a campus stop'}
                  </div>
                </div>
              </div>
              <ChevronRight
                className="h-5 w-5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => navigate('/alerts')}
              className="flex min-h-[72px] w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-xs transition-colors hover:border-[#93C5FD] hover:bg-[#F8FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#1D4ED8]">
                  <Info className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-slate-900">
                    Service notice
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    Sample campus advisories &amp; safety tips
                  </div>
                </div>
              </div>
              <ChevronRight
                className="h-5 w-5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Direct Entry to Waiting Area / Crowd Information Flow */}
          <button
            type="button"
            onClick={() => navigate('/waiting-area')}
            className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border border-[#BFDBFE] bg-[#EAF2FD] px-4 py-2.5 text-left transition-colors hover:bg-[#DCEAFE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <div className="flex items-center gap-2.5">
              <Users className="h-4 w-4 shrink-0 text-[#1D4ED8]" />
              <span className="text-[13px] font-semibold text-[#12376B]">
                Waiting Area · Crowd level: {crowdLevel}
              </span>
            </div>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-[#12376B]"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Bottom Primary CTA Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/route-status')}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#12376B] px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0D2A54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12376B]"
          >
            <span>View routes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

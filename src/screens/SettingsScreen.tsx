import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Check, Info, RotateCcw } from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import {
  CAMPUS_STOP_LIST,
  CAMPUS_STOPS,
  SHUTTLE_ROUTES,
} from '../data/shuttleData';
import { useShuttle } from '../context/ShuttleContext';
import { RouteId } from '../types/shuttle';

export function SettingsScreen() {
  const navigate = useNavigate();
  const {
    preferences,
    savePickupPoint,
    clearSavedPickupPoint,
    updatePreferences,
    setSelectedRouteId,
    feedbackReports,
    resetDemoState,
  } = useShuttle();

  const [resetSuccess, setResetSuccess] = useState(false);

  const savedStop = preferences.savedPickupStopId
    ? CAMPUS_STOPS[preferences.savedPickupStopId]
    : null;

  const handleRouteDefaultChange = (routeId: RouteId) => {
    updatePreferences({ defaultRouteId: routeId });
    setSelectedRouteId(routeId);
  };

  const handleResetDemo = () => {
    resetDemoState();
    setResetSuccess(true);
    window.setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <MobileLayout title="Settings" headerVariant="back" backTo="/">
      <div className="space-y-4">
        {/* Saved Pickup Point Management */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-[#16A34A]" />
            <h2 className="text-sm font-bold text-slate-900">
              Saved pickup point
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-600">
            Current saved stop:{' '}
            <strong className="text-slate-900">
              {savedStop ? savedStop.name : 'None saved'}
            </strong>
          </p>

          <label
            htmlFor="settings-pickup-select"
            className="mt-3 block text-xs font-semibold text-slate-700"
          >
            Choose saved stop
          </label>
          <select
            id="settings-pickup-select"
            value={preferences.savedPickupStopId ?? ''}
            onChange={(e) => {
              if (e.target.value) {
                savePickupPoint(e.target.value);
              } else {
                clearSavedPickupPoint();
              }
            }}
            className="mt-1.5 min-h-[42px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]"
          >
            <option value="">No saved pickup point</option>
            {CAMPUS_STOP_LIST.map((stop) => (
              <option key={stop.id} value={stop.id}>
                {stop.name}
              </option>
            ))}
          </select>

          {savedStop ? (
            <button
              type="button"
              onClick={clearSavedPickupPoint}
              className="mt-2.5 text-xs font-semibold text-red-600 hover:underline"
            >
              Clear saved pickup point
            </button>
          ) : null}
        </section>

        {/* Preferred Default Route */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Default shuttle route
          </h2>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {SHUTTLE_ROUTES.map((route) => {
              const active = preferences.defaultRouteId === route.id;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleRouteDefaultChange(route.id)}
                  className={`min-h-[40px] rounded-xl border px-2 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? 'border-[#12376B] bg-[#12376B] text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {route.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Notification preferences
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Saved locally on this browser for demonstration.
          </p>

          <div className="mt-3 space-y-3">
            <label className="flex cursor-pointer items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-800">
                  Route delay notices
                </div>
                <div className="text-[11px] text-slate-500">
                  Highlight sample service advisories
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.routeDelayAlerts}
                onChange={(e) =>
                  updatePreferences({ routeDelayAlerts: e.target.checked })
                }
                className="h-5 w-5 accent-[#12376B]"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-800">
                  Boarding safety reminders
                </div>
                <div className="text-[11px] text-slate-500">
                  Show designated stop safety banners
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.safetyReminders}
                onChange={(e) =>
                  updatePreferences({ safetyReminders: e.target.checked })
                }
                className="h-5 w-5 accent-[#12376B]"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-800">
                  Waiting area crowd alerts
                </div>
                <div className="text-[11px] text-slate-500">
                  Display sample waiting condition tags
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.crowdAlerts}
                onChange={(e) =>
                  updatePreferences({ crowdAlerts: e.target.checked })
                }
                className="h-5 w-5 accent-[#12376B]"
              />
            </label>
          </div>
        </section>

        {/* Application Information & Demo Reset */}
        <section className="rounded-2xl border border-[#CFE1FC] bg-[#EAF2FD] p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#12376B]">
            <Info className="h-4 w-4 text-[#1D4ED8]" />
            <span>About this prototype</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
            <strong>Waiting for the Shuttle</strong> – Intra-Campus and
            Last-Mile Transport Design Thinking prototype. All routes, stop
            times, crowd levels, and map layouts are fictional demonstration
            data and are not official verified campus transit schedules.
          </p>
          <p className="mt-2 text-xs font-medium text-slate-600">
            Local demo reports stored: {feedbackReports.length}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate('/help-feedback')}
              className="min-h-[40px] flex-1 rounded-xl border border-[#93C5FD] bg-white px-3 py-2 text-xs font-semibold text-[#12376B] hover:bg-slate-50"
            >
              Open Help &amp; Feedback
            </button>
            <button
              type="button"
              onClick={handleResetDemo}
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {resetSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span>Reset done</span>
                </>
              ) : (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset demo</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import { ExampleBadge, SafetyReminder } from '../components/SharedElements';
import { CAMPUS_STOPS, CROWD_LEVEL_META } from '../data/shuttleData';
import { useShuttle } from '../context/ShuttleContext';
import { CrowdLevel } from '../types/shuttle';

const CROWD_LEVELS: CrowdLevel[] = ['Low', 'Moderate', 'Busy'];

export function WaitingAreaScreen() {
  const navigate = useNavigate();
  const { crowdLevel, setCrowdLevel, selectedStopId } = useShuttle();

  const meta = CROWD_LEVEL_META[crowdLevel];
  const activeStop = CAMPUS_STOPS[selectedStopId];

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <MobileLayout
      title="Waiting Area"
      headerVariant="bus"
      rightAction={
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex min-h-[38px] items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      }
    >
      <div className="space-y-4">
        {/* Main Crowd Information Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FD] text-[#1D4ED8]">
            <Users className="h-7 w-7" strokeWidth={2.2} />
          </div>

          <p className="mt-3 text-xs font-medium text-slate-500">
            {activeStop ? `${activeStop.name} · Waiting Bay` : 'Campus Waiting Bay'}
          </p>

          <div className="mt-2 flex flex-col items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Crowd level:
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-5 py-1.5 text-base font-bold ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
            >
              {meta.label}
            </span>
          </div>

          <p className="mt-3 text-sm font-medium text-slate-800">
            Approximate waiting condition.
          </p>
          <p className="mt-1 text-xs text-slate-500">{meta.description}</p>

          {/* Selectable Sample Crowd Levels */}
          <div className="mt-5 border-t border-slate-100 pt-4 text-left">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700">
                Sample crowd level selector
              </span>
              <ExampleBadge text="Demo values" />
            </div>

            <div
              role="radiogroup"
              aria-label="Sample crowd level"
              className="grid grid-cols-3 gap-2"
            >
              {CROWD_LEVELS.map((level) => {
                const levelMeta = CROWD_LEVEL_META[level];
                const selected = crowdLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setCrowdLevel(level)}
                    className={`min-h-[42px] rounded-xl border px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                      selected
                        ? `${levelMeta.badgeBg} ${levelMeta.badgeText} ${levelMeta.badgeBorder} ring-2 ring-[#12376B]/20`
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Light Blue Information Card */}
        <div className="rounded-xl border border-[#CFE1FC] bg-[#EAF2FD] px-4 py-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[14px] font-semibold text-[#12376B]">
              Example status – confirm locally.
            </p>
            <ExampleBadge />
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            Demonstration values only — not connected to live occupancy sensors.{' '}
            {meta.guidance}
          </p>
        </div>

        {/* Green Safety Shield Reminder */}
        <SafetyReminder text="Wait in the designated area and board safely." />

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => navigate('/route-status')}
            className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            View route status
          </button>
          <button
            type="button"
            onClick={() => navigate('/help-feedback')}
            className="min-h-[44px] rounded-xl border border-[#12376B] bg-[#12376B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0D2A54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12376B]"
          >
            Report crowd issue
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

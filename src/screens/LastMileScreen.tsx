import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, ChevronDown, ChevronRight, Footprints } from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import { ExampleBadge } from '../components/SharedElements';
import { ONWARD_OPTIONS } from '../data/shuttleData';

export function LastMileScreen() {
  const navigate = useNavigate();
  const [showOnwardOptions, setShowOnwardOptions] = useState(true);

  return (
    <MobileLayout
      title="Continue Your Journey"
      headerVariant="back"
      backTo="/map"
    >
      <div className="flex min-h-full flex-col justify-between gap-4">
        <div className="space-y-3.5">
          {/* Card 1: Walking directions */}
          <button
            type="button"
            onClick={() => navigate('/map?mode=walking')}
            className="flex min-h-[68px] w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-xs transition-colors hover:border-[#93C5FD] hover:bg-[#F8FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#1D4ED8]">
                <Footprints className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-slate-900">
                  Walking directions
                </div>
                <div className="text-xs text-slate-500">
                  View pedestrian path on campus map
                </div>
              </div>
            </div>
            <ChevronRight
              className="h-5 w-5 shrink-0 text-slate-400"
              aria-hidden="true"
            />
          </button>

          {/* Card 2: Onward transport options */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <button
              type="button"
              onClick={() => setShowOnwardOptions((prev) => !prev)}
              aria-expanded={showOnwardOptions}
              className="flex min-h-[68px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#F8FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#1D4ED8]">
                  <Bus className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900">
                    Onward transport options
                  </div>
                  <div className="text-xs text-slate-500">
                    Walking, shuttle, and local transport categories
                  </div>
                </div>
              </div>
              {showOnwardOptions ? (
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-[#1D4ED8]"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRight
                  className="h-5 w-5 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
              )}
            </button>

            {showOnwardOptions ? (
              <div className="space-y-2.5 border-t border-slate-100 bg-[#F8FAFC] px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Available categories
                  </span>
                  <ExampleBadge text="Unverified demo info" />
                </div>
                {ONWARD_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className="rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#12376B]">
                        {option.category}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[13px] font-semibold text-slate-900">
                      {option.title}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                      {option.description}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-amber-800">
                      {option.disclaimer}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Two Light Blue Information Panels */}
          <div className="space-y-2.5">
            <div className="rounded-xl border border-[#CFE1FC] bg-[#EAF2FD] px-4 py-3">
              <p className="text-[14px] font-semibold text-[#12376B]">
                Check current availability and fare.
              </p>
            </div>
            <div className="rounded-xl border border-[#CFE1FC] bg-[#EAF2FD] px-4 py-3">
              <p className="text-[14px] font-semibold text-[#12376B]">
                Verify details before travel.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Dark Blue Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/map')}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#12376B] px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0D2A54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12376B]"
          >
            View directions
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ChevronDown, MapPin } from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import {
  CampusBuildingIllustration,
  SafetyReminder,
} from '../components/SharedElements';
import { CAMPUS_STOP_LIST, CAMPUS_STOPS } from '../data/shuttleData';
import { useShuttle } from '../context/ShuttleContext';

export function PickupPointScreen() {
  const navigate = useNavigate();
  const {
    selectedStopId,
    setSelectedStopId,
    preferences,
    savePickupPoint,
    clearSavedPickupPoint,
  } = useShuttle();

  const [isChangingStop, setIsChangingStop] = useState(false);

  const activeStop = CAMPUS_STOPS[selectedStopId] ?? CAMPUS_STOP_LIST[0];
  const isSaved = preferences.savedPickupStopId === activeStop.id;

  const handleToggleSave = () => {
    if (isSaved) {
      clearSavedPickupPoint();
    } else {
      savePickupPoint(activeStop.id);
    }
  };

  return (
    <MobileLayout title="Pickup Point" headerVariant="back" backTo="/route-status">
      <div className="flex min-h-full flex-col justify-between gap-4">
        <div className="space-y-4">
          {/* Selected Pickup Point White Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#1D4ED8]">
                  <MapPin className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Selected pickup point
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    {activeStop.name}
                  </h2>
                  <p className="text-xs text-slate-600">{activeStop.landmark}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleSave}
                aria-pressed={isSaved}
                className={`inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A] ${
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
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>

            {/* Change Pickup Point Control */}
            <div className="mt-3 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setIsChangingStop((prev) => !prev)}
                className="flex min-h-[36px] w-full items-center justify-between text-xs font-semibold text-[#1D4ED8] hover:text-[#12376B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>Change pickup point</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isChangingStop ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isChangingStop ? (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {CAMPUS_STOP_LIST.map((stop) => {
                    const selected = stop.id === activeStop.id;
                    return (
                      <button
                        key={stop.id}
                        type="button"
                        onClick={() => {
                          setSelectedStopId(stop.id);
                          setIsChangingStop(false);
                        }}
                        className={`min-h-[40px] rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1D4ED8] ${
                          selected
                            ? 'border-[#1D4ED8] bg-[#EAF2FD] font-semibold text-[#12376B]'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {stop.name}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </section>

          {/* Illustrated Campus Building with Location Marker */}
          <CampusBuildingIllustration stopName={activeStop.name} />

          {/* Official Stop Sign Instruction */}
          <div className="rounded-xl border border-[#CFE1FC] bg-[#EAF2FD] px-4 py-3">
            <p className="text-[14px] font-semibold text-[#12376B]">
              Check official stop sign.
            </p>
            <p className="mt-0.5 text-xs text-slate-600">{activeStop.signNote}</p>
          </div>

          {/* Safety Shield Reminder */}
          <SafetyReminder text="Wait in the designated area and board safely." />
        </div>

        {/* Bottom Primary Button + Onward Link */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/map?mode=walking')}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#12376B] px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0D2A54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12376B]"
          >
            View directions
          </button>

          <button
            type="button"
            onClick={() => navigate('/last-mile')}
            className="flex min-h-[40px] w-full items-center justify-center rounded-xl text-xs font-semibold text-[#1D4ED8] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Continue Your Journey options →
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  MessageSquareWarning,
  ShieldCheck,
} from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import { ExampleBadge } from '../components/SharedElements';
import { SAMPLE_NOTICES } from '../data/shuttleData';

export function AlertsScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout title="Service Notices" headerVariant="back" backTo="/">
      <div className="space-y-4">
        <div className="rounded-xl border border-[#CFE1FC] bg-[#EAF2FD] px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#12376B]">
              <Bell className="h-4 w-4 text-[#1D4ED8]" />
              <span>Campus shuttle advisories</span>
            </div>
            <ExampleBadge />
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Sample notices for prototype demonstration. Always verify posted
            information at campus shuttle stops.
          </p>
        </div>

        <div className="space-y-3">
          {SAMPLE_NOTICES.map((notice) => {
            const isSafety = notice.category === 'Safety';
            return (
              <article
                key={notice.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isSafety
                          ? 'bg-[#DCFCE7] text-[#16A34A]'
                          : 'bg-[#EAF2FD] text-[#1D4ED8]'
                      }`}
                    >
                      {isSafety ? (
                        <ShieldCheck className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {notice.category}
                      </span>
                      <h2 className="text-sm font-bold text-slate-900">
                        {notice.title}
                      </h2>
                    </div>
                  </div>
                  <ExampleBadge />
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                  {notice.detail}
                </p>

                <div className="mt-2 text-[11px] font-medium text-slate-400">
                  {notice.postedLabel}
                </div>
              </article>
            );
          })}
        </div>

        {/* Entry to Help & Feedback Flow */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#1D4ED8]">
              <MessageSquareWarning className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-slate-900">
                Spot an outdated stop or safety issue?
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Submit a demonstration report stored locally on this device.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/help-feedback')}
            className="mt-3 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#12376B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0D2A54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12376B]"
          >
            <span>Help &amp; Feedback</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </div>
    </MobileLayout>
  );
}

import React, { useState } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { MobileLayout } from '../components/MobileLayout';
import {
  CAMPUS_STOP_LIST,
  CAMPUS_STOPS,
  FEEDBACK_CATEGORIES,
} from '../data/shuttleData';
import { useShuttle } from '../context/ShuttleContext';
import { FeedbackCategory } from '../types/shuttle';

export function HelpFeedbackScreen() {
  const {
    selectedStopId,
    feedbackReports,
    submitFeedbackReport,
    deleteFeedbackReport,
    clearFeedbackReports,
  } = useShuttle();

  const [locationStopId, setLocationStopId] = useState<string>(selectedStopId);
  const [category, setCategory] = useState<FeedbackCategory | ''>('');
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState<{ location?: string; category?: string }>(
    {}
  );
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: { location?: string; category?: string } = {};

    if (!locationStopId || !CAMPUS_STOPS[locationStopId]) {
      nextErrors.location = 'Please select your campus stop.';
    }
    if (!category) {
      nextErrors.category = 'Please choose an issue category.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setConfirmationMessage(null);
      return;
    }

    setErrors({});
    const stopName = CAMPUS_STOPS[locationStopId].name;
    submitFeedbackReport({
      locationStopId,
      locationName: stopName,
      category: category as FeedbackCategory,
      comments: comments.trim(),
    });

    setComments('');
    setCategory('');
    setConfirmationMessage(
      `Report for ${stopName} saved locally in demo mode. It has not been delivered to campus authorities.`
    );
  };

  return (
    <MobileLayout
      title="Help & Feedback"
      headerVariant="back"
      backTo="/alerts"
    >
      <div className="space-y-4">
        {confirmationMessage ? (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-xl border border-[#86EFAC] bg-[#F0FDF4] p-3.5 text-[#14532D]"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />
            <div className="text-xs leading-relaxed">
              <div className="font-bold">Report saved (Demo Mode)</div>
              <p className="mt-0.5">{confirmationMessage}</p>
            </div>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
        >
          {/* Where are you? Dropdown */}
          <div>
            <label
              htmlFor="feedback-stop"
              className="block text-sm font-semibold text-slate-900"
            >
              Where are you?
            </label>
            <select
              id="feedback-stop"
              value={locationStopId}
              onChange={(e) => {
                setLocationStopId(e.target.value);
                setErrors((prev) => ({ ...prev, location: undefined }));
              }}
              className="mt-1.5 min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]"
            >
              <option value="">Select campus stop...</option>
              {CAMPUS_STOP_LIST.map((stop) => (
                <option key={stop.id} value={stop.id}>
                  {stop.name}
                </option>
              ))}
            </select>
            {errors.location ? (
              <p className="mt-1 text-xs font-medium text-red-600" role="alert">
                {errors.location}
              </p>
            ) : null}
          </div>

          {/* Radio Button Categories */}
          <fieldset>
            <legend className="text-sm font-semibold text-slate-900">
              What would you like to report?
            </legend>
            <div className="mt-2 space-y-2">
              {FEEDBACK_CATEGORIES.map((item) => {
                const checked = category === item;
                return (
                  <label
                    key={item}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${
                      checked
                        ? 'border-[#1D4ED8] bg-[#EAF2FD] font-semibold text-[#12376B]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedback-category"
                      value={item}
                      checked={checked}
                      onChange={() => {
                        setCategory(item);
                        setErrors((prev) => ({ ...prev, category: undefined }));
                      }}
                      className="h-4 w-4 accent-[#12376B]"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
            {errors.category ? (
              <p className="mt-1 text-xs font-medium text-red-600" role="alert">
                {errors.category}
              </p>
            ) : null}
          </fieldset>

          {/* Comments Textarea */}
          <div>
            <label
              htmlFor="feedback-comments"
              className="block text-sm font-semibold text-slate-900"
            >
              Comments
            </label>
            <textarea
              id="feedback-comments"
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add your comments (optional)..."
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]"
            />
          </div>

          <button
            type="submit"
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#12376B] px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0D2A54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12376B]"
          >
            Submit report
          </button>
        </form>

        {/* Saved Demo Reports from LocalStorage */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Submitted demo reports ({feedbackReports.length})
            </h2>
            {feedbackReports.length > 0 ? (
              <button
                type="button"
                onClick={clearFeedbackReports}
                className="text-xs font-semibold text-red-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {feedbackReports.length === 0 ? (
            <p className="mt-2 text-xs text-slate-500">
              No demo reports saved on this device yet.
            </p>
          ) : (
            <div className="mt-3 space-y-2.5">
              {feedbackReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#12376B]">
                        {report.locationName} · {report.category}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Saved locally ·{' '}
                        {new Date(report.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteFeedbackReport(report.id)}
                      aria-label="Delete demo report"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/70 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {report.comments ? (
                    <p className="mt-1.5 text-xs text-slate-700">
                      {report.comments}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </MobileLayout>
  );
}

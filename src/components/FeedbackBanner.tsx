import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface FeedbackBannerProps {
  isCorrect: boolean;
  pointsAwarded: number;
  explanation: string;
  actionLabel: string;
  onAction: () => void;
}

export function FeedbackBanner({
  isCorrect,
  pointsAwarded,
  explanation,
  actionLabel,
  onAction,
}: FeedbackBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-6 rounded-2xl border p-5 transition-all sm:p-6 ${
        isCorrect
          ? 'border-emerald-500/50 bg-emerald-950/30'
          : 'border-rose-500/50 bg-rose-950/25'
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-6 w-6 text-rose-400 shrink-0" />
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4
                className={`font-display text-lg font-bold ${
                  isCorrect ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {isCorrect ? 'إجابة صحيحة!' : 'ليست الإجابة الصحيحة'}
              </h4>
              <span className="text-slate-600" aria-hidden="true">
                ·
              </span>
              <span
                className={`font-mono-tech text-sm font-bold tabular-nums ${
                  isCorrect ? 'text-emerald-200' : 'text-slate-300'
                }`}
              >
                +{pointsAwarded} نقطة
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-base">
              {explanation}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAction}
          className="inline-flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-100 active:scale-[0.98] sm:w-auto"
        >
          <span>{actionLabel}</span>
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Home,
  Printer,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { ScoreRingSvg } from '../components/BlockchainDiagrams';
import { ARENA_IMAGES } from '../data/assets';
import { CHALLENGES_META } from '../data/challenges';
import { GameState, PageId } from '../types/game';
import {
  getAchievementLevel,
  getChallengeBreakdown,
  getScoreTotals,
  MAX_SCORE,
} from '../utils/scoring';

interface ResultsPageProps {
  gameState: GameState;
  onReplay: () => void;
  onNavigate: (page: PageId) => void;
  onReturnToArena: () => void;
}

export function ResultsPage({
  gameState,
  onReplay,
  onNavigate,
  onReturnToArena,
}: ResultsPageProps) {
  const [crestError, setCrestError] = useState(false);

  const { totalScore, correctAnswers, incorrectAnswers } = getScoreTotals(
    gameState.submissions
  );
  const completedCount = Object.values(gameState.completedChallenges).filter(Boolean).length;
  const achievement = getAchievementLevel(totalScore);
  const breakdown = getChallengeBreakdown(
    gameState.submissions,
    gameState.completedChallenges
  );

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-4 pb-12">
      {/* Main Certificate / Results Card */}
      <section className="print-certificate arena-surface relative overflow-hidden rounded-3xl border border-slate-700/80 p-6 sm:p-10">
        {/* Subtle top accent gradient line */}
        <div
          aria-hidden="true"
          className="no-print pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-cyan-400 via-blue-500 to-indigo-500"
        />

        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-center sm:text-right">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {/* Crest Artwork */}
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-700/80 bg-[#070C1B]">
              {!crestError ? (
                <img
                  src={ARENA_IMAGES.crest}
                  alt="شعار شهادة إنجاز BLOCKCHAIN ARENA"
                  referrerPolicy="no-referrer"
                  onError={() => setCrestError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-900">
                  <Award className="h-12 w-12 text-cyan-400" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="text-xs font-medium text-cyan-300">
                بطاقة النتيجة والإنجاز ·{' '}
                <span dir="ltr" className="font-mono-tech">
                  BLOCKCHAIN ARENA
                </span>
              </div>

              <h1 className="font-display mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {gameState.playerName || 'مشارك المسابقة'}
              </h1>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-base font-bold text-indigo-300 sm:justify-start">
                <span>{achievement.titleAr}</span>
                <span className="text-slate-600" aria-hidden="true">
                  ·
                </span>
                <span dir="ltr" className="font-mono-tech text-cyan-300">
                  {achievement.titleEn}
                </span>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {achievement.message}
              </p>
            </div>
          </div>

          {/* Circular Score Gauge */}
          <ScoreRingSvg score={totalScore} />
        </div>

        {/* 4 Summary Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-[#080E1E] p-4">
            <div className="text-xs text-slate-400">المجموع النهائي</div>
            <div className="font-mono-tech mt-1 text-2xl font-bold text-cyan-300 tabular-nums">
              {totalScore} <span className="text-sm text-slate-400">/ {MAX_SCORE}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#080E1E] p-4">
            <div className="text-xs text-slate-400">التحديات المكتملة</div>
            <div className="font-mono-tech mt-1 text-2xl font-bold text-white tabular-nums">
              {completedCount}{' '}
              <span className="text-sm text-slate-400">/ {CHALLENGES_META.length}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#080E1E] p-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>إجابات صحيحة</span>
            </div>
            <div className="font-mono-tech mt-1 text-2xl font-bold text-emerald-300 tabular-nums">
              {correctAnswers}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#080E1E] p-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <XCircle className="h-3.5 w-3.5 text-rose-400" />
              <span>إجابات غير صحيحة</span>
            </div>
            <div className="font-mono-tech mt-1 text-2xl font-bold text-rose-300 tabular-nums">
              {incorrectAnswers}
            </div>
          </div>
        </div>

        {/* Per-Challenge Breakdown */}
        <div className="mt-8 border-t border-slate-800 pt-6">
          <h2 className="font-display mb-4 text-base font-bold text-white sm:text-lg">
            تفاصيل الأداء في التحديات الأربعة
          </h2>
          <div className="divide-y divide-slate-800/80 rounded-2xl border border-slate-800 bg-[#080E1E]">
            {breakdown.map((row, idx) => {
              const meta = CHALLENGES_META[idx];
              return (
                <div
                  key={row.challengeId}
                  className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech text-xs font-bold text-cyan-300">
                        0{meta.order}
                      </span>
                      <span className="font-bold text-white">{meta.title}</span>
                      <span dir="ltr" className="font-mono-tech text-xs text-slate-400">
                        ({meta.titleEn})
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {row.completed ? 'مكتمل' : 'غير مكتمل بعد'} · {row.correctCount} من{' '}
                      {row.totalCount} إجابات صحيحة
                    </p>
                  </div>

                  <div className="font-mono-tech text-sm font-bold text-indigo-300 tabular-nums">
                    {row.earnedPoints} / {row.maxPoints} نقطة
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Action Buttons (Hidden when printing certificate) */}
      <div className="no-print flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>إعادة المسابقة من جديد</span>
          </button>

          {completedCount < CHALLENGES_META.length && (
            <button
              type="button"
              onClick={onReturnToArena}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:bg-cyan-950/50"
            >
              استكمال التحديات المتبقية
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handlePrintCertificate}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            <Printer className="h-4 w-4 text-cyan-400" />
            <span>طباعة / حفظ الشهادة</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900"
          >
            <Home className="h-4 w-4" />
            <span>العودة للرئيسية</span>
          </button>
        </div>
      </div>

      <p className="no-print text-center text-xs text-slate-400">
        النتائج فردية وتُعرض على جهازك فقط. استخدم زر «طباعة / حفظ الشهادة» لحفظ نسخة PDF على جهازك.
      </p>
    </div>
  );
}

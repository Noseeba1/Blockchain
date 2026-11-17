import { Check, Lock, Trophy, User } from 'lucide-react';
import { CHALLENGES_META } from '../data/challenges';
import { ChallengeId } from '../types/game';
import { MAX_SCORE } from '../utils/scoring';

interface ProgressHeaderProps {
  playerName: string;
  score: number;
  activeChallengeIndex: number;
  completedChallenges: Record<ChallengeId, boolean>;
  onSelectChallenge: (index: number) => void;
  onViewResults: () => void;
}

export function ProgressHeader({
  playerName,
  score,
  activeChallengeIndex,
  completedChallenges,
  onSelectChallenge,
  onViewResults,
}: ProgressHeaderProps) {
  const totalChallenges = CHALLENGES_META.length;
  const completedCount = Object.values(completedChallenges).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalChallenges) * 100);
  const allCompleted = completedCount === totalChallenges;

  return (
    <section
      aria-label="لوحة متابعة المسابقة"
      className="rounded-2xl border border-slate-800/90 bg-[#0D1428]/90 p-4 sm:p-5"
    >
      {/* Top Row: Player Info + Live Score + Challenge Count */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <User className="h-4 w-4 text-cyan-400 shrink-0" />
            <span className="text-slate-400">المشارك:</span>
            <span className="font-bold text-white">{playerName}</span>
          </div>

          <span className="hidden text-slate-700 sm:inline" aria-hidden="true">
            ·
          </span>

          <div className="flex items-center gap-2 text-sm text-slate-200">
            <span>التحدي</span>
            <span className="font-mono-tech font-bold text-cyan-300 tabular-nums">
              {activeChallengeIndex + 1} / {totalChallenges}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2">
            <Trophy className="h-4 w-4 text-cyan-400 shrink-0" />
            <span className="text-xs text-slate-400">النقاط:</span>
            <span className="font-mono-tech text-base font-bold text-white tabular-nums">
              {score}
            </span>
            <span className="font-mono-tech text-xs text-slate-400 tabular-nums">
              / {MAX_SCORE}
            </span>
          </div>

          {allCompleted && (
            <button
              type="button"
              onClick={onViewResults}
              className="min-h-[40px] rounded-xl bg-cyan-500/15 px-3.5 py-2 text-xs font-bold text-cyan-300 border border-cyan-500/40 transition hover:bg-cyan-500/25 whitespace-nowrap shrink-0"
            >
              النتيجة النهائية
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
          <span>التقدم في المسابقة</span>
          <span className="font-mono-tech tabular-nums">
            {completedCount} من {totalChallenges} مكتمل ({progressPercent}%)
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full overflow-hidden rounded-full bg-slate-800/90"
        >
          <div
            className="h-full rounded-full bg-gradient-to-l from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${Math.max(progressPercent, 6)}%` }}
          />
        </div>
      </div>

      {/* Challenge Step Selector Tabs */}
      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {CHALLENGES_META.map((challenge, index) => {
          const isCurrent = index === activeChallengeIndex;
          const isCompleted = completedChallenges[challenge.id];
          // Allow navigating to any completed challenge, the current challenge, or the next unlocked challenge
          const isUnlocked =
            isCompleted ||
            isCurrent ||
            index === 0 ||
            completedChallenges[CHALLENGES_META[index - 1].id];

          return (
            <button
              key={challenge.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onSelectChallenge(index)}
              className={`flex min-h-[44px] items-center justify-between gap-2 rounded-xl border px-3 py-2 text-right text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-cyan-400 sm:text-sm ${
                isCurrent
                  ? 'border-cyan-400/70 bg-blue-950/60 text-white'
                  : isCompleted
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200 hover:bg-emerald-950/35'
                    : isUnlocked
                      ? 'border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700'
                      : 'cursor-not-allowed border-slate-800/60 bg-slate-900/30 text-slate-500'
              }`}
            >
              <span className="truncate">
                <span className="font-mono-tech ml-1.5 text-xs opacity-75">
                  {challenge.order}.
                </span>
                {challenge.title}
              </span>
              {isCompleted ? (
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : !isUnlocked ? (
                <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

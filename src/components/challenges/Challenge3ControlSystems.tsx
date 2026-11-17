import { useState } from 'react';
import { Network, Server, Share2 } from 'lucide-react';
import { CHALLENGE_3_SCENARIOS, CHALLENGES_META } from '../../data/challenges';
import { ChallengeId, SubmissionRecord } from '../../types/game';
import { TopologyDiagramSvg } from '../BlockchainDiagrams';
import { ChallengeIntro } from '../ChallengeIntro';
import { FeedbackBanner } from '../FeedbackBanner';

interface Challenge3ControlSystemsProps {
  introSeen: boolean;
  submissions: Record<string, SubmissionRecord>;
  onDismissIntro: () => void;
  onSubmit: (itemId: string, challengeId: ChallengeId, isCorrect: boolean) => void;
  onComplete: () => void;
  onNextChallenge: () => void;
}

export function Challenge3ControlSystems({
  introSeen,
  submissions,
  onDismissIntro,
  onSubmit,
  onComplete,
  onNextChallenge,
}: Challenge3ControlSystemsProps) {
  const meta = CHALLENGES_META[2];
  const [scenarioIndex, setScenarioIndex] = useState(() => {
    const firstPending = CHALLENGE_3_SCENARIOS.findIndex((s) => !submissions[s.id]);
    return firstPending === -1 ? 0 : firstPending;
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const scenario = CHALLENGE_3_SCENARIOS[scenarioIndex];
  const submission = submissions[scenario.id];
  const isSubmitted = Boolean(submission);
  const isLastScenario = scenarioIndex === CHALLENGE_3_SCENARIOS.length - 1;

  const handleSubmitScenario = () => {
    if (isSubmitted || !selectedOption) return;
    const isCorrect = selectedOption === scenario.correctOptionId;
    onSubmit(scenario.id, 'control-systems', isCorrect);
    if (isLastScenario) {
      onComplete();
    }
  };

  const handleNext = () => {
    if (!isLastScenario) {
      setScenarioIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      onComplete();
      onNextChallenge();
    }
  };

  if (!introSeen) {
    return (
      <ChallengeIntro
        challengeNumber={3}
        title={meta.title}
        titleEn={meta.titleEn}
        concept={meta.concept}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
        intro="تعتمد تقنية Blockchain على مشاركة السجل والتحقق منه بين عدة عقد (Nodes) بدلاً من حصر القرار في جهة واحدة. لكن من المهم فهم الفرق الدقيق بين الأنظمة المركزية والموزّعة واللامركزية."
        instructions={[
          'النظام المركزي (Centralized): خادم واحد أو جهة واحدة تتحكم بالبيانات والقرارات.',
          'النظام الموزّع (Distributed): البيانات أو الخوادم موزّعة على عدة أجهزة، لكنه قد يظل مركزياً في الإدارة إذا تحكمت به شركة واحدة.',
          'النظام اللامركزي (Decentralized): لا تملك أي جهة منفردة سلطة التعديل أو الإيقاف، بل تتحقق العقد المستقلة معاً.',
          'اقرأ كل موقف من المواقف الأربعة واختر الوصف الأدق لطبيعة التحكم في البيانات.',
        ]}
        example={
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
              <Server className="mt-0.5 h-4 w-4 text-indigo-400 shrink-0" />
              <div>
                <span className="font-bold text-white">مركزي: </span>
                مدير واحد يتحكم بكل التعديلات.
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
              <Share2 className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white">موزّع مركزي الإدارة: </span>
                عدة خوادم جغرافياً، لكن مالكها واحد.
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
              <Network className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white">لا مركزي موزّع: </span>
                عقد مستقلة (Nodes) تتشارك التحقق دون سلطة وحيدة.
              </div>
            </div>
          </div>
        }
        onStart={onDismissIntro}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1428] p-5 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs text-cyan-300">
            التحدي 3 · <span dir="ltr" className="font-mono-tech">Who Controls the Data?</span> · الموقف{' '}
            <span className="font-mono-tech tabular-nums">
              {scenarioIndex + 1} / {CHALLENGE_3_SCENARIOS.length}
            </span>
          </div>
          <h2 className="font-display mt-1 text-xl font-extrabold text-white sm:text-2xl">
            {scenario.title}
          </h2>
        </div>

        {/* Scenario mini-progress dots */}
        <div className="flex items-center gap-1.5">
          {CHALLENGE_3_SCENARIOS.map((item, idx) => {
            const done = Boolean(submissions[item.id]);
            return (
              <span
                key={item.id}
                className={`h-2 w-7 rounded-full transition-colors ${
                  idx === scenarioIndex
                    ? 'bg-cyan-400'
                    : done
                      ? 'bg-emerald-400/70'
                      : 'bg-slate-800'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Scenario Card */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-[#080E1E] p-5 sm:p-6">
        <p className="text-base leading-relaxed text-slate-100 sm:text-lg">
          {scenario.scenario}
        </p>
      </div>

      {/* 2 Answer Options */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-bold text-slate-200">
          كيف تصنّف طبيعة التحكم في هذا النظام؟
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {scenario.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOpt = isSubmitted && option.id === scenario.correctOptionId;

            return (
              <button
                key={option.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => setSelectedOption(option.id)}
                className={`flex min-h-[68px] flex-col items-start justify-center rounded-2xl border px-5 py-4 text-right transition focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  isCorrectOpt
                    ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
                    : isSelected
                      ? 'border-cyan-400 bg-blue-950/65 text-white'
                      : 'border-slate-800 bg-slate-900/70 text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="font-display text-base font-bold sm:text-lg">
                  {option.label}
                </span>
                <span dir="ltr" className="font-mono-tech mt-0.5 text-xs text-slate-400">
                  {option.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      {!isSubmitted && (
        <div className="mt-7 flex justify-end border-t border-slate-800 pt-5">
          <button
            type="button"
            disabled={!selectedOption}
            onClick={handleSubmitScenario}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3 text-base font-bold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
          >
            تأكيد الإجابة (+10 نقاط)
          </button>
        </div>
      )}

      {/* Feedback + Revealed Network Topology Diagram */}
      {isSubmitted && submission && (
        <>
          <TopologyDiagramSvg type={scenario.correctOptionId} />
          <FeedbackBanner
            isCorrect={submission.isCorrect}
            pointsAwarded={submission.pointsAwarded}
            explanation={scenario.explanation}
            actionLabel={
              isLastScenario
                ? 'التحدي التالي: لغز البلوك تشين'
                : 'الموقف التالي'
            }
            onAction={handleNext}
          />
        </>
      )}
    </div>
  );
}

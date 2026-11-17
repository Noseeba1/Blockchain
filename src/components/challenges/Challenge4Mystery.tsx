import { useState } from 'react';
import { Eye, FileSearch } from 'lucide-react';
import {
  CHALLENGES_META,
  MYSTERY_CLUES,
  MYSTERY_QUESTIONS,
  MYSTERY_STORY,
} from '../../data/challenges';
import { ChallengeId, SubmissionRecord } from '../../types/game';
import { MysteryNodesAuditSvg } from '../BlockchainDiagrams';
import { ChallengeIntro } from '../ChallengeIntro';
import { FeedbackBanner } from '../FeedbackBanner';

interface Challenge4MysteryProps {
  introSeen: boolean;
  submissions: Record<string, SubmissionRecord>;
  onDismissIntro: () => void;
  onSubmit: (itemId: string, challengeId: ChallengeId, isCorrect: boolean) => void;
  onComplete: () => void;
  onFinishCompetition: () => void;
}

export function Challenge4Mystery({
  introSeen,
  submissions,
  onDismissIntro,
  onSubmit,
  onComplete,
  onFinishCompetition,
}: Challenge4MysteryProps) {
  const meta = CHALLENGES_META[3];
  const [questionIndex, setQuestionIndex] = useState(() => {
    const firstPending = MYSTERY_QUESTIONS.findIndex((q) => !submissions[q.id]);
    return firstPending === -1 ? 0 : firstPending;
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inspectedClues, setInspectedClues] = useState<Record<string, boolean>>({
    'clue-1': true,
  });

  const question = MYSTERY_QUESTIONS[questionIndex];
  const submission = submissions[question.id];
  const isSubmitted = Boolean(submission);
  const isLastQuestion = questionIndex === MYSTERY_QUESTIONS.length - 1;

  const toggleClue = (clueId: string) => {
    setInspectedClues((prev) => ({ ...prev, [clueId]: true }));
  };

  const handleSubmitQuestion = () => {
    if (isSubmitted || !selectedOption) return;
    const isCorrect = selectedOption === question.correctOptionId;
    onSubmit(question.id, 'blockchain-mystery', isCorrect);
    if (isLastQuestion) {
      onComplete();
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      onComplete();
      onFinishCompetition();
    }
  };

  if (!introSeen) {
    return (
      <ChallengeIntro
        challengeNumber={4}
        title={meta.title}
        titleEn={meta.titleEn}
        concept={meta.concept}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
        intro="في هذا التحدي الختامي، ستطبّق كل ما تعلمته حول ربط الكتل، بصمات الـ Hash، والتحقق عبر العقد (Nodes) لحل لغز محاولة تعديل سجل داخل شبكة Blockchain جامعية."
        instructions={[
          'اقرأ قصة الحادثة التي وقعت في مسابقة مشاريع التخرج.',
          'افحص الأدلة الأربعة المتاحة بالضغط على كل بطاقة دليل لقراءة التفاصيل.',
          'أجب عن أسئلة التحقيق الثلاثة وصولاً إلى القرار النهائي للشبكة (10 نقاط لكل سؤال).',
        ]}
        onStart={onDismissIntro}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1428] p-5 sm:p-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs text-cyan-300">
          التحدي 4 · <span dir="ltr" className="font-mono-tech">Blockchain Mystery</span> · سؤال التحقيق{' '}
          <span className="font-mono-tech tabular-nums">
            {questionIndex + 1} / {MYSTERY_QUESTIONS.length}
          </span>
        </div>
        <h2 className="font-display mt-1 text-xl font-extrabold text-white sm:text-2xl">
          قضية التعديل الخفي في السجل الجامعي
        </h2>
      </div>

      {/* Case Story */}
      <div className="mt-5 rounded-2xl border border-indigo-500/30 bg-[#080E1E] p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold text-indigo-300">
          <FileSearch className="h-4 w-4 shrink-0" />
          <span>ملف القضية</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
          {MYSTERY_STORY}
        </p>
      </div>

      {/* 4 Clues Board */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-white">
            الأدلة المتاحة (اضغط على أي دليل لفحصه)
          </h3>
          <span className="font-mono-tech text-xs text-slate-400 tabular-nums">
            تم فحص {Object.keys(inspectedClues).length} / {MYSTERY_CLUES.length}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MYSTERY_CLUES.map((clue) => {
            const opened = Boolean(inspectedClues[clue.id]);
            return (
              <button
                key={clue.id}
                type="button"
                onClick={() => toggleClue(clue.id)}
                className={`flex flex-col items-start rounded-2xl border p-4 text-right transition focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  opened
                    ? 'border-cyan-500/45 bg-[#091529]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-cyan-300">
                    {clue.title}
                  </span>
                  <Eye
                    className={`h-4 w-4 shrink-0 ${
                      opened ? 'text-cyan-400' : 'text-slate-500'
                    }`}
                  />
                </div>
                <span className="mt-0.5 text-xs text-slate-400">{clue.subtitle}</span>
                {opened ? (
                  <>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                      {clue.detail}
                    </p>
                    {clue.codeSnippet && (
                      <div
                        dir="ltr"
                        className="font-mono-tech mt-2.5 w-full rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-1.5 text-left text-xs text-indigo-300"
                      >
                        {clue.codeSnippet}
                      </div>
                    )}
                  </>
                ) : (
                  <span className="mt-2 text-xs text-slate-400">
                    اضغط لفتح تفاصيل الدليل...
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {inspectedClues['clue-3'] && <MysteryNodesAuditSvg />}
      </div>

      {/* Investigation Question */}
      <div className="mt-7 border-t border-slate-800 pt-6">
        <h3 className="font-display text-base font-bold text-white sm:text-lg">
          {question.prompt}
        </h3>

        <div className="mt-4 space-y-2.5">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrectOpt = isSubmitted && opt.id === question.correctOptionId;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => setSelectedOption(opt.id)}
                className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-right text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-cyan-400 sm:text-base ${
                  isCorrectOpt
                    ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
                    : isSelected
                      ? 'border-cyan-400 bg-blue-950/65 text-white'
                      : 'border-slate-800 bg-slate-900/70 text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="font-mono-tech flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-xs font-bold uppercase text-cyan-300">
                  {opt.id}
                </span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {!isSubmitted && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={!selectedOption}
              onClick={handleSubmitQuestion}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3 text-base font-bold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
            >
              تأكيد الإجابة (+10 نقاط)
            </button>
          </div>
        )}

        {isSubmitted && submission && (
          <FeedbackBanner
            isCorrect={submission.isCorrect}
            pointsAwarded={submission.pointsAwarded}
            explanation={question.explanation}
            actionLabel={
              isLastQuestion ? 'عرض النتيجة النهائية والشهادة' : 'السؤال التالي'
            }
            onAction={handleNext}
          />
        )}
      </div>
    </div>
  );
}

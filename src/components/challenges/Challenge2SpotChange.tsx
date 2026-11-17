import { useEffect, useState } from 'react';
import { Fingerprint, Sparkles } from 'lucide-react';
import { CHALLENGE_2_ROUNDS, CHALLENGES_META } from '../../data/challenges';
import { ChallengeId, SubmissionRecord } from '../../types/game';
import { computeSha256, serializeRecord } from '../../utils/hash';
import { ChallengeIntro } from '../ChallengeIntro';
import { FeedbackBanner } from '../FeedbackBanner';

interface Challenge2SpotChangeProps {
  introSeen: boolean;
  submissions: Record<string, SubmissionRecord>;
  onDismissIntro: () => void;
  onSubmit: (itemId: string, challengeId: ChallengeId, isCorrect: boolean) => void;
  onComplete: () => void;
  onNextChallenge: () => void;
}

export function Challenge2SpotChange({
  introSeen,
  submissions,
  onDismissIntro,
  onSubmit,
  onComplete,
  onNextChallenge,
}: Challenge2SpotChangeProps) {
  const meta = CHALLENGES_META[1];
  const [roundIndex, setRoundIndex] = useState(() => {
    const firstPending = CHALLENGE_2_ROUNDS.findIndex((r) => !submissions[r.id]);
    return firstPending === -1 ? 0 : firstPending;
  });
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hashA, setHashA] = useState<string>('...');
  const [hashB, setHashB] = useState<string>('...');

  // Interactive SHA-256 live tester shown after submission
  const [sandboxText, setSandboxText] = useState<string>('Amount:500');
  const [sandboxHash, setSandboxHash] = useState<string>('');

  const round = CHALLENGE_2_ROUNDS[roundIndex];
  const submission = submissions[round.id];
  const isSubmitted = Boolean(submission);
  const isLastRound = roundIndex === CHALLENGE_2_ROUNDS.length - 1;

  useEffect(() => {
    let active = true;
    const rawA = serializeRecord(
      round.fields.map((f) => ({ labelEn: f.labelEn, value: f.valueA }))
    );
    const rawB = serializeRecord(
      round.fields.map((f) => ({ labelEn: f.labelEn, value: f.valueB }))
    );
    Promise.all([computeSha256(rawA), computeSha256(rawB)]).then(([a, b]) => {
      if (active) {
        setHashA(a);
        setHashB(b);
      }
    });
    return () => {
      active = false;
    };
  }, [round]);

  useEffect(() => {
    let active = true;
    computeSha256(sandboxText).then((digest) => {
      if (active) setSandboxHash(digest);
    });
    return () => {
      active = false;
    };
  }, [sandboxText]);

  const handleSubmitRound = () => {
    if (isSubmitted || !selectedKey) return;
    const isCorrect = selectedKey === round.changedKey;
    onSubmit(round.id, 'spot-change', isCorrect);
    if (isLastRound) {
      onComplete();
    }
  };

  const handleNext = () => {
    if (!isLastRound) {
      setRoundIndex((prev) => prev + 1);
      setSelectedKey(null);
    } else {
      onComplete();
      onNextChallenge();
    }
  };

  if (!introSeen) {
    return (
      <ChallengeIntro
        challengeNumber={2}
        title={meta.title}
        titleEn={meta.titleEn}
        concept={meta.concept}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
        intro="الـ Hash هو بصمة رقمية فريدة لكل سجل بيانات. إذا تغيّر حرف أو رقم واحد داخل السجل، تتغير بصمة الـ SHA-256 بالكامل فوراً."
        instructions={[
          'في كل جولة، ستشاهد نسختين من نفس السجل الرقمي (النسخة أ والنسخة ب) مع بصمة SHA-256 الحقيقية لكل نسخة.',
          'قارن الحقول بين النسختين بعناية دون أن يظهر لك أي تلميح مسبق.',
          'اختر الحقل الذي تغيّرت قيمته وتسبب في اختلاف بصمة الـ Hash، ثم اضغط "تأكيد الإجابة".',
          'يتكون التحدي من سجلين متتاليين (10 نقاط لكل سجل).',
        ]}
        example={
          <div className="space-y-2 text-xs">
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
              <div className="text-slate-400">النص الأصلي: Amount: 500</div>
              <div dir="ltr" className="font-mono-tech mt-1 truncate text-cyan-300">
                SHA-256: e3b0c44298fc1c14...
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
              <div className="text-slate-400">بعد تعديل رقم: Amount: 900</div>
              <div dir="ltr" className="font-mono-tech mt-1 truncate text-indigo-300">
                SHA-256: 7d865e959b246691...
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
      <div className="flex flex-col gap-2 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs text-cyan-300">
            التحدي 2 · <span dir="ltr" className="font-mono-tech">Spot the Change</span> · السجل{' '}
            <span className="font-mono-tech tabular-nums">
              {roundIndex + 1} / {CHALLENGE_2_ROUNDS.length}
            </span>
          </div>
          <h2 className="font-display mt-1 text-xl font-extrabold text-white sm:text-2xl">
            {round.title}
          </h2>
          <p className="mt-1 text-sm text-slate-300">{round.description}</p>
        </div>
      </div>

      {/* Side-by-Side Record Comparison (Neutral styling before submission!) */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Record A */}
        <div className="rounded-2xl border border-slate-800 bg-[#080E1E] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="font-display text-base font-bold text-white">
              النسخة أ (السجل الأصلي)
            </span>
            <span dir="ltr" className="font-mono-tech text-xs text-slate-400">
              Record A
            </span>
          </div>
          <dl className="space-y-3">
            {round.fields.map((field) => {
              const revealChanged = isSubmitted && field.key === round.changedKey;
              return (
                <div
                  key={`A-${field.key}`}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm ${
                    revealChanged
                      ? 'border-cyan-400/60 bg-cyan-950/30'
                      : 'border-slate-800/80 bg-slate-900/60'
                  }`}
                >
                  <dt className="text-slate-400">
                    {field.label}{' '}
                    <span dir="ltr" className="font-mono-tech text-xs text-slate-500">
                      ({field.labelEn})
                    </span>
                  </dt>
                  <dd className="font-medium text-white">{field.valueA}</dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/90 p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Fingerprint className="h-3.5 w-3.5 text-cyan-400" />
              <span dir="ltr" className="font-mono-tech">
                SHA-256 Hash (A)
              </span>
            </div>
            <p
              dir="ltr"
              className="font-mono-tech mt-1 break-all text-xs text-cyan-300"
            >
              {hashA}
            </p>
          </div>
        </div>

        {/* Record B */}
        <div className="rounded-2xl border border-slate-800 bg-[#080E1E] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="font-display text-base font-bold text-white">
              النسخة ب (السجل المستلم)
            </span>
            <span dir="ltr" className="font-mono-tech text-xs text-slate-400">
              Record B
            </span>
          </div>
          <dl className="space-y-3">
            {round.fields.map((field) => {
              const revealChanged = isSubmitted && field.key === round.changedKey;
              return (
                <div
                  key={`B-${field.key}`}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm ${
                    revealChanged
                      ? 'border-amber-400/60 bg-amber-950/30'
                      : 'border-slate-800/80 bg-slate-900/60'
                  }`}
                >
                  <dt className="text-slate-400">
                    {field.label}{' '}
                    <span dir="ltr" className="font-mono-tech text-xs text-slate-500">
                      ({field.labelEn})
                    </span>
                  </dt>
                  <dd
                    className={`font-medium ${
                      revealChanged ? 'font-bold text-amber-200' : 'text-white'
                    }`}
                  >
                    {field.valueB}
                  </dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/90 p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Fingerprint className="h-3.5 w-3.5 text-indigo-400" />
              <span dir="ltr" className="font-mono-tech">
                SHA-256 Hash (B)
              </span>
            </div>
            <p
              dir="ltr"
              className="font-mono-tech mt-1 break-all text-xs text-indigo-300"
            >
              {hashB}
            </p>
          </div>
        </div>
      </div>

      {/* Field Selector */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-bold text-white">
          اختر الحقل الذي تم تعديله بين النسختين:
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {round.fields.map((field) => {
            const isSelected = selectedKey === field.key;
            const isCorrectField = isSubmitted && field.key === round.changedKey;

            return (
              <button
                key={field.key}
                type="button"
                disabled={isSubmitted}
                onClick={() => setSelectedKey(field.key)}
                className={`min-h-[52px] rounded-xl border px-4 py-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  isCorrectField
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-200'
                    : isSelected
                      ? 'border-cyan-400 bg-blue-950/70 text-white'
                      : 'border-slate-800 bg-slate-900/70 text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span>{field.label}</span>
                <span
                  dir="ltr"
                  className="font-mono-tech mt-0.5 block text-xs font-normal text-slate-400"
                >
                  {field.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="mt-7 flex justify-end border-t border-slate-800 pt-5">
          <button
            type="button"
            disabled={!selectedKey}
            onClick={handleSubmitRound}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3 text-base font-bold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
          >
            تأكيد الإجابة (+10 نقاط)
          </button>
        </div>
      )}

      {/* Feedback + Live SHA-256 Explorer after submission */}
      {isSubmitted && submission && (
        <>
          <FeedbackBanner
            isCorrect={submission.isCorrect}
            pointsAwarded={submission.pointsAwarded}
            explanation={round.explanation}
            actionLabel={
              isLastRound
                ? 'التحدي التالي: من يتحكم في البيانات؟'
                : 'السجل التالي'
            }
            onAction={handleNext}
          />

          <div className="mt-5 rounded-2xl border border-slate-800 bg-[#080E1E] p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>جرّب بنفسك: شاهد كيف يتغير SHA-256 فورياً عند تعديل حرف واحد</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                dir="ltr"
                value={sandboxText}
                onChange={(e) => setSandboxText(e.target.value)}
                aria-label="نص تجريبي لحساب SHA-256"
                className="min-h-[44px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 font-mono-tech text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3.5 py-2">
                <div dir="ltr" className="font-mono-tech text-[11px] text-slate-400">
                  Live Browser SHA-256:
                </div>
                <div
                  dir="ltr"
                  className="font-mono-tech mt-0.5 truncate text-xs text-cyan-300"
                >
                  {sandboxHash}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

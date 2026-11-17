import { DragEvent, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  GripVertical,
  Link2,
  Link2Off,
  RotateCcw,
} from 'lucide-react';
import {
  CHALLENGE_1_CORRECT_ORDER,
  CHALLENGE_1_INITIAL_BLOCKS,
  CHALLENGES_META,
} from '../../data/challenges';
import { BlockItem, ChallengeId, SubmissionRecord } from '../../types/game';
import { ChallengeIntro } from '../ChallengeIntro';
import { FeedbackBanner } from '../FeedbackBanner';

interface Challenge1ChainBuilderProps {
  introSeen: boolean;
  submission?: SubmissionRecord;
  onDismissIntro: () => void;
  onSubmit: (itemId: string, challengeId: ChallengeId, isCorrect: boolean) => void;
  onComplete: () => void;
  onNextChallenge: () => void;
}

export function Challenge1ChainBuilder({
  introSeen,
  submission,
  onDismissIntro,
  onSubmit,
  onComplete,
  onNextChallenge,
}: Challenge1ChainBuilderProps) {
  const meta = CHALLENGES_META[0];
  const isSubmitted = Boolean(submission);

  const [blocks, setBlocks] = useState<BlockItem[]>(() =>
    submission?.isCorrect
      ? CHALLENGE_1_CORRECT_ORDER.map(
          (id) => CHALLENGE_1_INITIAL_BLOCKS.find((b) => b.id === id)!
        )
      : [...CHALLENGE_1_INITIAL_BLOCKS]
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const linkStatuses = useMemo(() => {
    return blocks.map((block, index) => {
      if (index === 0) {
        return block.previousHash === '000000';
      }
      return block.previousHash === blocks[index - 1].currentHash;
    });
  }, [blocks]);

  const swapPositions = (indexA: number, indexB: number) => {
    if (isSubmitted) return;
    if (
      indexA < 0 ||
      indexB < 0 ||
      indexA >= blocks.length ||
      indexB >= blocks.length ||
      indexA === indexB
    ) {
      return;
    }
    setBlocks((prev) => {
      const next = [...prev];
      const temp = next[indexA];
      next[indexA] = next[indexB];
      next[indexB] = temp;
      return next;
    });
    setSelectedIndex(null);
  };

  const handleCardTap = (index: number) => {
    if (isSubmitted) return;
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      swapPositions(selectedIndex, index);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    if (isSubmitted) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (isSubmitted) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (isSubmitted || draggedIndex === null) return;
    if (draggedIndex !== targetIndex) {
      setBlocks((prev) => {
        const next = [...prev];
        const [moved] = next.splice(draggedIndex, 1);
        next.splice(targetIndex, 0, moved);
        return next;
      });
    }
    setDraggedIndex(null);
    setSelectedIndex(null);
  };

  const handleResetOrder = () => {
    if (isSubmitted) return;
    setBlocks([...CHALLENGE_1_INITIAL_BLOCKS]);
    setSelectedIndex(null);
  };

  const handleCheckAnswer = () => {
    if (isSubmitted) return;
    const currentIds = blocks.map((b) => b.id);
    const isCorrect = currentIds.every(
      (id, idx) => id === CHALLENGE_1_CORRECT_ORDER[idx]
    );
    onSubmit('chain-order', 'build-blockchain', isCorrect);
    onComplete();
  };

  if (!introSeen) {
    return (
      <ChallengeIntro
        challengeNumber={1}
        title={meta.title}
        titleEn={meta.titleEn}
        concept={meta.concept}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
        intro="الـ Blockchain ليست مجرد مربعات مرصوفة بجانب بعضها؛ بل هي سلسلة مترابطة بحيث يحتوي كل Block على بصمة الـ Block الذي يسبقه (Previous Hash)."
        instructions={[
          'ستظهر لك 4 كتل (Blocks) بترتيب عشوائي، ولكل كتلة رقم وبيانات وPrevious Hash وCurrent Hash.',
          'ابدأ بالكتلة الأولى (Block #0 — Genesis Block) التي يكون Previous Hash لها 000000.',
          'اجعل كل كتلة تالية تبدأ بـ Previous Hash يطابق تماماً الـ Current Hash للكتلة التي قبلها.',
          'على الكمبيوتر يمكنك السحب والإفلات، وعلى الهاتف اضغط على كتلتين لتبديلهما أو استخدم أزرار التحريك للأعلى والأسفل، ثم اضغط "تحقق من السلسلة".',
        ]}
        example={
          <div className="space-y-2.5 text-xs" dir="ltr">
            <div className="rounded-lg border border-slate-700/80 bg-slate-900/90 p-2.5">
              <div className="font-mono-tech font-bold text-cyan-300">Block #0</div>
              <div className="font-mono-tech mt-1 text-slate-400">
                Previous Hash: <span className="text-slate-200">000000</span>
              </div>
              <div className="font-mono-tech text-slate-400">
                Current Hash: <span className="text-emerald-300 font-bold">1f8a9c</span>
              </div>
            </div>
            <div className="flex justify-center text-cyan-400">
              <Link2 className="h-4 w-4" />
            </div>
            <div className="rounded-lg border border-slate-700/80 bg-slate-900/90 p-2.5">
              <div className="font-mono-tech font-bold text-cyan-300">Block #1</div>
              <div className="font-mono-tech mt-1 text-slate-400">
                Previous Hash: <span className="text-emerald-300 font-bold">1f8a9c</span>
              </div>
              <div className="font-mono-tech text-slate-400">
                Current Hash: <span className="text-slate-200">7e4b20</span>
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
      <div className="flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs text-cyan-300">
            التحدي 1 · <span dir="ltr" className="font-mono-tech">Build the Blockchain</span>
          </div>
          <h2 className="font-display mt-1 text-xl font-extrabold text-white sm:text-2xl">
            رتّب الكتل لتكوين سلسلة Blockchain مترابطة
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            طابق <span dir="ltr" className="font-mono-tech text-cyan-300">Current Hash</span> لكل كتلة مع{' '}
            <span dir="ltr" className="font-mono-tech text-cyan-300">Previous Hash</span> للكتلة التي تليها.
          </p>
        </div>

        {!isSubmitted && (
          <button
            type="button"
            onClick={handleResetOrder}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800 sm:self-center"
          >
            <RotateCcw className="h-4 w-4" />
            <span>إعادة خلط الترتيب</span>
          </button>
        )}
      </div>

      {/* Helper Hint Bar */}
      {!isSubmitted && (
        <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-950/25 px-4 py-3 text-xs text-indigo-200 sm:text-sm">
          {selectedIndex !== null
            ? `تم تحديد الكتلة في الموضع ${selectedIndex + 1}. اضغط الآن على كتلة أخرى لتبديل مكانهما.`
            : 'تلميح التفاعل: اسحب الكتل أو اضغط على أي كتلة ثم اضغط على كتلة أخرى لتبديلهما، أو استخدم أسهم الأعلى والأسفل.'}
        </div>
      )}

      {/* Blocks Chain Workspace */}
      <div className="mt-6 space-y-2">
        {blocks.map((block, index) => {
          const isSelected = selectedIndex === index;
          const isLinkedValid = linkStatuses[index];

          return (
            <div key={block.id}>
              {/* Visual Cryptographic Link Connector between blocks */}
              {index > 0 && (
                <div className="my-1.5 flex items-center justify-center gap-2 py-1">
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-medium ${
                      !isSubmitted
                        ? 'border-slate-800 bg-slate-900/70 text-slate-400'
                        : isLinkedValid
                          ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                          : 'border-rose-500/40 bg-rose-950/40 text-rose-300'
                    }`}
                  >
                    {!isSubmitted ? (
                      <>
                        <Link2 className="h-3.5 w-3.5 text-cyan-400" />
                        <span>رابط السلسلة {index} ← {index + 1}</span>
                      </>
                    ) : isLinkedValid ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>ربط تشفيري متطابق</span>
                      </>
                    ) : (
                      <>
                        <Link2Off className="h-3.5 w-3.5 text-rose-400" />
                        <span>ربط مكسور: البصمتان غير متطابقتين</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Block Card */}
              <div
                draggable={!isSubmitted}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => handleCardTap(index)}
                className={`group rounded-2xl border p-4 transition-all ${
                  !isSubmitted ? 'cursor-pointer' : ''
                } ${
                  isSelected
                    ? 'border-cyan-400 bg-blue-950/60 shadow-md shadow-cyan-950/40'
                    : isSubmitted && isLinkedValid
                      ? 'border-emerald-500/40 bg-[#0A1726]'
                      : isSubmitted && !isLinkedValid
                        ? 'border-rose-500/40 bg-[#1B1020]'
                        : 'border-slate-800 bg-[#090F20] hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    {!isSubmitted && (
                      <div className="mt-1 hidden text-slate-500 sm:block" aria-hidden="true">
                        <GripVertical className="h-5 w-5" />
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono-tech text-xs font-bold text-slate-400">
                          الموضع {index + 1}
                        </span>
                        <span className="text-slate-700" aria-hidden="true">
                          ·
                        </span>
                        <span
                          dir="ltr"
                          className="font-mono-tech text-base font-bold text-cyan-300"
                        >
                          Block #{block.blockNumber}
                        </span>
                        {block.blockNumber === 0 && (
                          <span dir="ltr" className="font-mono-tech text-xs text-indigo-300">
                            (Genesis Block)
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-white sm:text-base">
                        {block.data}
                      </p>

                      <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                        <div className="rounded-lg border border-slate-800/90 bg-slate-950/70 px-3 py-2 text-xs">
                          <span className="block text-slate-400" dir="ltr">
                            Previous Hash
                          </span>
                          <span
                            dir="ltr"
                            className="font-mono-tech mt-0.5 block font-bold text-indigo-300"
                          >
                            {block.previousHash}
                          </span>
                        </div>
                        <div className="rounded-lg border border-slate-800/90 bg-slate-950/70 px-3 py-2 text-xs">
                          <span className="block text-slate-400" dir="ltr">
                            Current Hash
                          </span>
                          <span
                            dir="ltr"
                            className="font-mono-tech mt-0.5 block font-bold text-cyan-300"
                          >
                            {block.currentHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile & Accessibility Move Controls */}
                  {!isSubmitted && (
                    <div
                      className="flex items-center justify-end gap-2 sm:flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => swapPositions(index, index - 1)}
                        aria-label={`تحريك Block #${block.blockNumber} للأعلى`}
                        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === blocks.length - 1}
                        onClick={() => swapPositions(index, index + 1)}
                        aria-label={`تحريك Block #${block.blockNumber} للأسفل`}
                        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      {!isSubmitted && (
        <div className="mt-7 flex justify-end border-t border-slate-800 pt-5">
          <button
            type="button"
            onClick={handleCheckAnswer}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3 text-base font-bold text-white transition hover:brightness-110 active:scale-[0.98] sm:w-auto"
          >
            تحقق من السلسلة (+10 نقاط)
          </button>
        </div>
      )}

      {/* Post-submission Feedback */}
      {isSubmitted && submission && (
        <FeedbackBanner
          isCorrect={submission.isCorrect}
          pointsAwarded={submission.pointsAwarded}
          explanation={
            submission.isCorrect
              ? 'ممتاز! الترتيب الصحيح هو Block #0 ← #1 ← #2 ← #3. لاحظ أن كل كتلة لا تقف بمفردها، بل ترتبط تشفيرياً عبر تخزين Current Hash للكتلة السابقة داخل حقل Previous Hash، مما يمنع إعادة ترتيب الكتل أو تبديلها سراً.'
              : 'الترتيب الصحيح يبدأ من Block #0 (Previous Hash: 000000) ثم Block #1 (Previous Hash: a7f3c1) ثم Block #2 (Previous Hash: d92e08) وأخيراً Block #3 (Previous Hash: 4b81f2). قوة الـ Blockchain تأتي من هذا الربط التشفيري المتسلسل وليس مجرد وضع الكتل بجوار بعضها.'
          }
          actionLabel="التحدي التالي: اكتشف التغيير"
          onAction={onNextChallenge}
        />
      )}
    </div>
  );
}

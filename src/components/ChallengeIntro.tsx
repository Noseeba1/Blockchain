import { useState, ReactNode } from 'react';
import { ArrowLeft, BookOpen, Layers, Lightbulb } from 'lucide-react';

interface ChallengeIntroProps {
  challengeNumber: number;
  title: string;
  titleEn: string;
  concept: string;
  intro: string;
  instructions: string[];
  example?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  onStart: () => void;
}

export function ChallengeIntro({
  challengeNumber,
  title,
  titleEn,
  concept,
  intro,
  instructions,
  example,
  imageUrl,
  imageAlt,
  onStart,
}: ChallengeIntroProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="arena-surface overflow-hidden rounded-2xl border border-slate-800/90">
      {/* Visual Illustration Header */}
      {imageUrl && (
        <div className="relative h-44 w-full overflow-hidden border-b border-slate-800/80 bg-[#070C1B] sm:h-56">
          {!imgError ? (
            <img
              src={imageUrl}
              alt={imageAlt ?? title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B1530] to-[#060A16]">
              <Layers className="h-12 w-12 text-cyan-400/70" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1226] via-[#0B1226]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:px-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-bold text-cyan-300">التحدي {challengeNumber}</span>
              <span aria-hidden="true">·</span>
              <span dir="ltr" className="font-mono-tech text-slate-200">
                {titleEn}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">{concept}</span>
            </div>
            <h2 className="font-display mt-1 text-2xl font-extrabold text-white sm:text-3xl">
              {title}
            </h2>
          </div>
        </div>
      )}

      <div className="p-5 sm:p-8">
        {!imageUrl && (
          <>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-bold text-cyan-300">التحدي {challengeNumber}</span>
              <span aria-hidden="true">·</span>
              <span dir="ltr" className="font-mono-tech text-slate-300">
                {titleEn}
              </span>
              <span aria-hidden="true">·</span>
              <span>{concept}</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {title}
            </h2>
          </>
        )}

        <p className="max-w-3xl text-base leading-relaxed text-slate-300">
          {intro}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className={example ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <BookOpen className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>تعليمات التحدي قبل البدء</span>
            </div>
            <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono-tech mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-cyan-300">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {example && (
            <div className="rounded-xl border border-slate-800 bg-[#080E1E] p-4 lg:col-span-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Lightbulb className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>مثال توضيحي سريع</span>
              </div>
              {example}
            </div>
          )}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-5">
          <p className="text-xs text-slate-400 sm:text-sm">
            اقرأ التعليمات جيداً ثم اضغط على الزر لبدء التفاعل.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 active:scale-[0.98] sm:w-auto"
          >
            <span>ابدأ التحدي</span>
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

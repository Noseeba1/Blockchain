import { useState } from 'react';
import {
  ArrowLeft,
  Blocks,
  Fingerprint,
  HelpCircle,
  Network,
  SearchCheck,
  ShieldCheck,
} from 'lucide-react';
import { MiniChainDiagramSvg } from '../components/BlockchainDiagrams';
import { ARENA_IMAGES } from '../data/assets';
import { CHALLENGES_META } from '../data/challenges';
import { PageId } from '../types/game';

interface HomePageProps {
  hasPlayer: boolean;
  onStartCompetition: () => void;
  onNavigate: (page: PageId) => void;
}

const CHALLENGE_ICONS = [Blocks, Fingerprint, Network, SearchCheck];

export function HomePage({
  hasPlayer,
  onStartCompetition,
  onNavigate,
}: HomePageProps) {
  const [heroImgError, setHeroImgError] = useState(false);
  const [cardImgErrors, setCardImgErrors] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Split Section */}
      <section className="grid items-stretch gap-8 pt-4 lg:grid-cols-12 lg:pt-8">
        <div className="flex flex-col justify-center lg:col-span-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-300 sm:text-sm">
            <span>مسابقة تفاعلية جامعية</span>
            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>
            <span dir="ltr" className="font-mono-tech text-indigo-300">
              Discover Blockchain. Play. Learn. Win.
            </span>
          </div>

          <h1
            className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
            style={{ textWrap: 'balance' }}
          >
            <span
              dir="ltr"
              className="block bg-gradient-to-l from-cyan-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent"
            >
              BLOCKCHAIN ARENA
            </span>
            <span className="mt-2 block text-2xl font-bold text-slate-100 sm:text-3xl">
              اكتشف تقنية البلوك تشين بالتحدي والتجربة
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            لا تحتاج إلى أي خبرة مسبقة! خُض أربعة تحديات تفاعلية قصيرة على هاتفك أو حاسوبك
            لتفهم عملياً كيف ترتبط الكتل، كيف يحمي الـ{' '}
            <span dir="ltr" className="font-mono-tech text-cyan-300">
              Hash
            </span>{' '}
            البيانات، ولماذا تثق الشبكات الموزّعة في السجلات الرقمية.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onStartCompetition}
              className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-950/50 transition hover:brightness-110 active:scale-[0.98]"
            >
              <span>{hasPlayer ? 'متابعة المسابقة' : 'ابدأ المسابقة'}</span>
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('how-to-play')}
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-700/90 bg-slate-900/70 px-6 py-3.5 text-base font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800/80"
            >
              <HelpCircle className="h-5 w-5 text-cyan-400" />
              <span>كيف تلعب؟</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Artwork */}
        <div className="lg:col-span-6">
          <div className="arena-surface relative h-full min-h-[270px] overflow-hidden rounded-3xl border border-slate-700/70">
            {!heroImgError ? (
              <img
                src={ARENA_IMAGES.hero}
                alt="رسم هندسي تفاعلي يوضح ترابط كتل وعقد شبكة Blockchain"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="h-full w-full object-cover lg:h-full"
              />
            ) : (
              <div className="flex h-full min-h-[270px] flex-col items-center justify-center bg-gradient-to-br from-[#0A132C] via-[#0B1736] to-[#060A16] p-8 text-center">
                <Blocks className="h-14 w-14 text-cyan-400" />
                <p className="font-display mt-4 text-lg font-bold text-white">
                  شبكة الكتل التفاعلية
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  4 تحديات عملية لفهم أساسيات Blockchain
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060A16]/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-medium text-cyan-200 sm:text-sm">
                تجربة فردية فورية على جهازك · بدون تسجيل حساب أو تحميل تطبيقات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Quick Overview Strip */}
      <section aria-label="ملخص المسابقة" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="arena-surface rounded-2xl border border-slate-800/90 p-4 sm:p-5">
          <div className="font-mono-tech text-2xl font-bold text-cyan-300 tabular-nums sm:text-3xl">
            4
          </div>
          <div className="mt-1 text-sm font-bold text-white">تحديات تفاعلية</div>
          <p className="mt-1 text-xs text-slate-400">ألعاب عملية متدرجة للمبتدئين</p>
        </div>

        <div className="arena-surface rounded-2xl border border-slate-800/90 p-4 sm:p-5">
          <div className="font-mono-tech text-2xl font-bold text-indigo-300 tabular-nums sm:text-3xl">
            100
          </div>
          <div className="mt-1 text-sm font-bold text-white">نقطة إجمالية</div>
          <p className="mt-1 text-xs text-slate-400">10 نقاط لكل إجابة صحيحة فورية</p>
        </div>

        <div className="arena-surface rounded-2xl border border-slate-800/90 p-4 sm:p-5">
          <div className="font-mono-tech text-2xl font-bold text-cyan-300 tabular-nums sm:text-3xl">
            SHA-256
          </div>
          <div className="mt-1 text-sm font-bold text-white">تشفير حقيقي</div>
          <p className="mt-1 text-xs text-slate-400">يعمل مباشرة داخل متصفحك</p>
        </div>

        <div className="arena-surface rounded-2xl border border-slate-800/90 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="mt-1 text-sm font-bold text-white">خصوصية كاملة</div>
          <p className="mt-1 text-xs text-slate-400">أدخل اسمك فقط والعب على جهازك</p>
        </div>
      </section>

      {/* Interactive SVG Concept Diagram */}
      <section aria-label="رسم توضيحي للبلوك تشين">
        <MiniChainDiagramSvg />
      </section>

      {/* Four Challenges Overview with Bespoke Illustrations */}
      <section aria-label="التحديات الأربعة" className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              ماذا ستخوض داخل المسابقة؟
            </h2>
            <p className="mt-1 text-sm text-slate-300 sm:text-base">
              كل تحدٍّ يبدأ بشرح مبسط ومثال واضح، ثم تنتقل مباشرة للتطبيق العملي.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {CHALLENGES_META.map((challenge, idx) => {
            const Icon = CHALLENGE_ICONS[idx];
            const hasCardError = Boolean(cardImgErrors[challenge.id]);

            return (
              <article
                key={challenge.id}
                className="arena-surface group flex flex-col overflow-hidden rounded-2xl border border-slate-800/90 transition-transform duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40"
              >
                {/* 16:9 Challenge Illustration */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-800/80 bg-[#070C1B]">
                  {!hasCardError ? (
                    <img
                      src={challenge.imageUrl}
                      alt={challenge.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setCardImgErrors((prev) => ({
                          ...prev,
                          [challenge.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0A132C] to-[#060A16]">
                      <Icon className="h-12 w-12 text-cyan-400" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1021] via-transparent to-transparent" />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono-tech font-bold text-cyan-300">
                          0{challenge.order}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span dir="ltr" className="font-mono-tech">
                          {challenge.titleEn}
                        </span>
                      </div>
                      <Icon className="h-5 w-5 text-cyan-400 shrink-0" />
                    </div>

                    <h3 className="font-display mt-2.5 text-xl font-bold text-white">
                      {challenge.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {challenge.shortDesc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                    <span>{challenge.concept}</span>
                    <span className="font-mono-tech font-bold text-indigo-300 tabular-nums">
                      {challenge.maxPoints} نقطة
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

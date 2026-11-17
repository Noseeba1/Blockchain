import { ArrowLeft, Award, Blocks, CheckCircle2, Smartphone, UserCheck } from 'lucide-react';
import { PageId } from '../types/game';

interface HowToPlayPageProps {
  hasPlayer: boolean;
  onStartCompetition: () => void;
  onNavigate: (page: PageId) => void;
}

const STEPS = [
  {
    num: '01',
    title: 'أدخل اسمك للمشاركة',
    desc: 'اكتب اسمك الأول أو الكامل للبدء فوراً، دون الحاجة لبريد إلكتروني أو كلمة مرور أو إنشاء حساب.',
  },
  {
    num: '02',
    title: 'اقرأ التعليمات قبل كل تحدٍّ',
    desc: 'قبل بدء أي لعبة، ستظهر لك بطاقة إرشادية توضح الفكرة الأساسية ومثالاً عملياً مبسطاً.',
  },
  {
    num: '03',
    title: 'أكمل التحدي التفاعلي',
    desc: 'رتّب الكتل، قارن السجلات، حلّل أنظمة التحكم، أو افحص أدلة اللغز بالضغط أو السحب.',
  },
  {
    num: '04',
    title: 'أرسل إجابتك',
    desc: 'بعد اختيارك أو ترتيبك للحل، اضغط على زر التحقق أو التأكيد لتثبيت إجابتك.',
  },
  {
    num: '05',
    title: 'احصل على النقاط والشرح الفوري',
    desc: 'ستظهر نتيجتك فوراً (+10 نقاط للإجابة الصحيحة) مع شرح مبسط للسبب العلمي وراء الحل.',
  },
  {
    num: '06',
    title: 'تابع بقية التحديات',
    desc: 'انتقل بسلاسة عبر التحديات الأربعة مع متابعة شريط التقدم والنقاط من لوحة المسابقة.',
  },
  {
    num: '07',
    title: 'اعرض نتيجتك النهائية ومستوى الإنجاز',
    desc: 'عند إتمام التحديات الأربعة، ستظهر بطاقة نتائجك الشخصية ومستوى إنجازك مع إمكانية طباعة الشهادة.',
  },
];

export function HowToPlayPage({
  hasPlayer,
  onStartCompetition,
  onNavigate,
}: HowToPlayPageProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-4 pb-12">
      <div>
        <div className="text-xs font-medium text-cyan-300 sm:text-sm">
          دليل المشاركة · <span dir="ltr" className="font-mono-tech">How to Play</span>
        </div>
        <h1 className="font-display mt-2 text-3xl font-extrabold text-white sm:text-4xl">
          كيف تلعب في BLOCKCHAIN ARENA؟
        </h1>
        <p className="mt-2 text-base leading-relaxed text-slate-300">
          صُممت المسابقة لتكون بسيطة وممتعة لطلبة الجامعة، خطوة بخطوة في سبع مراحل واضحة:
        </p>
      </div>

      {/* Visual Journey Diagram */}
      <div className="arena-surface rounded-2xl border border-slate-800/90 p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center rounded-xl border border-slate-800/80 bg-[#080E1E] p-3.5 text-center">
            <UserCheck className="h-6 w-6 text-cyan-400" />
            <span className="mt-2 text-xs font-bold text-white">1. إدخال الاسم</span>
            <span className="mt-0.5 text-[11px] text-slate-400">بدون تسجيل حساب</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-slate-800/80 bg-[#080E1E] p-3.5 text-center">
            <Blocks className="h-6 w-6 text-indigo-400" />
            <span className="mt-2 text-xs font-bold text-white">2. التحديات الأربعة</span>
            <span className="mt-0.5 text-[11px] text-slate-400">تفاعل وتعلّم عملي</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-slate-800/80 bg-[#080E1E] p-3.5 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <span className="mt-2 text-xs font-bold text-white">3. شرح ونقاط فورية</span>
            <span className="mt-0.5 text-[11px] text-slate-400">حتى 100 نقطة</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-slate-800/80 bg-[#080E1E] p-3.5 text-center">
            <Award className="h-6 w-6 text-cyan-300" />
            <span className="mt-2 text-xs font-bold text-white">4. النتيجة والشهادة</span>
            <span className="mt-0.5 text-[11px] text-slate-400">لقبك وإنجازك الفردي</span>
          </div>
        </div>
      </div>

      {/* Independent Device Notice */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-cyan-500/35 bg-cyan-950/20 p-5">
        <Smartphone className="mt-0.5 h-6 w-6 text-cyan-300 shrink-0" />
        <div>
          <h2 className="font-display text-base font-bold text-white">
            تجربة مستقلة على جهازك الشخصي
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            كل مشارك يلعب بشكل مستقل تماماً على هاتفه أو حاسوبه. لا توجد خوادم خارجية أو لوحة
            صدارة مشتركة بين الأجهزة؛ جميع النقاط والتقدم تُحسب وتُحفظ محلياً داخل متصفحك.
          </p>
        </div>
      </div>

      {/* 7 Steps Timeline */}
      <ol className="relative space-y-3">
        {STEPS.map((step, idx) => (
          <li
            key={step.num}
            className="arena-surface relative flex items-start gap-4 rounded-2xl border border-slate-800/90 p-4 sm:p-5"
          >
            <div className="relative flex flex-col items-center">
              <span className="font-mono-tech flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/35 bg-slate-900 text-sm font-bold text-cyan-300">
                {step.num}
              </span>
              {idx < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-1.5 hidden h-5 w-px bg-gradient-to-b from-cyan-500/40 to-transparent sm:block"
                />
              )}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* CTA Row */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          العودة إلى الرئيسية
        </button>

        <button
          type="button"
          onClick={onStartCompetition}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-7 py-3 text-base font-bold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 active:scale-[0.98]"
        >
          <span>{hasPlayer ? 'الانتقال إلى التحديات' : 'ابدأ المسابقة الآن'}</span>
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

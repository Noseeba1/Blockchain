import { FormEvent, useState } from 'react';
import { AlertCircle, ArrowLeft, ShieldCheck, User } from 'lucide-react';

interface PlayerEntryPageProps {
  existingName: string;
  onConfirmPlayer: (name: string) => void;
  onContinueExisting: () => void;
}

export function PlayerEntryPage({
  existingName,
  onConfirmPlayer,
  onContinueExisting,
}: PlayerEntryPageProps) {
  const [name, setName] = useState(existingName);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('يرجى إدخال اسمك قبل بدء المسابقة.');
      return;
    }
    if (trimmed.length < 2) {
      setError('يرجى إدخال اسم لا يقل عن حرفين.');
      return;
    }
    setError('');
    onConfirmPlayer(trimmed);
  };

  return (
    <div className="mx-auto max-w-xl py-8 pb-16">
      <div className="rounded-3xl border border-slate-800 bg-[#0D1428] p-6 sm:p-8">
        <div className="text-xs font-medium text-cyan-300">
          تسجيل المشارك · <span dir="ltr" className="font-mono-tech">Player Entry</span>
        </div>

        <h1 className="font-display mt-2 text-2xl font-extrabold text-white sm:text-3xl">
          أدخل اسمك لبدء التحدي
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          سيظهر اسمك في لوحة المتابعة وعلى شهادة النتيجة النهائية الخاصة بك على هذا الجهاز.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="player-name-input"
              className="mb-2 block text-sm font-bold text-slate-200"
            >
              اسم المشارك
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute top-1/2 right-3.5 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="player-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="مثال: سارة محمد"
                maxLength={50}
                autoFocus
                className="min-h-[50px] w-full rounded-xl border border-slate-700 bg-[#080E1E] pr-11 pl-4 text-base text-white placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="mt-2.5 flex items-center gap-2 text-sm font-medium text-rose-300"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs leading-relaxed text-slate-300">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              لا يتطلب الأمر إنشاء حساب أو إدخال بريد إلكتروني أو كلمة مرور. تُحفظ بياناتك محلياً
              على متصفحك فقط.
            </span>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 active:scale-[0.98]"
          >
            <span>ابدأ المسابقة</span>
            <ArrowLeft className="h-5 w-5" />
          </button>

          {existingName.trim().length > 0 && (
            <button
              type="button"
              onClick={onContinueExisting}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              متابعة الجلسة السابقة باسم ({existingName})
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

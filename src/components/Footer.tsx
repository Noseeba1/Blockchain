export function Footer() {
  return (
    <footer className="no-print mt-auto border-t border-slate-800/80 bg-[#050812] py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-slate-400 sm:flex-row sm:px-6 sm:text-right">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-slate-200" dir="ltr">
            BLOCKCHAIN ARENA
          </span>
          <span aria-hidden="true">·</span>
          <span>Discover Blockchain. Play. Learn. Win.</span>
        </div>
        <p className="text-slate-400">
          مسابقة تعليمية جامعية تفاعلية · تعمل بالكامل داخل المتصفح على جهازك بدون خوادم أو حسابات.
        </p>
      </div>
    </footer>
  );
}

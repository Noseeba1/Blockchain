import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types/game';

interface NavbarProps {
  currentPage: PageId;
  hasPlayer: boolean;
  allCompleted: boolean;
  onNavigate: (page: PageId) => void;
}

export function Navbar({
  currentPage,
  hasPlayer,
  allCompleted,
  onNavigate,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId) => {
    setMobileMenuOpen(false);
    if (page === 'arena' && !hasPlayer) {
      onNavigate('player-entry');
      return;
    }
    if (page === 'results' && !hasPlayer) {
      onNavigate('player-entry');
      return;
    }
    onNavigate(page);
  };

  const primaryCtaLabel = allCompleted
    ? 'عرض النتائج'
    : hasPlayer
      ? 'متابعة التحديات'
      : 'ابدأ المسابقة';

  const primaryCtaTarget: PageId = allCompleted
    ? 'results'
    : hasPlayer
      ? 'arena'
      : 'player-entry';

  const navItems: Array<{ id: PageId; label: string }> = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'how-to-play', label: 'كيف تلعب؟' },
    { id: 'arena', label: 'التحديات' },
    { id: 'results', label: 'النتائج' },
  ];

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-800/80 bg-[#060A16]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:gap-8 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display flex items-center gap-2.5 text-base font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 sm:text-lg"
          dir="ltr"
        >
          <span className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-tr from-blue-500 to-cyan-400" />
          <span>BLOCKCHAIN ARENA</span>
        </button>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden items-center gap-6 text-sm font-medium md:flex"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
                  isActive
                    ? 'text-cyan-300'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleNav(primaryCtaTarget)}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-gradient-to-l from-indigo-600 via-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-950/50 transition hover:brightness-110 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:text-sm"
          >
            {primaryCtaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-200 transition hover:bg-slate-800 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="قائمة الجوال"
          className="border-t border-slate-800 bg-[#0A1022] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex min-h-[44px] w-full items-center justify-between rounded-xl px-4 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-cyan-400">الحالية</span>}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

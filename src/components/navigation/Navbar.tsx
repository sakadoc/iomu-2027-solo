import React, { useState } from 'react';
import { Compass, Eye, Menu, Sparkles, X } from 'lucide-react';
import { CHAPTERS, EVENT_CONFIG } from '../../config/eventConfig';
import { Language, UI_STRINGS } from '../../i18n/translations';

interface NavbarProps {
  activeChapterIndex: number;
  onNavigateChapter: (chapterId: string) => void;
  onToggleMap: () => void;
  isMapOpen: boolean;
  liteMode: boolean;
  onToggleLiteMode: () => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeChapterIndex,
  onNavigateChapter,
  onToggleMap,
  isMapOpen,
  liteMode,
  onToggleLiteMode,
  lang,
  onChangeLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_STRINGS[lang];

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateChapter(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-kawung-gold/30 bg-keraton/95 backdrop-blur-md iomu-kawung-accent">
      {/* Row 1: Official Co-Branding Pill + Utility Controls */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-3 py-2 sm:px-6">
        {/* Official Co-Branding Pill: PERDOKI · IDI | IOMU */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav('home');
          }}
          aria-label="IOMU 2027 Home — Co-branded PERDOKI, IDI, and IOMU"
          className="inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold"
        >
          <img
            src={EVENT_CONFIG.assets.logoHeaderCobrand}
            alt="PERDOKI · IDI | IOMU Solo 2027"
            width={220}
            height={44}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.triedFallback) {
                img.dataset.triedFallback = '1';
                img.src = './assets/brand/logo-header-cobrand.jpg';
              }
            }}
            className="h-8 w-auto max-w-[46vw] object-contain sm:h-11 sm:max-w-[230px] md:h-12"
          />
        </a>

        {/* Action Controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div
            role="group"
            aria-label="Language selection"
            className="inline-flex items-center rounded-full border border-kawung-gold/70 bg-keraton/90 p-0.5 text-[10px] font-bold sm:text-[11px]"
          >
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              className={`rounded-full px-2 py-0.5 transition sm:px-2.5 sm:py-1 ${
                lang === 'en' ? 'bg-kawung-gold text-keraton' : 'text-ivory/80 hover:text-light-gold'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('id')}
              className={`rounded-full px-2 py-0.5 transition sm:px-2.5 sm:py-1 ${
                lang === 'id' ? 'bg-kawung-gold text-keraton' : 'text-ivory/80 hover:text-light-gold'
              }`}
            >
              ID
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleMap}
            aria-expanded={isMapOpen}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-sans text-[11px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold sm:px-3 sm:text-xs ${
              isMapOpen
                ? 'border-ivory bg-kawung-gold text-keraton'
                : 'border-kawung-gold/70 bg-emerald/70 text-ivory hover:border-kawung-gold hover:bg-emerald'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.journeyMap}</span>
          </button>

          <button
            type="button"
            onClick={onToggleLiteMode}
            title={liteMode ? 'Switch to 3D WebGL World' : 'Switch to 2D / Reduced Motion View'}
            className="inline-flex items-center gap-1.5 rounded-full border border-kawung-gold/50 bg-keraton/80 px-2.5 py-1.5 font-sans text-[11px] font-medium text-light-gold transition hover:border-kawung-gold hover:bg-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold sm:px-3 sm:text-xs"
          >
            {liteMode ? <Sparkles className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            <span className="sm:hidden">{liteMode ? '3D' : '2D'}</span>
            <span className="hidden sm:inline">{liteMode ? t.mode3d : t.mode2d}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex items-center justify-center gap-1 rounded-full border border-kawung-gold/60 bg-emerald/80 px-2.5 py-1.5 text-[11px] font-bold text-ivory lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold"
          >
            {mobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{t.menuBtn || 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Row 2: Full-Width Unclipped Chapter Navigation Ribbon */}
      <div className="border-t border-kawung-gold/25 bg-keraton/35">
        <nav
          aria-label="Main navigation"
          className="no-scrollbar mx-auto flex max-w-[1440px] items-center justify-start gap-1 overflow-x-auto px-3 py-1.5 sm:px-6 lg:flex-wrap lg:justify-center"
        >
          {CHAPTERS.map((chapter) => {
            const isActive = activeChapterIndex === chapter.index;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => handleNav(chapter.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1 font-sans text-[11px] font-semibold tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold sm:text-xs ${
                  isActive
                    ? 'bg-kawung-gold text-keraton shadow-sm'
                    : 'text-ivory/90 hover:bg-emerald/70 hover:text-light-gold'
                }`}
              >
                {chapter.menuLabel}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Responsive Tablet/Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="max-h-[70vh] overflow-y-auto border-t border-kawung-gold/30 bg-keraton/95 px-4 py-3 lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CHAPTERS.map((chapter) => {
              const isActive = activeChapterIndex === chapter.index;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleNav(chapter.id)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                    isActive
                      ? 'border-ivory bg-kawung-gold text-keraton'
                      : 'border-kawung-gold/30 bg-emerald/40 text-ivory hover:border-kawung-gold'
                  }`}
                >
                  <span className="block text-[10px] opacity-75">{chapter.code}</span>
                  <span>{chapter.menuLabel}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

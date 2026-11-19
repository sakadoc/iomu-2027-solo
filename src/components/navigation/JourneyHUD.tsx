import React from 'react';
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { CHAPTERS, ChapterConfig, EVENT_CONFIG } from '../../config/eventConfig';

interface JourneyHUDProps {
  activeChapter: ChapterConfig;
  progressPercent: number;
  onNavigateChapter: (chapterId: string) => void;
  isMapOpen: boolean;
  onCloseMap: () => void;
}

export const JourneyHUD: React.FC<JourneyHUDProps> = ({
  activeChapter,
  progressPercent,
  onNavigateChapter,
  isMapOpen,
  onCloseMap,
}) => {
  const prevChapter = CHAPTERS.find((c) => c.index === activeChapter.index - 1);
  const nextChapter = CHAPTERS.find((c) => c.index === activeChapter.index + 1);

  return (
    <>
      {/* Persistent Bottom Progress HUD */}
      <aside
        aria-label="Journey progress indicator"
        className="fixed bottom-2.5 left-2.5 right-2.5 z-30 mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-2xl border border-kawung-gold/40 bg-keraton/90 px-3 py-2 shadow-keraton backdrop-blur-md iomu-kawung-accent sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3 sm:px-4 sm:py-2.5"
      >
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img
            src={EVENT_CONFIG.assets.pinGoldIcon}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
          />
          <div className="min-w-0">
            <p className="truncate font-display text-[11px] font-bold tracking-wider text-light-gold sm:text-sm">
              {activeChapter.code} — {activeChapter.title}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-emerald sm:w-44">
                <div
                  className="h-full rounded-full bg-kawung-gold transition-all duration-150"
                  style={{ width: `${Math.max(4, Math.round(progressPercent * 100))}%` }}
                />
              </div>
              <span className="text-[10px] font-medium text-ivory/75 sm:text-[11px]">
                {Math.round(progressPercent * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            disabled={!prevChapter}
            onClick={() => prevChapter && onNavigateChapter(prevChapter.id)}
            aria-label="Previous chapter"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-kawung-gold/50 bg-emerald/60 text-ivory transition hover:border-kawung-gold hover:bg-emerald disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold sm:h-8 sm:w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={!nextChapter}
            onClick={() => nextChapter && onNavigateChapter(nextChapter.id)}
            aria-label="Next chapter"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-kawung-gold/50 bg-emerald/60 text-ivory transition hover:border-kawung-gold hover:bg-emerald disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold sm:h-8 sm:w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Stylized Interactive 3D Solo Journey Map Overlay */}
      {isMapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Surakarta 3D Journey Map"
          className="fixed inset-0 z-50 flex items-center justify-center bg-keraton/80 p-3 backdrop-blur-sm sm:p-4"
        >
          <div className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-2 border-kawung-gold bg-ivory text-keraton shadow-keraton">
            <div className="bg-kawung-green-subtle pointer-events-none absolute inset-0 opacity-10" />

            <div className="relative flex shrink-0 items-center justify-between border-b border-kawung-gold/40 px-4 py-3 sm:px-6 sm:py-4">
              <div>
                <p className="font-script text-2xl text-dark-gold">Solo Route</p>
                <h2 className="font-display text-base font-extrabold tracking-tight text-keraton sm:text-xl">
                  Interactive Journey Map — IOMU 2027
                </h2>
              </div>
              <button
                type="button"
                onClick={onCloseMap}
                aria-label="Close Journey Map"
                className="rounded-full border border-dark-gold/40 bg-white/80 p-2 text-keraton transition hover:bg-kawung-gold hover:text-keraton focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative grid gap-3 overflow-y-auto p-4 sm:grid-cols-2 sm:p-6">
              {CHAPTERS.map((chapter) => {
                const isActive = chapter.index === activeChapter.index;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => {
                      onCloseMap();
                      onNavigateChapter(chapter.id);
                    }}
                    className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton ${
                      isActive
                        ? 'border-keraton bg-keraton text-ivory shadow-md'
                        : 'border-kawung-gold/50 bg-white/75 text-keraton hover:border-keraton hover:bg-white'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${
                        isActive
                          ? 'bg-kawung-gold text-keraton'
                          : 'bg-emerald/15 text-emerald'
                      }`}
                    >
                      0{chapter.index}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold">{chapter.title}</span>
                        {isActive && <MapPin className="h-4 w-4 shrink-0 text-kawung-gold" />}
                      </div>
                      <p
                        className={`mt-0.5 text-xs ${
                          isActive ? 'text-light-gold' : 'text-emerald'
                        }`}
                      >
                        {chapter.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

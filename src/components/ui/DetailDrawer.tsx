import React, { useEffect } from 'react';
import { Building2, Calendar, Clock, ExternalLink, MapPin, User, X } from 'lucide-react';
import { SelectedFocusItem } from '../three/types';
import { PROGRAMS } from '../../data/programData';

interface DetailDrawerProps {
  selectedItem: SelectedFocusItem;
  onClose: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ selectedItem, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItem) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem, onClose]);

  if (!selectedItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Selected 3D feature details"
      className="fixed inset-x-3 bottom-16 top-28 z-40 flex w-auto max-w-md flex-col overflow-hidden rounded-2xl border-2 border-kawung-gold bg-ivory text-keraton shadow-keraton sm:inset-x-auto sm:bottom-20 sm:right-4 sm:top-28 sm:w-[calc(100%-2rem)] sm:rounded-3xl"
    >
      <div className="bg-kawung-green-subtle pointer-events-none absolute inset-0 opacity-10" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4 border-b border-kawung-gold/40 bg-ivory/95 px-6 py-4">
        <div>
          <span className="inline-block rounded-full bg-emerald/10 px-2.5 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wider text-dark-gold">
            {selectedItem.kind === 'landmark' && selectedItem.data.category}
            {selectedItem.kind === 'pavilion' && selectedItem.data.tagline}
            {selectedItem.kind === 'speaker' && selectedItem.data.slotLabel}
            {selectedItem.kind === 'hotel' && selectedItem.data.tier}
            {selectedItem.kind === 'destination' && selectedItem.data.category}
          </span>
          <h3 className="mt-1 font-display text-lg font-extrabold text-keraton">
            {selectedItem.kind === 'landmark' && selectedItem.data.name}
            {selectedItem.kind === 'pavilion' && selectedItem.data.shortTitle}
            {selectedItem.kind === 'speaker' && selectedItem.data.fullName}
            {selectedItem.kind === 'hotel' && selectedItem.data.name}
            {selectedItem.kind === 'destination' && selectedItem.data.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail panel and return to camera path"
          className="shrink-0 rounded-full border border-dark-gold/40 bg-white p-1.5 text-keraton transition hover:bg-kawung-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="relative flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm">
        {selectedItem.kind === 'landmark' && (
          <>
            {selectedItem.data.photo && (
              <figure className="space-y-2">
                <div className="iomu-arch-frame mx-auto max-w-[240px] overflow-hidden bg-keraton">
                  <img
                    src={selectedItem.data.photo}
                    alt={selectedItem.data.name}
                    loading="lazy"
                    onError={(e) => {
                      const fallback = selectedItem.data.fallbackPhoto;
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="h-56 w-full object-cover sm:h-64"
                  />
                </div>
                {selectedItem.data.photoCredit && (
                  <figcaption className="text-center text-[11px] text-emerald">
                    {selectedItem.data.photoCredit}
                  </figcaption>
                )}
              </figure>
            )}

            <p className="leading-relaxed text-keraton">{selectedItem.data.description}</p>

            <div className="rounded-2xl border border-kawung-gold/40 bg-white/70 p-4">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">
                Cultural Highlight
              </p>
              <p className="mt-1 text-xs leading-relaxed text-emerald">
                {selectedItem.data.culturalHighlight}
              </p>
            </div>

            <p className="text-[11px] italic text-emerald/85">{selectedItem.data.stylizedNote}</p>

            <a
              href={selectedItem.data.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-keraton px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory transition hover:bg-emerald"
            >
              <MapPin className="h-4 w-4 text-kawung-gold" />
              Open Map Directions (City Landmark)
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </>
        )}

        {selectedItem.kind === 'destination' && (
          <>
            <figure className="space-y-2">
              <div className="iomu-arch-frame mx-auto max-w-[280px] overflow-hidden bg-keraton">
                <img
                  src={selectedItem.data.image}
                  alt={selectedItem.data.name}
                  loading="lazy"
                  onError={(e) => {
                    const fallback = selectedItem.data.fallbackImage;
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>
              <figcaption className="text-center text-[11px] text-emerald">
                {selectedItem.data.imageCaption}
              </figcaption>
            </figure>

            {selectedItem.data.secondaryImage &&
              selectedItem.data.secondaryImage !== selectedItem.data.image && (
                <div className="overflow-hidden rounded-2xl border border-kawung-gold/50 bg-keraton">
                  <img
                    src={selectedItem.data.secondaryImage}
                    alt={`${selectedItem.data.name} — Referensi`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.parentElement?.classList.add('hidden');
                    }}
                    className="h-36 w-full object-cover"
                  />
                </div>
              )}

            <div className="rounded-2xl border border-kawung-gold/50 bg-white/85 p-4 space-y-2">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">
                {selectedItem.data.narrativeTitle}
              </p>
              <p className="text-xs leading-relaxed text-keraton">
                {selectedItem.data.narrativeStory}
              </p>
            </div>

            <div className="rounded-2xl border border-kawung-gold/40 bg-white/70 p-4">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">
                Visitor Cultural Tip
              </p>
              <p className="mt-1 text-xs leading-relaxed text-emerald">
                {selectedItem.data.culturalTip}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold text-keraton">
                Area: {selectedItem.data.locationNote}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <a
                href={selectedItem.data.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-keraton px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory transition hover:bg-emerald"
              >
                <MapPin className="h-4 w-4 text-kawung-gold" />
                Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={
                  selectedItem.data.googlePhotosUrl ||
                  `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                    selectedItem.data.name + ' Solo Surakarta'
                  )}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-kawung-gold bg-white px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-keraton transition hover:bg-ivory"
              >
                📷 Foto Google
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </>
        )}

        {selectedItem.kind === 'hotel' && (
          <>
            <div className="rounded-2xl border border-kawung-gold/50 bg-keraton/95 p-4 text-ivory backdrop-blur-sm iomu-kawung-accent">
              <div className="flex items-center gap-2 text-light-gold">
                <Building2 className="h-4 w-4 text-kawung-gold" />
                <span className="font-display text-xs font-bold uppercase tracking-wider">
                  {selectedItem.data.distanceFromAlila}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ivory/90">
                {selectedItem.data.address}
              </p>
            </div>

            <p className="leading-relaxed text-keraton">{selectedItem.data.summary}</p>

            <div className="rounded-2xl border border-kawung-gold/45 bg-white/85 p-4">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">
                Key Highlights
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-emerald list-disc list-inside">
                {selectedItem.data.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-3 border-t border-kawung-gold/30 pt-2 text-[11px] font-semibold text-dark-gold">
                {selectedItem.data.bookingStatus}
              </p>
            </div>

            <a
              href={selectedItem.data.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-keraton px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory transition hover:bg-emerald"
            >
              <MapPin className="h-4 w-4 text-kawung-gold" />
              Open Hotel Location on Map
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </>
        )}

        {selectedItem.kind === 'pavilion' && (
          <>
            <p className="leading-relaxed text-keraton">{selectedItem.data.summary}</p>
            <div className="space-y-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">
                Program Information Entries
              </h4>
              {PROGRAMS.filter((p) => p.category === selectedItem.data.category).map((program) => (
                <div
                  key={program.id}
                  className="rounded-2xl border border-kawung-gold/50 bg-white/80 p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-display text-sm font-bold text-keraton">
                      {program.title}
                    </h5>
                    <span className="shrink-0 rounded-full border border-dark-gold/40 bg-ivory px-2.5 py-0.5 text-[10px] font-bold text-dark-gold">
                      {program.status}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald">{program.description}</p>
                  <div className="grid grid-cols-1 gap-1.5 pt-1 text-[11px] text-keraton/85">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-dark-gold" />
                      <span>{program.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-dark-gold" />
                      <span>{program.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-dark-gold" />
                      <span>Speaker: {program.speaker}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-dark-gold" />
                      <span>Room: {program.room}</span>
                    </div>
                  </div>
                  <p className="border-t border-kawung-gold/25 pt-2 text-[11px] font-semibold text-dark-gold">
                    {program.registrationAvailability}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedItem.kind === 'speaker' && (
          <>
            <div className="iomu-arch-frame mx-auto flex h-44 w-36 flex-col items-center justify-center bg-keraton p-4 text-center text-ivory">
              <User className="h-10 w-10 text-kawung-gold" />
              <span className="mt-2 font-display text-xs font-bold uppercase tracking-wider text-light-gold">
                {selectedItem.data.status}
              </span>
            </div>

            <div className="space-y-3 rounded-2xl border border-kawung-gold/45 bg-white/80 p-4 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-dark-gold">
                  Role / Jabatan Track
                </span>
                <p className="mt-0.5 font-semibold text-keraton">{selectedItem.data.positionTitle}</p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider text-dark-gold">
                  Academic & Professional Titles
                </span>
                <p className="mt-0.5 text-keraton">{selectedItem.data.titles}</p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider text-dark-gold">
                  Institution
                </span>
                <p className="mt-0.5 text-keraton">{selectedItem.data.institution}</p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider text-dark-gold">
                  Presentation Title
                </span>
                <p className="mt-0.5 text-keraton">{selectedItem.data.presentationTitle}</p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider text-dark-gold">
                  Biography
                </span>
                <p className="mt-0.5 leading-relaxed text-emerald">
                  {selectedItem.data.biography}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Action */}
      <div className="relative border-t border-kawung-gold/40 bg-ivory/95 px-6 py-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-keraton/25 bg-white py-2 font-display text-xs font-bold uppercase tracking-wider text-keraton transition hover:bg-kawung-gold"
        >
          Return to Scroll Journey
        </button>
      </div>
    </div>
  );
};

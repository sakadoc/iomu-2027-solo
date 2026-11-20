import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  MapPin,
  Search,
  ShieldCheck,
  SkipForward,
  User,
} from 'lucide-react';
import {
  ALTERNATIVE_HOTELS,
  EVENT_CONFIG,
  HotelConfig,
  LANDMARKS,
  LandmarkConfig,
  MAIN_HOTEL,
  SOLO_DESTINATIONS,
  SoloDestinationConfig,
} from '../../config/eventConfig';
import {
  AGENDA_DAYS,
  CONFERENCE_PILLARS,
  CONFERENCE_SPEAKERS,
  PROGRAMS,
  ProgramCategory,
  SpeakerProfile,
  WORKSHOP_PAVILIONS,
  WORKSHOP_SPEAKERS,
  WorkshopPavilionConfig,
} from '../../data/programData';
import {
  RegistrationDraftPayload,
  submitParticipantRegistration,
} from '../../services/registrationService';
import { Language, UI_STRINGS } from '../../i18n/translations';
import { SpeakerArcCarousel, SpeakerArcCarouselLabels } from './SpeakerArcCarousel';
import { useScrollFx } from '../../hooks/useScrollFx';

interface ChapterOverlaysProps {
  lang: Language;
  onNavigateChapter: (chapterId: string) => void;
  onSelectLandmark: (landmark: LandmarkConfig) => void;
  onSelectPavilion: (pavilion: WorkshopPavilionConfig) => void;
  onSelectSpeaker: (speaker: SpeakerProfile) => void;
  onSelectHotel: (hotel: HotelConfig) => void;
  onSelectDestination: (destination: SoloDestinationConfig) => void;
  activeDayId: string;
  onSelectDay: (dayId: string) => void;
  isInspecting3D: boolean;
}

export const ChapterOverlays: React.FC<ChapterOverlaysProps> = ({
  lang,
  onNavigateChapter,
  onSelectLandmark,
  onSelectPavilion,
  onSelectSpeaker,
  onSelectHotel,
  onSelectDestination,
  activeDayId,
  onSelectDay,
  isInspecting3D,
}) => {
  const t = UI_STRINGS[lang];
  const [activeProgramCategory, setActiveProgramCategory] = useState<ProgramCategory | 'All'>(
    'All'
  );
  const [speakerSearch, setSpeakerSearch] = useState('');
  const overlayRootRef = useRef<HTMLDivElement>(null);
  useScrollFx(overlayRootRef);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>('day1-tba-1');
  const [regForm, setRegForm] = useState<RegistrationDraftPayload>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    cityCountry: '',
    participantCategory: EVENT_CONFIG.registration.participantCategories[0],
    workshopTrack: EVENT_CONFIG.registration.workshopTracks[0],
    notes: '',
  });
  const [regNotice, setRegNotice] = useState<string | null>(null);

  const soloIntroLandmarks = LANDMARKS.filter((l) => l.chapterId === 'about');
  const activeDay = AGENDA_DAYS.find((d) => d.id === activeDayId) || AGENDA_DAYS[0];

  const normalizedSearch = speakerSearch.trim().toLowerCase();
  const matchesSpeakerSearch = (sp: SpeakerProfile) =>
    !normalizedSearch ||
    [sp.positionTitle, sp.slotLabel, sp.fullName, sp.presentationTitle, sp.institution].some((v) =>
      v.toLowerCase().includes(normalizedSearch)
    );
  const filteredWorkshopSpeakers = useMemo(
    () => WORKSHOP_SPEAKERS.filter(matchesSpeakerSearch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedSearch]
  );
  const filteredSeminarSpeakers = useMemo(
    () => CONFERENCE_SPEAKERS.filter(matchesSpeakerSearch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [normalizedSearch]
  );
  const speakerCarouselLabels: SpeakerArcCarouselLabels = {
    people: t.spPeople,
    of: t.spOf,
    dragHint: t.spDragHint,
    pause: t.spAutoPause,
    resume: t.spAutoPlay,
    prev: t.spPrev,
    next: t.spNext,
    viewProfile: t.spViewProfile,
    empty: t.spEmpty,
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submitParticipantRegistration(regForm);
    setRegNotice(res.message);
  };

  return (
    <div
      ref={overlayRootRef}
      className={`relative z-10 pointer-events-none transition-opacity duration-300 ${
        isInspecting3D ? 'opacity-10 [&_*]:pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ===================================================================== */}
      {/* SCENE 01 — OPENING: WELCOME TO SOLO & TWO WELCOME MESSAGES */}
      {/* ===================================================================== */}
      <section
        id="home"
        data-chapter-index="1"
        className="relative flex min-h-[140vh] flex-col justify-center px-3 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-6xl space-y-8 sm:space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-kawung-gold/70 bg-keraton/85 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-light-gold backdrop-blur-md sm:px-4 sm:text-xs">
              {t.heroTag}
            </span>
            <button
              type="button"
              onClick={() => onNavigateChapter('conference')}
              className="inline-flex items-center gap-1.5 rounded-full border border-kawung-gold/60 bg-keraton/85 px-3 py-1.5 font-sans text-[11px] font-semibold text-ivory transition hover:border-light-gold hover:bg-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold sm:px-4 sm:text-xs"
            >
              <SkipForward className="h-3.5 w-3.5 text-kawung-gold" />
              {t.skipIntro}
            </button>
          </div>

          {/* Design Master 4-Degree Diagonal Ivory Cream Focal Banner */}
          <div className="iomu-diagonal-band mx-auto max-w-4xl rounded-3xl bg-ivory/95 px-4 py-6 text-keraton shadow-keraton backdrop-blur-md sm:px-10 sm:py-10">
            <div className="iomu-diagonal-band-inner space-y-5 text-center">
              <div className="flex flex-col items-center">
                <span className="font-script text-3xl text-dark-gold sm:text-4xl">
                  {t.welcomeScript}
                </span>
                <img
                  src={EVENT_CONFIG.assets.logoLightBg}
                  alt="IOMU 2027 — The 19th Indonesian Occupational Medicine Updates"
                  className="my-3 w-72 sm:w-96 md:w-[440px] max-w-full object-contain"
                />
              </div>

              {/* Official Draft Event Theme (Displayed Cleanly Outside Box) */}
              <p className="mx-auto max-w-3xl font-display text-sm font-bold italic leading-relaxed text-emerald sm:text-base md:text-lg">
                &ldquo;{EVENT_CONFIG.theme}&rdquo;
              </p>

              {/* Combined Event Details without Ellipse Box, centered */}
              <div className="mx-auto max-w-2xl space-y-1.5 py-1 text-center">
                <p className="font-display text-sm font-extrabold tracking-wide text-keraton sm:text-base">
                  Surakarta, Indonesia &middot; {t.datesLabel}
                </p>
                <p className="text-xs font-semibold tracking-wide text-emerald sm:text-sm">
                  {t.venueBadge}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigateChapter('about')}
                  className="inline-flex items-center gap-2 rounded-full bg-keraton px-7 py-3 font-display text-xs font-bold tracking-wider text-ivory shadow-md transition hover:bg-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton sm:text-sm"
                >
                  {t.exploreCta}
                  <ArrowDown className="h-4 w-4 text-kawung-gold" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateChapter('conference')}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-kawung-gold bg-white px-6 py-3 font-display text-xs font-bold tracking-wider text-keraton transition hover:bg-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton sm:text-sm"
                >
                  {t.infoCta}
                </button>
              </div>
            </div>
          </div>

          {/* TWO OFFICIAL WELCOME MESSAGES */}
          <div className="grid gap-6 lg:grid-cols-2">
            {EVENT_CONFIG.welcomeMessages.map((msg) => (
              <article
                key={msg.id}
                className="rounded-3xl border-2 border-kawung-gold/75 bg-keraton/92 p-6 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent sm:p-7"
              >
                <div className="flex items-start gap-4 border-b border-kawung-gold/30 pb-4">
                  <div className="iomu-arch-frame flex h-20 w-16 shrink-0 flex-col items-center justify-center bg-emerald/75 p-2 text-center">
                    <User className="h-6 w-6 text-light-gold" />
                    <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-kawung-gold">
                      TBA
                    </span>
                  </div>
                  <div>
                    <span className="inline-block rounded-full border border-kawung-gold/60 bg-emerald px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-light-gold">
                      Welcome Message
                    </span>
                    <h2 className="mt-1.5 font-display text-base font-extrabold text-ivory sm:text-lg">
                      {msg.role}
                    </h2>
                    <p className="text-xs font-medium text-light-gold">{msg.organization}</p>
                    <p className="mt-0.5 text-[11px] text-ivory/75">{msg.name}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 text-xs leading-relaxed text-ivory/90 sm:text-sm">
                  <p className="font-semibold text-light-gold">{msg.greeting}</p>
                  {msg.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                  <p className="pt-1 font-script text-2xl text-kawung-gold">{msg.closing}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 02 — ABOUT & KNOW MORE ABOUT OUR GRAND EVENT */}
      {/* ===================================================================== */}
      <section
        id="about"
        data-chapter-index="2"
        className="flex min-h-[125vh] items-center px-4 py-24 sm:px-8"
      >
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-12">
          <div className="pointer-events-auto rounded-3xl border border-kawung-gold/60 bg-keraton/90 p-6 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent lg:col-span-5 sm:p-8">
            <span className="font-script text-3xl text-light-gold">Heritage City</span>
            <p className="mt-1 font-display text-xs font-bold uppercase tracking-[0.18em] text-kawung-gold">
              02 / 09 · Welcome to Surakarta — The Heritage City
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ivory sm:text-3xl">
              Journey Through Solo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ivory/90">
              As the ceremonial Gunungan parts, travel along a stylized miniature corridor inspired
              by Surakarta (Solo) — a Javanese royal city renowned for living batik heritage,
              timeless pendopo architecture, and warm scholarly hospitality.
            </p>

            <div className="mt-5 space-y-2">
              <p className="font-display text-[11px] font-bold uppercase tracking-wider text-kawung-gold">
                Interactive Solo Landmarks (Stylized 3D Interpretations)
              </p>
              <div className="flex flex-wrap gap-2">
                {soloIntroLandmarks.map((landmark) => (
                  <button
                    key={landmark.id}
                    type="button"
                    onClick={() => onSelectLandmark(landmark)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-kawung-gold/60 bg-emerald/70 px-3.5 py-1.5 text-xs font-semibold text-ivory transition hover:border-ivory hover:bg-kawung-gold hover:text-keraton focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold"
                  >
                    <MapPin className="h-3.5 w-3.5 text-light-gold" />
                    {landmark.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KNOW MORE ABOUT OUR GRAND EVENT */}
          <div className="pointer-events-auto rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md lg:col-span-7 sm:p-8">
            <span className="font-script text-3xl text-dark-gold">Grand Event</span>
            <h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-keraton sm:text-2xl">
              KNOW MORE ABOUT OUR GRAND EVENT
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {EVENT_CONFIG.grandEventSections.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-kawung-gold/55 bg-white/90 p-5 shadow-sm"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-dark-gold">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-1 font-display text-base font-extrabold text-keraton">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-emerald">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 03 — DISCOVER IOMU 2027 */}
      {/* ===================================================================== */}
      <section
        id="conference"
        data-chapter-index="3"
        className="flex min-h-[120vh] items-center px-4 py-24 sm:px-8"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-6xl rounded-3xl border-2 border-kawung-gold/70 bg-keraton/92 p-6 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-7">
              <span className="font-script text-3xl text-light-gold">The Conference</span>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-kawung-gold">
                03 / 09 · Discover IOMU 2027
              </p>
              <h2 className="font-display text-2xl font-extrabold text-ivory sm:text-4xl">
                Connecting Global Evidence with Local Impact
              </h2>
              <p className="text-sm leading-relaxed text-ivory/90">
                IOMU 2027 convenes occupational medicine physicians, researchers, and workplace
                health practitioners in Surakarta to strengthen scientific exchange, clinical
                standards, and professional collaboration across industries.
              </p>

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {CONFERENCE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="rounded-2xl border border-kawung-gold/40 bg-emerald/55 p-4 backdrop-blur-sm iomu-kawung-accent"
                  >
                    <span className="inline-block rounded-full bg-keraton/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-light-gold">
                      {pillar.badge}
                    </span>
                    <h3 className="mt-1.5 font-display text-sm font-bold text-ivory">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ivory/85">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="overflow-hidden rounded-3xl border-2 border-kawung-gold bg-keraton shadow-gold">
                <div className="relative">
                  <img
                    src={EVENT_CONFIG.assets.delegates2026OverlayPhoto}
                    alt="Occupational medicine delegates gathered in batik and kebaya attire"
                    className="h-72 w-full object-cover sm:h-80"
                  />
                  <div className="iomu-photo-overlay absolute inset-0 flex flex-col justify-end p-5">
                    <span className="inline-block w-fit rounded-full border border-kawung-gold bg-keraton/85 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-light-gold">
                      Community in Heritage Attire
                    </span>
                    <p className="mt-2 font-display text-base font-bold text-ivory">
                      {EVENT_CONFIG.fullName}
                    </p>
                    <p className="mt-1 text-xs text-ivory/90">
                      Venue & accreditation details remain To Be Announced until official release.
                    </p>
                  </div>
                </div>
                <figcaption className="bg-ivory px-4 py-2.5 text-[11px] font-medium text-keraton">
                  Official IOMU Community Documentation · May 7–9, 2027 · {EVENT_CONFIG.cityShort}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 04 — SCIENTIFIC CONFERENCE & WORKSHOPS (HOME GLASS THEME)       */}
      {/* ===================================================================== */}
      <section
        id="workshops"
        data-chapter-index="4"
        className="flex min-h-[120vh] items-center px-4 py-24 sm:px-8"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-6xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-kawung-gold/45 pb-6 md:flex-row md:items-end">
            <div>
              <span className="font-script text-3xl text-dark-gold">{t.wsScript}</span>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">
                {t.wsTag}
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-keraton sm:text-3xl">
                {t.wsHeading}
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-emerald sm:text-sm">
                {t.wsDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  'All',
                  'Scientific Conference',
                  'Workshops',
                  'Scientific Presentations',
                  'Professional Networking',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveProgramCategory(cat)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeProgramCategory === cat
                      ? 'border-keraton bg-keraton text-ivory shadow-sm'
                      : 'border-kawung-gold/60 bg-white/80 text-keraton hover:bg-kawung-gold/15'
                  }`}
                >
                  {cat === 'All' ? t.allFilter : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WORKSHOP_PAVILIONS.map((pavilion) => (
              <button
                key={pavilion.id}
                type="button"
                onClick={() => onSelectPavilion(pavilion)}
                className="group rounded-2xl border border-kawung-gold/60 bg-white/80 p-4 text-left text-keraton shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-kawung-gold hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-dark-gold">
                  {t.wsPavilionHint}
                </span>
                <h3 className="mt-1 font-display text-sm font-extrabold text-keraton group-hover:text-emerald">
                  {pavilion.shortTitle}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-emerald">{pavilion.summary}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PROGRAMS.filter(
              (p) => activeProgramCategory === 'All' || p.category === activeProgramCategory
            ).map((prog) => (
              <article
                key={prog.id}
                className="rounded-2xl border border-kawung-gold/60 bg-white/80 p-5 text-keraton shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-dark-gold">
                    {prog.category}
                  </span>
                  <span className="rounded-full border border-dark-gold/40 bg-ivory px-2.5 py-0.5 text-[10px] font-bold text-dark-gold">
                    {t.statusPrefix}: {prog.status}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-base font-bold text-keraton">
                  {prog.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-emerald">{prog.description}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-kawung-gold/35 pt-3 text-[11px] text-emerald">
                  <div>
                    <dt className="font-bold text-keraton">{t.dateLabel}</dt>
                    <dd>{prog.date}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-keraton">{t.timeLabel}</dt>
                    <dd>{prog.time}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-keraton">{t.speakerLabel}</dt>
                    <dd>{prog.speaker}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-keraton">{t.roomLabel}</dt>
                    <dd>
                      {prog.room} · {prog.registrationAvailability}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 05 — SPEAKERS & EXPERTS (full-bleed curved carousels, no panel box) */}
      {/* ===================================================================== */}
      <section id="speakers" data-chapter-index="5" className="flex min-h-[140vh] items-center py-24">
        <div className="iomu-sp pointer-events-auto w-full">
          <div className="iomu-sp-head">
            <span className="iomu-sp-pill">{t.spTag}</span>
            <span className="iomu-sp-script">{t.spScript}</span>
            <h2 className="iomu-sp-title">{t.spHeading}</h2>
            <p className="iomu-sp-desc">
              {t.spDescPrefix} <strong>15 {t.spWsTitle}</strong> {lang === 'id' ? 'dan' : 'and'}{' '}
              <strong>42 {t.spSemTitle}</strong>. {t.spArcHint}
            </p>
            <div className="iomu-sp-search">
              <label htmlFor="iomu-speaker-search" className="sr-only">
                {t.spSearchLabel}
              </label>
              <Search />
              <input
                id="iomu-speaker-search"
                type="search"
                autoComplete="off"
                value={speakerSearch}
                onChange={(e) => setSpeakerSearch(e.target.value)}
                placeholder={t.spSearchPlaceholder}
              />
            </div>
          </div>

          <SpeakerArcCarousel
            variant="ws"
            speakers={filteredWorkshopSpeakers}
            total={WORKSHOP_SPEAKERS.length}
            eyebrow={t.spWsEyebrow}
            title={t.spWsTitle}
            searchTerm={speakerSearch}
            suspended={isInspecting3D}
            labels={speakerCarouselLabels}
            onSelectSpeaker={onSelectSpeaker}
          />

          <SpeakerArcCarousel
            variant="sem"
            speakers={filteredSeminarSpeakers}
            total={CONFERENCE_SPEAKERS.length}
            eyebrow={t.spSemEyebrow}
            title={t.spSemTitle}
            searchTerm={speakerSearch}
            suspended={isInspecting3D}
            labels={speakerCarouselLabels}
            onSelectSpeaker={onSelectSpeaker}
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 06 — CONFERENCE AGENDA */}
      {/* ===================================================================== */}
      <section
        id="program"
        data-chapter-index="6"
        className="flex min-h-[115vh] items-center px-4 py-24 sm:px-8"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-5xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
          <div className="text-center">
            <span className="font-script text-3xl text-dark-gold">Three-Day Journey</span>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">
              06 / 09 · Golden Event Timeline
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-keraton sm:text-3xl">
              Conference Agenda
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs text-emerald sm:text-sm">
              Navigate across the three official conference days in Surakarta. Detailed session
              schedules are marked &ldquo;Program to Be Announced&rdquo; until confirmed.
            </p>
          </div>

          <div role="tablist" aria-label="Conference Days" className="mt-6 grid gap-3 sm:grid-cols-3">
            {AGENDA_DAYS.map((day) => {
              const isSelected = day.id === activeDay.id;
              return (
                <button
                  key={day.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => onSelectDay(day.id)}
                  className={`rounded-2xl border-2 p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton ${
                    isSelected
                      ? 'border-keraton bg-keraton text-ivory shadow-md'
                      : 'border-kawung-gold/60 bg-white/85 text-keraton hover:border-keraton'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-display text-xs font-extrabold uppercase tracking-wider ${
                        isSelected ? 'text-kawung-gold' : 'text-dark-gold'
                      }`}
                    >
                      {day.label}
                    </span>
                    <Calendar
                      className={`h-4 w-4 ${isSelected ? 'text-light-gold' : 'text-emerald'}`}
                    />
                  </div>
                  <p className="mt-1 font-display text-sm font-bold">{day.fullDate}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-kawung-gold/50 bg-white/90 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-extrabold text-keraton">
                  {activeDay.milestoneHeadline}
                </h3>
                <span className="rounded-full border border-dark-gold/40 bg-ivory px-3 py-0.5 text-[11px] font-bold text-dark-gold">
                  {activeDay.status}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-emerald">{activeDay.summary}</p>
            </div>

            {activeDay.sessions.map((session) => {
              const isExpanded = expandedSessionId === session.id;
              return (
                <div
                  key={session.id}
                  className="overflow-hidden rounded-2xl border border-kawung-gold/50 bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ivory/50"
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-dark-gold">
                        {session.timeRange} · {session.category}
                      </span>
                      <h4 className="mt-0.5 font-display text-base font-bold text-keraton">
                        {session.title}
                      </h4>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-dark-gold" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-dark-gold" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="border-t border-kawung-gold/30 bg-ivory/40 px-5 py-4 text-xs text-emerald space-y-1.5">
                      <p>{session.description}</p>
                      <p className="font-semibold text-keraton">
                        Speaker: {session.speaker} · Location: {session.room}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 07 — EXPERIENCE SURAKARTA (8 DESTINATIONS WITH PHOTOS & STORIES) */}
      {/* ===================================================================== */}
      <section
        id="explore-solo"
        data-chapter-index="7"
        className="flex min-h-[135vh] items-center px-3 py-16 sm:px-8 sm:py-24"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-7xl rounded-3xl border border-kawung-gold/70 bg-keraton/94 p-5 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-kawung-gold/30 pb-6 md:flex-row md:items-end">
            <div>
              <span className="font-script text-3xl text-light-gold">Explore Solo</span>
              <p className="mt-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-kawung-gold">
                07 / 09 · Experience Surakarta — Heritage & Stories
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-ivory sm:text-3xl">
                Destinasi Ikonik & Narasi Budaya Surakarta
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ivory/85 sm:text-sm">
                Jelajahi kekayaan sejarah, arsitektur, batik, kuliner, dan ruang kreatif di kota
                Solo. Klik kartu destinasi untuk membaca narasi lengkap atau membuka peta lokasi.
              </p>
            </div>
            <span className="w-fit rounded-full border border-kawung-gold bg-emerald px-4 py-1.5 text-xs font-bold text-light-gold">
              {t.exVenueBadge}
            </span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SOLO_DESTINATIONS.map((dest) => (
              <article
                key={dest.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-kawung-gold/55 bg-emerald/45 text-ivory backdrop-blur-sm iomu-kawung-accent transition hover:-translate-y-1 hover:border-kawung-gold"
              >
                <div className="p-4 pb-0">
                  <div className="iomu-arch-frame overflow-hidden bg-keraton">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      onError={(e) => {
                        if (dest.fallbackImage && e.currentTarget.src !== dest.fallbackImage) {
                          e.currentTarget.src = dest.fallbackImage;
                        }
                      }}
                      className="h-44 w-full object-cover sm:h-48"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-kawung-gold">
                    {dest.category}
                  </span>
                  <h3 className="mt-1 font-display text-sm font-extrabold text-ivory">
                    {dest.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold text-light-gold">
                    {dest.narrativeTitle}
                  </p>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-ivory/85">
                    {dest.narrativeStory}
                  </p>
                  <p className="mt-2 text-[10px] text-ivory/70">{dest.imageCaption}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-kawung-gold/25 pt-2.5">
                    <button
                      type="button"
                      onClick={() => onSelectDestination(dest)}
                      className="rounded-full bg-kawung-gold px-3 py-1 text-[11px] font-bold text-keraton transition hover:bg-light-gold"
                    >
                      {t.readStory || 'Baca Cerita'}
                    </button>
                    <a
                      href={dest.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-kawung-gold/60 px-2.5 py-1 text-[11px] font-semibold text-ivory hover:bg-keraton"
                    >
                      {t.openMap || 'Peta'} <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href={
                        dest.googlePhotosUrl ||
                        `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(dest.name)}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-kawung-gold/60 px-2.5 py-1 text-[11px] font-semibold text-light-gold hover:bg-keraton"
                    >
                      📷 {t.googlePhotos || 'Foto Google'} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 08 — ACCOMMODATION (HOTEL ALILA SOLO & NEARBY ALTERNATIVES) */}
      {/* ===================================================================== */}
      <section
        id="accommodation"
        data-chapter-index="8"
        className="flex min-h-[125vh] items-center px-4 py-24 sm:px-8"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-7xl space-y-6 rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-kawung-gold/40 pb-6 md:flex-row md:items-end">
            <div>
              <span className="font-script text-3xl text-dark-gold">{t.accScript}</span>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">
                {t.accTag}
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-keraton sm:text-3xl">
                {t.accHeading}
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-emerald sm:text-sm">
                {t.accDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectHotel(MAIN_HOTEL)}
              className="inline-flex items-center gap-2 rounded-full bg-keraton px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory transition hover:bg-emerald"
            >
              <Building2 className="h-4 w-4 text-kawung-gold" />
              {t.focusAlilaBtn}
            </button>
          </div>

          {/* Primary Featured Hotel: Alila Solo */}
          <article className="rounded-3xl border-2 border-kawung-gold bg-keraton/95 p-6 text-ivory shadow-gold backdrop-blur-md iomu-kawung-accent sm:p-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="space-y-3 lg:col-span-7">
                <span className="inline-block rounded-full border border-kawung-gold bg-emerald px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-light-gold">
                  {MAIN_HOTEL.tier}
                </span>
                <h3 className="font-display text-2xl font-extrabold text-ivory sm:text-3xl">
                  {MAIN_HOTEL.name}
                </h3>
                <p className="text-xs font-semibold text-kawung-gold">{MAIN_HOTEL.address}</p>
                <p className="text-sm leading-relaxed text-ivory/90">{MAIN_HOTEL.summary}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectHotel(MAIN_HOTEL)}
                    className="rounded-full bg-kawung-gold px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-keraton hover:bg-light-gold"
                  >
                    Inspect Details
                  </button>
                  <a
                    href={MAIN_HOTEL.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-kawung-gold/70 px-5 py-2 text-xs font-semibold text-ivory hover:bg-emerald"
                  >
                    View on Google Maps <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-kawung-gold/45 bg-emerald/60 p-5 backdrop-blur-sm iomu-kawung-accent lg:col-span-5">
                <p className="font-display text-xs font-bold uppercase tracking-wider text-light-gold">
                  Property Highlights
                </p>
                <ul className="mt-3 space-y-2 text-xs text-ivory/90 list-disc list-inside">
                  {MAIN_HOTEL.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-kawung-gold/30 pt-3 text-[11px] font-semibold text-kawung-gold">
                  {MAIN_HOTEL.bookingStatus}
                </p>
              </div>
            </div>
          </article>

          {/* Alternative Nearby Hotels */}
          <div>
            <h3 className="font-display text-base font-extrabold text-keraton sm:text-lg">
              Nearby Alternative Hotels Around Surakarta
            </h3>
            <p className="mt-0.5 text-xs text-emerald">
              Curated hotels along Slamet Riyadi, Laweyan, Purwosari, and Banjarsari for easy
              commuting.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ALTERNATIVE_HOTELS.map((hotel) => (
                <article
                  key={hotel.id}
                  className="flex flex-col justify-between rounded-2xl border border-kawung-gold/55 bg-white/90 p-5 shadow-sm"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark-gold">
                      {hotel.tier}
                    </span>
                    <h4 className="mt-1 font-display text-sm font-extrabold text-keraton">
                      {hotel.name}
                    </h4>
                    <p className="mt-1 text-[11px] font-semibold text-emerald">
                      {hotel.distanceFromAlila}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-keraton/85">{hotel.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-kawung-gold/25 pt-3">
                    <button
                      type="button"
                      onClick={() => onSelectHotel(hotel)}
                      className="text-xs font-bold text-dark-gold hover:underline"
                    >
                      Details →
                    </button>
                    <a
                      href={hotel.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-keraton/25 px-3 py-1 text-[11px] font-semibold text-keraton hover:bg-ivory"
                    >
                      Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SCENE 09 — REGISTRATION PORTAL */}
      {/* ===================================================================== */}
      <section
        id="registration"
        data-chapter-index="9"
        className="flex min-h-[115vh] items-center px-4 pb-32 pt-24 sm:px-8"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-5xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
          <div className="text-center">
            <span className="font-script text-3xl text-dark-gold">{t.regScript}</span>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">
              {t.regTag}
            </p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-keraton sm:text-4xl">
              {t.regHeading}
            </h2>
            <p className="mt-1 font-display text-sm font-bold tracking-[0.16em] text-emerald">
              {t.regSub}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border-2 border-kawung-gold bg-keraton/95 px-5 py-4 text-ivory backdrop-blur-sm iomu-kawung-accent sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-kawung-gold" />
              <div>
                <p className="font-display text-sm font-bold text-light-gold">
                  {EVENT_CONFIG.registration.statusLabel}
                </p>
                <p className="mt-0.5 text-xs text-ivory/85">
                  Online participant registration and payment are intentionally inactive until the
                  official IOMU 2027 registration backend is configured.
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-kawung-gold bg-emerald px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-light-gold">
              Preview Architecture Ready
            </span>
          </div>

          <form onSubmit={handleRegistrationSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="reg-name"
                className="block font-sans text-xs font-bold uppercase tracking-wider text-dark-gold"
              >
                Full Name & Academic Titles
              </label>
              <input
                id="reg-name"
                type="text"
                value={regForm.fullName}
                onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                placeholder="e.g., dr. Nama Lengkap, Sp.Ok"
                className="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton focus:border-keraton focus:outline-none focus:ring-2 focus:ring-kawung-gold/40"
              />
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block font-sans text-xs font-bold uppercase tracking-wider text-dark-gold"
              >
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                value={regForm.email}
                onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                placeholder="delegate@institution.org"
                className="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton focus:border-keraton focus:outline-none focus:ring-2 focus:ring-kawung-gold/40"
              />
            </div>

            <div>
              <label
                htmlFor="reg-institution"
                className="block font-sans text-xs font-bold uppercase tracking-wider text-dark-gold"
              >
                Institution / Organization
              </label>
              <input
                id="reg-institution"
                type="text"
                value={regForm.institution}
                onChange={(e) => setRegForm({ ...regForm, institution: e.target.value })}
                placeholder="Hospital, University, or Company"
                className="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton focus:border-keraton focus:outline-none focus:ring-2 focus:ring-kawung-gold/40"
              />
            </div>

            <div>
              <label
                htmlFor="reg-city"
                className="block font-sans text-xs font-bold uppercase tracking-wider text-dark-gold"
              >
                City & Country
              </label>
              <input
                id="reg-city"
                type="text"
                value={regForm.cityCountry}
                onChange={(e) => setRegForm({ ...regForm, cityCountry: e.target.value })}
                placeholder="Jakarta, Indonesia"
                className="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton focus:border-keraton focus:outline-none focus:ring-2 focus:ring-kawung-gold/40"
              />
            </div>

            <div>
              <label
                htmlFor="reg-category"
                className="block font-sans text-xs font-bold uppercase tracking-wider text-dark-gold"
              >
                Participant Category
              </label>
              <select
                id="reg-category"
                value={regForm.participantCategory}
                onChange={(e) =>
                  setRegForm({ ...regForm, participantCategory: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton focus:border-keraton focus:outline-none focus:ring-2 focus:ring-kawung-gold/40"
              >
                {EVENT_CONFIG.registration.participantCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="reg-workshop"
                className="block font-sans text-xs font-bold uppercase tracking-wider text-dark-gold"
              >
                Workshop Track Selection
              </label>
              <select
                id="reg-workshop"
                value={regForm.workshopTrack}
                onChange={(e) => setRegForm({ ...regForm, workshopTrack: e.target.value })}
                className="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton focus:border-keraton focus:outline-none focus:ring-2 focus:ring-kawung-gold/40"
              >
                {EVENT_CONFIG.registration.workshopTracks.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
              <div className="flex items-center gap-2 text-xs text-emerald">
                <ShieldCheck className="h-4 w-4 shrink-0 text-dark-gold" />
                <span>
                  Backend Status:{' '}
                  {EVENT_CONFIG.registration.isBackendConfigured
                    ? 'Connected'
                    : 'Disabled (Coming Soon)'}
                </span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-keraton px-8 py-3 font-display text-xs font-bold uppercase tracking-wider text-ivory shadow-md transition hover:bg-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton sm:text-sm"
              >
                REGISTER NOW
                <ArrowRight className="h-4 w-4 text-kawung-gold" />
              </button>
            </div>

            {regNotice && (
              <div
                role="status"
                className="sm:col-span-2 rounded-2xl border border-kawung-gold bg-white px-4 py-3 text-xs font-medium text-keraton"
              >
                {regNotice}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

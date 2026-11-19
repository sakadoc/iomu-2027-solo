import React, { useEffect, useRef, useState } from 'react';
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
  Sparkles,
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

function shuffleFxBarDelays(shroud: HTMLElement) {
  const bars = shroud.querySelectorAll<HTMLElement>('.iomu-fx-bar');
  const indices = Array.from({ length: bars.length }, (_, idx) => idx);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = indices[i];
    indices[i] = indices[j];
    indices[j] = tmp;
  }
  bars.forEach((bar, i) => {
    bar.style.setProperty('--fx-delay', `${20 + indices[i] * 34}ms`);
  });
}

function buildFxShroud(box: HTMLElement) {
  if (box.querySelector(':scope > .iomu-fx-shroud')) return;
  const fxType = box.getAttribute('data-fx') || 'wipe-left';
  const shroud = document.createElement('div');
  shroud.className = 'iomu-fx-shroud';
  shroud.setAttribute('aria-hidden', 'true');

  if (fxType === 'wipe-left') {
    const panel = document.createElement('div');
    panel.className = 'iomu-fx-curtain-left';
    shroud.appendChild(panel);
  } else if (fxType === 'wipe-right') {
    const panel = document.createElement('div');
    panel.className = 'iomu-fx-curtain-right';
    shroud.appendChild(panel);
  } else if (fxType === 'split-curtain') {
    const leftDoor = document.createElement('div');
    leftDoor.className = 'iomu-fx-door-left';
    const rightDoor = document.createElement('div');
    rightDoor.className = 'iomu-fx-door-right';
    shroud.appendChild(leftDoor);
    shroud.appendChild(rightDoor);
  } else if (fxType === 'random-bars') {
    const grid = document.createElement('div');
    grid.className = 'iomu-fx-bars-grid';
    for (let i = 0; i < 16; i += 1) {
      const bar = document.createElement('span');
      bar.className = 'iomu-fx-bar';
      grid.appendChild(bar);
    }
    shroud.appendChild(grid);
    shuffleFxBarDelays(shroud);
  } else if (fxType === 'checkerboard') {
    const grid = document.createElement('div');
    grid.className = 'iomu-fx-checker-grid';
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const tile = document.createElement('span');
        const isOdd = (r + c) % 2 === 1;
        tile.className = `iomu-fx-tile ${isOdd ? 'is-odd' : 'is-even'}`;
        const colJitter = (c * 5 + r * 3) % 7;
        const delayMs = (isOdd ? 210 : 0) + colJitter * 36 + r * 20;
        tile.style.setProperty('--fx-delay', `${delayMs}ms`);
        grid.appendChild(tile);
      }
    }
    shroud.appendChild(grid);
  } else if (fxType === 'venetian-blinds') {
    const grid = document.createElement('div');
    grid.className = 'iomu-fx-blinds-grid';
    for (let r = 0; r < 10; r += 1) {
      const slat = document.createElement('span');
      slat.className = 'iomu-fx-blind';
      slat.style.setProperty('--fx-delay', `${r * 45}ms`);
      grid.appendChild(slat);
    }
    shroud.appendChild(grid);
  }

  box.appendChild(shroud);
}

function resetFxBox(box: HTMLElement) {
  box.classList.add('iomu-fx-resetting');
  box.classList.remove('is-fx-revealed');
  const shroud = box.querySelector<HTMLElement>(':scope > .iomu-fx-shroud');
  if (shroud && box.getAttribute('data-fx') === 'random-bars') {
    shuffleFxBarDelays(shroud);
  }
  void box.offsetWidth;
  box.classList.remove('iomu-fx-resetting');
}

function replayFxBox(box: HTMLElement) {
  resetFxBox(box);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.classList.add('is-fx-revealed');
    });
  });
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
  const [showAllConferenceSpeakers, setShowAllConferenceSpeakers] = useState(false);
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
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const boxes = Array.from(root.querySelectorAll<HTMLElement>('.iomu-fx-box'));
    if (boxes.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof window.IntersectionObserver !== 'function') {
      boxes.forEach((box) => box.classList.add('iomu-fx-ready', 'is-fx-revealed'));
      return;
    }

    boxes.forEach((box) => {
      buildFxShroud(box);
      box.classList.add('iomu-fx-ready');
      box.classList.remove('is-fx-revealed');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const box = entry.target as HTMLElement;
          const rect = entry.boundingClientRect;
          const inViewBand =
            rect.top < window.innerHeight * 0.94 && rect.bottom > window.innerHeight * 0.04;
          if (entry.isIntersecting && (entry.intersectionRatio >= 0.04 || inViewBand)) {
            if (!box.classList.contains('is-fx-revealed')) {
              requestAnimationFrame(() => box.classList.add('is-fx-revealed'));
            }
          } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
            resetFxBox(box);
          }
        });
      },
      { threshold: [0, 0.04, 0.12] }
    );

    boxes.forEach((box) => {
      observer.observe(box);
      const rect = box.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
        replayFxBox(box);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleChapterNavigate = (chapterId: string) => {
    const targetSection = document.getElementById(chapterId);
    if (targetSection) {
      targetSection.querySelectorAll<HTMLElement>('.iomu-fx-box').forEach((box) => {
        replayFxBox(box);
      });
    }
    onNavigateChapter(chapterId);
  };

  const soloIntroLandmarks = LANDMARKS.filter((l) => l.chapterId === 'about');
  const activeDay = AGENDA_DAYS.find((d) => d.id === activeDayId) || AGENDA_DAYS[0];

  const normalizedSearch = speakerSearch.trim().toLowerCase();
  const filteredWorkshopSpeakers = WORKSHOP_SPEAKERS.filter(
    (s) =>
      !normalizedSearch ||
      s.positionTitle.toLowerCase().includes(normalizedSearch) ||
      s.slotLabel.toLowerCase().includes(normalizedSearch)
  );
  const filteredConferenceSpeakers = CONFERENCE_SPEAKERS.filter(
    (s) =>
      !normalizedSearch ||
      s.positionTitle.toLowerCase().includes(normalizedSearch) ||
      s.slotLabel.toLowerCase().includes(normalizedSearch)
  );
  const visibleConferenceSpeakers =
    showAllConferenceSpeakers || normalizedSearch
      ? filteredConferenceSpeakers
      : filteredConferenceSpeakers.slice(0, 12);

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submitParticipantRegistration(regForm);
    setRegNotice(res.message);
  };

  return (
    <div
      ref={rootRef}
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
              <Sparkles className="h-3.5 w-3.5 text-kawung-gold" />
              01 / 09 · INTERACTIVE 3D JOURNEY
            </span>
            <button
              type="button"
              onClick={() => handleChapterNavigate('conference')}
              className="inline-flex items-center gap-1.5 rounded-full border border-kawung-gold/60 bg-keraton/85 px-3 py-1.5 font-sans text-[11px] font-semibold text-ivory transition hover:border-light-gold hover:bg-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold sm:px-4 sm:text-xs"
            >
              <SkipForward className="h-3.5 w-3.5 text-kawung-gold" />
              Skip Intro
            </button>
          </div>

          {/* Design Master 4-Degree Diagonal Ivory Cream Focal Banner */}
          <div
            data-fx="split-curtain"
            data-fx-dir="left"
            className="iomu-fx-box iomu-diagonal-band mx-auto max-w-4xl rounded-3xl bg-ivory/95 px-4 py-6 text-keraton shadow-keraton backdrop-blur-md sm:px-10 sm:py-10"
          >
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

              {/* Location & Dates Pill */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-kawung-gold bg-white px-5 py-2 shadow-sm">
                  <img
                    src={EVENT_CONFIG.assets.pinGoldIcon}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 object-contain"
                  />
                  <div className="text-left">
                    <p className="font-display text-xs font-extrabold text-keraton sm:text-sm">
                      Surakarta, Indonesia
                    </p>
                    <p className="text-[11px] font-semibold text-dark-gold">
                      {t.datesLabel}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-kawung-gold bg-keraton px-4 py-2 text-xs font-bold text-light-gold">
                  {t.venueBadge}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleChapterNavigate('about')}
                  className="inline-flex items-center gap-2 rounded-full bg-keraton px-7 py-3 font-display text-xs font-bold tracking-wider text-ivory shadow-md transition hover:bg-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton sm:text-sm"
                >
                  {t.exploreCta}
                  <ArrowDown className="h-4 w-4 text-kawung-gold" />
                </button>
                <button
                  type="button"
                  onClick={() => handleChapterNavigate('conference')}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-kawung-gold bg-white px-6 py-3 font-display text-xs font-bold tracking-wider text-keraton transition hover:bg-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-keraton sm:text-sm"
                >
                  {t.infoCta}
                </button>
              </div>
            </div>
          </div>

          {/* TWO OFFICIAL WELCOME MESSAGES */}
          <div className="grid gap-6 lg:grid-cols-2">
            {EVENT_CONFIG.welcomeMessages.map((msg, msgIdx) => (
              <article
                key={msg.id}
                data-fx={msgIdx % 2 === 0 ? 'wipe-left' : 'wipe-right'}
                data-fx-dir={msgIdx % 2 === 0 ? 'left' : 'right'}
                className="iomu-fx-box rounded-3xl border-2 border-kawung-gold/75 bg-keraton/92 p-6 text-ivory shadow-keraton backdrop-blur-md sm:p-7"
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
          <div
            data-fx="wipe-left"
            data-fx-dir="left"
            className="iomu-fx-box pointer-events-auto rounded-3xl border border-kawung-gold/60 bg-keraton/90 p-6 text-ivory shadow-keraton backdrop-blur-md lg:col-span-5 sm:p-8"
          >
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
          <div
            data-fx="checkerboard"
            data-fx-dir="right"
            className="iomu-fx-box pointer-events-auto rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md lg:col-span-7 sm:p-8"
          >
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
        <div
          data-fx="random-bars"
          data-fx-dir="left"
          className="iomu-fx-box pointer-events-auto mx-auto w-full max-w-6xl rounded-3xl border-2 border-kawung-gold/70 bg-keraton/92 p-6 text-ivory shadow-keraton backdrop-blur-md sm:p-10"
        >
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
                    className="rounded-2xl border border-kawung-gold/40 bg-emerald/55 p-4"
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
        <div
          data-fx="checkerboard"
          data-fx-dir="right"
          className="iomu-fx-box pointer-events-auto mx-auto w-full max-w-6xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10"
        >
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
      {/* SCENE 05 — SPEAKERS & EXPERTS (15 WORKSHOP + 42 CONFERENCE SPEAKERS) */}
      {/* ===================================================================== */}
      <section
        id="speakers"
        data-chapter-index="5"
        className="flex min-h-[140vh] items-center px-4 py-24 sm:px-8"
      >
        <div
          data-fx="random-bars"
          data-fx-dir="left"
          className="iomu-fx-box pointer-events-auto mx-auto w-full max-w-7xl space-y-8 rounded-3xl border border-kawung-gold/70 bg-keraton/94 p-6 text-ivory shadow-keraton backdrop-blur-md sm:p-10"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-kawung-gold/30 pb-6 md:flex-row md:items-end">
            <div>
              <span className="font-script text-3xl text-light-gold">Distinguished Faculty</span>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-kawung-gold">
                05 / 09 · Speaker Exhibition Colonnade
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-ivory sm:text-3xl">
                Speakers & Experts
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ivory/85 sm:text-sm">
                Featuring two dedicated speaker lineups: <strong>15 Workshop Faculty</strong> and{' '}
                <strong>42 Conference Speakers</strong>. Confirmed names and portraits will appear
                upon Scientific Committee release.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kawung-gold" />
              <input
                type="search"
                value={speakerSearch}
                onChange={(e) => setSpeakerSearch(e.target.value)}
                placeholder="Filter by role or topic..."
                aria-label="Filter speakers by role or topic"
                className="w-full rounded-full border border-kawung-gold/60 bg-emerald/60 py-2 pl-9 pr-4 text-xs text-ivory placeholder:text-ivory/60 focus:border-light-gold focus:outline-none"
              />
            </div>
          </div>

          {/* ROW 1: WORKSHOP SPEAKERS (15 SLOTS) */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-extrabold text-light-gold">
                  1. Workshop Speakers ({filteredWorkshopSpeakers.length} of 15 Slots)
                </h3>
                <p className="text-xs text-ivory/80">
                  Clinical & practical hands-on workshop instructors (Photo · Name · Position/Role)
                </p>
              </div>
              <span className="rounded-full border border-kawung-gold/60 bg-emerald px-3 py-1 text-[11px] font-bold text-light-gold">
                Workshop Track · To Be Announced
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredWorkshopSpeakers.map((speaker) => (
                <button
                  key={speaker.id}
                  type="button"
                  onClick={() => onSelectSpeaker(speaker)}
                  className="group flex flex-col items-center rounded-2xl border border-kawung-gold/50 bg-emerald/45 p-3.5 text-center transition hover:-translate-y-1 hover:border-kawung-gold hover:bg-emerald/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold"
                >
                  <div className="iomu-arch-frame flex h-28 w-24 flex-col items-center justify-center bg-keraton p-2 shadow-md ring-2 ring-ivory/90">
                    <User className="h-6 w-6 text-light-gold" />
                    <span className="mt-1.5 font-display text-[9px] font-bold uppercase tracking-wider text-kawung-gold">
                      TBA
                    </span>
                  </div>
                  <div className="mt-3 w-full rounded-xl border border-kawung-gold/45 bg-ivory px-2.5 py-2 text-keraton">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-dark-gold">
                      {speaker.slotLabel}
                    </p>
                    <h4 className="mt-0.5 font-display text-xs font-extrabold text-keraton">
                      {speaker.fullName}
                    </h4>
                    <p className="mt-0.5 line-clamp-2 text-[10px] font-medium text-emerald">
                      {speaker.positionTitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ROW 2: CONFERENCE SPEAKERS (42 SLOTS / 40+ ESTIMATION) */}
          <div className="space-y-4 border-t border-kawung-gold/30 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-extrabold text-light-gold">
                  2. Conference Speakers ({filteredConferenceSpeakers.length} of 42 Slots)
                </h3>
                <p className="text-xs text-ivory/80">
                  Keynote, plenary & international symposium faculty (Photo · Name · Position/Role)
                </p>
              </div>
              {!normalizedSearch && (
                <button
                  type="button"
                  onClick={() => setShowAllConferenceSpeakers((prev) => !prev)}
                  className="rounded-full border border-kawung-gold bg-kawung-gold px-4 py-1.5 font-display text-xs font-bold text-keraton transition hover:bg-light-gold"
                >
                  {showAllConferenceSpeakers
                    ? 'Show Compact Grid (12)'
                    : `Show All ${filteredConferenceSpeakers.length} Conference Speakers`}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {visibleConferenceSpeakers.map((speaker) => (
                <button
                  key={speaker.id}
                  type="button"
                  onClick={() => onSelectSpeaker(speaker)}
                  className="group flex flex-col items-center rounded-2xl border border-kawung-gold/45 bg-emerald/40 p-3 text-center transition hover:-translate-y-1 hover:border-kawung-gold hover:bg-emerald/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-kawung-gold"
                >
                  <div className="iomu-arch-frame flex h-24 w-20 flex-col items-center justify-center bg-keraton p-2 shadow-sm ring-2 ring-ivory/85">
                    <User className="h-5 w-5 text-light-gold" />
                    <span className="mt-1 font-display text-[9px] font-bold uppercase tracking-wider text-kawung-gold">
                      TBA
                    </span>
                  </div>
                  <div className="mt-2.5 w-full rounded-xl border border-kawung-gold/40 bg-ivory px-2 py-2 text-keraton">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-dark-gold">
                      {speaker.slotLabel}
                    </p>
                    <h4 className="mt-0.5 font-display text-[11px] font-extrabold text-keraton">
                      {speaker.fullName}
                    </h4>
                    <p className="mt-0.5 line-clamp-2 text-[10px] font-medium text-emerald">
                      {speaker.positionTitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
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
        <div
          data-fx="venetian-blinds"
          data-fx-dir="right"
          className="iomu-fx-box pointer-events-auto mx-auto w-full max-w-5xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10"
        >
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
        <div
          data-fx="checkerboard"
          data-fx-dir="left"
          className="iomu-fx-box pointer-events-auto mx-auto w-full max-w-7xl rounded-3xl border border-kawung-gold/70 bg-keraton/94 p-5 text-ivory shadow-keraton backdrop-blur-md sm:p-10"
        >
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
                className="flex flex-col overflow-hidden rounded-3xl border border-kawung-gold/55 bg-emerald/45 text-ivory transition hover:-translate-y-1 hover:border-kawung-gold"
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
        <div
          data-fx="random-bars"
          data-fx-dir="right"
          className="iomu-fx-box pointer-events-auto mx-auto w-full max-w-7xl space-y-6 rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10"
        >
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
          <article
            data-fx="wipe-left"
            data-fx-dir="left"
            className="iomu-fx-box rounded-3xl border-2 border-kawung-gold bg-keraton p-6 text-ivory shadow-gold sm:p-8"
          >
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

              <div className="rounded-2xl border border-kawung-gold/45 bg-emerald/60 p-5 lg:col-span-5">
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
        <div
          data-fx="split-curtain"
          data-fx-dir="right"
          className="iomu-fx-box pointer-events-auto mx-auto w-full max-w-5xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10"
        >
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

          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border-2 border-kawung-gold bg-keraton px-5 py-4 text-ivory sm:flex-row sm:items-center">
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

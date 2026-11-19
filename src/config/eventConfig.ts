export type ConfirmationStatus = 'Draft' | 'Confirmed' | 'Coming Soon';

export interface WelcomeMessageConfig {
  id: string;
  role: string;
  organization: string;
  name: string;
  status: ConfirmationStatus;
  greeting: string;
  paragraphs: string[];
  closing: string;
}

export interface GrandEventSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ChapterConfig {
  index: number;
  code: string;
  id: string;
  menuLabel: string;
  title: string;
  subtitle: string;
  scriptAccent: string;
  progressStart: number;
  progressEnd: number;
  cameraStopProgress: number;
  worldZ: number;
}

export interface LandmarkConfig {
  id: string;
  name: string;
  category: string;
  stylizedNote: string;
  description: string;
  culturalHighlight: string;
  position: [number, number, number];
  cameraFocusPos: [number, number, number];
  cameraLookAt: [number, number, number];
  mapUrl: string;
  photo?: string;
  fallbackPhoto?: string;
  photoCredit?: string;
  chapterId: string;
}

export interface SoloDestinationConfig {
  id: string;
  name: string;
  category: string;
  locationNote: string;
  image: string;
  fallbackImage?: string;
  secondaryImage?: string;
  imageCaption: string;
  googlePhotosUrl?: string;
  narrativeTitle: string;
  narrativeStory: string;
  culturalTip: string;
  mapUrl: string;
  linkedLandmarkId?: string;
}

export interface HotelConfig {
  id: string;
  name: string;
  tier: string;
  isMainVenueHotel?: boolean;
  distanceFromAlila: string;
  address: string;
  summary: string;
  highlights: string[];
  bookingStatus: string;
  mapUrl: string;
  position?: [number, number, number];
  cameraFocusPos?: [number, number, number];
  cameraLookAt?: [number, number, number];
}

export interface PhotoCredit {
  id: string;
  title: string;
  author: string;
  license: string;
  licenseUrl?: string;
  usage: string;
}

function createHeritageIllustrationDataUri(
  title: string,
  motif: 'pendopo' | 'batik' | 'mosque' | 'pasargede' | 'triwindu' | 'museum' | 'tjolomadoe'
): string {
  const motifs: Record<string, string> = {
    pendopo: `
      <rect x="60" y="210" width="240" height="20" fill="#C69C54"/>
      <polygon points="45,165 180,95 315,165" fill="#1F4A42" stroke="#C69C54" stroke-width="3"/>
      <polygon points="120,125 180,55 240,125" fill="#14302B" stroke="#DDBE82" stroke-width="3"/>
      <rect x="85" y="165" width="10" height="45" fill="#DDBE82"/>
      <rect x="135" y="165" width="10" height="45" fill="#DDBE82"/>
      <rect x="215" y="165" width="10" height="45" fill="#DDBE82"/>
      <rect x="265" y="165" width="10" height="45" fill="#DDBE82"/>
    `,
    batik: `
      <circle cx="180" cy="145" r="78" fill="#1F4A42" stroke="#C69C54" stroke-width="3"/>
      <path d="M180,75 Q220,115 180,145 Q140,115 180,75 Z" fill="#DDBE82" opacity="0.88"/>
      <path d="M180,215 Q220,175 180,145 Q140,175 180,215 Z" fill="#DDBE82" opacity="0.88"/>
      <path d="M110,145 Q150,105 180,145 Q150,185 110,145 Z" fill="#C69C54" opacity="0.9"/>
      <path d="M250,145 Q210,105 180,145 Q210,185 250,145 Z" fill="#C69C54" opacity="0.9"/>
      <circle cx="180" cy="145" r="14" fill="#F4E9D7"/>
    `,
    mosque: `
      <rect x="75" y="165" width="210" height="55" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/>
      <path d="M125,165 C125,95 235,95 235,165 Z" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/>
      <rect x="65" y="85" width="14" height="135" fill="#F4E9D7" stroke="#C69C54" stroke-width="2"/>
      <rect x="281" y="85" width="14" height="135" fill="#F4E9D7" stroke="#C69C54" stroke-width="2"/>
      <polygon points="64,85 72,62 80,85" fill="#C69C54"/>
      <polygon points="280,85 288,62 296,85" fill="#C69C54"/>
      <line x1="180" y1="88" x2="180" y2="112" stroke="#C69C54" stroke-width="3"/>
    `,
    pasargede: `
      <rect x="155" y="75" width="50" height="145" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/>
      <polygon points="145,75 180,45 215,75" fill="#C69C54"/>
      <circle cx="180" cy="108" r="16" fill="#14302B" stroke="#C69C54" stroke-width="3"/>
      <rect x="55" y="155" width="95" height="65" fill="#1F4A42" stroke="#C69C54" stroke-width="2"/>
      <rect x="210" y="155" width="95" height="65" fill="#1F4A42" stroke="#C69C54" stroke-width="2"/>
    `,
    triwindu: `
      <rect x="70" y="120" width="220" height="100" rx="8" fill="#1F4A42" stroke="#C69C54" stroke-width="2.5"/>
      <circle cx="120" cy="168" r="24" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/>
      <circle cx="180" cy="168" r="24" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/>
      <circle cx="240" cy="168" r="24" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/>
      <polygon points="105,120 180,75 255,120" fill="#C69C54"/>
    `,
    museum: `
      <rect x="65" y="140" width="230" height="80" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/>
      <polygon points="45,140 180,78 315,140" fill="#14302B" stroke="#C69C54" stroke-width="3"/>
      <path d="M148,220 L148,172 A32,32 0 0,1 212,172 L212,220 Z" fill="#1F4A42" stroke="#C69C54" stroke-width="2.5"/>
    `,
    tjolomadoe: `
      <rect x="55" y="145" width="250" height="75" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/>
      <rect x="110" y="62" width="22" height="83" fill="#8A662C"/>
      <rect x="228" y="80" width="18" height="65" fill="#8A662C"/>
      <path d="M145,220 L145,175 A35,35 0 0,1 215,175 L215,220 Z" fill="#14302B" stroke="#C69C54" stroke-width="2"/>
    `,
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 280">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#14302B"/>
          <stop offset="70%" stop-color="#1F4A42"/>
          <stop offset="100%" stop-color="#0E231F"/>
        </linearGradient>
      </defs>
      <rect width="360" height="280" fill="url(#bg)"/>
      <circle cx="180" cy="110" r="95" fill="#C69C54" opacity="0.14"/>
      ${motifs[motif] || motifs.pendopo}
      <rect x="0" y="232" width="360" height="48" fill="#14302B" opacity="0.9"/>
      <text x="180" y="261" text-anchor="middle" fill="#F4E9D7" font-family="Montserrat, Arial, sans-serif" font-size="13" font-weight="700">${title.replace(/&/g, '&amp;')}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const EVENT_CONFIG = {
  shortName: 'IOMU 2027',
  fullName: 'IOMU 2027 — The 19th Indonesian Occupational Medicine Updates',
  editionTitle: 'THE 19TH INDONESIAN OCCUPATIONAL MEDICINE UPDATES',
  eventType: 'International Conference & Workshop',
  dates: 'May 7–9, 2027',
  datesDisplay: '7–9 May 2027',
  daysLabel: 'Friday–Sunday',
  city: 'Surakarta (Solo), Central Java, Indonesia',
  cityShort: 'Surakarta, Solo',
  venue: 'Hotel Alila Solo',
  venueStatus: 'Confirmed' as const,
  theme:
    'From Global Evidence to Local Impact: Advancing Occupational Medicine for Healthy, Resilient, and Sustainable Workforces',
  themeStatus: 'DRAFT' as const,
  officialWebsite: 'https://iomu.perdoki.or.id',
  coBrandingOrder: 'PERDOKI · IDI | IOMU',
  palette: {
    keratonGreen: '#14302B',
    emerald: '#1F4A42',
    kawungGold: '#C69C54',
    lightGold: '#DDBE82',
    darkGold: '#8A662C',
    ivoryCream: '#F4E9D7',
  },
  socials: [
    { platform: 'Instagram', handle: '@iomu.official', url: 'https://instagram.com/iomu.official' },
    { platform: 'LinkedIn', handle: 'IOMUIndonesia', url: 'https://linkedin.com' },
    { platform: 'Facebook', handle: 'IOMUPerdoki', url: 'https://facebook.com' },
    { platform: 'Website', handle: 'iomu.perdoki.or.id', url: 'https://iomu.perdoki.or.id' },
  ],
  hashtags: ['#IOMU2027', '#IOMUSolo', '#PERDOKI', '#OccupationalMedicine'],
  assets: {
    logoDarkBg: '/assets/brand/logo-iomu-dark.png',
    logoLightBg: '/assets/brand/logo-iomu-light.png',
    logoMonoGold: '/assets/brand/logo-iomu-mono-gold.png',
    logoMonoWhite: '/assets/brand/logo-iomu-mono-white.png',
    logoEmblem: '/assets/brand/logo-iomu-emblem.png',
    logoPerdoki: '/assets/brand/logo-perdoki.png',
    logoIdi: '/assets/brand/logo-idi.png',
    logoHeaderCobrand: '/assets/brand/logo-header-cobrand.jpg',
    logoFinal3d: '/assets/brand/logo-iomu-final-3d.png',
    kawungAccent: '/assets/brand/pola-kawung-accent.png',
    kawungGold: '/assets/brand/pola-kawung-emas.png',
    kawungGreen: '/assets/brand/pola-kawung-hijau.png',
    gununganGold: '/assets/brand/gunungan-emas.png',
    skylineCream: '/assets/brand/skyline-solo-cream.png',
    panggungSanggaBuwanaPhoto: '/assets/brand/landmark-panggung-sangga-buwana.png',
    delegates2026OverlayPhoto: '/assets/brand/foto-peserta-2026-overlay.jpg',
    delegates2026RawPhoto: '/assets/brand/foto-peserta-2026.jpg',
    pinGoldIcon: '/assets/brand/icon-pin-emas.png',
    footerDelegatesPhoto: '/assets/brand/foto-peserta-footer.jpg',
    logoFooterWhite: '/assets/brand/logo-footer-white.png',
    bannerFooterContoh: '/assets/brand/banner-footer-contoh.jpg',
  },
  welcomeMessages: [
    {
      id: 'welcome-oc',
      role: 'Chairperson of the Organizing Committee',
      organization: 'IOMU 2027 Organizing Committee · Surakarta',
      name: 'Chairperson of the Organizing Committee (To Be Announced)',
      status: 'Coming Soon' as ConfirmationStatus,
      greeting: 'Warmest greetings from the cultural heart of Surakarta (Solo).',
      paragraphs: [
        'It is an honor to invite occupational medicine specialists, clinicians, researchers, and workplace health practitioners to the 19th Indonesian Occupational Medicine Updates (IOMU 2027) on May 7–9, 2027.',
        'Inspired by Surakarta’s enduring spirit of hospitality and balance, we are designing an immersive international conference and hands-on workshop journey that unites rigorous clinical updates with real-world workplace solutions.',
      ],
      closing: 'We look forward to welcoming you to Solo in May 2027.',
    },
    {
      id: 'welcome-ioma',
      role: 'Chairperson of the Indonesian Occupational Medicine Association (IOMA)',
      organization: 'Indonesian Occupational Medicine Association (IOMA / PERDOKI)',
      name: 'Chairperson of IOMA / PERDOKI (To Be Announced)',
      status: 'Coming Soon' as ConfirmationStatus,
      greeting: 'Distinguished colleagues and partners in occupational health,',
      paragraphs: [
        'Guided by our draft theme, "From Global Evidence to Local Impact: Advancing Occupational Medicine for Healthy, Resilient, and Sustainable Workforces", IOMU 2027 marks an important milestone in translating international scientific standards into practical protection for Indonesian workers.',
        'Together with national and global experts across our plenary symposia and specialized workshops, let us strengthen collaboration, scientific excellence, and preventive occupational health leadership.',
      ],
      closing: 'Welcome to IOMU 2027 — Surakarta, Central Java.',
    },
  ] as WelcomeMessageConfig[],
  grandEventSections: [
    {
      id: 'what-do-we-do',
      title: 'What do we do?',
      subtitle: 'Scientific Updates & Clinical Practice',
      description:
        'We convene multidisciplinary symposia, evidence-based occupational medicine updates, hands-on practitioner workshops, and peer-reviewed research presentations that equip physicians and OHS teams to safeguard worker health across evolving industries.',
    },
    {
      id: 'what-are-we',
      title: 'What are we?',
      subtitle: '19th Annual Occupational Medicine Forum',
      description:
        'IOMU 2027 is the 19th Indonesian Occupational Medicine Updates — an international conference and workshop organized under the Indonesian Occupational Medicine Association (IOMA / PERDOKI) in collaboration with the Indonesian Medical Association (IDI).',
    },
    {
      id: 'aim-and-mission',
      title: 'Our aim & mission',
      subtitle: 'From Global Evidence to Local Impact',
      description:
        'Our mission is to bridge international occupational health research with actionable workplace implementation — fostering healthy, resilient, and sustainable workforces through lifelong clinical learning, preventive strategies, and cross-sector dialogue.',
    },
    {
      id: 'about-our-event',
      title: 'About our event',
      subtitle: 'May 7–9, 2027 · Surakarta (Solo)',
      description:
        'Set in Surakarta, Central Java across three dedicated conference days (May 7–9, 2027), IOMU 2027 brings together ~15 workshop faculty and 40+ conference speakers in an atmosphere where modern occupational medical science meets royal Javanese heritage.',
    },
  ] as GrandEventSection[],
  assetDocumentation: [
    {
      asset: 'PERDOKI & IDI Co-Branding Logos',
      status: 'Placeholder Raster from Design Master',
      note: 'Design Master specifies requesting official high-resolution vector (.svg / .ai) files from PERDOKI & IDI prior to print or final publication.',
    },
    {
      asset: 'Venue, Speaker Portraits & Hotel Block Rates',
      status: 'To Be Announced',
      note: 'Official Surakarta venue, chairperson/speaker identities, and official hotel block booking links remain To Be Announced until confirmation.',
    },
  ],
  photoCredits: [
    {
      id: 'panggung-sangga-buwana',
      title: 'Panggung Sangga Buwana, Keraton Surakarta',
      author: 'Herusutimbul',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      usage: 'Featured in Arched Landmark Frame (Solo Landmarks & Experience Surakarta)',
    },
    {
      id: 'iomu-2026-delegates',
      title: 'IOMU 2026 Delegates Documentation (WLD_4662)',
      author: 'IOMU / PERDOKI Official Documentation',
      license: 'Official Event Media (18% Keraton Green Overlay Applied)',
      usage: 'Featured in Discover IOMU 2027 Conference Overview',
    },
    {
      id: 'solo-heritage-illustrations',
      title: 'Surakarta Heritage Destination Illustrations',
      author: 'IOMU 2027 Web Design System',
      license: 'Custom Heritage Vector Artworks',
      usage: 'Stylized arched destination previews in Explore Solo (replaceable with licensed photos)',
    },
  ] as PhotoCredit[],
  registration: {
    statusLabel: 'Registration Information Coming Soon',
    isBackendConfigured: Boolean(
      import.meta.env.VITE_REGISTRATION_API_URL || import.meta.env.VITE_SUPABASE_URL
    ),
    apiEndpoint: import.meta.env.VITE_REGISTRATION_API_URL || '',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    participantCategories: [
      'Occupational Medicine Specialist (Sp.Ok / PERDOKI Member)',
      'General Practitioner / Company Physician',
      'Occupational Health & Safety Professional',
      'International Delegate',
      'Resident / Postgraduate Student',
    ],
    workshopTracks: [
      'Track A — Clinical Occupational Medicine Updates (To Be Announced)',
      'Track B — Workplace Risk & Ergonomics Workshop (To Be Announced)',
      'Track C — Return-to-Work & Disability Assessment (To Be Announced)',
    ],
  },
} as const;

export const CHAPTERS: ChapterConfig[] = [
  {
    index: 1,
    code: '01 / 09',
    id: 'home',
    menuLabel: 'Home',
    title: 'Welcome to Solo',
    subtitle: 'Opening Gunungan & Chairperson Welcomes',
    scriptAccent: 'Welcome',
    progressStart: 0.0,
    progressEnd: 0.11,
    cameraStopProgress: 0.015,
    worldZ: 28,
  },
  {
    index: 2,
    code: '02 / 09',
    id: 'about',
    menuLabel: 'About',
    title: 'Journey Through Solo',
    subtitle: 'Know More About Our Grand Event',
    scriptAccent: 'Heritage',
    progressStart: 0.11,
    progressEnd: 0.22,
    cameraStopProgress: 0.17,
    worldZ: -12,
  },
  {
    index: 3,
    code: '03 / 09',
    id: 'conference',
    menuLabel: 'Conference',
    title: 'Discover IOMU 2027',
    subtitle: 'Connecting Global Evidence with Local Impact',
    scriptAccent: 'The Conference',
    progressStart: 0.22,
    progressEnd: 0.33,
    cameraStopProgress: 0.28,
    worldZ: -64,
  },
  {
    index: 4,
    code: '04 / 09',
    id: 'workshops',
    menuLabel: 'Workshops',
    title: 'Scientific Conference & Workshops',
    subtitle: 'Interactive Knowledge & Skill Pavilions',
    scriptAccent: 'Scientific',
    progressStart: 0.33,
    progressEnd: 0.44,
    cameraStopProgress: 0.39,
    worldZ: -108,
  },
  {
    index: 5,
    code: '05 / 09',
    id: 'speakers',
    menuLabel: 'Speakers',
    title: 'Speakers & Experts',
    subtitle: '15 Workshop Faculty & 40+ Conference Speakers',
    scriptAccent: 'Experts',
    progressStart: 0.44,
    progressEnd: 0.56,
    cameraStopProgress: 0.51,
    worldZ: -148,
  },
  {
    index: 6,
    code: '06 / 09',
    id: 'program',
    menuLabel: 'Program',
    title: 'Conference Agenda',
    subtitle: 'Three-Day Golden Scientific Pathway',
    scriptAccent: 'Agenda',
    progressStart: 0.56,
    progressEnd: 0.67,
    cameraStopProgress: 0.62,
    worldZ: -184,
  },
  {
    index: 7,
    code: '07 / 09',
    id: 'explore-solo',
    menuLabel: 'Explore Solo',
    title: 'Experience Surakarta',
    subtitle: 'Heritage Destinations & Cultural Stories',
    scriptAccent: 'Surakarta',
    progressStart: 0.67,
    progressEnd: 0.78,
    cameraStopProgress: 0.73,
    worldZ: -216,
  },
  {
    index: 8,
    code: '08 / 09',
    id: 'accommodation',
    menuLabel: 'Accommodation',
    title: 'Hospitality & Stays',
    subtitle: 'Hotel Alila Solo & Partner Alternatives',
    scriptAccent: 'Hospitality',
    progressStart: 0.78,
    progressEnd: 0.89,
    cameraStopProgress: 0.84,
    worldZ: -236,
  },
  {
    index: 9,
    code: '09 / 09',
    id: 'registration',
    menuLabel: 'Registration',
    title: 'Be Part of IOMU 2027',
    subtitle: 'Join the Journey in Surakarta',
    scriptAccent: 'Join Us',
    progressStart: 0.89,
    progressEnd: 1.01,
    cameraStopProgress: 0.96,
    worldZ: -268,
  },
];

export const LANDMARKS: LandmarkConfig[] = [
  {
    id: 'gapura-gladag',
    name: 'Gapura Gladag',
    category: 'Royal Ceremonial Gateway',
    stylizedNote: 'Stylized 3D architectural interpretation inspired by Surakarta city landmarks.',
    description:
      'Standing along Slamet Riyadi Boulevard as the historic ceremonial entrance toward the royal quarter, Gapura Gladag welcomes visitors entering the cultural heart of Surakarta.',
    culturalHighlight: 'Twin ceremonial pillars crowned with traditional Javanese gable silhouettes.',
    position: [0, 0, 4],
    cameraFocusPos: [4.8, 3.8, 12.5],
    cameraLookAt: [0, 2.5, 4],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gapura+Gladag+Surakarta',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kraton_Surakarta.jpg?width=900',
    fallbackPhoto: createHeritageIllustrationDataUri('Gapura Gladag', 'pendopo'),
    photoCredit: 'Referensi Visual Kawasan Keraton & Gladag Surakarta (Wikimedia Commons)',
    chapterId: 'about',
  },
  {
    id: 'tugu-jam-pasar-gede',
    name: 'Tugu Jam Pasar Gede',
    category: 'Historic Clock Tower',
    stylizedNote: 'Stylized 3D architectural interpretation inspired by Pasar Gede Surakarta.',
    description:
      'An iconic landmark tower near the historic Pasar Gede Harjonagoro market district, marking the vibrant confluence of Solo commerce, culinary heritage, and colonial-era architecture.',
    culturalHighlight: 'Four-sided illuminated clock tower rising above a stepped heritage plinth.',
    position: [-9.5, 0, -10],
    cameraFocusPos: [-3.5, 4.4, -3.5],
    cameraLookAt: [-9.5, 3.6, -10],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tugu+Jam+Pasar+Gede+Surakarta',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Gede_Harjonagoro_Surakarta.jpg?width=900',
    fallbackPhoto: createHeritageIllustrationDataUri('Tugu Jam Pasar Gede', 'pasargede'),
    photoCredit: 'Foto: Kawasan Pasar Gede Harjonagoro & Tugu Jam Surakarta (Wikimedia Commons, CC BY-SA)',
    chapterId: 'about',
  },
  {
    id: 'keraton-surakarta',
    name: 'Keraton Surakarta Architecture',
    category: 'Royal Palace Heritage',
    stylizedNote: 'Stylized 3D architectural interpretation inspired by Keraton Kasunanan Surakarta.',
    description:
      'Representing the enduring architectural philosophy of Keraton Kasunanan Surakarta Hadiningrat, blending serene courtyards, deep Keraton green motifs, and classic tiered Joglo roofs.',
    culturalHighlight: 'Layered Javanese Joglo courtyard reflecting cosmic harmony and royal stewardship.',
    position: [9.5, 0, -22],
    cameraFocusPos: [3.2, 4.5, -14.5],
    cameraLookAt: [9.5, 2.2, -22],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Keraton+Surakarta+Hadiningrat',
    photo: '/assets/brand/landmark-panggung-sangga-buwana.png',
    fallbackPhoto: createHeritageIllustrationDataUri('Keraton Surakarta', 'pendopo'),
    photoCredit: 'Foto: Kawasan Keraton Kasunanan Surakarta (Herusutimbul, CC BY-SA 4.0)',
    chapterId: 'about',
  },
  {
    id: 'panggung-sangga-buwana',
    name: 'Panggung Sangga Buwana',
    category: 'Octagonal Royal Tower',
    stylizedNote: 'Stylized 3D model paired with licensed photography (Herusutimbul, CC BY-SA 4.0).',
    description:
      'The renowned octagonal tower within the Keraton Surakarta compound, celebrated for its distinct multi-level timber balconies, pitched roof, and panoramic watchtower silhouette.',
    culturalHighlight: 'Octagonal observation spire bridging Javanese royal tradition and architectural grace.',
    position: [10.5, 0, -34],
    cameraFocusPos: [4.0, 5.2, -26.0],
    cameraLookAt: [10.5, 4.0, -34],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Panggung+Sangga+Buwana+Surakarta',
    photo: '/assets/brand/landmark-panggung-sangga-buwana.png',
    photoCredit: 'Foto: Panggung Sangga Buwana, Keraton Surakarta. Herusutimbul, CC BY-SA 4.0',
    chapterId: 'about',
  },
  {
    id: 'pendopo-mangkunegaran',
    name: 'Pendopo Mangkunegaran',
    category: 'Grand Royal Pavilion',
    stylizedNote: 'Stylized 3D architectural interpretation inspired by Pura Mangkunegaran.',
    description:
      'An expansive open-air Javanese pendopo famed for its soaring Joglo timber canopy and rhythmic column geometry—an emblem of warm Surakarta hospitality for scholarly gatherings.',
    culturalHighlight: 'Open-plan ceremonial colonnade bathed in warm golden lantern light.',
    position: [-9.5, 0, -36],
    cameraFocusPos: [-3.5, 4.0, -28.0],
    cameraLookAt: [-9.5, 2.2, -36],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pura+Mangkunegaran+Surakarta',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Pendopo,_Mangkunegaran_Palace.jpg?width=900',
    fallbackPhoto: createHeritageIllustrationDataUri('Pendopo Mangkunegaran', 'pendopo'),
    photoCredit: 'Foto: Grand Pendopo, Pura Mangkunegaran Surakarta (Wikimedia Commons, CC BY-SA)',
    chapterId: 'about',
  },
  {
    id: 'masjid-raya-sheikh-zayed',
    name: 'Masjid Raya Sheikh Zayed',
    category: 'Iconic Cultural & Spiritual Landmark',
    stylizedNote: 'Stylized 3D architectural interpretation inspired by Masjid Raya Sheikh Zayed Solo.',
    description:
      'A luminous modern architectural landmark in Surakarta distinguished by its sweeping cream domes, four slender minarets, and gold-accented arcades.',
    culturalHighlight: 'Ivory-cream central dome flanked by four minarets and reflective courtyard pools.',
    position: [-9.5, 0, -214],
    cameraFocusPos: [-2.8, 4.8, -205],
    cameraLookAt: [-9.5, 3.0, -214],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Raya+Sheikh+Zayed+Surakarta',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Halaman_luar_dari_Masjid_Sheikh_Zayed_Surakarta.jpg?width=900',
    fallbackPhoto: createHeritageIllustrationDataUri('Masjid Raya Sheikh Zayed', 'mosque'),
    photoCredit: 'Foto: Masjid Raya Sheikh Zayed Surakarta (Wikimedia Commons, CC BY-SA 4.0)',
    chapterId: 'explore-solo',
  },
  {
    id: 'tugu-pamandengan',
    name: 'Tugu Pamandengan',
    category: 'Historic City Axis Monument',
    stylizedNote: 'Stylized 3D architectural interpretation inspired by Tugu Pamandengan Solo.',
    description:
      'A poised obelisk monument situated at the historic zero-point axis facing Keraton Surakarta, symbolizing focus, clarity of vision, and purposeful orientation.',
    culturalHighlight: 'Slender golden-tipped obelisk standing as a contemplative marker in central Solo.',
    position: [8.5, 0, -220],
    cameraFocusPos: [3.0, 3.8, -212],
    cameraLookAt: [8.5, 2.8, -220],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tugu+Pamandengan+Surakarta',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tugu_Pemandengan_Surakarta.jpg?width=900',
    fallbackPhoto: createHeritageIllustrationDataUri('Tugu Pamandengan', 'pendopo'),
    photoCredit: 'Foto: Tugu Pamandengan Surakarta (Wikimedia Commons, CC BY-SA)',
    chapterId: 'explore-solo',
  },
];

export const SOLO_DESTINATIONS: SoloDestinationConfig[] = [
  {
    id: 'dest-keraton',
    name: 'Keraton Kasunanan & Panggung Sangga Buwana',
    category: 'Royal Palace Heritage',
    locationNote: 'Baluwarti, Pasar Kliwon, Surakarta',
    image: '/assets/brand/landmark-panggung-sangga-buwana.png',
    fallbackImage: '/assets/brand/landmark-panggung-sangga-buwana.png',
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Panggung_Sangga_Buwana.jpg?width=900',
    imageCaption: 'Foto: Panggung Sangga Buwana, Keraton Surakarta (Herusutimbul, CC BY-SA 4.0 · Wikimedia Commons)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Keraton+Kasunanan+Surakarta+Panggung+Sangga+Buwana',
    narrativeTitle: 'Jantung Kosmologi & Menara Pengamatan Kerajaan',
    narrativeStory:
      'Didirikan oleh Susuhunan Pakubuwono II pada tahun 1745 saat pusat Mataram Islam dipindahkan ke tepian Bengawan Solo, Keraton Kasunanan Surakarta memadukan tata ruang filosofis Jawa dengan keanggunan arsitektur tradisional. Di dalamnya menjulang menara oktagonal Panggung Sangga Buwana yang dibangun pada 1782 sebagai tempat semadi raja sekaligus menara pengamatan kota.',
    culturalTip: 'Kenakan pakaian sopan dan sempatkan menyusuri kawasan Baluwarti yang tenang di pagi hari.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Keraton+Surakarta+Hadiningrat',
    linkedLandmarkId: 'panggung-sangga-buwana',
  },
  {
    id: 'dest-mangkunegaran',
    name: 'Pura Mangkunegaran & Pendopo Ageng',
    category: 'Duchy Palace & Performing Arts',
    locationNote: 'Jl. Ronggowarsito, Banjarsari, Surakarta',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Pendopo,_Mangkunegaran_Palace.jpg?width=900',
    fallbackImage: createHeritageIllustrationDataUri('Pura Mangkunegaran', 'pendopo'),
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pura_Mangkunegaran.jpg?width=900',
    imageCaption: 'Foto: Pendopo Ageng Pura Mangkunegaran Surakarta (Wikimedia Commons, CC BY-SA)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Pura+Mangkunegaran+Pendopo+Ageng+Surakarta',
    narrativeTitle: 'Kemegahan Pendopo Tanpa Paku di Pusat Kebudayaan Solo',
    narrativeStory:
      'Berdiri sejak Perjanjian Salatiga tahun 1757 oleh Raden Mas Said (KGPAA Mangkunegara I), Pura Mangkunegaran menyimpan Pendopo Ageng berkonstruksi kayu jati megah bergaya Jawa-Eropa. Langit-langit pendopo melambangkan harmoni kosmos Jawa, sementara taman Pracima Tuin kini menghadirkan pengalaman kuliner klasik bangsawan Solo.',
    culturalTip: 'Kunjungi pada pagi hingga sore hari untuk menyaksikan koleksi topeng tari, pusaka, dan gamelan bersejarah.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pura+Mangkunegaran+Surakarta',
    linkedLandmarkId: 'pendopo-mangkunegaran',
  },
  {
    id: 'dest-kampung-batik',
    name: 'Kampung Batik Laweyan & Kauman',
    category: 'Living Batik Heritage',
    locationNote: 'Laweyan & Pasar Kliwon, Surakarta',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kampung_Batik_Kauman.jpg?width=900',
    fallbackImage: createHeritageIllustrationDataUri('Kampung Batik Solo', 'batik'),
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Laweyan.jpg?width=900',
    imageCaption: 'Foto: Suasana Lorong Kampung Batik Kauman & Laweyan Solo (Wikimedia Commons, CC BY-SA)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Kampung+Batik+Laweyan+dan+Kauman+Solo',
    narrativeTitle: 'Jejak Saudagar Batik dan Motif Keraton Sepanjang Zaman',
    narrativeStory:
      'Solo memiliki dua kampung batik bersejarah dengan karakter berbeda: Kauman di dekat Masjid Agung sebagai penyedia batik tulis klasik bergaya keraton, serta Laweyan dengan rumah-rumah saudagar berpagar tinggi sejak era abad ke-19. Di gang-gang sempit yang artistik, pengunjung dapat melihat langsung proses mencanting hingga pewarnaan alam.',
    culturalTip: 'Cocok untuk wisata jalan kaki sore sembari mengikuti workshop singkat membatik tulis.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kampung+Batik+Laweyan+Surakarta',
  },
  {
    id: 'dest-sheikh-zayed',
    name: 'Masjid Raya Sheikh Zayed Solo',
    category: 'Modern Architectural Landmark',
    locationNote: 'Gilingan, Banjarsari, Surakarta',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Halaman_luar_dari_Masjid_Sheikh_Zayed_Surakarta.jpg?width=900',
    fallbackImage: createHeritageIllustrationDataUri('Masjid Raya Sheikh Zayed', 'mosque'),
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/MAGHRIB_DI_MASJID_RAYA_SYEIKH_ZAYED,_SOLO.jpg?width=900',
    imageCaption: 'Foto: Eksterior Masjid Raya Sheikh Zayed Surakarta (Wikimedia Commons, CC BY-SA 4.0)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Masjid+Raya+Sheikh+Zayed+Solo+Surakarta',
    narrativeTitle: 'Simbol Persahabatan dengan Sentuhan Motif Batik Nusantara',
    narrativeStory:
      'Diresmikan pada November 2022 sebagai replika indah Sheikh Zayed Grand Mosque di Abu Dhabi, masjid berkubah putih gading dan beraksen emas ini memadukan marmer megah Timur Tengah dengan karpet bermotif batik Indonesia. Cahaya senja yang memantul di kolam refleksinya menjadikannya ikon arsitektur modern kota Solo.',
    culturalTip: 'Waktu terbaik berkunjung adalah menjelang senja hingga malam saat pencahayaan emas menyorot kubah utama.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Raya+Sheikh+Zayed+Surakarta',
    linkedLandmarkId: 'masjid-raya-sheikh-zayed',
  },
  {
    id: 'dest-pasargede',
    name: 'Pasar Gede Harjonagoro & Tugu Jam',
    category: 'Culinary & Colonial-Javanese Market',
    locationNote: 'Jl. Jend. Urip Sumoharjo, Jebres, Surakarta',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Gede_Harjonagoro_Surakarta.jpg?width=900',
    fallbackImage: createHeritageIllustrationDataUri('Pasar Gede & Tugu Jam', 'pasargede'),
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Gede_6.jpg?width=900',
    imageCaption: 'Foto: Fasad Bersejarah Pasar Gede Harjonagoro Surakarta (Wikimedia Commons, CC BY-SA)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Pasar+Gede+Harjonagoro+Tugu+Jam+Solo',
    narrativeTitle: 'Karya Thomas Karsten Tahun 1930 yang Penuh Cita Rasa',
    narrativeStory:
      'Dirancang oleh arsitek Belanda Herman Thomas Karsten pada tahun 1930, Pasar Gede mempertemukan atap tajug Jawa dengan struktur kolonial yang sejuk dan lapang. Tepat di persimpangannya berdiri Tugu Jam Pasar Gede yang menjadi penanda pusat aktivitas warga, kuliner legendaris dawet telasih, hingga akulturasi budaya Tionghoa-Jawa.',
    culturalTip: 'Jangan lewatkan es dawet telasih legendaris serta aneka jajanan pasar tradisional di lantai dasar.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pasar+Gede+Harjonagoro+Surakarta',
    linkedLandmarkId: 'tugu-jam-pasar-gede',
  },
  {
    id: 'dest-triwindu',
    name: 'Pasar Antik Triwindu & Koridor Ngarsopuro',
    category: 'Antique Curios & Night Promenade',
    locationNote: 'Jl. Diponegoro, Keprabon, Banjarsari, Surakarta',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Triwindu_1.jpg?width=900',
    fallbackImage: createHeritageIllustrationDataUri('Pasar Antik Triwindu', 'triwindu'),
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Triwindu_2.jpg?width=900',
    imageCaption: 'Foto: Koleksi Barang Antik Pasar Triwindu Ngarsopuro (Wikimedia Commons, CC BY-SA)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Pasar+Antik+Triwindu+Ngarsopuro+Solo',
    narrativeTitle: 'Harta Karun Vintage Sejak Peringatan Windu Ketiga 1939',
    narrativeStory:
      'Dibangun pada tahun 1939 untuk memperingati 24 tahun (tiga windu) bertahtanya KGPAA Mangkunegara VII, Pasar Triwindu menyimpan ribuan benda antik seperti lampu gantung kuno, wayang kulit, topeng kayu, hingga koin klasik. Di malam akhir pekan, koridor Ngarsopuro di depannya berubah menjadi ruang seni, kriya, dan kuliner jalanan yang hangat.',
    culturalTip: 'Jelajahi lantai dua Pasar Triwindu di siang hari lalu nikmati suasana malam koridor Ngarsopuro.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pasar+Antik+Triwindu+Surakarta',
  },
  {
    id: 'dest-danar-hadi',
    name: 'Museum Batik Danar Hadi (Ndalem Wuryaningratan)',
    category: 'Textile Museum & Heritage Complex',
    locationNote: 'Jl. Slamet Riyadi No. 261, Laweyan, Surakarta',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Museum_Batik_Danar_Hadi.jpg?width=900',
    fallbackImage: createHeritageIllustrationDataUri('Museum Batik Danar Hadi', 'museum'),
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gapura_Kampung_Batik_Kauman.jpg?width=900',
    imageCaption: 'Foto: Kompleks Museum Batik Danar Hadi / Ndalem Wuryaningratan (Wikimedia Commons, CC BY-SA)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Museum+Batik+Danar+Hadi+Solo',
    narrativeTitle: 'Menyusuri 10.000 Lembar Sejarah Wastra Batik Nusantara',
    narrativeStory:
      'Berlokasi di dalam kompleks rumah bangsawan Ndalem Wuryaningratan bergaya arsitektur Jawa-Kolonial, Museum Batik Danar Hadi menyimpan lebih dari sepuluh ribu koleksi batik kuno dari batik keraton Surakarta-Yogyakarta, batik pesisir, batik saudagaran, hingga pengaruh budaya Belanda dan Tionghoa.',
    culturalTip: 'Ikuti tur berpemandu di dalam museum untuk memahami makna filosofis di balik tiap motif klasik.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museum+Batik+Danar+Hadi+Surakarta',
  },
  {
    id: 'dest-tjolomadoe',
    name: 'De Tjolomadoe & Lokananta Bloc',
    category: 'Industrial Heritage & Music Legacy',
    locationNote: 'Colomadu & Kerten, Kawasan Solo Raya',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pabrik_Gula_Colomadu.jpg?width=900',
    fallbackImage: createHeritageIllustrationDataUri('De Tjolomadoe & Lokananta', 'tjolomadoe'),
    secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Museum_Lokananta.jpg?width=900',
    imageCaption: 'Foto: Arsitektur Heritage De Tjolomadoe / Eks PG Colomadu (Wikimedia Commons, CC BY-SA)',
    googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=De+Tjolomadoe+dan+Lokananta+Bloc+Solo',
    narrativeTitle: 'Revitalisasi Pabrik Gula 1861 & Studio Musik Pertama Indonesia',
    narrativeStory:
      'Di sisi barat Solo, bekas Pabrik Gula Colomadu yang didirikan Mangkunegara IV pada tahun 1861 direvitalisasi menjadi De Tjolomadoe dengan mesin-mesin raksasa era kolonial yang terawat artistik. Tak jauh dari sana, Lokananta — studio rekaman piringan hitam pertama milik negara yang lahir pada 1956 — kini hidup kembali sebagai ruang kreatif musik dan budaya.',
    culturalTip: 'Sangat dekat dari kawasan Hotel Alila Solo (±10 menit berkendara), ideal untuk kunjungan singkat antar-sesi.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=De+Tjolomadoe+Karanganyar',
  },
];

export const MAIN_HOTEL: HotelConfig = {
  id: 'alila-solo',
  name: 'Hotel Alila Solo',
  tier: 'Official Conference Venue & Main Hotel · 5-Star Luxury',
  isMainVenueHotel: true,
  distanceFromAlila: 'Official IOMU 2027 Venue · Jl. Slamet Riyadi Corridor',
  address: 'Jl. Slamet Riyadi No. 562, Jajar, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57144',
  summary:
    'Serving as the official venue and primary accommodation for IOMU 2027, Hotel Alila Solo rises above Slamet Riyadi Boulevard as Surakarta’s landmark five-star hotel—blending contemporary architectural elegance with authentic Javanese batik and wayang artistry.',
  highlights: [
    'Official Conference Grand Ballroom & Breakout Workshop Suites under one roof',
    'Elevated rooftop Agra Lounge & Dining overlooking Mount Merapi and Mount Lawu',
    'Épice Restaurant, Largo semi-Olympic pool, and Spa Alila wellness sanctuary',
    'Direct boulevard access (~15–20 mins to Adi Soemarmo International Airport)',
  ],
  bookingStatus: 'Official Conference Venue · Delegate Room Block Rates Coming Soon',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Alila+Solo',
  position: [-8.5, 0, -236],
  cameraFocusPos: [-1.5, 5.2, -225],
  cameraLookAt: [-8.5, 4.2, -236],
};

export const ALTERNATIVE_HOTELS: HotelConfig[] = [
  {
    id: 'hotel-royal-heritage',
    name: 'The Royal Surakarta Heritage — Handwritten Collection',
    tier: '5-Star Heritage Luxury',
    distanceFromAlila: '~15 mins east along Jl. Slamet Riyadi (Gladag / Keraton area)',
    address: 'Jl. Slamet Riyadi No. 6, Kp. Baru, Pasar Kliwon, Surakarta',
    summary:
      'Elegant Javanese-styled heritage hotel steps away from Gapura Gladag, Keraton Surakarta, and Pasar Gede.',
    highlights: ['Classic Javanese batik interiors', 'Walking distance to royal landmarks'],
    bookingStatus: 'Delegate reference option · Independent booking',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Royal+Surakarta+Heritage',
  },
  {
    id: 'hotel-solia-zigna',
    name: 'SOLIA Zigna Kampung Batik Laweyan',
    tier: '4-Star Boutique Heritage',
    distanceFromAlila: '~5 mins drive (Laweyan Batik Quarter)',
    address: 'Jl. Dr. Rajiman No. 525, Laweyan, Surakarta',
    summary:
      'Contemporary boutique hotel celebrating Laweyan batik craftsmanship with vibrant cultural touches and rooftop pool.',
    highlights: ['Adjacent to Kampung Batik Laweyan', 'Easy access to Jl. Slamet Riyadi'],
    bookingStatus: 'Delegate reference option · Independent booking',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Solia+Zigna+Kampung+Batik+Solo',
  },
  {
    id: 'hotel-harris-solo',
    name: 'HARRIS Hotel & Conventions Solo',
    tier: '4-Star Business & Convention',
    distanceFromAlila: '~4 mins east (Purwosari / Slamet Riyadi)',
    address: 'Jl. Slamet Riyadi No. 464, Purwosari, Laweyan, Surakarta',
    summary:
      'Modern business and convention hotel positioned directly along Solo’s main boulevard near Purwosari Station.',
    highlights: ['Quick access to Hotel Alila Solo', 'Spacious business rooms & meeting lounges'],
    bookingStatus: 'Delegate reference option · Independent booking',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=HARRIS+Hotel+Solo',
  },
  {
    id: 'hotel-swiss-belinn',
    name: 'Swiss-Belinn Saripetojo Solo',
    tier: '4-Star Modern City Hotel',
    distanceFromAlila: '~4 mins east (Purwosari)',
    address: 'Jl. Brigjen Slamet Riyadi No. 437, Sondakan, Laweyan, Surakarta',
    summary:
      'Contemporary accommodation standing on a historic Solo landmark site with convenient rail and city access.',
    highlights: ['Minutes from Purwosari Station', 'Comfortable business amenities'],
    bookingStatus: 'Delegate reference option · Independent booking',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Swiss-Belinn+Saripetojo+Solo',
  },
  {
    id: 'hotel-novotel-solo',
    name: 'Novotel Solo',
    tier: '4-Star International Business Hotel',
    distanceFromAlila: '~10 mins east (Jl. Slamet Riyadi, Timuran)',
    address: 'Jl. Slamet Riyadi No. 272, Timuran, Banjarsari, Surakarta',
    summary:
      'Established international-standard hotel featuring tropical garden courtyards near Mangkunegaran and Ngarsopuro.',
    highlights: ['Central Solo location', 'Tropical courtyard pool & fitness facilities'],
    bookingStatus: 'Delegate reference option · Independent booking',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Novotel+Solo',
  },
  {
    id: 'hotel-swiss-belhotel',
    name: 'Swiss-Belhotel Solo',
    tier: '4-Star Upscale City Hotel',
    distanceFromAlila: '~12 mins northeast (Gilingan / Tirtonadi)',
    address: 'Jl. Ahmad Yani No. 45, Gilingan, Banjarsari, Surakarta',
    summary:
      'Modern upscale hotel located close to Solo Balapan Railway Station and Masjid Raya Sheikh Zayed.',
    highlights: ['Near Solo Balapan Station', 'Easy toll-road & airport access'],
    bookingStatus: 'Delegate reference option · Independent booking',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Swiss-Belhotel+Solo',
  },
];

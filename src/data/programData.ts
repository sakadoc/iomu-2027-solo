import { ConfirmationStatus } from '../config/eventConfig';

export type ProgramCategory =
  | 'Scientific Conference'
  | 'Workshops'
  | 'Scientific Presentations'
  | 'Professional Networking';

export interface ProgramItem {
  id: string;
  title: string;
  category: ProgramCategory;
  description: string;
  date: string;
  time: string;
  speaker: string;
  room: string;
  registrationAvailability: string;
  status: ConfirmationStatus;
}

export interface WorkshopPavilionConfig {
  id: string;
  category: ProgramCategory;
  shortTitle: string;
  tagline: string;
  summary: string;
  position: [number, number, number];
  cameraFocusPos: [number, number, number];
  cameraLookAt: [number, number, number];
  accentStyle: 'tajug' | 'studio' | 'rotunda' | 'pendopo';
}

export interface SpeakerProfile {
  id: string;
  track: 'workshop' | 'conference';
  slotLabel: string;
  photo: string | null;
  fullName: string;
  titles: string;
  positionTitle: string;
  institution: string;
  expertise: string;
  presentationTitle: string;
  biography: string;
  status: ConfirmationStatus;
  position?: [number, number, number];
  cameraFocusPos?: [number, number, number];
  cameraLookAt?: [number, number, number];
}

export interface AgendaSession {
  id: string;
  timeRange: string;
  title: string;
  category: string;
  speaker: string;
  room: string;
  description: string;
  status: ConfirmationStatus;
}

export interface AgendaDay {
  id: string;
  dayNumber: number;
  label: string;
  fullDate: string;
  milestoneHeadline: string;
  summary: string;
  status: ConfirmationStatus;
  worldPosition: [number, number, number];
  sessions: AgendaSession[];
}

export const CONFERENCE_PILLARS = [
  {
    id: 'about-iomu',
    title: 'About IOMU 2027',
    badge: '19th Edition',
    description:
      'Indonesian Occupational Medicine Updates (IOMU) is an annual scientific conference and workshop platform dedicated to advancing occupational health practice, workplace prevention, and evidence-based clinical standards.',
  },
  {
    id: 'conference-overview',
    title: 'Conference Overview',
    badge: 'International Forum',
    description:
      'Hosted in the cultural city of Surakarta (Solo) on May 7–9, 2027, IOMU 2027 brings together occupational medicine specialists, clinicians, researchers, and workplace health practitioners.',
  },
  {
    id: 'event-objectives',
    title: 'Event Objectives',
    badge: 'Draft Theme Focus',
    description:
      'Guided by the draft theme "From Global Evidence to Local Impact", the forum explores resilient, healthy, and sustainable workforce strategies tailored to evolving industrial environments.',
  },
  {
    id: 'professional-networking',
    title: 'Professional Networking',
    badge: 'Cross-Sector Dialogue',
    description:
      'Facilitating meaningful exchange among PERDOKI members, international delegates, academic institutions, and industry medical teams in an inspiring Javanese heritage setting.',
  },
  {
    id: 'scientific-exchange',
    title: 'Scientific Knowledge Exchange',
    badge: 'Evidence & Practice',
    description:
      'Curated plenary symposia, hands-on clinical workshops, and scientific presentations designed to translate global occupational medicine research into practical workplace care.',
  },
];

export const WORKSHOP_PAVILIONS: WorkshopPavilionConfig[] = [
  {
    id: 'pavilion-scientific-conference',
    category: 'Scientific Conference',
    shortTitle: 'Scientific Conference',
    tagline: 'Plenary & Symposium Category',
    summary:
      'Information hub for keynote lectures, international symposia, and state-of-the-art updates in occupational and environmental medicine.',
    position: [-9.5, 0, -100],
    cameraFocusPos: [-2.2, 4.2, -91.5],
    cameraLookAt: [-9.5, 2.2, -100],
    accentStyle: 'tajug',
  },
  {
    id: 'pavilion-workshops',
    category: 'Workshops',
    shortTitle: 'Workshops',
    tagline: 'Hands-On Clinical & Technical Tracks',
    summary:
      'Information hub for practical skill-building workshops covering workplace hazard assessment, fitness-for-work evaluation, and clinical ergonomics.',
    position: [9.5, 0, -102],
    cameraFocusPos: [2.2, 4.2, -93.5],
    cameraLookAt: [9.5, 2.2, -102],
    accentStyle: 'studio',
  },
  {
    id: 'pavilion-scientific-presentations',
    category: 'Scientific Presentations',
    shortTitle: 'Scientific Presentations',
    tagline: 'Oral & E-Poster Research Forum',
    summary:
      'Information hub for abstract submissions, peer-reviewed research presentations, and clinical case discussions.',
    position: [-9.0, 0, -116],
    cameraFocusPos: [-2.0, 4.0, -107.5],
    cameraLookAt: [-9.0, 2.2, -116],
    accentStyle: 'rotunda',
  },
  {
    id: 'pavilion-networking',
    category: 'Professional Networking',
    shortTitle: 'Professional Networking',
    tagline: 'Collaboration & Institutional Exchange',
    summary:
      'Information hub for colleague meetups, organizational dialogues, and heritage cultural hospitality sessions.',
    position: [9.0, 0, -118],
    cameraFocusPos: [2.0, 4.0, -109.5],
    cameraLookAt: [9.0, 2.2, -118],
    accentStyle: 'pendopo',
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-sc-1',
    title: 'Plenary & Main Scientific Symposia',
    category: 'Scientific Conference',
    description:
      'Keynote and multidisciplinary symposia addressing global occupational medicine evidence and sustainable workforce resilience. Specific session titles will be published upon Scientific Committee confirmation.',
    date: 'May 7–9, 2027 (Exact schedule TBA)',
    time: 'To Be Announced',
    speaker: 'To Be Announced',
    room: 'Hotel Alila Solo (Room TBA)',
    registrationAvailability: 'Registration Information Coming Soon',
    status: 'Coming Soon',
  },
  {
    id: 'prog-sc-2',
    title: 'Emerging Workplace Health Challenges Forum',
    category: 'Scientific Conference',
    description:
      'Draft scientific track examining psychosocial well-being, occupational toxicology, and climate-resilient workplace protection.',
    date: 'May 7–9, 2027 (Exact schedule TBA)',
    time: 'To Be Announced',
    speaker: 'To Be Announced',
    room: 'Hotel Alila Solo (Room TBA)',
    registrationAvailability: 'Registration Information Coming Soon',
    status: 'Draft',
  },
  {
    id: 'prog-ws-1',
    title: 'Pre-Conference & Clinical Occupational Medicine Workshops',
    category: 'Workshops',
    description:
      'Interactive practitioner workshops designed for hands-on clinical examination, medical surveillance interpretation, and return-to-work decision making.',
    date: 'May 7–9, 2027 (Exact schedule TBA)',
    time: 'To Be Announced',
    speaker: 'To Be Announced',
    room: 'Hotel Alila Solo (Room TBA)',
    registrationAvailability: 'Registration Information Coming Soon',
    status: 'Coming Soon',
  },
  {
    id: 'prog-ws-2',
    title: 'Industrial Hygiene & Ergonomics Practical Workshop',
    category: 'Workshops',
    description:
      'Draft interactive module focusing on field exposure assessment and practical ergonomic risk mitigation across diverse industries.',
    date: 'May 7–9, 2027 (Exact schedule TBA)',
    time: 'To Be Announced',
    speaker: 'To Be Announced',
    room: 'Hotel Alila Solo (Room TBA)',
    registrationAvailability: 'Registration Information Coming Soon',
    status: 'Draft',
  },
  {
    id: 'prog-sp-1',
    title: 'Call for Abstracts: Oral & Poster Presentations',
    category: 'Scientific Presentations',
    description:
      'Dedicated scientific showcase for original research, epidemiological studies, and occupational medicine case reports. Submission guidelines and deadlines will be announced separately.',
    date: 'May 7–9, 2027 (Exact schedule TBA)',
    time: 'To Be Announced',
    speaker: 'Submitting Authors (TBA)',
    room: 'Hotel Alila Solo (Room TBA)',
    registrationAvailability: 'Submission Details Coming Soon',
    status: 'Coming Soon',
  },
  {
    id: 'prog-pn-1',
    title: 'Delegates Fellowship & Heritage Networking Reception',
    category: 'Professional Networking',
    description:
      'Collegial networking sessions connecting national and international occupational health professionals amidst the warmth of Surakarta hospitality.',
    date: 'May 7–9, 2027 (Exact schedule TBA)',
    time: 'To Be Announced',
    speaker: 'Committee & Delegates',
    room: 'Hotel Alila Solo (Room TBA)',
    registrationAvailability: 'Included Details Coming Soon',
    status: 'Coming Soon',
  },
];

const WORKSHOP_ROLES = [
  'Workshop Lead — Clinical Occupational Medicine',
  'Instructor — Workplace Ergonomics & Musculoskeletal Assessment',
  'Lead Facilitator — Occupational Spirometry & Respiratory Care',
  'Faculty — Occupational Audiometry & Hearing Conservation',
  'Instructor — Return-to-Work & Functional Capacity Evaluation',
  'Lead Trainer — Occupational Toxicology & Biomonitoring',
  'Facilitator — Fitness-for-Work in High-Risk Industries',
  'Faculty — Occupational Mental Health & Psychosocial Risk',
  'Instructor — Industrial Hygiene & Exposure Risk Mapping',
  'Trainer — Occupational Dermatology Clinical Practice',
  'Facilitator — Heat Stress & Climate-Resilient Workplaces',
  'Lead — Emergency Medical Response in Industrial Sites',
  'Instructor — Medical Surveillance Data & Health Analytics',
  'Faculty — Shift Work, Fatigue Risk & Circadian Health',
  'Mentor — Occupational Disease Causation & Disability Grading',
];

const CONFERENCE_ROLES = [
  'Keynote Speaker — Global Occupational Health Policy',
  'Keynote Speaker — Sustainable & Resilient Workforces',
  'Plenary Speaker — Occupational Medicine Updates',
  'International Guest Lecturer — Evidence-Based Practice',
  'Plenary Faculty — Workplace Preventive Standards',
  'Symposium Speaker — Industrial Toxicology',
  'Symposium Speaker — Occupational Respiratory Diseases',
  'Symposium Speaker — Ergonomics & Future of Work',
  'Symposium Speaker — Mental Health at the Workplace',
  'Symposium Speaker — Return-to-Work Frameworks',
];

const GALLERY_COORDS: [number, number, number][] = [
  [-9.0, 0, -140],
  [9.0, 0, -143],
  [-9.0, 0, -149],
  [9.0, 0, -152],
  [-9.0, 0, -158],
  [9.0, 0, -161],
];

export const WORKSHOP_SPEAKERS: SpeakerProfile[] = WORKSHOP_ROLES.map((role, index) => {
  const num = String(index + 1).padStart(2, '0');
  const coord = GALLERY_COORDS[index % GALLERY_COORDS.length];
  const isLeft = coord[0] < 0;
  return {
    id: `workshop-speaker-${num}`,
    track: 'workshop',
    slotLabel: `Workshop Faculty ${num}`,
    photo: null,
    fullName: 'To Be Announced',
    titles: 'Academic & Specialist Titles — TBA',
    positionTitle: role,
    institution: 'Institution To Be Announced',
    expertise: role.replace(/^[^—]+—\s*/, ''),
    presentationTitle: 'Workshop Session Topic To Be Announced',
    biography:
      'Confirmed workshop instructor portrait, full name, institutional affiliation, and session outline will be published upon Scientific Committee confirmation.',
    status: 'Coming Soon',
    position: coord,
    cameraFocusPos: [isLeft ? -3.5 : 3.5, 3.2, coord[2] + 6],
    cameraLookAt: [coord[0], 2.3, coord[2]],
  };
});

export const CONFERENCE_SPEAKERS: SpeakerProfile[] = Array.from({ length: 42 }, (_, index) => {
  const num = String(index + 1).padStart(2, '0');
  const role =
    CONFERENCE_ROLES[index % CONFERENCE_ROLES.length] +
    (index >= CONFERENCE_ROLES.length
      ? ` (Panel ${Math.floor(index / CONFERENCE_ROLES.length) + 1})`
      : '');
  const coord = GALLERY_COORDS[index % GALLERY_COORDS.length];
  const isLeft = coord[0] < 0;
  return {
    id: `conf-speaker-${num}`,
    track: 'conference',
    slotLabel: `Conference Speaker ${num}`,
    photo: null,
    fullName: 'To Be Announced',
    titles: 'Academic & Professional Titles — TBA',
    positionTitle: role,
    institution: 'Institution To Be Announced',
    expertise: 'Occupational & Environmental Medicine',
    presentationTitle: 'Conference Lecture Topic To Be Announced',
    biography:
      'Confirmed conference speaker identity, academic title, photo, and abstract details will be announced by the IOMU 2027 Scientific Committee.',
    status: 'Coming Soon',
    position: coord,
    cameraFocusPos: [isLeft ? -3.5 : 3.5, 3.2, coord[2] + 6],
    cameraLookAt: [coord[0], 2.3, coord[2]],
  };
});

export const SPEAKERS: SpeakerProfile[] = [
  ...CONFERENCE_SPEAKERS.slice(0, 4),
  ...WORKSHOP_SPEAKERS.slice(0, 2),
].map((sp, i) => ({
  ...sp,
  position: GALLERY_COORDS[i],
  cameraFocusPos: [GALLERY_COORDS[i][0] < 0 ? -3.5 : 3.5, 3.2, GALLERY_COORDS[i][2] + 6],
  cameraLookAt: [GALLERY_COORDS[i][0], 2.3, GALLERY_COORDS[i][2]],
}));

export const AGENDA_DAYS: AgendaDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    label: 'Day 1',
    fullDate: 'Friday, May 7, 2027',
    milestoneHeadline: 'Day 1 — Friday, May 7, 2027',
    summary: 'Program to Be Announced. Official opening, workshop tracks, and session timings are pending committee confirmation.',
    status: 'Coming Soon',
    worldPosition: [-5.5, 0, -176],
    sessions: [
      {
        id: 'day1-tba-1',
        timeRange: 'Time Range To Be Announced',
        title: 'Program to Be Announced',
        category: 'Conference & Workshop Track',
        speaker: 'To Be Announced',
        room: 'Hotel Alila Solo (Room TBA)',
        description:
          'Detailed Day 1 schedule items, workshop allocations, and opening activities for Friday, May 7, 2027 will be published once finalized.',
        status: 'Coming Soon',
      },
    ],
  },
  {
    id: 'day-2',
    dayNumber: 2,
    label: 'Day 2',
    fullDate: 'Saturday, May 8, 2027',
    milestoneHeadline: 'Day 2 — Saturday, May 8, 2027',
    summary: 'Program to Be Announced. Plenary sessions, scientific symposia, and presentation schedules are pending confirmation.',
    status: 'Coming Soon',
    worldPosition: [0, 0, -184],
    sessions: [
      {
        id: 'day2-tba-1',
        timeRange: 'Time Range To Be Announced',
        title: 'Program to Be Announced',
        category: 'Scientific Conference & Presentations',
        speaker: 'To Be Announced',
        room: 'Hotel Alila Solo (Room TBA)',
        description:
          'Detailed Day 2 plenary lectures, concurrent scientific symposia, and research presentation slots for Saturday, May 8, 2027 will be updated here.',
        status: 'Coming Soon',
      },
    ],
  },
  {
    id: 'day-3',
    dayNumber: 3,
    label: 'Day 3',
    fullDate: 'Sunday, May 9, 2027',
    milestoneHeadline: 'Day 3 — Sunday, May 9, 2027',
    summary: 'Program to Be Announced. Final scientific sessions and closing proceedings are pending committee confirmation.',
    status: 'Coming Soon',
    worldPosition: [5.5, 0, -192],
    sessions: [
      {
        id: 'day3-tba-1',
        timeRange: 'Time Range To Be Announced',
        title: 'Program to Be Announced',
        category: 'Scientific Symposium & Closing',
        speaker: 'To Be Announced',
        room: 'Hotel Alila Solo (Room TBA)',
        description:
          'Detailed Day 3 schedule items, wrap-up panels, and closing remarks for Sunday, May 9, 2027 will be announced upon finalization.',
        status: 'Coming Soon',
      },
    ],
  },
];

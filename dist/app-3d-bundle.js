/* IOMU 2027 — Immersive 3D Surakarta Silhouette Line Experience (Bilingual EN/ID) */
(function () {
  'use strict';

  const isFileProtocol = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
  const assetBase = isFileProtocol ? './public/assets/brand' : './assets/brand';
  const DEFAULT_ASSETS = {
    logoDarkBg: `${assetBase}/logo-iomu-dark.png`,
    logoLightBg: `${assetBase}/logo-iomu-light.png`,
    logoMonoGold: `${assetBase}/logo-iomu-mono-gold.png`,
    logoMonoWhite: `${assetBase}/logo-iomu-mono-white.png`,
    logoEmblem: `${assetBase}/logo-iomu-emblem.png`,
    logoPerdoki: `${assetBase}/logo-perdoki.png`,
    logoIdi: `${assetBase}/logo-idi.png`,
    logoHeaderCobrand: `${assetBase}/logo-header-cobrand.jpg`,
    logoFinal3d: `${assetBase}/logo-iomu-final-3d.png`,
    kawungAccent: `${assetBase}/pola-kawung-accent.png`,
    kawungGold: `${assetBase}/pola-kawung-emas.png`,
    kawungGreen: `${assetBase}/pola-kawung-hijau.png`,
    gununganGold: `${assetBase}/gunungan-emas.png`,
    skylineCream: `${assetBase}/skyline-solo-cream.png`,
    panggungSanggaBuwanaPhoto: `${assetBase}/landmark-panggung-sangga-buwana.png`,
    delegates2026OverlayPhoto: `${assetBase}/foto-peserta-2026-overlay.jpg`,
    pinGoldIcon: `${assetBase}/icon-pin-emas.png`,
    footerDelegatesPhoto: `${assetBase}/foto-peserta-footer.jpg`,
    logoFooterWhite: `${assetBase}/logo-footer-white.png`,
    bannerFooterContoh: `${assetBase}/banner-footer-contoh.jpg`,
  };
  const ASSETS = Object.assign({}, DEFAULT_ASSETS, window.IOMU_BRAND_ASSETS || {});
  if (typeof document !== 'undefined' && document.documentElement && ASSETS.kawungAccent) {
    document.documentElement.style.setProperty('--iomu-kawung-accent-url', `url("${ASSETS.kawungAccent}")`);
  }

  function createHeritageIllustrationDataUri(title, motif) {
    const motifs = {
      pendopo: '<rect x="60" y="210" width="240" height="20" fill="#C69C54"/><polygon points="45,165 180,95 315,165" fill="#1F4A42" stroke="#C69C54" stroke-width="3"/><polygon points="120,125 180,55 240,125" fill="#14302B" stroke="#DDBE82" stroke-width="3"/><rect x="85" y="165" width="10" height="45" fill="#DDBE82"/><rect x="135" y="165" width="10" height="45" fill="#DDBE82"/><rect x="215" y="165" width="10" height="45" fill="#DDBE82"/><rect x="265" y="165" width="10" height="45" fill="#DDBE82"/>',
      batik: '<circle cx="180" cy="145" r="78" fill="#1F4A42" stroke="#C69C54" stroke-width="3"/><path d="M180,75 Q220,115 180,145 Q140,115 180,75 Z" fill="#DDBE82" opacity="0.88"/><path d="M180,215 Q220,175 180,145 Q140,175 180,215 Z" fill="#DDBE82" opacity="0.88"/><path d="M110,145 Q150,105 180,145 Q150,185 110,145 Z" fill="#C69C54" opacity="0.9"/><path d="M250,145 Q210,105 180,145 Q210,185 250,145 Z" fill="#C69C54" opacity="0.9"/><circle cx="180" cy="145" r="14" fill="#F4E9D7"/>',
      mosque: '<rect x="75" y="165" width="210" height="55" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/><path d="M125,165 C125,95 235,95 235,165 Z" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/><rect x="65" y="85" width="14" height="135" fill="#F4E9D7" stroke="#C69C54" stroke-width="2"/><rect x="281" y="85" width="14" height="135" fill="#F4E9D7" stroke="#C69C54" stroke-width="2"/><polygon points="64,85 72,62 80,85" fill="#C69C54"/><polygon points="280,85 288,62 296,85" fill="#C69C54"/><line x1="180" y1="88" x2="180" y2="112" stroke="#C69C54" stroke-width="3"/>',
      pasargede: '<rect x="155" y="75" width="50" height="145" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/><polygon points="145,75 180,45 215,75" fill="#C69C54"/><circle cx="180" cy="108" r="16" fill="#14302B" stroke="#C69C54" stroke-width="3"/><rect x="55" y="155" width="95" height="65" fill="#1F4A42" stroke="#C69C54" stroke-width="2"/><rect x="210" y="155" width="95" height="65" fill="#1F4A42" stroke="#C69C54" stroke-width="2"/>',
      triwindu: '<rect x="70" y="120" width="220" height="100" rx="8" fill="#1F4A42" stroke="#C69C54" stroke-width="2.5"/><circle cx="120" cy="168" r="24" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/><circle cx="180" cy="168" r="24" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/><circle cx="240" cy="168" r="24" fill="#F4E9D7" stroke="#C69C54" stroke-width="3"/><polygon points="105,120 180,75 255,120" fill="#C69C54"/>',
      museum: '<rect x="65" y="140" width="230" height="80" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/><polygon points="45,140 180,78 315,140" fill="#14302B" stroke="#C69C54" stroke-width="3"/><path d="M148,220 L148,172 A32,32 0 0,1 212,172 L212,220 Z" fill="#1F4A42" stroke="#C69C54" stroke-width="2.5"/>',
      tjolomadoe: '<rect x="55" y="145" width="250" height="75" fill="#F4E9D7" stroke="#C69C54" stroke-width="2.5"/><rect x="110" y="62" width="22" height="83" fill="#8A662C"/><rect x="228" y="80" width="18" height="65" fill="#8A662C"/><path d="M145,220 L145,175 A35,35 0 0,1 215,175 L215,220 Z" fill="#14302B" stroke="#C69C54" stroke-width="2"/>',
    };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 280"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#14302B"/><stop offset="70%" stop-color="#1F4A42"/><stop offset="100%" stop-color="#0E231F"/></linearGradient></defs><rect width="360" height="280" fill="url(#bg)"/><circle cx="180" cy="110" r="95" fill="#C69C54" opacity="0.14"/>${motifs[motif] || motifs.pendopo}<rect x="0" y="232" width="360" height="48" fill="#14302B" opacity="0.9"/><text x="180" y="261" text-anchor="middle" fill="#F4E9D7" font-family="Montserrat, Arial, sans-serif" font-size="13" font-weight="700">${title.replace(/&/g, '&amp;')}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  const I18N = {
    en: {
      journeyMap: 'Journey Map',
      mode2d: '2D Mode',
      mode3d: 'Silhouette 3D',
      heroTag: '01 / 09 · INTERACTIVE 3D JOURNEY',
      skipIntro: 'Skip Intro',
      welcomeScript: 'Welcome to Solo',
      themeBadge: 'Event Theme · DRAFT',
      datesLabel: '7–9 May 2027 · International Conference & Workshop',
      venueBadge: 'Venue: Hotel Alila Solo',
      exploreCta: 'EXPLORE IOMU 2027 ↓',
      infoCta: 'VIEW EVENT INFORMATION',
      welcomeMsgBadge: 'Welcome Message',
      photoTba: 'Photo TBA',
      aboutTag: '02 / 09 · Welcome to Surakarta — The Heritage City',
      aboutScript: 'Heritage City',
      aboutHeading: 'Journey Through Solo',
      aboutBody: 'As the ceremonial Gunungan parts, travel along a stylized 3D silhouette corridor inspired by Surakarta (Solo) — a Javanese royal city renowned for living batik heritage, timeless pendopo architecture, and warm scholarly hospitality.',
      aboutLandmarksTitle: 'Interactive Solo Landmarks (Stylized 3D Interpretations)',
      grandEventScript: 'Grand Event',
      grandEventHeading: 'KNOW MORE ABOUT OUR GRAND EVENT',
      confScript: 'The Conference',
      confTag: '03 / 09 · Discover IOMU 2027',
      confHeading: 'Connecting Global Evidence with Local Impact',
      confBody: 'Hosted at Hotel Alila Solo, IOMU 2027 convenes occupational medicine physicians, researchers, and workplace health practitioners in Surakarta to strengthen scientific exchange, clinical standards, and professional collaboration.',
      confPhotoBadge: 'Community in Heritage Attire',
      confPhotoNote: 'Official Venue: Hotel Alila Solo · Accreditation details remain To Be Announced until official release.',
      confPhotoCaption: 'Official IOMU Community Documentation · May 7–9, 2027 · Hotel Alila Solo, Surakarta',
      wsScript: 'Scientific Zone',
      wsTag: '04 / 09 · Interactive Conference & Workshop Pavilions',
      wsHeading: 'Scientific Conference & Workshops',
      wsDesc: 'Explore the four program information categories in the 3D conference plaza at Hotel Alila Solo. All entries reflect current draft/coming-soon status until official Scientific Committee confirmation.',
      wsPavilionHint: '3D Pavilion · Focus Camera',
      statusPrefix: 'Status',
      dateLabel: 'Date',
      timeLabel: 'Time',
      speakerLabel: 'Speaker',
      roomLabel: 'Venue & Room',
      spScript: 'Distinguished Faculty',
      spTag: '05 / 09 · Speaker Exhibition Colonnade',
      spHeading: 'Speakers & Experts',
      spDesc: 'Featuring two dedicated speaker lineups: <strong>15 Workshop Faculty</strong> and <strong>42 Conference Speakers</strong>. Confirmed names and portraits will appear upon Scientific Committee release.',
      spSearchPlaceholder: 'Filter by role or topic...',
      wsListTitle: '1. Workshop Speakers',
      wsListSub: 'Clinical & practical hands-on workshop instructors (Photo · Name · Position/Role)',
      wsBadge: 'Workshop Track · To Be Announced',
      confListTitle: '2. Conference Speakers',
      confListSub: 'Keynote, plenary & international symposium faculty (Photo · Name · Position/Role)',
      showCompact: 'Show Compact Grid (12)',
      showAllPrefix: 'Show All',
      confSpeakersSuffix: 'Conference Speakers',
      agScript: 'Three-Day Journey',
      agTag: '06 / 09 · Golden Event Timeline',
      agHeading: 'Conference Agenda',
      agLocationPrefix: 'Venue',
      exScript: 'Explore Solo',
      exTag: '07 / 09 · Experience Surakarta — Heritage & Stories',
      exHeading: 'Iconic Destinations & Cultural Stories of Surakarta',
      exDesc: 'Discover the history, royal architecture, batik craftsmanship, culinary gems, and creative spaces across Solo. Click any destination card to read the full story or open Google Maps.',
      exVenueBadge: 'Conference Venue: Hotel Alila Solo',
      readStory: 'Read Story',
      openMap: 'Map',
      googlePhotos: 'Google Photos',
      menuBtn: 'Menu',
      accScript: 'Stay in Solo',
      accTag: '08 / 09 · Official Venue & Accommodation',
      accHeading: 'Conference Venue & Accommodation',
      accDesc: 'IOMU 2027 is centered at <strong>Hotel Alila Solo</strong> along Slamet Riyadi Boulevard, supported by curated alternative hotels across Surakarta.',
      focusAlilaBtn: 'Focus 3D Alila Tower',
      inspectDetails: 'Inspect Details',
      viewGoogleMaps: 'View on Google Maps',
      highlightsTitle: 'Property & Venue Highlights',
      altHotelsTitle: 'Nearby Alternative Hotels Around Surakarta',
      altHotelsSub: 'Convenient partner and nearby hotels along Slamet Riyadi, Laweyan, Purwosari, and Banjarsari.',
      detailsBtn: 'Details →',
      regScript: 'Join the Journey',
      regTag: '09 / 09 · Registration Gateway',
      regHeading: 'BE PART OF IOMU 2027',
      regSub: 'JOIN THE JOURNEY · MAY 7–9, 2027 · HOTEL ALILA SOLO, SURAKARTA',
      regBannerTitle: 'Registration Information Coming Soon',
      regBannerDesc: 'Online participant registration and payment remain intentionally inactive until a backend endpoint is configured.',
      regPreviewBadge: 'Preview Ready',
      regNameLabel: 'Full Name & Titles',
      regEmailLabel: 'Email Address',
      regCategoryLabel: 'Participant Category',
      regWorkshopLabel: 'Workshop Track',
      regBackendStatus: 'Backend Status: Disabled (Registration Information Coming Soon)',
      regSubmit: 'REGISTER NOW →',
      regNoticeMsg: 'Registration Information Coming Soon. No live backend is configured yet; form preview validated locally without transmitting data.',
      mapScript: 'Solo Route',
      mapHeading: 'Interactive Journey Map — IOMU 2027',
      returnJourney: 'Return to Scroll Journey',
      openMapDirections: 'Open Map Directions',
      culturalHighlight: 'Cultural Highlight',
      visitorTip: 'Visitor Cultural Tip',
      areaLabel: 'Area',
      programEntries: 'Program Information Entries',
      roleTrackLabel: 'Role / Position Track',
      titlesLabel: 'Academic & Professional Titles',
      institutionLabel: 'Institution',
      presentationLabel: 'Presentation Title',
      bioLabel: 'Biography',
      footerVenue: 'Venue: Hotel Alila Solo',
      allFilter: 'All',
    },
    id: {
      journeyMap: 'Peta Rute',
      mode2d: 'Mode 2D',
      mode3d: 'Siluet 3D',
      heroTag: '01 / 09 · PERJALANAN 3D INTERAKTIF',
      skipIntro: 'Lewati Intro',
      welcomeScript: 'Selamat Datang',
      themeBadge: 'Tema Acara · DRAF',
      datesLabel: '7–9 Mei 2027 · Konferensi & Workshop Internasional',
      venueBadge: 'Lokasi Acara: Hotel Alila Solo',
      exploreCta: 'JELAJAHI IOMU 2027 ↓',
      infoCta: 'LIHAT INFORMASI ACARA',
      welcomeMsgBadge: 'Sambutan Resmi',
      photoTba: 'Foto Segera Hadir',
      aboutTag: '02 / 09 · Selamat Datang di Surakarta — Kota Pusaka',
      aboutScript: 'Kota Pusaka',
      aboutHeading: 'Menjelajahi Solo',
      aboutBody: 'Saat Gunungan pembuka tersibak, telusuri koridor siluet 3D bergaya arsitektur Surakarta (Solo) — kota budaya Jawa yang terkenal dengan warisan batik, pendopo anggun, dan keramahtamahan ilmiah.',
      aboutLandmarksTitle: 'Landmark Solo Interaktif (Interpretasi Siluet 3D)',
      grandEventScript: 'Acara Utama',
      grandEventHeading: 'KNOW MORE ABOUT OUR GRAND EVENT',
      confScript: 'Konferensi',
      confTag: '03 / 09 · Mengenal IOMU 2027',
      confHeading: 'Menghubungkan Bukti Global dengan Dampak Lokal',
      confBody: 'Bertempat di Hotel Alila Solo, IOMU 2027 mempertemukan dokter spesialis kedokteran okupasi, peneliti, dan praktisi kesehatan kerja di Surakarta untuk memperkuat pertukaran ilmiah dan kolaborasi profesional.',
      confPhotoBadge: 'Komunitas dalam Busana Adat',
      confPhotoNote: 'Lokasi Resmi: Hotel Alila Solo · Detail akreditasi/SKP akan diumumkan resmi kemudian.',
      confPhotoCaption: 'Dokumentasi Resmi Komunitas IOMU · 7–9 Mei 2027 · Hotel Alila Solo, Surakarta',
      wsScript: 'Zona Ilmiah',
      wsTag: '04 / 09 · Paviliun Konferensi Ilmiah & Workshop Interaktif',
      wsHeading: 'Konferensi Ilmiah & Workshop',
      wsDesc: 'Jelajahi empat kategori program di plaza konferensi 3D Hotel Alila Solo. Seluruh entri saat ini berstatus Draf / Segera Hadir hingga konfirmasi resmi Komite Ilmiah.',
      wsPavilionHint: 'Paviliun 3D · Fokus Kamera',
      statusPrefix: 'Status',
      dateLabel: 'Tanggal',
      timeLabel: 'Waktu',
      speakerLabel: 'Pembicara',
      roomLabel: 'Lokasi & Ruangan',
      spScript: 'Jajaran Pakar',
      spTag: '05 / 09 · Galeri Pameran Pembicara',
      spHeading: 'Pembicara & Pakar',
      spDesc: 'Menampilkan dua deretan narasumber: <strong>15 Instruktur Workshop</strong> dan <strong>42 Pembicara Konferensi</strong>. Nama serta foto resmi akan diperbarui setelah konfirmasi Komite Ilmiah.',
      spSearchPlaceholder: 'Cari jabatan atau topik...',
      wsListTitle: '1. Pembicara Workshop',
      wsListSub: 'Instruktur praktik klinis & teknis workshop (Foto · Nama · Jabatan/Peran)',
      wsBadge: 'Jalur Workshop · Akan Diumumkan',
      confListTitle: '2. Pembicara Konferensi',
      confListSub: 'Keynote, pleno & pembicara simposium internasional (Foto · Nama · Jabatan/Peran)',
      showCompact: 'Tampilkan Ringkas (12)',
      showAllPrefix: 'Tampilkan Semua',
      confSpeakersSuffix: 'Pembicara Konferensi',
      agScript: 'Perjalanan Tiga Hari',
      agTag: '06 / 09 · Linimasa Acara Emas',
      agHeading: 'Agenda Konferensi',
      agLocationPrefix: 'Lokasi',
      exScript: 'Jelajah Solo',
      exTag: '07 / 09 · Menjelajahi Surakarta — Destinasi & Cerita',
      exHeading: 'Destinasi Ikonik & Narasi Budaya Surakarta',
      exDesc: 'Temukan kisah sejarah, arsitektur keraton, kampung batik, pasar bersejarah, hingga ruang kreatif kota Solo. Klik kartu destinasi untuk membaca narasi lengkap atau membuka peta lokasi.',
      exVenueBadge: 'Lokasi Konferensi: Hotel Alila Solo',
      readStory: 'Baca Cerita',
      openMap: 'Peta',
      googlePhotos: 'Foto Google',
      menuBtn: 'Menu',
      accScript: 'Menginap di Solo',
      accTag: '08 / 09 · Venue Resmi & Akomodasi',
      accHeading: 'Venue & Akomodasi Konferensi',
      accDesc: 'Akomodasi utama sekaligus lokasi kegiatan dipusatkan di <strong>Hotel Alila Solo</strong> di koridor Jl. Slamet Riyadi, dilengkapi pilihan hotel alternatif sekitar Surakarta.',
      focusAlilaBtn: 'Fokus Menara 3D Alila',
      inspectDetails: 'Lihat Detail',
      viewGoogleMaps: 'Buka di Google Maps',
      highlightsTitle: 'Keunggulan Venue & Fasilitas',
      altHotelsTitle: 'Pilihan Hotel Alternatif di Sekitar Surakarta',
      altHotelsSub: 'Rekomendasi hotel sekitar di koridor Jl. Slamet Riyadi, Laweyan, Purwosari, dan Banjarsari.',
      detailsBtn: 'Detail →',
      regScript: 'Mari Bergabung',
      regTag: '09 / 09 · Gerbang Registrasi',
      regHeading: 'JADI BAGIAN DARI IOMU 2027',
      regSub: 'BERGABUNG DALAM PERJALANAN · 7–9 MEI 2027 · HOTEL ALILA SOLO, SURAKARTA',
      regBannerTitle: 'Informasi Registrasi Segera Hadir',
      regBannerDesc: 'Pendaftaran peserta dan pembayaran daring belum diaktifkan hingga sistem backend registrasi resmi terhubung.',
      regPreviewBadge: 'Mode Pratinjau',
      regNameLabel: 'Nama Lengkap & Gelar',
      regEmailLabel: 'Alamat Email',
      regCategoryLabel: 'Kategori Peserta',
      regWorkshopLabel: 'Pilihan Jalur Workshop',
      regBackendStatus: 'Status Backend: Nonaktif (Informasi Registrasi Segera Hadir)',
      regSubmit: 'DAFTAR SEKARANG →',
      regNoticeMsg: 'Informasi Registrasi Segera Hadir. Backend registrasi belum diaktifkan; pratinjau formulir divalidasi secara lokal tanpa mengirim data.',
      mapScript: 'Rute Solo',
      mapHeading: 'Peta Perjalanan Interaktif — IOMU 2027',
      returnJourney: 'Kembali ke Perjalanan',
      openMapDirections: 'Buka Petunjuk Peta',
      culturalHighlight: 'Sorotan Budaya',
      visitorTip: 'Tips Kunjungan',
      areaLabel: 'Kawasan',
      programEntries: 'Entri Informasi Program',
      roleTrackLabel: 'Jabatan / Peran Sesi',
      titlesLabel: 'Gelar Akademik & Profesi',
      institutionLabel: 'Institusi',
      presentationLabel: 'Judul Presentasi',
      bioLabel: 'Biografi',
      footerVenue: 'Lokasi Acara: Hotel Alila Solo',
      allFilter: 'Semua',
    },
  };

  const WORKSHOP_ROLES = [
    { en: 'Workshop Lead — Clinical Occupational Medicine', id: 'Ketua Workshop — Kedokteran Okupasi Klinis' },
    { en: 'Instructor — Workplace Ergonomics & Musculoskeletal Assessment', id: 'Instruktur — Ergonomi Kerja & Penilaian Muskuloskeletal' },
    { en: 'Lead Facilitator — Occupational Spirometry & Respiratory Care', id: 'Fasilitator Utama — Spirometri Okupasi & Respirasi Kerja' },
    { en: 'Faculty — Occupational Audiometry & Hearing Conservation', id: 'Pengajar — Audiometri Kerja & Konservasi Pendengaran' },
    { en: 'Instructor — Return-to-Work & Functional Capacity Evaluation', id: 'Instruktur — Kembali Bekerja & Evaluasi Kapasitas Fungsional' },
    { en: 'Lead Trainer — Occupational Toxicology & Biomonitoring', id: 'Pelatih Utama — Toksikologi Okupasi & Biomonitoring' },
    { en: 'Facilitator — Fitness-for-Work in High-Risk Industries', id: 'Fasilitator — Penilaian Kelaikan Kerja Industri Berisiko Tinggi' },
    { en: 'Faculty — Occupational Mental Health & Psychosocial Risk', id: 'Pengajar — Kesehatan Jiwa Kerja & Risiko Psikososial' },
    { en: 'Instructor — Industrial Hygiene & Exposure Risk Mapping', id: 'Instruktur — Higiene Industri & Pemetaan Pajanan' },
    { en: 'Trainer — Occupational Dermatology Clinical Practice', id: 'Pelatih — Praktik Klinis Dermatologi Akibat Kerja' },
    { en: 'Facilitator — Heat Stress & Climate-Resilient Workplaces', id: 'Fasilitator — Tekanan Panas & Tempat Kerja Tangguh Iklim' },
    { en: 'Lead — Emergency Medical Response in Industrial Sites', id: 'Pemimpin Sesi — Tanggap Darurat Medis Lokasi Industri' },
    { en: 'Instructor — Medical Surveillance Data & Health Analytics', id: 'Instruktur — Surveilans Medis & Analitik Kesehatan Kerja' },
    { en: 'Faculty — Shift Work, Fatigue Risk & Circadian Health', id: 'Pengajar — Kerja Shift, Kelelahan & Kesehatan Sirkadian' },
    { en: 'Mentor — Occupational Disease Causation & Disability Grading', id: 'Mentor — Diagnosis Penyakit Akibat Kerja & Penilaian Kecacatan' },
  ];

  const CONFERENCE_ROLES = [
    { en: 'Keynote Speaker — Global Occupational Health Policy', id: 'Pembicara Kunci — Kebijakan Kesehatan Kerja Global' },
    { en: 'Keynote Speaker — Sustainable & Resilient Workforces', id: 'Pembicara Kunci — Tenaga Kerja Sehat & Berkelanjutan' },
    { en: 'Plenary Speaker — Occupational Medicine Updates', id: 'Pembicara Pleno — Pembaruan Kedokteran Okupasi' },
    { en: 'International Guest Lecturer — Evidence-Based Practice', id: 'Dosen Tamu Internasional — Praktik Berbasis Bukti' },
    { en: 'Plenary Faculty — Workplace Preventive Standards', id: 'Pembicara Pleno — Standar Preventif Tempat Kerja' },
    { en: 'Symposium Speaker — Industrial Toxicology', id: 'Pembicara Simposium — Toksikologi Industri' },
    { en: 'Symposium Speaker — Occupational Respiratory Diseases', id: 'Pembicara Simposium — Penyakit Paru Akibat Kerja' },
    { en: 'Symposium Speaker — Ergonomics & Future of Work', id: 'Pembicara Simposium — Ergonomi & Masa Depan Kerja' },
    { en: 'Symposium Speaker — Mental Health at the Workplace', id: 'Pembicara Simposium — Kesehatan Mental di Tempat Kerja' },
    { en: 'Symposium Speaker — Return-to-Work Frameworks', id: 'Pembicara Simposium — Kerangka Kembali Bekerja' },
  ];

  const GALLERY_COORDS = [
    [-9.0, 0, -140],
    [9.0, 0, -143],
    [-9.0, 0, -149],
    [9.0, 0, -152],
    [-9.0, 0, -158],
    [9.0, 0, -161],
  ];

  const WORKSHOP_SPEAKERS = WORKSHOP_ROLES.map((role, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const coord = GALLERY_COORDS[idx % GALLERY_COORDS.length];
    return {
      id: `workshop-speaker-${num}`,
      track: 'workshop',
      slotLabel: { en: `Workshop Faculty ${num}`, id: `Instruktur Workshop ${num}` },
      fullName: { en: 'To Be Announced', id: 'Akan Diumumkan' },
      titles: { en: 'Academic & Specialist Titles — TBA', id: 'Gelar Akademik & Spesialis — TBA' },
      positionTitle: role,
      institution: { en: 'Institution To Be Announced', id: 'Institusi Akan Diumumkan' },
      presentationTitle: { en: 'Workshop Session Topic To Be Announced', id: 'Topik Sesi Workshop Akan Diumumkan' },
      biography: {
        en: 'Confirmed workshop instructor portrait, full name, institutional affiliation, and session outline will be published upon Scientific Committee confirmation.',
        id: 'Foto, nama lengkap, afiliasi institusi, dan ringkasan materi instruktur workshop akan dipublikasikan setelah konfirmasi resmi Komite Ilmiah.',
      },
      status: 'Coming Soon',
      position: coord,
      cameraFocusPos: [coord[0] < 0 ? -3.5 : 3.5, 3.2, coord[2] + 6],
      cameraLookAt: [coord[0], 2.3, coord[2]],
    };
  });

  const CONFERENCE_SPEAKERS = Array.from({ length: 42 }, (_, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const baseRole = CONFERENCE_ROLES[idx % CONFERENCE_ROLES.length];
    const panelNum = Math.floor(idx / CONFERENCE_ROLES.length) + 1;
    const role = {
      en: baseRole.en + (idx >= CONFERENCE_ROLES.length ? ` (Panel ${panelNum})` : ''),
      id: baseRole.id + (idx >= CONFERENCE_ROLES.length ? ` (Panel ${panelNum})` : ''),
    };
    const coord = GALLERY_COORDS[idx % GALLERY_COORDS.length];
    return {
      id: `conf-speaker-${num}`,
      track: 'conference',
      slotLabel: { en: `Conference Speaker ${num}`, id: `Pembicara Konferensi ${num}` },
      fullName: { en: 'To Be Announced', id: 'Akan Diumumkan' },
      titles: { en: 'Academic & Professional Titles — TBA', id: 'Gelar Akademik & Profesi — TBA' },
      positionTitle: role,
      institution: { en: 'Institution To Be Announced', id: 'Institusi Akan Diumumkan' },
      presentationTitle: { en: 'Conference Lecture Topic To Be Announced', id: 'Topik Kuliah Konferensi Akan Diumumkan' },
      biography: {
        en: 'Confirmed conference speaker identity, academic title, photo, and abstract details will be announced by the IOMU 2027 Scientific Committee.',
        id: 'Identitas resmi pembicara konferensi, gelar akademik, foto, dan abstrak akan diumumkan oleh Komite Ilmiah IOMU 2027.',
      },
      status: 'Coming Soon',
      position: coord,
      cameraFocusPos: [coord[0] < 0 ? -3.5 : 3.5, 3.2, coord[2] + 6],
      cameraLookAt: [coord[0], 2.3, coord[2]],
    };
  });

  const EVENT_DATA = {
    shortName: 'IOMU 2027',
    fullName: 'IOMU 2027 — The 19th Indonesian Occupational Medicine Updates',
    eventType: 'International Conference & Workshop',
    dates: 'May 7–9, 2027',
    datesDisplay: '7–9 May 2027',
    city: 'Surakarta (Solo), Central Java, Indonesia',
    cityShort: 'Surakarta, Solo',
    venue: 'Hotel Alila Solo',
    theme: 'From Global Evidence to Local Impact: Advancing Occupational Medicine for Healthy, Resilient, and Sustainable Workforces',
    socials: [
      { platform: 'Instagram', handle: '@iomu.official', url: 'https://instagram.com/iomu.official' },
      { platform: 'LinkedIn', handle: 'IOMUIndonesia', url: 'https://linkedin.com' },
      { platform: 'Facebook', handle: 'IOMUPerdoki', url: 'https://facebook.com' },
      { platform: 'Website', handle: 'iomu.perdoki.or.id', url: 'https://iomu.perdoki.or.id' },
    ],
    hashtags: ['#IOMU2027', '#IOMUSolo', '#PERDOKI', '#OccupationalMedicine'],
    participantCategories: [
      { en: 'Occupational Medicine Specialist (Sp.Ok / PERDOKI Member)', id: 'Dokter Spesialis Okupasi (Sp.Ok / Anggota PERDOKI)' },
      { en: 'General Practitioner / Company Physician', id: 'Dokter Umum / Dokter Perusahaan' },
      { en: 'Occupational Health & Safety Professional', id: 'Profesional Keselamatan & Kesehatan Kerja (K3)' },
      { en: 'International Delegate', id: 'Delegasi Internasional' },
      { en: 'Resident / Postgraduate Student', id: 'Residen / Mahasiswa Pascasarjana' },
    ],
    workshopTracks: [
      { en: 'Track A — Clinical Occupational Medicine Updates (To Be Announced)', id: 'Jalur A — Pembaruan Kedokteran Okupasi Klinis (TBA)' },
      { en: 'Track B — Workplace Risk & Ergonomics Workshop (To Be Announced)', id: 'Jalur B — Workshop Risiko Kerja & Ergonomi (TBA)' },
      { en: 'Track C — Return-to-Work & Disability Assessment (To Be Announced)', id: 'Jalur C — Penilaian Kembali Bekerja & Kecacatan (TBA)' },
    ],
    welcomeMessages: [
      {
        id: 'welcome-oc',
        role: { en: 'Chairperson of the Organizing Committee', id: 'Ketua Panitia Pelaksana (Organizing Committee)' },
        organization: { en: 'IOMU 2027 Organizing Committee · Hotel Alila Solo', id: 'Panitia Pelaksana IOMU 2027 · Hotel Alila Solo' },
        name: { en: 'Chairperson of the Organizing Committee (To Be Announced)', id: 'Ketua Panitia Pelaksana (Akan Diumumkan)' },
        greeting: { en: 'Warmest greetings from Surakarta (Solo).', id: 'Salam hangat dari kota budaya Surakarta (Solo).' },
        paragraphs: {
          en: [
            'It is an honor to invite occupational medicine specialists, clinicians, researchers, and workplace health practitioners to the 19th Indonesian Occupational Medicine Updates (IOMU 2027) at Hotel Alila Solo on May 7–9, 2027.',
            'Inspired by Surakarta’s enduring spirit of hospitality and balance, we are designing an immersive international conference and workshop experience uniting rigorous clinical updates with practical workplace solutions.',
          ],
          id: [
            'Merupakan kehormatan bagi kami untuk mengundang para dokter spesialis kedokteran okupasi, klinisi, peneliti, dan praktisi kesehatan kerja dalam pertemuan ilmiah ke-19 Indonesian Occupational Medicine Updates (IOMU 2027) di Hotel Alila Solo pada 7–9 Mei 2027.',
            'Terinspirasi oleh kehangatan dan keseimbangan budaya Surakarta, kami merancang konferensi serta workshop internasional yang memadukan pembaruan klinis mendalam dengan solusi praktis di tempat kerja.',
          ],
        },
        closing: { en: 'We look forward to welcoming you to Solo in May 2027.', id: 'Sampai jumpa di Surakarta pada Mei 2027.' },
      },
      {
        id: 'welcome-ioma',
        role: { en: 'Chairperson of the Indonesian Occupational Medicine Association (IOMA)', id: 'Ketua Perhimpunan Spesialis Kedokteran Okupasi Indonesia (PERDOKI / IOMA)' },
        organization: { en: 'Indonesian Occupational Medicine Association (IOMA / PERDOKI)', id: 'Perhimpunan Spesialis Kedokteran Okupasi Indonesia (IOMA / PERDOKI)' },
        name: { en: 'Chairperson of IOMA / PERDOKI (To Be Announced)', id: 'Ketua Umum IOMA / PERDOKI (Akan Diumumkan)' },
        greeting: { en: 'Distinguished colleagues and partners in occupational health,', id: 'Rekan sejawat dan mitra kesehatan kerja yang terhormat,' },
        paragraphs: {
          en: [
            'Guided by our draft theme, "From Global Evidence to Local Impact: Advancing Occupational Medicine for Healthy, Resilient, and Sustainable Workforces", IOMU 2027 marks an important milestone in translating international scientific standards into practical worker protection.',
            'Together with national and global experts across our plenary symposia and specialized workshops at Hotel Alila Solo, let us strengthen collaboration and preventive occupational health leadership.',
          ],
          id: [
            'Dipandu tema draf "From Global Evidence to Local Impact: Advancing Occupational Medicine for Healthy, Resilient, and Sustainable Workforces", IOMU 2027 menjadi tonggak penting penerjemahan bukti ilmiah global menjadi perlindungan nyata bagi pekerja Indonesia.',
            'Bersama para pakar nasional dan internasional di Hotel Alila Solo, mari perkuat kolaborasi, keunggulan ilmiah, dan kepemimpinan kedokteran okupasi preventif.',
          ],
        },
        closing: { en: 'Welcome to IOMU 2027 — Surakarta, Central Java.', id: 'Selamat datang di IOMU 2027 — Surakarta, Jawa Tengah.' },
      },
    ],
    grandEventSections: [
      {
        title: { en: 'What do we do?', id: 'What do we do? · Apa yang Kami Lakukan?' },
        subtitle: { en: 'Scientific Updates & Clinical Practice', id: 'Pembaruan Ilmiah & Praktik Klinis' },
        description: {
          en: 'We convene multidisciplinary symposia, evidence-based occupational medicine updates, hands-on practitioner workshops, and peer-reviewed research presentations that equip physicians and OHS teams to safeguard worker health across evolving industries.',
          id: 'Kami menyelenggarakan simposium multidisiplin, pembaruan kedokteran okupasi berbasis bukti, workshop praktik klinis langsung, serta presentasi riset ilmiah untuk membekali dokter dan tim K3 menjaga kesehatan pekerja di berbagai sektor industri.',
        },
      },
      {
        title: { en: 'What are we?', id: 'What are we? · Siapa Kami?' },
        subtitle: { en: '19th Annual Occupational Medicine Forum', id: 'Forum Kedokteran Okupasi Tahunan ke-19' },
        description: {
          en: 'IOMU 2027 is the 19th Indonesian Occupational Medicine Updates — an international conference and workshop organized under the Indonesian Occupational Medicine Association (IOMA / PERDOKI) in collaboration with IDI.',
          id: 'IOMU 2027 adalah penyelenggaraan ke-19 Indonesian Occupational Medicine Updates — konferensi dan workshop internasional di bawah Perhimpunan Spesialis Kedokteran Okupasi Indonesia (IOMA / PERDOKI) bekerja sama dengan IDI.',
        },
      },
      {
        title: { en: 'Our aim & mission', id: 'Our aim & mission · Tujuan & Misi Kami' },
        subtitle: { en: 'From Global Evidence to Local Impact', id: 'Dari Bukti Global Menuju Dampak Lokal' },
        description: {
          en: 'Our mission is to bridge international occupational health research with actionable workplace implementation — fostering healthy, resilient, and sustainable workforces through lifelong clinical learning and cross-sector dialogue.',
          id: 'Misi kami adalah menjembatani riset kesehatan kerja internasional dengan implementasi nyata di tempat kerja — mewujudkan tenaga kerja yang sehat, tangguh, dan berkelanjutan melalui pembelajaran berkelanjutan dan dialog lintas sektor.',
        },
      },
      {
        title: { en: 'About our event', id: 'About our event · Tentang Acara Kami' },
        subtitle: { en: 'May 7–9, 2027 · Hotel Alila Solo', id: '7–9 Mei 2027 · Hotel Alila Solo' },
        description: {
          en: 'Hosted at Hotel Alila Solo, Surakarta across three dedicated days (May 7–9, 2027), IOMU 2027 brings together ~15 workshop faculty and 40+ conference speakers where modern occupational science meets royal Javanese heritage.',
          id: 'Diselenggarakan di Hotel Alila Solo, Surakarta selama tiga hari penuh (7–9 Mei 2027), IOMU 2027 menghadirkan ~15 instruktur workshop dan 40+ pembicara konferensi dalam perpaduan ilmu kedokteran okupasi modern dan keanggunan budaya Jawa.',
        },
      },
    ],
    chapters: [
      { index: 1, code: '01 / 09', id: 'home', menuLabel: { en: 'Home', id: 'Beranda' }, title: { en: 'Welcome to Solo', id: 'Selamat Datang di Solo' }, subtitle: { en: 'Opening Gunungan & Chairperson Welcomes', id: 'Gerbang Gunungan & Sambutan Pimpinan' }, progressStart: 0.0, progressEnd: 0.11 },
      { index: 2, code: '02 / 09', id: 'about', menuLabel: { en: 'About', id: 'Tentang' }, title: { en: 'Journey Through Solo', id: 'Menjelajahi Solo' }, subtitle: { en: 'Know More About Our Grand Event', id: 'Kenali Lebih Dekat Acara Kami' }, progressStart: 0.11, progressEnd: 0.22 },
      { index: 3, code: '03 / 09', id: 'conference', menuLabel: { en: 'Conference', id: 'Konferensi' }, title: { en: 'Discover IOMU 2027', id: 'Mengenal IOMU 2027' }, subtitle: { en: 'Connecting Global Evidence with Local Impact', id: 'Bukti Global untuk Dampak Lokal' }, progressStart: 0.22, progressEnd: 0.33 },
      { index: 4, code: '04 / 09', id: 'workshops', menuLabel: { en: 'Workshops', id: 'Workshop' }, title: { en: 'Scientific Conference & Workshops', id: 'Konferensi Ilmiah & Workshop' }, subtitle: { en: 'Interactive Knowledge & Skill Pavilions', id: 'Paviliun Pengetahuan & Keterampilan' }, progressStart: 0.33, progressEnd: 0.44 },
      { index: 5, code: '05 / 09', id: 'speakers', menuLabel: { en: 'Speakers', id: 'Pembicara' }, title: { en: 'Speakers & Experts', id: 'Pembicara & Pakar' }, subtitle: { en: '15 Workshop Faculty & 40+ Conference Speakers', id: '15 Instruktur Workshop & 40+ Pembicara' }, progressStart: 0.44, progressEnd: 0.56 },
      { index: 6, code: '06 / 09', id: 'program', menuLabel: { en: 'Program', id: 'Agenda' }, title: { en: 'Conference Agenda', id: 'Agenda Konferensi' }, subtitle: { en: 'Three-Day Golden Scientific Pathway', id: 'Jalur Ilmiah Tiga Hari Acara' }, progressStart: 0.56, progressEnd: 0.67 },
      { index: 7, code: '07 / 09', id: 'explore-solo', menuLabel: 'Explore Solo', menuLabelObj: { en: 'Explore Solo', id: 'Jelajah Solo' }, title: { en: 'Experience Surakarta', id: 'Pesona Surakarta' }, subtitle: { en: 'Heritage Destinations & Cultural Stories', id: 'Destinasi Pusaka & Cerita Budaya' }, progressStart: 0.67, progressEnd: 0.78 },
      { index: 8, code: '08 / 09', id: 'accommodation', menuLabel: { en: 'Accommodation', id: 'Akomodasi' }, title: { en: 'Venue & Accommodation', id: 'Venue & Akomodasi' }, subtitle: { en: 'Hotel Alila Solo & Partner Alternatives', id: 'Hotel Alila Solo & Pilihan Sekitar' }, progressStart: 0.78, progressEnd: 0.89 },
      { index: 9, code: '09 / 09', id: 'registration', menuLabel: { en: 'Registration', id: 'Registrasi' }, title: { en: 'Be Part of IOMU 2027', id: 'Jadi Bagian IOMU 2027' }, subtitle: { en: 'Join the Journey at Hotel Alila Solo', id: 'Bergabung di Hotel Alila Solo' }, progressStart: 0.89, progressEnd: 1.01 },
    ],
    landmarks: [
      { id: 'gapura-gladag', name: 'Gapura Gladag', sublabel: 'Gateway', category: { en: 'Royal Ceremonial Gateway', id: 'Gerbang Kehormatan Kota' }, stylizedNote: { en: 'Stylized 3D silhouette interpretation inspired by Surakarta city landmarks.', id: 'Interpretasi siluet 3D bergaya arsitektur landmark Surakarta.' }, description: { en: 'Standing along Slamet Riyadi Boulevard as the historic ceremonial entrance toward the royal quarter, Gapura Gladag welcomes visitors entering the cultural heart of Surakarta.', id: 'Berdiri megah di koridor Jl. Slamet Riyadi sebagai gerbang kehormatan menuju kawasan keraton, Gapura Gladag menyambut setiap tamu yang memasuki jantung budaya Surakarta.' }, culturalHighlight: { en: 'Twin ceremonial pillars crowned with traditional Javanese gable silhouettes.', id: 'Pilar kembar dengan mahkota ornamen klasik Jawa.' }, position: [0, 0, 4], pinOffset: [0, 6.9, 0], cameraFocusPos: [4.8, 3.8, 12.5], cameraLookAt: [0, 2.5, 4], mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gapura+Gladag+Surakarta', photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kraton_Surakarta.jpg?width=900', fallbackPhoto: createHeritageIllustrationDataUri('Gapura Gladag', 'pendopo'), photoCredit: 'Referensi Visual Kawasan Keraton & Gladag Surakarta (Wikimedia Commons)', chapterId: 'about' },
      { id: 'tugu-jam-pasar-gede', name: 'Tugu Jam Pasar Gede', sublabel: 'Landmark', category: { en: 'Historic Clock Tower', id: 'Menara Jam Bersejarah' }, stylizedNote: { en: 'Stylized 3D silhouette interpretation inspired by Pasar Gede Surakarta.', id: 'Interpretasi siluet 3D bergaya arsitektur Pasar Gede Surakarta.' }, description: { en: 'An iconic landmark tower near the historic Pasar Gede Harjonagoro market district, marking the vibrant confluence of Solo commerce, culinary heritage, and colonial-era architecture.', id: 'Menara jam ikonik di persimpangan Pasar Gede Harjonagoro yang menjadi penanda sejarah perdagangan, kuliner legendaris, dan akulturasi arsitektur kota Solo.' }, culturalHighlight: { en: 'Four-sided illuminated clock tower rising above a stepped heritage plinth.', id: 'Menara jam empat sisi di atas landasan bertingkat bersejarah.' }, position: [-9.5, 0, -10], pinOffset: [0, 8.8, 0], cameraFocusPos: [-3.5, 4.4, -3.5], cameraLookAt: [-9.5, 3.6, -10], mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tugu+Jam+Pasar+Gede+Surakarta', photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Gede_Harjonagoro_Surakarta.jpg?width=900', fallbackPhoto: createHeritageIllustrationDataUri('Tugu Jam Pasar Gede', 'pasargede'), photoCredit: 'Foto: Kawasan Pasar Gede Harjonagoro & Tugu Jam Surakarta (Wikimedia Commons, CC BY-SA)', chapterId: 'about' },
      { id: 'keraton-surakarta', name: 'Keraton Surakarta', sublabel: 'Palace Heritage', category: { en: 'Royal Palace Heritage', id: 'Istana Pusaka Kerajaan' }, stylizedNote: { en: 'Stylized 3D silhouette interpretation inspired by Keraton Kasunanan Surakarta.', id: 'Interpretasi siluet 3D bergaya arsitektur Keraton Kasunanan Surakarta.' }, description: { en: 'Representing the enduring architectural philosophy of Keraton Kasunanan Surakarta Hadiningrat, blending serene courtyards, deep Keraton green motifs, and classic tiered Joglo roofs.', id: 'Mewakili filosofi tata ruang Keraton Kasunanan Surakarta Hadiningrat yang memadukan pelataran tenang, nuansa hijau keraton, dan atap Joglo klasik bertingkat.' }, culturalHighlight: { en: 'Layered Javanese Joglo courtyard reflecting cosmic harmony and royal stewardship.', id: 'Pelataran Joglo bertingkat simbol harmoni kosmos dan kebijaksanaan.' }, position: [9.5, 0, -22], pinOffset: [0, 5.4, 0], cameraFocusPos: [3.2, 4.5, -14.5], cameraLookAt: [9.5, 2.2, -22], mapUrl: 'https://www.google.com/maps/search/?api=1&query=Keraton+Surakarta+Hadiningrat', photo: ASSETS.panggungSanggaBuwanaPhoto, fallbackPhoto: createHeritageIllustrationDataUri('Keraton Surakarta', 'pendopo'), photoCredit: 'Foto: Kawasan Keraton Kasunanan Surakarta (Herusutimbul, CC BY-SA 4.0)', chapterId: 'about' },
      { id: 'panggung-sangga-buwana', name: 'Panggung Sangga Buwana', sublabel: 'Photo Available', category: { en: 'Octagonal Royal Tower', id: 'Menara Oktagonal Keraton' }, stylizedNote: { en: 'Stylized 3D model paired with licensed photography (Herusutimbul, CC BY-SA 4.0).', id: 'Model siluet 3D dilengkapi foto berlisensi resmi (Herusutimbul, CC BY-SA 4.0).' }, description: { en: 'The renowned octagonal tower within the Keraton Surakarta compound, celebrated for its distinct multi-level timber balconies, pitched roof, and panoramic watchtower silhouette.', id: 'Menara segi delapan bersejarah di kompleks Keraton Surakarta yang terkenal dengan balkon kayu bertingkat, atap lancip, dan siluet menara pengamatan kota.' }, culturalHighlight: { en: 'Octagonal observation spire bridging Javanese royal tradition and architectural grace.', id: 'Puncak menara oktagonal penghubung tradisi luhur dan keanggunan arsitektur.' }, position: [10.5, 0, -34], pinOffset: [0, 9.7, 0], cameraFocusPos: [4.0, 5.2, -26.0], cameraLookAt: [10.5, 4.0, -34], mapUrl: 'https://www.google.com/maps/search/?api=1&query=Panggung+Sangga+Buwana+Surakarta', photo: ASSETS.panggungSanggaBuwanaPhoto, photoCredit: 'Foto: Panggung Sangga Buwana, Keraton Surakarta. Herusutimbul, CC BY-SA 4.0', chapterId: 'about' },
      { id: 'pendopo-mangkunegaran', name: 'Pendopo Mangkunegaran', sublabel: 'Royal Pavilion', category: { en: 'Grand Royal Pavilion', id: 'Pendopo Agung Praja' }, stylizedNote: { en: 'Stylized 3D silhouette interpretation inspired by Pura Mangkunegaran.', id: 'Interpretasi siluet 3D bergaya arsitektur Pura Mangkunegaran.' }, description: { en: 'An expansive open-air Javanese pendopo famed for its soaring Joglo timber canopy and rhythmic column geometry—an emblem of warm Surakarta hospitality for scholarly gatherings.', id: 'Pendopo terbuka megah kebanggaan Pura Mangkunegaran dengan konstruksi atap Joglo kayu jati dan barisan saka guru yang melambangkan keramahtamahan Surakarta.' }, culturalHighlight: { en: 'Open-plan ceremonial colonnade bathed in warm golden lantern light.', id: 'Kolonade pendopo terbuka bermandikan cahaya lentera emas.' }, position: [-9.5, 0, -36], pinOffset: [0, 5.9, 0], cameraFocusPos: [-3.5, 4.0, -28.0], cameraLookAt: [-9.5, 2.2, -36], mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pura+Mangkunegaran+Surakarta', photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Pendopo,_Mangkunegaran_Palace.jpg?width=900', fallbackPhoto: createHeritageIllustrationDataUri('Pendopo Mangkunegaran', 'pendopo'), photoCredit: 'Foto: Grand Pendopo, Pura Mangkunegaran Surakarta (Wikimedia Commons, CC BY-SA)', chapterId: 'about' },
      { id: 'masjid-raya-sheikh-zayed', name: 'Masjid Raya Sheikh Zayed', sublabel: 'Cultural', category: { en: 'Iconic Cultural & Spiritual Landmark', id: 'Ikon Arsitektur & Spiritual Solo' }, stylizedNote: { en: 'Stylized 3D silhouette interpretation inspired by Masjid Raya Sheikh Zayed Solo.', id: 'Interpretasi siluet 3D bergaya arsitektur Masjid Raya Sheikh Zayed Solo.' }, description: { en: 'A luminous modern architectural landmark in Surakarta distinguished by its sweeping cream domes, four slender minarets, and gold-accented arcades.', id: 'Ikon arsitektur modern kota Surakarta dengan kubah megah putih gading, empat menara menjulang, serta motif batik pada interior karpetnya.' }, culturalHighlight: { en: 'Ivory-cream central dome flanked by four minarets and reflective courtyard pools.', id: 'Kubah utama krem gading diapit empat menara dan kolam refleksi.' }, position: [-9.5, 0, -214], pinOffset: [0, 7.6, 0], cameraFocusPos: [-2.8, 4.8, -205], cameraLookAt: [-9.5, 3.0, -214], mapUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Raya+Sheikh+Zayed+Surakarta', photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Halaman_luar_dari_Masjid_Sheikh_Zayed_Surakarta.jpg?width=900', fallbackPhoto: createHeritageIllustrationDataUri('Masjid Raya Sheikh Zayed', 'mosque'), photoCredit: 'Foto: Masjid Raya Sheikh Zayed Surakarta (Wikimedia Commons, CC BY-SA 4.0)', chapterId: 'explore-solo' },
      { id: 'tugu-pamandengan', name: 'Tugu Pamandengan', sublabel: 'Monument', category: { en: 'Historic City Axis Monument', id: 'Tugu Poros Bersejarah Kota' }, stylizedNote: { en: 'Stylized 3D silhouette interpretation inspired by Tugu Pamandengan Solo.', id: 'Interpretasi siluet 3D bergaya arsitektur Tugu Pamandengan Solo.' }, description: { en: 'A poised obelisk monument situated at the historic zero-point axis facing Keraton Surakarta, symbolizing focus, clarity of vision, and purposeful orientation.', id: 'Monumen obelisk bersejarah di titik nol kota Solo yang menghadap langsung ke Keraton Surakarta, melambangkan kejernihan visi dan arah tujuan.' }, culturalHighlight: { en: 'Slender golden-tipped obelisk standing as a contemplative marker in central Solo.', id: 'Obelisk ramping berpuncak emas sebagai penanda poros pusat kota Solo.' }, position: [8.5, 0, -220], pinOffset: [0, 7.8, 0], cameraFocusPos: [3.0, 3.8, -212], cameraLookAt: [8.5, 2.8, -220], mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tugu+Pamandengan+Surakarta', photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tugu_Pemandengan_Surakarta.jpg?width=900', fallbackPhoto: createHeritageIllustrationDataUri('Tugu Pamandengan', 'pendopo'), photoCredit: 'Foto: Tugu Pamandengan Surakarta (Wikimedia Commons, CC BY-SA)', chapterId: 'explore-solo' },
    ],
    soloDestinations: [
      {
        id: 'dest-keraton',
        name: 'Keraton Kasunanan & Panggung Sangga Buwana',
        category: { en: 'Royal Palace Heritage', id: 'Pusaka Istana Keraton' },
        locationNote: 'Baluwarti, Pasar Kliwon, Surakarta',
        image: ASSETS.panggungSanggaBuwanaPhoto,
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Panggung_Sangga_Buwana.jpg?width=900',
        fallbackImage: ASSETS.panggungSanggaBuwanaPhoto,
        imageCaption: 'Foto: Panggung Sangga Buwana, Keraton Surakarta (Herusutimbul, CC BY-SA 4.0 · Wikimedia Commons)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Keraton+Kasunanan+Surakarta+Panggung+Sangga+Buwana',
        narrativeTitle: { en: 'Cosmological Heart & Royal Observation Tower of Solo', id: 'Jantung Kosmologi & Menara Pengamatan Kerajaan' },
        narrativeStory: {
          en: 'Established by Susuhunan Pakubuwono II in 1745 along the banks of the Bengawan Solo river, Keraton Kasunanan Surakarta unites Javanese cosmological spatial harmony with refined palace architecture. Rising above its courtyard is the octagonal Panggung Sangga Buwana tower (built in 1782), traditionally serving as a royal meditation sanctuary and city watchtower.',
          id: 'Didirikan oleh Susuhunan Pakubuwono II pada tahun 1745 saat pusat Mataram Islam dipindahkan ke tepian Bengawan Solo, Keraton Kasunanan Surakarta memadukan tata ruang filosofis Jawa dengan keanggunan arsitektur tradisional. Di dalamnya menjulang menara oktagonal Panggung Sangga Buwana yang dibangun pada 1782 sebagai tempat semadi raja sekaligus menara pengamatan kota.',
        },
        culturalTip: { en: 'Dress modestly and enjoy a quiet morning walk through the surrounding Baluwarti heritage quarter.', id: 'Kenakan pakaian sopan dan sempatkan menyusuri kawasan Baluwarti yang tenang di pagi hari.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Keraton+Surakarta+Hadiningrat',
      },
      {
        id: 'dest-mangkunegaran',
        name: 'Pura Mangkunegaran & Pendopo Ageng',
        category: { en: 'Duchy Palace & Performing Arts', id: 'Istana Kadipaten & Seni Tari' },
        locationNote: 'Jl. Ronggowarsito, Banjarsari, Surakarta',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Pendopo,_Mangkunegaran_Palace.jpg?width=900',
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pura_Mangkunegaran.jpg?width=900',
        fallbackImage: createHeritageIllustrationDataUri('Pura Mangkunegaran', 'pendopo'),
        imageCaption: 'Foto: Pendopo Ageng Pura Mangkunegaran Surakarta (Wikimedia Commons, CC BY-SA)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Pura+Mangkunegaran+Pendopo+Ageng+Surakarta',
        narrativeTitle: { en: 'Nail-Free Teak Pendopo at Solo’s Cultural Core', id: 'Kemegahan Pendopo Tanpa Paku di Pusat Kebudayaan Solo' },
        narrativeStory: {
          en: 'Founded in 1757 following the Treaty of Salatiga by Raden Mas Said (KGPAA Mangkunegara I), Pura Mangkunegaran showcases the vast teakwood Pendopo Ageng blending Javanese and European craftsmanship. Its painted zodiac ceiling symbolizes cosmic harmony, while the Pracima Tuin royal gardens revive classic Surakarta gastronomy.',
          id: 'Berdiri sejak Perjanjian Salatiga tahun 1757 oleh Raden Mas Said (KGPAA Mangkunegara I), Pura Mangkunegaran menyimpan Pendopo Ageng berkonstruksi kayu jati megah bergaya Jawa-Eropa. Langit-langit pendopo melambangkan harmoni kosmos Jawa, sementara taman Pracima Tuin kini menghadirkan pengalaman kuliner klasik bangsawan Solo.',
        },
        culturalTip: { en: 'Visit from morning to afternoon to see centuries-old dance masks, royal heirlooms, and gamelan ensembles.', id: 'Kunjungi pada pagi hingga sore hari untuk menyaksikan koleksi topeng tari, pusaka, dan gamelan bersejarah.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pura+Mangkunegaran+Surakarta',
      },
      {
        id: 'dest-kampung-batik',
        name: 'Kampung Batik Laweyan & Kauman',
        category: { en: 'Living Batik Heritage', id: 'Kampung Warisan Batik' },
        locationNote: 'Laweyan & Pasar Kliwon, Surakarta',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kampung_Batik_Kauman.jpg?width=900',
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Laweyan.jpg?width=900',
        fallbackImage: createHeritageIllustrationDataUri('Kampung Batik Solo', 'batik'),
        imageCaption: 'Foto: Suasana Lorong Kampung Batik Kauman & Laweyan Solo (Wikimedia Commons, CC BY-SA)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Kampung+Batik+Laweyan+dan+Kauman+Solo',
        narrativeTitle: { en: 'Centuries of Royal Court Patterns & Merchant Alleys', id: 'Jejak Saudagar Batik dan Motif Keraton Sepanjang Zaman' },
        narrativeStory: {
          en: 'Solo preserves two distinct historic batik neighborhoods: Kauman beside the Grand Mosque, celebrated for classical royal court batik, and Laweyan, home to 19th-century merchant mansions behind tall heritage walls. Strolling its artistic lanes reveals artisans crafting hand-drawn canting batik and natural indigo dyeing.',
          id: 'Solo memiliki dua kampung batik bersejarah dengan karakter berbeda: Kauman di dekat Masjid Agung sebagai penyedia batik tulis klasik bergaya keraton, serta Laweyan dengan rumah-rumah saudagar berpagar tinggi sejak era abad ke-19. Di gang-gang sempit yang artistik, pengunjung dapat melihat langsung proses mencanting hingga pewarnaan alam.',
        },
        culturalTip: { en: 'Ideal for a late-afternoon walking tour combined with a hands-on canting batik workshop.', id: 'Cocok untuk wisata jalan kaki sore sembari mengikuti workshop singkat membatik tulis.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kampung+Batik+Laweyan+Surakarta',
      },
      {
        id: 'dest-sheikh-zayed',
        name: 'Masjid Raya Sheikh Zayed Solo',
        category: { en: 'Modern Architectural Landmark', id: 'Ikon Arsitektur Modern' },
        locationNote: 'Gilingan, Banjarsari, Surakarta',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Halaman_luar_dari_Masjid_Sheikh_Zayed_Surakarta.jpg?width=900',
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/MAGHRIB_DI_MASJID_RAYA_SYEIKH_ZAYED,_SOLO.jpg?width=900',
        fallbackImage: createHeritageIllustrationDataUri('Masjid Raya Sheikh Zayed', 'mosque'),
        imageCaption: 'Foto: Eksterior Masjid Raya Sheikh Zayed Surakarta (Wikimedia Commons, CC BY-SA 4.0)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Masjid+Raya+Sheikh+Zayed+Solo+Surakarta',
        narrativeTitle: { en: 'A Symbol of Friendship Woven with Indonesian Batik Motifs', id: 'Simbol Persahabatan dengan Sentuhan Motif Batik Nusantara' },
        narrativeStory: {
          en: 'Inaugurated in November 2022 as a radiant tribute modeled after Abu Dhabi’s Sheikh Zayed Grand Mosque, this ivory-domed sanctuary pairs Middle Eastern marble grandeur with Indonesian batik-patterned carpets. At dusk, warm golden illumination reflects across its courtyard pools.',
          id: 'Diresmikan pada November 2022 sebagai replika indah Sheikh Zayed Grand Mosque di Abu Dhabi, masjid berkubah putih gading dan beraksen emas ini memadukan marmer megah Timur Tengah dengan karpet bermotif batik Indonesia. Cahaya senja yang memantul di kolam refleksinya menjadikannya ikon arsitektur modern kota Solo.',
        },
        culturalTip: { en: 'Best visited around sunset through evening when golden architectural lighting highlights the white domes.', id: 'Waktu terbaik berkunjung adalah menjelang senja hingga malam saat pencahayaan emas menyorot kubah utama.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Raya+Sheikh+Zayed+Surakarta',
      },
      {
        id: 'dest-pasargede',
        name: 'Pasar Gede Harjonagoro & Tugu Jam',
        category: { en: 'Culinary & Colonial-Javanese Market', id: 'Pasar Bersejarah & Kuliner Legendaris' },
        locationNote: 'Jl. Jend. Urip Sumoharjo, Jebres, Surakarta',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Gede_Harjonagoro_Surakarta.jpg?width=900',
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Gede_6.jpg?width=900',
        fallbackImage: createHeritageIllustrationDataUri('Pasar Gede & Tugu Jam', 'pasargede'),
        imageCaption: 'Foto: Fasad Bersejarah Pasar Gede Harjonagoro Surakarta (Wikimedia Commons, CC BY-SA)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Pasar+Gede+Harjonagoro+Tugu+Jam+Solo',
        narrativeTitle: { en: 'Thomas Karsten’s 1930 Landmark of Flavors & Acculturation', id: 'Karya Thomas Karsten Tahun 1930 yang Penuh Cita Rasa' },
        narrativeStory: {
          en: 'Designed in 1930 by Dutch architect Herman Thomas Karsten, Pasar Gede seamlessly marries Javanese tajug roofs with airy tropical-colonial arches. Outside its main junction stands the iconic Tugu Jam clock tower, anchoring Surakarta’s famed culinary haven and Javanese-Chinese cultural heritage.',
          id: 'Dirancang oleh arsitek Belanda Herman Thomas Karsten pada tahun 1930, Pasar Gede mempertemukan atap tajug Jawa dengan struktur kolonial yang sejuk dan lapang. Tepat di persimpangannya berdiri Tugu Jam Pasar Gede yang menjadi penanda pusat aktivitas warga, kuliner legendaris dawet telasih, hingga akulturasi budaya Tionghoa-Jawa.',
        },
        culturalTip: { en: 'Don’t miss the iconic iced dawet telasih and authentic Javanese morning market delicacies inside.', id: 'Jangan lewatkan es dawet telasih legendaris serta aneka jajanan pasar tradisional di lantai dasar.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pasar+Gede+Harjonagoro+Surakarta',
      },
      {
        id: 'dest-triwindu',
        name: 'Pasar Antik Triwindu & Koridor Ngarsopuro',
        category: { en: 'Antique Curios & Night Promenade', id: 'Pasar Barang Antik & Koridor Seni' },
        locationNote: 'Jl. Diponegoro, Keprabon, Banjarsari, Surakarta',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Triwindu_1.jpg?width=900',
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pasar_Triwindu_2.jpg?width=900',
        fallbackImage: createHeritageIllustrationDataUri('Pasar Antik Triwindu', 'triwindu'),
        imageCaption: 'Foto: Koleksi Barang Antik Pasar Triwindu Ngarsopuro (Wikimedia Commons, CC BY-SA)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Pasar+Antik+Triwindu+Ngarsopuro+Solo',
        narrativeTitle: { en: 'Vintage Treasures Preserved Since the 1939 Windu Jubilee', id: 'Harta Karun Vintage Sejak Peringatan Windu Ketiga 1939' },
        narrativeStory: {
          en: 'Built in 1939 to commemorate the 24th reign anniversary (three windu) of KGPAA Mangkunegara VII, Triwindu Antique Market houses brass chandeliers, carved wayang masks, vintage porcelain, and historic coins. On weekend evenings, the adjoining Ngarsopuro promenade comes alive with local crafts and street art.',
          id: 'Dibangun pada tahun 1939 untuk memperingati 24 tahun (tiga windu) bertahtanya KGPAA Mangkunegara VII, Pasar Triwindu menyimpan ribuan benda antik seperti lampu gantung kuno, wayang kulit, topeng kayu, hingga koin klasik. Di malam akhir pekan, koridor Ngarsopuro di depannya berubah menjadi ruang seni, kriya, dan kuliner jalanan yang hangat.',
        },
        culturalTip: { en: 'Browse the upper-floor antique stalls by day, then stroll the illuminated Ngarsopuro night promenade.', id: 'Jelajahi lantai dua Pasar Triwindu di siang hari lalu nikmati suasana malam koridor Ngarsopuro.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pasar+Antik+Triwindu+Surakarta',
      },
      {
        id: 'dest-danar-hadi',
        name: 'Museum Batik Danar Hadi (Ndalem Wuryaningratan)',
        category: { en: 'Textile Museum & Heritage Complex', id: 'Museum Tekstil & Ndalem Bersejarah' },
        locationNote: 'Jl. Slamet Riyadi No. 261, Laweyan, Surakarta',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Museum_Batik_Danar_Hadi.jpg?width=900',
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gapura_Kampung_Batik_Kauman.jpg?width=900',
        fallbackImage: createHeritageIllustrationDataUri('Museum Batik Danar Hadi', 'museum'),
        imageCaption: 'Foto: Kompleks Museum Batik Danar Hadi / Ndalem Wuryaningratan (Wikimedia Commons, CC BY-SA)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=Museum+Batik+Danar+Hadi+Solo',
        narrativeTitle: { en: 'Walking Through 10,000 Centuries-Old Batik Masterpieces', id: 'Menyusuri 10.000 Lembar Sejarah Wastra Batik Nusantara' },
        narrativeStory: {
          en: 'Set inside the aristocratic Ndalem Wuryaningratan Javanese-colonial estate along Slamet Riyadi, Museum Batik Danar Hadi safeguards over 10,000 rare textiles spanning royal palace motifs, coastal batik, merchant batik, and cross-cultural Nusantara-European designs.',
          id: 'Berlokasi di dalam kompleks rumah bangsawan Ndalem Wuryaningratan bergaya arsitektur Jawa-Kolonial, Museum Batik Danar Hadi menyimpan lebih dari sepuluh ribu koleksi batik kuno dari batik keraton Surakarta-Yogyakarta, batik pesisir, batik saudagaran, hingga pengaruh budaya Belanda dan Tionghoa.',
        },
        culturalTip: { en: 'Join the guided curatorial tour inside the gallery to discover the symbolism woven into every classical pattern.', id: 'Ikuti tur berpemandu di dalam museum untuk memahami makna filosofis di balik tiap motif klasik.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museum+Batik+Danar+Hadi+Surakarta',
      },
      {
        id: 'dest-tjolomadoe',
        name: 'De Tjolomadoe & Lokananta Bloc',
        category: { en: 'Industrial Heritage & Music Legacy', id: 'Pusaka Industri & Sejarah Musik' },
        locationNote: 'Colomadu & Kerten, Kawasan Solo Raya',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pabrik_Gula_Colomadu.jpg?width=900',
        secondaryImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Museum_Lokananta.jpg?width=900',
        fallbackImage: createHeritageIllustrationDataUri('De Tjolomadoe & Lokananta', 'tjolomadoe'),
        imageCaption: 'Foto: Arsitektur Heritage De Tjolomadoe / Eks PG Colomadu (Wikimedia Commons, CC BY-SA)',
        googlePhotosUrl: 'https://www.google.com/search?tbm=isch&q=De+Tjolomadoe+dan+Lokananta+Bloc+Solo',
        narrativeTitle: { en: 'Revitalized 1861 Sugar Mill & Indonesia’s First Recording Studio', id: 'Revitalisasi Pabrik Gula 1861 & Studio Musik Pertama Indonesia' },
        narrativeStory: {
          en: 'On Solo’s western edge near Hotel Alila Solo, the historic 1861 Colomadu sugar mill built by Mangkunegara IV has been transformed into De Tjolomadoe, preserving colossal German industrial machinery in a museum-grade hall. Nearby, Lokananta — Indonesia’s pioneering 1956 national vinyl recording studio — thrives anew as a creative hub.',
          id: 'Di sisi barat Solo tak jauh dari Hotel Alila Solo, bekas Pabrik Gula Colomadu yang didirikan Mangkunegara IV pada tahun 1861 direvitalisasi menjadi De Tjolomadoe dengan mesin-mesin raksasa bersejarah yang terawat artistik. Tak jauh dari sana, Lokananta — studio rekaman piringan hitam pertama milik negara yang lahir pada 1956 — kini hidup kembali sebagai ruang kreatif musik dan budaya.',
        },
        culturalTip: { en: 'Only ~10 minutes from Hotel Alila Solo, making it effortless to visit between conference sessions.', id: 'Sangat dekat dari kawasan Hotel Alila Solo (±10 menit berkendara), ideal untuk kunjungan singkat antar-sesi.' },
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=De+Tjolomadoe+Karanganyar',
      },
    ],
    mainHotel: {
      id: 'alila-solo',
      name: 'Hotel Alila Solo',
      tier: { en: 'Official Conference Venue & Main Hotel · 5-Star Luxury', id: 'Venue Resmi Konferensi & Hotel Utama · Bintang 5' },
      distanceFromAlila: { en: 'Official IOMU 2027 Venue · Jl. Slamet Riyadi Corridor', id: 'Lokasi Resmi IOMU 2027 · Koridor Jl. Slamet Riyadi' },
      address: 'Jl. Slamet Riyadi No. 562, Jajar, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57144',
      summary: {
        en: 'Serving as the official venue and primary accommodation for IOMU 2027, Hotel Alila Solo rises above Slamet Riyadi Boulevard as Surakarta’s landmark five-star hotel—blending contemporary architectural elegance with authentic Javanese batik and wayang artistry.',
        id: 'Menjadi lokasi resmi sekaligus akomodasi utama IOMU 2027, Hotel Alila Solo berdiri megah di Jl. Slamet Riyadi sebagai hotel bintang lima ikonik Surakarta—memadukan kenyamanan arsitektur modern dengan karya seni batik dan wayang khas Jawa.',
      },
      highlights: {
        en: [
          'Official Conference Grand Ballroom & Breakout Workshop Suites under one roof',
          'Elevated Agra Rooftop Lounge overlooking Mount Merapi and Mount Lawu',
          'Épice Restaurant, Largo semi-Olympic pool, and Spa Alila wellness sanctuary',
          'Direct boulevard access (~15–20 mins from Adi Soemarmo International Airport)',
        ],
        id: [
          'Grand Ballroom Utama Konferensi & ruang-ruang Workshop dalam satu lokasi terpadu',
          'Agra Rooftop Lounge dengan panorama Gunung Merapi dan Gunung Lawu',
          'Restoran Épice, kolam renang Largo, serta fasilitas kebugaran Spa Alila',
          'Akses langsung boulevard utama (±15–20 menit dari Bandara Adi Soemarmo)',
        ],
      },
      bookingStatus: { en: 'Official Conference Venue · Delegate Room Block Rates Coming Soon', id: 'Venue Resmi Acara · Tarif Khusus Delegasi Segera Diumumkan' },
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Alila+Solo',
      position: [-8.5, 0, -236],
      cameraFocusPos: [-1.5, 5.2, -225],
      cameraLookAt: [-8.5, 4.2, -236],
    },
    alternativeHotels: [
      { id: 'hotel-royal-heritage', name: 'The Royal Surakarta Heritage — Handwritten Collection', tier: { en: '5-Star Heritage Luxury', id: 'Hotel Pusaka Bintang 5' }, distanceFromAlila: { en: '~15 mins east of Hotel Alila Solo (Gladag / Keraton area)', id: '±15 menit ke arah timur Hotel Alila Solo (Kawasan Gladag / Keraton)' }, address: 'Jl. Slamet Riyadi No. 6, Kp. Baru, Pasar Kliwon, Surakarta', summary: { en: 'Elegant Javanese-styled heritage hotel steps away from Gapura Gladag, Keraton Surakarta, and Pasar Gede.', id: 'Hotel bernuansa pusaka Jawa elegan tepat di dekat Gapura Gladag, Keraton Surakarta, dan Pasar Gede.' }, highlights: { en: ['Classic Javanese batik interiors', 'Walking distance to royal landmarks'], id: ['Interior batik klasik Jawa', 'Akses jalan kaki ke kawasan Keraton'] }, bookingStatus: { en: 'Nearby alternative · Independent booking', id: 'Alternatif sekitar · Pemesanan mandiri' }, mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Royal+Surakarta+Heritage' },
      { id: 'hotel-solia-zigna', name: 'SOLIA Zigna Kampung Batik Laweyan', tier: { en: '4-Star Boutique Heritage', id: 'Hotel Butik Bintang 4' }, distanceFromAlila: { en: '~5 mins drive from Hotel Alila Solo (Laweyan Quarter)', id: '±5 menit berkendara dari Hotel Alila Solo (Kawasan Laweyan)' }, address: 'Jl. Dr. Rajiman No. 525, Laweyan, Surakarta', summary: { en: 'Contemporary boutique hotel celebrating Laweyan batik craftsmanship with vibrant cultural touches and rooftop pool.', id: 'Hotel butik kontemporer bernuansa kerajinan batik Laweyan lengkap dengan kolam renang rooftop.' }, highlights: { en: ['Adjacent to Kampung Batik Laweyan', 'Easy 5-min transfer to venue'], id: ['Bersebelahan dengan Kampung Batik Laweyan', 'Hanya ±5 menit ke venue utama'] }, bookingStatus: { en: 'Nearby alternative · Independent booking', id: 'Alternatif sekitar · Pemesanan mandiri' }, mapUrl: 'https://www.google.com/maps/search/?api=1&query=Solia+Zigna+Kampung+Batik+Solo' },
      { id: 'hotel-harris-solo', name: 'HARRIS Hotel & Conventions Solo', tier: { en: '4-Star Business & Convention', id: 'Hotel Bisnis Bintang 4' }, distanceFromAlila: { en: '~4 mins east of Hotel Alila Solo (Purwosari)', id: '±4 menit ke arah timur Hotel Alila Solo (Purwosari)' }, address: 'Jl. Slamet Riyadi No. 464, Purwosari, Laweyan, Surakarta', summary: { en: 'Modern business hotel positioned directly along Slamet Riyadi Boulevard near Purwosari Station.', id: 'Hotel bisnis modern tepat di tepi Jl. Slamet Riyadi dekat Stasiun Purwosari dan Hotel Alila Solo.' }, highlights: { en: ['4 minutes to Hotel Alila Solo', 'Spacious business rooms & lounges'], id: ['±4 menit menuju Hotel Alila Solo', 'Kamar bisnis lapang dan nyaman'] }, bookingStatus: { en: 'Nearby alternative · Independent booking', id: 'Alternatif sekitar · Pemesanan mandiri' }, mapUrl: 'https://www.google.com/maps/search/?api=1&query=HARRIS+Hotel+Solo' },
      { id: 'hotel-swiss-belinn', name: 'Swiss-Belinn Saripetojo Solo', tier: { en: '4-Star Modern City Hotel', id: 'Hotel Kota Modern Bintang 4' }, distanceFromAlila: { en: '~4 mins east of Hotel Alila Solo (Purwosari)', id: '±4 menit ke arah timur Hotel Alila Solo (Purwosari)' }, address: 'Jl. Brigjen Slamet Riyadi No. 437, Sondakan, Laweyan, Surakarta', summary: { en: 'Contemporary accommodation standing on a historic Solo landmark site with convenient rail and venue access.', id: 'Akomodasi kontemporer di lokasi bersejarah Solo dengan akses cepat ke Stasiun Purwosari dan Hotel Alila.' }, highlights: { en: ['Minutes from Purwosari Station', 'Comfortable business amenities'], id: ['Dekat Stasiun Purwosari', 'Fasilitas bisnis lengkap'] }, bookingStatus: { en: 'Nearby alternative · Independent booking', id: 'Alternatif sekitar · Pemesanan mandiri' }, mapUrl: 'https://www.google.com/maps/search/?api=1&query=Swiss-Belinn+Saripetojo+Solo' },
      { id: 'hotel-novotel-solo', name: 'Novotel Solo', tier: { en: '4-Star International Business Hotel', id: 'Hotel Bisnis Internasional Bintang 4' }, distanceFromAlila: { en: '~10 mins east of Hotel Alila Solo (Timuran)', id: '±10 menit ke arah timur Hotel Alila Solo (Timuran)' }, address: 'Jl. Slamet Riyadi No. 272, Timuran, Banjarsari, Surakarta', summary: { en: 'Established international-standard hotel featuring tropical garden courtyards near Mangkunegaran and Ngarsopuro.', id: 'Hotel standar internasional dengan taman tropis yang asri di dekat Pura Mangkunegaran dan koridor Ngarsopuro.' }, highlights: { en: ['Central Solo location', 'Tropical courtyard pool & fitness'], id: ['Lokasi strategis pusat kota', 'Kolam taman tropis & pusat kebugaran'] }, bookingStatus: { en: 'Nearby alternative · Independent booking', id: 'Alternatif sekitar · Pemesanan mandiri' }, mapUrl: 'https://www.google.com/maps/search/?api=1&query=Novotel+Solo' },
      { id: 'hotel-swiss-belhotel', name: 'Swiss-Belhotel Solo', tier: { en: '4-Star Upscale City Hotel', id: 'Hotel Kota Bintang 4' }, distanceFromAlila: { en: '~12 mins northeast of Hotel Alila Solo (Gilingan)', id: '±12 menit ke arah timur laut Hotel Alila Solo (Gilingan)' }, address: 'Jl. Ahmad Yani No. 45, Gilingan, Banjarsari, Surakarta', summary: { en: 'Modern upscale hotel located close to Solo Balapan Railway Station and Masjid Raya Sheikh Zayed.', id: 'Hotel modern berkelas dekat Stasiun Solo Balapan dan Masjid Raya Sheikh Zayed.' }, highlights: { en: ['Near Solo Balapan Station', 'Easy toll-road & airport access'], id: ['Dekat Stasiun Solo Balapan', 'Akses mudah ke jalan tol & bandara'] }, bookingStatus: { en: 'Nearby alternative · Independent booking', id: 'Alternatif sekitar · Pemesanan mandiri' }, mapUrl: 'https://www.google.com/maps/search/?api=1&query=Swiss-Belhotel+Solo' },
    ],
    conferencePillars: [
      { badge: { en: '19th Edition', id: 'Edisi ke-19' }, title: { en: 'About IOMU 2027', id: 'Tentang IOMU 2027' }, description: { en: 'Indonesian Occupational Medicine Updates (IOMU) is an annual scientific conference and workshop platform dedicated to advancing occupational health practice and evidence-based clinical standards.', id: 'Indonesian Occupational Medicine Updates (IOMU) adalah konferensi ilmiah dan workshop tahunan untuk memajukan praktik kesehatan kerja serta standar klinis berbasis bukti.' } },
      { badge: { en: 'Hotel Alila Solo', id: 'Hotel Alila Solo' }, title: { en: 'Conference Overview', id: 'Gambaran Konferensi' }, description: { en: 'Hosted at Hotel Alila Solo on May 7–9, 2027, IOMU 2027 brings together occupational medicine specialists, clinicians, researchers, and workplace health practitioners.', id: 'Diselenggarakan di Hotel Alila Solo pada 7–9 Mei 2027, mempertemukan dokter spesialis okupasi, klinisi, peneliti, dan praktisi kesehatan kerja.' } },
      { badge: { en: 'Draft Theme Focus', id: 'Fokus Tema Draf' }, title: { en: 'Event Objectives', id: 'Tujuan Acara' }, description: { en: 'Guided by the draft theme "From Global Evidence to Local Impact", the forum explores resilient, healthy, and sustainable workforce strategies.', id: 'Mengusung tema draf "From Global Evidence to Local Impact", forum ini mengkaji strategi mewujudkan tenaga kerja yang sehat, tangguh, dan berkelanjutan.' } },
      { badge: { en: 'Cross-Sector Dialogue', id: 'Dialog Lintas Sektor' }, title: { en: 'Professional Networking', id: 'Jejaring Profesional' }, description: { en: 'Facilitating meaningful exchange among PERDOKI members, international delegates, academic institutions, and industry medical teams.', id: 'Memfasilitasi pertukaran gagasan antara anggota PERDOKI, delegasi internasional, akademisi, dan tim medis perusahaan.' } },
      { badge: { en: 'Evidence & Practice', id: 'Bukti & Praktik' }, title: { en: 'Scientific Knowledge Exchange', id: 'Pertukaran Ilmu Pengetahuan' }, description: { en: 'Curated plenary symposia, hands-on clinical workshops, and scientific presentations designed to translate global occupational medicine research into practice.', id: 'Simposium pleno terkurasi, workshop klinis langsung, serta presentasi ilmiah yang menerjemahkan riset global ke praktik tempat kerja.' } },
    ],
    pavilions: [
      { id: 'pavilion-scientific-conference', category: 'Scientific Conference', shortTitle: { en: 'Scientific Conference', id: 'Konferensi Ilmiah' }, tagline: { en: 'Plenary & Symposium Category', id: 'Kategori Pleno & Simposium' }, summary: { en: 'Information hub for keynote lectures, international symposia, and state-of-the-art updates in occupational medicine.', id: 'Pusat informasi kuliah kunci, simposium internasional, serta pembaruan terkini bidang kedokteran okupasi.' }, position: [-9.5, 0, -100], cameraFocusPos: [-2.2, 4.2, -91.5], cameraLookAt: [-9.5, 2.2, -100], accentStyle: 'tajug' },
      { id: 'pavilion-workshops', category: 'Workshops', shortTitle: { en: 'Workshops', id: 'Workshop' }, tagline: { en: 'Hands-On Clinical & Technical Tracks', id: 'Jalur Praktik Klinis & Teknis' }, summary: { en: 'Information hub for practical skill-building workshops covering workplace hazard assessment, fitness-for-work, and clinical ergonomics.', id: 'Pusat informasi workshop keterampilan praktis mencakup penilaian pajanan kerja, kelaikan kerja, dan ergonomi klinis.' }, position: [9.5, 0, -102], cameraFocusPos: [2.2, 4.2, -93.5], cameraLookAt: [9.5, 2.2, -102], accentStyle: 'studio' },
      { id: 'pavilion-scientific-presentations', category: 'Scientific Presentations', shortTitle: { en: 'Scientific Presentations', id: 'Presentasi Ilmiah' }, tagline: { en: 'Oral & E-Poster Research Forum', id: 'Forum Riset Oral & E-Poster' }, summary: { en: 'Information hub for abstract submissions, peer-reviewed research presentations, and clinical case discussions.', id: 'Pusat informasi pengajuan abstrak, presentasi penelitian ilmiah, serta diskusi kasus kedokteran okupasi.' }, position: [-9.0, 0, -116], cameraFocusPos: [-2.0, 4.0, -107.5], cameraLookAt: [-9.0, 2.2, -116], accentStyle: 'rotunda' },
      { id: 'pavilion-networking', category: 'Professional Networking', shortTitle: { en: 'Professional Networking', id: 'Jejaring Profesional' }, tagline: { en: 'Collaboration & Institutional Exchange', id: 'Kolaborasi & Pertukaran Institusi' }, summary: { en: 'Information hub for colleague meetups, organizational dialogues, and heritage cultural hospitality sessions.', id: 'Pusat informasi temu sejawat, dialog organisasi, dan keramahtamahan budaya Surakarta.' }, position: [9.0, 0, -118], cameraFocusPos: [2.0, 4.0, -109.5], cameraLookAt: [9.0, 2.2, -118], accentStyle: 'pendopo' },
    ],
    programs: [
      { id: 'prog-sc-1', title: { en: 'Plenary & Main Scientific Symposia', id: 'Simposium Pleno & Ilmiah Utama' }, category: 'Scientific Conference', description: { en: 'Keynote and multidisciplinary symposia addressing global occupational medicine evidence and sustainable workforce resilience.', id: 'Kuliah kunci dan simposium multidisiplin yang membahas bukti ilmiah global serta ketahanan tenaga kerja berkelanjutan.' }, date: { en: 'May 7–9, 2027 (Exact schedule TBA)', id: '7–9 Mei 2027 (Jadwal rinci TBA)' }, time: { en: 'To Be Announced', id: 'Akan Diumumkan' }, speaker: { en: 'To Be Announced', id: 'Akan Diumumkan' }, room: 'Hotel Alila Solo (Room TBA)', registrationAvailability: { en: 'Registration Information Coming Soon', id: 'Informasi Registrasi Segera Hadir' }, status: 'Coming Soon' },
      { id: 'prog-sc-2', title: { en: 'Emerging Workplace Health Challenges Forum', id: 'Forum Tantangan Kesehatan Kerja Terkini' }, category: 'Scientific Conference', description: { en: 'Draft scientific track examining psychosocial well-being, occupational toxicology, and climate-resilient workplace protection.', id: 'Jalur ilmiah draf yang mengulas kesehatan psikososial, toksikologi okupasi, dan perlindungan pekerja di era perubahan iklim.' }, date: { en: 'May 7–9, 2027 (Exact schedule TBA)', id: '7–9 Mei 2027 (Jadwal rinci TBA)' }, time: { en: 'To Be Announced', id: 'Akan Diumumkan' }, speaker: { en: 'To Be Announced', id: 'Akan Diumumkan' }, room: 'Hotel Alila Solo (Room TBA)', registrationAvailability: { en: 'Registration Information Coming Soon', id: 'Informasi Registrasi Segera Hadir' }, status: 'Draft' },
      { id: 'prog-ws-1', title: { en: 'Pre-Conference & Clinical Occupational Medicine Workshops', id: 'Workshop Klinis Kedokteran Okupasi' }, category: 'Workshops', description: { en: 'Interactive practitioner workshops designed for hands-on clinical examination, medical surveillance interpretation, and return-to-work decision making.', id: 'Workshop interaktif untuk pemeriksaan klinis langsung, interpretasi surveilans medis, serta pengambilan keputusan kembali bekerja.' }, date: { en: 'May 7–9, 2027 (Exact schedule TBA)', id: '7–9 Mei 2027 (Jadwal rinci TBA)' }, time: { en: 'To Be Announced', id: 'Akan Diumumkan' }, speaker: { en: 'To Be Announced', id: 'Akan Diumumkan' }, room: 'Hotel Alila Solo (Room TBA)', registrationAvailability: { en: 'Registration Information Coming Soon', id: 'Informasi Registrasi Segera Hadir' }, status: 'Coming Soon' },
      { id: 'prog-ws-2', title: { en: 'Industrial Hygiene & Ergonomics Practical Workshop', id: 'Workshop Praktis Higiene Industri & Ergonomi' }, category: 'Workshops', description: { en: 'Draft interactive module focusing on field exposure assessment and practical ergonomic risk mitigation across diverse industries.', id: 'Modul draf interaktif mengenai penilaian pajanan lapangan serta mitigasi risiko ergonomi di berbagai industri.' }, date: { en: 'May 7–9, 2027 (Exact schedule TBA)', id: '7–9 Mei 2027 (Jadwal rinci TBA)' }, time: { en: 'To Be Announced', id: 'Akan Diumumkan' }, speaker: { en: 'To Be Announced', id: 'Akan Diumumkan' }, room: 'Hotel Alila Solo (Room TBA)', registrationAvailability: { en: 'Registration Information Coming Soon', id: 'Informasi Registrasi Segera Hadir' }, status: 'Draft' },
      { id: 'prog-sp-1', title: { en: 'Call for Abstracts: Oral & Poster Presentations', id: 'Panggilan Abstrak: Presentasi Oral & Poster' }, category: 'Scientific Presentations', description: { en: 'Dedicated scientific showcase for original research, epidemiological studies, and occupational medicine case reports.', id: 'Wadah ilmiah bagi penelitian orisinal, studi epidemiologi, dan laporan kasus kedokteran okupasi.' }, date: { en: 'May 7–9, 2027 (Exact schedule TBA)', id: '7–9 Mei 2027 (Jadwal rinci TBA)' }, time: { en: 'To Be Announced', id: 'Akan Diumumkan' }, speaker: { en: 'Submitting Authors (TBA)', id: 'Penulis Terpilih (TBA)' }, room: 'Hotel Alila Solo (Room TBA)', registrationAvailability: { en: 'Submission Details Coming Soon', id: 'Panduan Abstrak Segera Hadir' }, status: 'Coming Soon' },
      { id: 'prog-pn-1', title: { en: 'Delegates Fellowship & Heritage Networking Reception', id: 'Temu Delegasi & Jamuan Jejaring Budaya' }, category: 'Professional Networking', description: { en: 'Collegial networking sessions connecting national and international occupational health professionals amidst Surakarta hospitality.', id: 'Sesi jejaring sejawat yang mempertemukan praktisi kesehatan kerja nasional dan internasional dalam kehangatan budaya Solo.' }, date: { en: 'May 7–9, 2027 (Exact schedule TBA)', id: '7–9 Mei 2027 (Jadwal rinci TBA)' }, time: { en: 'To Be Announced', id: 'Akan Diumumkan' }, speaker: { en: 'Committee & Delegates', id: 'Panitia & Delegasi' }, room: 'Hotel Alila Solo (Room TBA)', registrationAvailability: { en: 'Included Details Coming Soon', id: 'Informasi Keikutsertaan Segera Hadir' }, status: 'Coming Soon' },
    ],
    gallerySpeakers: [
      ...CONFERENCE_SPEAKERS.slice(0, 4),
      ...WORKSHOP_SPEAKERS.slice(0, 2),
    ].map((sp, i) => ({
      ...sp,
      position: GALLERY_COORDS[i],
      cameraFocusPos: [GALLERY_COORDS[i][0] < 0 ? -3.5 : 3.5, 3.2, GALLERY_COORDS[i][2] + 6],
      cameraLookAt: [GALLERY_COORDS[i][0], 2.3, GALLERY_COORDS[i][2]],
    })),
    workshopSpeakers: WORKSHOP_SPEAKERS,
    conferenceSpeakers: CONFERENCE_SPEAKERS,
    agendaDays: [
      { id: 'day-1', label: { en: 'Day 1', id: 'Hari 1' }, fullDate: { en: 'Friday, May 7, 2027', id: 'Jumat, 7 Mei 2027' }, headline: { en: 'Day 1 — Friday, May 7, 2027', id: 'Hari 1 — Jumat, 7 Mei 2027' }, summary: { en: 'Program to Be Announced at Hotel Alila Solo. Official opening, workshop tracks, and session timings are pending committee confirmation.', id: 'Program Akan Diumumkan di Hotel Alila Solo. Pembukaan resmi, jalur workshop, dan jam sesi menunggu konfirmasi Komite Ilmiah.' }, status: 'Coming Soon', worldPosition: [-5.5, 0, -176], session: { id: 'day1-tba-1', timeRange: { en: 'Time Range To Be Announced', id: 'Waktu Akan Diumumkan' }, category: { en: 'Conference & Workshop Track', id: 'Jalur Konferensi & Workshop' }, title: { en: 'Program to Be Announced', id: 'Program Akan Diumumkan' }, speaker: { en: 'To Be Announced', id: 'Akan Diumumkan' }, room: 'Hotel Alila Solo (Room TBA)', description: { en: 'Detailed Day 1 schedule items, workshop allocations, and opening activities for Friday, May 7, 2027 at Hotel Alila Solo will be published once finalized.', id: 'Rincian jadwal Hari 1, pembagian ruang workshop, dan acara pembukaan untuk Jumat, 7 Mei 2027 di Hotel Alila Solo akan dipublikasikan setelah final.' } } },
      { id: 'day-2', label: { en: 'Day 2', id: 'Hari 2' }, fullDate: { en: 'Saturday, May 8, 2027', id: 'Sabtu, 8 Mei 2027' }, headline: { en: 'Day 2 — Saturday, May 8, 2027', id: 'Hari 2 — Sabtu, 8 Mei 2027' }, summary: { en: 'Program to Be Announced at Hotel Alila Solo. Plenary sessions, scientific symposia, and presentation schedules are pending confirmation.', id: 'Program Akan Diumumkan di Hotel Alila Solo. Sesi pleno, simposium ilmiah, dan jadwal presentasi menunggu konfirmasi resmi.' }, status: 'Coming Soon', worldPosition: [0, 0, -184], session: { id: 'day2-tba-1', timeRange: { en: 'Time Range To Be Announced', id: 'Waktu Akan Diumumkan' }, category: { en: 'Scientific Conference & Presentations', id: 'Konferensi Ilmiah & Presentasi' }, title: { en: 'Program to Be Announced', id: 'Program Akan Diumumkan' }, speaker: { en: 'To Be Announced', id: 'Akan Diumumkan' }, room: 'Hotel Alila Solo (Room TBA)', description: { en: 'Detailed Day 2 plenary lectures, concurrent scientific symposia, and research presentation slots for Saturday, May 8, 2027 at Hotel Alila Solo will be updated here.', id: 'Rincian kuliah pleno Hari 2, simposium paralel, dan presentasi riset untuk Sabtu, 8 Mei 2027 di Hotel Alila Solo akan diperbarui di sini.' } } },
      { id: 'day-3', label: { en: 'Day 3', id: 'Hari 3' }, fullDate: { en: 'Sunday, May 9, 2027', id: 'Minggu, 9 Mei 2027' }, headline: { en: 'Day 3 — Sunday, May 9, 2027', id: 'Hari 3 — Minggu, 9 Mei 2027' }, summary: { en: 'Program to Be Announced at Hotel Alila Solo. Final scientific sessions and closing proceedings are pending committee confirmation.', id: 'Program Akan Diumumkan di Hotel Alila Solo. Sesi ilmiah penutup dan rangkaian akhir acara menunggu konfirmasi panitia.' }, status: 'Coming Soon', worldPosition: [5.5, 0, -192], session: { id: 'day3-tba-1', timeRange: { en: 'Time Range To Be Announced', id: 'Waktu Akan Diumumkan' }, category: { en: 'Scientific Symposium & Closing', id: 'Simposium Ilmiah & Penutupan' }, title: { en: 'Program to Be Announced', id: 'Program Akan Diumumkan' }, speaker: { en: 'To Be Announced', id: 'Akan Diumumkan' }, room: 'Hotel Alila Solo (Room TBA)', description: { en: 'Detailed Day 3 schedule items, wrap-up panels, and closing remarks for Sunday, May 9, 2027 at Hotel Alila Solo will be announced upon finalization.', id: 'Rincian jadwal Hari 3, diskusi panel penutup, dan penutupan acara untuk Minggu, 9 Mei 2027 di Hotel Alila Solo akan diumumkan segera.' } } },
    ],
  };

  const state = {
    lang: 'id',
    scrollProgress: 0,
    activeChapterIndex: 1,
    activeDayId: 'day-1',
    activeProgramFilter: 'All',
    speakerSearch: '',
    showAllConfSpeakers: false,
    expandedSessionId: 'day1-tba-1',
    selectedItem: null,
    mobileMenuOpen: false,
    liteMode: false,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    webglReady: false,
  };

  function L(val) {
    if (val && typeof val === 'object' && ('en' in val || 'id' in val)) {
      return val[state.lang] || val.en || val.id;
    }
    return val;
  }

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
  }

  function createPlaqueTexture(title, subtitle, variant) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const bg = variant === 'cream' ? '#F4E9D7' : '#14302B';
      const fg = variant === 'cream' ? '#14302B' : '#F4E9D7';
      const accent = variant === 'cream' ? '#8A662C' : '#DDBE82';
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#C69C54';
      ctx.lineWidth = 10;
      ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = fg;
      ctx.font = 'bold 62px Montserrat, Arial, sans-serif';
      ctx.fillText(title, canvas.width / 2, subtitle ? canvas.height * 0.42 : canvas.height / 2);
      if (subtitle) {
        ctx.fillStyle = accent;
        ctx.font = '600 30px Inter, Arial, sans-serif';
        ctx.fillText(subtitle, canvas.width / 2, canvas.height * 0.69);
      }
    }
    const tex = new window.THREE.CanvasTexture(canvas);
    tex.encoding = window.THREE.sRGBEncoding;
    tex.needsUpdate = true;
    return tex;
  }

  function buildJogloRoof(THREE, width, depth, colorHex) {
    const group = new THREE.Group();
    const r = Math.max(width, depth) * 0.65;
    const lower = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.42, r, 0.9, 4),
      new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.55, metalness: 0.2 })
    );
    lower.position.y = 0.45;
    lower.rotation.y = Math.PI / 4;
    group.add(lower);

    const trim = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 1.01, r * 1.03, 0.08, 4),
      new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.85, roughness: 0.25 })
    );
    trim.position.y = 0.04;
    trim.rotation.y = Math.PI / 4;
    group.add(trim);

    const upper = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.1, r * 0.43, 1.25, 4),
      new THREE.MeshStandardMaterial({ color: '#14302B', roughness: 0.45, metalness: 0.3 })
    );
    upper.position.y = 1.45;
    upper.rotation.y = Math.PI / 4;
    group.add(upper);

    const ridge = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.16, 0.14, 0.18),
      new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.9, roughness: 0.2 })
    );
    ridge.position.y = 2.1;
    group.add(ridge);

    return group;
  }

  function applySilhouetteLineDesign(THREE, rootObj, options) {
    const lineColor = (options && options.lineColor) || '#DDBE82';
    const accentColor = (options && options.accentColor) || '#C69C54';
    const fillOpacity = options && typeof options.fillOpacity === 'number' ? options.fillOpacity : 0.92;
    const thresholdAngle = (options && options.thresholdAngle) || 12;

    const silhouetteOcclusionMat = new THREE.MeshBasicMaterial({
      color: '#0B1E1A',
      transparent: true,
      opacity: fillOpacity,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const primaryLineMat = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.94 });
    const secondaryLineMat = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.45 });

    const meshes = [];
    rootObj.traverse((child) => {
      if (child.isMesh && !child.userData.keepTexture && !child.userData.isSilhouetteLine) {
        meshes.push(child);
      }
    });

    meshes.forEach((mesh) => {
      mesh.material = silhouetteOcclusionMat;
      mesh.castShadow = false;
      mesh.receiveShadow = false;

      const edgesGeo = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle);
      const lineSeg = new THREE.LineSegments(edgesGeo, primaryLineMat);
      lineSeg.userData.isSilhouetteLine = true;
      mesh.add(lineSeg);

      const glowSeg = new THREE.LineSegments(edgesGeo, secondaryLineMat);
      glowSeg.scale.setScalar(1.003);
      glowSeg.userData.isSilhouetteLine = true;
      mesh.add(glowSeg);
    });
  }

  const threeRuntime = { hotspots: [], clickableMeshes: [] };

  function initThreeWorld() {
    const canvas = document.getElementById('iomu-webgl-canvas');
    if (!canvas || !window.THREE) {
      showFallbackBackdrop(true);
      return;
    }

    try {
      const THREE = window.THREE;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
      const isMobile = window.innerWidth < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = false;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#0C1F1B');
      scene.fog = new THREE.FogExp2('#0C1F1B', 0.0155);

      function getResponsiveFov() {
        const aspect = window.innerWidth / Math.max(1, window.innerHeight);
        if (aspect < 0.75) return 66;
        if (aspect < 1.2) return 56;
        return 46;
      }

      const camera = new THREE.PerspectiveCamera(getResponsiveFov(), window.innerWidth / Math.max(1, window.innerHeight), 0.1, 280);
      camera.position.set(0, 3.2, 36.5);

      scene.add(new THREE.HemisphereLight('#F4E9D7', '#0B1E1A', 0.65));

      const texLoader = new THREE.TextureLoader();
      const kawungTex = texLoader.load(ASSETS.kawungGold);
      kawungTex.wrapS = THREE.RepeatWrapping;
      kawungTex.wrapT = THREE.RepeatWrapping;
      kawungTex.repeat.set(36, 130);

      const gununganTex = texLoader.load(ASSETS.gununganGold);
      gununganTex.encoding = THREE.sRGBEncoding;
      const emblemTex = texLoader.load(ASSETS.logoEmblem);
      emblemTex.encoding = THREE.sRGBEncoding;
      const skylineTex = texLoader.load(ASSETS.skylineCream);
      skylineTex.encoding = THREE.sRGBEncoding;
      const logoFinal3dTex = texLoader.load(ASSETS.logoFinal3d);
      logoFinal3dTex.encoding = THREE.sRGBEncoding;

      const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 380), new THREE.MeshBasicMaterial({ color: '#091915' }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, -0.04, -120);
      scene.add(ground);

      [-20, -220].forEach((gz) => {
        const grid = new THREE.GridHelper(200, 80, 0xc69c54, 0x1a3d36);
        grid.position.set(0, 0.0, gz);
        grid.material.transparent = true;
        grid.material.opacity = 0.28;
        scene.add(grid);
      });

      const kawungPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 360),
        new THREE.MeshBasicMaterial({ map: kawungTex, transparent: true, opacity: 0.08, depthWrite: false })
      );
      kawungPlane.rotation.x = -Math.PI / 2;
      kawungPlane.position.set(0, 0.006, -120);
      scene.add(kawungPlane);

      [-45, -135, -210].forEach((sz, idx) => {
        [-25, 25].forEach((sx, sideIdx) => {
          const sky = new THREE.Mesh(
            new THREE.PlaneGeometry(54, 14),
            new THREE.MeshBasicMaterial({ map: skylineTex, color: '#DDBE82', transparent: true, opacity: 0.14 + (idx % 2) * 0.05, side: THREE.DoubleSide, depthWrite: false })
          );
          sky.position.set(sx, 6.4, sz - sideIdx * 12);
          sky.rotation.y = sx < 0 ? Math.PI * 0.42 : -Math.PI * 0.42;
          scene.add(sky);
        });
      });

      const pathCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.04, 42),
        new THREE.Vector3(0, 0.04, 18),
        new THREE.Vector3(0.4, 0.04, -6),
        new THREE.Vector3(-0.6, 0.04, -36),
        new THREE.Vector3(0, 0.04, -66),
        new THREE.Vector3(0, 0.04, -108),
        new THREE.Vector3(0, 0.04, -150),
        new THREE.Vector3(0, 0.04, -184),
        new THREE.Vector3(0.5, 0.04, -216),
        new THREE.Vector3(0, 0.04, -238),
        new THREE.Vector3(0, 0.04, -274),
      ]);
      const pathPts = pathCurve.getPoints(160);
      scene.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pathPts),
          new THREE.LineBasicMaterial({ color: '#F4E9D7', transparent: true, opacity: 0.75 })
        )
      );

      [-1.7, 1.7, -3.4, 3.4].forEach((offsetX, idx) => {
        const offsetPts = pathPts.map((p) => new THREE.Vector3(p.x + offsetX, 0.035, p.z));
        scene.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(offsetPts),
            new THREE.LineBasicMaterial({ color: idx < 2 ? '#DDBE82' : '#C69C54', transparent: true, opacity: idx < 2 ? 0.85 : 0.45 })
          )
        );
      });

      [22, 4, -22, -66, -109, -150, -184, -216, -236, -268].forEach((pz) => {
        [3.8, 5.6, 7.2].forEach((rad, rIdx) => {
          const ringPts = [];
          for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2;
            ringPts.push(new THREE.Vector3(Math.cos(a) * rad, 0.03, Math.sin(a) * rad + pz));
          }
          scene.add(
            new THREE.LineLoop(
              new THREE.BufferGeometry().setFromPoints(ringPts),
              new THREE.LineBasicMaterial({ color: rIdx === 2 ? '#DDBE82' : '#C69C54', transparent: true, opacity: rIdx === 2 ? 0.85 : 0.4 })
            )
          );
        });
      });

      const treeCoords = [
        [-14, 0, 14, 1.1], [14, 0, 12, 1.0], [-13, 0, -2, 0.95], [13.5, 0, -6, 1.15],
        [-15, 0, -18, 1.25], [15.5, 0, -28, 1.05], [-14.5, 0, -45, 1.15], [14.5, 0, -52, 1.2],
        [-16, 0, -76, 1.1], [16, 0, -82, 1.3], [-15.5, 0, -126, 1.15], [15.5, 0, -130, 1.1],
        [-14, 0, -166, 1.2], [14, 0, -172, 1.05], [-15, 0, -198, 1.25], [15, 0, -204, 1.15],
        [-15.5, 0, -230, 1.2], [15.5, 0, -234, 1.15], [-13.5, 0, -264, 1.3], [13.5, 0, -264, 1.3],
      ];
      const trunkGeo = new THREE.CylinderGeometry(0.14, 0.22, 1.8, 6);
      const canopyGeo = new THREE.DodecahedronGeometry(1.35, 0);
      const canopyEdges = new THREE.EdgesGeometry(canopyGeo, 5);
      const treeLineMat = new THREE.LineBasicMaterial({ color: '#C69C54', transparent: true, opacity: 0.6 });
      const treeOccMat = new THREE.MeshBasicMaterial({ color: '#0B1E1A', transparent: true, opacity: 0.85 });

      treeCoords.forEach(([x, y, z, s]) => {
        const tg = new THREE.Group();
        tg.position.set(x, y, z);
        const trunk = new THREE.Mesh(trunkGeo, treeOccMat);
        trunk.position.y = 0.9 * s;
        trunk.scale.set(s, s, s);
        trunk.add(new THREE.LineSegments(new THREE.EdgesGeometry(trunkGeo, 15), treeLineMat));

        const canopy = new THREE.Mesh(canopyGeo, treeOccMat);
        canopy.position.y = 2.35 * s;
        canopy.scale.set(1.25 * s, 0.95 * s, 1.25 * s);
        canopy.add(new THREE.LineSegments(canopyEdges, treeLineMat));

        tg.add(trunk, canopy);
        scene.add(tg);
      });

      if (!state.prefersReducedMotion) {
        const pCount = isMobile ? 90 : 260;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          pPos[i * 3] = (Math.random() - 0.5) * 34;
          pPos[i * 3 + 1] = 0.8 + Math.random() * 12;
          pPos[i * 3 + 2] = 36 - Math.random() * 310;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: '#DDBE82', size: 0.18, transparent: true, opacity: 0.78 })));
      }

      function registerHotspot(worldPos, label, sublabel, itemPayload) {
        const beacon = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.34, 0),
          new THREE.MeshStandardMaterial({ color: '#C69C54', emissive: '#C69C54', emissiveIntensity: 0.75, metalness: 0.85, roughness: 0.2 })
        );
        beacon.position.set(...worldPos);
        beacon.userData.itemPayload = itemPayload;
        scene.add(beacon);
        threeRuntime.clickableMeshes.push(beacon);

        const ring = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.55, 24), new THREE.MeshBasicMaterial({ color: '#DDBE82', transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(worldPos[0], worldPos[1] - 0.35, worldPos[2]);
        scene.add(ring);

        threeRuntime.hotspots.push({
          beacon,
          baseY: worldPos[1],
          worldVec: new THREE.Vector3(worldPos[0], worldPos[1] + 0.85, worldPos[2]),
          label,
          sublabel,
          itemPayload,
          el: null,
        });
      }

      // SCENE 01 — OPENING GUNUNGAN
      const introGroup = new THREE.Group();
      introGroup.position.set(0, 0, 22);
      const introPedestal = new THREE.Mesh(new THREE.CylinderGeometry(5.8, 6.4, 0.5, 8), new THREE.MeshStandardMaterial({ color: '#1F4A42', roughness: 0.65 }));
      introPedestal.position.y = 0.25;
      const introHalo = new THREE.Mesh(new THREE.RingGeometry(3.9, 4.18, 48), new THREE.MeshBasicMaterial({ color: '#DDBE82', transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
      introHalo.position.set(0, 4.3, -0.6);

      const leftWing = new THREE.Group();
      leftWing.position.set(0, 0.55, 0);
      const lwPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 7.3), new THREE.MeshStandardMaterial({ map: gununganTex, transparent: true, alphaTest: 0.15, emissive: '#8A662C', emissiveIntensity: 0.28, side: THREE.DoubleSide }));
      lwPlane.userData.keepTexture = true;
      lwPlane.position.set(-1.45, 3.7, 0.05);
      const lwPillar = new THREE.Mesh(new THREE.BoxGeometry(0.36, 4.4, 0.36), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.85 }));
      lwPillar.position.set(-3.35, 2.2, 0);
      leftWing.add(lwPlane, lwPillar);

      const rightWing = new THREE.Group();
      rightWing.position.set(0, 0.55, 0);
      const rwPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 7.3), new THREE.MeshStandardMaterial({ map: gununganTex, transparent: true, alphaTest: 0.15, emissive: '#8A662C', emissiveIntensity: 0.28, side: THREE.DoubleSide }));
      rwPlane.userData.keepTexture = true;
      rwPlane.position.set(1.45, 3.7, 0.08);
      const rwPillar = new THREE.Mesh(new THREE.BoxGeometry(0.36, 4.4, 0.36), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.85 }));
      rwPillar.position.set(3.35, 2.2, 0);
      rightWing.add(rwPlane, rwPillar);

      const introEmblem = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), new THREE.MeshBasicMaterial({ map: emblemTex, transparent: true, side: THREE.DoubleSide }));
      introEmblem.userData.keepTexture = true;
      introEmblem.position.set(0, 4.6, -2.5);
      introGroup.add(introPedestal, introHalo, leftWing, rightWing, introEmblem);
      applySilhouetteLineDesign(THREE, introGroup, { lineColor: '#DDBE82' });
      scene.add(introGroup);

      // SCENE 02 — SOLO WORLD LANDMARKS
      const gladag = new THREE.Group();
      gladag.position.set(0, 0, 4);
      [-4.2, 4.2].forEach((px) => {
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 1.6), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
        base.position.set(px, 0.35, 0);
        const col = new THREE.Mesh(new THREE.BoxGeometry(1.15, 3.6, 1.15), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
        col.position.set(px, 2.4, 0);
        const cap = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.25, 1.38), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.85 }));
        cap.position.set(px, 4.3, 0);
        const top = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.35, 4), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
        top.position.set(px, 5.1, 0);
        top.rotation.y = Math.PI / 4;
        gladag.add(base, col, cap, top);
      });
      const gBeam = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.65, 0.9), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
      gBeam.position.set(0, 4.45, 0);
      const gCrest = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.08, 12, 24), new THREE.MeshStandardMaterial({ color: '#C69C54', emissive: '#C69C54', emissiveIntensity: 0.65 }));
      gCrest.position.set(0, 5.4, 0);
      gladag.add(gBeam, gCrest);
      applySilhouetteLineDesign(THREE, gladag);
      scene.add(gladag);

      const tuguJam = new THREE.Group();
      tuguJam.position.set(-9.5, 0, -10);
      [
        [3.2, 0.7, 3.2, 0.35, '#1F4A42'],
        [2.3, 0.6, 2.3, 0.95, '#F4E9D7'],
        [1.35, 4.2, 1.35, 3.3, '#F4E9D7'],
        [1.65, 0.22, 1.65, 5.45, '#C69C54'],
        [1.55, 1.3, 1.55, 6.2, '#14302B'],
      ].forEach(([w, h, d, py, col]) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: col }));
        m.position.y = py;
        tuguJam.add(m);
      });
      const tjRoof = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.4, 4), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.8 }));
      tjRoof.position.y = 7.45;
      tjRoof.rotation.y = Math.PI / 4;
      tuguJam.add(tjRoof);
      applySilhouetteLineDesign(THREE, tuguJam);
      scene.add(tuguJam);

      const keraton = new THREE.Group();
      keraton.position.set(9.5, 0, -22);
      const kBase = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.5, 7.5), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
      kBase.position.y = 0.25;
      const kSanctum = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.0, 3.4), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
      kSanctum.position.y = 1.5;
      const kRoof = buildJogloRoof(THREE, 7.2, 6.2, '#1F4A42');
      kRoof.position.y = 2.65;
      keraton.add(kBase, kSanctum, kRoof);
      applySilhouetteLineDesign(THREE, keraton);
      scene.add(keraton);

      const psb = new THREE.Group();
      psb.position.set(10.5, 0, -34);
      [
        [2.9, 3.2, 0.7, 0.35, '#1F4A42'],
        [2.0, 2.15, 2.8, 2.1, '#F4E9D7'],
        [2.45, 2.45, 0.22, 3.6, '#C69C54'],
        [1.65, 1.75, 2.1, 4.75, '#1F4A42'],
        [2.1, 2.1, 0.18, 5.9, '#DDBE82'],
      ].forEach(([rt, rb, h, py, col]) => {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 8), new THREE.MeshStandardMaterial({ color: col }));
        m.position.y = py;
        psb.add(m);
      });
      const psbRoof = new THREE.Mesh(new THREE.ConeGeometry(2.25, 2.3, 8), new THREE.MeshStandardMaterial({ color: '#14302B' }));
      psbRoof.position.y = 7.1;
      psb.add(psbRoof);
      applySilhouetteLineDesign(THREE, psb);
      scene.add(psb);

      const pendopo = new THREE.Group();
      pendopo.position.set(-9.5, 0, -36);
      const pBase = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.56, 7.2), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
      pBase.position.y = 0.28;
      pendopo.add(pBase);
      [-3, -1, 1, 3].forEach((px) =>
        [-2.3, 0, 2.3].forEach((pz) => {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.4, 10), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.85 }));
          col.position.set(px, 1.85, pz);
          pendopo.add(col);
        })
      );
      const pRoof = buildJogloRoof(THREE, 8.6, 7.4, '#14302B');
      pRoof.position.y = 3.05;
      pendopo.add(pRoof);
      applySilhouetteLineDesign(THREE, pendopo);
      scene.add(pendopo);

      // SCENE 03 — MAIN CONFERENCE PAVILION
      const confPav = new THREE.Group();
      confPav.position.set(0, 0, -66);
      const cpBase = new THREE.Mesh(new THREE.CylinderGeometry(10.5, 11.4, 0.6, 32), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
      cpBase.position.y = 0.3;
      const cpBody = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.8, 3.3, 16), new THREE.MeshStandardMaterial({ color: '#14302B', metalness: 0.4, roughness: 0.25 }));
      cpBody.position.y = 2.35;
      const cpRoof = buildJogloRoof(THREE, 9.6, 9.6, '#1F4A42');
      cpRoof.position.y = 4.0;
      const cpSign = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 2.15), new THREE.MeshBasicMaterial({ map: createPlaqueTexture('IOMU 2027', 'HOTEL ALILA SOLO · SURAKARTA', 'dark') }));
      cpSign.userData.keepTexture = true;
      cpSign.position.set(0, 2.75, 6.95);
      const cpCrystal = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.0), new THREE.MeshBasicMaterial({ map: emblemTex, transparent: true, side: THREE.DoubleSide }));
      cpCrystal.userData.keepTexture = true;
      cpCrystal.position.set(0, 6.9, 0);
      confPav.add(cpBase, cpBody, cpRoof, cpSign, cpCrystal);
      applySilhouetteLineDesign(THREE, confPav, { lineColor: '#F4E9D7', accentColor: '#C69C54' });
      scene.add(confPav);

      // SCENE 04 — 4 WORKSHOP PAVILIONS
      EVENT_DATA.pavilions.forEach((pav) => {
        const g = new THREE.Group();
        g.position.set(...pav.position);
        const plinth = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 0.5, 8), new THREE.MeshStandardMaterial({ color: '#14302B' }));
        plinth.position.y = 0.25;
        g.add(plinth);
        if (pav.accentStyle === 'tajug') {
          const b = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.4, 4.4), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
          b.position.y = 1.8;
          const r = buildJogloRoof(THREE, 5.6, 5.6, '#1F4A42');
          r.position.y = 3.0;
          g.add(b, r);
        } else if (pav.accentStyle === 'studio') {
          const b1 = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.9, 3.6), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
          b1.position.y = 1.5;
          const b2 = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.1, 2.8), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
          b2.position.y = 2.7;
          g.add(b1, b2);
        } else if (pav.accentStyle === 'rotunda') {
          const cyl = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.7, 2.6, 8), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
          cyl.position.y = 1.85;
          const dome = new THREE.Mesh(new THREE.SphereGeometry(2.2, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
          dome.position.y = 3.25;
          g.add(cyl, dome);
        } else {
          [-1.7, 1.7].forEach((px) =>
            [-1.7, 1.7].forEach((pz) => {
              const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 2.3, 10), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.85 }));
              col.position.set(px, 1.7, pz);
              g.add(col);
            })
          );
          const r = buildJogloRoof(THREE, 5.2, 5.2, '#14302B');
          r.position.y = 2.85;
          g.add(r);
        }
        applySilhouetteLineDesign(THREE, g);
        scene.add(g);
        registerHotspot([pav.position[0], 5.6, pav.position[2]], pav.shortTitle, 'Explore', { kind: 'pavilion', data: pav });
      });

      // SCENE 05 — SPEAKERS GALLERY: FLOATING 3D BOXES WITH NAMES
      const speakerBoxNodes = [];
      const floatingSpeakerItems = [
        ...EVENT_DATA.conferenceSpeakers.slice(0, 4),
        ...EVENT_DATA.workshopSpeakers.slice(0, 4),
      ];
      const floatingPositions = [
        [-8.5, 2.5, -138],
        [8.5, 3.2, -141],
        [-9.0, 3.6, -146],
        [8.8, 2.4, -149],
        [-8.4, 2.8, -154],
        [8.6, 3.5, -157],
        [-8.8, 3.3, -161],
        [8.4, 2.6, -164],
      ];

      floatingSpeakerItems.forEach((sp, idx) => {
        const pos = floatingPositions[idx];
        const g = new THREE.Group();
        g.position.set(pos[0], pos[1], pos[2]);
        const baseRotY = pos[0] < 0 ? Math.PI * 0.16 : -Math.PI * 0.16;
        g.rotation.y = baseRotY;

        const boxMesh = new THREE.Mesh(
          new THREE.BoxGeometry(3.4, 1.9, 0.44),
          new THREE.MeshStandardMaterial({ color: '#14302B', roughness: 0.45 })
        );
        boxMesh.userData.itemPayload = { kind: 'speaker', data: sp };
        threeRuntime.clickableMeshes.push(boxMesh);

        const roleSnippet = L(sp.positionTitle).slice(0, 30);
        const namePlaque = new THREE.Mesh(
          new THREE.PlaneGeometry(3.15, 1.65),
          new THREE.MeshBasicMaterial({
            map: createPlaqueTexture(L(sp.fullName).toUpperCase(), `${L(sp.slotLabel)} · ${roleSnippet}`, 'dark'),
          })
        );
        namePlaque.userData.keepTexture = true;
        namePlaque.position.set(0, 0, 0.24);

        const backPlaque = namePlaque.clone();
        backPlaque.userData.keepTexture = true;
        backPlaque.position.set(0, 0, -0.24);
        backPlaque.rotation.y = Math.PI;

        g.add(boxMesh, namePlaque, backPlaque);
        applySilhouetteLineDesign(THREE, g, { lineColor: '#F4E9D7', accentColor: '#C69C54' });
        scene.add(g);

        speakerBoxNodes.push({ group: g, baseY: pos[1], baseRotY, idx });
        registerHotspot([pos[0], pos[1] + 1.45, pos[2]], sp.slotLabel, 'TBA', { kind: 'speaker', data: sp });
      });

      // SCENE 06 — AGENDA BRIDGE & 3 DAY MILESTONES
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(14, 0.5, 28), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
      bridge.position.set(0, 0.25, -184);
      applySilhouetteLineDesign(THREE, bridge);
      scene.add(bridge);

      const agendaOrbs = [];
      EVENT_DATA.agendaDays.forEach((day, idx) => {
        const g = new THREE.Group();
        g.position.set(...day.worldPosition);
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.2, 2.6, 8), new THREE.MeshStandardMaterial({ color: '#14302B' }));
        pillar.position.y = 1.8;
        const plaque = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.05), new THREE.MeshBasicMaterial({ map: createPlaqueTexture(day.label.en.toUpperCase(), day.fullDate.en.toUpperCase(), 'cream') }));
        plaque.userData.keepTexture = true;
        plaque.position.set(0, 2.2, 1.05);
        const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), new THREE.MeshStandardMaterial({ color: '#C69C54', emissive: '#C69C54', emissiveIntensity: 0.7, metalness: 0.85 }));
        orb.position.y = 4.6;
        agendaOrbs.push({ orb, idx });
        g.add(pillar, plaque, orb);
        applySilhouetteLineDesign(THREE, g, { lineColor: '#F4E9D7' });
        scene.add(g);
      });

      // SCENE 07 — EXPERIENCE SURAKARTA
      const mosque = new THREE.Group();
      mosque.position.set(-9.5, 0, -214);
      const mCourtyard = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.6, 9.2), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
      mCourtyard.position.y = 0.3;
      const mHall = new THREE.Mesh(new THREE.BoxGeometry(6.6, 2.5, 6.6), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
      mHall.position.y = 1.85;
      const mDome = new THREE.Mesh(new THREE.SphereGeometry(2.35, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
      mDome.position.y = 3.4;
      mosque.add(mCourtyard, mHall, mDome);
      [[-3.7, -3.7], [3.7, -3.7], [-3.7, 3.7], [3.7, 3.7]].forEach(([mx, mz]) => {
        const min = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.36, 6.4, 8), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
        min.position.set(mx, 3.5, mz);
        const top = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.9, 8), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.85 }));
        top.position.set(mx, 6.85, mz);
        mosque.add(min, top);
      });
      applySilhouetteLineDesign(THREE, mosque, { thresholdAngle: 8 });
      scene.add(mosque);

      const obelisk = new THREE.Group();
      obelisk.position.set(8.5, 0, -220);
      const oBase = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.7, 3.4), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
      oBase.position.y = 0.35;
      const oShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.68, 5.0, 4), new THREE.MeshStandardMaterial({ color: '#F4E9D7' }));
      oShaft.position.y = 3.8;
      const oTip = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.85, 4), new THREE.MeshStandardMaterial({ color: '#C69C54', emissive: '#C69C54', emissiveIntensity: 0.65 }));
      oTip.position.y = 6.65;
      oTip.rotation.y = Math.PI / 4;
      obelisk.add(oBase, oShaft, oTip);
      applySilhouetteLineDesign(THREE, obelisk);
      scene.add(obelisk);

      // SCENE 08 — HOTEL ALILA SOLO (Official Venue)
      const alilaGroup = new THREE.Group();
      alilaGroup.position.set(...EVENT_DATA.mainHotel.position);
      const aPodium = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.2, 5.2), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
      aPodium.position.y = 0.6;
      const aTower = new THREE.Mesh(new THREE.BoxGeometry(3.4, 7.2, 2.8), new THREE.MeshStandardMaterial({ color: '#F4E9D7', roughness: 0.35 }));
      aTower.position.set(-0.6, 4.9, 0);
      const aWing = new THREE.Mesh(new THREE.BoxGeometry(2.2, 5.0, 2.2), new THREE.MeshStandardMaterial({ color: '#14302B', roughness: 0.35 }));
      aWing.position.set(1.4, 3.8, 0.3);
      const aCrown = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 3.0), new THREE.MeshStandardMaterial({ color: '#C69C54', emissive: '#8A662C', emissiveIntensity: 0.45, metalness: 0.88 }));
      aCrown.position.set(-0.6, 8.75, 0);
      alilaGroup.add(aPodium, aTower, aWing, aCrown);
      [-1.8, -0.6, 0.6, 1.8].forEach((fx) => {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 7.0, 0.12), new THREE.MeshStandardMaterial({ color: '#C69C54', metalness: 0.9 }));
        fin.position.set(fx, 5.0, 1.44);
        alilaGroup.add(fin);
      });
      applySilhouetteLineDesign(THREE, alilaGroup, { lineColor: '#F4E9D7', accentColor: '#C69C54' });
      scene.add(alilaGroup);
      registerHotspot([-8.5, 10.0, -236], 'Hotel Alila Solo', 'Venue', { kind: 'hotel', data: EVENT_DATA.mainHotel });

      EVENT_DATA.landmarks.forEach((lm) => {
        registerHotspot(
          [lm.position[0] + lm.pinOffset[0], lm.position[1] + lm.pinOffset[1], lm.position[2] + lm.pinOffset[2]],
          lm.name,
          lm.sublabel,
          { kind: 'landmark', data: lm }
        );
      });

      // SCENE 09 — REGISTRATION GATEWAY (z = -268)
      const regGate = new THREE.Group();
      regGate.position.set(0, 0, -268);
      const rgBase = new THREE.Mesh(new THREE.CylinderGeometry(9.2, 10.0, 0.56, 24), new THREE.MeshStandardMaterial({ color: '#1F4A42' }));
      rgBase.position.y = 0.28;
      regGate.add(rgBase);
      [-4.2, 4.2].forEach((px) => {
        const col = new THREE.Mesh(new THREE.BoxGeometry(1.3, 5.2, 1.3), new THREE.MeshStandardMaterial({ color: '#14302B' }));
        col.position.set(px, 3.0, 0);
        regGate.add(col);
      });
      const rgArch = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.26, 8, 36, Math.PI), new THREE.MeshStandardMaterial({ color: '#C69C54', emissive: '#C69C54', emissiveIntensity: 0.5, metalness: 0.9 }));
      rgArch.position.y = 5.2;
      const rgCrest = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.4), new THREE.MeshBasicMaterial({ map: gununganTex, transparent: true, side: THREE.DoubleSide }));
      rgCrest.userData.keepTexture = true;
      rgCrest.position.set(0, 9.35, 0.2);
      const rgSign = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 2.0), new THREE.MeshBasicMaterial({ map: createPlaqueTexture('BE PART OF IOMU 2027', 'HOTEL ALILA SOLO · MAY 7–9, 2027', 'dark') }));
      rgSign.userData.keepTexture = true;
      rgSign.position.set(0, 4.75, 0.65);

      // Archway Center 3D Logo Panel directly beneath BE PART OF IOMU 2027 sign
      const rgLogoArchGroup = new THREE.Group();
      rgLogoArchGroup.position.set(0, 2.65, 0.72);
      const rgLogoArchFrame = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.32, 0.26), new THREE.MeshStandardMaterial({ color: '#14302B' }));
      const rgLogoArchFront = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 2.08), new THREE.MeshBasicMaterial({ map: logoFinal3dTex, transparent: true }));
      rgLogoArchFront.userData.keepTexture = true;
      rgLogoArchFront.position.set(0, 0, 0.15);
      rgLogoArchGroup.add(rgLogoArchFrame, rgLogoArchFront);

      regGate.add(rgArch, rgCrest, rgSign, rgLogoArchGroup);
      applySilhouetteLineDesign(THREE, regGate, { lineColor: '#F4E9D7', accentColor: '#C69C54' });
      scene.add(regGate);

      const posCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 3.2, 36.5),
        new THREE.Vector3(0.4, 3.4, 24.5),
        new THREE.Vector3(2.8, 4.7, 11.5),
        new THREE.Vector3(-2.6, 4.8, -14.0),
        new THREE.Vector3(0.0, 5.0, -47.0),
        new THREE.Vector3(0.0, 6.2, -88.0),
        new THREE.Vector3(0.0, 3.5, -131.0),
        new THREE.Vector3(0.0, 5.2, -168.0),
        new THREE.Vector3(2.0, 5.0, -199.0),
        new THREE.Vector3(1.5, 5.4, -225.0),
        new THREE.Vector3(0.0, 3.8, -250.0),
      ]);
      const lookCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 2.8, 22),
        new THREE.Vector3(0, 2.4, 6),
        new THREE.Vector3(0, 2.2, -12),
        new THREE.Vector3(0.5, 2.4, -36),
        new THREE.Vector3(0, 2.6, -68),
        new THREE.Vector3(0, 2.0, -110),
        new THREE.Vector3(0, 2.3, -152),
        new THREE.Vector3(0, 2.2, -186),
        new THREE.Vector3(0, 2.8, -218),
        new THREE.Vector3(-4.5, 3.8, -236),
        new THREE.Vector3(0, 3.1, -268),
      ]);

      const hotspotLayer = document.getElementById('iomu-hotspots-layer');
      threeRuntime.hotspots.forEach((hs) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-[#C69C54]/80 bg-[#14302B]/90 px-2.5 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-[11px] font-display font-bold text-[#F4E9D7] shadow-lg transition hover:bg-[#C69C54] hover:text-[#14302B] whitespace-nowrap';
        btn.innerHTML = `<span class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#C69C54]"></span><span>${L(hs.label)}</span>`;
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          selectItem(hs.itemPayload);
        });
        hotspotLayer.appendChild(btn);
        hs.el = btn;
      });

      const pointer = { x: 0, y: 0 };
      const raycaster = new THREE.Raycaster();
      const pointerVec = new THREE.Vector2();
      window.addEventListener('pointermove', (e) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
      canvas.addEventListener('click', (e) => {
        pointerVec.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointerVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointerVec, camera);
        const hits = raycaster.intersectObjects(threeRuntime.clickableMeshes, false);
        if (hits.length > 0 && hits[0].object.userData.itemPayload) {
          selectItem(hits[0].object.userData.itemPayload);
        }
      });

      window.addEventListener('resize', () => {
        const mobileViewport = window.innerWidth < 768;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileViewport ? 1.25 : 1.75));
        camera.fov = getResponsiveFov();
        camera.aspect = window.innerWidth / Math.max(1, window.innerHeight);
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      const currentPos = new THREE.Vector3(0, 3.2, 36.5);
      const currentLook = new THREE.Vector3(0, 2.8, 22);
      const targetPos = new THREE.Vector3();
      const targetLook = new THREE.Vector3();
      const projVec = new THREE.Vector3();
      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);
        if (state.liteMode) return;

        const dt = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.getElapsedTime();
        const alpha = state.prefersReducedMotion ? 0.35 : 1 - Math.exp(-4.5 * dt);

        const introP = Math.max(0, Math.min(1, state.scrollProgress / 0.12));
        const eased = introP * introP * (3 - 2 * introP);
        leftWing.position.x = -eased * 5.2;
        leftWing.rotation.y = eased * 0.65;
        rightWing.position.x = eased * 5.2;
        rightWing.rotation.y = -eased * 0.65;

        if (!state.prefersReducedMotion) {
          introHalo.rotation.z = elapsed * 0.14;
          introEmblem.position.y = 4.6 + Math.sin(elapsed * 1.4) * 0.18;
          cpCrystal.rotation.y = elapsed * 0.45;
          cpCrystal.position.y = 6.9 + Math.sin(elapsed * 1.5) * 0.16;
          speakerBoxNodes.forEach(({ group, baseY, baseRotY, idx }) => {
            group.position.y = baseY + Math.sin(elapsed * 1.55 + idx * 0.85) * 0.22;
            group.rotation.y = baseRotY + Math.sin(elapsed * 0.8 + idx) * 0.04;
            group.rotation.z = Math.sin(elapsed * 1.1 + idx) * 0.02;
          });
          agendaOrbs.forEach(({ orb, idx }) => {
            orb.position.y = 4.6 + Math.sin(elapsed * 1.8 + idx * 1.2) * 0.16;
            orb.rotation.y = elapsed * 0.6 + idx;
          });
        }

        if (state.selectedItem && state.selectedItem.data.cameraFocusPos && state.selectedItem.data.cameraLookAt) {
          targetPos.set(...state.selectedItem.data.cameraFocusPos);
          targetLook.set(...state.selectedItem.data.cameraLookAt);
        } else {
          const tVal = Math.max(0, Math.min(1, state.scrollProgress));
          posCurve.getPointAt(tVal, targetPos);
          lookCurve.getPointAt(tVal, targetLook);
          if (window.innerWidth < 768) {
            targetPos.z += 3.2;
          }
          if (!state.prefersReducedMotion) {
            targetPos.x += pointer.x * 0.65;
            targetPos.y += pointer.y * 0.35;
          }
        }
        currentPos.lerp(targetPos, alpha);
        currentLook.lerp(targetLook, alpha);
        camera.position.copy(currentPos);
        camera.lookAt(currentLook);

        const maxHotspotDist = window.innerWidth < 640 ? 34 : 44;
        threeRuntime.hotspots.forEach((hs) => {
          if (!state.prefersReducedMotion) {
            hs.beacon.rotation.y = elapsed * 0.9;
            hs.beacon.position.y = hs.baseY + Math.sin(elapsed * 2.4) * 0.14;
          }
          projVec.copy(hs.worldVec).project(camera);
          const dist = camera.position.distanceTo(hs.worldVec);
          if (projVec.z < 1 && projVec.z > -1 && dist < maxHotspotDist && hs.el) {
            hs.el.style.display = 'flex';
            hs.el.style.left = `${(projVec.x * 0.5 + 0.5) * window.innerWidth}px`;
            hs.el.style.top = `${(-projVec.y * 0.5 + 0.5) * window.innerHeight}px`;
          } else if (hs.el) {
            hs.el.style.display = 'none';
          }
        });

        renderer.render(scene, camera);
      }

      state.webglReady = true;
      showFallbackBackdrop(false);
      animate();
    } catch (err) {
      console.warn('WebGL unavailable, activating Heritage 2D fallback:', err);
      showFallbackBackdrop(true);
    }
  }

  function refreshHotspotLabels() {
    threeRuntime.hotspots.forEach((hs) => {
      if (hs.el) {
        const spans = hs.el.querySelectorAll('span');
        if (spans[1]) spans[1].textContent = L(hs.label);
      }
    });
  }

  function showFallbackBackdrop(visible) {
    const fb = document.getElementById('iomu-fallback-backdrop');
    const canvas = document.getElementById('iomu-webgl-canvas');
    const hsLayer = document.getElementById('iomu-hotspots-layer');
    if (fb) fb.classList.toggle('hidden', !visible);
    if (canvas) canvas.classList.toggle('hidden', visible);
    if (hsLayer) hsLayer.classList.toggle('hidden', visible);
  }

  function navigateToChapter(id) {
    closeDetailDrawer();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function selectItem(payload) {
    state.selectedItem = payload;
    const overlays = document.getElementById('iomu-chapters-wrapper');
    if (overlays) overlays.classList.add('opacity-10', 'pointer-events-none');
    renderDetailDrawer();
  }

  function closeDetailDrawer() {
    state.selectedItem = null;
    const overlays = document.getElementById('iomu-chapters-wrapper');
    if (overlays) overlays.classList.remove('opacity-10', 'pointer-events-none');
    renderDetailDrawer();
  }

  function renderDetailDrawer() {
    const drawer = document.getElementById('iomu-detail-drawer');
    if (!drawer) return;
    if (!state.selectedItem) {
      drawer.classList.add('hidden');
      drawer.innerHTML = '';
      return;
    }

    const { kind, data } = state.selectedItem;
    let badge = '';
    let title = '';
    let bodyHtml = '';

    if (kind === 'landmark') {
      badge = L(data.category);
      title = data.name;
      bodyHtml = `
        ${data.photo ? `<figure class="space-y-2"><div class="iomu-arch-frame mx-auto max-w-[240px] overflow-hidden bg-keraton"><img src="${data.photo}" alt="${data.name}" loading="lazy" data-fallback="${data.fallbackPhoto || ''}" onerror="if(this.dataset.fallback && this.src!==this.dataset.fallback){this.src=this.dataset.fallback;}" class="h-56 sm:h-64 w-full object-cover" /></div><figcaption class="text-center text-[11px] text-emerald">${data.photoCredit || ''}</figcaption></figure>` : ''}
        <p class="leading-relaxed text-keraton">${L(data.description)}</p>
        <div class="rounded-2xl border border-kawung-gold/40 bg-white/70 p-4"><p class="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">${t('culturalHighlight')}</p><p class="mt-1 text-xs leading-relaxed text-emerald">${L(data.culturalHighlight)}</p></div>
        <p class="text-[11px] italic text-emerald/85">${L(data.stylizedNote)}</p>
        <a href="${data.mapUrl}" target="_blank" rel="noreferrer" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-keraton px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory hover:bg-emerald">${t('openMapDirections')} ↗</a>
      `;
    } else if (kind === 'destination') {
      badge = L(data.category);
      title = data.name;
      const fallbackAttr = data.fallbackImage || '';
      const googlePhotoHref = data.googlePhotosUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(data.name + ' Solo Surakarta')}`;
      bodyHtml = `
        <figure class="space-y-2"><div class="iomu-arch-frame mx-auto max-w-[280px] overflow-hidden bg-keraton"><img src="${data.image}" alt="${data.name}" loading="lazy" data-fallback="${fallbackAttr}" onerror="if(this.dataset.fallback && this.src!==this.dataset.fallback){this.src=this.dataset.fallback;}" class="h-56 sm:h-64 w-full object-cover" /></div><figcaption class="text-center text-[11px] text-emerald">${data.imageCaption}</figcaption></figure>
        ${data.secondaryImage && data.secondaryImage !== data.image ? `<div class="overflow-hidden rounded-2xl border border-kawung-gold/50 bg-keraton"><img src="${data.secondaryImage}" alt="${data.name} — Referensi" loading="lazy" data-fallback="${fallbackAttr}" onerror="this.closest('div').style.display='none'" class="h-36 w-full object-cover" /></div>` : ''}
        <div class="rounded-2xl border border-kawung-gold/50 bg-white/85 p-4 space-y-2"><p class="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">${L(data.narrativeTitle)}</p><p class="text-xs leading-relaxed text-keraton">${L(data.narrativeStory)}</p></div>
        <div class="rounded-2xl border border-kawung-gold/40 bg-white/70 p-4"><p class="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">${t('visitorTip')}</p><p class="mt-1 text-xs leading-relaxed text-emerald">${L(data.culturalTip)}</p><p class="mt-1.5 text-[11px] font-semibold text-keraton">${t('areaLabel')}: ${data.locationNote}</p></div>
        <div class="grid gap-2 sm:grid-cols-2">
          <a href="${data.mapUrl}" target="_blank" rel="noreferrer" class="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-keraton px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory hover:bg-emerald">${t('viewGoogleMaps')} ↗</a>
          <a href="${googlePhotoHref}" target="_blank" rel="noreferrer" class="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-kawung-gold bg-white px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-keraton hover:bg-ivory">📷 ${t('googlePhotos')} ↗</a>
        </div>
      `;
    } else if (kind === 'hotel') {
      badge = L(data.tier);
      title = data.name;
      bodyHtml = `
        <div class="rounded-2xl border border-kawung-gold/50 bg-keraton/95 backdrop-blur-sm iomu-kawung-accent p-4 text-ivory"><p class="font-display text-xs font-bold uppercase tracking-wider text-light-gold">${L(data.distanceFromAlila)}</p><p class="mt-2 text-xs leading-relaxed text-ivory/90">${data.address}</p></div>
        <p class="leading-relaxed text-keraton">${L(data.summary)}</p>
        <div class="rounded-2xl border border-kawung-gold/45 bg-white/85 p-4"><p class="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">${t('highlightsTitle')}</p><ul class="mt-2 space-y-1.5 text-xs text-emerald list-disc list-inside">${L(data.highlights).map((h) => `<li>${h}</li>`).join('')}</ul><p class="mt-3 border-t border-kawung-gold/30 pt-2 text-[11px] font-semibold text-dark-gold">${L(data.bookingStatus)}</p></div>
        <a href="${data.mapUrl}" target="_blank" rel="noreferrer" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-keraton px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory hover:bg-emerald">${t('viewGoogleMaps')} ↗</a>
      `;
    } else if (kind === 'pavilion') {
      badge = L(data.tagline);
      title = L(data.shortTitle);
      const items = EVENT_DATA.programs.filter((p) => p.category === data.category);
      bodyHtml = `
        <p class="leading-relaxed text-keraton">${L(data.summary)}</p>
        <div class="space-y-3"><h4 class="font-display text-xs font-bold uppercase tracking-wider text-dark-gold">${t('programEntries')}</h4>
        ${items.map((prog) => `<div class="rounded-2xl border border-kawung-gold/50 bg-white/80 p-4 space-y-2"><div class="flex items-start justify-between gap-2"><h5 class="font-display text-sm font-bold text-keraton">${L(prog.title)}</h5><span class="shrink-0 rounded-full border border-dark-gold/40 bg-ivory px-2.5 py-0.5 text-[10px] font-bold text-dark-gold">${prog.status}</span></div><p class="text-xs leading-relaxed text-emerald">${L(prog.description)}</p><div class="text-[11px] text-keraton/85 space-y-1 pt-1"><div><strong>${t('dateLabel')}:</strong> ${L(prog.date)}</div><div><strong>${t('timeLabel')}:</strong> ${L(prog.time)}</div><div><strong>${t('speakerLabel')}:</strong> ${L(prog.speaker)}</div><div><strong>${t('roomLabel')}:</strong> ${prog.room}</div></div><p class="border-t border-kawung-gold/25 pt-2 text-[11px] font-semibold text-dark-gold">${L(prog.registrationAvailability)}</p></div>`).join('')}</div>
      `;
    } else if (kind === 'speaker') {
      badge = L(data.slotLabel);
      title = L(data.fullName);
      bodyHtml = `
        <div class="iomu-arch-frame mx-auto flex h-44 w-36 flex-col items-center justify-center bg-keraton p-4 text-center text-ivory"><span class="font-display text-xs font-bold uppercase tracking-wider text-light-gold">${data.status}</span></div>
        <div class="space-y-3 rounded-2xl border border-kawung-gold/45 bg-white/80 p-4 text-xs">
          <div><span class="font-bold uppercase tracking-wider text-dark-gold">${t('roleTrackLabel')}</span><p class="mt-0.5 font-semibold text-keraton">${L(data.positionTitle)}</p></div>
          <div><span class="font-bold uppercase tracking-wider text-dark-gold">${t('titlesLabel')}</span><p class="mt-0.5 text-keraton">${L(data.titles)}</p></div>
          <div><span class="font-bold uppercase tracking-wider text-dark-gold">${t('institutionLabel')}</span><p class="mt-0.5 text-keraton">${L(data.institution)}</p></div>
          <div><span class="font-bold uppercase tracking-wider text-dark-gold">${t('presentationLabel')}</span><p class="mt-0.5 text-keraton">${L(data.presentationTitle)}</p></div>
          <div><span class="font-bold uppercase tracking-wider text-dark-gold">${t('bioLabel')}</span><p class="mt-0.5 leading-relaxed text-emerald">${L(data.biography)}</p></div>
        </div>
      `;
    }

    drawer.classList.remove('hidden');
    drawer.innerHTML = `
      <div class="relative flex items-start justify-between gap-4 border-b border-kawung-gold/40 bg-ivory/95 px-6 py-4">
        <div><span class="inline-block rounded-full bg-emerald/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-dark-gold">${badge}</span><h3 class="mt-1 font-display text-lg font-extrabold text-keraton">${title}</h3></div>
        <button id="iomu-close-drawer" type="button" class="rounded-full border border-dark-gold/40 bg-white px-2.5 py-1 text-xs font-bold text-keraton hover:bg-kawung-gold">✕</button>
      </div>
      <div class="relative flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm">${bodyHtml}</div>
      <div class="relative border-t border-kawung-gold/40 bg-ivory/95 px-6 py-3"><button id="iomu-return-journey" type="button" class="w-full rounded-xl border border-keraton/25 bg-white py-2 font-display text-xs font-bold uppercase tracking-wider text-keraton hover:bg-kawung-gold">${t('returnJourney')}</button></div>
    `;
    document.getElementById('iomu-close-drawer').onclick = closeDetailDrawer;
    document.getElementById('iomu-return-journey').onclick = closeDetailDrawer;
  }

  function updateHUD() {
    const ch = EVENT_DATA.chapters.find((c) => c.index === state.activeChapterIndex) || EVENT_DATA.chapters[0];
    const titleEl = document.getElementById('iomu-hud-title');
    const barEl = document.getElementById('iomu-hud-bar');
    const pctEl = document.getElementById('iomu-hud-pct');
    const prevBtn = document.getElementById('iomu-hud-prev');
    const nextBtn = document.getElementById('iomu-hud-next');

    if (titleEl) titleEl.textContent = `${ch.code} — ${L(ch.title)}`;
    const pct = Math.round(state.scrollProgress * 100);
    if (barEl) barEl.style.width = `${Math.max(4, pct)}%`;
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (prevBtn) prevBtn.disabled = ch.index <= 1;
    if (nextBtn) nextBtn.disabled = ch.index >= EVENT_DATA.chapters.length;

    const ribbonEl = document.getElementById('iomu-chapter-ribbon');
    document.querySelectorAll('[data-nav-chapter]').forEach((btn) => {
      const idx = Number(btn.getAttribute('data-nav-chapter'));
      btn.className = idx === ch.index
        ? 'shrink-0 whitespace-nowrap rounded-full px-3 py-1 font-sans text-[11px] sm:text-xs font-semibold tracking-wide transition bg-kawung-gold text-keraton shadow-sm'
        : 'shrink-0 whitespace-nowrap rounded-full px-3 py-1 font-sans text-[11px] sm:text-xs font-semibold tracking-wide transition text-ivory/90 hover:bg-emerald/70 hover:text-light-gold';
      if (idx === ch.index && ribbonEl && ribbonEl.scrollWidth > ribbonEl.clientWidth) {
        const targetLeft = btn.offsetLeft - ribbonEl.clientWidth / 2 + btn.clientWidth / 2;
        ribbonEl.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      }
    });
  }

  function renderSpeakersLists() {
    const q = state.speakerSearch.trim().toLowerCase();
    const wsFiltered = EVENT_DATA.workshopSpeakers.filter((s) => !q || L(s.positionTitle).toLowerCase().includes(q) || L(s.slotLabel).toLowerCase().includes(q));
    const confFiltered = EVENT_DATA.conferenceSpeakers.filter((s) => !q || L(s.positionTitle).toLowerCase().includes(q) || L(s.slotLabel).toLowerCase().includes(q));
    const confVisible = state.showAllConfSpeakers || q ? confFiltered : confFiltered.slice(0, 12);

    const wsCount = document.getElementById('iomu-ws-speaker-count');
    const confCount = document.getElementById('iomu-conf-speaker-count');
    const wsGrid = document.getElementById('iomu-ws-speakers-grid');
    const confGrid = document.getElementById('iomu-conf-speakers-grid');
    const toggleBtn = document.getElementById('iomu-toggle-all-conf');

    if (wsCount) wsCount.textContent = `${t('wsListTitle')} (${wsFiltered.length} / 15)`;
    if (confCount) confCount.textContent = `${t('confListTitle')} (${confFiltered.length} / 42)`;
    if (toggleBtn) {
      toggleBtn.classList.toggle('hidden', Boolean(q));
      toggleBtn.textContent = state.showAllConfSpeakers
        ? t('showCompact')
        : `${t('showAllPrefix')} ${confFiltered.length} ${t('confSpeakersSuffix')}`;
    }

    if (wsGrid) {
      wsGrid.innerHTML = wsFiltered
        .map(
          (sp) => `
        <button type="button" data-select-ws-speaker="${sp.id}" class="flex flex-col items-center rounded-2xl border border-kawung-gold/50 bg-emerald/45 backdrop-blur-sm iomu-kawung-accent p-3.5 text-center transition hover:-translate-y-1 hover:border-kawung-gold hover:bg-emerald/80">
          <div class="iomu-arch-frame flex h-28 w-24 flex-col items-center justify-center bg-keraton p-2 shadow-md ring-2 ring-ivory/90">
            <span class="font-display text-[9px] font-bold uppercase tracking-wider text-kawung-gold">${t('photoTba')}</span>
          </div>
          <div class="mt-3 w-full rounded-xl border border-kawung-gold/45 bg-ivory px-2.5 py-2 text-keraton">
            <p class="text-[9px] font-bold uppercase tracking-wider text-dark-gold">${L(sp.slotLabel)}</p>
            <h4 class="mt-0.5 font-display text-xs font-extrabold text-keraton">${L(sp.fullName)}</h4>
            <p class="mt-0.5 line-clamp-2 text-[10px] font-medium text-emerald">${L(sp.positionTitle)}</p>
          </div>
        </button>`
        )
        .join('');
      wsGrid.querySelectorAll('[data-select-ws-speaker]').forEach((el) => {
        el.addEventListener('click', () => {
          const sp = EVENT_DATA.workshopSpeakers.find((s) => s.id === el.getAttribute('data-select-ws-speaker'));
          if (sp) selectItem({ kind: 'speaker', data: sp });
        });
      });
    }

    if (confGrid) {
      confGrid.innerHTML = confVisible
        .map(
          (sp) => `
        <button type="button" data-select-conf-speaker="${sp.id}" class="flex flex-col items-center rounded-2xl border border-kawung-gold/45 bg-emerald/40 backdrop-blur-sm iomu-kawung-accent p-3 text-center transition hover:-translate-y-1 hover:border-kawung-gold hover:bg-emerald/75">
          <div class="iomu-arch-frame flex h-24 w-20 flex-col items-center justify-center bg-keraton p-2 shadow-sm ring-2 ring-ivory/85">
            <span class="font-display text-[9px] font-bold uppercase tracking-wider text-kawung-gold">${t('photoTba')}</span>
          </div>
          <div class="mt-2.5 w-full rounded-xl border border-kawung-gold/40 bg-ivory px-2 py-2 text-keraton">
            <p class="text-[9px] font-bold uppercase tracking-wider text-dark-gold">${L(sp.slotLabel)}</p>
            <h4 class="mt-0.5 font-display text-[11px] font-extrabold text-keraton">${L(sp.fullName)}</h4>
            <p class="mt-0.5 line-clamp-2 text-[10px] font-medium text-emerald">${L(sp.positionTitle)}</p>
          </div>
        </button>`
        )
        .join('');
      confGrid.querySelectorAll('[data-select-conf-speaker]').forEach((el) => {
        el.addEventListener('click', () => {
          const sp = EVENT_DATA.conferenceSpeakers.find((s) => s.id === el.getAttribute('data-select-conf-speaker'));
          if (sp) selectItem({ kind: 'speaker', data: sp });
        });
      });
    }
  }

  function renderProgramGrid() {
    const container = document.getElementById('iomu-program-grid');
    if (!container) return;
    const filtered = EVENT_DATA.programs.filter((p) => state.activeProgramFilter === 'All' || p.category === state.activeProgramFilter);
    // Home Ivory Glass Theme Cards
    container.innerHTML = filtered
      .map(
        (prog) => `
      <article class="rounded-2xl border border-kawung-gold/60 bg-white/80 p-5 text-keraton shadow-sm backdrop-blur-sm">
        <div class="flex items-start justify-between gap-2">
          <span class="text-[11px] font-bold uppercase tracking-wider text-dark-gold">${prog.category}</span>
          <span class="rounded-full border border-dark-gold/40 bg-ivory px-2.5 py-0.5 text-[10px] font-bold text-dark-gold">${t('statusPrefix')}: ${prog.status}</span>
        </div>
        <h3 class="mt-1.5 font-display text-base font-bold text-keraton">${L(prog.title)}</h3>
        <p class="mt-1.5 text-xs leading-relaxed text-emerald">${L(prog.description)}</p>
        <dl class="mt-3 grid grid-cols-2 gap-2 border-t border-kawung-gold/25 pt-3 text-[11px] text-keraton">
          <div><dt class="font-bold text-dark-gold">${t('dateLabel')}</dt><dd>${L(prog.date)}</dd></div>
          <div><dt class="font-bold text-dark-gold">${t('timeLabel')}</dt><dd>${L(prog.time)}</dd></div>
          <div><dt class="font-bold text-dark-gold">${t('speakerLabel')}</dt><dd>${L(prog.speaker)}</dd></div>
          <div><dt class="font-bold text-dark-gold">${t('roomLabel')}</dt><dd>${prog.room} · ${L(prog.registrationAvailability)}</dd></div>
        </dl>
      </article>`
      )
      .join('');
  }

  function renderAgendaPanel() {
    const day = EVENT_DATA.agendaDays.find((d) => d.id === state.activeDayId) || EVENT_DATA.agendaDays[0];
    document.querySelectorAll('[data-day-tab]').forEach((btn) => {
      const selected = btn.getAttribute('data-day-tab') === day.id;
      btn.className = `rounded-2xl border-2 p-4 text-left transition ${selected ? 'border-keraton bg-keraton text-ivory shadow-md' : 'border-kawung-gold/60 bg-white/85 text-keraton hover:border-keraton'}`;
    });
    const box = document.getElementById('iomu-agenda-content');
    if (!box) return;
    const isExp = state.expandedSessionId === day.session.id;
    box.innerHTML = `
      <div class="rounded-2xl border border-kawung-gold/50 bg-white/90 p-5">
        <div class="flex flex-wrap items-center justify-between gap-2"><h3 class="font-display text-base font-extrabold text-keraton">${L(day.headline)}</h3><span class="rounded-full border border-dark-gold/40 bg-ivory px-3 py-0.5 text-[11px] font-bold text-dark-gold">${day.status}</span></div>
        <p class="mt-1.5 text-xs text-emerald">${L(day.summary)}</p>
      </div>
      <div class="overflow-hidden rounded-2xl border border-kawung-gold/50 bg-white">
        <button id="iomu-toggle-session" type="button" class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-ivory/50">
          <div><span class="text-[11px] font-bold uppercase tracking-wider text-dark-gold">${L(day.session.timeRange)} · ${L(day.session.category)}</span><h4 class="mt-0.5 font-display text-base font-bold text-keraton">${L(day.session.title)}</h4></div>
          <span class="text-sm font-bold text-dark-gold">${isExp ? '▲' : '▼'}</span>
        </button>
        ${isExp ? `<div class="border-t border-kawung-gold/30 bg-ivory/40 px-5 py-4 text-xs text-emerald space-y-1.5"><p>${L(day.session.description)}</p><p class="font-semibold text-keraton">${t('speakerLabel')}: ${L(day.session.speaker)} · ${t('agLocationPrefix')}: ${day.session.room}</p></div>` : ''}
      </div>
    `;
    document.getElementById('iomu-toggle-session').onclick = () => {
      state.expandedSessionId = state.expandedSessionId === day.session.id ? null : day.session.id;
      renderAgendaPanel();
    };
  }

  function ensureCanvasLayers() {
    const root = document.getElementById('root');
    if (!root) return null;
    if (!document.getElementById('iomu-webgl-canvas')) {
      root.innerHTML = `
        <canvas id="iomu-webgl-canvas" class="fixed inset-0 z-0 h-full w-full"></canvas>
        <div id="iomu-hotspots-layer" class="pointer-events-none fixed inset-0 z-[5] overflow-hidden"></div>
        <div id="iomu-fallback-backdrop" class="hidden fixed inset-0 z-0 overflow-hidden bg-keraton">
          <div class="pointer-events-none absolute inset-0 opacity-10" style="background-image:url('${ASSETS.kawungGold}');background-size:360px auto;background-repeat:repeat;"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-keraton/90 via-emerald/45 to-keraton"></div>
          <img src="${ASSETS.gununganGold}" alt="" class="pointer-events-none absolute right-[-6%] top-20 h-[70vh] opacity-15 object-contain" />
          <img src="${ASSETS.skylineCream}" alt="" class="pointer-events-none absolute bottom-0 left-0 w-full opacity-20 object-cover" />
        </div>
        <div id="iomu-ui-root"></div>
      `;
    }
    return document.getElementById('iomu-ui-root');
  }

  function renderUI() {
    const uiRoot = ensureCanvasLayers();
    if (!uiRoot) return;
    const soloIntroLandmarks = EVENT_DATA.landmarks.filter((l) => l.chapterId === 'about');

    uiRoot.innerHTML = `
      <header class="fixed inset-x-0 top-0 z-40 border-b border-kawung-gold/30 bg-keraton/95 backdrop-blur-md iomu-kawung-accent">
        <!-- Row 1: Official Co-Branding Pill + Utility Controls -->
        <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-3 py-2 sm:px-6">
          <a href="#home" data-scroll-target="home" aria-label="IOMU 2027 Home — Co-branded PERDOKI, IDI, and IOMU" class="inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white shadow-sm transition hover:opacity-95">
            <img src="${ASSETS.logoHeaderCobrand || `${assetBase}/logo-header-cobrand.jpg`}" alt="PERDOKI · IDI | IOMU Solo 2027" width="220" height="44" style="max-width:min(235px,46vw);display:block;" onerror="if(!this.dataset.triedFallback){this.dataset.triedFallback='1';this.src='./assets/brand/logo-header-cobrand.jpg';}else{this.onerror=null;this.src='./public/assets/brand/logo-header-cobrand.jpg';}" class="h-8 sm:h-11 md:h-12 w-auto object-contain" />
          </a>

          <div class="flex shrink-0 items-center gap-1 sm:gap-2">
            <!-- Bilingual EN / ID Language Switcher -->
            <div role="group" aria-label="Language selection" class="inline-flex items-center rounded-full border border-kawung-gold/70 bg-keraton/90 p-0.5 text-[10px] sm:text-[11px] font-bold">
              <button type="button" data-set-lang="en" class="rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 transition ${state.lang === 'en' ? 'bg-kawung-gold text-keraton' : 'text-ivory/80 hover:text-light-gold'}">EN</button>
              <button type="button" data-set-lang="id" class="rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 transition ${state.lang === 'id' ? 'bg-kawung-gold text-keraton' : 'text-ivory/80 hover:text-light-gold'}">ID</button>
            </div>
            <button id="iomu-btn-map" type="button" class="inline-flex items-center rounded-full border border-kawung-gold/70 bg-emerald/70 px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold text-ivory hover:bg-emerald"><span>${t('journeyMap')}</span></button>
            <button id="iomu-btn-lite" type="button" class="inline-flex items-center gap-1 rounded-full border border-kawung-gold/50 bg-keraton/80 px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-medium text-light-gold hover:bg-emerald"><span class="sm:hidden">${state.liteMode ? '3D' : '2D'}</span><span class="hidden sm:inline">${state.liteMode ? t('mode3d') : t('mode2d')}</span></button>
            <button id="iomu-btn-mobile-menu" type="button" aria-expanded="${state.mobileMenuOpen}" class="inline-flex lg:hidden items-center gap-1 rounded-full border border-kawung-gold/70 bg-emerald/80 px-2.5 py-1.5 text-[11px] font-bold text-ivory hover:bg-emerald">☰ <span class="hidden sm:inline">${t('menuBtn')}</span></button>
          </div>
        </div>

        <!-- Row 2: Full-Width Unclipped Chapter Ribbon (Wrapped/Centered Desktop, Smooth Scroll Strip Mobile/Tablet) -->
        <div class="border-t border-kawung-gold/25 bg-keraton/35">
          <nav id="iomu-chapter-ribbon" aria-label="Main navigation" class="no-scrollbar mx-auto flex max-w-[1440px] items-center justify-start gap-1 overflow-x-auto px-3 py-1.5 sm:px-6 lg:flex-wrap lg:justify-center">
            ${EVENT_DATA.chapters.map((c) => `<button type="button" data-nav-chapter="${c.index}" data-scroll-target="${c.id}" class="shrink-0 whitespace-nowrap rounded-full px-3 py-1 font-sans text-[11px] sm:text-xs font-semibold tracking-wide transition text-ivory/90 hover:bg-emerald/70">${L(c.menuLabelObj || c.menuLabel)}</button>`).join('')}
          </nav>
        </div>

        <!-- Expandable Tablet / Phone Drawer -->
        <div id="iomu-mobile-menu-drawer" class="${state.mobileMenuOpen ? '' : 'hidden '}border-t border-kawung-gold/30 bg-keraton/95 px-4 py-3 lg:hidden max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            ${EVENT_DATA.chapters.map((c) => `<button type="button" data-scroll-target="${c.id}" class="rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${state.activeChapterIndex === c.index ? 'border-ivory bg-kawung-gold text-keraton' : 'border-kawung-gold/35 bg-emerald/45 text-ivory hover:border-kawung-gold'}"><span class="block text-[10px] opacity-75">${c.code}</span><span>${L(c.menuLabelObj || c.menuLabel)}</span></button>`).join('')}
          </div>
        </div>
      </header>

      <main id="iomu-scroll-main" class="relative">
        <div id="iomu-chapters-wrapper" class="relative z-10 pointer-events-none transition-opacity duration-300 ${state.selectedItem ? 'opacity-10' : ''}">

          <!-- SCENE 01 — HOME (ENLARGED LOGO ONLY + TWO WELCOME MESSAGES) -->
          <section id="home" class="relative flex min-h-[140vh] flex-col justify-center px-3 sm:px-8 pb-20 sm:pb-24 pt-32 sm:pt-36">
            <div class="pointer-events-auto mx-auto w-full max-w-6xl space-y-8 sm:space-y-10">
              <div class="flex justify-end gap-2 sm:gap-3">
                <button type="button" data-scroll-target="conference" class="inline-flex items-center gap-1.5 rounded-full border border-kawung-gold/60 bg-keraton/85 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-ivory hover:bg-emerald">${t('skipIntro')} ⏭</button>
              </div>
              <div class="iomu-diagonal-band mx-auto max-w-4xl rounded-3xl bg-ivory/95 px-4 py-6 text-keraton shadow-keraton sm:px-10 sm:py-10">
                <div class="iomu-diagonal-band-inner space-y-5 text-center">
                  <div class="flex flex-col items-center">
                    <span class="font-script text-3xl text-dark-gold sm:text-4xl">${t('welcomeScript')}</span>
                    <!-- Enlarged Official IOMU 2027 Logo replacing redundant text headings -->
                    <img src="${ASSETS.logoLightBg}" alt="IOMU 2027 — The 19th Indonesian Occupational Medicine Updates" class="my-3 w-72 sm:w-96 md:w-[440px] max-w-full object-contain" />
                  </div>
                  <!-- Theme quote outside inner box, without Event Theme · DRAFT label -->
                  <p class="mx-auto max-w-3xl font-display text-sm font-bold italic leading-relaxed text-emerald sm:text-base md:text-lg">
                    &ldquo;${EVENT_DATA.theme}&rdquo;
                  </p>
                  <div class="flex flex-wrap items-center justify-center gap-3">
                    <div class="inline-flex items-center gap-2.5 rounded-full border-2 border-kawung-gold bg-white px-5 py-2 shadow-sm">
                      <img src="${ASSETS.pinGoldIcon}" alt="" class="h-5 w-5 object-contain" />
                      <div class="text-left"><p class="font-display text-xs font-extrabold text-keraton sm:text-sm">Surakarta, Indonesia</p><p class="text-[11px] font-semibold text-dark-gold">${t('datesLabel')}</p></div>
                    </div>
                    <span class="rounded-full border border-kawung-gold bg-keraton px-4 py-2 text-xs font-bold text-light-gold">${t('venueBadge')}</span>
                  </div>
                  <div class="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button type="button" data-scroll-target="about" class="rounded-full bg-keraton px-7 py-3 font-display text-xs font-bold tracking-wider text-ivory hover:bg-emerald sm:text-sm">${t('exploreCta')}</button>
                    <button type="button" data-scroll-target="conference" class="rounded-full border-2 border-kawung-gold bg-white px-6 py-3 font-display text-xs font-bold tracking-wider text-keraton hover:bg-ivory sm:text-sm">${t('infoCta')}</button>
                  </div>
                </div>
              </div>

              <!-- TWO WELCOME MESSAGES -->
              <div class="grid gap-6 lg:grid-cols-2">
                ${EVENT_DATA.welcomeMessages
                  .map(
                    (msg) => `
                  <article class="rounded-3xl border-2 border-kawung-gold/75 bg-keraton/92 p-6 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent sm:p-7">
                    <div class="flex items-start gap-4 border-b border-kawung-gold/30 pb-4">
                      <div class="iomu-arch-frame flex h-20 w-16 shrink-0 flex-col items-center justify-center bg-emerald/75 p-2 text-center">
                        <span class="text-[9px] font-bold uppercase tracking-wider text-kawung-gold">${t('photoTba')}</span>
                      </div>
                      <div>
                        <span class="inline-block rounded-full border border-kawung-gold/60 bg-emerald px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-light-gold">${t('welcomeMsgBadge')}</span>
                        <h2 class="mt-1.5 font-display text-base font-extrabold text-ivory sm:text-lg">${L(msg.role)}</h2>
                        <p class="text-xs font-medium text-light-gold">${L(msg.organization)}</p>
                        <p class="mt-0.5 text-[11px] text-ivory/75">${L(msg.name)}</p>
                      </div>
                    </div>
                    <div class="mt-4 space-y-2.5 text-xs leading-relaxed text-ivory/90 sm:text-sm">
                      <p class="font-semibold text-light-gold">${L(msg.greeting)}</p>
                      ${L(msg.paragraphs).map((p) => `<p>${p}</p>`).join('')}
                      <p class="pt-1 font-script text-2xl text-kawung-gold">${L(msg.closing)}</p>
                    </div>
                  </article>`
                  )
                  .join('')}
              </div>
            </div>
          </section>

          <!-- SCENE 02 — ABOUT + KNOW MORE ABOUT OUR GRAND EVENT -->
          <section id="about" class="flex min-h-[125vh] items-center px-4 py-24 sm:px-8">
            <div class="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-12">
              <div class="pointer-events-auto rounded-3xl border border-kawung-gold/60 bg-keraton/90 p-6 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent lg:col-span-5 sm:p-8">
                <span class="font-script text-3xl text-light-gold">${t('aboutScript')}</span>
                <p class="mt-1 font-display text-xs font-bold uppercase tracking-[0.18em] text-kawung-gold">${t('aboutTag')}</p>
                <h2 class="mt-2 font-display text-2xl font-extrabold text-ivory sm:text-3xl">${t('aboutHeading')}</h2>
                <p class="mt-3 text-sm leading-relaxed text-ivory/90">${t('aboutBody')}</p>
                <div class="mt-5 space-y-2">
                  <p class="font-display text-[11px] font-bold uppercase tracking-wider text-kawung-gold">${t('aboutLandmarksTitle')}</p>
                  <div class="flex flex-wrap gap-2">
                    ${soloIntroLandmarks.map((lm) => `<button type="button" data-select-landmark="${lm.id}" class="inline-flex items-center gap-1.5 rounded-full border border-kawung-gold/60 bg-emerald/70 px-3.5 py-1.5 text-xs font-semibold text-ivory hover:bg-kawung-gold hover:text-keraton">📍 ${lm.name}</button>`).join('')}
                  </div>
                </div>
              </div>

              <div class="pointer-events-auto rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md lg:col-span-7 sm:p-8">
                <span class="font-script text-3xl text-dark-gold">${t('grandEventScript')}</span>
                <h2 class="mt-1 font-display text-xl font-extrabold tracking-tight text-keraton sm:text-2xl">${t('grandEventHeading')}</h2>
                <div class="mt-5 grid gap-4 sm:grid-cols-2">
                  ${EVENT_DATA.grandEventSections
                    .map(
                      (item) => `
                    <article class="rounded-2xl border border-kawung-gold/55 bg-white/90 p-5 shadow-sm">
                      <span class="text-[10px] font-bold uppercase tracking-widest text-dark-gold">${L(item.subtitle)}</span>
                      <h3 class="mt-1 font-display text-base font-extrabold text-keraton">${L(item.title)}</h3>
                      <p class="mt-2 text-xs leading-relaxed text-emerald">${L(item.description)}</p>
                    </article>`
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </section>

          <!-- SCENE 03 — CONFERENCE GLASS -->
          <section id="conference" class="flex min-h-[120vh] items-center px-4 py-24 sm:px-8">
            <div class="pointer-events-auto mx-auto w-full max-w-6xl rounded-3xl border-2 border-kawung-gold/70 bg-keraton/92 p-6 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent sm:p-10">
              <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div class="space-y-4 lg:col-span-7">
                  <span class="font-script text-3xl text-light-gold">${t('confScript')}</span>
                  <p class="font-display text-xs font-bold uppercase tracking-[0.2em] text-kawung-gold">${t('confTag')}</p>
                  <h2 class="font-display text-2xl font-extrabold text-ivory sm:text-4xl">${t('confHeading')}</h2>
                  <p class="text-sm leading-relaxed text-ivory/90">${t('confBody')}</p>
                  <div class="grid gap-3 pt-2 sm:grid-cols-2">
                    ${EVENT_DATA.conferencePillars.map((p) => `<div class="rounded-2xl border border-kawung-gold/40 bg-emerald/55 backdrop-blur-sm iomu-kawung-accent p-4"><span class="inline-block rounded-full bg-keraton/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-light-gold">${L(p.badge)}</span><h3 class="mt-1.5 font-display text-sm font-bold text-ivory">${L(p.title)}</h3><p class="mt-1 text-xs leading-relaxed text-ivory/85">${L(p.description)}</p></div>`).join('')}
                  </div>
                </div>
                <div class="lg:col-span-5">
                  <figure class="overflow-hidden rounded-3xl border-2 border-kawung-gold bg-keraton shadow-gold">
                    <div class="relative"><img src="${ASSETS.delegates2026OverlayPhoto}" alt="Occupational medicine delegates" class="h-72 w-full object-cover sm:h-80" /><div class="iomu-photo-overlay absolute inset-0 flex flex-col justify-end p-5"><span class="inline-block w-fit rounded-full border border-kawung-gold bg-keraton/85 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-light-gold">${t('confPhotoBadge')}</span><p class="mt-2 font-display text-base font-bold text-ivory">${EVENT_DATA.fullName}</p><p class="mt-1 text-xs text-ivory/90">${t('confPhotoNote')}</p></div></div>
                    <figcaption class="bg-ivory px-4 py-2.5 text-[11px] font-medium text-keraton">${t('confPhotoCaption')}</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          <!-- SCENE 04 — WORKSHOPS (HOME IVORY GLASS THEME) -->
          <section id="workshops" class="flex min-h-[120vh] items-center px-4 py-24 sm:px-8">
            <div class="pointer-events-auto mx-auto w-full max-w-6xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
              <div class="flex flex-col justify-between gap-4 border-b border-kawung-gold/40 pb-6 md:flex-row md:items-end">
                <div>
                  <span class="font-script text-3xl text-dark-gold">${t('wsScript')}</span>
                  <p class="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">${t('wsTag')}</p>
                  <h2 class="mt-1 font-display text-2xl font-extrabold text-keraton sm:text-3xl">${t('wsHeading')}</h2>
                  <p class="mt-2 max-w-2xl text-xs leading-relaxed text-emerald sm:text-sm">${t('wsDesc')}</p>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  ${['All', 'Scientific Conference', 'Workshops', 'Scientific Presentations', 'Professional Networking'].map((cat) => `<button type="button" data-program-filter="${cat}" class="rounded-full border px-3 py-1 text-xs font-semibold transition ${cat === state.activeProgramFilter ? 'border-keraton bg-keraton text-ivory shadow-sm' : 'border-kawung-gold/60 bg-white/80 text-keraton hover:bg-white'}">${cat === 'All' ? t('allFilter') : cat}</button>`).join('')}
                </div>
              </div>
              <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                ${EVENT_DATA.pavilions.map((pav) => `<button type="button" data-select-pavilion="${pav.id}" class="rounded-2xl border border-kawung-gold/60 bg-white/80 p-4 text-left text-keraton shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-keraton hover:bg-white/95"><span class="text-[10px] font-bold uppercase tracking-wider text-dark-gold">${t('wsPavilionHint')}</span><h3 class="mt-1 font-display text-sm font-extrabold text-keraton">${L(pav.shortTitle)}</h3><p class="mt-1.5 text-xs leading-relaxed text-emerald">${L(pav.summary)}</p></button>`).join('')}
              </div>
              <div id="iomu-program-grid" class="mt-6 grid gap-4 md:grid-cols-2"></div>
            </div>
          </section>

          <!-- SCENE 05 — SPEAKERS & EXPERTS -->
          <section id="speakers" class="flex min-h-[140vh] items-center px-4 py-24 sm:px-8">
            <div class="pointer-events-auto mx-auto w-full max-w-7xl space-y-8 rounded-3xl border border-kawung-gold/70 bg-keraton/94 p-6 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent sm:p-10">
              <div class="flex flex-col justify-between gap-4 border-b border-kawung-gold/30 pb-6 md:flex-row md:items-end">
                <div>
                  <span class="font-script text-3xl text-light-gold">${t('spScript')}</span>
                  <p class="font-display text-xs font-bold uppercase tracking-[0.2em] text-kawung-gold">${t('spTag')}</p>
                  <h2 class="mt-1 font-display text-2xl font-extrabold text-ivory sm:text-3xl">${t('spHeading')}</h2>
                  <p class="mt-2 max-w-2xl text-xs leading-relaxed text-ivory/85 sm:text-sm">${t('spDesc')}</p>
                </div>
                <input id="iomu-speaker-search" type="search" value="${state.speakerSearch}" placeholder="${t('spSearchPlaceholder')}" class="w-full md:w-72 rounded-full border border-kawung-gold/60 bg-emerald/60 px-4 py-2 text-xs text-ivory placeholder:text-ivory/60 focus:outline-none" />
              </div>

              <div class="space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div><h3 id="iomu-ws-speaker-count" class="font-display text-lg font-extrabold text-light-gold"></h3><p class="text-xs text-ivory/80">${t('wsListSub')}</p></div>
                  <span class="rounded-full border border-kawung-gold/60 bg-emerald px-3 py-1 text-[11px] font-bold text-light-gold">${t('wsBadge')}</span>
                </div>
                <div id="iomu-ws-speakers-grid" class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"></div>
              </div>

              <div class="space-y-4 border-t border-kawung-gold/30 pt-6">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div><h3 id="iomu-conf-speaker-count" class="font-display text-lg font-extrabold text-light-gold"></h3><p class="text-xs text-ivory/80">${t('confListSub')}</p></div>
                  <button id="iomu-toggle-all-conf" type="button" class="rounded-full border border-kawung-gold bg-kawung-gold px-4 py-1.5 font-display text-xs font-bold text-keraton hover:bg-light-gold"></button>
                </div>
                <div id="iomu-conf-speakers-grid" class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"></div>
              </div>
            </div>
          </section>

          <!-- SCENE 06 — AGENDA -->
          <section id="program" class="flex min-h-[115vh] items-center px-4 py-24 sm:px-8">
            <div class="pointer-events-auto mx-auto w-full max-w-5xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
              <div class="text-center"><span class="font-script text-3xl text-dark-gold">${t('agScript')}</span><p class="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">${t('agTag')}</p><h2 class="mt-1 font-display text-2xl font-extrabold text-keraton sm:text-3xl">${t('agHeading')}</h2></div>
              <div class="mt-6 grid gap-3 sm:grid-cols-3">${EVENT_DATA.agendaDays.map((d) => `<button type="button" data-day-tab="${d.id}" class="rounded-2xl border-2 p-4 text-left transition"><span class="font-display text-xs font-extrabold uppercase tracking-wider text-dark-gold">${L(d.label)}</span><p class="mt-1 font-display text-sm font-bold">${L(d.fullDate)}</p></button>`).join('')}</div>
              <div id="iomu-agenda-content" class="mt-6 space-y-3"></div>
            </div>
          </section>

          <!-- SCENE 07 — EXPLORE SOLO -->
          <section id="explore-solo" class="flex min-h-[135vh] items-center px-3 py-16 sm:px-8 sm:py-24">
            <div class="pointer-events-auto mx-auto w-full max-w-7xl rounded-3xl border border-kawung-gold/70 bg-keraton/94 p-5 text-ivory shadow-keraton backdrop-blur-md iomu-kawung-accent sm:p-10">
              <div class="flex flex-col justify-between gap-4 border-b border-kawung-gold/30 pb-6 md:flex-row md:items-end">
                <div>
                  <span class="font-script text-3xl text-light-gold">${t('exScript')}</span>
                  <p class="mt-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-kawung-gold">${t('exTag')}</p>
                  <h2 class="mt-1 font-display text-2xl font-extrabold text-ivory sm:text-3xl">${t('exHeading')}</h2>
                  <p class="mt-2 max-w-2xl text-xs leading-relaxed text-ivory/85 sm:text-sm">${t('exDesc')}</p>
                </div>
                <span class="w-fit rounded-full border border-kawung-gold bg-emerald px-4 py-1.5 text-xs font-bold text-light-gold">${t('exVenueBadge')}</span>
              </div>
              <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                ${EVENT_DATA.soloDestinations
                  .map(
                    (dest) => `
                  <article class="flex flex-col overflow-hidden rounded-3xl border border-kawung-gold/55 bg-emerald/45 text-ivory backdrop-blur-sm iomu-kawung-accent transition hover:-translate-y-1 hover:border-kawung-gold">
                    <div class="p-4 pb-0"><div class="iomu-arch-frame overflow-hidden bg-keraton"><img src="${dest.image}" alt="${dest.name}" loading="lazy" data-fallback="${dest.fallbackImage || ''}" onerror="if(this.dataset.fallback && this.src!==this.dataset.fallback){this.src=this.dataset.fallback;}" class="h-44 sm:h-48 w-full object-cover" /></div></div>
                    <div class="flex flex-1 flex-col p-4">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-kawung-gold">${L(dest.category)}</span>
                      <h3 class="mt-1 font-display text-sm font-extrabold text-ivory">${dest.name}</h3>
                      <p class="mt-1 text-[11px] font-semibold text-light-gold">${L(dest.narrativeTitle)}</p>
                      <p class="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-ivory/85">${L(dest.narrativeStory)}</p>
                      <p class="mt-2 text-[10px] text-ivory/70">${dest.imageCaption}</p>
                      <div class="mt-3 flex flex-wrap gap-1.5 border-t border-kawung-gold/25 pt-2.5">
                        <button type="button" data-select-destination="${dest.id}" class="rounded-full bg-kawung-gold px-3 py-1 text-[11px] font-bold text-keraton hover:bg-light-gold">${t('readStory')}</button>
                        <a href="${dest.mapUrl}" target="_blank" rel="noreferrer" class="rounded-full border border-kawung-gold/60 px-2.5 py-1 text-[11px] font-semibold text-ivory hover:bg-keraton">${t('openMap')} ↗</a>
                        <a href="${dest.googlePhotosUrl || 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(dest.name)}" target="_blank" rel="noreferrer" class="rounded-full border border-kawung-gold/60 px-2.5 py-1 text-[11px] font-semibold text-light-gold hover:bg-keraton">📷 ${t('googlePhotos')} ↗</a>
                      </div>
                    </div>
                  </article>`
                  )
                  .join('')}
              </div>
            </div>
          </section>

          <!-- SCENE 08 — ACCOMMODATION (VENUE: HOTEL ALILA SOLO) -->
          <section id="accommodation" class="flex min-h-[125vh] items-center px-4 py-24 sm:px-8">
            <div class="pointer-events-auto mx-auto w-full max-w-7xl space-y-6 rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
              <div class="flex flex-col justify-between gap-4 border-b border-kawung-gold/40 pb-6 md:flex-row md:items-end">
                <div>
                  <span class="font-script text-3xl text-dark-gold">${t('accScript')}</span>
                  <p class="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">${t('accTag')}</p>
                  <h2 class="mt-1 font-display text-2xl font-extrabold text-keraton sm:text-3xl">${t('accHeading')}</h2>
                  <p class="mt-2 max-w-2xl text-xs leading-relaxed text-emerald sm:text-sm">${t('accDesc')}</p>
                </div>
                <button type="button" data-select-hotel="alila-solo" class="rounded-full bg-keraton px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ivory hover:bg-emerald">${t('focusAlilaBtn')}</button>
              </div>

              <article class="rounded-3xl border-2 border-kawung-gold bg-keraton/95 p-6 text-ivory shadow-gold backdrop-blur-md iomu-kawung-accent sm:p-8">
                <div class="grid gap-6 lg:grid-cols-12 lg:items-center">
                  <div class="space-y-3 lg:col-span-7">
                    <span class="inline-block rounded-full border border-kawung-gold bg-emerald px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-light-gold">${L(EVENT_DATA.mainHotel.tier)}</span>
                    <h3 class="font-display text-2xl font-extrabold text-ivory sm:text-3xl">${EVENT_DATA.mainHotel.name}</h3>
                    <p class="text-xs font-semibold text-kawung-gold">${EVENT_DATA.mainHotel.address}</p>
                    <p class="text-sm leading-relaxed text-ivory/90">${L(EVENT_DATA.mainHotel.summary)}</p>
                    <div class="flex flex-wrap gap-3 pt-2">
                      <button type="button" data-select-hotel="alila-solo" class="rounded-full bg-kawung-gold px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-keraton hover:bg-light-gold">${t('inspectDetails')}</button>
                      <a href="${EVENT_DATA.mainHotel.mapUrl}" target="_blank" rel="noreferrer" class="rounded-full border border-kawung-gold/70 px-5 py-2 text-xs font-semibold text-ivory hover:bg-emerald">${t('viewGoogleMaps')} ↗</a>
                    </div>
                  </div>
                  <div class="rounded-2xl border border-kawung-gold/45 bg-emerald/60 backdrop-blur-sm iomu-kawung-accent p-5 lg:col-span-5">
                    <p class="font-display text-xs font-bold uppercase tracking-wider text-light-gold">${t('highlightsTitle')}</p>
                    <ul class="mt-3 space-y-2 text-xs text-ivory/90 list-disc list-inside">${L(EVENT_DATA.mainHotel.highlights).map((h) => `<li>${h}</li>`).join('')}</ul>
                    <p class="mt-4 border-t border-kawung-gold/30 pt-3 text-[11px] font-semibold text-kawung-gold">${L(EVENT_DATA.mainHotel.bookingStatus)}</p>
                  </div>
                </div>
              </article>

              <div>
                <h3 class="font-display text-base font-extrabold text-keraton sm:text-lg">${t('altHotelsTitle')}</h3>
                <p class="mt-0.5 text-xs text-emerald">${t('altHotelsSub')}</p>
                <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  ${EVENT_DATA.alternativeHotels
                    .map(
                      (h) => `
                    <article class="flex flex-col justify-between rounded-2xl border border-kawung-gold/55 bg-white/90 p-5 shadow-sm">
                      <div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-dark-gold">${L(h.tier)}</span>
                        <h4 class="mt-1 font-display text-sm font-extrabold text-keraton">${h.name}</h4>
                        <p class="mt-1 text-[11px] font-semibold text-emerald">${L(h.distanceFromAlila)}</p>
                        <p class="mt-2 text-xs leading-relaxed text-keraton/85">${L(h.summary)}</p>
                      </div>
                      <div class="mt-4 flex items-center justify-between gap-2 border-t border-kawung-gold/25 pt-3">
                        <button type="button" data-select-hotel="${h.id}" class="text-xs font-bold text-dark-gold hover:underline">${t('detailsBtn')}</button>
                        <a href="${h.mapUrl}" target="_blank" rel="noreferrer" class="rounded-full border border-keraton/25 px-3 py-1 text-[11px] font-semibold text-keraton hover:bg-ivory">${t('openMap')} ↗</a>
                      </div>
                    </article>`
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </section>

          <!-- SCENE 09 — REGISTRATION -->
          <section id="registration" class="flex min-h-[115vh] items-center px-4 pb-32 pt-24 sm:px-8">
            <div class="pointer-events-auto mx-auto w-full max-w-5xl rounded-3xl border-2 border-kawung-gold bg-ivory/95 p-6 text-keraton shadow-keraton backdrop-blur-md sm:p-10">
              <div class="text-center"><span class="font-script text-3xl text-dark-gold">${t('regScript')}</span><p class="font-display text-xs font-bold uppercase tracking-[0.2em] text-dark-gold">${t('regTag')}</p><h2 class="mt-1 font-display text-3xl font-extrabold text-keraton sm:text-4xl">${t('regHeading')}</h2><p class="mt-1 font-display text-sm font-bold tracking-[0.16em] text-emerald">${t('regSub')}</p></div>
              <div class="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border-2 border-kawung-gold bg-keraton/95 px-5 py-4 text-ivory backdrop-blur-sm iomu-kawung-accent sm:flex-row sm:items-center">
                <div><p class="font-display text-sm font-bold text-light-gold">${t('regBannerTitle')}</p><p class="mt-0.5 text-xs text-ivory/85">${t('regBannerDesc')}</p></div>
                <span class="shrink-0 rounded-full border border-kawung-gold bg-emerald px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-light-gold">${t('regPreviewBadge')}</span>
              </div>
              <form id="iomu-reg-form" class="mt-6 grid gap-4 sm:grid-cols-2">
                <div><label class="block text-xs font-bold uppercase tracking-wider text-dark-gold">${t('regNameLabel')}</label><input type="text" placeholder="e.g., dr. Nama Lengkap, Sp.Ok" class="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton" /></div>
                <div><label class="block text-xs font-bold uppercase tracking-wider text-dark-gold">${t('regEmailLabel')}</label><input type="email" placeholder="delegate@institution.org" class="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton" /></div>
                <div><label class="block text-xs font-bold uppercase tracking-wider text-dark-gold">${t('regCategoryLabel')}</label><select class="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton">${EVENT_DATA.participantCategories.map((c) => `<option>${L(c)}</option>`).join('')}</select></div>
                <div><label class="block text-xs font-bold uppercase tracking-wider text-dark-gold">${t('regWorkshopLabel')}</label><select class="mt-1 w-full rounded-xl border border-kawung-gold/60 bg-white px-3.5 py-2.5 text-sm text-keraton">${EVENT_DATA.workshopTracks.map((w) => `<option>${L(w)}</option>`).join('')}</select></div>
                <div class="sm:col-span-2 flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                  <span class="text-xs font-medium text-emerald">${t('regBackendStatus')}</span>
                  <button type="submit" class="rounded-full bg-keraton px-8 py-3 font-display text-xs font-bold uppercase tracking-wider text-ivory hover:bg-emerald sm:text-sm">${t('regSubmit')}</button>
                </div>
                <div id="iomu-reg-notice" class="hidden sm:col-span-2 rounded-2xl border border-kawung-gold bg-white px-4 py-3 text-xs font-medium text-keraton"></div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer class="relative z-20 overflow-hidden border-t border-kawung-gold/40 bg-keraton text-ivory">
        <!-- Swipe In / Swipe Out Delegates Photo Banner with White Logo, replacing the silhouette -->
        <div class="relative mx-auto max-w-5xl px-4 py-8 sm:py-12">
          <div id="iomu-footer-banner" class="iomu-swipe-banner is-out relative overflow-hidden rounded-3xl border-2 border-kawung-gold shadow-keraton bg-keraton/95">
            <!-- Delegates Photo Background -->
            <img src="${ASSETS.footerDelegatesPhoto}" alt="IOMU 2027 Solo Delegates" class="h-64 sm:h-80 md:h-[380px] w-full object-cover object-center filter brightness-[0.88]" />
            <!-- Soft Gradient Vignette for optimal logo contrast -->
            <div class="absolute inset-0 bg-gradient-to-t from-keraton/85 via-transparent to-keraton/35 pointer-events-none"></div>
            <!-- Centered White IOMU 2027 Logo in front of image -->
            <div class="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
              <img src="${ASSETS.logoFooterWhite}" alt="IOMU SOLO 2027" class="iomu-banner-logo w-64 sm:w-80 md:w-[440px] max-w-[85%] object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]" />
            </div>
          </div>
        </div>
        <div class="relative border-t-2 border-kawung-gold bg-ivory text-keraton">
          <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:flex-row">
            <div class="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold">${EVENT_DATA.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noreferrer" class="hover:text-dark-gold">${s.handle} ↗</a>`).join('')}</div>
            <div class="flex flex-wrap items-center justify-center gap-2">${EVENT_DATA.hashtags.map((tag) => `<span class="rounded-full border border-kawung-gold/60 bg-white/80 px-2.5 py-0.5 text-[11px] font-semibold text-dark-gold">${tag}</span>`).join('')}</div>
          </div>
          <div class="border-t border-kawung-gold/30 bg-white/60 px-4 py-3 text-[11px] text-emerald text-center">${EVENT_DATA.fullName} · ${EVENT_DATA.dates} · ${EVENT_DATA.city} · <strong>${t('footerVenue')}</strong> · Photo Credit: Herusutimbul (CC BY-SA 4.0)</div>
        </div>
      </footer>

      <div id="iomu-detail-drawer" role="dialog" aria-modal="true" class="hidden fixed inset-x-3 bottom-16 top-28 sm:inset-x-auto sm:bottom-20 sm:right-4 sm:top-28 z-40 flex w-auto sm:w-[calc(100%-2rem)] max-w-md flex-col overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-kawung-gold bg-ivory text-keraton shadow-keraton"></div>

      <div id="iomu-map-modal" role="dialog" aria-modal="true" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-keraton/80 p-3 sm:p-4 backdrop-blur-sm">
        <div class="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-2 border-kawung-gold bg-ivory text-keraton shadow-keraton">
          <div class="flex shrink-0 items-center justify-between border-b border-kawung-gold/40 px-4 py-3 sm:px-6 sm:py-4">
            <div><p class="font-script text-2xl text-dark-gold">${t('mapScript')}</p><h2 class="font-display text-base sm:text-lg font-extrabold text-keraton">${t('mapHeading')}</h2></div>
            <button id="iomu-close-map" type="button" class="rounded-full border border-dark-gold/40 bg-white px-3 py-1 text-xs font-bold hover:bg-kawung-gold">✕</button>
          </div>
          <div class="grid gap-3 overflow-y-auto p-4 sm:p-6 sm:grid-cols-2">${EVENT_DATA.chapters.map((c) => `<button type="button" data-map-target="${c.id}" class="flex items-start gap-3 rounded-2xl border border-kawung-gold/50 bg-white/80 p-3.5 text-left hover:border-keraton hover:bg-white"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald/15 font-display text-xs font-bold text-emerald">0${c.index}</span><div><span class="block font-display text-sm font-bold text-keraton">${L(c.title)}</span><span class="text-xs text-emerald">${L(c.subtitle)}</span></div></button>`).join('')}</div>
        </div>
      </div>

      <aside class="fixed bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 z-30 mx-auto flex max-w-4xl items-center justify-between gap-2 sm:gap-3 rounded-2xl border border-kawung-gold/40 bg-keraton/90 px-3 py-2 sm:px-4 sm:py-2.5 shadow-keraton backdrop-blur-md iomu-kawung-accent">
        <div class="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img src="${ASSETS.pinGoldIcon}" alt="" class="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain" />
          <div class="min-w-0"><p id="iomu-hud-title" class="truncate font-display text-[11px] font-bold tracking-wider text-light-gold sm:text-sm"></p><div class="mt-1 flex items-center gap-2"><div class="h-1.5 w-24 overflow-hidden rounded-full bg-emerald sm:w-44"><div id="iomu-hud-bar" class="h-full rounded-full bg-kawung-gold" style="width:4%"></div></div><span id="iomu-hud-pct" class="text-[10px] sm:text-[11px] font-medium text-ivory/75">0%</span></div></div>
        </div>
        <div class="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button id="iomu-hud-prev" type="button" class="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-kawung-gold/50 bg-emerald/60 text-xs font-bold text-ivory hover:bg-emerald disabled:opacity-35">◀</button>
          <button id="iomu-hud-next" type="button" class="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-kawung-gold/50 bg-emerald/60 text-xs font-bold text-ivory hover:bg-emerald disabled:opacity-35">▶</button>
        </div>
      </aside>
    `;

    bindUIEvents();
    renderSpeakersLists();
    renderProgramGrid();
    renderAgendaPanel();
    renderDetailDrawer();
    updateHUD();
  }

  function bindUIEvents() {
    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextLang = btn.getAttribute('data-set-lang');
        if (nextLang !== state.lang) {
          state.lang = nextLang;
          refreshHotspotLabels();
          renderUI();
          setupScrollSync();
        }
      });
    });

    const mobileMenuBtn = document.getElementById('iomu-btn-mobile-menu');
    const mobileDrawer = document.getElementById('iomu-mobile-menu-drawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        mobileDrawer.classList.toggle('hidden', !state.mobileMenuOpen);
        mobileMenuBtn.setAttribute('aria-expanded', String(state.mobileMenuOpen));
      });
    }

    document.querySelectorAll('[data-scroll-target]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.mobileMenuOpen) {
          state.mobileMenuOpen = false;
          const drawer = document.getElementById('iomu-mobile-menu-drawer');
          const menuBtn = document.getElementById('iomu-btn-mobile-menu');
          if (drawer) drawer.classList.add('hidden');
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
        navigateToChapter(el.getAttribute('data-scroll-target'));
      });
    });

    document.querySelectorAll('[data-select-landmark]').forEach((el) => {
      el.addEventListener('click', () => {
        const lm = EVENT_DATA.landmarks.find((l) => l.id === el.getAttribute('data-select-landmark'));
        if (lm) selectItem({ kind: 'landmark', data: lm });
      });
    });

    document.querySelectorAll('[data-select-pavilion]').forEach((el) => {
      el.addEventListener('click', () => {
        const pav = EVENT_DATA.pavilions.find((p) => p.id === el.getAttribute('data-select-pavilion'));
        if (pav) selectItem({ kind: 'pavilion', data: pav });
      });
    });

    document.querySelectorAll('[data-select-destination]').forEach((el) => {
      el.addEventListener('click', () => {
        const dest = EVENT_DATA.soloDestinations.find((d) => d.id === el.getAttribute('data-select-destination'));
        if (dest) selectItem({ kind: 'destination', data: dest });
      });
    });

    document.querySelectorAll('[data-select-hotel]').forEach((el) => {
      el.addEventListener('click', () => {
        const hid = el.getAttribute('data-select-hotel');
        const hotel = hid === EVENT_DATA.mainHotel.id ? EVENT_DATA.mainHotel : EVENT_DATA.alternativeHotels.find((h) => h.id === hid);
        if (hotel) selectItem({ kind: 'hotel', data: hotel });
      });
    });

    const speakerSearchEl = document.getElementById('iomu-speaker-search');
    if (speakerSearchEl) {
      speakerSearchEl.addEventListener('input', (e) => {
        state.speakerSearch = e.target.value;
        renderSpeakersLists();
      });
    }

    const toggleConfBtn = document.getElementById('iomu-toggle-all-conf');
    if (toggleConfBtn) {
      toggleConfBtn.addEventListener('click', () => {
        state.showAllConfSpeakers = !state.showAllConfSpeakers;
        renderSpeakersLists();
      });
    }

    document.querySelectorAll('[data-program-filter]').forEach((el) => {
      el.addEventListener('click', () => {
        state.activeProgramFilter = el.getAttribute('data-program-filter');
        document.querySelectorAll('[data-program-filter]').forEach((b) => {
          const active = b.getAttribute('data-program-filter') === state.activeProgramFilter;
          b.className = `rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? 'border-keraton bg-keraton text-ivory shadow-sm' : 'border-kawung-gold/60 bg-white/80 text-keraton hover:bg-white'}`;
        });
        renderProgramGrid();
      });
    });

    document.querySelectorAll('[data-day-tab]').forEach((el) => {
      el.addEventListener('click', () => {
        state.activeDayId = el.getAttribute('data-day-tab');
        renderAgendaPanel();
      });
    });

    document.getElementById('iomu-btn-map').onclick = () => document.getElementById('iomu-map-modal').classList.remove('hidden');
    document.getElementById('iomu-close-map').onclick = () => document.getElementById('iomu-map-modal').classList.add('hidden');
    document.querySelectorAll('[data-map-target]').forEach((el) => {
      el.addEventListener('click', () => {
        document.getElementById('iomu-map-modal').classList.add('hidden');
        navigateToChapter(el.getAttribute('data-map-target'));
      });
    });

    const liteBtn = document.getElementById('iomu-btn-lite');
    liteBtn.onclick = () => {
      state.liteMode = !state.liteMode;
      liteBtn.innerHTML = `<span class="sm:hidden">${state.liteMode ? '3D' : '2D'}</span><span class="hidden sm:inline">${state.liteMode ? t('mode3d') : t('mode2d')}</span>`;
      showFallbackBackdrop(state.liteMode || !state.webglReady);
    };

    document.getElementById('iomu-hud-prev').onclick = () => {
      const prev = EVENT_DATA.chapters.find((c) => c.index === state.activeChapterIndex - 1);
      if (prev) navigateToChapter(prev.id);
    };
    document.getElementById('iomu-hud-next').onclick = () => {
      const next = EVENT_DATA.chapters.find((c) => c.index === state.activeChapterIndex + 1);
      if (next) navigateToChapter(next.id);
    };

    document.getElementById('iomu-reg-form').onsubmit = (e) => {
      e.preventDefault();
      const notice = document.getElementById('iomu-reg-notice');
      notice.classList.remove('hidden');
      notice.textContent = t('regNoticeMsg');
    };
  }

  let activeScrollTrigger = null;
  let activeFooterTrigger = null;
  let lastScrollY = typeof window !== 'undefined' ? (window.scrollY || 0) : 0;

  function updateFooterSwipeOnScroll() {
    const banner = document.getElementById('iomu-footer-banner');
    if (!banner) return;
    const currentY = window.scrollY || window.pageYOffset || 0;
    const delta = currentY - lastScrollY;
    lastScrollY = currentY;

    const rect = banner.getBoundingClientRect();
    const inTriggerZone = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

    if (inTriggerZone) {
      if (delta >= 0) {
        // Scrolling down -> Swipe In
        banner.classList.remove('is-out');
        banner.classList.add('is-in');
      } else if (delta < -6) {
        // Scrolling back up -> Swipe Out
        banner.classList.remove('is-in');
        banner.classList.add('is-out');
      }
    } else {
      // Scrolled past/above trigger zone -> Reset to is-out
      banner.classList.remove('is-in');
      banner.classList.add('is-out');
    }
  }

  function setupScrollSync() {
    const main = document.getElementById('iomu-scroll-main');
    const footerBanner = document.getElementById('iomu-footer-banner');
    if (activeScrollTrigger) {
      activeScrollTrigger.kill();
      activeScrollTrigger = null;
    }
    if (activeFooterTrigger) {
      activeFooterTrigger.kill();
      activeFooterTrigger = null;
    }
    if (window.gsap && window.ScrollTrigger && main) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      activeScrollTrigger = window.ScrollTrigger.create({
        trigger: main,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          state.scrollProgress = self.progress;
          const ch = EVENT_DATA.chapters.find((c) => self.progress >= c.progressStart && self.progress < c.progressEnd) || EVENT_DATA.chapters[EVENT_DATA.chapters.length - 1];
          state.activeChapterIndex = ch.index;
          updateHUD();
        },
      });

      if (footerBanner) {
        activeFooterTrigger = window.ScrollTrigger.create({
          trigger: footerBanner,
          start: 'top 95%',
          end: 'bottom top',
          onUpdate: (self) => {
            if (self.direction === 1) {
              footerBanner.classList.remove('is-out');
              footerBanner.classList.add('is-in');
            } else if (self.direction === -1) {
              footerBanner.classList.remove('is-in');
              footerBanner.classList.add('is-out');
            }
          },
          onLeaveBack: () => {
            footerBanner.classList.remove('is-in');
            footerBanner.classList.add('is-out');
          },
        });
      }
    } else {
      window.onscroll = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        state.scrollProgress = Math.max(0, Math.min(1, window.scrollY / max));
        const ch = EVENT_DATA.chapters.find((c) => state.scrollProgress >= c.progressStart && state.scrollProgress < c.progressEnd) || EVENT_DATA.chapters[EVENT_DATA.chapters.length - 1];
        state.activeChapterIndex = ch.index;
        updateHUD();
        updateFooterSwipeOnScroll();
      };
    }

    window.removeEventListener('scroll', updateFooterSwipeOnScroll);
    window.addEventListener('scroll', updateFooterSwipeOnScroll, { passive: true });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailDrawer();
      const modal = document.getElementById('iomu-map-modal');
      if (modal) modal.classList.add('hidden');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    ensureCanvasLayers();
    renderUI();
    setupScrollSync();
    initThreeWorld();
  });
})();

# IOMU 2027 — The 19th Indonesian Occupational Medicine Updates

**"Journey Through Solo — Discovering the Future of Occupational Medicine"**

An interactive 3D WebGL storytelling website built with **Three.js**, **GSAP ScrollTrigger**, **React / TypeScript**, and **Tailwind CSS**, strictly aligned with the official **IOMU 2027 Design Master**.

---

## Cara Menjalankan di Laptop Kantor (Tanpa Install Aplikasi / Tanpa Node.js)

Proyek ini sudah disiapkan agar dapat langsung dijalankan di laptop kantor tanpa perlu menginstall Node.js atau aplikasi tambahan apa pun:

1. **Cara Paling Cepat (Langsung Double-Click di File Explorer):**
   - Buka folder proyek `iomu-2027-solo`.
   - Double-click file **`BUKA_WEBSITE_IOMU2027.html`** (atau `dist\index.html`).
   - Website 3D WebGL akan langsung terbuka di Google Chrome / Microsoft Edge.
   - *(Semua logo resmi, pola Kawung, Gunungan, Skyline Solo, dan foto sudah dibundel menjadi `brand-assets.js` agar tekstur 3D WebGL tetap tampil mulus meski dibuka lewat `file://` tanpa error CORS).*

2. **Cara via Local HTTP Server (`http://127.0.0.1:8080`):**
   - Double-click **`JALANKAN_LOCAL_SERVER.bat`**.
   - Script ini memanfaatkan runtime bawaan Antigravity (`agy-node.cmd`) dan pustaka standar HTTP Node tanpa perlu `npm install`.

3. **Cara Deploy Online Gratis ke Netlify (Tanpa Install Apa Pun di Laptop):**
   - **Netlify Drop (Drag & Drop):** Buka [app.netlify.com/drop](https://app.netlify.com/drop) di browser, lalu seret folder **`dist/`** ke halaman tersebut.
   - **GitHub + Netlify CI:** Push folder ini ke GitHub melalui GitHub Desktop, lalu hubungkan ke Netlify (`netlify.toml` sudah terkonfigurasi dengan `npm run build` dan `publish = "dist"` untuk cloud build Netlify).

---

## Key Features
- **Single Persistent 3D World & Continuous Camera Spline:** Scroll seamlessly across 8 chapters through a stylized Surakarta miniature world—opening through a parting 3D Gunungan Wayang portal, traversing iconic Solo landmarks, arriving at the IOMU Conference Pavilion, exploring 4 interactive Workshop Pavilions, visiting the arched Speaker Exhibition Gallery, following the 3-day Agenda Bridge, experiencing Surakarta cultural heritage, and entering the Registration Gateway.
- **Official Brand Compliance:**
  - Strict core palette: Keraton Green (`#14302B`), Emerald (`#1F4A42`), Kawung Gold (`#C69C54`), Light Gold (`#DDBE82`), Dark Gold (`#8A662C`), and Ivory Cream (`#F4E9D7`).
  - Official typography: `Montserrat` (Bold headlines/titles), `Inter` (body/UI/captions), and `Great Vibes` (1–2 word accents).
  - Official co-branding pill (`PERDOKI · IDI | IOMU`) and brand elements (Batik Kawung overlays, Gunungan Wayang, Solo Skyline, arched frames).
- **Accessible & Resilient Architecture:**
  - Full HTML accessibility across all 8 sections (keyboard navigation, ARIA roles, `Escape` closing for drawers/modals, `prefers-reduced-motion` support, and a **2D Mode** toggle + automatic WebGL fallback).
  - Centralized event configuration so all content, programs, speakers, and dates can be updated cleanly.

---

## Project Structure
```text
BUKA_WEBSITE_IOMU2027.html   # Zero-install double-click browser entry
JALANKAN_LOCAL_SERVER.bat    # Zero-install Windows local HTTP launcher
server.mjs                   # Zero-dependency Node HTTP server for dist/
scripts/build-standalone.mjs # Syncs public/assets/brand & app-3d-bundle.js into dist/
dist/                        # Pre-built Netlify-ready static directory
public/
├── app-3d-bundle.js         # Self-contained Three.js + GSAP ScrollTrigger 3D engine
└── assets/brand/            # Official logos, Kawung patterns, Gunungan, Solo skyline, & photos
src/                         # Modular React 18 + TypeScript + Vite + R3F source tree
├── components/
│   ├── layout/              # Footer & credits compliance modal
│   ├── navigation/          # Co-branded Navbar & JourneyHUD + Stylized 3D Route Map
│   ├── three/             # ExperienceCanvas, CameraRig, WorldEnvironment, WebGLErrorBoundary
│   └── ui/                  # ChapterOverlays & DetailDrawer inspector
├── config/eventConfig.ts    # Master event metadata, chapters, landmarks, assets & registration config
├── data/programData.ts      # Conference pillars, workshop pavilions, programs, speakers & 3-day agenda
├── hooks/                   # Responsive capability & reduced-motion detection
├── scenes/                  # 8 modular 3D chapters along the continuous Surakarta pathway
└── services/                # Registration service ready for Supabase / Firebase / REST API
```

---

## Content Management & Asset Replacement

### 1. Updating Event Content
- **Vite/React source:** Edit `src/config/eventConfig.ts` and `src/data/programData.ts`.
- **Zero-install standalone bundle:** Update `EVENT_DATA` inside `public/app-3d-bundle.js`, then run `agy-node scripts/build-standalone.mjs` to refresh `dist/`.

### 2. Asset Replacement Instructions (Important)
All official brand files reside in `public/assets/brand/`:
- **PERDOKI & IDI Vector Logos:** Per the IOMU 2027 Design Master, `logo-perdoki.png` and `logo-idi.png` are raster references extracted from the Design Master. Replace them with official high-resolution vector `.svg` or transparent `.png` files from PERDOKI & IDI prior to final publication or print, then re-run `agy-node scripts/build-standalone.mjs`.
- **Photography Rules:** Never use photos clearly showing outdated Surabaya 2026 backdrops, sponsor logos, or monitor text. When adding licensed Solo landmark photos, always include attribution (`Herusutimbul, CC BY-SA 4.0` for Panggung Sangga Buwana).

---

## Environment Variables
Copy `.env.example` to `.env` when configuring a live registration backend:
- `VITE_REGISTRATION_API_URL` — Custom HTTPS endpoint accepting registration JSON payloads.
- `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` — Optional Supabase integration keys.

While unconfigured, the registration portal displays **"Registration Information Coming Soon"** and keeps live submissions disabled.

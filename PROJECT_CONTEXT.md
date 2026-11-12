# PROJECT CONTEXT & HANDOFF SPECIFICATION

**Project:** Personal Travel Photography Portfolio × Fine-Art Exhibition  
**Photographer:** Harikrishnan Nandanan  
**Watermark:** `HARI`  
**Copyright:** `© 2026 Hari. All rights reserved.`  
**Primary Camera:** Canon EOS R6 Mark III  
**Current Milestone:** Phase 2 Complete (Visual Design System & Homepage Prototype Approved)  
**Next Milestone:** Phase 3 (Main Photography Gallery & Individual Photograph Pages)

---

## 1. Project Vision & Creative Philosophy

### Core Creative Direction
* **Personal Portfolio × Fine-Art Exhibition Aesthetic:** The website is fundamentally a **personal travel photography portfolio for a hobbyist**, presented through the visual language and cinematic atmosphere of a premium fine-art exhibition.
* **Authentic Personal Identity:**
  * **Photographer:** Harikrishnan Nandanan.
  * **Role & Background:** A hobbyist photographer who enjoys travelling, exploring unfamiliar places, and taking photographs along the way.
  * **Personal Passion, Not a Business:** Photography is a creative hobby and a personal medium for documenting light, places, and memories. **Harikrishnan does not own a photography studio, operate a commercial business, offer photography services for hire, or have gallery representation.**
  * **Tagline:** *Photography · Travel · Visual Stories*
  * **Primary Camera:** **Canon EOS R6 Mark III**. (No unverified lens collections, artificial gear catalogues, or invented equipment).
  * **Watermark & Copyright:** Monumental footer watermark displays **`HARI`**; bottom colophon reads **`© 2026 Hari. All rights reserved.`**
* **Zero Fictional Claims:** The portfolio strictly eliminates all fabricated commercial jargon ("Studio & Inquiries", "Commissions Worldwide", "Available for Assignments"), fabricated awards, fake Steidl monographs, invented Biennales, or fake representation relationships. Factual contact information is decoupled into configurable placeholders.
* **Multi-Genre Breadth:** Accommodates landscapes, travel, street scenes, wildlife, people, and architectural geometry. It is not confined to monochrome or brutalist themes.
* **The Exhibition Atmosphere:** Uses numbered exhibition plates (`PLATE 00`, `PLATE 01`...), thematic travel series (*Wanderings & Wild Places*, *City Streets & Travel Notes*, *Forms & Spaces*), editorial captions, and museum-grade negative space to give personal travel photography an elevated, cinematic presentation.

---

## 2. Approved Design System ("The Curated Monolith")

### Color Palette
* **Obsidian Foundation:** `#08080a` (Deepest canvas surface background)
* **Pitch Surface:** `#030304` (Sub-surface layer for modals and dropdowns)
* **Carbon Cards:** `#111114` & `#141418` (Plate containers and card backgrounds)
* **Primary Text (Bone White):** `#f4f2ec` (Contrast ratio `18.2:1`, WCAG AAA compliant against `#08080a`)
* **Muted Text (Pewter):** `#c8c5bc` & `#a1a1aa` (Legible descriptions and technical metadata)
* **Exhibition Accents:** Warm Bronze `#d4a373` & Subtle Amber `#e09f58`
* **Hairline Borders:** `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.15)`

### Typography Matrix
* **Editorial Display Serif:** *Cormorant Garamond* (Google Font weights 300, 400, 500, 600, and Italic). Used for plate titles, exhibition headlines, and curatorial quotes.
* **Body / Interface Sans:** *Inter* (`font-light`, `leading-relaxed`). Used for curatorial essays, personal biography, and interface labels.
* **Plate Telemetry Monospace:** *JetBrains Mono* (`tracking-[0.25em]`, uppercase). Used for plate numbers, camera telemetry, categories, and timestamps.
* **Preconnected Web Fonts:** Loaded via `<link>` in `src/app/layout.tsx` to eliminate build-time Google Font network failures.

### Textures & Atmosphere
* **Analogue Film Grain:** Embedded SVG fractal noise overlay (`.film-grain`) at 3.5% opacity with `pointer-events-none` across the viewport, providing an authentic silver-halide texture.
* **Lens Falloff Vignette:** Radial dark falloff gradient (`.vignette-overlay`) on hero imagery mimicking large-format lens characteristics.

### Animation Principles
* **Intensity:** Balanced and restrained.
* **Transitions:** Smooth, natural easing (`transition-all duration-300` / `duration-500` / `duration-700`).
* **Hover States:** Subtle scale decompression (`scale-[1.015]` to `scale-[1.02]`), gentle exposure lift, and border warmth shifts from white/10 to bronze/50.
* **Scroll Behavior:** Native browser momentum scrolling without scroll hijacking.
* **Accessibility:** Full support for `prefers-reduced-motion: reduce`.

---

## 3. Technology Stack & Exact Versions

* **Framework:** Next.js `16.4.6` (App Router)
* **UI Library:** React `19.3.0` & React DOM `19.3.0`
* **Language:** TypeScript `^5` (Strict typing enabled in `tsconfig.json`)
* **Styling:** Tailwind CSS `4.3.3` with `@tailwindcss/postcss` `4.3.3`
* **Bundler Pipeline:** Webpack compiler pipeline (`next build --webpack` / `next dev --webpack`)
* **Icons:** `lucide-react@1.72.0`
* **Image Optimization:** Next.js `<Image>` component with AVIF and WebP format negotiation and Unsplash remote pattern whitelist.

---

## 4. Project Architecture & File Mapping

```
photography-portfolio/
├── package.json                   # Dependencies, build scripts & magic-string override
├── postcss.config.mjs             # PostCSS plugin registration (@tailwindcss/postcss)
├── next.config.ts                 # Next.js configuration (AVIF/WebP, remote image patterns)
├── tsconfig.json                  # Strict TypeScript configuration
├── PROJECT_CONTEXT.md             # This master context handoff document
│
└── src/
    ├── app/
    │   ├── layout.tsx             # Global shell: font preconnect, metadata, film grain overlay
    │   ├── globals.css            # Tailwind 4 @theme, custom palette, grain overlay utilities
    │   └── page.tsx               # Homepage controller wiring all sections & modal inspector state
    │
    ├── components/
    │   ├── Navigation.tsx         # Sticky header, brand identity, mobile drawer, 3D badge
    │   ├── Hero.tsx               # Plate 00 (High Sierra lake reflection), dual CTAs, plate slate
    │   ├── EditorialIntro.tsx     # Personal premise, 4-point exhibition metrics grid
    │   ├── FeaturedGallery.tsx    # Asymmetric editorial grid, multi-genre filter tabs
    │   ├── SeriesShowcase.tsx     # Curated travel journeys (Wanderings, City Streets, Forms)
    │   ├── AboutSection.tsx       # Personal bio, Canon EOS R6 Mark III, portrait placeholder
    │   ├── Footer.tsx             # "Let's Connect" section, HARI watermark, © 2026 Hari colophon
    │   └── PhotoDetailModal.tsx   # Fullscreen plate inspector with keyboard steppers
    │
    └── data/
        └── mockData.ts            # Decoupled SITE_CONFIG, HERO_PHOTOGRAPH, FEATURED_PHOTOGRAPHS, COLLECTIONS
```

---

## 5. Existing Routes & Navigation

* **Currently Implemented Route:**
  * `/` (Homepage — Full-bleed Hero, Curatorial Premise, Selected Plates Gallery, Curated Journeys, About the Photographer, Let's Connect Footer, and Photographic Inspector Modal).
* **Navigation Anchors & Sticky Header Offset:**
  * `#works` -> Selected Exhibition Plates Gallery (`scroll-mt-24 md:scroll-mt-28`)
  * `#series` -> Curated Travel Journeys (`scroll-mt-24 md:scroll-mt-28`)
  * `#about` -> About the Photographer & Behind the Lens (`scroll-mt-24 md:scroll-mt-28`)
  * `#contact` -> Let's Connect & Personal Footer (`scroll-mt-24 md:scroll-mt-28`)
  * *All anchors implement `scroll-mt-28` to ensure headings are never obscured by the fixed header.*

---

## 6. Implemented Features & Current Status

| Component / Feature | Implementation Details | Status |
| :--- | :--- | :--- |
| **Sticky Navigation** | Scroll threshold detection (`scrollY > 30`), backdrop blur, brand title, mobile drawer, and 3D exhibition teaser badge. | **Complete & Verified** |
| **Cinematic Hero** | Plate 00 (*Morning Mist on Alpine Waters* — High Sierra), fluid typography (`text-4xl` to `text-8xl`), dual CTAs, and plate telemetry slate. | **Complete & Verified** |
| **Editorial Premise** | Personal reflection on light and travel, paired with a 4-point personal metrics bar (*EOS R6 Mark III*, *Travel & Nature*, *Observant Gaze*, *Creative Hobby*). | **Complete & Verified** |
| **Featured Gallery** | Asymmetric editorial grid with varied aspect ratios (16:9, 4:5, 3:2, 1:1, 2.39:1 Cinemascope). Filter tabs: `ALL PHOTOGRAPHS`, `LANDSCAPES`, `TRAVEL & STREETS`, `NATURE & WILDLIFE`, `PEOPLE & PORTRAITS`, `ARCHITECTURE`. | **Complete & Verified** |
| **Photo Detail Modal** | Fullscreen dark frosted inspector (`#050507/95 backdrop-blur-2xl`) with aspect ratio preservation, plate telemetry, curator's field context, and keyboard steppers (`Esc`, `ArrowLeft`, `ArrowRight`). | **Complete & Verified** |
| **Curated Journeys** | Showcase for 3 thematic bodies of work: *Wanderings & Wild Places*, *City Streets & Travel Notes*, *Forms & Spaces*. | **Complete & Verified** |
| **About the Photographer** | Natural personal introduction of Harikrishnan Nandanan, Canon EOS R6 Mark III "Behind the Lens" feature, minimal portrait placeholder frame, and Let's Connect card. | **Complete & Verified** |
| **Personal Footer** | Friendly "Let's Connect" message, directory columns, Back to Top smooth scroll, monumental `HARI` watermark, and `© 2026 Hari. All rights reserved.` colophon. | **Complete & Verified** |

---

## 7. Tailwind / PostCSS Dependency Fix & Magic-String Override

### The Issue (`ERR_REQUIRE_ESM`)
During initial builds on Node 20, Next.js Webpack's `postcss-loader` executed synchronous CommonJS `require()` calls to load PostCSS plugins. When `@tailwindcss/postcss` was installed as `^4.3.5`, its dependency `@tailwindcss/node@4.3.5` bumped its dependency on `magic-string` to `^1.1.0`.

This resolved to `magic-string@1.4.5`, which is **pure ES Module (`.mjs`)** and contains no CommonJS entry point. When `@tailwindcss/node/dist/index.js` called `require("magic-string")`, Node 20 halted with:
```
Error [ERR_REQUIRE_ESM]: require() of ES Module .../magic-string/dist/index.mjs not supported.
```

### The Solution (Tailwind v4 Retained)
We pinned `@tailwindcss/postcss` to `4.3.3` (to match `tailwindcss: "4.3.3"`) and added an npm `override` in `package.json`:
```json
{
  "dependencies": {
    "@tailwindcss/postcss": "4.3.3",
    "lucide-react": "^1.72.0",
    "next": "16.4.6",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "overrides": {
    "magic-string": "0.30.21"
  }
}
```
`magic-string@0.30.21` provides dual CommonJS/ESM exports (`dist/magic-string.cjs.js`). This permanently eliminates the `ERR_REQUIRE_ESM` error across all environments while keeping Tailwind CSS v4 fully operational.

---

## 8. Important Architectural Decisions & Constraints

1. **Native Browser Scrolling:** The application strictly uses native browser scrolling. No scroll hijacking or synthetic physics libraries are permitted unless a measurable, non-intrusive improvement is proven.
2. **Webpack Pipeline for Stability:** Next.js build and dev scripts use `--webpack` (`next build --webpack` / `next dev --webpack`) to avoid Windows IPC worker process spawning errors that can occur under Turbopack.
3. **Isolated WebGL Boundary:** WebGL (Three.js / React Three Fiber) is deferred to Phase 6. The standard website routes must have **zero WebGL bundle overhead**.
4. **WebGL Disposal Rule:** In Phase 6, WebGL cleanup must follow React Three Fiber's standard scene-graph lifecycle and disposal mechanisms. **Do not call `gl.forceContextLoss()` during normal React component unmounting.**
5. **Decoupled CMS Readiness:** Content in `src/data/mockData.ts` is structured strictly conforming to upcoming Sanity document schemas (`photograph`, `collection`, `siteSettings`, `category`).

---

## 9. Remaining Issues & Known Limitations

1. **Sample Photographs are Placeholders:** All currently displayed photographs are curated Unsplash placeholders used to test aspect ratios and layout contrast. Harikrishnan's actual photographs will be uploaded via Sanity CMS in Phase 4.
2. **Portrait Frame is a Placeholder:** The About section currently displays a clean, fine-art geometric placeholder frame with a camera silhouette icon (`[ Portrait Placeholder ] Harikrishnan Nandanan`) until Harikrishnan provides his personal portrait.
3. **Dedicated Pages Pending:** Currently, all browsing happens on the single homepage (`/`) with anchor jumps and the `PhotoDetailModal`. Dedicated individual routes (`/gallery`, `/gallery/[slug]`, `/collections/[slug]`) are planned for Phase 3.

---

## 10. Planned Phase 3: Gallery & Individual Photograph Pages

The immediate next milestone comprises:
* **Dedicated Gallery Route (`/gallery`):**
  * Asymmetric editorial grid supporting multi-genre filtering (`LANDSCAPES`, `TRAVEL & STREETS`, `NATURE & WILDLIFE`, `PEOPLE & PORTRAITS`, `ARCHITECTURE`).
  * Sorting controls (by journey, date, plate number).
  * Incremental loading / pagination.
* **Individual Photograph Page (`/gallery/[slug]`):**
  * Prominent, aspect-ratio-locked photographic presentation.
  * Photographic plate title, caption, location context, and curator's notes.
  * Previous / Next plate navigation with keyboard arrows.
  * Direct shareable canonical URLs.
  * Smooth page transitions.
* **Collections Pages (`/collections` and `/collections/[slug]`):**
  * Dedicated travel journey showcase pages with cover photography and narrative descriptions.
  * Curated plate sequences belonging to each journey.

---

## 11. Future Implementation Phases

* **Phase 4: Sanity CMS & Real-Time Publishing Workflow**
  * Embedded Sanity Studio at `/studio` with secure user authentication.
  * Schemas: `photograph`, `collection`, `siteSettings`, `category`.
  * On-demand tag revalidation via webhook (`/api/revalidate`) for instant updates without rebuilding.
  * Next.js `draftMode()` with server-only read tokens for private previewing of unreleased work.
* **Phase 5: GSAP Cinematic Animations & Transitions**
  * Refined clip-path image reveals and subtle parallax.
  * Page transition orchestration.
  * Full `prefers-reduced-motion` compliance.
* **Phase 6: Three.js Immersive Gallery Experience**
  * Dynamically loaded 3D exhibition hall at `/immersive`.
  * Curved spatial image planes with custom GLSL shaders.
  * Smooth camera inertia gliding and click-to-focus interactions.
  * Automatic GPU performance tier scaling and accessible 2D fallback.
* **Phase 7: Performance, SEO & Responsive Optimization**
  * Low-Quality Image Placeholders (LQIP blurhash) generated via Sanity asset pipeline.
  * Core Web Vitals audit (LCP < 1.8s, CLS < 0.05, INP < 150ms).
* **Phase 8: Production Deployment on Vercel**
  * Edge network configuration, environment secrets setup, and live domain deployment.

---

## 12. Verification & Command Reference

```powershell
# Start local development server (serves at http://localhost:3000)
npm run dev

# Run strict TypeScript type verification (currently 0 errors)
npx tsc --noEmit

# Run optimized production build (currently compiles in ~2s with 0 errors)
npm run build
```

# Portfolio Redesign — Design Document

**Author:** Abdurrahman
**Date:** 2026-06-19
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis · Three.js (light)

---

## 1. Vision

An immersive, cinematic portfolio where scrolling feels like moving through a
living space. A single **Three.js particle field** is the soul of the site: at
the opening the particles assemble into the name **"ABDURRAHMAN"**, then as the
user scrolls they **disperse into an ambient field that drifts and flies
continuously** — the background is never static, it keeps moving with scroll.
Each section uses a **different transition style** so the journey never feels
repetitive. GSAP + Lenis drive the scroll choreography.

### Design Principles
- **Living background** — NOT a flat color. A 3D particle field that moves
  continuously and reacts to scroll (rotation + forward drift).
- **One unified system** — the opening name and the background field are the
  SAME particle system, transitioning seamlessly (assembled → dispersed).
- **Calm, premium, editorial** — generous whitespace, restrained typography.
- **Soft ambient** — deep ink-slate base behind the particles, never pure black.
- **Variety in motion** — every section introduces a new transition language.
- **Performance first** — single draw call for particles (`THREE.Points`).
  `prefers-reduced-motion` respected; mobile gets reduced particle count or CSS
  fallback.

### The Particle System (core)
- `THREE.Points` with ~4000–6000 particles, one `BufferGeometry`, one draw call.
- Two position buffers per particle:
  - **target (text)** — sampled from rendering "ABDURRAHMAN" to an offscreen
    canvas, reading pixel positions → 3D point cloud.
  - **scatter (ambient)** — random positions in a wide volume.
- Scroll progress `p` (0→1 over the hero) lerps each particle from `text` →
  `scatter`. After dispersal, the whole field slowly rotates and drifts forward,
  with rotation speed/offset tied to global scroll progress so it "moves as you
  scroll" through the entire page.
- Soft additive points, subtle color blend (blue → violet) for depth.

---

## 2. Color & Background System

Replace pure black (`#0a0a0b`) with a softer, layered palette:

```
--color-bg:        #0e0f13   /* deep ink-slate, not pure black */
--color-bg-2:      #14161c   /* raised surface */
--color-bg-3:      #1b1e26   /* cards / panels */
--color-bg-tint:   #121521   /* subtle blue-violet tint for gradients */
--color-fg:        #f0f0f2
--color-fg-soft:   #c8c9d0
--color-fg-muted:  #8b8d98
--color-fg-faint:  #595b66
--color-accent:    #7b9cff   /* soft blue */
--color-accent-2:  #b78bff   /* soft violet — for gradient blends */
--color-line:      rgba(240,240,245,0.08)
--color-line-strong: rgba(240,240,245,0.16)
```

**Background composition (global, fixed behind content):**
1. Base deep ink-slate color (CSS).
2. The **Three.js particle field** (fixed full-screen canvas, `pointer-events:
   none`, `z-index` behind content) — the primary living layer.
3. Fine grain overlay (`.bg-grain`) at low opacity.
4. Subtle vignette at edges so particles fade out toward the frame.

---

## 3. Section Map & Transition Variety

| # | Section      | Transition Style                                              | Tech            |
|---|--------------|---------------------------------------------------------------|-----------------|
| 0 | Background    | Persistent Three.js particle field (drifts + scroll rotation) | Three.js        |
| 1 | Hero / Opening| Particles spell "ABDURRAHMAN" → disperse into bg field        | Three.js + GSAP |
| 2 | Intro line    | Horizontal text reveal (mask wipe), word-by-word              | GSAP            |
| 3 | Work (Projects)| Each project = pinned scene with **4-image 2×2 grid** that   | GSAP pin + stagger |
|   |              | assembles (staggered scale/clip), info slides in              |                 |
| 4 | About         | Photo reveal (clip-path expand) + text fade                   | GSAP + clip     |
| 5 | Experience    | Timeline draw — vertical line draws down, items snap in       | GSAP scrub      |
| 6 | Skills        | Marquee / horizontal auto-scroll rows, opposite directions    | GSAP / CSS      |
| 7 | Contact       | Scale-up reveal from center + magnetic email button           | GSAP + pointer  |

### Transition detail per section

**Hero (Scene 1):**
- The particle field is assembled into the text "ABDURRAHMAN".
- Name/role HTML fades in below the particle text.
- On scroll (pinned ~150%): particles lerp from text-shape → scattered ambient
  field; HTML text fades out. By the end the field is fully dispersed and
  becomes the living background for the rest of the page.

**Intro line (Scene 2):**
- A single statement (e.g. "I build intelligent systems and digital experiences")
  revealed with a left-to-right mask wipe, word by word, scrubbed to scroll.

**Work / Projects (Scene 3) — KEY SECTION:**
- Each of the 4 projects gets its own pinned scene.
- Layout: **2×2 grid of 4 screenshots**, all **equal size** (aspect-ratio
  locked, e.g. 16:10). Images assemble with a staggered reveal:
  - clip-path inset reveal + slight scale-down from 1.1 → 1.0
  - stagger 0.08s between the 4 tiles
- Project meta (title, category, year, description, stack, link) slides in from
  the side as the grid settles.
- On scroll-out: grid tiles scatter/fade slightly before next project pins.
- Each project image set lives in `public/projects/<slug>/1.png … 4.png`.

**About (Scene 4):**
- Photo (`/photo.jpeg`) revealed via expanding clip-path (e.g. inset from
  center, or a wipe). Grayscale → color on settle (optional).
- Bio text fades up in two columns beside/below the photo.

**Experience (Scene 5):**
- A vertical line "draws" (scaleY 0→1) as you scroll; each role snaps in with a
  small x-offset + fade, staggered along the line.

**Skills (Scene 6):**
- Horizontal marquee rows (Frontend / Backend / AI / Data / Tooling), adjacent
  rows scroll in opposite directions. Speed tied loosely to scroll velocity.

**Contact (Scene 7):**
- Headline scales up from 0.9 with fade. Email button is **magnetic**
  (follows cursor slightly on hover). Social links fade in staggered.

---

## 4. Project Data Structure

```ts
type Project = {
  slug: string;          // folder name in /public/projects/<slug>/
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  url?: string;
  images: string[];      // exactly 4, equal aspect ratio
};
```

Images convention: `/public/projects/<slug>/1.png` … `4.png`.
All displayed at the **same locked aspect ratio** (16:10) inside a 2×2 grid.

Projects:
1. `btn-ai`      — BTN AI OCR Workflow
2. `dcktrp`      — DCKTRP Document Intelligence
3. `pegadaian`   — Pegadaian AI
4. `byd`         — BYD Content Marketing AI

---

## 5. Performance Budget & Safeguards

- **Three.js**: at most ONE full-screen shader plane (no models, no lights, no
  geometry beyond a quad). Disable entirely on mobile (`max-width: 768px`) and
  when `prefers-reduced-motion`. If it risks jank, fall back to CSS gradient.
- **Images**: Next.js `<Image>`, lazy where possible, `sizes` set correctly.
  4 images × 4 projects = 16 images — use compressed PNG/WebP.
- **GSAP**: kill all ScrollTriggers + Lenis on unmount. Use `scrub` (not
  per-frame React state) so React doesn't re-render during scroll.
- **Lenis**: single instance, synced to GSAP ticker.
- **Mobile**: reduce pin durations, simplify multi-step timelines to single
  fade/slide, no magnetic cursor, no Three.js.

---

## 6. File Plan

```
app/
  layout.tsx              # fonts + metadata (minor: add bg wrapper)
  globals.css             # new palette, bg system, scene/grid utilities
  page.tsx                # orchestrates scenes (client)
  components/
    Background.tsx         # fixed animated gradient (+ optional Three.js)
    useLenis.ts            # Lenis init hook (shared)
    SceneHero.tsx          # letter A
    SceneIntro.tsx         # mask-wipe line
    SceneWork.tsx          # 4 projects, each 2×2 image grid
    SceneAbout.tsx         # photo + bio
    SceneExperience.tsx    # timeline draw
    SceneSkills.tsx        # marquee
    SceneContact.tsx       # magnetic contact
    Nav.tsx                # fixed nav (mix-blend)
public/
  photo.jpeg              # existing portrait
  projects/
    btn-ai/1..4.png
    dcktrp/1..4.png
    pegadaian/1..4.png
    byd/1..4.png
```

---

## 7. Open Questions / Assumptions

- **Three.js**: We'll implement the background as a CSS animated mesh gradient
  first (zero WebGL cost). A Three.js shader version can be a drop-in upgrade if
  desired — kept optional to honor the "not heavy" constraint.
- **Project images**: User will provide 4 screenshots per project. Until then,
  use placeholders (thum.io live capture for projects with URLs, gradient
  placeholders otherwise) so the layout is testable.
- **Photo**: Uses existing `/photo.jpeg`.

---

## 8. Acceptance Criteria

- [ ] Background is soft ink-slate with subtle gradient/grain — not pure black.
- [ ] Every section uses a visibly different transition.
- [ ] Work section shows 4 equal-size images per project in a grid.
- [ ] About shows the user's photo with a reveal animation.
- [ ] Smooth scroll (Lenis) throughout.
- [ ] No jank on desktop; graceful/simplified on mobile.
- [ ] `next build` passes with no type errors.
- [ ] `prefers-reduced-motion` disables heavy motion.

# ERA Print Pack — Website Project
> Claude reads this file automatically at the start of every session.
> Full tracker is in PROJECT_TRACKER.md — check it before starting any task.

---

## What this project is

Website for **NPT Shtypshkronja ERA** — a Kosovo-based paper packaging manufacturer.
Owner/designer: **Besnik** (besnikdesigns@gmail.com).
Business context (clients, products, pricing, revenue): see `ERA_context.md`.

The site is a **static HTML/CSS/JS** website — no framework, no build step, no bundler.
Served locally via the Claude Preview MCP on **port 9000**.

---

## File structure

```
Era Website/
├── CLAUDE.md               ← you are here
├── PROJECT_TRACKER.md      ← full checklist: done / needs work / missing
├── ERA_context.md          ← full business context (clients, pricing, products)
├── css/
│   └── style.css           ← global styles for ALL pages
├── js/
│   ├── main.js             ← shared nav, footer, whatsapp button, i18n loader
│   └── vendor/
│       ├── three.module.js         ← Three.js r163
│       └── addons/
│           ├── loaders/GLTFLoader.js
│           └── controls/OrbitControls.js
├── assets/
│   ├── models/             ← GLB files for 3D editors
│   │   ├── gota-7oz.glb        ✅ exists
│   │   ├── mbajtese-luge.glb   ✅ exists
│   │   └── leter-tavoline.glb  ✅ exists
│   └── *.jpg / *.svg       ← product photos
├── gota-letre.html         ← Paper cups — MOST ADVANCED PAGE
├── mbajtese-luge.html      ← Cutlery holders — full 3D editor
├── leter-tavoline.html     ← Table paper — full 3D editor + bilingual
├── leter-mbeshtjellese.html← Wrapping paper — no 3D editor yet
├── kapak-gota.html         ← Cup lids — no 3D editor yet
├── kupa-letre.html         ← Paper cups (large) — basic
├── kupa-pasta-supe.html    ← Pasta/soup cups — basic
├── kuti-ushqimore.html     ← Food boxes — basic
├── akullore.html           ← Ice cream cups — basic
├── index.html              ← Homepage
├── products.html           ← All products listing
├── about.html              ← About (minimal, needs content)
├── contact.html            ← Contact (bilingual ✅)
├── machines.html           ← Machines page
├── order.html              ← Order form
└── portfolio-bit.html      ← Portfolio (one client only)
```

---

## Tech stack

- **HTML/CSS/JS only** — no React, no Vue, no build step
- **Three.js r163** — loaded as ES module from `./js/vendor/three.module.js`
- **GLTFLoader + OrbitControls** — from `./js/vendor/addons/`
- **`<script type="module">`** — all 3D editor code lives in inline module scripts
- **`main.js`** — injects shared nav, footer, WhatsApp button, i18n via `data-i18n` attributes
- **`style.css`** — one global stylesheet shared by all pages
- **No npm build** — `package.json` only has Playwright as a dependency (for testing)
- **Dev server** — Claude Preview MCP on port 9000 (`/Users/macbookpro/Era Website/`)

---

## 3D Editor — how it works (critical pattern)

Every product page with a 3D editor follows this pattern:

```
[2D Canvas Editor] → renders design → [CanvasTexture] → applied to [GLB material]
```

### Key variables (differ per page):
| Page | TEX_W | TEX_H | Canvas ID | GLB |
|------|-------|-------|-----------|-----|
| gota-letre | 2048 | 826 | editorCanvas | gota-7oz.glb |
| mbajtese-luge | 510 (85×6) | 2340 (390×6) | editorCanvas | mbajtese-luge.glb |
| leter-tavoline | varies | varies | editorCanvas | leter-tavoline.glb |

### Design material detection (critical — don't break this):
```javascript
// CORRECT: mat.map (truthy) — null is NOT undefined
if (mat.map && !designMaterials.includes(mat) && mat.metalness < 0.3) { ... }

// WRONG — this was the bug that caused inner face to show design:
if (mat.map !== undefined) { ... }  // null !== undefined is TRUE — bug!
```

### Inner face white (mbajtese-luge fix):
After applying canvas texture to `designMaterials`, a second traverse sets all other non-metal materials to white:
```javascript
model.traverse(node => {
  if (!node.isMesh) return;
  const mats = Array.isArray(node.material) ? node.material : [node.material];
  mats.forEach(mat => {
    if (!designMaterials.includes(mat) && (mat.metalness ?? 0) < 0.3) {
      mat.color.set(0xffffff); mat.map = null;
      mat.side = THREE.FrontSide; mat.needsUpdate = true;
    }
  });
});
```

### Camera setup (gota-letre — KNOWN BUG):
```javascript
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
camera.position.set(0, 0, 3.8);
// After model load:
model.scale.setScalar(2 / Math.max(size.x, size.y, size.z)); // normalize to 2 units
camera.position.set(c2.x, c2.y, 3.8); // ⚠️ STILL CUTS OFF CUP — needs auto-fit
```
**TODO**: Replace fixed Z=3.8 with auto-fit calculation using bounding box after scale.

### mbajtese editor constants:
```javascript
const MM      = 6;           // px per mm
const TEX_W   = 85  * MM;   // 510px wide
const TEX_H   = 390 * MM;   // 2340px tall
const FRONT_H = 165 * MM;   // 990px — front printable zone
const BACK_H  = TEX_H - FRONT_H;
const FOLD_H  = 0;           // no fold zone — MUST BE 0 or position arrows break
```

---

## Shared components (injected by main.js)

Every page has these div placeholders that main.js fills:
```html
<div id="site-nav"></div>      ← top navigation
<div id="site-footer"></div>   ← footer
<div id="site-whatsapp"></div> ← floating WhatsApp button
```
**Never** hardcode nav/footer HTML in individual pages.

---

## CSS classes to know

```css
.btn-danger   /* red button — used for Remove Design */
.btn-primary  /* green filled button */
.btn-outline  /* green outline button */
.fade-in      /* scroll-triggered animation */
.text-green   /* ERA green color #4ca706 */
.section      /* standard page section with padding */
.section-sm   /* smaller section */
.cta-banner   /* full-width green CTA strip */
```

---

## Current active bugs (as of 2026-05-07)

1. **gota-letre.html camera** — Cup is cut off at top and bottom. Camera Z=3.8 is not enough. Need to replace with a proper auto-fit based on the model bounding box after normalization. See PROJECT_TRACKER.md bug #1.

2. **No bilingual on gota-letre.html and mbajtese-luge.html** — leter-tavoline.html has the pattern to copy.

---

## What was recently fixed (don't undo these)

- `mbajtese-luge.html` inner face white: changed `mat.map !== undefined` → `mat.map` (truthy check). `null !== undefined` is true in JS — that was causing the design to appear on the inside face.
- `mbajtese-luge.html` position arrows: added `const FOLD_H = 0;` — was undefined after a prior refactor.
- `mbajtese-luge.html` remove design button: `#mlRemoveFullDesignBtn`, shown after `fullDesign:true` upload.
- `gota-letre.html` tab labels: removed emojis. Now: Logo / Ngarko Dizajnin / Tekst / QR Kodi
- `gota-letre.html` empty state overlay: `#cup3dEmptyState`, shown when `objects.length === 0`.
- `gota-letre.html` rotation hint: "Rrotulloje me gisht për ta parë nga të gjitha anët"
- `css/style.css` `.btn-danger` class added.

---

## Brand

- **Primary color**: `#4ca706` (green)
- **Logo**: `assets/era-logo.svg`
- **Language**: Albanian (shqip) primary, English secondary
- **Phone**: +383 44 113 533
- **WhatsApp**: wa.me/38344113533

---

## Always check PROJECT_TRACKER.md first

Before working on any feature, open `PROJECT_TRACKER.md` to see:
- Section 2: Which editor features each page has/lacks
- Section 4: Known active bugs
- Section 5: Priority order for what to build next
- Section 7: Full log of completed work

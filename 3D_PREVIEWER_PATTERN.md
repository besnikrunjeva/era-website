# ERA 3D Previewer — Mobile UI Pattern

> Copy this pattern exactly for every new product page with a 3D editor.
> Reference implementation: `mbajtese-luge.html` and `gota-letre.html`

---

## How it works (overview)

```
Mobile layout (≤900px), flex column:
  order 1 → 3D viewer wrap (.ml-3d-wrap)
  order 2 → Mobile tools panel (.ml-mobile-tools)
  order 3 → Final CTA (.editor-final-cta)
```

The editor container (`#mlEditorFull`) carries **state classes** that control everything via CSS + JS:

| Class | Meaning |
|---|---|
| `is-empty` | Nothing uploaded yet — hides copy card, slider, panels, advanced wrap |
| `has-logo-upload` | A logo was uploaded via Logo tab |
| `has-upload` | Something is uploaded (logo or full design) |
| `mode-logo` | Logo tab is active |
| `mode-design` | Dizajn i Plotë tab is active |

Initial class: `class="ml-full fade-in is-empty mode-logo"`

---

## 1. HTML — Editor container

```html
<div class="ml-full fade-in is-empty mode-logo" id="mlEditorFull">

  <!-- ── MOBILE TOOLS (order:2 on mobile) ── -->
  <div class="ml-mobile-tools" id="mlMobileTools">

    <!-- Primary tabs: always 2 visible -->
    <div class="ml-tool-tabs" role="tablist">
      <button class="ml-tool-tab active" type="button" data-ml-panel="logo">Logo</button>
      <button class="ml-tool-tab" type="button" data-ml-panel="full">Dizajn i Plotë</button>
    </div>

    <!-- Advanced tools: collapsed by default -->
    <details class="ml-advanced-wrap" id="mlAdvancedWrap">
      <summary class="ml-advanced-toggle">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        Mjete shtesë
      </summary>
      <div class="ml-advanced-tabs" role="tablist">
        <button class="ml-tool-tab" type="button" data-ml-panel="text">Tekst</button>
        <button class="ml-tool-tab" type="button" data-ml-panel="qr">QR</button>
      </div>
    </details>

    <!-- Size slider (shown only: logo tab + has-logo-upload) -->
    <div class="ml-size-control" id="mlSizeControl">
      <div class="ml-size-head">
        <span>Madhësia e logos</span>
        <strong id="mlSizeValue">100%</strong>
      </div>
      <input type="range" id="mlSizeSlider" min="40" max="200" step="1" value="100" disabled>
    </div>

    <!-- Description card (hidden when is-empty) -->
    <div class="ml-quick-copy" id="mlQuickCopy">
      <h3 id="mlQuickTitle">Ngarko logon tënde</h3>
      <p id="mlQuickBody">Ngarko logon dhe shiko menjëherë si duket.</p>
      <small class="ml-note" id="mlQuickNote">PNG me sfond transparent jep rezultatin më të mirë.</small>
    </div>

    <!-- LOGO panel (hidden when is-empty) -->
    <div class="ml-tool-panel active" data-ml-panel="logo">
      <div class="ml-logo-actions">
        <button class="btn btn-outline-green btn-sm" id="mlUploadBtn">Ngarko Logon</button>
      </div>
      <p class="ml-upload-status" id="mlUploadStatus"></p>
      <!-- "Pastro" link — hidden until logo uploaded -->
      <button type="button" id="mlClearBtn" style="display:none;margin-top:4px;background:none;border:none;font-size:.74rem;color:var(--text-soft);cursor:pointer;text-decoration:underline;padding:0;">Pastro</button>
    </div>

    <!-- FULL DESIGN panel (hidden when is-empty) -->
    <div class="ml-tool-panel" data-ml-panel="full">
      <div class="ml-full-actions">
        <a class="btn btn-outline-green btn-sm" href="assets/templates/PRODUCT-template.pdf" download>
          Shkarko Shabllonin
        </a>
        <button class="btn btn-primary btn-sm" id="mlFullDesignBtn">Ngarko Dizajnin</button>
      </div>
      <button class="btn btn-danger btn-sm" id="mlRemoveFullDesignBtn" style="display:none;margin-top:10px;width:100%;">
        Hiq Dizajnin
      </button>
      <p class="ml-upload-status" id="mlFullDesignStatus"></p>
    </div>

    <!-- TEXT panel (hidden when is-empty) -->
    <div class="ml-tool-panel" data-ml-panel="text">
      <!-- text tool inputs here -->
    </div>

    <!-- QR panel (hidden when is-empty) -->
    <div class="ml-tool-panel" data-ml-panel="qr">
      <!-- qr tool inputs here -->
    </div>

  </div><!-- /ml-mobile-tools -->

  <!-- ── DESKTOP TOOLBAR (hidden on mobile) ── -->
  <!-- ... desktop toolbar here ... -->

  <!-- ── MAIN EDITOR AREA (order:1 on mobile) ── -->
  <div class="ml-editor-main">
    <!-- 2D canvas + layers panel on desktop -->

    <!-- 3D VIEWER WRAP -->
    <div class="ml-3d-wrap">
      <div class="ml-3d-loading" id="mlCupLoading">
        <div class="ml-spinner"></div>
        <span>Duke ngarkuar modelin 3D…</span>
      </div>
      <canvas id="mlCupCanvas"></canvas>
      <div class="ml-3d-hint">Rrotulloje me gisht për ta parë nga të gjitha anët</div>

      <!-- EMPTY STATE OVERLAY (mobile only, hidden after upload) -->
      <div class="cup-empty-overlay" id="ml3dEmptyState">
        <div class="cup-empty-card">
          <div class="cup-empty-icon">
            <!-- upload SVG icon -->
          </div>
          <h3 class="cup-empty-title" id="mlEmptyTitle">Ngarko logon tënde</h3>
          <p class="cup-empty-sub" id="mlEmptySub">Shihe direkt në 3D — pa regjistrim, pa angazhim.</p>

          <!-- Logo mode buttons (default) -->
          <div class="cup-empty-actions cup-empty-logo-actions">
            <button type="button" id="ml3dLogoUpload" class="btn btn-primary cup-empty-btn">
              <!-- upload SVG --> Ngarko logon
            </button>
          </div>

          <!-- Design mode buttons (shown when mode-design) -->
          <div class="cup-empty-actions cup-empty-design-actions">
            <a class="btn btn-outline-green cup-empty-template-btn" href="assets/templates/PRODUCT-template.pdf" download>Shkarko shabllonin</a>
            <button type="button" id="ml3dDesignUpload" class="btn btn-primary cup-empty-btn">
              <!-- upload SVG --> Ngarko dizajnin
            </button>
          </div>

          <div class="cup-empty-rotate-hint">
            <!-- rotate SVG --> <span id="mlEmptyRotateHint">Rrotulloje me gisht</span>
          </div>
        </div>
      </div>

    </div><!-- /ml-3d-wrap -->
  </div><!-- /ml-editor-main -->

  <!-- ── FINAL CTA (order:3 on mobile) ── -->
  <div class="editor-final-cta">
    <h3>Të pëlqen ajo që sheh?</h3>
    <p>Na shkruaj — ofertë në të njëjtën ditë.</p>
    <div class="editor-final-cta-buttons">
      <a href="order.html?p=PRODUCT" class="btn btn-primary btn-lg">Vazhdo me porosi</a>
      <a href="https://wa.me/38344113533" target="_blank" class="btn btn-outline-green btn-lg">Pyet në WhatsApp</a>
    </div>
  </div>

</div><!-- /ml-full -->
```

---

## 2. CSS — Full mobile tools block

Paste this entire block inside `<style>` on the page:

```css
/* ── 3D WRAP ── */
.ml-3d-wrap {
  position: relative;
  background: linear-gradient(135deg, #eaf4e1 0%, #f4faf0 100%);
  min-height: 500px;
}
.ml-3d-loading {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 10px;
  background: linear-gradient(135deg, #eaf4e1 0%, #f4faf0 100%); z-index: 5;
}

/* ── EMPTY STATE OVERLAY ── */
.cup-empty-overlay {
  position: absolute; inset: 0; z-index: 4;
  display: none;               /* hidden on desktop */
  align-items: center; justify-content: center;
  pointer-events: none;
}
.cup-empty-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
@media (max-width: 900px) { .cup-empty-overlay { display: flex; } }

.cup-empty-card {
  pointer-events: auto;
  background: rgba(255,255,255,.35);
  border: 1.5px dashed rgba(76,167,6,.7);
  border-radius: 16px; padding: 24px 28px;
  max-width: 280px; width: calc(100% - 48px);
  text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,.08);
}
.cup-empty-icon { color: var(--green); margin-bottom: 12px; display: flex; justify-content: center; }
.cup-empty-title { font-size: 1.05rem; font-weight: 700; color: #1a2e10; margin: 0 0 6px; }
.cup-empty-sub { font-size: .875rem; color: #2d4a1e; margin: 0 0 16px; line-height: 1.4; }
.cup-empty-actions { display: flex; flex-direction: column; gap: 10px; align-items: stretch; margin-bottom: 12px; }
.cup-empty-btn { width: 100%; justify-content: center; display: inline-flex; align-items: center; gap: 8px; }
.cup-empty-rotate-hint { display: inline-flex; align-items: center; gap: 6px; font-size: .75rem; color: #2d4a1e; opacity: .8; }

/* Overlay mode switching */
.cup-empty-design-actions { display: none; }
.ml-full.mode-design .cup-empty-logo-actions { display: none; }
.ml-full.mode-design .cup-empty-design-actions { display: flex; }
.cup-empty-template-btn {
  width: 100%; justify-content: center; border-radius: 12px;
  padding: 11px 18px; font-size: .88rem;
  background: rgba(255,255,255,.74); box-shadow: none;
}

/* ── MOBILE TOOLS WRAPPER ── */
.ml-mobile-tools {
  display: none;                /* hidden on desktop */
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--gray-mid);
  background: linear-gradient(180deg, #f9fcf6 0%, #ffffff 100%);
}

/* ── TAB PILLS ── */
.ml-tool-tabs { display: flex; gap: 8px; margin-top: 10px; }
.ml-tool-tab {
  flex: 1; min-width: 0;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid var(--gray-mid);
  background: #fff;
  font-size: .8rem; font-weight: 700; color: var(--text-soft);
  cursor: pointer; transition: var(--transition);
}
.ml-tool-tab.active {
  background: var(--green); border-color: var(--green);
  color: #fff; box-shadow: 0 10px 20px rgba(76,167,6,.18);
}

/* ── ADVANCED TOOLS COLLAPSIBLE ── */
.ml-advanced-wrap { margin-top: 10px; }
.ml-advanced-toggle {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 12px; font-size: .82rem; font-weight: 600; color: var(--text-mid);
  cursor: pointer; list-style: none;
  background: var(--gray-light); border-radius: var(--radius); user-select: none;
}
.ml-advanced-tabs { margin-top: 10px; display: flex; gap: 8px; }
.ml-advanced-tabs .ml-tool-tab { border-radius: 999px; border: 1px solid var(--gray-mid); background: #fff; }
.ml-advanced-tabs .ml-tool-tab.active { background: var(--green); border-color: var(--green); color: #fff; box-shadow: 0 10px 20px rgba(76,167,6,.18); }

/* ── PANELS ── */
.ml-tool-panel { display: none; margin-top: 10px; }
.ml-tool-panel.active { display: block; }

/* ── COPY CARD ── */
.ml-quick-copy {
  margin-top: 10px; padding: 12px 14px 10px;
  border-radius: 14px;
  border: 1px solid rgba(76,167,6,.12);
  background: linear-gradient(135deg, rgba(232,245,224,.95) 0%, rgba(255,255,255,.98) 100%);
}
.ml-quick-copy h3 { margin-bottom: 4px; font-size: .95rem; }
.ml-quick-copy p { font-size: .82rem; color: var(--text-mid); margin: 0; line-height: 1.5; }
.ml-note { display: block; margin-top: 6px; font-size: .72rem; line-height: 1.4; color: var(--text-soft); }

/* ── BUTTONS INSIDE PANELS ── */
.ml-logo-actions { display: flex; gap: 8px; margin-top: 8px; }
.ml-logo-actions .btn { flex: 1; justify-content: center; }
.ml-full-actions { display: flex; gap: 10px; margin-bottom: 8px; }
.ml-full-actions .btn { flex: 1; justify-content: center; }
.ml-upload-status { min-height: 20px; margin: 12px 0 0; font-size: .78rem; font-weight: 600; color: var(--green-darker); }

/* ── SIZE SLIDER ── */
.ml-size-control { margin-top: 8px; margin-bottom: 8px; }
.ml-size-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; margin-bottom: 10px; font-size: .85rem; font-weight: 700; color: var(--text);
}
.ml-size-head strong { color: var(--green-darker); font-variant-numeric: tabular-nums; }
.ml-size-control input[type=range] { width: 100%; accent-color: var(--green); cursor: pointer; }
.ml-size-control input[type=range]:disabled { opacity: .4; cursor: default; }

/* ── STATE-BASED VISIBILITY ── */
/* When nothing uploaded: hide card, panels, advanced, slider */
.ml-full.is-empty .ml-quick-copy,
.ml-full.is-empty .ml-tool-panel,
.ml-full.is-empty .ml-advanced-wrap { display: none; }
/* Size slider shown/hidden via JS (needs both logo tab + has-logo-upload) */

/* ── FINAL CTA (shared with desktop, styled inline) ── */
.editor-final-cta {
  padding: 18px 20px 20px; text-align: center;
  border-top: 1px solid var(--gray-mid);
  background: linear-gradient(180deg, #f9fcf6 0%, #fff 100%);
}
.editor-final-cta h3 { font-size: 1.05rem; font-weight: 700; margin: 0 0 4px; }
.editor-final-cta p { font-size: .85rem; color: var(--text-mid); margin: 0 0 14px; }
.editor-final-cta-buttons { display: flex; flex-direction: column; gap: 10px; }
.editor-final-cta-buttons .btn { justify-content: center; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .ml-full { display: flex; flex-direction: column; }
  .ml-editor-main { display: block; order: 1; min-height: 0; }
  .ml-3d-wrap { min-height: 380px; }
  .ml-mobile-tools { display: block; order: 2; }
  .ml-toolbar, .ml-input-panel, .ml-editor-side, .ml-layers-panel, .ml-3d-hint { display: none !important; }
  .editor-final-cta { order: 3; }
}
@media (max-width: 480px) {
  .ml-tool-tab { font-size: .76rem; padding: 9px 10px; }
  .ml-3d-wrap { min-height: 340px; }
  /* Compact overlay in design mode on small phones */
  .ml-full.mode-design .cup-empty-card { max-width: 218px; width: calc(100% - 96px); padding: 15px 18px; border-radius: 14px; }
  .ml-full.mode-design .cup-empty-icon { margin-bottom: 7px; }
  .ml-full.mode-design .cup-empty-icon svg { width: 24px; height: 24px; }
  .ml-full.mode-design .cup-empty-title { font-size: .9rem; margin-bottom: 5px; }
  .ml-full.mode-design .cup-empty-sub { font-size: .76rem; line-height: 1.32; margin-bottom: 10px; }
  .ml-full.mode-design .cup-empty-actions { gap: 7px; margin-bottom: 8px; }
  .ml-full.mode-design .cup-empty-btn,
  .ml-full.mode-design .cup-empty-template-btn { padding: 9px 12px; min-height: 40px; font-size: .8rem; border-radius: 11px; }
  .ml-full.mode-design .cup-empty-rotate-hint { font-size: .68rem; }
}
```

---

## 3. JS — State management functions

Add these functions inside your `<script type="module">`:

### Copy map (update text per product)
```javascript
const mlCopyMap = {
  logo: {
    title: 'Ngarko logon tënde',
    body:  'Ngarko logon dhe shiko menjëherë si duket.',
    note:  'PNG me sfond transparent jep rezultatin më të mirë.'
  },
  full: {
    title: 'Ngarko dizajnin final',
    body:  'Shkarko shabllonin, dizajnoje vetë dhe ngarko skedarin e përfunduar këtu.',
    note:  'Përdor shabllonin për dimensione të sakta.'
  },
  text: {
    title: 'Shto tekst',
    body:  'Vendos numër telefoni, Instagram ose çdo tekst të shkurtër.',
    note:  'Ideale për kontakt ose mesazh të thjeshtë.'
  },
  qr: {
    title: 'Gjenero QR kod',
    body:  'Ngjit linkun dhe e vendosim automatikisht.',
    note:  'Ideale për menu, Instagram ose website.'
  },
};
```

### setMlPanel — tab switching
```javascript
const mlToolTabs   = Array.from(document.querySelectorAll('.ml-tool-tab'));
const mlToolPanels = Array.from(document.querySelectorAll('[data-ml-panel]'));
const mlAdvancedWrap = document.getElementById('mlAdvancedWrap');

function setMlPanel(name) {
  // Activate tab + panel
  mlToolTabs.forEach(b => b.classList.toggle('active', b.dataset.mlPanel === name));
  mlToolPanels.forEach(p => p.classList.toggle('active', p.dataset.mlPanel === name));

  // Update copy card text
  const copy = mlCopyMap[name];
  if (copy) {
    document.getElementById('mlQuickTitle').textContent = copy.title;
    document.getElementById('mlQuickBody').textContent  = copy.body;
    document.getElementById('mlQuickNote').textContent  = copy.note;
  }

  // Toggle mode class → drives overlay button swap
  const editorEl = document.getElementById('mlEditorFull');
  if (editorEl) {
    editorEl.classList.toggle('mode-logo',   name !== 'full');
    editorEl.classList.toggle('mode-design', name === 'full');
  }

  // Update overlay title/subtitle
  const titleEl = document.getElementById('mlEmptyTitle');
  const subEl   = document.getElementById('mlEmptySub');
  if (titleEl && subEl) {
    if (name === 'full') {
      titleEl.textContent = 'Ngarko dizajnin tënd';
      subEl.textContent   = 'Shkarko shabllonin, përgatit dizajnin dhe ngarko skedarin e plotë.';
    } else {
      titleEl.textContent = 'Ngarko logon tënde';
      subEl.textContent   = 'Shihe direkt në 3D — pa regjistrim, pa angazhim.';
    }
  }

  // Size slider: show only in logo tab + after logo upload
  const sc = document.getElementById('mlSizeControl');
  if (sc) {
    const hasLogo = objects.some(o => o.linkedGroup === 'ml-logo');
    sc.style.display = (name === 'logo' && hasLogo) ? '' : 'none';
  }

  // Close advanced wrap when switching to primary tabs
  if ((name === 'logo' || name === 'full') && mlAdvancedWrap) {
    mlAdvancedWrap.open = false;
  }
}

mlToolTabs.forEach(btn => btn.addEventListener('click', () => setMlPanel(btn.dataset.mlPanel)));
```

### updateMlEmptyState — runs after every objects change
```javascript
function updateMlEmptyState() {
  const overlay  = document.getElementById('ml3dEmptyState');
  const editorEl = document.getElementById('mlEditorFull');
  const isEmpty  = objects.length === 0;
  const hasLogo  = objects.some(o => o.linkedGroup === 'ml-logo');
  const hasFull  = objects.some(o => o.type === 'fullDesign');

  // 3D overlay: show when empty, hide when something uploaded
  if (overlay) { isEmpty ? overlay.classList.remove('hidden') : overlay.classList.add('hidden'); }

  // State classes on editor container
  if (editorEl) {
    editorEl.classList.toggle('is-empty',       isEmpty);
    editorEl.classList.toggle('has-logo-upload', hasLogo);
    editorEl.classList.toggle('has-upload',      hasFull || hasLogo);
  }

  // Sync size slider visibility
  const sc = document.getElementById('mlSizeControl');
  if (sc) {
    const activeTab = document.querySelector('.ml-tool-tab.active');
    const isLogoTab = activeTab && activeTab.dataset.mlPanel === 'logo';
    sc.style.display = (isLogoTab && hasLogo) ? '' : 'none';
  }
}
// Call updateMlEmptyState() at the end of every function that modifies `objects`
// e.g. inside renderLayers(), applyMobileLogo(), mlClearBtn handler, etc.
```

### After logo upload — update UI
```javascript
function applyMobileLogo(img) {
  // ... place logo on canvas ...

  // UI updates
  document.getElementById('mlSizeSlider').disabled = false;
  document.getElementById('mlUploadBtn').textContent = 'Ndrysho Logon';
  document.getElementById('mlUploadStatus').textContent = '✓ Logoja u vendos automatikisht në të dy anët.';
  document.getElementById('mlClearBtn').style.display = '';  // show Pastro link
}
```

### Clear logo handler
```javascript
document.getElementById('mlClearBtn').addEventListener('click', () => {
  objects = objects.filter(o => o.linkedGroup !== 'ml-logo');
  mobileBaseScale = 0;
  document.getElementById('mlSizeSlider').disabled = true;
  document.getElementById('mlSizeSlider').value = 100; logoScale = 1;
  document.getElementById('mlSizeValue').textContent = '100%';
  document.getElementById('mlUploadBtn').textContent = 'Ngarko Logon';
  document.getElementById('mlUploadStatus').textContent = '';
  document.getElementById('mlClearBtn').style.display = 'none';
  selected = -1; syncToolbar(); renderEditor(); renderGuides(); renderLayers();
});
```

### Overlay button wiring
```javascript
// Overlay logo upload button → same as tab panel upload button
const ml3dLogoUpload = document.getElementById('ml3dLogoUpload');
if (ml3dLogoUpload) {
  ml3dLogoUpload.addEventListener('click', () => {
    // trigger same file input as mlUploadBtn
    document.getElementById('mlUploadBtn').click();
    // OR: ltFileInput.click() if you handle it directly
  });
}

// Overlay design upload button → same as mlFullDesignBtn
const ml3dDesignUpload = document.getElementById('ml3dDesignUpload');
if (ml3dDesignUpload) {
  ml3dDesignUpload.addEventListener('click', () => {
    document.getElementById('mlFullDesignBtn').click();
  });
}
```

### Init call
```javascript
setMlPanel('logo');   // sets mode-logo, hides size slider, sets copy text
renderLayers();        // calls updateMlEmptyState() → sets is-empty
```

---

## 4. Checklist — new product page

- [ ] Editor container has `class="ml-full fade-in is-empty mode-logo"` and `id="mlEditorFull"`
- [ ] 3D wrap has green gradient background
- [ ] Overlay has both `.cup-empty-logo-actions` and `.cup-empty-design-actions` divs
- [ ] Template PDF link points to correct file (`assets/templates/PRODUCT-template.pdf`)
- [ ] `order.html?p=PRODUCT-NAME` link in final CTA
- [ ] `mlCopyMap` text updated for this product
- [ ] `updateMlEmptyState()` called inside `renderLayers()`
- [ ] `setMlPanel('logo')` called on init
- [ ] Bilingual strings added to `pageCopy` object (see `leter-tavoline.html` pattern)

---

## 5. Visual states reference

| State | 3D overlay | Tab panel | Size slider | Copy card |
|---|---|---|---|---|
| Empty, Logo tab | "Ngarko logon tënde" + green button | Hidden | Hidden | Hidden |
| Empty, Dizajn tab | "Ngarko dizajnin tënd" + outline + green | Hidden | Hidden | Hidden |
| Logo uploaded, Logo tab | Hidden | "Ndrysho Logon" + "Pastro" link | **Visible** | **Visible** |
| Logo uploaded, Dizajn tab | Hidden | Full design upload buttons | Hidden | **Visible** |
| Full design uploaded | Hidden | "Hiq Dizajnin" button | Hidden | **Visible** |

---

## 6. IDs to use (keep consistent across pages)

| Element | ID |
|---|---|
| Editor container | `mlEditorFull` |
| Mobile tools div | `mlMobileTools` |
| 3D canvas | `mlCupCanvas` |
| 3D loading overlay | `mlCupLoading` |
| Empty state overlay | `ml3dEmptyState` |
| Overlay logo upload btn | `ml3dLogoUpload` |
| Overlay design upload btn | `ml3dDesignUpload` |
| Empty title | `mlEmptyTitle` |
| Empty subtitle | `mlEmptySub` |
| Empty rotate hint | `mlEmptyRotateHint` |
| Advanced wrap | `mlAdvancedWrap` |
| Size slider | `mlSizeSlider` |
| Size value label | `mlSizeValue` |
| Size control wrap | `mlSizeControl` |
| Copy card | `mlQuickCopy` |
| Copy title | `mlQuickTitle` |
| Copy body | `mlQuickBody` |
| Copy note | `mlQuickNote` |
| Logo upload btn | `mlUploadBtn` |
| Upload status | `mlUploadStatus` |
| Clear logo btn | `mlClearBtn` |
| Full design btn | `mlFullDesignBtn` |
| Remove full design btn | `mlRemoveFullDesignBtn` |
| Full design status | `mlFullDesignStatus` |

---

## 7. Hero product image — square with hover zoom

The hero image on every product page must be a **square** on desktop that zooms on hover, and switches to a **tall contain** view on mobile.

### HTML
```html
<div class="cup-showcase">

  <!-- LEFT: product image -->
  <div class="cup-image-wrap fade-in" id="mainCupImg">
    <img src="assets/YOUR-PRODUCT-PHOTO.jpg" alt="Product name" />
    <!-- optional: size badge pill -->
    <!-- <span class="cup-badge-size">7oz</span> -->
  </div>

  <!-- RIGHT: product info -->
  <div class="cup-info fade-in">
    <span class="badge">PRODUCT NAME</span>
    <h1>Title <span class="text-green">Green Part</span></h1>
    <p class="lead">Description text here.</p>

    <!-- 3-column specs table -->
    <div class="cup-specs">
      <div class="spec-item">
        <div class="spec-label" id="specLabelCap">Kapaciteti</div>
        <div class="spec-value" id="specCap">7oz / 200ml</div>
      </div>
      <div class="spec-item">
        <div class="spec-label" id="specLabelUse">Ideal për</div>
        <div class="spec-value" id="specUse">Kafe, Cappuccino, Çaj</div>
      </div>
      <div class="spec-item">
        <div class="spec-label" id="specLabelMin">Porosia Minimale</div>
        <div class="spec-value" id="specMin">10,000 copë</div>
      </div>
    </div>

    <div class="cup-ctas">
      <a href="#preview3d" class="btn btn-primary">Provo Dizajnin</a>
      <a href="order.html?p=PRODUCT" class="btn btn-outline-green">Porosit Tani</a>
    </div>
  </div>

</div>
```

### CSS
```css
/* ── HERO LAYOUT ── */
.cup-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}

/* ── SQUARE IMAGE (desktop) ── */
.cup-image-wrap {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 1;           /* SQUARE — always enforce this */
}
.cup-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;         /* fills the square, crops if needed */
  display: block;
  transition: transform .5s ease;
}
.cup-image-wrap:hover img { transform: scale(1.04); }

/* Optional badge (e.g. "7oz") pinned top-right of image */
.cup-badge-size {
  position: absolute;
  top: 20px; right: 20px;
  background: var(--green); color: var(--white);
  font-size: .85rem; font-weight: 700;
  padding: 6px 14px; border-radius: 100px;
}

/* ── SPECS TABLE (3 columns, no gap, divided by borders) ── */
.cup-specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-bottom: 28px;
  border: 1px solid var(--gray-mid);
  border-radius: var(--radius);
  overflow: hidden;           /* clips child border-radius */
}
.spec-item {
  padding: 10px 14px;
  background: var(--gray-light);
}
.spec-item + .spec-item {
  border-left: 1px solid var(--gray-mid);   /* vertical dividers */
}
.spec-label {
  font-size: .68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--gray);
  margin-bottom: 3px;
}
.spec-value {
  font-size: .88rem;
  font-weight: 700;
  color: var(--text);
}

.cup-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

/* ── MOBILE overrides ── */
@media (max-width: 768px) {
  .cup-showcase {
    grid-template-columns: 1fr;   /* stack vertically */
    gap: 20px;
  }
  .cup-image-wrap {
    aspect-ratio: unset;           /* drop square on mobile */
    max-height: 42vh;
    border-radius: 20px;
  }
  .cup-image-wrap img {
    object-fit: contain;           /* show full product, no crop */
    height: 42vh;
    max-height: 42vh;
  }
  /* specs stay 3 columns even on mobile — they're compact enough */
  .cup-specs { grid-template-columns: repeat(3, 1fr); }
}
```

### Rules to always follow
- **Always `aspect-ratio: 1`** on desktop — never let the image be taller or shorter than wide
- **Always `object-fit: cover`** on desktop — fills the square, never stretches
- **Always switch to `object-fit: contain`** on mobile — so the full product is visible without cropping
- **Specs table always 3 columns** — never stack them, the labels are short enough to fit at 375px
- **No gap on the specs grid** — dividers come from `border-left` on `.spec-item + .spec-item`
- **`overflow: hidden` on `.cup-specs`** is required — it makes the outer `border-radius` work correctly

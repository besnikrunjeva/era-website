# ERA Print Pack — Website Project Tracker
> Last updated: 2026-05-08
> How to use: ✅ Done | ⚠️ Needs work / partial | ❌ Not started | 🔄 In progress

---

## 1. PAGES — EXISTENCE & COMPLETION

| Page | File | Exists | Basic Done | 3D Editor | Bilingual | FAQ | Order CTA |
|------|------|--------|-----------|-----------|-----------|-----|-----------|
| Homepage | index.html | ✅ | ✅ | — | ❌ | — | ✅ |
| All Products | products.html | ✅ | ✅ | — | ✅ | — | ✅ |
| About Us | about.html | ✅ | ⚠️ minimal | — | ❌ | — | ❌ |
| Contact | contact.html | ✅ | ✅ | — | ✅ | ✅ | — |
| Machines | machines.html | ✅ | ✅ | — | ❌ | — | — |
| Order Form | order.html | ✅ | ✅ | — | ❌ | — | — |
| **Gota Letre** | gota-letre.html | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Mbajtëse Luge** | mbajtese-luge.html | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Letër Tavoline** | leter-tavoline.html | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Letër Ushqimore | leter-mbeshtjellese.html | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Kapak Gota | kapak-gota.html | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Kupa Letre | kupa-letre.html | ✅ | ⚠️ basic | ❌ | ❌ | ⚠️ | ✅ |
| Kupa Pasta & Supe | kupa-pasta-supe.html | ✅ | ⚠️ basic | ❌ | ❌ | ⚠️ | ✅ |
| Kuti Ushqimore | kuti-ushqimore.html | ✅ | ⚠️ basic | ❌ | ❌ | ⚠️ | ✅ |
| Kupa Akullore | akullore.html | ✅ | ⚠️ basic | ❌ | ❌ | ⚠️ | ✅ |
| Portfolio | portfolio-bit.html | ✅ | ⚠️ one client | — | ❌ | — | — |
| **Etiketa / Labels** | etiketa.html | ❌ NOT BUILT | — | — | — | — | — |
| **Kuti Speciale** | kuti-speciale.html | ❌ NOT BUILT | — | — | — | — | — |
| **Pjata Letre** | pjata.html | ❌ NOT BUILT | — | — | — | — | — |
| Privacy Policy | privacy.html | ❌ NOT BUILT | — | — | — | — | — |
| Terms of Service | terms.html | ❌ NOT BUILT | — | — | — | — | — |

---

## 2. 3D EDITOR — FEATURE CHECKLIST PER PAGE

### gota-letre.html (Paper Cup 7oz)
- ✅ 3D model loads (gota-7oz.glb)
- ✅ Logo upload + resize + position
- ✅ Full design upload (Ngarko Dizajnin tab)
- ✅ Text tool (add, position, color)
- ✅ QR code generator
- ✅ Flip Horizontal / Flip Vertical
- ✅ Opacity slider
- ✅ Layers panel (desktop)
- ✅ Empty state overlay — redesigned: small card, cup visible around it, embedded upload CTA, fade transition
- ✅ Rotation hint ("mund ta rrotullosh me gisht")
- ✅ 3-step guide (1 Ngarko → 2 Shto → 3 Vazhdo)
- ✅ Tab labels without emojis (Logo / Ngarko Dizajnin / Tekst / QR Kodi)
- ✅ Mobile touch tip
- ✅ "Vazhdo me Porosi" + "Pyet në WhatsApp" dual CTA buttons
- ✅ Editor intro (Mënyra A / Mënyra B — WhatsApp vs try editor)
- ✅ "Si funksionon" 3-step strip (Na trego → Ne dizajnojmë → Ti merr)
- ✅ Advanced tools collapsed by default (text, QR, pro tools in `<details>`)
- ✅ Min order box (10,000 copë / 5,000+5,000 bundle offer)
- ✅ Primary toolbar: logo upload + full design upload always visible
- ⚠️ **CAMERA ZOOM** — cup still cut off top/bottom at Z=3.8 (needs auto-fit from bounding box)
- ✅ Bilingual AL/EN toggle (pageCopy AL/EN + applyPageTranslations; cup data also language-aware)
- ❌ Remove Design button (in Ngarko Dizajnin tab — same as mbajtese)
- ❌ Cup size switcher 3D (3.5oz / 7oz / 12oz) — missing GLB models
- ❌ SVG/PDF download of the wrap design
- ❌ "Shto në dy anët" (duplicate logo to both sides) one-click

### mbajtese-luge.html (Cutlery Holder)
- ✅ 3D model loads (mbajtese-luge.glb)
- ✅ Logo upload + resize + position
- ✅ Full design upload (Dizajn i Plotë tab)
- ✅ Remove Design button (shows after full design upload)
- ✅ Text tool
- ✅ QR code
- ✅ Inner face is white (fixed — not showing design)
- ✅ Position arrows working (FOLD_H = 0 fixed)
- ✅ "Vazhdo me Porosi" CTA
- ✅ Bilingual AL/EN toggle
- ✅ Empty state overlay (dashed card over 3D canvas, matches gota-letre exactly)
- ✅ 3-step guide above editor (how-it-works-mini ported from gota-letre)
- ✅ Rotation hint text update
- ✅ Mobile hero image 42vh fix
- ✅ Spec table redesigned: 3-column horizontal (matches gota-letre style)
- ✅ editor-intro-simple above editor (matches gota-letre)
- ✅ editor-final-cta with dual CTA buttons (kept id="mlOrderBtn")
- ✅ Camera auto-fit (FOV bounding box, matching gota-letre formula)

### leter-tavoline.html (Table Paper)
- ✅ 3D model loads (leter-tavoline.glb)
- ✅ Logo upload + position
- ✅ Full design upload
- ✅ Text tool
- ✅ QR code
- ✅ Bilingual AL/EN toggle
- ✅ "Vazhdo me Porosi" CTA
- ❌ Remove Design button
- ❌ Empty state overlay
- ❌ Rotation hint update
- ⚠️ Camera angle (slightly different setup — verify it shows correctly)

---

## 3. GLB 3D MODELS — STATUS

| Product | Model File | Status |
|---------|-----------|--------|
| Gota 7oz | assets/models/gota-7oz.glb | ✅ Done |
| Mbajtëse Luge | assets/models/mbajtese-luge.glb | ✅ Done |
| Letër Tavoline | assets/models/leter-tavoline.glb | ✅ Done |
| Gota 3.5oz | assets/models/gota-3.5oz.glb | ❌ Missing |
| Gota 12oz | assets/models/gota-12oz.glb | ❌ Missing |
| Kapak Gota | assets/models/kapak-gota.glb | ❌ Missing |
| Letër Ushqimore | assets/models/leter-mbeshtjellese.glb | ❌ Missing |
| Kupa Pasta | assets/models/kupa-pasta.glb | ❌ Missing |
| Kupa Akullore | assets/models/akullore.glb | ❌ Missing |

---

## 4. KNOWN BUGS — ACTIVE

| # | Page | Bug | Priority | Status |
|---|------|-----|----------|--------|
| 1 | gota-letre.html | Camera zoom cuts off cup top & bottom (Z=3.8 not enough — needs auto-fit from bounding box) | 🔴 HIGH | ✅ Fixed |
| 2 | gota-letre.html | No bilingual AL/EN toggle | 🟡 MEDIUM | ✅ Fixed |
| 3 | mbajtese-luge.html | No bilingual AL/EN toggle | 🟡 MEDIUM | ✅ Fixed |
| 4 | leter-tavoline.html | Remove Design button missing | 🟢 LOW | ❌ Not started |
| 5 | mbajtese-luge.html | No empty state overlay | 🟢 LOW | ❌ Not started |
| 6 | order.html | Product pre-fill from URL params needs verification | 🟡 MEDIUM | ⚠️ Unverified |
| 7 | gota-letre.html | mobileQuickBadge null reference (element removed, JS had no guard) | 🟡 MEDIUM | ✅ Fixed |

---

## 5. WHAT TO BUILD NEXT — PRIORITY ORDER

### 🔴 HIGH PRIORITY (Fix now)
- [x] Fix gota-letre.html camera — auto-fit cup to viewport using bounding box after model load ✅
- [x] Add bilingual (AL/EN) to gota-letre.html ✅
- [x] Add bilingual (AL/EN) to mbajtese-luge.html ✅

### 🟡 MEDIUM PRIORITY (This week)
- [ ] Add "Remove Design" button to gota-letre.html (Ngarko Dizajnin tab)
- [ ] Add empty state overlay to mbajtese-luge.html (copy from gota-letre pattern)
- [ ] Add empty state overlay to leter-tavoline.html
- [ ] Add "Remove Design" button to leter-tavoline.html
- [ ] Verify order.html pre-fills correctly from URL ?p= params for all products
- [ ] Improve about.html (add company story, team, photos)
- [ ] Add bilingual to index.html, machines.html, order.html

### 🟢 NORMAL PRIORITY (Next 2 weeks)
- [ ] Build etiketa.html (Labels/Stickers product page)
- [ ] Build kuti-speciale.html (Premium/Dubai gold foil boxes — highest margin product!)
- [ ] Build pjata.html (Paper plates)
- [ ] Expand portfolio-bit.html with more client work examples
- [ ] Improve kupa-letre.html, kupa-pasta-supe.html, kuti-ushqimore.html, akullore.html (add proper specs, FAQ, photos)

### 🔵 FUTURE / BIG FEATURES
- [ ] Make gota-3.5oz.glb and gota-12oz.glb models for 3D size switcher on gota-letre.html
- [ ] Add 3D editor to kapak-gota.html (needs kapak-gota.glb)
- [ ] Add 3D editor to leter-mbeshtjellese.html (needs GLB)
- [ ] Add 3D editor to kupa-pasta-supe.html (needs GLB)
- [ ] SVG/PDF download of wrap design from editor
- [ ] "Shto në të dy anët" one-click button (duplicate logo to left + right sides)
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] SEO: meta descriptions, og:image, sitemap.xml for all pages
- [ ] Google Analytics / tracking setup
- [ ] WhatsApp pre-filled message with product details from editor
- [ ] Instagram portfolio gallery section on homepage

---

## 6. SITE STRUCTURE — NAVIGATION CHECK

| Link in Nav | Points to | Working |
|-------------|-----------|---------|
| Kryefaqja | index.html | ✅ |
| Produktet | products.html | ✅ |
| Makinat | machines.html | ✅ |
| Rreth Nesh | about.html | ✅ |
| Kontakti | contact.html | ✅ |
| Porosit | order.html | ✅ |
| Footer: Privacy | privacy.html | ❌ broken (#) |
| Footer: Terms | terms.html | ❌ broken (#) |
| Social: Facebook | facebook.com/shtypshkronjaera | ✅ |
| Social: Instagram | instagram.com/shtypshkronjaera | ✅ |
| WhatsApp button | wa.me/38344113533 | ✅ |

---

## 7. COMPLETED WORK LOG

### Session: 2026-05-06 / 05-07
- ✅ gota-letre.html — full 3D editor built (logo, text, QR, full design, layers)
- ✅ gota-letre.html — design critique changes (steps guide, tab renames, empty state, rotation hint)
- ✅ gota-letre.html — removed emojis from tab labels
- ✅ mbajtese-luge.html — full 3D editor built
- ✅ mbajtese-luge.html — fixed inner face white (was showing design texture)
- ✅ mbajtese-luge.html — fixed position arrows (FOLD_H was undefined)
- ✅ mbajtese-luge.html — added Remove Design button (Dizajn i Plotë tab)
- ✅ css/style.css — added .btn-danger class
- ✅ leter-tavoline.html — 3D editor with bilingual support
- ✅ Compared GOTA-LETRE-2.glb vs gota-7oz.glb (different client model, not 12oz)
- ✅ PROJECT_TRACKER.md — created
- ✅ CLAUDE.md — created (auto-loaded Claude Code context)

### Session: 2026-05-12
- ✅ mbajtese-luge.html — ported all gota-letre improvements: spec table 3-col horizontal, editor-intro-simple, how-it-works-mini, editor-final-cta dual CTA, camera auto-fit, mobile hero 42vh fix
- ✅ gota-letre.html — full bilingual AL/EN toggle: pageCopy with AL/EN, applyPageTranslations, cupData language-aware for size switcher, breadcrumb translated
- ✅ mbajtese-luge.html — empty state overlay added (dashed card, upload button, bilingual, hides on first upload)
- ✅ mbajtese-luge.html — full bilingual AL/EN toggle: same pattern, covers hero, editor intro, hiw, final CTA, use-cases header, FAQ, CTA banner

### Session: 2026-05-08
- ✅ gota-letre.html — reframed as "test drive": editor-intro (Mënyra A/B), how-it-works-mini strip
- ✅ gota-letre.html — advanced tools collapsed by default in `<details>` (desktop + mobile)
- ✅ gota-letre.html — primary toolbar: Ngarko Logon + Ngarko Dizajnin e Plotë always visible
- ✅ gota-letre.html — dual CTA: "Vazhdo me porosi" + "Pyet në WhatsApp"
- ✅ gota-letre.html — min-order-box: 10,000 copë / 5,000+5,000 bundle offer section
- ✅ gota-letre.html — FAQ fixed: "1,000 copë" → "10,000 copë"
- ✅ gota-letre.html — JS: desktopFullDesignBtn click handler added
- ✅ gota-letre.html — JS: mobileQuickBadge null-check guard added
- ✅ gota-letre.html — empty-state overlay redesigned: small centered card, cup visible around it, embedded upload button, smooth 0.3s fade transition, pointer-events passthrough for drag/rotate
- ✅ gota-letre.html CTA declutter: removed top-of-page order buttons (premature), replaced Mënyra A/B two-card block with single inline invitation, demoted duplicate logo upload button, moved Pastro Preview into Mjete shtesë. Page now has 3 primary CTAs in flow instead of 9–11.
- ✅ Principle established: CTAs only appear AFTER the visitor has had a chance to experience the product (3D editor).
- ✅ gota-letre.html — camera auto-fit fixed: replaced hardcoded Z=3.8 with FOV-based bounding box calculation; cup now fits viewport with 18% breathing room; min/max zoom distances also auto-calculated from model size.

---

## 8. ASSETS INVENTORY

### Images (assets/)
- ✅ cup-7oz.jpg, cup-35oz.jpg, cup-12oz.jpg
- ✅ mbajtese-luge.jpg
- ✅ leter-tavoline.png
- ✅ akullore-h53.jpg, akullore-h63.jpg
- ✅ kapak-gota-bardhe.jpg, kapak-gota-zi.jpg, kapak-gota-both.jpg
- ✅ kupa-pasta-m.jpeg
- ✅ kuti-ushqimore.jpg + variants (S/M/L)
- ✅ era-logo.svg, bit-logo.svg
- ✅ offset-press.jpg, print-team.jpg
- ❌ Photo of leter-mbeshtjellese (wrapping paper) — low quality/missing
- ❌ Photo of etiketa/labels product
- ❌ Photo of pjata (paper plates)
- ❌ Dubai gold foil box photo (highest margin product — urgent for marketing!)

### 3D Models (assets/models/)
- ✅ gota-7oz.glb
- ✅ mbajtese-luge.glb
- ✅ leter-tavoline.glb
- ❌ gota-3.5oz.glb
- ❌ gota-12oz.glb
- ❌ kapak-gota.glb
- ❌ kupa-pasta.glb
- ❌ akullore.glb

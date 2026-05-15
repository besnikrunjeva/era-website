/**
 * ak-editor.js — 3D Editor for Kupa Akullore (Ice Cream Cup)
 * ERA Print Pack · akullore.html
 * Uses OBJLoader directly (preserves original Blender UVs)
 */

import * as THREE        from './vendor/three.module.js';
import { OBJLoader }     from './vendor/addons/loaders/OBJLoader.js';
import { OrbitControls } from './vendor/addons/controls/OrbitControls.js';

// ── Texture canvas dimensions ──────────────────────────────────────────────
// The cup's outer wall is a short wide cylinder:
//   avg circumference ≈ 0.608 units, slant height ≈ 0.115 units → ratio ≈ 5.3×
// Canvas must match that ratio so logos/text are not stretched.
const TEX_W = 2048;
const TEX_H = 387;

// ── State ──────────────────────────────────────────────────────────────────
let objects         = [];
let logoScale       = 1;
let mobileBaseScale = 0;
let canvasTex       = null;
let designMaterials = [];

// ── Hidden texture canvas ──────────────────────────────────────────────────
const texCanvas = document.createElement('canvas');
texCanvas.width  = TEX_W;
texCanvas.height = TEX_H;
const ctx = texCanvas.getContext('2d');

// Draw initial white background
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, TEX_W, TEX_H);

// ── Three.js bootstrap ────────────────────────────────────────────────────
const threeCanvas = document.getElementById('mlCupCanvas');
const renderer    = new THREE.WebGLRenderer({ canvas: threeCanvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene  = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 100);
camera.position.set(0, 0.02, 0.5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping    = true;
controls.dampingFactor    = 0.08;
controls.enablePan        = false;
controls.autoRotate       = true;
controls.autoRotateSpeed  = 1.2;
controls.enableZoom       = false;

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.9));
const dir1 = new THREE.DirectionalLight(0xffffff, 1.3);
dir1.position.set(2, 3, 4); scene.add(dir1);
const dir2 = new THREE.DirectionalLight(0xffffff, 0.5);
dir2.position.set(-3, 1, -2); scene.add(dir2);
scene.add(new THREE.HemisphereLight(0xdff0c8, 0xffffff, 0.4));

// ── Resize ─────────────────────────────────────────────────────────────────
function onResize() {
  const wrap = threeCanvas.parentElement;
  if (!wrap) return;
  const w = wrap.clientWidth  || 400;
  const h = wrap.clientHeight || 500;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
const wrap3d = document.querySelector('.ml-3d-wrap');
if (wrap3d) new ResizeObserver(onResize).observe(wrap3d);
onResize();

// ── Render loop ────────────────────────────────────────────────────────────
(function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
})();

// ── Load OBJ ───────────────────────────────────────────────────────────────
const loadingEl = document.getElementById('mlCupLoading');

// Create canvas texture up front
canvasTex = new THREE.CanvasTexture(texCanvas);
canvasTex.colorSpace = THREE.SRGBColorSpace;
canvasTex.flipY      = true;    // flip so canvas top → cup top

new OBJLoader().load(
  'assets/models/akullore.obj',
  (group) => {
    scene.add(group);

    // ── Normalise to ~2 units ──────────────────────────────────────────────
    const box0   = new THREE.Box3().setFromObject(group);
    const size0  = box0.getSize(new THREE.Vector3());
    const maxDim = Math.max(size0.x, size0.y, size0.z);
    group.scale.setScalar(2 / maxDim);

    const box    = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    const size   = box.getSize(new THREE.Vector3());

    group.position.sub(center);

    // Auto-fit camera
    const fovRad = camera.fov * (Math.PI / 180);
    const dist   = (Math.max(size.x, size.y, size.z) / 2) / Math.tan(fovRad / 2) * 1.6;
    camera.position.set(0, 0, dist);
    controls.target.set(0, 0, 0);
    controls.minDistance = dist * 0.5;
    controls.maxDistance = dist * 3;
    controls.update();

    // ── Assign materials ───────────────────────────────────────────────────
    group.traverse(node => {
      if (!node.isMesh) return;

      const mats = Array.isArray(node.material) ? node.material : [node.material];
      mats.forEach((mat, i) => {
        const name = (mat.name || '').toLowerCase();

        if (name.includes('akullore')) {
          // ── DESIGN surface: outer wall ─────────────────────────────────
          const dm = new THREE.MeshStandardMaterial({
            map:       canvasTex,
            color:     new THREE.Color(1, 1, 1),
            roughness: 0.82,
            metalness: 0,
            side:      THREE.FrontSide,
            name:      'design',
          });
          if (Array.isArray(node.material)) {
            node.material[i] = dm;
          } else {
            node.material = dm;
          }
          if (!designMaterials.includes(dm)) designMaterials.push(dm);

        } else {
          // ── WHITE surface: inner walls, rim, bottom ────────────────────
          const wm = new THREE.MeshStandardMaterial({
            color:     new THREE.Color(1, 1, 1),
            roughness: 0.85,
            metalness: 0,
            side:      THREE.FrontSide,
            name:      'white',
          });
          if (Array.isArray(node.material)) {
            node.material[i] = wm;
          } else {
            node.material = wm;
          }
        }
      });
    });

    // Initial texture render
    renderEditor();

    if (loadingEl) loadingEl.style.display = 'none';
  },
  undefined,
  (err) => {
    console.error('OBJ load error:', err);
    if (loadingEl) loadingEl.textContent = 'Gabim duke ngarkuar modelin.';
  }
);

// ── Render texture canvas ──────────────────────────────────────────────────
function renderEditor() {
  ctx.clearRect(0, 0, TEX_W, TEX_H);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  for (const obj of objects) {
    if (obj.type === 'logo' || obj.type === 'fullDesign' || obj.type === 'qr') {
      if (obj.img) ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);
    } else if (obj.type === 'text') {
      ctx.save();
      ctx.font         = `${obj.bold ? 'bold ' : ''}${obj.size}px Inter, sans-serif`;
      ctx.fillStyle    = obj.color || '#000000';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(obj.text, obj.x, obj.y);
      ctx.restore();
    }
  }

  if (canvasTex) canvasTex.needsUpdate = true;
}

// ── ML copy map ────────────────────────────────────────────────────────────
const mlCopyMap = {
  logo: {
    title: 'Ngarko logon tënde',
    body:  'Ngarko logon dhe shiko menjëherë si duket në kupë.',
    note:  'PNG me sfond transparent jep rezultatin më të mirë.'
  },
  full: {
    title: 'Ngarko dizajnin final',
    body:  'Shkarko shabllonin, dizajnoje vetë dhe ngarko skedarin e përfunduar.',
    note:  'Përdor shabllonin për dimensione të sakta.'
  },
  text: {
    title: 'Shto tekst',
    body:  'Vendos numër telefoni, Instagram ose çdo tekst të shkurtër.',
    note:  'Ideale për kontakt ose mesazh të thjeshtë.'
  },
  qr: {
    title: 'Gjenero QR kod',
    body:  'Ngjit linkun dhe e vendosim automatikisht mbi kupë.',
    note:  'Ideale për menu, Instagram ose website.'
  },
};

// ── ML tab switching ──────────────────────────────────────────────────────
const mlToolTabs    = Array.from(document.querySelectorAll('.ml-tool-tab'));
const mlToolPanels  = Array.from(document.querySelectorAll('[data-ml-panel]'));
const mlAdvancedWrap = document.getElementById('mlAdvancedWrap');
const mlEditorFull  = document.getElementById('mlEditorFull');

function setMlPanel(name) {
  mlToolTabs.forEach(b  => b.classList.toggle('active', b.dataset.mlPanel === name));
  mlToolPanels.forEach(p => p.classList.toggle('active', p.dataset.mlPanel === name));

  const copy = mlCopyMap[name];
  if (copy) {
    const qt = document.getElementById('mlQuickTitle');
    const qb = document.getElementById('mlQuickBody');
    const qn = document.getElementById('mlQuickNote');
    if (qt) qt.textContent = copy.title;
    if (qb) qb.textContent = copy.body;
    if (qn) qn.textContent = copy.note;
  }

  if (mlEditorFull) {
    mlEditorFull.classList.toggle('mode-logo',   name !== 'full');
    mlEditorFull.classList.toggle('mode-design', name === 'full');
  }

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

  const sc = document.getElementById('mlSizeControl');
  if (sc) {
    const hasLogo = objects.some(o => o.linkedGroup === 'ml-logo');
    sc.style.display = (name === 'logo' && hasLogo) ? '' : 'none';
  }

  if ((name === 'logo' || name === 'full') && mlAdvancedWrap) {
    mlAdvancedWrap.open = false;
  }
}

mlToolTabs.forEach(btn => btn.addEventListener('click', () => setMlPanel(btn.dataset.mlPanel)));

// ── Empty state updater ───────────────────────────────────────────────────
function updateMlEmptyState() {
  const overlay = document.getElementById('ml3dEmptyState');
  const isEmpty = objects.length === 0;
  const hasLogo = objects.some(o => o.linkedGroup === 'ml-logo');
  const hasFull = objects.some(o => o.type === 'fullDesign');

  if (overlay) { isEmpty ? overlay.classList.remove('hidden') : overlay.classList.add('hidden'); }

  if (mlEditorFull) {
    mlEditorFull.classList.toggle('is-empty',        isEmpty);
    mlEditorFull.classList.toggle('has-logo-upload', hasLogo);
    mlEditorFull.classList.toggle('has-upload',      hasFull || hasLogo);
  }

  const sc = document.getElementById('mlSizeControl');
  if (sc) {
    const activeTab = document.querySelector('.ml-tool-tab.active');
    const isLogoTab = activeTab && activeTab.dataset.mlPanel === 'logo';
    sc.style.display = (isLogoTab && hasLogo) ? '' : 'none';
  }
}

// ── Logo upload ───────────────────────────────────────────────────────────
const logoFileInput = document.createElement('input');
logoFileInput.type   = 'file';
logoFileInput.accept = 'image/*';

function applyMobileLogo(img) {
  objects = objects.filter(o => o.linkedGroup !== 'ml-logo');

  // Each half of the canvas = one side of the cup (front / back)
  const halfW = TEX_W / 2;
  const maxW  = halfW * 0.72;
  const maxH  = TEX_H * 0.72;
  const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
  const w = img.naturalWidth  * ratio * logoScale;
  const h = img.naturalHeight * ratio * logoScale;
  mobileBaseScale = ratio;

  const y  = (TEX_H - h) / 2;
  const x1 = (halfW - w) / 2;           // centred in first half  (front)
  const x2 = halfW + (halfW - w) / 2;   // centred in second half (back)
  objects.push({ type: 'logo', img, x: x1, y, w, h, linkedGroup: 'ml-logo' });
  objects.push({ type: 'logo', img, x: x2, y, w, h, linkedGroup: 'ml-logo' });

  renderEditor();
  updateMlEmptyState();

  const upBtn   = document.getElementById('mlUploadBtn');
  const upStat  = document.getElementById('mlUploadStatus');
  const clearBtn = document.getElementById('mlClearBtn');
  const slider   = document.getElementById('mlSizeSlider');
  if (upBtn)    upBtn.textContent = 'Ndrysho Logon';
  if (upStat)   upStat.textContent = '✓ Logoja u vendos automatikisht.';
  if (clearBtn) clearBtn.style.display = '';
  if (slider)   { slider.disabled = false; slider.value = 100; }
  const sc = document.getElementById('mlSizeControl');
  if (sc) sc.style.display = '';
  const sv = document.getElementById('mlSizeValue');
  if (sv) sv.textContent = '100%';
  logoScale = 1;
}

logoFileInput.addEventListener('change', () => {
  const file = logoFileInput.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => applyMobileLogo(img);
  img.src = URL.createObjectURL(file);
  logoFileInput.value = '';
});

document.getElementById('mlUploadBtn')?.addEventListener('click', () => logoFileInput.click());
document.getElementById('ml3dLogoUpload')?.addEventListener('click', () => logoFileInput.click());

// ── Size slider ───────────────────────────────────────────────────────────
document.getElementById('mlSizeSlider')?.addEventListener('input', function() {
  const pct = parseInt(this.value, 10);
  logoScale = pct / 100;
  const sv = document.getElementById('mlSizeValue');
  if (sv) sv.textContent = pct + '%';

  const halfW    = TEX_W / 2;
  const logoObjs = objects.filter(o => o.linkedGroup === 'ml-logo');
  logoObjs.forEach((logoObj, idx) => {
    if (!logoObj.img) return;
    const w = logoObj.img.naturalWidth  * mobileBaseScale * logoScale;
    const h = logoObj.img.naturalHeight * mobileBaseScale * logoScale;
    logoObj.w = w; logoObj.h = h;
    logoObj.x = idx === 0 ? (halfW - w) / 2 : halfW + (halfW - w) / 2;
    logoObj.y = (TEX_H - h) / 2;
  });
  renderEditor();
});

// ── Clear logo ─────────────────────────────────────────────────────────────
document.getElementById('mlClearBtn')?.addEventListener('click', () => {
  objects = objects.filter(o => o.linkedGroup !== 'ml-logo');
  mobileBaseScale = 0; logoScale = 1;
  const slider  = document.getElementById('mlSizeSlider');
  const sv      = document.getElementById('mlSizeValue');
  const sc      = document.getElementById('mlSizeControl');
  const upBtn   = document.getElementById('mlUploadBtn');
  const upStat  = document.getElementById('mlUploadStatus');
  const clearBtn = document.getElementById('mlClearBtn');
  if (slider)   { slider.disabled = true; slider.value = 100; }
  if (sv)       sv.textContent = '100%';
  if (sc)       sc.style.display = 'none';
  if (upBtn)    upBtn.textContent = 'Ngarko Logon';
  if (upStat)   upStat.textContent = '';
  if (clearBtn) clearBtn.style.display = 'none';
  renderEditor();
  updateMlEmptyState();
});

// ── Full design upload ────────────────────────────────────────────────────
const fullDesignInput = document.createElement('input');
fullDesignInput.type   = 'file';
fullDesignInput.accept = 'image/*';

fullDesignInput.addEventListener('change', () => {
  const file = fullDesignInput.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    objects = objects.filter(o => o.type !== 'fullDesign');
    objects.push({ type: 'fullDesign', img, x: 0, y: 0, w: TEX_W, h: TEX_H });
    renderEditor();
    updateMlEmptyState();
    const btn   = document.getElementById('mlFullDesignBtn');
    const rmBtn = document.getElementById('mlRemoveFullDesignBtn');
    const stat  = document.getElementById('mlFullDesignStatus');
    if (btn)   btn.style.display = 'none';
    if (rmBtn) rmBtn.style.display = '';
    if (stat)  stat.textContent = '✓ Dizajni u ngarkua.';
  };
  img.src = URL.createObjectURL(file);
  fullDesignInput.value = '';
});

document.getElementById('mlFullDesignBtn')?.addEventListener('click', () => fullDesignInput.click());
document.getElementById('ml3dDesignUpload')?.addEventListener('click', () => fullDesignInput.click());

document.getElementById('mlRemoveFullDesignBtn')?.addEventListener('click', () => {
  objects = objects.filter(o => o.type !== 'fullDesign');
  renderEditor();
  updateMlEmptyState();
  const btn   = document.getElementById('mlFullDesignBtn');
  const rmBtn = document.getElementById('mlRemoveFullDesignBtn');
  const stat  = document.getElementById('mlFullDesignStatus');
  if (btn)   btn.style.display = '';
  if (rmBtn) rmBtn.style.display = 'none';
  if (stat)  stat.textContent = '';
});

// ── Text tool ─────────────────────────────────────────────────────────────
document.getElementById('mlAddTextBtn')?.addEventListener('click', () => {
  const input  = document.getElementById('mlTextInput');
  const sizeI  = document.getElementById('mlFontSize');
  const colorI = document.getElementById('mlTextColor');
  const boldI  = document.getElementById('mlTextBold');
  const text = input ? input.value.trim() : '';
  if (!text) return;
  const size  = parseInt(sizeI?.value || '72', 10);
  const color = colorI?.value || '#000000';
  const bold  = boldI?.checked || false;
  ctx.save();
  ctx.font = `${bold ? 'bold ' : ''}${size}px Inter, sans-serif`;
  const tw = ctx.measureText(text).width;
  ctx.restore();
  // Place text centred on each half (front + back of cup)
  const halfW_t = TEX_W / 2;
  objects.push({ type: 'text', text, size, color, bold, x: halfW_t / 2,         y: TEX_H/2, w: tw, h: size*1.2 });
  objects.push({ type: 'text', text, size, color, bold, x: halfW_t + halfW_t/2, y: TEX_H/2, w: tw, h: size*1.2 });
  renderEditor();
  updateMlEmptyState();
  if (input) input.value = '';
  const stat = document.getElementById('mlTextStatus');
  if (stat) stat.textContent = '✓ Teksti u shtua.';
});

// ── QR tool ───────────────────────────────────────────────────────────────
document.getElementById('mlGenQrBtn')?.addEventListener('click', () => {
  const urlInput = document.getElementById('mlQrUrl');
  const url = urlInput?.value.trim();
  if (!url) return;
  const hidden = document.getElementById('mlQrHidden');
  if (!hidden) return;
  hidden.innerHTML = '';
  try {
    new QRCode(hidden, { text: url, width: 256, height: 256,
      colorDark: '#000000', colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H });
  } catch(e) { console.error('QR error:', e); return; }
  setTimeout(() => {
    const qrEl = hidden.querySelector('img') || hidden.querySelector('canvas');
    if (!qrEl) return;
    const qrSize = TEX_H * 0.72;   // size relative to cup height so it's square on cup
    const halfW_q = TEX_W / 2;
    const img = new Image();
    img.onload = () => {
      objects = objects.filter(o => o.type !== 'qr');
      // Place QR on both sides of cup
      objects.push({ type: 'qr', img, x: (halfW_q - qrSize) / 2,           y: (TEX_H-qrSize)/2, w: qrSize, h: qrSize });
      objects.push({ type: 'qr', img, x: halfW_q + (halfW_q - qrSize) / 2, y: (TEX_H-qrSize)/2, w: qrSize, h: qrSize });
      renderEditor();
      updateMlEmptyState();
      const stat = document.getElementById('mlQrStatus');
      if (stat) stat.textContent = '✓ QR kodi u gjeneru.';
    };
    img.src = qrEl.tagName === 'CANVAS' ? qrEl.toDataURL() : qrEl.src;
  }, 80);
});

// ── Init ──────────────────────────────────────────────────────────────────
setMlPanel('logo');
updateMlEmptyState();

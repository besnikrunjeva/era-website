import * as THREE from './vendor/three.module.js';
import { GLTFLoader }    from './vendor/addons/loaders/GLTFLoader.js';
import { OrbitControls } from './vendor/addons/controls/OrbitControls.js';

/* ── THREE.JS ── */
const canvas3d  = document.getElementById('ltCupCanvas');
const loading3d = document.getElementById('ltCupLoading');
const renderer  = new THREE.WebGLRenderer({ canvas: canvas3d, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
camera.position.set(0, 0, 3.2);
scene.add(new THREE.AmbientLight(0xffffff, 1.8));
const key = new THREE.DirectionalLight(0xffffff, 2.5);
key.position.set(4, 6, 4); scene.add(key);
const fill = new THREE.DirectionalLight(0xffffff, 0.8);
fill.position.set(-4, 2, -2); scene.add(fill);
const controls = new OrbitControls(camera, canvas3d);
controls.enableDamping = true; controls.dampingFactor = 0.08;
controls.minDistance = 1.5; controls.maxDistance = 6;
controls.autoRotate = true; controls.autoRotateSpeed = 0.7;

function resize3d() {
  const w = canvas3d.clientWidth, h = canvas3d.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize3d);

const designMaterials = [];
let canvasTex = null;

new GLTFLoader().load('assets/models/leter-tavoline.glb', gltf => {
  const model = gltf.scene;
  // Auto-center and fit
  const box    = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size   = box.getSize(new THREE.Vector3());
  model.position.sub(center);
  model.scale.setScalar(2 / Math.max(size.x, size.y, size.z));
  scene.add(model);
  // Position camera slightly above and angled for flat paper
  const box2 = new THREE.Box3().setFromObject(model);
  const c2   = box2.getCenter(new THREE.Vector3());
  controls.target.copy(c2);
  camera.position.set(c2.x, c2.y + 1.2, c2.z + 2.4);
  controls.update();
  model.traverse(node => {
    if (node.isMesh && node.material) {
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      // CORRECT: truthy check — null is NOT a design material (null !== undefined is true — bug if using !==)
      mats.forEach(mat => { if (mat.map) designMaterials.push(mat); });
    }
  });
  if (designMaterials.length) {
    canvasTex = new THREE.CanvasTexture(EC);
    canvasTex.flipY = false;
    canvasTex.colorSpace = THREE.SRGBColorSpace;
    designMaterials.forEach(mat => { if (mat.map) mat.map.dispose(); mat.map = canvasTex; mat.needsUpdate = true; });
  }
  loading3d.style.display = 'none';
  resize3d(); renderEditor();
}, undefined, err => { console.error('GLB error', err); loading3d.innerHTML = '<span style="color:#c0392b;font-size:.8rem;padding:20px;text-align:center;">Gabim duke ngarkuar modelin 3D.</span>'; });

(function animate() { requestAnimationFrame(animate); controls.update(); if (canvasTex) canvasTex.needsUpdate = true; renderer.render(scene, camera); })();

/* ── TEXTURE CANVAS ── */
const TEX_W = 2300, TEX_H = 1600;
const EC  = document.getElementById('ltEditorCanvas');
const GC  = document.getElementById('ltGuideCanvas');
const ectx = EC.getContext('2d');
const gctx = GC.getContext('2d');
EC.width = TEX_W; EC.height = TEX_H;

/* ── OBJECTS ── */
let objects  = [];
let selected = -1;
let bgColor  = '#ffffff';
const HANDLE = 28;

/* ── CORNER POSITIONING ── */
let activeCorner = 'tl';
let logoMargin   = 80; // texture px ≈ 8mm
let logoScale    = 1.0;
let activeTab    = 'logo';

function cornerXY(pos, w, h, margin) {
  const m = margin;
  const positions = {
    tl: { x: m + w/2,        y: m + h/2         },
    tc: { x: TEX_W/2,        y: m + h/2         },
    tr: { x: TEX_W-m-w/2,   y: m + h/2         },
    ml: { x: m + w/2,        y: TEX_H/2         },
    cc: { x: TEX_W/2,        y: TEX_H/2         },
    mr: { x: TEX_W-m-w/2,   y: TEX_H/2         },
    bl: { x: m + w/2,        y: TEX_H-m-h/2     },
    bc: { x: TEX_W/2,        y: TEX_H-m-h/2     },
    br: { x: TEX_W-m-w/2,   y: TEX_H-m-h/2     },
  };
  return positions[pos] || positions.cc;
}

function textCornerXY(pos, margin) {
  const m = Math.max(margin, 60);
  const fs = Math.round(TEX_H * 0.052);
  const alignMap  = { tl:'left', tc:'center', tr:'right', ml:'left', cc:'center', mr:'right', bl:'left', bc:'center', br:'right' };
  const xMap = { tl: m, tc: TEX_W/2, tr: TEX_W-m, ml: m, cc: TEX_W/2, mr: TEX_W-m, bl: m, bc: TEX_W/2, br: TEX_W-m };
  const yMap = { tl: m+fs*0.6, tc: m+fs*0.6, tr: m+fs*0.6, ml: TEX_H/2, cc: TEX_H/2, mr: TEX_H/2, bl: TEX_H-m-fs*0.6, bc: TEX_H-m-fs*0.6, br: TEX_H-m-fs*0.6 };
  return { x: xMap[pos] ?? TEX_W/2, y: yMap[pos] ?? TEX_H/2, textAlign: alignMap[pos] || 'center' };
}

function getRect(o) {
  if (o.type === 'qr') return { x: o.x - o.size/2, y: o.y - o.size/2, w: o.size, h: o.size };
  if (o.type === 'text') {
    ectx.save(); ectx.font = `700 ${o.fontSize}px Inter,Arial,sans-serif`;
    const m = ectx.measureText(o.text); ectx.restore();
    const w = m.width + 20, h = o.fontSize * 1.5;
    const align = o.textAlign || 'center';
    const rx = align === 'left' ? o.x : align === 'right' ? o.x - w : o.x - w/2;
    return { x: rx, y: o.y - h/2, w, h };
  }
  const w = o.img.naturalWidth * o.scale, h = o.img.naturalHeight * o.scale;
  return { x: o.x - w/2, y: o.y - h/2, w, h };
}

function corners(o) {
  const { x, y, w, h } = getRect(o);
  return [[x, y], [x+w, y], [x, y+h], [x+w, y+h]];
}

function selObj() { return selected >= 0 ? objects[selected] : null; }

function renderEditor() {
  ectx.clearRect(0, 0, TEX_W, TEX_H);
  ectx.fillStyle = bgColor;
  ectx.fillRect(0, 0, TEX_W, TEX_H);
  const draw = (o, isSel) => {
    const { x, y, w, h } = getRect(o);
    ectx.save(); ectx.globalAlpha = o.opacity;
    if (o.type === 'text') {
      ectx.font = `700 ${o.fontSize}px Inter,Arial,sans-serif`;
      ectx.fillStyle = o.color || '#000';
      ectx.textAlign = o.textAlign || 'center'; ectx.textBaseline = 'middle';
      ectx.fillText(o.text, o.x, o.y);
    } else if (o.type === 'qr') {
      ectx.drawImage(o.qrCanvas, x, y, w, h);
    } else {
      if (o.flipH || o.flipV) {
        ectx.translate(x+w/2, y+h/2); ectx.scale(o.flipH?-1:1, o.flipV?-1:1);
        ectx.drawImage(o.img, -w/2, -h/2, w, h);
      } else { ectx.drawImage(o.img, x, y, w, h); }
    }
    ectx.restore();
    if (isSel) {
      ectx.strokeStyle = '#4ca706'; ectx.lineWidth = 4; ectx.setLineDash([]);
      ectx.strokeRect(x-2, y-2, w+4, h+4);
      corners(o).forEach(([hx, hy]) => {
        ectx.fillStyle = '#4ca706'; ectx.beginPath();
        ectx.roundRect(hx-HANDLE/2, hy-HANDLE/2, HANDLE, HANDLE, 5); ectx.fill();
        ectx.fillStyle = '#fff'; ectx.beginPath();
        ectx.roundRect(hx-HANDLE/2+6, hy-HANDLE/2+6, HANDLE-12, HANDLE-12, 3); ectx.fill();
      });
    }
  };
  objects.forEach((o, i) => { if (i !== selected) draw(o, false); });
  if (selected >= 0) draw(objects[selected], true);
  document.getElementById('ltEditorEmpty').style.display = objects.length ? 'none' : 'flex';
}

function renderGuides() {
  const dw = GC.clientWidth, dh = GC.clientHeight;
  if (!dw || !dh) return;
  GC.width = dw; GC.height = dh;
  gctx.clearRect(0, 0, dw, dh);
  // Draw corner crosshairs for active corner
  const sx = dw / TEX_W, sy = dh / TEX_H;
  const m = logoMargin;
  const anchorXY = {
    tl: [m,       m      ], tc: [TEX_W/2, m      ], tr: [TEX_W-m, m      ],
    ml: [m,       TEX_H/2], cc: [TEX_W/2, TEX_H/2], mr: [TEX_W-m, TEX_H/2],
    bl: [m,       TEX_H-m], bc: [TEX_W/2, TEX_H-m], br: [TEX_W-m, TEX_H-m],
  };
  const [ax, ay] = anchorXY[activeCorner] || [TEX_W/2, TEX_H/2];
  const cx = ax * sx, cy = ay * sy;
  gctx.strokeStyle = 'rgba(76,167,6,.5)'; gctx.lineWidth = 1.5; gctx.setLineDash([6, 4]);
  gctx.beginPath(); gctx.moveTo(cx - 12, cy); gctx.lineTo(cx + 12, cy); gctx.stroke();
  gctx.beginPath(); gctx.moveTo(cx, cy - 12); gctx.lineTo(cx, cy + 12); gctx.stroke();
  gctx.setLineDash([]);
}

function renderLayers() {
  updateLtEmptyState();
  const list = document.getElementById('ltLayersList');
  if (!objects.length) { list.innerHTML = '<div class="lt-layers-empty">Asnjë shtresë</div>'; return; }
  list.innerHTML = '';
  [...objects].reverse().forEach((o, ri) => {
    const i = objects.length - 1 - ri;
    const item = document.createElement('div');
    item.className = 'lt-layer-item' + (i === selected ? ' selected' : '');
    const thumb = document.createElement('canvas'); thumb.className = 'lt-layer-thumb';
    const tc = thumb.getContext('2d');
    thumb.width = 80; thumb.height = 48;
    if (o.type === 'image') tc.drawImage(o.img, 0, 0, 80, 48);
    else if (o.type === 'text') { tc.fillStyle = '#f5f5f5'; tc.fillRect(0,0,80,48); tc.fillStyle = o.color||'#000'; tc.font = 'bold 11px sans-serif'; tc.textAlign='center'; tc.textBaseline='middle'; tc.fillText(o.text.substring(0,10), 40, 24); }
    else { tc.fillStyle = '#000'; tc.fillRect(4,4,72,40); tc.fillStyle='#fff'; tc.font='bold 9px sans-serif'; tc.textAlign='center'; tc.textBaseline='middle'; tc.fillText('QR', 40, 24); }
    const name = document.createElement('span'); name.className = 'lt-layer-name';
    name.textContent = o.type === 'text' ? `T ${o.text.substring(0,10)}` : o.type === 'qr' ? 'QR Kod' : `Imazh ${i+1}`;
    const arrows = document.createElement('div'); arrows.className = 'lt-layer-arrows';
    const up = document.createElement('button'); up.className = 'lt-layer-arrow'; up.textContent = '▲';
    const dn = document.createElement('button'); dn.className = 'lt-layer-arrow'; dn.textContent = '▼';
    up.addEventListener('click', e => { e.stopPropagation(); if (i < objects.length-1) { [objects[i],objects[i+1]]=[objects[i+1],objects[i]]; if(selected===i) selected=i+1; else if(selected===i+1) selected=i; renderEditor(); renderLayers(); } });
    dn.addEventListener('click', e => { e.stopPropagation(); if (i > 0) { [objects[i],objects[i-1]]=[objects[i-1],objects[i]]; if(selected===i) selected=i-1; else if(selected===i-1) selected=i; renderEditor(); renderLayers(); } });
    arrows.appendChild(up); arrows.appendChild(dn);
    item.appendChild(thumb); item.appendChild(name); item.appendChild(arrows);
    item.addEventListener('click', e => { e.stopPropagation(); selected = i; syncToolbar(); renderEditor(); renderLayers(); });
    list.appendChild(item);
  });
}

function syncToolbar() {
  const o = selObj();
  const hasObj = !!o;
  ['ltBtnFlipH','ltBtnFlipV','ltBtnDelete','ltOpacitySlider'].forEach(id => {
    const el = document.getElementById(id); if(el) el.disabled = !hasObj;
  });
  if (o && document.getElementById('ltOpacitySlider')) {
    document.getElementById('ltOpacitySlider').value = Math.round(o.opacity * 100);
    document.getElementById('ltOpacityVal').textContent = Math.round(o.opacity * 100) + '%';
  }
}

/* ── MOBILE LOGO UPLOAD ── */
let mobileBaseScale = 0;
let ltFileInput = null;

function createFileInput(accept, multiple) {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = accept;
  if (multiple) inp.multiple = true;
  inp.style.cssText = 'position:absolute;left:-9999px;';
  document.body.appendChild(inp);
  return inp;
}

function updateLtEmptyState() {
  const overlay  = document.getElementById('lt3dEmptyState');
  const editorEl = document.getElementById('ltEditorFull');
  const isEmpty  = objects.length === 0;
  const hasLogo  = objects.some(o => o.linkedGroup === 'lt-logo');
  const hasFull  = objects.some(o => o.isFullDesign);
  if (overlay) { isEmpty ? overlay.classList.remove('hidden') : overlay.classList.add('hidden'); }
  if (editorEl) {
    editorEl.classList.toggle('is-empty',       isEmpty);
    editorEl.classList.toggle('has-logo-upload', hasLogo);
    editorEl.classList.toggle('has-upload',      hasFull || hasLogo);
  }
  const sc = document.getElementById('ltSizeControl');
  if (sc) {
    const activeTabEl = document.querySelector('.lt-tool-tab.active');
    const isLogoTab = activeTabEl && activeTabEl.dataset.ltPanel === 'logo';
    sc.style.display = (isLogoTab && hasLogo) ? '' : 'none';
  }
  const removeBtn = document.getElementById('ltRemoveFullDesignBtn');
  if (removeBtn) removeBtn.style.display = hasFull ? '' : 'none';
}

function applyMobileLogo(img) {
  // Remove existing logo objects
  objects = objects.filter(o => o.linkedGroup !== 'lt-logo');
  const maxW = TEX_W * 0.3, maxH = TEX_H * 0.3;
  const scaleW = maxW / img.naturalWidth, scaleH = maxH / img.naturalHeight;
  const scale = Math.min(scaleW, scaleH, 1);
  mobileBaseScale = scale;
  const w = img.naturalWidth * scale * logoScale;
  const h = img.naturalHeight * scale * logoScale;
  const { x, y } = cornerXY(activeCorner, w, h, logoMargin);
  objects.push({ type: 'image', img, x, y, scale: scale * logoScale, opacity: 1, flipH: false, flipV: false, corner: activeCorner, linkedGroup: 'lt-logo' });
  selected = objects.length - 1;
  document.getElementById('ltSizeSlider').disabled = false;
  document.getElementById('ltUploadBtn').textContent = 'Ndrysho Logon';
  document.getElementById('ltUploadStatus').textContent = '✓ Logoja u vendos automatikisht.';
  document.getElementById('ltClearBtn').style.display = '';
  syncToolbar(); renderEditor(); renderGuides(); renderLayers();
  controls.autoRotate = false;
}

function repositionLogos() {
  objects.forEach(o => {
    if (activeTab === 'logo' && o.type === 'image') {
      const { w, h } = (() => { const r = getRect(o); return { w: r.w, h: r.h }; })();
      const pos = cornerXY(activeCorner, w, h, logoMargin);
      o.x = pos.x; o.y = pos.y; o.corner = activeCorner;
    } else if (activeTab === 'text' && o.type === 'text') {
      const pos = textCornerXY(activeCorner, logoMargin);
      o.x = pos.x; o.y = pos.y; o.textAlign = pos.textAlign;
    } else if (activeTab === 'qr' && o.type === 'qr') {
      const pos = cornerXY(activeCorner, o.size, o.size, logoMargin);
      o.x = pos.x; o.y = pos.y;
    }
  });
  renderEditor(); renderGuides();
}

/* ── GENERATE QR ── */
function generateQR(url) {
  if (!url || !url.trim()) { alert('Vendos një link të vlefshëm.'); return; }
  const QR_SIZE = 280;
  const tmp = document.createElement('div');
  tmp.style.cssText = 'position:absolute;left:-9999px;';
  document.body.appendChild(tmp);
  try { new QRCode(tmp, { text: url.trim(), width: QR_SIZE, height: QR_SIZE, colorDark: '#000000', colorLight: '#ffffff' }); }
  catch(e) { document.body.removeChild(tmp); alert('Gabim duke gjeneruar QR kodin.'); return; }
  const qrCanvas = tmp.querySelector('canvas');
  if (!qrCanvas) { document.body.removeChild(tmp); alert('Gabim duke gjeneruar QR kodin.'); return; }
  const existingQR = objects.findIndex(o => o.type === 'qr');
  if (existingQR >= 0) objects.splice(existingQR, 1);
  const qrPos = cornerXY(activeCorner, QR_SIZE, QR_SIZE, logoMargin);
  objects.push({ type: 'qr', qrCanvas, size: QR_SIZE, x: qrPos.x, y: qrPos.y, opacity: 1 });
  selected = objects.length - 1;
  document.body.removeChild(tmp);
  syncToolbar(); renderEditor(); renderGuides(); renderLayers();
  controls.autoRotate = false;
}

/* ── ADD TEXT ── */
function addText(text, color) {
  if (!text.trim()) { alert('Shkruaj diçka para se ta shtosh.'); return; }
  const fontSize = Math.round(TEX_H * 0.052);
  const { x, y, textAlign } = textCornerXY(activeCorner, logoMargin);
  objects.push({ type: 'text', text: text.trim(), x, y, textAlign, fontSize, color, opacity: 1 });
  selected = objects.length - 1;
  syncToolbar(); renderEditor(); renderGuides(); renderLayers();
  controls.autoRotate = false;
}

/* ── CANVAS MOUSE / TOUCH ── */
let dragging = false, dragOff = {x:0,y:0}, resizing = false, resizeCorner = -1;

function canvasXY(e) {
  const r = EC.getBoundingClientRect();
  const src = e.touches ? e.touches[0] : e;
  return { x: (src.clientX - r.left) / r.width * TEX_W, y: (src.clientY - r.top) / r.height * TEX_H };
}

EC.addEventListener('mousedown', e => {
  const { x, y } = canvasXY(e);
  // Check corners first
  if (selected >= 0) {
    const cidx = corners(objects[selected]).findIndex(([cx,cy]) => Math.hypot(x-cx, y-cy) < HANDLE);
    if (cidx >= 0) { resizing = true; resizeCorner = cidx; return; }
  }
  // Hit test objects (reversed for top-first)
  let hit = -1;
  for (let i = objects.length-1; i >= 0; i--) {
    const { x: rx, y: ry, w, h } = getRect(objects[i]);
    if (x >= rx && x <= rx+w && y >= ry && y <= ry+h) { hit = i; break; }
  }
  selected = hit;
  if (hit >= 0) {
    dragOff = { x: x - objects[hit].x, y: y - objects[hit].y };
    dragging = true;
  }
  syncToolbar(); renderEditor(); renderLayers();
});

document.addEventListener('mousemove', e => {
  if (!dragging && !resizing) return;
  const { x, y } = canvasXY(e);
  if (dragging && selected >= 0) { objects[selected].x = x - dragOff.x; objects[selected].y = y - dragOff.y; renderEditor(); }
  if (resizing && selected >= 0) {
    const o = objects[selected]; if (o.type === 'image') {
      const cx = o.x, cy = o.y;
      const dist = Math.hypot(x - cx, y - cy);
      const { w, h } = getRect(o);
      const orig = Math.hypot(w/2, h/2);
      if (orig > 0) o.scale *= dist / orig;
      renderEditor();
    }
  }
});
document.addEventListener('mouseup', () => { dragging = false; resizing = false; renderLayers(); });

/* ── DESKTOP TOOLBAR EVENTS ── */
document.getElementById('ltDesignUpload').addEventListener('change', function() {
  [...this.files].forEach(file => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(TEX_W * 0.4 / img.naturalWidth, TEX_H * 0.4 / img.naturalHeight, 1);
      const w = img.naturalWidth*scale, h = img.naturalHeight*scale;
      const {x,y} = cornerXY(activeCorner, w, h, logoMargin);
      objects.push({ type:'image', img, x, y, scale, opacity:1, flipH:false, flipV:false, corner: activeCorner });
      selected = objects.length-1;
      syncToolbar(); renderEditor(); renderGuides(); renderLayers();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
  this.value = '';
});

document.getElementById('ltBtnAddText').addEventListener('click', () => {
  document.getElementById('ltTextPanel').classList.toggle('open');
  document.getElementById('ltQrPanel').classList.remove('open');
});
document.getElementById('ltBtnQR').addEventListener('click', () => {
  document.getElementById('ltQrPanel').classList.toggle('open');
  document.getElementById('ltTextPanel').classList.remove('open');
});
document.getElementById('ltQrCancelBtn').addEventListener('click', () => document.getElementById('ltQrPanel').classList.remove('open'));
document.getElementById('ltDeskTextCancelBtn').addEventListener('click', () => document.getElementById('ltTextPanel').classList.remove('open'));
document.getElementById('ltQrGenBtn').addEventListener('click', () => {
  generateQR(document.getElementById('ltQrUrlInput').value);
  document.getElementById('ltQrPanel').classList.remove('open');
  document.getElementById('ltQrUrlInput').value = '';
});
document.getElementById('ltDeskTextAddBtn').addEventListener('click', () => {
  addText(document.getElementById('ltDeskTextInput').value, document.getElementById('ltDeskTextColor').value);
  document.getElementById('ltTextPanel').classList.remove('open');
  document.getElementById('ltDeskTextInput').value = '';
});

document.getElementById('ltBtnFlipH').addEventListener('click', () => { const o=selObj(); if(o&&o.type==='image'){o.flipH=!o.flipH;renderEditor();} });
document.getElementById('ltBtnFlipV').addEventListener('click', () => { const o=selObj(); if(o&&o.type==='image'){o.flipV=!o.flipV;renderEditor();} });
document.getElementById('ltBtnDelete').addEventListener('click', () => { if(selected>=0){objects.splice(selected,1);selected=-1;syncToolbar();renderEditor();renderGuides();renderLayers();} });
document.getElementById('ltBtnClearAll').addEventListener('click', () => { objects=[];selected=-1;mobileBaseScale=0;document.getElementById('ltSizeSlider').value=100;document.getElementById('ltSizeSlider').disabled=true;document.getElementById('ltSizeValue').textContent='100%';document.getElementById('ltUploadBtn').textContent='Ngarko Logon';syncToolbar();renderEditor();renderGuides();renderLayers(); });
document.getElementById('ltOpacitySlider').addEventListener('input', function() { const o=selObj();if(o){o.opacity=+this.value/100;document.getElementById('ltOpacityVal').textContent=this.value+'%';renderEditor();} });
document.getElementById('ltBgColorPicker').addEventListener('input', function() { bgColor=this.value; renderEditor(); });

/* ── DESKTOP CORNER GRID ── */
document.getElementById('ltTbCornerGrid').addEventListener('click', e => {
  const btn = e.target.closest('.lt-tb-corner'); if (!btn) return;
  activeCorner = btn.dataset.pos;
  document.querySelectorAll('.lt-tb-corner').forEach(b => b.classList.toggle('active', b.dataset.pos === activeCorner));
  document.querySelectorAll('.lt-corner-btn').forEach(b => b.classList.toggle('active', b.dataset.pos === activeCorner));
  repositionLogos();
});

document.getElementById('ltTbMarginSlider').addEventListener('input', function() {
  logoMargin = +this.value;
  const mm = Math.round(logoMargin / 10);
  document.getElementById('ltTbMarginVal').textContent = mm + 'mm';
  document.getElementById('ltMarginValue').textContent = mm + 'mm';
  document.getElementById('ltMarginSlider').value = logoMargin;
  repositionLogos();
});

/* ── MOBILE TOOLS ── */
const ltToolTabs    = Array.from(document.querySelectorAll('.lt-tool-tab'));
const ltToolPanels  = Array.from(document.querySelectorAll('[data-lt-panel]'));
const ltAdvancedWrap = document.getElementById('ltAdvancedWrap');
const ltCopyMap = {
  logo: { title:'Ngarko logon tënde',   body:'Ngarko logon dhe shiko menjëherë si duket.',                                                    note:'PNG me sfond transparent jep rezultatin më të mirë.' },
  full: { title:'Ngarko dizajnin final', body:'Shkarko shabllonin, dizajnoje vetë dhe ngarko skedarin e përfunduar këtu.',                     note:'Përdor shabllonin për dimensione të sakta.' },
  text: { title:'Shto tekst',            body:'Vendos numër telefoni, Instagram ose çdo tekst të shkurtër.',                                   note:'Ideale për kontakt ose mesazh të thjeshtë.' },
  qr:   { title:'Gjenero QR kod',        body:'Ngjit linkun dhe e vendosim automatikisht.',                                                     note:'Ideale për menu, Instagram ose website.' },
};

function setLtPanel(name) {
  activeTab = name;
  ltToolTabs.forEach(b => b.classList.toggle('active', b.dataset.ltPanel === name));
  ltToolPanels.forEach(p => p.classList.toggle('active', p.dataset.ltPanel === name));
  const copy = ltCopyMap[name];
  if (copy) {
    document.getElementById('ltQuickTitle').textContent = copy.title;
    document.getElementById('ltQuickBody').textContent  = copy.body;
    document.getElementById('ltQuickNote').textContent  = copy.note;
  }
  // Toggle mode class → drives overlay button swap
  const editorEl = document.getElementById('ltEditorFull');
  if (editorEl) {
    editorEl.classList.toggle('mode-logo',   name !== 'full');
    editorEl.classList.toggle('mode-design', name === 'full');
  }
  // Update overlay title/subtitle
  const titleEl = document.getElementById('ltEmptyTitle');
  const subEl   = document.getElementById('ltEmptySub');
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
  const sc = document.getElementById('ltSizeControl');
  if (sc) {
    const hasLogo = objects.some(o => o.linkedGroup === 'lt-logo');
    sc.style.display = (name === 'logo' && hasLogo) ? '' : 'none';
  }
  // Close advanced wrap when switching to primary tabs
  if ((name === 'logo' || name === 'full') && ltAdvancedWrap) ltAdvancedWrap.open = false;
}

ltToolTabs.forEach(btn => btn.addEventListener('click', () => setLtPanel(btn.dataset.ltPanel)));

/* ── MOBILE CORNER GRID ── */
document.getElementById('ltCornerGrid').addEventListener('click', e => {
  const btn = e.target.closest('.lt-corner-btn'); if (!btn) return;
  activeCorner = btn.dataset.pos;
  document.querySelectorAll('.lt-corner-btn').forEach(b => b.classList.toggle('active', b.dataset.pos === activeCorner));
  document.querySelectorAll('.lt-tb-corner').forEach(b => b.classList.toggle('active', b.dataset.pos === activeCorner));
  repositionLogos();
});

document.getElementById('ltMarginSlider').addEventListener('input', function() {
  logoMargin = +this.value;
  const mm = Math.round(logoMargin / 10);
  document.getElementById('ltMarginValue').textContent = mm + 'mm';
  document.getElementById('ltTbMarginVal').textContent = mm + 'mm';
  document.getElementById('ltTbMarginSlider').value = logoMargin;
  repositionLogos();
});

/* ── SIZE SLIDER ── */
document.getElementById('ltSizeSlider').addEventListener('input', function() {
  logoScale = +this.value / 100;
  document.getElementById('ltSizeValue').textContent = this.value + '%';
  if (mobileBaseScale > 0) {
    objects.forEach(o => { if (o.type === 'image') { o.scale = mobileBaseScale * logoScale; } });
    repositionLogos();
  }
});

/* ── UPLOAD BUTTON (mobile) ── */
document.getElementById('ltUploadBtn').addEventListener('click', () => {
  if (!ltFileInput) ltFileInput = createFileInput('image/png,image/jpeg,image/webp', false);
  ltFileInput.onchange = function() {
    const file = this.files[0]; if (!file) return;
    document.getElementById('ltUploadStatus').textContent = 'Po ngarkojmë...';
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { applyMobileLogo(img); URL.revokeObjectURL(url); };
    img.src = url; this.value = '';
  };
  ltFileInput.click();
});

document.getElementById('ltClearBtn').addEventListener('click', () => {
  objects = objects.filter(o => o.linkedGroup !== 'lt-logo');
  mobileBaseScale = 0;
  document.getElementById('ltSizeSlider').disabled = true;
  document.getElementById('ltSizeSlider').value = 100; logoScale = 1;
  document.getElementById('ltSizeValue').textContent = '100%';
  document.getElementById('ltUploadBtn').textContent = 'Ngarko Logon';
  document.getElementById('ltUploadStatus').textContent = '';
  document.getElementById('ltClearBtn').style.display = 'none';
  selected = -1; syncToolbar(); renderEditor(); renderGuides(); renderLayers();
});

/* ── FULL DESIGN UPLOAD ── */
document.getElementById('ltFullDesignBtn').addEventListener('click', () => {
  const inp = createFileInput('image/png,image/jpeg,image/webp', false);
  inp.onchange = function() {
    const file = this.files[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      objects = objects.filter(o => o.type === 'qr' || o.type === 'text');
      const scale = TEX_W / img.naturalWidth;
      objects.unshift({ type:'image', img, x: TEX_W/2, y: TEX_H/2, scale, opacity:1, flipH:false, flipV:false, corner:'cc', isFullDesign: true });
      selected = 0;
      const statusEl = document.getElementById('ltFullDesignStatus');
      if (statusEl) statusEl.textContent = '✓ Dizajni u ngarkua me sukses.';
      syncToolbar(); renderEditor(); renderGuides(); renderLayers();
      URL.revokeObjectURL(url);
      controls.autoRotate = false;
    };
    img.src = url; this.value = '';
  };
  inp.click();
});

document.getElementById('ltRemoveFullDesignBtn').addEventListener('click', () => {
  objects = objects.filter(o => !o.isFullDesign);
  const statusEl = document.getElementById('ltFullDesignStatus');
  if (statusEl) statusEl.textContent = '';
  selected = -1; syncToolbar(); renderEditor(); renderGuides(); renderLayers();
});

/* ── MOBILE TEXT ── */
document.querySelectorAll('.lt-tpl-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.lt-tpl-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    document.getElementById('ltTextInput').value = this.dataset.tpl;
    document.getElementById('ltTextInput').focus();
  });
});

document.getElementById('ltAddTextBtn').addEventListener('click', () => {
  addText(document.getElementById('ltTextInput').value, document.getElementById('ltTextColor').value);
  document.getElementById('ltTextInput').value = '';
});

document.getElementById('ltAddQrBtn').addEventListener('click', () => {
  generateQR(document.getElementById('ltQrInput').value);
  document.getElementById('ltQrInput').value = '';
});

/* ── ORDER CTA ── */
document.getElementById('ltOrderBtn').addEventListener('click', e => {
  if (!objects.length) return;
  try { sessionStorage.setItem('era-lt-order-preview', JSON.stringify({ product: 'leter-tavoline', designImage: EC.toDataURL('image/png'), savedAt: Date.now() })); }
  catch(err) {}
});

/* ── INITIAL RENDER ── */
setLtPanel('logo');
renderEditor();
renderGuides();
renderLayers();
syncToolbar();

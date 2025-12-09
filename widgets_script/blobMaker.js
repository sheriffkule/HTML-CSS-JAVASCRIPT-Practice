const canvas = document.getElementById('blobCanvas');
const ctx = canvas.getContext('2d');

const size = document.getElementById('size');
const points = document.getElementById('points');
const randomness = document.getElementById('randomness');
const roundness = document.getElementById('roundness');
const smooth = document.getElementById('smooth');
const g1 = document.getElementById('g1');
const g2 = document.getElementById('g2');
const gAngle = document.getElementById('gAngle');
const seed = document.getElementById('seed');
const randomize = document.getElementById('randomize');
const toggleAnim = document.getElementById('toggleAnim');
const speed = document.getElementById('speed');
const downloadPng = document.getElementById('downloadPng');
const downloadSvg = document.getElementById('downloadSvg');

let width = canvas.width;
let height = canvas.height;
let anim = false;
let t = 0;
let dragIndex = -1;

function resize() {
  width = canvas.width = canvas.clientWidth * devicePixelRatio;
  height = canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
resize();

window.addEventListener('resize', resize);

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let rng = mulberry32(0);

let pts = [];
function makePoints() {
  let n = +points.value;
  let r = +size.value;
  let rand = +randomness.value;
  let cx = canvas.clientWidth * 0.5;
  let cy = canvas.clientHeight * 0.5;
  let p = [];

  // Reset RNG to ensure consistent results for same seed
  rng = mulberry32(+seed.value);

  for (let i = 0; i < n; i++) {
    let ang = (i / n) * 2 * Math.PI;
    let randomOffset = (rng() - 0.5) * 2; // Convert 0-1 to -1 to 1
    let dist = r * (1 + (Math.sin(i * 0.5 + t) + Math.sin(i * 1.3) + randomOffset) * 0.15 * rand);
    p.push([cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist]);
  }
  return p;
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  if (!pts.length) pts = makePoints();
  let g = ctx.createLinearGradient(
    0,
    0,
    Math.cos((gAngle.value * Math.PI) / 180) * 500,
    Math.sin((gAngle.value * Math.PI) / 180) * 500
  );
  g.addColorStop(0, g1.value);
  g.addColorStop(1, g2.value);
  ctx.fillStyle = g;
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    let p0 = pts[(i - 1 + pts.length) % pts.length];
    let p1 = pts[i];
    let p2 = pts[(i + 1) % pts.length];
    let p3 = pts[(i + 2) % pts.length];
    let s = +roundness.value;
    let cp1x = p1[0] + ((p2[0] - p0[0]) * s) / 6;
    let cp1y = p1[1] + ((p2[1] - p0[1]) * s) / 6;
    let cp2x = p2[0] - ((p3[0] - p1[0]) * s) / 6;
    let cp2y = p2[1] - ((p3[1] - p1[1]) * s) / 6;
    if (i === 0) {
      ctx.moveTo(p1[0], p1[1]);
    }
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]);
  }
  ctx.closePath();
  ctx.fill();
}

canvas.addEventListener('mousedown', (e) => {
  let r = canvas.getBoundingClientRect();
  // use client-space coordinates (matches makePoints() which uses clientWidth/Height)
  let x = e.clientX - r.left;
  let y = e.clientY - r.top;
  for (let i = 0; i < pts.length; i++) {
    let dx = pts[i][0] - x;
    let dy = pts[i][1] - y;
    if (dx * dx + dy * dy < 100) {
      dragIndex = i;
      break;
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (dragIndex > -1) {
    let r = canvas.getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;
    pts[dragIndex] = [x, y];
  }
});

canvas.addEventListener('mouseup', () => (dragIndex = -1));

function frame() {
  if (anim) t += 0.01 * +speed.value;
  if (dragIndex === -1) pts = makePoints();
  draw();
  requestAnimationFrame(frame);
}
frame();

toggleAnim.onclick = () => {
  anim = !anim;
  toggleAnim.textContent = anim ? 'Stop' : 'Start';
};

randomize.onclick = () => {
  seed.value = Math.floor(Math.random() * 999999);
  rng = mulberry32(+seed.value);
};

seed.addEventListener('input', () => {
  rng = mulberry32(+seed.value);
});

downloadPng.onclick = () => {
  let link = document.createElement('a');
  link.download = `blob-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

downloadSvg.onclick = () => {
  let svgStr = `<svg width="${canvas.clientWidth}" height="${canvas.clientHeight}" xmlns="http://www.w3.org/2000/svg">`;
  let grad = `<defs><linearGradient id="g"><stop offset="0%" style="stop-color:${g1.value}"/><stop offset="100%" style="stop-color:${g2.value}"/></linearGradient></defs>`;
  let pathD = 'M';
  for (let i = 0; i < pts.length; i++) {
    let p0 = pts[(i - 1 + pts.length) % pts.length];
    let p1 = pts[i];
    let p2 = pts[(i + 1) % pts.length];
    let p3 = pts[(i + 2) % pts.length];
    let s = +roundness.value;
    let cp1x = p1[0] + ((p2[0] - p0[0]) * s) / 6;
    let cp1y = p1[1] + ((p2[1] - p0[1]) * s) / 6;
    let cp2x = p2[0] - ((p3[0] - p1[0]) * s) / 6;
    let cp2y = p2[1] - ((p3[1] - p1[1]) * s) / 6;
    if (i === 0) pathD += `${p1[0]},${p1[1]} `;
    pathD += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]} `;
  }
  pathD += 'Z';
  let path = `<path d="${pathD}" fill="url(#g)" />`;
  svgStr += grad + path + '</svg>';
  let blob = new Blob([svgStr], { type: 'image/svg+xml' });
  let url = URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.download = `blob-${Date.now()}.svg`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

function addPresets() {
  let presetList = document.getElementById('presets');
  let presetData = ['Circle', 'Spiky', 'Cloud', 'Organic', 'Star', 'Smooth'];
  presetData.forEach((name) => {
    let d = document.createElement('div');
    d.className = 'preset-item';
    d.textContent = name;
    d.onclick = () => applyPreset(name);
    presetList.appendChild(d);
  });
}

function applyPreset(n) {
  if (n === 'Circle') {
    points.value = 20;
    randomness.value = 0;
  }
  if (n === 'Spiky') {
    points.value = 32;
    randomness.value = 0.9;
  }
  if (n === 'Cloud') {
    points.value = 18;
    randomness.value = 0.45;
  }
  if (n === 'Organic') {
    points.value = 25;
    randomness.value = 0.6;
  }
  if (n === 'Star') {
    points.value = 12;
    randomness.value = 0.8;
  }
  if (n === 'Smooth') {
    points.value = 40;
    randomness.value = 0.2;
  }
  pts = makePoints();
}
addPresets();

function updateGallery() {
  let gal = document.getElementById('gallery');
  gal.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    let c = document.createElement('canvas');
    c.width = 120;
    c.height = 90;
    let g = c.getContext('2d');
    let tmp = makePoints();
    g.beginPath();
    for (let j = 0; j < tmp.length; j++) {
      let p0 = tmp[(j - 1 + tmp.length) % tmp.length];
      let p1 = tmp[j];
      let p2 = tmp[(j + 1) % tmp.length];
      let p3 = tmp[(j + 2) % tmp.length];
      let s = +roundness.value;
      let cp1x = p1[0] + ((p2[0] - p0[0]) * s) / 6;
      let cp1y = p1[1] + ((p2[1] - p0[1]) * s) / 6;
      let cp2x = p2[0] - ((p3[0] - p1[0]) * s) / 6;
      let cp2y = p2[1] - ((p3[1] - p1[1]) * s) / 6;
      if (j === 0) g.moveTo(p1[0] / 4, p1[1] / 4);
      g.bezierCurveTo(cp1x / 4, cp1y / 4, cp2x / 4, cp2y / 4, p2[0] / 4, p2[1] / 4);
    }
    g.closePath();
    g.fillStyle = g1.value;
    g.fill();
    gal.appendChild(c);
  }
}
setInterval(updateGallery, 2000);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();

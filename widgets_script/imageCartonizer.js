// DOM Elements
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const openFileBtn = document.getElementById('open-file');
const useWebcamBtn = document.getElementById('use-webcam');
const resetBtn = document.getElementById('reset');
const origImg = document.getElementById('orig-img');
const webcamEl = document.getElementById('webcam');
const resultCanvas = document.getElementById('result-canvas');
const ctx = resultCanvas.getContext('2d');
const posterizeInput = document.getElementById('posterize');
const edgeInput = document.getElementById('edge');
const smoothInput = document.getElementById('smooth');
const posterizeVal = document.getElementById('posterize-val');
const edgeVal = document.getElementById('edge-val');
const smoothVal = document.getElementById('smooth-val');
const applyLocal = document.getElementById('apply-local');
const statusEl = document.getElementById('status');
const toggleCompare = document.getElementById('toggle-compare');
const downloadBtn = document.getElementById('download');
const clearCanvasBtn = document.getElementById('clear-canvas');
const presetEls = document.querySelectorAll('.preset');

let loadedImage = null;
let streaming = false;
let webcamStream = null;
let compareMode = false;

function setStatus(text) {
  statusEl.textContent = text;
}

// Drag & drop
['dragenter', 'dragover'].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add('drag');
  }),
);

['dragleave', 'drop'].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove('drag');
  }),
);

dropzone.addEventListener('drop', (e) => {
  const f = e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) handleFile();
});

openFileBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  const f = fileInput.files[0];
  if (f) handleFile();
});

resetBtn.addEventListener('click', () => {
  stopWebcam();
  origImg.src = '';
  origImg.style.display = 'none';
  loadedImage = null;
  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  setStatus('No image');
});

useWebcamBtn.addEventListener('click', async () => {
  stopWebcam();
  try {
    webcamStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: false,
    });
    webcamEl.srcObject = webcamStream;
    webcamEl.style.display = 'block';
    origImg.style.display = 'none';
    streaming = true;
    setStatus('Webcam active');
    // Capture a frame to use as image
    setTimeout(() => {
      captureWebcamFrame();
    }, 800);
  } catch (err) {
    alert('Could not start webcam: ' + err.message);
  }
});

function stopWebcam() {
  if (webcamStream) {
    webcamStream.getTracks().forEach((t) => t.stop());
    webcamStream = null;
  }
  webcamEl.style.display = 'none';
  streaming = false;
}

function captureWebcamFrame() {
  if (!streaming) return;
  const w = webcamEl.videoWidth;
  const h = webcamEl.videoHeight;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  c.getContext('2d').drawImage(webcamEl, 0, 0, w, h);
  const data = c.toDataURL('image/png');
  loadImageFromDataURL(data);
  stopWebcam();
}

function handleFile(file) {
  if (!file.type.startsWidth('image/')) {
    alert('Please upload an image file');
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    alert('File too large (max 8 MB)');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    loadImageFromDataURL(e.target.result);
  };
  reader.readAsDataURL(file);
}

function loadImageFromDataURL(dataUrl) {
  const img = new Image();
  img.onload = () => {
    loadedImage = img;
    origImg.src = dataUrl;
    origImg.style.display = 'block';
    setStatus('Image loaded - ready');
    fitCanvasToImage(img);
    // auto-apply local cartoon for instant feedback
    applyCartoon();
  };
  img.src = dataUrl;
}

function fitCanvasToImage(img) {
  const maxW = 800;
  const maxH = 600;
  let w = img.width;
  let h = img.height;
  const ratio = Math.min(maxW / w, maxH / h, 1);
  w = Math.round(w * ratio);
  h = Math.round(h * ratio);
  resultCanvas.width = w;
  resultCanvas.height = h;
  resultCanvas.style.width = w + 'px';
  resultCanvas.style.height = h + 'px';
}

// UI updates for sliders
posterizeInput.addEventListener('input', () => {
  posterizeVal.textContent = posterizeInput.value;
});

edgeInput.addEventListener('input', () => {
  edgeVal.textContent = edgeInput.value;
});

smoothInput.addEventListener('input', () => {
  smoothVal.textContent = smoothInput.value;
});

presetEls.forEach((p) => {
  p.addEventListener('click', () => {
    const k = p.dataset.p;
    if (k === 'toon') {
      posterizeInput.value = 8;
      edgeInput.value = 1.2;
      smoothInput.value = 3;
    }
    if (k === 'sketch') {
      posterizeInput.value = 4;
      edgeInput.value = 2.5;
      smoothInput.value = 0;
    }
    if (k === 'watercolor') {
      posterizeInput.value = 16;
      edgeInput.value = 0.6;
      smoothInput.value = 6;
    }
    if (k === 'high-contrast') {
      posterizeInput.value = 2;
      edgeInput.value = 3;
      smoothInput.value = 1;
    }
    posterizeVal.textContent = posterizeInput.value;
    edgeVal.textContent = edgeInput.value;
    smoothVal.textContent = smoothInput.value;
    applyCartoon();
  });
});

// Core: apply cartoon effect locally using simple image processing
function applyCartoon() {
  if (!loadedImage) {
    setStatus('No image to process');
    return;
  }
  setStatus('Applying cartoon effect...');
  const w = resultCanvas.width;
  const h = resultCanvas.height;
  // draw original smaller
  const temp = document.createElement('canvas');
  temp.width = w;
  temp.height = h;
  const tctx = temp.getContext('2d');
  tctx.drawImage(loadedImage, 0, 0, w, h);
  let imageData = tctx.getImageData(0, 0, w, h);
  // Smooth (approx bilateral by repeated box blur depending on smooth)
  const smooth = parseInt(smoothInput.value, 10);
  if (smooth > 0) {
    for (let i = 0; i < smooth; i++) {
      boxBlur(imageData, w, h);
    }
  }
  // posterize
  posterize(imageData, parseInt(posterizeInput.value, 10));
  // edge detection
  const edgeStrength = parseFloat(edgeInput.value);
  const edges = sobelEdges(tctx, w, h);
  // Composite edges on top
  applyEdges(imageData, edges, edgeStrength);
  // put back
  ctx.putImageData(imageData, 0, 0);
  setStatus('Cartoon effect applied');
}

applyLocal.addEventListener('click', () => {
  applyCartoon();
});

// Download
downloadBtn.addEventListener('click', () => {
  if (!loadedImage) return alert('No image!');
  const a = document.createElement('a');
  a.download = 'cartoon.png';
  a.href = resultCanvas.toDataURL('image/png');
  a.click();
});

clearCanvasBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  setStatus('Cleared');
});

// Compare
toggleCompare.addEventListener('click', () => {
  compareMode = !compareMode;
  if (!loadedImage) return alert('No image loaded!');
  if (compareMode) {
    // overlay original and result as split view
    showCompare();
    toggleCompare.textContent = 'Exit Compare';
  } else {
    // redraw result
    applyCartoon();
    toggleCompare.textContent = 'Compare';
  }
});

function showCompare() {
  // Create split overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.left = 0;
  overlay.style.top = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  // we'll draw on canvas: left half original, right half cartoon
  const w = resultCanvas.width;
  const h = resultCanvas.height;
  const temp = document.createElement('canvas');
  temp.width = w;
  temp.height = h;
  const tctx = temp.getContext('2d');
  // Draw original
  tctx.drawImage(loadedImage, 0, 0, w, h);
  const origData = tctx.getImageData(0, 0, w, h);
  // draw cartoon onto existing canvas to get result
  applyCartoon();
  const cartoonData = ctx.getImageData(0, 0, w, h);
  // compose a split image
  const splitX = Math.floor(w / 2);
  const final = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (x < splitX) {
        final.data[idx] = origData.data[idx];
        final.data[idx + 1] = origData.data[idx + 1];
        final.data[idx + 2] = origData.data[idx + 2];
        final.data[idx + 3] = 255;
      } else {
        final.data[idx] = cartoonData.data[idx];
        final.data[idx + 1] = cartoonData.data[idx + 1];
        final.data[idx + 2] = cartoonData.data[idx + 2];
        final.data[idx + 3] = 255;
      }
    }
  }
  ctx.putImageData(final, 0, 0);
  setStatus('Compare mode - left: original, right: cartoon');
}

// simple image processing helpers
function posterize(imageData, levels) {
  const d = imageData.data;
  const step = 255 / (levels - 1);
  for (let i = 0; i < d.length; i += 4) {
    d[i] = Math.round(d[i] / step) * step;
    d[i + 1] = Math.round(d[i + 1] / step) * step;
    d[i + 2] = Math.round(d[i + 2] / step) * step;
  }
}

function boxBlur(imageData, w, h) {
  const src = imageData.data;
  const out = new Uint8ClampedArray(src.length);
  const radius = 1; // small kernel
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let c = 0;
      for (let ky = -radius; ky <= radius; ky++) {
        for (let kx = -radius; kx <= radius; kx++) {
          const nx = Math.min(w - 1, Math.max(0, x + kx));
          const ny = Math.min(h - 1, Math.max(0, x + ky));
          const idx = [ny * w + nx] * 4;
          r += src[idx];
          g += src[idx + 1];
          b += src[idx + 2];
          c++;
        }
      }
      const idx = (y * w + x) * 4;
      out[idx] = r / c;
      out[idx + 1] = g / c;
      out[idx + 2] = b / c;
      out[idx + 3] = 255;
    }
  }
  imageData.data.set(out);
}

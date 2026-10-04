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

function setStatus(text, color) {
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

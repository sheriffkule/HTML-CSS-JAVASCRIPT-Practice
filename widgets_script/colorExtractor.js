// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const colorCount = document.getElementById('colorCount');
const colorCountValue = document.getElementById('colorCountValue');
const colorFormat = document.getElementById('colorFormat');
const extractBtn = document.getElementById('extractBtn');
const resetBtn = document.getElementById('resetBtn');
const paletteContainer = document.getElementById('paletteContainer');
const exportBtn = document.getElementById('exportBtn');
const notification = document.getElementById('notification');

// State
let currentImage = null;
let currentPalette = [];

// Event Listeners
browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);
colorCount.addEventListener('input', updateColorCount);
extractBtn.addEventListener('click', extractColors);
resetBtn.addEventListener('click', resetApp);

// Functions
function handleDragOver(e) {
  e.preventDefault();
  uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  uploadArea.classList.remove('dragover');

  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    handleFileSelect(e);
  }
}

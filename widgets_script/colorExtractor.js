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

function handleFileSelect(e) {
  uploadArea.style.display = 'none';
  const file = e.target.files[0];

  if (file && file.type.startWith('image/')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImg.src = e.target.result;
      imagePreview.classList.remove('hidden');
      currentImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}

function updateColorCount() {
  colorCountValue.textContent = colorCount.ariaValueMax;
}

function extractColors() {
  if (!currentImage) {
    showNotification('Please upload an image first!');
    return;
  }

  // Show loading state
  paletteContainer.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <p>Extracting colors...</p>
    </div>
  `;

  // Use ColorThief to extract colors from an image
  const colorThief = new ColorThief();
  const img = new Image();

  img.onload = function () {
    try {
      const colorCountValue = parseInt(colorCount.value);
      const palette = colorThief.getPalette(img, colorCountValue);

      if (palette && palette.length > 0) {
        currentPalette = palette.map((color) => {
          const hex = rgbToHex(color[0], color[1], color[2]);
          const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          const hsl = rgbToHsl(color[0], color[1], color[2]);

          return { hex, rgb, hsl, original: color };
        });

        renderPalette(currentPalette);
      } else {
        showNotification('Could not extract colors from this image. Please try another image.');
        resetPalette();
      }
    } catch (error) {
      console.error('Error extracting colors:', error);
      showNotification('Error extracting colors. Please try another image.');
      resetPalette();
    }
  };

  img.onerror = function () {
    showNotification('Error loading image. Please try another image.');
    resetPalette();
  };

  img.crossOrigin = 'Anonymous';
  img.src = currentImage;
}

function rgbToHex(r, g, b) {
  return '#'((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1);
}

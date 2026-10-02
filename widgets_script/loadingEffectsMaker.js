// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const loaderType = document.getElementById('loaderType');
const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');
const bgColor = document.getElementById('bgColor');
const bgColorPreview = document.getElementById('bgColorPreview');
const loaderSize = document.getElementById('loaderSize');
const loaderSpeed = document.getElementById('loaderSpeed');
const previewContainer = document.getElementById('previewContainer');
const loader = document.getElementById('loader');
const htmlCode = document.getElementById('htmlCode');
const copyBtn = document.getElementById('copyBtn');
const exportCss = document.getElementById('exportCss');
const exportHtml = document.getElementById('exportHtml');
const exportJs = document.getElementById('exportJs');
const successMessage = document.getElementById('successMessage');

// Current settings
let currentSettings = {
  type: 'spinner',
  color: '#4361ee',
  size: 50,
  speed: 1,
  bgColor: '#ffffff',
};

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// Update color preview
colorPicker.addEventListener('input', (e) => {
  colorPreview.style.backgroundColor = e.target.value;
  currentSettings.color = e.target.value;
  updateLoader();
});

bgColor.addEventListener('input', (e) => {
  bgColorPreview.style.backgroundColor = e.target.value;
  previewContainer.style.backgroundColor = e.target.value;
  currentSettings.bgColor = e.target.value;
  updateLoader();
});

// Update loader type
loaderType.addEventListener('change', (e) => {
  currentSettings.type = e.target.value;
  updateLoader();
});

// Update loader size
loaderSize.addEventListener('input', (e) => {
  currentSettings.size = parseInt(e.target.value);
  updateLoader();
});

// Update loader speed
loaderSpeed.addEventListener('input', (e) => {
  currentSettings.speed = parseFloat(e.target.value);
  updateLoader();
});

// Update loader based on current settings
function updateLoader() {
  // Clear previous loader
  loader.innerHTML = '';
  loader.className = '';
  loader.style = '';

  // Set common properties
  loader.style.setProperty('--loader-color', currentSettings.color);
  loader.style.animationDuration = `${currentSettings.speed}s`;

  // Create loader based on type
  switch (currentSettings.type) {
    case 'spinner':
      loader.classList.add('spinner');
      loader.style.width = `${currentSettings.size}px`;
      loader.style.height = `${currentSettings.size}px`;
      break;
    case 'dots':
      loader.classList.add('dots');
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.width = `${currentSettings.size / 3}px`;
        dot.style.height = `${currentSettings.size / 3}px`;
        loader.appendChild(dot);
      }
      break;
    case 'bars':
      loader.classList.add('bars');
      for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = `${currentSettings.size / 8}px`;
        bar.style.height = `${currentSettings.size}px`;
        loader.appendChild(bar);
      }
      break;
    case 'progress':
      loader.classList.add('progress');
      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
      loader.appendChild(progressBar);
      loader.style.width = `${currentSettings.size * 2}px`;
      break;
    case 'pulse':
      loader.classList.add('pulse');
      loader.style.width = `${currentSettings.size}px`;
      loader.style.height = `${currentSettings.size}px`;
      break;
    case 'flip':
      loader.classList.add('flip');
      loader.style.width = `${currentSettings.size}px`;
      loader.style.height = `${currentSettings.size}px`;
      break;
  }

  updateCode();
}

// Update generated code
function updateCode() {
  let cssCode = '';
  let htmlCode = '';

  switch (currentSettings.type) {
    case 'spinner':
      cssCode = `.loader {
  width: ${currentSettings.size}px;
  height: ${currentSettings.size}px;
  border: ${Math.max(3, currentSettings / 10)}px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${currentSettings.color};
  animation: spin ${currentSettings.speed}s linear infinite;      
}

@keyframes spin {
  to { transform: rotate(360deg);}
}`;
      htmlCode = `<div class="loader"></div>`;
      break;
    case 'dots':
      cssCode = `.loader {
  display: flex;
  gap: 10px;
}

.loader .dot {
  width: ${currentSettings.size / 3}px;
  height: ${currentSettings.size / 3}px;
  border-radius: 50%;
  background-color: ${currentSettings.color};
  animation: bounce ${currentSettings.speed * 1.4}s infinite ease-in-out;
}

.loader .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loader .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}`;
      htmlCode = `<div class="loader">
  <div class="dot"></div>      
  <div class="dot"></div>      
  <div class="dot"></div>      
</div>`;
      break;

    case 'bars':
      cssCode = `.loader {
  display: flex;
  height: ${currentSettings.size}px;
  justify-content: center;
  align-items: flex-end;        
}

.loader .bar {
  width: ${currentSettings.size / 8}px;
  height: ${currentSettings.size}px;
  background-color: ${currentSettings.color};
  margin: 0 3px;
  animation: stretch ${currentSettings.speed * 1.2}s infinite ease-in-out;
}

.loader .bar:nth-child(1) {
  animation-delay: -1.2s;
}

.loader .bar:nth-child(2) {
  animation-delay: -1.1s;
}

.loader .bar:nth-child(3) {
  animation-delay: -1s;
}

.loader .bar:nth-child(4) {
  animation-delay: -0.9s;
}

.loader .bar:nth-child(5) {
  animation-delay: -0.8s;
}

@keyframes stretch {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}`;
      htmlCode = `<div class="loader">
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
</div>`;
      break;
    case 'progress':
      cssCode = `.loader {
  width: ${currentSettings.size * 2}px;
  height: ${currentSettings.size / 5}px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;        
}

.loader .progress-bar {
  height: 100%;
  width: 0%;
  background-color: ${currentSettings.color};
  animation: progress ${currentSettings.speed * 2}s linear infinite;
}

@keyframes progress {
  0% { width: 0%; margin-left: 0; }
  50% { width: 100%; margin-left: 0; }
  100% { width: 0%; margin-left: 100%; }
}`;
      htmlCode = `<div class="loader">
  <div class="progress-bar"></div>
</div>`;
      break;
    case 'pulse':
      cssCode = `.loader {
  width: ${currentSettings.size}px;
  height: ${currentSettings.size}px;
  border-radius: 50%;
  background-color: ${currentSettings.color};
  animation: ${currentSettings.speed * 1.5}s infinite ease-out;
}

@keyframes pulse {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}`;
      htmlCode = `<div class="loader"></div>`;
      break;
    case 'flip':
      cssCode = `.loader {
  width: ${currentSettings.size}px;        
  height: ${currentSettings.size}px;        
  animation: flip ${currentSettings.speed * 2}s infinite ease;
  background-color: ${currentSettings.color};
}

@keyframes flip {
  0% { transform: perspective(200px) rotateX(0) rotateY(0); }
  50% { transform: perspective(200px) rotateX(-180deg) rotateY(0); }
  100% { transform: perspective(200px) rotateX(-180deg) rotateY(-180deg); }
}`;
      htmlCode = `<div class="loader"></div>`;
      break;
  }

  // Update code display
  document.getElementById('codeOutput').textContent =
    `<!-- HTML -->\n${htmlCode}\n\n<!-- CSS -->\n${cssCode}`;
}

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  const code = document.getElementById('codeOutput').textContent;
  navigator.clipboard.writeText(code).then(() => {
    showSuccessMessage();
  });
});

// Show success message
function showSuccessMessage() {
  successMessage.classList.add('show');
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 2000);
}

// Export options
exportCss.addEventListener('click', () => {
  const cssCode = document.getElementById('codeOutput').textContent.split('<!-- CSS -->')[1].trim();
  navigator.clipboard.writeText(cssCode).then(() => {
    showSuccessMessage();
  });
});

exportHtml.addEventListener('click', () => {
  const htmlCode = document
    .getElementById('codeOutput')
    .textContent.split('<!-- HTML -->')[1]
    .split('<!-- CSS -->')[0]
    .trim();
  navigator.clipboard.writeText(htmlCode).then(() => {
    showSuccessMessage();
  });
});

// Changing colors on input type range track
document.querySelectorAll('input[type="range"]').forEach((input) => {
  const updateTrack = () => {
    const min = Number.parseFloat(input.min) || 0;
    const max = Number.parseFloat(input.max) || 100;
    const value = Number.parseFloat(input.value);
    const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
    const val = ratio * 100;

    input.style.backgroundImage = `linear-gradient(to right, var(--success) 0%, var(--primary) ${val}%, #a0a0c0 ${val}%, #a0a0c0 100%)`;
  };
  input.addEventListener('input', updateTrack);
  updateTrack();
});

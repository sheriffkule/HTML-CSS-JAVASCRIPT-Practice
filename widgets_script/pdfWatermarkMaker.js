document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const fileInfo = document.getElementById('fileInfo');
  const generateBtn = document.getElementById('generateBtn');
  const statusMessage = document.getElementById('statusMessage');

  // Watermark options elements
  const watermarkText = document.getElementById('watermarkText');
  const textColor = document.getElementById('textColor');
  const opacity = document.getElementById('opacity');
  const opacityValue = document.getElementById('opacityValue');
  const fontSize = document.getElementById('fontSize');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const rotation = document.getElementById('rotation');
  const position = document.getElementById('position');
  const fontFamily = document.getElementById('fontFamily');
  const applyAllPages = document.getElementById('applyAllPages');
  const pageRangeGroup = document.getElementById('pageRangeGroup');
  const pageRange = document.getElementById('pageRange');

  // State variable
  let pdfFile = null;
  let pdfBytes = null;

  // Event listeners
  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('active');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('active');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('active');

    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      handleFileUpload(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFileUpload(fileInput.files[0]);
    }
  });

  opacity.addEventListener('input', () => {
    opacityValue.textContent = `${opacity.value}%`;
  });

  fontSize.addEventListener('input', () => {
    fontSizeValue.textContent = `${fontSize.value}px`;
  });

  applyAllPages.addEventListener('change', () => {
    pageRangeGroup.style.display = applyAllPages.checked ? 'none' : 'block';
  });

  generateBtn.addEventListener('click', generateWatermarkedPDF);

  // Functions
  function handleFileUpload(file) {
    if (file.type !== 'application/pdf') {
      showStatus('Please upload a PDF file', 'error');
      return;
    }

    pdfFile = file;

    // Display file info
    fileInfo.innerHTML = `
      <p><strong>File:</strong> ${file.name}</p>
      <p><strong>Size:</strong> ${formatFileSize(file.size)}</p>
    `;
    fileInfo.classList.add('active');

    // Read the file as array buffer
    const reader = new FileReader();
    reader.onload = async function (e) {
      pdfBytes = new Uint8Array(e.target.result);
      generateBtn.disabled = false;
    };
    reader.readAsArrayBuffer(file);
  }
});

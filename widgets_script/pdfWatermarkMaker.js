// Clean, single implementation for PDF watermarking
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

  // State
  let pdfFile = null;
  let pdfBytes = null;

  if (!fileInput || !generateBtn) return;

  if (dropZone) dropZone.addEventListener('click', () => fileInput.click());
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('active');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('active'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('active');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length) handleFileUpload(fileInput.files[0]);
  });

  if (opacity && opacityValue)
    opacity.addEventListener('input', () => (opacityValue.textContent = `${opacity.value}%`));
  if (fontSize && fontSizeValue)
    fontSize.addEventListener('input', () => (fontSizeValue.textContent = `${fontSize.value}px`));
  if (applyAllPages && pageRangeGroup)
    applyAllPages.addEventListener(
      'change',
      () => (pageRangeGroup.style.display = applyAllPages.checked ? 'none' : 'block'),
    );

  generateBtn.addEventListener('click', generateWatermarkedPDF);

  function handleFileUpload(file) {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showStatus('Please upload a PDF file', 'error');
      return;
    }
    pdfFile = file;
    if (fileInfo) {
      fileInfo.innerHTML = `<p><strong>File:</strong> ${file.name}</p><p><strong>Size:</strong> ${formatFileSize(file.size)}</p>`;
      fileInfo.classList.add('active');
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      pdfBytes = new Uint8Array(e.target.result);
      generateBtn.disabled = false;
    };
    reader.readAsArrayBuffer(file);
  }

  function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function hexToRgb(hex) {
    if (!hex) return { r: 0, g: 0, b: 0 };
    hex = hex.replace('#', '');
    if (hex.length === 3)
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return { r, g, b };
  }

  async function generateWatermarkedPDF() {
    if (!pdfBytes) {
      showStatus('No PDF loaded', 'error');
      return;
    }
    try {
      generateBtn.disabled = true;
      showStatus('Processing PDF...', 'success');

      const { PDFDocument, rgb } = PDFLib;
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      let pagesToWatermark = [];
      if (applyAllPages && applyAllPages.checked) {
        pagesToWatermark = pages;
      } else {
        const range = pageRange ? parsePageRange(pageRange.value, pages.length) : [];
        pagesToWatermark = range.map((i) => pages[i]).filter(Boolean);
      }

      for (const page of pagesToWatermark) {
        const { width, height } = page.getSize();
        const text = watermarkText && watermarkText.value ? watermarkText.value.toString() : 'WATERMARK';
        const color = hexToRgb(textColor ? textColor.value : '#000000');
        const alpha = opacity ? parseFloat(opacity.value) / 100 : 0.5;
        const size = fontSize ? parseInt(fontSize.value) || 24 : 24;
        const angle = rotation ? parseFloat(rotation.value) || 0 : 0;
        const pos = position ? position.value : 'center';

        let font;
        try {
          font =
            fontFamily && fontFamily.value
              ? await pdfDoc.embedFont(fontFamily.value)
              : await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        } catch (e) {
          font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        }

        const drawOptsBase = {
          size,
          color: rgb(color.r / 255, color.g / 255, color.b / 255),
          opacity: alpha,
          rotate: PDFLib.degrees(angle),
          font,
        };

        if (pos === 'center') {
          const textWidth = font.widthOfTextAtSize(text, size);
          const x = (width - textWidth) / 2;
          const y = (height - size) / 2;
          page.drawText(text, Object.assign({ x, y }, drawOptsBase));
        } else if (pos === 'tiled') {
          const textWidth = font.widthOfTextAtSize(text, size);
          const textHeight = size * 1.2;
          const spacingX = textWidth * 1.5;
          const spacingY = textHeight * 2;
          for (let x = -width; x < width * 2; x += spacingX) {
            for (let y = -height; y < height * 2; y += spacingY) {
              page.drawText(text, Object.assign({ x, y }, drawOptsBase));
            }
          }
        } else {
          let x = width / 2;
          let y = height / 2;
          switch (pos) {
            case 'top-left':
              x = width * 0.2;
              y = height * 0.8;
              break;
            case 'top-right':
              x = width * 0.8;
              y = height * 0.8;
              break;
            case 'bottom-left':
              x = width * 0.2;
              y = height * 0.2;
              break;
            case 'bottom-right':
              x = width * 0.8;
              y = height * 0.2;
              break;
          }
          page.drawText(text, Object.assign({ x, y }, drawOptsBase));
        }
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      if (typeof saveAs === 'function') {
        saveAs(blob, `watermarked_${pdfFile ? pdfFile.name : 'document.pdf'}`);
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `watermarked_${pdfFile ? pdfFile.name : 'document.pdf'}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      showStatus('Watermarked PDF generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating watermarked PDF: ', error);
      showStatus('Error generating watermarked PDF', 'error');
    } finally {
      generateBtn.disabled = false;
    }
  }

  function parsePageRange(rangeStr, maxPages) {
    if (!rangeStr || !rangeStr.trim()) return [];
    const pages = [];
    const parts = rangeStr.split(',');
    for (const part of parts) {
      const p = part.trim();
      if (!p) continue;
      if (p.includes('-')) {
        const [startRaw, endRaw] = p.split('-').map((s) => s.trim());
        const start = parseInt(startRaw, 10);
        const end = parseInt(endRaw, 10);
        if (isNaN(start)) continue;
        const safeStart = Math.max(1, Math.min(start, maxPages));
        const safeEnd = !isNaN(end) ? Math.max(1, Math.min(end, maxPages)) : safeStart;
        for (let i = safeStart; i <= safeEnd; i++) if (!pages.includes(i - 1)) pages.push(i - 1);
      } else {
        const pageNum = parseInt(p, 10);
        if (!isNaN(pageNum)) {
          const safePageNum = Math.max(1, Math.min(pageNum, maxPages));
          if (!pages.includes(safePageNum - 1)) pages.push(safePageNum - 1);
        }
      }
    }
    return pages.sort((a, b) => a - b);
  }

  function showStatus(message, type) {
    if (statusMessage) {
      statusMessage.textContent = message;
      statusMessage.className = 'status-message ' + (type || '');
    } else {
      console.log(message);
    }
  }

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const val = ((input.value - input.min) / (input.max - input.min)) * 100;
      const thumbWidth = 15; // match your thumb's actual width in px
      const width = input.offsetWidth;
      const ratio = (input.value - input.min) / (input.max - input.min);

      input.style.backgroundImage = `linear-gradient(to right,var(--primary),var(--secondary)${val}%,var(--medium-gray) ${val}%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });

    // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});

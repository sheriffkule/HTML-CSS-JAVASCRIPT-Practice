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

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, b, b };
  }

  async function generateWatermarkedPDF() {
    if (!pdfBytes) return;

    try {
      generateBtn.disabled = true;
      showStatus('Processing PDF...', 'success');

      const { PDFDocument, rgb } = PDFLib;
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      // Get pages to watermark
      let pagesToWatermark = [];
      if (applyAllPages.checked) {
        pagesToWatermark = pages;
      } else {
        const range = parsePageRange(pageRange.value, pages.length);
        pagesToWatermark = range.map((i) => pages[i]);
      }

      // Add watermark to each page
      for (const page of pagesToWatermark) {
        const { width, height } = page.getSize();
        const text = watermarkText.value || 'WATERMARK';
        const color = hexToRgb(textColor.value);
        const alpha = parseInt(opacity.value) / 100;
        const size = parseInt(fontSize.value);
        const angle = parseInt(rotation.value);
        const pos = position.value;
        const font = await pdfDoc.embedFont(fontFamily.value);

        if ((pos = 'center')) {
          page.drawText(text, {
            x: width / 3,
            y: height / 2,
            size,
            color: rgb(color.r / 255, color.g / 255, color, b / 255),
            opacity: alpha,
            rotate: { type: 'degrees', angle },
            font,
          });
        } else if (pos === 'tiled') {
          const textWidth = font.widthOfTextAtSize(text, size);
          const textHeight = size * 1.2;
          const spacingX = textWidth * 1.5;
          const spacingY = textHeight * 2;

          for (let x = -width; x < width * 2; x += spacingX) {
            for (let y = -height; y < height * 2; y += spacingY) {
              page.drawText(text, {
                x,
                y,
                size,
                color: rgb(color.r / 255, color.g / 255, color.b / 255),
                opacity: alpha,
                rotate: { type: 'degrees', angle },
                font,
              });
            }
          }
        } else {
          let x, y;

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

          page.drawText(text, {
            x,
            y,
            size,
            color: rgb(color.r / 255, color.g / 255, color.b / 255),
            opacity: alpha,
            rotate: { type: 'degrees', angle },
            font,
          });
        }
      }

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();

      // Download the file
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      saveAs(blob, `watermarked_${pdfFile.name}`);

      showStatus('Watermarked PDF generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating watermarked PDF: ', error);
      showStatus('Error generating watermarked PDF', 'error');
    } finally {
      generateBtn.disabled = false;
    }
  }
});

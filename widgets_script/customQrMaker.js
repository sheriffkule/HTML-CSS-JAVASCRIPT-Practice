document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const qrContentInput = document.getElementById('qr-content');
  const qrSizeInput = document.getElementById('qr-size');
  const sizeValue = document.getElementById('size-value');
  const qrColorInput = document.getElementById('qr-color');
  const qrBgColorInput = document.getElementById('qr-bgcolor');
  const qrErrorInput = document.getElementById('qr-error');
  const qrMarginInput = document.getElementById('qr-margin');
  const marginValue = document.getElementById('margin-value');
  const qrShapeInput = document.getElementById('qr-shape');
  const qrLogoInput = document.getElementById('qr-logo');
  const logoPreview = document.getElementById('logo-preview');
  const logoSizeInput = document.getElementById('logo-size');
  const logoSizeValue = document.getElementById('logo-size-value');
  const logoControls = document.querySelector('.logo-controls');
  const generateBtn = document.getElementById('generate-btn');
  const qrCodeContainer = document.getElementById('qr-code');
  const downloadPngBtn = document.getElementById('download-png');
  const downloadSvgBtn = document.getElementById('download-svg');
  const downloadJpgBtn = document.getElementById('download-jpg');
  const detailSize = document.getElementById('detail-size');
  const detailLength = document.getElementById('detail-length');
  const detailError = document.getElementById('detail-error');

  // QR Code instance
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: qrContentInput.value || 'https://example.com',
    margin: Number.parseInt(qrMarginInput.value, 10),
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: qrErrorInput.value,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.3,
      margin: 5,
    },
    dotsOptions: {
      color: qrColorInput.value,
      type: qrShapeInput.value,
    },
    backgroundOptions: {
      color: qrBgColorInput.value,
    },
  });

  // Initialize QR code
  qrCode.append(qrCodeContainer);

  // Event listeners
  qrSizeInput.addEventListener('input', updateSizeValue);
  qrMarginInput.addEventListener('input', updateMarginValue);
  logoSizeInput.addEventListener('input', updateLogoSizeValue);
  generateBtn.addEventListener('click', generateQRCode);
  downloadPngBtn.addEventListener('click', downloadPNG);
  downloadSvgBtn.addEventListener('click', downloadSVG);
  downloadJpgBtn.addEventListener('click', downloadJPG);
  qrLogoInput.addEventListener('change', handleLogoUpload);

  // Update functions
  function updateSizeValue() {
    sizeValue.textContent = `${qrSizeInput.value}px`;
  }

  function updateMarginValue() {
    marginValue.textContent = qrMarginInput.value;
  }

  function updateLogoSizeValue() {
    logoSizeValue.textContent = `${logoSizeInput.value}%`;
  }

  function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        logoPreview.innerHTML = '';
        logoPreview.appendChild(img);
        logoControls.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      logoPreview.innerHTML = '<span>No image selected</span>';
      logoControls.style.display = 'none';
    }
  }

  function generateQRCode() {
    const options = {
      width: Number.parseInt(qrSizeInput.value, 10),
      height: Number.parseInt(qrSizeInput.value, 10),
      data: qrContentInput.value || 'https://example.com',
      margin: Number.parseInt(qrMarginInput.value, 10),
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: qrErrorInput.value,
      },
      dotsOptions: {
        color: qrColorInput.value,
        type: qrShapeInput.value,
      },
      backgroundOptions: {
        color: qrBgColorInput.value,
      },
    };

    if (qrLogoInput.files && qrLogoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        options.image = event.target.result;
        options.imageOptions = {
          hideBackgroundDots: true,
          imageSize: Number.parseFloat(logoSizeInput.value) / 100,
          margin: 5,
        };
        qrCode.update(options);
        updateQRDetails();
      };
      reader.readAsDataURL(qrLogoInput.files[0]);
    } else {
      qrCode.update(options);
      updateQRDetails();
    }
  }

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

  // Download function
  function downloadPNG() {
    qrCode.download({
      name: 'qr-code',
      extension: 'png',
    });
  }

  function downloadSVG() {
    qrCode.download({
      name: 'qr-code',
      extension: 'svg',
    });
  }

  function downloadJPG() {
    const qrCanvas = qrCodeContainer.querySelector('canvas');
    if (!qrCanvas) {
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = qrCanvas.width;
    canvas.height = qrCanvas.height;

    ctx.fillStyle = qrBgColorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(qrCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = 'qr-code.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
  }

  // Update QR details
  function updateQRDetails() {
    detailSize.textContent = `${qrSizeInput.value} x ${qrSizeInput.value} px`;
    detailLength.textContent = `${(qrContentInput.value || '').length} characters`;

    let errorText = 'Unknown';
    switch (qrErrorInput.value) {
      case 'L':
        errorText = 'Low (7%)';
        break;
      case 'M':
        errorText = 'Medium (15%)';
        break;
      case 'Q':
        errorText = 'Quartile (25%)';
        break;
      case 'H':
        errorText = 'High (30%)';
        break;
    }
    detailError.textContent = errorText;
  }

  // Initialize values
  updateSizeValue();
  updateMarginValue();
  updateLogoSizeValue();
  updateQRDetails();
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

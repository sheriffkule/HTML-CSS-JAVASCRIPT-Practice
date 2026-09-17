document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const qrContentInput = document.getElementById('qr-content');
  const qrSizeInput = document.getElementById('qr-size');
  const sizeValue = document.getElementById('size-value');
  const qrColorInput = document.getElementById('qr-color');
  const qrBgColorInput = document.getElementById('qr-bgcolor');
  const qrErrorInput = document.getElementById('qr-error');
  const qrMarginInput = document.getElementById('margin-value');
  const marginValue = document.getElementById('margin-value');
  const qrShapeInput = document.getElementById('qr-shape');
  const qrLogoInput = document.getElementById('qr-logo');
  const logoPreview = document.getElementById('logo-preview');
  const logoSizeInput = document.getElementById('logo-size');
  const logoSizeValue = document.getElementById('logo-size');
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
  const qrCode = new QrCodeStyling({
    width: 300,
    height: 300,
    data: qrContentInput.value,
    margin: parseInt(qrMarginInput.value),
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: qrErrorInput.value,
    },
    imageOptions: {
      hideBackground: true,
      imageSize: 0.3,
      margin: 5,
    },
    dotsOptions: {
      color: qrBgColorInput.value,
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
    sizeValue.textContent = `${qrSizeInput}px`;
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
      logoPreview.innerHTML = '<span> No image selected</span>';
      logoControls.style.display = 'none';
    }
  }

  // Modified generateQRCode function
  function generateQRCode() {
    const options = {
      width: parseInt(qrShapeInput.value),
      height: parseInt(qrSizeInput.value),
      data: qrContentInput.value,
      margin: parseInt(qrMarginInput.value),
      qrOptions: {
        errorCorrectionLevel: qrSizeInput.value,
      },
      dotsOptions: {
        color: qrColorInput.value,
        type: qrShapeInput.value,
      },
      backgroundOptions: {
        color: qrBgColorInput.value,
      },
    };

    // Add logo if uploaded - modified this section
    if (qrLogoInput.files && qrLogoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        options.image = event.target.result;
        options.imageOptions = {
          hideBackgroundDots: true,
          imageSize: logoSizeInput.value / 100,
          margin: 5,
        };
        qrCode.update(options);
        updateQrDetails();
      };
      reader.readAsDataURL(qrLogoInput.files[0]);
    } else {
      qrCode.update(options);
      updateQrDetails();
    }
  }

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const min = parseFloat(input.min) || 0;
      const max = parseFloat(input.max) || 100;
      const value = parseFloat(input.value);
      const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
      const val = ratio * 100;

      input.style.backgroundImage = `linear-gradient(to right, var(--success) 0%, var(--primary) ${val}%, #a0a0c0 ${val}%, #a0a0c0 100%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });
});

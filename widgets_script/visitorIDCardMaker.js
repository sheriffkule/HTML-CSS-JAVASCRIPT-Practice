document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const card = document.getElementById('card');
  const cardTitleInput = document.getElementById('cardTitle');
  const cardTitleDisplay = document.getElementById('cardTitleDisplay');
  const nameInput = document.getElementById('name');
  const companyInput = document.getElementById('company');
  const purposeInput = document.getElementById('purpose');
  const purposeDisplay = document.getElementById('purposeDisplay');
  const contactInput = document.getElementById('contact');
  const contactDisplay = document.getElementById('contactDisplay');
  const validUntilInput = document.getElementById('validUntil');
  const validUntilDisplay = document.getElementById('validUntilDisplay');
  const photoInput = document.getElementById('photo');
  const photoPlaceholder = document.querySelector('.photo-placeholder');
  const logoInput = document.getElementById('logo');
  const logoDisplay = document.getElementById('logoDisplay');
  const additionalInfoInput = document.getElementById('additionalInfo');
  const additionalInfoDisplay = document.getElementById('additionalInfoDisplay');
  const includeQRCheckbox = document.getElementById('includeQR');
  const qrCodeDisplay = document.getElementById('qrCodeDisplay');
  const signatureDisplay = document.getElementById('signatureDisplay');
  const generateBtn = document.getElementById('generateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const saveTemplateBtn = document.getElementById('saveTemplateBtn');
  const colorOptions = document.querySelectorAll('.color-option');
  const templates = document.querySelectorAll('.template');
  const cardHeader = document.querySelector('.card-header');

  // Set default date (today + 1)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  validUntilInput.valueAsDate = tomorrow;
  updateValidUntilDisplay();

  // Event listeners
  cardTitleInput.addEventListener('input', updateCardTitle);
  nameInput.addEventListener('input', updateName);
  companyInput.addEventListener('input', updateCompany);
  purposeInput.addEventListener('input', updatePurpose);
  contactInput.addEventListener('input', updateContact);
  validUntilInput.addEventListener('change', updateValidUntilDisplay);
  photoInput.addEventListener('change', handlePhotoUpload);
  logoInput.addEventListener('change', handleLogoUpload);
  additionalInfoInput.addEventListener('input', updateAdditionalInfo);
  includeQRCheckbox.addEventListener('change', toggleQRCode);
  generateBtn.addEventListener('click', generateCard);
  resetBtn.addEventListener('click', resetForm);
  downloadBtn.addEventListener('click', downloadCard);
  saveTemplateBtn.addEventListener('click', saveTemplate);

  // Color options
  colorOptions.forEach((option) => {
    option.addEventListener('click', function () {
      document.querySelector('.color-option.selected').classList.remove('selected');
      this.classList.add('selected');
      cardHeader.style.backgroundColor = this.dataset.color;
    });
  });

  // Template selection
  templates.forEach((option) => {
    option.addEventListener('click', function () {
      document.querySelector('.template.selected').classList.remove('selected');
      this.classList.add('selected');
      applyTemplate(this.dataset.template);
    });
  });

  // Initialize with template 1
  applyTemplate('1');

  // Functions
  function updateCardTitle() {
    cardTitleDisplay.textContent = cardTitleInput.value.toUpperCase();
  }

  function updateName() {
    document.querySelector('.name').textContent = nameInput.value || 'John Doe';
  }

  function updateCompany() {
    document.querySelector('.company').textContent = companyInput.value || 'ABC Company';
  }

  function updatePurpose() {
    purposeDisplay.textContent = purposeInput.value || 'Meeting';
  }

  function updateContact() {
    contactDisplay.textContent = contactInput.value || 'Sarah Johnson';
  }

  function updateValidUntilDisplay() {
    if (validUntilInput.value) {
      const date = new Date(validUntilInput.value);
      const formattedDate = date.toLocaleDateString('en-US');
      validUntilDisplay.textContent = formattedDate;
    }
  }

  function updateAdditionalInfo() {
    additionalInfoDisplay.textContent = additionalInfoInput.value || 'Authorized personal only';
  }

  function toggleQRCode() {
    qrCodeDisplay.style.display = includeQRCheckbox.checked ? 'block' : 'none';
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        photoPlaceholder.innerHTML = `<img src="${event.target.result}" alt="Visitor Photo" />`;
      };
      reader.readAsDataURL(file);
    }
  }

  function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        logoDisplay.src = event.target.result;
        logoDisplay.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  function applyTemplate(templateNumber) {
    // Reset all styles first
    cardHeader.style.background = '';

    switch (templateNumber) {
      case '1':
        cardHeader.style.backgroundColor = '#4361ee';
        break;
      case '2':
        cardHeader.style.background = 'linear-gradient(45deg, #4361ee, #3a0ca3)';
        break;
      case '3':
        cardHeader.style.backgroundColor = '#3f37c9';
        break;
      case '4':
        cardHeader.style.background = 'linear-gradient(45deg, #4895ef, #4361ee)';
        break;
      case '5':
        cardHeader.style.backgroundColor = '#4cc9f0';
        break;
    }

    // Update selected color option to match template
    const headerColor = window.getComputedStyle(cardHeader).backgroundColor;
    colorOptions.forEach((option) => {
      option.classList.remove('selected');
      if (
        option.dataset.color === rgbToHex(headerColor) ||
        (templateNumber === '2' && option.dataset.color === '#4361ee') ||
        (templateNumber === '4' && option.dataset.color === '#4895ef')
      ) {
        option.classList.add('selected');
      }
    });
  }

  function rgbToHex(rgb) {
    // This is simplified version that works for solid colors
    if (rgb.includes('gradient')) return null;

    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return null;

    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function generateCard() {
    // Generate QR code with visitor data
    const qrData = `Visitor: ${nameInput.value || 'John Doe'} Company:
    ${companyInput.value || 'ABC Corporation'} Purpose: ${purposeInput.value || 'Meeting'} Valid Until:
    ${validUntilDisplay.textContent}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
    qrCodeDisplay.querySelector('img').src = qrCodeUrl;

    // Show signature if name is entered
    signatureDisplay.style.display = nameInput.value ? 'block' : 'none';

    // Add slight animation to show card was updated
    card.classList.add('fade-in');
    setTimeout(() => {
      card.classList.remove('fade-in');
    }, 500);
  }

  function resetForm() {
    // Reset all inputs
    cardTitleInput.value = 'VISITOR PASS';
    nameInput.value = '';
    companyInput.value = '';
    purposeInput.value = '';
    contactInput.value = '';
    validUntilInput.valueAsDate = tomorrow;
    photoInput.value = '';
    logoInput.value = '';
    additionalInfoInput.value = '';
    includeQRCheckbox.checked = true;

    // Reset preview
    updateCardTitle();
    updateName();
    updateCompany();
    updatePurpose();
    updateContact();
    updateValidUntilDisplay();
    updateAdditionalInfo();
    toggleQRCode();

    // Reset photo and logo
    photoPlaceholder.innerHTML = '<i class="fas fa-user"></i>';
    logoDisplay.src = '';
    logoDisplay.style.display = 'none';

    // Hide signature
    signatureDisplay.style.display = 'none';
  }

  function downloadCard() {
    // Use html2canvas with higher quality settins
    html2canvas(card, {
      scale: 3,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    }).then((canvas) => {
      // Create temporary link to download the image
      const link = document.createElement('a');
      link.download = `visitor-card-${nameInput.value || 'visitor'}.png`;

      // Convert canvas to blob for better quality
      canvas.toBlob(
        function (blob) {
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.click();

          // Clean up
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 100);
        },
        'image/png',
        1,
      ); // Highest quality
    });
  }

  function saveTemplate() {
    const templateData = {
      title: cardTitleInput.value,
      name: nameInput.value,
      company: companyInput.value,
      purpose: purposeInput.value,
      contact: contactInput.value,
      validUntil: validUntilInput.value,
      additionalInfo: additionalInfoInput.value,
      includeQR: window.getComputedStyle(cardHeader).backgroundColor,
      template: document.querySelector('.template.selected').dataset.template,
    };

    localStorage.setItem('visitorCardTemplate', JSON.stringify(templateData));
    alert('Template saved successfully! You can load it next time.');
  }

  // Check for saved templates on load
  function loadTemplate() {
    const savedTemplate = localStorage.getItem('visitorCardTemplate');
    if (savedTemplate) {
      const templateData = JSON.parse(savedTemplate);

      cardTitleInput.value = templateData.title;
      nameInput.value = templateData.name;
      companyInput.value = templateData.company;
      purposeInput.value = templateData.purpose;
      contactInput.value = templateData.contact;
      validUntilInput.value = templateData.validUntil;
      additionalInfoInput.value = templateData.additionalInfo;
      includeQRCheckbox.checked = templateData.includeQR;

      // Apply template design
      document.querySelector('.template.selected').classList.remove('selected');
      document.querySelector(`.template-${templateData.template}`).classList.add('selected');
      applyTemplate(templateData.template);

      // Update all displays
      updateCardTitle();
      updateName();
      updateCompany();
      updatePurpose();
      updateContact();
      updateValidUntilDisplay();
      updateAdditionalInfo();
      toggleQRCode();
    }
  }

  // Load any saved template when page loads
  loadTemplate();
});
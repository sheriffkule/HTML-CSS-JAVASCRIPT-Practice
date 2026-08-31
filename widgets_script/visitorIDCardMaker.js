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
    qrCodeDisplay.textContent = includeQRCheckbox.checked ? 'block' : 'none';
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
});

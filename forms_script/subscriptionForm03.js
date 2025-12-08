// DOM Elements
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
const progressLine = document.querySelector('.progress-line');
const nextButtons = document.querySelectorAll('.btn-next');
const prevButtons = document.querySelectorAll('.btn-prev');
const submitButton = document.getElementById('submit-form');
const restartButton = document.getElementById('restart-form');
const successScreen = document.getElementById('success-screen');
const passwordToggle = document.getElementById('password-toggle');
const passwordInput = document.getElementById('password');

// Current step tracker
let currentStep = 0;

// Update progress bar
function updateProgressBar() {
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;
  if (progressLine) progressLine.style.width = `${progressPercentage}%`;

  steps.forEach((step, index) => {
    if (index < currentStep) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (index === currentStep) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('active', 'completed');
    }
  });
}

// Show current step
function showStep(stepIndex) {
  formSteps.forEach((step, index) => {
    step.classList.toggle('active', index === stepIndex);
  });

  updateProgressBar();
}

// Form validation functions
function validateStep1() {
  let isValid = true;

  // First name validation
  const firstName = document.getElementById('first-name');
  const firstNameError = document.getElementById('first-name-error');
  if (!firstName.value.trim()) {
    firstNameError.style.display = 'block';
    isValid = false;
  } else {
    firstNameError.style.display = 'none';
  }

  // Last name validation
  const lastName = document.getElementById('last-name');
  const lastNameError = document.getElementById('last-name-error');
  if (!lastName.value.trim()) {
    lastNameError.style.display = 'block';
    isValid = false;
  } else {
    lastNameError.style.display = 'none';
  }

  // Email validation
  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailError.style.display = 'none';
  }

  // Phone validation (optional but if provided, must be valid)
  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  const cleanedPhone = phone.value ? phone.value.replace(/\D/g, '') : '';
  const phoneDigitsRegex = /^\d{7,15}$/;
  if (phone.value && !phoneDigitsRegex.test(cleanedPhone)) {
    phoneError.style.display = 'block';
    isValid = false;
  } else {
    phoneError.style.display = 'none';
  }

  return isValid;
}

function validateStep2() {
  let isValid = true;

  // Username validation
  const username = document.getElementById('username');
  const usernameError = document.getElementById('username-error');
  if (username.value.length < 3) {
    usernameError.style.display = 'block';
    isValid = false;
  } else {
    usernameError.style.display = 'none';
  }

  // Password validation
  const password = document.getElementById('password');
  const passwordError = document.getElementById('password-error');
  if (password.value.length < 8) {
    passwordError.style.display = 'block';
    isValid = false;
  } else {
    passwordError.style.display = 'none';
  }

  // Confirm password validation
  const confirmPassword = document.getElementById('confirm-password');
  const confirmPasswordError = document.getElementById('confirm-password-error');
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.style.display = 'block';
    isValid = false;
  } else {
    confirmPasswordError.style.display = 'none';
  }

  return isValid;
}

function validateStep4() {
  const terms = document.getElementById('terms');
  const termsError = document.getElementById('terms-error');

  if (!terms.checked) {
    termsError.style.display = 'block';
    return false;
  } else {
    termsError.style.display = 'none';
    return true;
  }
}

// Populate review section
function populateReview() {
  // Personal information
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  document.getElementById('review-personal').innerHTML = `
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided!'}</p>
  `;

  // account details
  const username = document.getElementById('username').value;

  document.getElementById('review-account').innerHTML = `
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Password:</strong> ********</p>
  `;

  // Preferences
  const emailNotifications = document.getElementById('email-notifications').checked;
  const smsNotifications = document.getElementById('sms-notifications').checked;
  const newsletter = document.getElementById('newsletter').checked;
  const theme = document.getElementById('theme').value;
  const language = document.getElementById('language').value;

  const languageMap = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
  };

  const themeText = theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : 'Default';
  const languageText = languageMap[language] || language || 'Unknown';

  document.getElementById('review-preferences').innerHTML = `
    <p><strong>Email Notifications:</strong> ${emailNotifications ? 'Yes' : 'No'}</p>
    <p><strong>SMS Notifications:</strong> ${smsNotifications ? 'Yes' : 'No'}</p>
    <p><strong>Newsletter:</strong> ${newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
    <p><strong>Theme:</strong> ${themeText}</p>
    <p><strong>Language:</strong> ${languageText}</p>
  `;
}

// Event listeners
nextButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Validate current step before proceeding
    let isValid = true;
    if (currentStep === 0) isValid = validateStep1();
    if (currentStep === 1) isValid = validateStep2();

    if (isValid) {
      currentStep++;
      showStep(currentStep);

      // Populate review section when moving to step 4
      if (currentStep === 3) {
        populateReview();
      }
    }
  });
});

prevButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

submitButton.addEventListener('click', () => {
  if (validateStep4()) {
    // Show the success screen
    document.querySelector('.form-container').style.display = 'none';
    successScreen.style.display = 'block';

    // Updata progress bar to show completion
    steps.forEach((step) => {
      step.classList.add('completed');
      step.classList.remove('active');
    });
    if (progressLine) progressLine.style.width = '100%';
  }
});

restartButton.addEventListener('click', () => {
  // Reset form
  document.querySelectorAll('input').forEach((input) => {
    if (input.type !== 'button' && input.type !== 'submit') {
      input.value = '';
    }
    if (input.type === 'checkbox') {
      input.checked = false;
    }
  });

  document.querySelectorAll('select').forEach((select) => {
    select.selectedIndex = 0;
  });

  // Reset to first step
  currentStep = 0;
  showStep(currentStep);

  // Show form container and hide success screen
  document.querySelector('.form-container').style.display = 'block';
  successScreen.style.display = 'none';
});

// Password visibility toggle
passwordToggle.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Toggle eye icon
  const icon = passwordToggle.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

// Initialize the form
updateProgressBar();
showStep(currentStep);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();

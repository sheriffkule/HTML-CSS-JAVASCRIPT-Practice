// DOM Elements
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
const progressLine = document.getElementById('.progress-line');
const nextButtons = document.querySelectorAll('.btn-next');
const prevButtons = document.querySelectorAll('.btn-prev');

// Current step tracker
let currentStep = 0;

// Update progress bar
function updateProgressBar() {
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;
  progressLine.style.width = `${progressPercentage}%`;

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
    step.classList.toggle('active', (index = stepIndex));
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
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (phone.value && !phoneRegex.test(phone.value.replace(/\D/g, ''))) {
    phoneError.style.display = 'block';
    isValid = false;
  } else {
    phoneError.style.display = 'none';
  }

  return isValid;
}

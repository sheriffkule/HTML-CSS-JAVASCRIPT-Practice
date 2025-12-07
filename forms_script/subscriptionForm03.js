// DOM Elements
const steps = document.querySelectorAll('.step');
const progressLine = document.getElementById('.progress-line');

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

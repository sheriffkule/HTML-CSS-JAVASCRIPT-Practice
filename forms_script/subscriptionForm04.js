const form = document.getElementById('multiStepForm');
const steps = document.querySelectorAll('.form-step');
const indicators = document.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentStep = 1;
const totalSteps = steps.length;

const updateUI = () => {
  steps.forEach((s, i) => s.classList.toggle('active', i + 1 === currentStep));

  indicators.forEach((s, i) => {
    s.classList.toggle('active', i + 1 === currentStep);
    s.classList.toggle('completed', i + 1 < currentStep);
  });

  progressBar.style.width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
  nextBtn.textContent = currentStep === totalSteps ? 'Submit' : 'Next Step';
};

const validateStep = () => {
  const fields = document.querySelectorAll(`.form-step[data-step="${currentStep}"] [required]`);
  return [...fields].every((field) => {
    const valid =
      field.type === 'radio'
        ? document.querySelector(`input[name="${field.name}"]:checked`)
        : field.value.trim();
    return !!valid;
  });
};

nextBtn.addEventListener('click', () => {
  if (!validateStep()) return;

  if (currentStep < totalSteps) {
    currentStep++;
    updateUI();
  } else {
    console.log('Form Submitted', Object.fromEntries(new FormData(form)));
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
  }
});

form.addEventListener('input', (e) => {
  e.target.style.borderColor = '#e2e8f0';
});

updateUI();

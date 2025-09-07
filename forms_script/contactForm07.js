const form = document.querySelector('form');

function validateField(field) {
  if (field.type === 'radio') {
    const isChecked = form.querySelector(`input[name="${field.name}"]:checked`);
    field = isChecked ? isChecked : field;
  }

  const errorDiv =
    field.type === 'radio'
      ? field.closest('fieldset').querySelector('.error-message')
      : field.parentElement.querySelector('.error-message');

  if (!field.validity.valid) {
    errorDiv.textContent = field.dataset.error || 'This field is required';
    errorDiv.classList.add('show');
    return false;
  } else {
    errorDiv.textContent = '';
    field.classList.remove('show');
    return true;
  }
}

form.querySelectorAll('input, textarea').forEach((input) => {
  const eventName = input.type === 'radio' ? 'change' : 'blur';
  input.addEventListener(eventName, () => validateField(input));
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  const validated = new Set();
  form.querySelectorAll('input, textarea').forEach((field) => {
    const key = field.type === 'radio' ? `radio-${field.name}` : field.id;
    if (!validated.has(key)) {
      validated.add(key);
      if (!validateField(field)) isValid = false;
    }
  });

  if (isValid) {
    alert('Form submitted successfully!')
    console.log('Form data:', new FormData(form));
  } else {
    form.querySelector(':invalid')?.focus()
  }
});

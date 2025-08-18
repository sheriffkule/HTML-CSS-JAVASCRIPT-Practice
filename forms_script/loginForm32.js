document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  let isValid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const formMessage = document.getElementById('formMessage');

  nameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  nameError.classList.remove('error');
  emailError.classList.remove('active');
  formMessage.textContent = '';
  formMessage.style.opacity = '0';

  if (name.value.trim() === '') {
    nameError.textContent = 'Name is required.';
    nameError.classList.add('active');
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = 'Invalid email format.';
    emailError.classList.add('active');
    isValid = false;
  }

  if (password.value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
    passwordError.classList.add('active');
    isValid = false;
  }

  if (isValid) {
    formMessage.textContent = 'Registration successful!';
    formMessage.style.opacity = '1';
    formMessage.classList.add('success');

    setTimeout(function () {
      document.getElementById('registrationForm').reset();
      formMessage.style.opacity = '0';
      nameError.classList.remove('active');
      emailError.classList.remove('active');
      passwordError.classList.remove('active');
    }, 3000);
  } else {
    formMessage.textContent = '';
  }
});

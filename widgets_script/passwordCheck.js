let passwordInput = document.getElementById('password');
let passwordStrengths = document.querySelectorAll('.password-strength');
let text = document.getElementById('text');
let showBtn = document.querySelector('.show');
let copyBtn = document.querySelector('.copy');

passwordInput.addEventListener('input', function (event) {
  let password = event.target.value;
  let strength = Math.min(password.length, 12);
  let degree = strength * 30;
  let gradientColor = strength <= 4 ? '#ff2c1c' : strength <= 8 ? '#ff9800' : '#12ff12';
  let strengthText =
    strength <= 4 ? 'Weak' : strength <= 8 ? 'Medium' : strength < 12 ? 'Strong' : 'Unbreakable';

  if (strength == 12) {
    text.style.textShadow = '0px 0px 20px #0f0';
    text.style.textDecoration = '2px solid underline #0f0';
    text.style.animationPlayState = 'running';
  }

  passwordStrengths.forEach((passwordStrength) => {
    passwordStrength.style.background = `conic-gradient(${gradientColor} ${degree}deg, #1115 ${degree}deg)`;
  });

  text.textContent = strengthText;
  text.style.color = gradientColor;
});

showBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password' && passwordInput.value.length > 1) {
    passwordInput.type = 'text';
    showBtn.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    showBtn.textContent = 'Show';
  }
});

copyBtn.addEventListener('click', () => {
  if (passwordInput.value.length >= 3) {
    navigator.clipboard.writeText(passwordInput.value);
    copyBtn.style.color = '#0f0';
    copyBtn.textContent = 'Copied';
    setTimeout(() => {
      copyBtn.style.color = '';
      copyBtn.textContent = 'Copy';
    }, 1000);
  } else {
    alert('Password must be at least 3 characters long');
  }
});

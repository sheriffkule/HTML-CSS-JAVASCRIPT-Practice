const labels = document.querySelectorAll('.form-control label');

labels.forEach((label) => {
  label.innerHTML = label.textContent
    .split('')
    .map((letter, idx) => `<span style="transition-delay: ${idx * 0.05}s">${letter}</span>`)
    .join('');
});

function register() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = '';
}

function login() {
  document.getElementById('loginForm').style.display = '';
  document.getElementById('registerForm').style.display = 'none';
}

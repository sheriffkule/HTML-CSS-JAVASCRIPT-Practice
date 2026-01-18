document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const forgotPasswordLink = document.getElementById('forgotPassword');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeModal = document.querySelector('.close');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const notification = document.getElementById('notification');
  const regPasswordInput = document.getElementById('regPassword');
  const strengthBar = document.querySelector('.strength-bar');

  // Event Listeners
  signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });

  signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
  });

  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordModal.style.display = 'flex';
  });

  closeModal.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
      forgotPasswordModal.style.display = 'none';
    }
  });

  // Form Submissions
  registerForm.addEventListener('submit', handleRegister);
  loginForm.addEventListener('submit', handleLogin);
  forgotPasswordForm.addEventListener('submit', handleForgotPassword);

  // Password Strength Meter
  regPasswordInput.addEventListener('input', updatePasswordStrength);

  // Check for remembered user
  checkRememberedUser();
});

// Toggle Password Visibility
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

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

// Update password strength meter
function updatePasswordStrength() {
  const password = document.getElementById('regPassword').value;
  const strengthBar = document.querySelector('.strength-bar');

  if (!password) {
    strengthBar.style.setProperty('--strength-width', '0%');
    return;
  }

  // Calculate strength
  let strength = 0;
  if (password.length > 0) strength += 1;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Update UI
  const width = (strength / 5) * 100;
  let color;

  if (strength <= 1) {
    color = '#f44336';
  } else if (strength === 2) {
    color = '#ff9800';
  } else if (strength === 3) {
    color = '#ff9800';
  } else {
    color = '#4caf50';
  }

  strengthBar.style.setProperty('--strength-width', `${width}%`);
  strengthBar.style.setProperty('--strength-color', color);
}

//Handle registration
function handleRegister(e) {
  e.preventDefault();

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  // Simple validation
  if (!name || !email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  if (password.length < 8) {
    showNotification('Password must be at least 8 characters', 'error');
    return;
  }

  // Store user in localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(u => u.email === email);
  
  if (userExists) {
    showNotification('Email already registered', 'error');
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  showNotification('Registration successful! Please sign in.', 'success');

  // Clear form and switch to login
  document.getElementById('registerForm').reset();
  document.querySelector('.container').classList.remove('right-panel-active');
  document.querySelector('.strength-bar').style.setProperty('--strength-width', '0%');
}

// Handle login
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Simple validation
  if (!email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  // In a real app, this would be verified with backend
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    showNotification('Invalid email or password', 'error');
    return;
  }

  rememberMe
    ? localStorage.setItem('rememberedUser', JSON.stringify({ email, password }))
    : localStorage.removeItem('rememberedUser');

  showNotification(`Welcome back, ${user.name || 'User'}!`, 'success');

  // In real app, it would redirect to the dashboard
  console.log('Login successful:', user);
}

// Handle forgot password
function handleForgotPassword(e) {
  e.preventDefault();

  const email = document.getElementById('resetEmail').value.trim();

  if (!email || !validateEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // In a real app, you would send a reset link to the email
  showNotification(`Password reset link sent to ${email}`, 'success');
  document.getElementById('forgotPasswordModal').style.display = 'none';
  document.getElementById('forgotPasswordForm').reset();
}

// Check for remembered user
function checkRememberedUser() {
  const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
  if (rememberedUser) {
    document.getElementById('loginEmail').value = rememberedUser.email;
    document.getElementById('loginPassword').value = rememberedUser.password;
    document.getElementById('rememberMe').checked = true;
  }
}

// Show notification
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = 'notification show ' + type;

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

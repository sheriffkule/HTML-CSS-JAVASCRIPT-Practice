// DOM Elements
const accountType = document.getElementById('accountType');
const usernamePrefix = document.getElementById('usernamePrefix');
const accountCount = document.getElementById('accountCount');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const excludeSimilar = document.getElementById('excludeSimilar');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const passwordStrength = document.getElementById('passwordStrength');
const generateBtn = document.getElementById('generateBtn');
const accountsList = document.getElementById('accountsList');
const copyBtn = document.getElementById('copyBtn');
const exportCSV = document.getElementById('exportCSV');
const clearBtn = document.getElementById('clearBtn');
const totalAccounts = document.getElementById('totalAccounts');
const adminAccounts = document.getElementById('adminAccounts');
const strongPasswords = document.getElementById('strongPasswords');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Generate accounts storage
let accounts = [];

// Initialize the app
function init() {
  updatePasswordStrength();
  updateStats();

  // Event listeners
  passwordLength.addEventListener('input', updatePasswordLength);
  generateBtn.addEventListener('click', generateAccounts);
  copyBtn.addEventListener('click', copyAccounts);
  exportCSV.addEventListener('click', exportToCSV);
  clearBtn
    .addEventListener('click', clearAccounts)

    [
      // Update password strength when options change
      (includeNumbers, includeSymbols, excludeSimilar)
    ].forEach((el) => {
      el.addEventListener('change', updatePasswordStrength);
    });
}

// Update password length display
function updatePasswordLength() {
  lengthValue.textContent = passwordLength.value;
  updatePasswordStrength();
}

// Update password strength indicator
function updatePasswordStrength() {
  const length = parseInt(passwordLength.value);
  let strength = 0;

  // Length contributes to strength
  strength += Math.min((length / 20) * 40, 40);

  // Character variety contributes to strength
  if (includeNumbers.checked) strength += 20;
  if (includeSymbols.checked) strength += 30;
  if (excludeSimilar.checked) strength += 10;

  // Update strength meter
  passwordStrength.className = 'strength-meter';

  if (strength < 30) {
    passwordStrength.classList.add('strength-weak');
  } else if (strength < 60) {
    passwordStrength.classList.add('strength-medium');
  } else if (strength < 80) {
    passwordStrength.classList.add('strength-strong');
  } else {
    passwordStrength.classList.add('strength-very-strong');
  }
}

// Generate random accounts
function generateAccounts() {
  const count = parseInt(accountCount.value);
  const prefix = usernamePrefix.value || 'user';
  const type = accountType.value;

  // Clear previous accounts if generating new ones
  if (accounts.length > 0 && !confirm('This will replace all existing accounts. Continue?')) {
    return;
  }

  accounts = [];

  for (let i = 1; i <= count; i++) {
    const username = `${prefix}${i}`;
    const password = generatePassword();

    accounts.push({
      username,
      password,
      type,
      id: Date.now() + i,
    });
  }

  displayAccounts();
  updateStats();
  showNotification(`${count} accounts generated successfully!`, 'success');
}

// Generate random password
function generatePassword() {
  const length = parseInt(passwordLength.value);
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let charset = lowercase + uppercase;

  if (includeNumbers.checked) charset += numbers;
  if (includeSymbols.checked) charset += numbers;
  if (excludeSimilar.checked) {
    charset = charset.replace(/[il1LoO0]/g, '');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Display accounts in the list
function displayAccounts() {
  if (accounts.length === 0) {
    accountsList.innerHTML = `
      <div class="empty-state">
        <p>No accounts generated yet. Click the generate button to create accounts.</p>
      </div>
    `;
    return;
  }

  accountsList.innerHTML = '';

  accounts.forEach((account) => {
    const accountElement = document.createElement('div');
    accountElement.className = 'account-item';
    accountElement.innerHTML = `
      <div class="account-info">
        <div class="account-username">
          ${account.username} <span class="account-type">(${account.type})</span>
        </div>
        <div class="account-password">${account.password}</div>
      </div>
      <div class="account-actions">
        <button class="action-btn copy-password" data-id="${account.id}" title="Copy Password">
          <i class="fas fa-copy"></i>
        </button>
        <button class="action-btn regenerate-password" data-id="${account.id}" title="Regenerate Password">
          <i class="fas fa-sync-alt"></i>
        </button>
        <button class="action-btn delete-account" data-id="${account.id}" title="Delete Account">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    accountsList.appendChild(accountElement);
  });

  // Add event listeners for account actions
  document.querySelectorAll('.copy-password').forEach((btn) => {
    btn.addEventListener('click', copyPassword);
  });

  document.querySelectorAll('.regenerate-password').forEach((btn) => {
    btn.addEventListener('click', regeneratePassword);
  });

  document.querySelectorAll('.delete-account').forEach((btn) => {
    btn.addEventListener('click', deleteAccount);
  });
}

// Copy a specific password
function copyPassword(e) {
  const id = parseInt(e.currentTarget.getAttribute('data-id'));
  const account = accounts.find((acc) => acc.id === id);

  if (account) {
    navigator.clipboard
      .writeText(account.password)
      .then(() => {
        showNotification('Password copied to clipboard!', 'success');
      })
      .catch((err) => {
        console.error('Failed to copy password: ', err);
        showNotification('Failed to cpy password!', 'error');
      });
  }
}

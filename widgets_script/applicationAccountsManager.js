const STORAGE_KEY = 'accounts';
const LEGACY_STORAGE_KEY = 'Accounts';

// DOM Elements
const accountForm = document.getElementById('accountForm');
const softwareInput = document.getElementById('software');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const accountList = document.getElementById('accounts');

function getStoredAccounts() {
  try {
    const storedAccounts = localStorage.getItem(STORAGE_KEY);

    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts);
      return Array.isArray(parsedAccounts) ? parsedAccounts : [];
    }

    const legacyAccounts = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyAccounts) {
      const parsedLegacyAccounts = JSON.parse(legacyAccounts);
      if (Array.isArray(parsedLegacyAccounts)) {
        saveStoredAccounts(parsedLegacyAccounts);
        return parsedLegacyAccounts;
      }
    }
  } catch (error) {
    console.warn('Unable to read accounts from storage:', error);
  }

  return [];
}

function saveStoredAccounts(accounts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

function initializeApp() {
  if (!accountForm || !accountList) {
    return;
  }

  accountForm.addEventListener('submit', handleAccountSubmit);
  loadAccounts();
}

// Load saved accounts on page load
document.addEventListener('DOMContentLoaded', initializeApp);

function handleAccountSubmit(e) {
  e.preventDefault();

  if (!softwareInput || !usernameInput || !passwordInput) {
    return;
  }

  const software = softwareInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (software && username && password) {
    saveAccount(software, username, password);
    accountForm.reset();
    loadAccounts();
  } else {
    alert('Please fill in all fields.');
  }
}

// Save account to localStorage
function saveAccount(software, username, password) {
  const account = { software, username, password };
  const accounts = getStoredAccounts();
  accounts.push(account);
  saveStoredAccounts(accounts);
}

// Load accounts from localStorage
function loadAccounts() {
  if (!accountList) {
    return;
  }

  const accounts = getStoredAccounts();
  accountList.innerHTML = '';

  if (!accounts.length) {
    const emptyState = document.createElement('li');
    emptyState.textContent = 'No accounts saved yet.';
    accountList.appendChild(emptyState);
    return;
  }

  accounts.forEach((account, index) => {
    const li = document.createElement('li');

    const details = document.createElement('div');

    const softwareName = document.createElement('strong');
    softwareName.textContent = account.software;
    details.appendChild(softwareName);
    details.appendChild(document.createElement('br'));

    const usernameText = document.createElement('span');
    usernameText.textContent = account.username;
    details.appendChild(usernameText);
    details.appendChild(document.createElement('br'));

    const passwordText = document.createElement('span');
    passwordText.className = 'password-text';
    passwordText.dataset.index = index;
    passwordText.textContent = '********';
    details.appendChild(passwordText);

    const toggleButton = document.createElement('span');
    toggleButton.className = 'toggle-password';
    toggleButton.setAttribute('role', 'button');
    toggleButton.setAttribute('tabindex', '0');
    toggleButton.onclick = () => toggleSavedPasswordVisibility(index);
    toggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    details.appendChild(toggleButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteAccount(index);

    li.appendChild(details);
    li.appendChild(deleteButton);
    accountList.appendChild(li);
  });
}

// Delete account
function deleteAccount(index) {
  const accounts = getStoredAccounts();

  if (index < 0 || index >= accounts.length) {
    return;
  }

  accounts.splice(index, 1);
  saveStoredAccounts(accounts);
  loadAccounts();
}

// Toggle password visibility for input field
function togglePasswordVisibility(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) {
    return;
  }

  field.type = field.type === 'password' ? 'text' : 'password';
}

// Toggle password visibility for saved accounts
function toggleSavedPasswordVisibility(index) {
  const passwordText = document.querySelector(`.password-text[data-index="${index}"]`);
  if (!passwordText) {
    return;
  }

  const accounts = getStoredAccounts();
  const account = accounts[index];

  if (!account) {
    return;
  }

  passwordText.textContent = passwordText.textContent === '********' ? account.password : '********';
}

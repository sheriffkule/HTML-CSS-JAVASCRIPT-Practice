// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const apiKeyForm = document.getElementById('apiKeyForm');
const keysList = document.getElementById('keysList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const editModal = document.getElementById('editModal');
const closeEditModal = document.getElementById('closeEditModal');
const editKeyForm = document.getElementById('editKeyForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importModal = document.getElementById('importModal');
const closeImportModal = document.getElementById('closeImportModal');
const cancelImport = document.getElementById('cancelImport');
const confirmImport = document.getElementById('confirmImport');
const importData = document.getElementById('importData');
const apiKeyInput = document.getElementById('apiKey');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthLabel = document.getElementById('strengthLabel');

// Statistics elements
const totalKeysEl = document.getElementById('totalKeys');
const strongKeysEl = document.getElementById('strongKeys');
const categoriesCountEl = document.getElementById('categoriesCount');
const recentKeysEl = document.getElementById('recentKeys');

// tags
const tagsContainer = document.getElementById('tagsContainer');
let selectedTags = [];

// Initialize API keys from localStorage or empty array
let apiKeys = [];
try {
  apiKeys = JSON.parse(localStorage.getItem('apiKeys')) || [];
} catch (error) {
  console.warn('Invalid saved API keys, clearing corrupted localStorage entry.', error);
  localStorage.removeItem('apiKeys');
}

// Theme handling
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-theme', currentTheme === 'dark');
themeToggle.innerHTML =
  currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Event Listeners
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// API Key strength checker
apiKeyInput.addEventListener('input', function () {
  const key = this.value;
  let strength = 0;
  let label = 'None';
  let className = '';

  if (key.length > 0) {
    strength = 1;
    label = 'Weak';
    className = 'strength-weak';

    // Check for different character types
    const hasLower = /[a-z]/.test(key);
    const hasUpper = /[A-Z]/.test(key);
    const hasNumber = /\d/.test(key);
    const hasSpecial = /[^a-zA-Z\d]/.test(key);

    let criteriaMet = 0;
    if (hasLower) criteriaMet++;
    if (hasUpper) criteriaMet++;
    if (hasNumber) criteriaMet++;
    if (hasSpecial) criteriaMet++;

    if (key.length >= 8 && criteriaMet >= 2) {
      strength = 2;
      label = 'Fair';
      className = 'strength-fair';
    }

    if (key.length >= 12 && criteriaMet >= 3) {
      strength = 3;
      label = 'Good';
      className = 'strength-good';
    }

    if (key.length >= 16 && criteriaMet === 4) {
      strength = 4;
      label = 'Strong';
      className = 'strength-strong';
    }
  }

  strengthIndicator.className = `strength-indicator ${className}`;
  strengthLabel.textContent = `Strength: ${label}`;
});

// Tag selection
tagsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('tag')) {
    const tag = e.target.getAttribute('data-tag');
    const index = selectedTags.indexOf(tag);

    if (index > -1) {
      selectedTags.splice(index, 1);
      e.target.classList.remove('selected');
    } else {
      selectedTags.push(tag);
      e.target.classList.add('selected');
    }
  }
});

// Form submission for adding new API key
apiKeyForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const keyName = document.getElementById('keyName').value;
  const apiKey = document.getElementById('apiKey').value;
  const keyCategory = document.getElementById('keyCategory').value;
  const keyNotes = document.getElementById('keyNotes').value;

  const newKey = {
    id: Date.now().toString(),
    name: keyName,
    key: apiKey,
    category: keyCategory,
    tags: [...selectedTags],
    notes: keyNotes,
    created: new Date().toISOString(),
    lastUsed: null,
    strength: getKeyStrength(apiKey),
  };

  apiKeys.push(newKey);
  saveToLocalStorage();
  renderKeys();
  updateStats();

  // Reset form
  apiKeyForm.reset();
  selectedTags.forEach((tag) => {
    const tagEl = document.querySelector(`.tag[data-tag="${tag}"]`);
    if (tagEl) tagEl.classList.remove('selected');
  });
  selectedTags = [];
  strengthIndicator.className = 'strength-indicator';
  strengthLabel.textContent = 'Strength: None';

  showToast('API Key saved successfully!', 'success');
});

// Render API keys to the UI
function renderKeys(filteredKeys = null) {
  const keysToRender = filteredKeys || apiKeys;

  if (keysToRender.length === 0) {
    keysList.innerHTML = `
      <div class="no-keys">
        <i class="fas fa-key"></i>
        <h3>No API Keys Found</h3>
        <p>
          ${
            filteredKeys
              ? 'Try adjusting your search/filter'
              : 'Add your first API key using the form on the left.'
          }
        </p>
      </div>
    `;
    return;
  }

  keysList.innerHTML = keysToRender
    .map(
      (key) => `
      <div class="key-item" data-id="${key.id}">
        <div class="key-item-header">
          <div>
            <span class="key-item-name">${escapeHtml(key.name)}</span>
            <span class="key-item-category">${getCategoryLabel(key.category)}</span>
          </div>
          <div class="key-item-actions">
            <button class="action-btn view-btn" title="View / Hide Key">
              <i class="fas fa-eyes"></i>
            </button>
            <button class="action-btn copy-btn" title="Copy to Clipboard">
              <i class="fas fa-copy"></i>
            </button>
            <button class="action-btn edit-btn" title="Edit Key">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" title="Delete Key">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="key-item-details">
          <div class="key-value-container">
            <div class="key-value key-masked" id="key-value-${key.id}">${'∙'.repeat(
              key.key.length > 30 ? 30 : key.key.length,
            )}</div>
            <button
              class="btn btn-primary"
              style="margin-left: 10px;"
              data-id="${key.id}"
              data-action="reveal">
              Reveal
            </button>
          </div>

          ${
            key.tags && key.tags.length > 0
              ? `
                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px">
                  ${key.tags
                    .map((tag) => `<span class="tag-badge">Category: ${escapeHtml(tag)}</span>`)
                    .join('')}
                </div>
              `
              : ''
          }
          ${key.notes ? `<p style="margin-top: 10px; font-size: 14px;">Note: ${escapeHtml(key.notes)}</p>` : ''}
        </div>

        <div class="key-item-footer">
          <div>
            <i class="fas fa-calendar-alt"></i> Created: ${formatDate(key.created)}
            ${key.lastUsed ? ` | <i class="fas fa-history"></i> Last used: ${formatDate(key.lastUsed)}` : ''}
          </div>
          <div><i class="fas fa-shield-alt"></i> ${key.strength}</div>
        </div>
      </div>
    `,
    )
    .join('');

  // Add event listeners to key items
  document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const keyItem = this.closest('.key-item');
      const keyId = keyItem.getAttribute('data-id');
      toggleKeyVisibility(keyId);
    });
  });

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const keyItem = this.closest('.key-item');
      const keyId = keyItem.getAttribute('data-id');
      copyToClipboard(keyId);
    });
  });

  document.querySelectorAll('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const keyItem = this.closest('.key-item');
      const keyId = keyItem.getAttribute('data-id');
      openEditModal(keyId);
    });
  });

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const keyItem = this.closest('.key-item');
      const keyId = keyItem.getAttribute('data-id');
      deleteKey(keyId);
    });
  });

  document.querySelectorAll('[data-action="reveal"]').forEach((btn) => {
    btn.addEventListener('click', function () {
      const keyId = this.getAttribute('data-id');
      toggleKeyReveal(keyId, this);
    });
  });
}

function setKeyRevealState(keyId, revealed, button = null) {
  const keyElement = document.getElementById(`key-value-${keyId}`);
  const keyObj = apiKeys.find((k) => k.id === keyId);
  if (!keyElement || !keyObj) return;

  keyElement.textContent = revealed
    ? keyObj.key
    : '∙'.repeat(keyObj.key.length > 30 ? 30 : keyObj.key.length);
  keyElement.classList.toggle('key-masked', !revealed);
  keyElement.classList.toggle('key-revealed', revealed);

  if (button) {
    button.textContent = revealed ? 'Hide' : 'Reveal';
  } else {
    const keyItem = keyElement.closest('.key-item');
    const revealBtn = keyItem?.querySelector('[data-action="reveal"]');
    if (revealBtn) {
      revealBtn.textContent = revealed ? 'Hide' : 'Reveal';
    }
  }
}

// Toggle key visibility (mask/unmask)
function toggleKeyVisibility(keyId) {
  const keyElement = document.getElementById(`key-value-${keyId}`);
  if (!keyElement) return;

  const revealed = keyElement.classList.contains('key-masked');
  setKeyRevealState(keyId, revealed);

  if (revealed) {
    const keyIndex = apiKeys.findIndex((k) => k.id === keyId);
    if (keyIndex !== -1) {
      apiKeys[keyIndex].lastUsed = new Date().toISOString();
      saveToLocalStorage();
      updateStats();
    }
  }
}

// Toggle key reveal with button text change
function toggleKeyReveal(keyId, button) {
  const keyElement = document.getElementById(`key-value-${keyId}`);
  if (!keyElement) return;

  const revealed = keyElement.classList.contains('key-masked');
  setKeyRevealState(keyId, revealed, button);

  if (revealed) {
    const keyIndex = apiKeys.findIndex((k) => k.id === keyId);
    if (keyIndex !== -1) {
      apiKeys[keyIndex].lastUsed = new Date().toISOString();
      saveToLocalStorage();
      updateStats();
    }
  }
}

// Copy key to clipboard
function copyToClipboard(keyId) {
  const keyObj = apiKeys.find((k) => k.id === keyId);
  if (!keyObj) {
    showToast('API Key not found', 'danger');
    return;
  }

  navigator.clipboard
    .writeText(keyObj.key)
    .then(() => {
      showToast('API Key copied to clipboard!', 'success');

      // Update last used timestamp
      const keyIndex = apiKeys.findIndex((k) => k.id === keyId);
      if (keyIndex !== -1) {
        apiKeys[keyIndex].lastUsed = new Date().toISOString();
        saveToLocalStorage();
        updateStats();
      }
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
      showToast('Failed to copy key to clipboard', 'danger');
    });
}

// Open edit modal
function openEditModal(keyId) {
  const keyObj = apiKeys.find((k) => k.id === keyId);
  if (!keyObj) return;

  document.getElementById('editKeyName').value = keyObj.name;
  document.getElementById('editApiKey').value = keyObj.key;
  document.getElementById('editKeyCategory').value = keyObj.category;
  document.getElementById('editKeyNotes').value = keyObj.notes || '';
  document.getElementById('editKeyId').value = keyObj.id;

  editModal.classList.add('active');
}

// Close edit modal
closeEditModal.addEventListener('click', () => {
  editModal.classList.remove('active');
});

// Edit form submission
editKeyForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const keyId = document.getElementById('editKeyId').value;
  const keyName = document.getElementById('editKeyName').value;
  const apiKey = document.getElementById('editApiKey').value;
  const keyCategory = document.getElementById('editKeyCategory').value;
  const keyNotes = document.getElementById('editKeyNotes').value;

  const keyIndex = apiKeys.findIndex((k) => k.id === keyId);
  if (keyIndex !== -1) {
    apiKeys[keyIndex].name = keyName;
    apiKeys[keyIndex].key = apiKey;
    apiKeys[keyIndex].category = keyCategory;
    apiKeys[keyIndex].notes = keyNotes;
    apiKeys[keyIndex].strength = getKeyStrength(apiKey);

    saveToLocalStorage();
    renderKeys();
    updateStats();
    editModal.classList.remove('active');

    showToast('API Key updated successfully!', 'success');
  }
});

// Delete key
function deleteKey(keyId) {
  if (confirm('Are you sure you want to delete this API key? This action cannot be undone')) {
    apiKeys = apiKeys.filter((k) => k.id !== keyId);
    saveToLocalStorage();
    renderKeys();
    updateStats();

    showToast('API Key deleted successfully!', 'success');
  }
}

// Search and filter functionality
searchInput.addEventListener('input', filterKeys);
categoryFilter.addEventListener('change', filterKeys);

function filterKeys() {
  const searchTerm = searchInput.value.toLowerCase();
  const categoryFilterValue = categoryFilter.value;

  let filteredKeys = apiKeys;

  // Apply category filter
  if (categoryFilterValue !== 'all') {
    filteredKeys = filteredKeys.filter((key) => key.category === categoryFilterValue);
  }

  // Apply search filter
  if (searchTerm) {
    filteredKeys = filteredKeys.filter(
      (key) =>
        key.name.toLowerCase().includes(searchTerm) ||
        (key.notes && key.notes.toLowerCase().includes(searchTerm)) ||
        key.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );
  }

  renderKeys(filteredKeys);
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
}

// Update statistics
function updateStats() {
  totalKeysEl.textContent = apiKeys.length;

  // Count strong keys (length >= 16 with mixed characters
  const strongKeysCount = apiKeys.filter((key) => key.strength === 'Strong').length;
  strongKeysEl.textContent = strongKeysCount;

  // Count unique categories
  const uniqueCategories = [...new Set(apiKeys.map((key) => key.category))];
  categoriesCountEl.textContent = uniqueCategories.length;

  // Count keys created in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentKeysCount = apiKeys.filter((key) => new Date(key.created) >= sevenDaysAgo).length;
  recentKeysEl.textContent = recentKeysCount;
}

// Show toast notification
function showToast(message, type = 'success') {
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.className = `toast toast-${type}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Export functionality
exportBtn.addEventListener('click', () => {
  const dataStr = JSON.stringify(apiKeys, null, 2);
  const dataUrl = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = 'api-keys-export.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUrl);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();

  showToast('API Keys exported successfully!', 'success');
});

// Import functionality
importBtn.addEventListener('click', () => {
  importModal.classList.add('active');
});

closeImportModal.addEventListener('click', () => {
  importModal.classList.remove('active');
  importData.value = '';
});

cancelImport.addEventListener('click', () => {
  importModal.classList.remove('active');
  importData.value = '';
});

confirmImport.addEventListener('click', () => {
  try {
    const importedData = JSON.parse(importData.value);

    if (!Array.isArray(importedData)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    // Merge with existing keys (avoid duplicates by ID)
    const existingIds = apiKeys.map((key) => key.id);
    const newKeys = importedData.filter((key) => !existingIds.includes(key.id));

    apiKeys = [...apiKeys, ...newKeys];
    saveToLocalStorage();
    renderKeys();
    updateStats();

    importModal.classList.remove('active');
    importData.value = '';

    showToast(`${newKeys.length} new API keys imported successfully!`, 'success');
  } catch (error) {
    alert('Error importing data: ' + error.message);
  }
});

// Helper function
function getCategoryLabel(category) {
  const labels = {
    payment: 'Payment',
    cloud: 'Cloud',
    social: 'Social Media',
    database: 'Database',
    analytics: 'Analytics',
    other: 'Other',
  };
  return labels[category] || 'Other';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getKeyStrength(key) {
  if (key.length < 8) return 'Weak';

  const hasLower = /[a-z]/.test(key);
  const hasUpper = /[A-Z]/.test(key);
  const hasNumber = /\d/.test(key);
  const hasSpecial = /[^a-zA-Z\d]/.test(key);

  let criteriaMet = 0;
  if (hasLower) criteriaMet++;
  if (hasUpper) criteriaMet++;
  if (hasNumber) criteriaMet++;
  if (hasSpecial) criteriaMet++;

  if (key.length >= 16 && criteriaMet >= 4) return 'Strong';
  if (key.length >= 12 && criteriaMet >= 3) return 'Good';
  if (key.length >= 18 && criteriaMet >= 2) return 'Fair';

  return 'Weak';
}

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }
  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.textContent = currentYear.toString();
}
updateYear();

// Initialize the app
function init() {
  renderKeys();
  updateStats();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

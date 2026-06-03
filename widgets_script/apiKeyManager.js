// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const apiKeyForm = document.getElementById('apiKeyForm');
const keyList = document.getElementById('keyList');
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
let apiKeys = JSON.parse(localStorage.getItem('apiKeys')) || [];

// Theme handling
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark', currentTheme === 'dark');
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
      selectedTags.push(tag);
      e.target.classList.add('selected');
    } else {
      selectedTags.splice(index, 1);
      e.target.classList.remove('selected');
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

  apiKey.push(newKey);
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
    keyList.innerHTML = `
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

  keyList.innerHTML = keysToRender.map(
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
            <div
              class="key-value key-masked"
              id="key-value-${key.id}"
              ${'∙'.repeat(key.key.length > 30 ? 30 : key.key.length)}></div>
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
                  ${key.tags.map((tag) => `<span class="${tag}"></span>`).join('')}
                </div>
              `
              : ''
          }
          ${key.notes ? `<p style="margin-top: 10px; font-size: 14px;">${escapeHtml(key.notes)}</p>` : ''}
        </div>

        <div class="key-item-footer">
          <div>
            <i class="fas fa-calendar-alt"></i> Created: ${formatDate(key.created)}
            ${
              key.lastUsed
                ? ` | <i className="fas fa-history"></i> Last used: ${formatDate(key.lastUsed)}`
                : ''
            }
          </div>
          <div><i class="fas fa-shield-alt"></i> ${key.strength}</div>
        </div>
      </div>
    `,
  );
}

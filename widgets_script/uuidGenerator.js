document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const clearBtn = document.getElementById('clearBtn');
  const uuidDisplay = document.getElementById('uuidDisplay');
  const uuidInfo = document.getElementById('uuidInfo');
  const historyList = document.getElementById('historyList');
  const historyCount = document.getElementById('historyCount');
  const toast = document.getElementById('toast');
  const uppercaseToggle = document.getElementById('uppercase');
  const hyphensToggle = document.getElementById('hyphens');
  const bracesToggle = document.getElementById('braces');

  if (!generateBtn || !copyBtn || !clearBtn || !uuidDisplay || !uuidInfo || !historyList || !historyCount || !toast) {
    console.error('UUID generator page is missing required elements.');
    return;
  }

  let history = [];

  try {
    history = JSON.parse(localStorage.getItem('uuidHistory')) || [];
  } catch (error) {
    console.error('Unable to load UUID history:', error);
  }

  updateHistoryDisplay();

  // Generate a UUID based on selected options
  generateBtn.addEventListener('click', generateUUID);

  // Copy the current UUID to clipboard
  copyBtn.addEventListener('click', copyToClipboard);

  // Clear history
  clearBtn.addEventListener('click', clearHistory);

  function generateUUID() {
    const selectedVersion = document.querySelector('input[name="version"]:checked');
    const version = selectedVersion?.value || 'v4';
    const uppercase = uppercaseToggle?.checked || false;
    const hyphens = hyphensToggle?.checked ?? true;
    const braces = bracesToggle?.checked || false;

    let uuid;

    uuid = version === 'v4' ? generateV4UUID() : generateV1UUID();

    // Apply formatting options
    if (!hyphens) uuid = uuid.replace(/-/g, '');
    if (uppercase) uuid = uuid.toUpperCase();
    if (braces) uuid = `{${uuid}}`;

    // Display the UUID
    uuidDisplay.textContent = uuid;

    // Show info about the UUID
    const infoParts = [];
    infoParts.push(`Version: ${version}`);
    infoParts.push(`${hyphens ? 'With' : 'Without'} hyphens`);
    infoParts.push(`${uppercase ? 'Uppercase' : 'Lowercase'}`);
    uuidInfo.textContent = infoParts.join(' ● ');

    // Ad to history
    addToHistory(uuid, version);
  }

  function generateV4UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function generateV1UUID() {
    const timestamp = Date.now();
    const timeLow = (timestamp >>> 0).toString(16).padStart(8, '0');
    const timeMid = ((timestamp >>> 32) & 0xffff).toString(16).padStart(4, '0');
    const timeHigh = (((timestamp >>> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0');
    const clockSequence = (((Math.random() * 0x4000) | 0) | 0x8000).toString(16).padStart(4, '0');
    const node = (((Math.random() * 0x1000000000000) | 0) & 0xffffffffffff).toString(16).padStart(12, '0');

    return `${timeLow}-${timeMid}-${timeHigh}-${clockSequence}-${node}`;
  }

  function addToHistory(uuid, version) {
    history.unshift({ uuid, version, timestamp: new Date().toISOString() });

    // Keep only the last 10 items
    if (history.length > 10) history.pop();

    // Save to localStorage
    localStorage.setItem('uuidHistory', JSON.stringify(history));

    updateHistoryDisplay();
  }

  function updateHistoryDisplay() {
    historyList.innerHTML = '';
    historyCount.textContent = `(${history.length} items)`;

    if (history.length === 0) {
      historyList.innerHTML = '<div class="history-list">No history yet.</div>';
      return;
    }

    history.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      const uuidText = document.createElement('span');
      uuidText.textContent = item.uuid;

      const actions = document.createElement('div');
      actions.className = 'history-item';

      const copyButton = document.createElement('button');
      copyButton.className = 'btn-copy';
      copyButton.innerHTML = '<i class="fas fa-copy"></i>';
      copyButton.title = 'Copy This UUID';
      copyButton.addEventListener('click', () => {
        copyToClipboardText(item.uuid);
      });

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn-clear';
      deleteButton.innerHTML = '<i class="fas fa-times"></i>';
      deleteButton.title = 'Remove from history';
      deleteButton.addEventListener('click', () => {
        history.splice(index, 1);
        localStorage.setItem('uuidHistory', JSON.stringify(history));
        updateHistoryDisplay();
      });

      actions.appendChild(copyButton);
      actions.appendChild(deleteButton);

      historyItem.appendChild(uuidText);
      historyItem.appendChild(actions);

      historyList.appendChild(historyItem);
    });
  }

  function copyToClipboard() {
    const text = uuidDisplay.textContent;
    copyToClipboardText(text);
  }

  function copyToClipboardText(text) {
    if (!text || text === 'Click "Generate UUID" to create your first UUID') return;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast();
      }).catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
      });
      return;
    }

    showToast();
  }

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  function clearHistory() {
    history = [];
    localStorage.removeItem('uuidHistory');
    updateHistoryDisplay();
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
});

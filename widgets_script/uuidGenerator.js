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

  let history = JSON.parse(localStorage.getItem('uuidHistory')) || [];
  updateHistoryDisplay();

  // Generate a UUID based on selected options
  generateBtn.addEventListener('click', generateUUID);

  // Copy the current UUID to clipboard
  copyBtn.addEventListener('click', copyToClipboard);

  // Clear history
  clearBtn.addEventListener('click', clearHistory);

  function generateUUID() {
    const version = document.querySelector('input[name="version"]:checked').value;
    const uppercase = document.getElementById('uppercase').checked;
    const hyphens = document.getElementById('hyphens').checked;
    const braces = document.getElementById('braces').checked;

    let uuid;

    uuid = version === 'v4' ? generateV4UUID() : generateV1UUID;

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
    const time = Date.now();
    const timeHex = time.toString(16).padStart(12, '0');
    return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-1${timeHex.slice(12, 15)}-${(
      (Math.random() * 0x10000) |
      0
    )
      .toString(16)
      .padStart(4, '0')}-${((Math.random() * 0x1000000000000) | 0).toString(16).padStart(12, '0')}`.slice(
      0,
      36,
    );
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
      historyList.innerHTML = '<div class="history-item">No history yet.</div>';
      return;
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const inputText = document.getElementById('inputText');
  const generateBtn = document.getElementById('generateBtn');
  const clearBtn = document.getElementById('clearBtn');
  const sampleBtn = document.getElementById('sampleBtn');
  const hashResults = document.getElementById('hashResults');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const historyList = document.getElementById('historyList');
  const notification = document.getElementById('notification');
  const tabs = document.querySelectorAll('.tab');
  const tabContent = document.querySelectorAll('.tab-content');

  // Hash algorithms configuration
  const hashAlgorithms = [
    { id: 'md5', name: 'MD5', color: '#4361ee' },
    { id: 'sha1', name: 'SHA-1', color: '#7209b7' },
    { id: 'sha256', name: 'SHA-256', color: '#4cc9f0' },
    { id: 'sha512', name: 'SHA-512', color: '#f72585' },
    { id: 'sha3', name: 'SHA-3', color: '#ff9e00' },
    { id: 'ripemd160', name: 'RIPEMD-160', color: '#06d6a0' },
  ];

  // Load history from localStorage
  let history = JSON.parse(localStorage.getItem('hashHistory')) || [];
  if (historyList) renderHistory();

  // Event Listeners
  if (generateBtn) generateBtn.addEventListener('click', generateHashes);
  if (clearBtn) clearBtn.addEventListener('click', clearInput);
  if (sampleBtn) sampleBtn.addEventListener('click', loadSampleText);
  if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearHistory);

  // Tab functionality
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Show active tab content
      tabContent.forEach((content) => {
        content.classList.remove('active');
        if (content.id === `${tabId}-tab`) {
          content.classList.add('active');
        }
      });
    });
  });

  // Generate hashes function
  function generateHashes() {
    const text = inputText.value.trim();

    if (!text) {
      showNotification('Please enter some text to hash', 'error');
      return;
    }

    // Check if at least one algorithm is selected
    const selectedAlgorithms = hashAlgorithms.filter((algo) => {
      const checkbox = document.getElementById(algo.id);
      // Support native checkbox inputs and elements using aria-checked
      return checkbox && (checkbox.checked === true || checkbox.getAttribute('aria-checked') === 'true');
    });

    if (selectedAlgorithms.length === 0) {
      showNotification('Please select at least one hash algorithm', 'error');
      return;
    }

    // Clear previous results
    hashResults.innerHTML = '';

    // Generate hashes for selected algorithms
    selectedAlgorithms.forEach((algo) => {
      let hashValue;

      switch (algo.id) {
        case 'md5':
          hashValue = CryptoJS.MD5(text).toString();
          break;
        case 'sha1':
          hashValue = CryptoJS.SHA1(text).toString();
          break;
        case 'sha256':
          hashValue = CryptoJS.SHA256(text).toString();
          break;
        case 'sha512':
          hashValue = CryptoJS.SHA512(text).toString();
          break;
        case 'sha3':
          hashValue = CryptoJS.SHA3(text).toString();
          break;
        case 'ripemd160':
          hashValue = CryptoJS.RIPEMD160(text).toString();
          break;
        default:
          hashValue = 'Algorithm not supported';
      }

      // Create hash result element
      const hashItem = document.createElement('div');
      hashItem.className = 'hash-item';
      hashItem.style.borderLeftColor = algo.color;

      hashItem.innerHTML = `
        <div class="hash-title">
          <span>${algo.name}</span>
          <button class="copy-btn" data-hash="${hashValue}"><i class="fas fa-copy"></i> Copy</button>
        </div>
        <div class="hash-value">${hashValue}</div>
        <div class="hash-info">
          <span>Length: ${hashValue.length} chars</span>
          <span>${new Date().toLocaleTimeString()}</span>
        </div>
      `;

      // Append result to the results container
      if (hashResults) hashResults.appendChild(hashItem);
    });

    // Add to history
    addToHistory(text, selectedAlgorithms.length);

    // Show success notification
    showNotification(`Generated ${selectedAlgorithms.length} hash values`);

    // Add event listeners to copy buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const hashValue = this.getAttribute('data-hash');
        copyToClipboard(hashValue);
        showNotification('Hash copied to clipboard!');
      });
    });
  }

  // Clear input function
  function clearInput() {
    inputText.value = '';
    hashResults.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-code"></i>
        <h3>No Hashes Generated</h3>
        <p>Enter some text and click "Generate Hashes" to see the results here.</p>
      </div>
    `;
  }

  // Load sample text function
  function loadSampleText() {
    const sampleTexts = [
      'The quick brown fox jumps over the lazy dog',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Hello, World! This is a sample text for hashing.',
      'Password123!@#',
      'Cryptographic hash functions are fundamental to modern cryptography.',
    ];

    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    inputText.value = randomText;
  }

  // Add to history function
  function addToHistory(text, algorithmCount) {
    const historyItem = {
      text: text,
      algorithmCount: algorithmCount,
      timestamp: new Date().toString(),
    };

    history.unshift(historyItem);

    // Keep only last 10 items
    if (history.length > 10) {
      history = history.slice(0, 10);
    }

    localStorage.setItem('hashHistory', JSON.stringify(history));
    renderHistory();
  }

  // Render history function
  function renderHistory() {
    if (!historyList) return;

    if (history.length === 0) {
      historyList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-history"></i>
          <h3>No History Yet</h3>
          <p>Your previously generated hashes will appear here.</p>
        </div>
      `;
      return;
    }

    historyList.innerHTML = '';

    history.forEach((item, index) => {
      const historyElement = document.createElement('div');
      historyElement.className = 'history-item';

      const date = new Date(item.timestamp);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      historyElement.innerHTML = `
        <div class="history-text" title="${item.text}">${item.text}</div>
        <div class="history-details">
          <div>${item.algorithmCount} algorithms</div>
          <div>${formattedDate}</div>
        </div>
        <div class="history-actions">
          <button class="btn secondary use-history-btn" data-index="${index}">
            <i class="fas fa-redo"></i> Use
          </button>
        </div>
      `;

      historyList.appendChild(historyElement);
    });

    // Add event listeners to use history buttons
    document.querySelectorAll('.use-history-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'));
        inputText.value = history[index].text;

        // Switch to input tab
        tabs[0].click();

        showNotification('Text loaded from history');
      });
    });
  }

  // Clear history function
  function clearHistory() {
    history = [];
    localStorage.setItem('hashHistory', JSON.stringify(history));
    renderHistory();
    showNotification('History cleared');
  }

  // Copy to clipboard function
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  // Show notification function
  function showNotification(message, type = 'success') {
    // If there's a page-provided notification element, use it — otherwise create a temporary toast
    let target = notification;
    let created = false;

    if (!target) {
      created = true;
      target = document.createElement('div');
      target.className = 'notification';
      document.body.appendChild(target);
      console.warn('Notification element not found; created temporary toast instead.');
    }

    target.textContent = message;

    if (type === 'error') {
      target.style.background = 'var(--danger)';
    } else {
      target.style.background = 'var(--success)';
    }

    // Show the notification
    target.classList.add('show');

    // Hide and clean up (if temporary) after a delay
    setTimeout(() => {
      target.classList.remove('show');

      if (created) {
        // Wait for transition then remove
        setTimeout(() => {
          if (target.parentNode) target.parentNode.removeChild(target);
        }, 300);
      }
    }, 3000);
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
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }

  updateYear();
});

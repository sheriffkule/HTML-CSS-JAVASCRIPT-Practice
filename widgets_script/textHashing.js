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
  renderHistory();

  // Event Listeners
  generateBtn.addEventListener('click', generateHashes);
  clearBtn.addEventListener('click', clearInput);
  sampleBtn.addEventListener('click', loadSampleText);
  clearHistoryBtn.addEventListener('click', clearHistory);

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
      return checkbox.ariaChecked;
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
    });
  }
});

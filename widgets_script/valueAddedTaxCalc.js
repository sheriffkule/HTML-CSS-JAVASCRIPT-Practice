document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const darkModeToggle = document.getElementById('darkModeToggle');
  const calculateBtn = document.getElementById('calculateBtn');
  const calculationType = document.getElementById('calculationType');
  const amountInput = document.getElementById('amount');
  const vatRateInput = document.getElementById('vatRate');
  const countrySelect = document.getElementById('countrySelect');
  const countryFlags = document.getElementById('countryFlags');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const resultsSection = document.getElementById('results');
  const netAmountEl = document.getElementById('netAmount');
  const vatAmountEl = document.getElementById('vatAmount');
  const grossAmountEl = document.getElementById('grossAmount');
  const totalAmountEl = document.getElementById('totalAmount');
  const ratesTable = document.getElementById('ratesTable');
  const historyList = document.getElementById('historyList');
  const emptyHistory = document.getElementById('emptyHistory');
  const notification = document.getElementById('notification');

  // Country data with VAT rates and flag emojis
  const countries = [
    { code: 'AT', name: 'Austria', rate: 20, flag: '🇦🇹' },
    { code: 'BE', name: 'Belgium', rate: 21, flag: '🇧🇪' },
    { code: 'BG', name: 'Bulgaria', rate: 20, flag: '🇧🇬' },
    { code: 'HR', name: 'Croatia', rate: 25, flag: '🇭🇷' },
    { code: 'CY', name: 'Cyprus', rate: 19, flag: '🇨🇾' },
    { code: 'CZ', name: 'Czech Republic', rate: 21, flag: '🇨🇿' },
    { code: 'DK', name: 'Denmark', rate: 25, flag: '🇩🇰' },
    { code: 'EE', name: 'Estonia', rate: 20, flag: '🇪🇪' },
    { code: 'FI', name: 'Finland', rate: 24, flag: '🇫🇮' },
    { code: 'FR', name: 'France', rate: 20, flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', rate: 19, flag: '🇩🇪' },
    { code: 'GR', name: 'Greece', rate: 24, flag: '🇬🇷' },
    { code: 'HU', name: 'Hungary', rate: 27, flag: '🇭🇺' },
    { code: 'IE', name: 'Ireland', rate: 23, flag: '🇮🇪' },
    { code: 'IT', name: 'Italy', rate: 22, flag: '🇮🇹' },
    { code: 'LV', name: 'Latvia', rate: 21, flag: '🇱🇻' },
    { code: 'LT', name: 'Lithuania', rate: 21, flag: '🇱🇹' },
    { code: 'LU', name: 'Luxembourg', rate: 17, flag: '🇱🇺' },
    { code: 'MT', name: 'Malta', rate: 18, flag: '🇲🇹' },
    { code: 'NL', name: 'Netherlands', rate: 21, flag: '🇳🇱' },
    { code: 'PH', name: 'Philippines', rate: 12, flag: '🇵🇭' },
    { code: 'PL', name: 'Poland', rate: 23, flag: '🇵🇱' },
    { code: 'PT', name: 'Portugal', rate: 23, flag: '🇵🇹' },
    { code: 'RO', name: 'Romania', rate: 19, flag: '🇷🇴' },
    { code: 'SK', name: 'Slovakia', rate: 20, flag: '🇸🇰' },
    { code: 'SI', name: 'Slovenia', rate: 22, flag: '🇸🇮' },
    { code: 'ES', name: 'Spain', rate: 21, flag: '🇪🇸' },
    { code: 'SE', name: 'Sweden', rate: 25, flag: '🇸🇪' },
    { code: 'GB', name: 'United Kingdom', rate: 20, flag: '🇬🇧' },
  ];

  // Initialize the app
  init();

  function init() {
    // Set Austria as default
    countrySelect.value = 'AT';
    vatRateInput.value = '20';
    highlightSelectedFlag('AT');

    // Check for dark mode preferences
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }

    // Populate country flags
    renderCountryFlags();

    // Populate rates table
    renderRatesTable();

    // Load history
    loadHistory();

    // Set up event listeners
    setupEventListeners();
  }

  function setupEventListeners() {
    // Dark mode toggles
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Calculate button
    calculateBtn.addEventListener('click', calculateVAT);

    // Country select change
    countrySelect.addEventListener('change', function () {
      const selectedCountry = this.value;
      if (selectedCountry) {
        const country = countries.find((c) => c.code === selectedCountry);
        vatRateInput.value = country.rate;
        highlightSelectedFlag(selectedCountry);
      }
    });

    // Tab switching
    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');
        switchTab(tabId);
      });
    });

    // Allow enter key to trigger calculation
    amountInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calculateVAT();
      }
    });

    vatRateInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        calculateVAT();
      }
    });
  }

  function renderCountryFlags() {
    countryFlags.innerHTML = '';
    countries.forEach((country) => {
      const flagOption = document.createElement('div');
      flagOption.className = 'flag-option';
      flagOption.setAttribute('data-country', country.code);
      flagOption.innerHTML = `
        <span class="flag">${country.flag}</span>
        <span>${country.code}</span>
      `;
      flagOption.addEventListener('click', function () {
        countrySelect.value = country.code;
        vatRateInput.value = country.rate;
        highlightSelectedFlag(country.code);
      });
      countryFlags.appendChild(flagOption);
    });
  }

  function highlightSelectedFlag(countryCode) {
    document.querySelectorAll('.flag-option').forEach((flag) => {
      flag.classList.remove('selected');
      if (flag.getAttribute('data-country') === countryCode) {
        flag.classList.add('selected');
      }
    });
  }

  function renderRatesTable() {
    let html = '<div class="results">';
    countries.forEach((country) => {
      html += `
        <div class="result-item">
          <span class="result-label">${country.flag} ${country.name}</span>
          <span class="result-value">${country.rate}</span>
        </div>
      `;
    });
    html += '</div>';
    ratesTable.innerHTML = html;
  }

  function calculateVAT() {
    const type = calculationType.value;
    const amount = parseFloat(amountInput.value);
    const vatRate = parseFloat(vatRateInput.value);

    // Validate inputs
    if (isNaN(amount)) {
      showNotification('Please enter a valid amount', 'warning');
      amountInput.focus();
      return;
    }

    if (isNaN(vatRate)) {
      showNotification('Please enter a valid VAT rate', 'warning');
      vatRateInput.focus();
      return;
    }

    let netAmount;
    let vatAmount;
    let grossAmount;

    switch (type) {
      case 'add':
        // Add VAT to net amount
        netAmount = amount;
        vatAmount = (netAmount * vatRate) / 100;
        grossAmount = netAmount + vatAmount;
        break;
      case 'remove':
        grossAmount = amount;
        netAmount = grossAmount / (1 + vatRate / 100);
        vatAmount = grossAmount - netAmount;
        break;
      case 'difference':
        // Calculate VAT difference between two amounts
        netAmount = amount;
        grossAmount = amount;
        vatAmount = grossAmount - netAmount;
        // Calculate implied VAT rate
        if (netAmount > 0) {
          const impliedRate = (vatAmount / netAmount) * 100;
          vatRateInput.value = impliedRate.toFixed(2);
        }
        break;
    }

    // Display results
    displayResults(netAmount, vatAmount, grossAmount);

    // Save to history
    saveToHistory(netAmount, vatAmount, grossAmount, vatRate, type);
  }

  function displayResults(netAmount, vatAmount, grossAmount) {
    netAmountEl.textContent = formatCurrency(netAmount);
    vatAmountEl.textContent = formatCurrency(vatAmount);
    grossAmountEl.textContent = formatCurrency(grossAmount);
    totalAmountEl.textContent = formatCurrency(grossAmount);
    resultsSection.style.display = 'block';
  }

  function formatCurrency() {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
});

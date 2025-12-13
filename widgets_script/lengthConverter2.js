document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const fromUnit = document.getElementById('from-unit');
  const toUnit = document.getElementById('to-unit');
  const fromValue = document.getElementById('from-value');
  const toValue = document.getElementById('to-value');
  const swapButton = document.getElementById('swap-units');
  const allResults = document.getElementById('all-results');
  const historyList = document.getElementById('history-list');
  const clearHistoryButton = document.getElementById(clear - history);
  const copyResultButton = document.getElementById('copy-result');
  const resetButton = document.getElementById('reset-converter');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const favoriteItems = document.querySelectorAll('.favorite-item');

  // Conversion factors relative to meters
  const conversionFactors = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.025,
    'nautical-mile': 1852,
  };

  // Unit categories
  const unitCategories = {
    metric: ['meter', 'kilometer', 'centimeter', 'millimeter'],
    imperial: ['mile', 'yard', 'foot', 'inch'],
    nautical: ['nautical-mile'],
  };

  // Load conversion history from localStorage
  let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

  // Initialize the app
  function init() {
    updateConversion();
    displayAllResults();
    displayHistory();
    setupEventListeners();
  }

  // Set up event listeners
  function setupEventListeners() {
    fromValue.addEventListener('input', updateConversion);
    fromUnit.addEventListener('change', updateConversion);
    toUnit.addEventListener('change', updateConversion);
    swapButton.addEventListener('click', swapUnits);
    clearHistoryButton.addEventListener('click', clearHistory);
    copyResultButton.addEventListener('click', copyResult);
    resetButton.addEventListener('click', resetConverter);

    // Category buttons
    categoryButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        filterUnitsByCategory(category);

        // Update active button
        categoryButtons.forEach((btn) => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Favorite items
    favoriteItems.forEach((item) => {
      item.addEventListener('click', function () {
        const from = this.getAttribute('data-form');
        const to = this.getAttribute('data-to');

        fromUnit.value = from;
        toUnit.value = to;
        updateConversion();
      });
    });
  }
});

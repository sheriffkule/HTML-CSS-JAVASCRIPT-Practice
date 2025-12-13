document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const fromUnit = document.getElementById('from-unit');
  const toUnit = document.getElementById('to-unit');
  const fromValue = document.getElementById('from-value');
  const toValue = document.getElementById('to-value');
  const swapButton = document.getElementById('swap-units');
  const allResults = document.getElementById('all-results');
  const historyList = document.getElementById('history-list');
  const clearHistoryButton = document.getElementById('clear-history');
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

  // Convert length from one unit to another
  function convertLength(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    // Convert to meters first
    const valueInMeters = value * conversionFactors[fromUnit];

    // Convert from meters to target unit
    return valueInMeters / conversionFactors[toUnit];
  }

  // Update the conversion result
  function updateConversion() {
    const inputValue = parseFloat(fromValue.value) || 0;
    const from = fromUnit.value;
    const to = toUnit.value;

    const result = convertLength(inputValue, from, to);
    toValue.value = result.toFixed(6);

    displayAllResults();

    // Add to history if value is valid and not zero
    if (inputValue > 0) {
      addToHistory(inputValue, from, result, to);
    }
  }

  // Display all unit conversion
  function displayAllResults() {
    const inputValue = parseFloat(fromValue.value) || 0;
    const from = fromUnit.value;

    allResults.innerHTML = '';

    Object.keys(conversionFactors).forEach((unit) => {
      if (unit !== from) {
        const result = convertLength(inputValue, from, unit);
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
          <span>${getUnitName(unit)}</span>
          <span class="result-value">${result.toFixed(6)}</span>
        `;
        allResults.appendChild(resultItem);
      }
    });
  }

  // Swap from and to units
  function swapUnits() {
    const tempUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;

    updateConversion();
  }

  // Add conversion to history
  function addToHistory(value, fromUnit, result, toUnit) {
    const conversion = {
      value,
      fromUnit,
      result,
      toUnit,
      timestamp: new Date().toLocaleString(),
    };

    // Add to beginning of history array
    conversionHistory.unshift(conversion);

    // Keep only last 10 conversions
    if (conversionHistory.length > 10) {
      conversionHistory.pop();
    }

    // Save to localStorage
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));

    // Update history display
    displayHistory();
  }

  // Display conversion history
  function displayHistory() {
    historyList.innerHTML = '';

    if (conversionHistory.length === 0) {
      historyList.innerHTML = '<div class="empty-state">No conversion history yet</div>';
      return;
    }

    
  }
});

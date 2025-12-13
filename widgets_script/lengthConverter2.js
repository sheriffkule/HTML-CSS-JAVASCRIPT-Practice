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
    inch: 0.0254,
    'nautical-mile': 1852,
  };

  // Unit categories
  const unitCategories = {
    metric: ['meter', 'kilometer', 'centimeter', 'millimeter'],
    imperial: ['mile', 'yard', 'foot', 'inch'],
    nautical: ['nautical-mile'],
  };

  // Load conversion history from localStorage and sanitize
  let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
  if (!Array.isArray(conversionHistory)) conversionHistory = [];
  conversionHistory = conversionHistory.map((c) => ({
    ...c,
    result: Number.isFinite(c && c.result) ? c.result : null,
  }));

  // Initialize the app
  function init() {
    // Validate essential DOM elements
    if (!fromUnit || !toUnit || !fromValue || !toValue) {
      console.warn('Length Converter: essential DOM elements missing. Initialization aborted.');
      return;
    }

    updateConversion();
    displayAllResults();
    displayHistory();
    setupEventListeners();
  }

  // Set up event listeners
  function setupEventListeners() {
    if (fromValue) fromValue.addEventListener('input', updateConversion);
    if (fromUnit) fromUnit.addEventListener('change', updateConversion);
    if (toUnit) toUnit.addEventListener('change', updateConversion);
    if (swapButton) swapButton.addEventListener('click', swapUnits);
    if (clearHistoryButton) clearHistoryButton.addEventListener('click', clearHistory);
    if (copyResultButton) copyResultButton.addEventListener('click', copyResult);
    if (resetButton) resetButton.addEventListener('click', resetConverter);

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
        // support both data-from and potential typo data-form attributes
        const from = this.getAttribute('data-from') || this.getAttribute('data-form');
        const to = this.getAttribute('data-to');

        if (from && Array.from(fromUnit.options).some((o) => o.value === from)) fromUnit.value = from;
        if (to && Array.from(toUnit.options).some((o) => o.value === to)) toUnit.value = to;
        updateConversion();
      });
    });
  }

  // Convert length from one unit to another
  function convertLength(value, fromUnit, toUnit) {
    const v = parseFloat(value) || 0;
    if (fromUnit === toUnit) return v;

    // guard: fall back to meter if conversionFactors missing
    const fromFactor = conversionFactors[fromUnit] || 1;
    const toFactor = conversionFactors[toUnit] || 1;

    const valueInMeters = v * fromFactor;
    return valueInMeters / toFactor;
  }

  // Update the conversion result
  function updateConversion() {
    const inputValue = parseFloat(fromValue.value) || 0;
    const from = fromUnit.value;
    const to = toUnit.value;

    const result = convertLength(inputValue, from, to);
    toValue.value = Number.isFinite(result) ? result.toFixed(6) : '';

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

    if (!allResults) return;
    allResults.innerHTML = '';

    Object.keys(conversionFactors).forEach((unit) => {
      if (unit !== from) {
        const result = convertLength(inputValue, from, unit);
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        const resultDisplay = Number.isFinite(result) ? result.toFixed(6) : '—';
        resultItem.innerHTML = `
          <span>${getUnitName(unit)}</span>
          <span class="result-value">${resultDisplay}</span>
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
      result: Number.isFinite(result) ? result : null,
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
    if (!historyList) return;
    historyList.innerHTML = '';

    if (conversionHistory.length === 0) {
      historyList.innerHTML = '<div class="empty-state">No conversion history yet</div>';
      return;
    }

    conversionHistory.forEach((conversion) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-conversion">
          ${conversion.value} ${getUnitName(conversion.fromUnit)} - ${
        conversion.result !== null && conversion.result !== undefined && Number.isFinite(conversion.result)
          ? conversion.result.toFixed(4)
          : '—'
      }
          ${getUnitName(conversion.toUnit)}
        </div>
        <div class="history-value">${conversion.timestamp}</div>
      `;
      historyList.appendChild(historyItem);
    });
  }

  // Clear conversion history
  function clearHistory() {
    conversionHistory = [];
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    displayHistory();
  }

  // Copy result to clipboard
  function copyResult() {
    if (!toValue) return;
    const textToCopy = toValue.value !== undefined && toValue.value !== null ? String(toValue.value) : '';

    // Helper fallback for older browsers
    function fallbackCopy(str) {
      try {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (copyResultButton) {
          copyResultButton.innerHTML = '<i class="fas fa-check"></i> Copied';
          setTimeout(() => {
            copyResultButton.innerHTML = '<i class="fas fa-copy"></i> Copy Result';
          }, 2000);
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
    }

    // Use Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          if (copyResultButton) {
            copyResultButton.innerHTML = '<i class="fas fa-check"></i> Copied';
            setTimeout(() => {
              copyResultButton.innerHTML = '<i class="fas fa-copy"></i> Copy Result';
            }, 2000);
          }
        })
        .catch((err) => {
          console.error('Failed to copy via clipboard API:', err);
          fallbackCopy(textToCopy);
        });
    } else {
      fallbackCopy(textToCopy);
    }
  }

  // Reset converter
  function resetConverter() {
    fromValue.value = '1';
    fromUnit.value = 'meter';
    toUnit.value = 'foot';
    updateConversion();
  }

  // Filter units by category
  function filterUnitsByCategory(category) {
    if (!category || category === 'all') {
      // Show all options
      Array.from(fromUnit.options).forEach((option) => {
        option.style.display = 'block';
      });
      Array.from(toUnit.options).forEach((option) => {
        option.style.display = 'block';
      });
      return;
    }

    const allowedUnits = unitCategories[category];

    // If no category found, fallback to showing all
    if (!allowedUnits) {
      Array.from(fromUnit.options).forEach((option) => {
        option.style.display = 'block';
      });
      Array.from(toUnit.options).forEach((option) => {
        option.style.display = 'block';
      });
      return;
    }

    // Filter from unit options
    Array.from(fromUnit.options).forEach((option) => {
      if (allowedUnits.includes(option.value)) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });

    // Filter to unit options
    Array.from(toUnit.options).forEach((option) => {
      if (allowedUnits.includes(option.value)) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });

    // Update conversion if current selection is not in the category
    if (!allowedUnits.includes(fromUnit.value)) {
      fromUnit.value = allowedUnits[0];
    }

    if (!allowedUnits.includes(toUnit.value)) {
      toUnit.value = allowedUnits[1] || allowedUnits[0];
    }

    updateConversion();
  }

  // Get display name for a unit
  function getUnitName(unit) {
    const unitNames = {
      meter: 'Meter',
      kilometer: 'Kilometer',
      centimeter: 'Centimeter',
      millimeter: 'Millimeter',
      mile: 'Mile',
      yard: 'Yard',
      foot: 'Foot',
      inch: 'Inch',
      'nautical-mile': 'Nautical Mile',
    };

    return unitNames[unit] || unit;
  }

  // Initialize the app
  init();
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();

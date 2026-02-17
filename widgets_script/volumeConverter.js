document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const fromValueInput = document.getElementById('from-value');
  const fromUnitSelect = document.getElementById('from-unit');
  const toValueInput = document.getElementById('to-value');
  const toUnitSelect = document.getElementById('to-unit');
  const toUnitIcon = document.getElementById('to-unit-icon');
  const swapBtn = document.getElementById('swap-units');
  const resultText = document.getElementById('result-text');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history');
  const addFavoriteBtn = document.getElementById('add-favorite');
  const favoritesGrid = document.getElementById('favorites-grid');
  const resetBtn = document.getElementById('reset-values');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Conversion factors (to milliliters)
  const conversionFactors = {
    ml: 1,
    l: 1000,
    tsb: 4.92892,
    tbsp: 14.7868,
    'fl-oz': 29.5735,
    cup: 240,
    pt: 473.176,
    qt: 946.353,
    gal: 3785.41,
    m3: 1000000,
    in3: 16.3871,
    ft3: 28316.8,
  };

  // Unit labels
  const unitLabels = {
    ml: 'ml',
    l: 'l',
    tsb: 'tsb',
    tbsp: 'tbsp',
    'fl-oz': 'fa oz',
    cup: 'cup',
    pt: 'pt',
    qt: 'qt',
    gal: 'gal',
    m3: 'm³',
    in3: 'in³',
    ft3: 'ft³',
  };

  // Initialize
  let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
  let favorites = JSON.parse(localStorage.getItem('conversionFavorites')) || [];
  updateHistoryList();
  updateFavoritesGrid();
  convert();

  // Event listeners
  fromValueInput.addEventListener('input', convert);
  fromUnitSelect.addEventListener('change', convert);
  toUnitSelect.addEventListener('change', convert);
  swapBtn.addEventListener('click', swapUnits);
  clearHistoryBtn.addEventListener('click', clearHistory);
  addFavoriteBtn.addEventListener('click', addFavorite);
  resetBtn.addEventListener('click', resetValues);

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Show corresponding content
      tabContents.forEach((content) => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    });
  });

  // Conversion function
  function convert() {
    const fromValue = parseFloat(fromValueInput.value) || 0;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    // Convert to milliliters first
    const valueInMl = fromValue * conversionFactors[fromUnit];

    // Convert to target unit
    const result = valueInMl / conversionFactors[toUnit];

    // Update UI
    toValueInput.value = result.toFixed(6).replace(/\.?0+$/, '');
    toUnitIcon.textContent = unitLabels[toUnit];
    resultText.textContent = `${fromValue} ${unitLabels[fromUnit]} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${unitLabels[toUnit]}`;

    // Add to history
    if (fromValue !== 0) addToHistory(fromValue, fromUnit, result, toUnit);
  }
});

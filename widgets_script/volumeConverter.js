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
  const themeToggle = document.getElementById('themeToggle');

  // Conversion factors (to milliliters)
  const conversionFactors = {
    ml: 1,
    l: 1000,
    tsp: 4.92892,
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
    tsp: 'tsp',
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
        if (content.id === tabId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Reset all input values and result
  function resetValues() {
    fromValueInput.value = '';
    toValueInput.value = '';
    resultText.textContent = '';
    // Optionally reset selects to default (first option)
    if (fromUnitSelect.options.length) fromUnitSelect.selectedIndex = 0;
    if (toUnitSelect.options.length) toUnitSelect.selectedIndex = 0;
    toUnitIcon.textContent = '';
  }

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

  // Swap units function
  function swapUnits() {
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    convert();
  }

  // Add to history
  function addToHistory(fromValue, fromUnit, toValue, toUnit) {
    // Check if this conversion is already in history
    const existingIndex = history.findIndex((item) => item.fromUnit === fromUnit && item.toUnit === toUnit);

    if (existingIndex !== -1) {
      // Update existing entry
      history[existingIndex] = {
        fromValue,
        fromUnit,
        toValue,
        toUnit,
        timestamp: new Date().toISOString(),
      };
    } else {
      // Add new entry (limit to 10)
      if (history.length >= 10) history.pop();
      history.unshift({
        fromValue,
        fromUnit,
        toValue,
        toUnit,
        timestamp: new Date().toISOString(),
      });
    }

    localStorage.setItem('conversionHistory', JSON.stringify(history));
    updateHistoryList();
  }

  // Update history list
  function updateHistoryList() {
    historyList.innerHTML = '';

    history.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'history-item';
      const toValueSafe =
        typeof item.toValue === 'number' && isFinite(item.toValue) ? item.toValue.toFixed(4) : '';
      li.innerHTML = `
          <div>
            <span class="history-conversion">${item.fromValue} ${unitLabels[item.fromUnit]} → ${toValueSafe} ${unitLabels[item.toUnit]}</span>
          </div>
          <button
            class="use-history"
            data-from-value="${item.fromValue}"
            data-from-unit="${item.fromUnit}"
            data-to-unit="${item.toUnit}">
            <i class="fas fa-redo"></i>
          </button>
        `;
      historyList.appendChild(li);
    });

    // Add event listeners to use history buttons
    document.querySelectorAll('.use-history').forEach((btn) => {
      btn.addEventListener('click', function () {
        const fromValue = this.getAttribute('data-from-value');
        const fromUnit = this.getAttribute('data-from-unit');
        const toUnit = this.getAttribute('data-to-unit');

        fromValueInput.value = fromValue;
        fromUnitSelect.value = fromUnit;
        toUnitSelect.value = toUnit;
        convert();
      });
    });
  }

  // Clear history
  function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
      history = [];
      localStorage.setItem('conversionHistory', JSON.stringify(history));
      updateHistoryList();
    }
  }

  // Add favorite
  function addFavorite() {
    const fromValue = parseFloat(fromValueInput.value) || 0;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    if (fromValue === 0) {
      alert('Please enter a valid value to add to favorites!');
      return;
    }

    // Check if this favorite already exist
    const exist = favorites.some((fav) => fav.fromUnit === fromUnit && fav.toUnit === toUnit);

    if (exist) {
      alert('This conversion is already in your favorites!');
      return;
    }

    // Add to favorites
    favorites.push({
      fromValue,
      fromUnit,
      toUnit,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem('conversionFavorites', JSON.stringify(favorites));
    updateFavoritesGrid();
    alert('Added to favorites');
  }

  // Update favorites grid
  function updateFavoritesGrid() {
    favoritesGrid.innerHTML = '';

    if (favorites.length === 0) {
      favoritesGrid.innerHTML = '<p>No favorites yet. Add some using the "Add to Favorites" button.</p>';
      return;
    }

    favorites.forEach((fav, index) => {
      // Convert to get current value
      const valueInMl = fav.fromValue * conversionFactors[fav.fromUnit];
      const result = valueInMl / conversionFactors[fav.toUnit];

      const favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorite-item';
      favoriteItem.innerHTML = `
        <div class="favorite-value">${fav.fromValue} ${unitLabels[fav.fromUnit]}</div>=
        <div class="favorite-conversion">${result.toFixed(4)} ${unitLabels[fav.toUnit]}</div>
        <button class="remove-favorite" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
      `;

      // Click to use this favorite
      favoriteItem.addEventListener('click', function (e) {
        // Don't trigger if clicking the remove button
        if (!e.target.closest('.remove-favorite')) {
          fromValueInput.value = fav.fromValue;
          fromUnitSelect.value = fav.fromUnit;
          toUnitSelect.value = fav.toUnit;
          convert();

          // Switch to converter tab
          document.querySelector('.tab[data-tab="converter"]').click();
        }
      });

      // Remove button
      const removeBtn = favoriteItem.querySelector('.remove-favorite');
      removeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (confirm('Remove this favorite?')) {
          favorites.splice(index, 1);
          localStorage.setItem('conversionFavorites', JSON.stringify(favorites));
          updateFavoritesGrid();
        }
      });

      favoritesGrid.appendChild(favoriteItem);
    });
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

// Apply saved theme from localStorage (safe)
function applySavedTheme() {
  if (!themeToggle) return;
  const saved = localStorage.getItem('volumeConversionTheme');
  const icon = themeToggle.querySelector && themeToggle.querySelector('i');

  if (saved === 'dark') {
    document.body.classList.add('dark-theme');
    if (icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  } else {
    document.body.classList.remove('dark-theme');
    if (icon) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
}

function toggleTheme() {
  if (!themeToggle) return;
  document.body.classList.toggle('dark-theme');
  const icon = themeToggle.querySelector && themeToggle.querySelector('i');

  if (document.body.classList.contains('dark-theme')) {
    if (icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
    localStorage.setItem('volumeConversionTheme', 'dark');
  } else {
    if (icon) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    localStorage.setItem('speedConverterTheme', 'light');
  }
}
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

// Apply saved theme (if any)
applySavedTheme();

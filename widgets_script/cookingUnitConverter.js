document.addEventListener('DOMContentLoaded', function () {
  // Conversion factors (to milliliters for volume, grams, for weight)
  const conversionFactors = {
    // Volume units
    tsp: 4.92892,
    tbsp: 14.7868,
    'fl-oz': 29.5735,
    cup: 236.588,
    pint: 473.176,
    quart: 946.353,
    gallon: 3785.41,
    ml: 1,
    l: 1000,

    // Weight units
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
  };

  // Ingredient densities (g/ms)
  const ingredientDensities = {
    generic: 1, //Water density as default
    water: 1,
    milk: 1.03,
    flour: 0.59,
    sugar: 0.85,
    salt: 1.2,
    butter: 0.96,
    oil: 0.92,
    honey: 1.42,
  };

  // Common conversions to display
  const commonConversions = [
    { from: '1 cup', to: '16 tablespoons', fromUnit: 'cup', toUnit: 'tbsp', amount: 1 },
    { from: '1 tablespoons', to: '3 teaspoons', fromUnit: 'tbsp', toUnit: 'tsp', amount: 1 },
    { from: '1 cup', to: '240 milliliters', fromUnit: 'cup', toUnit: 'ml', amount: 1 },
    { from: '1 pint', to: '2 cups', fromUnit: 'pint', toUnit: 'cup', amount: 1 },
    { from: '1 quart', to: '4 cups', fromUnit: 'quart', toUnit: 'cup', amount: 1 },
    { from: '1 gallon', to: '16 cups', fromUnit: 'gallon', toUnit: 'cup', amount: 1 },
    { from: '1 ounce', to: '28.35 grams', fromUnit: 'oz', toUnit: 'g', amount: 1 },
    { from: '1 pound', to: '453.59 grams', fromUnit: 'lb', toUnit: 'g', amount: 1 },
    { from: '1 cup flour', to: '120 grams', fromUnit: 'cup', toUnit: 'g', amount: 1, ingredient: 'flour' },
    { from: '1 cup sugar', to: '200 grams', fromUnit: 'cup', toUnit: 'g', amount: 1, ingredient: 'sugar' },
    { from: '1 cup butter', to: '227 grams', fromUnit: 'cup', toUnit: 'g', amount: 1, ingredient: 'butter' },
    { from: '1 cup water', to: '236.59 grams', fromUnit: 'cup', toUnit: 'g', amount: 1, ingredient: 'water' },
  ];

  // DOM elements
  const amountInput = document.getElementById('amount');
  const fromUnitSelect = document.getElementById('fromUnit');
  const toUnitSelect = document.getElementById('toUnit');
  const ingredientSelect = document.getElementById('ingredient');
  const resultContainer = document.getElementById('resultContainer');
  const resultValue = document.getElementById('resultValue');
  const converterForm = document.getElementById('converterForm');
  const swapBtn = document.getElementById('swapBtn');
  const resetBtn = document.getElementById('resetBtn');
  const saveFavoriteBtn = document.getElementById('saveFavoriteBtn');
  const favoritesList = document.getElementById('favoritesList');
  const noFavoritesMessage = document.getElementById('noFavoritesMessage');
  const commonConversionsContainer = document.getElementById('commonConversions');
  const toast = document.getElementById('toast');

  // Load favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('cookingConverterFavorites')) || [];
  renderFavorites();
  renderCommonConversions();

  // Event listeners
  converterForm.addEventListener('input', calculateConversion);
  swapBtn.addEventListener('click', swapUnits);
  resetBtn.addEventListener('click', resetConverter);
  saveFavoriteBtn.addEventListener('click', saveFavorite);

  // Initial calculation - don't show toast on page load
  calculateConversion(false);

  function calculateConversion(showInvalidToast = true) {
    const amount = parseFloat(amountInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const ingredient = ingredientSelect.value;

    if (isNaN(amount) || amount <= 0) {
      resultContainer.style.display = 'none';
      if (showInvalidToast) {
        showToast('Invalid input!');
      }
      return;
    }

    // Check if we're converting between volume and weight
    const isVolumeToWeight = isVolumeUnit(fromUnit) && isWeightUnit(toUnit);
    const isWeightToVolume = isWeightUnit(fromUnit) && isVolumeUnit(toUnit);

    let result;

    if (isVolumeToWeight) {
      // Volume to weight conversion
      const ml = amount * conversionFactors[fromUnit];
      const grams = ml * ingredientDensities[ingredient];
      result = grams / conversionFactors[toUnit];
    } else if (isWeightToVolume) {
      // Weight to volume conversion
      const grams = amount * conversionFactors[fromUnit];
      const ml = grams / ingredientDensities[ingredient];
      result = ml / conversionFactors[toUnit];
    } else if (isVolumeUnit(fromUnit) && isVolumeUnit(toUnit)) {
      // Volume to volume conversion
      const ml = amount * conversionFactors[fromUnit];
      result = ml / conversionFactors[toUnit];
    } else if (isWeightUnit(fromUnit) && isWeightUnit(toUnit)) {
      const grams = amount * conversionFactors[fromUnit];
      result = grams / conversionFactors[toUnit];
    } else {
      // Invalid conversion (shouldn't happen with proper UI)
      showToast('Invalid unit conversion', error);
    }

    // Format the result (round to 2 decimal places)
    const roundedResult = Math.round(result * 100) / 100;

    // Display the result
    resultValue.textContent = `${roundedResult} ${getUnitName(toUnit)}`;
    resultContainer.style.display = 'block';
  }

  function isVolumeUnit(unit) {
    return ['tsp', 'tbsp', 'fl-oz', 'cup', 'pint', 'quart', 'gallon', 'ml', 'l'].includes(unit);
  }

  function isWeightUnit(unit) {
    return ['g', 'kg', 'oz', 'lb'].includes(unit);
  }

  function getUnitName(unit) {
    const unitNames = {
      tsp: 'tablespoon',
      tbsp: 'tablespoons',
      'fl-oz': 'fluid ounces',
      cup: 'cups',
      pint: 'pints',
      quart: 'quarts',
      gallon: 'gallons',
      ml: 'milliliters',
      l: 'liters',
      g: 'grams',
      kg: 'kilograms',
      oz: 'ounces',
      lb: 'pounds',
    };
    return unitNames[unit] || unit;
  }

  function swapUnits() {
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    calculateConversion();
  }

  function resetConverter() {
    amountInput.value = '';
    fromUnitSelect.value = 'cup';
    toUnitSelect.value = 'tbsp';
    ingredientSelect.value = 'generic';
    resultContainer.style.display = 'none';
  }

  function saveFavorite() {
    const amount = parseFloat(amountInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const ingredient = ingredientSelect.value;

    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid amount first!', 'error');
      return;
    }

    const favorite = {
      amount,
      fromUnit,
      toUnit,
      ingredient: isVolumeToWeightConversion(fromUnit, toUnit) ? ingredient : undefined,
    };

    // Check if this favorite already exist
    const exist = favorites.some(
      (fav) =>
        (fav.amount === favorite.amount &&
          fav.fromUnit === favorite.fromUnit &&
          fav.toUnit === favorite.toUnit &&
          (fav.ingredient || 'generic') === favorite.ingredient) ||
        'generic',
    );

    if (exist) {
      showToast('This conversion is already in your favorites', 'error');
      return;
    }

    favorites.push(favorite);
    localStorage.setItem('cookingConverterFavorites', JSON.stringify(favorites));
    renderFavorites();
    showToast('Conversion saved to favorites!');
  }

  function isVolumeToWeightConversion(fromUnit, toUnit) {
    return isVolumeUnit(fromUnit) && isWeightUnit(toUnit);
  }

  function renderFavorites() {
    if (favorites.length === 0) {
      noFavoritesMessage.style.display = 'block';
      favoritesList.innerHTML = '';
      return;
    }

    noFavoritesMessage.style.display = 'none';
    favoritesList.innerHTML = '';

    favorites.forEach((favorite, index) => {
      const favoriteElement = document.createElement('div');
      favoriteElement.className = 'favorite-item';

      const fromAmount = favorite.amount % 1 === 0 ? favorite.amount : favorite.amount.toFixed(2);
      const fromUnitName = getUnitName(favorite.fromUnit);
      const toUnitName = getUnitName(favorite.toUnit);

      let description = `${fromAmount} ${fromUnitName}
        <i class="fa-solid fa-arrow-right-long"></i> ${toUnitName}`;
      if (favorite.ingredient && favorite.ingredient !== 'generic') {
        description += ` (${favorite.ingredient})`;
      }

      favoriteElement.innerHTML = `
        <span>${description}</span>
        <span class="remove-favorite" data-index="${index}">&times;</span>
      `;

      favoritesList.appendChild(favoriteElement);

      // Add click event to use this favorite
      favoriteElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-favorite')) {
          return;
        }
        loadFavorite(favorite);
      });

      // Add click event to remove button
      const removeBtn = favoriteElement.querySelector('.remove-favorite');
      removeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        removeFavorite(index);
      });
    });
  }

  function loadFavorite(favorite) {
    amountInput.value = favorite.amount;
    fromUnitSelect.value = favorite.fromUnit;
    toUnitSelect.value = favorite.toUnit;
    ingredientSelect.value = favorite.ingredient || 'generic';
    calculateConversion();
    showToast('Favorite loaded.');
  }

  function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('cookingConverterFavorites', JSON.stringify(favorites));
    renderFavorites();
    showToast('Favorite removed.');
  }

  function renderCommonConversions() {
    commonConversionsContainer.innerHTML = '';

    commonConversions.forEach((conversion) => {
      const card = document.createElement('div');
      card.className = 'conversion-card';

      card.innerHTML = `
        <div class="conversion-value">${conversion.from} = ${conversion.to}</div>
        <div class="conversion-label">
          ${
            conversion.ingredient
              ? conversion.ingredient.charAt(0).toUpperCase() + conversion.ingredient.slice(1)
              : 'Volume conversion'
          }
        </div>
        <div
          class="add-to-favorites"
          data-from="${conversion.fromUnit}"
          data-to="${conversion.toUnit}"
          data-amount="${conversion.amount}"
          data-ingredient="${conversion.ingredient || 'generic'}">
          <i class="fa-regular fa-bookmark"></i> Save to favorites
        </div>
      `;

      commonConversionsContainer.appendChild(card);

      // Add click event to the whole card
      card.addEventListener('click', function () {
        fromUnitSelect.value = conversion.fromUnit;
        toUnitSelect.value = conversion.toUnit;
        amountInput.value = conversion.amount;
        ingredientSelect.value = conversion.ingredient || 'generic';
        calculateConversion();
      });

      // Add click event to the save button
      const saveBtn = card.querySelector('.add-to-favorites');
      saveBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const favorite = {
          amount: parseFloat(this.getAttribute('data-amount')),
          fromUnit: this.getAttribute('data-from'),
          toUnit: this.getAttribute('data-to'),
          ingredient:
            this.getAttribute('data-ingredient') !== 'generic'
              ? this.getAttribute('data-ingredient')
              : undefined,
        };

        // Check if already exist
        const exist = favorites.some(
          (fav) =>
            fav.amount === favorite.amount &&
            fav.fromUnit === favorite.fromUnit &&
            fav.toUnit === favorite.toUnit &&
            (fav.ingredient || 'generic') === favorite.ingredient,
        );

        if (exist) {
          showToast('This conversion is already in your favorites', 'error');
          return;
        }

        favorites.push(favorite);
        localStorage.setItem('cookingConverterFavorites', JSON.stringify(favorites));
        renderFavorites();
        showToast('Common conversion saved to favorites!');
      });
    });
  }

  function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type);
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

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

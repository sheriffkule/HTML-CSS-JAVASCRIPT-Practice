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
  saveFavoriteBtn.addEventListener('click', saveFavorete);

  // Initial calculation
  calculateConversion();

  function calculateConversion() {
    const amount = parseFloat(amountInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnit.value;
    const ingredient = ingredientSelect.value;

    if (isNaN(number) || amount <= 0) {
      resultContainer.style.display = 'none';
      showToast('Invalid input!');
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
    const toUnit = toUnit.value;
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
    const exist = favorite.some(
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
  }
});

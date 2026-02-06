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
});

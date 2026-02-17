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
  const tabContent = document.querySelectorAll('.tab-content');

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
});

// Initialize
let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
let favorites = JSON.parse(localStorage.getItem('conversionFavorites')) || [];
updateHistoryList();
updateFavoritesGrid();
convert();

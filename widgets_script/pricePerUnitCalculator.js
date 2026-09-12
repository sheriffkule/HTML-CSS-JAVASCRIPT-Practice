document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const calculateBtn = document.getElementById('calculate-btn');
  const addToListBtn = document.getElementById('add-to-list-btn');
  const resetBtn = document.getElementById('reset-btn');
  const clearHistoryBtn = document.getElementById('clear-history-btn');
  const resultsDiv = document.getElementById('results');
  const pricePerUnitSpan = document.getElementById('price-per-unit');
  const resultUnitTypeSpan = document.getElementById('result-unit-type');
  const productNameInput = document.getElementById('product-name');
  const productPriceInput = document.getElementById('product-price');
  const productQuantityInput = document.getElementById('product-quantity');
  const unitTypeSelect = document.getElementById('unit-type');
  const comparisonContent = document.getElementById('comparison-content');
  const emptyComparison = document.getElementById('empty-comparison');
  const comparisonChart = document.getElementById('comparison-chart');
  const bestValueSpan = document.getElementById('best-value');
  const savingsValueSpan = document.getElementById('savings-value');
  const historyList = document.getElementById('history-list');
  const emptyHistory = document.getElementById('empty-history');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // State
  let products = [];
  let history = JSON.parse(localStorage.getItem('pricePerUnitHistory')) || [];

  // Initialize
  updateHistoryList();
  updateComparison();

  // Event listeners
  calculateBtn.addEventListener('click', calculatePricePerUnit);
  addToListBtn.addEventListener('click', addProductToList);
  resetBtn.addEventListener('click', resetCalculator);
  clearHistoryBtn.addEventListener('click', clearHistory);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((c = c.classList.remove('active')));

      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
    });
  });

  // Functions
  function calculatePricePerUnit() {
    const price = parseFloat(productPriceInput.value);
    const quantity = parseFloat(productQuantityInput.value);
    const unitType = unitTypeSelect.value;

    if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid price and quantity values.');
      return;
    }

    const pricePerUnit = price / quantity;
    const unitSymbol = getUnitSymbol(unitType);

    pricePerUnitSpan.textContent = `$${pricePerUnit.toFixed(2)} per ${unitSymbol}`;
    resultUnitTypeSpan.textContent = `${unitSymbol}`;

    resultsDiv.style.display = 'block';

    // Add to history
    const historyItem = {
      name: productNameInput.value || 'Unnamed Product',
      price: price,
      quantity: quantity,
      unitType: unitType,
      pricePerUnit: pricePerUnit,
      date: new Date().toISOString(),
    };

    history.unshift(historyItem);
    if (history.length > 10) history.pop();
    localStorage.setItem('pricePerUnitHistory', JSON.stringify(history));
    updateHistoryList();
  }

  function addProductToList() {
    const price = parseFloat(productPriceInput.value);
    const quantity = parseFloat(productQuantityInput.value);
    const unitType = unitTypeSelect.value;

    if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid price and quantity values.');
      return;
    }

    const pricePerUnit = price / quantity;
    const name = productNameInput.value || `Product ${products.length + 1}`;

    products.push({
      name,
      price,
      quantity,
      unitType,
      pricePerUnit,
    });

    updateComparison();
    resetCalculator();
    alert(`${name} added to comparison list!`);
  }

  function resetCalculator() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
    unitTypeSelect.value = 'each';
    resultsDiv.style.display = 'none';
  }
});

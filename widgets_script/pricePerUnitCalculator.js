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
  let history = [];

  try {
    const savedHistory = JSON.parse(localStorage.getItem('pricePerUnitHistory') || '[]');
    history = Array.isArray(savedHistory) ? savedHistory : [];
  } catch (error) {
    history = [];
    localStorage.removeItem('pricePerUnitHistory');
  }

  // Initialize
  resetCalculator();
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
      tabContents.forEach((c) => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
    });
  });

  // Functions
  function calculatePricePerUnit() {
    const price = parseFloat(productPriceInput.value);
    const quantity = parseFloat(productQuantityInput.value);
    const unitType = unitTypeSelect.value;

    if (!Number.isFinite(price) || !Number.isFinite(quantity) || price < 0 || quantity <= 0) {
      alert('Please enter a valid non-negative price and a quantity greater than zero.');
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

    if (!Number.isFinite(price) || !Number.isFinite(quantity) || price < 0 || quantity <= 0) {
      alert('Please enter a valid non-negative price and a quantity greater than zero.');
      return;
    }

    const pricePerUnit = price / quantity;
    const name = productNameInput.value.trim() || `Product ${products.length + 1}`;

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
    pricePerUnitSpan.textContent = '$0.00';
    resultUnitTypeSpan.textContent = '--';
    resultsDiv.style.display = 'none';
  }

  function updateComparison() {
    if (products.length === 0) {
      emptyComparison.style.display = 'block';
      comparisonContent.style.display = 'none';
      bestValueSpan.textContent = '--';
      savingsValueSpan.textContent = '--';
      comparisonChart.innerHTML = '';
      return;
    }

    emptyComparison.style.display = 'none';
    comparisonContent.style.display = 'block';

    // Find best and worst values
    let bestProduct = products[0];
    let worstProduct = products[0];

    products.forEach((product) => {
      if (product.pricePerUnit < bestProduct.pricePerUnit) {
        bestProduct = product;
      }
      if (product.pricePerUnit > worstProduct.pricePerUnit) {
        worstProduct = product;
      }
    });

    const savings = worstProduct.pricePerUnit - bestProduct.pricePerUnit;
    const savingsPercentage = worstProduct.pricePerUnit > 0
      ? ((savings / worstProduct.pricePerUnit) * 100).toFixed(2)
      : '0.00';

    bestValueSpan.textContent = `${bestProduct.name} (${bestProduct.pricePerUnit.toFixed(2)} per ${getUnitSymbol(bestProduct.unitType)})`;
    savingsValueSpan.textContent = `${savings.toFixed(2)} (${savingsPercentage}%)`;

    // Update chart
    comparisonChart.innerHTML = '';

    // Find max value for scaling
    const maxPricePerUnit = Math.max(...products.map((p) => p.pricePerUnit), 0);
    const safeMax = maxPricePerUnit > 0 ? maxPricePerUnit : 1;

    products.forEach((product) => {
      const isBest = product === bestProduct;
      const chartHeight = 160;
      const rawHeight = (product.pricePerUnit / safeMax) * chartHeight;
      const barHeight = Math.max(rawHeight, 8);

      const barContainer = document.createElement('div');
      barContainer.className = 'bar-container';

      const bar = document.createElement('div');
      bar.className = `bar ${isBest ? 'best-bar' : ''}`;
      bar.style.height = `${barHeight}px`;

      const barValue = document.createElement('div');
      barValue.className = 'bar-value';
      barValue.textContent = `$${product.pricePerUnit.toFixed(2)}`;

      const barLabel = document.createElement('div');
      barLabel.className = 'bar-label';
      barLabel.textContent = product.name.length > 12 ? `${product.name.substring(0, 10)}...` : product.name;

      bar.appendChild(barValue);
      barContainer.appendChild(bar);
      barContainer.appendChild(barLabel);
      comparisonChart.appendChild(barContainer);
    });
  }

  function updateHistoryList() {
    historyList.innerHTML = '';

    if (history.length === 0) {
      emptyHistory.style.display = 'block';
      return;
    }

    emptyHistory.style.display = 'none';

    history.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'history-item';

      const unitSymbol = getUnitSymbol(item.unitType);
      const date = new Date(item.date).toLocaleString();

      li.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <div class="text-muted" style="font-size: 0.875rem">${date}</div>
        </div>
        <div>
          <span>$${item.pricePerUnit.toFixed(2)}/${unitSymbol}</span>
          <button class="history-delete" data-index="${index}">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;

      historyList.appendChild(li);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.history-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        history.splice(index, 1);
        localStorage.setItem('pricePerUnitHistory', JSON.stringify(history));
        updateHistoryList();
      });
    });
  }

  function clearHistory() {
    if (confirm('Are you sure you want to clear your calculation history?')) {
      history = [];
      localStorage.setItem('pricePerUnitHistory', JSON.stringify(history));
      updateHistoryList();
    }
  }

  function getUnitSymbol(unitType) {
    const units = {
      each: 'each',
      g: 'g',
      kg: 'kg',
      ml: 'ml',
      l: 'l',
      oz: 'oz',
      lb: 'lb',
      'fl-oz': 'fl oz',
    };
    return units[unitType] || 'unit';
  }
});

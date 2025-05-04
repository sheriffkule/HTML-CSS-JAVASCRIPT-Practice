const denominations = [
  {
    name: '$100 Bill',
    value: 100,
    type: 'bill',
    icon: 'fa-money-bill',
  },
  {
    name: '$50 Bill',
    value: 50,
    type: 'bill',
    icon: 'fa-money-bill',
  },
  {
    name: '$20 Bill',
    value: 20,
    type: 'bill',
    icon: 'fa-money-bill',
  },
  {
    name: '$10 Bill',
    value: 10,
    type: 'bill',
    icon: 'fa-money-bill',
  },
  {
    name: '$5 Bill',
    value: 5,
    type: 'bill',
    icon: 'fa-money-bill',
  },
  {
    name: '$1 Bill',
    value: 1,
    type: 'bill',
    icon: 'fa-money-bill',
  },
  {
    name: 'Quarter',
    value: 0.25,
    type: 'coin',
    icon: 'fa-coins',
  },
  {
    name: 'Dime',
    value: 0.1,
    type: 'coin',
    icon: 'fa-coins',
  },
  {
    name: 'Nickel',
    value: 0.05,
    type: 'coin',
    icon: 'fa-coins',
  },
  {
    name: 'Penny',
    value: 0.01,
    type: 'coin',
    icon: 'fa-coins',
  },
];

const themeSwitch = document.getElementById('theme-switch');
const amountInput = document.getElementById('amount');
const calculateBtn = document.getElementById('calculate');
const randomBtn = document.getElementById('random-amount');
const resultsDiv = document.getElementById('results');
const summaryDiv = document.getElementById('summary');
const errorMessage = document.getElementById('error-message');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const quickAmountButtons = document.querySelectorAll('.quick-amounts button');

function init() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener('change', toggleTheme);
  calculateBtn.addEventListener('click', handleCalculate);
  randomBtn.addEventListener('click', generateRandomAmount);
  amountInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  });

  gridViewBtn.addEventListener('click', () => {
    setViewMode('grid');
  });
  listViewBtn.addEventListener('click', () => {
    setViewMode('list');
  });

  quickAmountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const amount = button.getAttribute('data-amount');
      amountInput.value = amount;
      handleCalculate();
    });
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function generateRandomAmount() {
  const randomAmount = (Math.random() * 1000 + 1).toFixed(2);
  amountInput.value = randomAmount;
  handleCalculate();
}

function handleCalculate() {
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    showError('Please enter a valid amount');
  } else if (amount > 10000) {
    showError("Amount can't exceed 10000");
    return;
  }

  hideError();
  showCalculatingState();

  setTimeout(() => {
    const result = calculateChange(amount);
    displayResults(result);
    hideCalculatingState();
  }, 800);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('visible');
}

function hideError() {
  errorMessage.classList.remove('visible');
}

function showCalculatingState() {
  calculateBtn.classList.add('calculating');
}

function hideCalculatingState() {
  calculateBtn.classList.remove('calculating');
}

function setViewMode(mode) {
  const results = document.getElementById('results');

  if (mode === 'grid') {
    results.classList.remove('list-view');
    results.classList.add('grid-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
  } else {
    results.classList.remove('grid-view');
    results.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
  }

  localStorage.setItem('viewMode', mode);
}

function calculateChange(amount) {
  let remainingAmount = Math.round(amount * 100) / 100;
  const result = [];

  for (const denom of denominations) {
    const count = Math.floor(remainingAmount / denom.value);

    if (count > 0) {
      result.push({
        name: denom.name,
        value: denom.value,
        count: count,
        total: denom.value * count,
        type: denom.type,
        icon: denom.icon,
      });

      remainingAmount = (remainingAmount - denom.value * count).toFixed(2);
      remainingAmount = parseFloat(remainingAmount);
    }
  }
  return {
    amount: amount,
    denominations: result,
    totalCount: result.reduce((sum, item) => sum + item.count, 0),
    billCount: result.filter((item) => item.type === 'bill').reduce((sum, item) => sum + item.count, 0),
    coinCount: result.filter((item) => item.type === 'coin').reduce((sum, item) => sum + item.count, 0),
  };
}

function displayResults(result) {
  resultsDiv.innerHTML = '';

  if (result.denominations.length === 0) {
    resultsDiv.innerHTML = ` <div class="empty-state">
      <i class="fas fa-coins"></i>
      <p>No results to show. Please enter a valid amount.</p>
    </div>`;
    return;
  }

  result.denominations.forEach((item, index) => {
    const denomElement = document.createElement('div');
    denomElement.className = `denomination ${item.type}`;
    denomElement.setAttribute('data-index', index);

    denomElement.innerHTML = `
    <div class="icon">
        <i class="fas ${item.icon}"></i>
    </div>
    <div class="denom-info">
        <h3>${item.name}</h3>
        <p>${item.count}</p>
    </div>
    `;

    denomElement.style.animationDelay = `${index * 0.1}`;
    resultsDiv.appendChild(denomElement);

    denomElement.addEventListener('mouseover', () => {
      denomElement.classList.add('active');
    });

    denomElement.addEventListener('mouseout', () => {
      denomElement.classList.remove('active');
    });
  });

  displaySummary(result);
}

function displaySummary(result) {
  summaryDiv.innerHTML = `
    <div class="summary-item">
      <h3>Total Amount</h3>
      <p>${result.amount.toFixed(2)}</p>
    </div>
    <div class="summary-item">
      <h3>Total Pieces</h3>
      <p>${result.totalCount}</p>
    </div>
    <div class="summary-item">
      <h3>Bills</h3>
      <p>${result.billCount}</p>
    </div>
    <div class="summary-item">
      <h3>Coins</h3>
      <p>${result.coinCount}</p>
    </div>
  `;

  setTimeout(() => {
    summaryDiv.classList.add('visible')
  }, 400);
}

window.addEventListener('DOMContentLoaded', init);

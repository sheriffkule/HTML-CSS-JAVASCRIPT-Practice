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
const amount = document.getElementById('amount');
const calculateBtn = document.getElementById('calculate');
const randomBtn = document.getElementById('random-amount');
const resultsDiv = document.getElementById('results');
const summaryDiv = document.getElementById('summary');
const errorMessage = document.getElementById('error-message');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const quickAmountButtons = document.getElementById('.quick-amounts button');

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
}

function toggleTheme() {}
function handleCalculate() {}
function generateRandomAmount() {}
function setViewMode() {}

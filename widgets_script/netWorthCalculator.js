// DOM Elements
const calculateBtn = document.getElementById('calculateBtn');
const saveBtn = document.getElementById('saveBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab-content');

// Input fields
const assetInputs = [
  document.getElementById('cash'),
  document.getElementById('investments'),
  document.getElementById('realEstate'),
  document.getElementById('vehicles'),
  document.getElementById('otherAssets'),
];

const liabilityInputs = [
  document.getElementById('mortgage'),
  document.getElementById('carLoans'),
  document.getElementById('studentLoans'),
  document.getElementById('creditCards'),
  document.getElementById('otherLiabilities'),
];

const savingsGoalInput = document.getElementById('savingsGoal');

// Display elements
const netWorthDisplay = document.querySelector('.net-worth-display');
const totalAssetsDisplay = document.querySelector('.assets .amount');
const totalLiabilitiesDisplay = document.querySelector('.liabilities .amount');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');
const historyList = document.querySelector('.history-list');

// Chart
let netWorthChart;

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
  initializeChart();
  loadFromLocalStorage();
  calculateNetWorth();

  // Add event listeners
  calculateBtn.addEventListener('click', calculateNetWorth);
  saveBtn.addEventListener('click', saveToHistory);
  clearHistoryBtn.addEventListener('click', clearHistory);

  // Add input event listeners to all fields for real-time calculation
  assetInputs.concat(liabilityInputs).forEach(function (input) {
    input.addEventListener('input', calculateNetWorth);
  });

  savingsGoalInput.addEventListener('input', function () {
    updateSavingsGoal(calculateNetWorth());
  });

  // Tab functionality
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Show corresponding content
      tabContent.forEach((content) => {
        content.classList.remove('active');
        if (content.id === `${tabId}-tab`) {
          content.classList.add('active');
        }
      });
    });
  });
});

// Initialize the chart
function initializeChart() {
  const ctx = document.getElementById('netWorthChart').getContext('2d');
  netWorthChart = new Chart(ctx, {
    type: 'doughnut',
    date: {
      labels: ['Assets', 'Liabilities'],
      dataset: [
        {
          data: [0, 0],
          backgroundColor: ['#4cc9f0', '#f72585'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: $${context.raw.toLocaleString()}`;
            },
          },
        },
      },
    },
  });
}

// Calculate net worth
function calculateNetWorth() {
  // Calculate total assets
  let totalAssets = 0;
  assetInputs.forEach((input) => {
    totalAssets += parseFloat(input.value) || 0;
  });

  // Calculate total liabilities
  let totalLiabilities = 0;
  liabilityInputs.forEach((input) => {
    totalLiabilities += parseFloat(input.value) || 0;
  });

  // Calculate net worth
  const netWorth = totalAssets - totalLiabilities;

  // Update displays
  totalAssetsDisplay.textContent = `$${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  totalLiabilitiesDisplay.textContent = `$${totalLiabilities.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  netWorthDisplay.textContent = `$${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // update color based on net worth
  netWorth > 0
    ? (netWorthDisplay.className = 'net-worth-display positive')
    : (netWorthDisplay.className = 'net-worth-display negative');

  // Update chart
  netWorthChart.data.dataset[0].data = [totalAssets, totalLiabilities];
  netWorthChart.update();

  // Update savings goal progress without causing recursion
  updateSavingsGoal({ totalAssets, totalLiabilities, netWorth });

  return { totalAssets, totalLiabilities, netWorth };
}

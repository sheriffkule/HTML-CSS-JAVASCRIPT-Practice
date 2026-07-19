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
].filter((el) => el !== null);

const liabilityInputs = [
  document.getElementById('mortgage'),
  document.getElementById('carLoans'),
  document.getElementById('studentLoans'),
  document.getElementById('creditCards'),
  document.getElementById('otherLiabilities'),
].filter((el) => el !== null);

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
    data: {
      labels: ['Assets', 'Liabilities'],
      datasets: [
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
  if (totalAssetsDisplay) totalAssetsDisplay.textContent = `$${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (totalLiabilitiesDisplay) totalLiabilitiesDisplay.textContent = `$${totalLiabilities.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (netWorthDisplay) {
    netWorthDisplay.textContent = `$${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // update color based on net worth
    netWorth > 0
      ? (netWorthDisplay.className = 'net-worth-display positive')
      : (netWorthDisplay.className = 'net-worth-display negative');
  }

  // Update chart
  if (netWorthChart) {
    netWorthChart.data.datasets[0].data = [totalAssets, totalLiabilities];
    netWorthChart.update();
  }

  // Update savings goal progress without causing recursion
  updateSavingsGoal({ totalAssets, totalLiabilities, netWorth });

  return { totalAssets, totalLiabilities, netWorth };
}

// Update savings goal progress
function updateSavingsGoal({ netWorth }) {
  if (!savingsGoalInput) return;
  
  const savingsGoal = parseFloat(savingsGoalInput.value) || 0;

  if (savingsGoal > 0) {
    const progressPercentage = Math.min((netWorth / savingsGoal) * 100, 100);
    if (progressBar) progressBar.style.width = `${progressPercentage}%`;
    if (progressText) progressText.textContent = `${progressPercentage.toFixed(1)}% of goal achieved.`;

    // Update savings goal display
    const savingsGoalP = document.querySelector('.savings-goal p');
    if (savingsGoalP) {
      savingsGoalP.textContent = `Current:
    $${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / Goal:
    $${savingsGoal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  } else {
    if (progressBar) progressBar.style.width = '0%';
    if (progressText) progressText.textContent = 'Set a savings goal to track progress.';
    const savingsGoalP = document.querySelector('.savings-goal p');
    if (savingsGoalP) savingsGoalP.textContent = 'Current: $0.00 / Goal: $0.00';
  }
}

// Save current net worth to history
function saveToHistory() {
  const { totalAssets, totalLiabilities, netWorth } = calculateNetWorth();
  const now = new Date();
  const dateString =
    now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Create history item
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item';
  historyItem.innerHTML = `
    <div>
      <div class="history-date">${dateString}</div>
      <div>
        Net Worth:
        $${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <div>
        Assets:
        $${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      Liabilities:
      $${totalLiabilities.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
  `;

  // Add to history list
  historyList.prepend(historyItem);

  // Save to local storage
  saveHistoryToLocalStorage();
}

// Clear history
function clearHistory() {
  if (confirm('Are you sure you want to clear your history?')) {
    historyList.innerHTML = '';
    localStorage.removeItem('netWorthHistory');
  }
}

// Save history to localStorage
function saveHistoryToLocalStorage() {
  const historyItems = [];
  document.querySelectorAll('.history-item').forEach((item) => {
    historyItems.push(item.innerHTML);
  });
  localStorage.setItem('netWorthHistory', JSON.stringify(historyItems));
}

// Load from localStorage
function loadFromLocalStorage() {
  // Load history
  const savedHistory = localStorage.getItem('netWorthHistory');
  if (savedHistory) {
    const historyItems = JSON.parse(savedHistory);
    historyItems.forEach((itemHTML) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = itemHTML;
      historyList.appendChild(historyItem);
    });
  }

  // Load form values
  const savedFormData = localStorage.getItem('netWorthFormData');
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);

    assetInputs.forEach((input, index) => {
      const key = `asset${index}`;
      if (formData[key]) input.value = formData[key];
    });

    liabilityInputs.forEach((input, index) => {
      const key = `liability${index}`;
      if (formData[key]) input.value = formData[key];
    });

    if (formData.savingsGoal) savingsGoalInput.value = formData.savingsGoal;
  }
}

// Save form data to localStorage on input change
[...assetInputs, ...liabilityInputs, savingsGoalInput]
  .filter((el) => el !== null)
  .forEach((input) => {
    input.addEventListener('input', () => {
      const formData = {};

      assetInputs.forEach((input, index) => {
        formData[`asset${index}`] = input.value;
      });

      liabilityInputs.forEach((input, index) => {
        formData[`liability${index}`] = input.value;
      });

      formData.savingsGoal = savingsGoalInput.value;

      localStorage.setItem('netWorthFormData', JSON.stringify(formData));
    });
  });

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }
  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.textContent = currentYear.toString();
}
updateYear();

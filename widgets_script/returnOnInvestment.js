// DOM Elements
const initialInvestment = document.getElementById('initial-investment');
const monthlyContribution = document.getElementById('monthly-contribution');
const investmentPeriod = document.getElementById('investment-period');
const expectedReturn = document.getElementById('expected-return');
const periodValue = document.getElementById('period-value');
const returnValue = document.getElementById('return-value');
const calculateBtn = document.getElementById('calculate-btn');
const totalValue = document.getElementById('total-value');
const totalInvestment = document.getElementById('total-investment');
const totalReturn = document.getElementById('total-return');
const roiPercentage = document.getElementById('roi-percentage');
const breakdownInitial = document.getElementById('break-initial');
const breakdownContributions = document.getElementById('breakdown-contributions');
const breakdownGrowth = document.getElementById('breakdown-growth');
const breakdownTotal = document.getElementById('breakdown-total');
const conservativeValue = document.getElementById('conservative-value');
const moderateValue = document.getElementById('moderate-value');
const aggressiveValue = document.getElementById('aggressive-value');
const toggleOptions = document.getElementById('toggle-options');
const additionalInputs = document.getElementById('additional-inputs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const chartCanvas = document.getElementById('chart');

// Update range values
investmentPeriod.addEventListener('input', function () {
  periodValue.textContent = `${this.value} years`;
});

expectedReturn.addEventListener('input', function () {
  returnValue.textContent = `${this.value}%`;
});

// Toggle additional options
toggleOptions.addEventListener('click', function () {
  const isVisible = additionalInputs.style.display === 'grid';
  additionalInputs.style.display = isVisible ? 'none' : 'grid';
  this.innerHTML = isVisible
    ? '<i class="fas fa-chevron-down"></i> Additional Options'
    : '<i class="fas fa-chevron-up"></i> Additional Options';
});

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    const tabId = this.getAttribute('data-tab');

    // Update active tab
    tabs.forEach((t) => t.classList.remove('active'));
    this.classList.add('active');

    // Show active tab content
    tabContents.forEach((content) => {
      content.classList.remove('active');
      if (content.id === `${tabId}-tab`) {
        content.classList.add('active');
      }
    });
  });
});

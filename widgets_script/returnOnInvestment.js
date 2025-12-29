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
const breakdownInitial = document.getElementById('breakdown-initial');
const breakdownContributions = document.getElementById('breakdown-contributions');
const breakdownGrowth = document.getElementById('breakdown-growth');
const breakdownTotal = document.getElementById('breakdown-total');
const conservativeValue = document.getElementById('conservative-value');
const moderateValue = document.getElementById('moderate-value');
const aggressiveValue = document.getElementById('aggressive-value');
const conservativeLoss = document.getElementById('conservative-loss');
const aggressiveGain = document.getElementById('aggressive-gain');
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

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Calculate ROI
function calculateROI() {
  const initial = parseFloat(initialInvestment.value);
  const monthly = parseFloat(monthlyContribution.value);
  const years = parseFloat(investmentPeriod.value);
  const annualReturn = parseFloat(expectedReturn.value) / 100;

  // Basic validation: if any input is invalid, clear outputs and exit
  if (isNaN(initial) || isNaN(monthly) || isNaN(years) || isNaN(annualReturn) || years <= 0) {
    totalValue.textContent = formatCurrency(0);
    totalInvestment.textContent = formatCurrency(0);
    totalReturn.textContent = formatCurrency(0);
    roiPercentage.textContent = `0.00%`;
    breakdownInitial.textContent = formatCurrency(0);
    breakdownContributions.textContent = formatCurrency(0);
    breakdownGrowth.textContent = formatCurrency(0);
    breakdownTotal.textContent = formatCurrency(0);
    conservativeValue.textContent = formatCurrency(0);
    moderateValue.textContent = formatCurrency(0);
    aggressiveValue.textContent = formatCurrency(0);
    conservativeLoss.textContent = formatCurrency(0);
    if (typeof aggressiveGain !== 'undefined' && aggressiveGain) aggressiveGain.textContent = formatCurrency(0);
    updateChart(0, 0, 0);
    return;
  }

  // Calculate future value using compound interest formula
  let futureValue = initial * Math.pow(1 + annualReturn, years);

  // Add monthly contributions (future value of an annuity)
  if (monthly > 0) {
    const monthlyRate = annualReturn / 12;
    const months = years * 12;
    if (monthlyRate !== 0) {
      futureValue += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      // No growth scenario for monthly contributions
      futureValue += monthly * months;
    }
  }

  const totalInvested = initial + monthly * 12 * years;
  const totalGain = futureValue - totalInvested;
  const roi = (totalGain / totalInvested) * 100;

  // Update results
  totalValue.textContent = formatCurrency(futureValue);
  totalInvestment.textContent = formatCurrency(totalInvested);
  totalReturn.textContent = formatCurrency(totalGain);
  roiPercentage.textContent = `${roi.toFixed(2)}%`;

  // Update breakdown
  breakdownInitial.textContent = formatCurrency(initial);
  breakdownContributions.textContent = formatCurrency(monthly * 12 * years);
  breakdownGrowth.textContent = formatCurrency(totalGain);
  breakdownTotal.textContent = formatCurrency(futureValue);

  // Update comparison scenarios
  calculateComparisonScenarios(initial, monthly, years);

  // Update chart
  updateChart(initial, monthly * 12 * years, totalGain);
}

// Calculate comparison scenarios
function calculateComparisonScenarios(initial, monthly, years) {
  const conservativeReturn = 0.04;
  const moderateReturn = parseFloat(expectedReturn.value) / 100;
  const aggressiveReturn = 0.12;

  // Calculate future values for each scenario
  let conservativeFV = initial * Math.pow(1 + conservativeReturn, years);
  let moderateFV = initial * Math.pow(1 + moderateReturn, years);
  let aggressiveFV = initial * Math.pow(1 + aggressiveReturn, years);

  // Add monthly contributions
  if (monthly > 0) {
    const conservativeMonthly = conservativeReturn / 12;
    const moderateMonthly = moderateReturn / 12;
    const aggressiveMonthly = aggressiveReturn / 12;
    const months = years * 12;

    if (conservativeMonthly !== 0) {
      conservativeFV +=
        monthly *
        ((Math.pow(1 + conservativeMonthly, months) - 1) / conservativeMonthly) *
        (1 + conservativeMonthly);
    } else {
      conservativeFV += monthly * months;
    }

    if (moderateMonthly !== 0) {
      moderateFV +=
        monthly * ((Math.pow(1 + moderateMonthly, months) - 1) / moderateMonthly) * (1 + moderateMonthly);
    } else {
      moderateFV += monthly * months;
    }

    if (aggressiveMonthly !== 0) {
      aggressiveFV +=
        monthly * ((Math.pow(1 + aggressiveMonthly, months) - 1) / aggressiveMonthly) * (1 + aggressiveMonthly);
    } else {
      aggressiveFV += monthly * months;
    }
  }

  // Update comparison values
  conservativeValue.textContent = formatCurrency(conservativeFV);
  moderateValue.textContent = formatCurrency(moderateFV);
  aggressiveValue.textContent = formatCurrency(aggressiveFV);

  // Calculate potential gains/losses
  const conservativeLossAmount = moderateFV - conservativeFV;
  const aggressiveGainAmount = aggressiveFV - moderateFV;

  conservativeLoss.textContent = formatCurrency(conservativeLossAmount);
  aggressiveGain.textContent = formatCurrency(aggressiveGainAmount);
}

// Update chart
function updateChart(initial, contributions, growth) {
  if (!chartCanvas || !chartCanvas.getContext) return;
  const ctx = chartCanvas.getContext('2d');

  // Clear Previous chart
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

  // Calculate percentages for chart (guard against zero total)
  const total = initial + contributions + growth;
  const initialPercent = total === 0 ? 0 : (initial / total) * 100;
  const contributionsPercent = total === 0 ? 0 : (contributions / total) * 100;
  const growthPercent = total === 0 ? 0 : (growth / total) * 100;

  // Draw chart
  const centerX = chartCanvas.width / 2;
  const centerY = chartCanvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  let startAngle = 0;

  // Initial investment segment
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, startAngle + (Math.PI * 2 * initialPercent) / 100);
  ctx.closePath();
  ctx.fillStyle = '#4361ee';
  ctx.fill();
  startAngle += (Math.PI * 2 * initialPercent) / 100;

  // Contribution segment
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, startAngle + (Math.PI * 2 * contributionsPercent) / 100);
  ctx.closePath();
  ctx.fillStyle = '#4895ef';
  ctx.fill();
  startAngle += (Math.PI * 2 * contributionsPercent) / 100;

  // Growth segment
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, startAngle + (Math.PI * 2 * growthPercent) / 100);
  ctx.closePath();
  ctx.fillStyle = '#4cc9f0';
  ctx.fill();

  // Draw center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  // Add text in center
  ctx.fillStyle = '#2b2d42';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ROI Breakdown', centerX, centerY);
}

// Event listeners
calculateBtn.addEventListener('click', calculateROI);
initialInvestment.addEventListener('input', calculateROI);
monthlyContribution.addEventListener('input', calculateROI);
investmentPeriod.addEventListener('input', calculateROI);
expectedReturn.addEventListener('input', calculateROI);

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}
updateYear();

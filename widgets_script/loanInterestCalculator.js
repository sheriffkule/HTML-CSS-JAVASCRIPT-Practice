// DOM Elements
const loanAmountInput = document.getElementById('loan-amount');
const loanAmountSlider = document.getElementById('loan-amount-slider');
const loanTermInput = document.getElementById('loan-term');
const loanTermSlider = document.getElementById('loan-term-slider');
const interestRateInput = document.getElementById('interest-rate');
const interestRateSlider = document.getElementById('interest-rate-slider');
const downPaymentInput = document.getElementById('down-payment');
const downPaymentSlider = document.getElementById('down-payment-slider');
const propertyTaxInput = document.getElementById('property-tax');
const insuranceInput = document.getElementById('insurance');
const paymentFrequencySelect = document.getElementById('payment-frequency');
const startDateInput = document.getElementById('start-date');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const calculateExtraBtn = document.getElementById('calculate-extra-btn');
const extraPaymentInput = document.getElementById('extra-payment');

// Result Elements
const monthlyPaymentEl = document.getElementById('monthly-payment');
const totalPaymentEl = document.getElementById('total-payment');
const totalInterestEl = document.getElementById('total-interest');
const payoffDateEl = document.getElementById('payoff-date');
const amortizationBody = document.getElementById('amortization-body');

// Summary Elements
const summaryLoanAmount = document.getElementById('summary-loan-amount');
const summaryDownPayment = document.getElementById('summary-down-payment');
const summaryInterestRate = document.getElementById('summary-interest-rate');
const summaryLoanTerm = document.getElementById('summary-loan-term');
const summaryTotalCost = document.getElementById('summary-total-cost');
const summaryRatio = document.getElementById('summary-ratio');

// Extra Payment Results
const newTermEl = document.getElementById('new-term');
const interestSavedEl = document.getElementById('interest-saved');

// Chart Elements
const chartPlaceholder = document.getElementById('chart-placeholder');
const paymentChartCanvas = document.getElementById('payment-chart');
let paymentChart = null;

// Tab Elements
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Notification Element
const notification = document.getElementById('notification');

// Set today's data as default start date
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
startDateInput.value = formattedDate;

// Sync sliders with input fields
loanAmountInput.addEventListener('input', () => {
  loanAmountSlider.value = loanAmountInput.value;
  calculateLoan();
});

loanAmountSlider.addEventListener('input', () => {
  loanAmountInput.value = loanAmountSlider.value;
  calculateLoan();
});

loanTermInput.addEventListener('input', () => {
  loanTermSlider.value = loanTermInput.value;
  calculateLoan();
});

loanTermSlider.addEventListener('input', () => {
  loanTermInput.value = loanTermSlider.value;
  calculateLoan();
});

interestRateInput.addEventListener('input', () => {
  interestRateSlider.value = interestRateInput.value;
  calculateLoan();
});

interestRateSlider.addEventListener('input', () => {
  interestRateInput.value = interestRateSlider.value;
  calculateLoan();
});

downPaymentInput.addEventListener('input', () => {
  downPaymentSlider.value = interestRateInput.value;
  calculateLoan();
});

downPaymentSlider.addEventListener('input', () => {
  downPaymentInput.value = downPaymentSlider.value;
  calculateLoan();
});

// Other input change events
propertyTaxInput.addEventListener('input', calculateLoan);
insuranceInput.addEventListener('input', calculateLoan);
paymentFrequencySelect.addEventListener('change', calculateLoan);
startDateInput.addEventListener('change', calculateLoan);

// Calculate button
calculateBtn.addEventListener('click', calculateLoan);

// Reset button
resetBtn.addEventListener('click', resetCalculator);

// Calculate extra payments
calculateExtraBtn.addEventListener('click', calculateExtraPayments);

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');

    // Update active tab
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Show active tab content
    tabContents.forEach((content) => {
      content.classList.remove('active');
      if (content.id === `${tabId}-tab`) {
        content.classList.add('active');
      }
    });
  });
});

// Initialize the calculator
function initCalculator() {
  calculateLoan();
}

// Main calculation function
function calculateLoan() {
  // Get input values
  const loanAmount = parseFloat(loanAmountInput.value) || 0;
  const loanTerm = parseInt(loanTermInput.value) || 0;
  const annualInterestRate = parseFloat(interestRateInput.value) || 0;
  const downPayment = parseFloat(downPaymentInput.value) || 0;
  const propertyTax = parseFloat(propertyTaxInput.value) || 0;
  const insurance = parseFloat(insuranceInput.value) || 0;
  const paymentFrequency = parseInt(paymentFrequencySelect.value);
  const startDate = new Date(startDateInput.value);

  // Calculate principal (loan amount minus down payment)
  const principal = loanAmount - downPayment;

  // Convert annual interest rate to monthly and adjust for payment frequency
  const monthlyInterestRate = annualInterestRate / 100 / (paymentFrequency / 12);

  // Calculate total number of payments
  const totalPayments = loanTerm * (paymentFrequency / 12) * 12;

  // Calculate monthly payments using the formula: P * r (1+r)^n / ((1+r)^n - 1)
  const monthlyPayment =
    (principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments))) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  // Calculate additional monthly costs (property tax and insurance)
  const additionalMonthlyCosts = (propertyTax + insurance) / 12;

  // Calculate total monthly payment
  const totalMonthlyPayment = monthlyPayment + additionalMonthlyCosts;

  // Calculate total payment over loan term
  const totalPayment = monthlyPayment * totalPayments;

  // Calculate total interest paid
  const totalInterest = totalPayment - principal;

  // Calculate payoff date
  const payoffDate = new Date(startDate);
  payoffDate.setFullYear(payoffDate.getFullYear() + loanTerm);

  // Update UI with results
  monthlyPaymentEl.textContent = `$${totalMonthlyPayment.toFixed(2)}`;
  totalPaymentEl.textContent = `$${Math.round(totalPayment + additionalMonthlyCosts * totalPayments).toLocaleString()}`;
  totalInterestEl.textContent = `$${Math.round(totalInterest).toLocaleString()}`;
  payoffDateEl.textContent = payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Update summary section
  summaryLoanAmount.textContent = `$${loanAmount.toLocaleString()}`;
  summaryDownPayment.textContent = `$${downPayment.toLocaleString()}`;
  summaryInterestRate.textContent = `${annualInterestRate}%`;
  summaryLoanTerm.textContent = `${loanTerm} Years`;
  summaryTotalCost.textContent = `$${Math.round(totalPayment + additionalMonthlyCosts * totalPayments).toLocaleString()}`;

  // Calculate interest to principal ratio
  const ratio = (totalInterest / principal).toFixed(1);
  summaryRatio.textContent = `$1:${ratio}`;

  // Generate amortization schedule
  generateAmortizationSchedule(principal, annualInterestRate, loanTerm, monthlyPayment, startDate);

  // Generate chart
  generateChart(principal, totalInterest, additionalMonthlyCosts * totalPayments);

  // Calculate extra payments
  calculateExtraPayments();

  // Show notification
  showNotification();
}

// Generate amortization schedule
function generateAmortizationSchedule(principal, annualInterestRate, loanTerm, monthlyPayment, startDate) {
  // Clear existing table rows
  amortizationBody.innerHTML = '';

  const monthlyRate = annualInterestRate / 100 / 12;
  let balance = principal;
  let cumulativeInterest = 0;

  // Generate year-by-year schedule
  for (let year = 1; year <= loanTerm; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    // Calculate for each month in the year
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;

      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;

      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
      cumulativeInterest += interestPayment;

      // Update balance
      balance -= principalPayment;
    }

    // Add row to table
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>Year ${year}</td>
      <td>$${Math.round(yearPrincipal).toLocaleString()}</td>
      <td>$${Math.round(yearInterest).toLocaleString()}</td>
      <td>$${Math.round(balance).toLocaleString()}</td>
      <td>$${Math.round(cumulativeInterest).toLocaleString()}</td>
    `;

    amortizationBody.appendChild(row);

    // If balance is paid off, break
    if (balance <= 0) break;
  }
}

// Generate chart
function generateChart(principal, totalInterest, additionalCosts) {
  // Destroy existing chart if it exist
  if (paymentChart) {
    paymentChart.destroy();
  }

  // Hide placeholder and show chart
  chartPlaceholder.style.display = 'none';
  paymentChartCanvas.style.display = 'block';

  // Create chart
  const ctx = paymentChartCanvas.getContext('2d');
  paymentChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest', 'Tax & Insurance'],
      dataset: [
        {
          data: [principal, totalInterest, additionalCosts],
          backgroundColor: ['rgb(67 97 238 / 0.8)', 'rgb(76 201 240 / 0.8)', 'rgb(58 12 163 / 0.8)'],
          borderColor: ['rgb(rgb(67 97 238 / 1)', 'rgb(76 201 240 / 1)', 'rgb(58 12 163 / 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 13,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.raw || '';
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: $${Math.round(value).toLocaleString()} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}

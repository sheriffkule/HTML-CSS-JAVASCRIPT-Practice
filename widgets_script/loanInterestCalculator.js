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
  calculateBtn();
});

loanTermSlider.addEventListener('input', () => {
  loanTermInput.value = loanTermSlider.value;
  calculateBtn();
});

interestRateInput.addEventListener('input', () => {
  interestRateSlider.value = interestRateInput.value;
  calculateBtn();
});

interestRateSlider.addEventListener('input', () => {
  interestRateInput.value = interestRateSlider.value;
  calculateBtn();
});

downPaymentInput.addEventListener('input', () => {
  downPaymentSlider.value = interestRateInput.value;
  calculateBtn();
});

downPaymentSlider.addEventListener('input', () => {
  downPaymentInput.value = downPaymentSlider.value;
  calculateBtn();
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

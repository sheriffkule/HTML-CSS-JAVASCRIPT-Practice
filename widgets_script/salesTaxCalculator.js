// DOM Elements
const amountInput = document.getElementById('amount');
const taxRateSlider = document.getElementById('tax-rate');
const taxRateValue = document.getElementById('tax-rate-value');
const taxRateAmount = document.getElementById('tax-rate-amount');
const taxPresets = document.querySelectorAll('.tax-preset');
const locationInput = document.getElementById('location');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');

// Result elements
const subtotalDisplay = document.getElementById('subtotal');
const taxRateDisplay = document.getElementById('tax-rate-display');
const taxAmountDisplay = document.getElementById('tax-amount');
const totalAmountDisplay = document.getElementById('total-amount');

// Chart bars
const subtotalBar = document.getElementById('subtotal-bar');
const taxBar = document.getElementById('tax-bar');
const totalBar = document.getElementById('total-bar');

// History elements
const historyContainer = document.getElementById('history-container');
const emptyHistory = document.getElementById('empty-history');

// Initialize tax calculation history from localStorage
let calculationHistory = JSON.parse(localStorage.getItem('taxCalculations')) || [];

// Update UI with history on load
updateHistoryDisplay();

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Calculate tax
function calculateTax() {
  const amount = parseFloat(amountInput.value) || 0;
  const taxRate = parseFloat(taxRateSlider.value) || 0;
  const location = locationInput.value.trim();

  // Calculate tax and total
  const taxAmount = amount * (taxRate / 100);
  const totalAmount = amount + taxAmount;

  // Updata displays
  subtotalDisplay.textContent = formatCurrency(amount);
  taxRateDisplay.textContent = `${taxRate.toFixed(1)}%`;
  taxAmountDisplay.textContent = formatCurrency(taxAmount);
  totalAmountDisplay.textContent = formatCurrency(taxAmount);

  // Update tax rate display
  const maxAmount = Math.max(amount, totalAmount);
  const subtotalPercent = (taxAmount / maxAmount) * 100;
  const taxPercent = (taxAmount / maxAmount) * 100;
  const totalPercent = (totalAmount / maxAmount) * 100;

  subtotalBar.style.height = `${subtotalPercent}%`;
  taxBar.style.height = `${taxPercent}%`;
  totalBar.style.height = `${totalPercent}`;

  // Save to history
  saveToHistory(amount, taxRate, taxAmount, totalAmount, location);

  // Update history display
  updateHistoryDisplay();
}

// Save calculation to history
function saveToHistory(amount, taxRate, taxAmount, totalAmount, location) {
  const calculation = {
    id: Date.now(),
    data: new Date().toLocaleString(),
    amount: amount,
    taxRate: taxRate,
    taxAmount: taxAmount,
    totalAmount: totalAmount,
    location: location || 'Not specified',
  };

  // Add to beginning of array
  calculationHistory.unshift(calculation);

  // Keep only last 10 calculations
  if (calculationHistory.length > 10) {
    calculationHistory = calculationHistory.slice(0, 10);
  }

  // Save to localStorage
  localStorage.setItem('taxCalculations', JSON.stringify(calculationHistory));
}

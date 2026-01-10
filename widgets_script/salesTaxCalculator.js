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
function calculateTax(saveHistory = true) {
  const amount = parseFloat(amountInput && amountInput.value ? amountInput.value : 0) || 0;
  const taxRate = parseFloat(taxRateSlider && taxRateSlider.value ? taxRateSlider.value : 0) || 0;
  const location = locationInput ? locationInput.value.trim() : '';

  // Calculate tax and total
  const taxAmount = amount * (taxRate / 100);
  const totalAmount = amount + taxAmount;

  // Update displays
  subtotalDisplay.textContent = formatCurrency(amount);
  taxRateDisplay.textContent = `${taxRate.toFixed(1)}%`;
  taxAmountDisplay.textContent = formatCurrency(taxAmount);
  totalAmountDisplay.textContent = formatCurrency(totalAmount);

  // Update tax rate display
  const maxAmount = Math.max(amount, totalAmount);
  const subtotalPercent = maxAmount === 0 ? 0 : (amount / maxAmount) * 100;
  const taxPercent = maxAmount === 0 ? 0 : (taxAmount / maxAmount) * 100;
  const totalPercent = maxAmount === 0 ? 0 : (totalAmount / maxAmount) * 100;

  if (subtotalBar) subtotalBar.style.height = `${subtotalPercent}%`;
  if (taxBar) taxBar.style.height = `${taxPercent}%`;
  if (totalBar) totalBar.style.height = `${totalPercent}%`;

  // Save and update history only when requested
  if (saveHistory) {
    saveToHistory(amount, taxRate, taxAmount, totalAmount, location);
    updateHistoryDisplay();
  }
}

// Save calculation to history
function saveToHistory(amount, taxRate, taxAmount, totalAmount, location) {
  const calculation = {
    id: Date.now(),
    date: new Date().toLocaleString(),
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

// Update history display
function updateHistoryDisplay() {
  // Clear current history display
  historyContainer.innerHTML = '';

  if (calculationHistory.length === 0) {
    // Show empty history message
    historyContainer.appendChild(emptyHistory);
    emptyHistory.style.display = 'block';
    return;
  }

  // Hide empty history message
  emptyHistory.style.display = 'none';

  // Add each history item
  calculationHistory.forEach((calc) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    historyItem.innerHTML = `
      <div class="history-amount">${formatCurrency(calc.totalAmount)}</div>
      <div class="history-details">
        <div>Subtotal: ${formatCurrency(calc.amount)}</div>
        <div>Tax: ${calc.taxRate.toFixed(1)}% (${formatCurrency(calc.taxAmount)})</div>
        <div>Location: ${calc.location}</div>
      </div>
      <div class="history-rate">${calc.date}</div>
    `;

    // Add click to reuse this calculation
    historyItem.addEventListener('click', () => {
      amountInput.value = calc.amount;
      taxRateSlider.value = calc.taxRate;
      locationInput.value = calc.location;

      // Update tax preset active state
      updateTaxPresetActiveState(calc.taxRate);

      // Trigger tax calculation
      calculateTax();
    });

    historyContainer.appendChild(historyItem);
  });
}

// Update tax preset active state
function updateTaxPresetActiveState(rate) {
  taxPresets.forEach((preset) => {
    const presetRate = parseFloat(preset.getAttribute('data-rate'));
    if (Math.abs(presetRate - rate) < 0.1) {
      preset.classList.add('active');
    } else {
      preset.classList.remove('active');
    }
  });
}

// Reset form
function resetForm() {
  amountInput.value = '100.00';
  taxRateSlider.value = '8.5';
  locationInput.value = '';

  // Reset tax preset active state
  taxPresets.forEach((preset) => {
    if (preset.getAttribute('data-rate') === '8.5') {
      preset.classList.add('active');
    } else {
      preset.classList.remove('active');
    }
  });

  // Recalculate
  calculateTax();
}

// Event listeners
if (calculateBtn) calculateBtn.addEventListener('click', calculateTax);
if (resetBtn) resetBtn.addEventListener('click', resetForm);

// Tax preset click handlers
taxPresets.forEach((preset) => {
  preset.addEventListener('click', () => {
    const rate = preset.getAttribute('data-rate');
    taxRateSlider.value = rate;

    // Update active state
    taxPresets.forEach((p) => p.classList.remove('active'));
    preset.classList.add('active');

    // Recalculate
    calculateTax();
  });
});

// Update tax preview when amount or slider changes
function updateTaxPreview() {
  const amount = parseFloat(amountInput && amountInput.value ? amountInput.value : 0) || 0;
  const rate = parseFloat(taxRateSlider && taxRateSlider.value ? taxRateSlider.value : 0) || 0;
  if (taxRateValue) taxRateValue.textContent = `${rate.toFixed(1)}%`;
  if (taxRateAmount) taxRateAmount.textContent = formatCurrency(amount * (rate / 100));
}

// Hook up preview handlers
if (taxRateSlider) taxRateSlider.addEventListener('input', updateTaxPreview);
if (amountInput) amountInput.addEventListener('input', updateTaxPreview);

// Initialize preview
updateTaxPreview();

// Render initial values without saving history
calculateTax(false);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to calculate
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    calculateTax();
  }

  // Escape to reset
  if (e.key === 'Escape') {
    resetForm();
  }
});

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

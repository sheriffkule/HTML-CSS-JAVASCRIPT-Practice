document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const initialInvestmentInput = document.getElementById('initialInvestment');
  const discountRateInput = document.getElementById('discountRate');
  const cashFlowTypeSelect = document.getElementById('cashFlowType');
  const annualCashFlowInput = document.getElementById('annualCashFlow');
  const unequalCashFlowSection = document.getElementById('unequalCashFlowSection');
  const equalCashFlowSection = document.getElementById('equalCashFlowSection');
  const cashFLowInputs = document.getElementById('cashFLowInputs');
  const addYearBtn = document.getElementById('addYearBtn');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const paybackPeriodResult = document.getElementById('paybackPeriodResult');
  const discountedPaybackPeriodResult = document.getElementById('discountedPaybackPeriodResult');
  const paybackPeriodDescription = document.getElementById('paybackPeriodDescription');
  const cashFlowTableBody = document.getElementById('cashFlowTableBody');
  const chartCanvas = document.getElementById('chartCanvas');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Error elements
  const initialInvestmentError = document.getElementById('initialInvestmentError');
  const annualCashFlowError = document.getElementById('annualCashFlowError');
  const yearCashFlowError = document.getElementById('yearCashFlowError');

  // Chart variables
  let paybackChart = null;

  // Event listeners
  cashFlowTypeSelect.addEventListener('change', toggleCashFlowType);
  addYearBtn.addEventListener('click', addYearInput);
  calculateBtn.addEventListener('click', calculatePaybackPeriod);
  resetBtn.addEventListener('click', resetCalculator);

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
    });
  });

  // Functions
  function toggleCashFlowType() {
    if (cashFlowTypeSelect.value === 'equal') {
      equalCashFlowSection.style.display = 'block';
      unequalCashFlowSection.style.display = 'none';
    } else {
      equalCashFlowSection.style.display = 'none';
      unequalCashFlowSection.style.display = 'block';
    }
  }

  function addYearInput() {
    const yearCount = document.querySelectorAll('.yearly-cashflow-input').length + 1;
    const newYearInput = document.createElement('div');
    newYearInput.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
        <input
          type="number"
          class="yearly-cashflow-input"
          placeholder="Year ${yearCount}"
          data-year="${yearCount}"
          step="100"
          style="flex: 1;" />
        <button type="button" class="remove-year-btn" title="Remove"><i class="fas fa-minus"></i></button>
      </div>
    `;
    cashFLowInputs.appendChild(newYearInput);

    // Add event listener to the remove button
    const removeBtn = newYearInput.querySelector('.remove-year-btn');
    removeBtn.addEventListener('click', function () {
      cashFLowInputs.removeChild(newYearInput);
      // Reset all placeholders to maintain order
      const allInputs = document.querySelectorAll('.yearly-cashflow-input');
      allInputs.forEach((input, index) => {
        input.placeholder = `Year ${index + 1}`;
        input.dataset.year = index + 1;
      });
    });
  }

  function validateInputs() {
    let isValid = true;

    // Validate initial investment
    if (!initialInvestmentInput.value || parseFloat(initialInvestmentInput) <= 0) {
      initialInvestmentInput.parentElement.classList.add('has-error');
      initialInvestmentError.style.display = 'block';
    } else {
      initialInvestmentInput.parentElement.classList.remove('has-error');
      initialInvestmentError.style.display = 'none';
    }

    // Validate cash flows based on type
    if (cashFlowTypeSelect.value === 'equal') {
      if (!annualCashFlowInput.value || parseFloat(annualCashFlowInput.value) <= 0) {
        annualCashFlowInput.parentElement.classList.add('has-error');
        annualCashFlowError.style.display = 'block';
      } else {
        annualCashFlowInput.parentElement.classList.remove('has-error');
        annualCashFlowError.style.display = 'none';
      }
    } else {
      const yearlyInputs = document.querySelectorAll('.yearly-cashflow-input');
      let hasError = false;

      yearlyInputs.forEach((input) => {
        if (!input.value) {
          input.parentElement.classList.add('has-error');
          hasError = true;
        } else {
          input.parentElement.classList.remove('has-error');
        }
      });

      if (hasError || yearlyInputs.length === 0) {
        yearCashFlowError.style.display = 'block';
        isValid = false;
      } else {
        yearCashFlowError.style.display = 'none';
      }
    }

    return isValid;
  }
});

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
  const discountedPaybackPeriodDescription = document.getElementById('discountedPaybackPeriodDescription');
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

  function calculatePaybackPeriod() {
    if (!validateInputs()) return;

    const initialInvestment = parseFloat(initialInvestmentInput.value);
    const discountRate = parseFloat(discountRateInput.value) / 100;
    let cashFlows = [];
    let years = [];

    if (cashFlowTypeSelect.value === 'equal') {
      const annualCashFlow = parseFloat(annualCashFlowInput.value);
      // Generate enough years to cover payback (plus a few extra)
      const estimatedYears = Math.ceil(initialInvestment / annualCashFlow) + 3;
      for (let i = 1; i <= estimatedYears; i++) {
        years.push(i);
        cashFlows.push(annualCashFlow);
      }
    } else {
      const yearlyInputs = document.querySelectorAll('.yearly-cashflow-input');
      yearlyInputs.forEach((input) => {
        years.push(parseInt(input.dataset.year));
        cashFlows.push(parseFloat(input.value));
      });
    }

    // Calculate cumulative cash flows
    let cumulativeCashFlow = 0;
    let cumulativeDiscountCashFlow = 0;
    let paybackPeriod = null;
    let discountPaybackPeriod = null;
    let cashFlowData = [];

    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      const cashFlow = cashFlows[i];
      const discountedCashFlow = cashFlow / Math.pow(1 + discountRate, year);

      cumulativeCashFlow += cashFlow;
      cumulativeDiscountCashFlow += discountedCashFlow;

      // Check for payback period
      if (paybackPeriod === null && cumulativeCashFlow >= initialInvestment) {
        const previousCumulative = cumulativeCashFlow - cashFlow;
        const fraction = (initialInvestment - previousCumulative) / cashFlow;
        paybackPeriod = i + fraction;
      }

      // Check for discounted payback period
      if (
        discountRate > 0 &&
        discountPaybackPeriod === null &&
        cumulativeDiscountCashFlow >= initialInvestment
      ) {
        const previousDiscountedCumulative = cumulativeDiscountCashFlow - discountedCashFlow;
        const fraction = (initialInvestment - previousDiscountedCumulative) / discountedCashFlow;
        discountPaybackPeriod = i + fraction;
      }

      cashFlowData.push({
        year,
        cashFlow,
        cumulative: Math.min(cumulativeCashFlow, initialInvestment * 2), // Cap for display
        discountedCashFlow,
        discountedCumulative: Math.min(cumulativeDiscountCashFlow, initialInvestment * 2), // Cap for display
      });
    }

    // Display results
    if (paybackPeriod !== null) {
      paybackPeriodResult.textContent = paybackPeriod.toFixed(2) + 'years';
      paybackPeriodDescription.textContent = `The investment will be recovered in approximately
      ${Math.floor(paybackPeriod)} years and ${Math.round((paybackPeriod % 1) * 12)} months.`;
    } else {
      paybackPeriodResult.textContent = '> ' + years.length + ' years';
      paybackPeriodDescription.textContent =
        'The investment is not recovered within the specified time frame.';
    }

    if (discountRate > 0) {
      if (discountPaybackPeriod !== null) {
        discountedPaybackPeriodResult.textContent = discountPaybackPeriod.toFixed(2) + ' years';
        discountedPaybackPeriodDescription.textContent =
          'The investment is not recovered within the specified time frame when considering the time value of money.';
      }
    } else {
      discountedPaybackPeriodResult.textContent = 'N/A';
      discountedPaybackPeriodDescription.textContent =
        'Enter a discount rate > 0 to calculate discounted payback period';
    }

    // Update cash flow table
    updateCashFlowTable(cashFlowData, initialInvestment);

    // Update chart
    updateChart(cashFlowData, initialInvestment, paybackPeriod, discountPaybackPeriod);
  }

  function updateCashFlowTable(data, initialInvestment) {
    cashFlowTableBody.innerHTML = '';

    if (data.length === 0) {
      cashFlowTableBody.innerHTML =
        '<tr><td colspan="5" style="text-align: center;">No data available</td></tr>';
      return;
    }

    data.forEach((item) => {
      const row = document.createElement('tr');

      // Highlight the row where payback occurs
      const isPaybackYear =
        item.cumulative >= initialInvestment && item.cumulative - item.cashFlow < initialInvestment;
      const isDiscountedPaybackYear =
        item.discountedCumulative >= initialInvestment &&
        item.discountedCumulative - item.discountedCashFlow < initialInvestment;

      if (isPaybackYear || isDiscountedPaybackYear) {
        row.style.backgroundColor;
        row.style.fontWeight = 'bold';
      }

      row.innerHTML = `
        <td>${item.year}</td>
        <td>${item.cashFlow.toLocalString('en-US', { maximumFractionDigits: 2 })}</td>
        <td>${item.cumulative.toLocalString('en-US', { maximumFractionDigits: 2 })}</td>
        <td>${item.discountedCashFlow.toLocalString('en-US', { maximumFractionDigits: 2 })}</td>
        <td>${item.discountedCumulative.toLocalString('en-US', { maximumFractionDigits: 2 })}</td>
      `;
      cashFlowTableBody.appendChild(row)
    });
  }
});

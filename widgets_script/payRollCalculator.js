// DOM Elements
const hourlyToggle = document.getElementById('hourlyToggle');
const salaryToggle = document.getElementById('salaryToggle');
const hourlyInputs = document.getElementById('hourlyInputs');
const payRateInput = document.getElementById('payRate');
const hoursWorkedInput = document.getElementById('hoursWorked');
const overtimeHoursInput = document.getElementById('overtimeHours');
const payPeriodSelect = document.getElementById('payPeriod');
const federalTaxInput = document.getElementById('federalTax');
const stateTaxInput = document.getElementById('stateTax');
const socialSecurityInput = document.getElementById('socialSecurity');
const medicareInput = document.getElementById('medicare');
const retirementInput = document.getElementById('retirement');
const healthInsuranceInput = document.getElementById('healthInsurance');
const hasBonusCheckbox = document.getElementById('hasBonus');
const bonusContainer = document.getElementById('bonusContainer');
const bonusAmountInput = document.getElementById('bonusAmount');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const saveBtn = document.getElementById('saveBtn');
const exportBtn = document.getElementById('exportBtn');
const grossPayElement = document.getElementById('grossPay');
const netPayElement = document.getElementById('netPay');
const totalTaxesElement = document.getElementById('totalTaxes');
const totalDeductionsElement = document.getElementById('totalDeduction');
const regularPayElement = document.getElementById('regularPay');
const overtimePayElement = document.getElementById('overtimePay');
const bonusPayElement = document.getElementById('bonusPay');
const federalTaxAmountElement = document.getElementById('federalTaxAmount');
const stateTaxAmountElement = document.getElementById('stateTaxAmount');
const socialSecurityAmountElement = document.getElementById('socialSecurityAmount');
const medicareAmountElement = document.getElementById('medicareAmount');
const retirementAmountElement = document.getElementById('retirementAmount');
const healthInsuranceAmountElement = document.getElementById('healthInsuranceAmount');
const netPaySummaryElement = document.getElementById('netPaySummary');
const notification = document.getElementById('notification');

// Toggle between hourly and salary
hourlyToggle.addEventListener('click', () => {
  hourlyToggle.classList.add('active');
  salaryToggle.classList.remove('active');
  hourlyInputs.style.display = 'block';
  payRateInput.placeholder = '0.00';
  document.querySelector('label[for="payRate"]').innerHTML =
    'Hourly Rate ($) <span class="tooltip"><i class="fa-solid fa-info"></i><span class="tooltip-text">Enter hourly rate</span></span>';
});

salaryToggle.addEventListener('click', () => {
  salaryToggle.classList.add('active');
  hourlyToggle.classList.remove('active');
  hourlyInputs.style.display = 'none';
  payRateInput.placeholder = '50000';
  document.querySelector('label[for="payRate"]').innerHTML =
    'Annual Salary ($) <span class="tooltip"><i class="fa-solid fa-info"></i><span class="tooltip-text">Enter annual salary</span></span>';
});

// Toggle bonus input
hasBonusCheckbox.addEventListener('change', () => {
  bonusContainer.style.display = hasBonusCheckbox.checked ? 'block' : 'none';
});

// Calculate payroll
calculateBtn.addEventListener('click', calculatePayroll);

function calculatePayroll() {
  // Get input values
  const isHourly = hourlyToggle.classList.contains('active');
  const payRate = parseFloat(payRateInput.value) || 0;
  const hoursWorked = parseFloat(hoursWorkedInput.value) || 0;
  const overtimeHours = parseFloat(overtimeHoursInput.value) || 0;
  const payPeriod = payPeriodSelect.value;
  const federalTaxRate = parseFloat(federalTaxInput.value) || 0;
  const stateTaxRate = parseFloat(stateTaxInput.value) || 0;
  const socialSecurityRate = parseFloat(socialSecurityInput.value) || 0;
  const medicareRate = parseFloat(medicareInput.value) || 0;
  const retirementRate = parseFloat(retirementInput.value) || 0;
  const healthInsurance = parseFloat(healthInsuranceInput.value) || 0;
  const hasBonus = hasBonusCheckbox.checked;
  const bonusAmount = parseFloat(bonusAmountInput.value) || 0;

  // Calculate gross pay
  let grossPay = 0;

  if (isHourly) {
    // Hourly calculation (derive weekly earnings first, then scale by pay period)
    const regularHours = Math.min(hoursWorked, 40);
    const overtimeRate = payRate * 1.5;

    const weeklyGross = regularHours * payRate + overtimeHours * overtimeRate;

    // Scale weekly gross to selected pay period
    if (payPeriod === 'weekly') {
      grossPay = weeklyGross;
    } else if (payPeriod === 'biweekly') {
      grossPay = weeklyGross * 2;
    } else if (payPeriod === 'semimonthly') {
      grossPay = (weeklyGross * 52) / 24;
    } else if (payPeriod === 'monthly') {
      grossPay = (weeklyGross * 52) / 12;
    } else {
      grossPay = weeklyGross;
    }
  } else {
    // Salary calculation
    if (payPeriod === 'weekly') {
      grossPay = payRate / 52;
    } else if (payPeriod === 'biweekly') {
      grossPay = payRate / 26;
    } else if (payPeriod === 'semimonthly') {
      grossPay = payRate / 24;
    } else if (payPeriod === 'monthly') {
      grossPay = payRate / 12;
    }
  }

  // add bonus if applicable
  if (hasBonus) {
    grossPay += bonusAmount;
  }

  // calculate deductions
  const federalTaxAmount = grossPay * (federalTaxRate / 100);
  const stateTaxAmount = grossPay * (stateTaxRate / 100);
  const socialSecurityAmount = grossPay * (socialSecurityRate / 100);
  const medicareAmount = grossPay * (medicareRate / 100);
  const retirementAmount = grossPay * (retirementRate / 100);

  const totalTaxes = federalTaxAmount + stateTaxAmount + socialSecurityAmount + medicareAmount;
  const totalDeductions = totalTaxes + retirementAmount + healthInsurance;

  // Calculate net pay
  const netPay = grossPay - totalDeductions;

  // Update UI with results
  grossPayElement.textContent = `$${grossPay.toFixed(2)}`;
  netPayElement.textContent = `$${netPay.toFixed(2)}`;
  totalTaxesElement.textContent = `$${totalTaxes.toFixed(2)}`;
  totalDeductionsElement.textContent = `$${totalDeductions.toFixed(2)}`;

  // Update summary
  if (isHourly) {
    const regularHours = Math.min(hoursWorked, 40);
    const overtimeRate = payRate * 1.5;

    // Determine multiplier to convert weekly amounts into the selected pay period
    let periodMultiplier = 1;
    if (payPeriod === 'biweekly') periodMultiplier = 2;
    else if (payPeriod === 'semimonthly') periodMultiplier = 52 / 24;
    else if (payPeriod === 'monthly') periodMultiplier = 52 / 12;

    regularPayElement.textContent = `$${(regularHours * payRate * periodMultiplier).toFixed(2)}`;
    overtimePayElement.textContent = `$${(overtimeHours * overtimeRate * periodMultiplier).toFixed(2)}`;
  } else {
    regularPayElement.textContent = `$${grossPay.toFixed(2)}`;
    overtimePayElement.textContent = '$0.00';
  }

  bonusPayElement.textContent = `$${hasBonus ? bonusAmount.toFixed(2) : '0.00'}`;
  federalTaxAmountElement.textContent = `$${federalTaxAmount.toFixed(2)}`;
  stateTaxAmountElement.textContent = `$${stateTaxAmount.toFixed(2)}`;
  socialSecurityAmountElement.textContent = `$${socialSecurityAmount.toFixed(2)}`;
  medicareAmountElement.textContent = `$${medicareAmount.toFixed(2)}`;
  retirementAmountElement.textContent = `$${retirementAmount.toFixed(2)}`;
  healthInsuranceAmountElement.textContent = `$${healthInsurance.toFixed(2)}`;
  netPaySummaryElement.textContent = `$${netPay.toFixed(2)}`;
}

// Reset form
resetBtn.addEventListener('click', resetForm);

function resetForm() {
  payRateInput.value = '';
  hoursWorkedInput.value = '40';
  overtimeHoursInput.value = '0';
  payPeriodSelect.value = 'biweekly';
  federalTaxInput.value = '10';
  stateTaxInput.value = '5';
  socialSecurityInput.value = '6.2';
  medicareInput.value = '1.45';
  retirementInput.value = '5';
  healthInsuranceInput.value = '100';
  hasBonusCheckbox.checked = false;
  bonusContainer.style.display = 'none';
  bonusAmountInput.value = '';

  // Reset results
  grossPayElement.textContent = '$0.00';
  netPayElement.textContent = '$0.00';
  totalTaxesElement.textContent = '$0.00';
  totalDeductionsElement.textContent = '$0.00';

  // Reset summary
  regularPayElement.textContent = '$0.00';
  overtimePayElement.textContent = '$0.00';
  bonusPayElement.textContent = '$0.00';
  federalTaxAmountElement.textContent = '$0.00';
  stateTaxAmountElement.textContent = '$0.00';
  socialSecurityAmountElement.textContent = '$0.00';
  medicareAmountElement.textContent = '$0.00';
  retirementAmountElement.textContent = '$0.00';
  healthInsuranceAmountElement.textContent = '$0.00';
  netPaySummaryElement.textContent = '$0.00';
}

// Save calculation
saveBtn.addEventListener('click', saveCalculation);

function saveCalculation() {
  const grossPay = grossPayElement ? grossPayElement.textContent : '$0.00';

  if (grossPay === '$0.00') {
    alert('Please calculate payroll before saving.');
    return;
  }

  // Show notification if available
  if (notification) {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  } else {
    // Fallback feedback
    alert('Calculation saved.');
  }
} 

// Export as PDF
exportBtn.addEventListener('click', exportAsPDF);

function exportAsPDF() {
  // In a real app, you would use a PDF generation library
  alert(
    'PDF export functionality would be implemented here. In a real application, this would generate a PDF report of the payroll calculation.'
  );
}

// update year in footer
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

// Initialize the app
function initApp() {
  // Set default values
  hoursWorkedInput.value = '40';
  federalTaxInput.value = '10';
  stateTaxInput.value = '5';
  retirementInput.value = '5';
  healthInsuranceInput.value = '100';
}

// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', initApp);

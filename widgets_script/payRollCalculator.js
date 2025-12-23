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
const totalDeductionsElement = document.getElementById('totalDeductions');
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
  salaryToggle.classList.add('active');
  hourlyInputs.style.display = 'block';
  payRateInput.placeholder = '0.00';
  document.querySelector('label[for="payRate"]').innerHTML =
    'Hourly Rate ($) <span class="tooltip">i class="fa-solid fa-info"></i><span class="tooltip-text">Enter hourly rate</span></span>';
});

salaryToggle.addEventListener('click', () => {
  salaryToggle.classList.add('active');
  hourlyToggle.classList.remove('active');
  hourlyInputs.style.display = 'none';
  payRateInput.placeholder = '50000';
  document.querySelector('label[for="payRate"]').innerHTML =
    'Annual Salary ($) <span class="tooltip">i class="fa-solid fa-info"></i><span class="tooltip-text">Enter hourly rate</span></span>';
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
    // Hourly calculation
    const regularHours = Math.min(hoursWorked, 40);
    const overtimeRate = payRate * 1.5;

    grossPay = regularHours * payRate + overtimeHours * overtimeRate;

    // Adjust for pay period
    if (payPeriod === 'biweekly') {
      grossPay *= 2;
    } else if (payPeriod === 'semimonthly') {
      grossPay = (payRate * 40 * 52) / 24;
    } else if (payPeriod === 'monthly') {
      grossPay = (payRate * 40 * 52) / 12;
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
}

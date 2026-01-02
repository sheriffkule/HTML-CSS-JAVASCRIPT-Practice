// DOM Elements
const numerator1Input = document.getElementById('numerator1');
const denominator1Input = document.getElementById('denominator1');
const numerator2Input = document.getElementById('numerator2');
const denominator2Input = document.getElementById('denominator2');
const operationButtons = document.querySelectorAll('.operation-btn');
const calculateButton = document.getElementById('calculate-btn');
const clearButton = document.getElementById('clear-btn');
const clearHistoryButton = document.getElementById('clear-history');

// Result elements
const resultFractionElement = document.getElementById('result-fraction');
const resultDecimalElement = document.getElementById('result-decimal');
const resultPercentageElement = document.getElementById('result-percentage');
const simplifiedResultElement = document.getElementById('simplified-result');
const mixedNumberElement = document.getElementById('mixed-number');

// Visualization elements
const fraction1Label = document.getElementById('fraction1-label');
const fraction2Label = document.getElementById('fraction2-label');
const fraction1Bar = document.getElementById('fraction1-bar');
const fraction2Bar = document.getElementById('fraction2-bar');
const resultBar = document.getElementById('result-bar');
const fraction1Value = document.getElementById('fraction1-value');
const fraction2Value = document.getElementById('fraction2-value');
const resultValue = document.getElementById('result-value');

// History elements
const historyList = document.getElementById('history-list');

// State variables
let currentOperation = 'add';
let calculationHistory = [];

// Initialize the app
function init() {
  // Set active operation button
  operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      operationButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      currentOperation = button.dataset.operation;
      calculate();
    });
  });

  // Add event listeners to inputs
  [numerator1Input, denominator1Input, numerator2Input, denominator2Input].forEach((input) => {
    input.addEventListener('input', calculate);
  });

  // Add event listeners to buttons
  calculateButton.addEventListener('click', calculate);
  clearButton.addEventListener('click', clearInputs);
  clearHistoryButton.addEventListener('click', clearHistory);

  // Load history form localStorage
  loadHistory();

  // Perform initial calculation
  calculate();
}

// Greatest Common Divisor function
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Simplify fraction
function simplifyFraction(numerator, denominator) {
  if (denominator === 0) return { numerator: 0, denominator: 0 };

  const divisor = gcd(numerator, denominator);
  let n = numerator / divisor;
  let d = denominator / divisor;

  // Ensure denominator is positive
  if (d < 0) {
    n = -n;
    d = -d;
  }

  return { numerator: n, denominator: d };
} 

// Convert to mixed number
function toMixedNumber(numerator, denominator) {
  if (denominator === 0) return 'Undefined';

  const whole = Math.trunc(numerator / denominator);
  const remainder = Math.abs(numerator - whole * denominator);

  if (remainder === 0) {
    return whole.toString();
  } else if (whole === 0) {
    // keep sign for proper fractions
    return `${numerator < 0 ? '-' : ''}${remainder}/${Math.abs(denominator)}`;
  } else {
    return `${whole} ${remainder}/${Math.abs(denominator)}`;
  }
} 

// Perform calculation based on selected operation
function calculate() {
  // Get input values
  const num1 = parseInt(numerator1Input.value) || 0;
  const den1 = parseInt(denominator1Input.value) || 0;
  const num2 = parseInt(numerator2Input.value) || 0;
  const den2 = parseInt(denominator2Input.value) || 0;

  let resultNumerator;
  let resultDenominator;

  // Perform the selected operation
  switch (currentOperation) {
    case 'add':
      resultNumerator = num1 * den2 + num2 * den1;
      resultDenominator = den1 * den2;
      break;
    case 'subtract':
      resultNumerator = num1 * den2 - num2 * den1;
      resultDenominator = den1 * den2;
      break;
    case 'multiply':
      resultNumerator = num1 * num2;
      resultDenominator = den1 * den2;
      break;
    case 'divide':
      resultNumerator = num1 * den2;
      resultDenominator = den1 * num2;
      break;
    default:
      resultNumerator = 0;
      resultDenominator = 1;
  }

  // handle division by zero
  if (resultDenominator === 0) {
    resultFractionElement.textContent = 'Undefined';
    resultDecimalElement.textContent = 'Undefined';
    resultPercentageElement.textContent = 'Undefined';
    simplifiedResultElement.textContent = 'Undefined';
    mixedNumberElement.textContent = 'Undefined';

    // Update visualization
    updateVisualization(num1, den1, num2, den2, 0, 1);
    return;
  }

  // Simplify result
  const simplified = simplifyFraction(resultNumerator, resultDenominator);

  // Calculate decimal and percentage
  const decimalValue = resultNumerator / resultDenominator;
  const percentageValue = decimalValue * 100;

  // Update result display
  resultFractionElement.textContent = `${resultNumerator}/${resultDenominator}`;
  resultDecimalElement.textContent = decimalValue.toFixed(4);
  resultPercentageElement.textContent = `${percentageValue.toFixed(2)}%`;

  // Update simplified result and mixed number
  simplifiedResultElement.textContent = simplified.denominator === 0 ? 'Undefined' : `${simplified.numerator}/${simplified.denominator}`;
  mixedNumberElement.textContent = toMixedNumber(simplified.numerator, simplified.denominator);

  // Update visualization
  updateVisualization(num1, den1, num2, den2, resultNumerator, resultDenominator);

  // Add to history
  addToHistory(num1, den1, num2, den2, currentOperation, resultNumerator, resultDenominator);
}

// Note: append '%' to percentage display (handled after this function)


// Update visualization bars
function updateVisualization(num1, den1, num2, den2, resultNum, resultDen) {
  // Calculate percentages for visualization (clamped 0-100 for display)
  const perc1 = den1 !== 0 ? Math.min(Math.max((num1 / den1) * 100, 0), 100) : 0;
  const perc2 = den2 !== 0 ? Math.min(Math.max((num2 / den2) * 100, 0), 100) : 0;
  const percResult = resultDen !== 0 ? Math.min(Math.max((resultNum / resultDen) * 100, 0), 100) : 0;

  // Update labels
  fraction1Label.textContent = den1 !== 0 ? `${num1}/${den1}` : 'Undefined';
  fraction2Label.textContent = den2 !== 0 ? `${num2}/${den2}` : 'Undefined';

  // Update bar widths with animation
  fraction1Bar.style.width = `${perc1}%`;
  fraction2Bar.style.width = `${perc2}%`;
  resultBar.style.width = `${percResult}%`;

  // Update percentage text values
  fraction1Value.textContent = `${perc1.toFixed(1)}%`;
  fraction2Value.textContent = `${perc2.toFixed(1)}%`;
  resultValue.textContent = `${percResult.toFixed(1)}%`;
} 

// Add calculation to history
function addToHistory(num1, den1, num2, den2, operation, resultNum, resultDen) {
  // Create operation symbol
  let operationSymbol;
  switch (operation) {
    case 'add':
      operationSymbol = '+';
      break;
    case 'subtract':
      operationSymbol = '-';
      break;
    case 'multiply':
      operationSymbol = 'x';
      break;
    case 'divide':
      operationSymbol = '/';
      break;
  }

  // Create history item
  const historyItem = {
    id: Date.now(),
    equation: `${num1}/${den1} ${operationSymbol} ${num2}/${den2}`,
    result: `${resultNum}/${resultDen}`,
  };

  // Add to beginning of history array
  calculationHistory.unshift(historyItem);

  // Keep only last 10 items
  if (calculationHistory.length > 10) {
    calculationHistory = calculationHistory.slice(0, 10);
  }

  // Update history display
  updateHistoryDisplay();

  // Save to localStorage
  saveHistory();
}

// Update history display
function updateHistoryDisplay() {
  // Clear current history display
  historyList.innerHTML = '';

  // Add each history item
  calculationHistory.forEach((item) => {
    const historyItemElement = document.createElement('div');
    historyItemElement.className = 'history-item';
    historyItemElement.innerHTML = `
      <div class="history-equation">${item.equation}</div>
      <div class="history-result">${item.result}</div>
    `;
    historyList.appendChild(historyItemElement);
  });

  // If no history, show message
  if (calculationHistory.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'history-item';
    emptyMessage.innerHTML = '<div class="history-equation">No calculations yet</div>';
    historyList.appendChild(emptyMessage);
  }
}

// Clear inputs
function clearInputs() {
  numerator1Input.value = '3';
  denominator1Input.value = '4';
  numerator2Input.value = '1';
  denominator2Input.value = '2';

  // Reset operation to addition
  operationButtons.forEach((btn) => btn.classList.remove('active'));
  operationButtons[0].classList.add('active');
  currentOperation = 'add';

  // Recalculate
  calculate();
}

// Clear history
function clearHistory() {
  calculationHistory = [];
  updateHistoryDisplay();
  saveHistory();
}

// Save history to localStorage
function saveHistory() {
  localStorage.setItem('fractionCalcHistory', JSON.stringify(calculationHistory));
}

// Load history from localStorage
function loadHistory() {
  const savedHistory = localStorage.getItem('fractionCalcHistory');
  if (savedHistory) {
    calculationHistory = JSON.parse(savedHistory);
    updateHistoryDisplay();
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);

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

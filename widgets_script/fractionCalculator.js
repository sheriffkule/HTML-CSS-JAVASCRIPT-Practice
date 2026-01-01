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
  operationButtons
    .forEach((button) => {
      button.addEventListener('click', () => {
        operationButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        currentOperation = button.dataset.operation;
        calculate();
      });
    })

    [
      // Add event listeners to inputs
      (numerator1Input, denominator1Input, numerator2Input, denominator2Input)
    ].forEach((input) => {
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
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
}

// Convert to mixed number
function toMixedNumber(numerator, denominator) {
  if (denominator === 0) return 'Undefined';

  const whole = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;

  if (remainder === 0) {
    return whole.toString();
  } else if (whole === 0) {
    return `${remainder}/${denominator}`;
  } else {
    return `${whole} ${remainder}/${denominator}`;
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
  resultPercentageElement.textContent = `${percentageValue.toFixed(2)}`;

  // Update simplified result and mixed number
  simplifiedResultElement.textContent = `${simplified.numerator}/${simplified.denominator}`;
  mixedNumberElement.textContent = toMixedNumber(simplified.numerator, simplified.denominator);

  // Update visualization
  updateVisualization(num1, den1, num2, den2, resultNumerator, resultDenominator);

  // Add to history
  addToHistory(num1, den1, num2, den2, currentOperation, resultNumerator, resultDenominator);
}

// Update visualization bars
function updateVisualization(num1, den1, num2, den2, resultNum, resultDen) {
  // Calculate percentages for visualization
  const fraction1Value = den1 !== 0 ? (num1 / den1) * 100 : 0;
  const fraction2Value = den2 !== 0 ? (num2 / den2) * 100 : 0;
  const resultValue = resultDen !== 0 ? (resultNum / resultDen) * 100 : 0;

  // Update labels
  fraction1Label.textContent = `${num1}/${den1}`;
  fraction2Label.textContent = `${num2}/${den2}`;

  // Update bar widths with animation
  fraction1Bar.style.width = `${fraction1Value}%`;
  fraction2Bar.style.width = `${fraction2Value}%`;
  resultBar.style.width = `${resultValue}%`;

  // Update percentage values
  fraction1Value.textContent = `${fraction1Value.toFixed(1)}`;
  fraction2Value.textContent = `${fraction2Value.toFixed(1)}`;
  resultValue.textContent = `${resultValue.toFixed(1)}%`;
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

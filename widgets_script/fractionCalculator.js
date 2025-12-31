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

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

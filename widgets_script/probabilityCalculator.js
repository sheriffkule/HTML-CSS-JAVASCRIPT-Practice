// DOM Elements
const calcTypeButtons = document.querySelectorAll('.calc-btn');
const calcForms = document.querySelectorAll('.calc-form');
const calculateBtn = document.getElementById('calculate-btn');
const probabilityResult = document.getElementById('probability-result');
const percentageResult = document.getElementById('percentage-result');
const probabilityBar = document.getElementById('probability-bar');
const resultDescription = document.getElementById('result-description');
const formulaText = document.getElementById('formula-text');
const explanationText = document.getElementById('explanation-text');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

// Error elements
const favorableError = document.getElementById('favorable-error');
const totalError = document.getElementById('total-error');
const probAError = document.getElementById('prob-a-error');
const probBError = document.getElementById('prob-b-error');
const probAAndBError = document.getElementById('prob-a-and-b-error');
const probBGivenError = document.getElementById('prob-b-given-error');
const trialsError = document.getElementById('trials-error');
const successesError = document.getElementById('successes-error');
const successProbError = document.getElementById('success-prob-error');

// Current calculation type
let currentCalcType = 'single';

// Calculation history
let calculationHistory = JSON.parse(localStorage.getItem('probabilityHistory')) || [];

// Initialize the app
function init() {
  // Set up event listeners
  calcTypeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      switchCalcType(button.dataset.type);
    });
  });

  calculateBtn.addEventListener('click', calculateProbability);
  clearHistoryBtn.addEventListener('click', clearHistory);

  // Load history
  renderHistory();

  // Calculate initial probability
  calculateProbability();
}

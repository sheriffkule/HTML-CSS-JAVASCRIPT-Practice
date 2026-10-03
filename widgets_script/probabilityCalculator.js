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

// Switch between calculation types
function switchCalcType(type) {
  currentCalcType = type;

  // Update active button
  calcTypeButtons.forEach((button) => {
    if (button.dataset.type === type) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  // Show the correct form
  calcForms.forEach((form) => {
    if (
      form.id === `${type}-event` ||
      form.id === `${type}.probability` ||
      form.id === `${type}-distribution`
    ) {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
  });

  // Update formula and explanation
  updateFormulaAndExplanation();
}

// Update formula and explanation based on current calculation type
function updateFormulaAndExplanation() {
  switch (currentCalcType) {
    case 'single':
      formulaText.textContent = 'P(A) = Favorable Outcomes / Total Outcomes';
      explanationText.textContent =
        'The Probability of an event is calculated by dividing the number of favorable outcomes by the total number of possible outcomes.';
      break;
    case 'multiple':
      const eventType = document.getElementById('event-type').value;
      updateMultipleEventsFormula(eventType);
      break;
    case 'conditional':
      formulaText.textContent = 'P(A|B) = P(AnB) / P(B)';
      explanationText.textContent =
        'Conditional probability is the probability of event A occurring given that even B has already occurred.';
      break;
    case 'binomial':
      formulaText.textContent = 'P(X=k) = C(n,k) * p^k * (1-p)^(n-k)';
      explanationText.textContent =
        'The binomial distribution calculates the probability of exactly k successes in n independent trials.';
  }
}

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

// Update formula for multiple events based on event type
function updateMultipleEventsFormula(eventType) {
  switch (eventType) {
    case 'independent':
      formulaText.textContent = 'P(A and B) = P(A) * P(B)';
      explanationText.textContent =
        'For independent events, the probability of both occurring is the product of their individual probabilities.';
      break;
    case 'mutually-exclusive':
      formulaText.textContent = 'P(A or B) = P(A) * P(B)';
      explanationText.textContent =
        'For mutually exclusive events, the probability of either occurring is the sum of their individual probabilities.';
      break;
    case 'non-mutually-exclusive':
      formulaText.textContent = 'P(A or B) = P(A) * P(B) - P(A and B)';
      explanationText.textContent =
        'For non-mutually exclusive events, we subtract the probability of both occurring to avoid double counting.';
      break;
  }
}

// Calculate probability based on current calculation type
function calculateProbability() {
  let probability = 0;
  let description = '';
  let isValid = true;

  // Reset errors
  document.querySelectorAll('.error').forEach((error) => {
    error.classList.remove('visible');
  });

  switch (currentCalcType) {
    case 'single':
      isValid = calculateSingleEvent();
      break;
    case 'multiple':
      isValid = calculateMultipleEvents();
      break;
    case 'conditional':
      isValid = calculateConditionalProbability();
      break;
    case 'binomial':
      isValid = calculateBinomialDistribution();
      break;
  }

  if (isValid) {
    // Add to history
    addToHistory(probability, description);
  }
}

// Calculate probability for a single event
function calculateSingleEvent() {
  const favorable = parseInt(document.getElementById('favorable-outcomes').value);
  const total = parseInt(document.getElementById('total-outcomes').value);

  // Validate inputs
  if (isNaN(favorable) || favorable <= 0) {
    favorableError.classList.add('visible');
    return false;
  }

  if (isNaN(total) || total <= 0) {
    totalError.classList.add('visible');
    return false;
  }

  if (favorable > total) {
    favorableError.textContent = 'Favorable outcomes cannot exceed total outcomes';
    favorableError.classList.add('visible');
    return false;
  } else {
    favorableError.textContent = 'Please enter a valid number greater than 0';
  }

  const probability = favorable / total;
  displayResult(probability, `Probability of ${favorable} out of ${total} outcomes`);
  return true;
}

// Calculate probability for multiple events
function calculateMultipleEvents() {
  const eventType = document.getElementById('event-type').value;
  const probA = parseFloat(document.getElementById('probability-a').value);
  const probB = parseFloat(document.getElementById('probability-b').value);

  // Validate inputs
  if (isNaN(probA) || probA < 0 || probA > 1) {
    probAError.classList.add('visible');
    return false;
  }

  if (isNaN(probB) || probB < 0 || probB > 1) {
    probBError.classList.add('visible');
    return false;
  }

  let probability = 0;
  let description = '';

  switch (eventType) {
    case 'independent':
      probability = probA * probB;
      description = `Probability of both both independent events A (${probA}) and B (${probB}) occurring`;
      break;
    case 'mutually-exclusive':
      probability = probA + probB;
      description = `Probability of either mutually exclusive event A (${probA}) or B (${probB}) occurring`;
      break;
    case 'non-mutually-exclusive':
      const probAAndB = probA * probB;
      probability = probA + probB - probAAndB;
      description = `Probability of either non-mutually exclusive event A (${probA}) or B(${probB}) occurring`;
      break;
  }

  // Ensure probability doesn't exceed 1
  probability = Math.min(probability, 1)

  displayResult(probability, description)
  return true;
}

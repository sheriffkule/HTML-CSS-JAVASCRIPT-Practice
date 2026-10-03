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
    const isActiveForm =
      form.id === `${type}-event` ||
      form.id === `${type}-events` ||
      form.id === `${type}-probability` ||
      form.id === `${type}-distribution`;

    form.style.display = isActiveForm ? 'block' : 'none';
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
    case 'multiple': {
      const eventType = document.getElementById('event-type').value;
      updateMultipleEventsFormula(eventType);
      break;
    }
    case 'conditional':
      formulaText.textContent = 'P(A|B) = P(AnB) / P(B)';
      explanationText.textContent =
        'Conditional probability is the probability of event A occurring given that even B has already occurred.';
      break;
    case 'binomial':
      formulaText.textContent = 'P(X=k) = C(n,k) * p^k * (1-p)^(n-k)';
      explanationText.textContent =
        'The binomial distribution calculates the probability of exactly k successes in n independent trials.';
      break;
    default:
      break;
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
      formulaText.textContent = 'P(A or B) = P(A) + P(B)';
      explanationText.textContent =
        'For mutually exclusive events, the probability of either occurring is the sum of their individual probabilities.';
      break;
    case 'non-mutually-exclusive':
      formulaText.textContent = 'P(A or B) = P(A) + P(B) - P(A and B)';
      explanationText.textContent =
        'For non-mutually exclusive events, we subtract the probability of both occurring to avoid double counting.';
      break;
  }
}

// Calculate probability based on current calculation type
function calculateProbability() {
  let result = { isValid: false, probability: 0, description: '' };

  // Reset errors
  document.querySelectorAll('.error').forEach((error) => {
    error.classList.remove('visible');
  });

  switch (currentCalcType) {
    case 'single':
      result = calculateSingleEvent();
      break;
    case 'multiple':
      result = calculateMultipleEvents();
      break;
    case 'conditional':
      result = calculateConditionalProbability();
      break;
    case 'binomial':
      result = calculateBinomialDistribution();
      break;
  }

  if (result.isValid) {
    // Add to history
    addToHistory(result.probability, result.description);
  }
}

// Calculate probability for a single event
function calculateSingleEvent() {
  const favorable = parseInt(document.getElementById('favorable-outcomes').value);
  const total = parseInt(document.getElementById('total-outcomes').value);

  // Validate inputs
  if (isNaN(favorable) || favorable <= 0) {
    favorableError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  if (isNaN(total) || total <= 0) {
    totalError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  if (favorable > total) {
    favorableError.textContent = 'Favorable outcomes cannot exceed total outcomes';
    favorableError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  } else {
    favorableError.textContent = 'Please enter a valid number greater than 0';
  }

  const probability = favorable / total;
  const description = `Probability of ${favorable} out of ${total} outcomes`;
  displayResult(probability, description);
  return { isValid: true, probability, description };
}

// Calculate probability for multiple events
function calculateMultipleEvents() {
  const eventType = document.getElementById('event-type').value;
  const probA = parseFloat(document.getElementById('probability-a').value);
  const probB = parseFloat(document.getElementById('probability-b').value);

  // Validate inputs
  if (isNaN(probA) || probA < 0 || probA > 1) {
    probAError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  if (isNaN(probB) || probB < 0 || probB > 1) {
    probBError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  let probability = 0;
  let description = '';

  switch (eventType) {
    case 'independent':
      probability = probA * probB;
      description = `Probability of both independent events A (${probA}) and B (${probB}) occurring`;
      break;
    case 'mutually-exclusive':
      probability = probA + probB;
      description = `Probability of either mutually exclusive event A (${probA}) or B (${probB}) occurring`;
      break;
    case 'non-mutually-exclusive': {
      const probAAndB = probA * probB;
      probability = probA + probB - probAAndB;
      description = `Probability of either non-mutually exclusive event A (${probA}) or B (${probB}) occurring`;
      break;
    }
  }

  // Ensure probability doesn't exceed 1
  probability = Math.min(probability, 1);

  displayResult(probability, description);
  return { isValid: true, probability, description };
}

// Calculate conditional probability
function calculateConditionalProbability() {
  const probAAndB = parseFloat(document.getElementById('prob-a-and-b').value);
  const probB = parseFloat(document.getElementById('prob-b-given').value);

  // Validate inputs
  if (isNaN(probAAndB) || probAAndB < 0 || probAAndB > 1) {
    probAAndBError.textContent = 'Please enter a value between 0 and 1';
    probAAndBError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  if (isNaN(probB) || probB <= 0 || probB > 1) {
    probBGivenError.textContent =
      probB <= 0 ? 'P(B) must be greater than 0' : 'Please enter a value between 0 and 1';
    probBGivenError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  if (probAAndB > probB) {
    probAAndBError.textContent = 'P(AnB) cannot be greater than P(B)';
    probAAndBError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  const probability = probAAndB / probB;
  const description = 'Probability of A given B has occurred';
  displayResult(probability, description);
  return { isValid: true, probability, description };
}

// Calculate binomial distribution probability
function calculateBinomialDistribution() {
  const n = parseInt(document.getElementById('trials').value);
  const k = parseInt(document.getElementById('successes').value);
  const p = parseFloat(document.getElementById('success-prob').value);

  // Validate inputs
  if (isNaN(n) || n <= 0) {
    trialsError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  if (isNaN(k) || k < 0 || k > n) {
    successesError.textContent =
      k > n
        ? 'Number of successes cannot exceed number of trials'
        : 'Please enter a valid number greater than or equal to 0';
    successesError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  } else {
    successesError.textContent = 'Please enter a valid number greater than or equal to 0';
  }

  if (isNaN(p) || p < 0 || p > 1) {
    successProbError.classList.add('visible');
    return { isValid: false, probability: 0, description: '' };
  }

  // Calculate binomial coefficient: C(n, k) = n! / (k! * (n-k)!)
  const binomialCoefficient = factorial(n) / (factorial(k) * factorial(n - k));

  // Calculate probability: P(X=k) = C(n,k) * p^k * (1-p)^(n-k)
  const probability = binomialCoefficient * Math.pow(p, k) * Math.pow(1 - p, n - k);
  const description = `Probability of exactly ${k} successes in ${n} trials`;

  displayResult(probability, description);
  return { isValid: true, probability, description };
}

// Helper function to calculate factorial
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Display the result
function displayResult(probability, description) {
  // Format probability to 4 decimal places
  const formattedProbability = probability.toFixed(4);
  const percentage = (probability * 100).toFixed(2);

  probabilityResult.textContent = formattedProbability;
  percentageResult.textContent = `${percentage}%`;

  // Animate the probability bar
  probabilityBar.style.width = `${percentage}%`;

  resultDescription.textContent = description;
}

// Add calculation to history
function addToHistory(probability, description) {
  const historyItem = {
    type: currentCalcType,
    probability: probability,
    description: description,
    timestamp: new Date().toLocaleString(),
  };

  calculationHistory.unshift(historyItem);

  // Keep only the last 10 calculations
  if (calculationHistory.length > 10) {
    calculationHistory = calculationHistory.slice(0, 10);
  }

  // Save to localStorage
  localStorage.setItem('probabilityHistory', JSON.stringify(calculationHistory));

  // Update the display
  renderHistory();
}

// Render calculation history
function renderHistory() {
  historyList.innerHTML = '';

  if (calculationHistory.length === 0) {
    historyList.innerHTML = '<div class="history-item">No calculations yet</div>';
    return;
  }

  calculationHistory.forEach((item) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    historyItem.innerHTML = `
      <div>
        <strong>${item.description}</strong>
        <div style="font-size: 0.8rem; color: var(--gray);">${item.timestamp}</div>
      </div>
      <div style="font-weight: bold; color: var(--primary);">${item.probability.toFixed(4)}</div>
    `;

    historyList.appendChild(historyItem);
  });
}

// Clear calculation history
function clearHistory() {
  calculationHistory = [];
  localStorage.setItem('probabilityHistory', JSON.stringify(calculationHistory));
  renderHistory();
}

// Event listener for multiple events type change
document.getElementById('event-type').addEventListener('change', function () {
  updateMultipleEventsFormula(this.value);
  calculateProbability();
});

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }
  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.textContent = currentYear.toString();
}
updateYear();

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

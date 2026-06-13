// DOM Elements
const dataInput = document.getElementById('dataInput');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const exampleBtn = document.getElementById('exampleBtn');
const resultsContainer = document.getElementById('resultsContainer');
const historyContainer = document.getElementById('historyContainer');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const notification = document.getElementById('notification');
const calculateProbBtn = document.getElementById('calculateProbBtn');
const probabilityResult = document.getElementById('probabilityResult');
const dataChart = document.getElementById('dataChart');

// Sample data for example
const sampleData = [12, 15, 18, 22, 24, 27, 30, 32, 35, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65];

// Initialize Chart.js
let chart = null;

// Event listeners
calculateBtn.addEventListener('click', calculateStatistics);
clearBtn.addEventListener('click', clearData);
exampleBtn.addEventListener('click', loadExample);
calculateProbBtn.addEventListener('click', calculateProbability);

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');

    // Update active tab
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Show corresponding content
    tabContents.forEach((content) => {
      content.classList.remove('active');
      if (content.id === `${tabId}Tab`) {
        content.classList.add('active');
      }
    });
  });
});

// Functions
function loadExample() {
  dataInput.value = sampleData.join(', ');
  showNotification('Example data loaded successfully!');
}

function clearData() {
  dataInput.value = '';
  resultsContainer.innerHTML = '';
  historyContainer.innerHTML =
    '<p>No calculations yet. Enter data and click "Calculate" to see results here.</p>';
  if (chart) chart.destroy();
  showNotification('Data cleared!');
}

function parseInputData(input) {
  // Replace commas and newlines with spaces, then split by spaces
  const cleanedInput = input.replace(/[,;\n]/g, ' ');
  const numbers = cleanedInput
    .split(/\s+/)
    .filter((val) => val !== '')
    .map((val) => parseFloat(val))
    .filter((val) => !isNaN(val));

  return numbers;
}

function calculateStatistics() {
  const input = dataInput.value.trim();
  if (!input) {
    showNotification('Please enter some data!', 'error');
    return;
  }

  const data = parseInputData(input);
  if (data.length === 0) {
    showNotification('No valid numbers found!', 'error');
    return;
  }

  // Calculate statistics
  const stats = computeStatistics(data);

  // Display results
  displayResults(stats);

  // Add to history
  addToHistory(data, stats);

  // Updata chart
  updateChart(data);

  showNotification('Statistics calculated successfully!');
}

function computeStatistics(data) {
  const sortedData = [...data].sort((a, b) => a - b);
  const n = data.length;

  // Mean
  const mean = data.reduce((sum, val) => sum + val, 0) / n;

  // Median
  const mid = Math.floor(n / 2);
  const median = n % 2 === 0 ? (sortedData[mid - 1] + sortedData[mid]) / 2 : sortedData[mid];

  // Mode
  const frequency = [];
  let maxFreq = 0;
  let modes = [];

  data.forEach((val) => {
    frequency[val] = (frequency[val] || 0) + 1;
    if (frequency[val] > maxFreq) {
      maxFreq = frequency[val];
      modes = [val];
    } else if (frequency[val] === maxFreq) {
      modes.push(val);
    }
  });

  const mode = modes.length === n ? 'No mode' : modes.join(', ');

  // Standard deviation
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  // Range
  const range = sortedData[n - 1] - sortedData[0];

  // Quartiles
  const q1 = calculatePercentile(sortedData, 25);
  const q3 = calculatePercentile(sortedData, 75);
  const iqr = q3 - q1;

  // Min and Max
  const min = sortedData[0];
  const max = sortedData[n - 1];

  // Sum
  const sum = data.reduce((total, val) => total + val, 0);

  return {
    const: n,
    sum: sum,
    mean: mean,
    median: median,
    mode: mode,
    stdDev: stdDev,
    variance: variance,
    range: range,
    q1: q1,
    q3: q3,
    iqr: iqr,
    min: min,
    max: max,
  };
}

function calculatePercentile(data, percentile) {
  const index = (percentile / 100) * (data.length - 1);
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);

  if (lowerIndex === upperIndex) return data[lowerIndex];

  const weight = index - lowerIndex;
  return data[lowerIndex] * (1 - weight) + data[upperIndex] * weight;
}

function displayResults(stats) {
  resultsContainer.innerHTML = '';

  const resultItems = [
    { label: 'Count', value: stats.count, icon: 'fas fa-hashtag' },
    { label: 'Sum', value: stats.sum.toFixed(2), icon: 'fas fa-plus' },
    { label: 'Mean', value: stats.mean.toFixed(2), icon: 'fas fa-calculator' },
    { label: 'Median', value: stats.median.toFixed(2), icon: 'fas fa-sort' },
    { label: 'Mode', value: stats.mode, icon: 'fas fa-flag' },
    { label: 'Std Deviation', value: stats.stdDev.toFixed(2), icon: 'fas fa-chart-line' },
    { label: 'Variance', value: stats.variance.toFixed(2), icon: 'fas fa-square-root-alt' },
    { label: 'Range', value: stats.range.toFixed(2), icon: 'fas fa-arrows-alt-h' },
    { label: 'Q1 (25%)', value: stats.q1.toFixed(2), icon: 'fas fa-chart-pie' },
    { label: 'Q3 (75%)', value: stats.q3.toFixed(2), icon: 'fas fa-chart-pie' },
    { label: 'IQR', value: stats.iqr.toFixed(2), icon: 'fas fa-arrows-alt-v' },
    { label: 'Min', value: stats.min.toFixed(2), icon: 'fas fa-arrow-down' },
    { label: 'Max', value: stats.max.toFixed(2), icon: 'fas fa-arrow-up' },
  ];

  resultItems.forEach((item) => {
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    resultCard.innerHTML = `
      <div class="result-label">${item.label}</div>
      <div class="result-value">${item.value}</div>
      <i class="${item.icon}"></i>
    `;
    resultsContainer.appendChild(resultCard);
  });
}

function addToHistory(data, stats) {
  // Create history item
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item';

  const dataPreview =
    data.length > 5 ? `${data.slice(0, 5).join(', ')}... (${data.length} values)` : data.join(', ');

  historyItem.innerHTML = `
    <div class="history-data">${dataPreview}</div>
    <div class="history-stats">Mean: ${stats.mean.toFixed(2)} | Std Dev: ${stats.stdDev.toFixed(2)}</div>
  `;

  // Add to top of history
  if (historyContainer.firstChild && historyContainer.firstChild.tagName === 'P') {
    historyContainer.innerHTML = '';
  }

  historyContainer.prepend(historyItem);

  // Limit history to 10 items
  if (historyContainer.children.length > 10) {
    historyContainer.removeChild(historyContainer.lastChild);
  }
}

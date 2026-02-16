// DOM Elements
const inputValue = document.getElementById('inputValue');
const inputUnit = document.getElementById('inputUnit');
const outputValue = document.getElementById('outputValue');
const outputUnit = document.getElementById('outputUnit');
const swapBtn = document.getElementById('swapBtn');
const speedNeedle = document.getElementById('speedNeedle');
const speedValue = document.getElementById('speedValue');
const comparisonItems = document.getElementById('comparisonItems');
const examplesGrid = document.getElementById('examplesGrid');
const themeToggle = document.getElementById('themeToggle');

// Conversion factors to (to km/h)
const conversionFactors = {
  kmh: 1,
  mph: 1.60934,
  ms: 3.6,
  knot: 1.852,
  mach: 1234.8, // Mach 1 at sea level (~1225 km/h)
};

// Common speed references
const commonSpeeds = [
  { label: 'Walking speed', value: 5, unit: 'kmh' },
  { label: 'Running speed', value: 20, unit: 'kmh' },
  { label: 'City speed limit', value: 50, unit: 'kmh' },
  { label: 'Highway speed', value: 110, unit: 'kmh' },
  { label: 'Speed of sound', value: 1, unit: 'mach' },
  { label: 'Commercial jet', value: 900, unit: 'kmh' },
  { label: 'Speed of light', value: 1079252848.8, unit: 'kmh' },
];

// Example conversions
const examples = [
  { from: 100, fromUnit: 'kmh', toUnit: 'mph' },
  { from: 60, fromUnit: 'mph', toUnit: 'kmh' },
  { from: 10, fromUnit: 'ms', toUnit: 'kmh' },
  { from: 500, fromUnit: 'kmh', toUnit: 'mach' },
  { from: 30, fromUnit: 'knot', toUnit: 'kmh' },
  { from: 2, fromUnit: 'mach', toUnit: 'mph' },
];

// Initialize the app
function init() {
  // Set up event listeners
  inputValue.addEventListener('input', convertSpeed);
  inputValue.addEventListener('input', convertSpeed);
  outputUnit.addEventListener('input', convertSpeed);
  swapBtn.addEventListener('click', swapUnits);
  themeToggle.addEventListener('click', toggleTheme);

  // Load examples
  loadExamples();

  // Perform initial conversion
  convertSpeed();
}

// Convert speed based on input
function convertSpeed() {
  const value = parseFloat(inputValue.value) || 0;
  const fromUnit = inputUnit.value;
  const toUnit = outputUnit.value;

  // Convert to km/h first
  const kmhValue = value * conversionFactors[fromUnit];

  // Then convert to target unit
  const result = kmhValue / conversionFactors[toUnit];

  // Display result with appropriate decimal places
  const decimalPlaces = result < 1 ? 4 : result < 10 ? 2 : result < 100 ? 1 : 0;
  outputValue.textContent = result.toFixed(decimalPlaces);

  // Update speedometer
  updateSpeedometer(kmhValue);

  // Update comparison
  updateComparisons(kmhValue);
}

// Swap input and output units
function swapUnits() {
  const tempUnit = inputUnit.value;
  inputUnit.value = outputUnit.value;
  outputUnit.value = tempUnit;

  // Also swap values if input has a value
  if (inputValue.value) {
    const tempValue = outputValue.textContent;
    inputValue.value = tempValue;
  }

  convertSpeed();
}

// Update speedometer visualization
function updateSpeedometer(kmhValue) {
  // Limit to 1000 km/h for visualization
  const displayValue = Math.min(kmhValue, 1000);
  const rotation = (displayValue / 1000) * 180 - 90; // -90 to 90 degrees

  speedNeedle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
  speedValue.textContent = `${kmhValue.toFixed(0)} km/h`;
}

// Update comparison items
function updateComparisons(kmhValue) {
  comparisonItems.innerHTML = '';

  commonSpeeds.forEach((item) => {
    const itemKmh = item.value * conversionFactors[item.unit];
    const ratio = currentKmh / itemKmh;

    let comparisonText = '';
    if (ratio < 0.1) {
      comparisonText = `${(1 / ratio).toFixed(1)}x slower than`;
    } else if (ratio < 0.9) {
      comparisonText = `${(1 / ratio).toFixed(1)}x slower than`;
    } else if (ratio > 1.1) {
      comparisonText = `${(1 / ratio).toFixed(1)}x faster than`;
    } else {
      comparisonText = 'About the same as';
    }

    const comparisonElement = document.createElement('div');
    comparisonElement.className = 'comparison-item';
    comparisonElement.innerHTML = `
      <div class="comparison-value">${comparisonText}</div>
      <div class="comparison-value">${item.label} (${item.value} ${getUnitName(item.unit)})</div>
    `;

    comparisonItems.appendChild(comparisonElement);
  });
}

// Load example conversions
function loadExamples() {
  examplesGrid.innerHTML = '';

  examples.forEach((example) => {
    const fromKmh = example.from * conversionFactors[example.fromUnit];
    const result = fromKmh / conversionFactors[example.toUnit];

    const exampleElement = document.createElement('div');
    exampleElement.className = 'example-card';
    exampleElement.innerHTML = `
      <div class="example-value">
        ${example.from} ${getUnitName(example.fromUnit)} → ${result.toFixed(2)} ${getUnitName(example.toUnit)}
      </div>
      <div class="example-label">
        ${getUnitName(example.fromUnit, true)} to ${getUnitName(example.toUnit, true)}
      </div>
    `;

    examplesGrid.appendChild(exampleElement);
  });
}

// Get display name for unit
function getUnitName(unit, short = false) {
  const names = {
    kmh: short ? 'km/h' : 'kilometers per hour',
    mph: short ? 'mph' : 'miles per hour',
    ms: short ? 'm/s' : 'meters per second',
    knot: short ? 'knots' : 'knots',
    mach: short ? 'Mach' : 'Mach number',
  };
  return names[unit];
}

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const icon = themeToggle.querySelector('i');

  if (document.body.classList.contains('dark-theme')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.dateTime = currentYear.toString();
  yearElement.textContent = currentYear.toString();
}
updateYear();

// Initialize the app on page load
window.addEventListener('DOMContentLoaded', init);

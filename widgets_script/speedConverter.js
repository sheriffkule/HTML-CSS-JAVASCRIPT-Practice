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

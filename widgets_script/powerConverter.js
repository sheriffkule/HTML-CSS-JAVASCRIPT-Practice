document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const darkModeToggle = document.getElementById('darkModeToggle');
  const tabs = document.querySelectorAll('.tab');
  const tabContent = document.querySelectorAll('.tab-content');

  // Power conversion elements
  const powerValueInput = document.getElementById('power-value');
  const powerFromSelect = document.getElementById('power-from');
  const powerToSelect = document.getElementById('power-to');
  const powerConvertBtn = document.getElementById('power-convert-btn');
  const powerSwapBtn = document.getElementById('power-swap-btn');
  const powerResult = document.getElementById('power-result');
  const powerResultUnit = document.getElementById('power-result-unit');

  // Power Calculator elements
  const voltageInput = document.getElementById('voltage');
  const currentInput = document.getElementById('current');
  const calculatePowerBtn = document.getElementById('calculate-power-btn');
  const calculatedPower = document.getElementById('calculated-power');

  // Power conversion elements
  const energyValueInput = document.getElementById('energy-value');
  const energyFromSelect = document.getElementById('energy-from');
  const energyToSelect = document.getElementById('energy-to');
  const energyConvertBtn = document.getElementById('energy-convert-btn');
  const energySwapBtn = document.getElementById('energy-swap-btn');
  const energyResult = document.getElementById('energy-result');
  const energyResultUnit = document.getElementById('energy-result-unit');

  // Energy calculator elements
  const powerInput = document.getElementById('power-input');
  const timeInput = document.getElementById('time-input');
  const calculateEnergyBtn = document.getElementById('calculate-energy-btn');
  const calculatedEnergy = document.getElementById('calculated-energy');

  // Current Conversion elements
  const currentValueInput = document.getElementById('current-value');
  const currentFromSelect = document.getElementById('current-from');
  const currentToSelect = document.getElementById('current-to');
  const currentConvertBtn = document.getElementById('current-convert-btn');
  const currentSwapBtn = document.getElementById('current-swap-btn');
  const currentResult = document.getElementById('current-result');
  const currentResultUnit = document.getElementById('current-result-unit');

  // Current Calculator elements
  const calcPowerInput = document.getElementById('calc-power');
  const calcVoltageInput = document.getElementById('calc-voltage');
  const calculateCurrentBtn = document.getElementById('calculate-current-btn');
  const calculatedCurrent = document.getElementById('calculate-current');

  // History elements
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history-btn');

  // Conversion factors
  const powerConversionFactors = {
    W: 1,
    kW: 1000,
    MW: 1000000,
    GW: 1000000000,
    hp: 745.7,
    'BTU/h': 0.29307107,
  };

  const energyConversionFactors = {
    J: 1,
    kJ: 1000,
    Wh: 3600,
    kWh: 3600000,
    MWh: 3600000000,
    cal: 4.184,
    kcal: 4184,
  };

  const currentConversionFactors = {
    A: 1,
    mA: 0.001,
    kA: 1000,
  };

  // Dark mode toggle
  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');

      // Remove class list from all tabs and contents
      tabs.forEach((t) => t.classList.remove('active'));
      tabContent.forEach((c) => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  // Power Conversion
  powerConvertBtn.addEventListener('click', convertPower);
  powerSwapBtn.addEventListener('click', swapPowerUnits);

  function convertPower() {
    const value = parseFloat(powerValueInput.value);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    const fromUnit = powerFromSelect.value;
    const toUnit = powerToSelect.value;

    // Convert to watts first
    const valueInWatts = value * powerConversionFactors[fromUnit];
    // Convert to target unit
    const result = valueInWatts / powerConversionFactors[toUnit];

    powerResult.textContent = result.toFixed(6).replace(/\?0+$/, '', '');
    powerResultUnit.textContent = toUnit;

    addToHistory(`${value} ${fromUnit} = $${result.toFixed(6).replace(/\.?0+$/, '')}`);
  }

  function swapPowerUnits() {
    const temp = powerFromSelect.value;
    powerFromSelect.value = powerToSelect.value;
    powerToSelect.value = temp;
    convertPower();
  }

  // Power Calculator (P= VI)
  calculatePowerBtn.addEventListener('click', function () {
    const voltage = parseFloat(voltageInput.value);
    const current = parseFloat(currentInput.value);

    if (isNaN(voltage) || isNaN(current)) {
      alert('Please enter valid numbers for voltage and current!');
      return;
    }

    const power = voltage * current;
    calculatedPower.textContent = power.toFixed(6).replace(/\.?0+$/, '');

    addToHistory(`P = ${voltage}V × ${current}A = ${power.toFixed(6).replace(/\.?0+$/, '')}W`, 'calc');
  });
});

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
  const calculatedCurrent = document.getElementById('calculated-current');

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
    KJ: 1000,
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

  function applyTheme(isDarkMode) {
    document.body.classList.toggle('dark-mode', isDarkMode);
    const icon = darkModeToggle.querySelector('i');
    if (!icon) return;

    if (isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem('powerConverterTheme');
    } catch (error) {
      console.warn('Unable to read theme from localStorage', error);
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('powerConverterTheme', theme);
    } catch (error) {
      console.warn('Unable to save theme to localStorage', error);
    }
  }

  const savedTheme = getStoredTheme();
  savedTheme === 'dark' ? applyTheme(true) : applyTheme(false);

  darkModeToggle.addEventListener('click', function () {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      setStoredTheme('dark');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      setStoredTheme('light');
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
    powerResult.textContent = result.toFixed(6).replace(/\.?0+$/, '');
    powerResultUnit.textContent = toUnit;

    addToHistory(`${value} ${fromUnit} = ${result.toFixed(6).replace(/\.?0+$/, '')}`);
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

  // Energy conversion
  energyConvertBtn.addEventListener('click', convertEnergy);
  energySwapBtn.addEventListener('click', swapEnergyUnits);

  function convertEnergy() {
    const value = parseFloat(energyValueInput.value);
    if (isNaN(value)) {
      alert('Please enter a valid number!');
      return;
    }

    const fromUnit = energyFromSelect.value;
    const toUnit = energyToSelect.value;

    // Convert to joules first
    const valueInJoules = value * energyConversionFactors[fromUnit];
    // Convert to target unit
    const result = valueInJoules / energyConversionFactors[toUnit];

    energyResult.textContent = result.toFixed(6).replace(/\.?0+$/, '');
    energyResultUnit.textContent = toUnit;

    addToHistory(`${value} ${fromUnit} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${toUnit}`, 'energy');
  }

  function swapEnergyUnits() {
    const temp = energyFromSelect.value;
    energyFromSelect.value = energyToSelect.value;
    energyToSelect.value = temp;
    convertEnergy();
  }

  // Energy calculator (E = P x t)
  calculateEnergyBtn.addEventListener('click', function () {
    const power = parseFloat(powerInput.value);
    const time = parseFloat(timeInput.value);

    if (isNaN(power) || isNaN(time)) {
      alert('Please enter valid numbers for power and time!');
      return;
    }

    const energy = power * time;
    calculatedEnergy.textContent = energy.toFixed(6).replace(/\.?0+$/, '');

    addToHistory(`E = ${power}W × ${time}h = ${energy.toFixed(6).replace(/\.?0+$/, '')}Wh`, 'calc');
  });

  // Current Conversion
  currentConvertBtn.addEventListener('click', convertCurrent);
  currentSwapBtn.addEventListener('click', swapCurrentUnits);

  function convertCurrent() {
    const value = parseFloat(currentValueInput.value);
    if (isNaN(value)) {
      alert('Please enter a valid number!');
      return;
    }

    const fromUnit = currentFromSelect.value;
    const toUnit = currentToSelect.value;

    // Convert to amperes first
    const valueInAmperes = value * currentConversionFactors[fromUnit];
    // Convert to target unit
    const result = valueInAmperes / currentConversionFactors[toUnit];

    currentResult.textContent = result.toFixed(6).replace(/\.?0+$/, '');
    currentResultUnit.textContent = toUnit;

    addToHistory(`${value} ${fromUnit} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${toUnit}`, 'current');
  }

  function swapCurrentUnits() {
    const temp = currentFromSelect.value;
    currentFromSelect.value = currentToSelect.value;
    currentToSelect.value = temp;
    convertCurrent();
  }

  // Current calculator (I = P / V)
  calculateCurrentBtn.addEventListener('click', function () {
    const power = parseFloat(calcPowerInput.value);
    const voltage = parseFloat(calcVoltageInput.value);

    if (isNaN(power) || isNaN(voltage)) {
      alert('Please enter valid numbers for power and voltage!');
      return;
    }

    if (voltage === 0) {
      alert('Voltage cannot be zero');
      return;
    }

    const current = power / voltage;
    calculatedCurrent.textContent = current.toFixed(6).replace(/\.?0+$/, '');

    addToHistory(`I = ${power}W / ${voltage}V = ${current.toFixed(6).replace(/\.?0+$/, '')}A`, 'current');
  });

  // History Functions
  function addToHistory(text, type) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    // Create a new history item
    const newItem = {
      id: Date.now(),
      text: text,
      type: type,
      timestamp: new Date().toLocaleString(),
    };

    // Add to beginning of array (so newest appears first)
    history.unshift(newItem);

    // Keep only the last 10 items
    if (history.length > 10) history = history.slice(0, 10);

    // Save to localStorage
    localStorage.setItem('conversionHistory', JSON.stringify(history));

    // Update UI
    updateHistoryUI();
  }

  function updateHistoryUI() {
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    historyList.innerHTML = '';

    if (history.length === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.className = 'history-item';
      emptyItem.textContent = 'No history yet';
      historyList.appendChild(emptyItem);
      return;
    }

    history.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'history-item';

      const textSpan = document.createElement('span');
      textSpan.className = 'history-value';
      textSpan.textContent = item.text;

      const timeSpan = document.createElement('span');
      timeSpan.className = 'history-time';
      timeSpan.textContent = item.timestamp;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'history-delete';
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.setAttribute('title', 'Delete Conversion');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteHistoryItem(item.id);
      });

      li.appendChild(textSpan);
      li.appendChild(timeSpan);
      li.appendChild(deleteBtn);
      historyList.appendChild(li);
    });
  }

  function deleteHistoryItem(id) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    history = history.filter((item) => item.id !== id);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    updateHistoryUI();
  }

  clearHistoryBtn.addEventListener('click', function () {
    localStorage.removeItem('conversionHistory');
    updateHistoryUI();
  });

  // Initialize
  updateHistoryUI();

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
});

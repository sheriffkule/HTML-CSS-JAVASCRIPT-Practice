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
});

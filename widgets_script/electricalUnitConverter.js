document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const fromValueInput = document.getElementById('fromValue');
  const fromUnitSelect = document.getElementById('fromUnit');
  const toValueInput = document.getElementById('toValue');
  const toUnitSelect = document.getElementById('toUnit');
  const convertBtn = document.getElementById('convertBtn');
  const resultValue = document.getElementById('resultValue');
  const resultUnit = document.getElementById('resultUnit');
  const conversionDetails = document.getElementById('conversionDetails');
  const conversionOptions = document.querySelectorAll('.conversion-option');

  // Conversion factors for different units
  const conversionFactors = {
    voltage: {
      V: 1,
      kV: 1000,
      mV: 0.001,
    },
    current: {
      A: 1,
      mA: 0.001,
      kA: 1000,
    },
    power: {
      W: 1,
      kW: 1000,
      MW: 1000000,
      hp: 745.7,
    },
    resistance: {
      Ω: 1,
      kΩ: 1000,
      MΩ: 1000000,
    },
    energy: {
      J: 1,
      kJ: 1000,
      kWh: 3600000,
      MWh: 3600000000,
    },
  };

  // Current conversion type
  let currentConversionType = 'voltage';

  // Update units based on conversion type
  function updateUnits() {
    const units = Object.keys(conversionFactors[currentConversionType]);
    const unitNames = {
      voltage: { V: 'Volts (V)', kV: 'Kilovolts (kV)', mV: 'Millivolts (mV)' },
      current: { A: 'Amperes (A)', mA: 'Milliamperes (mA)', kA: 'Kiloamperes (kA)' },
      power: { W: 'Watts (W)', kW: 'Kilowatts (kW)', MW: 'Megawatts (MW)', hp: 'Horsepower (hp)' },
      resistance: { Ω: 'Ohms (Ω)', kΩ: 'Kiloohms (kΩ)', MΩ: 'Megaohms (MΩ)' },
      energy: {
        J: 'Joules (J)',
        kJ: 'Kilojoules (kJ)',
        kWh: 'Kilowatt-hours (kWh)',
        MWh: 'Megawatt-hours (MWh)',
      },
    };
    // Clear current options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    // Add new options
    units.forEach((unit) => {
      const fromOption = document.createElement('option');
      fromOption.value = unit;
      fromOption.textContent = unitNames[currentConversionType][unit];

      const toOption = document.createElement('option');
      toOption.value = unit;
      toOption.textContent = unitNames[currentConversionType][unit];

      fromUnitSelect.appendChild(fromOption);
      toUnitSelect.appendChild(toOption);
    });

    // Set default 'to' unit to something different for better demonstration
    if (units.length > 1) {
      toUnitSelect.selectedIndex = 1;
    }

    // Update result unit
    resultUnit.textContent = toUnitSelect.options[toUnitSelect.selectedIndex].text;
  }

  // Handle conversion type selection
  conversionOptions.forEach((option) => {
    option.addEventListener('click', function () {
      conversionOptions.forEach((opt) => opt.classList.remove('active'));
      this.classList.add('active');
      currentConversionType = this.dataset.type;
      updateUnits();
      performConversion();
    });
  });

  // Perform conversion
  function performConversion() {
    const fromValue = parseFloat(fromValueInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    if (isNaN(fromValue)) {
      resultValue.textContent = '0.00';
      conversionDetails.textContent = 'Please enter a valid number to convert.';
      return;
    }

    // Convert to base unit first
    const valueInBaseUnit = fromValue * conversionFactors[currentConversionType][fromUnit];

    // Convert from base unit to target unit
    const result = valueInBaseUnit / conversionFactors[currentConversionType][toUnit];

    // Update result
    resultValue.textContent = result.toFixed(6).replace(/\.?0+$/, '');
    toValueInput.value = result;
    resultUnit.textContent = toUnitSelect.options[toUnitSelect.selectedIndex].text;

    // Update conversion details
    conversionDetails.innerHTML = `
      <strong>${fromValue} ${fromUnit}</strong> = <strong>${result.toFixed(6)} ${toUnit}</strong><br />
      Conversion: ${fromValue} ${fromUnit} ⊠ ${conversionFactors[currentConversionType][fromUnit]} ÷
      ${conversionFactors[currentConversionType][toUnit]} = ${result.toFixed(6)} ${toUnit}
    `;
  }

  // Event listeners
  convertBtn.addEventListener('click', performConversion);
  fromValueInput.addEventListener('input', performConversion);
  fromUnitSelect.addEventListener('change', performConversion);
  toUnitSelect.addEventListener('change', performConversion);

  // Initialize
  updateUnits();

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
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const gameButtons = document.querySelectorAll('.game-btn');
  const numberSlider = document.getElementById('number-slider');
  const rangeSlider = document.getElementById('range-slider');
  const specialSlider = document.getElementById('special-slider');
  const numberCount = document.getElementById('number-count');
  const rangeValue = document.getElementById('range-value');
  const specialCount = document.getElementById('special-count');
  const generateBtn = document.getElementById('generate-btn');
  const resetBtn = document.getElementById('reset-btn');
  const numbersContainer = document.getElementById('numbers-container');
  const historyContainer = document.getElementById('history-container');
  const totalGenerated = document.getElementById('total-generated');
  const luckyNumber = document.getElementById('lucky-number');
  const hotNumber = document.getElementById('hot-number');

  // Game configuration
  const games = {
    powerball: { numbers: 5, range: 69, special: 1, specialRange: 26 },
    megamillions: { numbers: 5, range: 70, special: 1, specialRange: 25 },
    euromillions: { numbers: 5, range: 50, special: 2, specialRange: 12 },
    custom: { numbers: 5, range: 69, special: 1, specialRange: 26 },
  };

  let currentGame = 'powerball';
  let generatedCount = 0;
  let numberFrequency = {};

  // Initialize with a random lucky number
  luckyNumber.textContent = Math.floor(Math.random() * 9) + 1;

  // Set up game buttons
  gameButtons.forEach((button) => {
    button.addEventListener('click', function () {
      gameButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');
      currentGame = this.getAttribute('data-game');

      if (currentGame != 'custom') {
        const config = games[currentGame];
        numberSlider.value = config.numbers;
        rangeSlider.value = config.range;
        specialSlider.value = config.special;

        numberCount.textContent = config.numbers;
        rangeValue.textContent = `1-${config.range}`;
        specialCount.textContent = config.special;
      }
    });
  });

  // Set up sliders
  numberSlider.addEventListener('input', function () {
    numberCount.textContent = this.value;
  });

  rangeSlider.addEventListener('input', function () {
    rangeValue.textContent = `1-${this.value}`;
  });

  specialSlider.addEventListener('input', function () {
    specialCount.textContent = this.value;
  });

  // Generate numbers
  generateBtn.addEventListener('click', function () {
    generateNumbers();
  });

  // Reset
  resetBtn.addEventListener('click', function () {
    historyContainer.innerHTML = '';
    generatedCount = 0;
    totalGenerated.textContent = '0';
    numberFrequency = {};
    hotNumber.textContent = Math.floor(Math.random() * 50) + 1;
  });

  // Function to generate numbers
  function generateNumbers() {
    const numbersCount = parseInt(numberSlider.value);
    const range = parseInt(rangeSlider.value);
    const specialCount = parseInt(specialSlider.value);
    let specialRange = range;
    if (currentGame !== 'custom') {
      specialRange = games[currentGame].specialRange;
    }

    // Generate main numbers
    const mainNumbers = generateUniqueNumbers(numbersCount, range).sort((a, b) => a - b);

    // Generate special numbers
    const specialNumbers = generateUniqueNumbers(specialCount, specialRange);

    // Display numbers
    numbersContainer.innerHTML = '';

    mainNumbers.forEach((num) => {
      const numberEl = document.createElement('div');
      numberEl.className = 'number';
      numberEl.textContent = num;
      numbersContainer.appendChild(numberEl);

      // Track frequency
      numberFrequency[num] = (numberFrequency[num] || 0) + 1;
    });

    specialNumbers.forEach((num) => {
      const numberEl = document.createElement('div');
      numberEl.className = 'number special-number';
      numberEl.textContent = num;
      numbersContainer.appendChild(numberEl);
    });

    // Add to history
    addToHistory(mainNumbers, specialNumbers);

    // Update stats
    generatedCount++;
    totalGenerated.textContent = generatedCount;

    // Update hot number
    updateHotNumber();
  }

  // Generate unique numbers
  function generateUniqueNumbers(count, range) {
    const numbers = new Set();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * range) + 1);
    }
    return Array.from(numbers);
  }

  // Add to history
  function addToHistory(mainNumbers, specialNumbers) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    mainNumbers.forEach((num) => {
      const numEl = document.createElement('div');
      numEl.className = 'history-number';
      numEl.textContent = num;
      historyItem.appendChild(numEl);
    });

    specialNumbers.forEach((num) => {
      const numEl = document.createElement('div');
      numEl.className = 'history-number history-special';
      numEl.textContent = num;
      historyItem.appendChild(numEl);
    });

    historyContainer.prepend(historyItem);
  }

  // Update hot number
  function updateHotNumber() {
    let maxFreq = 0;
    let hotNum = 0;

    for (const [num, freq] of Object.entries(numberFrequency)) {
      if (freq > maxFreq) {
        maxFreq = freq;
        hotNum = num;
      }
    }

    if (hotNum) {
      hotNumber.textContent = hotNum;
    }
  }

  // Generate initial numbers
  generateNumbers();

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

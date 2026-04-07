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
});

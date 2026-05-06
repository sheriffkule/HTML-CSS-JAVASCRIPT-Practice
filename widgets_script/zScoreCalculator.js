document.addEventListener('DOMContentLoaded', function () {
  // Tab functionality
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const tabId = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Toggle second Z-score input for between probability
  const probabilityType = document.getElementById('probabilityType');
  const secondZScoreGroup = document.getElementById('secondZScoreGroup');

  probabilityType.addEventListener('change', function () {
    this.value === 'between'
      ? (secondZScoreGroup.style.display = 'block')
      : (secondZScoreGroup.style.display = 'none');
  });

  // Example click handlers
  const exampleItems = document.querySelectorAll('.example-item');
  exampleItems.forEach((item) => {
    item.addEventListener('click', function () {
      const zScore = parseFloat(this.getAttribute('data-z'));

      // Set the value in all Z-score inputs
      document.getElementById('zScoreProb').value = zScore;
      document.getElementById('zScorePercentile').value = zScore;

      // Switch to probability tab and calculate
      document.querySelector('.tab[data-tab="probability"]').click();
      calculateProbabilityFromZ();
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  // Restore saved theme
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }
  
  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = this.querySelector('i');
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });

  // Calculate Z-Score
  document.getElementById('calculateZScore').addEventListener('click', calculateZScore);

  // Calculate Probability
  document.getElementById('calculateProbability').addEventListener('click', calculateProbabilityFromZ);

  // Calculate Percentile
  document.getElementById('calculatePercentile').addEventListener('click', calculatePercentileFromZ);

  function calculateZScore() {
    const rawScore = parseFloat(document.getElementById('rawScore').value);
    const mean = parseFloat(document.getElementById('mean').value);
    const stdDev = parseFloat(document.getElementById('stdDev').value);

    if (isNaN(rawScore)) {
      alert('Please enter a valid raw score');
      return;
    }

    if (isNaN(mean)) {
      alert('Please enter a valid mean');
      return;
    }

    if (isNaN(stdDev) || stdDev <= 0) {
      alert('Please enter a valid standard deviation (must be greater than 0)');
      return;
    }

    const zScore = (rawScore - mean) / stdDev;
    document.getElementById('zscoreValue').textContent = zScore.toFixed(4);

    let interpretation = '';
    if (zScore < -3) {
      interpretation =
        'This is an extremely low score, significantly below the mean (bottom 0.1% of the distribution).';
    } else if (zScore < -2) {
      interpretation = 'This is a very low score, well below the mean (bottom 2.3% of the distribution).';
    } else if (zScore < -1) {
      interpretation = 'This is a below average score (bottom 15.9% of the distribution).';
    } else if (zScore < 1) {
      interpretation = 'This is an average score (within 1 standard deviation of the mean).';
    } else if (zScore < 2) {
      interpretation = 'This is an above average score (top 15.9% of the distribution).';
    } else if (zScore < 3) {
      interpretation = 'This is a very high score, well above the mean (top 2.3% of the distribution).';
    } else {
      interpretation =
        'this is an extremely high score, significantly above the mean (top 0.1% of the distribution).';
    }

    document.getElementById('zscoreInterpretation').textContent = interpretation;
    document.getElementById('zscoreResult').style.display = 'block';
  }

  function calculateProbabilityFromZ() {
    const zScore1 = parseFloat(document.getElementById('zScoreProb').value);
    const probabilityType = document.getElementById('probabilityType').value;

    if (isNaN(zScore1)) {
      alert('Please a valid Z-score');
      return;
    }

    let probability;
    let zScore2;

    if (probabilityType === 'between') {
      zScore2 = parseFloat(document.getElementById('zScoreProb2').value);
      if (isNaN(zScore2)) {
        alert('Please enter a valid second Z-score');
        return;
      }

      // Ensure zScore 1 is the smaller value
      const lowerZ = Math.min(zScore1, zScore2);
      const higherZ = Math.max(zScore1, zScore2);

      probability = normalCDF(higherZ) - normalCDF(lowerZ);
      document.getElementById('probabilityValue').textContent =
        `${(probability * 100).toFixed(2)}% (between Z = ${lowerZ.toFixed(2)} and Z = ${higherZ.toFixed(2)})`;
    } else if (probability === 'less') {
      probability = normalCDF(zScore1);
      document.getElementById('probabilityValue').textContent =
        `${(probability * 100).toFixed(2)}% (less than Z = ${zScore1.toFixed(2)})`;
    } else {
      probability = 1 - normalCDF(zScore1);
      document.getElementById('probabilityValue').textContent =
        `${(probability * 100).toFixed(2)}% (greater than Z = ${zScore1.toFixed(2)})`;
    }

    // Update probability meter
    document.getElementById('probabilityFill').style.width = `${probability * 100}%`;

    // Interpretation
    let interpretation = '';
    if (probability < 0.01) {
      interpretation = 'This is an extremely rare occurrence (less than 1% probability).';
    } else if (probability < 0.05) {
      interpretation = 'This is a statistically significant result (less than 5% probability).';
    } else if (probability < 0.1) {
      interpretation = 'This is an uncommon result (less than 10% probability).';
    } else if (probability < 0.3) {
      interpretation = 'This is a somewhat uncommon result.';
    } else if (probability < 0.7) {
      interpretation = 'This is a fairly common result.';
    } else {
      interpretation = 'This is very common result.';
    }

    document.getElementById('probabilityInterpretation').textContent = interpretation;
    document.getElementById('probabilityResult').style.display = 'block';
  }

  function calculatePercentileFromZ() {
    const zScore = parseFloat(document.getElementById('zScorePercentile').value);

    if (isNaN(zScore)) {
      alert('Please enter a valid Z-score');
      return;
    }

    const percentile = normalCDF(zScore) * 100;
    document.getElementById('percentileValue').textContent = `${percentile.toFixed(2)}th percentile`;

    let interpretation = '';
    if (percentile < 1) {
      interpretation = 'This score is extremely low - less than 1% of the population scores this low.';
    } else if (percentile < 10) {
      interpretation = 'This score is very low - only about 10% of the population scores this low.';
    } else if (percentile < 30) {
      interpretation = 'This score is below average - about 30% of the population scores this low.';
    } else if (percentile < 70) {
      interpretation = 'This score is average - near the middle of the population distribution.';
    } else if (percentile < 90) {
      interpretation = 'This score is above average = higher than about 70% of the population.';
    } else if (percentile < 99) {
      interpretation = 'This score is very high = higher than about 90% of the population.';
    } else {
      interpretation = 'This score is extremely high = in the top 1% of the population.';
    }

    document.getElementById('percentileInterpretation').textContent = interpretation;
    document.getElementById('percentileResult').style.display = 'block';
  }

  // Standard normal CDF - approximation
  function normalCDF(z) {
    // Abramowitz and Stegun approximation (1964)
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

    p = z > 0 ? 1 - p : p;

    return p;
  }

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

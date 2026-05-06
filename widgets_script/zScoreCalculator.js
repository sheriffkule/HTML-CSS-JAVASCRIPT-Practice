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
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const predictionValue = document.getElementById('predictionValue');
  const similarHomes = document.getElementById('similarHomes');
  const efficientHomes = document.getElementById('efficientHomes');
  const yourPrediction = document.getElementById('yourPrediction');
  const historyTableBody = document.getElementById('historyTableBody');

  // Chart initialization
  const ctx = document.getElementById('energyChart').getContext('2d');
  let energyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Your Home', 'Similar Homes', 'Efficient Homes'],
      dataset: [
        {
          label: 'Energy Usage (kWh/month)',
          data: [0, 0, 0],
          backgroundColor: ['rgba(67, 97, 238, 0.7)', 'rgba(76, 201, 240, 0.7)', 'rgba(155, 240, 76, 0.7)'],
          borderColor: ['rgba(67, 97, 238, 1)', 'rgba(76, 201, 240, 1)', 'rgba(155, 240, 76, 1)'],
          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  // Theme functionality
  const icon = themeToggle.querySelector('i');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark-mode');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Calculate button functionality
  calculateBtn.addEventListener('click', function () {
    const homeSize = parseFloat(document.getElementById('homeSize').value);
    const occupants = parseInt(document.getElementById('occupants').value);
    const region = document.getElementById('region').value;
    const heatingType = document.getElementById('heatingType').value;
    const coolingType = document.getElementById('coolingType').value;

    if (!homeSize || !occupants || !region || !heatingType || !coolingType) {
      alert('Please fill in all required fields!');
      return;
    }

    // Simple prediction algorithm (in a real app, this would be more sophisticated)
    let baseUsage = homeSize * 0.5;
    baseUsage += occupants * 10;

    // Adjust for region
    const regionFactors = {
      northeast: 1.2,
      midwest: 1.1,
      south: 1.3,
      west: 1.0,
    };
    baseUsage *= regionFactors[region];

    // Adjust for heating type
    const heatingFactors = {
      electric: 1.4,
      gas: 1.1,
      oil: 1.3,
      heat_pump: 0.9,
    };
    baseUsage += heatingFactors[heatingType];

    // Adjust for cooling type
    const coolingFactors = {
      central_ac: 1.3,
      window_units: 1.1,
      none: 0.8,
    };
    baseUsage *= coolingFactors[coolingType];

    // Round to nearest 10
    const predictedUsage = Math.round(baseUsage / 10) * 10;

    // Update UI with results
    predictionValue.textContent = predictedUsage.toLocaleString();
    yourPrediction.textContent = `${predictedUsage.toLocaleString()} kWh`;

    // Calculate comparison values
    const similarValue = Math.round(predictedUsage * 0.95);
    const efficientValue = Math.round(predictedUsage * 0.7);

    similarHomes.textContent = `${similarValue.toLocaleString()} kWh`;
    efficientHomes.textContent = `${efficientValue.toLocaleString()} kWh`;

    // Update chart
    energyChart.data.dataset[0].data = [predictedUsage, similarValue, efficientValue];
    energyChart.update();

    // Add to history
    addToHistory(homeSize, occupants, predictedUsage);
  });

  // Reset button functionality
  resetBtn.addEventListener('click', function () {
    document.getElementById('homeSize').value = '';
    document.getElementById('occupants').value = '';
    document.getElementById('region').value = '';
    document.getElementById('heatingType').value = '';
    document.getElementById('coolingType').value = '';

    // Reset display values
    predictionValue.textContent = '--';
    yourPrediction.textContent = '-- kWh';
    similarHomes.textContent = '-- kWh';
    efficientHomes.textContent = '-- kWh';

    // Reset chart
    energyChart.data.dataset[0].data = [0, 0, 0];
    energyChart.update();
  });
});

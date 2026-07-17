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
  const energyChartEl = document.getElementById('energyChart');
  const ctx = energyChartEl ? energyChartEl.getContext('2d') : null;
  let energyChart = null;
  if (ctx) {
    energyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Your Home', 'Similar Homes', 'Efficient Homes'],
        datasets: [
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
  }

  // Theme functionality (guard for missing toggle)
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark-mode');
      if (icon) icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Calculate button functionality
  if (calculateBtn) {
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
      baseUsage *= heatingFactors[heatingType];

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

      // Update chart (only if chart initialized)
      if (energyChart && energyChart.data && energyChart.data.datasets) {
        energyChart.data.datasets[0].data = [predictedUsage, similarValue, efficientValue];
        energyChart.update();
      }

      // Add to history
      addToHistory(homeSize, occupants, predictedUsage);
    });
  }

  // Reset button functionality
  if (resetBtn) {
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
      if (energyChart && energyChart.data && energyChart.data.datasets) {
        energyChart.data.datasets[0].data = [0, 0, 0];
        energyChart.update();
      }
    });
  }

  // History management (persist to localStorage)
  let history = [];

  function saveHistory() {
    try {
      localStorage.setItem('energyHistory', JSON.stringify(history.slice(0, 5)));
    } catch (e) {
      // ignore storage errors
    }
  }

  function renderHistory() {
    if (!historyTableBody) return;
    historyTableBody.innerHTML = '';
    history.forEach((entry) => {
      const row = document.createElement('tr');
      const d = new Date(entry.date);
      const dateDisplay = !isNaN(d)
        ? d.toLocaleString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })
        : entry.date;

      row.innerHTML = `
        <td>${dateDisplay}</td>
        <td>${entry.homeSize} sq ft</td>
        <td>${entry.occupants}</td>
        <td>${Number(entry.prediction).toLocaleString()} kWh</td>
      `;
      historyTableBody.appendChild(row);
    });
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem('energyHistory');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        history = parsed.slice(0, 5);
        renderHistory();
      }
    } catch (e) {
      history = [];
    }
  }

  function addToHistory(homeSize, occupants, prediction) {
    const now = new Date();
    if (!historyTableBody) return;

    const entry = { date: now.toISOString(), homeSize, occupants, prediction };
    history.unshift(entry);
    if (history.length > 5) history.length = 5;
    saveHistory();
    renderHistory();
  }

  // restore history from localStorage on load
  loadHistory();

  // Initialize multiple select
  const appliancesSelect = document.getElementById('appliances');
  if (appliancesSelect) appliancesSelect.size = 4;

  // Add hover effect to tip cards
  const tipCards = document.querySelectorAll('.tip-card');
  tipCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgb(0 0 0 / 0.15)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

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

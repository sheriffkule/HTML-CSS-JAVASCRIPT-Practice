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
});

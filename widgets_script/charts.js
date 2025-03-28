const colorPalettes = {
  light: {
    primary: [
      'rgba(106, 17, 203, 0.8)',
      'rgba(37, 117, 252, 0.8)',
      'rgba(255, 77, 148, 0.8)',
      'rgba(10, 207, 151, 0.8)',
      'rgba(57, 175, 209, 0.8)',
      'rgba(255, 188, 0, 0.8)',
      'rgba(250, 92, 124, 0.8)',
      'rgba(132, 146, 166, 0.8)',
    ],
    secondary: [
      'rgba(106, 17, 203, 0.3)',
      'rgba(37, 117, 252, 0.3)',
      'rgba(255, 77, 148, 0.3)',
      'rgba(10, 207, 151, 0.3)',
      'rgba(57, 175, 209, 0.3)',
      'rgba(255, 188, 0, 0.3)',
      'rgba(250, 92, 124, 0.3)',
      'rgba(132, 146, 166, 0.3)',
    ],
  },

  dark: {
    primary: [
      'rgba(138, 43, 226, 0.8)',
      'rgba(64, 224, 208, 0.8)',
      'rgba(255, 105, 180, 0.8)',
      'rgba(50, 205, 50, 0.8)',
      'rgba(70, 130, 180, 0.8)',
      'rgba(255, 215, 0, 0.8)',
      'rgba(255, 99, 71, 0.8)',
      'rgba(169, 169, 169, 0.8)',
    ],
    secondary: [
      'rgba(138, 43, 226, 0.3)',
      'rgba(64, 224, 208, 0.3)',
      'rgba(255, 105, 180, 0.3)',
      'rgba(50, 205, 50, 0.3)',
      'rgba(70, 130, 180, 0.3)',
      'rgba(255, 215, 0, 0.3)',
      'rgba(255, 99, 71, 0.3)',
      'rgba(169, 169, 169, 0.3)',
    ],
  },
};

const charts = [];
let currentTheme = 'light';

function generateData(count, min, max) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

const regions = ['North America', 'Europe', 'Asia', 'Africa', 'South America', 'Oceania'];

const platforms = ['Mobile', 'Desktop', 'Tablet', 'Smart TV', 'Other'];

const trafficSources = ['Direct', 'Organic Search', 'Paid Search', 'Social Media', 'Email', 'Referral'];

function initCharts() {
  charts.forEach((chart, index) => {
    if (chart) chart.destroy();
  });

  charts[0] = new Chart(document.getElementById('chart1'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'This Year',
          data: generateData(12, 50, 200),
          borderColor: colorPalettes[currentTheme].primary[0],
          backgroundColor: colorPalettes[currentTheme].secondary[0],
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Last Year',
          data: generateData(12, 50, 200),
          borderColor: colorPalettes[currentTheme].primary[1],
          backgroundColor: colorPalettes[currentTheme].secondary[1],
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
        x: {
          grid: {
            color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCharts();
});

document.getElementById('refreshData').addEventListener('click', function () {
  initCharts();
});

const themeToggle = document.getElementById('themeToggle');

function getThemeFromLocalStorage() {
  return localStorage.getItem('theme') || 'light';
}

function setThemeInLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

function updateTheme(theme) {
  const body = document.body;
  body.classList.toggle('dark-mode', theme === 'dark');
  themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

function initTheme() {
  const currentTheme = getThemeFromLocalStorage();
  updateTheme(currentTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = getThemeFromLocalStorage();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setThemeInLocalStorage(newTheme);
  updateTheme(newTheme);
  initCharts();
});

initTheme();

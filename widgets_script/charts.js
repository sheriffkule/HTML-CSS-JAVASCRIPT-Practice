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

  charts[1] = new Chart(document.getElementById('chart2'), {
    type: 'bar',
    data: {
      labels: months.slice(0, 6),
      datasets: [
        {
          label: 'Active Users',
          data: generateData(6, 500, 1500),
          borderColor: colorPalettes[currentTheme].primary[2],
          backgroundColor: colorPalettes[currentTheme].secondary[2],
          borderWidth: 1,
        },
        {
          label: 'New Users',
          data: generateData(6, 500, 800),
          borderColor: colorPalettes[currentTheme].primary[3],
          backgroundColor: colorPalettes[currentTheme].secondary[3],
          borderWidth: 1,
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

  charts[2] = new Chart(document.getElementById('chart3'), {
    type: 'doughnut',
    data: {
      labels: ['Our Product', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
      datasets: [
        {
          label: 'This Year',
          data: generateData(5, 10, 40),
          backgroundColor: [
            colorPalettes[currentTheme].primary[0],
            colorPalettes[currentTheme].primary[1],
            colorPalettes[currentTheme].primary[2],
            colorPalettes[currentTheme].primary[3],
            colorPalettes[currentTheme].primary[4],
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  });

  charts[3] = new Chart(document.getElementById('chart4'), {
    type: 'polarArea',
    data: {
      labels: regions,
      datasets: [
        {
          data: generateData(regions.length, 50, 200),
          backgroundColor: colorPalettes[currentTheme].primary.slice(0, regions.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  });

  charts[4] = new Chart(document.getElementById('chart5'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Conversion Rate (%)',
          data: generateData(12, 1, 10),
          borderColor: colorPalettes[currentTheme].primary[5],
          backgroundColor: colorPalettes[currentTheme].secondary[5],
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: colorPalettes[currentTheme].primary[5],
          pointRadius: 6,
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

  charts[5] = new Chart(document.getElementById('chart6'), {
    type: 'radar',
    data: {
      labels: ['Product Quality', 'Customer Service', 'Price', 'UX/UI', 'Features', 'Reliability'],
      datasets: [
        {
          label: 'This Quarter',
          data: generateData(6, 60, 100),
          borderColor: colorPalettes[currentTheme].primary[0],
          backgroundColor: colorPalettes[currentTheme].secondary[0],
          borderWidth: 2,
          pointBackgroundColor: colorPalettes[currentTheme].primary[0],
        },
        {
          label: 'Last Quarter',
          data: generateData(6, 40, 90),
          borderColor: colorPalettes[currentTheme].primary[1],
          backgroundColor: colorPalettes[currentTheme].secondary[1],
          borderWidth: 2,
          pointBackgroundColor: colorPalettes[currentTheme].primary[1],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            backdropColor: currentTheme === 'dark' ? '#242444' : 'white',
          },
        },
      },
    },
  });

  charts[6] = new Chart(document.getElementById('chart7'), {
    type: 'pie',
    data: {
      labels: trafficSources,
      datasets: [
        {
          data: generateData(trafficSources.length, 10, 35),
          backgroundColor: colorPalettes[currentTheme].primary.slice(0, trafficSources.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  });

  charts[7] = new Chart(document.getElementById('chart8'), {
    type: 'bar',
    data: {
      labels: platforms,
      datasets: [
        {
          axis: 'y',
          label: 'Users (thousands)',
          data: generateData(platforms.length, 50, 300),
          backgroundColor: colorPalettes[currentTheme].primary.slice(0, platforms.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
        y: {
          grid: {
            color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  charts[8] = new Chart(document.getElementById('chart9'), {
    type: 'bar',
    data: {
      labels: quarters,
      datasets: [
        {
          type: 'bar',
          label: 'Revenue',
          data: generateData(quarters.length, 80, 200),
          borderColor: colorPalettes[currentTheme].primary[6],
          backgroundColor: colorPalettes[currentTheme].primary[6],
          borderWidth: 1,
          order: 2,
        },
        {
          type: 'line',
          label: 'Profit',
          data: generateData(quarters.length, 30, 100),
          borderColor: colorPalettes[currentTheme].primary[7],
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointBackgroundColor: colorPalettes[currentTheme].primary[7],
          pointRadius: 5,
          order: 1,
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

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
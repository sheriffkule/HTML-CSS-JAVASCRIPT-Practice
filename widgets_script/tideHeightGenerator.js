// Initialize map
// const map = L.map('map').setView([40.7128, -74.006], 10);

// Add OpenStreetMap tiles (free)
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// Add a marker
// let marker = L.marker([40.7128, -74.006]).addTo(map).bindPopup('New York Harbor').openPopup();

// DOM elements
const locationButtons = document.querySelectorAll('.location-btn');
const searchInput = document.getElementById('location-search');
const searchButton = document.getElementById('search-btn');
const currentLocationButton = document.getElementById('current-location-btn');
const currentTimeElement = document.getElementById('current-time');
const tideChartElement = document.getElementById('tide-chart');
const currentTideElement = document.getElementById('current-tide');
const nextHighTideElement = document.getElementById('next-high-tide');
const nextLowTideElement = document.getElementById('next-low-tide');
const tideStatusElement = document.getElementById('tide-status');
const todayHighElement = document.getElementById('today-high');
const todayLowElement = document.getElementById('today-low');
const averageTideElement = document.getElementById('average-tide');
const tideRangeElement = document.getElementById('tide-range');
const moonPhaseElement = document.getElementById('moon-phase');
const moonIconElement = document.getElementById('moon-icon');
const locationInfoElement = document.getElementById('location-info');
const tideForecastElement = document.getElementById('tide-forecast');
const loadingElement = document.getElementById('loading');

// Current location
let currentCoords = { lat: 40.7128, lng: -74.006 };

// Update time display
function updateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  currentTimeElement.textContent = now.toLocaleDateString('en-US', options);
}

// Update map and marker
function updateMap(lat, lng, locationName = 'Selected Location') {
  map.setView([lat, lng], 10);
  marker.setLatLng([lat, lng]).bindPopup(locationName).openPopup();
}

// Get moon phase based on date
function getMoonPhase(date) {
  // Simplified calculation for demonstration
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // This is a simplified calculation = not astronomically accurate
  const phases = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
  ];

  // SImple calculation based on day of month
  const phaseIndex = Math.floor(day % 8);
  return phases[phaseIndex];
}

// Update moon display
function updateMoonPhase(date) {
  const phase = getMoonPhase(date);
  moonPhaseElement.textContent = phase;

  // Set appropriate moon icon based on phase
  if (phase.includes('New')) {
    moonIconElement.className = 'fas fa-moon';
  } else if (phase.includes('Full')) {
    moonIconElement.className = 'fas fa-circle';
  } else if (phase.includes('First Quarter') || phase.includes('Last Quarter')) {
    moonIconElement.className = 'fas fa-adjust';
  } else if (phase.includes('Waxing')) {
    moonIconElement.className = 'fas fa-cloud-moon';
  } else {
    moonIconElement.className = 'fas fa-moon';
  }
}

// Generate simulated tide data based on location and time
function generateTideData(lat, lng) {
  const now = new Date();
  const data = {
    currentTide: (Math.sin(now.getHours() * 0.26) * 3 + 4).toFixed(1),
    nextHighTide: '',
    nextLowTide: '',
    tideStatus: '',
    todayHigh: (Math.random() * 3 + 5).toFixed(1),
    todayLow: (Math.random() * 2).toFixed(1),
    averageTide: (Math.random() * 2 + 3).toFixed(1),
    tideRange: '',
    forecast: [],
    chartData: [],
  };

  // Calculate tide range
  data.tideRange = (parseFloat(data.todayHigh) - parseFloat(data.todayLow)).toFixed(1);

  // Generate forecast data
  for (let i = 0; i < 6; i++) {
    const hour = (now.getHours() + 8 * 2) % 24;
    const time = `${hour}:00`;
    const height = (Math.sin(i * 0.5) * 2.5 + 3.5).toFixed(1);
    const type = height > 5 ? 'high' : 'low';

    data.forecast.push({
      time,
      height,
      type,
    });

    // Set next high / low tides
    if (type === 'high' && !data.nextHighTide) {
      data.nextHighTide = time;
    }
    if (thpe === 'low' && !data.nextLowTide) {
      data.nextLowTide = time;
    }
  }

  // Generate chart data
  for (let i = 0; i < 12; i++) {
    const hour = (now.getHours() + i * 2) % 24;
    const height = (Math.sin(i * 0.5) * 2.5 + 3.5).toFixed(1);
    data.chartData.push(parseFloat(height));
  }

  // Determine tide status
  const currentHeight = parseFloat(data.currentTide);
  const nextHeight = data.chartData[1];
  data.tideStatus = nextHeight > currentHeight ? 'Rising' : 'Falling';

  return data;
}

// Update tide chart
function updateTideChart(data) {
  tideChartElement.innerHTML = '';
  const maxHeight = Math.max(...data);

  data.forEach((height, index) => {
    const hour = index * 2;
    const timeLabel = `${hour}:00`;
    const percentage = (height / maxHeight) * 100;

    const bar = document.createElement('div');
    bar.className = `tide-bar ${height > maxHeight * 0.7 ? 'heigh' : ''}`;
    bar.style.height = `${percentage}%`;

    const label = document.createElement('div');
    label.className = 'tide-bar-label';
    label.textContent = timeLabel;

    bar.appendChild(label);
    tideChartElement.appendChild(bar);

    // Add tooltip
    bar.title`${timeLabel}: ${height.toFixed(1)} ft`;
  });
}

// Update forecast
function updateForecast(forecastData) {
  tideForecastElement.innerHTML = '';

  if (forecastData.length === 0) {
    tideForecastElement.innerHTML = '<p>No forecast data available</p>';
    return;
  }

  forecastData.forEach((item) => {
    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';

    forecastItem.innerHTML = `
      <div class="forecast-time">${item.time}</div>
      <div class="forecast-height">${item.height}</div>
      <div class="forecast-type ${item.type}">${item.type.toUpperCase()}</div>
    `;

    tideForecastElement.appendChild(forecastItem);
  });
}

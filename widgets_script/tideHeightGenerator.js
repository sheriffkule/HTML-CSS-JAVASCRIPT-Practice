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

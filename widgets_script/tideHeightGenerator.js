// Initialize map
const map = L.map('map').setView([40.7128, -74.006], 10);

// Add OpenStreetMap tiles (free)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add a marker
let marker = L.marker([40.7128, -74.006]).addTo(map).bindPopup('New York Harbor').openPopup();

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

// Safe setter for textContent to avoid null element errors
function safeSetText(element, value, name = '') {
  if (element) {
    element.textContent = value;
  } else {
    if (name) {
      console.warn(`Element "${name}" not found; skipping update.`);
    } else {
      console.warn('Attempted to set text on a missing element; skipping update.');
    }
  }
}

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
  safeSetText(currentTimeElement, now.toLocaleDateString('en-US', options), 'current-time');
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
  safeSetText(moonPhaseElement, phase, 'moon-phase');

  // Set appropriate moon icon based on phase (guarded)
  if (!moonIconElement) {
    return;
  }

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
    const hour = (now.getHours() + i * 2) % 24;
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
    if (type === 'low' && !data.nextLowTide) {
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
  if (!tideChartElement) return;
  tideChartElement.innerHTML = '';
  const maxHeight = data.length ? Math.max(...data) : 0;
  const now = new Date();
  const baseHour = now.getHours();

  data.forEach((height, index) => {
    const hour = (baseHour + index * 2) % 24;
    const timeLabel = `${hour}:00`;
    const percentage = maxHeight > 0 ? (height / maxHeight) * 100 : 0;

    const bar = document.createElement('div');
    bar.className = `tide-bar ${height > maxHeight * 0.7 ? 'high' : ''}`;
    bar.style.height = `${percentage}%`;

    const label = document.createElement('div');
    label.className = 'tide-bar-label';
    label.textContent = timeLabel;

    bar.appendChild(label);
    tideChartElement.appendChild(bar);

    // Add tooltip
    bar.title = `${timeLabel}: ${height.toFixed(1)} ft`;
  });
}

// Update forecast
function updateForecast(forecastData) {
  if (!tideForecastElement) {
    console.warn('Element "tide-forecast" not found; skipping forecast rendering.');
    return;
  }
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

// Update all location data
function updateLocationData(lat, lng, locationName = 'Selected Location') {
  // Show loading
  loadingElement.style.display = 'block';

  // in a real app, you would fetch from an API here
  // For demonstration, we'll use simulated data
  setTimeout(() => {
    const data = generateTideData(lat, lng);

    // Update basic info (guarded)
    safeSetText(currentTideElement, `${data.currentTide} ft`, 'current-tide');
    safeSetText(nextHighTideElement, data.nextHighTide, 'next-high-tide');
    safeSetText(nextLowTideElement, data.nextLowTide, 'next-low-tide');
    safeSetText(tideStatusElement, data.tideStatus, 'tide-status');
    safeSetText(todayHighElement, `${data.todayHigh} ft`, 'today-high');
    safeSetText(todayLowElement, `${data.todayLow} ft`, 'today-low');
    safeSetText(averageTideElement, `${data.averageTide} ft`, 'average-tide');
    safeSetText(tideRangeElement, `${data.tideRange}`, 'tide-range');

    // Update moon phase
    updateMoonPhase(new Date());

    // Update location info (guarded)
    safeSetText(
      locationInfoElement,
      `Tide date for ${locationName} (${lat.toFixed(4)}, ${lng.toFixed(4)}). This location experiences mixed semidiurnal tides with two high and two low tides each day.`,
      'location-info'
    );

    // Update chart and forecast
    updateTideChart(data.chartData);
    updateForecast(data.forecast);

    // Update map
    updateMap(lat, lng, locationName);

    // Hide loading
    loadingElement.style.display = 'none';
  }, 1000);
}

// Set active location button
function setActiveLocationButton(locationKey) {
  locationButtons.forEach((button) => {
    const key = button.dataset.location || button.id || '';
    if (key === locationKey) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Get user's current location

function getCurrentLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  loadingElement.style.display = 'block';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      currentCoords = { lat, lng };

      // Update location name using reverse geocoding (simulated)
      const locationName = `Your Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

      updateLocationData(lat, lng, locationName);
      setActiveLocationButton(currentLocationButton.dataset.location || currentLocationButton.id);
    },
    (error) => {
      loadingElement.style.display = 'none';
      alert('Unable to retrieve your location. Using default location');
      console.error('Geolocation error:', error);
    }
  );
}

// Parse location input
function parseLocationInput(input) {
  input = input.trim();

  // Check if it's coordinates
  const coordMatch = input.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
  if (coordMatch) {
    return {
      lat: parseFloat(coordMatch[1]),
      lng: parseFloat(coordMatch[2]),
      name: `Custom Location (${coordMatch[1]}, ${coordMatch[2]})`,
    };
  }

  // For named locations, we would use a geocoding API in a real app
  // For demo, we'll use some predefined locations
  const predefinedLocations = {
    'new york': { lat: 40.7128, lng: -74.006, name: 'New York' },
    'los angeles': { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
    london: { lat: 51.5074, lng: -0.1278, name: 'London' },
    tokyo: { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
    sydney: { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
    miami: { lat: 25.7617, lng: -80.1918, name: 'Miami' },
    'san francisco': { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
  };

  const lowerInput = input.toLowerCase();
  if (predefinedLocations[lowerInput]) {
    return predefinedLocations[lowerInput];
  }

  // If no match, return null
  return null;
}

// Event listeners for location buttons
locationButtons.forEach((button) => {
  if (button.id !== 'current-location-btn') {
    button.addEventListener('click', () => {
      const coords = button.dataset.location.split(',').map((coord) => parseFloat(coord.trim()));
      currentCoords = { lat: coords[0], lng: coords[1] };
      const locationName = button.textContent;

      setActiveLocationButton(button.dataset.location);
      updateLocationData(currentCoords.lat, currentCoords.lng, locationName);
    });
  }
});

// Event listener for current location button
currentLocationButton.addEventListener('click', getCurrentLocation);

// Event listener for search button
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const location = parseLocationInput(searchTerm);
    if (location) {
      currentCoords = { lat: location.lat, lng: location.lng };
      updateLocationData(location.lat, location.lng, location.name);
      setActiveLocationButton(searchButton.dataset.location || 'search');
    } else {
      alert('Location not found. Please try coordinates (e.g., "40.7128,-74.0060") or a major city name.');
    }
    searchInput.value = '';
  }
});

// Allow Enter key to trigger search
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchButton.click();
  }
});

// Initialize the app
function initApp() {
  updateTime();
  setInterval(updateTime, 1000);

  updateLocationData(currentCoords.lat, currentCoords.lng, 'New York');
}

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();
initApp();

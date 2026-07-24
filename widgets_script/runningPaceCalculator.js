document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const icon = document.querySelector('#themeToggle i');

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      if (icon) icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
      localStorage.setItem('darkMode', isDark);
    });
  }

  // Pace Calculator
  const calculateBtn = document.getElementById('calculate');
  if (calculateBtn) calculateBtn.addEventListener('click', calculatePace);

  function calculatePace() {
    const distanceInput = document.getElementById('distance');
    const distance = distanceInput ? parseFloat(distanceInput.value) : NaN;
    const distanceUnitEl = document.getElementById('distance-unit');
    const distanceUnit = distanceUnitEl ? distanceUnitEl.value : 'km';
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (isNaN(distance) || distance <= 0) {
      alert('Please enter a valid distance (greater than 0)');
      if (distanceInput) distanceInput.focus();
      return;
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert('Please enter a valid time (at least 1 second)');
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    let distanceInKm;

    // Convert distance to km for calculations
    if (distanceUnit === 'km') {
      distanceInKm = distance;
    } else if (distanceUnit === 'mi') {
      distanceInKm = distance * 1.60934;
    } else if (distanceUnit === 'm') {
      distanceInKm = distance / 1000;
    } else {
      distanceInKm = distance; // fallback assume km
    }

    if (!distanceInKm || distanceInKm <= 0) {
      alert('Converted distance is invalid.');
      return;
    }

    // Calculate pace in seconds per km
    const paceSecondsPerKm = totalSeconds / distanceInKm;
    const paceMinutes = Math.floor(paceSecondsPerKm / 60);
    const paceSeconds = Math.floor(paceSecondsPerKm % 60);

    // Calculate speed in km/h
    const speedKmH = distanceInKm / (totalSeconds / 3600);

    // Display results
    const paceElem = document.getElementById('pace-value');
    const speedElem = document.getElementById('speed-value');
    if (paceElem) {
      paceElem.textContent = `${paceMinutes}:${paceSeconds < 10 ? '0' + paceSeconds : paceSeconds} min/km`;
    }
    if (speedElem) {
      speedElem.textContent = `${speedKmH.toFixed(2)} km/h`;
    }

    // Calculate projected race times
    calculateProjectedTimes(paceSecondsPerKm);

    // Calculate training paces
    calculateTrainingPaces(paceSecondsPerKm);

    // Show results
    const resultEl = document.getElementById('result');
    if (resultEl) resultEl.style.display = 'block';
  }

  function calculateProjectedTimes(paceSecondsPerKm) {
    // Calculate projected times for standard distances (km)
    const distances = {
      '5k': 5,
      '10k': 10,
      half: 21.0975,
      marathon: 42.195,
    };

    for (const [race, distKm] of Object.entries(distances)) {
      const totalSeconds = paceSecondsPerKm * distKm;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      let timeStr = '';
      if (hours > 0) timeStr += `${hours}h `;
      timeStr += `${minutes}m ${seconds}s`;

      const el = document.getElementById(`projected-${race}`);
      if (el) el.textContent = timeStr;
    }
  }

  function calculateTrainingPaces(paceSecondsPerKm) {
    // Calculate various training paces based on simple multipliers
    const easyPace = paceSecondsPerKm * 1.2;
    const tempoPace = paceSecondsPerKm * 0.9;
    const intervalPace = paceSecondsPerKm * 0.85;
    const speedPace = paceSecondsPerKm * 0.8;

    const easyEl = document.getElementById('easy-pace');
    const tempoEl = document.getElementById('tempo-pace');
    const intervalEl = document.getElementById('interval-pace');
    const speedEl = document.getElementById('speed-pace');

    if (easyEl) easyEl.textContent = formatPace(easyPace);
    if (tempoEl) tempoEl.textContent = formatPace(tempoPace);
    if (intervalEl) intervalEl.textContent = formatPace(intervalPace);
    if (speedEl) speedEl.textContent = formatPace(speedPace);
  }

  function formatPace(secondsPerKm) {
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.round(secondsPerKm % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds} min/km`;
  }

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

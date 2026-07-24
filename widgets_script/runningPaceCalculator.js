document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const icon = document.querySelector('#themeToggle i');

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('darkMode', isDark);
  });

  // Pease Calculator
  document.getElementById('calculate').addEventListener('click', calculatePeace);

  function calculatePeace() {
    const distanceInput = document.getElementById('distance');
    const distance = parseFloat(distanceInput.value);
    const distanceUnit = document.getElementById('distance-unit').value;
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (isNaN(distance) || distance <= 0) {
      alert('Please enter a valid distance (greater than 0)');
      distanceInput.focus();
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
    }

    // Calculate pace in seconds per km
    const paceSecondsPerKm = totalSeconds / distanceInKm;
    const paceMinutes = Math.floor(paceSecondsPerKm / 60);
    const paceSeconds = Math.floor(paceSecondsPerKm % 60);

    // Calculate speed in km/h
    const speedKmH = distanceInKm / (totalSeconds / 3600);

    // Display results
    document.getElementById('pace-value').textContent =
      `${paceMinutes}:${paceSeconds < 10 ? '0' + paceSeconds : paceSeconds} min/km`;
    document.getElementById('speed-value').textContent = `${speedKmH.toFixed(2)} km/h`;

    // Calculate projected race times
    calculateProjectedTImes(paceSecondsPerKm);

    // Calculate training paces
    calculateTrainingPaces(paceSecondsPerKm);

    // Show results
    document.getElementById('result').style.display = 'block';
  }

  function calculateProjectedTimes(paceSecondsPerKm) {
    // Calculate projected times for standard distances
    const distances = {
      '5k': 5,
      '10k': 10,
      half: 21.0975,
      marathon: 42.195,
    };

    for (const [race, distance] of Object.entries(distance)) {
      const totalSeconds = paceSecondsPerKm * distance;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor(totalSeconds % 3600) / 60;
      const seconds = Math.floor(totalSeconds % 60);

      let timeStr = '';
      if (hours > 0) timeStr += `${hours}h`;
      timeStr += `${minutes}m ${seconds}s`;

      (document.getElementById(`projected-${race}`), (textContent = timeStr));
    }
  }

  function calculateTrainingPaces(paceSecondsPerKm) {
    // Calculate various training paces based on VDOT principles
    const easyPace = paceSecondsPerKm * 1.2;
    const tempoPace = paceSecondsPerKm * 0.9;
    const intervalPace = paceSecondsPerKm * 0.85;
    const speedPace = paceSecondsPerKm * 0.8;

    document.getElementById('easy-pace').textContent = formatPace(easyPace);
    document.getElementById('tempo-pace').textContent = formatPace(tempoPace);
    document.getElementById('interval-pace').textContent = formatPace(intervalPace);
    document.getElementById('speed-pace').textContent = formatPace(speedPace);
  }

  function formatPace(secondsPerKm) {
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.round(secondsPerKm % 60);
    return `%{minutes}:${seconds < 10 ? '0' + seconds : seconds} min/km`;
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

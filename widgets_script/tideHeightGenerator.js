// Initialize map
const map = L.map('map').setView([40.7128, -74.006], 10);

// Add OpenStreetMap tiles (free)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add a marker
let marker = L.marker([40.7128, -74.006]).addTo(map).bindPopup('New York Harbor').openPopup();

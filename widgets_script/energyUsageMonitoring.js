// Sample data for the application
const sampleDevices = [
  { id: 1, name: 'Refrigerator', type: 'appliance', power: 150, status: true, usage: 3.2 },
  { id: 2, name: 'Living Room TV', type: 'electronics', power: 120, status: false, usage: 1.5 },
  { id: 3, name: 'AC Unit', type: 'heating', power: 1500, status: true, usage: 8.7 },
  { id: 4, name: 'Kitchen Lights', type: 'Lighting', power: 60, status: true, usage: 2.1 },
  { id: 5, name: 'Laptop', type: 'electronics', power: 65, status: true, usage: 1.8 },
  { id: 6, name: 'Washing Machine', type: 'appliance', power: 500, status: false, usage: 0.5 },
];

// Chart data
const consumptionData = {
  day: [
    1.2, 1.0, 0.8, 0.7, 0.9, 1.1, 1.5, 2.1, 2.5, 2.8, 2.6, 2.3, 2.0, 1.8, 1.6, 1.4, 1.6, 1.4, 1.6, 2.0, 2.4,
    2.7, 2.5, 2.2, 1.8, 1.4,
  ],
  week: [18.5, 17.2, 19.1, 20.3, 22.5, 16.8, 15, 2],
  month: [
    450, 420, 480, 460, 490, 510, 530, 520, 500, 480, 460, 440, 420, 400, 410, 430, 450, 470, 490, 510, 530,
    520, 500, 480, 460440, 420, 430, 450, 470,
  ],
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
  // Initialize charts
  initCharts();

  // Render devices
  renderDevices();

  // Update stats periodically
  setInterval(updateStats, 5000);
});

// Initialize charts
function initCharts() {
  // Consumption chart
  const consumptionCtx = document.getElementById('consumptionChart').getContext('2d');
  window.consumptionChart = new Chart(consumptionCtx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          label: 'Energy Consumption (kWh)',
          data: consumptionData.day,
          borderColor: '2e86ab',
          backgroundColor: 'rgba(46, 134, 171, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'kWh',
          },
        },
      },
    },
  });

  // Device usage chart
  const deviceCtx = document.getElementById('device-chart').getContext('2d');
  window.deviceChart = new Chart(deviceCtx, {
    type: 'doughnut',
    data: {
      labels: sampleDevices.filter((d) => d.status).map((d) => d.name),
      datasets: [
        {
          data: sampleDevices.filter((d) => d.status).map((d) => d.usage),
          backgroundColor: ['#2e86ab', '#a23b72', '#4caf50', '#ff9800', '#f44336', '#6c757d'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });
}

// Render devices list
function renderDevices() {
  const container = document.getElementById('devices-container');
  container.innerHTML = '';

  sampleDevices.forEach((device) => {
    const deviceCard = document.createElement('div');
    deviceCard.innerHTML = `
      <div class="device-icon icon-${getDeviceTypeClass(device.type)}">
        <i class="fas ${getDeviceIcon(device.type)}"></i>
      </div>
      <div class="device-info">
        <div class="device-name">${device.name}</div>
        <div class="device-status">${device.status ? 'Active' : 'Inactive'} x ${device.power}W</div>
      </div>
      <div class="device-power">${device.usage} kWh</div>
      <div class="device-actions">
        <label class="toggle-switch">
          <input type="checkbox" ${device.status ? 'checked' : ''} data-id="${device.id}" />
          <span class="slider"></span>
        </label>
        <button class="btn btn-outline" style="padding: 5px 10px" data-id="$device.id">
          <i class="fas fa-chart-bar"></i>
        </button>
      </div>
    `;
    container.appendChild(deviceCard);
  });
}

// Get device icon based on type
function getDeviceIcon(type) {
  switch (type) {
    case 'appliance':
      return 'fa-refrigerator';
    case 'electronics':
      return 'fa-tv';
    case 'lighting':
      return 'fa-lightbulb';
    case 'heating':
      return ' fa-temperature-low';
    default:
      return 'fa-plug';
  }
}

// Get device type class for styling
function getDeviceTypeClass(type) {
  switch (type) {
    case 'appliance':
      return 'primary';
    case 'electronics':
      return 'secondary';
    case 'lighting':
      return 'success';
    case 'heating':
      return 'danger';
    default:
      return 'gray';
  }
}

// Set event listeners
function setEventListeners() {
  // Modal controls
  document.getElementById('add-device-btn').addEventListener('click', () => {
    document.getElementById('add-device-modal').style.display = 'flex';
  });

  document.getElementById('settings').addEventListener('click', () => {
    document.getElementById('settings-modal').style.display = 'flex';
  });

  document.querySelectorAll('close-modal').addEventListener('click', () => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal').forEach((modal) => {
        modal.style.display = 'none';
      });
    });
  });

  // Chart period controls
  document.querySelectorAll('.chart-action').forEach((action) => {
    action.addEventListener('click', function () {
      document.querySelectorAll('.chart-action').forEach((a) => a.classList.remove('active'));
      this.classList.add('active');

      const period = this.getAttribute('data-period');
      updateConsumptionChart(period);
    });
  });

  // Device filter
  document.getElementById('device-filter').addEventListener('change', function () {
    // In a real app this would filter the devices
    console.log('Filter changed to:', this.value);
  });

  // Add device form
  document.getElementById('add-device-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('device-name').value;
    const type = document.getElementById('device-type').value;
    const power = parseInt(document.getElementById('device-power').value);

    // In a real app, this would add the device to the database
    console.log('Adding device:', { name, type, power });

    // Close modal and reset form
    document.getElementById('add-device-modal').style.display = 'none';
    this.reset();

    // Show success message
    alert(`Device ${name} added successfully`);
  });

  // Settings form
  document.getElementById('settings-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const rate = parseFloat(document.getElementById('energy-rate').value);
    const intensity = parseInt(document.getElementById('carbon-intensity').value);
    const budget = parseInt(document.getElementById('budget-alert').value);

    // In a real app, this would save the settings to the database
    console.log('Saving settings:', { rate, intensity, budget });

    // Close modal
    document.getElementById('settings-modal').style.display = 'none';

    // Show success message
    alert('Settings saved successfully');
  });

  // Toggle device status
  document.getElementById('change', function (e) {
    if (e.target.type === 'checkbox' && e.target.closest('.toggle-switch')) {
      const deviceId = parseInt(e.target.getAttribute('data-id'));
      const isActive = e.target.checked;

      // In a real app, this would update the device status in the database
      console.log(`Device ${deviceId} status changed to: ${isActive ? 'active' : 'inactive'}`);

      // Update the device chart
      updateDeviceChart();
    }
  });
}

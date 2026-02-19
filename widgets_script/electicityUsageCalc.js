document.addEventListener('DOMContentLoaded', function () {
  // Tab functionality
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Sample appliances data
  const sampleAppliances = [
    { name: 'Refrigerator', watts: 150, hours: 24 },
    { name: 'LED TV', watts: 100, hours: 4 },
    { name: 'Air Conditioner', watts: 1000, hours: 8 },
    { name: 'Laptop', watts: 50, hours: 6 },
    { name: 'LED Bulb', watts: 10, hours: 5 },
  ];

  // Initialize with sample appliances
  sampleAppliances.forEach((appliance) => {
    addApplianceToDOM(appliance);
  });

  // Add appliance functionality
  document.getElementById('add-appliance').addEventListener('click', function () {
    const name = document.getElementById('new-appliance-name').value.trim();
    const watts = parseFloat(document.getElementById('new-appliance-watts').value);
    const hours = parseFloat(document.getElementById('new-appliance-hours').value);

    if (!name || isNaN(watts) || isNaN(hours)) {
      alert('Please fill all fields with valid values');
      return;
    }

    const appliance = { name, watts, hours };
    addApplianceToDOM(appliance);

    // Clear inputs
    document.getElementById('new-appliance-name').value = '';
    document.getElementById('new-appliance-watts').value = '';
    document.getElementById('new-appliance-hours').value = '';
  });

  function addApplianceToDOM(appliance) {
    const container = document.getElementById('appliances-container');
    const applianceElement = document.createElement('div');
    applianceElement.className = 'appliance-item';
    applianceElement.innerHTML = `
      <div class="appliance-icon">
        <i class="fas fa-plug"></i>
      </div>
      <div class="appliance-detail">
        <div class="appliance-name">${appliance.name}</div>
        <div class="appliance-watts">${appliance.watts}W × ${appliance.hours}</div>
      </div>
      <div class="appliance-action">
        <button class="btn-icon remove-appliance"></button>
      </div>
    `;
    container.appendChild(applianceElement);

    // Add event listener to remove button
    applianceElement.querySelector('.remove-appliance').addEventListener('click', function () {
      container.removeChild(applianceElement);
    });
  }

  // Basic calculation
  document.getElementById('calculate-basic').addEventListener('click', function () {
    const kwh = parseFloat(document.getElementById('basic-kwh').value);
    const rate = parseFloat(document.getElementById('basic-rate').value);

    if (isNaN(kwh) || isNaN(rate)) {
      alert('Please enter valid numbers.');
      return;
    }

    calculateAndDisplay(kwh, rate, 30);
  });

  // Appliance calculation
  document.getElementById('calculate-appliance').addEventListener('click', function () {
    const applianceItems = document.querySelectorAll('.appliance-item');
    if (applianceItems.length === 0) {
      alert('Please add at least one appliance');
      return;
    }

    const rate = parseFloat(document.getElementById('appliance-rate').value);
    if (isNaN(rate)) {
      alert('Please enter a valid electricity rate');
      return;
    }

    let totalWatts = 0;
    applianceItems.forEach((item) => {
      const wattsText = item.querySelector('.appliance-watts').textContent;
      const [watts, hours] = wattsText.split('W × ').map((part) => parseFloat(part));
      totalWatts += watts * hours;
    });

    // Convert watts to kWh (1000 wats = 1 kW)
    const dailyKwh = totalWatts / 1000;
    const monthlyKwh = dailyKwh * 30;

    calculateAndDisplay(monthlyKwh, rate, 30);
  });

  // Advanced calculation
  document.getElementById('calculate-advanced').addEventListener('click', function () {
    const days = parseFloat(document.getElementById('advanced-days').value);
    const rate = parseFloat(document.getElementById('advanced-rate').value);
    const taxRate = parseFloat(document.getElementById('advanced-tax').value);
    const usagePattern = document.getElementById('advanced-usage').value;

    if (isNaN(days) || isNaN(rate) || isNaN(taxRate)) {
      alert('Please enter valid number.');
      return;
    }

    // For demo purposes, we'll just use a fixed kWh based on usage pattern
    let kwh;
    switch (usagePattern) {
      case 'consistent':
        kwh = 300 * (days / 30);
        break;
      case 'peak':
        kwh = 450 * (days / 30);
        break;
      case 'variable':
        kvh = 375 * (days / 30);
        break;
      default:
        kwh = 300 * (days / 30);
    }

    calculateAndDisplay(kwh, rate, days, taxRate);
  });

  function calculateAndDisplay(kwh, rate, days, taxRate = 0) {
    const dailyKwh = kwh / days;
    const hourlyKwh = dailyKwh / 24;

    const cost = kwh * rate;
    const dailyCost = dailyKwh * rate;
    const hourlyCost = hourlyKwh * rate;

    let taxAmount = 0;
    if (taxRate > 0) {
      taxAmount = cost * (taxRate / 100);
      document.getElementById('tax-row').style.display = 'flex';
      document.getElementById('tax-amount').textContent = `$${taxAmount.toFixed(2)}`;
    } else {
      document.getElementById('tax-row').style.display = 'none';
    }

    const totalCost = cost + taxAmount;

    // Update DOM
    document.getElementById('total-kwh').textContent = kwh.toFixed(2);
    document.getElementById('daily-kwh').textContent = `${dailyKwh.toFixed(2)} kWh`;
    document.getElementById('hourly-kwh').textContent = `${hourlyKwh.toFixed(3)} kWh`;

    document.getElementById('total-cost').textContent = `$${totalCost.toFixed(2)}`;
    document.getElementById('daily-cost').textContent = `$${(dailyCost + taxAmount / days).toFixed(2)}`;
    document.getElementById('hourly-cost').textContent =
      `$${(hourlyCost + taxAmount / (days * 24)).toFixed(2)}`;

    // Show random energy saving tip
    showRandomTip();

    // Show results section
    document.getElementById('results').classList.add('active');

    // Update charts
  }
});

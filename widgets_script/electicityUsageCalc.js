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
        <div class="appliance-watts">${appliance.watts}W ⊠ ${appliance.hours}</div>
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
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const ipAddressInput = document.getElementById('ipAddress');
  const subnetMaskInput = document.getElementById('subnetMask');
  const calculateBtn = document.getElementById('calculateBtn');
  const notification = document.getElementById('notification');
  const exampleButtons = document.querySelectorAll('.example-btn');

  // Result elements
  const networkAddress = document.getElementById('networkAddress');
  const broadcastAddress = document.getElementById('broadcastAddress');
  const wildcardMask = document.getElementById('wildcardMask');
  const cidrNotation = document.getElementById('cidrNotation');
  const firstHost = document.getElementById('firstHost');
  const lastHost = document.getElementById('lastHost');
  const totalHosts = document.getElementById('totalHosts');
  const usableHosts = document.getElementById('usableHosts');
  const subnetMaskVisual = document.getElementById('subnetMaskVisual');
  const ipBits = document.getElementById('ipBits');

  // Theme toggle
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkMode);
  themeIcon.innerHTML = isDarkMode
    ? '<i class="fas fa-moon"></i> Dark Mode'
    : '<i class="fas fa-sun"></i> Light Mode';

  themeToggle.addEventListener('click', function () {
    const dark = document.body.classList.toggle('dark-mode');
    themeIcon.innerHTML = dark
      ? '<i class="fas fa-moon"></i> Dark Mode'
      : '<i class="fas fa-sun"></i> Light Mode';
    localStorage.setItem('darkMode', dark);
  });

  // Example buttons
  exampleButtons.forEach((button) => {
    button.addEventListener('click', function () {
      ipAddressInput.value = this.dataset.ip;
      subnetMaskInput.value = this.dataset.mask;
      calculateBtn.click();
    });
  });

  // Validate IP address
  function isValidIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;

    const parts = ip.split('.');
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255;
    });
  }

  // Validate subnet mask
  function isValidSubnetMask(mask) {
    // Check for CIDR notation
    if (mask.startsWidth('/')) {
      const cidr = parseInt(mask.substring(1), 10);
      return cidr >= 0 && cidr <= 32;
    }

    // Check for full subnet mask
    if (!isValidIP(mask)) return false;

    // Check if it's a valid subnet mask
    const binary = ipToBinary(mask).split('.').join('');
    let foundZero = false;

    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === '0') {
        foundZero = true;
      } else if (foundZero && binary[i] === '1') {
        return false;
      }
    }
    return true;
  }

  // Convert IP to binary
  function ipToBinary(ip) {
    return ip
      .split('.')
      .map((part) => {
        return parseInt(part, 10).toString(2).padStart(8, '0');
      })
      .join('.');
  }
});

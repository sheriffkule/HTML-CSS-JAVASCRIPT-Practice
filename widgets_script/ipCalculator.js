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

  // Convert CIDR to subnet mask
  function cidrToSubnetMask(cidr) {
    cidr = parseInt(cidr, 10);
    const bits = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
    return [
      parseInt(bits.substring(0, 8), 2),
      parseInt(bits.substring(8, 16), 2),
      parseInt(bits.substring(16, 24), 2),
      parseInt(bits.substring(24, 32), 2),
    ].join('.');
  }

  // Get CIDR from subnet mask
  function subnetMaskToCidr(mask) {
    const binary = ipToBinary(mask).split('.').join('');
    return (binary.match(/1/g) || []).length;
  }

  // Calculate network information
  function calculateNetwork(ip, mask) {
    // Convert mask to CIDR if needed
    if (mask.startsWidth('/')) {
      const cidr = parseInt(mask.substring(1), 10);
      mask = cidrToSubnetMask(cidr);
    }

    const ipParts = ip.split('.').map((part) => parseInt(part, 10));
    const maskParts = mask.split('.').map((part) => parseInt(part, 10));

    // Calculate network address
    const networkParts = ipParts.map((part, i) => part & maskParts[i]);
    const network = networkParts.join('.');

    // Calculate broadcast address
    const wildcardParts = maskParts.map((part) => 255 - part);
    const broadcastParts = networkParts.map((part, i) => part | wildcardParts[i]);
    const broadcast = broadcastParts.join('.');

    // Calculate wildcard mask
    const wildcard = wildcardParts.join('.');

    // Calculate CIDR notation
    const cidr = subnetMaskToCidr(mask);

    // Calculate host range
    const first = [...networkParts];
    first[3] += 1;
    const firstHostIp = first.join('.');

    const last = [...broadcastParts];
    last[3] -= 1;
    const lastHostIp = last.join('.');

    // Calculate number of hosts
    const total = Math.pow(2, 32 - cidr);
    const usable = total > 2 ? total - 2 : 0;

    return {
      network,
      broadcast,
      wildcard,
      cidr: `/${cidr}`,
      firstHost: firstHostIp,
      lastHost: lastHostIp,
      totalHosts: total,
      usableHosts: usable,
    };
  }

  // Show notification
  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // Update visualization
  function updateVisualization(cidr, ip) {
    // Clear previous bits
    ipBits.innerHTML = '';

    // Update subnet mask visual
    const maskPercentage = (cidr / 32) * 100;
    subnetMaskVisual.style.width = `${maskPercentage}%`;

    // Create IP bits visualization
    const binaryIp = ipToBinary(ip).split('.').join('');

    for (let i = 0; i < 32; i++) {
      const bit = document.createElement('div');
      bit.className = `bit ${i < cidr ? 'network' : 'host'}`;
      bit.textContent = binaryIp[i];
      bit.title = `Bit ${i + 1} (${i < cidr ? 'Network' : 'Host'})`;
      ipBits.appendChild(bit);
    }
  }
});

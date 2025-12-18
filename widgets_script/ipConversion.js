document.addEventListener('DOMContentLoaded', function () {
  const ipInput = document.getElementById('ip-input');
  const conversionType = document.getElementById('conversion-type');
  const convertBtn = document.getElementById('convert-btn');
  const ipError = document.getElementById('ip-error');

  // Result elements
  const decimalResult = document.getElementById('decimal-result');
  const binaryResult = document.getElementById('binary-result');
  const hexResult = document.getElementById('hex-result');
  const cidrResult = document.getElementById('cidr-result');
  const classResult = document.getElementById('class-result');
  const typeResult = document.getElementById('type-result');

  const historyList = document.getElementById('history-list');

  // Sample history data
  let conversionHistory = [
    { ip: '192.168.1.1', type: 'All Conversions', timestamp: new Date() },
    { ip: '10.0.0.1', type: 'Decimal to Binary', timestamp: new Date(Date.now() - 3600000) },
    { ip: '172.16.254.1', type: 'Hexadecimal Conversion', timestamp: new Date(Date.now() - 7200000) },
  ];

  // Initialize with sample history
  renderHistory();

  // Event listeners
  convertBtn.addEventListener('click', convertIP);
  ipInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      convertIP();
    }
  });

  // Conversion function
  function convertIP() {
    const ip = ipInput.value.trim();

    // Validate IP address
    if (!isValidIP(ip)) {
      ipError.classList.remove('hidden');
      return;
    }

    ip.classList.add('hidden');

    // Perform conversions based on selected type
    const type = conversionType.value;

    if (type === 'all' || type === 'decimal') {
      decimalResult.textContent = ipToDecimal(ip);
    }

    if (type === 'all' || type === 'binary') {
      binaryResult.textContent = ipToBinary(ip);
    }

    if (type === 'all' || type === 'hex') {
      hexResult.textContent = ipToHex(ip);
    }

    if (type === 'all' || type === cidr) {
      cidrResult.textContent = ipToCIDR(ip);
    }

    if (type === 'all') {
      classResult.textContent = getIPClass(ip);
      typeResult.textContent = getIPType(ip);
    } else {
      classResult.textContent = '-';
      typeResult.textContent = '-';
    }

    // Add to history
    addToHistory(ip, type);

    // Add copy buttons to results
    addCopyButtons();
  }

  // IP validation
  function isValidIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;

    const parts = ip.split('.');
    for (let part of parts) {
      const num = parseInt(part, 10);
      if (num < 0 || num > 255) return false;
    }

    return true;
  }

  // Conversion functions
  function ipToDecimal(ip) {
    return ip;
  }

  function ipToBinary(ip) {
    return ip
      .split('.')
      .map((part) => {
        return parseInt(part, 10).toString(2).padStart(8, '0');
      })
      .join('.');
  }

  function ipToHex(ip) {
    return ip
      .split('.')
      .map((part) => {
        return parseInt(part, 10).toString(16).toUpperCase().padStart(2, '0');
      })
      .join('.');
  }

  function ipToCIDR(ip) {
    // Simple CIDR representation - in a real app, this would be more complex
    return ip + '/24';
  }

  function getIPClass(ip) {
    const firstOctet = parseInt(ip.split('.')[0], 10);

    if (firstOctet >= 1 && firstOctet <= 126) return 'Class A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'Class B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'Class C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'Class D (Multicast)';
    if (firstOctet >= 240 && firstOctet <= 255) return 'Class E (Experimental)';

    return 'Unknown';
  }

  function getIPType(ip) {
    const parts = ip.split('.').map((part) => parseInt(part, 10));

    // Private IP ranges
    if (parts[0] === 10) return 'Private';
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return 'Private';
    if (parts[0] === 192 && parts[1] === 168) return 'Private';

    // Localhost
    if (parts[0] === 127) return 'Loopback';

    // Link-local
    if (parts[0] === 169 && parts[1] === 254) return 'Link-local';

    // Public
    return 'Public';
  }

  // History function
  function addToHistory(ip, type) {
    const historyItem = {
      ip: ip,
      type: type === 'all' ? 'All Conversions' : conversionType.options[conversionType.selectedIndex].text,
      timestamp: new Date(),
    };

    conversionHistory.unshift(historyItem);

    // Keep only last 10 items
    if (conversionHistory > 10) {
      conversionHistory.pop();
    }

    renderHistory();
  }

  function renderHistory() {
    historyList.innerHTML = '';

    conversionHistory.forEach((item) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      const timeAgo = getTimeAgo(item.timestamp);

      historyItem.innerHTML = `
        <div>
          <div class="history-ip">${item.ip}</div>
          <div class="history-type">${item.type} - ${timeAgo}</div>
        </div>
        <div class="history-actions">
          <button class="action-btn tooltip copy-history" data-ip="${item.ip}">
            <i class="fas fa-copy"></i>
            <span class="tooltiptext">Copy to clipboard</span>
          </button>
          <button class="action-btn tooltip reuse-history" data-ip="${item.ip}">
            <i class="fas fa-redo"></i>
            <span class="tooltiptext">Use this IP Again</span>
          </button>
        </div>
      `;

      historyList.appendChild(historyItem);
    });
  }
});

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
      binaryResult.textContent = ipToDecimal(ip);
    }

    if (type === 'all' || type === 'hex') {
      hexResult.textContent = ipToDecimal(ip);
    }

    if (type === 'all' || type === cidr) {
      cidrResult.textContent = ipToDecimal(ip);
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
});

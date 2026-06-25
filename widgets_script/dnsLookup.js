document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const domainInput = document.getElementById('domain-input');
  const lookupBtn = document.getElementById('lookup-btn');
  const recordTypes = document.querySelectorAll('.record-type');
  const resultsContainer = document.getElementById('results-container');
  const resultsBody = document.getElementById('results-body');
  const errorMessage = document.getElementById('error-message');
  const loader = document.querySelector('.loader');
  const copyResultsBtn = document.getElementById('copy-results');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history');

  // Current selected record type
  let currentRecordType = 'A';

  // Initialize history from localStorage
  let lookupHistory = [];
  try {
    lookupHistory = JSON.parse(localStorage.getItem('dnsLookupHistory')) || [];
  } catch (error) {
    console.warn('Could not parse DNS lookup history:', error);
    localStorage.removeItem('dnsLookupHistory');
  }
  renderHistory();

  // Event listeners
  lookupBtn.addEventListener('click', performLookup);
  domainInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') performLookup();
  });

  recordTypes.forEach((type) => {
    type.addEventListener('click', function () {
      recordTypes.forEach((t) => t.classList.remove('active'));
      this.classList.add('active');
      currentRecordType = this.dataset.type;

      // If there's already a domain in the input, perform lookup
      if (domainInput.value.trim()) performLookup();
    });
  });

  copyResultsBtn.addEventListener('click', copyResultsToClipboard);
  clearHistoryBtn.addEventListener('click', clearHistory);

  // Functions
  function performLookup() {
    const domain = domainInput.value.trim();

    if (!domain) {
      showError('Please enter a domain name!');
      return;
    }

    // Validate domain format
    if (!isValidDomain(domain)) {
      showError('Please enter a valid domain name!');
      return;
    }

    // Show loader and hide previous results/errors
    loader.style.display = 'block';
    resultsContainer.style.display = 'none';
    errorMessage.style.display = 'none';

    // Simulate API call (in a real app, you would use a real DNS lookup API)
    setTimeout(() => {
      try {
        const results = simulateDnsLookup(domain, currentRecordType);
        displayResults(results);
        addToHistory(domain, currentRecordType);
      } catch (error) {
        showError(error.message);
      } finally {
        loader.style.display = 'none';
      }
    }, 800);
  }

  function simulateDnsLookup(domain, type) {
    // This is a simulation - in a real app, you would call a DNS API
    const randomIP = () =>
      `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const randomIPv6 = () => {
      const segments = [];
      for (let i = 0; i < 8; i++) {
        segments.push(Math.floor(Math.random() * 65535).toString(16));
      }
      return segments.join(':');
    };

    const results = [];
    const now = new Date();

    // Simulate different record types
    switch (type) {
      case 'A':
        results.push({
          type: 'A',
          name: domain,
          value: randomIP(),
          ttl: '3600',
        });
        results.push({
          type: 'A',
          name: domain,
          value: randomIP(),
          ttl: '3600',
        });
        break;
      case 'AAA':
        results.push({
          type: 'AAA',
          name: domain,
          value: randomIPv6(),
          ttl: '3600',
        });
        break;
      case 'MX':
        results.push({
          type: 'MX',
          name: domain,
          value: `10 mail.${domain}`,
          ttl: '14400',
        });
        results.push({
          type: 'MX',
          name: domain,
          value: `20 backup.${domain}`,
          ttl: '14400',
        });
        break;
      case 'CNAME':
        results.push({
          type: 'CNAME',
          name: `www.${domain}`,
          value: domain,
          ttl: '86400',
        });
        break;
      case 'TXT':
        results.push({
          type: 'TXT',
          name: domain,
          value: '"v=spf1 include:_spf.google.com ~all"',
          ttl: '3600',
        });
        results.push({
          type: 'TXT',
          name: domain,
          value: '"google-site-verification=ABC123XYZ"',
          ttl: '3600',
        });
        break;
      case 'NS':
        results.push({
          type: 'NS',
          name: domain,
          value: `ns1.${domain}`,
          ttl: '172800',
        });
        results.push({
          type: 'NS',
          name: domain,
          value: `ns2.${domain}`,
          ttl: '172800',
        });
        break;
      case 'SOA':
        results.push({
          type: 'SOA',
          name: domain,
          value: `ns1.${domain} hostmaster.${domain} ${now.getFullYear()}010100 3600 2800 604800 86400`,
          ttl: '3600',
        });
        break;
      case 'PTR':
        results.push({
          type: 'PTR',
          name: '1.0.0.10.in-addr.arpa',
          value: domain,
          ttl: '3600',
        });
        break;
      default:
        throw new Error(`Unsupported record type: ${type}`);
    }

    // Simulate additional domain info
    updateDomainInfo(domain);

    return results;
  }

  function updateDomainInfo(domain) {
    // Simulate domain information
    const registrars = ['GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare', 'Name.com'];
    const isps = ['Cloudflare', 'Amazon AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean'];
    const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Frankfurt, DE'];

    const now = new Date();
    const createdDate = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
    const expiresDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    const registrarElement = document.getElementById('domain-registar') || document.getElementById('domain-register');
    const createdElement = document.getElementById('domain-created');
    const expiresElement = document.getElementById('domain-expires');
    const serverIpElement = document.getElementById('server-ip');
    const serverLocationElement = document.getElementById('server-location');
    const serverIspElement = document.getElementById('server-isp');

    if (registrarElement) {
      registrarElement.textContent = `Registrar: ${registrars[Math.floor(Math.random() * registrars.length)]}`;
    }
    if (createdElement) {
      createdElement.textContent = `Created: ${createdDate.toLocaleDateString()}`;
    }
    if (expiresElement) {
      expiresElement.textContent = `Expires: ${expiresDate.toLocaleDateString()}`;
    }
    if (serverIpElement) {
      serverIpElement.textContent = `IP: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }
    if (serverLocationElement) {
      serverLocationElement.textContent = `Location: ${locations[Math.floor(Math.random() * locations.length)]}`;
    }
    if (serverIspElement) {
      serverIspElement.textContent = `ISP: ${isps[Math.floor(Math.random() * isps.length)]}`;
    }
  }

  function displayResults(results) {
    resultsBody.innerHTML = '';

    results.forEach((result) => {
      const row = document.createElement('tr');

      const typeCell = document.createElement('td');
      typeCell.textContent = result.type;
      row.appendChild(typeCell);

      const nameCell = document.createElement('td');
      nameCell.textContent = result.name;
      row.appendChild(nameCell);

      const valueCell = document.createElement('td');
      valueCell.textContent = result.value;
      row.appendChild(valueCell);

      const ttlCell = document.createElement('td');
      ttlCell.textContent = result.ttl;
      row.appendChild(ttlCell);

      resultsBody.appendChild(row);
    });

    resultsContainer.style.display = 'block';
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    loader.style.display = 'none';
  }

  function isValidDomain(domain) {
    // Simple domain validation - in production, use a more robust regex
    return /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(domain);
  }

  function copyResultsToClipboard() {
    const table = document.getElementById('result-table');
    let textToCopy = 'DNS Lookup Results\n\n';

    // Add headers
    const headers = table.querySelectorAll('th');
    textToCopy +=
      Array.from(headers)
        .map((header) => header.textContent)
        .join('\t') + '\n';

    // Add rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      textToCopy +=
        Array.from(cells)
          .map((cell) => cell.textContent)
          .join('\t') + '\n';
    });

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = copyResultsBtn.innerHTML;
      copyResultsBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
      setTimeout(() => {
        copyResultsBtn.innerHTML = originalText;
      }, 2000);
    });
  }

  function addToHistory(domain, type) {
    // Check if this lookup is already in history
    const existingIndex = lookupHistory.findIndex((item) => item.domain === domain && item.type === type);

    if (existingIndex !== -1) {
      // Remove existing entry to add it to the top
      lookupHistory.splice(existingIndex, 1);
    }

    // Add new entry to the beginning of the array
    lookupHistory.unshift({ domain, type, timestamp: new Date().toISOString() });

    // Keep only the last 10 items
    if (lookupHistory.length > 10) lookupHistory = lookupHistory.slice(0, 10);

    // Save to localStorage
    localStorage.setItem('dnsLookupHistory', JSON.stringify(lookupHistory));

    // Update UI
    renderHistory();
  }

  function renderHistory() {
    if (lookupHistory.length === 0) {
      historyList.innerHTML = '<li class="empty-history">No lookup history yet</li>';
      return;
    }

    historyList.innerHTML = '';

    lookupHistory.forEach((item) => {
      const historyItem = document.createElement('li');
      historyItem.className = 'history-item';

      const domainSpan = document.createElement('span');
      domainSpan.className = 'domain';
      domainSpan.textContent = `${item.domain} (${item.type})`;

      const timeSpan = document.createElement('span');
      timeSpan.className = 'time';
      timeSpan.textContent = new Date(item.timestamp).toLocaleString();

      historyItem.appendChild(domainSpan);
      historyItem.appendChild(timeSpan);

      historyItem.addEventListener('click', () => {
        domainInput.value = item.domain;
        recordTypes.forEach((t) => {
          t.classList.toggle('active', t.dataset.type === item.type);
        });
        currentRecordType = item.type;
        performLookup();
      });

      historyList.appendChild(historyItem);
    });
  }

  function clearHistory() {
    if (confirm('Are you sure you want to clear your lookup history?')) {
      lookupHistory = [];
      localStorage.removeItem('dnsLookupHistory');
      renderHistory();
    }
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

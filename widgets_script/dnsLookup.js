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
  let lookupHistory = JSON.parse(localStorage.getItem('dnsLookupHistory')) || [];
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
    updateDomainInfo(domain)

    return results;
  }
});

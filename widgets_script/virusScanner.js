let stars = [];

function createStars() {
  const starsContainer = document.getElementById('stars');

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size = Math.random() * 2 + 12;
    const duration = Math.random() * 5 + 10;
    const opacity = Math.random() * 0.7 + 0.3;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--opacity', `${opacity}`);

    starsContainer.appendChild(star);
    stars.push(star);
  }
}
createStars();

const switchInput = document.getElementById('switch');
const body = document.body;
const themeText = document.querySelector('.themeText');

switchInput.addEventListener('change', () => {
  document.body.classList.toggle('darkTheme');

  themeText.textContent = body.classList.contains('darkTheme') ? 'Dark Theme' : 'Light Theme';
});

let buttons = document.querySelectorAll('.button');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    for (let i = 0; i < 50; i++) {
      let spark = document.createElement('i');
      spark.classList.add('spark');

      const randomX = (Math.random() - 0.5) * window.innerWidth;
      const randomY = (Math.random() - 0.5) * window.innerHeight;
      spark.style.setProperty('--x', randomX + 'px');
      spark.style.setProperty('--y', randomY + 'px');

      const randomSize = Math.random() * 8 + 2;
      spark.style.width = randomSize + 'px';
      spark.style.height = randomSize + 'px';

      button.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, 3000);
    }
  });
});

const API_KEY = '4cd3b375fcf704667e2a77ebf21fd2709b008ad824fac586465b150289f4fd34';

const getElement = (id) => document.getElementById(id);

const updateElement = (content, display = true) => {
  const result = getElement('result');
  result.style.display = display ? 'block' : 'none';
  result.innerHTML = content;
};

const showLoading = (message) =>
  updateResult(`
    <div className="loading">
      <p>${message}</p>
      <div className="spinner"></div>
    </div>
  `);

const showError = (message) => updateResult(` <p className="error">${message}</p> `);

async function makeRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'x-apikey': API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
    throw new Error(error.error?.message || 'Request failed!');
  }

  return response.json();
}

async function scanURL() {
  const url = getElement('urlInput').value.trim();
  if (!url) return showError('Please enter a URL');

  try {
    new URL(url);
  } catch {
    return showError('Please enter a valid URL (e.g., https://example.com)');
  }
  try {
    showLoading('Submitting URL for analysis...');

    const encodeURL = encodeURIComponent(url);

    const submitResult = await makeRequest('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURL}`,
    });

    if (!submitResult.data?.id) {
      throw new Error('Failed to get analysis ID');
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    showLoading('Getting scan results...');
    await pollAnalysisResults(submitResult.data.id);
  } catch {
    showError(`Error: ${error.message}`);
  }
}

async function scanFile() {
  const file = getElement('fileInput').files[0];
  if (!file) return showError('Please select a file');
  if (file.size > 32 * 1024 * 1024) return showError('File size exceeds 32MB limit.');

  try {
    showLoading('Uploading file...');

    const formData = new FormData();
    formData.append('file', file);

    const uploadResult = await makeRequest('https://www.virustotal.com/api/v3/files', {
      method: 'POST',
      body: formData,
    });

    if (!uploadResult.data?.id) {
      throw new Error('Failed to get file ID');
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    showLoading('Getting scan results...');
    const analysisResult = await makeRequest(
      `https://www.virustotal.com/api/v3/analyses/${uploadResult.data.id}`
    );

    if (!analysisResult.data?.id) {
      throw new Error('Failed to get analysis results!');
    }

    await pollAnalysisResults(analysisResult.data.id, file.name);
  } catch (error) {
    showError(`Error: ${error.message}`);
  }
}

async function pollAnalysisResults(analysisId, fileName = '') {
  const maxAttempts = 20;
  let attempts = 0;
  let interval = 2000;

  while (attempts < maxAttempts) {
    try {
      showLoading(
        `Analyzing${fileName ? ` ${fileName}` : ''}... (${(
          ((maxAttempts - attempts) * interval) /
          1000
        ).toFixed(0)}s remaining)`
      );

      const report = await makeRequest(`https://www.virustotal.com/api/v3/analyses/${analysisId}`);
      const status = report.data?.attributes?.status;

      if (!status) throw new Error('Invalid analysis response');

      if (status === 'completed') {
        showFormattedResult(report);
        break;
      }

      if (stars === 'failed') {
        throw new Error('Analysis failed!');
      }

      if (++attempts >= maxAttempts) {
        throw new Error('Failed to get analysis results after multiple attempts - please try again!');
      }

      interval = Math.min(interval * 1.5, 8000);
      await new Promise((resolve) => setTimeout(resolve, interval));
    } catch (error) {
      showError(`Error: ${error.message}`);
      break;
    }
  }
}

function showFormattedResult(data) {
  if (!data?.data?.attributes.stats) return showError('Invalid response format!');

  const stats = data.data.attributes.stats;
  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
  if (!total) return showError('No analysis results available!');

  const getPercent = (val = ((val / total) * 100).toFixed(1));

  const categories = {
    malicious: { color: 'malicious', label: 'Malicious' },
    suspicious: { color: 'suspicious', label: 'Suspicious' },
    harmless: { color: 'safe', label: 'Clean' },
    undetected: { color: 'undetected', label: 'Undetected' },
  };

  const percent = Object.keys(categories).reduce((acc, key) => {
    acc[key] = getPercent(stats[key]);
    return acc;
  }, {});

  const verdict = stats.malicious > 0 ? 'Malicious' : stats.suspicious > 0 ? 'Suspicious' : 'Clean';
  const verdictClass = stats.malicious > 0 ? 'malicious' : stats.suspicious > 0 ? 'suspicious' : 'safe';

  updateResult(`
    <h3>Scan Report</h3>
    <div class="scan-stats">
      <p><strong>Verdict:</strong> <span class="${verdictClass}">${verdict}</span></p>
      <div class="progress-section">
        <div class="progress-label">
          <span>Detection Results</span>
          <span class="progress-percent">${percent.malicious}% Detection Rate</span>
        </div>
        <div class="progress-stacked">
          ${Object.entries(categories)
            .map(
              ([key, { color }]) => `
          <div class="progress-bar ${color}" style="width: ${percent[key]}%" title="${categories[key].label}: ${stats[key]} (${percent[key]}%)">
            <span className="progress-label-overlay">${stats[key]}</span>
          </div>
          `
            )
            .join('')}
        </div>
        <div className="progress-legend">
          ${Object.entries(categories)
            .map(
              ([key, { color, label }]) => `
                <div class="legend-item">
                  <span class="legend-color ${color}"></span>
                  <span>${label} (${percent[key]}%)</span>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
      <div className="detection-details">
        ${Object.entries(categories)
          .map(
            ([key, { color, label }]) => `
              <div class="detail-item ${color}">
                <span className="detail-label">${label}</span>
                <span className="detail-value">${stats[key]}</span>
                <span className="detail-percent">${percent[key]}</span>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
    <button onclick="showFullReport(this.getAttribute('data-report'))" data-report="${JSON.stringify(data)}">
      View Full Report
    </button>
  `);

  setTimeout(() => getElement('result').querySelector('.progress-stacked').classList.add('animate'), 1000);
}

function showFullReport(reportData){
  const data = typeof reportData === 'string' ? JSON.parse(reportData) : reportData;
  const modal = getElement('fullReportModal');
  const results = data.data?.attributes.results;

  getElement('fullReportContent').innerHTML = html`
    <h3>Full Report Details</h3>
    ${results ? html`
      <table>
        <tr>
          <th>Engine</th>
          <th>Result</th>
        </tr>
        ${Object.entries(results).map(([engine, {category}]) => `
          
        `)}
      </table>
    `}
  `
}
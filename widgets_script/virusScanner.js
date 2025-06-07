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
      await new Promise(resolve => setTimeout(resolve, interval));
    } catch (error) {
      showError(`Error: ${error.message}`);
      break;
    }
  }
}

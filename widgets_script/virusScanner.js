const API_KEY = '4cd3b375fcf704667e2a77ebf21fd2709b008ad824fac586465b150289f4fd34';

const getElement = (id) => document.getElementById(id);

const updateElement = (content, display = true) => {
  const result = getElement('result');
  result.style.display = display ? 'bock' : 'none';
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
}

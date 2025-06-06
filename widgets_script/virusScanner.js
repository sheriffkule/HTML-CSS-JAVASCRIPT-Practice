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
  try {
    showLoading('Submitting URL for analysis...');
  } catch {
    return showError('Failed to submit URL for analysis');
  }
}

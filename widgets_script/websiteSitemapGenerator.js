document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const websiteUrl = document.getElementById('websiteUrl');
  const maxPages = document.getElementById('maxPages');
  const maxPagesValue = document.getElementById('maxPagesValue');
  const generateBtn = document.getElementById('generateBtn');
  const loading = document.getElementById('loading');
  const resultArea = document.getElementById('resultArea');
  const sitemapPreview = document.getElementById('sitemapPreview');
  const totalPages = document.getElementById('totalPages');
  const internalLinks = document.getElementById('internalLinks');
  const externalLinks = document.getElementById('externalLinks');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const newSitemapBtn = document.getElementById('newSitemapBtn');
  const toast = document.getElementById('toast');

  // Theme toggle
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  // Update max pages value
  maxPages.addEventListener('input', function () {
    maxPagesValue.value = maxPages.value;
  });

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const val = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.backgroundImage = `linear-gradient(to right, var(--success), var(--primary) ${val}%,
      var(--light) ${val}%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });

  // Generate sitemap
  generateBtn.addEventListener('click', function () {
    if (!websiteUrl.value) {
      websiteUrl.focus();
      showToast('Please enter a website URL!');
      return;
    }

    loading.style.display = 'block';
    resultArea.style.display = 'none';

    // Simulate generating sitemap (in a real app, this would be and API call)
    setTimeout(() => {
      generateSiteMap();
      loading.style.display = 'none';
      resultArea.style.display = 'block';
    }, 2000);
  });
});

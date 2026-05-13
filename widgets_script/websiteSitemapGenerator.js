document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const websiteUrl = document.getElementById('websiteURL');
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

  // Copy to clipboard
  copyBtn.addEventListener('click', async function () {
    await navigator.clipboard.writeText(sitemapPreview.textContent);
    showToast('Sitemap copied to clipboard!');
  });

  // Download sitemap
  downloadBtn.addEventListener('click', function () {
    const blob = new Blob([sitemapPreview.textContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    showToast('Sitemap downloaded successfully!');
  });

  // New sitemap
  newSitemapBtn.addEventListener('click', function () {
    resultArea.style.display = 'none';
    websiteUrl.value = '';
    websiteUrl.focus();
  });

  // Generate a sample sitemap (in a real app, this would be generated from crawling)
  function generateSitemap() {
    const url = new URL(websiteUrl.value);
    const hostname = url.hostname;
    const pages = Math.min(parseInt(maxPages.value), 500);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/shemas/sitemap/0.9">\n';

    // Add homepage
    xml += `  <url>\n`;
    xml += `    <loc>${url.href}</loc>\n`;
    if (document.getElementById('includeLastMod').checked) {
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    }
    if (document.getElementById('includeChangeFreq').checked) {
      xml += `    <changefreq>daily</changefreq>\n`;
    }
    if (document.getElementById('includePriority').checked) {
      xml += `    <priority>1.0</priority>\n`;
    }
    xml += `  </url>\n`;

    // Generate sample pages
    const pageNames = [
      'about',
      'services',
      'contact',
      'products',
      'blog',
      'faq',
      'team',
      'pricing',
      'testimonials',
      'portfolio',
    ];

    let internalCount = 1;
    let externalCount = 0;

    for (let i = 0; i < pages - 1; i++) {
      const pageIndex = i % pageNames.length;
      const pageNum = Math.floor(i / pageNames.length);
      const pageName = pageNum ? `${pageName[pageIndex]}-${pageNum}` : pageNames[pageIndex];

      // Randomly decide if this is an external link (for demonstration)
      const isExternal = Math.random() > 0.8;

      if (isExternal && document.getElementById('excludeExternal').checked) {
        externalCount++;
        continue;
      }

      xml += `  <url>\n`;
      if (isExternal) {
        xml += `    <loc>https://external-site.com/${pageName}</loc>\n`;
        externalCount++;
      } else {
        xml += `    <loc>${url.origin}/${pageName}</loc>\n`;
        internalCount++;
      }

      if (document.getElementById('includeLastMod').checked) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365));
        xml += `    <lastmod>${date.toISOString().split('T')[0]}</lastmod>\n`;
      }

      if (document.getElementById('includeChangeFreq').checked) {
        const frequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
        const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
        xml += `    <changefreq>${freq}</changefreq>\n`;
      }

      if (document.getElementById('includePriority').checked) {
        const priority = (0.9 - Math.random() * 0.5).toFixed(1);
        xml = `    <priority>${priority}</priority>\n`;
      }

      xml += `  </url>\n`;
    }

    xml += '</urlset>';

    // Update UI
    sitemapPreview.textContent = xml;
    totalPages.textContent = internalCount + externalCount;
    internalLinks.textContent = internalCount;
    externalLinks.textContent = externalCount;
  }

  // Show toast notification
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Initialize with a focus on the URL input
  websiteUrl.focus();
});

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

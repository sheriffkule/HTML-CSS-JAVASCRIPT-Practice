const themeToggle = document.getElementById('themeToggle');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');
const titleCount = document.getElementById('titleCount');
const descriptionCount = document.getElementById('descriptionCount');
const copyButtons = document.querySelectorAll('.copy-btn');
const notification = document.getElementById('notification');
const socialPreview = document.getElementById('socialPreview');
const socialPreviewTitle = document.getElementById('socialPreviewTitle');
const socialPreviewDescription = document.getElementById('socialPreviewDescription');
const socialPreviewUrl = document.getElementById('socialPreviewUrl');
const socialPreviewImage = document.getElementById('socialPreviewImage');

// Form elements
const formElements = {
  basic: {
    pageTitle: document.getElementById('pageTitle'),
    pageDescription: document.getElementById('pageDescription'),
    pageKeywords: document.getElementById('pageKeywords'),
    pageUrl: document.getElementById('pageUrl'),
    pageAuthor: document.getElementById('pageAuthor'),
    robotsIndex: document.getElementById('robotsIndex'),
    robotsFollow: document.getElementById('robotsFollow'),
  },
  openGraph: {
    ogTitle: document.getElementById('ogTitle'),
    ogDescription: document.getElementById('ogDescription'),
    ogImage: document.getElementById('ogImage'),
    ogUrl: document.getElementById('ogUrl'),
    ogType: document.getElementById('ogType'),
    ogSiteName: document.getElementById('ogSiteName'),
  },
  twitter: {
    twitterTitle: document.getElementById('twitterTitle'),
    twitterDescription: document.getElementById('twitterDescription'),
    twitterImage: document.getElementById('twitterImage'),
    twitterCard: document.getElementById('twitterCard'),
    twitterSite: document.getElementById('twitterSite'),
    twitterCreator: document.getElementById('twitterCreator'),
  },
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  // Set up event listeners
  setupEventListeners();

  // Generate initial meta tags
  generateMetaTags();
});

// Set up all event listeners
function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });

  // Character counters
  pageTitle.addEventListener('input', updateCharacterCount);
  pageDescription.addEventListener('input', updateCharacterCount);

  // Form inputs for real-time updates
  Object.values(formElements).forEach((tab) => {
    Object.values(tab).forEach((element) => {
      if (!element) return;
      const tagName = element.tagName;
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
        element.addEventListener('input', generateMetaTags);
        element.addEventListener('change', generateMetaTags);
      }
    });
  });

  // Copy buttons
  copyButtons.forEach((button) => {
    button.addEventListener('click', () => copyToClipboard(button.dataset.target));
  });
}

// Toggle between light and dark mode
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌓';
}

// Switch between tabs
function switchTab(tabId) {
  // Update active tab
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });

  // Show active tab content
  tabContents.forEach((content) => {
    content.classList.toggle('active', content.id === `${tabId}-tab`);
  });
}

// Update character counters
function updateCharacterCount() {
  const titleLength = pageTitle.value.length;
  const descriptionLength = pageDescription.value.length;

  titleCount.textContent = `${titleLength} / 60`;
  descriptionCount.textContent = `${descriptionLength} / 160`;

  // Add warning class if over recommended length
  titleCount.classList.toggle('warning', titleLength > 60);
  descriptionCount.classList.toggle('warning', descriptionLength > 160);

  // Generate meta tags when these fields change
  generateMetaTags();
}

// Generate meta tags based on form inputs
function generateMetaTags() {
  const { pageTitle, pageDescription, pageKeywords, pageUrl, pageAuthor, robotsIndex, robotsFollow } =
    formElements.basic;

  const { ogTitle, ogDescription, ogImage, ogUrl, ogType, ogSiteName } = formElements.openGraph;

  const { twitterTitle, twitterDescription, twitterImage, twitterCard, twitterSite, twitterCreator } =
    formElements.twitter;

  // Basic meta tags
  let metaTags = `<!-- Basic Meta Tags -->\n`;
  metaTags += `<title>${pageTitle.value || 'Your Page Title'}</title>\n`;
  metaTags += `<meta name="description" content="${pageDescription.value || 'Your page description'}">\n`;

  if (pageKeywords.value) {
    metaTags += `<meta name="keywords" content="${pageKeywords.value}">\n`;
  }

  if (pageUrl.value) {
    metaTags += `<link rel="canonical" href="${pageUrl.value}">\n`;
  }

  if (pageAuthor.value) {
    metaTags += `<meta name="author" content="${pageAuthor.value}">\n`;
  }

  metaTags += `<meta name="robots" content="${robotsIndex.checked ? 'index' : 'noindex'}, ${robotsFollow.checked ? 'follow' : 'nofollow'}">\n\n`;

  // Viewport and charset (always included)
  metaTags += `\n<!-- Essential Meta Tags -->\n`;
  metaTags += `<meta charset="UTF-8">\n`;
  metaTags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n`;

  // Open Graph meta tags
  if (ogTitle.value || ogDescription.value || ogImage.value) {
    metaTags += `<!-- Open Graph Meta Tags -->\n`;
    metaTags += `<meta property="og:type" content="${ogType.value}">\n`;

    if (ogTitle.value) {
      metaTags += `<meta property="og:title" content="${ogTitle.value}">\n`;
    } else if (pageTitle.value) {
      metaTags += `<meta property="og:title" content="${pageTitle.value}">\n`;
    }

    if (ogDescription.value) {
      metaTags += `<meta property="og:description" content="${ogDescription.value}">\n`;
    } else if (pageDescription.value) {
      metaTags += `<meta property="og:description" content="${pageDescription.value}">\n`;
    }

    if (ogImage.value) {
      metaTags += `<meta property="og:image" content="${ogImage.value}">\n`;
    }

    if (ogUrl.value) {
      metaTags += `<meta property="og:url" content="${ogUrl.value}">\n`;
    } else if (pageUrl.value) {
      metaTags += `<meta property="og:url" content="${pageUrl.value}">\n`;
    }

    if (ogSiteName.value) {
      metaTags += `<meta property="og:site_name" content="${ogSiteName.value}">\n`;
    }
  }

  // Twitter Card meta tags
  if (twitterCard.value || twitterTitle.value || twitterDescription.value) {
    metaTags += `\n<!-- Twitter Card Meta Tags -->\n`;
    metaTags += `<meta name="twitter:card" content="${twitterCard.value || 'summary_large_image'}">\n`;

    if (twitterTitle.value) {
      metaTags += `<meta name="twitter:title" content="${twitterTitle.value}">\n`;
    } else if (pageTitle.value) {
      metaTags += `<meta name="twitter:title" content="${pageTitle.value}">\n`;
    }

    if (twitterDescription.value) {
      metaTags += `<meta name="twitter:description" content="${twitterDescription.value}">\n`;
    } else if (pageDescription.value) {
      metaTags += `<meta name="twitter:description" content="${pageDescription.value}">\n`;
    }

    if (twitterImage.value) {
      metaTags += `<meta name="twitter:image" content="${twitterImage.value}">\n`;
    } else if (ogImage.value) {
      metaTags += `<meta name="twitter:image" content="${ogImage.value}">\n`;
    }

    if (twitterSite.value) {
      metaTags += `<meta name="twitter:site" content="${twitterSite.value}">\n`;
    }

    if (twitterCreator.value) {
      metaTags += `<meta name="twitter:creator" content="${twitterCreator.value}">\n`;
    }
  }

  // Update the preview
  document.getElementById('metaTagsPreview').textContent = metaTags;

  // Update social preview
  updateSocialPreview();
}

// Update the social media preview
function updateSocialPreview() {
  const { pageTitle, pageDescription, pageUrl } = formElements.basic;

  const { ogImage, ogDescription, ogTitle } = formElements.openGraph;

  // Update social preview elements
  socialPreviewTitle.textContent = ogTitle.value || pageTitle.value || 'Your Page Title';
  socialPreviewDescription.textContent =
    ogDescription.value || pageDescription.value || 'Your page description';

  const url = pageUrl?.value || 'example.com';
  socialPreviewUrl.textContent = url.replace(/^https?:\/\//, '');

  // Update image preview
  const imageUrl = ogImage.value;
  if (imageUrl) {
    socialPreviewImage.innerHTML = `<img src="${imageUrl}" alt="Preview image" onerror="this.style.display='none'">`;
  } else {
    socialPreviewImage.innerHTML = `<div
      style="height: 260px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999;">
      No image provided
    </div>`;
  }
}

// Copy content to clipboard
function copyToClipboard(targetId) {
  const element = document.getElementById(targetId);
  const text = element.textContent;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Show notification
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 2000);
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
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

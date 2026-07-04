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
const socialPreviewDescription = document.getElementById('socialPreviewDescription');
const socialPreviewUrl = document.getElementById('socialPreviewUrl');
const socialPreviewImage = document.getElementById('socialPreviewImage');

// Form elements
const formElements = {
  basic: {
    pageTitle: document.getElementById('basicPageTitle'),
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
  Object.value(formElements).forEach((tab) => {
    Object.values(tab).forEach((element) => {
      if (element.tagName === 'INPUT' || element.tagname === 'TEXTAREA' || element.tagName === 'SELECT') {
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
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Switch between tabs
function switchTab(tabId) {
  // Update active tab
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });

  // Show active tab content
  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === `${tabId}-tab`)
  })
}

// Update character counters
function updateCharacterCounts() {
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
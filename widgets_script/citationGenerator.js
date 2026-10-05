document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const styleButtons = document.querySelectorAll('.style-btn');
  const generateBtn = document.getElementById('generate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const citationOutput = document.getElementById('citation-output');

  // Current state
  let currentState = 'apa';
  let currentTab = 'book';

  // Initialize the app
  init();

  function init() {
    // Set up event listeners
    setupEventListeners();

    // Check for preferred theme
    const preferredTheme = localStorage.getItem('theme') || 'light';
    setTheme(preferredTheme);
  }

  function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Tab switching
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Style selection
    styleButtons.forEach((btn) => {
      btn.addEventListener('click', () => selectStyle(btn.dataset.style));
    });

    // Form actions
    generateBtn.addEventListener('click', generateCitation);
    clearBtn.addEventListener('click', clearForm);
    copyBtn.addEventListener('click', copyCitation);
  }

  // Theme functions
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Tab functions
  function switchTab(tabId) {
    // Update active tab
    tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    // Show corresponding content
    tabContents.forEach((content) => {
      content.classList.toggle('active', content.id === `${tabId}-tab`);
    });

    currentTab = tabId;
  }

  // Style functions
  function selectStyle(style) {
    styleButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.style === style);
    });

    currentState = style;

    // If there's already a citation, regenerate it with new style
    if (
      citationOutput.textContent !==
      'Fill out the form and click <q>Generate Citation</q> to see your formatted citation here.'
    ) {
      generateCitation();
    }
  }

  // Citation generation
  function generateCitation() {
    let citation = '';

    switch (currentTab) {
      case 'book':
        citation = generateBookCitation();
        break;
      case 'website':
        citation = generateWebsiteCitation();
        break;
    }

    if (citation) {
      citationOutput.innerHTML = `<strong>${currentStyle.toUpperCase()} Citation:</strong><br>${citation}`;
    }
  }
});

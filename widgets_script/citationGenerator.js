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
  const citationStorageKey = 'citationGeneratorCitation';
  const emptyOutputMessage =
    'Fill out the form and click <q>Generate Citation</q> to see your formatted citation here.';

  // Current state
  let currentStyle = 'apa';
  let currentTab = 'book';
  let currentCitation = null;

  // Initialize the app
  init();

  function init() {
    // Set up event listeners
    setupEventListeners();

    // Check for preferred theme
    let preferredTheme = 'light';
    try {
      preferredTheme = localStorage.getItem('theme') || preferredTheme;
    } catch (error) {
      console.error('Failed to read the preferred theme: ', error);
    }
    setTheme(preferredTheme);
    restoreCitation();
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
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save the preferred theme: ', error);
    }

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
    currentStyle = style;
    styleButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.style === style);
    });

    if (currentCitation?.tab === currentTab && hasRequiredFields(currentTab)) {
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

    if (!citation) return;

    currentCitation = { style: currentStyle, tab: currentTab, citation };
    renderCitation(currentCitation);
    saveCitation(currentCitation);
  }

  function generateBookCitation() {
    const author = document.getElementById('author').value.trim();
    const title = document.getElementById('title').value.trim();
    const publisher = document.getElementById('publisher').value.trim();
    const year = document.getElementById('year').value.trim();

    // Basic validation
    if (!author || !title || !publisher || !year) {
      alert('Please fill in all required fields (Author, Title, Publisher, Year).');
      return;
    }
    if (!Number.isInteger(Number(year)) || Number(year) < 1) {
      alert('Please enter a valid publication year.');
      return;
    }

    // Process authors
    const authors = processAuthors(author);
    const safeAuthors = escapeHtml(authors);
    const safeTitle = escapeHtml(title);
    const safePublisher = escapeHtml(publisher);

    switch (currentStyle) {
      case 'apa':
        return `${safeAuthors} (${escapeHtml(year)}). <i>${safeTitle}</i>. ${safePublisher}.`;
      case 'mla':
        return `${safeAuthors}. <i>${safeTitle}</i>. ${safePublisher}, ${escapeHtml(year)}.`;
      case 'chicago':
        return `${safeAuthors}. <i>${safeTitle}</i>. ${safePublisher}, ${escapeHtml(year)}.`;
      default:
        return '';
    }
  }

  function generateWebsiteCitation() {
    const author = document.getElementById('web-author').value.trim();
    const title = document.getElementById('web-title').value.trim();
    const siteName = document.getElementById('site-name').value.trim();
    const url = document.getElementById('url').value.trim();
    const accessDate = document.getElementById('access-date').value;

    if (!title || !siteName || !url || !accessDate) {
      alert('Please fill in all required fields (Title, Website Name, URL, Access, Date)');
      return;
    }
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      alert('Please enter a valid website URL.');
      return;
    }
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      alert('Please enter a valid website URL.');
      return;
    }

    // Format data
    const formattedAccessDate = formatDate(accessDate, currentStyle);
    if (!formattedAccessDate) {
      alert('Please enter a valid access date.');
      return;
    }

    // Process authors if available
    const authors = author ? processAuthors(author) + '.' : '';
    const safeAuthors = escapeHtml(authors);
    const safeTitle = escapeHtml(title);
    const safeSiteName = escapeHtml(siteName);
    const safeUrl = escapeHtml(url);
    const safeAccessDate = escapeHtml(formattedAccessDate);

    switch (currentStyle) {
      case 'apa':
        return `${safeAuthors} (n.d.). ${safeTitle}. <i>${safeSiteName}</i>. Retrieved ${safeAccessDate}, from ${safeUrl}`;
      case 'mla':
        return `${safeAuthors}"${safeTitle}." <i>${safeSiteName}</i>, n.d., ${safeUrl}. Accessed ${safeAccessDate}.`;
      case 'chicago':
        return `${safeAuthors}"${safeTitle}." ${safeSiteName}, ${safeUrl} (accessed ${safeAccessDate}).`;
      default:
        return '';
    }
  }

  // Helper functions
  function processAuthors(authorStr) {
    const authors = authorStr
      .split(',')
      .map((author) => author.trim())
      .filter(Boolean);

    if (authors.length === 0) return '';
    if (authors.length === 1) return authors[0];

    switch (currentStyle) {
      case 'apa':
        if (authors.length <= 20) {
          return authors.slice(0, -1).join(', ') + ' & ' + authors.slice(-1);
        } else {
          return authors[0] + ' et al.';
        }
      case 'mla':
        if (authors.length <= 2) {
          return authors.join(' and ');
        } else {
          return authors[0] + ' et al.';
        }
      case 'chicago':
        if (authors.length <= 10) {
          return authors.slice(0, -1).join(', ') + ', and ' + authors.slice(-1);
        } else {
          return authors[0] + ' et al.';
        }
      default:
        return authors.join(', ');
    }
  }

  function formatDate(dateStr, style) {
    const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
    if (!dateParts) return '';

    const [, yearPart, monthPart, dayPart] = dateParts;
    const date = new Date(Number(yearPart), Number(monthPart) - 1, Number(dayPart));
    if (
      date.getFullYear() !== Number(yearPart) ||
      date.getMonth() !== Number(monthPart) - 1 ||
      date.getDate() !== Number(dayPart)
    ) {
      return '';
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    switch (style) {
      case 'apa':
        return `${monthToString(month)} ${day}, ${year}`;
      case 'mla':
        return `${day} ${monthToString(month, true)} ${year}`;
      case 'chicago':
        return `${monthToString(month)} ${day}, ${year}`;
      default:
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  }

  function monthToString(month, short = false) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const shortMonths = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'June',
      'July',
      'Aug.',
      'Sept.',
      'Oct',
      'Nov',
      'Dec',
    ];

    return short ? shortMonths[month - 1] : months[month - 1];
  }

  // Form functions
  function clearForm() {
    const activeForm = document.querySelector(`#${currentTab}-tab form`);
    if (activeForm) activeForm.reset();
    currentCitation = null;
    citationOutput.textContent = emptyOutputMessage;
    try {
      localStorage.removeItem(citationStorageKey);
    } catch (error) {
      console.error('Failed to clear the saved citation: ', error);
    }
  }

  function copyCitation() {
    if (!citationOutput.textContent.includes('formatted citation here')) {
      if (!navigator.clipboard?.writeText) {
        alert('Clipboard access is not available in this browser.');
        return;
      }

      navigator.clipboard
        .writeText(citationOutput.innerText)
        .then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i>';
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy citation: ', err);
          alert('Failed to copy the citation.');
        });
    }
  }

  function hasRequiredFields(tab) {
    const fieldIds =
      tab === 'book'
        ? ['author', 'title', 'publisher', 'year']
        : ['web-title', 'site-name', 'url', 'access-date'];
    return fieldIds.every((id) => document.getElementById(id).value.trim());
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return entities[character];
    });
  }

  function renderCitation(savedCitation) {
    citationOutput.replaceChildren();

    const heading = document.createElement('strong');
    heading.textContent = `${savedCitation.style.toUpperCase()} Citation:`;
    citationOutput.append(heading, document.createElement('br'));

    const template = document.createElement('template');
    template.innerHTML = savedCitation.citation;
    appendSafeNodes(citationOutput, template.content.childNodes);
  }

  function appendSafeNodes(parent, nodes) {
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        parent.append(document.createTextNode(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'I' || node.tagName === 'BR') {
          const safeElement = document.createElement(node.tagName.toLowerCase());
          parent.append(safeElement);
          if (node.tagName === 'I') appendSafeNodes(safeElement, node.childNodes);
        } else {
          appendSafeNodes(parent, node.childNodes);
        }
      }
    });
  }

  function saveCitation(citation) {
    try {
      localStorage.setItem(citationStorageKey, JSON.stringify(citation));
    } catch (error) {
      console.error('Failed to save the citation: ', error);
      alert('The citation was generated, but could not be saved in this browser.');
    }
  }

  function restoreCitation() {
    let storedCitation;
    try {
      const storedValue = localStorage.getItem(citationStorageKey);
      if (!storedValue) return;
      storedCitation = JSON.parse(storedValue);
    } catch (error) {
      console.error('Failed to read the saved citation: ', error);
      return;
    }

    if (
      !storedCitation ||
      !['apa', 'mla', 'chicago'].includes(storedCitation.style) ||
      !['book', 'website'].includes(storedCitation.tab) ||
      typeof storedCitation.citation !== 'string'
    ) {
      console.error('The saved citation has an invalid format.');
      return;
    }

    currentCitation = storedCitation;
    currentStyle = storedCitation.style;
    currentTab = storedCitation.tab;
    switchTab(currentTab);
    styleButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.style === currentStyle);
    });
    renderCitation(currentCitation);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const toggleAllBtn = document.getElementById('toggle-all');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const accordionItems = document.querySelectorAll('.accordion-item');

  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Initialize all accordion items
  accordionHeaders.forEach((header) => {
    const contentId = header.getAttribute('aria-controls');
    const content = document.getElementById(contentId);

    if (content) {
      header.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      content.style.maxHeight = '0px';
    }

    header.addEventListener('click', () => {
      const expanded = header.getAttribute('aria-expanded') == 'true';
      toggleAccordion(header, content, !expanded);
    });
  });

  // Toggle all accordions
  toggleAllBtn.addEventListener('click', () => {
    const shouldExpand = [...accordionHeaders].some(
      (header) => header.getAttribute('aria-expanded') === 'false',
    );
    accordionHeaders.forEach((header) => {
      const contentId = header.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      toggleAccordion(header, content, shouldExpand);
    });
  });

  // Theme toggle
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      accordionItems.forEach((item) => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Functions
  function toggleAccordion(header, content, expand) {
    if (!content) return;

    header.setAttribute('aria-expanded', expand.toString());
    content.setAttribute('aria-hidden', (!expand).toString());

    expand ? (content.style.maxHeight = content.scrollHeight + 'px') : (content.style.maxHeight = '0px');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
});

const sidebar = document.querySelector('.sidebar');
const sidebarToggleBtn = document.querySelectorAll('.sidebar-toggle');
const themeToggleBtn = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');
const searchForm = document.querySelector('.search-form');
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const shouldUseDarkTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
const activeLink = document.querySelectorAll('.menu-link');
const activePage = document.querySelectorAll('.page');

const updateThemeIcon = () => {
  if (!document.body || !sidebar || !themeIcon) {
    console.error('Missing required elements');
    return;
  }
  const isDark = document.body.classList.contains('dark-theme');
  themeIcon.textContent = sidebar.classList.contains('sidebar')
    ? isDark
      ? 'light_mode'
      : 'dark_mode'
    : 'dark_mode';
  themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
};

document.body.classList.toggle('dark-theme', shouldUseDarkTheme);

if (themeIcon) {
  themeIcon.textContent = sidebar.classList.contains('collapsed')
    ? shouldUseDarkTheme
      ? 'light_mode'
      : 'dark_mode'
    : 'dark_mode';
}

if (shouldUseDarkTheme) {
  document.body.classList.add('dark-theme');
  updateThemeIcon();
}

function saveSidebarState() {
  const isCollapsed = sidebar.classList.contains('collapsed');
  localStorage.setItem('sidebarCollapsed', isCollapsed);
}

function loadSidebarState() {
  const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (isCollapsed) {
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSidebarState();

  sidebarToggleBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      updateThemeIcon();
    });
  });

  saveSidebarState();
  sidebarToggleBtn.forEach((btn) => {
    btn.addEventListener('click', saveSidebarState);
  });
});

searchForm.addEventListener('click', () => {
  if (sidebar.classList.contains('collapsed')) {
    sidebar.classList.remove('collapsed');
    searchForm.querySelector('input').focus();
  }
});

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
});

activeLink.forEach((link) => {
  link.addEventListener('click', () => {
    const linkClass = link.className.replace('menu-link', '').trim();
    activePage.forEach((page) => {
      page.classList.toggle('change', page.className.includes(linkClass));
    });
    activeLink.forEach((otherLink) => otherLink.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
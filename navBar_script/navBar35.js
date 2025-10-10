const toggleBtn = document.getElementById('themeToggle');
const icon = toggleBtn.querySelector('i');
const root = document.documentElement;
const sidebar = document.getElementById('sidebar');
const collapsedBtn = document.getElementById('collapseToggle');

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    icon.classList.replace('bx-moon', 'bx-sun');
  } else {
    root.removeAttribute('data-theme');
    icon.classList.replace('bx-sun', 'bx-moon');
  }

  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
  if (sidebarCollapsed === 'true') {
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }
});

toggleBtn.addEventListener('click', () => {
  if (root.getAttribute('data-theme') === 'dark') {
    root.removeAttribute('data-theme');
    icon.classList.replace('bx-sun', 'bx-moon');
    localStorage.setItem('theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
    icon.classList.replace('bx-moon', 'bx-sun');
    localStorage.setItem('theme', 'dark');
  }
});

collapsedBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

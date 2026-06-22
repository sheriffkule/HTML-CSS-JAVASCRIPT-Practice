const sidebar = document.getElementById('sidebar');
const headerToggle = document.getElementById('header-toggle');
const sidebarClose = document.getElementById('sidebar-close');

if (headerToggle) {
  headerToggle.addEventListener('click', () => {
    sidebar.classList.add('show-sidebar');
  });
}

if (sidebarClose) {
  sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('show-sidebar');
  });
}

const sidebarExpand = (toggleId, sidebarId) => {
  const toggle = document.getElementById(toggleId);
  const sidebar = document.getElementById(sidebarId);

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-expand');
  });
};

sidebarExpand('sidebar-toggle', 'sidebar');

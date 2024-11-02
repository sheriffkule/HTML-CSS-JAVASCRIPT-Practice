const sidebarToggler = document.querySelector('.sidebar-toggler');
const sidebar = document.querySelector('.sidebar');
const menuToggler = document.querySelector('.menu-toggler');

const collapsedSidebarHeight = '56px';

sidebarToggler.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

const toggleMenu = (isMenuActive) => {
  sidebar.style.height = isMenuActive ? `${sidebar.scrollHeight}px` : collapsedSidebarHeight;
  menuToggler.querySelector('span').innerHTML = isMenuActive ? 'Close' : 'Menu'
}

menuToggler.addEventListener('click', () => {
  toggleMenu(sidebar.classList.toggle('menu-active'));
});

const fullSidebarHeight = 'calc(100vh - 32px)';

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    sidebar.style.height = fullSidebarHeight;
  } else {
    sidebar.classList.remove('collapsed');
    sidebar.style.height = 'auto';
    toggleMenu(sidebar.classList.contains('menu-active'));
  }
})
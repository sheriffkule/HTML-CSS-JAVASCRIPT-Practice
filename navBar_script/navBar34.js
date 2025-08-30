const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const darkToggle = document.getElementById('darkModeToggle');
const modeIcon = document.getElementById('modeIcon');
const modeText = document.querySelector('.modeText');
const time = document.getElementById('time');
const menuItems = document.querySelectorAll('.menu-item');

window.addEventListener('DOMContentLoaded', () => {
  const savedIndex = localStorage.getItem('activeMenuIndex');
  if (savedIndex !== null && menuItems[savedIndex]) {
    menuItems.forEach((link) => link.classList.remove('active'));
    menuItems[savedIndex].classList.add('active');
  }

  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    sidebar.classList.add('collapsed');
  }

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    modeIcon.classList.replace('bx-sun', 'bx-moon');
  } else {
    modeIcon.classList.replace('bx-moon', 'bx-sun');
  }
});

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);

  if (isDark) {
    modeIcon.classList.replace('bx-sun', 'bx-moon');
    modeText.textContent = 'Light Mode';
  } else {
    modeIcon.classList.replace('bx-moon', 'bx-sun');
    modeText.textContent = 'Dark Mode';
  }
});

const now = new Date();
const day = now.getDate();
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = monthNames[now.getMonth()];
const year = now.getFullYear();
time.textContent = `${day}. ${month} ${year}.`;

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuItems.forEach((link) => link.classList.remove('active'));
    item.classList.add('active');
    localStorage.setItem('activeMenuIndex', Array.from(menuItems).indexOf(item));
  });
});

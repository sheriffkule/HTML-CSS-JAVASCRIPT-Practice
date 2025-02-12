const themeToggle = document.getElementById('theme');
const themeIcon = document.querySelector('.bi-moon');

const THEME_STORAGE_KEY = 'theme';

const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
if (storedTheme === 'dark') {
  document.body.classList.add('dark');
  themeIcon.classList.replace('bi-moon', 'bi-sun');
  document.getElementById('text').innerText = 'Dark Theme';
}

themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    themeIcon.classList.replace('bi-moon', 'bi-sun');
    document.getElementById('text').innerText = 'Dark Theme';
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
  } else {
    themeIcon.classList.replace('bi-sun', 'bi-moon');
    document.getElementById('text').innerText = 'Light Theme';
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
  }
}
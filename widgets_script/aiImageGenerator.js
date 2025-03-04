const themeToggle = document.querySelector('.theme-toggle');
const promptBtn = document.querySelector('.prompt-btn');

(() => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const isDarkTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle('dark-theme', isDarkTheme);
  themeToggle.querySelector('i').className = isDarkTheme
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';
})();

const toggleTheme = () => {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  themeToggle.querySelector('i').className = isDarkTheme
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';
};

promptBtn.addEventListener('click', () => {});

themeToggle.addEventListener('click', toggleTheme);

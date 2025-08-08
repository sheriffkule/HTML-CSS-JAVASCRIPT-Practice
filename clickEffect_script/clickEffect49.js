const switchButton = document.getElementById('switch');

window.addEventListener('DOMContentLoaded', () => {
  const mode = localStorage.getItem('mode');
  if (mode === 'dark') {
    document.body.classList.add('dark');
    switchButton.checked = true;
  } else {
    document.body.classList.remove('dark');
    switchButton.checked = false;
  }
});

switchButton.addEventListener('change', (e) => {
  const body = document.body;
  if (e.target.checked) {
    body.classList.add('dark');
    localStorage.setItem('mode', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('mode', 'light');
  }
});

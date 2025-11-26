const showMenu = (navId, toggleId) => {
  const nav = document.getElementById(navId);
  const toggle = document.getElementById(toggleId);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu');
    toggle.classList.toggle('show-icon');
  });
};

showMenu('nav-menu', 'nav-toggle');

const navEmail = document.getElementById('nav-email');
const navCopy = document.getElementById('nav-copy').textContent;
const navText = document.getElementById('nav-text');

navEmail.addEventListener('click', () => {
  navigator.clipboard.writeText(navCopy).then(() => {
    navText.innerText = 'Copied ✔️';
    navText.style.color = 'green';

    setTimeout(() => {
      navText.innerHTML = 'Copy Email';
    navText.style.color = 'black';
    }, 2000);
  });
});

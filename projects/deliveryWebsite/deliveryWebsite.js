const showMenu = (navId, toggleId, toggleIcon) => {
  const nav = document.getElementById(navId);
  const toggle = document.getElementById(toggleId);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu');
  });
};

showMenu('nav-menu', 'nav-toggle');

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click', linkAction));

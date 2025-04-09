const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    pages.forEach((page) => {
      if (page.classList[1] === navLink.classList[1]) {
        page.classList.add('change');
      } else {
        page.classList.remove('change');
      }
    });
  });

  if (window.innerWidth <= 430) {
    let newText = `${navLink.textContent.split('')[0]} ${navLink.textContent.split('')[1]}`;
    navLink.textContent = newText;
  }

  window.addEventListener('resize', () => {
    location.reload();
  });
});

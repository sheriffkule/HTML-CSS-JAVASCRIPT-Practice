document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.menu-toggle');
  const icons = document.querySelectorAll('.menu-icon');

  const toggleMenu = () => {
    const isVisible = icons[0].classList.contains('show');

    icons.forEach((icon, index) => {
      setTimeout(() => {
        if (isVisible) {
          icon.classList.remove('show');
          icon.style.transform = 'translateY(0)';
        } else {
          icon.classList.add('show');
          icon.style.transform = `translateY(${-(index + 1) * 60}px)`;
        }
      }, (icons.length - index - 1) * 300);
    });
    toggleButton.classList.toggle('rotate');
  };
  toggleButton.addEventListener('click', toggleMenu);

  icons.forEach(icon => {
    icon.addEventListener('click', toggleMenu)
  })
});

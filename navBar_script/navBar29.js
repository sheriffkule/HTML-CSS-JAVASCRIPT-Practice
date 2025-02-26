const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', function () {
  const sidebar = document.querySelector('.navigation');
  sidebar.classList.toggle('active');
});

const styleToggler = document.querySelector('.style-toggler');

styleToggler.addEventListener('click', function () {
  const styleSwitcherWrapper = document.querySelector('.style-switcher-wrapper');

  styleSwitcherWrapper.classList.toggle('open');

  document.addEventListener('click', (e) => {
    if (
      !styleToggler.contains(e.target) &&
      styleSwitcherWrapper.classList.contains('open')
    ) {
      styleSwitcherWrapper.classList.remove('open');
    }
  });
});

const alternateColor = document.querySelectorAll('.alternate-color');
const setActiveStyle = (color) => {
  localStorage.setItem('color', color);
  changeColor();
};

const changeColor = () => {
  alternateColor.forEach((style) => {
    if (localStorage.getItem('color') === style.getAttribute('title')) {
      style.removeAttribute('disabled');
    } else {
      style.removeAttribute('disabled');
      style.setAttribute('disabled', 'true');
    }
  });
};

if (localStorage.getItem('color') !== null) {
  changeColor();
}

const light = document.querySelector('.light');
const dark = document.querySelector('.dark');
const sky = document.querySelector('.sky');
const grass = document.querySelector('.grass');

light.addEventListener('click', () => {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    document.body.classList.remove('sky');
    document.body.classList.remove('grass');
})

dark.addEventListener('click', () => {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    document.body.classList.remove('sky');
    document.body.classList.remove('grass');
})

sky.addEventListener('click', () => {
    document.body.classList.add('sky');
    document.body.classList.remove('light');
    document.body.classList.remove('dark');
    document.body.classList.remove('grass');
})

grass.addEventListener('click', () => {
    document.body.classList.add('grass');
    document.body.classList.remove('light');
    document.body.classList.remove('sky');
    document.body.classList.remove('dark');
})
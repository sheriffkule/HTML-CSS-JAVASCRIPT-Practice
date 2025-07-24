const sections = document.querySelectorAll('section');
const indicator = document.getElementById('indicator');
const currentSectionText = document.getElementById('current-section');

const options = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const section = entry.target;

      // Set scrollbar color
      if (section.classList.contains('red-section')) {
        document.documentElement.style.setProperty('--scrollbar-thumb', '#e74c3c');
        document.documentElement.style.setProperty('--scrollbar-thumb-hover', '#c0392b');
        currentSectionText.textContent = 'Red Section';
      } else if (section.classList.contains('green-section')) {
        document.documentElement.style.setProperty(
          '--scrollbar-thumb',
          'linear-gradient(45deg, #2ecc71, #27ae60)'
        );
        document.documentElement.style.setProperty(
          '--scrollbar-thumb-hover',
          'linear-gradient(45deg, #27ae60, #219653)'
        );
        currentSectionText.textContent = 'Green Section';
      } else {
        document.documentElement.style.setProperty('--scrollbar-thumb', '#6c5ce7');
        document.documentElement.style.setProperty('--scrollbar-thumb-hover', '#5d4bcf');
        currentSectionText.textContent = 'Blue Section';
      }
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    indicator.textContent = indicator.textContent.replace('↑', '↓');
  } else {
    indicator.textContent = indicator.textContent.replace('↓', '↑');
  }

  lastScroll = currentScroll;
});

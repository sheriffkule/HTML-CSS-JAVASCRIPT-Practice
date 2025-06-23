const timelineContainer = document.getElementById('timelineContainer');
const navDots = document.querySelectorAll('.nav-dot');
const progressBar = document.getElementById('progressBar');
const sections = document.querySelectorAll('.timeline-section');

function updateActiveSection() {
  const scrollPosition = timelineContainer.scrollTop + window.innerHeight / 2;
  let activeIndex = 0;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      section.classList.add('active');
      activeIndex = index;
    } else {
      section.classList.remove('active');
    }
  });

  navDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });

  const totalHeight = timelineContainer.scrollHeight - window.innerHeight;
  const progress = (timelineContainer.scrollTop / totalHeight) * 100;
  progressBar.style.width = `${progress}%`;
}

navDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const sectionIndex = parseInt(dot.getAttribute('data-section'));
    const section = sections[sectionIndex];

    timelineContainer.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  });
});

timelineContainer.addEventListener('scroll', updateActiveSection);

window.addEventListener('load', () => {
  updateActiveSection();

  setTimeout(() => {
    document.querySelector('.timeline-section').classList.add('active');
  }, 300);
});

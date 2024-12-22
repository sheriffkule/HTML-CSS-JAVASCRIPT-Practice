let lenis;
const section = {
  wrapper: document.querySelector('.section_wrapper'),
  items: document.querySelectorAll('.section_item'),
};

const initLenis = () => {
  lenis = new Lenis({
    lerp: 0.05,
  });

  lenis.on('scroll', ({ scroll }) => {
    initCarousel(scroll);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

const initCarousel = (scroll) => {
  const items = document.querySelectorAll('.section_item');

  const speed = scroll * 0.1 - 75;
  const distance = 50;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.style.transform = `translate3d(0, ${i * distance - speed}%, ${
      i + 200
    }px) rotateX(340deg)`;

    item.addEventListener('mouseenter', onMouseEnter);
    item.addEventListener('mouseleave', onMouseLeave);
    item.style.transition = 'top 0.35s ease-in-out';
  }
};

const onMouseEnter = (e) => {
  e.currentTarget.style.top = '-10%';
};

const onMouseLeave = (e) => {
  e.currentTarget.style.top = '0%';
};

window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  lenis.scrollTo(1);
});

gsap.registerPlugin(ScrollTrigger);

const section = {
  element: document.querySelector('.section'),
  title: document.querySelector('.section_title'),
  info: document.querySelector('.section_info'),
  medias: document.querySelector('.section_medias'),
  items: document.querySelectorAll('.section_item'),
  itemsNotFirst: document.querySelectorAll('.section_item:not(:first-child)'),
};

const root = getComputedStyle(document.body);

const colors = [
  root.getPropertyValue('--color-1'),
  root.getPropertyValue('--color-2'),
  root.getPropertyValue('--color-3'),
  root.getPropertyValue('--color-4'),
  root.getPropertyValue('--color-5'),
];

const init = () => {
  section.items.forEach((item, index) => {
    createCircleWithDots(item);

    const dots = item.querySelectorAll('.section_item_dots > div');
    gsap.set(dots, { backgroundColor: colors[index] });
  });

  section.itemsNotFirst.forEach((item, index) => {
    gsap.set(item, {
      scale: 0,
      transformOrigin: 'center center',
      borderColor: colors[index + 1],
    });
  });
};

const initLenis = () => {
  const lenis = new Lenis({ lerp: 0.2 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

const handleTitle = (index) => {
  const newColors = colors[index];
  section.title.style.color = newColors;
  section.info.style.color = newColors;
  section.title.style.transition = 'color 0.35s ease';
  section.info.style.transition = 'color 0.35s ease';
};

const animate = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section.element,
      start: 'top top',
      end: '+=8000',
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        section.medias.style.transform = `scale(${self.progress + 1})`;
      },
    },
  });

  section.items.forEach((item, index) => {
    timeline.to(item, {
      scale: 1,
      onComplete: () => handleTitle(index + 1),
      onReverseComplete: () => handleTitle(index - 1),
    });
  });

  timeline
    .to(
      'section_second',
      {
        duration: 0,
        display: 'flex',
        color: colors[4],
      },
      '<50%'
    )
    .to(
      '.section_figure',
      {
        duration: 0,
        display: 'none',
      },
      '>'
    );
};

window.addEventListener('DOMContentLoaded', () => {
  init();
  initLenis();
  animate();
});

function createCircleWithDots(parentClass) {
  const isMobile = window.innerWidth < 768;

  const settings = {
    innerRadius: isMobile ? 20 : 30,
    outerRadius: isMobile ? 30 : 40,
    color: '#dd3cb9',
    parentClass: parentClass,
  };

  const dotCount = 2000;
  const container = document.createElement('div');
  container.className = 'section_item_dots';
  container.style.width = `${settings.outerRadius * 2}rem`;
  container.style.height = `${settings.outerRadius * 2}rem`;

  for (let i = 0; i < dotCount; i++) {
    const radius =
      Math.random() * (settings.outerRadius - settings.innerRadius) +
      settings.innerRadius;
    const angle = Math.random() * Math.PI * 2;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const dot = document.createElement('div');
    dot.style.width = '0.4rem';
    dot.style.height = '0.4rem';
    dot.style.backgroundColor = settings.color;
    dot.style.position = 'absolute';
    dot.style.left = x + settings.outerRadius + 'rem';
    dot.style.top = y + settings.outerRadius + 'rem';

    container.appendChild(dot);
  }

  parentClass.appendChild(container);
}
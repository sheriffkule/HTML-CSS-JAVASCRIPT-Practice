let circle, circleContainer;

const archive = {
  element: document.querySelector('.archive'),
  figures: document.querySelectorAll('.archive_slider_figure'),
};

const settings = {
  center: window.innerWidth / 2,
  scaleFactor: 1.5,
  lerpFactor: 0.5,
};

const figureScales = new Map();

const initLenis = () => {
  const lenis = new Lenis({
    orientation: 'horizontal',
    content: archive.element,
    lerp: 0.05,
    smoothWheel: true,
  });
  lenis.on('scroll', handleLenisScroll);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.scrollTo(0, 0);
};

const handleLenisScroll = () => {
  archive.figures.forEach((figure) => {
    const image = figure.querySelector('.archive_slider_image');
    const figureRect = figure.getBoundingClientRect();
    const distanceFromCenter = Math.abs(
      figureRect.left + figureRect.width / 2 - settings.center
    );
    const targetScale =
      settings.scaleFactor -
      ((settings.center - distanceFromCenter) / settings.center) *
        (settings.scaleFactor - 1);
    const clampedScale = Math.max(1, targetScale);
    const previousScale = figureScales.get(figure) || 1;
    const smoothedScale = lerp(previousScale, clampedScale, 0.1);

    image.style.transform = `scale(${smoothedScale})`;

    figureScales.set(figure, smoothedScale);
  });
};

const createCircle = () => {
    const circle = document.createElement('section');
    circle.className = 'circle';

    circleContainer = document.createElement('div');
    circleContainer.className = 'circle_container';

    circle.appendChild(circleContainer);

    archive.figures.forEach((figure) => {
        const clone = figure.cloneNode(true);
        clone.className = 'circle_figure';
        circleContainer.appendChild(clone);
    });

    document.querySelector('main').appendChild(circle);
};

const utilityCircle = () => {
    const figures = document.querySelectorAll('.circle_figure');
    const radius = 35;
    const totalFigures = figures.length;

    figures.forEach((figure, index) => {
        const angle = (index / totalFigures) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        figure.style.position = 'absolute';
        figure.style.top = `${50 + y}%`;
        figure.style.left = `${50 + x}%`;

        figure.style.transform = 'translate(-50%, -50%) scale(2)';
    })
};

function lerp(start, end, duration) {
  return start + (end - start) * duration;
}

window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  createCircle();
  utilityCircle();
});

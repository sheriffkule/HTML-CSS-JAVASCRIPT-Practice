gsap.registerPlugin(ScrollTrigger);

const hero = {
  element: document.querySelector('.hero'),
  projects: document.querySelectorAll('.hero_project:not(:last-child)'),
};

let lenis;

const initLenis = () => {
  lenis = new Lenis({
    lerp: 0.05,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

const initAnimation = () => {
  for (let i = 0; i < hero.projects.length; i++) {
    hero.projects[i].style.zIndex = hero.projects.length - i;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero.element,
      start: 'top top',
      end: '+=4000',
      scrub: 1,
      pin: true,
      snap: 1 / hero.projects.length,
    },
  });

  hero.projects.forEach((project, index) => {
    if (index === hero.projects.length) return;

    const projectMedia = project.querySelectorAll('.hero_project_media'),
      projectThumbnail = project.querySelectorAll('.hero_project_thumbnail');

    gsap.set([projectMedia, projectThumbnail], { clipPath: 'inset(0 0 0 0 )' });

    timeline.to(
      [projectMedia, projectThumbnail],
      { clipPath: 'inset(0% 100% 0% 0%)', filter: 'blur(10px)' },
      index
    ).to(project, {pointerEvents: 'none'})
  });
};

window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initAnimation();

  document.querySelector('.media-text').addEventListener('click', () => lenis.scrollTo(0))
});

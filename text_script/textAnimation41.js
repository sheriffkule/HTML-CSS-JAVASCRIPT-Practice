gsap.registerPlugin(ScrollTrigger);

const section = {
  element: document.querySelector('.scroll'),
  subtitle: document.querySelectorAll('.scroll_text_subtitle > *'),
  titleChars: document.querySelectorAll('.scroll_text_title_word span'),
  gallery: document.querySelector('.scroll_gallery'),
  galleryImages: document.querySelectorAll('.scroll_gallery img'),
};

const init = () => {
  gsap.set(section.subtitle, {
    autoAlpha: 0,
  });
  gsap.set(section.titleChars, {
    scale: 0,
    yPercent: -60,
    z: -40,
    rotateY: 180,
    transformOrigin: '50% 50%',
  });

  initLenis();
  animateScroll();
};

const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.05,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

const animateScroll = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section.element,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      pin: false,
    },
  });

  timeline
    .to(section.gallery, { yPercent: -100 })
    .to(section.galleryImages, { y: -150, stagger: 0.05 }, 0)
    .to(
      section.titleChars,
      {
        scale: 1,
        yPercent: 0,
        z: 0,
        rotateY: 0,
        stagger: {
          each: 0.1,
          grid: 'auto',
          from: 'center',
        },
      },
      0
    )
    .to(section.subtitle, {autoAlpha: 1, rotateY: 360, }, 0.25)
};

window.addEventListener('DOMContentLoaded', init);

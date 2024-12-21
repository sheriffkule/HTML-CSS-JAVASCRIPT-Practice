gsap.registerPlugin(ScrollTrigger);

const settings = {
  trigger: document.querySelector('.gallery'),
  containers: document.querySelectorAll('.gallery_container'),
  lerp: 0.05,
};

const galleryEnding = document.querySelectorAll('.gallery_ending_title > h1');

const tlMain = gsap.timeline({
  scrollTrigger: {
    trigger: settings.trigger,
    start: 'top top',
    end: '+=8000 bottom',
    scrub: 1,
    pin: true,
  },
});

const init = () => {
  initLenis();
  animateMedia();
};

const initLenis = () => {
  const lenis = new Lenis({
    lerp: settings.lerp,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

const animateMedia = () => {
  gsap.set(galleryEnding, { yPercent: 100 });

  settings.containers.forEach((element) => {
    const thumbnails = element.querySelectorAll('.gallery_thumbnail'),
      medias = element.querySelectorAll('.gallery_media');

    const heading = {
      title: element.querySelectorAll('.gallery_heading_title'),
      roles: element.querySelectorAll('.gallery_heading_roles > span'),
      case: element.querySelectorAll('.gallery_heading_cases > span'),
    };

    gsap.set(thumbnails, { yPercent: 100 });
    gsap.set(medias, { clipPath: 'inset(0 0 0 0)' });
    gsap.set([heading.title, heading.roles, heading.case], { yPercent: 0 });

    tlMain
      .to(thumbnails, {
        duration: 4,
        yPercent: -100,
      })
      .to(
        medias,
        {
          duration: 3,
          scale: 1.3,
        },
        '<-0.5'
      )
      .to(
        medias,
        {
            duration: 3,
          clipPath: 'inset(0 0 100% 0)',
        },
        '>-0.2'
      )
      .to(
        [heading.title, heading.roles, heading.case],
        { yPercent: -100, },
        '>-0.7'
      );
  });

  tlMain.to(galleryEnding, {
    yPercent: 0,
  });
};

window.addEventListener('DOMContentLoaded', init);
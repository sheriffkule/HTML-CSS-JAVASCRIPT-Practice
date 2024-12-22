const hero = {
  title: Splitting({
    target: '.hero_title > h1',
    by: 'chars',
  }),
  paragraph: document.querySelectorAll('.hero_paragraph_text'),
  medias: gsap.utils.toArray('.hero_media_image'),
};

const gallery = {
  container: document.querySelector('.hero_hidden'),
  medias: document.querySelectorAll('.hero_hidden_media_image'),
  button: document.getElementById('hidden-gallery'),
};

const init = () => {
  gsap.set('.char', { yPercent: 100, display: 'inline-block' });
  gsap.set(hero.paragraph, { autoAlpha: 0 });
  gsap.set(hero.medias, { yPercent: 200 });

  animateHero();
};

const animateHero = () => {
  const tl = gsap.timeline({
    defaults: {
      duration: 1.6,
      ease: 'power4.inOut',
      stagger: {
        each: 0.04,
        from: 'center',
      },
    },
  });

  tl.to('.char', { yPercent: 0 })
    .to(hero.paragraph, { autoAlpha: 1 })
    .to(hero.medias, { yPercent: 0 }, 0);

  showGallery();
};

const showGallery = () => {
  const selectedParagraph = document.querySelectorAll(
    '.hero_paragraph > span:not(#hidden-gallery)'
  );
  const tlGallery = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.6,
      ease: 'power4.inOut',
    },
  });

  gsap.set(gallery.container, { autoAlpha: 0, pointerEvents: 'none' });
  gsap.set(gallery.medias, { zIndex: 0 });

  tlGallery
    .to(['.char', selectedParagraph, hero.medias], {
      autoAlpha: 0,
      pointerEvents: 'none',
    })
    .to(
      gallery.container,
      {
        autoAlpha: 1,
        pointerEvents: 'auto',
      },
      0
    );

  gsap.to(gallery.medias, {
    repeat: -1,
    zIndex: 1,
    stagger: 0.6,
  });

  gallery.button.addEventListener('mouseenter', () => {
    tlGallery.play();
  });
  gallery.button.addEventListener('mouseleave', () => {
    tlGallery.reverse();
  });
};

window.addEventListener('DOMContentLoaded', init);

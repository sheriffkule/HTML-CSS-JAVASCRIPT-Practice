const loader = {
  gallery: document.querySelector('.loader_gallery'),
  galleryItem: document.querySelectorAll('.loader_gallery_figure'),
  circleTop: document.querySelector('.loader_circle-top'),
  circleBottom: document.querySelector('.loader_circle-bottom'),
};

const hero = {
  headingTitle: document.querySelector('.hero_heading_title'),
  headingTitleChars: document.querySelectorAll('.hero_heading_title > h1'),
  subheadingTitle: document.querySelector('.hero_subheading_title'),
  subheadingTitleChars: document.querySelectorAll('.hero_subheading_title > h2'),
};

const init = () => {
  gsap.set(loader.gallery, { scale: 0.75 });
  gsap.set([loader.circleBottom, loader.circleTop], { yPercent: 0 });
  gsap.set([hero.headingTitle, hero.subheadingTitle], { yPercent: -250, rotate: -15 });
  gsap.set([hero.headingTitleChars, hero.subheadingTitleChars], { yPercent: -100 });

  setTimeout(() => {
    animateLoader();
    animateHero();
  }, 1000);
};

const animateLoader = () => {
  const galleryItemCentered = loader.galleryItem.length / 2 - 1;
  const galleryItem = loader.galleryItem[galleryItemCentered.toFixed(0)];

  gsap
    .timeline({ defaults: { duration: 1.8, ease: 'expo.inOut' } })
    .to(loader.gallery, {
      scale: 1,
    })
    .to(
      galleryItem,
      {
        width: '100vw',
      },
      0
    )
    .to(
      loader.circleTop,
      {
        yPercent: -100,
      },
      0.2
    )
    .to(
      loader.circleBottom,
      {
        yPercent: 100,
      },
      0.2
    );
};

const animateHero = () => {
  gsap
    .timeline({ defaults: { duration: 3.2, ease: 'expo.inOut' } })
    .to([hero.headingTitle, hero.subheadingTitle], {
      yPercent: -10,
      rotate: 0,
    })
    .to(
      [hero.headingTitleChars, hero.subheadingTitleChars],
      {
        yPercent: 0,
        stagger: 0.05,
      },
      0
    );
};

window.addEventListener('DOMContentLoaded', init);
gsap.registerPlugin(ScrollTrigger);

const slider = {
  item: document.querySelectorAll('.hero_col_slider_item'),
  figure: document.querySelectorAll('.hero_col_slider_item > figure'),
  title: document.querySelectorAll('.hero_col_slider_item > h2'),
  paragraph: document.querySelectorAll('.hero_col_slider_item > p'),
};

const init = () => {
  for (let i = 1; i < slider.item.length; i++) {
    gsap.set([slider.figure[i], slider.title[i], slider.paragraph[i]], {
      xPercent: 120,
      y: '10rem',
      rotate: 30,
      autoAlpha: 0,
    });
}
  sliderAnimation();
};

const sliderAnimation = () => {
  const timeline = gsap.timeline({
    defaults: { stagger: 0.1, ease: 'expo.inOut' },
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '+=8000 bottom',
      scrub: 3.2,
      pin: true,
    },
  });

  const settingIn = {
    xPercent: 0,
    y: '0rem',
    rotate: 0,
    autoAlpha: 1,
  };
  const settingOut = {
    xPercent: -120,
    y: '-10rem',
    rotate: -30,
    autoAlpha: 0,
  };

  for (let i = 0; i < slider.item.length; i++) {
    if (i === slider.item.length - 1) {
      timeline.to([slider.figure[i], slider.title[i], slider.paragraph[i]], {
        ...settingIn,
      });
    } else {
      timeline
        .to([slider.figure[i], slider.title[i], slider.paragraph[i]], { ...settingIn })
        .to([slider.figure[i], slider.title[i], slider.paragraph[i]], { ...settingOut });
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 769) init();
});

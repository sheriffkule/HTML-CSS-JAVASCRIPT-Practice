const menu = {
  element: document.querySelector('.menu'),
  pages: document.querySelectorAll('.menu_row_pages > h2'),
  info: document.querySelectorAll('.menu_row_info > div > span'),
  title: document.querySelectorAll('.menu_row_title > h1'),
  media: document.querySelector('.menu_row_media'),
};

const button = {
  element: document.querySelector('.nav_menu_button'),
  text: document.querySelectorAll('.nav_menu_button_text > span'),
  open: document.querySelector('.--open-menu'),
  close: document.querySelector('.--close-menu'),
};

const clipPath = {
  init: 'inset(0% 0% 0% 0%)',
  bottom: 'inset(100% 0% 0% 0%)',
  close: 'inset(0% 0% 100% 0%)',
};

const tlMenu = gsap.timeline({
  paused: true,
  defaults: { duration: 1.6, ease: 'expo.inOut' },
});

let isEnabled = false;

const initMenu = () => {
  gsap.set(menu.element, { pointerEvents: 'none', clipPath: clipPath.bottom });
  gsap.set(menu.pages, { yPercent: 300, autoAlpha: 0 });
  gsap.set(menu.info, { yPercent: 300, autoAlpha: 0 });
  gsap.set(menu.title, { yPercent: 200, rotateY: 30, scale: 0.2 });
  gsap.set(menu.media, { yPercent: 200, clipPath: clipPath.bottom });

  animateInnerMenu();
};

const animateMenu = () => {
  if (!isEnabled) {
    gsap.to(menu.element, {
      duration: 1.2,
      pointerEvents: 'auto',
      clipPath: clipPath.init,
      ease: 'expo.inOut',
    });
  } else {
    gsap.to(menu.element, {
      duration: 1.2,
      clipPath: clipPath.top,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(menu.element, {
          pointerEvents: 'none',
          clipPath: clipPath.bottom,
        });
      },
    });
  }
};

const animateInnerMenu = () => {
  tlMenu
    .to(
      menu.pages,
      {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.032,
      },
      0.3
    )
    .to(
      menu.info,
      {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.032,
      },
      0.3
    ).to(
        menu.title,
        {
          yPercent: 0,
          rotateY: 0,
          scale: 1,
          stagger: 0.032,
        },
        0
      ).to(
        menu.media,
        {
          clipPath: clipPath.init,
          yPercent: -50,
        },
        0.3
      );
};

const animateButton = (text) => {
  gsap.timeline().to(button.element, {
    duration: 0.8,
    autoAlpha: 0,
    pointerEvents: 'none',
    onComplete: () => {
      button.text[0].textContent = text;
    },
  }).
    to(button.element, {
      duration: 0.8,
      autoAlpha: 1,
      pointerEvents: 'auto',
    });
};

const addEventListeners = () => {
  button.open.addEventListener('click', () => {
    if (!isEnabled) {
      animateButton('Close');
      animateMenu();
      tlMenu.play();
    } else {
      animateButton('Menu');
      animateMenu();
      tlMenu.reverse(2);
    }

    isEnabled = !isEnabled;
  });
};

window.addEventListener('DOMContentLoaded', () => {
  initMenu();
  addEventListeners();
});

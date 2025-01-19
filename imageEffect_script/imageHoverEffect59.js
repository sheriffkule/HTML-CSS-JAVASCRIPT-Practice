gsap.registerPlugin(ScrollTrigger);

const innovation = {
  element: document.querySelector('.innovation'),
  bgMedias: document.querySelectorAll('.innovation_bg_media'),
};

const card = {
  index: document.getElementById('scroll-index'),
  heading: document.getElementById('scroll-heading'),
  thumbnail: document.querySelectorAll('.innovation_card_thumbnail > img'),
  paragraph: document.getElementById('scroll-paragraph'),
};

const init = () => {
  Splitting({
    target: innovation.bgMedias,
    by: 'cells',
    rows: 40,
    image: true,
  });
};

const initScroll = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: innovation.element,
      start: 'top top',
      end: '+=8000 bottom',
      scrub: 0.5,
      pin: true,
    },
  });

  for (let i = 0; i < innovation.bgMedias.length; i++) {
    const item = innovation.bgMedias[i];
    const itemCells = item.querySelectorAll('.cell');
    const thumbnails = card.thumbnail[i];

    gsap.set(item, { zIndex: innovation.bgMedias.length - i });
    gsap.set(thumbnails, {
      clipPath: 'inset(0% 0% 0% 0%)',
      zIndex: card.thumbnail.length - i,
    });

    if (i < innovation.bgMedias.length - 1) {
      tl.to(itemCells, {
        scaleY: 0,
        stagger: {
          each: 0.01,
          from: 'end',
          ease: 'power2.inOut',
        },
      });
      tl.to(
        thumbnails,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          onComplete: () => animateThumbnailsElements(i, 'up'),
          onReverseComplete: () => animateThumbnailsElements(i, 'down'),
        },
        '-=0.75'
      );
    }
  }
};

const animateThumbnailsElements = (index, direction) => {
  const translateDirection = direction === 'up' ? -100 : 100;
  const indexDirection = direction === 'up' ? index + 1 : -index;
  const calcY = indexDirection * (translateDirection / card.thumbnail.length);

  const elementsToAnimate = [card.index, card.heading, card.paragraph];

  elementsToAnimate.forEach((element) => {
    element.style.transform = `translateY(${calcY}%)`;
  });
};

init();
initScroll();

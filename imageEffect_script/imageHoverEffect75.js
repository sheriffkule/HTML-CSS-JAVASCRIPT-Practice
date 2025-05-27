import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

function setupMarqueeAnimation() {
  const marqueeItems = gsap.utils.toArray('.marquee h1');
  if (marqueeItems.length > 0) {
    horizontalLoop(marqueeItems, {
      repeat: -1,
      paddingRight: 30,
    });
  }
}

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    defaults: { ease: 'none' },
  });
  let length = items.length;
  let startX = items[0].offsetLeft;
  let width = [];
  let xPercents = [];
  let pixelsPerSecond = (config.speed || 1) * 100;
  let totalWidth, curX, distanceToStart, distanceToLoop, item, i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (width[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
      xPercents[i] =
        (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 + gsap.getProperty(el, 'xPercent');
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * width[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * width[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + width[i] * gsap.getProperty(item, 'scaleX');
    tl.to(
      item,
      {
        xPercent: ((curX - distanceToLoop) / width[i]) * 100,
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      {
        xPercent: ((curX - distanceToLoop + totalWidth) / width[i]) * 100,
      },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, true).progress(0, true);
  return tl;
}

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const cards = gsap.utils.toArray('.card');
  const introCard = cards[0];

  const titles = gsap.utils.toArray('.card-title h1');
  titles.forEach((title) => {
    const split = new SplitText(title, {
      type: 'char',
      charsClass: 'char',
      tag: 'div',
    });
    split.chars.forEach((char) => {
      char.innerHTML = `<span>${char.textContent}</span>`;
    });
  });

  const cardImgWrapper = introCard.querySelector('.card-img');
  const cardImg = introCard.querySelector('.card-img img');
  gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: '400px' });
  gsap.set(cardImg, { scale: 1.5 });

  function animateContentIn(titleChars, description) {
    gsap.to(titleChars, { x: '0%', duration: 0.75, ease: 'power4.out' });
    gsap.to(description, {
      x: 0,
      opacity: 1,
      duration: 0.75,
      delay: 0.1,
      ease: 'power4.out',
    });
  }

  function animateContentOut(titleChars, description) {
    gsap.to(titleChars, { x: '100%', duration: 0.5, ease: 'power4.out' });
    gsap.to(description, {
      x: '40px',
      opacity: 0,
      duration: 0.5,
      ease: 'power4.out',
    });
  }
});

const thumbnail = {
  item: document.querySelectorAll('.section_thumbnail_item'),
  itemText: document.querySelectorAll('.section_thumbnail_item > h1'),
  figure: document.querySelectorAll('.section_thumbnail_item_figure'),
};

const bg = {
  media: document.querySelectorAll('.section_bg_media'),
  mediaImg: document.querySelectorAll('.section_bg_media_image'),
  mediaText: document.querySelectorAll('.section_bg_media_text > span'),
};

const clipPath = {
  init: 'polygon(0% 0%, 0% 0%, 10% 100%, 10% 100%)',
  full: 'polygon(100% 0%, 0% 0%, 10% 100%, 90% 100%)',
};

gsap.defaults({
  duration: 1.2,
  ease: 'expo.inOut',
  overwrite: true,
});

const init = () => {
  gsap.set(thumbnail.item, { yPercent: 120 });
  gsap.set(bg.media, { clipPath: clipPath.init, scale: 1.25 });
  gsap.set(bg.mediaText, { yPercent: 100 });
  gsap.to(thumbnail.item, { yPercent: 0, stagger: 0.1 });
};

const animateClipPath = (index, eventType) => {
    for(let i = 0; i < bg.media.length; i++){
        gsap.to(bg.media[index], {
            clipPath: () => (eventType === 'mouseenter' ? clipPath.full : clipPath.init),
        });
        gsap.to(bg.mediaImg[index], {
            scale: () => (eventType === 'mouseenter' ? 1 : 1.25),
        });
        gsap.to(bg.mediaText[index], {
            yPercent: () => (eventType === 'mouseenter' ? 0 : 100),
        })
    }
};

const animateStyle = (item, eventType) => {
    thumbnail.item.forEach((otherItem) => {
        if (otherItem === item){
            otherItem.style.color = eventType === 'mouseenter' ? 'white' : 'red';
        } else {
            otherItem.style.opacity = eventType === 'mouseenter' ? 0.4 : 1;
        }
    });
};

const addEventListeners = () => {
  thumbnail.item.forEach((item, index) => {
    const figure = thumbnail.figure[index];

    const handleInteractions = (event) => {
      const eventType =
        event.type === 'touchstart' || event.type === 'mouseenter'
          ? 'mouseenter'
          : 'mouseleave';

      animateClipPath(index, eventType);
      animateStyle(item, eventType);

      eventType === 'mouseenter'
        ? figure.classList.add('active')
        : figure.classList.remove('active');
    };

    item.addEventListener('mouseenter', handleInteractions);
    item.addEventListener('mouseleave', handleInteractions);

    item.addEventListener('touchstart', handleInteractions);
    item.addEventListener('touchend', handleInteractions);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  init();
  addEventListeners();
});

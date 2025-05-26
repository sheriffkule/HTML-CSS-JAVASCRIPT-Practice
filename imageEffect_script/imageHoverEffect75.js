function setupMarqueeAnimation() {
  const marqueeItems = gsap.utils.toArray('.marquee h1');
  if (marqueeItems.length > 0) {
    const tl = horizontalLoop(marqueeItems, {
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
        defaults: {ease: 'none'},
    });
    let length = items.length;
    let startX = items[0].offsetLeft;
    let width = [];
    let xPercents = [];
    let pixelsPerSecond = (config.speed || 1) * 100;
    let totalWidth, curX, distanceToStart, distanceToLoop, item, i;
}
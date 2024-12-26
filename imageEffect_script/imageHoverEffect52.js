gsap.registerPlugin(Draggable);

const draggable = {
  element: document.querySelector('.draggable'),
  container: document.querySelector('.draggable_container'),
  items: document.querySelectorAll('.draggable_item'),
};

const isBounded = true;

const init = () => {
  draggable.items.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect(),
      itemWidth = itemRect.width,
      itemHeight = itemRect.height;

      const positions = {
        left: {
            x: gsap.utils.random(-itemWidth - 500, -itemWidth - 100),
            y: gsap.utils.random(0, window.innerHeight - itemHeight),
        },
        right: {
            x: gsap.utils.random(window.innerWidth + 100, window.innerWidth + 500),
            y: gsap.utils.random(0, window.innerHeight - itemHeight),
        },
        top: {
            x: gsap.utils.random(0, window.innerWidth - itemWidth),
            y: gsap.utils.random(-itemHeight - 500, -itemHeight - 100),
        },
        bottom: {
            x: gsap.utils.random(0, window.innerWidth - itemWidth),
            y: gsap.utils.random(window.innerHeight + 100, window.innerHeight + 500),
        },
      };

      const fromSide = gsap.utils.random(['left', 'right', 'top', 'bottom']);
      const {x, y} = positions[fromSide];

      gsap.set(item, {
        x: x,
        y: y,
        zIndex: Math.floor(Math.random() * draggable.items.length) + 1,
      });

      gsap.to(item, {
        duration: 2.4,
        x: gsap.utils.random(window.innerWidth * 0.5, window.innerWidth * 0.5 - itemWidth),
        y: gsap.utils.random(window.innerHeight * 0.5, window.innerHeight * 0.5 - itemHeight),
        ease: 'expo.inOut',
        delay: index * 0.2,
        onComplete: () => {
            Draggable.create(item, {
                bounds: isBounded ? draggable.element : null,
            })
        } 
      })
  });
};

window.addEventListener('DOMContentLoaded', init);

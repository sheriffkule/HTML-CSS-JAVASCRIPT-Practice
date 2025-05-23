const container = document.querySelector('.container');

for (let i = 0; i < 200; i++) {
  const block = document.createElement('div');
  block.classList.add('block');
  container.appendChild(block);
}

let block = document.querySelectorAll('.block');
let animation = anime.timeline({
  targets: block,
  easing: 'easeInOutExpo',
  loop: true,
  delay: anime.stagger(10, { start: 50 }),
});

animation
  .add({
    scale: 0,
    translateX: () => {
      return anime.random(360, 2000);
    },
    translateY: () => {
      return anime.random(360, -2000);
    },
    rotate: () => {
      return anime.random(-360, 360);
    },
    duration: () => {
      return anime.random(500, 3000);
    },
  })
  .add({
    scale: 1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    duration: () => {
      return anime.random(500, 3000);
    },
  });

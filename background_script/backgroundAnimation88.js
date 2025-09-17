const wrapper = document.querySelector('.wrapper');

for (let i = 0; i < 81; i++) {
  const item = document.createElement('div');
  item.classList.add('item');
  wrapper.appendChild(item);
}

document.addEventListener('mousemove', (e) => {
  const sqrs = document.querySelectorAll('.item');

  const mouseX = e.pageX;
  const mouseY = e.pageY;

  sqrs.forEach((sqr) => {
    const sqrX = sqr.offsetLeft + 20;
    const sqrY = sqr.offsetTop + 20;

    const diffX = mouseX - sqrX;
    const diffY = mouseY - sqrY;

    const radians = Math.atan2(diffY, diffX);
    const angle = (radians * 180) / Math.PI;

    sqr.style.transform = `rotate(${angle}deg)`;
  });
});

const colorInput = document.getElementById('color');

colorInput.addEventListener('change', (e) => {
  const sqrs = document.querySelectorAll('.item');
  color = e.target.value;
  sqrs.forEach((sqr) => {
    sqr.style.backgroundColor = color;
  });
});

const triangle = document.querySelector('.triangle');

triangle.addEventListener('click', () => {
  const sqrs = document.querySelectorAll('.item');

  sqrs.forEach((sqr) => {
    sqr.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
  });
});

const star = document.querySelector('.star');

star.addEventListener('click', () => {
  const sqrs = document.querySelectorAll('.item');

  sqrs.forEach((sqr) => {
    sqr.style.clipPath =
      'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
  });
});

const square = document.querySelector('.square');

square.addEventListener('click', () => {
  const sqrs = document.querySelectorAll('.item');

  sqrs.forEach((sqr) => {
    sqr.style.clipPath = '';
  });
});

const box = document.querySelector('.box');
const outerBox = document.querySelector('.outerBox');

const rotationFactor = 1 / 6;
const perspectiveValue = '1000px';

outerBox.addEventListener('mousemove', (e) => {
  const rotationAngle = (e.clientX * rotationFactor);

  box.style.transform = `perspective(${perspectiveValue}) rotateY(${rotationAngle}deg)`;
});
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(pointer: coarse)').matches;
const shouldRun = !isReducedMotion && !isTouch;

if (shouldRun) {
  let mouseX = 0;
  let mouseY = 0;

  const coordinates = document.querySelector('#coordinates strong');
  const pointer = document.querySelector('.pointer');

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (coordinates) {
      coordinates.innerText = `Mouse position:
             (x: ${mouseX}px, y: ${mouseY}px)`;
    }
  });

  function animate() {
    pointer.style.setProperty('--mouseX', `${mouseX}px`);
    pointer.style.setProperty('--mouseY', `${mouseY}px`);
    requestAnimationFrame(animate);
  }

  animate();
}

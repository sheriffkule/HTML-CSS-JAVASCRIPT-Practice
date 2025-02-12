const nPts = 400;
const radius = 200;
const wraps = 53;

for (let i = 0; i < nPts; i++) {
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
    angle = (i / nPts) * Math.PI * wraps - Math.PI / wraps,
    x = Math.cos(angle) * ((i / nPts) * radius),
    y = Math.sin(angle) * ((i / nPts) * radius);

  gsap.set(c, {
    x: 250,
    y: 250,
    attr: {
      class: 'c c' + i,
      r: (gsap.utils.wrapYoyo(0, nPts / 2, i) / nPts) * 7 + 0.1,
      cx: x,
      cy: y,
      fill: 'rgb(0,255,30)',
    },
  });

  stage.appendChild(c);
}

gsap.to('.c', {
  duration: 10,
  rotate: 360,
  ease: 'none',
  repeat: -1,
});
gsap.from('.c', {
  duration: 2,
  attr: { cx: 0, cy: 0, r: 0 },
  yoyo: true,
  ease: 'circ',
  repeat: -1,
  stagger: -0.02
});

let section = document.querySelector('section');

for (let i = 0; i < 200; i++) {
  let div = document.createElement('div');
  section.appendChild(div);
}

document.addEventListener('mousemove', function (e) {
  document.querySelectorAll('div').forEach((div) => {
    let x = div.offsetLeft - e.pageX;
    let y = div.offsetTop - e.pageY;
    let distance = Math.sqrt(x * x + y * y);
    let score = Math.exp(distance * -0.01);

    div.style.transform = 'scale(' + score * 4 + ') rotate(' + score * 180 + 'deg)';
    div.style.opacity = score * 12;
    let randomHue = Math.random() * 720;
    div.style.filter = `hue-rotate(${randomHue}deg)`;
  });
});
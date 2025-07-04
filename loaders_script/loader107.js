const eyes = document.querySelectorAll('.eye');

function eyeball(event) {
  eyes.forEach((eye) => {
    const eyeX = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    const eyeY = eye.getBoundingClientRect().top + eye.clientHeight / 2;

    const radian = Math.atan2(event.pageX - eyeX, event.pageY - eyeY);
    const rotation = radian * (180 / Math.PI) * -1 + 270;

    eye.style.transform = `rotate(${rotation}deg)`;
  });
}

document.querySelector('body').addEventListener('mousemove', eyeball);

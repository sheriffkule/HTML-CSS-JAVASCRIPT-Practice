let currentRotationX = 0;
let currentRotationY = 0;

function rotateCube(direction) {
  const cube = document.querySelector('.cube');
  switch (direction) {
    case 'left':
      currentRotationY -= 90;
      break;
    case 'right':
      currentRotationY += 90;
      break;
    case 'up':
      currentRotationX -= 90;
      break;
    case 'down':
      currentRotationX += 90;
  }

  cube.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
}
document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        rotateCube('left');
        break;
      case 'ArrowRight':
        rotateCube('right');
        break;
      case 'ArrowUp':
        rotateCube('up');
        break;
      case 'ArrowDown':
        rotateCube('down');
        break;
    }
  });
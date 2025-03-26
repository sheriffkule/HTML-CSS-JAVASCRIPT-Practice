const container = document.querySelector('.cube-container');
const cube = document.createElement('div');

cube.classList.add('cube');
container.appendChild(cube);

const faces = ['Front', 'Back', 'Left', 'Right', 'Top', 'Bottom'];

faces.forEach((face) => {
  const faceDiv = document.createElement('div');

  faceDiv.classList.add('face', face);
  faceDiv.textContent = face;
  cube.appendChild(faceDiv);
});

const btnContainer = document.createElement('div');
btnContainer.classList.add('btn-container');
container.appendChild(btnContainer);

const spinBtn = document.createElement('button');
spinBtn.classList.add('spinBtn', 'btn');
spinBtn.textContent = 'Spin';
btnContainer.appendChild(spinBtn);

spinBtn.addEventListener('click', function () {
  const rotationX = Math.floor(Math.random() * 360);
  const rotationY = Math.floor(Math.random() * 360);

  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
});

const resetBtn = document.createElement('button');
resetBtn.classList.add('resetBtn', 'btn');
resetBtn.textContent = 'Reset';
btnContainer.appendChild(resetBtn);

resetBtn.addEventListener('click', () => {
  cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

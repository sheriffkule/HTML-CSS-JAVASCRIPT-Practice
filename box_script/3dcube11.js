const cubeContainers = document.querySelectorAll('.cube-container');
const items = document.querySelectorAll('.item');
const projectNames = ['food', 'burger', 'pizza', 'tasty'];

function updateCube(scrollY) {
  const yRotation = (scrollY / 2) % 360;
  const scrollOffset = scrollY * 0.25;

  cubeContainers.forEach((container, containerIndex) => {
    const cubes = container.querySelectorAll('.cube');

    cubes.forEach((cube, cubeIndex) => {
      let rotationDirection = cubeIndex % 2 === 0 ? 1 : -1;
      cube.style.transform = `translateZ(100px) rotateX(${
        yRotation * rotationDirection
      }deg)`;
    });

    const frontBackTextPosition = 50 + scrollOffset;
    const topBottomTextPosition = 50 - scrollOffset;

    container.querySelectorAll('.front p, .back p').forEach((p) => {
      p.style.left = `${frontBackTextPosition}`;
    });

    container.querySelectorAll('.top p, .bottom p').forEach((p) => {
      p.style.left = `${topBottomTextPosition}`;
    });
  });
}

function populateText() {
  items.forEach((item, itemIndex) => {
    const projectName = projectNames[itemIndex % projectNames.length];
    const sides = item.querySelectorAll('.side p');
    const textContent = Array(1).fill(projectName).join('&nbsp;');

    sides.forEach((side) => {
      side.innerHTML = textContent;
    });
  });
}

window.onload = function () {
  populateText();
  updateCube(window.scrollY);
};

let ticking = false;

document.addEventListener('scroll', function (e) {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      updateCube(window.scrollY);
      ticking = false;
    });

    ticking = true;
  }
});
const road = document.getElementById('road');
const redLight = document.querySelector('.red');
const yellowLight = document.querySelector('.yellow');
const greenLight = document.querySelector('.green');

let currentLight = 'red';

const SPEED = 2;
const CAR_LENGTH = 70;
const SAFE_GAP = 15;

const STOP_LTR = 380;
const STOP_RTL = 440;

let ltrCar = [];
let rtlCar = [];

function setLight(color) {
  currentLight = color;
  redLight.classList.remove('active');
  yellowLight.classList.remove('active');
  greenLight.classList.remove('active');

  if (color === 'red') redLight.classList.add('active');
  if (color === 'yellow') yellowLight.classList.add('active');
  if (color === 'green') greenLight.classList.add('active');
}

function spawnCar(direction) {
  const car = document.createElement('div');
  car.className = `car ${direction}`;
  car.x = direction === 'ltr' ? -80 : 840;
  car.passed = false;

  road.appendChild(car);

  const list = direction === 'ltr' ? ltrCar : rtlCar;
  list.push(car);

  function move() {
    const index = list.indexOf(car);
    const frontCar = list[index - 1];

    if (direction === 'ltr' && car.x > STOP_LTR) car.passed = true;
    if (direction === 'rtl' && car.x < STOP_RTL) car.passed = true;

    let shouldStop = false;

    if (
      (!car.passed && currentLight !== 'green' && direction === 'ltr' && car.x + CAR_LENGTH >= STOP_LTR) ||
      (!car.passed && currentLight !== 'green' && direction === 'rtl' && car.x <= STOP_RTL)
    ) {
      shouldStop = true;
    }

    if (frontCar) {
      const gap = direction === 'ltr' ? frontCar.x - (car.x + CAR_LENGTH) : car.x - (frontCar.x + CAR_LENGTH);

      if (gap < SAFE_GAP) shouldStop = true;
    }

    if (!shouldStop) car.x += direction === 'ltr' ? SPEED : -SPEED;

    car.style.left = car.x + 'px';

    if ((direction === 'ltr' && car.x > 900) || (direction === 'rtl' && car.x < -100)) {
      if (car.parentNode) car.remove();
      list.splice(index, 1);
      return;
    }
    requestAnimationFrame(move);
  }
  move();
}

const scheduleCar = (direction) => {
  const randomInterval = Math.floor(Math.random() * 1700) + 800;
  spawnCar(direction);
  setTimeout(() => scheduleCar(direction), randomInterval);
};

scheduleCar('ltr');
scheduleCar('rtl');

setLight('red')

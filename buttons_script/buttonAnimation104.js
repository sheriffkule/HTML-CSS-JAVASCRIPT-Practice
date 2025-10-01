/** @type{HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const buttonElements = document.querySelectorAll('.button');
let buttonMeasurements = [];

function measureButtons() {
  buttonMeasurements = [];
  buttonElements.forEach((button) => {
    buttonMeasurements.push(button.getBoundingClientRect());
  });
}

measureButtons();

let particlesArray = []

class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = Math.random() * 1.5 + 1.5;
        this.directionX = Math.random() * 2;
    }

    update() {
        this.x -= this.weight;
        this.y +=this.directionX;
    }
}
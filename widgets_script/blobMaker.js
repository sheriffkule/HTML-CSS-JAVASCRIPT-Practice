const canvas = document.getElementById('blobCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;
let anim = false;
let t = 0;
let dragIndex = -1;

function resize() {
  width = canvas.width = canvas.clientWidth * devicePixelRatio;
  height = canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
resize();

window.addEventListener('resize', resize);

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let rng = mulberry32(0);

let pts = []
function makePoints() {
    
}
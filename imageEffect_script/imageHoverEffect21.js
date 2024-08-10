let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let box = document.querySelector('.box');
let degree = 0;

prev.addEventListener('click', function () {
	degree += 90;
	box.style = `transform: perspective(1000px) rotateY(${degree}deg)`;
});
next.addEventListener('click', function () {
	degree -= 90;
	box.style = `transform: perspective(1000px) rotateY(${degree}deg)`;
});
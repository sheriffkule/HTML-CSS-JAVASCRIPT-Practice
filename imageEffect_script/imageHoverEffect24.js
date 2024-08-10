let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let box = document.querySelector('.box');
let container = document.querySelector('.container');

let degrees = 0;

prev.addEventListener('click', function () {
	degrees += 45;
	box.style = `transform: perspective(1000px) rotateY( ${degrees}deg)`;
});
next.addEventListener('click', function () {
	degrees -= 45;
	box.style = `transform: perspective(1000px) rotateY( ${degrees}deg)`;
});

container.addEventListener('wheel', function (e) {
	if (e.deltaY > 0) {
		degrees += 45;
		box.style = `transform: perspective(1000px) rotateY( ${degrees}deg)`;
	} else {
		degrees -= 45;
		box.style = `transform: perspective(1000px) rotateY( ${degrees}deg)`;
	}
});
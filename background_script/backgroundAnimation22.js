for (let i = 1; i <= 75; i++) {
	let stars = document.createElement('div');
	stars.classList.add('star');
	let size = Math.random() * 20;
	stars.style.fontSize = 10 + size + 'px';
	stars.style.left = Math.random() * +innerWidth + 'px';
	stars.style.top = Math.random() * -innerHeight + 'px';
	stars.style.filter = `hue-rotate(${i * 5}deg)`;
	document.querySelector('.sec').appendChild(stars);
}
function animateStars() {
	let allStars = document.querySelectorAll('.star');
	let num = Math.floor(Math.random() * allStars.length);
	allStars[num].classList.toggle('animate');
}

setInterval(animateStars, 50);
let box = document.querySelector('.box');
let images = [
	'/images/darkhex.jpg',
	'/images/matrix.jpg',
	'/images/glowing_globe.jpg',
	'/images/pexels.jpeg',
	'/images/cityscape.jpg',
	'/images/dreamy-world.jpg',
];

window.addEventListener('scroll', () => {
	let scrollPosition = window.scrollY;
	let viewportHeight = window.innerHeight;

	let imageIndex = Math.floor(
		(scrollPosition / viewportHeight) % images.length
	);

	box.style.backgroundImage = `url(${images[imageIndex]})`;
});
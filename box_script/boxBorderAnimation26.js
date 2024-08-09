const inner = document.querySelector('.inner');

for (let i = 1; i <= 72; i++) {
	let element = document.createElement('div');
	element.classList.add('element');
	inner.appendChild(element);
}

console.clear();

const element = document.querySelectorAll('.element');

let deg = 0;

element.forEach((elements) => {
	elements.style.transform = `rotateY(${deg}deg) translateX(220px)`;

	elements.style.backgroundColor = `hsl(${deg},70%, 50%)`;

	deg += 5;
});

onmousemove = (e) => {
	let midPoint = window.innerWidth / 4;
	let midTopPoint = window.innerHeight / 4;

	inner.style.transform = `rotateY(${
		(e.clientX / midPoint - 1) * 50
	}deg) rotateX(${(e.clientY / midTopPoint - 1) * 50}deg)`;
};
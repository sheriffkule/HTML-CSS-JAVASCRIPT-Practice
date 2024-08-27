let section = document.querySelector('section');

for (let i = 0; i < 200; i++) {
    let div = document.createElement('div');
    div.classList.add('box');
    section.appendChild(div);
}

let boxes = document.querySelectorAll('.box');

document.addEventListener('mousemove', function (e) {

	boxes.forEach((box) => {
		let x = box.offsetLeft - e.pageX;
		let y = box.offsetTop - e.pageY;

		let distance = Math.sqrt(x * x + y * y);
		box.style.transform = `rotate(${distance / 2}deg)`;
	});
});
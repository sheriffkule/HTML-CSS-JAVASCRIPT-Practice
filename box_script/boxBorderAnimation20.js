let box = document.querySelector('.box');
for (let i = 1; i <= 50; i++) {
	let div = document.createElement('div');
	div.className = 'item';
	div.textContent = i;
	box.appendChild(div);
}

function moveNext() {
	let item = document.querySelectorAll('.item');
	box.appendChild(item[0]);
}

function movePrev() {
	let item = document.querySelectorAll('.item');
	box.prepend(item[item.length - 1]);
}

window.addEventListener('wheel', function (event) {
	if (event.deltaY > 0) {
		moveNext();
	} else {
		movePrev();
	}
});

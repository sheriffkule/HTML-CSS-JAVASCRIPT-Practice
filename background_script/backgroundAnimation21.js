function stars() {
	let e = document.createElement('div');
	e.setAttribute('class', 'star');
	document.body.appendChild(e);
	e.style.left = Math.random() * +window.innerWidth + 'px';

	let size = Math.random() * 12;
	let duration = Math.random() * 3;

	e.style.fontSize = 12 + size + 'px';
	e.style.animationDuration = 12 + duration + 's';

	setTimeout(function () {
		document.body.removeChild(e);
	}, 15000);
}

setInterval(function () {
	stars();
}, 200);
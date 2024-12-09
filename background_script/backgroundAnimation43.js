let card = document.querySelectorAll('.card');

card.forEach((card) => {
	card.onmousemove = function (e) {
		let x = e.pageX - card.offsetLeft;
		let y = e.pageY - card.offsetTop;

		card.style.setProperty('--x', x + 'px');
		card.style.setProperty('--y', y + 'px');
	};
});
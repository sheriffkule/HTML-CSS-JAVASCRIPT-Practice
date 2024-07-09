document.addEventListener('mousemove', () => {
	let soap = document.querySelector('.soap');
	soap.style.left = event.pageX + 'px';
	soap.style.top = event.pageY + 'px';
	let i = document.createElement('i');
	i.style.left = event.pageX + 'px';
	i.style.top = event.pageY + 'px';
	i.style.scale = `${Math.random() * 2 + 1} `;
	i.style.setProperty('--x', getRandomPosition());
	i.style.setProperty('--y', getRandomPosition());

	function getRandomPosition() {
		return `${Math.random() * 400 - 200}px`;
	}

	document.body.appendChild(i);

	setTimeout(() => {
		document.body.removeChild(i);
	}, 3000);
});

let text = document.querySelectorAll('ul li a').forEach((text) => {
	text.innerHTML = text.innerHTML
		.split('')
		.map((letters, i) => `<span>${letters}</span>`)
		.join('');
	let spn = document.querySelectorAll('ul li a span').forEach((e) => {
		let duration = Math.random() * 5;
		e.style.animationDuration = 0.25 + duration + 's';
		e.style.animationDelay = 0.25 + duration + 's';
	});
});
let text = document.querySelectorAll('ul li a').forEach((text) => {
	text.innerHTML = text.innerText
		.split('')
		.map(
			(letters, i) =>
				`<span style="transition-delay:${i * 60}ms">${letters}</span>`
		)
		.join('');
});

let cursor = document.querySelector('#cursor');
document.addEventListener('mousemove', (e) => {
	cursor.style.left = e.pageX + 'px';
	cursor.style.top = e.pageY + 'px';
});

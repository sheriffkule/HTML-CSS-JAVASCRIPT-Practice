let loading = document.querySelector('.loading');

for (let i = 1; i <= 20; i++) {
	let span = document.createElement('span');
	span.style.setProperty('--i', i);
	loading.appendChild(span);
}
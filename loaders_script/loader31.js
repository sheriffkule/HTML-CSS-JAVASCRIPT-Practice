let container = document.querySelector('.container');

for (let i = 0; i <= 35; i++) {
	let div = document.createElement('div');
	div.style.setProperty('--i', i);

	let innerDiv = document.createElement('div');
	innerDiv.classList.add('metronome');
	innerDiv.style.setProperty('--d', i);
	div.appendChild(innerDiv);

	let baton = document.createElement('div');
	baton.classList.add('baton');
	innerDiv.appendChild(baton);

	container.appendChild(div);
}
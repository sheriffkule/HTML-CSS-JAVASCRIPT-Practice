let marker = document.getElementById('marker');
let item = document.querySelectorAll('.box');

function indicator(e) {
	marker.style.left = e.offsetLeft + 'px';
	marker.style.top = e.offsetTop + 'px';
}

item.forEach((link) => {
	link.addEventListener('click', (e) => {
		indicator(e.currentTarget);
	});
});

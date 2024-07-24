let list = document.querySelectorAll('li');
for (let i = 0; i < list.length; i++) {
	list[i].onmouseover = function () {
		let j = 0;
		while (j < list.length) {
			list[j++].className = 'list';
		}
		list[i].className = 'list active';
	};
}

list.forEach((Element) => {
	Element.addEventListener('mouseenter', function (event) {
		let bg = document.querySelector('body');
		let color = event.target.getAttribute('data-color');
		bg.style.backgroundColor = color;
	});
});

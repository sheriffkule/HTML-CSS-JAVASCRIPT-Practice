let i = 0;
let h2 = document.querySelector('h2');
let aqua = document.querySelector('.aqua');
let body = document.querySelector('body');
let number = document.querySelector('.number');
let percentBar = document.querySelector('.percentBar');

let interval = setInterval(function () {
	number.innerHTML = i + '<span>%</span>';
	percentBar.style.width = i + '%';
	i++;
	if (i == 101) {
		clearInterval(interval);
		setTimeout(function () {
			aqua.style.opacity = '0';
			aqua.style.visibility = 'hidden';
			body.style.background = '#03a9f4';
			h2.style.visibility = 'visible';
			h2.style.opacity = '1';
		});
	}
}, 50);
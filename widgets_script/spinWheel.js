let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');

spinBtn.onclick = function () {
	let value = Math.ceil(Math.random() * 3600);
	wheel.style.transform = 'rotate(' + value + 'deg)';
};
value += Math.ceil(Math.random() * 3600);

const navigation = document.querySelector('.navigation');

document.querySelector('.toggle').onclick = function () {
	this.classList.toggle('active');
	navigation.classList.toggle('active');
};

document.body.addEventListener('click', function (e) {
	if (
		e.target !== document.querySelector('.toggle') &&
		e.target !== document.querySelector('.navigation') &&
		document.querySelector('.toggle').classList.contains('active')
	) {
		document.querySelector('.toggle').classList.remove('active');
		document.querySelector('.navigation').classList.remove('active');
	}
});
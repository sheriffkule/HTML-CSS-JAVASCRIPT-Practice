let navigation = document.querySelector('.navigation');
document.querySelector('.toggle').onclick = function () {
	this.classList.toggle('active');
	navigation.classList.toggle('active');
};
document.addEventListener('click', (event) => {
	if (event.target === document.body) {
		navigation.classList.remove('active');
	}
});
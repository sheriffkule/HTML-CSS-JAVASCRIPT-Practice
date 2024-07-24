const selectBtn = document.getElementById('select_btn');
const text = document.getElementById('text');
const option = document.getElementsByClassName('option');

selectBtn.addEventListener('click', function () {
	selectBtn.classList.toggle('active');
});

for (const options of option) {
	options.onclick = function () {
		text.innerHTML = this.textContent;
		selectBtn.classList.remove('active');
	};
}

document.addEventListener('click', function (event) {
	if (event.target === document.body) {
		selectBtn.classList.remove('active');
	}
});
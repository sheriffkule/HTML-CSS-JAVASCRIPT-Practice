let list = document.querySelectorAll('.navigation li');

function activeLink() {
	list.forEach((item) => item.classList.remove('active'));

	setTimeout(() => {
		this.classList.add('active');
	}, 200);
}

list.forEach((item) => item.addEventListener('click', activeLink));
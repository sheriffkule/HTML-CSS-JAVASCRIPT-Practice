const list = document.querySelectorAll('li');
const sections = document.querySelectorAll('.section');

function activeLink() {
	list.forEach((item) => item.classList.remove('active'));

	sections.forEach((section) => section.classList.remove('active-section'));

	this.classList.add('active');

    const targetId = this.getAttribute('data-target');
	const targetSection = document.getElementById(targetId);
	if (targetSection) {
		targetSection.classList.add('active-section');
	}
}

list.forEach((item) => item.addEventListener('click', activeLink));

function closeActiveLink(event) {
	if (!event.target.closest('li')) {
        list.forEach((item) => item.classList.remove('active'));
        sections.forEach((section) => section.classList.remove('active-section'));
	}
}

document.addEventListener('click', closeActiveLink);
document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('header');
	const container = document.getElementById('container');
	const menuButton = document.getElementById('menu');
	const links = document.querySelectorAll('a[href^="#"]');

	function handleScroll() {
		container.classList.remove('menuopen');
		header.classList.toggle('sticky', window.scrollY >= 100);
	}

	function handleMenuButtonClick() {
		header.classList.remove('sticky');
		container.classList.toggle('menuopen');
	}

	function handleLinkClick(event) {
		event.preventDefault();
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}
	function handleCloseOutside(event) {
		if (!menuButton.contains(event.target)) {
			container.classList.remove('menuopen');
			header.classList.add('sticky');
		}
	}
	window.addEventListener('scroll', handleScroll);
	menuButton.addEventListener('click', handleMenuButtonClick);
	links.forEach((link) => link.addEventListener('click', handleLinkClick));

	document.addEventListener('click', handleCloseOutside);
});

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

// this will not work, it is only for practice purpose
const sendEmail = (e) => {
	e.preventDefault();

	//serviceID - templateID - #form - publicKey
	emailjs
		.sendForm(
			'service_8ii265s',
			'template_85g6ftk',
			'#contact-form',
			'VQaq6RG_bXgud6bnm'
		)

		.then(
			() => {
				contactMessage.textContent = 'Message sent successfully! ✅';

				setTimeout(() => {
					contactMessage.textContent = '';
				}, 5000);

				contactForm.reset();
			},
			() => {
				contactMessage.textContent =
					'Failed to send message. Please try again. ❌';
			}
		);
};

contactForm.addEventListener('submit', sendEmail);

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
	if (window.scrollY > 400) {
		scrollUp.classList.add('show-scroll');
	} else {
		scrollUp.classList.remove('show-scroll');
	}
};

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollDown = window.scrollY;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 100;
		const sectionId = current.getAttribute('id');
		const sectionClass = document.querySelector(
			'.nav__list a[href*=' + sectionId + ']'
		);

		if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
			sectionClass.classList.add('active__link');
		} else {
			sectionClass.classList.remove('active__link');
		}
	});
};
window.addEventListener('scroll', scrollActive);

window.addEventListener('scroll', scrollUp);

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;

const sr = ScrollReveal({
	origin: 'top',
	distance: '100px',
	duration: 2500,
	delay: 400,
	reset: true,
	mobile: true,
	opacity: 0,
});

sr.reveal('.perfil, .contact__form');
sr.reveal('.info', { origin: 'left', delay: 800 });
sr.reveal('.skills', { origin: 'left', delay: 1000 });
sr.reveal('.about', { origin: 'right', delay: 1200 });
sr.reveal('.projects__card, .services__card, .experience__card', {
	interval: 100,
});
sr.reveal('.footer__container', { origin: 'bottom', delay: 200 });
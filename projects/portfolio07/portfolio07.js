var typed = new Typed('.input', {
	strings: [
		'Coder.',
		'Frontend Developer.',
		'UI/UX Designer.',
		'Web Developer.',
	],
	typeSpeed: 300,
	backSpeed: 50,
	loop: true,
	loopCount: Infinity,
	showCursor: true,
	cursorChar: '|',
	smartBackspace: true,
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

		resumeBtns.forEach((btn) => {
			btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
	});
});

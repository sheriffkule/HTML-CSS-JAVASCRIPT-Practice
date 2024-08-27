const progress = document.querySelector('.progress');
const steps = document.querySelectorAll('.step');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let step = 0;

prevBtn.addEventListener('click', () => {
	updateStep(-1);
});

nextBtn.addEventListener('click', () => {
	updateStep(1);
});

function updateStep(direction) {
	step += direction;

	if (step >= 0 && step < steps.length) {
		updateProgressBar();
		updateStepDisplay();
		updateButtonState();
	}
}

function updateProgressBar() {
	const multiplier = 100 / (steps.length - 1);
	const width = step * multiplier;
	progress.style.transform = `scaleX(${width}%)`;
}

function updateStepDisplay() {
	steps.forEach((s, index) => {
		s.classList.toggle('active', index <= step);
		s.textContent = index + 1 <= step ? 'Done' : index + 1;
	});
}

function updateButtonState() {
	prevBtn.disabled = step === 0;
	nextBtn.disabled = step === steps.length - 1;
}

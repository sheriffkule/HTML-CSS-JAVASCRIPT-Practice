const counterDiv = document.querySelector('.counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');
const startCountInput = document.getElementById('startCount');
const maxCountInput = document.getElementById('maxcount');

let counterValue = 0;
let maxValue = null;

document.addEventListener('DOMContentLoaded', () => {
	updateCounterDisplay();
	updateButtonState();
});

incrementBtn.addEventListener('click', () => {
	if (maxValue === null || counterValue < maxValue) {
		counterValue++;

		updateCounterDisplay();
		updateButtonState();
	}
});

decrementBtn.addEventListener('click', () => {
	if (counterValue > 0) {
		counterValue--;

		updateCounterDisplay();
		updateButtonState();
	}
});

resetBtn.addEventListener('click', () => {
	counterValue = 0;
	maxValue = null;
	startCountInput.value = 0;
	maxCountInput.value = 0;

	updateCounterDisplay();
	updateButtonState();
});

startCountInput.addEventListener('change', (e) => {
	const startValue = parseInt(e.target.value) || 0;

	counterValue = startValue;
	if (maxValue !== null) {
		counterValue = Math.min(startValue, maxValue);
	}

	updateCounterDisplay();
	updateButtonState();
});

maxCountInput.addEventListener('change', (e) => {
	maxValue = parseInt(e.target.value) || null;

	updateCounterDisplay();
	updateButtonState();
});

function updateCounterDisplay() {
	counterDiv.textContent = counterValue;
}

function updateButtonState() {
	incrementBtn.disabled >= maxValue !== null && counterValue <= maxValue;
	decrementBtn.disabled = counterValue <= 0;
}

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
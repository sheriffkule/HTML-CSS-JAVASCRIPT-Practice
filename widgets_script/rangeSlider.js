const slider = document.querySelector('.range-slider');
const progress = document.querySelector('.progress');
const minPriceInput = slider.querySelector('.min-price');
const maxPriceInput = slider.querySelector('.max-price');
const minInput = slider.querySelector('.min-input');
const maxInput = slider.querySelector('.max-input');

const updateProgress = () => {
	const minValue = parseInt(minInput.value);
	const maxValue = parseInt(maxInput.value);

	const range = maxInput.max - minInput.min;

	const valueRange = maxValue - minValue;

	const width = (valueRange / range) * 100;

	const minOffset = ((minValue - minInput.min) / range) * 100;

	progress.style.width = width + '%';
	progress.style.left = minOffset + '%';

	minPriceInput.value = minValue;
	maxPriceInput.value = maxValue;
};

const updateRange = (event) => {
	const input = event.target;

	let min = parseInt(minPriceInput.value);
	let max = parseInt(maxPriceInput.value);

	if (input === minPriceInput && min > max) {
		max = min;
		minPriceInput.value = max;
	} else if (input === maxPriceInput && max < min) {
		min = max;
		maxPriceInput.value = min;
	}

	minInput.value = min;
	maxInput.value = max;

	updateProgress();
};

minPriceInput.addEventListener('input', updateRange);
maxPriceInput.addEventListener('input', updateRange);

minInput.addEventListener('input', () => {
	if (parseInt(minInput.value) >= parseInt(maxInput.value)) {
		maxInput.value = minInput.value;
	}
	updateProgress();
});

maxInput.addEventListener('input', () => {
	if (parseInt(maxInput.value) <= parseInt(minInput.value)) {
		minInput.value = maxInput.value;
	}
	updateProgress();
});

let isDragging = false;
let startOffsetX;

progress.addEventListener('mousedown', (e) => {
	e.preventDefault();

	isDragging = true;

	startOffsetX = e.clientX - progress.getBoundingClientRect().left;

	slider.classList.toggle('dragging', isDragging);
});

progress.addEventListener('mousemove', (e) => {
	if (isDragging) {
        const sliderRect = slider.getBoundingClientRect();
        const progressWidth = parseFloat(progress.style.width || 0);

		let newLeft =
			((e.clientX - startOffsetX - sliderRect.left) / sliderRect.width) *
            100;

        newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);
        
        progress.style.left = newLeft + '%';

        const range = maxInput.max - minInput.min;
        const newMin =
            Math.round((newLeft / 100) * range) + parseInt(minInput.min);
        const newMax =  newMin + parseInt(maxInput.value) - parseInt(minInput.value);

        minInput.value = newMin;
        maxInput.value = newMax;

        updateProgress();
	}
	slider.classList.toggle('dragging', isDragging);
});

progress.addEventListener('mouseup', () => {
	if (isDragging) {
		isDragging = false;
	}
	slider.classList.toggle('dragging', isDragging);
});

updateProgress();
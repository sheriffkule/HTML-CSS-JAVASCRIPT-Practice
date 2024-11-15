const priceInputs = document.querySelectorAll('.price-input input');
const rangeInputs = document.querySelectorAll('.range-input input');
const range = document.querySelector('.slider .progress');

let priceGap = 100;

priceInputs.forEach((input) => {
	input.addEventListener('input', (e) => {
		let minPrice = parseInt(priceInputs[0].value);
		let maxPrice = parseInt(priceInputs[1].value);

		if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInputs[1].max) {
			if (e.target.className === 'min-input') {
				rangeInputs[0].value = minPrice;
				range.style.left = (minPrice / rangeInputs[0].max) * 100 + '%';
			} else {
				rangeInputs[0].value = maxPrice;
				range.style.left =
					100 - (maxPrice / rangeInputs[1].max) * 100 + '%';
			}
        }
        
        let currentValue = parseInt(input.value);
        if (currentValue < 0) {
            input.value = Math.max(100, currentValue);
            alert('Price cannot be negative');
        }

        if (currentValue > parseInt(input.max)) {
			input.value = input.max;
		}
	});
});

rangeInputs.forEach((input) => {
	input.addEventListener('input', (e) => {
		let minVal = parseInt(rangeInputs[0].value);
		let maxVal = parseInt(rangeInputs[1].value);

		if (maxVal - minVal < priceGap) {
			if (e.target.className === 'min-range') {
				rangeInputs[0].value = maxVal - priceGap;
			} else {
				rangeInputs[1].value = minVal + priceGap;
			}
		} else {
			priceInputs[0].value = minVal;
			priceInputs[1].value = maxVal;
			range.style.left = (minVal / rangeInputs[0].max) * 100 + '%';
			range.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + '%';
		}
	});
});
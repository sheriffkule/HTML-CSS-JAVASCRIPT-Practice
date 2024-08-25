const filters = {
	blur: {
		text: 'Blur Radius: ',
		min: 0,
		max: 100,
		initValue: 0,
		unit: 'px',
	},
	brightness: {
		text: 'Brightness: ',
		min: 0,
		max: 200,
		initValue: 100,
		unit: '%',
	},
	contrast: {
		text: 'Contrast: ',
		min: 0,
		max: 200,
		initValue: 100,
		unit: '%',
	},
	grayscale: {
		text: 'Grayscale: ',
		min: 0,
		max: 100,
		initValue: 0,
		unit: '%',
	},
	invert: {
		text: 'Invert: ',
		min: 0,
		max: 100,
		initValue: 0,
		unit: '%',
	},
	opacity: {
		text: 'Opacity: ',
		min: 0,
		max: 100,
		initValue: 100,
		unit: '%',
	},
	saturate: {
		text: 'Saturate: ',
		min: 0,
		max: 200,
		initValue: 100,
		unit: '%',
	},
	sepia: {
		text: 'Sepia: ',
		min: 0,
		max: 100,
		initValue: 0,
		unit: '%',
	},
	'hue-rotate': {
		text: 'Hue Rotate: ',
		min: 0,
		max: 360,
		initValue: 0,
		unit: 'deg',
	},
};

const ImageEditor = (function () {
	let filterLIst = {};
    let img = null;
    let selectedFile;
    let originalWidth;
    let originalHeight;

	const imageInput = document.getElementById('image-input');
	const imagePreview = document.querySelector('.image-preview');
	const removeBtn = document.querySelector('.remove-button');
	const settings = document.querySelector('.settings');
	const actions = document.querySelector('.actions');

	function updateFilterDisplay(id, data) {
		settings.querySelector('[data-' + id + ']').textContent = data;
	}

	function updateFilterList(id, data) {
		filterLIst[id] = `${id}(${data})`;
	}

	function updateImagePreview() {
		const image = imagePreview.querySelector('img');
		if (image) {
			image.style.filter = Object.values(filterLIst).join('');
		}
	}

	function onSliderChange(e) {
		const { id, value } = e.target;
		const { unit } = filters[id];
		console.log(id, value);

		updateFilterDisplay(id, value + unit);

		updateFilterList(id, value + unit);

		updateImagePreview();
	}

	async function onImageChange(e) {
		selectedFile = e.target.files[0];

		if (selectedFile) {
			img = new Image();
            img.src = URL.createObjectURL(selectedFile);
            img.addEventListener('load', resetFilters);
            await img.decode();

            originalWidth = img.width;
            originalHeight = img.height;

			renderImagePreview();
		}
	}

	function onRemoveBtnClick() {
		const image = imagePreview.querySelector('img');
		image && image.remove();

		resetImage();

		resetFilters();
	}

	function onActionBtnClick(e) {
		const btn = e.target;
        if (btn.hasAttribute('data-save')) {
            downloadImage();
		} else {
			resetFilters();
			updateImagePreview();
		}
	}

	function resetFilters() {
		filterLIst = {};

		const disabled = img === null;

		const inputs = settings.querySelectorAll('input');
		inputs.forEach((input) => {
			const { id } = input;
			const { initValue, unit } = filters[id];

			input.value = initValue;
			input.disabled = disabled;

			updateFilterDisplay(id, initValue + unit);
		});
	}

	function resetImage() {
		if (img) {
			URL.revokeObjectURL(img);
			img = null;
		}
		imageInput.value = '';
	}

	function renderImagePreview() {
		const image = imagePreview.querySelector('img');
		image && image.remove();
		imagePreview.appendChild(img);
	}

	function renderSettings() {
		for (const id in filters) {
			const { text, min, max, initValue, unit } = filters[id];

			const div = document.createElement('div');

			const label = document.createElement('label');
			label.setAttribute('for', id);
			label.textContent = `${text}`;

			const strong = document.createElement('strong');
			strong.toggleAttribute(`data-${id}`, true);
			strong.textContent = initValue + unit;
			label.appendChild(strong);

			const input = document.createElement('input');
			input.setAttribute('type', 'range');
			input.setAttribute('disabled', true);
			input.setAttribute('id', id);
			input.setAttribute('min', min);
			input.setAttribute('max', max);
			input.setAttribute('value', initValue);

			div.appendChild(label);
			div.appendChild(input);

			settings.appendChild(div);
		}
	}

	function downloadImage() {
		if (img !== null) {
			const name = selectedFile.name.replace(/\.[^/.]+$/, '');
			const quality = 1;
			
			createCanvas().toBlob(
				(blob) => {
					const link = document.createElement('a');
					link.download = `${name}_filtered.jpeg`;
					link.href = URL.createObjectURL(blob);
					link.click();
				},
				'image/jpeg',
				quality
			);
		}
	}

	function createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = originalWidth;
        canvas.height = originalHeight;

		const context = canvas.getContext('2d');
		context.filter = Object.values(filterLIst).join('');
		context.drawImage(img, 0, 0, canvas.width, canvas.height);

		return canvas;
	}

	function setupEventListeners() {
		settings.addEventListener('input', onSliderChange);
		actions.addEventListener('click', onActionBtnClick);
		imageInput.addEventListener('change', onImageChange);
		removeBtn.addEventListener('click', onRemoveBtnClick);
	}

	function initialize() {
		renderSettings();
		setupEventListeners();
	}

	return { initialize };
})();

document.addEventListener('DOMContentLoaded', function () {
	ImageEditor.initialize();
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
const colors = [
	'#FF7F7F',
	'#FFBF7F',
	'#FFDF7F',
	'#FFFF7F',
	'#BFFF7F',
	'#7FFF7F',
	'#7FFFFF',
	'#7FBFFF',
	'#7F7FFF',
	'#FF7FFF',
	'#BF7FBF',
	'#CFCFCF',
];

const settingsModal = document.querySelector('.settings-modal');
const colorsContainer = settingsModal.querySelector('.colors');
const tierContainer = document.querySelector('.tiers');

let activeTier;

const resetTierImages = (tier) => {
	const images = tier.querySelectorAll('.items img');
	images.forEach((img) => {
		document.querySelector('.cards').appendChild(img);
	});
};

const handleDeleteTier = () => {
	if (activeTier) {
		resetTierImages(activeTier);
		activeTier.remove();
		settingsModal.close();
	}
};

const handleClearTier = () => {
	if (activeTier) {
		resetTierImages(activeTier);
		settingsModal.close();
	}
};

const handlePrependTier = () => {
	if (activeTier) {
		tierContainer.insertBefore(createTier(), activeTier);
		settingsModal.close();
	}
};

const handleAppendTier = () => {
	if (activeTier) {
		tierContainer.insertBefore(createTier(), activeTier.nextElementSibling);
		settingsModal.close();
	}
};

const handleSettingsClick = (tier) => {
	activeTier = tier;

	const label = tier.querySelector('.label');
	settingsModal.querySelector('.tier-label').value = label.innerText;

	const color = getComputedStyle(label).getPropertyValue('--color');
	settingsModal.querySelector(`input[value='${color}']`).checked = true;

	settingsModal.showModal();
};

const handleMoveTier = (tier, direction) => {
	const sibling =
		direction === 'up'
			? tier.previousElementSibling
			: tier.nextElementSibling;

	if (sibling) {
		const position = direction === 'up' ? 'beforebegin' : 'afterend';
		sibling.insertAdjacentElement(position, tier);
	}
};

const handleDragover = (event) => {
	event.preventDefault();

	const dragedImage = document.querySelector('.dragging');
	const target = event.target;

	if (target.classList.contains('items')) {
		target.appendChild(dragedImage);
	} else if (target.tagName === 'IMG' && target !== dragedImage) {
		const { left, width } = target.getBoundingClientRect();
		const midPoint = left + width / 2;

		if (event.clientX < midPoint) {
			target.before(dragedImage);
		} else {
			target.after(dragedImage);
		}
	}
};

const handleDrop = (event) => {
	event.preventDefault();
};

const createTier = (label = 'Change me') => {
	const tierColor = colors[tierContainer.children.length % colors.length];
	const tier = document.createElement('div');

	tier.className = 'tier';
	tier.innerHTML = `
      <div class="label" contenteditable="plaintext-only" style="--color: ${tierColor}">
        <span>${label}</span>
      </div>
      <div class="items"></div>

      <div class="controls">
        <button class="settings" title="Settings"><i class="bi bi-gear-fill"></i></button>
        <button class="moveup"><i class="bi bi-chevron-up"></i></button>
        <button class="movedown"><i class="bi bi-chevron-down"></i></button>
    </div>`;

	tier.querySelector('.settings').addEventListener('click', () =>
		handleSettingsClick(tier)
	);
	tier.querySelector('.moveup').addEventListener('click', () =>
		handleMoveTier(tier, 'up')
	);
	tier.querySelector('.movedown').addEventListener('click', () =>
		handleMoveTier(tier, 'down')
	);
	tier.querySelector('.items').addEventListener('dragover', handleDragover);
	tier.querySelector('.items').addEventListener('drop', handleDrop);

	return tier;
};

const initColorOptions = () => {
	colors.forEach((color) => {
		const label = document.createElement('label');
		label.style.setProperty('--color', color);
		label.innerHTML = `<input type="radio" name="color" value="${color}" />`;
		colorsContainer.appendChild(label);
	});
};

const initDefaultTierList = () => {
	['1', '2', '3', '4', '5'].forEach((label) => {
		tierContainer.appendChild(createTier(label));
	});
};

const initDraggables = () => {
	const images = document.querySelectorAll('.cards img');
	images.forEach((img) => {
		img.draggable = true;

		img.addEventListener('dragstart', () => img.classList.add('dragging'));
		img.addEventListener('dragend', () => img.classList.remove('dragging'));
	});
};

initDraggables();
initDefaultTierList();
initColorOptions();

document.querySelector('h1').addEventListener('click', () => {
	tierContainer.appendChild(createTier());
});

settingsModal.addEventListener('click', (event) => {
	if (event.target === settingsModal) {
		settingsModal.close();
	} else {
		const action = event.target.id;
		const actionMap = {
			delete: handleDeleteTier,
			clear: handleClearTier,
			prepend: handlePrependTier,
			append: handleAppendTier,
		};

		if (action && actionMap[action]) {
			actionMap[action]();
		}
	}
});

settingsModal.addEventListener('close', () => (activeTier = null));

settingsModal.querySelector('.tier-label').addEventListener('input', (event) => {
	if (activeTier) {
		activeTier.querySelector('.label span').textContent = event.target.value;
	}
});

colorsContainer.addEventListener('change', (event) => {
	if (activeTier) {
		activeTier
			.querySelector('.label')
			.style.setProperty('--color', event.target.value);
	}
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
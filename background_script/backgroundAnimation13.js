const group = document.querySelector('.group');
for (let i = 1; i < 20; i++) {
	const containerId = `iconContainer${i}`;
	const container = document.createElement('div');
	container.className = 'iconContainer';
	container.id = containerId;
	group.appendChild(container);
	addIcons(containerId);
}

function addIcons(containerId) {
	const iconContainer = document.getElementById(containerId);
	const Unicode = [
		'\uf001',
		'\uf002',
		'\uf003',
		'\uf004',
		'\uf005',
		'\uf006',
		'\uf007',
		'\uf008',
		'\uf009',
		'\uf0010',
		'\uf0011',
		'\uf0012',
		'\uf0013',
		'\uf0014',
		'\uf0015',
		'\uf0016',
		'\uf0017',
		'\uf0018',
		'\uf0019',
		'\uf0020',
	];

	for (let i = 0; i < 50; i++) {
		const icon = document.createElement('i');
		icon.className = 'icon fas';
		icon.innerHTML = randomIcon(Unicode);
		iconContainer.appendChild(icon);
	}
}

function randomIcon(values) {
	const randomIndex = Math.floor(Math.random() * values.length);
	return values[randomIndex];
}
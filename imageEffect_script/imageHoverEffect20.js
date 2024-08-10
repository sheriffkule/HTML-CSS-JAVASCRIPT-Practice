let options = {
	threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

let callback = (entries, observer) => {
	entries.forEach((entry) => {
		entry.target.style.scale = entry.intersectionRatio;
	});
};

let observer = new IntersectionObserver(callback, options);

for (const target of document.querySelectorAll('.item')) {
	observer.observe(target);
}

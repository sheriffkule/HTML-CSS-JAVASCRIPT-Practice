document.addEventListener('mousemove', parallax);

function parallax(e) {
    this.querySelectorAll('.layer').forEach(layer => {
		let x = (window.innerWidth = e.pageX - 650) * 1.5;
		layer.style.transform = `translateX(${-x}px)`;
	})
}
document.addEventListener('mousemove', parallax)

function parallax(event) {
    this.querySelectorAll('.object').forEach(layer => {
        const speed = layer.getAttribute('data-value');
        const x = (event.clientX * speed) / 100;
        const y = (event.clientY * speed) / 100;
    
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
    }
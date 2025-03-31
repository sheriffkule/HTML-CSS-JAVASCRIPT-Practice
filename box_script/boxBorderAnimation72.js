let cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let rect = card.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        let Ripple = document.createElement('div');
        Ripple.classList.add('ripple');
        Ripple.style.top = `${mouseY}px`;
        Ripple.style.left = `${mouseX}px`;
        card.appendChild(Ripple);

        Ripple.addEventListener('animationend', () => {
            Ripple.remove();
        })

    })
})
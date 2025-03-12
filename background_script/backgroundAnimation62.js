document.addEventListener('DOMContentLoaded', () => {
    let cursor = document.querySelector('.cursor');

    for (let i = 0; i < 36; i++) {
        let span = document.createElement('span');
        span.classList.add('box');
        span.style.setProperty('--i', i + 1);
        span.style.filter = `hue-rotate(${i * 10}deg)`;
        cursor.appendChild(span);
    }
})

document.addEventListener('mousemove', e => {
    gsap.to('.box', {
        x: e.clientX,
        y: e.clientY,
        rotate: (index) => index * 10,
        stagger: 0.05,
    })
})
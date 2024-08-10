document.addEventListener('scroll', () => {
    let section = document.querySelectorAll('section');
    let scrollPosition = window.scrollY;
    section.forEach(section => {
        let start = parseInt(section.getAttribute('data-start'));
        let end = parseInt(section.getAttribute('data-end'));

        if (scrollPosition >= start && scrollPosition <= end) {
            let progress = (scrollPosition - start) / (end - start);
            let clipPathSize = Math.max(0, 1000 * progress);
            section.style.clipPath = `circle(${clipPathSize}px at center)`;
        } else if (scrollPosition < start) {
            section.style.clipPath = 'circle(0px at center)';
        } else if (scrollPosition > end) {
            section.style.clipPath = 'circle(1000px at center)';
        }
    })
})
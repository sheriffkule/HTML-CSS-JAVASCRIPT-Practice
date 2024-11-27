let move = document.documentElement;

move.addEventListener('mousemove', (e) => {
    move.style.setProperty('--x', e.clientX + 'px')
    move.style.setProperty('--y', e.clientY + 'px')
})
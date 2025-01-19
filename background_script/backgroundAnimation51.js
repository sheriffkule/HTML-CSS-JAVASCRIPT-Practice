let smoke = document.getElementById('smoke');

function createSmoke (e) {
    let elem = document.createElement('div');

    elem.classList.add('elem');

    elem.style.left = `${e.clientX}px`;
    elem.style.top = `${e.clientY}px`;
    smoke.appendChild(elem);

    elem.addEventListener('animationend', () => {
        elem.remove()
    })
}

document.addEventListener('mousemove', createSmoke);
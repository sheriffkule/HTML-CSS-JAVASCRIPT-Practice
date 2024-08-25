const loaders = document.querySelectorAll('.loader');

loaders.forEach(loader => {
    for (let i = 0; i < 20; i++) {
        const div = document.createElement('div');
        div.style.setProperty('--i', i);
        div.classList.add('dot');
        loader.appendChild(div);
    }
});
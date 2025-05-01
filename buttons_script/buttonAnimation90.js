let buttons = document.querySelectorAll('.pixel-btn');

buttons.forEach(button => {
    let pixelContainer = button.querySelector('.pixel-container');
    let pixelSize = 10;
    let btnWidth = button.offsetWidth;
    let btnHeight = button.offsetHeight;
    let cols = Math.floor(btnWidth / pixelSize);
    let rows = Math.floor(btnHeight / pixelSize);

    for(let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.left = `${col * pixelSize}px`;
            pixel.style.top = `${row * pixelSize}px`;
            let delay = Math.random() * 1;
            pixel.style.transitionDelay = `${delay}s`;
            pixelContainer.appendChild(pixel)
        }
    }
})
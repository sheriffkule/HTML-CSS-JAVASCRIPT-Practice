let slider = document.querySelector('input');
let dragLine = document.querySelector('.drag-line');
let img = document.querySelector('.img-two')

slider.addEventListener('input', () => {
    let sliderValue = slider.value;
    dragLine.style.left = sliderValue + '%'
    img.style.width = sliderValue + '%'
})
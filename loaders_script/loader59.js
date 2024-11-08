const container = document.querySelector('.container')
const num = 36;

for (let i = 1; i < num; i++) {
    const shape = document.createElement('i');
    shape.classList.add('shape');
    container.appendChild(shape);
}
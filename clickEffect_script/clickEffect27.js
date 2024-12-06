const $percent = document.querySelector('.percent');
const $circle = document.querySelector('.circle');
const button = document.querySelector('button');



let load = 0;

function update() {
    load += load < 100;

    $percent.innerHTML = load + '%';
    $circle.style.background = `conic-gradient(from 0deg at 50% 50%, #6f7bf7 0%, #9bf8f4 ${load}%, #101012 ${load}%)`;
}

button.addEventListener('click', () => {
    update();
    load = 0;
    $percent.innerHTML = load + '%';
    $circle.style.background = `conic-gradient(from 0deg at 50% 50, 
    #6f7bf7 0%, #9bf8f4 0%,
    #101012 100%)`;

    setInterval(update, 100);
});
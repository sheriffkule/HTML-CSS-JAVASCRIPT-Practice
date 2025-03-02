let circleIndicator = document.getElementById('circleIndicator');
let circle = circleIndicator.querySelector('circle');
let textElement = document.getElementById('scrollPercentText');

let radius = parseFloat(circle.getAttribute('r'));
let circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;

function setProgress(percent) {
    let offset = circumference * (1 - percent / 100);
    circle.style.strokeDashoffset = offset;
    textElement.textContent = `${Math.round(percent)}%`;
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    setProgress(scrollPercent);
})

window.addEventListener('mousemove', (e) => {
    circleIndicator.style.left = e.clientX + 'px';
    circleIndicator.style.top = e.clientY + 'px';
});

setProgress(0);
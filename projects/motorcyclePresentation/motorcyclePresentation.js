const dayNight = document.querySelector('.dayNight');
const body = document.querySelector('body')

dayNight.onclick = function () {
    dayNight.classList.toggle('active');
    body.classList.toggle('light');
}

const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation')

toggle.onclick = function () {
    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

const slides = document.querySelectorAll('.slides');
const dots = document.querySelectorAll('.dot');

function setActive(i) {
    for (slide of slides)
        slide.classList.remove('active');
	    slides[i].classList.add('active');

    for (dot of dots)
        dot.classList.remove('active');
	    dots[i].classList.add('active');
}

for (let j = 0; j < dots.length; j++) {
    dots[j].addEventListener('click', function () {
        setActive(j);
    })
}
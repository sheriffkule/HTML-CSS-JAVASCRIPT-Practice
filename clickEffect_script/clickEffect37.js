const btn = document.querySelector('.inner');
const btnBase = document.querySelector('.base');
const body = document.querySelector('body');

btn.addEventListener('click', function(){
    btn.classList.toggle('turn-on');
    btn.classList.toggle('inner-on');
    body.classList.toggle('on');
    btnBase.classList.toggle('inner-on')
})
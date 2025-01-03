let h2 = document.querySelector('h2');
let container = document.querySelector('.container');

h2.onclick = function(){
    container.classList.toggle('newYear');
    this.classList.toggle('active');
}
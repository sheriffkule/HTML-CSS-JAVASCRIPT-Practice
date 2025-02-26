const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', function(){
    const sidebar = document.querySelector('.navigation');
    sidebar.classList.toggle('active');
})
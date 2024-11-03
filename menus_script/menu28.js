document.querySelectorAll('ul li').forEach(function (listItem) {
    listItem.addEventListener('mouseenter', function () {
        let relClass = this.getAttribute('rel');
        let picture = document.getElementById('picture');
        picture.className = '';
        picture.classList.add(relClass);
        this.classList.add('active');
        this.parentElement.querySelectorAll('li').forEach(function (sibling) {
            if (sibling !== listItem) {
                sibling.classList.remove('active');
            }
        })
    })
})
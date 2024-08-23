const navExpand = document.getElementById('nav-expand');
const navExpandList = document.getElementById('nav-expand-list');
const navExpandIcon = document.getElementById('nav-expand-icon')

navExpand.addEventListener('click', () => {
  navExpandList.classList.toggle('show-list');

    navExpandIcon.classList.toggle('rotate-icon');
});
//close on empty if anything else is clicked
document.addEventListener('click', (e) => {
	if (
		!navExpand.contains(e.target) &&
		!e.target.classList.contains('show-list')
	) {
		navExpandList.classList.remove('show-list');
	}
});
//*scroll section active link*
const section = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    section.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollDown >= sectionTop && scrollDown < sectionTop + sectionHeight) {
            document.querySelector('.nav-list a[href*="#' + sectionId + '"]').classList.add('active-link');
        } else {
            document.querySelector('.nav-list a[href*="#' + sectionId + '"]').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);
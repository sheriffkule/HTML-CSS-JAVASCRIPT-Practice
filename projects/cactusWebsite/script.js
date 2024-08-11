const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

const navLink = document.querySelectorAll(".nav-link");

const navAction = () => {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", navAction));

const blurHeader = () => {
    const header = document.getElementById("header");
    this.scrollY >= 50
		? header.classList.add('blur-header')
		: header.classList.remove('blur-header');
}

window.addEventListener("scroll", blurHeader);

const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");
    if (this.scrollY >= 500) {
        scrollUp.classList.add("show-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
    }
}

window.addEventListener("scroll", scrollUp);
    
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (scrollDown >= sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
	origin: 'top',
	distance: '80px',
	duration: 2500,
	delay: 300,
});

sr.reveal('.home-img, .new-data, .care-img, .contact-content, .footer');
sr.reveal('.home-title, .care-list, .contact-img',  { duration: 600 });
sr.reveal('.new-card', { delay: 500, interval: 100 });
sr.reveal('.shop-card', {interval: 100 });

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
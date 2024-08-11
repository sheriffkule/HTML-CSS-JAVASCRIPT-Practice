window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    let scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const animation = ScrollReveal({
    distance: '150px',
    duration: 2200,
    reset: true,
    easing: 'ease-in-out',
    scale: 1,
    viewFactor: 0.2,
    mobile: true,
    viewOffset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
});

animation.reveal('.side1', { delay: 500, origin: 'top' });
animation.reveal('.side2', { delay: 600, origin: 'bottom' });
animation.reveal('.about-img', { delay: 500, origin: 'top' });
animation.reveal('.about-text', { delay: 600, origin: 'bottom' });
animation.reveal('.section-header', { delay: 500, origin: 'top' });
animation.reveal('.services-content', { delay: 700, origin: 'bottom' });
animation.reveal('.section-header', {delay: 500, origin: 'top'});
animation.reveal('.contact-content', { delay: 700, origin: 'bottom' });
animation.reveal('footer', { delay: 500, origin: 'left' });

    VanillaTilt.init(document.querySelectorAll('.single-service'), {
		max: 16,
		speed: 400,
		glare: true,
		'max-glare': 0.5,
		scale: 1.1,
		perspective: 1000,
    });
    
    const year = document.getElementById('year');
	const thisYear = new Date().getFullYear();

	year.setAttribute('datetime', thisYear);
	year.textContent = thisYear;
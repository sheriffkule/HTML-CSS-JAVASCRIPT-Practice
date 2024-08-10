var swiper = new Swiper('.swiper', {
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 200,
		modifier: 4,
		slideShadows: true,
	},
	grabCursor: true,
	centeredSlides: true,
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	keyboard: {
		enabled: true,
	},
	mousewheel: {
		thresholDelta: 70,
	},
	breakpoints: {
		560: {
			slidesPerView: 2.5,
		},
		768: {
			slidesPerView: 3,
		},
		1024: {
			slidesPerView: 3,
		},
	},
});

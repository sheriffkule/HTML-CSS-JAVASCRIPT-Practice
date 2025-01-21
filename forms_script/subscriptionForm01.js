gsap.from('.hero-image-wrapper, .content-wrapper, .front-img', 2, {
    delay: 1,
    clipPath: 'inset(0 100% 0 0)',
    ease: 'power4.inOut',
    stagger: {
        amount: 0.5,
    },
});

gsap.from('img', 3, {
    delay: 1.5,
    scale: 2,
    ease: 'power4.inOut',
    stagger: {
        amount: 0.25,
    },
});

gsap.from('header h1, header h2', {
    duration: 1,
    delay: 3,
    y: 100,
    opacity: 0,
    stagger: 0.2,
});

gsap.to('header h1, header h2', 1, {
    delay: 3,
    top: 0,
    y: 0,
    opacity: 1,
    ease: 'power4.inOut',
})
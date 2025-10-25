const circle = document.querySelector('.circle')
const images = gsap.utils.toArray('.shadow')

const tl = gsap.timeline({paused: true, ease: 'back.out(1.7)'})

images.forEach((span, i) => {
    let top = 120;
    let left = 30;

    tl.to(span, {
        top: `-${top -i * 10}px`,
        left: `${left + i}%`,
        color: '#00d2ff',
    }, '-=0.45')
});

circle.addEventListener('mouseenter', () => {
    tl.reverse()
})

circle.addEventListener('mouseout', () => {
    tl.play()
})

let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: '.container',
        pin: true,
        start: 'top top',
        end: 'bottom top',
        scrub: 3,
        ease: 'expoScale(0.5, 7, none)',
    }
})

images.forEach((span, i) => {
    tl2.fromTo(span, {y: 0}, {y: -900}, '-=0.45')
})
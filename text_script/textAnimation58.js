let text = document.querySelector('h1');
let char = document.querySelectorAll('span');
let replaceChar = text.querySelectorAll('span:not([data-char="."])');

let t1 = gsap.timeline();

t1.set(char, {yPercent: -150});

t1.set(text, {autoAlpha: 1});

t1.to(char, {
    duration: 4,
    yPercent: 0,
    stagger: 0.1,
    ease: 'elastic.out(1, 0.5)',
}).to(replaceChar, {
    duration: 2,
    yPercent: 150,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    ease: 'elastic.out(1 0.5)',
})
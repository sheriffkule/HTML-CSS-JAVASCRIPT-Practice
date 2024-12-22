const hero = {
  section: document.querySelector('.section'),
  background: document.querySelector('.section_bg'),
  cards: document.querySelectorAll('.section_bg_card'),
};

const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

const clipPath = {
  top: 20,
  right: isMobile ? 20 : 35,
  bottom: 20,
  left: isMobile ? 20 : 35,
};

const moveCard = (event) => {
  const x = event.touches ? event.touches[0].clientX : event.clientX;
  const y = event.touches ? event.touches[0].clientY : event.clientY;

  const strength = 10;

  let xPos = (x / window.innerWidth - 0.5) * 2;
  let yPos = (y / window.innerHeight - 0.5) * 2;

  gsap.to(hero.cards[1], {
    duration: 1,
    rotationY: xPos * strength,
    rotationX: yPos * strength,
    clipPath: `inset(
        ${clipPath.top + yPos * strength}%
        ${clipPath.right - xPos * strength}%
        ${clipPath.bottom - yPos * strength}%
        ${clipPath.left + xPos * strength}% round 10px)`,
  });
};

const animateCard = () => {
    gsap.to(hero.cards[1], {
        duration: 1.2,
        rotationY: 0,
        rotationX: 0,
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'expo.inOut',
    })
};

hero.section.addEventListener('mousemove', (event) => moveCard(event));
hero.section.addEventListener('touchmove', (event) => moveCard(event));
hero.cards[1].addEventListener('click', animateCard);

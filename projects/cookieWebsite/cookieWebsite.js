// Show & close menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* Show menu */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/* Close menu */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// Remove mobile menu
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

// Change header styles
const scrollHeader = () => {
  const header = document.getElementById('header');
  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

// Show scrollup
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

// Scroll sections active link
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (!link) return;
    if (scrollY < sectionTop) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
};
window.addEventListener('scroll', scrollActive);

// Home & featured animation
const homeImage = document.querySelector('.home__image');
const homeBag = document.querySelector('.home__bag');
const homeCookies = document.querySelectorAll('.home__cookie');
const featuredImgs = document.querySelectorAll('.featured__img');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (homeImage && !reduceMotion) {
  const { Engine, Runner, Bodies, Body, Composite, Events } = Matter;

  /* Physics world inside the bag (calculated on a 280px wide bag) */
  const bagWidth = 280,
    cookieRadius = 36,
    wallLeft = 29,
    wallRight = 251,
    bagFloor = 405,
    bagCeiling = -30;

  const engine = Engine.create(),
    runner = Runner.create();

  engine.gravity.y = 1.2;

  // Invisible walls of the bag (tall walls so the cookies always fall back inside)
  Composite.add(engine.world, [
    Bodies.rectangle(wallLeft - 50, bagFloor - 1000, 100, 2200, { isStatic: true }),
    Bodies.rectangle(wallRight + 50, bagFloor - 1000, 100, 2200, { isStatic: true }),
    Bodies.rectangle(bagWidth / 2, bagFloor + 50, 400, 100, { isStatic: true, label: 'floor' }),
  ]);

  // Each cookie is a circle inside the physics world
  const cookies = [...homeCookies].map((cookie) => ({
    cookie,
    body: Bodies.circle(bagWidth / 2, -100, cookieRadius, {
      label: 'cookie',
      restitution: 0.5,
      friction: 0.05,
      frictionAir: 0.015,
    }),
    inBag: false,
    flying: false,
    from: { x: bagWidth / 2, y: -100 },
    angle: 0,
  }));

  const getScale = () => homeBag.offsetWidth / bagWidth;

  // Moves a cookie image to a point (x, y) inside .home__image
  const placeCookie = (cookie, x, y, angle, size = 1) => {
    const moveX = x - (cookie.offsetLeft + cookie.offsetWidth / 2),
      moveY = y - (cookie.offsetTop + cookie.offsetHeight / 2);

    cookie.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${angle}rad) scale(${size})`;
  };

  // Puts a cookie inside the bag (the physics control it)
  const addCookie = (item, x, y) => {
    if (item.inBag) return;

    Body.setPosition(item.body, { x, y });
    Body.setVelocity(item.body, { x: 0, y: 0 });
    Body.setAngularVelocity(item.body, 0);
    Composite.add(engine.world, item.body);
    item.inBag = true;
  };

  // Draws the cookies in the position calculated by the physics
  Events.on(engine, 'afterUpdate', () => {
    const scale = getScale();

    cookies.forEach(({ cookie, body, inBag }) => {
      if (!inBag) return;

      // Maximum spin speed, so the cookies turn slowly
      Body.setAngularVelocity(body, gsap.utils.clamp(-0.2, 0.2, body.angularVelocity));
      placeCookie(cookie, body.position.x * scale, body.position.y * scale, body.angle);
    });
  });

  // Small bounce of the bag when a cookie hits the bottom
  Events.on(engine, 'collisionStart', ({ pairs }) => {
    pairs.forEach(({ bodyA, bodyB }) => {
      const cookie = bodyA.label === 'cookie' ? bodyA : bodyB,
        floor = bodyA.label === 'floor' || bodyB.label === 'floor';

      if (floor && cookie.label === 'cookie' && cookie.speed > 4) {
        gsap.fromTo(
          homeBag,
          { scaleY: 0.97 },
          { scaleY: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)', transformOrigin: 'bottom' },
        );
      }
    });
  });

  /* 1. Intro: the bag comes up and the cookies fall inside */
  const dropCookies = () => {
    cookies.forEach((item, index) => {
      gsap.delayedCall(index * 0.25, () => {
        if (item.flying) return;

        addCookie(item, gsap.utils.random(70, 210), -60);
        Body.setAngle(item.body, gsap.utils.random(0, Math.PI));
        gsap.to(item.cookie, { opacity: 1, duration: 0.3 });
      });
    });
  };

  // Invisible lid: the cookies can peek out of the bag, but they don't fly away
  const addLid = () => {
    Composite.add(
      engine.world,
      Bodies.rectangle(bagWidth / 2, bagCeiling - 50, 400, 100, { isStatic: true }),
    );
  };

  gsap.set(homeCookies, { opacity: 0 });

  gsap
    .timeline()
    .from('.home__data > *', { y: -100, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
    .from(homeBag, { yPercent: 120, opacity: 0, duration: 1.2, ease: 'back.out(1.4)' }, 0.3)
    .add(dropCookies, '-=0.2')
    .add(addLid, '+=2.5');

  Runner.run(runner, engine);

  /* 2. Mouse over the bag: the cookies move away and get mixed */
  homeImage.addEventListener('mousemove', (e) => {
    const rect = homeImage.getBoundingClientRect(),
      scale = getScale(),
      mouseX = (e.clientX - rect.left) / scale,
      mouseY = (e.clientY - rect.top) / scale;

    cookies.forEach(({ body, inBag }) => {
      if (!inBag) return;

      const distanceX = body.position.x - mouseX,
        distanceY = body.position.y - mouseY,
        distance = Math.hypot(distanceX, distanceY) || 1;

      if (distance > 140) return;

      // The closer the mouse, the stronger the push
      const push = ((140 - distance) / 140) * 2.5;

      Body.setVelocity(body, {
        x: gsap.utils.clamp(-9, 9, body.velocity.x + (distanceX / distance) * push + e.movementX * 0.08),
        y: gsap.utils.clamp(
          -9,
          9,
          body.velocity.y + (distanceY / distance) * push + e.movementY * 0.08 - 0.5,
        ),
      });
      Body.setAngularVelocity(body, body.angularVelocity + e.movementX * 0.002);
    });
  });

  // On touch screens, touching the bag makes the cookies jump
  homeImage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;

    cookies.forEach(({ body, inBag }) => {
      if (!inBag) return;

      Body.setVelocity(body, { x: gsap.utils.random(-6, 6), y: gsap.utils.random(-14, -8) });
      Body.setAngularVelocity(body, gsap.utils.random(-0.2, 0.2));
    });
  });

  /* 3. Scroll: three cookies leave the bag and travel to their featured card */
  const mix = (start, end, progress) => start + (end - start) * progress,
    easeInOut = (progress) => (progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2);

  // Back in the bag: the physics take control again
  const backToBag = (item, target) => {
    item.flying = false;
    item.cookie.style.zIndex = '';
    addCookie(item, item.from.x, Math.max(item.from.y, bagCeiling + cookieRadius + 10));
    Body.setAngle(item.body, item.angle);
    gsap.set(item.cookie, { opacity: 1 });
    gsap.set(target, { opacity: 0 });
  };

  const moveCookie = (item, target, progress) => {
    const { cookie, body } = item,
      goingBack = progress < item.progress;

    item.progress = progress;

    // It is falling into the bag: the scroll doesn't move it
    if (item.falling) return;

    if (progress <= 0) {
      item.waiting = false;
      if (item.flying) backToBag(item, target);
      return;
    }

    // It already fell into the bag: it stays there until the scroll goes down again
    if (item.waiting && goingBack) return;

    // Leaves the bag: this cookie stops using the physics
    if (!item.flying) {
      item.flying = true;
      item.waiting = false;
      item.from = { x: body.position.x, y: body.position.y };
      item.outX = body.position.x; // Where it comes out of the bag
      item.angle = body.angle % (Math.PI * 2);

      if (item.inBag) {
        Composite.remove(engine.world, body);
        item.inBag = false;
      }
    }

    const scale = getScale(),
      homeRect = homeImage.getBoundingClientRect(),
      targetRect = target.getBoundingClientRect(),
      size = cookie.offsetWidth,
      startX = item.from.x * scale,
      startY = item.from.y * scale,
      outX = item.outX * scale,
      outY = -size * 0.6, // Above the mouth of the bag
      endX = targetRect.left + targetRect.width / 2 - homeRect.left,
      endY = targetRect.top + targetRect.height / 2 - homeRect.top;

    // Coming back: as soon as it reaches the bag, it falls inside without stopping
    if (progress < 0.15 && item.out) {
      const fall = { step: 0 };

      item.out = false;
      item.falling = true;
      cookie.style.zIndex = '';

      gsap.to(fall, {
        step: 1,
        duration: 0.25,
        ease: 'power2.in',
        onUpdate: () =>
          placeCookie(cookie, mix(outX, startX, fall.step), mix(outY, startY, fall.step), item.angle),
        onComplete: () => {
          item.falling = false;
          item.waiting = true;
          backToBag(item, target);
          Body.setVelocity(body, { x: 0, y: 5 });
        },
      });
      return;
    }

    if (progress < 0.15) {
      // The cookie goes up and comes out of the bag (behind the bag)
      const step = easeInOut(progress / 0.15);

      cookie.style.zIndex = '';
      placeCookie(cookie, mix(startX, outX, step), mix(startY, outY, step), item.angle);
    } else {
      // When it comes back, it enters through the mouth of the bag in its lane and falls
      item.out = true;
      item.from = { x: item.lane, y: bagCeiling + cookieRadius + 10 };

      // The cookie travels to its card (in front of everything)
      // It goes down at the same speed as the scroll, so it is always visible
      const step = (progress - 0.15) / 0.85,
        smooth = easeInOut(step),
        jump = Math.sin(Math.PI * step) * 40, // Small jump when it comes out
        x = mix(outX, endX, smooth),
        y = mix(outY, endY, step) - jump;

      cookie.style.zIndex = 5;
      placeCookie(
        cookie,
        x,
        y,
        mix(item.angle, Math.PI * 2, smooth),
        mix(1, targetRect.width / size, smooth),
      );
    }

    // The cookie arrives: the image of the card takes its place
    const arrived = progress >= 1;

    gsap.set(target, { opacity: arrived ? 1 : 0 });
    gsap.set(cookie, { opacity: arrived ? 0 : 1 });

    // From the card, it comes back straight to its lane, so the cookies don't cross above the bag
    if (arrived) item.outX = item.lane;
  };

  gsap.registerPlugin(ScrollTrigger);

  featuredImgs.forEach((featuredImg, index) => {
    const item = cookies[index], // cookie-1, cookie-2 and cookie-3 are the featured cookies
      travel = { progress: 0 };

    // Left, center and right lanes, so the three cookies don't fall on top of each other
    item.lane = wallLeft + cookieRadius + (index * (wallRight - wallLeft - cookieRadius * 2)) / 2;

    gsap.set(featuredImg, { opacity: 0 });

    gsap.to(travel, {
      progress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: homeImage, // Starts while the bag is still visible
        start: 'top 15%',
        endTrigger: '.featured', // The three cookies arrive at the same time
        end: 'top 20%',
        scrub: 0.6,
      },
      onUpdate: () => moveCookie(item, featuredImg, travel.progress),
    });
  });
}

if(!reduceMotion){
   gsap.registerPlugin(ScrollTrigger)

   // The elements fall from the top when they enter the screen
   const reveal = (elements, vars = {}, trigger = elements) =>{
      gsap.from(elements, {
         y: -100,
         opacity: 0,
         duration: 1.5,
         ease: 'power3.out',
         ...vars,
         scrollTrigger: {trigger, start: 'top 85%'},
      })
   }

   // Cards that fall one by one, each one with its image (with a small turn)
   const revealCards = (cards, image) =>{
      gsap.set(cards, {y: -100, opacity: 0})
      if(image) gsap.set(image, {y: -60, rotation: -30, opacity: 0})

      ScrollTrigger.batch(cards, {
         start: 'top 85%',
         once: true,
         onEnter: (batch) =>{
            const timeline = gsap.timeline()

            batch.forEach((card, index) =>{
               timeline.to(card, {y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'all'}, index * 0.15) // Clears GSAP styles so the hover works

               if(image){
                  timeline.to(card.querySelector(image), {y: 0, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', clearProps: 'all'}, index * 0.15 + 0.5)
               }
            })
         },
      })
   }

   /* Section titles */
   reveal('.featured :is(.section__subtitle, .section__title)', {stagger: 0.2})
   reveal('.products :is(.section__subtitle, .section__title)', {stagger: 0.2})
   reveal('.contact :is(.section__subtitle, .section__title)', {stagger: 0.2})

   /* Featured: the card comes up, its content appears and the cookie lands later */
   gsap.utils.toArray('.featured__card').forEach(card =>{
      gsap.timeline({scrollTrigger: {trigger: card, start: 'top 85%'}})
         .from(card, {y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all'}) // Clears GSAP styles so the hover works
         .from(card.querySelectorAll(':scope > :not(.featured__img)'), {y: 20, opacity: 0, duration: 0.5, stagger: 0.1}, '-=0.4')
   })

   /* About */
   reveal('.about__img')
   reveal('.about__data > *', {stagger: 0.15, delay: 0.3}, '.about__data')

   /* Products */
   revealCards('.products__card', '.products__img')
   reveal('.products__more')

   /* Contact */
   revealCards('.contact__card')
   reveal('.contact__button')
   reveal('.contact__map', {delay: 0.3})

   /* Footer */
   reveal('.footer__group > *', {stagger: 0.2}, '.footer')
   reveal('.footer__data', {stagger: 0.2}, '.footer__content')
}
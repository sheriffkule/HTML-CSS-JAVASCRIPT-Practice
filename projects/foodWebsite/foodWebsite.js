$(document).ready(function ($) {
  'use strict';

  let book_table = new Swiper('.book-table-img-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 3,
      stretch: 2,
      depth: 100,
      modifier: 5,
      slideShadows: false,
    },
    loopAdditionSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  let team_slider = new Swiper('.team-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  jQuery('.filters').on('click', function () {
    jQuery('#menu-dish').removeClass('byDefault_show');
  });

  $(function () {
    let filterList = {
      init: function () {
        $('#menu-dish').mixItUp({
          selectors: {
            target: '.dish-box-wp',
            filter: '.filter',
          },
          animation: {
            effects: 'fade',
            easing: 'ease-in-out',
          },
          load: {
            filter: '.all, .breakfast, .lunch, .dinner',
          },
        });
      },
    };
    filterList.init();
  });

  jQuery('.menu-toggle').click(function () {
    jQuery('.main-navigation').toggleClass('toggled');
  });

  jQuery('.header-menu ul li a').click(function () {
    jQuery('.main-navigation').removeClass('toggled');
  });

  gsap.registerPlugin(ScrollTrigger);

  let elementFirst = document.querySelector('.site-header');
  ScrollTrigger.create({
    trigger: 'body',
    start: '30px top',
    end: 'bottom bottom',
    onEnter: () => myFunction(),
    onLeaveBack: () => myFunction(),
  });

  function myFunction() {
    elementFirst.classList.toggle('sticky_head');
  }

  let scene = $('.js-parallax-scene').get(0);
  let parallaxInstance = new Parallax(scene);
});

jQuery(window).on('load', function () {
  $('body').removeClass('body-fixed');

  let targets = document.querySelectorAll('.filter');
  let activeTab = 0;
  let old = 0;
  let dur = 0.4;
  let animation;

  for (let i = 0; i < targets.length; i++) {
    targets[i].index = i;
    targets[i].addEventListener('click', moveBar);
  }

  gsap.set('.filter-active', {
    x: targets[0].offsetLeft,
    width: targets[0].offsetWidth,
  });

  function moveBar(e) {
    if (this.index != activeTab) {
      if (animation && animation.isActive()) {
        animation.progress(1);
      }
      animation = gsap.timeline({
        defaults: {
          duration: 0.4,
        },
      });
      old = activeTab;
      activeTab = this.index;
      animation.to('.filter-active', {
        x: targets[activeTab].offsetLeft,
        width: targets[activeTab].offsetWidth,
      });

      animation.to(
        targets[old],
        {
          color: '#0d0d25',
          ease: 'none',
        },
        0
      );
      animation.to(
        targets[activeTab],
        {
          color: '#ffffff',
          ease: 'none',
        },
        0
      );
    }
  }
});

const scrollUp = () => {
  const scrollUp = document.getElementById('scrollTop');

  this.scrollY >= 350
    ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);


const scrollActive = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute('id');
    const sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
$(document).ready(function ($) {
  'use strict';

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

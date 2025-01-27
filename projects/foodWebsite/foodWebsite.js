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

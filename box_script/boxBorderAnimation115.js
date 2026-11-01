const formatNumber = (number) => {
  return String(number).padStart(2, '0');
};

const swiperCards = new Swiper('.card__swiper', {
  direction: 'vertical',
  loop: true,
  loopAdditionalSlides: 1,
  slidersPerView: 1,
  grabCursor: true,
  speed: 800,

  effect: 'creative',
  creativeEffect: {
    limitProgress: 2,
    prev: {
      translate: [0, '-107%', 0],
      rotate: [0, 0, -30],
      opacity: 0.5,
    },
    next: {
      translate: [0, '107%', 0],
      rotate: [0, 0, -30],
      opacity: 0.5,
    },
  },

  pagination: {
    el: '.card__pagination',
    type: 'fraction',
    formatFractionCurrent: formatNumber,
    formatFractionTotal: formatNumber,
  },

  navigation: {
    nextEl: '.card__button-next',
    prevEl: '.card__button-prev',
  },

  on: {
    init: (swiper) => {
      swiper.loopFix({ direction: 'prev' });
    },
  },
});

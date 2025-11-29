let swiper = new Swiper('.brands_Swiper', {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  autoplay: true,
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    900: {
      slidesPerView: 3,
    },
    500: {
      slidesPerView: 2,
    },
  },
});

let swiperTest = new Swiper('.testimonialSwiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: true,
  breakpoints: {
    1201: {
        slidesPerView: 3,
    },
    1200: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 1,
    },
  },
});

let bar = document.querySelector('.bars')
let menu = document.querySelector('.menu')

bar.addEventListener('click', () => {
    menu.classList.toggle('show_menu')
})

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();

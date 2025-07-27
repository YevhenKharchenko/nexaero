import Swiper from 'swiper';
import 'swiper/css/bundle';

const faqLeftArrow = document.getElementById('faqLeftArrow');
const faqRightArrow = document.getElementById('faqRightArrow');

let faqSwiper;

faqSwiper = new Swiper('.faq-swiper-container', {
  direction: 'horizontal',
  loop: false,
  grabCursor: true,
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 20,
  grabCursor: true,
  allowTouchMove: true,
  speed: 500,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1440: {
      spaceBetween: 0,
      slidesPerView: 9,
      grabCursor: false,
      allowTouchMove: false,
    },
  },
  on: {
    init: () => {
      document.querySelector('.faq-swiper-container').classList.add('show');
    },
    slideChange: function () {
      updateFaqArrows(this);
    },
  },
});

updateFaqArrows(faqSwiper);

function updateFaqArrows(swiper) {
  faqLeftArrow.disabled = swiper.isBeginning;
  faqRightArrow.disabled = swiper.isEnd;
}

faqLeftArrow.addEventListener('click', () => {
  faqSwiper.slidePrev();
});

faqRightArrow.addEventListener('click', () => {
  faqSwiper.slideNext();
});

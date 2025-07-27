import Swiper from 'swiper';
import 'swiper/css/bundle';

const dispatchesLeftArrow = document.getElementById('dispatchesLeftArrow');
const dispatchesRightArrow = document.getElementById('dispatchesRightArrow');

let dispatchesSwiper;

dispatchesSwiper = new Swiper('.dispatches-swiper-container', {
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
      slidesPerView: 4,
      grabCursor: false,
      allowTouchMove: false,
    },
  },
  on: {
    init: () => {
      document
        .querySelector('.dispatches-swiper-container')
        .classList.add('show');
    },
    slideChange: function () {
      updateDispatchesArrows(this);
    },
  },
});

updateDispatchesArrows(dispatchesSwiper);

function updateDispatchesArrows(swiper) {
  dispatchesLeftArrow.disabled = swiper.isBeginning;
  dispatchesRightArrow.disabled = swiper.isEnd;
}

dispatchesLeftArrow.addEventListener('click', () => {
  dispatchesSwiper.slidePrev();
});

dispatchesRightArrow.addEventListener('click', () => {
  dispatchesSwiper.slideNext();
});

// MusicWorld - Swiper.js Slider Initialization
window.MWSlider = {
  init: function (selector, options) {
    try {
      return new Swiper(selector, Object.assign({
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
          nextEl: selector + ' .swiper-button-next',
          prevEl: selector + ' .swiper-button-prev'
        },
        pagination: {
          el: selector + ' .swiper-pagination',
          clickable: true
        }
      }, options));
    } catch (e) {
      // Fallback: make container scrollable
      var el = document.querySelector(selector);
      if (el) {
        el.style.overflowX = 'auto';
        el.style.display = 'flex';
        el.style.gap = '20px';
      }
      return null;
    }
  },

  initAll: function () {
    var isMobile = window.innerWidth < 1024;

    if (document.querySelector('#slider-new-releases')) {
      this.init('#slider-new-releases', {
        slidesPerView: isMobile ? 1.5 : 4,
        spaceBetween: 20
      });
    }
    if (document.querySelector('#slider-best-of-year')) {
      this.init('#slider-best-of-year', {
        slidesPerView: isMobile ? 1.5 : 4,
        spaceBetween: 20
      });
    }
    if (document.querySelector('#slider-top-composers')) {
      this.init('#slider-top-composers', {
        slidesPerView: isMobile ? 1.2 : 3,
        spaceBetween: 20
      });
    }
    if (document.querySelector('#slider-category-artists')) {
      this.init('#slider-category-artists', {
        slidesPerView: isMobile ? 2 : 5,
        spaceBetween: 16
      });
    }
  }
};

import $ from 'jquery';
import data from './data';
import slides from './slides';

const app = {
  countProgress: 0,
  dataLoaded: false,
  lastActiveSlide: false,
  lastActiveIndex: false,

  init() {
    this.main = $('.main-container');
    this.about = $('.about');
    this.aboutLink = $('#about');
    this.loading = $('#loading');
    this.enterSlides = $('#show-slides');

    data.fetchData();
    this.toggleShow();

    this.startLoad();

    this.enterSlides.on('click', this.showSlides.bind(this));
    this.aboutLink.on('click', this.showAboutPage.bind(this));
  },

  // check what page is being requested
  toggleShow() {
    if (location.href.includes('#')) {
      this.about.addClass('hide');
    }
  },

  startLoad() {
    setTimeout(() => {
      $('#loading h1').fadeIn('slow');
    }, 200);

    const interval = setInterval(() => {
      if (this.dataLoaded) {
        setTimeout(() => {
          this.loading.fadeOut();
        }, 1000);

        clearInterval(interval);

        if (location.href.includes('#')) {
          slides.initializeSlider();
        }
      }
    }, 10);
  },

  showAboutPage() {
    this.getLastActiveSlides();

    window.history.pushState(null, null, '/about');
    this.about.fadeIn();

    setTimeout(() => {
      slides.destroySlider();
      this.main.fadeOut();
    }, 500);
  },

  getLastActiveSlides() {
    this.lastActiveSlide = `${location.href.split('#')[1]}`;

    if (this.lastActiveSlide.includes('/')) {
      const [slide, index] = this.lastActiveSlide.split('/');
      this.lastActiveSlide = slide;
      this.lastActiveIndex = parseFloat(index);
    } else {
      this.lastActiveIndex = 0;
    }
  },

  showSlides() {
    window.history.pushState(null, null, '/');
    slides.initializeSlider();
    this.about.fadeOut();
    setTimeout(() => {
      this.main.fadeIn();
      if (this.lastActiveSlide) $.fn.fullpage.silentMoveTo(this.lastActiveSlide, this.lastActiveIndex);
    }, 100);
  }

};

export default app;

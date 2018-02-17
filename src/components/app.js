import $ from 'jquery';
import data from './data';
import slides from './slides';

const app = {
  countProgress: 0,
  dataLoaded: false,

  init() {
    this.main = $('.main-container');
    this.about = $('.about');
    this.loading = $('#loading');

    data.fetchData();
    this.toggleShow();

    this.startLoad();

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
  }

};

export default app;

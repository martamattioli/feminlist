import $ from 'jquery';

import data from './data';
import slides from './slides';
import detectDevice from './deviceDetection';
import content from './content';

const app = {
  loader: 0,
  countProgress: 0,
  dataLoaded: false,
  hoverElements: ['.outside-link', '.nav-link', '.download-link', '.fp-controlArrow', '.about-section a'],

  init() {
    //add content
    content.addInitialContent();

    this.main = $('.main-container');
    this.about = $('.about-section');
    this.aboutLink = $('#about');
    this.loading = $('#loading');
    this.loaderDiv = $('#loader');
    this.enterSlides = $('#show-slides');
    this.turnDeviceContent = $('#turn-device');

    if (detectDevice.isMobile()) detectDevice.checkRotation();

    data.fetchData();

    this.startLoad();

    this.enterSlides.on('click', slides.showSlides.bind(slides));
    this.aboutLink.on('click', this.showAboutPage.bind(this));
    $(window).on('resize', detectDevice.checkWindowSize.bind(detectDevice));

    this.addHovers();
  },

  startLoad() {
    setTimeout(() => {
      $('#loading h1, #loader').fadeIn('slow');
    }, 200);

    const interval = setInterval(() => {
      this.percentageLoader();

      if (this.dataLoaded && this.loader >= 100) {
        setTimeout(() => {
          this.loading.fadeOut();
        }, 1000);

        clearInterval(interval);
        if (location.href.includes('#') && detectDevice.isLandscape()) {
          this.about.addClass('hide');
          slides.initializeSlider();
        } else if (!detectDevice.isMobile() && !detectDevice.isLandscape()) {
          this.about.addClass('hide');
          this.turnDeviceContent.fadeIn();
        }

      }
    }, 10);
  },

  percentageLoader() {
    this.loaderDiv.html(`${this.loader >= 100 ? this.loader : this.loader++}%`);
  },

  addHovers() {
    this.hoverElements.map(element => {
      return (
        $('body').on('mouseenter', element, function() {
          $(this).addClass('is-hover');
        }),
        $('body').on('mouseleave', element, function() {
          $(this).removeClass('is-hover');
        })
      );
    });
  },

  showAboutPage() {
    slides.getLastActiveSlides();

    this.enterSlides.parent().addClass('about-link');
    this.about.children().addClass('two-children');

    window.history.pushState(null, null, '/about');
    this.about.fadeIn();

    setTimeout(() => {
      slides.destroySlider();
      this.main.fadeOut();
    }, 500);
  }

};

export default app;

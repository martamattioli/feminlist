import $ from 'jquery';
import data from './data';
import slides from './slides';
import detectDevice from './deviceDetection';

const app = {
  countProgress: 0,
  dataLoaded: false,
  hoverElements: ['.outside-link', '.nav-link', '.download-link', '.fp-controlArrow'],

  init() {
    this.main = $('.main-container');
    this.about = $('.about-section');
    this.aboutLink = $('#about');
    this.loading = $('#loading');
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
      $('#loading h1').fadeIn('slow');
    }, 200);

    const interval = setInterval(() => {
      console.log('data not loaded yet');
      if (this.dataLoaded) {
        console.log('data loaded');
        setTimeout(() => {
          console.log('fading out now');
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

    this.enterSlides.addClass('about-link');

    window.history.pushState(null, null, '/about');
    this.about.fadeIn();

    setTimeout(() => {
      slides.destroySlider();
      this.main.fadeOut();
    }, 500);
  }

};

export default app;

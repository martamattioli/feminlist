import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullpage';
import 'fullpage.js/dist/jquery.fullpage.css';

import app from './app';
import detectDevice from './deviceDetection';

const slides = {
  navLinks: $('.nav-link').toArray(),
  lastActiveSlide: false,
  lastActiveIndex: false,
  sections: function() {
    return this.navLinks.map(section => $(section).attr('href').substring(1));
  },
  leftRight: ['left', 'right'],

  initializeSlider() {
    $(window).off('resize');

    $('#fullpage').fullpage({
      menu: '#menu',
      anchors: this.sections(),
      touchSensitivity: 30,
      afterRender: () => this.displayContent(),
      afterSlideLoad: () => this.displayContent(),
      onLeave: () =>
        setTimeout(() => {
          this.displayContent();
        }, 500),
      afterResize: () => detectDevice.checkIsLandscape('slider')
    });

    $.fn.fullpage.setScrollingSpeed(700);
  },

  destroySlider() {
    $.fn.fullpage.destroy('all');
    $(window).on('resize', detectDevice.checkWindowSize.bind(detectDevice));
  },

  displayContent() {
    const allSlides = '.fp-tableCell';
    const activeSlide = '.fp-section.active .fp-table.active .fp-tableCell';

    this.leftRight.map(side => {
      $(`${allSlides} .${side}-side .flex-container`).removeClass('animated fadeInUp');
      $(`${activeSlide} .${side}-side .flex-container`).addClass('animated fadeInUp');
      return;
    });

    this.addActiveLink();
  },

  addActiveLink() { // highlight nav link on slide load
    $('header li').removeClass('show');
    $('header li.active').addClass('show');
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
    this.initializeSlider();
    app.about.fadeOut();
    setTimeout(() => {
      app.main.fadeIn();
      if (this.lastActiveSlide) $.fn.fullpage.silentMoveTo(this.lastActiveSlide, this.lastActiveIndex);
    }, 100);
  }
};

export default slides;

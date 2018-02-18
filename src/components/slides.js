import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullpage';
import 'fullpage.js/dist/jquery.fullpage.css';

import app from './app';
import detectDevice from './deviceDetection';

const slides = {
  navLinks: $('.nav-link').toArray(),
  lastActiveSlide: false,
  lastActiveIndex: false,
  loaded: false,
  sections: function() {
    return this.navLinks.map(section => $(section).attr('href').substring(1));
  },
  leftRight: ['left', 'right'],

  initializeSlider() {
    $(window).off('resize');

    $('#fullpage').fullpage({
      menu: '#menu',
      anchors: this.sections(),
      touchSensitivity: 10,
      afterRender: () => this.displayContent({loading: true}),
      afterSlideLoad: () => this.displayContent(this.loaded),
      onLeave: (i, nI, direction) =>
        setTimeout(() => {
          this.displayContent({direction});
        }, 500),
      onSlideLeave: (anchorLink, index, slideIndex, directionSide, nextSlideIndex) =>
        this.displayContent({directionSide}),
      afterResize: () => detectDevice.checkIsLandscape('slider')
    });

    $.fn.fullpage.setScrollingSpeed(700);
  },

  destroySlider() {
    $.fn.fullpage.destroy('all');
    $(window).on('resize', detectDevice.checkWindowSize.bind(detectDevice));
  },

  displayContent({ ...options }) {
    let animation;
    let timer;

    if (options.direction) {
      options.direction === 'up' ? animation = 'fadeInDown' : animation = 'fadeInUp';
      timer = 0;
    } else if (options.directionSide) {
      options.directionSide === 'right' ? animation = 'fadeInRight' : animation = 'fadeInLeft';
      timer = 500;
    } else if (options.loading) {
      animation = 'fadeInUp';
      timer = 0;
    } else {
      if (!this.loaded) {
        animation = 'fadeInUp';
        timer = 0;
      }
      this.loaded = true;
    }

    setTimeout(() => {
      const allSlides = '.fp-tableCell';
      const activeSlide = '.fp-section.active .fp-table.active .fp-tableCell';

      this.leftRight.map(side => {
        $(`${allSlides} .${side}-side .flex-container`).removeClass(`animated ${animation}`);
        $(`${activeSlide} .${side}-side .flex-container`).addClass(`animated ${animation}`);
        return;
      });

    }, timer);

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
    setTimeout(() => {
      app.about.fadeOut('slow');
      app.main.fadeIn();
      if (this.lastActiveSlide) $.fn.fullpage.silentMoveTo(this.lastActiveSlide, this.lastActiveIndex);
    }, 100);
  }
};

export default slides;

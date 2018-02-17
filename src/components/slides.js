import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullpage';
import 'fullpage.js/dist/jquery.fullpage.css';

const slides = {
  navLinks: $('.nav-link').toArray(),
  sections: function() {
    return this.navLinks.map(section => $(section).attr('href').substring(1));
  },
  leftRight: ['left', 'right'],

  initializeSlider() {
    $('#fullpage').fullpage({
      menu: '#menu',
      anchors: this.sections(),
      touchSensitivity: 30,
      afterRender: () => this.displayContent('afterRender'),
      afterSlideLoad: () => this.displayContent('afterSlideLoad'),
      onLeave: () =>
        setTimeout(() => {
          this.displayContent('onLeave');
        }, 500),
    });

    $.fn.fullpage.setScrollingSpeed(700);
  },

  destroySlider() {
    $.fn.fullpage.destroy('all');
  },

  displayContent(event) {
    console.log(event);
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
  }
};

export default slides;

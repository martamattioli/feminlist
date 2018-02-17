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

      afterSlideLoad: () => this.displayContent(),
      onLeave: () =>
        setTimeout(() => {
          this.displayContent();
        }, 500),
    });
  },

  destroySlider() {
    $.fn.fullpage.destroy('all');
  },

  displayContent() {
    const allSlides = '.fp-tableCell';
    const activeSlide = '.fp-section.active .fp-table.active .fp-tableCell';

    this.leftRight.map(side => {
      $(`${allSlides} .${side}-side .flex-container`).removeClass('animated fadeInUp');
      $(`${activeSlide} .${side}-side .flex-container`).addClass('animated fadeInUp');
      return;
    });
  },

  addActiveLink(anchorLink) { // highlight nav link on slide load
    console.log(anchorLink, 'in add active link func');
    this.sectionDivs = $('.section').toArray();
    $('.nav-link').removeClass('active-section');
    $('#menu li').removeClass('active-li show');

    setTimeout(() => {
      $(`a[href*="#${anchorLink}"]`).addClass('active-section');
      $('.active-section').parent().addClass('active-li');
      $('.active-li').addClass('show');
    }, 200);
  }
};

export default slides;

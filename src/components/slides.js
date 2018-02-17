import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullpage';
import 'fullpage.js/dist/jquery.fullpage.css';

const slides = {
  navLinks: $('.nav-link').toArray(),
  sections: function() {
    return this.navLinks.map(section => $(section).attr('href').substring(1));
  },

  initializeSlider() {
    $('#fullpage').fullpage({
      anchors: this.sections(),
      afterSlideLoad: (anchorLink, index, slideAnchor, slideIndex) => this.checkContent(slideIndex),
      afterLoad: (anchorLink, index) => console.log(anchorLink, index)
    });
  },

  destroySlider() {
    $.fn.fullpage.destroy('all');
  },

  checkContent(slideIndex) {
    console.log('checking content', slideIndex);
    const allSlides = '.fp-tableCell';
    const activeSlide = `#${slideIndex} .fp-tableCell`;
    const leftRight = ['left', 'right'];

    leftRight.map(side => {
      console.log(`${activeSlide} .${side}-side .flex-container`);
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

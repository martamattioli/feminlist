import data from './components/data.js';
import detectDevice from './components/deviceDetection.js';

import './scss/style.scss';

(function($) {
  $(document).ready(function() {
    window.app.init();

    $(window).on('resize', window.app.checkDevice.bind(window.app));
  });

})(jQuery);

window.app = {
  data: {},
  countMs: 0,
  countMsInterval: null,
  countProgress: 0,
  fetchOver: false,
  sections: null,
  shortSections: null,
  isMobile: detectDevice.detect(),
  main: $('main'),
  turnDeviceContent: '',

  init() {
    const navLinks = $('.nav-link').toArray();

    this.sections = navLinks.map(section => $(section).attr('href').substring(1));
    this.shortSections = this.sections.map(section => section.substring(6));
    this.fetchData();
    // this.countMsInterval = setInterval(this.checkLoadingTime.bind(this), 10);

    this.checkDevice();
  },

  fetchData() {
    const infos = this.data;
    const that = this;
    $
      .get('http://localhost:4000/api/docs')
      .done((res) => {
        that.data = res;
        for (const key in res) {
          this.countProgress++;
          that.addWrapper(key);
        }
      });
  },

  checkLoadingTime() {
    this.countMs++;
    if (this.fetchOver) {
      clearInterval(this.countMsInterval);
      this.setMarkup();
    }
  },

  addWrapper(name) {
    this.data[name].wrapper = `<div class="${(name).toLowerCase()} section" id="${(name).toLowerCase()}"></div>`;
    this.data[name].slides = [];

    this.addSlide(name);
  },

  addSlide(name) {
    const entries = this.data[name].entries;
    const slides = this.data[name].slides;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      const slide = `
        <div class="slide content-slide" id="${i}">
          <div class="left-side half-side">
            <div class="flex-container">
              <div></div>
              <div>
              <h3 class="category">Category: ${entry.category}</h3>
                <h1 class="title">${entry.title}</h1>
                <h2 class="author">${entry.credits}</h2>
                <h3 class="extra-details">${entry.extrainfotext}: ${entry.extrainfo}</h3>
              </div>
              <div class="link-container">
                <a
                  href="${entry.linkone}"
                  class="outside-link"
                  target="_blank"
                >${entry.linkonetext}</a>
              </div>
            </div>
          </div>
          <div class="right-side half-side">
            <div class="flex-container">
              <div></div>
              <p class="description">${entry.description}</p>
              <div class="link-container">
                <a
                  href="${entry.linktwo}"
                  class="outside-link"
                  target="_blank"
                >${entry.linktwotext}</a>
              </div>
            </div>
          </div>
          <!-- <div class="pagination">
            <p>${i+1}/${entries.length}</p>
          </div> -->
        </div>`;

      slides[i] = slide;

      if (this.countProgress === 5 && i === entries.length - 1) this.setMarkup();
    }
  },

  setMarkup() {
    console.log('in setMarkup');

    const data = this.data;

    for (const key in data) {
      $(this.main).append(data[key].wrapper);
      $(`#${key}`).append(data[key].slides);
    }

    this.initializeSlider();

    this.jumpHome();
    $.fn.fullpage.setScrollingSpeed(700);
  },

  initializeSlider() {
    const that = this;
    $('#fullpage').fullpage({
      anchors: this.sections,
      onLeave: function(index, nextIndex, direction) {
        const leavingSection = $(this);
        console.log('on leave');
        if (direction === 'up') {
          $(leavingSection).addClass('move-up');
        } else {
          $(leavingSection.addClass('move-down'));
        }
        that.showContent(index, nextIndex, direction, leavingSection, that);
      },
      onSlideLeave: (anchorLink, index, slideIndex, direction, nextSlideIndex) => this.checkContent(anchorLink, index, slideIndex, direction, nextSlideIndex),
      afterLoad: (anchorLink) => this.addActiveLink(anchorLink)
    });

    this.checkContent();
  },

  showContent(index, nextIndex, direction, leavingSection, app) { // show content on slide change
    $('.active-li').removeClass('show');
    $('.fp-table .fp-tableCell .left-side div').css({'opacity': '0'}).removeClass('animated fadeInUp');
    $('.fp-table .fp-tableCell .right-side div').css({'opacity': '0'}).removeClass('animated fadeInUp');
    setTimeout(() => {
      $('.fp-section.active .fp-table.active .fp-tableCell .left-side div').addClass('animated fadeInUp');
      setTimeout(() => {
        $('.fp-section.active .fp-table.active .fp-tableCell .right-side div').addClass('animated fadeInUp');
      }, 100);
    }, 400);
  },

  addActiveLink(anchorLink) { // highlight nav link on slide load
    this.sectionDivs = $('.section').toArray();
    $('.nav-link').removeClass('active-section');
    $('#menu li').removeClass('active-li');
    $(`a[href*="#${anchorLink}"]`).addClass('active-section');
    $('.active-section').parent().addClass('active-li');
    $('.active-li').addClass('show');
  },

  checkContent(anchorLink, index, slideIndex, direction, nextSlideIndex) {
    $('.fp-table .fp-tableCell .left-side div').css({'opacity': '0'}).removeClass('animated fadeInUp');
    $('.fp-table .fp-tableCell .right-side div').css({'opacity': '0'}).removeClass('animated fadeInUp');

    setTimeout(() => {
      $('.fp-section.active .fp-table.active .fp-tableCell .left-side div').addClass('animated fadeInUp');

      setTimeout(() => {
        $('.fp-section.active .fp-table.active .fp-tableCell .right-side div').addClass('animated fadeInUp');
      }, 100);
    }, 400);
  },

  checkDevice() {
    const isMobile = detectDevice.detect(); // this returns true or false if device is mobile

    if (isMobile) {
      ($(window).width() < $(window).height()) ? this.hideStuff() : this.showStuff();
    } else {
      ($(window).width() < $(window).height()) ? this.hideStuff() : this.showStuff();
    }
  },

  hideStuff() {
    $('nav').css({'opacity': '0'});
    $('header').css({'opacity': '0'});
    $('main').css({'opacity': '0'});

    this.turnDeviceContent = `
      <div class="turn-device">
        <section>
          <div>
            <img class="animated rotateInDownLeft infinite" src="assets/turn-device.svg">
            <h2>Please Turn You Device To Landscape</h2>
          </div>
        </section>
      </div>
    `;

    $('body').append(this.turnDeviceContent);

    this.showContent();
  },

  showStuff() {
    // console.log('showing stuff');
    if ($('.turn-device')) {
      $('.turn-device').remove();
    }

    $('nav').css({'opacity': '1'});
    $('header').css({'opacity': '1'});
    $('main').css({'opacity': '1'});
    this.showContent();
  },

  jumpHome() {
    $.fn.fullpage.setScrollingSpeed(0);
    location.href = '#topic-podcasts';
  }

};

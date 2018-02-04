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
  data: {
    podcasts: {
      id: '1W1QCRIeClvIj7Auk1Mr2CIMEPTetIUYjxS2zEu0RmrI'
    },
    books: {
      id: '1GIf9a5SVqmbJCG3n3mMiovIr7tYUI6QR2dJAI5UTVvU'
    },
    events: {
      id: '1aC8Bu2hHYKeArktUZhqT5fRClpR5wXhEZJ9f5BCe_t8'
    },
    tvnfilms: {
      id: '1uuDbHBfYFbtsMH07QKETxn7L0g6ZTtxStBrrurheekQ'
    },
    websites: {
      id: '19b3se4BuF7FZt6mTkK94IiyLqwCbB9BNKMaHcYPCQQ0'
    }
  },
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
    this.countMsInterval = setInterval(this.checkLoadingTime.bind(this), 10);

    this.checkDevice();
  },

  fetchData() {
    const infos = this.data;
    const that = this;
    for (const key in infos) {
      $
        .ajax({
          method: 'GET',
          url: `https://spreadsheets.google.com/feeds/list/${infos[key].id}/od6/public/values?alt=json`,
          format: 'json'
        })
        .done(that.addWrapper.bind(this));
    }
  },

  checkLoadingTime() {
    this.countMs++;
    if (this.fetchOver) {
      clearInterval(this.countMsInterval);
      this.setMarkup();
    }
  },

  addWrapper(data) {
    const section = data.feed;
    const sectionName = section.title.$t;

    this.data[sectionName].wrapper = `<div class='${(sectionName).toLowerCase()} section' id='${(sectionName).toLowerCase()}'></div>`;
    this.data[sectionName].slides = [];

    this.addSlide(section);

    if (this.countProgress === 4) {
      this.fetchOver = true;
    } else {
      this.countProgress++;
    }
  },

  addSlide(section) {
    const jsonEntries = section.entry;
    const slides = this.data[section.title.$t].slides;
    for (let i = 0; i < jsonEntries.length; i++) {
      const entry = jsonEntries[i];

      const slide = `
        <div class="slide content-slide" id="${i}">
          <div class="left-side half-side">
            <div class="flex-container">
              <div></div>
              <div>
              <h3 class="category">Category: ${entry.gsx$category.$t}</h3>
                <h1 class="title">${entry.gsx$title.$t}</h1>
                <h2 class="author">${entry.gsx$credits.$t}</h2>
                <h3 class="extra-details">${entry.gsx$extrainfotext.$t}: ${entry.gsx$extrainfo.$t}</h3>
              </div>
              <div class="link-container">
                <a
                  href="${entry.gsx$linkone.$t}"
                  class="outside-link"
                  target="_blank"
                >${entry.gsx$linkonetext.$t}</a>
              </div>
            </div>
          </div>
          <div class="right-side half-side">
            <div class="flex-container">
              <div></div>
              <p class="description">${entry.gsx$description.$t}</p>
              <div class="link-container">
                <a
                  href="${entry.gsx$linktwo.$t}"
                  class="outside-link"
                  target="_blank"
                >${entry.gsx$linktwotext.$t}</a>
              </div>
            </div>
          </div>
          <!-- <div class="pagination">
            <p>${i+1}/${jsonEntries.length}</p>
          </div> -->
        </div>`;

      slides[i] = slide;
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

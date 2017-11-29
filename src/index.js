import data from './components/data.js';
import detectDevice from './components/deviceDetection.js';

import './scss/style.scss';

const categories = ['podcasts', 'books', 'events', 'tvnfilms', 'website'];
const sections = ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage'];
let isMobile;
let turnDeviceContent;
let $main;
let $allNavLinks;

function init() {
  $main = $('main');
  $allNavLinks = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');

  for (var i = 0; i < categories.length; i++) {
    addMainWrapper(categories[i], i);
  }

  $('#fullpage').fullpage({
    anchors: sections,
    onLeave: () => showContent(),
    afterLoad: (anchorLink) => addActiveLink(anchorLink),
    onSlideLeave: () => showContent()
  });

  checkDevice();
  $(window).on('resize', checkDevice);
}

function checkDevice() {
  isMobile = detectDevice.detect(); // this returns true or false if device is mobile

  if (isMobile) {
    if (window.outerWidth < window.outerHeight) {
      hideStuff();
    } else {
      showStuff();
    }
  } else {
    showStuff();
  }
}

function hideStuff() {
  $('nav').css({'opacity': '0'});
  $('header').css({'opacity': '0'});
  $('main').css({'opacity': '0'});

  turnDeviceContent = `
    <div class="turn-device">
      <section>
        <div>
          <img class="animated rotateInDownLeft infinite" src="src/assets/turn-device.svg">
          <h2>Please Turn You Device To Landscape</h2>
        </div>
      </section>
    </div>
  `;

  $('body').append(turnDeviceContent);

  showContent();
}

function showStuff() {
  if ($('.turn-device')) {
    $('.turn-device').remove();
  }

  $('nav').css({'opacity': '1'});
  $('header').css({'opacity': '1'});
  $('main').css({'opacity': '1'});
  showContent();
}

function addActiveLink(anchorLink){
  $allNavLinks.attr('class', '');
  $(`a[href*="#${anchorLink}"]`).addClass('active-section');
}

function showContent() {
  $('.fp-table .fp-tableCell .left-side div').css({'opacity': '0'}).attr('class', '');
  $('.fp-table .fp-tableCell .right-side div').css({'opacity': '0'}).attr('class', '');
  setTimeout(() => {
    $('.fp-section.active .fp-table.active .fp-tableCell .left-side div').addClass('animated fadeInUp');
    setTimeout(() => {
      $('.fp-section.active .fp-table.active .fp-tableCell .right-side div').addClass('animated fadeInUp');
    }, 100);
  }, 300);
}

function addMainWrapper(category, index) {
  const section = `<div class='${category} section' id='${category}'></div>`;
  const categoryItem = data[index][category];

  $main.append(section);

  for (var i = 0; i < categoryItem.length; i++) {
    addContent(categoryItem[i], category);
  }
}

function addContent(item, category) {
  const currentSection = $(`.${category}`);
  const sectionContent = `
    <div class="slide">
      <div class="left-side">
        <div>
          <section>
            <h3>${item.category}</h3>
            <h1>${item.title}</h1>
            <h2>${item.author}</h2>
            <h3>${item.originalRelease}</h3>
          </section>
          <section>
            <a href="#" class="outside-link">${item.linkTitle}</a>
          </section>
        </div>
      </div>
      <div class="right-side">
        <div>
          <section>
            <p>${item.description}</p>
          <section>
        </div>
      </div>
    </div>
  `;

  $(currentSection).append(sectionContent);
}

$(init);

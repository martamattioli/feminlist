import data from './components/data.js';

// import 'bootstrap-css-only';
import './scss/style.scss';

const categories = ['podcasts', 'books', 'events', 'tvnfilms', 'website'];
const sections = ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage'];

function init() {
  for (var i = 0; i < categories.length; i++) {
    addMainWrapper(categories[i], i);
  }
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage'],
    onLeave: () => showContent(),
    afterLoad: function(anchorLink, index){
      console.log(anchorLink, index);
      // const circle = '<i class="fa fa-circle" aria-hidden="true"></i>';
      $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').attr('class', '');
      $(`a[href*="#${anchorLink}"]`).addClass('active-section');
      // $(`a[href*="#${anchorLink}"]`).parent().append(circle);
      // $(`a[href*="#${anchorLink}"]`).prepend(circle);
    },
    onSlideLeave: () => showContent()
  });

  showContent();
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
  // data-anchor="${sections[index]}"
  const section = `<div class='${category} section' id='${category}'></div>`;
  $('main').append(section);

  const categoryItem = data[index][category];
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

let $mainContainer;
let $navLinks;
let sliderDiv;
let slideDiv;
let windowPosition;
const sections = [];
const categories = ['podcasts', 'books', 'events'];

function init() {
  $navLinks = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');
  $mainContainer = $('.main-container')[0];
  windowPosition = window.scrollY;

  for (var i = 0; i < categories.length; i++) {
    addMainWrapper(categories[i], i);
  }

  $( '.slick-initialized' ).each(function() {
    sections.push($(this).position().top);
  });

  checkActiveLink();

  $navLinks.on('click', () => {
    checkActiveLink();
  });

  // $(window).on('scroll', () => {
  //   windowPosition = window.scrollY;
  //   const previousIndex = parseFloat($('.active').attr('data-index'));
  //
  //   // window.scrollTo(0, sections[previousIndex + 1]);
  //   checkActiveLink();
  // });

  $($navLinks).each(function(i) {
    $(this).attr('data-position', sections[i]);
    $(this).attr('data-index', i);
  });
}

function checkActiveLink() {
  console.log(window.pageYOffset);
  windowPosition = window.pageYOffset;
  for (var i = 0; i < sections.length; i++) {
    console.log(windowPosition, sections[i]);
    if (sections[i] <= windowPosition) {
      $($navLinks[i]).addClass('active');
      const newArr = $navLinks.filter(nonActiveLink => nonActiveLink !== i);
      $(newArr).each(function(i, element) {
        $(element).removeClass();
      });
    } else {
      $($navLinks[i]).removeClass();
    }
  }
}

function addMainWrapper(category, index) {
  sliderDiv = `<div class='${category}' id='${category}'></div>`;
  $($mainContainer).append(sliderDiv);

  const categoryItem = data[index][category];
  for (var i = 0; i < categoryItem.length; i++) {
    addContent(categoryItem[i], category, sliderDiv);
  }

  $(`.${category}`).slick();
}

function addContent(item, category) {
  slideDiv = $(`.${category}`);
  const slideContent = `
    <div class="slide">
      <div class="left-side">
        <h3>${item.category}</h3>
        <h1>${item.title}</h1>
        <h2>${item.author}</h2>
        <h3>${item.originalRelease}</h3>
        <a href="#">${item.linkTitle}</a>
      </div>
      <div class="right-side">
        <p>${item.description}</p>
      </div>
  </div>
  `;

  $(slideDiv).append(slideContent);
}

$(init);

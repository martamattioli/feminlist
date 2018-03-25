import $ from 'jquery';

import app from './app';
import data from './data';

const content = {
  addInitialContent() {
    const initialContent = `
      <div id="loading" class="loading">
        <h1 class="loading-h1">Feminlist</h1>
        <p id="loader">0%</p>
      </div>
      <div class="main-container" id="fullpage"></div>
      <div class="about-section">
        <section>
          <h1>About</h1>
          <div class="content">
            <p>Feminlist is an extensive directory of content created for and by women. The website was developed by Marta and Maria - two friends living in opposite sides of the world - with the intention of increasing visibility of all women in media.</p>
            <p>Get in touch on <a href="mailto:hello@feminlist.com">hello@feminlist.com</a> if you'd like to submit a piece of content, if you have a suggestion or if you simply want to say hi. We'd love to hear from you.</p>
          </div>
          <p><a id="show-slides" class="outside-link enter-link"></a></p>
        </section>
      </div>
      <div id="turn-device" class="turn-device">
        <section>
          <div>
            <img class="animated rotateInDownLeft infinite" src="assets/turn-device.svg">
            <h2>Please Turn You Device To Landscape</h2>
          </div>
        </section>
      </div>`;
    $('main').append(initialContent);
  },

  addWrapper(name) {
    data.data[name].wrapper = `<div class="${(name).toLowerCase()} section" id="${(name).toLowerCase()}"></div>`;
    data.data[name].slides = [];

    this.addSlide(name);
  },

  addSlide(name) {
    const entries = data.data[name].entries;
    const slides = data.data[name].slides;

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
                  class="download-link"
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
                  class="outside-link learn-more"
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

      if (app.countProgress === 5 && i === entries.length - 1) this.setMarkup();
    }
  },

  setMarkup() {
    app.dataLoaded = true;

    for (const key in data.data) {
      $(app.main).append(data.data[key].wrapper);
      $(`#${key}`).append(data.data[key].slides);
    }
  },
};

export default content;

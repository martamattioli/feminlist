import $ from 'jquery';

import app from './app';
import data from './data';
import slides from './slides';

const html = {
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

export default html;

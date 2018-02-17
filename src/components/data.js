import $ from 'jquery';

import app from './app';
import content from './content';

const data = {
  data: {},
  fetchData() {
    const loc = (location.hostname === 'localhost') ?
      'http://localhost:8000' :
      `${location.protocol}${location.hostname}`;
    $
      .get(`${loc}/api/docs`)
      .done((res) => {
        this.data = res;

        for (const item in this.data) {
          app.countProgress++;
          content.addWrapper(item);
        }
      });
  }
};

export default data;

import $ from 'jquery';

import app from './app';
import content from './content';

const data = {
  data: {},
  fetchData() {
    console.log('fetching data');
    const loc = (location.hostname === 'localhost') ?
      'http://localhost:8000' :
      `${location.protocol}//${location.hostname}`;

    $
      .get(`${loc}/api/docs`)
      .done((res) => {
        console.log(res);
        this.data = res;

        for (const item in this.data) {
          app.countProgress++;
          content.addWrapper(item);
        }
      })
      .fail((err) => {
        console.log(err);
        // window.location.reload();
      });
  }
};

export default data;

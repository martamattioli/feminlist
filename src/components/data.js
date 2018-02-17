import $ from 'jquery';

import app from './app';
import html from './html';

const data = {
  data: {},
  fetchData() {
    $
      .get('http://localhost:4000/api/docs')
      .done((res) => {
        this.data = res;

        for (const item in this.data) {
          app.countProgress++;
          html.addWrapper(item);
        }
      });
  }
};

export default data;

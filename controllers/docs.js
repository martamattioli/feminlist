const rp = require('request-promise');
const Promise = require('bluebird');
const env = require('../config/env');

function docsIndex(req, res, next) {
  const data = {};

  for(const key in env.sheetsDocs) {
    const url = `https://spreadsheets.google.com/feeds/list/${env.sheetsDocs[key]}/od6/public/values?alt=json`;

    data[key] = rp({
      url,
      method: 'GET',
      json: true
    })
      .then(docs => {
        const entries = docs.feed.entry.map(entry => {
          return {
            category: entry.gsx$category.$t,
            title: entry.gsx$title.$t,
            credits: entry.gsx$credits.$t,
            linkonetext: entry.gsx$linkonetext.$t,
            linkone: entry.gsx$linkone.$t,
            extrainfotext: entry.gsx$extrainfotext.$t,
            extrainfo: entry.gsx$extrainfo.$t,
            linktwotext: entry.gsx$linktwotext.$t,
            linktwo: entry.gsx$linktwo.$t,
            description: entry.gsx$description.$t
          };
        });

        return { entries };
      })
      .catch(err => console.log(err));
  }

  Promise.props(data)
    .then(actualObj => res.status(200).json(actualObj))
    .catch(err => console.log(err));

}

module.exports = {
  index: docsIndex
};

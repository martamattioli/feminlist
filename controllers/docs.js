const rp = require('request-promise');

function docsIndex(req, res, next) {
  rp({
    url: 'https://restcountries.eu/rest/v2/all',
    method: 'GET',
    json: true
  })
    .then(docs => {
      console.log(docs);
    })
    .catch(err => console.log(err));
}

module.exports = {
  index: docsIndex
};

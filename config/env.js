module.exports = {
  port: process.env.PORT || 3000,
  sheetsDocs: {
    podcasts: process.env.PODCASTS_ID,
    books: process.env.BOOKS_ID,
    events: process.env.EVENTS_ID,
    tvnfilms: process.env.TVNFILMS_ID,
    website: process.env.WEBSITE_ID
  }
};

module.exports = {
  db: process.env.MONGODB_URI || 'mongodb://localhost/feminlist',
  port: process.env.PORT || 3000,
  sheetsDocs: {
    podcasts: process.env.PODCASTS_ID,
    website: process.env.WEBSITE_ID,
    books: process.env.BOOKS_ID,
    tvnfilms: process.env.TVNFILMS_ID,
    events: process.env.EVENTS_ID
  }
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
  name: String
});

docSchema.plugin(require('../lib/globalToJSON'));

module.exports = mongoose.model('Doc', docSchema);

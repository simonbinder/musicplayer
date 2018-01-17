const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  origin: {
    type: String,
    enum: ['spotify', 'soundcloud', 'youtube'],
  },
  source: {
    type: String
  },
  title: {
    type: String,
  },
  artists: {
    type: String,
  },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;

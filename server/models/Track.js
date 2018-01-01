const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  origin: {
    type: String,
    enum: ['spotify'],
  },
  id: {
    type: String
  },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;

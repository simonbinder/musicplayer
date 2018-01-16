const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: { type: String },
  created: { type: Date, default: new Date() },
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

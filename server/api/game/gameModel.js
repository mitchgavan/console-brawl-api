const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  deck: String,
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  image: {
    icon_url: String,
    medium_url: String,
    screen_url: String,
    small_url: String,
    super_url: String,
    thumb_url: String,
    tiny_url: String,
  },
  name: {
    type: String,
    required: true
  },
  platforms: [],
  site_detail_url: String,
  images: []
});

module.exports = mongoose.model('game', GameSchema);

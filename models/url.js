const mongoose = require('mongoose');

const urlsSchema = new mongoose.Schema({
  fullurl: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('url', urlsSchema);

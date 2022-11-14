const mongoose = require('mongoose');
const shortId = require('shortid');

const urlsSchema = new mongoose.Schema({
  fullurl: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  qrcode: {
    type: String,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('url', urlsSchema);

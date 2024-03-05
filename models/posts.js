const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text:{
      type: String,
      required: true
    },
    profile: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    img: {
      type: String,
      required: true
    },
    profileImg: {
      type: String,
      required: true
    }
  })

  module.exports = mongoose.model('Post', postSchema);

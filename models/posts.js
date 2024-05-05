const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
},
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
    },
    profileImg: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    likedBy: {
      type: [String], // Array of usernames
      default: [],
    },
  })

  module.exports = mongoose.model('Post', postSchema);

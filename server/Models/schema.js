const mongoose = require("./database");

const { Schema } = mongoose;

const imgSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  imgAddress: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
    default: 0,
  },

  liked: {
    type: Boolean,
    default: false
  },

  admin: {
    type: String,
    required: true,
  },
});

const Img = mongoose.model('Album', imgSchema)

module.exports = Img
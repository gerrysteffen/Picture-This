const mongoose = require("./database");

const { Schema } = mongoose;

const imgSchema = new Schema({
  album: {
    type: String,
  },
  id: {
    type: String,
    required: false,
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
    required: false,
  },

  likes: {
    type: Number,
    default: 0,
  },

  liked: {
    type: Array,
    default: [],
  },
 
});

const Img = mongoose.model("Images", imgSchema);

module.exports = Img;

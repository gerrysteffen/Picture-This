const mongoose = require("./database");

const { Schema } = mongoose;

const imgSchema = new Schema({
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
  admin: {
    type: String,
    required: false,
  },
});

const Img = mongoose.model("Album", imgSchema);




module.exports = Img

const mongoose = require("./database");
const Img = require("./imageSchema");

const { Schema } = mongoose;

const albumSchema = new Schema({
  albumName: {
    type: String,
    required: true,
  },
  photos: [{ type: Schema.Types.ObjectId, ref: "Images" }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  accessable: {
    type: Array,
    default: [],
  },
});

const Album = mongoose.model("Albums", albumSchema);

module.exports = Album;

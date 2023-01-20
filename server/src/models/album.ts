import mongoose from "./index";

const { Schema } = mongoose;

const albumSchema = new Schema({
  albumName: {
    type: String,
    required: true,
  },
  photos: [{ type: Schema.Types.ObjectId, ref: "image" }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const Album = mongoose.model("album", albumSchema);

export default Album;

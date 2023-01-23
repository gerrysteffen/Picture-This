import mongoose from "./index";

const { Schema } = mongoose;

const albumSchema = new Schema({
  albumName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  photos: [{ type: Schema.Types.ObjectId, ref: "image" }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  sharedWith: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  ]
});

const Album = mongoose.model("album", albumSchema);

export default Album;

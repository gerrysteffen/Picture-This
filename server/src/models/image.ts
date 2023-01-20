import mongoose from './index';

const { Schema } = mongoose;

const imageSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'album',
  },
  cloudinaryId: {
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  liked: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});

const Image = mongoose.model('image', imageSchema);

export default Image;

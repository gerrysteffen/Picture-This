import mongoose from './index';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sharedAlbums: {
    type: [{ type: Schema.Types.ObjectId, ref: 'album' }],
  },
  pendingInvite: [{ type: Schema.Types.ObjectId, ref: 'album' }],
  uploadedAlbums: [{ type: Schema.Types.ObjectId, ref: 'album' }],
});

const User = mongoose.model('user', userSchema);

export default User;

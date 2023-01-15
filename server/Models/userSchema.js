const mongoose = require("./database");

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
    type: Array,
    default: [],
  },
  pendingInvite: { type: Schema.Types.ObjectId, ref: "Albums" },
  uploadedAlbums: [{ type: Schema.Types.ObjectId, ref: "Albums" }],
});

const User = mongoose.model("Users", userSchema);

module.exports = User;

const Album = require("../Models/albumSchema");
const User = require("../Models/userSchema");
const { use } = require("../router");

exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findOne({ _id: req.body._id }).populate("photos");
    res.status(200);
    res.send(album);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const newAlbum = await Album.create({
      albumName: req.body.albumName,
      owner: req.session.uid,
    });
    const user = await User.findOne({ _id: req.session.uid });
    let userAlbums = user.uploadedAlbums;
    userAlbums.push(newAlbum);
    user.uploadedAlbums = userAlbums;

    user.save();
    console.log(newAlbum);
    res.status(201);
    res.send(newAlbum);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.deleteAlbum = async (req, res) => {
  console.log("attempting to delete");
  try {
    const user = await User.findOne({ _id: req.session.uid });

    const deletedAlbum = await Album.findOneAndDelete({
      _id: req.body.albumId,
    });

    let album = req.body.albumId;
    let userAlbums = user.uploadedAlbums;
    const index = userAlbums.indexOf(album);
    console.log(index);
    userAlbums.splice(index, 1);
    user.uploadedAlbums = userAlbums;
    user.save();

    res.status(204);
    res.send(deletedAlbum);
  } catch (error) {
    console.log(error);
  }
};

exports.shareAlbum = async (req, res) => {
  console.log("trying to share an album");
  try {
    const invitedUser = await User.findOne({ email: req.body.email });
    console.log(invitedUser);
    const invitedAlbum = req.body.albumId;
    let pending = invitedUser.pendingInvite;
    pending.push(invitedAlbum);
    invitedUser.pendingInvite = pending;
    invitedUser.save();
    res.status(201);
    res.send(invitedAlbum);
  } catch (error) {
    console.log(error);
  }
};

exports.rejectAlbum = async (req, res) => {
  console.log("rejecting invite");
  try {
    const user = await User.findOne({ _id: req.session.uid });
    const album = req.body._id;
    pendingInvites = user.pendingInvite;
    const index = pendingInvites.indexOf(album);
    const newInvites = pendingInvites.filter((element) => {
      return element != album;
    });
    user.pendingInvite = newInvites;
    user.save();
    res.status(204);
    res.send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

exports.acceptAlbum = async (req, res) => {
  console.log("accepting invite");
  try {
    const user = await User.findOne({ _id: req.session.uid });
    const pending = req.body.albumId;
    const newAlbum = await Album.findOne({ _id: pending }).populate("photos");

    const currentSharedAlbums = user.sharedAlbums;
    currentSharedAlbums.push(pending);

    user.sharedAlbums = currentSharedAlbums;
    let pendingList = user.pendingInvite;
    const index = pendingList.indexOf(pending);
    pendingList.splice(index, [index + 1]);
    console.log(newAlbum);
    user.pendingInvite = pendingList;
    user.save();

    res.status(201);
    res.send(newAlbum);
  } catch (error) {
    console.log(error);
  }
};

exports.removeSharedAlbum = async (req, res) => {
  console.log("removing album from shared");
  try {
    const album = req.body.albumId;
    console.log(req.body._id);
    const user = await User.findOne({ _id: req.session.uid });
    const sharedAlbums = user.sharedAlbums;
    console.log(sharedAlbums);
    let index = sharedAlbums.indexOf(album);
    console.log(index);
    sharedAlbums.splice(index, 1);
    console.log(sharedAlbums);
    user.sharedAlbums = sharedAlbums;
    user.save();
    res.status(204);
    res.send();
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

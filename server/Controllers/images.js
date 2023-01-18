const Img = require("../Models/imageSchema");
const Album = require("../Models/albumSchema");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

exports.getPhotos = async (req, res) => {
  try {
    const allPhotos = await Img.find();
    res.status(200);
    res.send(allPhotos);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    console.log(req.body);
    const fileStr = req.body.data;
    const album = await Album.findOne({ _id: req.body.album });
    console.log(album);
    const result = await cloudinary.uploader.upload(fileStr);
    const newImg = await Img.create({
      ...req.body,
      imgAddress: result.secure_url,
      id: result.id,
      uploader: req.session.uid,
    });
    photos = album.photos;
    photos.push(newImg);
    album.photos = photos;
    album.save();
    res.status(201);
    res.send(newImg);
    console.log(newImg);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.addLike = async (req, res) => {
  try {
    let currentPhoto = await Img.findOne({ _id: req.body._id });

    let uid = req.session.uid;
    let likers = currentPhoto.liked;

    currentPhoto.liked.contains;
    if (likers.includes(req.session.uid)) {
      // console.log(li)
      let index = likers.indexOf(req.session.uid);
      console.log(index);
      likers.splice(index, [index + 1]);
      console.log(likers);
      currentPhoto.liked = likers;
      currentPhoto.save();
    } else {
      likers.push(req.session.uid);
      console.log(likers);
      currentPhoto.liked = likers;
      currentPhoto.likes = currentPhoto.likes + 1;
      currentPhoto.save();
    }

    res.status(204);
    res.send(currentPhoto);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photoId = req.body.id;
    let result = await Img.findOneAndDelete({ _id: photoId });
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

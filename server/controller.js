const Img = require("./Models/schema");
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
    const newImg = await Img.create(req.body);
    res.status(201);
    res.send(newImg);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.addLike = async (req, res) => {
  try {
    let currentPhoto = await Img.findOne({ _id: req.body._id });
    console.log(req.body.id);
    console.log(currentPhoto);
    currentPhoto.liked = !currentPhoto.liked;
    if (currentPhoto.liked === true) {
      currentPhoto.likes += 1;
    } else if (currentPhoto.liked === false) {
      currentPhoto.likes -= 1;
    }
    currentPhoto.save();
    res.status(204);
    res.send(currentPhoto);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photoId = req.body.id;
    console.log(photoId);
    let result = await Img.findOneAndDelete({ _id: photoId });
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

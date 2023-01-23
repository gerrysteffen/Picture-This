import Image from '../models/image';
import Album from '../models/album';
// import cloudinary from 'cloudinary';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
require('dotenv').config();
import cloudinaryV2 from '../cloudinary';

const ImageControllers = {
  uploadPhoto: async (req: Request, res: Response) => {
    try {
      if (
        !req.body ||
        !req.body.album ||
        !req.body.album._id ||
        !req.body.image ||
        !req.body.image.data
      ) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const result = await cloudinaryV2.uploader.upload(req.body.image.data);
        const newImage = await Image.create({
          album: req.body.album._id,
          imgAddress: result.secure_url,
          cloudinaryId: result.public_id,
          owner: req.session.uid,
        });
        await Album.findOneAndUpdate(
          { _id: req.body.album._id },
          {
            $push: { photos: newImage._id },
          }
        );
        res.status(201).send(JSON.stringify(newImage));
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  toggleLike: async (req: Request, res: Response) => {
    try {
      if (!req.body || !req.body.image || !req.body.image._id) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        console.log(req.body.image._id)
        let currentPhoto = await Image.findOne({ _id: req.body.image._id });
        if (!currentPhoto) {
          res.status(400).send(
            JSON.stringify({
              error: '400',
              message: 'Image could not be found.',
            })
          );
        } else {
          if (!currentPhoto.liked.includes(new mongoose.Types.ObjectId(req.session.uid))) {
            await Image.findOneAndUpdate(
              { _id: req.body.image._id },
              {
                $push: { liked: req.session.uid },
              }
            );
          } else {
            await Image.findOneAndUpdate(
              { _id: req.body.image._id },
              {
                $pull: { liked: req.session.uid },
              }
            );
          }
          res.sendStatus(204);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  deletePhoto: async (req: Request, res: Response) => {
    try {
      if (!req.params || !req.params.id) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const image = await Image.findOneAndDelete({ _id: req.params.id });
        if (image && image.cloudinaryId) await cloudinaryV2.uploader.destroy(image.cloudinaryId);
        res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};

export default ImageControllers;

import { Request, Response } from 'express';
import cloudinaryV2 from '../cloudinary';
import Album from '../models/album';
import User from '../models/user';
import mongoose from 'mongoose';

import { ImageType } from '../types/index';

export default {
  getAlbum: async (req: Request, res: Response) => {
    try {
      if (!req.params || !req.params.id) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const album = await Album.findOne({ _id: req.params.id }).populate({
          path: 'photos',
          model: 'image',
        });
        if (!album) {
          res.status(400).send(
            JSON.stringify({
              error: '400',
              message: 'No album with this id.',
            })
          );
        } else if (
          !album.sharedWith.includes(new mongoose.Types.ObjectId(req.session.uid))
        ) {
          res.status(401).send(
            JSON.stringify({
              error: '401',
              message: 'Not authorised for this action.',
            })
          );
        } else {
          (album.photos as unknown as ImageType[]).sort(
            (a, b) => b.liked.length - a.liked.length
          );
          res.status(200).send(JSON.stringify(album));
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  createAlbum: async (req: Request, res: Response) => {
    try {
      if (!req.body || !req.body.album || !req.body.album.albumName) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const newAlbum = await Album.create({
          albumName: req.body.album.albumName,
          description: req.body.album.description,
          owner: req.session.uid,
          sharedWith: [req.session.uid]
        });
        await User.updateOne(
          { _id: req.session.uid },
          {
            $push: { uploadedAlbums: newAlbum._id },
          }
        );
        res.status(201).send(JSON.stringify(newAlbum));
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  modifyAlbum: async (req: Request, res: Response) => {
    try {
      if (
        !req.body ||
        !req.body.album ||
        (!req.body.album.albumName && !req.body.album.description)
      ) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const { _id, ...albumInfo } = req.body.album;
        const album = await Album.findOne({ _id: _id });
        if (!album) {
          res.status(400).send(
            JSON.stringify({
              error: '400',
              message: 'No album with this id.',
            })
          );
        } else if (
          new mongoose.Types.ObjectId(req.session.uid) !== album.owner
        ) {
          res.status(401).send(
            JSON.stringify({
              error: '401',
              message: 'Not authorised for this action.',
            })
          );
        } else {
          const newAlbum = await Album.findOneAndUpdate(
            { _id: _id },
            {
              ...albumInfo,
            },
            {
              new: true,
            }
          );
          res.status(201).send(JSON.stringify(newAlbum));
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  shareAlbum: async (req: Request, res: Response) => {
    try {
      if (
        !req.body ||
        !req.body.album ||
        !req.body.album._id ||
        !req.body.user ||
        !req.body.user.email
      ) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const album = await Album.findOne({ _id: req.body.album._id });
        const user = await User.findOne({ email: req.body.user.email });
        if (!user || !album) {
          res
            .status(400)
            .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
        } else {
          await User.findOneAndUpdate(
            { email: req.body.user.email },
            {
              $push: { pendingInvite: album._id }, // TODO Plural that shit
            }
          );
          res.status(201).send(JSON.stringify(user._id));
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  rejectAlbum: async (req: Request, res: Response) => {
    try {
      if (!req.body || !req.body.album || !req.body.album._id) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const album = await Album.findOne({ _id: req.body.album._id });
        if (!album) {
          res
            .status(400)
            .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
        } else {
          await User.updateOne(
            { _id: req.session.uid },
            {
              $pull: { pendingInvite: req.body.album._id }, // TODO Plural that shit
            }
          );
          res.sendStatus(204);
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  acceptAlbum: async (req: Request, res: Response) => {
    try {
      if (!req.body || !req.body.album || !req.body.album._id) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        await User.updateOne(
          { _id: req.session.uid },
          {
            $push: { sharedAlbums: req.body.album._id },
            $pull: { pendingInvite: req.body.album._id }, // TODO Plural that shit
          }
        );
        const newAlbum = await Album.findOneAndUpdate({
          _id: req.body.album._id,
        },{
          $push: { sharedWith: req.session.uid },
        }).populate('photos');
        res.status(201).send(JSON.stringify(newAlbum));
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  removeAlbum: async (req: Request, res: Response) => {
    try {
      if (!req.params || !req.params.id) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const album = await Album.findOne({ _id: req.params.id }).populate(
          'photos'
        );
        if (!album) {
          res
            .status(400)
            .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
        } else {
          if (String(album.owner) !== req.session.uid) {
            await User.updateOne(
              { _id: req.session.uid },
              {
                $pull: { sharedAlbums: req.params.id },
              }
            );
            await Album.updateOne({
              _id: req.params.id,
            },{
              $pull: { sharedWith: req.session.uid },
            })
            res.sendStatus(204);
          } else {
            (album.photos as unknown as ImageType[]).forEach((photo) => {
              cloudinaryV2.uploader.destroy(photo.cloudinaryId);
            });
            await Album.findOneAndDelete({
              _id: req.params.id,
            });
            res.sendStatus(204);
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

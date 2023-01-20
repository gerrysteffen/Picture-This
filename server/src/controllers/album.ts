import { Request, Response } from 'express';
import Album from '../models/album';
import User from '../models/user';

export default {
  getAlbum: async (req: Request, res: Response) => {
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
          res.status(400).send(
            JSON.stringify({
              error: '400',
              message: 'No album with this id.',
            })
          );
        } else {
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
          owner: req.session.uid,
        });
        await User.updateOne(
          { _id: req.session.uid },
          {
            $push: { uploadedAlbums: newAlbum._id },
          }
        );
        res.status(201).send(newAlbum);
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
        const newAlbum = await Album.findOne({
          _id: req.body.album._id,
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
        const album = await Album.findOne({ _id: req.params.id });
        if (!album) {
          res
            .status(400)
            .send(JSON.stringify({ error: '400', message: 'Wrong Data.' }));
        } else {
          if (String(album.owner) !== req.session.id) {
            await User.updateOne(
              { _id: req.session.uid },
              {
                $pull: { sharedAlbums: req.params.id },
              }
            );
            res.sendStatus(204);
          } else {
            await Album.deleteOne({
              _id: req.params.id,
            });
            await User.updateOne(
              { _id: req.session.uid },
              {
                $pull: { uploadedAlbums: req.params.id },
              }
            );
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

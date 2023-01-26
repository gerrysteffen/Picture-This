import User from '../models/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserType } from '../types/index';
const saltRounds = 15;


const UserControllers = {
  registerUser: async (req: Request, res: Response) => {
    try {
      if (
        !req.body ||
        !req.body.user ||
        !req.body.user.email ||
        !req.body.user.password ||
        !req.body.user.firstName ||
        !req.body.user.lastName
      ) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const previousUser = await User.findOne({ email: req.body.user.email });
        if (previousUser) {
          return res
            .status(409)
            .send({ error: '409', message: 'User already exists' });
        } else {
          const hashedPassword = await bcrypt.hash(
            req.body.user.password,
            saltRounds
          );
          const newUser = await User.create({
            email: req.body.user.email,
            password: hashedPassword,
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
          });
          req.session.uid = String(newUser._id); // TODO This could be a problem, lets see
          res.status(201).send(JSON.stringify(newUser));
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const user = (await User.findOne({ _id: req.session.uid })
        .select('-password')
        .populate([
          {
            path: 'uploadedAlbums',
            populate: [
              { path: 'photos', model: 'image' },
              { path: 'owner', model: 'user' },
            ],
          },
          {
            path: 'sharedAlbums',
            populate: [
              { path: 'photos', model: 'image' },
              { path: 'owner', model: 'user' },
            ],
          },
          {
            path: 'pendingInvite',
            populate: { path: 'owner', model: 'user' },
          },
        ])) as UserType;
      if (user) {
        user.uploadedAlbums = user.uploadedAlbums.map((album) => {
          return {
            ...album,
            photos: album.photos.sort(
              (a, b) => b.liked.length - a.liked.length
            ),
          };
        });
        user.sharedAlbums = user.sharedAlbums.map((album) => {
          return {
            ...album,
            photos: album.photos.sort(
              (a, b) => b.liked.length - a.liked.length
            ),
          };
        });
        res.status(200).send(JSON.stringify(user));
      } else {
        res
          .status(400)
          .send(JSON.stringify({ error: '404', message: 'No user found.' }));
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      if (
        !req.body ||
        !req.body.user ||
        !req.body.user.email ||
        !req.body.user.password
      ) {
        res
          .status(400)
          .send(JSON.stringify({ error: '400', message: 'Missing Data.' }));
      } else {
        const user = (await User.findOne({
          email: req.body.user.email,
        }).populate([
          {
            path: 'uploadedAlbums',
            populate: [{ path: 'photos' }, { path: 'owner' }],
          },
          {
            path: 'sharedAlbums',
            populate: [{ path: 'photos' }, { path: 'owner' }],
          },
          {
            path: 'pendingInvite',
            populate: { path: 'owner' },
          },
        ])) as UserType;
        if (!user) {
          res
            .status(401)
            .send({ error: '401', message: 'Email and/or password incorrect' });
        } else {
          const valid = await bcrypt.compare(
            req.body.user.password,
            user.password
          );
          if (valid) {
            req.session.uid = String(user._id);
            user.password = 'N/A';
            user.uploadedAlbums = user.uploadedAlbums.map((album) => {
              return {
                ...album,
                photos: album.photos.sort(
                  (a, b) => b.liked.length - a.liked.length
                ),
              };
            });
            user.sharedAlbums = user.sharedAlbums.map((album) => {
              return {
                ...album,
                photos: album.photos.sort(
                  (a, b) => b.liked.length - a.liked.length
                ),
              };
            });
            res.status(200).send(JSON.stringify(user));
          } else {
            res.status(401).send({
              error: '401',
              message: 'Email and/or password incorrect',
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  logout: async (req: Request, res: Response) => {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).send(error + 'Could not log out please try again');
      } else {
        res.clearCookie('qid');
        res.status(200).send({ message: 'Logout succesful' });
      }
    });
  },
};

export default UserControllers;

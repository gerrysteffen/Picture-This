import User from '../models/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
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
      const user = await User.findOne({ _id: req.session.uid }).populate({
        path: 'uploadedAlbums sharedAlbums pendingInvite', //TODO Never seen it like this, will refactor later
        populate: { path: 'photos' },
      });
      res.status(200).send(JSON.stringify(user));
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
        const user = await User.findOne({
          email: req.body.user.email,
        }).populate({
          path: 'uploadedAlbums sharedAlbums pendingInvite',
          populate: { path: 'photos' },
        });
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
    try {
      req.session.uid = ''
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

export default UserControllers;

import { NextFunction, Request, Response } from 'express';
import { UserType } from '../types/index';
import User from '../models/user';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.uid) {
      const user = (await User.findOne({ _id: req.session.uid })) as UserType;
      if (user) {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(501);
  }
};

export default authMiddleware;

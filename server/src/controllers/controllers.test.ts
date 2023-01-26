
import { getAlbum } from './album.controller';
import { Request, Response } from 'express';
import { Album } from './album.model';
import mongoose from 'mongoose';

describe('getAlbum', () => {
  const mockRequest = (session: any = {}): Request => {
    return {
      params: { id: 'someId' },
      session,
    } as any;
  };
  const mockResponse = (): Response => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    return res as any;
  };
  beforeEach(() => {
    jest.spyOn(Album, 'findOne').mockImplementation(() => {
      return {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({
          _id: 'someId',
          sharedWith: [new mongoose.Types.ObjectId('someId')],
          photos: [],
        }),
      };
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('returns 400 if no album id is passed', async () => {
    const req = mockRequest();
    delete req.params.id;
    const res = mockResponse();
    await getAlbum(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      JSON.stringify({ error: '400', message: 'Missing Data.' })
      );
  });
  test('returns 400 if no album with passed id exists', async () => {
    jest.spyOn(Album, 'findOne').mockImplementation(() => {
      return {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      };
    });
    const req = mockRequest();
    const res = mockResponse();
    await getAlbum(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      JSON.stringify({ error: '400', message: 'No album with this id.' })
      );
    });
    test('returns 401 if user is not authorised', async () => {
      const req = mockRequest({ uid: 'someOtherId' });
      const res = mockResponse();
      await getAlbum(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith(
        JSON.stringify({
          error: '401',
          message: 'Not authorised for'
        })
        )
      })
    }
)
    // import AlbumControllers from "./album";
    // import { Request, Response } from 'express';
    // import Album from '../models/album';
    // import mongoose from 'mongoose';
    // import express from "express";
    // import router from "../router";
    // import superTest from 'supertest';
    
    // describe('Album Controller Testing', () => {
    //   const app = express();
    //   app.use(express.json({ limit: "50mb" }));
    //   app.use(router);
    //   const request = superTest(app);
    
    //   describe('Create a User', () => {
    //     it('Should Create a User in the dB', async () => {
    //       const res1 = await request
    //         .post('/user/register')
    //         .send({user: {
    //           email: 'test@test.com ',
    //           password: 'test123',
    //           firstName: 'jesty',
    //           lastName: 'testy',
    //         }})
    
    //         expect(res1.status).toBe(201);
    
    //     })
    //   })
    // })

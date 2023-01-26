import { ObjectId } from "mongoose";

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    uid?: string,
  }
}

export interface UserType {
  _id: ObjectId,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  sharedAlbums: AlbumType[],
  pendingInvite: AlbumType[],
  uploadedAlbums: AlbumType[],
}

export interface AlbumType {
  albumName: string,
  description: string,
  photos: ImageType[],
  owner: ObjectId,
  sharedWith: ObjectId[],
}

export interface ImageType {
  album: string,
  cloudinaryId: string,
  date: string,
  imgAddress: string,
  uploader: ObjectId,
  liked: UserType[],
}
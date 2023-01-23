// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    uid?: string,
    // user?: UserType,
  }
}

export interface UserType {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  sharedAlbums: [string],
  pendingInvite: [string],
  uploadedAlbums: [string],
}

export interface AlbumType {
  albumName: string,
  description: string,
  photos: [string],
  owner: string,
}

export interface ImageType {
  album: string,
  cloudinaryId: string,
  date: string,
  imgAddress: string,
  uploader: string,
  // likes: number,
  liked: [string],
}
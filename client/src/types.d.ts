export interface UserType {
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  sharedAlbums?: AlbumType[],
  pendingInvite?: [string],
  uploadedAlbums?: AlbumType[],
}

export interface AlbumType {
  _id: string,
  albumName: string,
  date: string
  photos: PhotoType[],
  owner: string
}

export interface PhotoType {
  _id: string,
  album: string,
  date: string,
  imgAddress: string,
  liked: string[],
  uploader: string
}


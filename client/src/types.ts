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
  albumName: string,
  date: string
  photos: PhotoType[],
  owner: string
}

export interface PhotoType {
  date: string,
  imgAddress: string,
  liked: string[],
}
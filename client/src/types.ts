export interface UserType {
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  sharedAlbums?: [string],
  pendingInvite?: [string],
  uploadedAlbums?: [string],
}

export interface AlbumType {
  albumName: string,
  photos: [string],
  owner: string
}

export interface UserType {
  _id?: string,
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  sharedAlbums?: AlbumType[],
  pendingInvite?: PendingInviteType[],
  uploadedAlbums?: AlbumType[],
}

export interface PendingInviteType {
  albumName: string,
  owner: string,
  _id: string
}

export interface AlbumType {
  _id: string,
  albumName: string,
  description?: string,
  date: string
  photos: PhotoType[],
  owner: UserType
}

export interface PhotoType {
  _id: string,
  album: string,
  date: string,
  imgAddress: string,
  liked: string[],
  owner: string
}

export interface AlertType {
  severity: string, 
  message: string
}

export interface StateType {
  user: UserType | null,
  reloadRequired: Boolean,
  isLoading: Boolean,
  isAuthenticated: Boolean,
  isExistingUser: Boolean,
  activeAlert: Boolean,
  alertContent: AlertType
} 
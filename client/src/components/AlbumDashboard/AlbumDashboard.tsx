import React, { ReactElement, useEffect, useState } from 'react'
import {Divider, Typography } from '@mui/material';
import { refreshUser } from '../../ApiService';
import { AlbumType, UserType } from '../../types';
import AlbumViewer from './AlbumViewer';

interface AlbumDashboardProps {
  setCurrentUser(user: UserType): void,
  currentUser: UserType,
  currentAlbum: AlbumType,
  setCurrentAlbum: void
}

export default function AlbumDashboard({currentUser}:{currentUser: UserType | null}) {
  const [userAlbums, setUserAlbums] = useState<AlbumType[] | null>();

  useEffect(()=>{
    if (!currentUser) {
      return;
    }
    if (currentUser.uploadedAlbums) {
      setUserAlbums(currentUser.uploadedAlbums);
    }
  }, [currentUser])

  if (userAlbums) {
    return (
      <React.Fragment>
        <Typography variant='h6' sx={{marginTop:10}}>
          { currentUser && currentUser.firstName && ('Welcome Back' + currentUser.firstName)}
        </Typography>
        <Typography variant='h5' sx={{marginTop:3}}>
          My Albums
        </Typography>
        <Divider/>
        <AlbumViewer albums={userAlbums} />
        <Typography variant='h5' sx={{marginTop:3}}>
          Shared Albums
        </Typography>
        <Divider/>
        {/* <AlbumViewer /> */}
      </React.Fragment>
    )
  } else {
    return (
      <div>
        Nothing to show
      </div>
    )
  }

}

import React, { useEffect, useState } from 'react'
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

export default function AlbumDashboard({setCurrentUser, currentUser, currentAlbum, setCurrentAlbum}:AlbumDashboardProps ) {
  const [userAlbums, setUserAlbums] = useState(currentUser.uploadedAlbums);
  useEffect(() => {
    refreshUser().then( (data) => {
      const user: UserType = data;
      setCurrentUser(user);
    });
  }, [])
  return (
    <React.Fragment>
      <Typography variant='h6' sx={{marginTop:10
      }}>
        Welcome Back {currentUser.firstName}
      </Typography>
      <Typography variant='h5' sx={{marginTop:3}}>
        My Albums
      </Typography>
      <AlbumViewer />
      <Divider/>
      <Typography variant='h5' sx={{marginTop:3}}>
        Shared Albums
      </Typography>
      <Divider/>
    </React.Fragment>
  )
}

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { refreshUser } from '../../ApiService';
import { useNavigate } from "react-router-dom";
import { AlbumType, UserType } from '../../types';

interface AlbumDashboardProps {
  setCurrentUser(user: UserType): void,
  currentUser: UserType,
  currentAlbum: AlbumType,
  setCurrentAlbum: void
}

export default function AlbumDashboard({setCurrentUser, currentUser, currentAlbum, setCurrentAlbum}:AlbumDashboardProps ) {
  console.log(currentUser)
  useEffect(() => {
    refreshUser().then( (data) => {
      const user: UserType = data;
      setCurrentUser(user);
      console.log(user);
    });
  }, [])
  return (
    <React.Fragment>
      <Box sx={{m:10}}/>
      <Typography variant='h5'>
        Welcome Back {currentUser.firstName}
      </Typography>
    </React.Fragment>
  )
}

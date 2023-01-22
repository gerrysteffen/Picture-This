import React, { useEffect, useState } from 'react'
import {Divider, Typography } from '@mui/material';
import { AlbumType, UserType } from '../../types';
import AlbumViewer from './AlbumViewer';
import AddAlbumButton from './AddAlbumButton';

export default function AlbumDashboard({currentUser}:{currentUser: UserType | null}) {
  const [userAlbums, setUserAlbums] = useState<AlbumType[] | null>();
  const [sharedAlbums, setSharedAlbums] = useState<AlbumType[] | null>();

  useEffect(()=>{
    if (!currentUser) {
      return;
    }
    if (currentUser.uploadedAlbums) {
      setUserAlbums(currentUser.uploadedAlbums);
    }
    if (currentUser.sharedAlbums) {
      console.log(currentUser.sharedAlbums);
      setSharedAlbums(currentUser.sharedAlbums);
    }
  }, [currentUser])

  if (userAlbums && sharedAlbums) {
    return (
      <React.Fragment>
        <Typography variant='h6' sx={{marginTop:10}}>
          { currentUser && currentUser.firstName && ('Welcome back ' + currentUser.firstName + '!')}
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
        <AlbumViewer albums={sharedAlbums}/>
        <AddAlbumButton />
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

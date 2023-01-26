import React, { useEffect, useState } from 'react';
import { Divider, Typography } from '@mui/material';
import { AlbumType, StateType } from '../../types';
import AlbumViewer from './AlbumViewer';
import AddAlbumButton from './AddAlbumButton';
import { useSelector } from 'react-redux';

export default function AlbumDashboard() {
  const user = useSelector((state: StateType)=> state.user)
  const [userAlbums, setUserAlbums] = useState<AlbumType[] | null>();
  const [sharedAlbums, setSharedAlbums] = useState<AlbumType[] | null>();

  useEffect(() => {
    setUserAlbums(user!.uploadedAlbums);
    setSharedAlbums(user!.sharedAlbums);
  }, [user]);

  if (userAlbums && sharedAlbums) {
    return (
      <React.Fragment>
        <Typography variant='h6' sx={{ marginTop: 10 }}>
            Welcome back {user && user.firstName}!
        </Typography>
        <Typography variant='h5' sx={{ marginTop: 3 }}>
          My Albums
        </Typography>
        <Divider />
        {user && user._id && (
          <AlbumViewer
            albums={userAlbums}
            setAlbums={setUserAlbums}
            userId={user._id}
          />
        )}
        <Typography variant='h5' sx={{ marginTop: 3 }}>
          Shared Albums
        </Typography>
        <Divider />
        {user && user._id && (
          <AlbumViewer
            albums={sharedAlbums}
            setAlbums={setSharedAlbums}
            userId={user._id}
          />
        )}
        <AddAlbumButton />
      </React.Fragment>
    );
  } else {
    return <div>Nothing to show</div>; // TODO change this, and above on/off switch;
  }
}

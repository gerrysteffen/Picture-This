import React, { useEffect, useState } from 'react';
import { Divider, Typography } from '@mui/material';
import { AlbumType, UserType, StateType } from '../../types';
import AlbumViewer from './AlbumViewer';
import AddAlbumButton from './AddAlbumButton';
import { connect } from 'react-redux';

function AlbumDashboard(props: any) {
  const [userAlbums, setUserAlbums] = useState<AlbumType[] | null>();
  const [sharedAlbums, setSharedAlbums] = useState<AlbumType[] | null>();

  useEffect(() => {
    setUserAlbums(props.user.uploadedAlbums);
    setSharedAlbums(props.user.sharedAlbums);
  }, [props.user]);

  if (userAlbums && sharedAlbums) {
    return (
      <React.Fragment>
        <Typography variant='h6' sx={{ marginTop: 10 }}>
          {props.user &&
            props.user.firstName &&
            'Welcome back ' + props.user.firstName + '!'}
        </Typography>
        <Typography variant='h5' sx={{ marginTop: 3 }}>
          My Albums
        </Typography>
        <Divider />
        {props.user._id && (
          <AlbumViewer
            albums={userAlbums}
            setAlbums={setUserAlbums}
            userId={props.user._id}
          />
        )}
        <Typography variant='h5' sx={{ marginTop: 3 }}>
          Shared Albums
        </Typography>
        <Divider />
        {props.user?._id && (
          <AlbumViewer
            albums={sharedAlbums}
            setAlbums={setSharedAlbums}
            userId={props.user._id}
          />
        )}
        <AddAlbumButton />
      </React.Fragment>
    );
  } else {
    return <div>Nothing to show</div>; // TODO change this, and above on/off switch;
  }
}

const mapStateToProps = (state: StateType) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setReload: (toggle: Boolean) =>
      dispatch({ type: 'SET_RELOAD', payload: toggle }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDashboard);

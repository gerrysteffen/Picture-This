import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, PhotoType, StateType, UserType } from '../../types';
import Box from '@mui/material/Box';
import ImageDashboardToolMenu from './ImageDashboardToolMenu';
import APIs from '../../APIServices/index';
import ImagesViewer from './ImagesViewer';
import EmptyAlbumPlaceholder from './Empty-dash.png';
import './ImageDashboard.css';
import { connect } from 'react-redux';

function ImagesDashboard(props: any) {
  const [album, setAlbum] = useState<AlbumType | null>();
  const [uploadFiles, setUploadFiles] = useState(false);
  const { albumId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  useEffect(() => {
    if (albumId) {
      APIs.getAlbum(albumId).then((album: AlbumType) => {
        if (album) {
          setAlbum(album);
        }
      });
    }
  }, []);

  function handleFileSelect(event: any) {
    setSelectedFiles(event.target.files);
    setUploadFiles(true);
  }

  //Change in selected file upload new photos
  useEffect(() => {
    if (uploadFiles && album && album.photos) {
      const uploadPhotos = async () => {
        const results: (PhotoType | undefined)[] = await Promise.all(
          Array.from(selectedFiles).map(async (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const data = await new Promise((res) => {
              reader.onloadend = () => {
                res(reader.result);
              };
            });
            if (typeof albumId === 'string' && typeof data === 'string') {
              const res = (await APIs.uploadPhoto({
                album: albumId,
                data: data,
              })) as PhotoType;
              return res;
            } else {
              return undefined;
            }
          })
        );
        const sanitisedPhotos = results.filter(Boolean) as PhotoType[];
        let newAlbum = { ...album };
        newAlbum.photos.push(...sanitisedPhotos);
        setAlbum(newAlbum);
        setUploadFiles(false);
      };
      uploadPhotos();
    }
  }, [selectedFiles]);

  return (
    <React.Fragment>
      <Box sx={{ mt: 9.4, overflowY: 'visible' }}>
        <input
          id='file-input'
          type='file'
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        {album && album.photos.length > 0 && props.user._id ? (
          <ImagesViewer setAlbum={setAlbum} album={album} userId={props.user._id} />
        ) : (
          <img
            src={EmptyAlbumPlaceholder}
            alt='placeholder'
            className='empty-album-image'
          />
        )}
      </Box>
      <ImageDashboardToolMenu
        albumId={albumId}
        setSelectedFiles={setSelectedFiles}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state: StateType) => {
  return state;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setReload: (toggle: Boolean) =>
      dispatch({ type: 'SET_RELOAD', payload: toggle }),
    setLoading: (toggle: Boolean) =>
      dispatch({ type: 'SET_LOADING', payload: toggle }),
    setAlert: (active: Boolean, severity: string, message: string) =>
      dispatch({
        type: 'SET_ALERT',
        payload: {
          active: active,
          alertContent: { severity: severity, message: message },
        },
      }),
    setAuth: (toggle: Boolean) =>
      dispatch({ type: 'SET_AUTH', payload: toggle }),
    setUser: (user: UserType) => dispatch({ type: 'SET_USER', payload: user }),
    updateUser: (userAttributes: any) =>
      dispatch({ type: 'UPDATE_USER', payload: userAttributes }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesDashboard);

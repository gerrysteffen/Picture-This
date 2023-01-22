import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AlbumType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import placeholder from './placeholder.png'

export default function AlbumIcon({album}: {album: AlbumType}) {
  const navigate = useNavigate();
  function handleDelete () {
    console.log('User wants to delete', album._id);
  }
  function handleSelect () {
    console.log('User wants to view', album._id);
    const path = `/albums/${album._id}`
    navigate(path);
  }
  return (
    <ImageListItem >
      <Box >
        <img
          src={album.photos[0] ? album.photos[0].imgAddress : placeholder}
          // src={placeholder}
          alt={album.albumName}
          loading="lazy"
          height={250}
          onClick={handleSelect}
          />
          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            title={album.albumName}
            subtitle={`${album.date}`}
            actionIcon={
              <IconButton onClick={handleDelete} sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                <DeleteOutlineIcon />
              </IconButton>
            }
          />
      </Box>
    </ImageListItem>
  )
}

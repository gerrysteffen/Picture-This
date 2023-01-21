import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AlbumType } from '../../types';
import { Link } from 'react-router-dom';

export default function AlbumIcon({album}: {album: AlbumType}) {
  function handleDelete () {
    console.log('User wants to delete', album._id);
  }
  function handleSelect () {
    console.log('User wants to view', album._id);
  }
  return (
    <ImageListItem >
      {album.photos[0] ? 
      <Link to={`/albums/${album._id}`}>
        <img
          src={album.photos[0].imgAddress}
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
      </Link>
      :
      <div> No img </div>
      }
    </ImageListItem>
  )
}

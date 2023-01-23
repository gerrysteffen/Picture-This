import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AlbumType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import placeholder from './placeholder.png'
import APIs from "../../APIServices/index"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type AlbumIconType ={ 
  index: number,
  album: AlbumType,
  deleteAlbum(index:number, id:string): void,
  userId: string
} 

export default function AlbumIcon({index, album, deleteAlbum, userId}: AlbumIconType) {
  const navigate = useNavigate();
  function handleDelete () {
    deleteAlbum(index, album._id);
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
                {userId === album.owner ? (
                  <DeleteOutlineIcon />
                ):(
                  <ExitToAppIcon />
                )
              }
              </IconButton>
            }
          />
      </Box>
    </ImageListItem>
  )
}

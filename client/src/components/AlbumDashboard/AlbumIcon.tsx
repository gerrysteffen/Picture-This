import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AlbumType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import placeholder from './placeholder.png'
import EjectOutlinedIcon from '@mui/icons-material/EjectOutlined';
import './AlbumDashboard.css'
import { Paper } from '@mui/material';

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
    <Paper elevation={15} sx={{ m:5 }}>
      <ImageListItem >
        <Box sx={{height: '300px', width: '400px', display:'flex', justifyContent:'center'}}>
          <img
            className='album-img'
            src={album.photos[0] ? album.photos[0].imgAddress : placeholder}
            alt={album.albumName}
            loading="lazy"
            onClick={handleSelect}
          />
        </Box>
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
              'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
          title={album.albumName}
          subtitle={album.description}
          actionIcon={
            <IconButton onClick={handleDelete} sx={{ mr:0.5, color: 'rgba(255, 255, 255, 0.54)' }}>
              {userId === album.owner._id ? (
                <DeleteOutlineIcon />
              ):(
                <EjectOutlinedIcon />
              )
            }
            </IconButton>
          }
            />
      </ImageListItem>
    </Paper>
  )
}

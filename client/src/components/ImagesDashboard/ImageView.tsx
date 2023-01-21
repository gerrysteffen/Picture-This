import React from 'react'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { AlbumType, PhotoType } from '../../types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';

export default function ImageView({item}:{item:PhotoType}) {
  const handleLike = () =>{
    console.log('user trying to like')
  }
  const handleDelete = () =>{
    console.log('user trying to delete')
  }
  return (
    <ImageListItem key={item.imgAddress}>
      <img 
        src={item.imgAddress}
        alt={item.uploader}  
      />
      <ImageListItemBar
      sx={{
          background: 'none'
        }}
      actionIcon={
        <Box sx={{display: 'flex'}}>
          <IconButton>
            <FavoriteBorderIcon onClick={handleLike} style={{color: 'white'}}/>
          </IconButton>
          <IconButton>
            <DeleteOutlineIcon onClick={handleDelete} style={{color: 'white'}}/>
          </IconButton>
        </Box>
      }
      />
    </ImageListItem>
  )
}
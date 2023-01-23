import React, { useEffect, useState } from 'react'
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import { PhotoType } from '../../types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import APIs from "../../APIServices/index"

export default function ImageView({item, liked, index, deleteImage}:
    {item:PhotoType, liked: boolean, index:number, deleteImage(index:number):void}) 
{
  const [likedByUser, setLikedByUser] = useState(liked)
  const toggleLike = () =>{
    console.log('user trying to like')
    APIs.likePhoto(item._id);
    setLikedByUser(!likedByUser);
  }
  const handleDelete = async () =>{
    console.log('user trying to delete', item._id)
    deleteImage(index);
    APIs.deletePhoto(item._id);
  }
  return (
    <ImageListItem>
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
          {likedByUser ? (
            <IconButton onClick={toggleLike}>
              <FavoriteIcon style={{color: 'red'}} />
            </IconButton>
          ) : (
            <IconButton onClick={toggleLike}>
              <FavoriteBorderIcon  style={{color: 'white'}}/>
            </IconButton>
          )}
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon  style={{color: 'white'}}/>
          </IconButton>
        </Box>
      }
      />
    </ImageListItem>
  )
}
import React, { useEffect, useState } from 'react'
import { Badge, IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import { PhotoType } from '../../types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import APIs from "../../APIServices/index"

type ImageViewType = {
  item:PhotoType, 
  index:number, 
  deleteImage(index:number):void,
  userId: string
}

export default function ImageView({item, index, deleteImage, userId}: ImageViewType ){
  const [likedByUser, setLikedByUser] = useState(item.liked.indexOf(userId) !== -1 ? true:false)
  const [likes, setLikes] = useState(item.liked.length);

  const toggleLike = () =>{
    APIs.likePhoto(item._id);
    if (!likedByUser) {
      let likesCopy = likes + 1;
      setLikes(likesCopy);
    }
    else {
      let likesCopy = likes - 1;
      setLikes(likesCopy);
    }
    setLikedByUser(!likedByUser);

  }
  const handleDelete = async () =>{
    console.log('user trying to delete', item._id)
    deleteImage(index);
    // APIs.deletePhoto(item._id);
  }
  return (
    <ImageListItem>
      <img 
        src={item.imgAddress}
        alt={item.owner}  
      />
      <ImageListItemBar
      sx={{
          background: 'none'
        }}
      actionIcon={
        <Box sx={{display: 'flex'}}>
            {item.owner === userId && (
              <IconButton onClick={handleDelete}>
                <DeleteOutlineIcon  style={{color: 'white'}}/>
              </IconButton>
            )}
          
            <IconButton onClick={toggleLike}>
              <Badge badgeContent={likes} color='primary' >
              {likedByUser ? (
                <FavoriteIcon style={{color: 'red'}} />
              ):(
                <FavoriteBorderIcon  style={{color: 'white'}}/>
              )}
              </Badge>
            </IconButton>
        </Box>
      }
      />
    </ImageListItem>
  )
}
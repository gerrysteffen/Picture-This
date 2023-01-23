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
  liked: boolean, 
  index:number, 
  deleteImage(index:number):void,
  userId: string
}

export default function ImageView({item, liked, index, deleteImage, userId}: ImageViewType ){
  const [likedByUser, setLikedByUser] = useState(liked)
  const toggleLike = () =>{
    console.log('user trying to like')
    APIs.likePhoto(item._id);
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
          {likedByUser ? (
            <IconButton onClick={toggleLike}>
              <Badge badgeContent={item.liked.length} color='primary' >
                <FavoriteIcon style={{color: 'red'}} />
              </Badge>
            </IconButton>
          ) : (
            <IconButton onClick={toggleLike}>
              <Badge badgeContent={item.liked.length} color='primary' >
                <FavoriteBorderIcon  style={{color: 'white'}}/>
              </Badge>
            </IconButton>
          )}
          {item.owner === userId && (
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon  style={{color: 'white'}}/>
            </IconButton>
          )}
        </Box>
      }
      />
    </ImageListItem>
  )
}
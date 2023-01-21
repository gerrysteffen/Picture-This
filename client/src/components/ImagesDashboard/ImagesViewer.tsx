import React from 'react'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { AlbumType, PhotoType } from '../../types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import ImageView from './ImageView';


export default function ImagesViewer({album}:{album: AlbumType}) {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
    {album.photos.map((item) => (
      <ImageView item={item} />
    ))}
    </ImageList>
  )
}


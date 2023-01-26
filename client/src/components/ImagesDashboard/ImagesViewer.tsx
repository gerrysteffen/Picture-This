import React from 'react'
import { Box } from '@mui/material'
import { AlbumType } from '../../types'
import ImageView from './ImageView';
import { Masonry } from '@mui/lab';


type ImagesViewerType = {
  album: AlbumType, 
  setAlbum(album:AlbumType):void, 
  userId:string
}

export default function ImagesViewer({album, setAlbum, userId}:ImagesViewerType) {
  const deleteImage = (index:number) => {
    const newAlbum = {...album};
    newAlbum.photos.splice(index,1)
    setAlbum(newAlbum);
  }

  
  return (
    <Box>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg:4}}
        spacing={2}
        defaultHeight={450}
        defaultColumns={4}
        defaultSpacing={1}
      >
        {album.photos.map((item, index) => (
        <ImageView key={item._id} item={item} index={index} deleteImage={deleteImage} userId={userId} />
        ))}
      </Masonry>
    </Box>
  )
}


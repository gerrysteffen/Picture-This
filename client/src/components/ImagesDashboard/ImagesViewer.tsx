import React from 'react'
import { ImageList } from '@mui/material'
import { AlbumType } from '../../types'
import ImageView from './ImageView';

type ImagesViewerType = {
  album: AlbumType, 
  setAlbum(album:AlbumType):void, 
  userId:string
}


export default function ImagesViewer({album, setAlbum, userId}:ImagesViewerType) {
  const deleteImage = (index:number) => {
    console.log('deleting: ', index);
    const newAlbum = {...album};
    newAlbum.photos.splice(index,1)
    setAlbum(newAlbum);
  }
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
    {album.photos.map((item, index) => (
      <ImageView key={item._id} item={item} index={index} deleteImage={deleteImage} userId={userId}
      /*liked={item.liked.indexOf(userId) !== -1 ? true:false}*/ />
    ))}
    </ImageList>
  )
}


import React from 'react'
import { ImageList } from '@mui/material'
import { AlbumType } from '../../types'
import ImageView from './ImageView';


export default function ImagesViewer({album, setAlbum}:{album: AlbumType, setAlbum(album:AlbumType):void}) {
  const deleteImage = (index:number) => {
    console.log('deleting: ', index);
    const newAlbum = {...album};
    newAlbum.photos.splice(index,1)
    setAlbum(newAlbum);
  }
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
    {album.photos.map((item, index) => (
      <ImageView key={item._id} item={item} index={index} deleteImage={deleteImage}
      liked={item.liked.indexOf(album.owner) !== -1 ? true:false}/>
    ))}
    </ImageList>
  )
}


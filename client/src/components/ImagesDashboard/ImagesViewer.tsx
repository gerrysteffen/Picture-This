import React from 'react'
import { Box, ImageList } from '@mui/material'
import { AlbumType } from '../../types'
import ImageView from './ImageView';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/system';
import { Masonry } from '@mui/lab';


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
    <Box>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 4 }}
        spacing={2}
        defaultHeight={450}
        defaultColumns={4}
        defaultSpacing={1}
      >
        {album.photos.map((item, index) => (
        <ImageView key={item._id} item={item} index={index} deleteImage={deleteImage} userId={userId} />
        ))}
      </Masonry>
      {/* <Modal open={true}
      sx={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <img 
        // width="70%"
        // style={{'max-height': '80%', 'max-width':'70%'}}
        className='modal-container'
        src={item.imgAddress}
        alt={item.owner}  
      />
      </Modal> */}
    </Box>
  )
}


import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlbumType } from '../../types';
import { getAlbum } from '../../ApiClient';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageDashboardToolMenu from '../UI-Components/ImageDashboardToolMenu';

export default function ImgaesDashboard() {
  const [album, setAlbum] = useState<AlbumType | null>()
  const { albumId } = useParams();
  useEffect(() => {
    getAlbum(albumId).then(album => {
      if (album) {
        setAlbum(album);
        console.log(album);
      }
    })
  }, [])

  if (album && album.photos.length>0) {
    return (
      <React.Fragment>
        <Box sx={{mt:10, overflowY: 'scroll' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {album.photos.map((item) => (
              <ImageListItem key={item.imgAddress}>
                <img 
                  src={item.imgAddress}
                  alt={item.uploader}  
                />
              </ImageListItem>
            ))}
            </ImageList>
        </Box>
        <ImageDashboardToolMenu />
      </React.Fragment>
    )
  } else {
    return (
      <div>No Photos found</div>
    )
  }
}

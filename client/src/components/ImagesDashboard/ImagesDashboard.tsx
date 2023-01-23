import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlbumType } from '../../types';
import Box from '@mui/material/Box';
import ImageDashboardToolMenu from './ImageDashboardToolMenu';
import APIs from "../../APIServices/index"
import ImagesViewer from './ImagesViewer';

export default function ImgaesDashboard({userId}:{userId:string | undefined}) {
  const [album, setAlbum] = useState<AlbumType | null>()
  const { albumId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  useEffect(() => {
    if (albumId) {
      APIs.getAlbum(albumId).then(album => {
        if (album) {
          setAlbum(album);
        }
      })
    }
  }, [])


  function handleFileSelect(event:any) {
    setSelectedFiles(event.target.files);
  }

  //Change in selected file upload new photos
  useEffect(() => {
    if (selectedFiles.length === 1) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFiles[0]);
      reader.onloadend = () => {
        const data = reader.result;
        if (typeof albumId === 'string' && typeof data === 'string'){
          APIs.uploadPhoto({album: albumId, data: data})
          console.log('sending photo')
        }
      };
    }
  }, [selectedFiles]);

  return (
    <React.Fragment>
      <Box sx={{mt:9.4, overflowY: 'visible' }}>
        <input
          id="file-input"
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
        {album && album.photos.length>0 && userId && (<ImagesViewer setAlbum={setAlbum} album={album} userId={userId} />)}
        
      </Box>
      <ImageDashboardToolMenu albumId={albumId} setSelectedFiles={setSelectedFiles}/>
    </React.Fragment>
  )
}

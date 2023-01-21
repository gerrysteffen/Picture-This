import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlbumType } from '../../types';
import { getAlbum } from '../../ApiClient';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageDashboardToolMenu from '../UI-Components/ImageDashboardToolMenu';
import APIs from "../../APIServices/index"
import ImagesViewer from './ImagesViewer';
import { IconButton } from '@mui/material';

export default function ImgaesDashboard() {
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

  if (album && album.photos.length>0) {
    return (
      <React.Fragment>
        <Box sx={{mt:10, overflowY: 'visible' }}>
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          {/* <p>Selected files: {selectedFiles.length}</p> */}
          <ImagesViewer album={album} />
        </Box>
        <ImageDashboardToolMenu setSelectedFiles={setSelectedFiles}/>
      </React.Fragment>
    )
  } else {
    return (
      <div>No Photos found</div>
    )
  }
}

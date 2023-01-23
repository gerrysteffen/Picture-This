import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, PhotoType } from '../../types';
import Box from '@mui/material/Box';
import ImageDashboardToolMenu from '../UI-Components/ImageDashboardToolMenu';
import APIs from '../../APIServices/index';
import ImagesViewer from './ImagesViewer';

export default function ImgaesDashboard() {
  const [album, setAlbum] = useState<AlbumType | undefined>();
  const { albumId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  useEffect(() => {
    if (albumId) {
      APIs.getAlbum(albumId).then((album) => {
        if (album) {
          setAlbum(album);
        }
      });
    }
  }, []);

  function handleFileSelect(event: any) {
    setSelectedFiles(event.target.files);
  }

  //Change in selected file upload new photos
  useEffect(() => {
    if (album && album.photos) {
      const uploadPhotos = async () => {
        const results: (PhotoType | undefined)[] = await Promise.all(
          Array.from(selectedFiles).map(async (file) => {
            const reader = new FileReader();
            console.log('starting');
            reader.readAsDataURL(file);
            const data = await new Promise((res) => {
              reader.onloadend = () => {
                res(reader.result);
              };
            });
            if (typeof albumId === 'string' && typeof data === 'string') {
              const res = (await APIs.uploadPhoto({
                album: albumId,
                data: data,
              })) as PhotoType;
              return res;
            } else {
              return undefined;
            }
          })
        );
        const sanitisedPhotos = results.filter(Boolean) as PhotoType[];
        let newAlbum = { ...album };
        newAlbum.photos.push(...sanitisedPhotos);
        setAlbum(newAlbum);
      };
      uploadPhotos();
    }
  }, [selectedFiles]);

  return (
    <React.Fragment>
      <Box sx={{ mt: 9.4, overflowY: 'visible' }}>
        <input
          id='file-input'
          type='file'
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        {album && album.photos.length > 0 && (
          <ImagesViewer setAlbum={setAlbum} album={album} />
        )}
      </Box>
      <ImageDashboardToolMenu setSelectedFiles={setSelectedFiles} />
    </React.Fragment>
  );
}

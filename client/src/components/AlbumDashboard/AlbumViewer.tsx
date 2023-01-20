import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { Box } from '@mui/system';
import { AlbumType } from '../../types';
import AlbumIcon from './AlbumIcon';

export default function AlbumViewer({albums}: {albums: AlbumType[]}) {
  return (
    <ImageList sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {albums.map((album) => (
          <AlbumIcon key={album.albumName} album={album}/>
        ))}
      </Box>
    </ImageList>
  );
}


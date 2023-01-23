import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { Box } from '@mui/system';
import { AlbumType } from '../../types';
import AlbumIcon from './AlbumIcon';
import APIs from "../../APIServices/index"

export default function AlbumViewer({albums, setAlbums}: {albums: AlbumType[], setAlbums(albums:AlbumType[]):void}) {
  const deleteAlbum = (index:number, id:string) => {
    console.log('deleting album: ', id);
    const newAlbums = [...albums];
    newAlbums.splice(index,1)
    setAlbums(newAlbums);
    APIs.deleteAlbum(id);
  }
  return (
    <ImageList sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {albums.map((album, index) => (
          <AlbumIcon key={album.albumName} index={index} album={album} deleteAlbum={deleteAlbum}/>
        ))}
      </Box>
    </ImageList>
  );
}


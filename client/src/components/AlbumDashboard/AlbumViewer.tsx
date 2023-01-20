import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import { AlbumType } from '../../types';

export default function AlbumViewer({albums}: {albums: AlbumType[]}) {
  return (
    <ImageList sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {albums.map((album) => (
          <ImageListItem key={album.albumName}>
            {album.photos[0] ? 
            <React.Fragment>
              <img
                src={album.photos[0].imgAddress}
                alt={album.albumName}
                loading="lazy"
                height={250}
                />
                <ImageListItemBar
                  title={album.albumName}
                  subtitle={`${album.date}`}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  }
                />
            </React.Fragment>
            :
            <div> No img </div>
            }
          </ImageListItem>
        ))}
      </Box>
    </ImageList>
  );
}
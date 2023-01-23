import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ShareAlbumDialog from './ShareAlbumDialog';
import ImageDashboardPopUp from './ImageDashboardPopUp';

type ImageDashboardToolMenuType = {
  setSelectedFiles:any,
  albumId: string | undefined
}

export default function ImageDashboardToolMenu( {setSelectedFiles, albumId}:ImageDashboardToolMenuType ) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('click')
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [shareAlbumOpen, setShareAlbumOpen] = React.useState(false);
  const openShareAlbumDialogue = () => {
    setShareAlbumOpen(true);
  }
  return (
    <React.Fragment>
      <Box sx={{ position: 'fixed', bottom: 20, right: 20}}>
        <Fab color="primary" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </Fab>
      </Box>
      <ImageDashboardPopUp anchorEl={anchorEl} openShareAlbumDialogue={openShareAlbumDialogue} 
        open={open} handleClose={handleClose}/>
      <ShareAlbumDialog albumId={albumId} shareAlbumOpen={shareAlbumOpen} setShareAlbumOpen={setShareAlbumOpen} />
    </React.Fragment>
  );
}

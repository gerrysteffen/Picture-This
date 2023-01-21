import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import ShareAlbumDialog from './ShareAlbumDialog';

export default function ImageDashboardToolMenu({setSelectedFiles}:{setSelectedFiles:any}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: -9,
            ml: -1.25,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 123,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <label htmlFor="file-input" style={{margin: 0, padding:0}}>
        <MenuItem>
          <IconButton >
            <AddPhotoAlternateIcon fontSize='small'/>
          </IconButton>
          Add Photos
        </MenuItem>
        </label>
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize='small'/>
          </ListItemIcon>
          Rename Album
        </MenuItem>
        <MenuItem onClick={openShareAlbumDialogue}>
          <ListItemIcon >
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          Share Album
        </MenuItem>
      </Menu>

      <ShareAlbumDialog shareAlbumOpen={shareAlbumOpen} setShareAlbumOpen={setShareAlbumOpen} />

    </React.Fragment>
  );
}

import React from 'react'
import CollectionsIcon from '@mui/icons-material/Collections';
import { Box, Fab } from '@mui/material';
import CreateAlbumDialog from './CreateAlbumDialog';

export default function AddAlbumButton() {
  const [createAlbumOpen, setCreateAlbumOpen] = React.useState(false);
  const openCreateAlbumDialogue = () => {
    setCreateAlbumOpen(true);
  }

  return (
    <React.Fragment>
      <Box sx={{ position: 'fixed', bottom: 20, right: 20}}>
        <Fab variant="extended" color="primary" aria-label="add" onClick={openCreateAlbumDialogue}>
          <CollectionsIcon sx={{ mr: 1 }}/>
          Add Album
        </Fab>
      </Box>
      <CreateAlbumDialog createAlbumOpen={createAlbumOpen} setCreateAlbumOpen={setCreateAlbumOpen} />
    </React.Fragment>
  )
}

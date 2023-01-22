import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateAlbumDialog({createAlbumOpen, setCreateAlbumOpen}:{createAlbumOpen: boolean, setCreateAlbumOpen(shareAlbumOpen:boolean):void}) {
  const closeCreateAlbumDialogue = () => {
    setCreateAlbumOpen(false);
  }
  return (
    <Dialog open={createAlbumOpen} onClose={closeCreateAlbumDialogue}>
    <DialogTitle>Create New Album</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To create a new album, please add a title and give it a short description!
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Album Title"
        type="title"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Album Description"
        type="title"
        fullWidth
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={closeCreateAlbumDialogue}>Cancel</Button>
      <Button onClick={closeCreateAlbumDialogue}>Add</Button>
    </DialogActions>
  </Dialog>
  );
}
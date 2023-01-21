import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ShareAlbumDialog({shareAlbumOpen, setShareAlbumOpen}:{shareAlbumOpen: boolean, setShareAlbumOpen(shareAlbumOpen:boolean):void}) {
  const closeShareAlbumDialogue = () => {
    setShareAlbumOpen(false);
  }
  return (
    <Dialog open={shareAlbumOpen} onClose={closeShareAlbumDialogue}>
    <DialogTitle>Share Album</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To share this album with someone else, please enter their email address below. We
        will send them an invite to join!
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={closeShareAlbumDialogue}>Cancel</Button>
      <Button onClick={closeShareAlbumDialogue}>Send Invite</Button>
    </DialogActions>
  </Dialog>
  );
}
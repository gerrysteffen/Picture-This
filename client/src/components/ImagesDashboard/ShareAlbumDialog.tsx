import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import APIs from "../../APIServices/index"

type ShareAlbumDialogType = {
  shareAlbumOpen: boolean, 
  setShareAlbumOpen(shareAlbumOpen:boolean):void,
  albumId: string | undefined
}

export default function ShareAlbumDialog({shareAlbumOpen, setShareAlbumOpen, albumId}:ShareAlbumDialogType ) {
  const [email, setEmail] = useState('');

  const closeShareAlbumDialogue = () => {
    setEmail('');
    setShareAlbumOpen(false);
  }
  const sendInvite = () => {
    if (albumId) {
      // console.log(email, albumId);
      APIs.shareAlbumRequest(email, albumId);
    }
    closeShareAlbumDialogue();
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
        value={email}
        onChange={(newEmail) => setEmail(newEmail.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={closeShareAlbumDialogue}>Cancel</Button>
      <Button onClick={sendInvite}>Send Invite</Button>
    </DialogActions>
  </Dialog>
  );
}
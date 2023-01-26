import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import APIs from '../../APIServices/index';
import { useNavigate } from 'react-router-dom';

type CreateAlbumDialogType = {
  createAlbumOpen: boolean;
  setCreateAlbumOpen(shareAlbumOpen: boolean): void;
};

export default function CreateAlbumDialog({
  createAlbumOpen,
  setCreateAlbumOpen,
}: CreateAlbumDialogType) {
  const [albumName, setAlbumName] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');

  const navigate = useNavigate();

  const closeCreateAlbumDialogue = () => {
    setAlbumName('');
    setAlbumDescription('');
    setCreateAlbumOpen(false);
  };

  const createAlbum = async () => {
    const newAlbum = await APIs.createAlbum(albumName, albumDescription);
    closeCreateAlbumDialogue();
    navigate(`/albums/${newAlbum._id}`);
  };

  return (
    <Dialog open={createAlbumOpen} onClose={closeCreateAlbumDialogue}>
      <DialogTitle>Create New Album</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new album, please add a title and give it a short
          description!
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='Album Title'
          fullWidth
          variant='standard'
          value={albumName}
          onChange={(newValue) => setAlbumName(newValue.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          id='description'
          label='Album Description'
          fullWidth
          variant='standard'
          value={albumDescription}
          onChange={(newValue) => setAlbumDescription(newValue.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCreateAlbumDialogue}>Cancel</Button>
        <Button onClick={createAlbum}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

import React from 'react'
import { IconButton, MenuItem } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { PendingInviteType } from '../../types';
import APIs from "../../APIServices/index"

type InviteHandlerType = {
  invite:PendingInviteType, 
  index:number, 
  handleClose(event: Event | React.SyntheticEvent):void,
  deleteInvite(index:number):void,
}

export default function InviteHandler({invite, index, handleClose, deleteInvite}: InviteHandlerType) {
  const handleAcceptInvite = () => {
    console.log('Accepting invite');
    APIs.acceptInvite(invite._id);
    deleteInvite(index);
  }
  const handleDeclineInvite = () => {
    console.log('Declining invite');
    APIs.rejectAlbum(invite._id);
    deleteInvite(index);
  }
  return (
    <MenuItem onClick={handleClose}>
      {invite.albumName}
      <IconButton sx={{ml:2}} onClick={handleAcceptInvite}>
        <CheckIcon />
      </IconButton>
      <IconButton onClick={handleDeclineInvite}>
        <ClearIcon />
      </IconButton>
    </MenuItem>
  )
}

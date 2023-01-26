import React from 'react'
import { IconButton, MenuItem } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import APIs from "../../APIServices/index"
import { useDispatch } from 'react-redux';
import { setReload } from '../../Redux/actions';

export default function InviteHandler(props: any) {
  const dispatch = useDispatch()

  const handleAcceptInvite = async () => {
    await APIs.acceptInvite(props.invite._id);
    props.deleteInvite(props.index);
    dispatch(setReload(true))
  }
  const handleDeclineInvite = async () => {
    await APIs.rejectAlbum(props.invite._id);
    props.deleteInvite(props.index);
  }
  return (
    <MenuItem onClick={props.handleClose}>
      {props.invite.albumName}
      <IconButton sx={{ml:2}} onClick={handleAcceptInvite}>
        <CheckIcon />
      </IconButton>
      <IconButton onClick={handleDeclineInvite}>
        <ClearIcon />
      </IconButton>
    </MenuItem>
  )
}

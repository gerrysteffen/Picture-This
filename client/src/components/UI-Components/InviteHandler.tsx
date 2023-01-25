import React from 'react'
import { IconButton, MenuItem } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import APIs from "../../APIServices/index"
import { connect } from 'react-redux';

function InviteHandler(props: any) {
  const handleAcceptInvite = async () => {
    console.log('Accepting invite');
    await APIs.acceptInvite(props.invite._id);
    props.deleteInvite(props.index);
    await props.setReload(true)
  }
  const handleDeclineInvite = async () => {
    console.log('Declining invite');
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setReload: (toggle: Boolean) =>
      dispatch({ type: 'SET_RELOAD', payload: toggle }),
  };
};

export default connect(null, mapDispatchToProps)(InviteHandler);

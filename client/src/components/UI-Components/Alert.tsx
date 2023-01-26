import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../types';

export default function AlertMessage() {
  const alertContent = useSelector((state:StateType) => state.alertContent)

  return (
    <Box sx={{ position:'absolute', top:'80px', width: '100%', display:'flex', justifyContent: 'center' }}>
      <Alert sx={{ width: '90%' }} severity={alertContent.severity as AlertColor}>
        {alertContent.message}
      </Alert>
    </Box>
  );
}

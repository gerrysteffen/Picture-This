import Typography from '@mui/material/Typography';
import React from 'react';

export default function Copyright(props:any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Picture This! '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
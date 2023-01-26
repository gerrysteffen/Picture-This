import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingScreen() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <CircularProgress />
    </div>
  );
}

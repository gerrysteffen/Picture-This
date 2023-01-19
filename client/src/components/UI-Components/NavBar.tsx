import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'black'
  },
}));

export default function NavBar() {
  const classes = useStyles();
  let navigate = useNavigate();
  const logout = () => navigate('/');
  const goHome = () => navigate('/profile');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{color: 'black',  backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className={classes.root}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <HomeIcon onClick={goHome}/>
          </IconButton>
          <Box sx={{ flexGrow: 1 , p:1.5}}>
            <img height="35" src='../picture-this1.png' alt='Logo'/>
          </Box>
          <IconButton
            size="large"
            color="inherit">
            <LogoutIcon onClick={logout}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
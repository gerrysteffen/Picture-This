import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import APIs from '../../APIServices/index'

export default function NavBar(props: any) {
  let navigate = useNavigate();
  const logout = async () => {
    props.setIsAuthenticated(false)
    // localStorage.removeItem('isAuthenticated');
    await APIs.logout()
  }
  const goHome = () => navigate('/');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{color: 'black',  backgroundColor: 'rgba(223, 225, 226, 0.9)' }}>
        <Toolbar>
          <IconButton
            onClick={goHome}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 , p:1.5}}>
            <img height="35" src='../picture-this1.png' alt='Logo'/>
          </Box>
          <IconButton
            onClick={()=>logout()}
            size="large"
            color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
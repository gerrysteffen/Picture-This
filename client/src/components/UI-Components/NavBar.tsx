import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import APIs from '../../APIServices/index'
import NotificationDropDown from './NotificationDropDown';
import { setAuth, setUser } from '../../Redux/actions';
import { useDispatch } from 'react-redux';

export default function NavBar() {
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const goHome = () => navigate('/');
  
  const logout = async () => {
    dispatch(setAuth(false))
    dispatch(setUser(null))
    await APIs.logout();
    goHome();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ color: 'black', backgroundColor: 'rgba(223, 225, 226, 0.9)' }}
      >
        <Toolbar>

          <IconButton
            onClick={goHome}
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 2 }}
            >
            <HomeIcon 
            data-testid='home-icon'
            />
          </IconButton>

          <Box sx={{ flexGrow: 1 , p:1.5}}>
            <img height="35" src='../picture-this1.png' alt='Logo'/>
          </Box>

          <NotificationDropDown /> 

          <IconButton
            onClick={()=>logout()}
            size="large"
            color="inherit">
            <LogoutIcon 
              data-testid='logout-icon'
            />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
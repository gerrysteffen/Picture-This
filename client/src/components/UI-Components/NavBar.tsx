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
import { UserType } from '../../types';
import { connect } from 'react-redux';

function NavBar(props: any) {
  let navigate = useNavigate();

  const goHome = () => navigate('/');
  
  const logout = async () => {
    props.setAuth(false)
    props.setUser(null) // TODO Test
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
            <HomeIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 , p:1.5}}>
            <img height="35" src='../picture-this1.png' alt='Logo'/>
          </Box>

          <NotificationDropDown /> 

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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAuth: (toggle: Boolean) =>
      dispatch({ type: 'SET_AUTH', payload: toggle }),
    setUser: (user: UserType) => dispatch({ type: 'SET_USER', payload: user }),
  };
};

export default connect(null, mapDispatchToProps)(NavBar);
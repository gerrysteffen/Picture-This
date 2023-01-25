import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/UI-Components/NavBar';
import AlbumDashboard from './components/AlbumDashboard/AlbumDashboard';
import APIs from './APIServices/index';
import { StateType, UserType } from './types';
import SignIn from './components/Auth-Components/SignIn';
import SignUp from './components/Auth-Components/SignUp';
import LoadingScreen from './components/UI-Components/LoadingScreen';
import ImagesDashboard from './components/ImagesDashboard/ImagesDashboard';
import AlertMessage from './components/UI-Components/Alert';
import { connect } from 'react-redux';

function App(props: any) {
  useEffect(() => {
    const userLoad = async () => {
      const res = await APIs.refreshUser();
      if (res.error) {
        console.log(res.message);
        props.setAuth(false);
        props.setReload(false); // TODO only one of the two required?
        props.setLoading(false);
      } else {
        props.setUser(res);
        props.setAuth(true);
        props.setReload(false);
        props.setLoading(false);
      }
    };
    props.reloadRequired && userLoad();
  }, [props.reloadRequired]);

  useEffect(() => {
    props.activeAlert &&
      setTimeout(() => {
        props.setAlert(false, 'error', 'Something went wrong.');
      }, 5000);
  }, [props.activeAlert]);

  if (props.isLoading) return <LoadingScreen />;

  if (!props.isAuthenticated && props.isExistingUser)
    return (
      <div>
        {props.activeAlert && <AlertMessage />}
        <SignIn />
      </div>
    );

  if (!props.isAuthenticated && !props.isExistingUser)
    return (
      <div>
        {props.activeAlert && <AlertMessage />}
        <SignUp />
      </div>
    );

  return (
    <div>
      {props.activeAlert && <AlertMessage />}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={<AlbumDashboard />}
          />
          <Route
            path='/albums/:albumId'
            element={<ImagesDashboard userId={props.user._id} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state: StateType) => {
  return state;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setReload: (toggle: Boolean) =>
      dispatch({ type: 'SET_RELOAD', payload: toggle }),
    setLoading: (toggle: Boolean) =>
      dispatch({ type: 'SET_LOADING', payload: toggle }),
    setAlert: (active: Boolean, severity: string, message: string) =>
      dispatch({
        type: 'SET_ALERT',
        payload: {
          active: active,
          alertContent: { severity: severity, message: message },
        },
      }),
    setAuth: (toggle: Boolean) =>
      dispatch({ type: 'SET_AUTH', payload: toggle }),
    setUser: (user: UserType) => dispatch({ type: 'SET_USER', payload: user }),
    updateUser: (userAttributes: any) =>
      dispatch({ type: 'UPDATE_USER', payload: userAttributes }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

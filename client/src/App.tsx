import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavBar from './components/UI-Components/NavBar';
import AlbumDashboard from './components/AlbumDashboard/AlbumDashboard';
import APIs from './APIServices/index';
import { StateType } from './types';
import SignIn from './components/Auth-Components/SignIn';
import SignUp from './components/Auth-Components/SignUp';
import LoadingScreen from './components/UI-Components/LoadingScreen';
import ImagesDashboard from './components/ImagesDashboard/ImagesDashboard';
import AlertMessage from './components/UI-Components/Alert';
import { setAlert, setAuth, setLoading, setReload, setUser } from './Redux/actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function App() {
  const user = useSelector((state: StateType) =>state.user)
  const reloadRequired = useSelector((state: StateType) =>state.reloadRequired)
  const isLoading = useSelector((state: StateType) =>state.isLoading)
  const isAuthenticated = useSelector((state: StateType) =>state.isAuthenticated)
  const isExistingUser = useSelector((state: StateType) =>state.isExistingUser)
  const activeAlert = useSelector((state: StateType) =>state.activeAlert)

  const dispatch = useDispatch()

  useEffect(() => {
    const userLoad = async () => {
      const res = await APIs.refreshUser();
      if (res.error) {
        console.log(res.message);
        dispatch(setAuth(false));
        dispatch(setReload(false));
        dispatch(setLoading(false));
      } else {
        dispatch(setUser(res));
        dispatch(setAuth(true));
        dispatch(setReload(false));
        dispatch(setLoading(false));
      }
    };
    reloadRequired && userLoad();
  }, [reloadRequired]);

  useEffect(() => {
    activeAlert &&
      setTimeout(() => {
        dispatch(setAlert(false, 'error', 'Something went wrong.'));
      }, 5000);
  }, [activeAlert]);

  setInterval(async ()=>{
    const res = await APIs.refreshUser();
      if (res.error) {
        console.log(res.message);
        dispatch(setAuth(false));
        dispatch(setReload(false));
        dispatch(setLoading(false));
      } else {
        if (res.pendingInvite.length !== user!.pendingInvite.length) {
          dispatch(setUser(res));
        }
      }
  },2000) // TODO this doesnt work properly

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated && isExistingUser)
    return (
      <div>
        {activeAlert && <AlertMessage />}
        <SignIn />
      </div>
    );

  if (!isAuthenticated && !isExistingUser)
    return (
      <div>
        {activeAlert && <AlertMessage />}
        <SignUp />
      </div>
    );

  return (
    <div>
      {activeAlert && <AlertMessage />}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={<AlbumDashboard />}
          />
          <Route
            path='/albums/:albumId'
            element={<ImagesDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

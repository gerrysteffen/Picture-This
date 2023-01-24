import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/UI-Components/NavBar';
import AlbumDashboard from './components/AlbumDashboard/AlbumDashboard';
import APIs from './APIServices/index';
import { StateType, UserType } from './types';
import SignIn from './components/Auth-Components/SignIn';
import SignUp from './components/Auth-Components/SignUp';
import LoadingScreen from './components/UI-Components/LoadingScreen';
import ImgaesDashboard from './components/ImagesDashboard/ImagesDashboard';
import AlertMessage from './components/UI-Components/Alert';
import { connect } from 'react-redux';

function App(props: any) {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(true);
  // const [activeAlert, setActiveAlert] = useState(false);
  // const [alertContent, setAlertContent] = useState({
  //   severity: 'error',
  //   message: 'Something went wrong.',
  // });

  useEffect(() => {
    const initialSetup = async () => {
      const res = await APIs.refreshUser();
      if (res.error) {
        console.log(res.message);
        props.loadingOFF(false);
      } else {
        setCurrentUser(res);
        setIsAuthenticated(true);
        props.loadingOFF(false);
      }
    };
    initialSetup();
  }, []);

  const handleAlert = (severity: string, message: string) => {
    if (severity === ('error' || 'warning' || 'info' || 'success') && message) {
      props.submitAlertON(severity, message);
    } else {
      props.submitAlertON()
    }
    setTimeout(() => {
      props.submitAlertOFF();
    }, 5000);
  };

  const authUtils: {} = {
    setCurrentUser: setCurrentUser,
    setIsExistingUser: setIsExistingUser,
    setIsAuthenticated: setIsAuthenticated,
    handleAlert: handleAlert,
  };

  if (props.isLoading) return <LoadingScreen />;

  if (!isAuthenticated && isExistingUser)
    return (
      <div>
        {props.activeAlert && (
          <AlertMessage
            verticalPosition='10px'
            data-testid='login'
            alertContent={props.alertContent}
          />
        )}
        <SignIn authUtils={authUtils} />
      </div>
    );

  if (!isAuthenticated && !isExistingUser)
    return (
      <div>
        {props.activeAlert && (
          <AlertMessage verticalPosition='10px' alertContent={props.alertContent} />
        )}
        <SignUp authUtils={authUtils} />
      </div>
    );

  return (
    <div>
      {props.activeAlert && (
        <AlertMessage verticalPosition='80px' alertContent={props.alertContent} />
      )}
      <BrowserRouter>
        {currentUser && (
          <NavBar
            currentUser={currentUser}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
        <Routes>
          <Route
            path='/'
            element={<AlbumDashboard currentUser={currentUser} />}
          />
          <Route
            path='/albums/:albumId'
            element={<ImgaesDashboard userId={currentUser?._id} />}
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
    submitAlertON: (severity: string, message: string) => dispatch({type: 'ALERT_ON', payload: {severity: severity, message: message}}),
    submitAlertOFF: () => dispatch({type: 'ALERT_ON', payload: null}),
    loadingOFF: () => dispatch({type: 'LOADING_OFF', payload: null})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

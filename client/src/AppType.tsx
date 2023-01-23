import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/UI-Components/NavBar";
import AlbumDashboard from "./components/AlbumDashboard/AlbumDashboard";
import APIs from "./APIServices/index";
import { UserType } from "./types";
import SignIn from "./components/Auth-Components/SignIn";
import SignUp from "./components/Auth-Components/SignUp";
import ImgaesDashboard from "./components/ImagesDashboard/ImagesDashboard";
import NavAlert from "./components/UI-Components/Alert";

function AppType() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isExistingUser, setIsExistingUser] = useState(true)
  const [activeAlert, setActiveAlert] = useState(false)
  const [alertContent, setAlertContent] = useState({severity: 'error', message: 'Something went wrong'})

  useEffect(() => {
    const initialSetup = async () => {
      const res = await APIs.refreshUser()
      if (res.error) {
        console.log(res.message)
      } else {
        setCurrentUser(res);
        setIsAuthenticated(true)
      }
    }
    initialSetup()
  }, [])

  const handleAlert = (severity: string, message: string) => {
    if (severity === ('error' || 'warning' || 'info' || 'success') && message) setAlertContent({severity: severity, message: message})
    setActiveAlert(true)
    setTimeout(()=>{
      setActiveAlert(false)
      setAlertContent({severity: 'error', message: 'Something went wrong'})
    }, 5000)
  }

  const authUtils: {} = {
    setCurrentUser: setCurrentUser,
    setIsExistingUser: setIsExistingUser,
    setIsAuthenticated: setIsAuthenticated,
    handleAlert: handleAlert
  }

  if (!isAuthenticated && isExistingUser) return(
    <div>
      {activeAlert && <NavAlert verticalPosition='10px' alertContent={alertContent} />}
      <SignIn  authUtils={authUtils} />
    </div>
  )

  if (!isAuthenticated && !isExistingUser) return(
    <div>
      {activeAlert && <NavAlert verticalPosition='10px' alertContent={alertContent} />}
      <SignUp authUtils={authUtils} />
    </div>
  )

  return (
    <div>
      <BrowserRouter>
        <NavBar setIsAuthenticated={setIsAuthenticated} />
        {activeAlert && <NavAlert verticalPosition='80px' alertContent={alertContent} />}
        <Routes>
          <Route
            path="/"
            element={
              <AlbumDashboard
                currentUser={currentUser}
                // currentAlbum={currentAlbum}
                // setCurrentAlbum={setCurrentAlbum}
              />
            }
          />
          <Route path="/albums/:albumId" element={<ImgaesDashboard />} />
          {/* <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          /> */}
          {/* <Route
            path="/main"
            element={
              <Main
                currentAlbum={currentAlbum}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          /> */}
          {/* <Route path="/new" element={<NewAlbum />} /> */}
          {/* <Route
            path="/profile"
            element={
              <Profile
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                currentAlbum={currentAlbum}
                setCurrentAlbum={setCurrentAlbum}
              />
            }
          /> */}
          {/* <Route path="/help" element={<Invites currentUser={currentUser} />} />
          <Route
            path="/main-share"
            element={
              <MainShare
                currentAlbum={currentAlbum}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppType;

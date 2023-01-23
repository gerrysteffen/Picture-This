import Main from "./components/Archive/Main";
import Login from "./components/Archive/Login";
import Profile from "./components/Archive/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Archive/Register";
import NewAlbum from "./components/Archive/NewAlbum";
import { useEffect, useState } from "react";
import Invites from "./components/Archive/Invites";
import MainShare from "./components/Archive/MainShare";
import NavBar from "./components/UI-Components/NavBar";
import AlbumDashboard from "./components/AlbumDashboard/AlbumDashboard";
import APIs from "./APIServices/index";
import { UserType } from "./types";
import SignIn from "./components/UI-Components/SignIn";
import SignUp from "./components/UI-Components/SignUp";
import ImgaesDashboard from "./components/ImagesDashboard/ImagesDashboard";

function AppType() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isExistingUser, setIsExistingUser] = useState(true)

  useEffect(() => {
    const initialSetup = async () => {
      // const bool = Boolean(localStorage.getItem('isAuthenticated'));
      // setIsAuthenticated(bool)
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

  const authUtils: {} = {
    setCurrentUser: setCurrentUser,
    setIsExistingUser: setIsExistingUser,
    setIsAuthenticated: setIsAuthenticated
  }

  if (!isAuthenticated && isExistingUser) return(
    <div>
      <SignIn authUtils={authUtils} />
    </div>
  )

  if (!isAuthenticated && !isExistingUser) return(
    <div>
      <SignUp authUtils={authUtils} />
    </div>
  )

  return (
    <div>
      <BrowserRouter>
        {currentUser && (<NavBar setIsAuthenticated={setIsAuthenticated} currentUser={currentUser}/>)}
        <Routes>
          <Route
            path="/"
            element={
              <AlbumDashboard
                currentUser={currentUser}/>
            }
          />
          <Route path="/albums/:albumId" element={<ImgaesDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppType;

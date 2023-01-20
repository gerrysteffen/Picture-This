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
import ImgaesDashboard from "./components/ImagesDashboard/ImgaesDashboard";

function AppType() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState();

  useEffect(() => {
    APIs.refreshUser().then( (data) => {
      const user: UserType = data;
      setCurrentUser(user);
    });
  }, [])


  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/1"
            element={
              <AlbumDashboard
                currentUser={currentUser}
                // currentAlbum={currentAlbum}
                // setCurrentAlbum={setCurrentAlbum}
              />
            }
          />
          <Route path="/albums/:albumId" element={<ImgaesDashboard />} />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/"
            element={<Register setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/main"
            element={
              <Main
                currentAlbum={currentAlbum}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
          <Route path="/new" element={<NewAlbum />} />
          <Route
            path="/profile"
            element={
              <Profile
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                currentAlbum={currentAlbum}
                setCurrentAlbum={setCurrentAlbum}
              />
            }
          />
          <Route path="/help" element={<Invites currentUser={currentUser} />} />
          <Route
            path="/main-share"
            element={
              <MainShare
                currentAlbum={currentAlbum}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppType;

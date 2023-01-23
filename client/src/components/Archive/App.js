import Main from "./Main";
import Login from "./Login";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import NewAlbum from "./NewAlbum";
import { useState } from "react";
import Invites from "./Invites";
import MainShare from "./MainShare";
import NavBar from "../UI-Components/NavBar";
import AlbumDashboard from "../AlbumDashboard/AlbumDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentAlbum, setCurrentAlbum] = useState({});
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
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
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/"
            element={<Register setCurrentUser={setCurrentUser} />}
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
          <Route
            path="/1"
            element={
              <AlbumDashboard
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

export default App;

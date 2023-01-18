import Main from "./components/Main";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import NewAlbum from "./components/NewAlbum";
import { useState } from "react";
import Invites from "./components/Invites";
import MainShare from "./components/MainShare";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentAlbum, setCurrentAlbum] = useState({});
  return (
    <div>
      <BrowserRouter>
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

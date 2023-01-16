import Main from "./components/Main";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import NewAlbum from "./components/NewAlbum";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentAlbum, setCurrentAlbum] = useState({});
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/main"
            element={<Main currentAlbum={currentAlbum} />}
            setCurrentUser={setCurrentUser}
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
                currentUser={currentUser}
                currentAlbum={currentAlbum}
                setCurrentAlbum={setCurrentAlbum}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

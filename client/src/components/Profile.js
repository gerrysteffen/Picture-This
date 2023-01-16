import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

import NewAlbum from "./NewAlbum";
import AlbumItem from "./AlbumItem";
function Profile(props) {
  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const [userAlbums, setUserAlbums] = useState(currentUser.uploadedAlbums);
  const [albumPopup, setAlbumPopup] = useState(false);
  const navigate = useNavigate();

  const addHandle = () => {
    setAlbumPopup(!albumPopup);
  };

  useEffect(() => {}, [userAlbums]);

  let individualAlbums = userAlbums.map((album) => {
    return (
      <AlbumItem
        album={album}
        setUserAlbums={setUserAlbums}
        currentAlbum={props.currentAlbum}
        setCurrentAlbum={props.setCurrentAlbum}
      />
    );
  });

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="right-container">
          <div>
            <h1>My albums</h1>
          </div>

          <div className="albums">{individualAlbums}</div>
          <div>
            <h1>Shared albums</h1>
          </div>
          <div className="albums"></div>
        </div>
      </div>
      <div className="add-photo" onClick={addHandle}>
        +
      </div>
      <div className="invite-alert" onClick={addHandle}>
        +
      </div>
      {albumPopup ? (
        <div className="add-album">
          <NewAlbum
            setUserAlbums={setUserAlbums}
            userAlbums={userAlbums}
            setAlbumPopup={setAlbumPopup}
          />{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;

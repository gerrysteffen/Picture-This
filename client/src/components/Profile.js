import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../ApiClient";
import NewAlbum from "./NewAlbum";
import AlbumItem from "./AlbumItem";
import Invites from "./Invites";
import SharedAlbumItem from "./SharedAlbumItem";
function Profile(props) {
  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const [userAlbums, setUserAlbums] = useState(currentUser.uploadedAlbums);
  const [sharedAlbums, setSharedAlbums] = useState(currentUser.sharedAlbums);
  const [albumPopup, setAlbumPopup] = useState(false);
  const [pendingInvite, setPendingInvite] = useState(
    props.currentUser.pendingInvite
  );
  const [invitePopup, setInvitePopup] = useState(false);
  const navigate = useNavigate();

  const addHandle = () => {
    setAlbumPopup(!albumPopup);
  };
  const inviteHandle = () => {
    setInvitePopup(!invitePopup);
  };
  // useEffect(() => {console.log('inside profile' ,pendingInvite)}, [userAlbums, pendingInvite]);

  let individualAlbums = userAlbums.map((album) => {
    return (
      <AlbumItem
        album={album}
        userAlbums={userAlbums}
        setUserAlbums={setUserAlbums}
        currentAlbum={props.currentAlbum}
        setCurrentAlbum={props.setCurrentAlbum}
      />
    );
  });
  let friendAlbums = sharedAlbums.map((album) => {
    return (
      <SharedAlbumItem
        album={album}
        setUserAlbums={setUserAlbums}
        sharedAlbums={sharedAlbums}
        currentAlbum={props.currentAlbum}
        setSharedAlbums={setSharedAlbums}
        setCurrentAlbum={props.setCurrentAlbum}
      />
    );
  });

  return (
    <div>
      <Navbar setCurrentUser={setCurrentUser} />
      <br></br>
      <div className="profile">
        <div className="right-container">
          <h2 className="username">
            Welcome back {props.currentUser.firstName}
          </h2>
          <div>
            <h2>My albums</h2>
          </div>

          <div className="albums">{individualAlbums}</div>
          <div>
            <h2>Shared albums</h2>
          </div>
          <div className="albums">{friendAlbums}</div>
        </div>
      </div>
      <div className="add-photo" onClick={addHandle}>
        +
      </div>
      {pendingInvite.length ? (
        <div className="invite-alert" onClick={inviteHandle}>
          <img src="../invite.png"></img>
        </div>
      ) : (
        ""
      )}
      {albumPopup ? (
        <div className="add-album">
          <NewAlbum
            setUserAlbums={setUserAlbums}
            userAlbums={userAlbums}
            setAlbumPopup={setAlbumPopup}
          />
        </div>
      ) : (
        ""
      )}
      {invitePopup ? (
        <Invites
          setInvitePopup={setInvitePopup}
          sharedAlbums={sharedAlbums}
          setSharedAlbums={setSharedAlbums}
          currentUser={currentUser}
          setPendingInvite={setPendingInvite}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;

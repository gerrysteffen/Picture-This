import React from "react";
import Photo from "./Photo";
function MainAlbum(props) {
  let individualPics = props.photos.map((photo) => {
    return (
      <div>
        <Photo
          currentAlbum={props.currentAlbum}
          upDatePhotos={props.upDatePhotos}
          key={photo._id}
          photo={photo}
          setLargePhoto={props.setLargePhoto}
          setLargePhotoActive={props.setLargePhotoActive}
          currentUser={props.currentUser}
        />
      </div>
    );
  });

  return individualPics;
}

export default MainAlbum;

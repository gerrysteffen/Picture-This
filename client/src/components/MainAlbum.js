import React from "react";
import Photo from "./Photo";
function MainAlbum(props) {
  let individualPics = props.photos.map((photo) => {
    return (
      <div>
        <Photo
          upDatePhotos={props.upDatePhotos}
          key={photo._id}
          photo={photo}
        />
      </div>
    );
  });

  return <div className="album">{individualPics}</div>;
}

export default MainAlbum;

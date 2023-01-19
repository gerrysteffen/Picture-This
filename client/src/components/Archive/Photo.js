import React, { useState, useEffect } from "react";
import { likePhoto, deletePhoto } from "../../ApiClient";

function Photo(props) {
  const [like, setLike] = useState(true);
  const user = props.currentUser._id;
  const likedBy = props.photo.liked;
  const owner = props.currentAlbum.owner;
  const uploader = props.photo.uploader;
  function deleteHandle() {
    deletePhoto(props.photo._id);
    props.upDatePhotos(props.photo._id);
  }
  function likeHandle() {
    likePhoto(props.photo._id);

    setLike(!like);
  }

  function largeHandle() {
    console.log(props.photo.imgAddress);
    props.setLargePhoto(props.photo.imgAddress);
    props.setLargePhotoActive(true);
  }
  useEffect(() => {
    console.log("owner", owner);
    console.log("user", user);
    if (likedBy.indexOf(user) === -1) {
      setLike(false);
    }
  }, []);

  return (
    <div className="photo-box">
      <img alt="hurro" src={props.photo.imgAddress} onClick={largeHandle}></img>
      {(user === owner || user === uploader) && (
        <div className="bin" onClick={deleteHandle}>
          <img src="../bin.png"></img>
        </div>
      )}

      <div className="heart" onClick={likeHandle}>
        {like ? (
          <div className="like">
            <img src="../fullHeart.png"></img>
          </div>
        ) : (
          <div className="like">
            <img src="../emptyHeart.png"></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default Photo;

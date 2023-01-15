import React, { useState } from "react";
import { likePhoto, deletePhoto } from "../ApiClient";
import { ReactComponent as Bin } from "./images/delete.svg";

import { ReactComponent as Like } from "./images/like.svg";

import { ReactComponent as Unlike } from "./images/unlike.svg";

function Photo(props) {
  const [like, setLike] = useState(props.photo.liked);

  function deleteHandle() {
    deletePhoto(props.photo._id);
    props.upDatePhotos(props.photo._id);
  }
  function likeHandle() {
    likePhoto(props.photo._id);
    console.log(props.photo._id);
    setLike(!like);
  }

  function largeHandle() {
    console.log(props.photo.imgAddress);
    props.setLargePhoto(props.photo.imgAddress);
    props.setLargePhotoActive(true);
  }

  return (
    <div className="photo-box" onClick={largeHandle}>
      <img alt="hurro" src={props.photo.imgAddress}></img>
      <div className="bin" onClick={deleteHandle}>
        <Bin />
      </div>

      <div className="heart" onClick={likeHandle}>
        {like ? (
          <div className="like">
            {" "}
            <Unlike />{" "}
          </div>
        ) : (
          <div className="like">
            {" "}
            <Like />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Photo;

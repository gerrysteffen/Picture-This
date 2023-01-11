import React, { useState } from "react";
import emptyHeart from "./images/emptyHeart.png";
import { likePhoto, deletePhoto } from "../ApiClient";

function Photo(props) {
  const [like, setLike] = useState(props.photo.liked);

  function deleteHandle() {
    deletePhoto(props.photo._id);
  }
  function likeHandle() {
    likePhoto(props.photo.id);
    console.log(like);
    setLike(!like);
    console.log(like);
  }
  return (
    <div className="photo">
      <img alt="hurro" src={props.photo.imgAddress}></img>
      <div onClick={deleteHandle} className="delete">
        <button>X</button>
      </div>

      <div className="heart" onClick={likeHandle}>
        {like ? (
          <button onClick={likeHandle}>unlike</button>
        ) : (
          <button onClick={likeHandle}>like</button>
        )}
      </div>
    </div>
  );
}

export default Photo;

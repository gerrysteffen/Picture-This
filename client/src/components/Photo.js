import React, { useState , useEffect} from "react";
import { likePhoto, deletePhoto } from "../ApiClient";
import { ReactComponent as Bin } from "./images/delete.svg";

import { ReactComponent as Like } from "./images/like.svg";

import { ReactComponent as Unlike } from "./images/unlike.svg";

function Photo(props) {
   

  const [like, setLike] = useState(true);
 const user = props.currentUser._id
 const likedBy = props.photo.liked
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
  useEffect(()=>{
    console.log( likedBy)
    if (likedBy.indexOf(user) === -1){
      setLike(false)
    }
  },[])

  return (
    <div className="photo-box">
      <img alt="hurro" src={props.photo.imgAddress}  onClick={largeHandle}></img>
      <div className="bin" onClick={deleteHandle}>
        <img src="../bin.png"></img>
      </div>

      <div className="heart" onClick={likeHandle}>
        {like ? (
          <div className="like">
           <img src = '../fullHeart.png'></img>
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

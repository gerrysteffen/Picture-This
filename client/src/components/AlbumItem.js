import React from "react";
import { uploadPhoto } from "../ApiClient";
import { useNavigate } from "react-router-dom";
function AlbumItem(props) {
  const navigate = useNavigate();
  const openAlbum = () => {
    console.log(props.album);
    props.setCurrentAlbum(props.album)
    navigate("/main");
  };

  return (
    <div className="album-item" onClick={openAlbum}>
      <img
        alt="album"
        src=" https://res.cloudinary.com/du13z5eh1/image/upload/v1673599988/iszlyduddj7o308xeqfj.png"
      ></img>
      {props.album.albumName && <p>{props.album.albumName}</p>}
    </div>
  );
}

export default AlbumItem;

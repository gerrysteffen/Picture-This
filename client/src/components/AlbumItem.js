import React from "react";
import { uploadPhoto, getAlbum } from "../ApiClient";
import { useNavigate } from "react-router-dom";
function AlbumItem(props) {
  const navigate = useNavigate();

  const openAlbum = async () => {
    const currentAlbum = await getAlbum(props.album._id);
    console.log(currentAlbum);
    props.setCurrentAlbum(currentAlbum);
    navigate("/main");
  };

  return (
    <div className="album-item" onClick={openAlbum}>
      {props.album.photos[0] && (
        <img alt="album" src={props.album.photos[0].imgAddress}></img>
      )}
      {props.album.albumName && <p>{props.album.albumName}</p>}
    </div>
  );
}

export default AlbumItem;

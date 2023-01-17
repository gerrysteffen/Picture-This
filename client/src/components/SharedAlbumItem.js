import React from 'react';
import { uploadPhoto, getAlbum, removeSharedAlbum} from "../ApiClient";
import { useNavigate } from "react-router-dom";
function SharedAlbumItem(props) {
    const navigate = useNavigate();
    const removeAlbum = async () => {
      console.log("remove shared and ting");
      removeSharedAlbum(props.album._id);
      let newAlbumCollection = props.sharedAlbums;
      console.log(newAlbumCollection);
      const index = newAlbumCollection.findIndex((element) => {
        return element._id === props.album._id;
      });
      newAlbumCollection.splice(index, 1);
      props.setSharedAlbums([...newAlbumCollection]);
      console.log(props.userAlbums);
    };
    const openAlbum = async () => {
      const currentAlbum = await getAlbum(props.album._id);
      props.setCurrentAlbum(currentAlbum);
      navigate("/main");
    };
  
    return (
      <div className="album-item">
        {props.album.photos[0] ? 
          <img
            onClick={openAlbum}
            alt="album"
            src={props.album.photos[0].imgAddress}
          ></img>:<h1 onClick={openAlbum}>+</h1>
        }<div className='bin' onClick={removeAlbum}><img src ='../bin.png'></img></div>
       
        {props.album.albumName && <p>{props.album.albumName}</p>}
      </div>
    );
  }
  
export default SharedAlbumItem;
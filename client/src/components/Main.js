import { getAllPhotos } from "../ApiClient";

import { useState, useEffect } from "react";
import MainAlbum from "./MainAlbum";
import Uploader from "./Uploader";
import Popular from "./Popular";
import Navbar from "./Navbar";
import EnlargedPhoto from "./EnlargedPhoto";
function Main(props) {
  const [photos, setPhotos] = useState(props.currentAlbum.photos);
  const [popularPhotos, setPopularPhotos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [largePhoto, setLargePhoto] = useState("");
  const [largePhotoActive, setLargePhotoActive] = useState(false);

  
  const sortByFavourites = async () => {
    let allPhotos = await getAllPhotos();
    allPhotos.sort((a, b) => {
      return b.likes - a.likes;
    });
    setPopularPhotos(allPhotos);
  };

  const upDatePhotos = (id) => {
    let upDatedPhotos = photos.filter((obj) => {
      return obj._id !== id;
    });
    setPhotos(upDatedPhotos);
  };

  useEffect(() => {
    // getAllPhotos()
    //   .then((data) => setPhotos(data))
    //   .catch((err) => console.log(err));
    console.log(photos)
    sortByFavourites();
  }, []);

  return (
    <div className="main-container">
      <div>
        {" "}
        <Navbar />
      </div>

      <div className="top-div">
        <Popular popularPhotos={popularPhotos} />
      </div>
      <div className="main-album">
        <MainAlbum
          photos={photos}
          upDatePhotos={upDatePhotos}
          setLargePhoto={setLargePhoto}
          setLargePhotoActive={setLargePhotoActive}
        />
      </div>
      {showUpload && (
        <Uploader
          setShowUpload={setShowUpload}
          photos={photos}
          setPhotos={setPhotos}
          currentAlbum= {props.currentAlbum}
        />
      )}
      {largePhotoActive && (
        <EnlargedPhoto
          setLargePhotoActive={setLargePhotoActive}
          largePhoto={largePhoto}
        />
      )}
      <div onClick={setShowUpload} className="add-photo">
        +
      </div>
    </div>
  );
}

export default Main;

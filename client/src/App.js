import { getAllPhotos } from "./ApiClient";
import "./App.css";
import { useState, useEffect } from "react";
import MainAlbum from "./components/MainAlbum";
import Upload from "./components/Upload";
import Popular from "./components/Popular";
function App() {
  const [photos, setPhotos] = useState([]);

  const sortByFavourites = async (array) => {
    let allPhotos = await getAllPhotos();
    allPhotos.sort((a, b) => {
      return b.likes - a.likes;
    });
  };

  const upDatePhotos = (id) => {
    let upDatedPhotos = photos.filter((obj) => {
      return obj._id !== id;
    });
    setPhotos(upDatedPhotos);
  };

  useEffect(() => {
    getAllPhotos()
      .then((data) => setPhotos(data))

      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-container">
      <div className="title">
        <h1>The Big Day!!!</h1>{" "}
      </div>

      <Popular photos={photos} />

      <div className="main-album">
        <MainAlbum photos={photos} upDatePhotos={upDatePhotos} />
      </div>
      <Upload />
    </div>
  );
}

export default App;

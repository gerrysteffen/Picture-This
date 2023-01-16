import React, { useState } from "react";

function Uploader(props) {
  const [fileInputState] = useState("");

  const [previewSource, setPreviewSource] = useState();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    props.setShowUpload(false);
    e.preventDefault();
    if (!previewSource) return;
    console.log(props.currentAlbum);
    uploadImage({ album: props.currentAlbum._id, data: previewSource });
  };

  const uploadImage = async (obj) => {
    try {
      const result = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
          "Access-Control-Allow-Methods":
            "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        },
        credentials: "include",
      });
      const newImg = await result.json();
      console.log(newImg);
      const newArr = [newImg, ...props.photos];
      props.setPhotos(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="uploader">
      <div className="exit">X</div>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
          multiple
        />
        <button className="btn" type="submit">
          {" "}
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}

export default Uploader;

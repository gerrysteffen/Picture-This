import React, { useState } from "react";

function Uploader(props) {
  const [fileInputState,] = useState("");
 
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

  const handleSubmitFile = (e) =>{
    props.setShowUpload(false)
    e.preventDefault()
    if(!previewSource) return
    uploadImage(previewSource)
  }

const uploadImage = async (base64Encoded) =>{
   
    try {
        
      const result =  await fetch('http://localhost:4000/upload', {
            method: "POST",
            body: JSON.stringify({data: base64Encoded}),
            headers: {"Content-Type" : " application/json"}
        })
        const newImg = await result.json()
        console.log(newImg)
        const newArr = [ newImg , ...props.photos]
        props.setPhotos(newArr)
    } catch (error) {
        console.log(error)
    }
}

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
        />
        <button className="btn" type="submit">
          {" "}
          Submit
        </button>
      </form>
      {previewSource && (<img src={previewSource} alt = 'chosen' style={{height: '300px'}}/>)}
    </div>
  );
}

export default Uploader;

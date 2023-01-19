import React from "react";

function EnlargedPhoto(props) {
  function close() {
    props.setLargePhotoActive(false);
  }
  return (
    <div className="enlarged-photo">
      <img src={props.largePhoto} alt="Big"></img>
      <div className="close">
        <p onClick={close}>close</p>
      </div>
    </div>
  );
}

export default EnlargedPhoto;

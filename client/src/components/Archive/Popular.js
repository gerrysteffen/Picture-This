import React, { useEffect, useState } from "react";
import { ReactComponent as Ring } from "../images/logo.svg";

function Popular(props) {
  let [currentPhoto, setCurrentPhoto] = useState(0);

  let popularPhotos = props.popularPhotos.slice(0, 5);

  useEffect(() => {
    setTimeout(() => {
      if (currentPhoto < 4) {
        setCurrentPhoto(currentPhoto + 1);
      } else {
        setCurrentPhoto(0);
      }
    }, 5000);
  }, [currentPhoto]);

  return (
    <div className="pop">
      <div></div>
      <div className="popular">
        <h2>Most Popular</h2>
        {popularPhotos[currentPhoto] && (
          <img alt="popular" src={popularPhotos[currentPhoto].imgAddress}></img>
        )}
      </div>
    </div>
  );
}

export default Popular;

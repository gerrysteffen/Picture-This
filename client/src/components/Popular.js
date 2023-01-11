import React, { useEffect, useState } from "react";

function Popular(props) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  let favourites = [props.photos];
  favourites.sort((a, b) => {
    return b.likes - a.likes;
  });
  favourites = favourites.slice(0, 5);
  useEffect(() => {
    console.log(favourites);
    console.log(props.photos);
  }, []);

  return (
    <div className="popular">
      <img></img>
    </div>
  );
}

export default Popular;

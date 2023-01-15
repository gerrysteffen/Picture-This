import React from "react";
import { useState } from "react";
import { createAlbum } from "../ApiClient";
function NewAlbum(props) {
  const initialState = {
    albumName: "",
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { albumName } = state;
    const album = { albumName };
    console.log(album);
    let newAlbum = await createAlbum(album);
    console.log(newAlbum)
    const newAlbumList = [newAlbum , ...props.userAlbums]
    props.setUserAlbums(newAlbumList)
    // const res = await reg(user);
    // // console.log({res})
    // if (res.status === 409) {
    //   alert(`${res.message}`);
    //   setState(initialState);
    //   setExists(true)
    // } else {

    //  navigate('/main');

    // }
  };

  //   const loginHandle = () =>{
  //     navigate("/login")}

  const validateForm = () => {
    return !state.albumName;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));


  };

  return (
    <section className="register">
      <br></br>

      <h1>The Big Day</h1>
      <br></br>
      <h2>New Album</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Album name"
          name="albumName"
          value={state.albumName}
          onChange={handleChange}
        />
        <br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Create Album&nbsp;
        </button>
      </form>
    </section>
  );
}

export default NewAlbum;

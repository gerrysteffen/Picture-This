import React from "react";
import { useState } from "react";
import { shareAlbumRequest } from "../../ApiClient";
function ShareAlbum(props) {
  const initialState = {
    email: "",
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = state;
    const res = await shareAlbumRequest({
      email: email,
      albumId: props.currentAlbum._id,
    });
    // const album = { albumName };
    props.setSharePopup(false);
    // let newAlbum = await createAlbum(album);
    let shared = props.sharedAlbums;
    shared.push(res);
    props.setSharedAlbums(shared);
  };
  const validateForm = () => {
    return !state.email;
  };
  const close = () => {
    props.setSharePopup(false);
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

      <br></br>
      <div className="top-right" onClick={close}>
        X
      </div>
      <h2>Share Album </h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Share Album&nbsp;
        </button>
      </form>
    </section>
  );
}

export default ShareAlbum;

import React from 'react';
import { useState } from 'react';
import {shareAlbumRequest} from '../ApiClient'
function ShareAlbum(props) {

    const initialState = {
        email: "",
      };
      const [state, setState] = useState(initialState);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { email } = state;
    const res = await  shareAlbumRequest({email: email, albumId: props.currentAlbum._id})
        // const album = { albumName };
        props.setSharePopup(false)
        // let newAlbum = await createAlbum(album);
        let shared = props.sharedAlbums
        shared.push(res)
        props.setSharedAlbums(shared)
    
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
        return !state.email;
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
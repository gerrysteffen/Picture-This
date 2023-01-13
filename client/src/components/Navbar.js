import React from "react";
import { useNavigate } from "react-router-dom";
import {out}  from '../ApiClient'


function Navbar(props) {
let navigate = useNavigate()
  const logout = ()=>{
    out()
    navigate('/')
  }
  
  return <div className="nav-bar">

 <div className="logout">
  <p>Home</p>
 </div>

 <div className="logout"><p>New Album </p></div>
 <div className="logout"><p>Settings</p></div>
    <div className="logout" onClick={logout}>
      <p>Logout</p>
    </div>
  </div>;
}

export default Navbar;

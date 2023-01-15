import React from "react";
import { useNavigate } from "react-router-dom";
import { out } from "../ApiClient";
import {ReactComponent as Home }from './images/home.svg'
import {ReactComponent as Logout} from './images/logout.svg'

function Navbar(props) {
  let navigate = useNavigate();
  const logout = () => {
    out();
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <div className="logout" onClick={() => navigate("/profile")}>
        <Home />
      </div>

      <div
        className="logout"
        onClick={() => {
          navigate("/new");
        }}
      >
        <p>New Album </p>
      </div>
     
      <div className="logout" onClick={logout}>
        <Logout />
      </div>
    </div>
  );
}

export default Navbar;

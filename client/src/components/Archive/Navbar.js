import React from "react";
import { useNavigate } from "react-router-dom";
import { out, login, refreshUser } from "./ApiClient";
import { ReactComponent as Home } from "../images/home.svg";
import { ReactComponent as Logout } from "../images/logout.svg";

function Navbar(props) {
  let navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  const handleHome = async () => {
    let user = await refreshUser();
    console.log(props);
    props.setCurrentUser(user);
    navigate("/profile");
  };
  return (
    <div className="nav-bar">
      <div className="home" onClick={handleHome}>
        <img src="../camera.png"></img>
      </div>
      <div className="picture-this">
        <img src="../picturethis2.png"></img>
      </div>

      <div className="logout-icon" onClick={logout}>
        <img src="../logout.png"></img>
      </div>
    </div>
  );
}

export default Navbar;

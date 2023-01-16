import React from "react";
import { useNavigate } from "react-router-dom";
import { out, login } from "../ApiClient";
import { ReactComponent as Home } from "./images/home.svg";
import { ReactComponent as Logout } from "./images/logout.svg";

function Navbar(props) {
  let navigate = useNavigate();
  const logout = () => {
    out();
    navigate("/");
  };
  const handleHome = async () => {
    navigate("/home");
  };
  return (
    <div className="nav-bar">
      <div className="logout" onClick={handleHome}>
        <Home />
      </div>

      <div className="logout-icon" onClick={logout}>
        <Logout />
      </div>
    </div>
  );
}

export default Navbar;

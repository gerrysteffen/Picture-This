import React from "react";
import { useNavigate } from "react-router-dom";
import { out, login,  refreshUser} from "../ApiClient";
import { ReactComponent as Home } from "./images/home.svg";
import { ReactComponent as Logout } from "./images/logout.svg";

function Navbar(props) {
  let navigate = useNavigate();
  const logout = () => {
   
    navigate("/");
  };
  const handleHome = async () => {
    let user = await refreshUser()
    console.log(props)
    props.setCurrentUser(user)
    navigate("/profile");
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

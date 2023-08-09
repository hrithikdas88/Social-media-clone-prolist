import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { AiFillMessage, AiFillNotification } from "react-icons/ai";
import { MdHelp } from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null  }));
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/home")}>
        BeyondPosts
      </div>

      <div className="icon-buttons">
        <div className="icon-button">
          <AiFillMessage />
        </div>
        <div className="icon-button">
          <AiFillNotification />
        </div>
        <div className="icon-button">
          <MdHelp />
        </div>
      </div>

      <div className="user-profile">
        <h1>{fullName}</h1>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;


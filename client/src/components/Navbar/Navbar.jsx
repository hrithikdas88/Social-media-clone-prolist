import React from "react";
import { CSSTransition } from "react-transition-group";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { AiFillMessage, AiFillNotification } from "react-icons/ai";
import { MdHelp } from "react-icons/md";
import useNavbarLogic from "./useNavbarLogic"; // Adjust the import path

import "./Navbar.scss";

const Navbar = () => {
  const {
    fullName,
    showNavbar,
    isNavigating,
    handleLogout,
    handleNavigate,
  } = useNavbarLogic();

  return (
    <div>
      <CSSTransition in={showNavbar} timeout={300} classNames="navbar-transition">
        <div className="navbar">
          <div className="logo" onClick={handleNavigate}>
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
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </CSSTransition>
      {isNavigating && <LoadingAnimation />}
    </div>
  );
};

export default Navbar;

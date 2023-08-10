import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import "./Navbar.scss";
import { AiFillMessage, AiFillNotification } from "react-icons/ai";
import { MdHelp } from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const [showNavbar, setShowNavbar] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout({ token: null }));
    setShowNavbar(false);
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleNavigate = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/home");
      setIsNavigating(false);
    }, 500);
  };

  return (
    <div>
      <CSSTransition
        in={showNavbar}
        timeout={300}
        classNames="navbar-transition"
      >
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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage/UserImage";
import "./User.scss";

const User = ({ userId, name, occupation, picturePath }) => {
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user?._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const handleClick = () => {
    navigate(`/profile/${userId}`);
    // navigate(0); // This line might not be necessary, check your navigation logic
  };

  return (
    <div className="user-container">
      <div className="user-info" onClick={handleClick}>
        <div className="user-image">
          <UserImage image={picturePath} size="55px" />
        </div>
        <div className="user-details">
          <h5>{name}</h5>
          <p>{occupation}</p>
        </div>
      </div>
      {/* Render any additional components or actions here */}
    </div>
  );
};

export default User;

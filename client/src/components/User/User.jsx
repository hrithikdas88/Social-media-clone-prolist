import React from "react";
import UserImage from "components/UserImage/UserImage";
import useUser from "./useUser";
import "./User.scss"

const User = ({ userId, name, picturePath }) => {
  const { handleUserClick } = useUser({ userId });

  return (
    <div className="user-container">
      <div className="user-info" onClick={handleUserClick}>
        <div className="user-image">
          <UserImage image={picturePath} size="55px" />
        </div>
        <div className="user-details">
          <h5>{name}</h5>
        </div>
      </div>
    </div>
  );
};

export default User;

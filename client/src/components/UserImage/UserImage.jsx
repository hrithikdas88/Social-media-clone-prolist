import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <div className="user-image" style={{ width: size, height: size }}>
      <img
        className="user-image__img"
        style={{ objectFit: "cover", borderRadius: "50%", width: size, height: size }}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;

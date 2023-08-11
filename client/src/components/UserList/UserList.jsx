import React from "react";
import User from "../User/User";
import useUserList from "./useUserList";

const UserList = () => {
  const { displayedUsers } = useUserList();
  if (!Array.isArray(displayedUsers)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-list-container">
      <div className="user-list">
        {displayedUsers.map((user) => (
          <User
            key={user?._id}
            userId={user?._id}
            name={`${user.firstName} ${user.lastName}`}
            occupation={user.occupation}
            picturePath={user.picturePath}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;

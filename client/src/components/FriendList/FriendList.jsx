import React from "react";
import Friend from "../Friend/Friend";
import "./FriendList.scss";
import useFriendList from "./useFriendList";

const FriendList = ({ userId, isProfile }) => {
  const friends = useFriendList({ userId });

  console.log(friends);

  if (!Array.isArray(friends)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="friend-list-container">
      <h5 className="widget-title">Connections</h5>
      {friends.length === 0 ? (
        <div className="no-connections-message">No Connections Yet</div>
      ) : (
        <div className="friend-list">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend?.firstName} ${friend?.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
              isProfile={isProfile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../../store/authSlice";
import Friend from "../Friend/Friend";
import "./FriendList.scss";

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state?.user?.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log(data + "test");
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Array.isArray(friends)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="friend-list-container">
      <h5 className="widget-title">Connections</h5>
      <div className="friend-list">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend?.firstName} ${friend?.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;

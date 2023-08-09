import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "store/authSlice";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import UserProfile from "components/UserProfile/UserProfile";
import Feed from "components/Feed/Feed";
import MyPost from "components/MyPost/MyPost";
import FriendList from "components/FriendList/FriendList";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar/Navbar";
import MessageInbox from "components/MessageInbox/MessageInbox";

const HomePage = () => {
  //const friends = useSelector((state) => state.user.friends);
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar/>
    <div className="main-div">
      
      <div className="profile-message">
        <div className="profile">
          <UserProfile userId={_id} picturePath={picturePath} />
        </div>
        <div className="message">
          {/* <h1>message</h1> */}
          <MessageInbox/>
        </div>
      </div>
      <div className="addpost-feed">
        <div className="addpost">
          <MyPost />
        </div>
        <div className="feed">
          <Feed  />
        </div>
      </div>
      <div className="friend-list">
        <div className="freindlist">
          <FriendList userId={_id} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;

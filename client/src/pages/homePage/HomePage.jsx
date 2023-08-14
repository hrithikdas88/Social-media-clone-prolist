import React from "react";
import "./HomePage.scss";
import UserProfile from "components/UserProfile/UserProfile";
import Feed from "components/Feed/Feed";
import MyPost from "components/MyPost/MyPost";
import FriendList from "components/FriendList/FriendList";
import Navbar from "components/Navbar/Navbar";
import MessageInbox from "components/MessageInbox/MessageInbox";
import UserList from "components/UserList/UserList";
import useHomePageData from "./useHomePageData";

const HomePage = () => {
  const { user } = useHomePageData();

  return (
    <div>
      <Navbar />
      <div className="main-div">
        <div className="profile-message">
          <div className="profile">
            <UserProfile userId={user._id} picturePath={user.picturePath} />
          </div>
          <div className="message">
            <MessageInbox />
          </div>
        </div>
        <div className="addpost-feed">
          <div className="addpost">
            <MyPost />
          </div>
          <div className="feed">
            <Feed />
          </div>
        </div>
        <div className="friend-list">
          <div className="freindlist">
            <FriendList userId={user._id} />
          </div>
          <div className="people-you-know">
            <h2>People You May Know</h2>
            <UserList picturePath={user.picturePath} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React from "react";
import useProfileData from "./useProfileData";
import FriendList from "../../components/FriendList/FriendList";
import Feed from "../../components/Feed/Feed";
import UserProfile from "../../components/UserProfile/UserProfile";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const { user, userId, handleNavigate, isLoggingOut } = useProfileData();
  if (!user) return <LoadingAnimation />;

  return (
    <>
      <div className="logoss" onClick={handleNavigate}>
        PostBeyond
      </div>

      <div className="profile-page">
        <div className="user-widget-container">
          <div className="user-profile">
            {user.picturePath && (
              <UserProfile userId={userId} picturePath={user.picturePath} />
            )}
          </div>
          <div className="friendlist">
            <FriendList userId={userId} isProfile />
          </div>
        </div>
        <div className="posts-widget-container">
          <Feed userId={userId} isProfile />
        </div>
      </div>
      {isLoggingOut && <LoadingAnimation />}
    </>
  );
};

export default ProfilePage;

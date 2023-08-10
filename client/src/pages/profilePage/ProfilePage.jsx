import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Navbar from "scenes/navbar";
import FriendList from "../../components/FriendList/FriendList";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
import Feed from "../../components/Feed/Feed";
import UserProfile from "../../components/UserProfile/UserProfile";

import "./ProfilePage.scss"; // Import the SCSS styles
import Navbar from "components/Navbar/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(user, "userdata...");

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="user-widget-container">
          <div className="user-profile">
            <UserProfile userId={userId} picturePath={user.picturePath} />
          </div>
          <div className="friendlist">
            <FriendList userId={userId} />
          </div>
        </div>
        <div className="posts-widget-container">
          <Feed userId={userId} isProfile />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserProfile.scss"; // Import the SCSS file
import {
  MdManageAccounts,
  MdExplore,
  MdWorkspacePremium,
  MdOutlineEdit,
} from "react-icons/md";
import UserImage from "components/UserImage/UserImage";
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";

const UserProfile = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [showUserProfile, setShowUserProfile] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false)

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
  };

  const handleNavigate = () => {
    setShowUserProfile(false);
    setIsNavigating(true);
    setTimeout(() => {
      navigate(`/profile/${userId}`);
    }, 250); // Delay for 0.25 seconds
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;



  return (
    <div className="UserWidget">
      {/* FIRST ROW */}
      <div className="user-row" onClick={handleNavigate}>
        <div className="user-info">
          <div className="user-image">
            <UserImage image={picturePath} />
          </div>
          <div className="user-details">
            <h4 className="user-name">
              {firstName} {lastName} <MdManageAccounts />
            </h4>
            <p className="user-friends">{friends.length} friends</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* SECOND ROW */}
      <div className="location-row">
        <MdExplore />
        <p className="location-text">{location}</p>
      </div>
      <div className="occupation-row">
        <MdWorkspacePremium />
        <p className="occupation-text">{occupation}</p>
      </div>

      <div className="divider" />

      {/* THIRD ROW
      <div className="views-row">
        <p className="views-label">Who's viewed your profile</p>
        <p className="views-count">{viewedProfile}</p>
      </div>
      <div className="impressions-row">
        <p className="impressions-label">Impressions of your post</p>
        <p className="impressions-count">{impressions}</p>
      </div>

      <div className="divider" /> */}

      {/* FOURTH ROW */}
      <div className="social-profiles">Social Profiles</div>

      <div className="social-row">
        <div className="social-details">
          <img
            src="../assets/twitter.png"
            alt="twitter"
            className="social-image"
          />
          <div>
            <p className="social-title">Twitter</p>
            <p className="social-description">Social Network</p>
          </div>
        </div>
        <MdOutlineEdit />
      </div>

      <div className="social-row">
        <div className="social-details">
          <img
            src="../assets/linkedin.png"
            alt="linkedin"
            className="social-image"
          />
          <div>
            <p className="social-title">Linkedin</p>
            <p className="social-description">Network Platform</p>
          </div>
        </div>
        <MdOutlineEdit />
      </div>
    </div>
  );
};

export default UserProfile;

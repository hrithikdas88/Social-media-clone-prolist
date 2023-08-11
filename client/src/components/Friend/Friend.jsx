import React from "react";
import { MdPersonRemoveAlt1, MdPersonAddAlt1 } from "react-icons/md";
import UserImage from "components/UserImage/UserImage";
import "./Friend.scss";
import useFriendInteraction from "./useFriendInteraction";

const Friend = ({ friendId, name, subtitle, userPicturePath , isProfile}) => {
  const { isSelf, isFriend, patchFriend, navigateToProfile } =
    useFriendInteraction({ friendId });

  return (
    <div className="friend-container">
      <div className="friend-info" onClick={navigateToProfile}>
        <div className="user-image">
          <UserImage image={userPicturePath} size="55px" />
        </div>
        <div className="user-details">
          <h5>{name}</h5>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="button-container">
        {!isProfile && !isSelf && (
          <button
            className={`friend-action ${isFriend ? "remove" : "add"}`}
            onClick={patchFriend}
          >
            {isFriend ? <MdPersonRemoveAlt1 /> : <MdPersonAddAlt1 />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Friend;

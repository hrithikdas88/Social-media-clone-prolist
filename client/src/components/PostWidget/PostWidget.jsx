import React from "react";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import "./PostWidget.scss";
import Friend from "../Friend/Friend";
import usePostWidget from "./usePostWidget";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  isProfile,
}) => {
  const {
    likedUsers,
    isLiked,
    likeCount,
    patchLike,
    deletePost,
    loggedInUserId,
  } = usePostWidget({
    postId,
    postUserId,
    likes,
  });

  return (
    <div className="post-widget">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        isProfile={isProfile}
      />
      <div className="post-info">{description}</div>
      {picturePath && (
        <img
          className="post-image"
          width="100%"
          height="auto"
          alt="post"
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div className="likes-comments">
        <div className="likes-comments-item">
          <div className="icon-button" onClick={() => patchLike()}>
            {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
          </div>
        </div>
        <div className="liked-users">
          {likedUsers.length > 0 && (
            <div>
              Liked by: {likedUsers.slice(0, 3).join(", ")}
              {likedUsers.length > 3
                ? ` ...and ${likedUsers.length - 3} others`
                : ""}
            </div>
          )}
        </div>
        {loggedInUserId === postUserId && (
          <div className="likes-comments-item">
            <div className="icon-button" onClick={deletePost}>
              <AiFillDelete color="red" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostWidget;

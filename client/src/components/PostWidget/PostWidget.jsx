import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setDeletePost } from "../../store/authSlice";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import "./PostWidget.scss";
import Friend from "../Friend/Friend";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [likedUsers, setLikedUsers] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user?._id); // Updated to handle possible null user
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const likeCount = Object.keys(likes).length;

  useEffect(() => {
    setIsLiked(Boolean(likes[loggedInUserId]));
  }, [likes, loggedInUserId]);

  const patchLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();

        dispatch(setPost({ post: updatedData }));

        const isCurrentUserLiked = updatedData.likedUsers.some(
          (user) => user?._id === loggedInUserId
        );
        setLikedUsers(
          updatedData.likedUsers.map(
            (user) => `${user.firstName} ${user.lastName}`
          )
        );
        setIsLiked(isCurrentUserLiked);

        // Update localStorage for likes
        const updatedLikes = { ...likes };
        updatedData.likedUsers.forEach((user) => {
          updatedLikes[user?._id] = true;
        });
        localStorage.setItem("likes", JSON.stringify(updatedLikes));
      } else {
        console.error("Error updating like:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postUserId}/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        dispatch(setDeletePost(postId));
        
        // Remove likes associated with the deleted post from localStorage
        const updatedLikes = { ...likes };
        delete updatedLikes[postId];
        localStorage.setItem("likes", JSON.stringify(updatedLikes));
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post-widget">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
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
          {/* <div className="like-count">{likeCount}</div> */}
        </div>
        <div className="liked-users">
          {likedUsers.length > 0 && (
            <div>
              Liked by: {likedUsers.slice(0, 3).join(", ")}
              {likedUsers.length > 3 ? ` ...and ${likedUsers.length - 3} others` : ''}
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
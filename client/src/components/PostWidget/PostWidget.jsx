import React, { useState } from "react";
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
  const [isComments, setIsComments] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id); // Moved here
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (response.ok) {
        const updatedData = await response.json();

        dispatch(setPost({ post: updatedData }));

        const isCurrentUserLiked = updatedData.likedUsers.some(user => user._id === loggedInUserId);
        setLikedUsers(updatedData.likedUsers.map(user => `${user.firstName} ${user.lastName}`));
        setIsLiked(isCurrentUserLiked);
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
        dispatch(setDeletePost(postId)); // Dispatch the deletePost action
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
          <div className="like-count">{likeCount}</div>
        </div>
        <div className="liked-users">
          {likedUsers.length > 0 && (
            <div>Liked by: {likedUsers.join(", ")}</div>
          )}
        </div>

        {/* <div className="likes-comments-item">
          <div className="icon-button" onClick={() => setIsComments(!isComments)}>
            <span className="comment-outline" />
          </div>
          <div className="comment-count">{comments.length}</div>
        </div> */}

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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost ,setDeletePost  } from "../../store/authSlice";
import { AiFillHeart,AiOutlineHeart,AiFillDelete } from "react-icons/ai";
import './PostWidget.scss'
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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

console.log(postId+"hey");
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));

  };

  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postUserId}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        dispatch(setDeletePost(postId)); // Dispatch the deletePost action
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
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
      <div className="post-info" >
        {description}
      </div>
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
          <div className="icon-button" onClick={patchLike}>
            {isLiked ? <AiFillHeart color="red"/> : <AiOutlineHeart/>}
          </div>
          <div className="like-count">{likeCount}</div>
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
        <div className="icon-button">
          <span className="share-icon" />
        </div>
      </div>
      {/* {isComments && (
        <div className="comments-container">
          {comments.map((comment, i) => (
            <React.Fragment key={`${name}-${i}`}>
           
              <div className="comment-item">{comment}</div>
            </React.Fragment>
          ))}
         
        </div>
      )} */}
    </div>
  );
};

export default PostWidget;

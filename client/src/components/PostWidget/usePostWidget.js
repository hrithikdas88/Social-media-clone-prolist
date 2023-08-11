import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setDeletePost } from "../../store/authSlice";

const usePostWidget = ({ postId, postUserId, likes }) => {
  const [likedUsers, setLikedUsers] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user?._id);
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

  return {
    likedUsers,
    isLiked,
    likeCount,
    patchLike,
    deletePost,
    loggedInUserId,
  };
};

export default usePostWidget;

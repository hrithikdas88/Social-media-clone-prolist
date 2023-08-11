import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUserPosts } from "../../store/authSlice";

// Custom hook to fetch and manage posts
const usePostFeed = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setUserPosts(data));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId, token]);

  return posts;
};

export default usePostFeed;

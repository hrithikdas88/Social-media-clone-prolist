import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/authSlice";

const usePostFeed = (userId, isProfile = false) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // Assuming the 'createdAt' field represents the post creation timestamp.
    // Sort the posts in reverse chronological order based on the 'createdAt' timestamp.
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
    // Assuming the 'createdAt' field represents the post creation timestamp.
    // Sort the user posts in reverse chronological order based on the 'createdAt' timestamp.
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile, token]); // Include dependencies in the dependency array

  return posts;
};

export default usePostFeed;

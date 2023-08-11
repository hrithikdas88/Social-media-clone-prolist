import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/authSlice";

const useMyPost = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { picturePath } = useSelector((state) => state.user);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return {
    isImage,
    setIsImage,
    image,
    setImage,
    post,
    setPost,
    _id,
    picturePath,
    token,
    handlePost,
  };
};

export default useMyPost;

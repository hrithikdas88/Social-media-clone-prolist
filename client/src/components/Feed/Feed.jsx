import React from "react";
import usePostFeed from "./usePostFeed";
import PostWidget from "../PostWidget/PostWidget";
import "./Feed.scss";

const Feed = ({ userId, isProfile = false }) => {
  const posts = usePostFeed({ userId, isProfile });

  if (!posts || posts.length === 0) {
    return <p>No posts to display</p>;
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
          />
        )
      )}
    </>
  );
};

export default Feed;

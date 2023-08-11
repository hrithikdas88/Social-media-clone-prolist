import React from "react";
import Dropzone from "react-dropzone";
import UserImage from "../UserImage/UserImage";
import { BsImage, BsUpload } from "react-icons/bs";
import useMyPost from "./useMyPost";

import "./MyPost.scss";

const MyPost = () => {
  const {
    isImage,
    setIsImage,
    image,
    setImage,
    post,
    setPost,
    picturePath,
    handlePost,
  } = useMyPost();

  return (
    <div className="main-div">
      <div className="post-widget">
        <div className="image-textarea">
          <UserImage image={picturePath} />
          <textarea
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            className="post-input"
          />
        </div>
        {isImage && (
          <div className="image-dropzone">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <>
                  <div {...getRootProps()} className="dropzone-content">
                    <input {...getInputProps()} />
                    {!image ? (
                      <BsUpload />
                    ) : (
                      <div>
                        <span>{image.name}</span>
                      </div>
                    )}
                  </div>
                  {image && (
                    <button
                      onClick={() => setImage(null)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </Dropzone>
          </div>
        )}

        <div className="image-upload">
          <div
            gap="0.25rem"
            onClick={() => setIsImage(!isImage)}
            className="action-button"
          >
            <BsImage style={{ fontSize: "1.5rem" }} />
          </div>

          <button disabled={!post} onClick={handlePost} className="post-button">
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPost;

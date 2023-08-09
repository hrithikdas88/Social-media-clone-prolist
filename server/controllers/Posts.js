import Post from "../models/Posts.js";
import User from "../models/Users.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    const likedUserIds = Array.from(updatedPost.likes.keys());

    // Fetch user details for liked users using the User model
    const likedUsers = await User.find({ _id: { $in: likedUserIds } });

    res.status(200).json({ post: updatedPost, likedUsers });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};



/* DELETE */

export const deleteUserPost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    console.log('Deleting user post:');
    console.log('userId:', userId);
    console.log('postId:', postId);

    // Check if the post belongs to the user
    const post = await Post.findOne({ _id: postId, userId });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.findByIdAndDelete(postId);


    // Fetch and return the updated list of user's posts
    const updatedUserPosts = await Post.find({ userId });
    res.status(200).json(updatedUserPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




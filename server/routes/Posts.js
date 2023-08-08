import express from "express";
import { getFeedPosts, getUserPosts, likePost ,deleteUserPost } from "../controllers/Posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.delete("/:userId/posts/:postId", verifyToken, deleteUserPost);

// Define the new route for deleting posts

export default router;
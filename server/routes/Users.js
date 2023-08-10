import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/* NEW ROUTE - Get all users */
router.get("/", verifyToken, getAllUsers);

export default router;
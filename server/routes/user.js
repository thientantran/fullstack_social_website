import express from "express";
import { getUser, getUserFriends } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.get("/:id", verifyToken,getUser)
userRouter.get("/:id/friends", verifyToken, getUserFriends);
export default userRouter